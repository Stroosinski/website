/**
 * Usuwa z gotowego wyniku (dist/) zdjęcia źródłowe, które nie są wysyłane
 * do przeglądarki - zostają tylko lżejsze warianty.
 *
 * REGUŁA BEZPIECZEŃSTWA: kasujemy wyłącznie plik, dla którego istnieje
 * odpowiadający wariant `.lg.webp`. Wariantów nie ruszamy NIGDY.
 *
 * Dlaczego tak, a nie „usuń wszystko, czego nie widzę w kodzie":
 * karuzela produkcyjna buduje ścieżki dynamicznie
 * (`/assets/imgc/prod/prod-${numer}.lg.webp`), więc wyszukiwanie odwołań
 * w gotowych plikach ich NIE ZNAJDUJE. Czyszczenie na podstawie takiego skanu
 * skasowałoby 39 zdjęć i po cichu zepsuło galerię - sprawdzone.
 *
 * Oryginały zostają w repozytorium jako materiał źródłowy; znikają wyłącznie
 * z tego, co ląduje na serwerze.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist/assets');
if (!fs.existsSync(DIST)) {
  console.log('brak dist/assets - pomijam');
  process.exit(0);
}

const isVariant = (f) => /\.(sm|lg)\.webp$/i.test(f);
const isImage = (f) => /\.(webp|jpe?g|png)$/i.test(f);

let removed = 0;
let freed = 0;
let kept = 0;

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(p);
      continue;
    }
    if (!isImage(e.name) || isVariant(e.name)) {
      kept++;
      continue;
    }

    // czy istnieje wariant dla tego pliku?
    const base = p.replace(/\.(webp|jpe?g|png)$/i, '');
    const hasVariant = fs.existsSync(`${base}.lg.webp`);

    if (hasVariant) {
      freed += fs.statSync(p).size;
      fs.unlinkSync(p);
      removed++;
    } else {
      // brak wariantu = plik jest używany bezpośrednio (np. logo) - zostaje
      kept++;
    }
  }
}

walk(DIST);

console.log(
  `oczyszczono wynik: usunieto ${removed} oryginalow (${(freed / 1024 / 1024).toFixed(1)} MB), zostawiono ${kept} plikow`
);
