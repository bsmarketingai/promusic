/* PRO MUSIC — HLEDÁNÍ V HLAVIČCE
   Ikona vedle přepínače jazyků → rozbalí horizontální input → našeptávač
   se třemi skupinami: Reference (projekty + instalace), Novinky, Second Hand.
   Data se dotahují líně (až při prvním otevření), protože výpisová data
   nejsou na většině stránek načtená. */
(function () {
  "use strict";
  var DATA = [
    { src: "projects-data.js?v=5", has: function () { return !!window.PM_LIVE; } },
    { src: "news-index.js?v=3", has: function () { return !!window.PM_NEWS; } },
    { src: "secondhand-data.js?v=4", has: function () { return !!window.PM_SECONDHAND; } }
  ];
  var loading = null;

  function load() {
    if (loading) return loading;
    loading = Promise.all(DATA.map(function (d) {
      if (d.has()) return Promise.resolve();
      return new Promise(function (res) {
        var s = document.createElement("script");
        s.src = d.src; s.onload = res; s.onerror = res;
        document.head.appendChild(s);
      });
    }));
    return loading;
  }

  function norm(s) {
    s = String(s == null ? "" : s).toLowerCase();
    return s.normalize ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : s;
  }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* zvýrazňuje jen shodu včetně diakritiky — normalizovaný index nesedí na původní řetězec */
  function mark(text, raw) {
    var t = String(text == null ? "" : text);
    var i = raw ? t.toLowerCase().indexOf(raw.toLowerCase()) : -1;
    if (i < 0) return esc(t);
    return esc(t.slice(0, i)) + "<b>" + esc(t.slice(i, i + raw.length)) + "</b>" + esc(t.slice(i + raw.length));
  }

  function collect() {
    var out = { ref: [], news: [], sh: [] };
    (window.PM_LIVE || []).forEach(function (p) {
      out.ref.push({ t: p.t, meta: [p.cat, p.year].filter(Boolean).join(" · "),
        hay: [p.t, p.cat, p.place, (p.tech || []).join(" ")].join(" "),
        desc: p.note || (p.tech || []).join(" · "),
        href: p.href || "live-a-turne.html", img: p.img });
    });
    (window.PM_INST || []).forEach(function (p) {
      out.ref.push({ t: p.t, meta: [p.cat, p.city].filter(Boolean).join(" · "),
        hay: [p.t, p.cat, p.city, (p.tech || []).join(" ")].join(" "),
        desc: p.note || (p.tech || []).join(" · "),
        href: p.href || "stale-instalace.html", img: p.img });
    });
    (window.PM_NEWS || []).forEach(function (a) {
      out.news.push({ t: a.t, meta: [a.cat, a.brand].filter(Boolean).join(" · "),
        hay: [a.t, a.cat, a.brand, a.perex].join(" "),
        desc: a.perex || "",
        href: "novinka.html?a=" + encodeURIComponent(a.slug), img: a.img });
    });
    (window.PM_SECONDHAND || []).forEach(function (p) {
      out.sh.push({ t: p.n, meta: p.brand || "",
        hay: [p.n, p.brand, p.note, p.stav].join(" "),
        desc: [p.note, p.stav].filter(Boolean).join(" · "),
        href: "produkt.html?p=" + encodeURIComponent(p.slug || ""), img: p.img });
    });
    return out;
  }

  var GROUPS = [
    { k: "ref", label: "Reference", all: "reference.html" },
    { k: "news", label: "Novinky", all: "novinky.html" },
    { k: "sh", label: "Second Hand", all: "second-hand.html" }
  ];

  function results(q) {
    var nq = norm(String(q || "").trim()), out = {};
    GROUPS.forEach(function (g) {
      out[g.k] = nq.length < 2 ? [] : (collect()[g.k] || []).filter(function (it) { return norm(it.hay).indexOf(nq) > -1; });
    });
    return out;
  }
  /* index je společný s stránkou výsledků (hledani.js) */
  window.PMSearch = { load: load, collect: collect, results: results, GROUPS: GROUPS, norm: norm, esc: esc };

  function build(root) {
    var btn = root.querySelector(".hsearch-btn");
    var input = root.querySelector(".hsearch-input");
    var panel = root.querySelector(".hsearch-panel");
    var form = root.querySelector(".hsearch-field");
    if (!btn || !input || !panel) return;

    var nav = root.closest(".nav");
    function open() {
      root.classList.add("is-open");
      if (nav) nav.classList.add("search-open");
      btn.setAttribute("aria-expanded", "true");
      load().then(function () { if (input.value.trim()) render(); });
      setTimeout(function () { input.focus(); }, 60);
    }
    function close() {
      root.classList.remove("is-open");
      if (nav) nav.classList.remove("search-open");
      btn.setAttribute("aria-expanded", "false");
      panel.hidden = true;
    }
    btn.addEventListener("click", function () {
      root.classList.contains("is-open") ? close() : open();
    });
    root.querySelector(".hsearch-close").addEventListener("click", function () { input.value = ""; panel.innerHTML = ""; close(); });
    /* Enter → stránka s plnými výsledky */
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (v.length > 1) location.href = "hledani.html?q=" + encodeURIComponent(v);
    });

    function render() {
      if (!root.classList.contains("is-open")) { panel.hidden = true; return; }
      var raw = input.value.trim(), q = norm(raw);
      if (q.length < 2) { panel.hidden = true; panel.innerHTML = ""; return; }
      var data = collect(), total = 0, html = "";
      var LIMIT = 6;
      GROUPS.forEach(function (g) {
        var hits = (data[g.k] || []).filter(function (it) { return norm(it.hay).indexOf(q) > -1; });
        if (!hits.length) return;
        total += hits.length;
        html += '<div class="hsearch-group"><div class="hsearch-glabel">' + g.label +
          '<span>' + hits.length + '</span></div><ul>' +
          hits.slice(0, LIMIT).map(function (it) {
            return '<li><a href="' + esc(it.href) + '">' +
              (it.img ? '<span class="hs-thumb"><img loading="lazy" src="' + esc(it.img) + '" alt="" /></span>' : '<span class="hs-thumb hs-thumb-empty"></span>') +
              '<span class="hs-txt"><strong>' + mark(it.t, raw) + '</strong>' +
              (it.meta ? '<span class="hs-meta">' + esc(it.meta) + '</span>' : '') + '</span></a></li>';
          }).join("") + '</ul>' +
          (hits.length > LIMIT ? '<a class="hsearch-more" href="hledani.html?q=' + encodeURIComponent(raw) + '#' + g.k + '">Všech ' + hits.length + ' v ' + g.label + '<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></a>' : '') +
          '</div>';
      });
      if (total) html += '<a class="hsearch-all" href="hledani.html?q=' + encodeURIComponent(raw) + '">Všechny výsledky (' + total + ')<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></a>';
      panel.innerHTML = total ? html : '<p class="hsearch-hint">Nic jsme nenašli. Zkus značku, město nebo typ akce.</p>';
      panel.hidden = false;
    }

    var t = null;
    input.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () { load().then(render); }, 120);
    });
    input.addEventListener("keydown", function (e) { if (e.key === "Escape") { close(); btn.focus(); } });
    /* klik mimo vždy zavře — panel nesmí zůstat viset nad stránkou */
    document.addEventListener("click", function (e) {
      if (!root.contains(e.target) && root.classList.contains("is-open")) close();
    });
  }

  function init() {
    document.querySelectorAll(".hsearch").forEach(function (r) {
      if (r.__s) return; r.__s = 1; build(r);
    });
  }
  window.addEventListener("ui-nav-ready", init);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  setTimeout(init, 800);
})();
