/**
 * Poświata podążająca za kursorem ([data-cursor-glow] w sekcji archiwum).
 * Delikatny żółty rozbłysk, widoczny tylko przy realnym kursorze - na dotyku
 * i przy prefers-reduced-motion pozostaje wyłączony. Reguła mobilna w
 * original.css i tak chowa go poniżej 860 px.
 */

function init() {
  const glow = document.querySelector<HTMLElement>('[data-cursor-glow]');
  if (!glow) return;

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia?.('(pointer: fine)').matches;
  if (reduced || !fine) return;

  let raf = 0;
  let x = 0;
  let y = 0;

  function paint() {
    raf = 0;
    glow!.style.left = `${x}px`;
    glow!.style.top = `${y}px`;
  }

  window.addEventListener(
    'pointermove',
    (e) => {
      x = e.clientX;
      y = e.clientY;
      glow.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(paint);
    },
    { passive: true }
  );

  document.addEventListener('pointerleave', () => {
    glow.style.opacity = '0';
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
