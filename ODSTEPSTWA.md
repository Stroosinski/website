# Odstępstwa od oryginału z Claude Design

Strona jest przenoszona **1:1** z projektu `STOLMAR Site.dc.html`. Ten plik to
pełna lista miejsc, w których celowo zrobiono inaczej — wraz z powodem.

Wszystko, czego tu nie ma, powinno być zgodne z oryginałem. Jeśli coś wygląda
inaczej, a nie jest wymienione poniżej, to błąd do zgłoszenia.

---

## Zamówione przez właściciela

| Co | Jak było w oryginale | Jak jest teraz | Data |
|---|---|---|---|
| Nagłówek sekcji z prezentacją | „Prezentacja możliwości STOLMAR" / „Stolmar capabilities deck" | „Krótka prezentacja STOLMAR" / „STOLMAR short overview" | 2026-08-10 |
| Przyciski w hero na telefonie | obok siebie w jednym rzędzie | „Pracownia" pod „Zobacz realizacje" | 2026-08-10 |
| Numer rozdziału w Showcase | widoczny od początku | pojawia się razem ze zdjęciem, po tekście intro | 2026-08-10 |
| Statystyka „miast w ostatnim sezonie" | EN: 10 Capitals, PL: 9 Miast (rozbieżność) | 10 w obu wersjach, „Cities" / „Miast" | 2026-08-10 |
| Adres w stopce | Hodowlana 7, Rumia | bez zmian — potwierdzony jako adres fizyczny (biuro i produkcja). Adres rejestrowy do dokumentów to Chmielewskiego 10/1, 81-721 Sopot, ale **nie podajemy go na stronie**: w wynikach lokalnych Google liczy się lokalizacja, którą można odwiedzić | 2026-08-10 |
| Układ strony Kontakt | lewa kolumna przyklejona do góry, formularz od 96px, Brief 3 wiersze | lewa kolumna wyśrodkowana pionowo i przesunięta w prawo (padding-left 96px), formularz zaczyna się niżej (132px), Brief dwukrotnie wyższy (6 wierszy) — lewa kolumna wyglądała pusto | 2026-08-11 |
| Pole załączników w formularzu kontaktowym | pole „Załączniki" z możliwością dodania plików | **usunięte.** Formspree na darmowym planie odrzuca przesyłki z plikami błędem „File Uploads Not Permitted" — klient dostawał niejasny błąd, a zgłoszenie się nie wysyłało. Materiały klient wysyła bezpośrednio na info@stolmar.co. Wraca razem z przejściem na Resend albo płatny plan Formspree | 2026-08-11 |
| Ikona karty przeglądarki | tło czarne (#0A0A0A), znak biały | tło białe z zaokrąglonymi rogami, znak czarny — konwencja w stylu ikon aplikacji | 2026-08-11 |
| Prezentacja do pobrania | formularz z adresem e-mail (który i tak nic nie wysyłał) | **tymczasowo** sam przycisk pobierania, bez podawania adresu. Docelowo wróci formularz wysyłający prezentację automatycznie w załączniku (usługa Resend). Układ sekcji bez zmian, więc powrót to podmiana prawej kolumny | 2026-08-10 |
| Sekcja z technologiami na stronie Możliwości („W jednej pracowni", 8 pozycji: projektowanie, rozwój techniczny, drewno/metal/tworzywa, druk lateksowy HP, druk 3D, lakiernia, rękodzieło, montaże) | **nie była wyświetlana** — dane były przygotowane w projekcie, ale sekcję wycięto z układu | sekcja przywrócona i zostaje; układ przebudowany na prośbę właściciela z siatki ośmiu kafelków na **indeks warsztatowy** — numerowaną listę z cienkimi liniami, bliższą wytycznym marki („terse fielded pairs", treść „jak rysunek warsztatowy") | 2026-08-10 |

---

## Wymuszone przez wymagania SEO

Bez tych zmian strona nie mogłaby być indeksowana — a to był główny powód migracji.

| Co | Jak było | Jak jest | Dlaczego |
|---|---|---|---|
| Adresy stron | jeden adres, przełączanie widoków w JS | osobne adresy: `/`, `/realizacje/`, `/mozliwosci/`, `/kontakt/` + `/en/…` | wyszukiwarka nie zaindeksuje treści, do której nie ma adresu |
| Wersje językowe | jeden adres, podmiana tekstów w JS | dwie realne wersje z `hreflang` | polska treść była dla Google niewidoczna |
| Nawigacja | przyciski JS | zwykłe linki | robot musi móc przejść między stronami |
| Opisy obrazów | 17 z 23 miało pusty `alt` | opisy w PL i EN | niewidoczne w Google Images i dla czytników ekranu |
| Miniatura udostępniania (Open Graph) | brak — serwisy brały samo `logo-full.png` (1334×550) | osobny kadr `og-image.png` 1200×630, generowany przez `scripts/build-og-image.mjs` | proporcje logo (2,43:1) nie mieszczą się w oczekiwanych 1,91:1 — Facebook i LinkedIn przycinały je po bokach albo doklejały własne tło. **Właściciel świadomie wybrał logotyp zamiast zdjęcia realizacji** (decyzja 2026-08-16), mimo że zdjęcie zwykle klika się lepiej |
| Godziny pracy w danych strukturalnych | brak | `openingHoursSpecification`, pon.–pt. 09:00–17:00 | Google pokazuje je w wynikach lokalnych; godziny potwierdzone przez właściciela 2026-08-16 (dni robocze przyjęte domyślnie — **do potwierdzenia, czy pracownia pracuje w soboty**) |

---

## Naprawione błędy oryginału

| Co | Na czym polegał błąd |
|---|---|
| Formularz kontaktowy | **nie wysyłał zgłoszeń nigdzie** — pokazywał „Odezwiemy się" i kasował dane. Każde zapytanie ofertowe przepadało |
| Formularz z prezentacją | to samo — udawał wysyłkę |
| Trzy nagłówki w Showcase | dwa różne teksty EN dzieliły jedno tłumaczenie PL, więc polska wersja pokazywała identyczne tytuły w różnych sekcjach. Rozdzielone (`work.eyebrow`/`work.indexEyebrow`, `work.h1`/`work.framesH1`, `work.ctaH1`/`work.materialsH1`) — **nowe teksty PL do akceptacji** |
| Tytuł projektu nr 3 | w polskiej wersji nieprzetłumaczone „Retail Furniture" → „Meble sklepowe" |
| Znaki `&` w wersji angielskiej | wyświetlało się `&amp;` (podwójne kodowanie przy imporcie) |

---

## Ulepszenia techniczne (niewidoczne w wyglądzie)

- **Fonty**: TTF → WOFF2 i tylko używane grubości. 868 KB → 239 KB.
- **Zdjęcia**: warianty 900 px do siatek i 2000 px do galerii. Oryginały miały
  nawet 6000 px. Siatka Showcase: 39,5 MB → 8 MB.
- **JavaScript**: oryginał ładował ~3,3 MB (Babel + React z CDN przy każdym
  wejściu). Teraz ~7 KB na stronę główną, React tylko tam, gdzie jest potrzebny.
- **Galeria**: dołożona obsługa klawiatury (strzałki, Escape, uwięzienie focusu)
  — w oryginale działała wyłącznie myszką.
- **Wydajność przewijania**: nagłówek, menu mobilne i baner cookie (rozmyte tło,
  `position: fixed`) dostały podpowiedź `will-change` + `translateZ(0)`, żeby
  przeglądarka renderowała je na osobnej warstwie zamiast przeliczać rozmycie
  na każdej klatce przewijania — częsta przyczyna szarpania przy `backdrop-filter`
  na elementach przyklejonych do ekranu. Wygląd bez zmian.
- **Shadery WebGL** (`silk-drape`, `dot-matrix`) wcześniej renderowały
  bez przerwy, także gdy karta była w tle (inna zakładka aktywna) —
  marnowały baterię i procesor bez potrzeby. Teraz pauzują się, gdy karta
  nie jest widoczna, i wracają natychmiast po powrocie. Zmiana tylko
  w `public/js/*.js` (wysyłane kopie); `_source/code/` zostaje nietknięte
  jako materiał źródłowy.
- **Formularze**: komunikat „wysłano" pojawia się wyłącznie po potwierdzeniu
  z serwera; błąd zostawia wpisane dane.
- **Prezentacja**: pobiera się od razu w przeglądarce, niezależnie od poczty.

---

## Adresy — świadome rozróżnienie

| Gdzie | Adres | Dlaczego |
|---|---|---|
| Stopka, sekcja kontaktowa, dane strukturalne | Hodowlana 7, **Rumia** | adres fizyczny — biuro i produkcja. W wynikach lokalnych Google liczy się lokalizacja, którą można odwiedzić |
| Polityka prywatności | Chmielewskiego 10/1, **Sopot** | adres rejestrowy — dokument prawny musi wskazywać administratora danych zgodnie z rejestrem. Rumia podana obok jako miejsce działalności |

## Do rozstrzygnięcia

- **Prezentacja PDF jest tylko po angielsku**, a formularz jest także na polskiej
  wersji strony.
- **Opisy w Showcase są ukryte** (ustawienie „Minimal – photos lead" z oryginału).
  To najcenniejsza treść dla Google — do decyzji, czy pokazać.
- **Nagłówki rozdziałów Showcase są po angielsku także w wersji polskiej**
  (tak jest w danych oryginału).
- **Polityka prywatności wymaga sprawdzenia przez prawnika.** Treść opisuje
  wiernie to, co serwis robi, ale nie jest opinią prawną.
- **Kategoria marketingowa w banerze cookie jest nieużywana.** Oryginał ładował
  Meta Pixel, ta wersja nie. W polityce opisane zgodnie z prawdą jako nieaktywne.
  Do decyzji: dodać Pixel czy usunąć kategorię z banera.
