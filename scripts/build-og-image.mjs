import sharp from 'sharp';

/**
 * Buduje miniaturę pokazywaną przy udostępnianiu linku (Open Graph / Twitter).
 *
 * Dlaczego osobny plik, a nie samo logo-full.png:
 * logo ma proporcje 1334x550 (2,43:1), a serwisy społecznościowe oczekują
 * 1200x630 (1,91:1). Podanie im logo wprost kończy się przycięciem po bokach
 * albo doklejeniem przypadkowego tła przez sam serwis - w obu przypadkach
 * miniatura wygląda niechlujnie. Tutaj logo jest wpisane w prawidłowy kadr
 * na czarnym tle marki, z marginesem, więc wygląda tak samo wszędzie.
 *
 * Właściciel świadomie wybrał logotyp zamiast zdjęcia realizacji
 * (decyzja z 2026-08-16) - odnotowane w ODSTEPSTWA.md.
 *
 * Uruchomienie: node scripts/build-og-image.mjs
 * Po podmianie logo trzeba uruchomić ponownie.
 */

const SRC = 'public/assets/logo-full.png';
const OUT = 'public/assets/og-image.png';

// Rozmiar zalecany przez Facebooka, LinkedIna i Twittera/X.
const W = 1200;
const H = 630;

// Czerń marki - ta sama, co tło strony.
const BG = '#0A0A0A';

// Logo ma zajmować ok. 62% szerokości kadru; reszta to oddech dookoła.
const LOGO_W = Math.round(W * 0.62);

/**
 * UWAGA: `logo-full.png` to CZARNY znak na przezroczystym tle. Na stronie
 * wygląda na biały tylko dlatego, że nagłówek i stopka wyświetlają go z
 * `filter: invert(1)` (patrz Header.astro / Footer.astro). Przy składaniu
 * obrazu żaden filtr CSS nie działa, więc bez odwrócenia kolorów tutaj
 * powstawał czarny napis na czarnym tle - praktycznie niewidoczny.
 *
 * `negate` z `alpha: false` odwraca same kolory, nie ruszając przezroczystości.
 */
const logo = await sharp(SRC).negate({ alpha: false }).resize({ width: LOGO_W }).toBuffer();

await sharp({
  create: {
    width: W,
    height: H,
    channels: 4,
    background: BG,
  },
})
  .composite([{ input: logo, gravity: 'centre' }])
  .png()
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`Miniatura udostepniania: ${OUT} (${meta.width}x${meta.height})`);
