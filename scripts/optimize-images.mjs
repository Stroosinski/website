/**
 * Generuje pomniejszone warianty zdjęć.
 *
 * Powód: pliki z public/ Astro kopiuje bez obróbki, więc oryginały o szerokości
 * nawet 6000 px trafiały do przeglądarki także wtedy, gdy kafelek ma 300 px.
 * Skrypt tworzy dwa warianty obok oryginału:
 *   *.sm.webp  - do siatki kadrów (maks. 900 px)
 *   *.lg.webp  - do galerii pełnoekranowej (maks. 2000 px)
 * Oryginały zostają nietknięte jako materiał źródłowy.
 *
 * Uruchamianie: npm run images
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('public/assets');
/** `npm run images -- --force` przelicza warianty od nowa (po podmianie zdjęć). */
const FORCE = process.argv.includes('--force');
const VARIANTS = [
  { suffix: '.sm', width: 900, quality: 78 },
  { suffix: '.lg', width: 2000, quality: 82 },
];

/**
 * Pliki interfejsu (logo, miniatura udostępniania) NIE są zdjęciami treści -
 * muszą trafić na serwer w oryginalnej postaci. Bez tego wyjątku powstałby im
 * wariant `.lg.webp`, a `prune-dist.mjs` skasowałby wtedy oryginał (kasuje
 * dokładnie te pliki, które mają wariant) i odwołania w kodzie prowadziłyby
 * donikąd. `og-image.png` musi zostać PNG-iem, bo serwisy społecznościowe
 * najpewniej obsługują ten format.
 */
const isUiAsset = (f) => /logo-/.test(f) || /og-image/.test(f);

const isSource = (f) =>
  /\.(webp|jpe?g|png)$/i.test(f) && !/\.(sm|lg)\.webp$/i.test(f) && !isUiAsset(f);

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (isSource(e.name)) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
console.log(`plikow zrodlowych: ${files.length}`);

let before = 0;
let after = 0;
let created = 0;
let skipped = 0;

for (const file of files) {
  const stat = fs.statSync(file);
  before += stat.size;
  const dir = path.dirname(file);
  const base = path.basename(file).replace(/\.(webp|jpe?g|png)$/i, '');

  const meta = await sharp(file).metadata();

  for (const v of VARIANTS) {
    const target = path.join(dir, `${base}${v.suffix}.webp`);

    /*
      Pomijamy, jeśli wariant już istnieje.
      Celowo NIE porównujemy dat modyfikacji: git ich nie zachowuje, więc po
      pobraniu repozytorium na serwerze budującym wszystkie pliki mają ten sam
      czas i porównanie dawałoby losowy wynik - w efekcie każde wdrożenie
      przeliczałoby od nowa kilkaset zdjęć.
      Po podmianie zdjęcia na nowe: `npm run images -- --force`.
    */
    if (!FORCE && fs.existsSync(target)) {
      after += fs.statSync(target).size;
      skipped++;
      continue;
    }

    // nie powiększamy - jeśli oryginał jest mniejszy, kopiujemy w tej samej skali
    const width = Math.min(v.width, meta.width ?? v.width);

    await sharp(file)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: v.quality })
      .toFile(target);

    after += fs.statSync(target).size;
    created++;
  }
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(`utworzono: ${created}, pominieto (aktualne): ${skipped}`);
console.log(`oryginaly: ${mb(before)} MB`);
console.log(`warianty razem: ${mb(after)} MB`);
