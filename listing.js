/* PRO MUSIC — VÝPIS PROJEKTŮ (chip filtrace + stránkování)
   Na stránce stačí (data-f = výchozí kategorie, volitelné):
     <div class="plist-root" data-kind="live"   data-per="6"></div>
     <div class="plist-root" data-kind="inst"   data-per="6"></div>
   Data bere z projects-data.js, karty renderuje jako ui-live-card / ui-inst-card.
   Filtr se propisuje do URL (?f=Festivaly), stránka do ?p=2 — odkaz jde poslat. */
(function () {
  "use strict";

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function list(v) { return (v || []).join("|"); }

  var K_LIVE = "Touring / Rental / Produkce", K_INST = "Instalace", K_WORLD = "Ze světa";

  function build(root) {
    var kindAttr = root.getAttribute("data-kind");
    var kind = kindAttr === "inst" ? "inst" : kindAttr === "all" ? "all" : "live";
    var per = parseInt(root.getAttribute("data-per"), 10) || 6;
    var data, cats;
    if (kind === "all") {
      /* společný výpis všech referencí — live i instalace v jedné mřížce */
      data = (window.PM_LIVE || []).map(function (d) { return Object.assign({}, d, { __k: "live" }); })
        .concat((window.PM_INST || []).map(function (d) { return Object.assign({}, d, { __k: "inst" }); }));
      data.sort(function (a, b) { return (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0); });
      cats = [K_LIVE, K_INST].concat(data.some(function (d) { return d.world; }) ? [K_WORLD] : []);
    } else {
      data = kind === "inst" ? (window.PM_INST || []) : (window.PM_LIVE || []);
      cats = kind === "inst" ? (window.PM_INST_CATS || []) : (window.PM_LIVE_CATS || []);
      /* kategorie bez jediného projektu do filtru nepatří */
      cats = cats.filter(function (c) { return data.some(function (d) { return d.cat === c; }); });
      var hasWorld = data.some(function (d) { return d.world; });
      if (hasWorld) cats = cats.concat([K_WORLD]);
    }

    var q = new URLSearchParams(location.search);
    /* Výchozí kategorie stránky: <div class="plist-root" data-f="Divadla &amp; sály">.
       ?f= v URL má přednost (včetně ?f= = „Vše"). */
    var def = root.getAttribute("data-f") || "";
    if (cats.indexOf(def) < 0) def = "";
    var filter = q.has("f")
      ? (cats.indexOf(q.get("f")) > -1 ? q.get("f") : "")
      : def;
    var page = Math.max(1, parseInt(q.get("p"), 10) || 1);

    root.innerHTML =
      '<div class="reffilter plist-filter" role="group" aria-label="Filtr podle kategorie"></div>' +
      '<p class="plist-count mono"></p>' +
      '<div class="plist" data-stagger></div>' +
      '<nav class="pager" aria-label="Stránkování"></nav>';
    var elF = root.querySelector(".plist-filter");
    var elC = root.querySelector(".plist-count");
    var elL = root.querySelector(".plist");
    var elP = root.querySelector(".pager");

    elF.innerHTML = ['<button class="chip-filter" data-f="">Vše</button>']
      .concat(cats.map(function (c) { return '<button class="chip-filter" data-f="' + esc(c) + '">' + esc(c) + "</button>"; })).join("");

    function card(d) {
      if (kind === "inst" || d.__k === "inst") {
        return "<ui-inst-card" +
          ' title="' + esc(d.t) + '" cat="' + esc(d.cat) + '" city="' + esc(d.city) + '" year="' + esc(d.year) + '"' +
          ' tech="' + esc(list(d.tech)) + '" cap="' + esc(d.cap) + '"' +
          ' img="' + esc(d.img) + '" href="' + esc(d.href) + '"></ui-inst-card>';
      }
      return "<ui-live-card" +
        ' title="' + esc(d.t) + '" cat="' + esc(d.cat) + '" year="' + esc(d.year) + '" place="' + esc(d.place) + '"' +
        ' tech="' + esc(list(d.tech)) + '" scale="' + esc(list(d.scale)) + '"' +
        (d.world ? ' world' : "") +
        ' img="' + esc(d.img) + '" href="' + esc(d.href) + '"></ui-live-card>';
    }

    function render(scroll) {
      var rows = !filter ? data.slice()
        : filter === K_WORLD ? data.filter(function (d) { return d.world; })
        : (kind === "all" && (filter === K_LIVE || filter === K_INST))
          ? data.filter(function (d) { return d.__k === (filter === K_INST ? "inst" : "live"); })
        : data.filter(function (d) { return d.cat === filter; });
      var pages = Math.max(1, Math.ceil(rows.length / per));
      if (page > pages) page = pages;
      var from = (page - 1) * per;
      var slice = rows.slice(from, from + per);

      elF.querySelectorAll(".chip-filter").forEach(function (b) {
        b.classList.toggle("is-active", b.getAttribute("data-f") === filter);
        b.setAttribute("aria-pressed", b.getAttribute("data-f") === filter ? "true" : "false");
      });
      elC.textContent = rows.length
        ? (from + 1) + "\u2013" + (from + slice.length) + " z " + rows.length + (filter ? " · " + filter : "")
        : "Zatím tu nic není.";
      elL.innerHTML = slice.map(card).join("");

      if (pages > 1) {
        /* okno kolem aktuální stránky + krajní čísla, mezery jako … */
        var nums = [1, pages, page, page - 1, page + 1]
          .filter(function (n) { return n >= 1 && n <= pages; })
          .filter(function (n, i, a) { return a.indexOf(n) === i; })
          .sort(function (a, b) { return a - b; });
        var btns = "", prev = 0;
        nums.forEach(function (i) {
          if (prev && i - prev > 1) btns += '<span class="pager-gap">…</span>';
          btns += '<button class="pager-n' + (i === page ? " is-active" : "") + '" data-p="' + i + '"' + (i === page ? ' aria-current="page"' : "") + ">" + i + "</button>";
          prev = i;
        });
        elP.innerHTML =
          '<button class="pager-arrow" data-p="' + (page - 1) + '"' + (page === 1 ? " disabled" : "") + ' aria-label="Předchozí"><ui-icon name="ui-arrow-left" aria-hidden="true"></ui-icon></button>' +
          '<div class="pager-nums">' + btns + "</div>" +
          '<button class="pager-arrow" data-p="' + (page + 1) + '"' + (page === pages ? " disabled" : "") + ' aria-label="Další"><ui-icon name="ui-chevron-right" aria-hidden="true"></ui-icon></button>';
      } else elP.innerHTML = "";

      var p2 = new URLSearchParams(location.search);
      filter ? p2.set("f", filter) : p2.delete("f");
      page > 1 ? p2.set("p", page) : p2.delete("p");
      history.replaceState(null, "", location.pathname + (p2.toString() ? "?" + p2 : "") + location.hash);

      if (window.UIArmGlow) window.UIArmGlow();
      if (window.UILoader && window.UILoader.scanGlow) window.UILoader.scanGlow();
      if (scroll) window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
    }

    elF.addEventListener("click", function (e) {
      var b = e.target.closest(".chip-filter"); if (!b) return;
      filter = b.getAttribute("data-f"); page = 1; render(true);
    });
    elP.addEventListener("click", function (e) {
      var b = e.target.closest("[data-p]"); if (!b || b.disabled) return;
      page = parseInt(b.getAttribute("data-p"), 10); render(true);
    });

    render(false);
  }

  function boot() { document.querySelectorAll(".plist-root").forEach(build); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
