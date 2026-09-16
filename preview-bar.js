/* PRO MUSIC — náhledový ovládací panel (review only).
   Přepínače verzí návrhu / barevných schémat. Není součástí produkčního webu.
   Volba se drží v localStorage, takže přežije refresh i přechod mezi stránkami. */
(function () {
  var KEY = "pm-preview-bar";
  /* V2 CTA — jevištní cyan: chladný komplement k brandové oranžové, drží
     "pro audio" tón (DiGiCo / L-Acoustics displeje) a na tmavém podkladu svítí. */
  var SCHEMES = {
    v1: { label: "V1", swatch: "#e0542b", main: null,      note: "Brandová oranžová \u2014 výchozí schéma." },
    v2: { label: "V2", swatch: "#1e9eb4", main: "#1e9eb4", note: "Jevištní cyan \u2014 chladný komplement, technický tón." }
  };

  function read() { try { return localStorage.getItem(KEY + "-cta") || "v1"; } catch (e) { return "v1"; } }
  function readOpen() { try { return localStorage.getItem(KEY + "-open") !== "0"; } catch (e) { return true; } }

  function applyScheme(id) {
    var s = SCHEMES[id] || SCHEMES.v1;
    if (!window.PMTheme) return;
    var t = PMTheme.read();
    if (s.main) t.main = s.main; else delete t.main;
    PMTheme.apply(t);
    try { localStorage.setItem(PMTheme.KEY, JSON.stringify(t)); } catch (e) {}
  }

  var MODES = [
    { id: "dark", label: "Dark", swatch: "#100f0d" },
    { id: "light", label: "Light", swatch: "#f3efe7" },
    { id: "duo", label: "Duo", swatch: "linear-gradient(90deg,#100f0d 50%,#f3efe7 50%)" }
  ];
  var HEADS = [
    { id: "dark", label: "Tmavá", swatch: "#100f0d" },
    { id: "light", label: "Světlá", swatch: "#f3efe7" }
  ];

  function build() {
    var cur = read(), open = readOpen();
    var curMode = window.PMMode ? PMMode.mode() : "dark";
    var curHead = window.PMMode ? PMMode.header() : "dark";
    var bar = document.createElement("div");
    bar.className = "pvbar";
    bar.setAttribute("data-open", open ? "true" : "false");
    bar.innerHTML =
      '<div class="pvbar-panel">' +
        '<div class="pvbar-head"><strong>Náhled</strong><span>Review</span></div>' +
        '<div class="pvrow"><label>Režim podkladu</label><div class="pvseg" id="pvseg-mode">' +
          MODES.map(function (m) {
            return '<button type="button" data-id="' + m.id + '" aria-pressed="' + (m.id === curMode) + '">' +
              '<i style="background:' + m.swatch + '"></i>' + m.label + '</button>';
          }).join("") +
        '</div></div>' +
        '<div class="pvrow"><label>Hlavička</label><div class="pvseg" id="pvseg-head">' +
          HEADS.map(function (h) {
            return '<button type="button" data-id="' + h.id + '" aria-pressed="' + (h.id === curHead) + '"' + (curMode === "dark" ? " disabled" : "") + '>' +
              '<i style="background:' + h.swatch + '"></i>' + h.label + '</button>';
          }).join("") +
        '</div><p class="pvnote">Světlou hlavičku lze zapnout v režimu Light a Duo.</p></div>' +
        '<div class="pvrow"><label>CTA barva</label><div class="pvseg" id="pvseg-cta">' +
          Object.keys(SCHEMES).map(function (k) {
            return '<button type="button" data-id="' + k + '" aria-pressed="' + (k === cur) + '">' +
              '<i style="background:' + SCHEMES[k].swatch + '"></i>' + SCHEMES[k].label + '</button>';
          }).join("") +
        '</div><p class="pvnote" id="pvnote">' + SCHEMES[cur].note + '</p></div>' +
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
    segClick("#pvseg-mode", function (id) {
      if (window.PMMode) PMMode.setMode(id);
      [].forEach.call(bar.querySelectorAll("#pvseg-head button"), function (x) { x.disabled = id === "dark"; });
    });
    segClick("#pvseg-head", function (id) { if (window.PMMode) PMMode.setHeader(id); });

    bar.querySelector("#pvseg-cta").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-id]");
      if (!b) return;
      var id = b.getAttribute("data-id");
      [].forEach.call(this.querySelectorAll("button"), function (x) {
        x.setAttribute("aria-pressed", String(x === b));
      });
      try { localStorage.setItem(KEY + "-cta", id); } catch (e2) {}
      bar.querySelector("#pvnote").textContent = SCHEMES[id].note;
      applyScheme(id);
    });
  }

  applyScheme(read());
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
