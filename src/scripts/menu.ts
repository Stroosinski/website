/**
 * Menu mobilne — zachowanie przeniesione z oryginału (metoda _chrome()).
 * Otwarcie przełącza [data-mmenu] między display:none a flex i zamienia
 * ikonę hamburgera na krzyżyk. Widoczność samego przycisku steruje CSS
 * (.stlm-burger pokazuje się poniżej 860 px).
 */

const ICON_OPEN = '<path d="M3 6h18"></path><path d="M3 12h18"></path><path d="M3 18h18"></path>';
const ICON_CLOSE = '<path d="M5 5l14 14"></path><path d="M19 5L5 19"></path>';

function init() {
  const burger = document.querySelector<HTMLButtonElement>('[data-burger]');
  const menu = document.querySelector<HTMLElement>('[data-mmenu]');
  const icon = document.querySelector<SVGElement>('[data-burger-icon]');
  if (!burger || !menu) return;

  let open = false;

  function set(next: boolean) {
    open = next;
    menu!.style.display = open ? 'flex' : 'none';
    burger!.setAttribute('aria-expanded', String(open));
    if (icon) icon.innerHTML = open ? ICON_CLOSE : ICON_OPEN;
  }

  set(false);

  burger.addEventListener('click', () => set(!open));

  // Zamknij po wybraniu pozycji i po wyjściu poza szerokość mobilną.
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) set(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860 && open) set(false);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
