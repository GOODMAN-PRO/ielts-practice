// Marking helpers shared by the page and check.mjs. Plain globals, no modules.
var QTYPES = ['True / False / Not Given', 'Yes / No / Not Given', 'Matching headings', 'Matching information',
  'Matching features', 'Matching sentence endings', 'Multiple choice', 'Summary completion', 'Note completion',
  'Table completion', 'Sentence completion', 'Short-answer questions'];

// Word count the way the computer test does it: runs of non-space characters.
function words(s) { return (String(s == null ? '' : s).trim().match(/\S+/g) || []).length; }

// Compare typed answers without caring about case, curly quotes, punctuation or extra spaces.
function norm(s) {
  return String(s == null ? '' : s).toLowerCase().replace(/[‘’]/g, "'")
    .replace(/[^a-z0-9' -]/g, ' ').replace(/\s+/g, ' ').trim();
}

// A gap answer is right only if it is inside the word limit and matches one accepted answer.
function markGap(typed, item, maxWords) {
  var t = norm(typed);
  if (!t) return false;
  if (maxWords && words(typed) > maxWords) return false;
  return item.answers.some(function (a) { return norm(a) === t; });
}

function markChoice(chosen, item) { return chosen === item.answer; }

// Every question of a passage, numbered 1..n in screen order: [{n, group, item, gi, ii}]
function flatten(passage) {
  var out = [], n = 0;
  passage.groups.forEach(function (g, gi) {
    g.items.forEach(function (it, ii) { out.push({ n: ++n, group: g, item: it, gi: gi, ii: ii }); });
  });
  return out;
}

// answers = {questionNumber: typed or chosen}. Returns [{n, qtype, right, given, correct, evidence}]
function markPassage(passage, answers) {
  return flatten(passage).map(function (q) {
    var given = answers[q.n] == null ? '' : answers[q.n];
    var right = q.group.kind === 'gap' ? markGap(given, q.item, q.group.maxWords) : markChoice(given, q.item);
    return { n: q.n, qtype: q.group.qtype, right: right, given: given,
      correct: q.group.kind === 'gap' ? q.item.answers[0] : q.item.answer, evidence: q.item.evidence };
  });
}
