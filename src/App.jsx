import { useState, useEffect, useRef } from "react";

const fullMenuData = [
  {
    category: "ZESTAWY",
    icon: "🍱",
    items: [
      { name: "Talerz Mały", desc: "ok. 16 szt. — tosty, quesadille, krakersy, bagietki", price: "150 zł", emoji: "🥢" },
      { name: "Talerz Duży", desc: "ok. 28 szt. — pełny przekrój wszystkich przekąsek", price: "250 zł", emoji: "🍽️" },
      { name: "Talerz Sushi", desc: "ok. 20 szt. — maki, nigiri, uramaki", price: "180 zł", emoji: "🍣" },
      { name: "Talerz Mix", desc: "ok. 24 szt. — sushi + przekąski fusion", price: "210 zł", emoji: "🎌" },
    ],
  },
  {
    category: "ROLKI SUSHI",
    icon: "🍣",
    items: [
      { name: "Maki Łosoś", desc: "6 szt. — ryż, nori, świeży łosoś", price: "28 zł", emoji: "🐟" },
      { name: "Maki Tuńczyk", desc: "6 szt. — ryż, nori, tuńczyk bluefin", price: "32 zł", emoji: "🔴" },
      { name: "Uramaki Avocado", desc: "8 szt. — ryż na zewnątrz, awokado, ogórek", price: "34 zł", emoji: "🥑" },
      { name: "Uramaki Krewetka", desc: "8 szt. — krewetka tempura, majonez wasabi", price: "38 zł", emoji: "🦐" },
      { name: "Dragon Roll", desc: "8 szt. — węgorz, awokado, ogórek, sos eel", price: "44 zł", emoji: "🐉" },
      { name: "Rainbow Roll", desc: "8 szt. — 5 rodzajów ryb na wierzchu", price: "52 zł", emoji: "🌈" },
    ],
  },
  {
    category: "PRZEKĄSKI",
    icon: "🥗",
    items: [
      { name: "Tosty z szynką", desc: "3 szt. — chleb japoński, szynka, sos miso", price: "22 zł", emoji: "🍞" },
      { name: "Quesadilla z kurczakiem", desc: "2 szt. — kurczak teriyaki, warzywa, ser", price: "26 zł", emoji: "🌮" },
      { name: "Krakersy z tatarem", desc: "4 szt. — tatar z łososia, kapary, koper", price: "30 zł", emoji: "🫙" },
      { name: "Bagietki z krewetką", desc: "2 szt. — krewetka, guacamole, limonka", price: "28 zł", emoji: "🥖" },
      { name: "Chipsy z batata", desc: "Porcja — z sosem sriracha mayo", price: "18 zł", emoji: "🍠" },
      { name: "Cukinia z serkiem", desc: "2 szt. — salsa paprykowa, zioła", price: "20 zł", emoji: "🥒" },
    ],
  },
  {
    category: "DESERY",
    icon: "🍮",
    items: [
      { name: "Mochi Truskawka", desc: "3 szt. — ryżowe kulki z nadzieniem", price: "22 zł", emoji: "🍓" },
      { name: "Mochi Matcha", desc: "3 szt. — herbata matcha, kremowe wnętrze", price: "22 zł", emoji: "🍵" },
      { name: "Dorayaki", desc: "2 szt. — japońskie naleśniki z pastą anko", price: "18 zł", emoji: "🥞" },
      { name: "Taiyaki", desc: "1 szt. — wafle w kształcie ryby, krem waniliowy", price: "16 zł", emoji: "🐠" },
      { name: "Lody Sezam", desc: "Gałka — czarny sezam, posypka mochi", price: "14 zł", emoji: "🍨" },
    ],
  },
  {
    category: "NAPOJE",
    icon: "🍵",
    items: [
      { name: "Matcha Latte", desc: "Klasyczne lub na mleku owsianym", price: "16 zł", emoji: "🍵" },
      { name: "Ramune Melon", desc: "Japońska lemoniada z kulką", price: "12 zł", emoji: "🫧" },
      { name: "Woda Gazowana", desc: "Butelka 500ml", price: "8 zł", emoji: "💧" },
      { name: "Sok Yuzu", desc: "Świeżo wyciskany, lód, mięta", price: "14 zł", emoji: "🍋" },
      { name: "Herbata Sencha", desc: "Czajniczek 400ml, japońska zielona", price: "12 zł", emoji: "🫖" },
    ],
  },
  {
    category: "DRINKI",
    icon: "🍹",
    items: [
      { name: "Sakura Spritz", desc: "Sake, woda różana, grapefruit, tonic", price: "32 zł", emoji: "🌸" },
      { name: "Yuzu Mule", desc: "Wódka, yuzu, imbir, limonka", price: "34 zł", emoji: "🍸" },
      { name: "Matcha Sour", desc: "Gin, matcha, sok z cytryny, aquafaba", price: "36 zł", emoji: "🟢" },
      { name: "Tokyo Sunset", desc: "Whisky japońska, sake, pomarańcza", price: "38 zł", emoji: "🌅" },
      { name: "Sake Tradycyjne", desc: "50ml — zimne lub podgrzewane", price: "22 zł", emoji: "🍶" },
      { name: "Piwo Sapporo", desc: "330ml — japońskie premium", price: "18 zł", emoji: "🍺" },
    ],
  },
];

const menuData = [
  {
    category: "TALERZ MAŁY", subtitle: "ok. 16 szt.", price: "150 zł", emoji: "🥢",
    items: ["3 tosty z szynką","2 quesadille z kurczakiem i warzywami","2 krakersy z tatarem z łososia i kaparami","2 krakersy z pastą z łososia i oliwkami","2 bagietki z kurczakiem i pastą miso","2 bagietki z krewetką i guacamole","Chipsy z batata","2 cukinie z serkiem i salsą paprykową"],
  },
  {
    category: "TALERZ DUŻY", subtitle: "ok. 28 szt.", price: "250 zł", emoji: "🍱",
    items: ["5 tostów z szynką","4 quesadille z kurczakiem i warzywami","4 krakersy z tatarem z łososia","4 krakersy z pastą z łososia","4 bagietki z kurczakiem i pastą miso","4 bagietki z krewetką i guacamole","Chipsy z batata","3 cukinie z serkiem i salsą paprykową"],
  },
  {
    category: "TALERZ SUSHI", subtitle: "ok. 20 szt.", price: "180 zł", emoji: "🍣",
    items: ["6 rolek maki z łososiem","4 nigiri z tuńczykiem","4 nigiri z łososiem","4 uramaki z awokado i krewetką","Imbir marynowany","Wasabi","Sos sojowy"],
  },
];

const useIntersection = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useIntersection();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
};

// ─── Shared card content ───────────────────────────────────────────────────
const CardContent = ({ item, lm }) => (
  <div style={{ width: "100%", padding: "3rem", position: "relative", boxSizing: "border-box" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #d4af59, transparent)" }} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "2rem" }}>
      <div style={{ fontSize: "6rem", lineHeight: 1, marginBottom: "1.5rem", filter: "drop-shadow(0 0 28px rgba(212,175,89,0.5))" }}>{item.emoji}</div>
      <div style={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: lm ? "#6b3200" : "#d4af59", marginBottom: "0.5rem", fontFamily: "'Cinzel', serif" }}>{item.subtitle}</div>
      <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.4rem, 4vw, 2.2rem)", color: lm ? "#1a0800" : "#f5e6c8", margin: "0 0 0.6rem", letterSpacing: "0.1em" }}>{item.category}</h3>
      <div style={{ fontFamily: "'Cinzel', serif", fontSize: "2.2rem", color: lm ? "#6b3200" : "#d4af59", fontWeight: "700" }}>{item.price}</div>
    </div>
    <div style={{ width: "80px", height: "1px", background: `linear-gradient(90deg, transparent, ${lm ? "#8b4200" : "#d4af59"}, transparent)`, margin: "0 auto 2rem" }} />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 2rem" }}>
      {item.items.map((it, idx) => (
        <div key={idx} style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", color: lm ? "#2a1000" : "rgba(245,230,200,0.8)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", lineHeight: 1.6 }}>
          <span style={{ color: lm ? "#8b4200" : "#d4af59", fontSize: "0.4rem", flexShrink: 0 }}>◆</span>
          {it}
        </div>
      ))}
    </div>
  </div>
);

