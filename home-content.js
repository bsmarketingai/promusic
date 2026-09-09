/* PRO MUSIC — hi-fi homepage obsah (Směr A · Cinematic)
   Kompletní homepage dle wireframu. Vykreslí do #app + motion + nav interakce. */
(function () {
  const P = "assets/projekty/";
  const L = "assets/brand/logos/";
  const LOGO = "assets/brand/promusic-logo.png";

  const megaPrace = {
    cols: [
      ["Přehled", ["Celé portfolio", "Showreel", "Case studies"]],
      ["Podle typu", ["Turné & koncerty", "Festivaly", "TV & broadcast", "Eventy & korporát"]],
    ],
    feat: { img: P + "ed-sheeran/ohnostroj.jpg", tag: "CASE STUDY", title: "Ed Sheeran — Mathematics", href: "live-ed-sheeran.html" },
  };
  const megaInstalace = {
    cols: [
      ["Podle prostoru", ["Divadla & sály", "Arény & stadiony", "Kluby & venues", "Hotely & bary", "Konferenční", "Kina · sakrální"]],
      ["Jak to děláme", ["Konzultace", "Akustická studie & 3D", "Návrh & realizace", "Oživení & ladění", "Servis & péče"]],
    ],
    feat: { img: P + "djkt-plzen/sal-pohled.jpg", tag: "INSTALACE", title: "Nová scéna DJKT Plzeň", href: "#" },
  };
  const navItems = [
    { l: "Live & turné", mega: megaPrace }, { l: "Technologie" }, { l: "Stálé instalace", mega: megaInstalace },
    { l: "Značky" }, { l: "Školení" }, { l: "Kontakt" },
  ];

  const segments = [
    ["Live · rental · produkce", "turné, koncerty, festivaly, eventy", "live-a-turne.html"],
    ["Kulturní domy, sály & divadla", "stálé instalace, akustika, provoz", "instalace-kulturni-domy-saly-divadla.html"],
    ["Broadcast & studia", "přenosy, nahrávání, monitoring"],
    ["Systémoví integrátoři", "vybrané části systému do hloubky"],
    ["Školy & veřejný sektor", "auly, veřejné zakázky, projekty"],
    ["Školení & vzdělávání", "PRO MUSIC Academy, certifikace"],
    ["Servis · RMA · lifecycle", "záruka, podpora, dlouhodobý provoz"],
    ["Architekti & projektanti", "návrh, 3D simulace, dokumentace"],
  ];

  const logos = [
    { f: "l-acoustics", n: "L-Acoustics", star: true }, { f: "digico", n: "DiGiCo", star: true },
    { f: "ayrton", n: "Ayrton", star: true, sq: true }, { f: "chamsys", n: "ChamSys" },
    { f: "audio-technica", n: "Audio-Technica" }, { f: "luminex", n: "Luminex" },
    { f: "directout", n: "DirectOut" }, { f: "naostage", n: "Naostage" },
  ];

  const reel = [
    [P + "ed-sheeran/stage-modra.jpg", "Stadion · Ed Sheeran"], [P + "steel-arena/projekce-led.jpg", "Aréna · Košice"],
    [P + "djkt-plzen/rig-svetla.jpg", "Divadlo · DJKT"], [P + "ed-sheeran/sing-pultiky.jpg", "Festival"],
    [P + "karlin/foh-jeviste.jpg", "Instalace · Karlín"], [P + "ed-sheeran/cervena-show.jpg", "Show · Mathematics"],
    [P + "steel-arena/projekce-barvy.jpg", "Projekce · LED"], [P + "djkt-plzen/array-strop.jpg", "L-ISA · array"],
    [P + "ed-sheeran/ohnostroj.jpg", "Pyro · Cardiff"],
  ];

  const refTiles = [
    [P + "djkt-plzen/sal-pohled.jpg", "DJKT PLZEŇ", "DIVADLO", "divadlo"],
    [P + "steel-arena/projekce-barvy.jpg", "STEEL ARÉNA", "ARÉNA", "arena"],
    [P + "ed-sheeran/stage-modra.jpg", "EUROVIZE '24", "TV / BROADCAST", "tv"],
  ];
  const refNames = ["Hudební divadlo Karlín", "Nová scéna DJKT", "UFFO Trutnov", "Husa na provázku",
    "Steel Aréna Košice", "O2 Arena", "ČEZ Arena", "Český rozhlas", "AMU / univerzity", "Zimní stadion Trutnov"];

  const WPATH = "M0 60 L5 58.78 L15 56.35 L30 52.73 L50 47.96 L75 42.21 L100 36.75 L130 30.74 L160 25.44 L190 21 L220 17.52 L250 15.08 L280 13.75 L300 13.5 L320 13.75 L350 15.08 L380 17.52 L410 21 L440 25.44 L470 30.74 L500 36.75 L525 42.21 L550 47.96 L570 52.73 L585 56.35 L595 58.78 L600 60 L610 61.54 L630 64.61 L655 68.38 L685 72.7 L715 76.71 L745 80.31 L780 83.87 L810 86.28 L840 88.06 L870 89.14 L900 89.5 L930 89.14 L960 88.06 L990 86.28 L1020 83.87 L1050 80.86 L1080 77.34 L1110 73.39 L1140 69.12 L1170 64.61 L1195 60.77 L1200 60 L1195 61.22 L1170 67.27 L1140 74.37 L1110 81.11 L1080 87.33 L1050 92.88 L1020 97.62 L990 101.43 L960 104.22 L930 105.93 L900 106.5 L870 105.93 L840 104.22 L810 101.43 L780 97.62 L750 92.88 L720 87.33 L690 81.11 L660 74.37 L630 67.27 L600 60 L585 57.69 L570 55.39 L550 52.36 L525 48.71 L500 45.25 L470 41.44 L440 38.08 L410 35.26 L380 33.05 L350 31.51 L320 30.66 L300 30.5 L280 30.66 L250 31.51 L220 33.05 L190 35.26 L160 38.08 L130 41.44 L100 45.25 L75 48.71 L50 52.36 L30 55.39 L15 57.69 L5 59.23 L0 60 Z";
  const WDEFS = `<defs><linearGradient id="pmWaveGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4439"/><stop offset="1" stop-color="#201d18"/></linearGradient></defs>`;
  const wave = `<div class="wavediv"><svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">${WDEFS}<path d="${WPATH}"/></svg></div>`;
  const waveEdge = `<div class="wavediv band-edge"><svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">${WDEFS}<path d="${WPATH}"/></svg></div>`;

  const megaPanel = (m) => `
    <div class="megapanel">
      <div class="megacols">
        ${m.cols.map(([h, items]) => `<div class="megacol"><h5>${h}</h5><ul>${items.map(it => `<li><a href="#">${it}</a></li>`).join("")}</ul></div>`).join("")}
      </div>
      <a class="megafeat" href="${m.feat.href}">
        <div class="megafeat-img"><img src="${m.feat.img}" alt="" /></div>
        <div class="megafeat-meta"><ui-tag>${m.feat.tag}</ui-tag><strong>${m.feat.title}</strong><span class="megafeat-go">Zobrazit<ui-icon class="btn-ico" name="ui-arrow-right" aria-hidden="true"></ui-icon></span></div>
      </a>
    </div>`;

  const html = `

  <!-- HERO -->
  <header class="hero">
    <div class="hero-bg" id="heroBg">
      <div class="hero-slide is-active" style="background-image:url(${P}ed-sheeran/cervena-show.jpg)" data-par="0.12"></div>
      <div class="hero-slide" style="background-image:url(${P}steel-arena/projekce-barvy.jpg)" data-par="0.12"></div>
      <div class="hero-slide" style="background-image:url(${P}djkt-plzen/sal-pohled.jpg)" data-par="0.12"></div>
    </div>
    <div class="wrap hero-wrap">
      <div class="hero-grid">
        <div class="hero-content">
          <span class="eyebrow">Profesionální audio &amp; light · od 1997</span>
          <h1 class="display">Zvuk, který<br/>cítíš v hrudi.</h1>
          <p class="lead">Dodáváme špičkové profesionální technologie — a&nbsp;rozumíme tomu, aby to celé fungovalo. Od koncertních pódií po stálé instalace v&nbsp;divadlech a&nbsp;arénách.</p>
          <div class="cta-actions">
            <ui-button variant="primary" size="lg">Probrat projekt →</ui-button>
            <ui-button variant="ghost" size="lg">Přehrát showreel ▶</ui-button>
          </div>
        </div>
        <!-- náhledové boxy referencí -->
        <div class="hero-cards" id="heroCards">
          <a class="hero-card outline-glow is-active" href="live-ed-sheeran.html" style="--d:0">
            <span class="hc-img"><img src="${P}ed-sheeran/ohnostroj.jpg" alt="" /></span>
            <span class="hc-meta"><span class="hc-kicker">Toto jsme nasvítili</span><span class="hc-title">Ed Sheeran · Mathematics Tour</span></span>
          </a>
          <a class="hero-card outline-glow" href="#" style="--d:1">
            <span class="hc-img"><img src="${P}steel-arena/projekce-barvy.jpg" alt="" /></span>
            <span class="hc-meta"><span class="hc-kicker">Tady jsme rozsvítili arénu</span><span class="hc-title">Steel Aréna Košice · Ayrton</span></span>
          </a>
          <a class="hero-card outline-glow" href="instalace-kulturni-domy-saly-divadla.html" style="--d:2">
            <span class="hc-img"><img src="${P}djkt-plzen/array-strop.jpg" alt="" /></span>
            <span class="hc-meta"><span class="hc-kicker">Zde jsme instalovali L-ISA</span><span class="hc-title">Nová scéna DJKT Plzeň</span></span>
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- STATS -->
  <section class="sec-tight reveal stage-glow" id="statsGlow"><div class="wrap"><ui-stats><ui-stat n="28" u="let">zkušeností od 1997</ui-stat><ui-stat n="17">zemí Evropy · Rammstein</ui-stat><ui-stat n="20" u="+">světových značek</ui-stat><ui-stat n="3" u="×">L-ISA instalace v ČR</ui-stat></ui-stats></div></section>

  <!-- 01 CO ŘEŠÍTE -->
  <section class="sec reveal"><div class="wrap">
    <div class="sec-head"><span class="idx">01</span><h2>Co řešíte?</h2><span class="rule"></span></div>
    <p class="lead" style="margin:-18px 0 34px">Najděte se ve své situaci — ne v katalogu. Každá cesta vede k relevantním referencím a správnému řešení.</p>
    <div class="segments" data-stagger>
      ${segments.map(([t, d, href], i) => `<a class="segcard" href="${href || '#'}"><span class="sn">${String(i + 1).padStart(2, "0")}</span><strong>${t}</strong><span class="sd">${d}</span><span class="sg">Vstoupit<ui-icon class="btn-ico" name="ui-arrow-right" aria-hidden="true"></ui-icon></span></a>`).join("")}
    </div>
  </div></section>

  <!-- 02 TECHNOLOGIE -->
  <section class="sec band wave-band reveal"><div class="wrap">
    <div class="sec-head"><span class="idx">02</span><h2>Technologie &amp; know-how</h2><span class="rule"></span></div>
    <div class="feature">
      <div>
        <ui-tag>Imerzivní zvuk</ui-tag>
        <h2 style="font-size:clamp(2rem,3.4vw,3rem);margin:14px 0 0">L-ISA &amp; L-Acoustics Ambiance</h2>
        <p class="lead" style="margin-top:16px">Hyperrealistický prostorový zvuk a virtuální akustika. Světová premiéra Ambiance proběhla v Plzni — neprodáváme techniku bez know-how, jak ji správně nasadit.</p>
        <div class="chips"><span class="chip chip-accent">L-ISA hyperreal</span><span class="chip chip-accent">Ambiance</span><span class="chip chip-accent">SoundVision 3D</span><span class="chip chip-accent">Smaart měření</span></div>
        <div class="cta-actions" style="margin-top:26px"><ui-button variant="primary" href="instalace-hd-karlin-schema.html">Prohlédnout realizaci HD Karlín →</ui-button></div>
      </div>
      <div class="feature-media"><img src="${P}djkt-plzen/array-strop.jpg" alt="" /><span class="ov-logo">L-ACOUSTICS</span></div>
    </div>
  </div></section>

  <!-- 03 VYBRANÉ PROJEKTY -->
  <section class="sec reveal"><div class="wrap-wide">
    <div class="sec-head"><span class="idx">03</span><h2>Vybrané projekty</h2><span class="rule"></span></div>
    <div class="work" data-stagger>
      <a class="workcard col-7" href="live-ed-sheeran.html"><img src="${P}ed-sheeran/ohnostroj.jpg" alt="" /><span class="wlogo">AYRTON</span><div class="ov"><ui-tag solid>Turné / Světla</ui-tag><h3>Ed Sheeran — Mathematics Tour</h3><span class="wmeta">Ayrton rig · stadiony Evropy</span></div></a>
      <a class="workcard col-5" href="stale-instalace.html?f=Ar%C3%A9ny%20%26%20stadiony"><img src="${P}steel-arena/projekce-barvy.jpg" alt="" /><span class="wlogo">AYRTON DOMINO</span><div class="ov"><ui-tag solid>Aréna / Světla</ui-tag><h3>Steel Aréna Košice</h3><span class="wmeta">multifunkční hala · projekce</span></div></a>
      <a class="workcard col-6" href="instalace-hd-karlin-schema.html"><img src="${P}karlin/zvukar-foh.jpg" alt="" /><span class="wlogo">DiGiCo</span><div class="ov"><ui-tag solid>Instalace / Zvuk</ui-tag><h3>Hudební divadlo Karlín</h3><span class="wmeta">DiGiCo Quantum 7T · muzikál</span></div></a>
      <a class="workcard col-6" href="stale-instalace.html?f=Divadla%20%26%20s%C3%A1ly"><img src="${P}djkt-plzen/array-strop.jpg" alt="" /><span class="wlogo">L-ACOUSTICS</span><div class="ov"><ui-tag solid>Instalace / Zvuk</ui-tag><h3>Nová scéna DJKT Plzeň</h3><span class="wmeta">L-Acoustics Ambiance · premiéra</span></div></a>
    </div>
    <div style="text-align:center;margin-top:34px"><ui-button variant="ghost" href="live-a-turne.html">Celé portfolio →</ui-button></div>
  </div></section>

  <!-- STATEMENT -->
  <section class="statement reveal">
    <div class="bg"><img data-par="0.1" src="${P}steel-arena/projekce-led.jpg" alt="" /></div>
    <div class="scrim"></div><span class="wlogo">PRO MUSIC</span>
    <div class="wrap inner">
      <span class="eyebrow" style="color:#fff">od návrhu po poslední decibel</span>
      <h2 style="margin-top:12px">Když zhasnou světla, začíná naše práce.</h2>
      <div class="who">Servis, ladění a školení — aby to fungovalo i za pět let.</div>
      <div class="cta-actions" style="margin-top:26px"><ui-button variant="primary" size="lg">Probrat projekt →</ui-button><ui-button variant="ghost" size="lg" href="instalace-hd-karlin-schema.html">Prohlédnout realizaci →</ui-button></div>
    </div>
  </section>

  <!-- 04 SHOWREEL -->
  <section class="sec reveal"><div class="wrap-wide">
    <div class="sec-head"><span class="idx">04</span><h2>Showreel</h2><span class="rule"></span></div>
    <div class="reel" data-stagger>
      ${reel.map(([s, l]) => `<a class="clip" href="#"><img src="${s}" alt="" /><span class="play"><ui-icon name="ui-play" aria-hidden="true"></ui-icon></span><span class="clip-l">${l}</span></a>`).join("")}
    </div>
  </div></section>

  <!-- 05 ZNAČKY -->
  <section class="sec band wave-band reveal"><div class="wrap">
    <div class="sec-head"><span class="idx">05</span><h2>Zastupujeme světovou špičku</h2><span class="rule"></span></div>
    <div class="logowall" data-stagger>
      ${logos.map(b => `<div class="cell"><img class="brandlogo${b.sq ? " sq" : ""}" src="${L}${b.f}.png" alt="${b.n}" />${b.star ? '<span class="st">★</span>' : ''}</div>`).join("")}
    </div>
    <p class="muted mono" style="font-size:var(--pm-text-xs);margin-top:14px">★ vlajkové značky — výhradní distribuce pro ČR/SK</p>
  </div></section>

  <!-- 06 PARTNER PROGRAM -->
  <section class="sec reveal"><div class="wrap">
    <div class="sec-head"><span class="idx">06</span><h2>Professional Partner Program</h2><span class="rule"></span></div>
    <p class="lead" style="margin:-18px 0 30px">Partneři a produkční firmy, kteří staví na našich systémech.</p>
    <div class="partners" data-stagger>${Array.from({ length: 10 }).map(() => `<div class="pcell">logo partnera</div>`).join("")}</div>
  </div></section>

  <!-- 07 REFERENCE -->
  <section class="sec band wave-band reveal"><div class="wrap-wide">
    <div class="sec-head"><span class="idx">07</span><h2>Reference</h2><span class="rule"></span></div>
    <ui-stats compact><ui-stat n="40" u="+">divadel & scén</ui-stat><ui-stat n="25">arén & hal</ui-stat><ui-stat n="∞">festivalů & turné</ui-stat><ui-stat n="3" u="×">L-ISA v ČR</ui-stat></ui-stats>
    <div class="reffilter">${[["Vše","vse"],["Divadla","divadlo"],["Arény & stadiony","arena"],["TV & broadcast","tv"],["Školy & veřejný sektor","skoly"],["Festivaly","festival"]].map((f, i) => `<button class="chip chip-filter${i === 0 ? " is-active" : ""}" data-cat="${f[1]}">${f[0]}</button>`).join("")}</div>
    <div class="reffeat" data-stagger>
      ${refTiles.map(([img, logo, typ, cat]) => `<a class="reftile" href="#" data-cat="${cat}"><img src="${img}" alt="" /><ui-tag solid>${typ}</ui-tag><span class="reftile-logo">${logo}</span></a>`).join("")}
    </div>
    <div class="reflogos">${refNames.map(n => `<div class="refcell">${n}</div>`).join("")}<div class="refcell more">+ další</div></div>
  </div></section>

  <!-- 08 ACADEMY -->
  <section class="sec reveal"><div class="wrap">
    <div class="sec-head"><span class="idx">08</span><h2>Proč školení v PRO MUSIC Academy</h2><span class="rule"></span></div>
    <div class="acad3" data-stagger>
      <div class="acard"><div class="anum">01</div><strong>Oficiální tréninky</strong><p>Přímo od distributora — certifikace L-Acoustics, DiGiCo, Smaart workshopy.</p></div>
      <div class="acard"><div class="anum">02</div><strong>Praxe na špičkové technice</strong><p>Učíte se na systémech, které pak potkáte na zakázkách a turné.</p></div>
      <div class="acard"><div class="anum">03</div><strong>Posun v kariéře</strong><p>Certifikát a know-how, které vás posune mezi profíky v oboru.</p></div>
    </div>
    <div class="acad-info">
      <div><div class="k">Pro koho</div><div class="chips">${["zvukaři FOH/monitor", "light designeři", "AV integrátoři", "divadelní technici", "produkční", "studenti"].map(c => `<span class="chip">${c}</span>`).join("")}</div></div>
      <div><div class="k">Jak to funguje</div><p class="lead" style="font-size:var(--pm-text-sm)">Jarní a podzimní bloky · Trutnov + Home of AV Voděrádky · úrovně začátečník → pokročilý · možnost dotace (ÚP / ESF) a firemního vzdělávání.</p></div>
    </div>
  </div></section>

  <!-- ASSURE + CTA -->
  <section class="sec reveal"><div class="wrap"><div class="assure">
    <ui-tag>Proč PRO MUSIC</ui-tag>
    <h2>Neprodáváme techniku bez know-how. Víme, co spolu funguje a co se nesmí pokazit.</h2>
    <div class="cta-actions"><ui-button variant="primary" size="lg">Probrat projekt →</ui-button><ui-button variant="ghost" size="lg">Kontaktovat specialistu</ui-button></div>
  </div></div></section>

  <!-- FOOTER -->
  <footer class="foot"><div class="wrap-wide">
    <div class="foot-cta">
      <div>
        <h3>Máte projekt? Pojďme ho probrat.</h3>
        <div class="sub">Odborný rozhovor o tom, co řešíte — bez tlaku.</div>
      </div>
      <div class="cta-actions" style="margin:0"><ui-button variant="primary" size="lg">Probrat projekt →</ui-button><ui-button variant="ghost" size="lg">Kontaktovat specialistu</ui-button></div>
    </div>
    <div class="foot-top">
      <div class="foot-brand">
        <img src="${LOGO}" alt="PRO MUSIC" />
        <p>PRO MUSIC, s.r.o.<br/>Horská 922, 541 01 Trutnov<br/>support@promusic.cz · +420 775 328 292</p>
        <div class="foot-social">
            <a href="#" aria-label="Facebook"><ui-icon name="social-facebook" label="Facebook"></ui-icon></a>
            <a href="#" aria-label="Instagram"><ui-icon name="social-instagram" label="Instagram"></ui-icon></a>
            <a href="#" aria-label="YouTube"><ui-icon name="social-youtube" label="YouTube"></ui-icon></a>
            <a href="#" aria-label="LinkedIn"><ui-icon name="social-linkedin" label="LinkedIn"></ui-icon></a>
          </div>
      </div>
      <div class="foot-cols">
        <div class="foot-col"><h5>Live &amp; turné</h5><a href="#">Turné &amp; koncerty</a><a href="#">Festivaly</a><a href="#">TV &amp; broadcast</a><a href="#">Case studies</a></div>
        <div class="foot-col"><h5>Stálé instalace</h5><a href="#">Divadla &amp; sály</a><a href="#">Arény</a><a href="#">Hotely &amp; bary</a><a href="#">Jak to děláme</a></div>
        <div class="foot-col"><h5>Firma</h5><a href="#">Značky</a><a href="#">Academy</a><a href="#">Servis</a><a href="#">Kontakt</a></div>
      </div>
    </div>
    <div class="foot-bottom"><span>© 2026 PRO MUSIC, s.r.o. · Professional show equipment</span><span><a href="#">Ochrana údajů</a> · <a href="#">Cookies</a> · CZ / EN</span></div>
  </div></footer>
  `;

  const mount = document.getElementById("app");
  if (mount) mount.innerHTML = html;

  /* ===== NAV interakce — řeší ui-loader.js (standalone HTML komponenty) ===== */

  /* ===== HERO carousel + náhledové karty ===== */
  (function () {
    var slides = [].slice.call(document.querySelectorAll(".hero-slide"));
    var dots = [].slice.call(document.querySelectorAll(".hero-dot"));
    var cards = [].slice.call(document.querySelectorAll(".hero-card"));
    var idx = 0, timer = null, DUR = 5000;
    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === idx); });
      cards.forEach(function (c, i) { c.classList.toggle("is-active", i === idx); });
    }
    function start() { stop(); timer = setInterval(function () { go(idx + 1); }, DUR); }
    function stop() { if (timer) clearInterval(timer); }
    dots.forEach(function (d) { d.addEventListener("click", function () { go(+d.getAttribute("data-i")); start(); }); });
    cards.forEach(function (c, i) { c.addEventListener("mouseenter", function () { go(i); start(); }); });
    if (slides.length) { go(0); start(); }
    var cardsWrap = document.getElementById("heroCards");
    if (cardsWrap) setTimeout(function () { cardsWrap.classList.add("ready"); }, 1500);
  })();

  /* ===== REFERENCE FILTR (chips: hover + selected + filtrování dlaždic) ===== */
  (function () {
    var chips = [].slice.call(document.querySelectorAll(".reffilter .chip-filter"));
    var tiles = [].slice.call(document.querySelectorAll(".reffeat .reftile"));
    if (!chips.length) return;
    chips.forEach(function (ch) {
      ch.addEventListener("pointermove", function (e) {
        var r = ch.getBoundingClientRect();
        ch.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
        ch.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
      });
      ch.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("is-active"); });
        ch.classList.add("is-active");
        var cat = ch.getAttribute("data-cat");
        tiles.forEach(function (t) {
          var show = cat === "vse" || t.getAttribute("data-cat") === cat;
          t.classList.toggle("filtered-out", !show);
        });
      });
    });
  })();

  /* ===== STAGE GLOW (jevištní osvětlení reagující na kurzor kdekoli na obrazovce) ===== */
  (function () {
    var el = document.getElementById("statsGlow");
    if (!el || window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    window.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      var mx = (e.clientX - r.left) / r.width * 100;
      var my = (e.clientY - r.top) / r.height * 100;
      // omezit, aby reflektor zůstal vždy viditelný i s kurzorem mimo sekci
      mx = Math.max(8, Math.min(92, mx));
      my = Math.max(15, Math.min(85, my));
      el.style.setProperty("--mx", mx.toFixed(1) + "%");
      el.style.setProperty("--my", my.toFixed(1) + "%");
    }, { passive: true });
  })();

  /* ===== MOTION ===== */
  const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  /* reveal observer žije v site.js (jeden zdroj pravdy) */

  if (!reduce) {
    const pars = [...document.querySelectorAll("[data-par]")];
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const vh = innerHeight;
        pars.forEach((el) => {
          const f = parseFloat(el.getAttribute("data-par")) || 0.1;
          const r = el.getBoundingClientRect();
          const c = r.top + r.height / 2 - vh / 2;
          let y = -c * f, cap = r.height * 0.12;
          y = Math.max(-cap, Math.min(cap, y));
          el.style.transform = `translate3d(0,${y.toFixed(1)}px,0) scale(1.06)`;
        });
        raf = null;
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
