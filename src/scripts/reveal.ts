/**
 * Animacje wejścia - odtworzone 1:1 z oryginału (metoda _reveals, linie 1663-1676).
 *
 * Zasady z oryginału, zachowane co do wartości:
 * - przy prefers-reduced-motion nic się nie animuje,
 * - elementy widoczne już przy wejściu (top < 75% wysokości okna) NIE animują się,
 *   dzięki czemu pierwszy ekran nie „mruga",
 * - przesunięcie: domyślnie 26px w górę, data-slide="left"/"right" daje 72px w bok,
 * - próg widoczności 0.12, czas 0.72s, krzywa cubic-bezier(0.16,1,0.3,1).
 */

const EASE = 'opacity 0.72s cubic-bezier(0.16,1,0.3,1), transform 0.72s cubic-bezier(0.16,1,0.3,1)';

function init() {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement;
        el.style.opacity = '1';
        el.style.transform = 'none';
        io.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-rv])').forEach((el) => {
    el.dataset.rv = '1';
    if (reduced) return;

    const r = el.getBoundingClientRect();
    // element już widoczny - zostawiamy bez animacji (tak jak oryginał)
    if (r.top < window.innerHeight * 0.75 && r.bottom > 0) return;

    el.style.opacity = '0';
    const slide = el.dataset.slide;
    el.style.transform =
      slide === 'left' ? 'translateX(-72px)' : slide === 'right' ? 'translateX(72px)' : 'translateY(26px)';
    el.style.transition = EASE;
    io.observe(el);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
