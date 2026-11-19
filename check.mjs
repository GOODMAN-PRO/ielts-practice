// Self-check for the question banks and the marking code.
//   node check.mjs                    validate bank-writing.js, bank-claude.js, bank-codex.js + marking self-test
//   node check.mjs --json file.json   validate one reading passage stored as JSON
//   node check.mjs --strip            write qa/<id>.questions.json (passage + questions, no answers) for blind solving
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert';

const dir = new URL('.', import.meta.url);
const ctx = vm.createContext({ READING: [], WRITING: [], Math, Number, String, Array, Object, JSON });
vm.runInContext(readFileSync(new URL('mark.js', dir), 'utf8'), ctx, { filename: 'mark.js' });
const { QTYPES, words, norm, markGap, markPassage, flatten } = ctx;

const jsonArg = process.argv.indexOf('--json');
if (jsonArg > -1) ctx.READING.push(JSON.parse(readFileSync(process.argv[jsonArg + 1], 'utf8')));
else for (const f of ['bank-writing.js', 'bank-claude.js', 'bank-codex.js']) {
  const p = new URL(f, dir);
  if (existsSync(p)) vm.runInContext(readFileSync(p, 'utf8'), ctx, { filename: f });
  else console.log('missing', f);
}

const str = s => typeof s === 'string' && s.trim().length > 0 && !/undefined|\[object|<[a-z/]/i.test(s);
const ids = new Set();
const uniq = id => { assert(!ids.has(id), 'duplicate id ' + id); ids.add(id); };

// ---- reading passages
for (const p of ctx.READING) {
  const at = p.id || '(no id)';
  assert(/^r-(claude|codex)-[a-z0-9-]+$/.test(p.id || ''), at + ': id must be r-claude-... or r-codex-...'); uniq(p.id);
  assert(['Claude', 'Codex'].includes(p.author), at + ' author');
  assert(str(p.title), at + ' title');
  assert([1, 2, 3].includes(p.level), at + ' level');
  assert(Array.isArray(p.paragraphs) && p.paragraphs.length >= 5 && p.paragraphs.length <= 10, at + ' needs 5-10 paragraphs');
  p.paragraphs.forEach((para, i) => {
    assert(para.label === String.fromCharCode(65 + i), at + ' paragraph labels must run A, B, C...');
    assert(str(para.text), at + ' paragraph ' + para.label + ' text');
  });
  const body = p.paragraphs.map(x => x.text).join(' ');
  const wc = words(body);
  assert(wc >= 650 && wc <= 1000, `${at}: passage is ${wc} words, must be 650-1000`);
  const bodyN = ' ' + norm(body) + ' ';
  const labels = p.paragraphs.map(x => x.label);
  assert(Array.isArray(p.groups) && p.groups.length >= 2 && p.groups.length <= 4, at + ' needs 2-4 question groups');
  let total = 0;
  p.groups.forEach((g, gi) => {
    const ga = `${at} group ${gi + 1}`;
    assert(QTYPES.includes(g.qtype), ga + ' qtype not in QTYPES: ' + g.qtype);
    assert(['choice', 'gap'].includes(g.kind), ga + ' kind');
    assert(str(g.instruction), ga + ' instruction');
    assert(Array.isArray(g.items) && g.items.length >= 2, ga + ' needs at least 2 items');
    total += g.items.length;
    if (g.kind === 'choice') {
      if (g.options) {
        assert(g.options.length >= 2 && new Set(g.options.map(o => o.key)).size === g.options.length, ga + ' option keys must be unique');
        g.options.forEach(o => assert(str(o.key) && (o.text === undefined || str(o.text)), ga + ' option'));
      }
      g.items.forEach((it, ii) => {
        const ia = `${ga} item ${ii + 1}`;
        assert(str(it.text), ia + ' text');
        const opts = it.options || g.options;
        assert(Array.isArray(opts) && opts.length >= 2, ia + ' has no options');
        if (it.options) {
          assert(new Set(opts.map(o => o.key)).size === opts.length, ia + ' option keys must be unique');
          opts.forEach(o => assert(str(o.key) && str(o.text), ia + ' option needs key and text'));
        }
        assert(opts.some(o => o.key === it.answer), ia + ' answer is not one of the option keys: ' + it.answer);
        assert(str(it.evidence), ia + ' evidence');
      });
      if (g.qtype === 'True / False / Not Given') assert(g.options.map(o => o.key).join('|') === 'TRUE|FALSE|NOT GIVEN', ga + ' options must be TRUE, FALSE, NOT GIVEN');
      if (g.qtype === 'Yes / No / Not Given') assert(g.options.map(o => o.key).join('|') === 'YES|NO|NOT GIVEN', ga + ' options must be YES, NO, NOT GIVEN');
      if (g.qtype === 'Matching information') assert(g.options.every(o => labels.includes(o.key)), ga + ' options must be paragraph letters');
      if (/Not Given/.test(g.qtype) && g.items.length >= 5) {
        const used = new Set(g.items.map(i => i.answer));
        if (used.size < 3) console.log('note:', ga, 'does not use all three answers');
      }
      if (g.qtype === 'Matching headings') assert(g.options.length >= g.items.length + 2, ga + ' needs at least 2 more headings than paragraphs');
    } else {
      assert(Number.isInteger(g.maxWords) && g.maxWords >= 1 && g.maxWords <= 3, ga + ' maxWords must be 1-3');
      assert(str(g.text), ga + ' text');
      const gaps = (g.text.match(/\{(\d+)\}/g) || []).map(x => +x.slice(1, -1));
      assert(gaps.length === g.items.length && gaps.every((n, i) => n === i + 1), ga + ' text must contain {1}..{' + g.items.length + '} once each, in order');
      g.items.forEach((it, ii) => {
        const ia = `${ga} gap ${ii + 1}`;
        assert(Array.isArray(it.answers) && it.answers.length >= 1 && it.answers.every(str), ia + ' answers');
        it.answers.forEach(a => assert(words(a) <= g.maxWords, `${ia} answer "${a}" is over the ${g.maxWords}-word limit`));
        assert(bodyN.includes(' ' + norm(it.answers[0]) + ' '), `${ia} first answer "${it.answers[0]}" is not found word for word in the passage`);
        assert(markGap(it.answers[0].toUpperCase() + ' ', it, g.maxWords), ia + ' does not mark its own answer right');
        assert(str(it.evidence), ia + ' evidence');
      });
    }
  });
  assert(total === 13, `${at}: has ${total} questions, must be 13`);
  // the key must score full marks against itself
  const key = {};
  flatten(p).forEach(q => { key[q.n] = q.group.kind === 'gap' ? q.item.answers[0] : q.item.answer; });
  assert(markPassage(p, key).every(r => r.right), at + ' key does not score 13/13');
  assert(markPassage(p, {}).every(r => !r.right), at + ' blank sheet must score 0');
}

// ---- writing prompts
for (const w of ctx.WRITING) {
  const at = w.id || '(no id)';
  assert(/^W[12]-\d\d$/.test(w.id || ''), at + ' id'); uniq(w.id);
  assert([1, 2].includes(w.task), at + ' task');
  assert(str(w.title) && str(w.prompt) && str(w.kind), at + ' title/prompt/kind');
  if (w.task === 1) assert(w.visual && typeof w.visual === 'object', at + ' visual');
}

// ---- marking self-test
assert(words('  one two,three  four ') === 3);
assert(markGap(' Rags. ', { answers: ['rags'] }, 1) && !markGap('old rags', { answers: ['rags'] }, 1) && !markGap('', { answers: ['rags'] }, 1));
assert(markGap('Don’t', { answers: ["don't"] }, 1));

if (process.argv.includes('--strip')) {
  mkdirSync(new URL('qa/', dir), { recursive: true });
  for (const p of ctx.READING) {
    const q = { id: p.id, title: p.title, paragraphs: p.paragraphs, questions: flatten(p).map(x => ({
      n: x.n, qtype: x.group.qtype, instruction: x.group.instruction,
      ...(x.group.kind === 'gap' ? { maxWords: x.group.maxWords, text: x.group.text, gap: x.ii + 1 }
        : { text: x.item.text, options: x.item.options || x.group.options }) })) };
    writeFileSync(new URL(`qa/${p.id}.questions.json`, dir), JSON.stringify(q, null, 1));
  }
  console.log('stripped', ctx.READING.length, 'passages into qa/');
}
const byType = {};
for (const p of ctx.READING) for (const g of p.groups) byType[g.qtype] = (byType[g.qtype] || 0) + g.items.length;
console.log('OK', ctx.READING.length, 'reading passages,', ctx.WRITING.length, 'writing prompts');
console.log(byType);
