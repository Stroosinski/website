/**
 * Kafle galerii: klik lub Enter wysyła zdarzenie, na które reaguje wyspa React
 * z karuzelą. Dzięki temu same kafle zostają zwykłym HTML-em - wyszukiwarki
 * widzą zdjęcia i opisy niezależnie od tego, czy galeria się kiedykolwiek otworzy.
 */

function open(el: HTMLElement) {
  let imgs: string[] = [];
  try {
    imgs = JSON.parse(el.dataset.frameImgs ?? '[]');
  } catch {
    imgs = [];
  }
  if (!imgs.length) return;

  window.dispatchEvent(
    new CustomEvent('stlm:lightbox-open', {
      detail: {
        imgs,
        title: el.dataset.frameTitle ?? '',
        loc: el.dataset.frameLoc ?? '',
      },
    })
  );
}

function init() {
  document.querySelectorAll<HTMLElement>('[data-lb-open]').forEach((el) => {
    el.addEventListener('click', () => open(el));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(el);
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
