# STOLMAR — podsumowanie projektu (dla nowej sesji Claude Code)

> Ten plik jest wejściem dla nowej rozmowy o tym projekcie. Przeczytaj go
> w całości przed podjęciem jakichkolwiek działań — opisuje, co zostało
> zrobione, jakie decyzje zapadły i dlaczego, oraz co zostało do zrobienia.
> Zbuduj i uruchom stronę (`npm run dev`), zanim zaczniesz cokolwiek zmieniać,
> żeby zobaczyć bieżący stan na żywo.

## Co to za projekt

Strona firmowa **STOLMAR** (producent witryn sklepowych, mebli, stoisk
targowych i scenografii dla marek premium — Reserved, Medicine, Tumi i inne).
Właściciel jest **laikiem technicznym** i pisze po polsku — odpowiadaj mu po
polsku, prostym językiem, prowadź rozmowę.

**Cel projektu:** przenieść gotowy design ze zrzutu Claude Design
(`.dc.html`, renderowany w przeglądarce przez React+Babel z CDN) na
**statyczny build Astro** wdrożony na Vercelu — dla SEO, GEO i szybkości.
Wersja z Claude Design ładowała ~3,3 MB JS przy każdym wejściu (Babel + React
z unpkg) i była praktycznie niewidoczna dla wyszukiwarek (treść renderowana
dopiero w przeglądarce). Po migracji: ~7 KB JS na stronę główną, pełny HTML
w kodzie źródłowym.

**Zasada nadrzędna całego projektu: strona ma być 1:1 z oryginałem z Claude
Design.** Właściciel bardzo długo nad nią pracował i każde odstępstwo musi
być świadome, uzasadnione i odnotowane — nigdy przypadkowe uproszczenie.

## GDZIE JEST WSZYSTKO

- **Kod źródłowy oryginału** (do porównań): `_source/orig/STOLMAR Site.dc.html`
  — to jest źródło prawdy o tym, jak COŚ MA WYGLĄDAĆ i jak DZIAŁAĆ (style,
  animacje, kolejność sekcji, dokładne wartości). Gdy coś wygląda podejrzanie
  w nowej wersji, **zawsze sprawdzaj najpierw ten plik**, zanim zgadniesz.
- **Design system źródłowy**: `_source/orig/_ds/…` (tokeny CSS, `_ds_bundle.js`
  z definicjami komponentów jak `Button`, `Input`).
- **Skrypty efektów (oryginalne, nieprzeniesione 1:1 do TS)**:
  `_source/code/*.js` — `silk-drape.js`, `veil-shader.js`, `dot-matrix.js`,
  `ash-drift.js`, `grain-bloom.js` to samodzielne web componenty (WebGL),
  skopiowane do `public/js/` i ładowane przez `<script src="/js/…">`.
- **Lista wszystkich świadomych odstępstw od oryginału**: [`ODSTEPSTWA.md`](ODSTEPSTWA.md)
  w katalogu głównym. **To jest obowiązkowa lektura.** Zawiera 4 kategorie:
  zmiany zamówione przez właściciela, zmiany wymuszone przez SEO, naprawione
  błędy oryginału, ulepszenia techniczne niewidoczne w wyglądzie. Jeśli
  widzisz różnicę względem oryginału, która NIE jest tam wymieniona — to błąd
  do naprawienia, nie funkcja.

## Stos technologiczny

- **Astro 5** (SSG, `output: 'static'`) + **React** (tylko jako wyspy:
  karuzele Coverflow/ProdCoverflow, galeria pełnoekranowa)
- Hosting: **Vercel**, wdrożenie automatyczne po `git push` na `main`
- Repo: `https://github.com/Stroosinski/website` (**publiczne** — świadoma
  decyzja właściciela, strona i tak będzie publiczna)
- Adres tymczasowy (przed podpięciem domeny):
  `https://website-bice-five-22.vercel.app/`
- Środowisko: **Windows**, PowerShell. Node.js zainstalowany przez
  `winget install OpenJS.NodeJS.LTS` (nie było go domyślnie).

### Pułapki środowiska (już rozwiązane, ale warto wiedzieć)

