/* wf-directionA.jsx — SMĚR A: Showreel / Cinematic (dark, video-first) */
function DirectionA() {
  const megaPrace = {
    cols: [
      ["Přehled", ["Celé portfolio", "Showreel", "Case studies"]],
      ["Podle typu", ["Turné & koncerty", "Festivaly", "TV & broadcast / přenosy", "Eventy & korporát"]],
    ],
    feat: { img: "assets/projekty/ed-sheeran/ohnostroj.jpg", tag: "CASE STUDY", title: "Ed Sheeran — Mathematics", href: "Case study — Ed Sheeran.html" },
  };
  const megaInstalace = {
    cols: [
      ["Podle prostoru", ["Divadla & kulturní sály", "Arény & stadiony", "Kluby & music venues", "Hotely, restaurace & bary", "Konferenční & korporátní", "Kina · sakrální · auly"]],
      ["Jak to děláme", ["Konzultace", "Akustická studie & 3D (SoundVision)", "Návrh & realizace", "Oživení & ladění (Smaart)", "Servis & péče"]],
    ],
    feat: { img: "assets/projekty/djkt-plzen/sal-pohled.jpg", tag: "INSTALACE", title: "Nová scéna DJKT Plzeň", href: "#" },
  };
  return (
    <div className="screen dirA">
      {/* ===== STICKY HLAVNÍ MENU ===== */}
      <header className="sitenav">
        <div className="sitenav-inner">
          <img className="brand-logo" src="assets/brand/promusic-logo.png" alt="PRO MUSIC" />
          <nav className="wfnav-links desk-only" style={{ flex: 1, marginLeft: 34 }}>
            <NavMega label="Práce" data={megaPrace} />
            <span className="wfnav-link">Technologie</span>
            <NavMega label="Instalace" data={megaInstalace} />
            <span className="wfnav-link">Značky</span>
            <span className="wfnav-link">Školení</span>
            <span className="wfnav-link">Kontakt</span>
          </nav>
          <span className="czen desk-only"><span className="on">CZ</span><span>EN</span></span>
          <span className="desk-only"><Btn solid>Probrat projekt →</Btn></span>
          <MobileNav prace={megaPrace} instalace={megaInstalace} />
        </div>
      </header>

      {/* ===== VIDEO HERO / SHOWREEL — full-bleed ===== */}
      <section className="hero-full" data-zone="full">
          <div className="vhero fb">
            <div className="vbg parallax" data-par="0.18">
              <img src="assets/projekty/ed-sheeran/cervena-show.jpg" alt="" />
            </div>
            <div className="scrim"></div>

            <div className="playbtn">▶</div>

            <div className="vcontent">
              <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                <Mtag>⏵ Fullscreen showreel · video loop</Mtag>
                <Mtag>✦ Motion: claim fade-in</Mtag>
              </div>
              <div className="kicker" style={{ color: "#fff", opacity: .85 }}>Profesionální audio &amp; light · od 1997</div>
              <h1 className="hand hero-claim" style={{ fontSize: "calc(clamp(54px,9vw,128px) * var(--type,1))", margin: "6px 0 8px", lineHeight: .86 }}>
                Zvuk, který<br />cítíš v hrudi.
              </h1>
              <p className="hero-sub">
                Dodáváme špičkové profesionální technologie — a rozumíme tomu, aby to celé fungovalo. Od koncertních pódií po stálé instalace.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 22, alignItems: "center", flexWrap: "wrap" }}>
                <Btn solid>Probrat projekt →</Btn>
                <Btn>Přehrát showreel ▶</Btn>
                <span style={{ marginLeft: "auto", fontFamily: "'Space Mono',monospace", fontSize: 10, opacity: .7 }}>↓ scroll</span>
              </div>
            </div>
          </div>
      </section>

      <div className="wrap">
        <Note arrow="↑">full-bleed hero · velká koncertní fotka/video + silný claim · 100% dark</Note>

        {/* ===== STAT STRIP ===== */}
        <Reveal tag="section" className="sec tight">
          <div className="sbox" data-stagger style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            <Stat n="28 let" l="zkušeností od 1997" />
            <Stat n="17" l="zemí Evropy · Rammstein" />
            <Stat n="20+" l="světových značek" />
            <Stat n="3×" l="L-ISA instalace v ČR" />
          </div>
        </Reveal>

        {/* ===== CO ŘEŠÍTE? — segmentace podle situace ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="01">Co řešíte?</Slab>
          <p className="sec-lead">Najděte se ve své situaci — ne v katalogu. Každá cesta vede k relevantním referencím a správnému řešení.</p>
          <div className="segments" data-stagger>
            {[
              ["Live · rental · produkce", "turné, koncerty, festivaly, eventy"],
              ["Kulturní domy, sály & divadla", "stálé instalace, akustika, provoz"],
              ["Broadcast & studia", "přenosy, nahrávání, monitoring"],
              ["Systémoví integrátoři", "vybrané části systému do hloubky"],
              ["Školy, univerzity & veřejný sektor", "auly, veřejné zakázky, projekty"],
              ["Školení & vzdělávání", "PRO MUSIC Academy, certifikace"],
              ["Servis · RMA · lifecycle", "záruka, podpora, dlouhodobý provoz"],
              ["Architekti & projektanti", "návrh, 3D simulace, dokumentace"],
            ].map(([t, d], i) => (
              <a className="segcard" href="#" key={i}>
                <span className="segnum">{String(i + 1).padStart(2, "0")}</span>
                <strong>{t}</strong>
                <span className="segd">{d}</span>
                <span className="seggo">Vstoupit →</span>
              </a>
            ))}
          </div>
          <Note arrow="↑">vstupy podle toho, co návštěvník řeší — segmentace, ne kategorie produktů</Note>
        </Reveal>
      </div>

      {/* ===== TECHNOLOGIE — full-bleed split, fotka vytéká ===== */}
      <Reveal tag="section" data-zone="full" className="techfull">
        <div className="copy">
          <Slab num="02">Technologie &amp; know-how</Slab>
          <Tag acc>IMERZIVNÍ ZVUK</Tag>
          <h2 className="hand reveal rt" style={{ fontSize: "calc(52px * var(--type,1))", margin: "10px 0 8px", lineHeight: .95 }}>
            L-ISA &amp; L-Acoustics Ambiance
          </h2>
          <Lines n={3} widths={["m", "", "s"]} />
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            <Chip acc>L-ISA hyperreal</Chip>
            <Chip acc>Ambiance · virtuální akustika</Chip>
            <Chip acc>SoundVision 3D</Chip>
            <Chip acc>Smaart měření</Chip>
          </div>
          <Note arrow="↙">světová premiéra Ambiance proběhla v Plzni — silný „tech“ příběh</Note>
        </div>
        <div className="pic">
          <img src="assets/projekty/djkt-plzen/array-strop.jpg" alt="" data-zoom="0.07" />
          <span className="ovlogo">▢ L-ACOUSTICS</span>
          <span className="imgcap" style={{ position: "absolute", right: 14, bottom: 16, left: "auto" }}>▦ Nová scéna DJKT</span>
        </div>
      </Reveal>

      {/* ===== PORTFOLIO — full-bleed parallax bands ===== */}
      <Reveal tag="section" id="vybrane-realizace" className="sec band-dark" data-zone="full" style={{ marginTop: 20 }}>
        <div className="wrap">
          <Slab num="03">Vybrané realizace</Slab>
        </div>
        <div className="wrap" data-stagger style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <FbBand img="assets/projekty/ed-sheeran/ohnostroj.jpg" cap="Ed Sheeran · Cardiff" logo="AYRTON"
            tag="TURNÉ / SVĚTLA" title="Ed Sheeran — Mathematics Tour" meta="Ayrton rig · stadiony Evropy" />
          <FbBand flip img="assets/projekty/steel-arena/projekce-barvy.jpg" cap="Steel Aréna Košice" logo="AYRTON DOMINO"
            tag="ARÉNA / SVĚTLA" title="Ayrton Domino Profile, Košice" meta="multifunkční hala · projekce na led" />
          <FbBand img="assets/projekty/djkt-plzen/sal-pohled.jpg" cap="Nová scéna DJKT Plzeň" logo="L-ACOUSTICS"
            tag="INSTALACE / ZVUK" title="Světová premiéra L-Acoustics Ambiance" meta="virtuální akustika · 460 diváků" />
        </div>
        <div className="wrap" style={{ textAlign: "center", marginTop: 26 }}>
          <Btn>Celé portfolio (40+) →</Btn>
        </div>
      </Reveal>

      {/* ===== STATEMENT — full-bleed foto + obří typo + mono logo ===== */}
      <Reveal tag="section" data-zone="full" className="statement">
        <div className="bg"><img src="assets/projekty/ed-sheeran/cervena-show.jpg" alt="" data-zoom="0.08" /></div>
        <div className="scrim2"></div>
        <span className="biglogo">▢ mono logo značky / interpreta</span>
        <div className="inner">
          <div className="reveal rt">
            <div className="kicker" style={{ color: "#fff", opacity: .8 }}>od návrhu po poslední decibel</div>
            <h2 className="hand" style={{ fontSize: "calc(clamp(44px,7vw,104px) * var(--type,1))", color: "#fff", margin: "8px 0 6px", lineHeight: .9 }}>
              Když zhasnou světla,<br />začíná naše práce.
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <Mtag>✦ text rise on scroll</Mtag><Mtag>⊕ jemný zoom-out</Mtag>
          </div>
        </div>
      </Reveal>

      <div className="wrap">
        {/* ===== ZNAČKY (mono white logo wall) ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="04">Zastupujeme světovou špičku</Slab>
          <LogoWall items={[
            { name: "L-Acoustics", star: true }, { name: "DiGiCo", star: true }, { name: "Ayrton", star: true },
            "ChamSys", "Audio-Technica", "Luminex", "DirectOut", "Naostage", "Yamaha", "High End", "Antelope", "Waves",
          ]} />
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <Mtag ghost>jen monochromatická bílá loga</Mtag>
            <Mtag ghost>✦ hover: rozsvícení loga</Mtag>
          </div>
        </Reveal>
      </div>

      {/* ===== SHOWREEL — full-bleed, velké náhledy ===== */}
      <Reveal tag="section" data-zone="full" className="sec showreel-full">
        <div className="wrap" style={{ marginBottom: 18 }}><Slab num="05">Showreel</Slab></div>
        <div className="reel-full" data-stagger>
          {[
            ["assets/projekty/ed-sheeran/stage-modra.jpg", "Stadion"],
            ["assets/projekty/steel-arena/projekce-led.jpg", "Aréna"],
            ["assets/projekty/djkt-plzen/rig-svetla.jpg", "Divadlo"],
            ["assets/projekty/ed-sheeran/sing-pultiky.jpg", "Festival"],
            ["assets/projekty/karlin/foh-jeviste.jpg", "Instalace"],
          ].map(([src, l], i) => (
            <div className="clip" key={i}>
              <img src={src} alt="" />
              <span className="play">▶</span>
              <span className="imgcap" style={{ position: "absolute" }}>{l}</span>
            </div>
          ))}
        </div>
        <div className="wrap"><Note arrow="↑">velké náhledy videí přes celou šířku · hover = přehrát</Note></div>
      </Reveal>

      <div className="wrap">
        {/* ===== PARTNER PROGRAM ===== */}
        <Reveal tag="section" className="sec tight">
          <Slab num="06">PRO MUSIC Professional Partner Program</Slab>
          <div className="partners" data-stagger>
            {Array.from({ length: 10 }).map((_, i) => (
              <div className="pcell" key={i}>logo partnera</div>
            ))}
          </div>
          <Note arrow="↑">partneři/produkční firmy, kteří používají naše systémy (loga doplní klient)</Note>
        </Reveal>

        {/* ===== REFERENCE — wall of proof ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="07">Reference</Slab>

          {/* čísla měřítka */}
          <div className="refcounts">
            <Stat n="40+" l="divadel & scén" />
            <Stat n="25" l="arén & hal" />
            <Stat n="∞" l="festivalů & turné" />
            <Stat n="3×" l="L-ISA v ČR" />
          </div>

          {/* filtry podle typu */}
          <div className="idx-filter" style={{ marginBottom: 18 }}>
            {["Vše", "Divadla", "Arény & stadiony", "TV & broadcast", "Školy & veřejný sektor", "Festivaly"].map((f, i) =>
              <Chip key={f} on={i === 0}>{f}</Chip>)}
          </div>

          {/* vlajkové foto-dlaždice */}
          <div className="reffeat mosaic" data-stagger>
            <RefTile img="assets/projekty/djkt-plzen/sal-pohled.jpg" logo="DJKT PLZEŇ" typ="DIVADLO" />
            <RefTile img="assets/projekty/steel-arena/projekce-barvy.jpg" logo="STEEL ARÉNA" typ="ARÉNA" />
            <RefTile img="assets/projekty/ed-sheeran/stage-modra.jpg" logo="EUROVIZE '24" typ="TV / BROADCAST" />
          </div>

          {/* mono logo-wall referencí */}
          <LogoWall items={[
            "Hudební divadlo Karlín", "Nová scéna DJKT", "UFFO Trutnov", "Husa na provázku", "Malostranská Beseda", "Steel Aréna Košice",
            "O2 Arena", "ČEZ Arena", "Český rozhlas", "AMU / univerzity", "Zimní stadion Trutnov", "+ další",
          ]} />
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <Mtag ghost>bílá mono loga referencí</Mtag>
            <Mtag ghost>✦ hover: rozsvícení + foto</Mtag>
            <Mtag ghost>filtr = živá změna mřížky</Mtag>
          </div>
        </Reveal>

        {/* ===== PROČ ŠKOLENÍ (vede ke konverzi) ===== */}
        <Reveal tag="section" className="sec">
          <Slab num="08">Proč školení v PRO MUSIC Academy</Slab>

          {/* tři důvody */}
          <div className="acad3" data-stagger>
            {[
              ["Oficiální tréninky", "Certifikované kurzy L-Acoustics, DiGiCo i ChamSys přímo od výhradního distributora — ne přeprodané z druhé ruky."],
              ["Praxe na špičce", "Učíte se na reálné technice ve vlastním prezentačním a tréninkovém centru v Trutnově. Žádná teorie do šuplíku."],
              ["Posun v kariéře", "Osvědčení uznávané v oboru. Otevírá cestu k většým produkcím, instalacím i lepší pozici v týmu."],
            ].map(([t, d], i) => (
              <div className="sbox" key={i}>
                <div className="hand" style={{ fontSize: 30, color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</div>
                <strong style={{ display: "block", fontFamily: "'Space Mono',monospace", fontSize: 13, margin: "6px 0 8px" }}>{t}</strong>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: "var(--ink-soft)" }}>{d}</p>
              </div>
            ))}
          </div>

          {/* pro koho + jak to funguje */}
          <div className="acadsplit">
            <div className="sbox alt">
              <Tag acc>PRO KOHO</Tag>
              <h3 className="hand" style={{ fontSize: 34, margin: "8px 0 14px", lineHeight: .98 }}>Pro koho je školení</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Zvukaři FOH / monitor", "Light designeři", "AV integrátoři", "Divadelní technici", "Produkční", "Systémoví technici", "Studenti oboru"].map((c) =>
                  <Chip key={c}>{c}</Chip>)}
              </div>
              <Note arrow="↙">jasně řekni návštěvníkovi „tohle jsi ty“</Note>
            </div>

            <div className="sbox">
              <Tag acc>JAK TO FUNGUJE</Tag>
              <h3 className="hand" style={{ fontSize: 34, margin: "8px 0 10px", lineHeight: .98 }}>Termíny, cena &amp; dotace</h3>
              <div className="infolist">
                <InfoRow k="Termíny" v="Pravidelně — jarní a podzimní bloky (System & Workflow, Smaart, light)." />
                <InfoRow k="Místo" v="Tréninkové centrum Trutnov + Home of AV, Voděrádky u Prahy." />
                <InfoRow k="Úrovně" v="Od nezbytného základu po pokročilé ladění systémů." />
                <InfoRow k="Cena & dotace" v="Firemní vzdělávání, možnost dotace ÚP / ESF, množstevní sleva pro týmy." />
              </div>
            </div>
          </div>
          <Note arrow="↑">odpovědi na „proč, pro koho, kdy, za kolik“ → pak teprve CTA</Note>
        </Reveal>

        {/* ===== UJIŠTĚNÍ + KONTAKT (krok 4–5 positioningu) ===== */}
        <Reveal tag="section" className="sec">
          <div className="assure">
            <Tag acc>PROČ PRO MUSIC</Tag>
            <p className="assure-claim">Neprodáváme techniku bez know-how. Víme, co spolu funguje, co se nesmí pokazit a jak z technologie dostat maximum.</p>
            <Lines n={2} widths={["m", "s"]} />
          </div>
          <div className="ctabanner" style={{ marginTop: 22 }}>
            <div className="kicker">Máte projekt?</div>
            <h2 className="hand" style={{ fontSize: "calc(56px * var(--type,1))", margin: "8px 0 10px", lineHeight: .95 }}>Pojďme probrat<br />správné řešení.</h2>
            <p className="sec-lead" style={{ margin: "0 auto 18px", textAlign: "center" }}>Žádný tlak — jen odborný rozhovor o tom, co řešíte, a jak to udělat spolehlivě.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn solid>Probrat projekt →</Btn>
              <Btn>Kontaktovat specialistu</Btn>
              <Btn>Domluvit školení</Btn>
            </div>
            <Note arrow="↑">hlavní CTA = kvalifikovaný kontakt (Probrat projekt) · školení jako jedna z cest</Note>
          </div>
        </Reveal>
      </div>
      <WFFoot />
    </div>
  );
}

