const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  LevelFormat, convertInchesToTwip,
} = require('docx');
const fs = require('fs');

const YELLOW = 'C9A800'; // czytelna na papierze wersja sygnalowej zolci
const INK = '1A1A1A';
const MUTED = '666666';

const p = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: opts.after ?? 140, line: 300 },
    alignment: opts.align,
    children: [new TextRun({ text, size: opts.size ?? 21, color: opts.color ?? INK, bold: opts.bold, italics: opts.italics })],
  });

const h1 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180 },
    children: [new TextRun({ text, size: 30, bold: true, color: INK })],
  });

const h2 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140 },
    children: [new TextRun({ text, size: 24, bold: true, color: INK })],
  });

const bullet = (text) =>
  new Paragraph({
    numbering: { reference: 'kropki', level: 0 },
    spacing: { after: 100, line: 300 },
    children: [new TextRun({ text, size: 21, color: INK })],
  });

const rule = () =>
  new Paragraph({
    spacing: { before: 120, after: 240 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: YELLOW } },
    children: [new TextRun({ text: '' })],
  });

// --- tabele ---
const W = 9020;
const cell = (text, { head = false, w } = {}) =>
  new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: head ? { type: ShadingType.CLEAR, fill: 'F2F2F0' } : undefined,
    margins: { top: 90, bottom: 90, left: 120, right: 120 },
    children: [
      new Paragraph({
        spacing: { after: 0, line: 280 },
        children: [new TextRun({ text, size: 19, bold: head, color: head ? MUTED : INK })],
      }),
    ],
  });

const table = (widths, rows) =>
  new Table({
    columnWidths: widths,
    width: { size: W, type: WidthType.DXA },
    rows: rows.map((cells, i) =>
      new TableRow({
        tableHeader: i === 0,
        children: cells.map((c, j) => cell(c, { head: i === 0, w: widths[j] })),
      })
    ),
  });

