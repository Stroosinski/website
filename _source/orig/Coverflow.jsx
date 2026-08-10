const R = window.React;
const RATIO_CACHE = (window.__stlmRatios = window.__stlmRatios || {});

function Coverflow({ slides = [], start = 0, accent = "#EFD32B" }) {
  const [index, setIndex] = R.useState(Math.min(start, Math.max(0, slides.length - 1)));
  const [ratios, setRatios] = R.useState(RATIO_CACHE);
  const [mob, setMob] = R.useState(typeof window !== "undefined" && window.innerWidth < 860);
  R.useEffect(() => {
    const onR = () => setMob(window.innerWidth < 860);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  const isC0 = (off) => off === 0;
  const touch = R.useRef({ x: 0, y: 0 });
  const n = slides.length;
  const go = (i) => setIndex(((i % n) + n) % n);

  R.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, n]);

  const ease = "0.62s cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <div onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
      onTouchEnd={(e) => { const t = e.changedTouches[0]; const dx = t.clientX - touch.current.x; if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(t.clientY - touch.current.y)) { e.stopPropagation(); go(dx < 0 ? index + 1 : index - 1); } }}
      style={{ position: "absolute", inset: 0, overflow: "hidden", background: "transparent", perspective: "2000px", touchAction: "pan-y" }}>
      {slides.map((src, i) => {
        let off = i - index;
        if (off > n / 2) off -= n;
        if (off < -n / 2) off += n;
        const abs = Math.abs(off);
        const visible = mob ? isC0(off) : abs <= 2;
        const mounted = abs <= (mob ? 1 : 3);
        const isC = off === 0;
        return (
          <div
            key={src + i}
            onClick={(e) => { e.stopPropagation(); if (!isC) go(i); }}
            style={{
              position: "absolute", left: "50%", top: "50%",
              width: "auto", height: "auto", aspectRatio: String(ratios[src] || 1.5), maxHeight: mob ? "100%" : (isC ? "88%" : "70%"), maxWidth: mob ? "100%" : (isC ? "76%" : "60%"), width: mob ? "100%" : "auto",
              transform: mob ? "translate(-50%, -50%) translateX(" + off * 108 + "%)" : "translate(-50%, -50%) translateX(" + off * 62 + "%) translateZ(" + (isC ? 0 : -300 - abs * 110) + "px) rotateY(" + off * -28 + "deg)",
              transformStyle: "preserve-3d",
              transition: "transform " + ease + ", opacity " + ease + ", filter " + ease,
              opacity: visible ? (isC ? 1 : 0.32) : 0,
              filter: isC || mob ? "none" : "grayscale(1) brightness(0.5)",
              zIndex: 10 - abs,
              cursor: isC ? "default" : "pointer",
              pointerEvents: visible ? "auto" : "none",
              border: mob ? "0" : (isC ? "1px solid rgba(239,211,43,0.45)" : "1px solid rgba(255,255,255,0.08)"),
              boxShadow: mob ? "none" : (isC ? "0 50px 120px rgba(0,0,0,0.75)" : "0 20px 50px rgba(0,0,0,0.55)"),
              background: "#0A0A0A", overflow: "hidden"
            }}
          >
            {mounted ? <img src={src} alt="" draggable={false} loading={isC ? "eager" : "lazy"} decoding="async" fetchpriority={isC ? "high" : "low"} onLoad={(e) => { const t = e.currentTarget; if (t.naturalWidth && t.naturalHeight) if (!RATIO_CACHE[src]) { RATIO_CACHE[src] = t.naturalWidth / t.naturalHeight; setRatios((r) => Object.assign({}, r, RATIO_CACHE)); } }} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} /> : null}
          </div>
        );
      })}
      <button
        aria-label="Previous"
        onClick={(e) => { e.stopPropagation(); go(index - 1); }}
        style={{ position: "absolute", left: "clamp(16px, 3vw, 40px)", top: "50%", transform: "translateY(-50%)", zIndex: 20, width: mob ? 44 : 54, height: mob ? 44 : 54, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(10,10,10,0.7)", border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF", fontSize: 18, cursor: "pointer", fontFamily: "inherit" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = accent; e.currentTarget.style.color = "#0A0A0A"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(10,10,10,0.7)"; e.currentTarget.style.color = "#FFFFFF"; }}
      >←</button>
      <button
        aria-label="Next"
        onClick={(e) => { e.stopPropagation(); go(index + 1); }}
        style={{ position: "absolute", right: "clamp(16px, 3vw, 40px)", top: "50%", transform: "translateY(-50%)", zIndex: 20, width: mob ? 44 : 54, height: mob ? 44 : 54, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(10,10,10,0.7)", border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF", fontSize: 18, cursor: "pointer", fontFamily: "inherit" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = accent; e.currentTarget.style.color = "#0A0A0A"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(10,10,10,0.7)"; e.currentTarget.style.color = "#FFFFFF"; }}
      >→</button>
      <div style={{ position: "absolute", left: "50%", bottom: 18, transform: "translateX(-50%)", zIndex: 20, display: "flex", gap: 8, alignItems: "center" }}>
        {slides.map((src, i) => (
          <button key={"d" + i} aria-label={"Slide " + (i + 1)} onClick={(e) => { e.stopPropagation(); go(i); }}
            style={{ width: i === index ? 22 : 8, height: 2, padding: 0, border: 0, cursor: "pointer", background: i === index ? accent : "rgba(255,255,255,0.28)", transition: "width 0.42s cubic-bezier(0.16,1,0.3,1), background 0.42s ease" }} />
        ))}
      </div>
    </div>
  );
}

module.exports = { Coverflow };
window.StlmCoverflow = Coverflow;