- **npm 11 nie uruchamia automatycznie skryptów instalacyjnych zależności.**
  Po `npm install` czasem trzeba `npm rebuild esbuild sharp`, inaczej build
  padnie. `sharp` jest teraz jawną zależnością w `package.json`
  (`devDependencies`), więc Vercel go poprawnie zainstaluje.
- **PowerShell i polskie znaki**: zapis przez `Set-Content`/przekierowania bez
  `-Encoding utf8` rozsypuje polskie znaki (mojibake typu `Ĺ‚` zamiast `ł`).
  Zawsze pisz pliki przez narzędzie `Write`/`Edit`, nie przez surowe
  przekierowania PowerShell, gdy w treści są polskie znaki.
- **`git commit -m` z wieloliniowym tekstem zawierającym polskie znaki i
  cudzysłowy** rozbija się w PowerShell. Commit message zawsze pisz do pliku
  tymczasowego i użyj `git commit -F plik.txt`, albo (Bash) heredoc.
- **Serwer podglądu (`astro dev`) potrafi się "zawiesić" po wielu zmianach**
  i przestać generować CSS na żywo — objawia się jako "strona nagle bez
  stylów". Rozwiązanie: `preview_stop` + `preview_start` od nowa, nie szukać
  błędu w kodzie.
- **`.claude/launch.json`** ma teraz DWA configi: `stolmar-dev` (port 4321,
  `astro dev`) i `stolmar-preview` (port 4322, `astro preview` — serwuje
  faktyczny `dist/`, używać do sprawdzania efektu `npm run build`).

## Struktura stron (11 stron, PL + EN)

| Polski | Angielski | Zawartość |
|---|---|---|
| `/` | `/en/` | Hero (tafla wody `<silk-drape>`), Filozofia, Statystyki, Archiwum (bento), sekcja "Przyciągające uwagę" (efekt latarki) |
| `/realizacje/` | `/en/work/` | Showcase: intro z maszyną do pisania liter, 3 rozdziały (POS/Wystawy/Eventy), 19 realizacji, 127 zdjęć, karuzela Coverflow w galerii |
| `/mozliwosci/` | `/en/studio/` | Maszyna do pisania w H1, 3 pola specjalizacji (naprzemienny układ), sekcja "W jednej pracowni" (PRZEBUDOWANA — patrz niżej), karuzela produkcyjna ProdCoverflow (39 zdjęć), przycisk pobrania prezentacji |
| `/kontakt/` | `/en/contact/` | Formularz (Formspree), dane kontaktowe, znak wodny |
| `/polityka-prywatnosci/` | `/en/privacy-policy/` | Dokument prawny (patrz sekcja niżej) |
| `/404` | — | wspólna dla obu języków |

Każda strona ma: nagłówek z menu mobilnym (hamburger), stopkę z przyciskami
social w stylu przełącznika języka, baner zgód cookie, automatyczne
przekierowanie językowe (tylko na `/`, tylko raz, z pominięciem robotów).

## Kluczowe mechanizmy (gdzie szukać kodu)

- **i18n**: `src/i18n/{pl,en}.json` (słownik tekstów, 119+ kluczy) +
  `src/i18n/index.ts` (routing, `pathFor`/`altPath`) + `src/i18n/meta.ts`
  (tytuły/opisy SEO per strona). Brakujący klucz i18n **rzuca ostrzeżenie
  także przy `npm run build`** (nie tylko dev) — to celowe zabezpieczenie po
  tym, jak raz strona pokazała dosłownie `studio.inhouse` zamiast tekstu.
- **Treść ustrukturyzowana** (statystyki, projekty, pola specjalizacji,
  rozdziały Showcase): `src/content/site.{pl,en}.json` i
  `src/content/showcase.{pl,en}.json`.
- **"Zasłona" (veil)** — sygnaturowy efekt marki (tytuł zakryty paskiem,
  odsłania się na hover, zdjęcie z `data-gray` wraca do kolorów): logika w
  `src/scripts/veil.ts`, atrybuty `data-hgroup`, `data-h-img`, `data-h-txt`,
  `data-h-num`, `data-rd-bar`. **Zdefiniowana w design systemie, ale przez
  długi czas była tylko częściowo wykorzystana** — sekcja "W jednej
  pracowni" po przebudowie jako pierwsza użyła `data-h-num`/`data-h-txt`.