const doc = new Document({
  creator: 'STOLMAR',
  title: 'Polityka prywatności stolmar.co - do akceptacji',
  description: 'Projekt polityki prywatności serwisu stolmar.co przekazany do weryfikacji prawnej',
  numbering: {
    config: [
      {
        reference: 'kropki',
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: '–',
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: convertInchesToTwip(0.3), hanging: convertInchesToTwip(0.18) } } },
          },
        ],
      },
    ],
  },
  styles: {
    default: { document: { run: { font: 'Calibri', size: 21, color: INK } } },
  },
  sections: [
    {
      properties: { page: { margin: { top: 1200, bottom: 1200, left: 1200, right: 1200 } } },
      children: [
        // ---------- STRONA TYTULOWA / NOTA ----------
        p('STOLMAR Marian Czajkowski Sp. k.', { bold: true, size: 20, color: MUTED, after: 60 }),
        new Paragraph({
          spacing: { after: 60 },
          children: [new TextRun({ text: 'Polityka prywatności', size: 44, bold: true, color: INK })],
        }),
        p('serwis stolmar.co', { size: 24, color: MUTED, after: 40 }),
        p('Projekt do weryfikacji prawnej · wersja z 11 sierpnia 2026', { size: 19, color: MUTED }),
        rule(),

        h1('Nota dla osoby weryfikującej'),
        p(
          'Poniższy dokument jest projektem polityki prywatności przygotowanym na podstawie faktycznego działania serwisu stolmar.co. Każdy opisany element został sprawdzony w kodzie strony - dokument nie zawiera zapisów „na wszelki wypadek" dotyczących narzędzi, których serwis nie używa.'
        ),
        p('Prosimy o zweryfikowanie w szczególności następujących punktów:', { bold: true }),
        bullet('Okresy przechowywania danych (rozdział 5) - oszacowane na podstawie typowych przepisów, wymagają potwierdzenia z rzeczywistą praktyką firmy.'),
        bullet('Podstawy prawne przetwarzania danych z formularza kontaktowego (rozdział 2) - wskazano art. 6 ust. 1 lit. b oraz lit. f RODO.'),
        bullet('Adres administratora - podano adres rejestrowy w Sopocie, natomiast na stronie w stopce i danych kontaktowych widnieje adres zakładu w Rumi. Prosimy o potwierdzenie, że takie rozróżnienie jest prawidłowe.'),
        bullet('Brak inspektora ochrony danych - zapisano, że nie został wyznaczony. Prosimy o potwierdzenie, że firma nie ma takiego obowiązku.'),
        bullet('Przekazywanie danych poza EOG (rozdział 4) - dostawcy Formspree i Vercel mają siedziby w USA.'),

        p('Uwaga techniczna:', { bold: true, after: 80 }),
        p(
          'Serwis nie prowadzi żadnego śledzenia reklamowego - nie ma w nim Meta Pixela ani innych narzędzi pomiaru kampanii, a baner zgód nie zawiera kategorii marketingowej. Zgody reklamowe pozostają odmówione na stałe, także po kliknięciu „Akceptuj wszystko". Jeżeli firma zdecyduje się kiedyś uruchomić kampanie, dokument będzie wymagał aktualizacji.'
        ),
        p(
          'Dokument został przygotowany z pomocą narzędzia AI i nie stanowi opinii prawnej.',
          { italics: true, color: MUTED }
        ),

        new Paragraph({ children: [], pageBreakBefore: true }),

        // ---------- TRESC POLITYKI ----------
        h1('Polityka prywatności'),
        p('Ostatnia aktualizacja: 11 sierpnia 2026', { color: MUTED, size: 19 }),
        p(
          'Ta polityka wyjaśnia, jakie dane osobowe zbieramy za pośrednictwem strony stolmar.co, w jakim celu je przetwarzamy i jakie prawa Ci przysługują. Opisujemy w niej wyłącznie to, co strona faktycznie robi.'
        ),

        h2('1. Kto jest administratorem danych'),
        p('Administratorem Twoich danych osobowych jest STOLMAR Marian Czajkowski Sp. k. z siedzibą przy ul. Chmielewskiego 10/1, 81-721 Sopot, NIP PL5851483828.'),
        p('Zakład produkcyjny i biuro mieszczą się przy ul. Hodowlanej 7, 84-230 Rumia.'),
        p('Kontakt w sprawach danych osobowych: info@stolmar.co, tel. +48 505 999 275.'),
        p('Nie wyznaczyliśmy inspektora ochrony danych - w sprawach dotyczących przetwarzania danych prosimy o kontakt na powyższy adres.'),

        h2('2. Jakie dane zbieramy i po co'),
        p('Formularz kontaktowy', { bold: true, after: 80 }),
        p('Wysyłając zapytanie, przekazujesz nam: imię i nazwisko oraz adres e-mail (pola wymagane), a opcjonalnie opis projektu i załączone pliki. Zapisujemy też, z której wersji językowej wysłano zgłoszenie.'),
        p('Dane wykorzystujemy wyłącznie po to, aby odpowiedzieć na zapytanie i przygotować wycenę. Podstawą prawną jest art. 6 ust. 1 lit. b RODO (działania podejmowane na Twoje żądanie przed zawarciem umowy), a w zakresie dalszej korespondencji handlowej art. 6 ust. 1 lit. f RODO (nasz prawnie uzasadniony interes polegający na obsłudze zapytań).'),
        p('Podanie danych jest dobrowolne, ale bez adresu e-mail nie będziemy w stanie odpowiedzieć.'),

        p('Pobranie prezentacji', { bold: true, after: 80 }),
        p('Pobranie pliku PDF nie wymaga podania żadnych danych i nie wiąże się z ich zbieraniem. Jeżeli wyraziłeś zgodę na statystyki, rejestrujemy wyłącznie anonimowe zdarzenie „pobranie prezentacji", bez powiązania z osobą.'),

        p('Statystyki odwiedzin', { bold: true, after: 80 }),
        p('Jeżeli wyrazisz zgodę, korzystamy z Google Analytics 4, aby wiedzieć, które treści są przydatne i jak działa strona. Podstawą prawną jest art. 6 ust. 1 lit. a RODO (zgoda), którą możesz wycofać w każdej chwili.'),
        p('Analytics uruchamia się dopiero po wyrażeniu zgody. Do tego czasu narzędzie nie zapisuje w Twojej przeglądarce żadnych identyfikatorów. Adres IP jest skracany (anonimizacja), a dane reklamowe są ograniczane.'),

        p('Serwer', { bold: true, after: 80 }),
        p('Strona działa w infrastrukturze dostawcy hostingu, który - jak każdy serwer - zapisuje techniczne logi dostępu (adres IP, data zapytania, typ przeglądarki). Służą one bezpieczeństwu i diagnostyce. Podstawą jest art. 6 ust. 1 lit. f RODO.'),

        h2('3. Pliki cookie i pamięć przeglądarki'),
        p('Strona nie używa własnych plików cookie do śledzenia. Zapisujemy natomiast dwie informacje w pamięci Twojej przeglądarki (localStorage), żeby uszanować Twoje decyzje:'),
        table([2200, 4400, 2420], [
          ['Nazwa', 'Do czego służy', 'Jak długo'],
          ['stlm-consent', 'Zapamiętuje Twój wybór dotyczący zgód, żeby nie pytać przy każdej wizycie', 'Do czasu wyczyszczenia danych przeglądarki'],
          ['stlm-lang', 'Zapamiętuje ręcznie wybraną wersję językową', 'Do czasu wyczyszczenia danych przeglądarki'],
        ]),
        p('', { after: 160 }),
        p('Te dane pozostają w Twojej przeglądarce i nie są nam przesyłane. Bez nich strona nie mogłaby zapamiętać, że nie chcesz statystyk - dlatego są niezbędne i nie wymagają zgody.'),
        p('Po wyrażeniu zgody Google Analytics zapisuje własne pliki cookie, służące odróżnianiu wizyt. Zgodę możesz zmienić w dowolnym momencie przez odsyłacz „Ustawienia cookie" w stopce strony.'),
        p('Nie prowadzimy śledzenia reklamowego. Serwis nie korzysta z pikseli reklamowych ani narzędzi pomiaru kampanii - nie zbieramy danych na potrzeby remarketingu i nie budujemy grup odbiorców. Gdyby to się kiedyś zmieniło, zaktualizujemy tę politykę, a takie narzędzia uruchomią się wyłącznie po uzyskaniu odrębnej zgody.'),

        h2('4. Komu przekazujemy dane'),
        p('Korzystamy z zewnętrznych dostawców, którzy przetwarzają dane na nasze zlecenie:'),
        table([2600, 4200, 2220], [
          ['Dostawca', 'Rola', 'Lokalizacja'],
          ['Formspree, Inc.', 'Przekazanie zgłoszeń z formularza na naszą skrzynkę', 'Stany Zjednoczone'],
          ['Vercel, Inc.', 'Hosting strony', 'Stany Zjednoczone / UE'],
          ['Google Ireland Limited', 'Statystyki odwiedzin (tylko po zgodzie)', 'Irlandia'],
        ]),
        p('', { after: 160 }),
        p('Część dostawców ma siedzibę poza Europejskim Obszarem Gospodarczym. Przekazanie danych odbywa się na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję Europejską lub programu Data Privacy Framework.'),
        p('Danych nie sprzedajemy i nie udostępniamy w celach marketingowych podmiotom trzecim.'),

        h2('5. Jak długo przechowujemy dane'),
        bullet('Korespondencja z formularza - przez czas prowadzenia rozmów, a po ich zakończeniu przez okres przedawnienia ewentualnych roszczeń, nie dłużej niż 3 lata.'),
        bullet('Dokumentacja zrealizowanych zleceń - przez okres wymagany przepisami podatkowymi i rachunkowymi (5 lat od końca roku podatkowego).'),
        bullet('Dane statystyczne - zgodnie z ustawieniami Google Analytics, maksymalnie 14 miesięcy.'),
        bullet('Logi serwera - krótkoterminowo, do celów bezpieczeństwa i diagnostyki.'),

        h2('6. Twoje prawa'),
        p('W związku z przetwarzaniem danych masz prawo do:'),
        bullet('dostępu do swoich danych i otrzymania ich kopii,'),
        bullet('sprostowania danych nieprawidłowych lub niekompletnych,'),
        bullet('usunięcia danych („prawo do bycia zapomnianym"),'),
        bullet('ograniczenia przetwarzania,'),
        bullet('przenoszenia danych do innego administratora,'),
        bullet('wniesienia sprzeciwu wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie,'),
        bullet('wycofania zgody w dowolnym momencie - bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej wycofaniem.'),
        p('Aby skorzystać z tych praw, napisz na info@stolmar.co. Odpowiadamy bez zbędnej zwłoki, najpóźniej w ciągu miesiąca.'),
        p('Masz również prawo wnieść skargę do organu nadzorczego: Prezes Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.'),

        h2('7. Zautomatyzowane decyzje'),
        p('Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na automatycznym przetwarzaniu i nie stosujemy profilowania wywołującego skutki prawne.'),

        h2('8. Zmiany polityki'),
        p('Jeżeli zmienimy sposób przetwarzania danych albo dodamy nowe narzędzia, zaktualizujemy ten dokument i zmienimy datę na górze strony. W przypadku zmian istotnych poprosimy o zgodę ponownie.'),

        rule(),
        p('Wersja angielska tego dokumentu jest opublikowana pod adresem stolmar.co/en/privacy-policy/ i stanowi tłumaczenie powyższej treści.', { size: 19, color: MUTED, italics: true }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  const out = process.argv[2] || 'Polityka prywatnosci STOLMAR.docx';
  fs.writeFileSync(out, buf);
  console.log('zapisano:', out, '-', (buf.length / 1024).toFixed(1), 'KB');
});
