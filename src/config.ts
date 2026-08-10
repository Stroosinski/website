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
