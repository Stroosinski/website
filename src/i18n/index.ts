import pl from './pl.json';
import en from './en.json';

export const locales = ['pl', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pl';

const dictionaries: Record<Locale, Record<string, string>> = { pl, en };

/**
 * Zwraca funkcję tłumaczącą dla danego języka.
 * Brakujący klucz nie wywala buildu - wraca do angielskiego, a w trybie dev
 * zgłasza ostrzeżenie, żeby braki nie przeszły niezauważone.
 */
export function useTranslations(locale: Locale) {
  const dict = dictionaries[locale];
  return function t(key: string): string {
    const value = dict[key] ?? dictionaries.en[key];
    if (value === undefined) {
      // Ostrzegamy ZAWSZE, także przy budowaniu - brakujący klucz wyświetla
      // na stronie swoją nazwę (np. „studio.inhouse"), co łatwo przeoczyć.
      console.warn(`[i18n] BRAK KLUCZA: "${key}" (${locale}) - na stronie pojawi się nazwa klucza`);
      return key;
    }
    return value;
  };
}

/** Ścieżki stron w obu językach - z polskimi adresami dla SEO. */
export const routes = {
  home: { pl: '/', en: '/en/' },
  work: { pl: '/realizacje/', en: '/en/work/' },
  studio: { pl: '/mozliwosci/', en: '/en/studio/' },
  contact: { pl: '/kontakt/', en: '/en/contact/' },
  faq: { pl: '/faq/', en: '/en/faq/' },
  privacy: { pl: '/polityka-prywatnosci/', en: '/en/privacy-policy/' },
} as const;

export type RouteKey = keyof typeof routes;

/** Adres tej samej strony w drugim języku - do przełącznika i hreflang. */
export function altPath(route: RouteKey, locale: Locale): string {
  return routes[route][locale === 'pl' ? 'en' : 'pl'];
}

export function pathFor(route: RouteKey, locale: Locale): string {
  return routes[route][locale];
}