- **Animacje wejścia (`data-reveal`)**: `src/scripts/reveal.ts`, 1:1 z
  oryginału (IntersectionObserver, próg 0.12, translateY 26px/translateX 72px).
- **"The reveal" w Showcase** (paralaksa + rozjaśnianie zdjęcia rozdziału +
  rozsuwana kreska przy przewijaniu): `src/scripts/cine.ts`. Intro z
  maszyną do pisania + blokadą pierwszego zdjęcia: `src/scripts/wr.ts` —
  **zdjęcie startuje z `opacity:0` już w SAMYM KODZIE HTML** (nie przez JS),
  żeby uniknąć mignięcia przed wykonaniem skryptu.
- **Maszyna do pisania** (strona Możliwości, cykliczne wypisywanie/kasowanie
  4 fraz): `src/scripts/typewriter.ts`.
- **Formularze**: `src/scripts/form.ts` (kontakt) — **zasada: komunikat
  "wysłano" pokazuje się WYŁĄCZNIE po prawdziwym `200 OK` z serwera**. W
  oryginale formularz ZAWSZE pokazywał sukces i kasował dane niezależnie od
  wyniku — realny błąd, który mógł kosztować zgubione zapytania klientów.
  Naprawione świadomie, opisane w `ODSTEPSTWA.md`.
- **Cookie / Consent Mode v2**: `src/components/CookieConsent.astro` +
  `src/scripts/consent.ts` + `src/components/Analytics.astro`. Zgody
  reklamowe są **odmawiane bezwarunkowo w kodzie** (nie tylko przez brak
  przełącznika w UI) — nawet "Akceptuj wszystko" nie włącza `ad_storage` itp.
- **Automatyczny język**: `src/scripts/lang.ts` — rozpoznaje kraj po strefie
  czasowej (NIE po IP — brak zależności od zewnętrznej usługi), **pomija
  wszystkie znane roboty wyszukiwarek** (Googlebot, Bingbot itd.), działa
  tylko na `/`, tylko gdy język nie był wybrany ręcznie wcześniej
  (`localStorage['stlm-lang']`).
- **Optymalizacja zdjęć**: `scripts/optimize-images.mjs` — generuje warianty
  `.sm.webp` (900px, do siatek) i `.lg.webp` (2000px, do galerii/tła) obok
  oryginałów. Uruchamia się automatycznie w `npm run build`. **Warianty SĄ
  commitowane do repo** (nie da się ich wygenerować na Vercelu bez `sharp`
  jako zależności produkcyjnej — jest jako `devDependency`, działa bo Vercel
  i tak instaluje wszystko przed buildem). Po podmianie zdjęcia źródłowego:
  `npm run images -- --force` (bez `--force` pomija istniejące pliki, bo git
  nie zachowuje dat modyfikacji, więc porównywanie dat jest bez sensu).
- **`scripts/prune-dist.mjs`**: usuwa z `dist/` oryginalne (niezoptymalizowane)
  zdjęcia po buildzie — do produkcji trafiają tylko warianty `.sm/.lg`.

## Ważne poprawki błędów z oryginału (patrz ODSTEPSTWA.md po szczegóły)

1. **Formularz kontaktowy i formularz prezentacji w oryginale NIC nie
   wysyłały** — zawsze pokazywały sukces. Naprawione.
2. **3 nagłówki w Showcase dzieliły błędnie jedno tłumaczenie PL** mimo dwóch
   różnych tekstów EN (`work.eyebrow`/`work.indexEyebrow` itd.) — rozdzielone,
   nowe teksty PL **nie zostały jeszcze zaakceptowane przez właściciela**.
3. **17 z 23 obrazów miało pusty `alt`** — uzupełnione w PL/EN.
4. **`&amp;` zamiast `&`** w części angielskich tekstów (podwójne kodowanie
   przy imporcie) — naprawione, jest skrypt `scripts/fix-entities.mjs` na
   wypadek powtórki przy kolejnym imporcie z oryginału.
