/**
 * Obsługa galerii pełnoekranowej.
 * Zachowanie z oryginału: klasa stlm-lb-on na body blokuje przewijanie strony
 * i ukrywa nagłówek, animacje wejścia i wyjścia pochodzą z original.css.
 * Dołożona obsługa klawiatury (strzałki, Escape) i uwięzienie focusu —
 * w oryginale galeria była tylko klikalna.
 */

const FADE_IN = 'stlm-lb-fade-in';
const FADE_OUT = 'stlm-lb-fade-out';
const POP_IN = 'stlm-lb-pop-in';
const POP_OUT = 'stlm-lb-pop-out';

function init() {
  const overlay = document.querySelector<HTMLElement>('[data-lb-overlay]');
  const panel = document.querySelector<HTMLElement>('[data-lb-panel]');
  const img = document.querySelector<HTMLImageElement>('[data-lb-img]');
  const titleEl = document.querySelector<HTMLElement>('[data-lb-title]');
  const locEl = document.querySelector<HTMLElement>('[data-lb-loc]');
  const counterEl = document.querySelector<HTMLElement>('[data-lb-counter]');
  const closeBtn = document.querySelector<HTMLElement>('[data-lb-close]');
  const prevBtn = document.querySelector<HTMLElement>('[data-lb-prev]');
  const nextBtn = document.querySelector<HTMLElement>('[data-lb-next]');
  if (!overlay || !panel || !img) return;

  let imgs: string[] = [];
  let idx = 0;
  let lastFocus: HTMLElement | null = null;

  const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  function show(i: number) {
    if (!imgs.length) return;
    idx = (i + imgs.length) % imgs.length;
    img!.src = imgs[idx];
    if (counterEl) counterEl.textContent = `${idx + 1} / ${imgs.length}`;
    if (!reduced()) {
      // naprzemienne animacje, żeby zmiana zdjęcia była widoczna także
      // przy przejściu na to samo źródło (jak w oryginale)
      img!.style.animation = 'none';
      void img!.offsetWidth;
      img!.style.animation = `${idx % 2 === 0 ? 'stlm-lb-img1' : 'stlm-lb-img2'} 0.42s cubic-bezier(0.16,1,0.3,1) both`;
    }
  }

  function open(trigger: HTMLElement) {
    // Uwaga: kafle używają data-frame-*, a nie data-lb-*. Gdyby nazwy się
    // pokrywały, document.querySelector('[data-lb-title]') trafiałby w pierwszy
    // kafel zamiast w podpis galerii i nadpisywał jego zawartość.
    try {
      imgs = JSON.parse(trigger.dataset.frameImgs ?? '[]');
    } catch {
      imgs = [];
    }
    if (!imgs.length) return;

    lastFocus = trigger;
    if (titleEl) titleEl.textContent = trigger.dataset.frameTitle ?? '';
    if (locEl) locEl.textContent = trigger.dataset.frameLoc ?? '';

    overlay!.hidden = false;
    document.body.classList.add('stlm-lb-on');
    if (!reduced()) {
      overlay!.style.animation = `${FADE_IN} 0.32s cubic-bezier(0.16,1,0.3,1) both`;
      panel!.style.animation = `${POP_IN} 0.56s cubic-bezier(0.16,1,0.3,1) both`;
    }
    show(0);
    closeBtn?.focus();
  }

  function close() {
    if (overlay!.hidden) return;
    const done = () => {
      overlay!.hidden = true;
      overlay!.style.animation = '';
      panel!.style.animation = '';
      document.body.classList.remove('stlm-lb-on');
      lastFocus?.focus();
    };
    if (reduced()) return done();
    overlay!.style.animation = `${FADE_OUT} 0.28s cubic-bezier(0.16,1,0.3,1) both`;
    panel!.style.animation = `${POP_OUT} 0.28s cubic-bezier(0.16,1,0.3,1) both`;
    window.setTimeout(done, 280);
  }

  document.querySelectorAll<HTMLElement>('[data-lb-open]').forEach((el) => {
    el.addEventListener('click', () => open(el));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(el);
      }
    });
  });

  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', () => show(idx - 1));
  nextBtn?.addEventListener('click', () => show(idx + 1));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', (e) => {
    if (overlay.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'Tab') {
      // focus zostaje w galerii
      const focusables = overlay.querySelectorAll<HTMLElement>('button');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
