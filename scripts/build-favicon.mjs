import fs from 'node:fs';
import sharp from 'sharp';

/**
 * Buduje ikonę karty przeglądarki.
 *
 * Problem: logo-mark.svg jest czysto białe na przezroczystym tle, więc na
 * jasnym pasku kart znikało. Wytyczne marki dopuszczają znak wyłącznie
 * w czerni, bieli lub żółci — więc dokładamy tło w kolorze marki (#0A0A0A)
 * i zostawiamy znak biały. Dzięki temu ikona jest widoczna niezależnie
 * od motywu przeglądarki.
 */

const SRC = 'public/assets/logo-mark.svg';
const raw = fs.readFileSync(SRC, 'utf8');

// wyciągamy zawartość SVG (bez nagłówka i <svg>), żeby wstawić ją na tło
const inner = raw
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .trim();

// Znak zajmuje 222x221.78; dodajemy margines, żeby nie dotykał krawędzi.
const PAD = 34;
const BOX = 222 + PAD * 2;

const withBg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BOX} ${BOX}" width="${BOX}" height="${BOX}">
  <rect width="${BOX}" height="${BOX}" fill="#0A0A0A"/>
  <g transform="translate(${PAD}, ${PAD})">
${inner}
  </g>
</svg>`;

fs.writeFileSync('public/favicon.svg', withBg, 'utf8');
console.log('zapisano public/favicon.svg');

const buf = Buffer.from(withBg);
const sizes = [
  { file: 'public/favicon-32.png', size: 32 },
  { file: 'public/favicon-192.png', size: 192 },
  { file: 'public/apple-touch-icon.png', size: 180 },
  { file: 'public/favicon-512.png', size: 512 },
];

for (const s of sizes) {
  await sharp(buf, { density: 384 }).resize(s.size, s.size).png().toFile(s.file);
  const kb = (fs.statSync(s.file).size / 1024).toFixed(1);
  console.log(`${s.file} — ${s.size}x${s.size}, ${kb} KB`);
}

// favicon.ico: 32x32 (starsze przeglądarki i czytniki kanałów)
const ico32 = await sharp(buf, { density: 384 }).resize(32, 32).png().toBuffer();
fs.writeFileSync('public/favicon.ico', ico32);
console.log('zapisano public/favicon.ico (PNG w kontenerze .ico, akceptowany przez przeglądarki)');