5. **Ikona karty przeglądarki była białym znakiem na przezroczystym tle** —
   niewidoczna na jasnym pasku. Dodane czarne tło marki, wygenerowane przez
   `scripts/build-favicon.mjs`.
6. **Migotanie pierwszego zdjęcia Showcase** przy wejściu na stronę — zdjęcie
   miało `opacity:0.22` w kodzie, a JS dopiero je ukrywał, więc przeglądarka
   zdążyła je narysować widocznym zanim skrypt zadziałał. Naprawione przez
   przeniesienie stanu początkowego do samego HTML.
7. **`backdrop-filter: blur(14px)` na przyklejonym nagłówku** — częsta
   przyczyna szarpania przy przewijaniu. Dodano `will-change: backdrop-filter`
   i promocję do osobnej warstwy kompozycji — bez zmiany wyglądu.
8. **Atrybut `hidden` był ignorowany** w `ContactForm.astro`, bo elementy
   miały też własny inline `style="display: flex"`, który zawsze wygrywa nad
   `hidden` w kaskadzie CSS. Efekt: komunikat "Otrzymano" był widoczny od
   razu przy wejściu na stronę, a formularz nie znikał po wysłaniu (mimo że
   zgłoszenie realnie się wysyłało). Naprawione.

## Świadome odstępstwa od oryginału (na życzenie właściciela)

- **Sekcja "W jednej pracowni"** (Możliwości): w oryginale dane były
  przygotowane, ale sekcja NIE była wyświetlana. Przywrócona na prośbę
  właściciela i **przebudowana** z siatki 8 kafelków na "indeks warsztatowy"
  (numerowana lista z liniami, wykorzystująca gotowe zachowania hover z
  design systemu, których wcześniej nic nie używało).
- **Formularz prezentacji**: TYMCZASOWO sam przycisk pobrania bez podawania
  maila (zamiast formularza z adresem e-mail). Docelowo ma wrócić formularz
  wysyłający prezentację automatycznie w załączniku przez **Resend** — patrz
  sekcja "Otwarte sprawy" niżej. Licznik pobrań już działa (zdarzenie
  `deck_download` do `dataLayer`, ożyje razem z Analytics).
  Nagłówek zmieniony na "Krótka prezentacja STOLMAR" / "STOLMAR short overview".
- **Formularz kontaktowy: usunięte pole załączników.** Formspree na darmowym
  planie odrzuca przesyłki z plikami błędem "File Uploads Not Permitted" —
  zamiast pokazywać niezrozumiały błąd, pole zniknęło. Materiały klient
  wysyła bezpośrednio na `info@stolmar.co`.
- **Baner cookie: usunięta kategoria marketingowa.** Oryginał ładował Meta
  Pixel, ta wersja go nie ma (firma nie planuje kampanii reklamowych).
  Zgody reklamowe są zablokowane na stałe w kodzie (`consent.ts`), nie tylko
  brakiem przełącznika w UI.
- **Adres w stopce/danych strukturalnych: Hodowlana 7, Rumia** (adres
  fizyczny — biuro i produkcja). **Adres w polityce prywatności: Chmielewskiego
  10/1, Sopot** (adres rejestrowy, wymagany prawnie w dokumencie). To
  ŚWIADOME rozróżnienie, nie błąd — Google liczy lokalizację fizyczną w
  wynikach lokalnych, dokument prawny wymaga adresu z rejestru.
- **Strona Kontakt**: usunięte pole "Firma" i kafelki wyboru tematu (nie były
  w oryginale, dodane omyłkowo przy pierwszym podejściu, potem usunięte po
  porównaniu ze zrzutem ekranu oryginału). Lewa kolumna przesunięta w prawo
  (padding-left 96px zamiast 40px — było puste wizualnie), prawa kolumna
  (formularz) niżej (padding-top 180px zamiast 96px), pole Brief 2x wyższe
  (6 wierszy zamiast 3) — wszystko na wyraźne życzenie właściciela.

## Konfiguracja / sekrety

- **Formspree** (formularz kontaktowy): endpoint `https://formspree.io/f/mjybynvv`,
  wpisany jako wartość domyślna w `src/config.ts` (celowo — to publiczny
  endpoint widoczny i tak w kodzie strony, nie sekret). Nadpisywalny przez
  `PUBLIC_FORM_ENDPOINT`.
