# Brief: reading passages for IELTS Practice

Claude and Codex are co-building **IELTS Practice**, a single-page web app in this folder, for a student preparing for IELTS Academic **on computer** in January 2027.

**What the app does.** Two parts.
- **Writing:** shows a Task 1 or Task 2 prompt (Task 1 charts are drawn from data), a typing box with no spell-check, a countdown and a live word count, then produces a Markdown block the student pastes into the tutor chat for marking.
- **Reading:** shows one passage on the left and its 13 questions on the right, like the real computer test, with a 20-minute countdown. It marks the answers, shows the evidence for each one, lets the student tag each mistake with a cause code, and produces a Markdown result to paste to the tutor.

**Honest labelling.** These passages are tutor-written practice, not official IELTS material. The app shows a raw score out of 13 and never a band. Official tests remain the only measurement.

**Already built by Claude (read them, do not edit them):** `mark.js` (marking), `check.mjs` (validator).

## The format

Plain browser JavaScript, no imports, no modules, wrapped in an IIFE. It appends to the global `READING` array. All strings are plain text: no HTML, no Markdown, no LaTeX.

```js
(function () {
READING.push({
  id: 'r-codex-paper',     // unique; r-codex-<slug> or r-claude-<slug>
  author: 'Codex',         // 'Codex' or 'Claude'
  title: 'The story of paper',
  level: 1,                // 1, 2 or 3: as hard as Passage 1, 2 or 3 of the real test
  paragraphs: [            // 6 to 9 paragraphs, labelled A, B, C ... in order
    { label: 'A', text: '...' },
  ],
  groups: [                // 2 or 3 question groups, exactly 13 questions in total, in screen order
    { qtype: 'True / False / Not Given', kind: 'choice',
      instruction: 'Do the following statements agree with the information given in the passage? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, or NOT GIVEN if there is no information on this.',
      options: [{ key: 'TRUE' }, { key: 'FALSE' }, { key: 'NOT GIVEN' }],   // shared by every item in the group
      items: [
        { text: 'The statement.', answer: 'FALSE',
          evidence: 'Paragraph B: "exact words from the passage". The passage says X; the statement says Y.' },
      ] },
    { qtype: 'Multiple choice', kind: 'choice',
      instruction: 'Choose the correct letter, A, B, C or D.',
      items: [                                                            // each item brings its own options
        { text: 'The stem.', options: [{ key: 'A', text: '...' }, { key: 'B', text: '...' }, { key: 'C', text: '...' }, { key: 'D', text: '...' }],
          answer: 'C', evidence: '...' },
      ] },
    { qtype: 'Summary completion', kind: 'gap',
      instruction: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
      maxWords: 1,                                                        // limit for every gap in the group (1 to 3)
      text: 'Early paper was made from {1} and old {2}.',                 // {1}..{n} mark the gaps; \n starts a new line
      items: [
        { answers: ['bark'], evidence: '...' },                           // answers[0] must appear word for word in the passage
        { answers: ['rags'], evidence: '...' },                           // list every spelling you would accept
      ] },
  ],
});
})();
```

**`qtype` must be one of** (exact spelling): `True / False / Not Given`, `Yes / No / Not Given`, `Matching headings`, `Matching information`, `Matching features`, `Matching sentence endings`, `Multiple choice`, `Summary completion`, `Note completion`, `Table completion`, `Sentence completion`, `Short-answer questions`.

How each type maps onto the two kinds:

| qtype | kind | options / text |
|---|---|---|
| True / False / Not Given | choice | shared options exactly `TRUE`, `FALSE`, `NOT GIVEN`. For facts. |
| Yes / No / Not Given | choice | shared options exactly `YES`, `NO`, `NOT GIVEN`. For the writer's views or claims. |
| Matching headings | choice | shared options = headings with keys `i`, `ii`, `iii` ... (at least 2 more headings than items). Item text = `Paragraph B`. |
| Matching information | choice | shared options = paragraph letters, `{ key: 'A' }` ... Item text = "a description of ...". A letter may be used more than once; say so in the instruction if it is. |
| Matching features | choice | shared options = the features, `{ key: 'A', text: 'the water clock' }`. Item text = a statement. |
| Matching sentence endings | choice | shared options = endings (more endings than items). Item text = the sentence beginning. |
| Multiple choice | choice | per-item options A to D, one correct answer. |
| Summary / Note / Table / Sentence completion, Short-answer questions | gap | one `text` with `{1}..{n}`; use `\n` between sentences, notes or questions. |

