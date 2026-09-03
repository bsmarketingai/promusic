/* wf-casestudy-karlin.jsx — Case study: Hudební divadlo Karlín (DiGiCo Quantum 7T) */
const { useEffect, useRef } = React;

function CaseStudyKarlin() {
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
            const f = parseFloat(el.getAttribute("data-par")) || 0.05;
            const center = r.top + r.height / 2 - vh / 2;
            let y = -center * f;
            const cap = r.height * 0.12;
            if (y > cap) y = cap; if (y < -cap) y = -cap;
            tf += `translate3d(0,${y.toFixed(1)}px,0) `;
          }
          if (el.hasAttribute("data-zoom")) {
            const z = parseFloat(el.getAttribute("data-zoom")) || 0.06;
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
          <span><span className="dot"></span>wireframe · instalace / zvuk</span>
        </div>
      </div>

      {/* ===== HERO (full-bleed) ===== */}
      <section className="cshero">
        <div className="bg"><img src="assets/projekty/karlin/foh-jeviste.jpg" alt="" data-zoom="0.07" /></div>
        <div className="scrim"></div>
        <div className="inner">
          <a className="cs-back" href="PRO MUSIC — Wireframy webu.html">← zpět na portfolio</a>
          <div style={{ marginTop: 22 }}>
            <div className="kicker" style={{ color: "#fff", opacity: .85 }}>Případová studie · instalace / zvuk · Praha</div>
            <h1 className="hand hero-claim" style={{ fontSize: "clamp(44px,7.5vw,108px)", color: "#fff", margin: "8px 0 0", lineHeight: .86 }}>
              Hudební divadlo<br />Karlín
            </h1>
            <div className="metaline">
              <Chip acc>DiGiCo Quantum 7T</Chip>
              <Chip acc>2× SD7</Chip>
              <Chip acc>FOH + monitory</Chip>
              <Chip acc>největší L-ISA v ČR</Chip>
            </div>
          </div>
          <div style={{ marginTop: 16 }}><Mtag>⊕ jemný zoom-out pozadí</Mtag> <Mtag ghost>foto: zákulisí FOH</Mtag></div>
        </div>
      </section>

      <div className="wrap">
        {/* ===== META BAR (boxed) ===== */}
        <Reveal tag="section" className="sec tight">
          <div className="csmeta">
            <div className="cell"><div className="k">Místo</div><div className="v">Hudební divadlo Karlín, Praha</div></div>
            <div className="cell"><div className="k">Role PRO MUSIC</div><div className="v">distributor DiGiCo · dodávka & instalace</div></div>
            <div className="cell"><div className="k">Typ</div><div className="v">pevná instalace</div></div>
            <div className="cell"><div className="k">Srdce systému</div><div className="v">DiGiCo Quantum 7T</div></div>
            <div className="cell"><div className="k">Disciplína</div><div className="v">mixáž / FOH + monitory</div></div>
          </div>
          <Note arrow="↑">boxed meta proužek — rychlá fakta o instalaci</Note>
        </Reveal>

        {/* ===== BRIEF / VÝZVA (boxed) ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="01">Výzva</Slab>
          <div className="leadwrap">
            <div className="reveal rt">
              <p className="lead">Muzikál hraje osm představení týdně — mixážní páteř musí být bezúdržbová, rychlá na výměnu titulu a stoprocentně spolehlivá.</p>
            </div>
            <div>
              <Lines n={4} widths={["m", "", "s", "xs"]} />
              <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Chip>8 show / týden</Chip><Chip>repertoár více titulů</Chip><Chip>Theatre software</Chip><Chip>redundance</Chip>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ===== ČÍSLA ===== */}
        <Reveal tag="section" className="sec tight">
          <div className="csnums" data-stagger>
            <Stat n="2×" l="DiGiCo SD7" />
            <Stat n="7T" l="Quantum engine" />
            <Stat n="FOH" l="+ monitorový mix" />
            <Stat n="#1" l="L-ISA instalace v ČR" />
            <Stat n="∞" l="repertoárových scén" />
          </div>
          <Note arrow="↑">tvrdá fakta = důkaz špičkové instalace (čísla doplníme z podkladů)</Note>
        </Reveal>
      </div>

      {/* ===== QUOTE (full-bleed) ===== */}
      <Reveal tag="section" className="csquote">
        <div className="bg"><img src="assets/projekty/karlin/zvukar-foh.jpg" alt="" data-zoom="0.07" /></div>
        <div className="scrim2"></div>
        <div className="inner">
          <div className="reveal rt">
            <blockquote>„Quantum 7T zvládne celý repertoár — scény přepnu mezi tituly během chvíle a zvuk je každý večer stejně přesný."</blockquote>
            <div className="who">— mistr zvuku, Hudební divadlo Karlín · (citaci doplníme)</div>
          </div>
          <div style={{ marginTop: 16 }}><Mtag>✦ text rise on scroll</Mtag></div>
        </div>
      </Reveal>

      <div className="wrap">
        {/* ===== TECHNIKA ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="02">Nasazená technika — DiGiCo</Slab>
          <div className="fixgrid" data-stagger>
            <div className="fixcard">
              <div className="qty">2×</div>
              <h4>SD7 Quantum 7T</h4>
              <span className="role">FOH + monitory · Theatre software</span>
              <Lines n={2} widths={["m", "s"]} />
            </div>
            <div className="fixcard">
              <div className="qty">SD</div>
              <h4>SD-Rack</h4>
              <span className="role">scénické I/O · 32-bit DAC, MADI</span>
              <Lines n={2} widths={["m", "s"]} />
            </div>
            <div className="fixcard">
              <div className="qty">L-ISA</div>
              <h4>L-Acoustics</h4>
              <span className="role">imerzivní ozvučení sálu · největší v ČR</span>
              <Lines n={2} widths={["m", "s"]} />
            </div>
          </div>
          <div style={{ marginTop: 14 }}><Mtag ghost>PRO MUSIC = výhradní distributor DiGiCo i L-Acoustics pro ČR/SK</Mtag></div>
        </Reveal>

        {/* ===== GALERIE (mozaika) ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="03">Galerie</Slab>
          <div className="csgal" data-stagger>
            <div className="g tall"><img src="assets/projekty/karlin/zvukar-foh.jpg" alt="" data-par="0.05" /><span className="imgcap" style={{ position: "absolute" }}>▦ mistr zvuku na FOH</span></div>
            <div className="g wide"><img src="assets/projekty/karlin/foh-jeviste.jpg" alt="" data-par="0.04" /><span className="imgcap" style={{ position: "absolute" }}>▦ FOH · výhled na jeviště</span></div>
            <div className="g sq"><img src="assets/projekty/karlin/sd7-dilna.jpg" alt="" data-par="0.04" /><span className="imgcap" style={{ position: "absolute" }}>▦ příprava konzolí</span></div>
            <div className="g sq"><img src="assets/projekty/karlin/sd-rack-detail.jpg" alt="" data-par="0.04" /><span className="imgcap" style={{ position: "absolute" }}>▦ SD-Rack detail</span></div>
          </div>
          <Note arrow="↑">smíšený grid (wide / tall / sq) — rytmus, ne uniformní mřížka</Note>
        </Reveal>

        {/* ===== ŘEŠENÍ ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="04">Řešení &amp; proč DiGiCo</Slab>
          <div className="leadwrap">
            <div>
              <Lines n={5} widths={["m", "", "s", "m", "xs"]} />
              <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Chip acc>Quantum engine</Chip><Chip acc>Theatre software</Chip><Chip acc>rychlá výměna titulu</Chip><Chip acc>redundantní zapojení</Chip>
              </div>
            </div>
            <div className="reveal rt">
              <p className="lead">Dvě SD7 jako FOH a monitorová páteř — jeden ekosystém, sdílené scény, nulové prostoje mezi tituly.</p>
            </div>
          </div>
        </Reveal>

        {/* ===== CREDITS ===== */}
        <Reveal tag="section" className="sec tight">
          <Slab num="05">Credits</Slab>
          <div className="credits">
            {[
              ["Místo", "Hudební divadlo Karlín"],
              ["Konzole / značka", "DiGiCo (Quantum 7T)"],
              ["Imerzivní zvuk", "L-Acoustics L-ISA"],
              ["Dodávka & instalace", "PRO MUSIC"],
              ["Distributor ČR/SK", "PRO MUSIC"],
              ["Mistr zvuku", "(doplnit)"],
              ["Rok instalace", "(doplnit)"],
              ["Foto", "(doplnit)"],
            ].map(([k, v], i) => (
              <div className="cr" key={i}><div className="k">{k}</div><div className="v">{v}</div></div>
            ))}
          </div>
          <Note arrow="↑">credity — zvýrazněná role PRO MUSIC (dodávka + distribuce)</Note>
        </Reveal>

        {/* ===== DALŠÍ ZAKÁZKY ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="06">Další realizace</Slab>
          <div className="related" data-stagger>
            <a className="idx-card" href="Case study — Ed Sheeran.html" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="cardimg"><img src="assets/projekty/ed-sheeran/cervena-show.jpg" alt="" /><span className="pin"><Tag acc>TURNÉ</Tag></span></div>
              <div className="cardbody"><strong style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, display: "block", marginBottom: 4 }}>Ed Sheeran — Mathematics</strong><span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--ink-soft)" }}>Ayrton rig</span></div>
            </a>
            <a className="idx-card" href="PRO MUSIC — Wireframy webu.html" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="cardimg"><img src="assets/projekty/djkt-plzen/array-strop.jpg" alt="" /><span className="pin"><Tag acc>INSTALACE</Tag></span></div>
              <div className="cardbody"><strong style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, display: "block", marginBottom: 4 }}>Nová scéna DJKT Plzeň</strong><span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--ink-soft)" }}>L-Acoustics Ambiance</span></div>
            </a>
            <a className="idx-card" href="PRO MUSIC — Wireframy webu.html" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="cardimg"><img src="assets/projekty/steel-arena/projekce-barvy.jpg" alt="" /><span className="pin"><Tag acc>ARÉNA</Tag></span></div>
              <div className="cardbody"><strong style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, display: "block", marginBottom: 4 }}>Steel Aréna Košice</strong><span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--ink-soft)" }}>Ayrton Domino Profile</span></div>
            </a>
          </div>
        </Reveal>

        {/* ===== CTA ===== */}
        <Reveal tag="section" className="sec">
          <div className="assure" style={{ marginBottom: 22 }}>
            <Tag acc>PROČ PRO MUSIC</Tag>
            <p className="assure-claim">Neprodáváme techniku bez know-how. U muzikálového provozu jde o spolehlivost každý večer — a tu navrhujeme, ne jen dodáváme.</p>
          </div>
          <div className="ctabanner">
            <div className="kicker">Plánujete instalaci do divadla nebo sálu?</div>
            <h2 className="hand" style={{ fontSize: "clamp(40px,5vw,64px)", margin: "8px 0 14px", lineHeight: .95 }}>Pojďme probrat<br />správné řešení.</h2>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn solid>Probrat projekt →</Btn>
              <Btn>Kontaktovat specialistu</Btn>
            </div>
          </div>
        </Reveal>
      </div>
      <WFFoot />
    </div>
  );
}

window.CaseStudyKarlin = CaseStudyKarlin;
