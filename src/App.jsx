import { useState, useEffect, useRef } from "react";

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

// MenuCard accepts lightMode to style itself correctly
const MenuCard = ({ item, index, lightMode }) => {
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
      borderRadius: "2px", padding: "2.5rem", cursor: "pointer", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: "linear-gradient(180deg, #d4af59, #8b6914)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: lm ? "#6b3200" : "#d4af59", marginBottom: "0.4rem", fontFamily: "'Cinzel', serif" }}>
            {item.emoji} {item.subtitle}
          </div>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "1.4rem", color: lm ? "#1a0800" : "#f5e6c8", margin: 0, letterSpacing: "0.08em" }}>
            {item.category}
          </h3>
        </div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.6rem", color: lm ? "#6b3200" : "#d4af59", fontWeight: "700", letterSpacing: "0.03em" }}>
          {item.price}
        </div>
      </div>
      <div style={{ maxHeight: expanded ? "500px" : "0", overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ borderTop: lm ? "1px solid rgba(60,20,0,0.25)" : "1px solid rgba(212,175,89,0.15)", paddingTop: "1.2rem", marginTop: "0.5rem" }}>
          {item.items.map((it, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.8rem", padding: "0.35rem 0", color: lm ? "#2a1000" : "rgba(245,230,200,0.75)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", letterSpacing: "0.03em" }}>
              <span style={{ color: lm ? "#8b4200" : "#d4af59", fontSize: "0.5rem" }}>◆</span>
              {it}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "1rem", fontSize: "0.7rem", letterSpacing: "0.15em", color: lm ? "rgba(100,40,0,0.6)" : "rgba(212,175,89,0.5)", textAlign: "right", fontFamily: "'Cinzel', serif" }}>
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
            {[["about","O NAS"],["menu","MENU"],["order","ZAMÓW"],["kontakt","KONTAKT"]].map(([id, label]) => (
              <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</span>
            ))}
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
            {[["about","O NAS"],["menu","MENU"],["order","ZAMÓW"],["kontakt","KONTAKT"]].map(([id, label]) => (
              <div key={id} onClick={() => scrollTo(id)}
                style={{ padding: "0.9rem 2rem", fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.2em", color: t.navLinkColor, cursor: "pointer", borderBottom: `1px solid ${t.border}`, transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,89,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >{label}</div>
            ))}
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
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: t.sectionSubColor, marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>✦ NASZE PROPOZYCJE</div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: t.sectionHeadingColor }}>Menu</h2>
              <div style={{ width: "60px", height: "1px", background: `linear-gradient(90deg, transparent, ${t.gold}, transparent)`, margin: "1.5rem auto 0" }} />
            </div>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {menuData.map((item, i) => (
              <MenuCard key={i} item={item} index={i} lightMode={lightMode} />
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p style={{ textAlign: "center", marginTop: "3rem", fontSize: "0.85rem", color: t.textFaint, fontStyle: "italic", letterSpacing: "0.05em" }}>
              * Kliknij na talerz, aby zobaczyć skład. Wszystkie ceny brutto.
            </p>
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