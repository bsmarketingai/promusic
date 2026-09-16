/* PRO MUSIC — SECOND HAND: výpis produktů (karta jako novinka) + stránkování.
   Použití: <div class="shlist-root" data-per="12"></div> + secondhand-data.js
   Stránka se propisuje do URL (?p=2), filtr značky do (?b=). */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function data() { return window.PM_SECONDHAND || []; }

  function card(d) {
    return '<a class="ncard shcard outline-glow" href="' + esc(d.url || "mailto:info@promusic.cz") + '"' + (d.url ? ' target="_blank" rel="noopener"' : "") + ">" +
      '<div class="nmedia shmedia">' + (d.img
        ? '<img src="' + esc(d.img) + '" alt="' + esc(d.n) + '" loading="lazy" decoding="async" />'
        : '<span class="shnoimg mono">bez fotky</span>') + "</div>" +
      '<div class="nbody">' +
        '<div class="nmeta">' + (d.stav ? '<span class="chip">' + esc(d.stav) + "</span>" : "") + "</div>" +
        "<h3>" + esc(d.n) + "</h3>" +
        (d.note ? "<p>" + esc(d.note) + "</p>" : "") +
        '<div class="shprice mono">' + esc(d.cena || "na dotaz") + "</div>" +
        '<div class="ngo"><span class="btn btn-ghost btn-sm">Prohlédnout<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></span></div>' +
      "</div></a>";
  }

  function build(root) {
    var per = parseInt(root.getAttribute("data-per"), 10) || 12;
    var all = data();
    var brands = [];
    all.forEach(function (d) { if (d.brand && brands.indexOf(d.brand) < 0) brands.push(d.brand); });
    brands.sort(function (a, b) { return a.localeCompare(b, "cs"); });

    var q = new URLSearchParams(location.search);
    var fBr = brands.indexOf(q.get("b")) > -1 ? q.get("b") : "";
    var page = Math.max(1, parseInt(q.get("p"), 10) || 1);

    root.innerHTML =
      '<div class="nfilters"><div class="nfrow"><span class="nflabel mono">Značka</span>' +
      '<div class="reffilter sh-br" role="group" aria-label="Filtr podle značky"></div></div></div>' +
      '<p class="plist-count mono"></p>' +
      '<div class="news shnews" data-stagger></div>' +
      '<nav class="pager" aria-label="Stránkování"></nav>';

    var elBr = root.querySelector(".sh-br"), elC = root.querySelector(".plist-count"),
        elL = root.querySelector(".shnews"), elP = root.querySelector(".pager");

    elBr.innerHTML = ['<button class="chip-filter" data-v="">Všechny</button>'].concat(
      brands.map(function (v) { return '<button class="chip-filter" data-v="' + esc(v) + '">' + esc(v) + "</button>"; })
    ).join("");

    function render(scroll) {
      var rows = all.filter(function (d) { return !fBr || d.brand === fBr; });
      var pages = Math.max(1, Math.ceil(rows.length / per));
      if (page > pages) page = pages;
      var from = (page - 1) * per, slice = rows.slice(from, from + per);

      elBr.querySelectorAll(".chip-filter").forEach(function (b) {
        var on = b.getAttribute("data-v") === fBr;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });

      elC.textContent = rows.length
        ? (from + 1) + "\u2013" + (from + slice.length) + " z " + rows.length + " produktů"
        : "Nic, co by odpovídalo filtru.";

      elL.innerHTML = slice.map(card).join("");

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
      fBr ? p2.set("b", fBr) : p2.delete("b");
      page > 1 ? p2.set("p", page) : p2.delete("p");
      history.replaceState(null, "", location.pathname + (p2.toString() ? "?" + p2 : "") + location.hash);

      if (window.UIArmGlow) window.UIArmGlow();
      if (window.UILoader && window.UILoader.scanGlow) window.UILoader.scanGlow();
      if (scroll) window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
    }

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

  function boot() { document.querySelectorAll(".shlist-root").forEach(build); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
