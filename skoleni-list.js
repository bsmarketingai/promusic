/* PRO MUSIC ACADEMY — výpis plánovaných školení (řádkové karty + filtr kategorií).
   Použití: <div class="clist-root"></div> + academy-data.js
   Filtr se propisuje do URL (?f=). */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* obsazenost → stav + text (jediné místo, kde se to formuluje) */
  function cap(c) {
    var free = Math.max(0, (c.places || 0) - (c.taken || 0));
    if (!c.places) return { s: "ok", t: "Kapacita na dotaz", free: free };
    if (free === 0) return { s: "full", t: "Obsazeno · zapíšeme jako náhradníka", free: 0 };
    if (free <= 2) return { s: "low", t: free === 1 ? "Poslední volné místo" : "Poslední " + free + " místa", free: free };
    return { s: "ok", t: "Volných míst " + free + " z " + c.places, free: free };
  }
  window.PM_ACADEMY_CAP = cap;

  function row(c) {
    var k = cap(c);
    return '<a class="crow outline-glow" href="skoleni-detail.html?k=' + esc(c.slug) + '">' +
      '<div class="crow-media">' + (c.img ? '<img src="' + esc(c.img) + '" alt="" loading="lazy" decoding="async" />' : "") + "</div>" +
      '<div class="crow-body">' +
        '<div class="crow-top"><span class="crow-date">' + esc(c.dateLabel) + "</span>" +
          '<span class="crow-cat">' + esc(c.cat) + "</span></div>" +
        "<h3>" + esc(c.n) + "</h3>" +
        (c.note ? "<p>" + esc(c.note) + "</p>" : "") +
        '<div class="crow-meta">' +
          '<span><ui-icon name="academy-schedule" aria-hidden="true"></ui-icon>' + esc(c.dni) + "</span>" +
          '<span><ui-icon name="venue-building" aria-hidden="true"></ui-icon>' + esc(c.misto) + "</span>" +
          '<span><ui-icon name="shop-payment" aria-hidden="true"></ui-icon>' + esc(c.cena) + " " + esc(c.cenaNote || "") + "</span>" +
        "</div>" +
        '<div class="crow-foot">' +
          '<span class="cap cap-' + k.s + '"><i aria-hidden="true"></i>' + esc(k.t) + "</span>" +
          '<span class="crow-go btn btn-primary btn-sm">' + (k.s === "full" ? "Zapsat jako náhradníka" : "Přihlásit se na školení") +
            '<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></span>' +
        "</div>" +
      "</div></a>";
  }

  window.PM_ACADEMY_ROW = row;

  function build(root) {
    var all = (window.PM_ACADEMY || []).slice().sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
    var cats = (window.PM_ACADEMY_CATS || []).filter(function (c) {
      return all.some(function (x) { return x.cat === c; });
    });

    var q = new URLSearchParams(location.search);
    var f = cats.indexOf(q.get("f")) > -1 ? q.get("f") : "";

    root.innerHTML =
      '<div class="nfilters"><div class="nfrow"><span class="nflabel">Kategorie kurzu</span>' +
      '<div class="reffilter ac-f" role="group" aria-label="Filtr podle kategorie"></div></div></div>' +
      '<p class="plist-count mono"></p>' +
      '<div class="crows" data-stagger></div>';

    var elF = root.querySelector(".ac-f"), elC = root.querySelector(".plist-count"), elL = root.querySelector(".crows");

    elF.innerHTML = ['<button class="chip-filter" data-v="">Všechna školení</button>'].concat(
      cats.map(function (v) { return '<button class="chip-filter" data-v="' + esc(v) + '">' + esc(v) + "</button>"; })
    ).join("");

    function render(scroll) {
      var rows = all.filter(function (c) { return !f || c.cat === f; });
      elF.querySelectorAll(".chip-filter").forEach(function (b) {
        var on = b.getAttribute("data-v") === f;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      elC.textContent = rows.length
        ? rows.length + (rows.length === 1 ? " vypsaný termín" : rows.length < 5 ? " vypsané termíny" : " vypsaných termínů")
        : "Pro tuto kategorii nemáme vypsaný termín. Napište nám, zařadíme vás do dalšího.";
      elL.innerHTML = rows.map(row).join("");

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

  function boot() { document.querySelectorAll(".clist-root").forEach(build); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
