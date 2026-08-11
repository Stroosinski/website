/**
 * Ustawienia serwisu.
 *
 * FORM_ENDPOINT jest publiczny — i tak widnieje w kodzie wysłanej strony —
 * dlatego trzymamy go jako wartość domyślną, a nie wyłącznie w zmiennej
 * środowiskowej. Gdyby zależał tylko od zmiennej, brak jej ustawienia na
 * Vercelu cicho zepsułby wysyłkę zgłoszeń. Zmienną można nadpisać przy testach.
 */
export const FORM_ENDPOINT =
  import.meta.env.PUBLIC_FORM_ENDPOINT || 'https://formspree.io/f/mjybynvv';

/**
 * Google Analytics 4.
 * Identyfikator jest publiczny — widnieje w kodzie wysłanej strony — więc jak
 * przy formularzu trzymamy go jako wartość domyślną. Uzależnienie wyłącznie od
 * zmiennej środowiskowej groziłoby tym, że po wdrożeniu bez jej ustawienia
 * pomiar po cichu przestałby działać.
 *
 * Analytics uruchamia się DOPIERO po zgodzie (Consent Mode v2).
 */
export const GA_ID = import.meta.env.PUBLIC_GA_ID || 'G-R9FQNH7L3Z';

/**
 * Prezentacja wysyłana w odpowiedzi na formularz.
 * Podmiana na nowszą wersję = skopiowanie pliku pod tę samą nazwę,
 * bez ruszania kodu. Osoby, które dostały link wcześniej, pobiorą nową wersję.
 */
export const DECK_FILE = '/files/STOLMAR-overview.pdf';

export const CONTACT = {
  email: 'info@stolmar.co',
  phone: '+48 505 999 275',
  phoneHref: '+48505999275',
} as const;
