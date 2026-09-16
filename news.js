/* PRO MUSIC — NOVINKY: výpis (chip filtrace + stránkování) a detail.
   Výpis:  <div class="nlist-root" data-per="12"></div>   → potřebuje news-index.js
   Detail: <div class="nart-root"></div>  + ?a=<slug>     → potřebuje news-index.js + news-bodies.js
   Filtr se propisuje do URL (?f=kategorie, ?b=značka, ?p=2) — odkaz jde poslat. */
(function () {
  "use strict";

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function data() { return window.PM_NEWS || []; }
  function href(d) { return "novinka.html?a=" + encodeURIComponent(d.slug); }

  /* ── video: z libovolného tvaru URL udělá embed ── */
  function embed(u) {
    var m;
    if ((m = u.match(/youtu\.be\/([\w-]+)/))) return "https://www.youtube.com/embed/" + m[1];
    if ((m = u.match(/youtube\.com\/.*[?&]v=([\w-]+)/))) return "https://www.youtube.com/embed/" + m[1];
    if ((m = u.match(/youtube\.com\/embed\/([\w-]+)/))) return "https://www.youtube.com/embed/" + m[1];
    if ((m = u.match(/player\.vimeo\.com\/video\/(\d+)/))) return "https://player.vimeo.com/video/" + m[1];
    if ((m = u.match(/vimeo\.com\/(\d+)/))) return "https://player.vimeo.com/video/" + m[1];
    return u;
  }
  function videoBlock(u) {
    return '<div class="artvid"><iframe src="' + esc(embed(u)) + '" title="Video" loading="lazy" ' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>';
  }

  function card(d, feat) {
    return '<a class="ncard outline-glow' + (feat ? " news-feat" : "") + '" href="' + esc(href(d)) + '">' +
      '<div class="nmedia"><img src="' + esc(d.img) + '" alt="" loading="lazy" decoding="async" /></div>' +
      '<div class="nbody"><div class="nmeta"><span class="chip chip-accent">' + esc(d.cat) + "</span>" + (d.brand ? '<span class="chip">' + esc(d.brand) + "</span>" : "") + "</div>" +
      "<h3>" + esc(d.t) + "</h3><p>" + esc(d.perex) + "</p>" +
      '<div class="ngo"><span class="btn btn-ghost btn-sm">Číst dál<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></span></div></div></a>';
  }

  /* ─────────────────── VÝPIS ─────────────────── */
  function buildList(root) {
    var per = parseInt(root.getAttribute("data-per"), 10) || 12;
    var all = data();
    /* do filtru patří jen dvě témata — Reference/Instalace řeší jiné sekce webu */
    var cats = ["Produktové novinky", "Firemní novinky"].filter(function (c) {
      return all.some(function (d) { return d.tags.indexOf(c) > -1; });
    });
    var brands = [];
    all.forEach(function (d) {
      if (d.brand && brands.indexOf(d.brand) < 0) brands.push(d.brand);
    });
    brands.sort(function (a, b) { return a.localeCompare(b, "cs"); });

    var q = new URLSearchParams(location.search);
    var fCat = cats.indexOf(q.get("f")) > -1 ? q.get("f") : "";
    var fBr = brands.indexOf(q.get("b")) > -1 ? q.get("b") : "";
    var page = Math.max(1, parseInt(q.get("p"), 10) || 1);

    root.innerHTML =
      '<div class="nfilters">' +
        '<div class="nfrow"><span class="nflabel mono">Téma</span><div class="reffilter nf-cat" role="group" aria-label="Filtr podle tématu"></div></div>' +
        '<div class="nfrow is-hidden"><span class="nflabel mono">Značka</span><div class="reffilter nf-br" role="group" aria-label="Filtr podle značky"></div></div>' +
      "</div>" +
      '<p class="plist-count mono"></p>' +
      '<div class="news" data-stagger></div>' +
      '<nav class="pager" aria-label="Stránkování"></nav>';

    var elCat = root.querySelector(".nf-cat"), elBr = root.querySelector(".nf-br");
    var elC = root.querySelector(".plist-count"), elL = root.querySelector(".news"), elP = root.querySelector(".pager");

    function chips(el, vals, all_) {
      el.innerHTML = ['<button class="chip-filter" data-v="">' + all_ + "</button>"]
        .concat(vals.map(function (v) { return '<button class="chip-filter" data-v="' + esc(v) + '">' + esc(v) + "</button>"; })).join("");
    }
    chips(elCat, cats, "Vše");
    chips(elBr, brands, "Všechny");

    function render(scroll) {
      var rows = all.filter(function (d) {
        return (!fCat || d.tags.indexOf(fCat) > -1) && (!fBr || d.brand === fBr);
      });
      var pages = Math.max(1, Math.ceil(rows.length / per));
      if (page > pages) page = pages;
      var from = (page - 1) * per, slice = rows.slice(from, from + per);

      [[elCat, fCat], [elBr, fBr]].forEach(function (p) {
        p[0].querySelectorAll(".chip-filter").forEach(function (b) {
          var on = b.getAttribute("data-v") === p[1];
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
      });

      elC.textContent = rows.length
        ? (from + 1) + "\u2013" + (from + slice.length) + " z " + rows.length + " novinek"
        : "Nic, co by odpovídalo filtru.";

      elL.innerHTML = slice.map(function (d) { return card(d, false); }).join("");

      if (pages > 1) {
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
      fCat ? p2.set("f", fCat) : p2.delete("f");
      fBr ? p2.set("b", fBr) : p2.delete("b");
      page > 1 ? p2.set("p", page) : p2.delete("p");
      history.replaceState(null, "", location.pathname + (p2.toString() ? "?" + p2 : "") + location.hash);

      if (window.UIArmGlow) window.UIArmGlow();
      if (window.UILoader && window.UILoader.scanGlow) window.UILoader.scanGlow();
      if (scroll) window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
    }

    elCat.addEventListener("click", function (e) {
      var b = e.target.closest(".chip-filter"); if (!b) return;
      fCat = b.getAttribute("data-v"); page = 1; render(true);
    });
    elBr.addEventListener("click", function (e) {
      var b = e.target.closest(".chip-filter"); if (!b) return;
      fBr = b.getAttribute("data-v"); page = 1; render(true);
    });
    elP.addEventListener("click", function (e) {
      var b = e.target.closest("[data-p]"); if (!b || b.disabled) return;
      page = parseInt(b.getAttribute("data-p"), 10); render(true);
    });

    render(false);
  }

  /* ─────────────────── DETAIL ─────────────────── */
  function buildArticle(root) {
    var all = data();
    var slug = new URLSearchParams(location.search).get("a");
    var i = all.findIndex(function (d) { return d.slug === slug; });
    if (i < 0) i = 0;
    var d = all[i], body = (window.PM_NEWS_BODY || {})[d.slug] || { html: "", v: [] };

    /* video placeholdery z dat → skutečné embedy */
    var html = body.html.replace(/<div data-video="(\d+)"><\/div>/g, function (m, n) {
      var u = body.v[parseInt(n, 10) - 1];
      return u ? videoBlock(u) : "";
    });

    var prev = all[i - 1], next = all[i + 1];
    document.title = "PRO MUSIC — " + d.t;

    /* záhlaví stránky — fotka novinky jako podklad, stejně jako u výpisů */
    var head = document.querySelector(".nart-head");
    if (head) {
      var img = head.querySelector(".bg img");
      if (img) { if (d.img) img.src = d.img; else img.closest(".bg").style.display = "none"; }
      head.querySelector("h1").textContent = d.t;
      head.querySelector(".lead").textContent = d.perex;
      head.querySelector(".artmeta").innerHTML = "<b>" + esc(d.cat) + "</b>" + (d.brand ? "<span>" + esc(d.brand) + "</span>" : "");
      var cur = head.querySelector(".breadcrumb .cur");
      if (cur) cur.textContent = d.t;
    }

    root.innerHTML =
      '<article class="artc">' +
        '<div class="artbody">' + html + "</div>" +
        '<nav class="artnav">' +
          (prev ? '<a class="artnav-l btn btn-ghost btn-sm" href="' + esc(href(prev)) + '" title="' + esc(prev.t) + '"><ui-icon class="btn-ico" name="ui-arrow-left" aria-hidden="true"></ui-icon>Předchozí</a>' : '<span class="artnav-l is-off"></span>') +
          '<a class="artnav-up btn btn-ghost btn-sm" href="novinky.html">Všechny novinky</a>' +
          (next ? '<a class="artnav-r btn btn-ghost btn-sm" href="' + esc(href(next)) + '" title="' + esc(next.t) + '">Další<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></a>' : '<span class="artnav-r is-off"></span>') +
        "</nav>" +
      "</article>";

    /* Další novinky — tři z téže kategorie */
    var rel = document.querySelector(".nrel");
    if (rel) {
      var pick = all.filter(function (x) { return x.slug !== d.slug && x.cat === d.cat; }).slice(0, 3);
      if (!pick.length) pick = all.filter(function (x) { return x.slug !== d.slug; }).slice(0, 3);
      rel.innerHTML = pick.map(function (x) { return card(x, false); }).join("");
    }

    if (window.UIArmGlow) window.UIArmGlow();
    if (window.UILoader && window.UILoader.scanGlow) window.UILoader.scanGlow();
  }

  function boot() {
    document.querySelectorAll(".nlist-root").forEach(buildList);
    document.querySelectorAll(".nart-root").forEach(buildArticle);
    /* blok „Novinky ke značce" — <div class="news nbrand" data-brand="L-Acoustics" data-n="3"></div> */
    document.querySelectorAll(".nbrand").forEach(function (el) {
      var b = el.getAttribute("data-brand"), n = parseInt(el.getAttribute("data-n"), 10) || 3;
      var rows = data().filter(function (d) { return !b || d.brand === b; }).slice(0, n);
      el.innerHTML = rows.map(function (d) { return card(d, false); }).join("");
      if (window.UIArmGlow) window.UIArmGlow();
      if (window.UILoader && window.UILoader.scanGlow) window.UILoader.scanGlow();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