function FbBand({ img, cap, tag, title, meta, logo, flip }) {
  const txt = (
    <div className="txt" style={{ order: flip ? 2 : 1 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <Tag acc>{tag}</Tag><Mtag>⇅ parallax + zoom</Mtag>
      </div>
      <h3 className="hand" style={{ fontSize: 38, margin: "0 0 12px", lineHeight: 1.04 }}>{title}</h3>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "var(--ink-soft)", margin: "0 0 14px" }}>{meta}</div>
      <Lines n={2} widths={["m", "s"]} />
      <div style={{ marginTop: 14 }}><Btn>Případová studie →</Btn></div>
    </div>
  );
  const pic = (
    <div className="half" style={{ order: flip ? 1 : 2 }}>
      <img src={img} alt={cap} data-tilt="18" data-tilt-rot="6" />
      {logo && <span className="bandlogo">▢ {logo}</span>}
      <span className="imgcap" style={{ position: "absolute" }}>▦ {cap}</span>
    </div>
  );
  return <div className="fb-band">{txt}{pic}</div>;
}

function RefCol({ h, items }) {
  return (
    <div className="refcol">
      <h4>{h}</h4>
      <div className="reflist">
        {items.map((it, i) => (
          <div className="refitem" key={i}><span className="lg"></span>{it}</div>
        ))}
      </div>
    </div>
  );
}

