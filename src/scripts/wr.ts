/**
 * Uruchamia animację intro Showcase.
 * Same klatki są w original.css ([data-wr].is-visible ...), tutaj tylko
 * dokładamy klasę, gdy sekcja wejdzie w widok — dzięki temu pasek, nagłówek
 * i lead odpalają się we właściwej kolejności, a nie od razu przy wczytaniu.
 */

function init() {
  const targets = document.querySelectorAll<HTMLElement>('[data-wr]');
  if (!targets.length) return;

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    // original.css przy ograniczonych animacjach i tak zdejmuje ruch,
    // ale klasa musi paść, żeby tekst nie został ukryty.
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      });
    },
    { threshold: 0.25 }
  );

  targets.forEach((el) => io.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
