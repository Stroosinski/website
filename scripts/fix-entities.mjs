import fs from 'node:fs';

/**
 * Dekoduje encje HTML w plikach z treścią.
 *
 * Skąd problem: angielskie teksty wyciągałem regexem wprost z kodu HTML
 * oryginału, więc zapisały się w postaci zakodowanej (&amp; zamiast &).
 * Astro koduje treść ponownie przy wypisywaniu, przez co na stronie
 * pojawiało się dosłowne "&amp;".
 */

const NAMED = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ndash: '–',
  mdash: '—',
  hellip: '…',
  rsquo: '’',
  lsquo: '‘',
  ldquo: '“',
  rdquo: '”',
  middot: '·',
  deg: '°',
  reg: '®',
  copy: '©',
  trade: '™',
};

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED[name.toLowerCase()] ?? m);
}

function walk(v) {
  if (typeof v === 'string') return decode(v);
  if (Array.isArray(v)) return v.map(walk);
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.entries(v).map(([k, val]) => [k, walk(val)]));
  }
  return v;
}

const files = [
  'src/i18n/pl.json',
  'src/i18n/en.json',
  'src/content/site.pl.json',
  'src/content/site.en.json',
  'src/content/showcase.pl.json',
  'src/content/showcase.en.json',
];

let total = 0;
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const raw = fs.readFileSync(f, 'utf8');
  const data = JSON.parse(raw);
  const fixed = walk(data);
  const out = JSON.stringify(fixed, null, 2) + '\n';
  if (out !== raw) {
    // policz ile ciągów faktycznie się zmieniło
    const before = (raw.match(/&[a-z]+;|&#\d+;|&#x[0-9a-f]+;/gi) || []).length;
    fs.writeFileSync(f, out, 'utf8');
    console.log(`${f}: naprawiono ${before} encji`);
    total += before;
  } else {
    console.log(`${f}: czysty`);
  }
}
console.log(`\nrazem naprawionych encji: ${total}`);
