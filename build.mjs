// Build one self-contained page (dist/ielts-practice.html) by inlining the scripts. Usage: node build.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const here = new URL('./', import.meta.url);
const html = readFileSync(new URL('index.html', here), 'utf8')
  .replace(/<script src="([^":]+)"><\/script>/g, (_, f) => `<script>\n${readFileSync(new URL(f, here), 'utf8')}</script>`);
if (/<script src="[^":]+"/.test(html)) throw new Error('a local script was not inlined');
mkdirSync(new URL('dist/', here), { recursive: true });
writeFileSync(new URL('dist/ielts-practice.html', here), html);                         // for publishing: the host adds the doctype
writeFileSync(new URL('dist/ielts-practice-offline.html', here), '<!doctype html>\n' + html); // to open by double-click
mkdirSync(new URL('docs/', here), { recursive: true });
writeFileSync(new URL('docs/index.html', here), '<!doctype html>\n<html lang="en">\n' + html);   // GitHub Pages serves main /docs
console.log('built', html.length, 'bytes');
