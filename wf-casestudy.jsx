/* wf-casestudy.jsx — Case study: Ed Sheeran — Mathematics Tour */
const { useEffect, useRef } = React;

function CaseStudy() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    root.querySelectorAll(".reveal, [data-stagger]").forEach((el) => io.observe(el));

    const pars = Array.from(root.querySelectorAll("[data-par],[data-zoom]"));
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        pars.forEach((el) => {
          const r = el.getBoundingClientRect();
          let tf = "";
          if (el.hasAttribute("data-par")) {
            const f = parseFloat(el.getAttribute("data-par")) || 0.06;
            const center = r.top + r.height / 2 - vh / 2;
            let y = -center * f;
            const cap = r.height * 0.12;
            if (y > cap) y = cap; if (y < -cap) y = -cap;
            tf += `translate3d(0,${y.toFixed(1)}px,0) `;
          }
          if (el.hasAttribute("data-zoom")) {
            const z = parseFloat(el.getAttribute("data-zoom")) || 0.07;
            let prog = (vh - r.top) / (vh + r.height);
            prog = Math.min(Math.max(prog, 0), 1);
            tf += `scale(${(1 + z * (1 - prog)).toFixed(3)})`;
          }
          el.style.transform = tf;
        });
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div ref={rootRef} className="app">
      {/* TOP BAR */}
      <div className="topbar">
        <div className="brandmark">PRO&nbsp;<b>MUSIC</b> · případová studie</div>
        <div className="tabmeta" style={{ marginLeft: "auto" }}>
          <span><span className="dot"></span>wireframe · motion: jemné fade/parallax</span>
        </div>
      </div>

      {/* ===== HERO (full-bleed) ===== */}
      <section className="cshero">
        <div className="bg"><img src="assets/projekty/ed-sheeran/ohnostroj.jpg" alt="" data-zoom="0.07" /></div>
        <div className="scrim"></div>
        <div className="inner">
          <a className="cs-back" href="PRO MUSIC — Wireframy webu.html">← zpět na portfolio</a>
          <div style={{ marginTop: 22 }}>
            <div className="kicker" style={{ color: "#fff", opacity: .85 }}>Případová studie · turné / světla · 2022</div>
            <h1 className="hand hero-claim" style={{ fontSize: "clamp(46px,8vw,116px)", color: "#fff", margin: "8px 0 0", lineHeight: .86 }}>
              Ed Sheeran<br />Mathematics Tour
            </h1>
            <div className="metaline">
              <Chip acc>Ayrton rig</Chip>
              <Chip acc>in-the-round 360°</Chip>
              <Chip acc>stadiony Evropy</Chip>
              <Chip acc>LD Mark Cunniffe</Chip>
            </div>
          </div>
          <div style={{ marginTop: 16 }}><Mtag>⊕ jemný zoom-out pozadí</Mtag> <Mtag ghost>foto © Ralph Larmann</Mtag></div>
        </div>
      </section>

      <div className="wrap">
        {/* ===== META BAR (boxed) ===== */}
        <Reveal tag="section" className="sec tight">
          <div className="csmeta">
            <div className="cell"><div className="k">Interpret</div><div className="v">Ed Sheeran</div></div>
            <div className="cell"><div className="k">Role PRO MUSIC</div><div className="v">distributor značky Ayrton</div></div>
            <div className="cell"><div className="k">Rok</div><div className="v">2022 →</div></div>
            <div className="cell"><div className="k">Formát</div><div className="v">stadionové turné, in-the-round</div></div>
            <div className="cell"><div className="k">Disciplína</div><div className="v">světelný design / rig</div></div>
          </div>
          <Note arrow="↑">boxed meta proužek — rychlá fakta o zakázce</Note>
        </Reveal>

        {/* ===== BRIEF / VÝZVA (boxed) ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="01">Výzva</Slab>
          <div className="leadwrap">
            <div className="reveal rt">
              <p className="lead">Bezstřechové pódium uprostřed stadionu, viditelné ze všech úhlů — a žádné zadní trusy, kam schovat techniku.</p>
            </div>
            <div>
              <Lines n={4} widths={["m", "", "s", "xs"]} />
              <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Chip>bez střechy</Chip><Chip>360° výhled</Chip><Chip>6 stožárů na lanovém systému</Chip><Chip>IP65 / do počasí</Chip>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ===== ČÍSLA ===== */}
        <Reveal tag="section" className="sec tight">
          <div className="csnums" data-stagger>
            <Stat n="138" l="Ayrton Domino LT" />
            <Stat n="48" l="Perseo Profile" />
            <Stat n="22" l="Cobra (laser)" />
            <Stat n="6" l="stožárů · 32 m" />
            <Stat n="360°" l="in-the-round" />
          </div>
          <Note arrow="↑">tvrdá čísla rigu = důkaz měřítka zakázky</Note>
        </Reveal>
      </div>

      {/* ===== QUOTE (full-bleed) ===== */}
      <Reveal tag="section" className="csquote">
        <div className="bg"><img src="assets/projekty/ed-sheeran/cervena-show.jpg" alt="" data-zoom="0.08" /></div>
        <div className="scrim2"></div>
        <div className="inner">
          <div className="reveal rt">
            <blockquote>„Stožáry se staly klíčovým i zadním světlem, bočním fillem i veškerou kreativou — kompletní 360° lahůdka."</blockquote>
            <div className="who">— Mark Cunniffe, lighting &amp; production designer</div>
          </div>
          <div style={{ marginTop: 16 }}><Mtag>✦ text rise on scroll</Mtag></div>
        </div>
      </Reveal>

      <div className="wrap">
        {/* ===== TECHNIKA / RIG ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="02">Nasazená technika — Ayrton</Slab>
          <div className="fixgrid" data-stagger>
            <div className="fixcard">
              <div className="qty">138×</div>
              <h4>Domino LT</h4>
              <span className="role">hlavní zdroj světla · 6 jako followspoty</span>
              <Lines n={2} widths={["m", "s"]} />
            </div>
            <div className="fixcard">
              <div className="qty">48×</div>
              <h4>Perseo Profile</h4>
              <span className="role">nadhlavní pozice · halo / lustry</span>
              <Lines n={2} widths={["m", "s"]} />
            </div>
            <div className="fixcard">
              <div className="qty">22×</div>
              <h4>Cobra</h4>
              <span className="role">laserový zdroj · obvod pódia</span>
              <Lines n={2} widths={["m", "s"]} />
            </div>
          </div>
          <div style={{ marginTop: 14 }}><Mtag ghost>první turné nové Ayrton Cobra · PRO MUSIC = distributor Ayrton pro ČR/SK</Mtag></div>
        </Reveal>

        {/* ===== GALERIE (mozaika) ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="03">Galerie</Slab>
          <div className="csgal" data-stagger>
            <div className="g tall"><img src="assets/projekty/ed-sheeran/rig-detail.jpg" alt="" data-par="0.05" /><span className="imgcap" style={{ position: "absolute" }}>▦ detail rigu</span></div>
            <div className="g wide"><img src="assets/projekty/ed-sheeran/stage-modra.jpg" alt="" data-par="0.04" /><span className="imgcap" style={{ position: "absolute" }}>▦ pódium · modrá</span></div>
            <div className="g sq"><img src="assets/projekty/ed-sheeran/sing-pultiky.jpg" alt="" data-par="0.04" /></div>
            <div className="g sq"><img src="assets/projekty/ed-sheeran/cervena-show.jpg" alt="" data-par="0.04" /></div>
            <div className="g sq"><img src="assets/projekty/ed-sheeran/ohnostroj.jpg" alt="" data-par="0.04" /></div>
          </div>
          <Note arrow="↑">smíšený grid (wide / tall / sq) — rytmus, ne uniformní mřížka</Note>
        </Reveal>

        {/* ===== ŘEŠENÍ ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="04">Řešení &amp; proč Ayrton</Slab>
          <div className="leadwrap">
            <div>
              <Lines n={5} widths={["m", "", "s", "m", "xs"]} />
              <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Chip acc>IP65 bez krytování</Chip><Chip acc>FollowMe systém</Chip><Chip acc>čisté linie</Chip><Chip acc>0 ztracených sedadel</Chip>
              </div>
            </div>
            <div className="reveal rt">
              <p className="lead">„Rig 140 followspotů" — jeden typ svítidla zvládl klíč, kreativu i sledování umělce.</p>
            </div>
          </div>
        </Reveal>

        {/* ===== CREDITS ===== */}
        <Reveal tag="section" className="sec tight">
          <Slab num="05">Credits</Slab>
          <div className="credits">
            {[
              ["Lighting & production design", "Mark Cunniffe"],
              ["Lighting programmer", "Alex Passmore"],
              ["Lighting operator", "Matt Jones"],
              ["Video director", "Phil Mead"],
              ["Production manager", "Chris Marsh"],
              ["Lighting supplier", "LCR"],
              ["Svítidla / značka", "Ayrton"],
              ["Distributor ČR/SK", "PRO MUSIC"],
              ["Foto", "© Ralph Larmann"],
            ].map(([k, v], i) => (
              <div className="cr" key={i}><div className="k">{k}</div><div className="v">{v}</div></div>
            ))}
          </div>
          <Note arrow="↑">credity — kdo na zakázce dělal (zvýrazněná role PRO MUSIC)</Note>
        </Reveal>

        {/* ===== DALŠÍ ZAKÁZKY ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="06">Další realizace</Slab>
          <div className="related" data-stagger>
            <a className="idx-card" href="PRO MUSIC — Wireframy webu.html" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="cardimg"><img src="assets/projekty/steel-arena/projekce-barvy.jpg" alt="" /><span className="pin"><Tag acc>ARÉNA</Tag></span></div>
              <div className="cardbody"><strong style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, display: "block", marginBottom: 4 }}>Steel Aréna Košice</strong><span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--ink-soft)" }}>Ayrton Domino Profile</span></div>
            </a>
            <a className="idx-card" href="PRO MUSIC — Wireframy webu.html" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="cardimg"><img src="assets/projekty/djkt-plzen/array-strop.jpg" alt="" /><span className="pin"><Tag acc>INSTALACE</Tag></span></div>
              <div className="cardbody"><strong style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, display: "block", marginBottom: 4 }}>Nová scéna DJKT Plzeň</strong><span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--ink-soft)" }}>L-Acoustics Ambiance</span></div>
            </a>
            <a className="idx-card" href="PRO MUSIC — Wireframy webu.html" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="cardimg"><img src="assets/projekty/steel-arena/projekce-led.jpg" alt="" /><span className="pin"><Tag acc>ARÉNA</Tag></span></div>
              <div className="cardbody"><strong style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, display: "block", marginBottom: 4 }}>Steel Aréna — rig</strong><span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--ink-soft)" }}>osvětlení haly</span></div>
            </a>
          </div>
        </Reveal>

        {/* ===== CTA ===== */}
        <Reveal tag="section" className="sec">
          <div className="ctabanner">
            <div className="kicker">Chcete podobnou produkci?</div>
            <h2 className="hand" style={{ fontSize: "clamp(40px,5vw,64px)", margin: "8px 0 14px", lineHeight: .95 }}>Pojďme to ozvučit a nasvítit</h2>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn solid>Poptat realizaci →</Btn>
              <Btn>Přihlásit na školení</Btn>
            </div>
          </div>
        </Reveal>
      </div>
      <WFFoot />
    </div>
  );
}

window.CaseStudy = CaseStudy;
