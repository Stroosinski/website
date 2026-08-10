/**
 * Filtrowanie realizacji po rodzaju prac.
 * Karty są w HTML od razu — filtr jedynie je chowa, więc wyszukiwarki
 * i czytniki ekranu widzą komplet niezależnie od wyboru.
 */

function init() {
  const root = document.querySelector<HTMLElement>('.pg');
  if (!root) return;

  const buttons = root.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const items = root.querySelectorAll<HTMLLIElement>('.pg-item');
  const empty = root.querySelector<HTMLElement>('.pg-empty');

  function apply(key: string) {
    let visible = 0;
    items.forEach((item) => {
      const match = key === 'All' || item.dataset.tag === key;
      item.hidden = !match;
      if (match) visible++;
    });
    if (empty) empty.hidden = visible > 0;
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      apply(btn.dataset.filter ?? 'All');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
