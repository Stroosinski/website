/**
 * Karuzela 3D sekcji produkcyjnej — przeniesiona 1:1 z ProdCoverflow.jsx.
 * Jedyne zmiany: React z importu zamiast globalnej zmiennej, eksport domyślny
 * (Astro montuje to jako wyspę), etykiety przycisków z zewnątrz dla obu języków
 * oraz warianty rozmiarowe zdjęć (.sm/.lg) zamiast oryginałów.
 *
 * Zachowane bez zmian: perspektywa 1600 px, przechylenie 12 i 6 stopni,
 * głębokość, skalowanie kadrów bocznych, odbarwienie wszystkiego poza
 * środkowym kadrem, przyciemnienie 0.45, blokada podczas przejścia 0.72 s,
 * obsługa strzałek i klik w kadr boczny przenoszący go na środek.
 */
import React from 'react';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const DUR = 0.72;
const PERSPECTIVE = 1600;
const MAX_VISIBLE_DESKTOP = 4;
const MAX_VISIBLE_MOBILE = 2;
const DEPTH = 240;
const TILT = 12;
const SIDE_TILT = 6;
const DIM = 0.45;

// 39 kadrów produkcyjnych; wariant .lg waży średnio kilkukrotnie mniej
// od oryginału, a przy tej wielkości wyświetlania różnicy nie widać.
const SLIDES = Array.from(
  { length: 39 },
  (_, i) => `/assets/imgc/prod/prod-${String(i + 1).padStart(2, '0')}.lg.webp`
);

export default function ProdCoverflow({ prevLabel = 'Previous', nextLabel = 'Next', alt = '' }) {
  const n = SLIDES.length;
  const [active, setActive] = React.useState(0);
  const [cw, setCw] = React.useState(560);
  const [maxVisible, setMaxVisible] = React.useState(MAX_VISIBLE_DESKTOP);
  const rootRef = React.useRef(null);
  const lockRef = React.useRef(false);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth || 1200;
      const h = el.clientHeight || 520;
      const mobile = w < 860;
      setMaxVisible(mobile ? MAX_VISIBLE_MOBILE : MAX_VISIBLE_DESKTOP);
      const widthFrac = mobile ? 0.73 : 0.24;
      setCw(
        Math.max(
          180,
          Math.min(Math.round(w * widthFrac), Math.round(h * (mobile ? 1.02 : 0.92) * 0.75))
        )
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const lock = React.useCallback(() => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, DUR * 660);
  }, []);

  const step = React.useCallback(
    (dir) => {
      if (lockRef.current) return;
      lock();
      setActive((a) => (((a + dir) % n) + n) % n);
    },
    [n, lock]
  );

  const onCard = React.useCallback(
    (i) => {
      if (lockRef.current) return;
      lock();
      setActive((a) => (i === a ? (a + 1) % n : i));
    },
    [n, lock]
  );

  const onKeyDown = React.useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        step(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        step(-1);
      }
    },
    [step]
  );

  const ch = Math.round((cw * 4) / 3);
  const transitionCss = `transform ${DUR}s ${EASE}, opacity ${DUR}s ${EASE}, filter ${DUR}s ${EASE}`;
  const navStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 5,
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(14,14,14,0.7)',
    border: '1px solid #2A2A2A',
    color: '#EDEDED',
    fontSize: 20,
    lineHeight: 1,
    cursor: 'pointer',
    backdropFilter: 'blur(4px)',
  };

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      data-active={active}
      role="group"
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: `${PERSPECTIVE}px`,
        overflow: 'hidden',
        outline: 'none',
      }}
    >
      <button
        type="button"
        aria-label={prevLabel}
        data-cf-prev
        onClick={() => step(-1)}
        style={{ ...navStyle, left: 'clamp(8px, 2vw, 28px)' }}
      >
        ←
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        data-cf-next
        onClick={() => step(1)}
        style={{ ...navStyle, right: 'clamp(8px, 2vw, 28px)' }}
      >
        →
      </button>

      <div style={{ position: 'relative', width: cw, height: ch, transformStyle: 'preserve-3d' }}>
        {SLIDES.map((src, i) => {
          let rel = i - active;
          if (rel > n / 2) rel -= n;
          if (rel < -n / 2) rel += n;
          const ax = Math.abs(rel);
          const visible = ax <= maxVisible;
          const isActive = rel === 0;
          const scaleStep = maxVisible > 2 ? 0.09 : 0.16;
          const sc = Math.max(0.4, 1 - ax * scaleStep);
          const tx = rel * cw * (maxVisible > 2 ? 0.5 : 0.43);
          const tz = -ax * (maxVisible > 2 ? 150 : DEPTH);
          return (
            <div
              key={i}
              onClick={() => onCard(i)}
              aria-hidden={!visible}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: cw,
                height: ch,
                overflow: 'hidden',
                border: '1px solid #222222',
                background: '#0E0E0E',
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
                transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${-rel * TILT}deg) rotateZ(${rel * SIDE_TILT}deg) scale(${sc})`,
                transition: transitionCss,
                opacity: visible ? 1 : 0,
                filter: isActive ? 'grayscale(0)' : 'grayscale(1)',
                cursor: isActive ? 'default' : 'pointer',
                pointerEvents: visible ? 'auto' : 'none',
              }}
            >
              <img
                src={src}
                alt={isActive ? alt : ''}
                draggable={false}
                decoding="async"
                loading={ax <= 2 ? 'eager' : 'lazy'}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  userSelect: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#000000',
                  opacity: isActive ? 0 : DIM,
                  transition: `opacity ${DUR}s ${EASE}`,
                  pointerEvents: 'none',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
