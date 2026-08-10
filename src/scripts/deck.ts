/**
 * Zliczanie pobrań prezentacji.
 *
 * Kliknięcie wysyła zdarzenie `deck_download` do warstwy danych (dataLayer).
 * Działa niezależnie od tego, czy Google Analytics jest już podpięty:
 * zdarzenia trafiają do kolejki i zostaną odczytane, gdy Analytics wystartuje.
 * Dzięki temu licznik pobrań zacznie działać po włączeniu Analytics,
 * bez żadnych zmian w kodzie.
 *
 * Samo pobranie odbywa się natywnie (atrybut download), więc nawet gdyby
 * skrypt się nie wykonał, przycisk nadal działa.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function init() {
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-deck-download]');
  if (!links.length) return;

  links.forEach((link) => {
    link.addEventListener('click', () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'deck_download',
        file: link.getAttribute('href'),
        lang: link.dataset.lang ?? document.documentElement.lang,
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

export {};
