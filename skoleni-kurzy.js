/* PRO MUSIC ACADEMY — výpis kurzů (karta = šablona novinky .ncard + filtr learning profilů).
   Použití: <div class="alist-root"></div> + academy-courses.js · filtr v URL (?f=) */
(function () {
  "use strict";
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }

  /* štítky: max. 2 profily, zbytek jako „+N" */
  function card(c) {
    var p = c.prof || [], show = p.slice(0, 2), more = p.length - show.length;
    return '<a class="ncard outline-glow" href="skoleni-detail.html?k=' + encodeURIComponent(c.slug) + '">' +
      '<div class="nmedia"><img src="' + esc(c.img) + '" alt="" loading="lazy" decoding="async" /></div>' +
      '<div class="nbody"><div class="nmeta">' +
        show.map(function (x, i) { return '<span class="chip' + (i === 0 ? " chip-accent" : "") + '">' + esc(x) + "</span>"; }).join("") +
        (more > 0 ? '<span class="chip">+' + more + "</span>" : "") +
      "</div>" +
      "<h3>" + esc(c.n) + "</h3><p>" + esc(c.perex) + "</p>" +
      '<div class="ngo"><span class="btn btn-ghost btn-sm">Detail kurzu<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></span></div></div></a>';
  }
  window.PM_COURSE_CARD = card;

  function plural(n) { return n === 1 ? " kurz" : n < 5 ? " kurzy" : " kurzů"; }

  function build(root) {
    var all = window.PM_COURSES || [];
    var profs = (window.PM_COURSE_PROFILES || []).filter(function (p) { return all.some(function (c) { return c.prof.indexOf(p) > -1; }); });
    var f = profs.indexOf(new URLSearchParams(location.search).get("f")) > -1 ? new URLSearchParams(location.search).get("f") : "";

    root.innerHTML =
      '<div class="nfilters"><div class="nfrow"><span class="nflabel mono">Learning profil</span>' +
      '<div class="reffilter ac-f" role="group" aria-label="Filtr podle learning profilu"></div></div></div>' +
      '<p class="plist-count mono"></p><div class="news" data-stagger></div>';

    var elF = root.querySelector(".ac-f"), elC = root.querySelector(".plist-count"), elL = root.querySelector(".news");
    elF.innerHTML = ['<button class="chip-filter" data-v="">Všechny kurzy</button>'].concat(
      profs.map(function (v) { return '<button class="chip-filter" data-v="' + esc(v) + '">' + esc(v) + "</button>"; })).join("");

    function render(scroll) {
      var rows = all.filter(function (c) { return !f || c.prof.indexOf(f) > -1; });
      elF.querySelectorAll(".chip-filter").forEach(function (b) {
        var on = b.getAttribute("data-v") === f;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      elC.textContent = rows.length + plural(rows.length);
      elL.innerHTML = rows.map(card).join("");
      var p2 = new URLSearchParams(location.search);
      f ? p2.set("f", f) : p2.delete("f");
      history.replaceState(null, "", location.pathname + (p2.toString() ? "?" + p2 : "") + location.hash);
      if (window.UIArmGlow) window.UIArmGlow();
      if (window.UILoader && window.UILoader.scanGlow) window.UILoader.scanGlow();
      if (scroll) window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
    }
    elF.addEventListener("click", function (e) {
      var b = e.target.closest(".chip-filter"); if (!b) return;
      f = b.getAttribute("data-v"); render(true);
    });
    render(false);
  }

  function boot() { document.querySelectorAll(".alist-root").forEach(build); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
