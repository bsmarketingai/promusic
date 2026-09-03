/* wf-app.jsx — shell: přepínač směrů + Tweaks + motion */
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#e0542b",
  "type": "Standard",
  "density": "Standard",
  "hero": "Cinematic",
  "light": false
}/*EDITMODE-END*/;

const TYPE_MAP = { "Kompaktní": 0.88, "Standard": 1, "Velká": 1.18 };
const DENS_MAP = { "Vzdušné": 1.18, "Standard": 1, "Nabité": 0.82 };
const SCRIM_MAP = { "Cinematic": 0.88, "Editorial": 0.62 };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const rootRef = useRef(null);

  // motion: reveal-on-scroll + parallax
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reveals = Array.from(root.querySelectorAll(".reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));

    const pars = Array.from(root.querySelectorAll("[data-par]"));
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        pars.forEach((el) => {
          const f = parseFloat(el.getAttribute("data-par")) || 0.08;
          const r = el.getBoundingClientRect();
          const center = r.top + r.height / 2 - vh / 2;
          let y = -center * f;
          const cap = r.height * 0.12;
          if (y > cap) y = cap; if (y < -cap) y = -cap;
          el.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
        });
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const appStyle = {
    "--accent": t.accent,
    "--type": TYPE_MAP[t.type] || 1,
    "--sp": DENS_MAP[t.density] || 1,
    "--scrim": SCRIM_MAP[t.hero] || 0.85,
  };

  return (
    <div ref={rootRef} className={"app" + (t.light ? " light" : "") + " hero-" + (t.hero || "Cinematic").toLowerCase()} style={appStyle}>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="brandmark">PRO&nbsp;<b>MUSIC</b> · wireframe</div>
        <div className="tabmeta" style={{ marginLeft: "auto" }}>
          <span><span className="dot"></span>Showreel / Cinematic · dark · CZ/EN</span>
        </div>
      </div>

      {/* SCREEN */}
      <DirectionA />

      {/* TWEAKS */}
      <TweaksPanel>
        <TweakSection label="Vzhled" />
        <TweakColor label="Akcentní barva" value={t.accent}
          options={["#e0542b", "#2f6de0", "#3fb27f", "#c0398f"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakRadio label="Velikost typografie" value={t.type}
          options={["Kompaktní", "Standard", "Velká"]}
          onChange={(v) => setTweak("type", v)} />
        <TweakRadio label="Hustota obsahu" value={t.density}
          options={["Vzdušné", "Standard", "Nabité"]}
          onChange={(v) => setTweak("density", v)} />
        <TweakSection label="Hero" />
        <TweakRadio label="Styl hero" value={t.hero}
          options={["Cinematic", "Editorial"]}
          onChange={(v) => setTweak("hero", v)} />
        <TweakSection label="Režim" />
        <TweakToggle label="Světlý režim (náhled)" value={t.light}
          onChange={(v) => setTweak("light", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
