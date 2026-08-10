/**
 * Efekt maszyny do pisania na stronie Możliwości.
 * Odtworzony 1:1 z oryginału (metody _typewriter, _twStep, _twSet, _twMakeCaret).
 *
 * Przebieg: najpierw wypisuje się linia pierwsza ("Trzy dyscypliny."), potem
 * druga linia cyklicznie wypisuje i kasuje cztery frazy. Kursor to migający
 * żółty prostokąt doklejany na końcu aktualnie pisanego tekstu.
 *
 * Zachowane czasy z oryginału:
 *  - krok pętli 45 ms,
 *  - opóźnienie znaku: spacja 46 ms, znak interpunkcyjny 240 ms,
 *    pozostałe 34-100 ms losowo (stąd nierówny, „ludzki" rytm),
 *  - przytrzymanie po dopisaniu frazy 1700 ms, kasowanie 26 ms na znak,
 *    przerwa przed kolejną frazą 240 ms.
 *
 * Pętla nadrabia zaległe kroki po uśpieniu karty, żeby tekst nie „zamarzał".
 */

const CYCLES: Record<'pl' | 'en', string[]> = {
  pl: ['Jeden warsztat.', 'Każdy materiał.', 'Każda technologia.', 'Zero granic.'],
  en: ['One workshop.', 'Every material.', 'Every technology.', 'Zero limits.'],
};

type Phase = 'typeL1' | 'holdL1' | 'type' | 'hold' | 'erase';
interface State {
  phase: Phase;
  idx: number;
  ci: number;
  next: number;
}

interface Line extends HTMLElement {
  _twText?: Text | null;
  _twCaret?: HTMLElement | null;
}

function makeCaret() {
  const c = document.createElement('span');
  c.setAttribute('data-tw-caret', '1');
  c.setAttribute('aria-hidden', 'true');
  c.style.cssText =
    'display:inline-block;width:0.055em;height:0.78em;background:#EFD32B;margin-left:0.04em;vertical-align:baseline;animation:twBlink 1.05s steps(1) infinite;';
  return c;
}

/** Przepisuje pełny tekst i pilnuje, żeby kursor był ostatnim dzieckiem. */
function twSet(el: Line, str: string, caretOn: boolean) {
  let tn = el._twText;
  if (!tn || tn.parentNode !== el) {
    el.textContent = '';
    tn = document.createTextNode('');
    el.appendChild(tn);
    el._twText = tn;
    el._twCaret = null;
  }
  if (tn.nodeValue !== str) tn.nodeValue = str;

  let caret = el._twCaret;
  if (caretOn) {
    if (!caret || caret.parentNode !== el) {
      caret = makeCaret();
      el.appendChild(caret);
      el._twCaret = caret;
    } else if (el.lastChild !== caret) {
      el.appendChild(caret);
    }
  } else if (caret && caret.parentNode === el) {
    caret.remove();
    el._twCaret = null;
  }
}

function init() {
  const host = document.querySelector<HTMLElement>('[data-tw]');
  if (!host) return;
  const l1 = host.querySelector<Line>('[data-tw-line]');
  const l2 = host.querySelector<Line>('[data-tw-cycle]');
  if (!l1 || !l2) return;

  const lang = (document.documentElement.lang === 'pl' ? 'pl' : 'en') as 'pl' | 'en';
  const cyc = CYCLES[lang];
  const line1 = (l1.dataset.text || l1.textContent || '').trim();

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    twSet(l1, line1, false);
    twSet(l2, cyc[0], false);
    return;
  }

  let s: State = { phase: 'typeL1', idx: 0, ci: 0, next: 0 };

  const charDelay = (ch: string) =>
    ch === ' ' ? 46 : /[.,;:!?]/.test(ch) ? 240 : 34 + Math.random() * 66;

  const render = () => {
    if (s.phase === 'typeL1' || s.phase === 'holdL1') {
      twSet(l1, line1.slice(0, s.phase === 'typeL1' ? s.idx : line1.length), true);
      twSet(l2, '', false);
    } else {
      twSet(l1, line1, false);
      const ph = cyc[s.ci % cyc.length];
      twSet(l2, ph.slice(0, s.idx), true);
    }
  };

  const step = () => {
    const now = performance.now();
    let guard = 0;
    while (now >= s.next && guard++ < 200) {
      if (s.phase === 'typeL1') {
        if (s.idx < line1.length) {
          s.next += charDelay(line1[s.idx]);
          s.idx++;
        } else {
          s.phase = 'holdL1';
          s.next += 340;
        }
      } else if (s.phase === 'holdL1') {
        s.phase = 'type';
        s.idx = 0;
      } else if (s.phase === 'type') {
        const ph = cyc[s.ci % cyc.length];
        if (s.idx < ph.length) {
          s.next += charDelay(ph[s.idx]);
          s.idx++;
        } else {
          s.phase = 'hold';
          s.next += 1700;
        }
      } else if (s.phase === 'hold') {
        s.phase = 'erase';
      } else if (s.phase === 'erase') {
        if (s.idx > 0) {
          s.idx--;
          s.next += 26;
        } else {
          s.ci = (s.ci + 1) % cyc.length;
          s.phase = 'type';
          s.next += 240;
        }
      }
    }
    if (s.next < now) s.next = now; // po długim uśpieniu karty
    render();
  };

  window.setInterval(step, 45);
  step();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
