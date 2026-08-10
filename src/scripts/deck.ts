/**
 * Formularz z prezentacją.
 *
 * Po poprawnym zapisaniu adresu:
 *  - pokazujemy komunikat z oryginału,
 *  - uruchamiamy pobieranie pliku od razu w przeglądarce.
 *
 * Pobranie na miejscu jest celowe: użytkownik dostaje prezentację natychmiast,
 * niezależnie od tego, czy e-mail dotrze i czy nie utknie w filtrze spamu.
 * Automatyczna wiadomość z załącznikiem jest dodatkiem, nie jedyną drogą.
 *
 * Tak jak w formularzu kontaktowym: komunikat sukcesu pokazujemy WYŁĄCZNIE
 * po potwierdzeniu z serwera. Błąd zostawia wpisany adres i mówi wprost,
 * że się nie udało.
 */

function download(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function init() {
  const form = document.querySelector<HTMLFormElement>('form[data-deck-form]');
  if (!form) return;

  const endpoint = form.getAttribute('action') ?? '';
  const file = form.dataset.file ?? '';
  const sentBox = document.querySelector<HTMLElement>('[data-deck-sent]');
  const errBox = document.querySelector<HTMLElement>('[data-deck-error]');
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
  const submitLabel = submit?.textContent ?? '';

  if (!endpoint.startsWith('http')) return; // brak endpointu → zachowanie natywne

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    if (submit) {
      submit.disabled = true;
      submit.textContent = form.dataset.sendingLabel ?? '...';
    }
    if (errBox) errBox.hidden = true;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) throw new Error(String(res.status));

      form.hidden = true;
      if (sentBox) {
        sentBox.hidden = false;
        sentBox.setAttribute('tabindex', '-1');
        sentBox.focus();
      }
      if (file) download(file);
    } catch {
      if (submit) {
        submit.disabled = false;
        submit.textContent = submitLabel;
      }
      if (errBox) {
        errBox.hidden = false;
        errBox.textContent = form.dataset.errorLabel ?? '';
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