## Quality rules (these matter more than anything else)

1. **Every answer must be provable from the passage alone.** `evidence` names the paragraph and quotes the exact supporting words, then says in one sentence why that makes the answer right. For NOT GIVEN, name the paragraph where the topic comes up and say which part of the statement the passage never states.
2. **One defensible answer only.** A careful reader must not be able to argue for a second option. FALSE and NO must be directly contradicted by the text. NOT GIVEN must be genuinely unstated: not implied true, not implied false.
3. **Paraphrase.** Questions restate the passage in different words. Do not reuse the passage's key words where a synonym exists. This is the skill being trained.
4. **Order.** True/False/Not Given, Yes/No/Not Given, multiple choice and completion questions follow the order of the passage. Matching types need not.
5. **Gaps.** The answer is taken word for word from the passage, fits the grammar of the gap sentence, and is the only word or phrase in the passage that fits. Respect `maxWords`. The gap sentence must not be a copy of the passage sentence.
6. **Distractors do real work.** Wrong options use ideas that are in the passage but answer a different question. Extra headings describe a detail of a paragraph rather than its main idea.
7. **Facts.** Use only well-established facts you are confident of. No invented researchers, studies, quotations or statistics. Where a number matters, use one that is widely documented, or say "about" or "roughly". For matching features, match to periods, places, materials or methods rather than to invented people.
8. **Original text.** Do not copy or closely paraphrase any published IELTS test or other source.
9. **Register.** A genuine IELTS Academic passage: a general-interest article for an educated non-specialist. British spelling. Level 1 is descriptive and factual (700-800 words). Level 2 is denser, with some argument (800-900 words). Level 3 is abstract or argumentative, with the writer's views (850-950 words).
10. **Length of the set.** Exactly 13 questions per passage, in 2 or 3 groups.

Run `node check.mjs` in this folder until it prints `OK`. It checks the shape, the 13-question total, word counts, option keys, and that every gap answer appears in the passage.

## Status and upkeep (19 November 2026)

Live at https://goodman-pro.github.io/ielts-practice/ (GitHub Pages, served from `docs/` on `main`). Six passages are live (three in `bank-claude.js`, three in `bank-codex.js`); all were solved blind against their keys before release.

To add or change content: edit the bank file, run `node check.mjs` until it prints `OK`, have a fresh agent solve any new or changed passage blind (`node check.mjs --strip` writes answer-free copies into `qa/`), then run `node build.mjs`, commit, and push to `main`. Pages redeploys `docs/index.html` within a minute or two. Finished attempts keep their own copy of the passage, so editing a bank never changes a student's old result.

## Codex's first job (done): create `bank-codex.js` with these three passages

| id | level | topic | question groups |
|---|---|---|---|
| `r-codex-paper` | 1 | The story of paper: from its invention in China to its spread west and the change from rags to wood pulp | True / False / Not Given (6) + Note completion (7) |
| `r-codex-forgetting` | 2 | Why we forget: the forgetting curve, interference, the role of sleep, and what spaced practice does | Matching headings (6) + Summary completion (4) + Multiple choice (3) |
| `r-codex-walkable` | 3 | The walkable city: an argued case about designing cities for walking, with its costs and critics | Yes / No / Not Given (5) + Multiple choice (4) + Matching sentence endings (4) |

Claude is writing `bank-claude.js` at the same time (shipping containers, urban heat islands, bird navigation). Do not create or edit any other file.

Final message back: the file written, the output of `node check.mjs`, and any fact in your passages you are less than sure of.
