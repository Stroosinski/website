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
| Sekcja z technologiami na stronie Możliwości („W jednej pracowni", 8 pozycji: projektowanie, rozwój techniczny, drewno/metal/tworzywa, druk lateksowy HP, druk 3D, lakiernia, rękodzieło, montaże) | **nie była wyświetlana** — dane były przygotowane w projekcie, ale sekcję wycięto z układu | sekcja przywrócona i zostaje | 2026-08-10 |

---

## Wymuszone przez wymagania SEO

Bez tych zmian strona nie mogłaby być indeksowana — a to był główny powód migracji.

| Co | Jak było | Jak jest | Dlaczego |
|---|---|---|---|
| Adresy stron | jeden adres, przełączanie widoków w JS | osobne adresy: `/`, `/realizacje/`, `/mozliwosci/`, `/kontakt/` + `/en/…` | wyszukiwarka nie zaindeksuje treści, do której nie ma adresu |
| Wersje językowe | jeden adres, podmiana tekstów w JS | dwie realne wersje z `hreflang` | polska treść była dla Google niewidoczna |
| Nawigacja | przyciski JS | zwykłe linki | robot musi móc przejść między stronami |
| Opisy obrazów | 17 z 23 miało pusty `alt` | opisy w PL i EN | niewidoczne w Google Images i dla czytników ekranu |

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
- **Formularze**: komunikat „wysłano" pojawia się wyłącznie po potwierdzeniu
  z serwera; błąd zostawia wpisane dane.
- **Prezentacja**: pobiera się od razu w przeglądarce, niezależnie od poczty.

---

## Do rozstrzygnięcia

- **Prezentacja PDF jest tylko po angielsku**, a formularz jest także na polskiej
  wersji strony.
- **Opisy w Showcase są ukryte** (ustawienie „Minimal – photos lead" z oryginału).
  To najcenniejsza treść dla Google — do decyzji, czy pokazać.
- **Nagłówki rozdziałów Showcase są po angielsku także w wersji polskiej**
  (tak jest w danych oryginału).
- **Polityka prywatności nie istnieje**, a jest wymagana prawnie przy zbieraniu
  danych z formularzy. W stopce oznaczona plakietką TODO.
