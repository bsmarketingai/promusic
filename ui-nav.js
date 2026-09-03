/* PRO MUSIC — sdílené hlavní menu (identické na všech stránkách)
   Použití: <script src="pm-nav.js?v=1"></script> kdekoli v <body>.
   Vloží stejnou navigaci (mega-menu + hamburger + FAB + mobilní menu) na začátek <body>
   a nainicializuje interakce. Zvýraznění aktivní položky: <body data-nav="Instalace">. */
(function () {
  var LOGO = "assets/brand/promusic-logo.png";
  var P = "assets/projekty/";

  var megaPrace = {
    cols: [
      ["Přehled", [["Celé portfolio", "hifi-A.html"], ["Showreel", "hifi-A.html"], ["Case studies", "realizace-ed-sheeran.html"]]],
      ["Podle typu", [["Turné & koncerty", "#"], ["Festivaly", "#"], ["TV & broadcast", "#"], ["Eventy & korporát", "#"]]],
    ],
    feat: { img: P + "ed-sheeran/ohnostroj.jpg", tag: "CASE STUDY", title: "Ed Sheeran — Mathematics", href: "realizace-ed-sheeran.html" },
  };
  var megaInstalace = {
    cols: [
      ["Podle prostoru", [["Divadla & sály", "instalace-kulturni-domy-saly-divadla.html"], ["Arény & stadiony", "#"], ["Kluby & venues", "#"], ["Hotely & bary", "#"], ["Konferenční", "#"], ["Kina · sakrální", "#"]]],
      ["Jak to děláme", [["Konzultace", "#"], ["Akustická studie & 3D", "#"], ["Návrh & realizace", "#"], ["Oživení & ladění", "#"], ["Servis & péče", "#"]]],
    ],
    feat: { img: P + "djkt-plzen/sal-pohled.jpg", tag: "INSTALACE", title: "Nová scéna DJKT Plzeň", href: "#" },
  };
  var navItems = [
    { l: "Realizace", href: "hifi-A.html", mega: megaPrace },
    { l: "Technologie", href: "#" },
    { l: "Instalace", href: "instalace-kulturni-domy-saly-divadla.html", mega: megaInstalace },
    { l: "Značky", href: "znacky.html" },
    { l: "Školení", href: "#" },
    { l: "Kontakt", href: "#" },
  ];

  function megaPanel(m) {
    return '<div class="megapanel"><div class="mega-inner"><div class="megacols">' +
      m.cols.map(function (c) {
        return '<div class="megacol"><h5>' + c[0] + '</h5><ul>' +
          c[1].map(function (it) { return '<li><a href="' + it[1] + '">' + it[0] + '</a></li>'; }).join("") +
          '</ul></div>';
      }).join("") +
      '</div><a class="megafeat" href="' + m.feat.href + '"><div class="megafeat-img"><img src="' + m.feat.img + '" alt="" /></div>' +
      '<div class="megafeat-meta"><ui-tag>' + m.feat.tag + '</ui-tag><strong>' + m.feat.title + '</strong><span class="megafeat-go">Zobrazit →</span></div></a></div></div>';
  }

  var active = document.body.getAttribute("data-nav") || "";

  var nav =
    '<header class="nav"><div class="wrap-wide nav-in">' +
    '<a href="hifi-A.html" style="display:flex;align-items:center"><img class="nav-logo" src="' + LOGO + '" alt="PRO MUSIC" /></a>' +
    '<nav class="nav-links desk">' +
    navItems.map(function (it) {
      var on = it.l === active ? " is-active" : "";
      if (it.mega) {
        return '<div class="navitem"><a class="nav-link has-mega' + on + '" href="' + it.href + '">' + it.l + '<span class="caret"></span></a>' + megaPanel(it.mega) + '</div>';
      }
      return '<a class="nav-link' + on + '" href="' + it.href + '">' + it.l + '</a>';
    }).join("") +
    '</nav>' +
    '<span class="nav-czen desk"><span class="on">CZ</span><span>EN</span></span>' +
    '<a class="btn btn-primary desk">Probrat projekt →</a>' +
    '<a class="btn btn-primary nav-cta-mob" aria-label="Probrat projekt">Probrat projekt →</a>' +
    '<button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>' +
    '</div></header>' +
    '<button class="navfab" aria-label="Otevřít menu"><span class="fab-bars"><span></span><span></span><span></span></span><span class="fab-x">✕</span></button>' +
    '<div class="mobmenu" id="mobmenu"><div class="mobmenu-bg"><img src="' + P + 'ed-sheeran/cervena-show.jpg" alt="" /></div><div class="mobmenu-scrim"></div>' +
    '<div class="mobmenu-inner"><div class="mobmenu-top"><img class="nav-logo" src="' + LOGO + '" alt="PRO MUSIC" />' +
    '<div class="mobmenu-top-r"><span class="nav-czen"><span class="on">CZ</span><span>EN</span></span><button class="mobmenu-close" aria-label="Zavřít">✕</button></div></div>' +
    '<div class="mobmenu-kick">Navigace</div><nav class="mobmenu-list">' +
    navItems.map(function (it, i) {
      var sub = it.mega ? '<div class="mobitem-sub">' + it.mega.cols.map(function (c) {
        return '<div class="mobsub-col"><h6>' + c[0] + '</h6><ul>' + c[1].map(function (x) { return '<li><a href="' + x[1] + '">' + x[0] + '</a></li>'; }).join("") + '</ul></div>';
      }).join("") + '</div>' : "";
      return '<div class="mobitem' + (it.mega ? " has-sub" : "") + '"><div class="mobitem-row"><span class="mobitem-n">' + String(i + 1).padStart(2, "0") +
        '</span><a class="mobitem-label" href="' + it.href + '">' + it.l + '</a>' + (it.mega ? '<span class="mobitem-plus">+</span>' : "") + '</div>' + sub + '</div>';
    }).join("") +
    '</nav>' +
    '<a class="btn btn-primary mobmenu-cta">Probrat projekt →</a>' +
    '<div class="mobmenu-contact"><div><div class="k">Kontakt</div><a href="tel:+420775328292">+420 775 328 292</a><a href="mailto:support@promusic.cz">support@promusic.cz</a></div>' +
    '<div><div class="k">Sídlo</div><span>Horská 922, 541 01 Trutnov</span></div></div></div></div>';

  var holder = document.createElement("div");
  holder.innerHTML = nav;
  /* odstranit případnou starou navigaci (např. z hifi-content.js), ať se nezdvojuje */
  ["header.nav", ".navfab", "#mobmenu"].forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) { el.remove(); });
  });
  while (holder.firstChild) document.body.insertBefore(holder.firstChild, document.body.firstChild);

  /* ===== SDÍLENÝ FOOTER (identický všude, tmavý) ===== */
  var foot =
    '<footer class="foot"><div class="wrap-wide">' +
    '<div class="foot-cta"><div><h3>Máte projekt? Pojďme ho probrat.</h3><div class="sub">Odborný rozhovor o tom, co řešíte — bez tlaku.</div></div>' +
    '<div class="cta-actions" style="margin:0"><ui-button variant="primary" size="lg">Probrat projekt →</ui-button><ui-button variant="ghost" size="lg">Kontaktovat specialistu</ui-button></div></div>' +
    '<div class="foot-top">' +
    '<div class="foot-brand">' +
    '<img src="' + LOGO + '" alt="PRO MUSIC" />' +
    '<p>PRO MUSIC, s.r.o.<br/>Horská 922, 541 01 Trutnov<br/>support@promusic.cz · +420 775 328 292</p>' +
    '<div class="foot-social">' +
    '<a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M15.12 5.32H17V2.14A26.1 26.1 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.6H6.6v3.56h3.08V22h3.7v-9.14h3.06l.46-3.56h-3.52V7.05c0-1.03.28-1.73 1.74-1.73z"/></svg></a>' +
    '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.36.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77c-.55.55-1.11.89-1.77 1.15-.64.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77.55-.55 1.11-.89 1.77-1.15.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.98.04-1.5.21-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.3.88-.34 1.86-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.98.2 1.5.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.88.3 1.86.34 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.98-.04 1.5-.2 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.3-.88.34-1.86.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.98-.2-1.5-.34-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.36-.14-.88-.3-1.86-.34-1.05-.05-1.37-.06-4.04-.06zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68zm5.34-.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/></svg></a>' +
    '<a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg></a>' +
    '</div></div>' +
    '<div class="foot-cols">' +
    '<div class="foot-col"><h5>Práce</h5><a href="hifi-A.html">Turné &amp; koncerty</a><a href="#">Festivaly</a><a href="#">TV &amp; broadcast</a><a href="realizace-ed-sheeran.html">Case studies</a></div>' +
    '<div class="foot-col"><h5>Instalace</h5><a href="instalace-kulturni-domy-saly-divadla.html">Divadla &amp; sály</a><a href="#">Arény</a><a href="#">Hotely &amp; bary</a><a href="#">Jak to děláme</a></div>' +
    '<div class="foot-col"><h5>Firma</h5><a href="znacky.html">Značky</a><a href="#">Academy</a><a href="#">Servis</a><a href="#">Kontakt</a></div>' +
    '</div></div>' +
    '<div class="foot-bottom"><span>© 2026 PRO MUSIC, s.r.o. · Professional show equipment</span><span><a href="#">Ochrana údajů</a> · <a href="#">Cookies</a> · CZ / EN</span></div>' +
    '</div></footer>';
  var existing = document.querySelector("footer.foot");
  if (existing) {
    existing.outerHTML = foot;
  } else {
    var fh = document.createElement("div");
    fh.innerHTML = foot;
    document.body.appendChild(fh.firstChild);
  }

  /* interakce */
  var mob = document.getElementById("mobmenu");
  var fab = document.querySelector(".navfab");
  function openMenu() { mob.classList.add("open"); if (fab) fab.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeMenu() { mob.classList.remove("open"); if (fab) fab.classList.remove("open"); document.body.style.overflow = ""; }
  document.querySelectorAll(".hamburger, .navfab").forEach(function (t) {
    t.addEventListener("click", function () { mob.classList.contains("open") ? closeMenu() : openMenu(); });
  });
  var cl = document.querySelector(".mobmenu-close");
  if (cl) cl.addEventListener("click", closeMenu);
  document.querySelectorAll(".mobitem.has-sub .mobitem-row").forEach(function (row) {
    row.addEventListener("click", function (e) {
      if (e.target.closest(".mobitem-label")) return;
      var it = row.parentElement, open = it.classList.toggle("exp");
      var plus = row.querySelector(".mobitem-plus"); if (plus) plus.textContent = open ? "–" : "+";
    });
  });

  /* ===== GLOBÁLNÍ outline-glow — AUTOMATICKY na všechny karty/tlačítka/boxy =====
     Žádný ruční seznam: JS sám přidá .outline-glow třídu i pointer-tracking každému
     prvku, který odpovídá vzoru (tlačítka, chipsy, a cokoli s "card/cell/tile/box" v názvu). */
  var GLOW_SEL = ".btn-primary,.btn-ghost,.chip-filter,.outline-glow," +
    "[class*='card'],[class*='cell'],[class*='tile'],[class*='box']," +
    ".segcard,.acard,.fixcard,.problem,.proof,.flagship,.brcell,.reftile,.workcard,.hero-card,.edu-tab,.pcell";
  function bindGlow(el) {
    if (el.__glow) return; el.__glow = 1;
    if (!el.classList.contains("outline-glow")) el.classList.add("outline-glow");
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
    });
  }
  function scanGlow() {
    document.querySelectorAll(GLOW_SEL).forEach(function (el) {
      // vynech obrázkové/strukturální wrappery bez vlastního okraje-hodnoty: necháme utilitu, ta je neškodná
      bindGlow(el);
    });
  }
  scanGlow();
  setTimeout(scanGlow, 400); setTimeout(scanGlow, 1400);
  new MutationObserver(scanGlow).observe(document.body, { childList: true, subtree: true });

  /* ===== veřejné API pro <ui-header> / <ui-footer> / <ui-mobile-menu> =====
     Komponenty se auto-mountují na začátek <body>; tyto elementy slouží jako
     explicitní mount pointy pro nové stránky. */
  window.PMNav = {
    build: function (kind, host) {
      var sel = kind === "header" ? "header.nav" : kind === "footer" ? "footer.foot" : "#mobmenu";
      var el = document.querySelector(sel);
      if (el && host && !host.contains(el)) host.appendChild(el);
      return el;
    }
  };
  window.dispatchEvent(new CustomEvent("pm-nav-ready"));
})();
