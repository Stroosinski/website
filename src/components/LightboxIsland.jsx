/**
 * Galeria pełnoekranowa z karuzelą Coverflow.
 * Powłoka odtworzona z oryginału (linie 490-506): przyciemnienie z rozmyciem,
 * panel na całe okno, żółty przycisk zamknięcia w prawym górnym rogu,
 * tytuł i lokalizacja w lewym dolnym rogu.
 *
 * Otwiera się zdarzeniem `stlm:lightbox-open` wysyłanym po kliknięciu kafla -
 * dzięki temu kafle pozostają zwykłym HTML-em widocznym dla wyszukiwarek,
 * a React montuje się tylko na potrzeby samej galerii.
 */
import React from 'react';
import Coverflow from './Coverflow.jsx';

export default function LightboxIsland({
  closeLabel = 'Close',
  prevLabel = 'Previous',
  nextLabel = 'Next',
  slideLabel = 'Slide',
}) {
  const [state, setState] = React.useState(null); // { imgs, title, loc }

  React.useEffect(() => {
    const onOpen = (e) => setState(e.detail);
    window.addEventListener('stlm:lightbox-open', onOpen);
    return () => window.removeEventListener('stlm:lightbox-open', onOpen);
  }, []);

  const close = React.useCallback(() => setState(null), []);

  /**
   * Blokada przewijania tła Z ZACHOWANIEM POZYCJI.
   *
   * Reguła `body.stlm-lb-on` ustawia `position: fixed` (przeniesiona 1:1
   * z oryginału). To wyjmuje stronę z normalnego układu, więc przeglądarka
   * traktuje ją jak przewiniętą na sam początek. Efekt: po zamknięciu
   * galerii użytkownik lądował na górze strony i musiał od nowa szukać
   * miejsca, w którym przeglądał realizacje. Ten sam błąd ma oryginał.
   *
   * Naprawa: przed zablokowaniem zapamiętujemy pozycję i przesuwamy `body`
   * w górę o dokładnie tę samą wartość (`top: -Ypx`). Dzięki temu kadr nie
   * drgnie ANI przy otwieraniu - a to widać, bo nakładka rozjaśnia się
   * przez 0,32 s i tło jest przez ten czas jeszcze widoczne - ani przy
   * zamykaniu, gdzie przywracamy zapamiętaną pozycję.
   */
  React.useEffect(() => {
    if (!state) {
      document.body.classList.remove('stlm-lb-on');
      return;
    }

    const y = window.scrollY;
    document.body.style.top = `-${y}px`;
    document.body.classList.add('stlm-lb-on');

    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('stlm-lb-on');
      document.body.style.top = '';
      // Musi być po zdjęciu `position: fixed`, inaczej nie ma czego przewijać.
      window.scrollTo(0, y);
    };
  }, [state, close]);

  if (!state) return null;

  return (
    <div
      className="stlm-lb-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={state.title || 'Galeria'}
      onClick={close}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(5,5,5,0.975)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        animation: 'stlm-lb-fade-in 0.32s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      <div
        className="stlm-lb-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          animation: 'stlm-lb-pop-in 0.56s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        <div style={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <Coverflow
            slides={state.imgs}
            start={0}
            prevLabel={prevLabel}
            nextLabel={nextLabel}
            slideLabel={slideLabel}
          />
        </div>

        <div
          style={{
            flex: '0 0 auto',
            minHeight: 92,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            padding: '22px clamp(24px, 4vw, 56px) 30px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
                marginBottom: 4,
              }}
            >
              {state.title}
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--signal-yellow, #EFD32B)',
              }}
            >
              {state.loc}
            </div>
          </div>
        </div>

        <button
          onClick={close}
          aria-label={closeLabel}
          style={{
            position: 'absolute',
            right: 'clamp(16px, 3vw, 34px)',
            top: 'clamp(16px, 3vw, 34px)',
            width: 44,
            height: 44,
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontFamily: 'inherit',
            color: '#0A0A0A',
            background: 'var(--signal-yellow, #EFD32B)',
            border: 0,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