- **Google Analytics 4**: `G-R9FQNH7L3Z`, też jako wartość domyślna w
  `src/config.ts` (`GA_ID`), nadpisywalne przez `PUBLIC_GA_ID`. Ładuje się
  TYLKO po zgodzie w banerze cookie (Consent Mode v2).
- **Vercel Speed Insights**: zainstalowany (`@vercel/speed-insights`),
  podpięty w `src/layouts/Base.astro`. Działa tylko na Vercelu (nie lokalnie).
- `.env.example` w katalogu głównym pokazuje wszystkie zmienne środowiskowe.

## PIERWSZE, od czego zacząć w nowej sesji

**Domena `stolmar.co` JUŻ DZIAŁA (potwierdzone 2026-08-15): DNS w pełni
rozpropagowany (tylko `216.198.79.1` na ns1/ns2 cyberFolks i na 8.8.8.8),
`https://stolmar.co/` serwuje stronę poprawnie z ważnym certyfikatem SSL.
Ten etap jest zamknięty — nie trzeba już sprawdzać propagacji DNS.**

Historia (dla kontekstu): właściciel ma dostęp do DNS przez panel
**cyberFolks** (rejestrator, `ns1/ns2/ns3.cyberfolks.pl` — to serwery DNS,
nie zmieniać ich na Vercelowe, żeby nie zerwać poczty Google Workspace, która
wisi na innych rekordach w tej samej strefie). W Vercelu dodana domena
`stolmar.co` (bez `www` — celowo, to i tak kanoniczny adres wszędzie w
kodzie SEO). Rekord `A` `@` → `216.198.79.1` dodany (**UWAGA: to nie jest
uniwersalna, stała wartość Vercela — jeśli kiedyś trzeba będzie dodawać
domenę od nowa, zawsze sprawdzić aktualną wartość w Vercel → Settings →
Domains**). Po drodze wykryty i usunięty stary, zbędny drugi rekord A
(`195.78.67.67` — pusty placeholder cyberFolks).

### NIEZAŁATWIONE: `www.stolmar.co` wskazuje na STARY serwer cyberFolks

**Stan na 2026-08-15.** Rekord `A` o nazwie `www` nadal pokazuje na
`195.78.67.67` — to ten sam pusty placeholder cyberFolks (serwer LiteSpeed),
który usuwaliśmy z głównej domeny. Przy `www` został przeoczony. Skutek:

```
www.stolmar.co → 301 (stary serwer) → https://stolmar.co/pl/ → 404
```

`/pl/` nie istnieje w tej wersji strony (polska wersja jest w katalogu
głównym). **Łatka doraźna już wdrożona**: `vercel.json` ma sekcję
`redirects` przekierowującą `/pl` i `/pl/` na `/`, więc ścieżka kończy się
teraz na stronie głównej (200) zamiast na błędzie. Zweryfikowane pomiarem.

**KROK 1 ZROBIONY (2026-08-15).** W Vercelu dodana domena `www.stolmar.co`
jako **Redirect to `stolmar.co`, kod 308 (Permanent)**. Status: "Invalid
Configuration" — i tak ma być, dopóki nie zmieni się DNS.

> **UWAGA na pułapkę w oknie "Add Domains" Vercela:** po wpisaniu nazwy
> pojawia się **domyślnie ZAZNACZONY** checkbox *"Redirect apex domains to
> www (recommended)"*. To robi DOKŁADNIE ODWROTNOŚĆ tego, czego chcemy —
> przekierowałby `stolmar.co` → `www.stolmar.co`, czyli uczynił `www`
> adresem kanonicznym. Cała strona (canonical, sitemap, Schema.astro, GSC)
> jest zbudowana wokół adresu BEZ `www`. **Ten checkbox trzeba odznaczyć.**
> Domyślny typ przekierowania to też 307 (tymczasowe) — zmienić na **308
> (trwałe)**, inaczej Google nie przeniesie mocy linków na adres główny.

