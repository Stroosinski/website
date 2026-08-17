/**
 * Efekt "latarki" na słowie zamykającym stronę główną.
 * Odtworzone 1:1 z oryginału (onSpotMove, linie 1068-1076): maska o rozmiarze
 * 360x360 px jest ustawiana tak, by jej środek trafiał pod kursor, stąd -180.
 * Zjechanie kursorem odsuwa maskę poza ekran, więc kolor znika.
 *
 * Na urządzeniach dotykowych i przy prefers-reduced-motion nie ruszamy nic -
 * original.css i tak zdejmuje maskę poniżej 860 px, dzięki czemu słowo jest
 * tam po prostu widoczne.
 */

const OFF = '-9999px -9999px';

function init() {
  const wrap = document.querySelector<HTMLElement>('[data-spot-wrap]');
  const overlay = document.querySelector<HTMLElement>('[data-spot-word]');
  if (!wrap || !overlay) return;

  const fine = window.matchMedia?.('(pointer: fine)').matches;
  if (!fine) return;

  wrap.addEventListener(
    'pointermove',
    (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left - 180);
      const y = Math.round(e.clientY - rect.top - 180);
      overlay.style.maskPosition = `${x}px ${y}px`;
      overlay.style.webkitMaskPosition = `${x}px ${y}px`;
    },
    { passive: true }
  );

  wrap.addEventListener('pointerleave', () => {
    overlay.style.maskPosition = OFF;
    overlay.style.webkitMaskPosition = OFF;
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
