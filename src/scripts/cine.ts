/**
 * "The reveal" - filmowe odsłanianie rozdziałów Showcase.
 * Odtworzone 1:1 z oryginału (metoda _cine, linie 1832-1853).
 *
 * Postęp q liczony jest z pozycji sekcji względem okna i steruje trzema rzeczami:
 *  - zdjęcie: paralaksa (przesuwa się wolniej niż strona) i rozjaśnianie
 *    od 0.3 do 1.0,
 *  - podpis: wjazd od dołu o 40 px i pojawienie się dopiero po 20% postępu,
 *  - żółta kreska: rozsuwanie od lewej (scaleX 0 → 1).
 *
 * Przy prefers-reduced-motion znikają przesunięcia, ale przejścia
 * przezroczystości zostają - treść nadal się odsłania, tylko bez ruchu.
 */

function run() {
  const winH = window.innerHeight;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll<HTMLElement>('[data-cine]').forEach((w) => {
    const r = w.getBoundingClientRect();
    const q = Math.max(0, Math.min(1, (winH - r.top) / (winH * 0.9)));

    const img = w.querySelector<HTMLElement>('[data-cine-img]');
    if (img) {
      const off = reduced ? 0 : (r.top + r.height / 2 - winH / 2) * -0.14;
      img.style.transform = `translateY(${off.toFixed(1)}px)`;
      if (!img.dataset.introLock) {
        img.style.opacity = (0.3 + 0.7 * Math.min(1, q * 1.25)).toFixed(3);
      }
    }

    const cap = w.querySelector<HTMLElement>('[data-cine-cap]');
    if (cap) {
      cap.style.opacity = Math.max(0, (q - 0.2) / 0.8).toFixed(3);
      cap.style.transform = `translateY(${(reduced ? 0 : 40 * (1 - q)).toFixed(1)}px)`;
    }

    const rule = w.querySelector<HTMLElement>('[data-cine-rule]');
    if (rule) rule.style.transform = `scaleX(${q.toFixed(3)})`;
  });
}

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    run();
    ticking = false;
  });
}

function init() {
  if (!document.querySelector('[data-cine]')) return;
  run();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
