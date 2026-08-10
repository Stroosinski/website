/**
 * "Zasłona" — sygnaturowa interakcja marki STOLMAR.
 * Tytuł startuje przykryty paskiem i przygaszony; najechanie odsłania go,
 * a zdjęcie w tle rozjaśnia się. Na dotyku (brak hovera) wszystko jest
 * odsłonięte od razu — tak jak w oryginale.
 */

const MOBILE_BREAKPOINT = 860;

function setGroup(group: HTMLElement, on: boolean) {
  const img = group.querySelector<HTMLImageElement>('[data-h-img]');
  if (img) {
    const off = img.dataset.off ?? '0.4';
    const onVal = img.dataset.on ?? '0.75';
    img.style.opacity = on ? onVal : off;
    img.style.transform = on ? 'scale(1)' : 'scale(1.06)';
  }

  if (group.dataset.hborder) {
    group.style.borderColor = on ? '#efd32b' : '#222222';
  }

  group.querySelectorAll<HTMLElement>('[data-rd]').forEach((rd) => {
    const text = rd.querySelector<HTMLElement>('[data-rd-text]');
    const bar = rd.querySelector<HTMLElement>('[data-rd-bar]');
    if (text) text.style.opacity = on ? '1' : (text.dataset.dim ?? '0.15');
    if (bar) bar.style.transform = on ? 'scaleX(0)' : 'scaleX(1)';
  });
}

function init() {
  const groups = document.querySelectorAll<HTMLElement>('[data-hgroup]');
  const isTouch = window.innerWidth <= MOBILE_BREAKPOINT;

  groups.forEach((group) => {
    if (isTouch) {
      // Bez hovera odsłaniamy na stałe — treść nie może zostać ukryta.
      setGroup(group, true);
      return;
    }
    setGroup(group, false);
    group.addEventListener('mouseenter', () => setGroup(group, true));
    group.addEventListener('mouseleave', () => setGroup(group, false));
    group.addEventListener('focusin', () => setGroup(group, true));
    group.addEventListener('focusout', () => setGroup(group, false));
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

// Zmiana szerokości może przełączyć tryb dotykowy <-> hover.
let resizeTimer: number;
window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(init, 200);
});
