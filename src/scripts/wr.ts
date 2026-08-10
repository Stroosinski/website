/**
 * Sekwencja intro strony Showcase — odtworzona 1:1 z oryginału (linie 1541-1588).
 *
 * Kolejność zdarzeń ma znaczenie i jest częścią koncepcji "the reveal":
 *  1. sekcja wchodzi w widok (próg 0.35) → klasa is-visible odpala animacje
 *     z original.css: żółty pasek przejeżdża po nagłówku, H1 wjeżdża od dołu,
 *     lead pojawia się z opóźnieniem 1 s,
 *  2. eyebrow "rozszyfrowuje się" z losowych znaków, po 2 litery co 35 ms,
 *  3. pierwsze zdjęcie rozdziału jest ZABLOKOWANE na niewidocznym (introLock)
 *     i wchodzi dopiero po 1650 ms, czyli po tekście — żeby nie wyprzedzało
 *     napisu. Blokada puszczana jest 950 ms później, oddając zdjęcie
 *     zwykłemu sterowaniu przewijaniem (cine.ts respektuje introLock).
 *
 * Przy prefers-reduced-motion: tekst pokazuje się od razu, bez rozsypki
 * i bez blokady zdjęcia.
 */

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/·';
const SCRAMBLE_MS = 35;
const IMG_DELAY_MS = 1650;
const IMG_UNLOCK_MS = 950;

function scramble(el: HTMLElement) {
  const target = (el.textContent || '').toUpperCase();
  if (!target.trim()) return;
  let frame = 0;
  const iv = window.setInterval(() => {
    frame++;
    let out = '';
    for (let i = 0; i < target.length; i++) {
      if (i < frame * 2) out += target[i];
      else if (target[i] === ' ') out += ' ';
      else out += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    el.textContent = out;
    if (frame * 2 >= target.length) {
      window.clearInterval(iv);
      el.textContent = target;
    }
  }, SCRAMBLE_MS);
}

/**
 * Zdejmuje blokadę z pierwszego rozdziału.
 *
 * Blokada jest nałożona już w kodzie strony (opacity 0 + data-intro-lock),
 * a nie dokładana skryptem — inaczej przeglądarka zdążyłaby narysować zdjęcie
 * przy 0.22, zanim skrypt je ukryje, i widać było mignięcie.
 * Tutaj tylko puszczamy je we właściwym momencie: po tekście intro.
 */
function releaseFirstChapterImage(reduced: boolean) {
  const chapter = document.querySelector<HTMLElement>('[data-chapter]');
  const img = chapter?.querySelector<HTMLElement>('[data-cine-img][data-intro-lock]');
  if (!chapter || !img) return;

  const num = chapter.querySelector<HTMLElement>('[data-cine-num]');
  const reveal = () => {
    const r = chapter.getBoundingClientRect();
    const winH = window.innerHeight;
    const q = Math.max(0, Math.min(1, (winH - r.top) / (winH * 0.9)));
    img.style.opacity = (0.3 + 0.7 * Math.min(1, q * 1.25)).toFixed(3);
    if (num) num.style.opacity = '1';
    window.setTimeout(() => img.removeAttribute('data-intro-lock'), IMG_UNLOCK_MS);
  };

  // przy ograniczonych animacjach pokazujemy od razu, bez czekania i przejść
  if (reduced) {
    img.removeAttribute('data-intro-lock');
    img.style.opacity = '0.22';
    if (num) num.style.opacity = '1';
    return;
  }

  img.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1)';
  // ODSTĘPSTWO OD ORYGINAŁU (prośba właściciela, 2026-08-10): numer rozdziału
  // wchodzi razem ze zdjęciem; w oryginale był widoczny od początku.
  if (num) num.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1)';

  window.setTimeout(reveal, IMG_DELAY_MS);
}

function init() {
  const hero = document.querySelector<HTMLElement>('[data-wr]');
  if (!hero || hero.dataset.wrWired) return;
  hero.dataset.wrWired = '1';

  const reduced = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const play = () => {
    if (hero.dataset.wrPlayed) return;
    hero.dataset.wrPlayed = '1';
    hero.classList.add('is-visible');

    const eyebrow = hero.querySelector<HTMLElement>('[data-wr-eyebrow]');
    if (eyebrow) {
      if (reduced) eyebrow.textContent = (eyebrow.textContent || '').toUpperCase();
      else scramble(eyebrow);
    }

    releaseFirstChapterImage(reduced);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            play();
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(hero);

    // Zabezpieczenie: gdyby ktoś wszedł od razu w środek strony i sekcja intro
    // nigdy nie weszła w widok, zdjęcie zostałoby zablokowane na niewidocznym.
    window.setTimeout(() => {
      if (!hero.dataset.wrPlayed) {
        play();
        io.disconnect();
      }
    }, 4000);
  } else {
    play();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