function RefTile({ img, logo, typ }) {
  return (
    <div className="reftile">
      <img src={img} alt={logo} className="parallax" data-par="0.05" />
      <div className="ov">
        <span className="typ"><Tag acc>{typ}</Tag></span>
        <span className="logo">{logo}</span>
      </div>
    </div>
  );
}

function InfoRow({ k, v }) {
  return (
    <div className="inforow">
      <span className="k">{k}</span>
      <span style={{ fontSize: 12.5, lineHeight: 1.5 }}>{v}</span>
    </div>
  );
}

function NavMega({ label, data }) {
  return (
    <div className="navitem" tabIndex={0}>
      <span className="wfnav-link has-mega">{label} <span className="caret">▾</span></span>
      <div className="megapanel">
        <div className="megacols">
          {data.cols.map(([h, items]) => (
            <div className="megacol" key={h}>
              <h5>{h}</h5>
              <ul>{items.map((it) => <li key={it}><a href="#">{it}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <a className="megafeat" href={data.feat.href}>
          <div className="megafeat-img"><img src={data.feat.img} alt="" /></div>
          <div className="megafeat-meta">
            <Tag acc>{data.feat.tag}</Tag>
            <strong>{data.feat.title}</strong>
            <span className="megafeat-go">Zobrazit →</span>
          </div>
        </a>
      </div>
    </div>
  );
}

window.DirectionA = DirectionA;
Object.assign(window, { FbBand, RefCol, RefTile, InfoRow });