**KROK 2 DO ZROBIENIA — zmiana w cyberFolks (wymaga logowania właściciela):**
- **usunąć** rekord `A` o nazwie `www` → `195.78.67.67`
- **dodać** rekord podany przez Vercel:

  | Typ | Nazwa | Wartość |
  |---|---|---|
  | `CNAME` | `www` | `27ea6802181be013.vercel-dns-017.com.` |

  (odczytane z panelu Vercela 2026-08-15; gdyby trzeba było je potwierdzić:
  Vercel → projekt `website` → Settings → Domains → przy `www.stolmar.co`
  kliknąć "View DNS configuration")

**NIE ruszać innych rekordów w tej strefie** — są tam MX i SPF obsługujące
pocztę Google Workspace oraz TXT weryfikacyjny Search Console.

**Pułapka wzorców w `vercel.json`:** przy `"trailingSlash": true` Vercel
normalizuje adres PRZED dopasowaniem reguł, więc wzorzec `/pl` **nie łapie**
żądania `/pl/` — trzeba jawnie wypisać wariant z ukośnikiem. Wzorce z
parametrem (`/pl/:path+`) nadal nie łapią podstron typu `/pl/kontakt/` —
świadomie odpuszczone, bo stary serwer był pustym placeholderem i takie
adresy nigdy realnie nie istniały.

**Kolejność dalszych kroków (ustalona z właścicielem 2026-08-15) — TERAZ
JESTEŚMY TUTAJ:**
1. **Google Search Console** — właściciel ma już konto, ALE weryfikacja
   własności i wpisanie rekordu TXT to akcja, którą musi wykonać sam
   właściciel (login do jego konta Google + panel cyberFolks — Claude Code
   nie ma do nich dostępu). Poprowadź go krok po kroku po polsku. Zalecana
   metoda: **Domain property** (rekord TXT, pokrywa wszystkie subdomeny/
   protokoły) zamiast metody meta-tag. Gdy zweryfikowane: zgłosić sitemap
   `stolmar.co/sitemap-index.xml` (generowana automatycznie przy buildzie).

   **Stan 2026-08-15:** rekord TXT `google-site-verification=NnnW_2hfV4gF…`
   jest już wpisany w cyberFolks i rozpropagowany (potwierdzone na ns1, ns2
   i 8.8.8.8), obok nietkniętego SPF poczty. Pierwsza próba weryfikacji
   **nie powiodła się** — Google miał w swojej pamięci podręcznej starszą
   odpowiedź (samo SPF), ważną do 4h (TTL strefy 14400, negatywny cache
   3600). **Nie dodawać drugiego rekordu ani nie kasować istniejącego** —
   po prostu kliknąć `WERYFIKUJ` ponownie później.

   Istnieje też **stara usługa `http://stolmar.co/`** (wariant nieszyfrowany).
   Pokazuje 0 zindeksowanych stron i "brak robots.txt" — to normalne, bo
   cała treść jest na `https://`, a `http://` tylko przekierowuje (308).
   Zgłoszona tam mapa strony daje błąd "Nie udało się odczytać" z tego
   samego powodu. **Po zweryfikowaniu usługi domenowej tę starą usunąć**,
   żeby nie mylić się przy kolejnych wizytach. Sam `robots.txt` i mapa
   strony na `https://` są sprawne — sprawdzone (200, 10 adresów, PL+EN).
2. **FAQ + dane strukturalne `FAQPage`** — właściciel sam o to poprosił pod
   kątem GEO (widoczność w odpowiedziach ChatGPT/Perplexity — krótkie Q&A są
   łatwe do zacytowania przez modele językowe). **Wymaga treści od
   właściciela** — pytań i odpowiedzi klientów, nie wymyślać ich samemu.
   Wzorzec do naśladowania: `src/components/Schema.astro` (już ma
   `Organization`/`LocalBusiness`, dołożyć blok `FAQPage` tą samą metodą).
3. Reszta SEO na żywej domenie: Lighthouse, Google Rich Results Test dla
   danych strukturalnych, sprawdzenie faktycznego zaindeksowania w GSC.

## Otwarte sprawy (pozostałe, mniej pilne)

1. **Resend do maila z załącznikiem** (prezentacja PDF + docelowo może cały
   formularz kontaktowy, żeby ominąć limit Formspree na załączniki). Wymaga:
   konta na resend.com, weryfikacji domeny (rekordy DNS — dobry moment żeby
   zrobić to razem z podpięciem domeny), klucza API (**sekret — nigdy do
   repo, tylko do zmiennych środowiskowych Vercela**).
