/**
 * Automatyczny wybór wersji językowej.
 *
 * Uruchamia się WYŁĄCZNIE na stronie głównej polskiej („/") i tylko wtedy,
 * gdy odwiedzający nie wybrał jeszcze języka ręcznie.
 *
 * OCHRONA POZYCJI W GOOGLE — najważniejsza część:
 * roboty wyszukiwarek są pomijane. Google indeksuje głównie z serwerów w USA;
 * gdyby robot był przekierowywany na wersję angielską, polska mogłaby wypaść
 * z wyników w Polsce. A to główny rynek, więc byłaby to strata większa
 * niż korzyść z automatyki.
 *
 * Kolejność decydowania:
 *  1. wybór zapamiętany po ręcznym przełączeniu — zawsze wygrywa,
 *  2. język przeglądarki zaczynający się na „pl" → zostajemy na polskiej,
 *  3. strefa czasowa Europe/Warsaw → zostajemy (Polak z obcojęzycznym systemem),
 *  4. w pozostałych przypadkach → wersja angielska.
 *
 * Kraj rozpoznajemy po strefie czasowej, a nie po adresie IP — nie wysyłamy
 * niczego do zewnętrznej usługi, więc nie powstaje kolejny wątek RODO
 * ani opóźnienie przy wczytywaniu.
 *
 * Przekierowanie używa replace(), więc przycisk „wstecz" nie wpada w pętlę.
 */

const KEY = 'stlm-lang';

const BOT =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|showyoubot|outbrain|pinterest|whatsapp|telegram|slackbot|vkshare|w3c_validator|lighthouse|headlesschrome|gptbot|claudebot|perplexity|applebot|ia_archiver|semrush|ahrefs/i;

export function savedLang(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function rememberLang(lang: string) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* tryb prywatny — trudno, zadziała do końca sesji */
  }
}

function prefersPolish(): boolean {
  const langs: string[] =
    (navigator.languages && navigator.languages.length
      ? Array.from(navigator.languages)
      : [navigator.language]) || [];
  if (langs.some((l) => typeof l === 'string' && l.toLowerCase().startsWith('pl'))) return true;

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === 'Europe/Warsaw') return true;
  } catch {
    /* brak obsługi stref — pomijamy ten krok */
  }
  return false;
}

function init() {
  // tylko polska strona główna
  if (window.location.pathname !== '/') return;
  // roboty wyszukiwarek zostawiamy w spokoju
  if (BOT.test(navigator.userAgent)) return;
  // ręczny wybór ma pierwszeństwo
  if (savedLang()) return;
  // ktoś przyszedł z linku w obrębie serwisu — nie nadpisujemy jego intencji
  if (document.referrer && document.referrer.startsWith(window.location.origin)) return;

  if (!prefersPolish()) {
    window.location.replace('/en/');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
