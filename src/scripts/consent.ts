/**
 * Obsługa zgód na pliki cookie — Google Consent Mode v2.
 *
 * Kolejność ma znaczenie prawne: tryb zgody ustawiany jest na „odmowa"
 * ZANIM cokolwiek innego wystartuje (robi to skrypt w <head>), a tutaj
 * jedynie aktualizujemy stan po decyzji użytkownika. Dzięki temu żaden
 * pomiar nie trafia do Google przed zgodą.
 *
 * Wybór zapisujemy w localStorage, nie w ciasteczku — to dane techniczne
 * przeglądarki, nie wysyłamy ich na serwer, więc nie tworzymy kolejnego
 * ciasteczka wymagającego opisu.
 */

const KEY = 'stlm-consent';
const VERSION = 1;

type Consent = { v: number; analytics: boolean; marketing: boolean; ts: number };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    // zmiana wersji = pytamy ponownie (np. gdy dojdzie nowa kategoria)
    if (parsed.v !== VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function apply(analytics: boolean, marketing: boolean) {
  gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'stlm_consent', analytics, marketing });
}

function save(analytics: boolean, marketing: boolean) {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({ v: VERSION, analytics, marketing, ts: Date.now() } satisfies Consent)
    );
  } catch {
    /* tryb prywatny — decyzja zadziała do końca sesji */
  }
  apply(analytics, marketing);
}

function init() {
  const banner = document.querySelector<HTMLElement>('[data-cookie-banner]');
  const compact = document.querySelector<HTMLElement>('[data-cookie-compact]');
  const panel = document.querySelector<HTMLElement>('[data-cookie-panel]');
  const swAnalytics = document.querySelector<HTMLInputElement>('[data-cookie-analytics]');
  const swMarketing = document.querySelector<HTMLInputElement>('[data-cookie-marketing]');

  const saved = read();
  if (saved) apply(saved.analytics, saved.marketing);

  if (!banner) return;

  function show(openPanel = false) {
    banner!.hidden = false;
    if (compact) compact.hidden = openPanel;
    if (panel) panel.hidden = !openPanel;
    if (saved && swAnalytics) swAnalytics.checked = saved.analytics;
    if (saved && swMarketing) swMarketing.checked = saved.marketing;
  }

  function hide() {
    banner!.hidden = true;
  }

  if (!saved) show(false);

  document.querySelector('[data-cookie-settings]')?.addEventListener('click', () => show(true));
  document.querySelectorAll('[data-cookie-accept]').forEach((b) =>
    b.addEventListener('click', () => {
      save(true, true);
      hide();
    })
  );
  document.querySelectorAll('[data-cookie-reject]').forEach((b) =>
    b.addEventListener('click', () => {
      save(false, false);
      hide();
    })
  );
  document.querySelector('[data-cookie-save]')?.addEventListener('click', () => {
    save(!!swAnalytics?.checked, !!swMarketing?.checked);
    hide();
  });

  // odsyłacz „Ustawienia cookie" w stopce otwiera baner ponownie
  document.querySelectorAll('[data-cookie-reopen]').forEach((b) =>
    b.addEventListener('click', () => show(true))
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

export {};