// ─── Shared nav dots ────────────────────────────────────────────────────────
const ArcNav = ({ current, total, goTo, lm, onPrev, onNext }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", marginTop: "2.5rem" }}>
    <button className="c-arrow" onClick={onPrev} aria-label="Poprzedni">
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={lm ? "#6b3200" : "#d4af59"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
    <div style={{ position: "relative", width: "130px", height: "60px" }}>
      <svg width="130" height="60" viewBox="0 0 130 60" style={{ position: "absolute", inset: 0 }}>
        <path d="M 10 56 Q 65 -8 120 56" fill="none" stroke={lm ? "rgba(60,20,0,0.2)" : "rgba(212,175,89,0.2)"} strokeWidth="1.5" strokeDasharray="4 4"/>
      </svg>
      {Array.from({ length: total }).map((_, i) => {
        const angle = (Math.PI / (total - 1)) * i;
        const cx = 10 + (120 - 10) * (i / (total - 1));
        const cy = 56 - Math.sin(angle) * 48;
        const isActive = i === current;
        return (
          <button key={i} className="c-dot" onClick={() => goTo(i, i > current ? 1 : -1)}
            style={{ position: "absolute", left: `${cx - (isActive ? 11 : 7)}px`, top: `${cy - (isActive ? 11 : 7)}px`, width: isActive ? "22px" : "14px", height: isActive ? "22px" : "14px", background: isActive ? "linear-gradient(135deg, #ffe066, #d4af59)" : (lm ? "rgba(60,20,0,0.3)" : "rgba(212,175,89,0.3)"), boxShadow: isActive ? "0 0 0 3px rgba(212,175,89,0.2), 0 0 18px rgba(212,175,89,0.5)" : "none", border: "none", cursor: "pointer", borderRadius: "50%", padding: 0, transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
            aria-label={menuData[i].category}
          />
        );
      })}
    </div>
    <button className="c-arrow" onClick={onNext} aria-label="Następny">
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke={lm ? "#6b3200" : "#d4af59"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  </div>
);

const carouselSharedCSS = `
  .c-arrow { background: transparent; border: 1px solid rgba(212,175,89,0.35); cursor: pointer; border-radius: 50%; width:48px; height:48px; display:flex; align-items:center; justify-content:center; transition: all 0.3s; flex-shrink:0; }
  .c-arrow:hover { border-color: #d4af59; background: rgba(212,175,89,0.1); transform: scale(1.08); }
  .c-arrow:active { transform: scale(0.95); }
  .c-dot:hover { transform: scale(1.3) !important; }
  .c-counter { text-align:center; margin-top:1rem; font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.3em; }
`;

const cardBaseStyle = (lm) => ({
  position: "absolute", inset: 0,
  background: lm ? "rgba(40,15,0,0.14)" : "rgba(255,255,255,0.05)",
  border: lm ? "1px solid rgba(60,20,0,0.38)" : "1px solid rgba(212,175,89,0.22)",
  borderRadius: "4px",
  overflow: "hidden",
  willChange: "transform, opacity",
});

// ═══════════════════════════════════════════════════════════════
// WERSJA A — Flip 3D (obrót jak fizyczna kartka)
// ═══════════════════════════════════════════════════════════════
const MenuCarouselFlip = ({ lightMode }) => {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [dir, setDir] = useState(1);
  const total = menuData.length;
  const lm = lightMode;

  const goTo = (idx, d) => {
    if (flipping || idx === current) return;
    setDir(d);
    setFlipping(true);
    setTimeout(() => { setCurrent(idx); setFlipping(false); }, 600);
  };

  return (
    <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto" }}>
      <style>{`
        ${carouselSharedCSS}
        @keyframes flipOut { 0%{transform:perspective(900px) rotateY(0deg);opacity:1} 100%{transform:perspective(900px) rotateY(${dir > 0 ? "-90deg" : "90deg"});opacity:0.2} }
        @keyframes flipIn  { 0%{transform:perspective(900px) rotateY(${dir > 0 ? "90deg" : "-90deg"});opacity:0.2} 100%{transform:perspective(900px) rotateY(0deg);opacity:1} }
        .flip-out { animation: flipOut 0.3s cubic-bezier(0.55,0,1,0.45) forwards; }
        .flip-in  { animation: flipIn  0.35s cubic-bezier(0,0.55,0.45,1) 0.3s both; }
      `}</style>
      <div style={{ position: "relative", minHeight: "460px", perspective: "900px" }}>
        <div key={`${current}-${flipping}`} className={flipping ? "flip-out" : "flip-in"} style={{ ...cardBaseStyle(lm) }}>
          <CardContent item={menuData[current]} lm={lm} />
        </div>
      </div>
      <ArcNav current={current} total={total} goTo={goTo} lm={lm}
        onPrev={() => goTo((current - 1 + total) % total, -1)}
        onNext={() => goTo((current + 1) % total, 1)} />
      <div className="c-counter" style={{ color: lm ? "rgba(60,20,0,0.4)" : "rgba(212,175,89,0.4)" }}>{current + 1} / {total}</div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// WERSJA B — Curtain (złota zasłona przesuwa się i odkrywa)
// ═══════════════════════════════════════════════════════════════
const MenuCarouselCurtain = ({ lightMode }) => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null);
  const [phase, setPhase] = useState("idle"); // idle | closing | opening
  const [dir, setDir] = useState(1);
  const total = menuData.length;
  const lm = lightMode;

  const goTo = (idx, d) => {
    if (phase !== "idle" || idx === current) return;
    setDir(d);
    setNext(idx);
    setPhase("closing");
    setTimeout(() => {
      setCurrent(idx);
      setNext(null);
      setPhase("opening");
      setTimeout(() => setPhase("idle"), 450);
    }, 380);
  };

  // Curtain position: covers full width when closing, reveals when opening
  const curtainX = phase === "closing"
    ? (dir > 0 ? "0%" : "0%")
    : phase === "opening" ? (dir > 0 ? "100%" : "-100%") : (dir > 0 ? "-100%" : "100%");

  const curtainTransition = phase === "closing"
    ? "transform 0.38s cubic-bezier(0.76,0,0.24,1)"
    : phase === "opening"
    ? "transform 0.45s cubic-bezier(0.16,1,0.3,1)"
    : "none";

  const curtainStart = phase === "closing"
    ? (dir > 0 ? "-100%" : "100%")
    : undefined;

  return (
    <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto" }}>
      <style>{`${carouselSharedCSS}`}</style>
      <div style={{ position: "relative", minHeight: "460px", overflow: "hidden", borderRadius: "4px" }}>
        {/* Static card underneath */}
        <div style={{ ...cardBaseStyle(lm) }}>
          <CardContent item={menuData[current]} lm={lm} />
        </div>
        {/* Gold curtain overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          background: `linear-gradient(135deg, #1a1002, #2a1e05, #d4af59 50%, #2a1e05, #1a1002)`,
          transform: phase === "idle"
            ? (dir > 0 ? "translateX(-100%)" : "translateX(100%)")
            : phase === "closing"
            ? "translateX(0%)"
            : (dir > 0 ? "translateX(100%)" : "translateX(-100%)"),
          transition: phase === "idle" ? "none" : `transform ${phase === "closing" ? "0.38s" : "0.45s"} cubic-bezier(${phase === "closing" ? "0.76,0,0.24,1" : "0.16,1,0.3,1"})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.5rem", letterSpacing: "0.4em", color: "rgba(255,230,150,0.6)", textShadow: "0 0 30px rgba(212,175,89,0.8)" }}>✦</div>
        </div>
      </div>
      <ArcNav current={current} total={total} goTo={goTo} lm={lm}
        onPrev={() => goTo((current - 1 + total) % total, -1)}
        onNext={() => goTo((current + 1) % total, 1)} />
      <div className="c-counter" style={{ color: lm ? "rgba(60,20,0,0.4)" : "rgba(212,175,89,0.4)" }}>{current + 1} / {total}</div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// WERSJA C — Zoom blur (stara odpływa w dal, nowa przylatuje)
// ═══════════════════════════════════════════════════════════════
const MenuCarouselZoom = ({ lightMode }) => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [phase, setPhase] = useState("idle");
  const [dir, setDir] = useState(1);
  const total = menuData.length;
  const lm = lightMode;

  const goTo = (idx, d) => {
    if (phase !== "idle" || idx === current) return;
    setDir(d);
    setPrev(current);
    setPhase("out");
    setTimeout(() => {
      setCurrent(idx);
      setPhase("in");
      setTimeout(() => { setPrev(null); setPhase("idle"); }, 500);
    }, 280);
  };

  return (
    <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto" }}>
      <style>{`
        ${carouselSharedCSS}
        @keyframes zoomFadeOut { 0%{transform:scale(1);opacity:1;filter:blur(0px)} 100%{transform:scale(1.18);opacity:0;filter:blur(8px)} }
        @keyframes zoomFadeIn  { 0%{transform:scale(0.82);opacity:0;filter:blur(8px)} 100%{transform:scale(1);opacity:1;filter:blur(0px)} }
        .zoom-out { animation: zoomFadeOut 0.28s cubic-bezier(0.55,0,1,0.45) forwards; }
        .zoom-in  { animation: zoomFadeIn  0.5s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>
      <div style={{ position: "relative", minHeight: "460px", overflow: "hidden", borderRadius: "4px" }}>
        {prev !== null && (
          <div className="zoom-out" style={{ ...cardBaseStyle(lm) }}>
            <CardContent item={menuData[prev]} lm={lm} />
          </div>
        )}
        <div key={current} className={phase === "in" || phase === "idle" ? "zoom-in" : ""} style={{ ...cardBaseStyle(lm), animationPlayState: phase === "idle" && prev === null ? "paused" : "running" }}>
          <CardContent item={menuData[current]} lm={lm} />
        </div>
      </div>
      <ArcNav current={current} total={total} goTo={goTo} lm={lm}
        onPrev={() => goTo((current - 1 + total) % total, -1)}
        onNext={() => goTo((current + 1) % total, 1)} />
      <div className="c-counter" style={{ color: lm ? "rgba(60,20,0,0.4)" : "rgba(212,175,89,0.4)" }}>{current + 1} / {total}</div>
    </div>
  );
};

const MenuCarousel = ({ lightMode, t }) => {
  // LEGACY — not used, kept for reference
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [dir, setDir] = useState(1);
  const [phase, setPhase] = useState("idle");
  const total = menuData.length;
  const lm = lightMode;

  const goTo = (idx, d) => {
    if (phase !== "idle" || idx === current) return;
    setDir(d);
    setPrev(current);
    setPhase("out");
    // After exit anim, swap and play enter
    setTimeout(() => {
      setCurrent(idx);
      setPhase("in");
      setTimeout(() => {
        setPrev(null);
        setPhase("idle");
      }, 550);
    }, 350);
  };

  const next = () => goTo((current + 1) % total, 1);
  const goBack = () => goTo((current - 1 + total) % total, -1);

  // CSS for outgoing card
  const outStyle = phase === "out" ? {
    transform: dir > 0 ? "translateX(-100%) scale(0.85)" : "translateX(100%) scale(0.85)",
    opacity: 0,
    transition: "transform 0.35s cubic-bezier(0.55,0,1,0.45), opacity 0.35s ease",
  } : {};

  // CSS for incoming card — starts off-screen then slides in
  const inStyle = phase === "in" ? {
    transform: "translateX(0) scale(1)",
    opacity: 1,
    transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease",
  } : phase === "out" ? {
    // pre-position the incoming card off screen (no transition yet)
    transform: dir > 0 ? "translateX(100%) scale(0.9)" : "translateX(-100%) scale(0.9)",
    opacity: 0,
    transition: "none",
  } : {};

  const cardBase = {
    position: "absolute", inset: 0,
    background: lm ? "rgba(40,15,0,0.14)" : "rgba(255,255,255,0.05)",
    border: lm ? "1px solid rgba(60,20,0,0.38)" : "1px solid rgba(212,175,89,0.22)",
    borderRadius: "4px",
    willChange: "transform, opacity",
  };

  return (
    <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto" }}>
      <style>{`
        .arrow-btn { background: transparent; border: 1px solid rgba(212,175,89,0.35); cursor: pointer; border-radius: 50%; width:48px; height:48px; display:flex; align-items:center; justify-content:center; transition: all 0.3s; flex-shrink:0; }
        .arrow-btn:hover { border-color: #d4af59; background: rgba(212,175,89,0.1); transform: scale(1.08); }
        .arrow-btn:active { transform: scale(0.95); }
        .dot-btn { border: none; cursor: pointer; border-radius: 50%; transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s, box-shadow 0.3s, width 0.3s, height 0.3s; padding:0; }
        .dot-btn:hover { transform: scale(1.3) !important; }
        @keyframes emojiPop { 0%{transform:scale(0.5) rotate(-15deg);opacity:0} 60%{transform:scale(1.15) rotate(5deg);opacity:1} 100%{transform:scale(1) rotate(0deg);opacity:1} }
        .emoji-pop { animation: emojiPop 0.55s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes goldGlow { 0%,100%{filter:drop-shadow(0 0 12px rgba(212,175,89,0.3))} 50%{filter:drop-shadow(0 0 30px rgba(212,175,89,0.7))} }
        .emoji-glow { animation: goldGlow 2.5s ease-in-out infinite; }
      `}</style>

      {/* TRACK */}
      <div style={{ position: "relative", minHeight: "460px", overflow: "hidden", borderRadius: "4px" }}>

        {/* Outgoing card (prev) */}
        {prev !== null && (
          <div style={{ ...cardBase, ...outStyle }}>
            <CarouselSlide item={menuData[prev]} lm={lm} />
          </div>
        )}

        {/* Current card */}
        <div style={{ ...cardBase, ...(phase === "idle" ? {} : inStyle) }}>
          <div style={{ width: "100%", padding: "3rem", position: "relative", overflow: "hidden", boxSizing: "border-box" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #d4af59, transparent)" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "2rem" }}>
              <div key={current} className={phase === "in" ? "emoji-pop emoji-glow" : "emoji-glow"} style={{ fontSize: "6rem", lineHeight: 1, marginBottom: "1.5rem" }}>
                {menuData[current].emoji}
              </div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: lm ? "#6b3200" : "#d4af59", marginBottom: "0.5rem", fontFamily: "'Cinzel', serif" }}>
                {menuData[current].subtitle}
              </div>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.4rem, 4vw, 2.2rem)", color: lm ? "#1a0800" : "#f5e6c8", margin: "0 0 0.6rem", letterSpacing: "0.1em" }}>
                {menuData[current].category}
              </h3>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "2.2rem", color: lm ? "#6b3200" : "#d4af59", fontWeight: "700", letterSpacing: "0.05em" }}>
                {menuData[current].price}
              </div>
            </div>
            <div style={{ width: "80px", height: "1px", background: `linear-gradient(90deg, transparent, ${lm ? "#8b4200" : "#d4af59"}, transparent)`, margin: "0 auto 2rem" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 2rem" }}>
              {menuData[current].items.map((it, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", color: lm ? "#2a1000" : "rgba(245,230,200,0.8)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", lineHeight: 1.6 }}>
                  <span style={{ color: lm ? "#8b4200" : "#d4af59", fontSize: "0.4rem", flexShrink: 0 }}>◆</span>
                  {it}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", marginTop: "2.5rem" }}>

        {/* Prev arrow */}
        <button className="arrow-btn" onClick={goBack} aria-label="Poprzedni">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke={lm ? "#6b3200" : "#d4af59"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Arc dots */}
        <div style={{ position: "relative", width: "130px", height: "60px" }}>
          <svg width="130" height="60" viewBox="0 0 130 60" style={{ position: "absolute", inset: 0 }}>
            <path d="M 10 56 Q 65 -8 120 56" fill="none"
              stroke={lm ? "rgba(60,20,0,0.2)" : "rgba(212,175,89,0.2)"}
              strokeWidth="1.5" strokeDasharray="4 4"/>
          </svg>
          {menuData.map((_, i) => {
            const angle = (Math.PI / (total - 1)) * i;
            const cx = 10 + (120 - 10) * (i / (total - 1));
            const cy = 56 - Math.sin(angle) * 48;
            const isActive = i === current;
            return (
              <button key={i} className="dot-btn"
                onClick={() => goTo(i, i > current ? 1 : -1)}
                style={{
                  position: "absolute",
                  left: `${cx - (isActive ? 11 : 7)}px`,
                  top: `${cy - (isActive ? 11 : 7)}px`,
                  width: isActive ? "22px" : "14px",
                  height: isActive ? "22px" : "14px",
                  background: isActive
                    ? "linear-gradient(135deg, #ffe066, #d4af59)"
                    : (lm ? "rgba(60,20,0,0.3)" : "rgba(212,175,89,0.3)"),
                  boxShadow: isActive
                    ? "0 0 0 3px rgba(212,175,89,0.2), 0 0 18px rgba(212,175,89,0.5)"
                    : "none",
                }}
                aria-label={menuData[i].category}
              />
            );
          })}
        </div>

        {/* Next arrow */}
        <button className="arrow-btn" onClick={next} aria-label="Następny">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke={lm ? "#6b3200" : "#d4af59"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Counter */}
      <div style={{ textAlign: "center", marginTop: "1rem", fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.3em", color: lm ? "rgba(60,20,0,0.4)" : "rgba(212,175,89,0.4)" }}>
        {current + 1} / {total}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// PEŁNA STRONA MENU
// ═══════════════════════════════════════════════════════════════
const MenuPage = ({ lightMode, t, onBack }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [entering, setEntering] = useState(false);

  const switchTab = (i) => {
    if (i === activeTab) return;
    setEntering(true);
    setTimeout(() => { setActiveTab(i); setEntering(false); }, 220);
  };

  const lm = lightMode;
  const cat = fullMenuData[activeTab];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: lm ? "#c8923a" : "#0d0b07",
      overflowY: "auto",
      transition: "background 0.4s",
    }}>
      <style>{`
        @keyframes menuPageIn { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes itemsIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .mp-tab { cursor:pointer; transition: all 0.25s; border:none; background:transparent; }
        .mp-item { transition: transform 0.25s, box-shadow 0.25s; }
        .mp-item:hover { transform:translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        .mp-back-label { display: inline; }
        @media (max-width: 600px) {
          .mp-back-label { display: none !important; }
          .mp-back-btn { padding: 0.45rem 0.6rem !important; }
          .mp-logo { font-size: 0.7rem !important; letter-spacing: 0.12em !important; }
          .mp-topbar { padding: 0.6rem 0.9rem !important; }
          .mp-heading { padding: 1.2rem 1rem 0.8rem !important; }
          .mp-heading h1 { font-size: 1.8rem !important; }
          .mp-tabs-outer { padding: 0 0.8rem !important; }
          .mp-tabs-inner { display: grid !important; grid-template-columns: repeat(3,1fr) !important; min-width: unset !important; gap: 0.4rem !important; }
          .mp-tab { padding: 0.5rem 0.3rem !important; font-size: 0.48rem !important; letter-spacing: 0.05em !important; flex-direction: column; align-items: center; display: flex; gap: 0.15rem; }
          .mp-cards-grid { grid-template-columns: 1fr !important; }
          .mp-card-emoji { padding: 1.2rem !important; font-size: 2.8rem !important; }
          .mp-items-wrap { padding: 1rem 0.9rem 4rem !important; }
          .mp-cat-header { margin-bottom: 1.2rem !important; }
        }
      `}</style>

      {/* Top bar */}
      <div className="mp-topbar" style={{
        position: "sticky", top: 0, zIndex: 10,
        background: lm ? "rgba(120,65,5,0.97)" : "rgba(13,11,7,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${t.border}`,
        padding: "1rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button className="mp-back-btn" onClick={onBack} style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          background: "transparent", border: `1px solid ${t.border}`,
          color: lm ? "#fff8ee" : "#d4af59",
          fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.2em",
          padding: "0.55rem 1.2rem", cursor: "pointer", transition: "all 0.3s",
          borderRadius: "2px", flexShrink: 0,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,175,89,0.1)"; e.currentTarget.style.borderColor = "#d4af59"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = t.border; }}
        >
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="mp-back-label">POWRÓT</span>
        </button>
        <div className="mp-logo" style={{ fontFamily: "'Cinzel', serif", fontSize: "0.9rem", letterSpacing: "0.3em", color: lm ? "#fff8ee" : "#d4af59", fontWeight: 600 }}>
          SUSHI <span style={{ color: "#d4af59" }}>✦</span> SZCZYGIEŁ
        </div>
        <div style={{ width: "44px", flexShrink: 0 }} />
      </div>

      {/* Page heading */}
      <div className="mp-heading" style={{ textAlign: "center", padding: "3rem 2rem 2rem", animation: "menuPageIn 0.6s ease both" }}>
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: t.sectionSubColor, marginBottom: "0.8rem", fontFamily: "'Cinzel', serif" }}>✦ KARTA DAŃ</div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", color: t.sectionHeadingColor, letterSpacing: "0.08em", margin: 0 }}>Nasze Menu</h1>
        <div style={{ width: "60px", height: "1px", background: `linear-gradient(90deg,transparent,#d4af59,transparent)`, margin: "1.2rem auto 0" }} />
      </div>

      {/* Category tabs */}
      <div className="mp-tabs-outer" style={{ padding: "0 2rem 0" }}>
        <div className="mp-tabs-inner" style={{ display: "flex", gap: "0.6rem", justifyContent: "center", padding: "0.5rem 0" }}>
          {fullMenuData.map((c, i) => {
            const isActive = i === activeTab;
            return (
              <button key={i} className="mp-tab" onClick={() => switchTab(i)} style={{
                padding: "0.6rem 1.2rem",
                fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.18em",
                color: isActive ? (lm ? "#1a0800" : "#0d0b07") : (lm ? "#3d1a00" : "rgba(212,175,89,0.7)"),
                background: isActive
                  ? "linear-gradient(135deg, #ffe066, #d4af59)"
                  : (lm ? "rgba(40,15,0,0.15)" : "rgba(212,175,89,0.07)"),
                border: isActive ? "1px solid #d4af59" : `1px solid ${t.border}`,
                borderRadius: "2px",
                boxShadow: isActive ? "0 4px 20px rgba(212,175,89,0.35)" : "none",
                fontWeight: isActive ? 700 : 400,
                whiteSpace: "nowrap",
              }}>
                {c.icon} {c.category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: "100%", height: "1px", background: `linear-gradient(90deg,transparent,${t.border},transparent)`, margin: "1rem 0" }} />

      {/* Items */}
      <div className="mp-items-wrap" style={{
        maxWidth: "1100px", margin: "0 auto", padding: "1.5rem 2rem 5rem",
        opacity: entering ? 0 : 1, transform: entering ? "translateY(12px)" : "translateY(0)",
        transition: "opacity 0.22s ease, transform 0.22s ease",
      }}>
        {/* Category header */}
        <div className="mp-cat-header" style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
          <span style={{ fontSize: "2.5rem" }}>{cat.icon}</span>
          <div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.6rem", color: t.sectionHeadingColor, margin: 0, letterSpacing: "0.1em" }}>{cat.category}</h2>
            <div style={{ fontSize: "0.65rem", color: t.textFaint, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", marginTop: "0.2rem" }}>{cat.items.length} pozycji</div>
          </div>
        </div>

        {/* Cards */}
        <div className="mp-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.2rem" }}>
          {cat.items.map((item, idx) => (
            <div key={idx} className="mp-item" style={{
              background: lm ? "rgba(40,15,0,0.14)" : "rgba(255,255,255,0.04)",
              border: lm ? "1px solid rgba(60,20,0,0.35)" : "1px solid rgba(212,175,89,0.18)",
              borderRadius: "4px", overflow: "hidden",
              display: "flex", flexDirection: "column",
              animation: `itemsIn 0.4s ease ${idx * 0.07}s both`,
            }}>
              <div className="mp-card-emoji" style={{
                background: lm ? "rgba(40,15,0,0.2)" : "rgba(212,175,89,0.06)",
                borderBottom: lm ? "1px solid rgba(60,20,0,0.2)" : "1px solid rgba(212,175,89,0.1)",
                padding: "1.8rem", textAlign: "center", fontSize: "3.5rem",
                lineHeight: 1, position: "relative",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,#d4af59,transparent)" }} />
                {item.emoji}
              </div>
              <div style={{ padding: "1.2rem 1.4rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "0.9rem", color: t.sectionHeadingColor, margin: 0, letterSpacing: "0.06em", lineHeight: 1.3 }}>
                    {item.name}
                  </h3>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", color: lm ? "#6b3200" : "#d4af59", fontWeight: 700, flexShrink: 0, marginLeft: "0.8rem" }}>
                    {item.price}
                  </span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: lm ? "#2a1200" : "rgba(245,230,200,0.6)", lineHeight: 1.6, margin: 0, flex: 1 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ExpandCard = ({ item, index, lightMode, t }) => {
  const [expanded, setExpanded] = useState(false);
  const [ref, visible] = useIntersection();
  const lm = lightMode;
  return (
    <div ref={ref} onClick={() => setExpanded(!expanded)} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.95)",
      transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`,
      background: lm ? "rgba(40,15,0,0.15)" : "rgba(255,255,255,0.04)",
      border: lm ? "1px solid rgba(60,20,0,0.4)" : "1px solid rgba(212,175,89,0.25)",
      borderRadius: "2px", padding: "2.5rem", cursor: "pointer",
      position: "relative", overflow: "hidden",
      boxShadow: expanded ? (lm ? "0 8px 40px rgba(40,15,0,0.2)" : "0 8px 40px rgba(0,0,0,0.4)") : "none",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s, box-shadow 0.3s ease`,
    }}>
      {/* Gold left bar */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: "linear-gradient(180deg, #d4af59, #8b6914)" }} />
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
        <div>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: lm ? "#6b3200" : "#d4af59", marginBottom: "0.4rem", fontFamily: "'Cinzel', serif" }}>
            {item.emoji} {item.subtitle}
          </div>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.4rem", color: lm ? "#1a0800" : "#f5e6c8", margin: 0, letterSpacing: "0.08em" }}>
            {item.category}
          </h3>
        </div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.6rem", color: lm ? "#6b3200" : "#d4af59", fontWeight: "700" }}>
          {item.price}
        </div>
      </div>
      {/* Expandable content */}
      <div style={{ maxHeight: expanded ? "600px" : "0", overflow: "hidden", transition: "max-height 0.55s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ borderTop: lm ? "1px solid rgba(60,20,0,0.2)" : "1px solid rgba(212,175,89,0.15)", paddingTop: "1.2rem", marginTop: "1rem" }}>
          {item.items.map((it, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.8rem", padding: "0.35rem 0", color: lm ? "#2a1000" : "rgba(245,230,200,0.75)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", letterSpacing: "0.03em" }}>
              <span style={{ color: lm ? "#8b4200" : "#d4af59", fontSize: "0.5rem", flexShrink: 0 }}>◆</span>
              {it}
            </div>
          ))}
        </div>
      </div>
      {/* Toggle hint */}
      <div style={{ marginTop: "0.8rem", fontSize: "0.7rem", letterSpacing: "0.15em", color: lm ? "rgba(100,40,0,0.5)" : "rgba(212,175,89,0.45)", textAlign: "right", fontFamily: "'Cinzel', serif" }}>
        {expanded ? "ZWIŃ ▲" : "ROZWIŃ ▼"}
      </div>
    </div>
  );
};

const FloatingOrb = ({ style }) => (
  <div style={{ position: "absolute", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,89,0.12) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none", ...style }} />
);

const GoldParticles = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let animId;
    const resize = () => { canvas.width = canvas.offsetParent ? canvas.offsetParent.offsetWidth : window.innerWidth; canvas.height = canvas.offsetParent ? canvas.offsetParent.offsetHeight : window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const flakes = Array.from({ length: 38 }, () => createFlake(canvas, false));
    function createFlake(c, fromTop) {
      const size = Math.random() * 10 + 4;
      return { x: Math.random() * c.width, y: fromTop ? -size * 2 : Math.random() * c.height, size, speedY: Math.random() * 0.6 + 0.25, speedX: (Math.random() - 0.5) * 0.4, rotation: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.02, opacity: Math.random() * 0.45 + 0.1, shape: Math.floor(Math.random() * 4), wobble: Math.random() * Math.PI * 2, wobbleSpeed: Math.random() * 0.02 + 0.005, wobbleAmp: Math.random() * 1.2 + 0.3 };
    }
    function drawFlake(f) {
      ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rotation); ctx.globalAlpha = f.opacity;
      const grad = ctx.createLinearGradient(-f.size, -f.size, f.size, f.size);
      grad.addColorStop(0, "#ffe066"); grad.addColorStop(0.4, "#d4af59"); grad.addColorStop(0.7, "#b8860b"); grad.addColorStop(1, "#f0c040");
      ctx.fillStyle = grad;
      if (f.shape === 0) { ctx.fillRect(-f.size / 2, -f.size * 1.6, f.size, f.size * 3.2); }
      else if (f.shape === 1) { ctx.beginPath(); ctx.moveTo(0, -f.size * 1.4); ctx.lineTo(f.size * 0.6, 0); ctx.lineTo(0, f.size * 1.4); ctx.lineTo(-f.size * 0.6, 0); ctx.closePath(); ctx.fill(); }
      else if (f.shape === 2) { ctx.beginPath(); ctx.ellipse(0, 0, f.size * 0.45, f.size * 1.3, 0, 0, Math.PI * 2); ctx.fill(); }
      else { ctx.beginPath(); ctx.moveTo(0, -f.size); ctx.lineTo(f.size * 0.8, f.size * 0.5); ctx.lineTo(-f.size * 0.5, f.size * 0.9); ctx.closePath(); ctx.fill(); }
      ctx.globalAlpha = f.opacity * 0.5; ctx.fillStyle = "rgba(255,255,220,0.7)";
      ctx.beginPath(); ctx.ellipse(-f.size * 0.15, -f.size * 0.3, f.size * 0.15, f.size * 0.4, -0.4, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flakes.forEach((f, i) => { f.wobble += f.wobbleSpeed; f.x += f.speedX + Math.sin(f.wobble) * f.wobbleAmp; f.y += f.speedY; f.rotation += f.rotSpeed; drawFlake(f); if (f.y > canvas.height + 20) flakes[i] = createFlake(canvas, true); });
      animId = requestAnimationFrame(tick);
    }
    tick();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.6, width: "100%", height: "100%" }} />;
};

const SushiLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");
  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) { p = 100; clearInterval(interval); setTimeout(() => setPhase("reveal"), 400); setTimeout(() => { setPhase("done"); onComplete(); }, 1600); }
      setProgress(Math.min(p, 100));
    }, 120);
    return () => clearInterval(interval);
  }, []);
  if (phase === "done") return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#0d0b07", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <style>{`
        @keyframes slideRevealTop { 0% { transform: translateY(0); } 100% { transform: translateY(-100%); } }
        @keyframes slideRevealBottom { 0% { transform: translateY(0); } 100% { transform: translateY(100%); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .loader-top { animation: ${phase === "reveal" ? "slideRevealTop 0.9s cubic-bezier(0.76,0,0.24,1) forwards" : "none"}; }
        .loader-bottom { animation: ${phase === "reveal" ? "slideRevealBottom 0.9s cubic-bezier(0.76,0,0.24,1) forwards" : "none"}; }
      `}</style>
      <div className="loader-top" style={{ position: "absolute", inset: "0 0 50% 0", background: "#0d0b07", zIndex: 2, pointerEvents: "none" }} />
      <div className="loader-bottom" style={{ position: "absolute", inset: "50% 0 0 0", background: "#0d0b07", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,89,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ textAlign: "center", animation: "fadeInUp 0.8s ease 0.3s both" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", letterSpacing: "0.4em", color: "#d4af59", marginBottom: "0.4rem" }}>SUSHI SZCZYGIEŁ</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", letterSpacing: "0.15em", fontStyle: "italic", color: "rgba(245,230,200,0.4)", marginBottom: "2rem" }}>Sztuka smaku. Tradycja na talerzu.</div>
        <div style={{ width: "200px", margin: "0 auto" }}>
          <div style={{ height: "1px", background: "rgba(212,175,89,0.12)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${progress}%`, background: "linear-gradient(90deg, #8b6914, #d4af59)", transition: "width 0.15s ease", boxShadow: "0 0 8px rgba(212,175,89,0.6)" }} />
          </div>
          <div style={{ marginTop: "0.6rem", fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(212,175,89,0.35)", textAlign: "right" }}>{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  );
};

export default function SushiSzczygiel() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", people: "2", notes: "", talerz: "" });
  const [submitted, setSubmitted] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuPageOpen, setMenuPageOpen] = useState(false);

  useEffect(() => { if (loaderDone) setTimeout(() => setHeroVisible(true), 200); }, [loaderDone]);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id); if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // IMPROVED light mode — much higher contrast, dark elements on golden bg
  const t = lightMode ? {
    bg: "#c8923a",
    bgNav: "rgba(120,65,5,0.97)",
    text: "#180900",
    textBody: "#2a1200",
    textMuted: "#3d1a00",
    textFaint: "rgba(50,20,0,0.45)",
    gold: "#3d1a00",
    goldAccent: "#6b3200",
    border: "rgba(50,20,0,0.35)",
    borderHover: "rgba(50,20,0,0.7)",
    cardBg: "rgba(40,15,0,0.13)",
    scrollbarTrack: "#b5792a",
    bodyBg: "#c8923a",
    navLogoColor: "#fff8ee",
    navLinkColor: "rgba(255,240,210,0.85)",
    outlineColor: "rgba(50,20,0,0.55)",
    contactCardBg: "rgba(40,15,0,0.18)",
    contactCardBorder: "rgba(50,20,0,0.4)",
    contactLabelColor: "#3d1a00",
    contactTextColor: "#1a0800",
    contactIconBg: "rgba(40,15,0,0.18)",
    contactIconBorder: "rgba(50,20,0,0.4)",
    sectionHeadingColor: "#1a0800",
    sectionSubColor: "#3d1a00",
    statNumColor: "#3d1a00",
    statLabelColor: "rgba(50,20,0,0.6)",
    statBorder: "rgba(50,20,0,0.25)",
    inputColor: "#180900",
    inputBorder: "rgba(50,20,0,0.35)",
    inputBg: "rgba(40,15,0,0.1)",
    mapLabelBg: "rgba(120,65,5,0.95)",
  } : {
    bg: "#0d0b07",
    bgNav: "rgba(13,11,7,0.85)",
    text: "#f5e6c8",
    textBody: "rgba(245,230,200,0.65)",
    textMuted: "rgba(245,230,200,0.6)",
    textFaint: "rgba(245,230,200,0.25)",
    gold: "#d4af59",
    goldAccent: "#ffe066",
    border: "rgba(212,175,89,0.15)",
    borderHover: "rgba(212,175,89,0.4)",
    cardBg: "rgba(255,255,255,0.03)",
    scrollbarTrack: "#0d0b07",
    bodyBg: "#0d0b07",
    navLogoColor: "#d4af59",
    navLinkColor: "rgba(245,230,200,0.6)",
    outlineColor: "rgba(212,175,89,0.6)",
    contactCardBg: "rgba(255,255,255,0.02)",
    contactCardBorder: "rgba(212,175,89,0.12)",
    contactLabelColor: "#d4af59",
    contactTextColor: "rgba(245,230,200,0.75)",
    contactIconBg: "rgba(212,175,89,0.08)",
    contactIconBorder: "rgba(212,175,89,0.2)",
    sectionHeadingColor: "#f5e6c8",
    sectionSubColor: "#d4af59",
    statNumColor: "#d4af59",
    statLabelColor: "rgba(245,230,200,0.4)",
    statBorder: "rgba(212,175,89,0.12)",
    inputColor: "#f5e6c8",
    inputBorder: "rgba(212,175,89,0.2)",
    inputBg: "rgba(255,255,255,0.03)",
    mapLabelBg: "rgba(13,11,7,0.9)",
  };

  const inputStyle = {
    background: t.inputBg, border: `1px solid ${t.inputBorder}`, borderRadius: "1px",
    padding: "0.85rem 1rem", color: t.inputColor, fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem", width: "100%", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box",
  };

  return (
    <>
    {!loaderDone && <SushiLoader onComplete={() => setLoaderDone(true)} />}

    {/* Full-screen Menu Page */}
    {menuPageOpen && <MenuPage lightMode={lightMode} t={t} onBack={() => setMenuPageOpen(false)} />}

    {/* SOCIAL BUBBLES — positioned left of back-to-top so they don't overlap */}
    {loaderDone && (
      <div style={{ position: "fixed", bottom: "2rem", right: "2rem", display: "flex", flexDirection: "column", gap: "0.8rem", zIndex: 300 }}>
        <style>{`
          @keyframes floatBubble { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
          .sb { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s; animation: floatBubble 3s ease-in-out infinite; display:flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,#1a1507,#0d0b07); border:1px solid rgba(212,175,89,0.45); box-shadow:0 4px 18px rgba(0,0,0,0.7); cursor:pointer; }
          .sb:hover { transform: scale(1.18) translateY(-3px) !important; box-shadow: 0 0 22px rgba(212,175,89,0.45) !important; }
          .sb2 { animation-delay: 0.5s !important; }
        `}</style>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <div className="sb">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#d4af59" strokeWidth="1.6"/><circle cx="12" cy="12" r="4.5" stroke="#d4af59" strokeWidth="1.6"/><circle cx="17.5" cy="6.5" r="1.1" fill="#d4af59"/></svg>
          </div>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <div className="sb sb2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="#d4af59" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </a>
      </div>
    )}



    <div style={{ minHeight: "100vh", background: t.bg, opacity: loaderDone ? 1 : 0, transition: "opacity 0.5s ease 0.3s, background 0.6s ease, color 0.6s ease", position: "relative", zIndex: 1, fontFamily: "'Cormorant Garamond', serif", color: t.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: auto !important; }
        body { background: ${t.bodyBg}; transition: background 0.6s; }
        input:focus, textarea:focus, select:focus { border-color: ${t.gold} !important; }
        input::placeholder, textarea::placeholder { color: ${t.textFaint}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${t.scrollbarTrack}; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,89,0.3); border-radius: 2px; }
        .nav-link { color: ${t.navLinkColor}; text-decoration: none; font-family: 'Cinzel', serif; font-size: 0.7rem; letter-spacing: 0.2em; transition: color 0.3s; cursor: pointer; }
        .nav-link:hover { color: ${lightMode ? "#fff" : "#d4af59"}; }
        .order-btn { background: transparent; border: 1px solid ${t.gold}; color: ${t.gold}; font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.2em; padding: 0.7rem 2rem; cursor: pointer; transition: all 0.3s; }
        .order-btn:hover { background: ${t.gold}; color: ${lightMode ? "#fff" : "#0d0b07"}; }
        .submit-btn { background: linear-gradient(135deg, #d4af59, #8b6914); border: none; color: #0d0b07; font-family: 'Cinzel', serif; font-size: 0.75rem; letter-spacing: 0.2em; padding: 1rem 2.5rem; cursor: pointer; transition: all 0.3s; font-weight: 700; width: 100%; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(212,175,89,0.3); }
        /* Mobile hamburger menu */
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .hero-btns { flex-direction: column !important; align-items: center !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid ${t.statBorder}; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row-2 { grid-template-columns: 1fr !important; }
          .form-row-3 { grid-template-columns: 1fr !important; }
          .talerz-grid { grid-template-columns: 1fr !important; }
          .form-inner { padding: 1.5rem !important; }
          .menu-preview-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .section-pad { padding: 4rem 1.5rem !important; }
          .nav-pad { padding: 1rem 1.5rem !important; }
          .talerz-item { flex-direction: row !important; align-items: center !important; text-align: left !important; gap: 0.8rem !important; }
          .talerz-emoji { font-size: 1.8rem !important; margin-bottom: 0 !important; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
          .nav-desktop-links { display: flex !important; }
          .mobile-menu-dropdown { display: none !important; }
        }
        @keyframes mobileMenuIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrollAnim { 0%,100%{opacity:0.3;transform:scaleY(0.5);transform-origin:top} 50%{opacity:1;transform:scaleY(1)} }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: t.bgNav, backdropFilter: "blur(20px)", borderBottom: `1px solid ${t.border}`, transition: "background 0.6s, border-color 0.6s" }}>
        <div className="nav-pad" style={{ padding: "1.2rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", letterSpacing: "0.25em", color: t.navLogoColor, fontWeight: 600 }}>
            SUSHI <span style={{ color: lightMode ? "#ffd080" : "#d4af59" }}>✦</span> SZCZYGIEŁ
          </div>

          {/* Desktop links */}
          <div className="nav-desktop-links" style={{ gap: "2.5rem", alignItems: "center" }}>
            {[["about","O NAS"],["order","ZAMÓW"],["kontakt","KONTAKT"]].map(([id, label]) => (
              <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</span>
            ))}
            <span className="nav-link" onClick={() => setMenuPageOpen(true)}>MENU</span>
            {/* Theme toggle */}
            <div onClick={() => setLightMode(l => !l)} title={lightMode ? "Tryb ciemny" : "Tryb jasny"}
              style={{ width: "38px", height: "22px", borderRadius: "11px", background: lightMode ? "linear-gradient(90deg,#d4af59,#ffe066)" : "rgba(212,175,89,0.15)", border: `1px solid ${lightMode ? "#d4af59" : "rgba(212,175,89,0.5)"}`, position: "relative", cursor: "pointer", transition: "background 0.4s", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: "3px", left: lightMode ? "18px" : "3px", width: "14px", height: "14px", borderRadius: "50%", background: lightMode ? "#3a1f00" : "#d4af59", transition: "left 0.35s cubic-bezier(0.34,1.56,0.64,1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px" }}>
                {lightMode ? "☀" : ""}
              </div>
            </div>
          </div>

          {/* Hamburger button */}
          <div className="nav-hamburger" style={{ flexDirection: "column", gap: "5px", cursor: "pointer", padding: "4px", zIndex: 110 }} onClick={() => setMobileMenuOpen(o => !o)}>
            <div style={{ width: "24px", height: "2px", background: t.navLogoColor, transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <div style={{ width: "24px", height: "2px", background: t.navLogoColor, transition: "all 0.3s", opacity: mobileMenuOpen ? 0 : 1, transform: mobileMenuOpen ? "scaleX(0)" : "none" }} />
            <div style={{ width: "24px", height: "2px", background: t.navLogoColor, transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-menu-dropdown" style={{ background: t.bgNav, borderTop: `1px solid ${t.border}`, animation: "mobileMenuIn 0.25s ease" }}>
            {[["about","O NAS"],["order","ZAMÓW"],["kontakt","KONTAKT"]].map(([id, label]) => (
              <div key={id} onClick={() => scrollTo(id)}
                style={{ padding: "0.9rem 2rem", fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.2em", color: t.navLinkColor, cursor: "pointer", borderBottom: `1px solid ${t.border}`, transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,89,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >{label}</div>
            ))}
            <div onClick={() => { setMobileMenuOpen(false); setMenuPageOpen(true); }}
              style={{ padding: "0.9rem 2rem", fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.2em", color: t.navLinkColor, cursor: "pointer", borderBottom: `1px solid ${t.border}`, transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,89,0.08)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >MENU</div>
            <div style={{ padding: "0.9rem 2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.15em", color: t.navLinkColor }}>{lightMode ? "TRYB CIEMNY" : "TRYB JASNY"}</span>
              <div onClick={() => setLightMode(l => !l)} style={{ width: "36px", height: "20px", borderRadius: "10px", background: lightMode ? "linear-gradient(90deg,#d4af59,#ffe066)" : "rgba(212,175,89,0.15)", border: "1px solid rgba(212,175,89,0.5)", position: "relative", cursor: "pointer", transition: "background 0.4s" }}>
                <div style={{ position: "absolute", top: "3px", left: lightMode ? "17px" : "3px", width: "13px", height: "13px", borderRadius: "50%", background: lightMode ? "#3a1f00" : "#d4af59", transition: "left 0.35s cubic-bezier(0.34,1.56,0.64,1)" }} />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {loaderDone && <GoldParticles />}
        <FloatingOrb style={{ width: "600px", height: "600px", top: "10%", left: "-10%" }} />
        <FloatingOrb style={{ width: "400px", height: "400px", bottom: "10%", right: "5%" }} />
        <div style={{ position: "absolute", left: "8%", top: "15%", bottom: "15%", width: "1px", background: "linear-gradient(180deg, transparent, rgba(212,175,89,0.3), transparent)" }} />
        <div style={{ position: "absolute", right: "8%", top: "20%", bottom: "20%", width: "1px", background: "linear-gradient(180deg, transparent, rgba(212,175,89,0.2), transparent)" }} />
        <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "2rem" }}>
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)", transition: "all 1s ease 0.2s", fontSize: "0.7rem", letterSpacing: "0.4em", color: t.gold, marginBottom: "2rem", fontFamily: "'Cinzel', serif" }}>✦ WARSZAWA ✦ OD 2018 ✦</div>
          <h1 style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(40px)", transition: "all 1s ease 0.4s", fontFamily: "'Cinzel', serif", fontSize: "clamp(3.5rem, 10vw, 8rem)", fontWeight: "700", lineHeight: 0.9, letterSpacing: "0.05em", marginBottom: "1rem" }}>
            <span style={{ display: "block", color: t.text }}>SUSHI</span>
            <span style={{ display: "block", WebkitTextStroke: `1px ${t.outlineColor}`, color: "transparent" }}>SZCZYGIEŁ</span>
          </h1>
          <p style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)", transition: "all 1s ease 0.6s", fontSize: "1.2rem", fontStyle: "italic", color: t.textMuted, marginBottom: "3rem", letterSpacing: "0.05em" }}>Sztuka smaku. Tradycja na talerzu.</p>
          <div className="hero-btns" style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 1s ease 0.8s", display: "flex", gap: "1.5rem", justifyContent: "center" }}>
            <button className="order-btn" onClick={() => scrollTo("menu")}>NASZE MENU</button>
            <button className="order-btn" style={{ background: lightMode ? "rgba(50,20,0,0.1)" : "rgba(212,175,89,0.08)" }} onClick={() => scrollTo("order")}>ZAMÓW TERAZ</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)", opacity: heroVisible ? 1 : 0, transition: "opacity 1s ease 1.5s", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: lightMode ? "rgba(50,20,0,0.5)" : "rgba(212,175,89,0.4)", fontFamily: "'Cinzel', serif" }}>PRZEWIŃ</div>
          <div style={{ width: "1px", height: "50px", background: `linear-gradient(180deg, ${t.gold}, transparent)`, animation: "scrollAnim 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-pad" style={{ padding: "8rem 4rem", maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <FadeIn>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: t.sectionSubColor, marginBottom: "1.5rem", fontFamily: "'Cinzel', serif" }}>✦ O NAS</div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2, marginBottom: "2rem", color: t.sectionHeadingColor }}>
              Więcej niż<br /><em style={{ fontStyle: "italic", color: t.gold }}>sushi</em>
            </h2>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.9, color: t.textBody, marginBottom: "1.5rem" }}>Sushi Szczygieł to miejsce, gdzie japońska precyzja spotyka się z polską gościnnością. Każdy talerz to starannie skomponowana kompozycja smaków, przygotowana ze świeżych, sezonowych składników.</p>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.9, color: t.textBody }}>Nasze talerzyki to idealne rozwiązanie na spotkania, uroczystości i wspólne chwile przy jedzeniu — estetyczne, smaczne i zawsze świeże.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ position: "relative", aspectRatio: "3/4", background: t.cardBg, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "6rem" }}>
              <div style={{ position: "absolute", inset: "12px", border: `1px solid ${t.border}` }} />
              🍣
              <div style={{ position: "absolute", bottom: "-1px", left: "-1px", right: "-1px", height: "3px", background: `linear-gradient(90deg, transparent, ${t.gold}, transparent)` }} />
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.1}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", marginTop: "6rem", border: `1px solid ${t.statBorder}` }}>
            {[["5+", "lat doświadczenia"], ["100%", "świeże składniki"], ["★ 4.9", "ocena klientów"]].map(([val, label], i) => (
              <div key={i} style={{ padding: "2.5rem", textAlign: "center", borderRight: i < 2 ? `1px solid ${t.statBorder}` : "none" }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "2.5rem", color: t.statNumColor, marginBottom: "0.5rem" }}>{val}</div>
                <div style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: t.statLabelColor, fontFamily: "'Cinzel', serif" }}>{label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* MENU */}
      <section id="menu" className="section-pad" style={{ padding: "6rem 4rem", position: "relative" }}>
        <FloatingOrb style={{ width: "500px", height: "500px", top: "0", left: "50%", transform: "translateX(-50%)" }} />
        <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: t.sectionSubColor, marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>✦ NASZE PROPOZYCJE</div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: t.sectionHeadingColor }}>Menu</h2>
              <div style={{ width: "60px", height: "1px", background: `linear-gradient(90deg, transparent, ${t.gold}, transparent)`, margin: "1.5rem auto 0" }} />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            {/* Preview tiles */}
            <div className="menu-preview-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "3rem" }}>
              {fullMenuData.slice(0, 6).map((cat, i) => (
                <div key={i} onClick={() => setMenuPageOpen(true)} style={{
                  border: `1px solid ${t.border}`,
                  background: t.cardBg,
                  borderRadius: "4px", padding: "1.5rem 1rem",
                  textAlign: "center", cursor: "pointer",
                  transition: "all 0.25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#d4af59"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.6rem" }}>{cat.icon}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.15em", color: lightMode ? "#3d1a00" : "rgba(212,175,89,0.8)" }}>{cat.category}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", color: t.textFaint, marginTop: "0.3rem" }}>{cat.items.length} pozycji</div>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <div style={{ textAlign: "center" }}>
              <button onClick={() => setMenuPageOpen(true)} style={{
                background: "linear-gradient(135deg, #d4af59, #8b6914)",
                border: "none", color: "#0d0b07",
                fontFamily: "'Cinzel', serif", fontSize: "0.75rem",
                letterSpacing: "0.25em", fontWeight: 700,
                padding: "1.1rem 3rem", cursor: "pointer",
                transition: "all 0.3s", borderRadius: "2px",
                boxShadow: "0 4px 20px rgba(212,175,89,0.25)",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 35px rgba(212,175,89,0.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,175,89,0.25)"; }}
              >
                PEŁNA KARTA DAŃ →
              </button>
              <p style={{ marginTop: "1.2rem", fontSize: "0.8rem", color: t.textFaint, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                Zestawy · Rolki · Przekąski · Desery · Napoje · Drinki
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ORDER */}
      <section id="order" className="section-pad" style={{ padding: "6rem 4rem", position: "relative" }}>
        <FloatingOrb style={{ width: "500px", height: "500px", top: "0", left: "50%", transform: "translateX(-50%)" }} />
        <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: t.sectionSubColor, marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>✦ REZERWACJA</div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: t.sectionHeadingColor }}>Zamów teraz</h2>
              <div style={{ width: "60px", height: "1px", background: `linear-gradient(90deg, transparent, ${t.gold}, transparent)`, margin: "1.5rem auto 0" }} />
            </div>
          </FadeIn>
          {submitted ? (
            <FadeIn>
              <div style={{ border: `1px solid ${t.border}`, padding: "4rem", textAlign: "center", background: t.cardBg }}>
                <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>🍣</div>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.5rem", color: t.gold, marginBottom: "1rem" }}>Dziękujemy!</h3>
                <p style={{ color: t.textBody, lineHeight: 1.8 }}>Twoje zamówienie zostało przyjęte.<br />Skontaktujemy się z Tobą wkrótce.</p>
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={0.1}>
              <form onSubmit={handleSubmit} className="form-inner" style={{ border: `1px solid ${t.border}`, padding: "3rem", background: t.cardBg, display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div className="form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.2em", color: t.gold, marginBottom: "0.5rem", fontFamily: "'Cinzel', serif" }}>IMIĘ I NAZWISKO</label>
                    <input style={inputStyle} type="text" placeholder="Jan Kowalski" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.2em", color: t.gold, marginBottom: "0.5rem", fontFamily: "'Cinzel', serif" }}>TELEFON</label>
                    <input style={inputStyle} type="tel" placeholder="+48 000 000 000" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div className="form-row-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.2em", color: t.gold, marginBottom: "0.5rem", fontFamily: "'Cinzel', serif" }}>DATA</label>
                    <input style={{ ...inputStyle, colorScheme: lightMode ? "light" : "dark" }} type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.2em", color: t.gold, marginBottom: "0.5rem", fontFamily: "'Cinzel', serif" }}>GODZINA</label>
                    <input style={{ ...inputStyle, colorScheme: lightMode ? "light" : "dark" }} type="time" required value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.2em", color: t.gold, marginBottom: "0.5rem", fontFamily: "'Cinzel', serif" }}>LICZBA OSÓB</label>
                    <select style={{ ...inputStyle, cursor: "pointer" }} value={form.people} onChange={e => setForm({ ...form, people: e.target.value })}>
                      {[2,3,4,5,6,8,10,15,20].map(n => <option key={n} value={n} style={{ background: "#1a1507" }}>{n} os.</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.2em", color: t.gold, marginBottom: "0.5rem", fontFamily: "'Cinzel', serif" }}>WYBIERZ TALERZ</label>
                  <div className="talerz-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.8rem" }}>
                    {menuData.map((m) => (
                      <div key={m.category} onClick={() => setForm({ ...form, talerz: m.category })}
                        className="talerz-item"
                        style={{ border: `1px solid ${form.talerz === m.category ? t.gold : t.border}`, padding: "0.8rem", display: "flex", flexDirection: "column", textAlign: "center", cursor: "pointer", background: form.talerz === m.category ? t.cardBg : "transparent", transition: "all 0.25s" }}>
                        <div className="talerz-emoji" style={{ fontSize: "1.2rem", marginBottom: "0.3rem" }}>{m.emoji}</div>
                        <div>
                          <div style={{ fontSize: "0.55rem", letterSpacing: "0.1em", fontFamily: "'Cinzel', serif", color: form.talerz === m.category ? t.gold : t.textFaint }}>{m.category}</div>
                          <div style={{ fontSize: "0.8rem", color: t.gold, marginTop: "0.2rem", fontFamily: "'Cinzel', serif" }}>{m.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.2em", color: t.gold, marginBottom: "0.5rem", fontFamily: "'Cinzel', serif" }}>UWAGI</label>
                  <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "100px", lineHeight: 1.7 }} placeholder="Alergie, specjalne życzenia, dodatkowe informacje..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
                </div>
                <button type="submit" className="submit-btn" style={{ marginTop: "0.5rem" }}>WYŚLIJ ZAMÓWIENIE</button>
              </form>
            </FadeIn>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontakt" className="section-pad" style={{ padding: "6rem 4rem", position: "relative" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: t.sectionSubColor, marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>✦ ZNAJDŹ NAS</div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: t.sectionHeadingColor }}>Kontakt</h2>
              <div style={{ width: "60px", height: "1px", background: `linear-gradient(90deg, transparent, ${t.gold}, transparent)`, margin: "1.5rem auto 0" }} />
            </div>
          </FadeIn>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "3rem", alignItems: "start" }}>
            <FadeIn delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {[
                  { icon: "📍", label: "ADRES", lines: ["ul. Przykładowa 12", "00-001 Warszawa"] },
                  { icon: "📞", label: "TELEFON", lines: ["+48 500 123 456"] },
                  { icon: "🕐", label: "GODZINY OTWARCIA", lines: ["Pon – Pt: 12:00 – 22:00", "Sob – Ndz: 11:00 – 23:00"] },
                ].map(({ icon, label, lines }) => (
                  <div key={label}
                    style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start", padding: "1.5rem", border: `1px solid ${t.contactCardBorder}`, background: t.contactCardBg, transition: "border-color 0.3s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = t.borderHover}
                    onMouseLeave={e => e.currentTarget.style.borderColor = t.contactCardBorder}
                  >
                    <div style={{ fontSize: "1.3rem", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", background: t.contactIconBg, border: `1px solid ${t.contactIconBorder}`, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: "0.58rem", letterSpacing: "0.25em", color: t.contactLabelColor, marginBottom: "0.4rem", fontFamily: "'Cinzel', serif", fontWeight: 600 }}>{label}</div>
                      {lines.map((l, i) => (
                        <div key={i} style={{ fontSize: "1rem", color: t.contactTextColor, lineHeight: 1.7, fontFamily: "'Cormorant Garamond', serif" }}>{l}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ position: "relative" }}>
                {[
                  { top: "-6px", left: "-6px", borderTop: "2px solid #d4af59", borderLeft: "2px solid #d4af59" },
                  { top: "-6px", right: "-6px", borderTop: "2px solid #d4af59", borderRight: "2px solid #d4af59" },
                  { bottom: "-6px", left: "-6px", borderBottom: "2px solid #d4af59", borderLeft: "2px solid #d4af59" },
                  { bottom: "-6px", right: "-6px", borderBottom: "2px solid #d4af59", borderRight: "2px solid #d4af59" },
                ].map((s, i) => <div key={i} style={{ position: "absolute", width: "20px", height: "20px", ...s }} />)}
                <div style={{ border: `1px solid ${t.border}`, overflow: "hidden", aspectRatio: "16/10", position: "relative" }}>
                  <iframe title="Lokalizacja Sushi Szczygieł"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=21.00%2C52.20%2C21.06%2C52.24&layer=mapnik&marker=52.2297%2C21.0122"
                    style={{ width: "100%", height: "100%", border: "none", filter: lightMode ? "saturate(0.7) brightness(0.9)" : "invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)" }} />
                  <div style={{ position: "absolute", bottom: "1rem", left: "1rem", background: t.mapLabelBg, border: `1px solid ${t.border}`, padding: "0.6rem 1rem", backdropFilter: "blur(10px)" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: lightMode ? "#ffd080" : "#d4af59" }}>📍 SUSHI SZCZYGIEŁ</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", color: lightMode ? "rgba(255,240,210,0.85)" : "rgba(245,230,200,0.6)", marginTop: "0.2rem" }}>ul. Przykładowa 12, Warszawa</div>
                  </div>
                </div>
                <a href="https://maps.google.com/?q=Warszawa" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div style={{ marginTop: "1rem", padding: "0.9rem", border: `1px solid ${t.border}`, textAlign: "center", cursor: "pointer", transition: "all 0.3s", fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: t.gold, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                    onMouseEnter={e => { e.currentTarget.style.background = t.cardBg; e.currentTarget.style.borderColor = t.borderHover; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = t.border; }}
                  ><span>🗺</span> OTWÓRZ W GOOGLE MAPS</div>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${t.border}`, padding: "4rem 4rem 5rem", textAlign: "center", position: "relative", transition: "border-color 0.6s" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem", background: "linear-gradient(135deg, #1a1507, #0d0b07)", border: "1px solid rgba(212,175,89,0.3)", padding: "0.8rem 2rem", boxShadow: "0 0 30px rgba(212,175,89,0.08), inset 0 1px 0 rgba(212,175,89,0.1)" }}>
          <svg width="22" height="22" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#d4af59" strokeWidth="1.5"/><circle cx="20" cy="20" r="13" fill="#d4af59" opacity="0.15"/><circle cx="20" cy="20" r="7" fill="#d4af59"/><circle cx="20" cy="20" r="18" fill="none" stroke="#d4af59" strokeWidth="1" strokeDasharray="4 3" opacity="0.4"/></svg>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", letterSpacing: "0.3em", fontWeight: "700", background: "linear-gradient(135deg, #ffe066, #d4af59, #8b6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SUSHI SZCZYGIEŁ</span>
          <svg width="22" height="22" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#d4af59" strokeWidth="1.5"/><circle cx="20" cy="20" r="13" fill="#d4af59" opacity="0.15"/><circle cx="20" cy="20" r="7" fill="#d4af59"/><circle cx="20" cy="20" r="18" fill="none" stroke="#d4af59" strokeWidth="1" strokeDasharray="4 3" opacity="0.4"/></svg>
        </div>
        <p style={{ fontSize: "0.85rem", color: t.textMuted, letterSpacing: "0.05em" }}>Warszawa · +48 500 123 456</p>
        <p style={{ fontSize: "0.7rem", color: t.textFaint, marginTop: "1.5rem", letterSpacing: "0.1em", fontFamily: "'Cinzel', serif" }}>© 2024 SUSHI SZCZYGIEŁ</p>
      </footer>
    </div>
    </>
  );
}