2. **Polityka prywatności wymaga akceptacji prawnika.** Wysłany dokument
   Word (`scripts/build-polityka-docx.js` generuje go na nowo z tą samą
   treścią co na stronie — uruchom ponownie po każdej zmianie treści, żeby
   wersje się nie rozjechały). Dokument ma na pierwszej stronie notę z
   konkretnymi punktami do zweryfikowania (okresy przechowywania danych,
   podstawy prawne, adres administratora, brak IOD, transfer danych do USA).
3. **3 nowe teksty PL w Showcase czekają na akceptację właściciela**
   (rozdzielone klucze `work.indexEyebrow`, `work.framesH1`,
   `work.materialsH1` — patrz punkt 2 w sekcji "Poprawki błędów" wyżej).
4. **Prezentacja PDF jest tylko po angielsku**, a przycisk pobrania jest też
   na polskiej wersji strony — właściciel wie, nie podjął jeszcze decyzji.
5. **Meta Pixel**: świadomie NIE dodany (brak planów kampanii reklamowych).
   Gdyby się to zmieniło — dodanie to ~10 minut pracy, ale wymaga też
   przywrócenia kategorii marketingowej w banerze zgód i aktualizacji
   polityki prywatności (oba miejsca są oznaczone komentarzami w kodzie).

## Jak weryfikować zmiany (ważne nawyki z tej sesji)

- **Zawsze porównuj z `_source/orig/STOLMAR Site.dc.html`** zanim uznasz coś
  za "gotowe" — kilka razy okazywało się, że coś zostało pominięte albo
  zbudowane "z głowy" zamiast przeniesione.
- **Zrzuty ekranu i nagrania od właściciela są bardzo skuteczne** do wyłapania
  różnic — jeśli je dostaniesz, porównuj piksel po pikselu, nie na wyczucie.
- Po każdej zmianie wizualnej: `npm run build` → `preview_start` z konfigiem
  `stolmar-preview` (port 4322, serwuje `dist/`) → sprawdź w przeglądarce na
  desktopie I na `resize_window preset:"mobile"` (375px) — mobile ma osobne
  reguły CSS w `src/styles/original.css`, celujące w konkretne atrybuty
  `style="..."` i klasy (np. `.stlm-bento > div`), więc **zamiana stylu
  inline na klasę CSS może po cichu wyłączyć regułę mobilną**. Uważaj na to
  przy każdej edycji sekcji przeniesionych z oryginału.
- Testy formularzy/JS rób realnymi kliknięciami (`computer` / `javascript_tool`
  z dispatchEvent), nie tylko odczytem kodu — kilka błędów (hidden/display,
  migotanie zdjęcia) było widocznych TYLKO w rzeczywistym zachowaniu, nie w
  samym kodzie źródłowym.
- **Zawsze buduj z pełnym `npm run build`** (nie tylko dev) przed commitem —
  build uruchamia też `optimize-images.mjs` i `prune-dist.mjs`, i to jedyny
  sposób, żeby złapać np. brakujące klucze i18n (ostrzeżenia lecą też przy
  buildzie, nie tylko w dev).

## Workflow z właścicielem

- Po każdej ukończonej i sprawdzonej zmianie: **commit z opisowym komunikatem
  po polsku** (bez polskich znaków w treści, jeśli piszesz przez PowerShell —
  patrz pułapki wyżej) i **`git push origin main`** — Vercel wdraża
  automatycznie, nie trzeba pytać o zgodę na push (ustalone wcześniej w tej
  rozmowie, właściciel akceptuje ten tryb pracy).
- Właściciel jest laikiem — tłumacz decyzje techniczne prostym językiem,
  prowadź go, nie zarzucaj żargonem. Dawaj konkretne rekomendacje, nie listy
  opcji bez wskazania najlepszej.
- Gdy coś jest niejasne z designu, a nie ma zrzutu/nagrania — **sprawdź
  najpierw `_source/orig/STOLMAR Site.dc.html`**, dopiero potem pytaj.
