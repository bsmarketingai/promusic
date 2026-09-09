/* PRO MUSIC — UI LOADER
   Načte samostatné HTML komponenty (ui-*.html) a zapojí jejich chování.
   Komponenty edituj přímo v ui-header.html / ui-mobile-menu.html / ui-footer.html —
   propíše se na všechny stránky.

   Volitelné umístění: <ui-header></ui-header> · <ui-footer></ui-footer>
   Bez nich se hlavička+menu vloží na začátek <body> a patička na konec. */
(function () {
  "use strict";

  /* Bumpni při každé editaci ui-header/ui-mobile-menu/ui-footer.html — jinak drží cache. */
  var V = 16;

  var COMPONENTS = [
    { file: "ui-header.html",      mount: "prepend", el: "ui-header" },
    { file: "ui-mobile-menu.html", mount: "prepend", el: "ui-mobile-menu" },
    { file: "ui-footer.html",      mount: "append",  el: "ui-footer" }
  ];

  var ROOT_SEL = "header.nav, .navfab, #mobmenu, footer.foot";

  function inject(html, spec) {
    var holder = document.createElement("div");
    holder.innerHTML = html.replace(/<!--[\s\S]*?-->/g, "").trim();
    /* soubory jsou servírované jako plné HTML dokumenty → ber JEN komponentní roots,
       ne dev wrappery (<style>/<script>) */
    var nodes = [].slice.call(holder.querySelectorAll(ROOT_SEL));
    if (!nodes.length) nodes = [].slice.call(holder.children).filter(function (n) {
      return !/^(STYLE|SCRIPT|LINK|META|TITLE)$/.test(n.tagName);
    });
    nodes.forEach(function (n) { n.setAttribute("data-ui-loaded", "1"); });
    var host = document.querySelector(spec.el);
    if (host) { nodes.forEach(function (n) { host.appendChild(n); }); return nodes; }
    if (spec.mount === "prepend") {
      nodes.slice().reverse().forEach(function (n) { document.body.insertBefore(n, document.body.firstChild); });
    } else {
      nodes.forEach(function (n) { document.body.appendChild(n); });
    }
    return nodes;
  }

  /* odstraní STARÉ (stránkou generované) kopie — pozná je podle chybějícího data-ui-loaded */
  function dedupe() {
    ["header.nav", ".navfab", "#mobmenu", "footer.foot", "header.cnav"].forEach(function (sel) {
      var all = [].slice.call(document.querySelectorAll(sel));
      var loaded = all.filter(function (n) { return n.hasAttribute("data-ui-loaded"); });
      if (loaded.length) {
        /* ponech PRVNÍ načtený, zbytek (i duplicitně deklarovaný v jiné komponentě) zahoď */
        all.forEach(function (n) { if (n !== loaded[0]) n.remove(); });
      } else {
        for (var i = 0; i < all.length - 1; i++) all[i].remove();
      }
    });
  }

  function markActive() {
    var active = document.body.getAttribute("data-nav");
    if (!active) return;
    var link = document.querySelector('.nav-link[data-nav-item="' + active + '"]');
    if (link) link.classList.add("is-active");
  }

  function wire() {
    var mob = document.getElementById("mobmenu");
    var fab = document.querySelector(".navfab");
    if (!mob) return;
    function open()  { mob.classList.add("open");    if (fab) fab.classList.add("open");    document.body.style.overflow = "hidden"; }
    function close() { mob.classList.remove("open"); if (fab) fab.classList.remove("open"); document.body.style.overflow = ""; }
    document.querySelectorAll(".hamburger, .navfab").forEach(function (t) {
      if (t.__w) return; t.__w = 1;
      t.addEventListener("click", function () { mob.classList.contains("open") ? close() : open(); });
    });
    var cl = document.querySelector(".mobmenu-close");
    if (cl && !cl.__w) { cl.__w = 1; cl.addEventListener("click", close); }
    document.querySelectorAll(".mobitem.has-sub .mobitem-row").forEach(function (row) {
      if (row.__w) return; row.__w = 1;
      row.addEventListener("click", function (e) {
        if (e.target.closest(".mobitem-label")) return;
        var it = row.parentElement, isOpen = it.classList.toggle("exp");
        var plus = row.querySelector(".mobitem-plus");
        if (plus) plus.textContent = isOpen ? "–" : "+";
      });
    });
  }

  /* outline-glow pointer tracking (sjednocený rukopis hoveru) */
  function glow(el) {
    if (el.__g) return; el.__g = 1;
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
    });
  }
  function scanGlow() {
    document.querySelectorAll(
      ".btn,.chip-filter,.edu-tab,.outline-glow,.segcard,.workcard,.hero-card," +
      ".flagship,.brcell,.acard,.fixcard,.problem,.proof,.reftile,.ui-card," +
      ".ui-control,.ui-search,.ui-dd-btn,.foot-col a,.megafeat"
    ).forEach(glow);
  }

  function boot() {
    var loads = COMPONENTS.map(function (spec) {
      return fetch(spec.file + "?v=" + V)
        .then(function (r) { return r.ok ? r.text() : ""; })
        .then(function (html) { if (html) inject(html, spec); })
        .catch(function () {});
    });
    Promise.all(loads).then(function () {
      dedupe(); markActive(); wire(); scanGlow();
      if (window.UIArmGlow) window.UIArmGlow();
      /* pozdní generátory stránky (home-content.js) mohou vložit vlastní nav → uklidit znovu */
      setTimeout(function () { dedupe(); markActive(); wire(); scanGlow(); }, 60);
      setTimeout(function () { dedupe(); markActive(); wire(); }, 400);
      window.dispatchEvent(new CustomEvent("ui-nav-ready"));
    });
    setTimeout(scanGlow, 500);
    setTimeout(scanGlow, 1500);
    new MutationObserver(scanGlow).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.UILoader = { scanGlow: scanGlow, wire: wire };
})();
