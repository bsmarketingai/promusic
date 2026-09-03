/* wf-shared.jsx — sdílené sketch primitivy pro wireframy PRO MUSIC */
const { useState } = React;

/* mono annotation tag */
function Tag({ children, acc }) {
  return <span className={"tag" + (acc ? " acc" : "")}>{children}</span>;
}

/* motion / media annotation tag (e.g. ⏵ VIDEO, ✦ MOTION, ⇅ PARALLAX) */
function Mtag({ children, ghost }) {
  return <span className={"mtag" + (ghost ? " ghost" : "")}>{children}</span>;
}

/* reveal-on-scroll wrapper (app wires the IntersectionObserver) */
function Reveal({ children, className, style, tag, ...rest }) {
  const T = tag || "div";
  return <T className={"reveal " + (className || "")} style={style} {...rest}>{children}</T>;
}

/* monochrome (white) logo wall */
function LogoWall({ items }) {
  return (
    <div className="logowall">
      {items.map((b, i) => {
        const star = typeof b === "object" && b.star;
        const name = typeof b === "object" ? b.name : b;
        return (
          <div key={i} className={"cell" + (star ? " star" : "")}>
            {name}{star && <span className="st">★</span>}
          </div>
        );
      })}
    </div>
  );
}

/* placeholder image box (no real photo) */
function Ph({ label, h, className, style }) {
  return (
    <div className={"ph " + (className || "")} style={{ height: h, ...(style || {}) }}>
      <span className="corner tl"></span>
      <span className="corner br"></span>
      <span className="phlbl">▦ {label}</span>
    </div>
  );
}

/* real photo inside a sketch frame + caption tag */
function Img({ src, cap, h, ratio, className, style }) {
  return (
    <figure className={"imgframe " + (className || "")} style={{ margin: 0, ...(style || {}) }}>
      <div className="imgwrap" style={{ height: h, aspectRatio: ratio }}>
        <img src={src} alt={cap || ""} loading="lazy" />
        {cap && <figcaption className="imgcap">▦ {cap}</figcaption>}
      </div>
    </figure>
  );
}

/* greeked body text lines */
function Lines({ n = 3, widths }) {
  const def = ["m", "", "s"];
  return (
    <div className="lines">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className={"tl " + ((widths && widths[i]) || def[i % def.length])}></div>
      ))}
    </div>
  );
}

function Btn({ children, solid }) {
  return <span className={"btn" + (solid ? " solid" : "")}>{children}</span>;
}

function Chip({ children, on, acc }) {
  return <span className={"chip" + (on ? " on" : "") + (acc ? " acc" : "")}>{children}</span>;
}

function Stat({ n, l }) {
  return (
    <div className="stat">
      <div className="n">{n}</div>
      <div className="l">{l}</div>
    </div>
  );
}

/* section number + label strip */
function Slab({ num, children }) {
  return (
    <div className="slab">
      <span className="num">{num}</span>
      <span className="ttl">{children}</span>
      <span className="rule"></span>
    </div>
  );
}

/* handwritten margin note with arrow */
function Note({ children, arrow = "↖" }) {
  return (
    <div className="note-row">
      <span className="arrow">{arrow}</span>
      <span className="annot note">{children}</span>
    </div>
  );
}

/* generic sketch top-nav used inside a wireframe screen */
function WFNav({ links, cta = "Školení →", variant }) {
  return (
    <div className={"wfnav " + (variant || "")}>
      <div className="wfnav-brand hand">PRO&nbsp;MUSIC</div>
      <nav className="wfnav-links">
        {links.map((l) => <span key={l} className="wfnav-link">{l}</span>)}
      </nav>
      <span className="czen" title="dvojjazyčně CZ / EN"><span className="on">CZ</span><span>EN</span></span>
      <Btn solid>{cta}</Btn>
    </div>
  );
}

