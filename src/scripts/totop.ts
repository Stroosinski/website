/**
 * Przycisk powrotu na górę - zachowanie z oryginału (linie 833, 1780+, scrollTop).
 * Pojawia się po przewinięciu, przewija płynnie do góry.
 */

const SHOW_AFTER = 600;

function init() {
  const btn = document.querySelector<HTMLButtonElement>('[data-totop]');
  if (!btn) return;

  function sync() {
    const y = window.pageYOffset || document.documentElement.scrollTop || 0;
    const on = y > SHOW_AFTER;
    btn!.style.opacity = on ? '1' : '0';
    btn!.style.visibility = on ? 'visible' : 'hidden';
    btn!.style.transform = on ? 'translateY(0)' : 'translateY(8px)';
  }

  btn.addEventListener('click', () => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });

  window.addEventListener('scroll', sync, { passive: true });
  sync();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
