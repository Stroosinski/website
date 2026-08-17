/**
 * Wysyłka formularza do Formspree bez przeładowania strony.
 *
 * ZASADA NADRZĘDNA: komunikat "wysłano" pokazujemy WYŁĄCZNIE po potwierdzeniu
 * z serwera. W oryginale strony formularz zawsze pokazywał sukces i kasował
 * dane, przez co zapytania ofertowe przepadały. Tutaj błąd sieci lub odrzucenie
 * przez serwis kończy się widocznym komunikatem o błędzie i danymi zachowanymi
 * w polach, żeby dało się wysłać ponownie albo napisać e-mailem.
 *
 * Bez JavaScriptu formularz nadal działa: wysyła się zwykłym POST-em, a Formspree
 * pokazuje własną stronę potwierdzenia.
 */

type Status = 'idle' | 'sending' | 'sent' | 'error';

function init() {
  const form = document.querySelector<HTMLFormElement>('form[data-contact-form]');
  if (!form) return;

  const endpoint = form.getAttribute('action') ?? '';
  if (!endpoint.startsWith('http')) return; // brak endpointu → zostawiamy zachowanie natywne

  const sentBox = document.querySelector<HTMLElement>('[data-form-sent]');
  const errBox = document.querySelector<HTMLElement>('[data-form-error]');
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
  const submitLabel = submit?.textContent ?? '';

  function setStatus(status: Status, message?: string) {
    if (submit) {
      submit.disabled = status === 'sending';
      submit.textContent =
        status === 'sending' ? (form!.dataset.sendingLabel ?? '...') : submitLabel;
    }
    if (errBox) {
      errBox.hidden = status !== 'error';
      if (status === 'error' && message) errBox.textContent = message;
    }
    if (status === 'sent') {
      form!.hidden = true;
      if (sentBox) {
        sentBox.hidden = false;
        sentBox.setAttribute('tabindex', '-1');
        sentBox.focus();
      }
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('sent');
        return;
      }

      // Formspree zwraca { errors: [{ message, field }] } albo { error: "..." }
      let message = form.dataset.errorLabel ?? '';
      try {
        const data = await res.json();
        const detail =
          (Array.isArray(data?.errors) && data.errors.map((x: any) => x.message).join(' · ')) ||
          data?.error;
        if (detail) message = `${message} (${detail})`;
      } catch {
        /* odpowiedź bez JSON-a - zostaje komunikat ogólny */
      }
      setStatus('error', message);
    } catch {
      setStatus('error', form.dataset.offlineLabel ?? form.dataset.errorLabel ?? '');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
