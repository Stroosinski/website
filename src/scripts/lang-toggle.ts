/**
 * Zapamiętanie ręcznego wyboru języka.
 * Kliknięcie przełącznika PL/EN zapisuje decyzję, dzięki czemu automatyczne
 * rozpoznawanie (lang.ts) nigdy więcej nie nadpisze wyboru odwiedzającego.
 */
import { rememberLang } from './lang';

function init() {
  document.querySelectorAll<HTMLAnchorElement>('.stlm-langtoggle a[hreflang]').forEach((a) => {
    a.addEventListener('click', () => {
      const target = a.getAttribute('hreflang');
      if (target) rememberLang(target);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
