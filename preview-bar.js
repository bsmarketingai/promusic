/* PRO MUSIC — náhledový ovládací panel (review only).
   Přepínače verzí návrhu / barevných schémat. Není součástí produkčního webu.
   Volba se drží v localStorage, takže přežije refresh i přechod mezi stránkami. */
(function () {
  var KEY = "pm-preview-bar";
  /* V2 CTA — jevištní cyan: chladný komplement k brandové oranžové, drží
     "pro audio" tón (DiGiCo / L-Acoustics displeje) a na tmavém podkladu svítí. */
  var SCHEMES = {
    v1: { label: "V1", swatch: "#e0542b", main: null,      note: "Brandová oranžová \u2014 výchozí schéma." },
    v2: { label: "V2", swatch: "#1e9eb4", main: "#1e9eb4", note: "Jevištní cyan \u2014 chladný komplement, technický tón." },
    v3: { label: "V3", swatch: "conic-gradient(from 210deg,#e0542b,#d8c15a,#1e9eb4,#7b5cd6,#e0542b)", main: null, custom: true, note: "Vlastní barva \u2014 vyber odstín, propíše se do CTA, akcentů a glow." }
  };
  var CKEY = KEY + "-custom";
  function readCustom() { try { return localStorage.getItem(CKEY) || "#e0542b"; } catch (e) { return "#e0542b"; } }

  function read() { try { return localStorage.getItem(KEY + "-cta") || "v1"; } catch (e) { return "v1"; } }
  function readOpen() { try { return localStorage.getItem(KEY + "-open") !== "0"; } catch (e) { return true; } }

  function applyScheme(id) {
    var s = SCHEMES[id] || SCHEMES.v1;
    if (!window.PMTheme) return;
    var t = PMTheme.read();
    var main = s.custom ? readCustom() : s.main;
    if (main) t.main = main; else delete t.main;
    PMTheme.apply(t);
    try { localStorage.setItem(PMTheme.KEY, JSON.stringify(t)); } catch (e) {}
  }

  var MODES = [
    { id: "dark", label: "Dark", swatch: "#100f0d" },
    { id: "light", label: "Light", swatch: "#f3efe7" },
    { id: "duo", label: "Duo", swatch: "linear-gradient(90deg,#100f0d 50%,#f3efe7 50%)" }
  ];
  var LOGOS = [
    { id: "color", label: "Barevné", swatch: "linear-gradient(90deg,#fff 50%,#e0542b 50%)" },
    { id: "mono", label: "Mono", swatch: "linear-gradient(90deg,#fff 50%,#2a2a2a 50%)" }
  ];
  var HEADS = [
    { id: "dark", label: "Tmavá", swatch: "#100f0d" },
    { id: "light", label: "Světlá", swatch: "#f3efe7" }
  ];


  /* ===== Ladění 3D ringu (Hero H2-3D) — hodnoty jdou do --rg-* na <html>, drží se v localStorage ===== */
  var RKEY = KEY + "-ring";
  var RING = [
    { k: "cw", l: "Šířka karty", min: 20, max: 70, step: 1, def: 40, u: "vw" },
    { k: "ratio", l: "Výška / šířka karty", min: .4, max: 1.5, step: .025, def: .625, u: "" },
    { k: "r", l: "Poloměr (min.)", min: 20, max: 150, step: 1, def: 62, u: "vw" },
    { k: "gap", l: "Mezera mezi kartami", min: 0, max: 200, step: 2, def: 24, u: "px" },
    { k: "persp", l: "Perspektiva (× poloměr)", min: .8, max: 5, step: .05, def: 2.2, u: "" },
    { k: "tilt", l: "Náklon X", min: -30, max: 30, step: .5, def: -8, u: "deg" },
    { k: "oy", l: "Bod pohledu Y", min: 0, max: 100, step: 1, def: 40, u: "%" },
    { k: "spin", l: "Natočení ringu", min: -180, max: 180, step: 1, def: 0, u: "deg" },
    { k: "dim", l: "Utlumení zadních karet", min: 0, max: .4, step: .01, def: .2, u: "" },
    { k: "dur", l: "Délka přechodu", min: .1, max: 2.5, step: .05, def: .8, u: "s" },
    { k: "auto", l: "Interval auto-rotace", min: 1, max: 10, step: .5, def: 3.5, u: "s" }
  ];
  function readRing() { try { return JSON.parse(localStorage.getItem(RKEY)) || {}; } catch (e) { return {}; } }
  function saveRing(o) { try { localStorage.setItem(RKEY, JSON.stringify(o)); } catch (e) {} }
  var autoT = null;
  function applyRing(o) {
    var st = document.documentElement.style;
    RING.forEach(function (c) {
      if (c.k === "auto") return;
      if (o[c.k] == null || +o[c.k] === c.def) st.removeProperty("--rg-" + c.k);
      else st.setProperty("--rg-" + c.k, o[c.k] + c.u);
    });
    if (o.bf === "hidden") st.setProperty("--rg-bf", "hidden"); else st.removeProperty("--rg-bf");
    if (autoT) { clearInterval(autoT); autoT = null; }
    if (o.play === "on") autoT = setInterval(function () {
      if (document.documentElement.getAttribute("data-hero") !== "h2-3d") return;
      var sc = document.querySelector(".hstrip-scene");
      if (sc && sc.matches(":hover")) return;
      var b = document.querySelector('.hstrip-btn[data-dir="1"]'); if (b) b.click();
    }, (+o.auto || 3.5) * 1000);
  }
  function ringHtml(o) {
    function seg(id, opts, cur) {
      return '<div class="pvseg" id="' + id + '">' + opts.map(function (x) {
        return '<button type="button" data-id="' + x[0] + '" aria-pressed="' + (x[0] === cur) + '">' + x[1] + '</button>';
      }).join("") + '</div>';
    }
    return '<div class="pvring" id="pvring">' +
      '<div class="pvring-head"><label>3D ring — ladění</label></div>' +
      RING.map(function (c) {
        var v = o[c.k] != null ? o[c.k] : c.def;
        return '<label class="pvrange"><span>' + c.l + '</span><output data-o="' + c.k + '">' + v + c.u + '</output>' +
          '<input type="range" data-k="' + c.k + '" min="' + c.min + '" max="' + c.max + '" step="' + c.step + '" value="' + v + '" /></label>';
      }).join("") +
      '<div class="pvrow"><label>Zadní strana karet</label>' + seg("pvseg-bf", [["visible", "Viditelná"], ["hidden", "Skrytá"]], o.bf || "visible") + '</div>' +
      '<div class="pvrow"><label>Auto-rotace</label>' + seg("pvseg-play", [["off", "Vyp"], ["on", "Zap"]], o.play || "off") + '</div>' +
      '<div class="pvbtns"><button type="button" id="pvring-reset">Výchozí</button><button type="button" id="pvring-copy">Kopírovat hodnoty</button></div>' +
      '<p class="pvnote" id="pvring-note">Poloměr se nezmenší pod hodnotu, kdy by se karty překrývaly. Hodnoty zkopíruj a pošli — zapíšu je jako výchozí.</p>' +
    '</div>';
  }
  function wireRing(bar) {
    var box = bar.querySelector("#pvring"); if (!box) return;
    function sync() { box.hidden = document.documentElement.getAttribute("data-hero") !== "h2-3d"; }
    sync();
    new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ["data-hero"] });
    box.addEventListener("input", function (e) {
      var k = e.target.getAttribute("data-k"); if (!k) return;
      var o = readRing(), c = RING.filter(function (x) { return x.k === k; })[0];
      o[k] = +e.target.value; saveRing(o); applyRing(o);
      box.querySelector('[data-o="' + k + '"]').textContent = e.target.value + c.u;
    });
    ["bf", "play"].forEach(function (k) {
      box.querySelector("#pvseg-" + k).addEventListener("click", function (e) {
        var b = e.target.closest("button[data-id]"); if (!b) return;
        [].forEach.call(this.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        var o = readRing(); o[k] = b.getAttribute("data-id"); saveRing(o); applyRing(o);
      });
    });
    box.querySelector("#pvring-reset").addEventListener("click", function () {
      saveRing({}); applyRing({});
      RING.forEach(function (c) {
        box.querySelector('[data-k="' + c.k + '"]').value = c.def;
        box.querySelector('[data-o="' + c.k + '"]').textContent = c.def + c.u;
      });
      [["bf", "visible"], ["play", "off"]].forEach(function (p) {
        [].forEach.call(box.querySelectorAll("#pvseg-" + p[0] + " button"), function (x) { x.setAttribute("aria-pressed", String(x.getAttribute("data-id") === p[1])); });
      });
    });
    box.querySelector("#pvring-copy").addEventListener("click", function () {
      var o = readRing(), lines = RING.map(function (c) { return c.l + ": " + (o[c.k] != null ? o[c.k] : c.def) + c.u; });
      lines.push("Zadní strana: " + (o.bf || "visible"), "Auto-rotace: " + (o.play || "off"));
      var txt = "3D ring — nastavení\n" + lines.join("\n"), note = box.querySelector("#pvring-note");
      var done = function () { note.textContent = "Zkopírováno do schránky — vlož do chatu."; };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () { note.textContent = txt; });
      else note.textContent = txt;
    });
  }

  var HEROES = [{ id: "h1", label: "H1" }, { id: "h2", label: "H2" }, { id: "h2-3d", label: "H2-3D" }, { id: "h3", label: "H3" }, { id: "h5", label: "H5" }];

  function build() {
    var curHero = window.PMMode && PMMode.hero ? PMMode.hero() : "h1";
    var cur = read(), open = readOpen();
    var curMode = window.PMMode ? PMMode.mode() : "dark";
    var curHead = window.PMMode ? PMMode.header() : "dark";
    var curLogo = window.PMMode ? PMMode.logo() : "color";
    var bar = document.createElement("div");
    bar.className = "pvbar";
    bar.setAttribute("data-open", open ? "true" : "false");
    bar.innerHTML =
      '<div class="pvbar-panel">' +
        '<div class="pvbar-head"><strong>Náhled</strong><span>Review</span></div>' +
        (document.querySelector(".hero") ? '<div class="pvrow"><label>Hero</label><div class="pvseg" id="pvseg-hero">' +
          HEROES.map(function (h) {
            return '<button type="button" data-id="' + h.id + '" aria-pressed="' + (h.id === curHero) + '">' + h.label + '</button>';
          }).join("") +
        '</div><p class="pvnote">H1 — fotka přes celou výšku s claimem. H2 — horizontální pás projektů a instalací. H2-3D — tytéž karty v otočném 3D ringu. H3 — masonry mozaika přes celou výšku okna. H5 — mixpult: projekty jako kanály, aktivní v režimu SOLO.</p></div>' + ringHtml(readRing()) : '') +
        '<div class="pvrow"><label>Režim podkladu</label><div class="pvseg" id="pvseg-mode">' +
          MODES.map(function (m) {
            return '<button type="button" data-id="' + m.id + '" aria-pressed="' + (m.id === curMode) + '">' +
              '<i style="background:' + m.swatch + '"></i>' + m.label + '</button>';
          }).join("") +
        '</div></div>' +
        '<div class="pvrow"><label>Hlavička</label><div class="pvseg" id="pvseg-head">' +
          HEADS.map(function (h) {
            return '<button type="button" data-id="' + h.id + '" aria-pressed="' + (h.id === curHead) + '"' + '>' +
              '<i style="background:' + h.swatch + '"></i>' + h.label + '</button>';
          }).join("") +
        '</div><p class="pvnote">Nezávislé na režimu podkladu — světlou hlavičku lze mít i v dark režimu.</p></div>' +
        '<div class="pvrow"><label>Logo</label><div class="pvseg" id="pvseg-logo">' +
          LOGOS.map(function (l) {
            return '<button type="button" data-id="' + l.id + '" aria-pressed="' + (l.id === curLogo) + '">' +
              '<i style="background:' + l.swatch + '"></i>' + l.label + '</button>';
          }).join("") +
        '</div><p class="pvnote">Mono — jednotná silueta: na tmavém podkladu světlá, na světlém tmavě šedá (ne čistá černá).</p></div>' +
        '<div class="pvrow"><label>CTA barva</label><div class="pvseg" id="pvseg-cta">' +
          Object.keys(SCHEMES).map(function (k) {
            return '<button type="button" data-id="' + k + '" aria-pressed="' + (k === cur) + '">' +
              '<i style="background:' + SCHEMES[k].swatch + '"></i>' + SCHEMES[k].label + '</button>';
          }).join("") +
        '</div>' +
          '<label class="pvcolor" id="pvcolor" hidden>' +
            '<input type="color" id="pvcolor-i" value="' + readCustom() + '" aria-label="Vlastní barva CTA" />' +
            '<span class="pvcolor-v" id="pvcolor-v">' + readCustom().toUpperCase() + '</span>' +
          '</label>' +
          '<p class="pvnote" id="pvnote">' + SCHEMES[cur].note + '</p></div>' +
      '</div>' +
      '<button type="button" class="pvbar-toggle"><span class="dot"></span>Náhled</button>';
    document.body.appendChild(bar);

    bar.querySelector(".pvbar-toggle").addEventListener("click", function () {
      var next = bar.getAttribute("data-open") !== "true";
      bar.setAttribute("data-open", next ? "true" : "false");
      try { localStorage.setItem(KEY + "-open", next ? "1" : "0"); } catch (e) {}
    });

    function segClick(sel, fn) {
      bar.querySelector(sel).addEventListener("click", function (e) {
        var b = e.target.closest("button[data-id]");
        if (!b || b.disabled) return;
        [].forEach.call(this.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        fn(b.getAttribute("data-id"));
      });
    }
    wireRing(bar);
    if (bar.querySelector("#pvseg-hero")) segClick("#pvseg-hero", function (id) { if (window.PMMode) { PMMode.setHero(id); window.dispatchEvent(new Event("resize")); } });
    segClick("#pvseg-mode", function (id) { if (window.PMMode) PMMode.setMode(id); });
    segClick("#pvseg-head", function (id) { if (window.PMMode) PMMode.setHeader(id); });
    segClick("#pvseg-logo", function (id) { if (window.PMMode) PMMode.setLogo(id); });

    bar.querySelector("#pvseg-cta").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-id]");
      if (!b) return;
      var id = b.getAttribute("data-id");
      [].forEach.call(this.querySelectorAll("button"), function (x) {
        x.setAttribute("aria-pressed", String(x === b));
      });
      try { localStorage.setItem(KEY + "-cta", id); } catch (e2) {}
      bar.querySelector("#pvnote").textContent = SCHEMES[id].note;
      bar.querySelector("#pvcolor").hidden = !SCHEMES[id].custom;
      applyScheme(id);
    });

    var ci = bar.querySelector("#pvcolor-i"), cv = bar.querySelector("#pvcolor-v");
    bar.querySelector("#pvcolor").hidden = !SCHEMES[cur].custom;
    ci.addEventListener("input", function () {
      var v = ci.value;
      cv.textContent = v.toUpperCase();
      try { localStorage.setItem(CKEY, v); localStorage.setItem(KEY + "-cta", "v3"); } catch (e) {}
      [].forEach.call(bar.querySelectorAll("#pvseg-cta button"), function (x) {
        x.setAttribute("aria-pressed", String(x.getAttribute("data-id") === "v3"));
      });
      bar.querySelector("#pvnote").textContent = SCHEMES.v3.note;
      applyScheme("v3");
    });
  }

  applyScheme(read());
  applyRing(readRing());
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
