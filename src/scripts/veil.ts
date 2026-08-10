/**
 * "Zasłona" — sygnaturowa interakcja marki STOLMAR.
 * Odtworzona 1:1 z oryginału (metoda _hg, linie ~1660).
 *
 * Najechanie na grupę [data-hgroup] przełącza jednocześnie:
 *  - pasek zakrywający tytuł: scaleX(1) → scaleX(0),
 *  - tytuł: przygaszenie z data-dim (domyślnie 0.14) → 1,
 *  - zdjęcie: przezroczystość data-off → data-on, skala 1.06 → 1.01,
 *  - zdjęcie z atrybutem data-gray: odbarwienie → PEŁNE KOLORY,
 *  - teksty [data-h-txt]: kolor na biały i przesunięcie o 14 px,
 *  - numery [data-h-num]: kolor na żółć sygnałową,
 *  - ramkę grupy z data-hborder: na żółć z przezroczystością 55%.
 *
 * Na ekranach dotykowych (brak hovera) wszystko startuje odsłonięte —
 * tak jak w oryginale, żeby treść nie została ukryta.
 */

const MOBILE_BREAKPOINT = 860;
const ACCENT_BORDER = 'rgba(239,211,43,0.55)';
const IDLE_BORDER = '#222222';

function setGroup(g: HTMLElement, on: boolean) {
  g.querySelectorAll<HTMLElement>('[data-rd-bar]').forEach((b) => {
    b.style.transform = on ? 'scaleX(0)' : 'scaleX(1)';
  });

  g.querySelectorAll<HTMLElement>('[data-rd-text]').forEach((t) => {
    t.style.opacity = on ? '1' : (t.dataset.dim ?? '0.14');
  });

  g.querySelectorAll<HTMLElement>('[data-h-img]').forEach((im) => {
    im.style.opacity = on ? (im.dataset.on ?? '0.85') : (im.dataset.off ?? '0.5');
    im.style.transform = on ? 'scale(1.01)' : 'scale(1.06)';
    // kadry oznaczone data-gray wracają do oryginalnych kolorów pod kursorem
    if (im.dataset.gray != null) {
      im.style.filter = on ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.78)';
    }
  });

  g.querySelectorAll<HTMLElement>('[data-h-txt]').forEach((t) => {
    t.style.color = on ? '#FFFFFF' : (t.dataset.c ?? '#4A4A4A');
    t.style.transform = on ? 'translateX(14px)' : 'translateX(0)';
  });

  g.querySelectorAll<HTMLElement>('[data-h-num]').forEach((t) => {
    t.style.color = on ? '#EFD32B' : '#3A3A3A';
  });

  if (g.dataset.hborder != null) {
    g.style.borderColor = on ? ACCENT_BORDER : IDLE_BORDER;
  }

  if (g.classList.contains('stlm-ctile')) {
    g.style.zIndex = on ? '40' : '';
  }
}

function init() {
  const groups = document.querySelectorAll<HTMLElement>('[data-hgroup]');
  const isTouch = window.innerWidth <= MOBILE_BREAKPOINT;

  groups.forEach((g) => {
    if (isTouch) {
      setGroup(g, true);
      return;
    }
    setGroup(g, false);
    if (g.dataset.hgWired) return;
    g.dataset.hgWired = '1';
    g.addEventListener('mouseenter', () => setGroup(g, true));
    g.addEventListener('mouseleave', () => setGroup(g, false));
    g.addEventListener('focusin', () => setGroup(g, true));
    g.addEventListener('focusout', () => setGroup(g, false));
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

let resizeTimer: number;
window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(init, 200);
});
