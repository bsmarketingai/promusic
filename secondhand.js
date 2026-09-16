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

  /* Stav produktu — volné texty z dat se mapují na pár filtrovatelných kategorií. */
  var STAV_ORDER = ["Nové, nerozbalené", "Nové zboží", "Výprodej skladových zásob", "Demo, se zárukou", "Zánovní", "Použité"];
  function stavCat(v) {
    var t = String(v || "").toLowerCase();
    if (!t) return "";
    if (/demo|vystaven|zkoušen|vyzkoušen/.test(t)) return "Demo, se zárukou";
    if (/výprodej/.test(t)) return "Výprodej skladových zásob";
    if (/nerozbalen/.test(t)) return "Nové, nerozbalené";
    if (/zánovní|perfektní|minimálně|krátce/.test(t)) return "Zánovní";
    if (/použ/.test(t)) return "Použité";
    if (/nov/.test(t)) return "Nové zboží";
    return "";
  }

  window.PM_STAV_CAT = stavCat;

  function card(d) {
    return '<a class="ncard shcard outline-glow" href="produkt.html?p=' + esc(d.slug || "rf-venue-combine4") + '">' +
      '<div class="nmedia shmedia">' +
        (stavCat(d.stav) ? '<span class="shflag">' + esc(stavCat(d.stav)) + "</span>" : "") +
        (d.img
        ? '<img src="' + esc(d.img) + '" alt="' + esc(d.n) + '" loading="lazy" decoding="async" />'
        : '<span class="shnoimg mono">bez fotky</span>') + "</div>" +
      '<div class="nbody">' +
        "<h3>" + esc(d.n) + "</h3>" +
        (d.note ? "<p>" + esc(d.note) + "</p>" : "") +
        '<div class="shprice">' + esc(d.cena || "na dotaz") + "</div>" +
        '<div class="ngo"><span class="btn btn-ghost btn-sm">Prohlédnout<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></span></div>' +
      "</div></a>";
  }

  function build(root) {
    var per = parseInt(root.getAttribute("data-per"), 10) || 12;
    var all = data();
    var brands = [];
    all.forEach(function (d) { if (d.brand && brands.indexOf(d.brand) < 0) brands.push(d.brand); });
    brands.sort(function (a, b) { return a.localeCompare(b, "cs"); });

    var stavy = STAV_ORDER.filter(function (c) {
      return all.some(function (d) { return stavCat(d.stav) === c; });
    });

    var q = new URLSearchParams(location.search);
    var fBr = brands.indexOf(q.get("b")) > -1 ? q.get("b") : "";
    var fSt = stavy.indexOf(q.get("s")) > -1 ? q.get("s") : "";
    var page = Math.max(1, parseInt(q.get("p"), 10) || 1);

    root.innerHTML =
      '<div class="nfilters">' +
      '<div class="nfrow"><span class="nflabel">Značka</span>' +
      '<div class="nfwrap"><div class="reffilter sh-br" role="group" aria-label="Filtr podle značky"></div>' +
      '<button type="button" class="nf-more" data-more="značky" aria-expanded="false">Všechny značky<ui-icon class="btn-ico" name="ui-caret-down" aria-hidden="true"></ui-icon></button></div></div>' +
      '<div class="nfrow"><span class="nflabel">Stav</span>' +
      '<div class="nfwrap"><div class="reffilter sh-st" role="group" aria-label="Filtr podle stavu"></div>' +
      '<button type="button" class="nf-more" data-more="stavy" aria-expanded="false">Všechny stavy<ui-icon class="btn-ico" name="ui-caret-down" aria-hidden="true"></ui-icon></button></div></div></div>' +
      '<p class="plist-count mono"></p>' +
      '<div class="news shnews" data-stagger></div>' +
      '<nav class="pager" aria-label="Stránkování"></nav>';

    var elBr = root.querySelector(".sh-br"), elSt = root.querySelector(".sh-st"),
        elC = root.querySelector(".plist-count"),
        elL = root.querySelector(".shnews"), elP = root.querySelector(".pager");

    /* rozbalení jednořádkového filtru na malých displejích */
    root.querySelectorAll(".nf-more").forEach(function (btn) {
      var wrap = btn.closest(".nfwrap"), what = btn.getAttribute("data-more");
      btn.addEventListener("click", function () {
        var on = !wrap.classList.contains("is-open");
        wrap.classList.toggle("is-open", on);
        btn.setAttribute("aria-expanded", on ? "true" : "false");
        btn.firstChild.nodeValue = (on ? "Skrýt " : "Všechny ") + what;
      });
    });

    function chips(list) {
      return ['<button class="chip-filter" data-v="">Všechny</button>'].concat(
        list.map(function (v) { return '<button class="chip-filter" data-v="' + esc(v) + '">' + esc(v) + "</button>"; })
      ).join("");
    }
    elBr.innerHTML = chips(brands);
    elSt.innerHTML = chips(stavy);

    function render(scroll) {
      var rows = all.filter(function (d) {
        return (!fBr || d.brand === fBr) && (!fSt || stavCat(d.stav) === fSt);
      });
      var pages = Math.max(1, Math.ceil(rows.length / per));
      if (page > pages) page = pages;
      var from = (page - 1) * per, slice = rows.slice(from, from + per);

      [[elBr, fBr], [elSt, fSt]].forEach(function (pair) {
        pair[0].querySelectorAll(".chip-filter").forEach(function (b) {
          var on = b.getAttribute("data-v") === pair[1];
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
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
      fSt ? p2.set("s", fSt) : p2.delete("s");
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
    elSt.addEventListener("click", function (e) {
      var b = e.target.closest(".chip-filter"); if (!b) return;
      fSt = b.getAttribute("data-v"); page = 1; render(true);
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
