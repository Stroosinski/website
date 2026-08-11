import type { Locale, RouteKey } from './index';

/**
 * Tytuły i opisy dla wyszukiwarek — osobne dla każdej strony i języka.
 * W wersji z Claude Design cała strona miała jeden tytuł, bo była jednym adresem.
 * Tytuł: do ~60 znaków, opis: do ~155 — tyle pokazuje Google.
 */
export const meta: Record<RouteKey, Record<Locale, { title: string; description: string }>> = {
  home: {
    pl: {
      title: 'STOLMAR — witryny sklepowe, stoiska i scenografia',
      description:
        'Od 30 lat projektujemy i produkujemy witryny sklepowe, meble, stoiska targowe i scenografię dla marek premium. Jedna pracownia — od koncepcji po montaż.',
    },
    en: {
      title: 'STOLMAR — window displays, exhibitions & scenography',
      description:
        'For 30 years we have designed and produced shop windows, furniture, exhibition stands and scenography for premium brands. One workshop, concept to install.',
    },
  },
  work: {
    pl: {
      title: 'Realizacje — witryny, pop-upy i wystawy | STOLMAR',
      description:
        'Wybrane kadry z realizacji STOLMAR: kampanie witrynowe, pop-up store’y, wystawy i scenografia eventowa dla marek premium w Europie.',
    },
    en: {
      title: 'Work — window campaigns, pop-ups & exhibitions | STOLMAR',
      description:
        'Selected frames from STOLMAR projects: window campaigns, pop-up stores, exhibitions and event scenography for premium brands across Europe.',
    },
  },
  studio: {
    pl: {
      title: 'Możliwości — POS, retail i scenografia | STOLMAR',
      description:
        'Trzy dyscypliny, jedna pracownia: kampanie POS i visual merchandising, przestrzenie retail i ekspozycje, scenografia i eventy. Projekt, produkcja, montaż.',
    },
    en: {
      title: 'Capabilities — POS, retail spaces & scenography | STOLMAR',
      description:
        'Three disciplines, one workshop: POS campaigns and visual merchandising, retail spaces and exhibitions, scenography and events. Design, production, install.',
    },
  },
  contact: {
    pl: {
      title: 'Kontakt — zapytaj o wycenę | STOLMAR',
      description:
        'Prześlij zakres projektu, a wrócimy z dopasowaną wyceną w ciągu dwóch dni roboczych. STOLMAR, Hodowlana 7, Rumia. info@stolmar.co, +48 505 999 275.',
    },
    en: {
      title: 'Contact — request a quote | STOLMAR',
      description:
        'Send us your scope and we will come back with a tailored quote within two working days. STOLMAR, Hodowlana 7, Rumia, Poland. info@stolmar.co, +48 505 999 275.',
    },
  },
  privacy: {
    pl: {
      title: 'Polityka prywatności | STOLMAR',
      description:
        'Jak przetwarzamy dane osobowe przekazane przez formularz kontaktowy, jakich narzędzi używamy i jakie prawa przysługują osobom, których dane dotyczą.',
    },
    en: {
      title: 'Privacy policy | STOLMAR',
      description:
        'How we process personal data submitted through the contact form, which tools we use, and what rights data subjects have.',
    },
  },
};
