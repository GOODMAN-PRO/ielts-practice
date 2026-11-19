# IELTS Practice

Timed IELTS Academic practice on screen, like the computer test.

**Live:** https://goodman-pro.github.io/ielts-practice/

- **Writing:** 14 Task 1 prompts with drawn charts and 20 Task 2 prompts. Typed with no spell-check, a countdown and a live word count.
- **Reading:** six original passages of 13 questions, marked on the spot with the evidence for every answer.
- Each attempt ends in a Markdown result to paste to a tutor. Attempts are saved in the browser only.

The prompts and passages are original practice material written by Claude and Codex. They are not official IELTS material, and the app never gives a band.

## Working on it

No dependencies. `index.html` loads `mark.js` and the three `bank-*.js` files.

```bash
node check.mjs
```

```bash
node build.mjs
```

`check.mjs` validates the banks and the marking code. `build.mjs` inlines everything into `docs/index.html`, which GitHub Pages serves. The bank format and quality rules are in `CODEX-BRIEF.md`.