/* footer block — kompletní patička */
function WFFoot() {
  const cols = [
    ["Služby", ["Ozvučení", "Osvětlení", "Zobrazovací technika", "Akustické studie & 3D", "Instalace na klíč", "Servis & pronájem"]],
    ["Reference", ["Turné & festivaly", "Divadla & scény", "Arény & stadiony", "TV & broadcast", "Case studies"]],
    ["Značky", ["L-Acoustics", "DiGiCo", "Ayrton", "ChamSys", "Audio-Technica", "Všechny značky →"]],
    ["Academy & firma", ["Školení & termíny", "Partner Program", "O firmě", "Kariéra", "Kontakt"]],
  ];
  return (
    <footer className="megafoot" data-zone="full">
      {/* ===== PRE-FOOTER CTA ===== */}
      <div className="foot-cta">
        <div className="wrap foot-cta-in">
          <div className="foot-cta-head">
            <div className="kicker">Pojďme spolupracovat</div>
            <h2 className="hand" style={{ fontSize: "clamp(36px,4vw,60px)", margin: "8px 0 0", lineHeight: 1.0 }}>
              Máte projekt? Ozvučíme ho.
            </h2>
          </div>
          <div className="foot-cta-actions">
            <Btn solid>Poptat realizaci →</Btn>
            <Btn>Domluvit konzultaci</Btn>
            <div className="foot-quick">
              <a className="foot-bigline" href="tel:+420000000000">+420 ___ ___ ___</a>
              <a className="foot-bigline" href="mailto:info@promusic.cz">info@promusic.cz</a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== NEWSLETTER ===== */}
      <div className="foot-news">
        <div className="wrap foot-news-in">
          <div className="foot-news-copy">
            <div className="kicker">Newsletter</div>
            <h3 className="hand" style={{ fontSize: 34, margin: "4px 0 0", lineHeight: .98 }}>Novinky z oboru, nové instalace a termíny školení</h3>
          </div>
          <form className="foot-news-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" className="foot-input" placeholder="vas@email.cz" aria-label="e-mail" />
            <Btn solid>Odebírat →</Btn>
          </form>
        </div>
        <div className="wrap"><Note arrow="↑">e-mail input + souhlas GDPR (doplníme)</Note></div>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="wrap foot-grid">
        {/* kontakt / brand */}
        <div className="foot-contact">
          <img className="foot-brand-logo" src="assets/brand/promusic-logo.png" alt="PRO MUSIC" />
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "var(--ink-soft)", letterSpacing: 1, marginBottom: 4 }}>PRO MUSIC, s.r.o.</div>
          <div className="foot-addr">
            <div>Horská 922</div>
            <div>541 01 Trutnov</div>
            <div>Česká republika</div>
          </div>
          <div className="foot-contlines">
            <a href="tel:+420000000000">+420 ___ ___ ___</a>
            <a href="mailto:info@promusic.cz">info@promusic.cz</a>
            <span className="foot-muted">IČO ________ · DIČ CZ________</span>
            <span className="foot-muted">Po–Pá 8:00–16:30</span>
          </div>
          <div className="foot-social">
            {["FB", "IG", "YT", "IN"].map((s) => <a key={s} className="soc" href="#" aria-label={s}>{s}</a>)}
          </div>
          <Note arrow="←">sídlo + tréninkové centrum · doplnit reálné kontakty</Note>
        </div>

        {/* menu sloupce */}
        <div className="foot-cols">
          {cols.map(([h, items]) => (
            <nav key={h} className="foot-col">
              <h4>{h}</h4>
              <ul>
                {items.map((it) => <li key={it}><a href="#">{it}</a></li>)}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="foot-bottom">
        <div className="wrap foot-bottom-in">
          <span className="foot-muted">© 2026 PRO MUSIC, s.r.o. · Professional show equipment</span>
          <div className="foot-legal">
            <a href="#">Ochrana osobních údajů</a>
            <a href="#">Cookies</a>
            <a href="#">Obchodní podmínky</a>
            <span className="czen" style={{ marginLeft: 4 }}><span className="on">CZ</span><span>EN</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===== MOBILNÍ NAVIGACE — celoobrazovkové overlay „setlist" ===== */
function MobileNav({ prace, instalace }) {
  const [open, setOpen] = useState(false);
  const [exp, setExp] = useState(null);

  const items = [
    { n: "01", label: "Práce", mega: prace },
    { n: "02", label: "Technologie" },
    { n: "03", label: "Instalace", mega: instalace },
    { n: "04", label: "Značky" },
    { n: "05", label: "Školení" },
    { n: "06", label: "Kontakt" },
  ];
  const toggle = (label) => setExp((cur) => (cur === label ? null : label));

  return (
    <React.Fragment>
      <button className="hamburger mob-only" aria-label="Otevřít menu" onClick={() => setOpen(true)}>
        <span></span><span></span><span></span>
      </button>

      <div className={"mobmenu" + (open ? " open" : "")} role="dialog" aria-modal="true">
        <div className="mobmenu-bg"><img src="assets/projekty/ed-sheeran/cervena-show.jpg" alt="" /></div>
        <div className="mobmenu-scrim"></div>

        <div className="mobmenu-inner">
          <div className="mobmenu-top">
            <img className="brand-logo" src="assets/brand/promusic-logo.png" alt="PRO MUSIC" />
            <div className="mobmenu-top-r">
              <span className="czen"><span className="on">CZ</span><span>EN</span></span>
              <button className="mobmenu-close" aria-label="Zavřít menu" onClick={() => { setOpen(false); setExp(null); }}>✕</button>
            </div>
          </div>

          <div className="mobmenu-kick">Setlist · navigace</div>

          <nav className="mobmenu-list">
            {items.map((it) => (
              <div className={"mobitem" + (exp === it.label ? " exp" : "")} key={it.label}>
                <div className="mobitem-row" onClick={() => it.mega ? toggle(it.label) : null}>
                  <span className="mobitem-n">{it.n}</span>
                  <a className="mobitem-label" href="#" onClick={(e) => { if (it.mega) e.preventDefault(); }}>{it.label}</a>
                  {it.mega && <span className="mobitem-plus">{exp === it.label ? "–" : "+"}</span>}
                </div>
                {it.mega && (
                  <div className="mobitem-sub">
                    {it.mega.cols.map(([h, links]) => (
                      <div className="mobsub-col" key={h}>
                        <h6>{h}</h6>
                        <ul>{links.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <a className="mobmenu-feat" href="instalace-hd-karlin.html">
            <div className="mobmenu-feat-img"><img src="assets/projekty/karlin/zvukar-foh.jpg" alt="" /></div>
            <div className="mobmenu-feat-meta">
              <span className="tag acc">NEJNOVĚJŠÍ</span>
              <strong>HD Karlín — DiGiCo Quantum 7T</strong>
              <span className="mobmenu-feat-go">Zobrazit realizaci →</span>
            </div>
          </a>

          <a className="mobmenu-cta" href="#">Přihlásit se na školení →</a>

          <div className="mobmenu-contact">
            <div className="mobmenu-cont-block">
              <div className="k">Kontakt</div>
              <a href="tel:+420000000000">+420 ___ ___ ___</a>
              <a href="mailto:info@promusic.cz">info@promusic.cz</a>
            </div>
            <div className="mobmenu-cont-block">
              <div className="k">Sídlo &amp; tréninkové centrum</div>
              <span>Horská 922, 541 01 Trutnov</span>
              <span className="muted">Po–Pá 8:00–16:30</span>
            </div>
            <div className="mobmenu-social">
              {["FB", "IG", "YT", "IN"].map((s) => <a key={s} className="soc" href="#" aria-label={s}>{s}</a>)}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { Tag, Mtag, Reveal, LogoWall, Ph, Img, Lines, Btn, Chip, Stat, Slab, Note, WFNav, WFFoot, MobileNav });
