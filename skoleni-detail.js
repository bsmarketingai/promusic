/* PRO MUSIC ACADEMY — detail školení (skoleni-detail.html?k=<slug>).
   Šablona je stejná jako detail Second Hand produktu (.pd) — místo skladovosti
   se stejným způsobem ukazuje OBSAZENOST, pod fotkou je detailní popis kurzu. */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* strukturovaný text: "odstavec" | {h, p:[]} | {h, ul:[]} */
  function prose(body) {
    return (body || []).map(function (b) {
      if (typeof b === "string") return "<p>" + esc(b) + "</p>";
      var out = b.h ? "<h3>" + esc(b.h) + "</h3>" : "";
      if (b.p) out += b.p.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
      if (b.ul) out += "<ul>" + b.ul.map(function (li) { return "<li>" + esc(li) + "</li>"; }).join("") + "</ul>";
      return out;
    }).join("");
  }

  function build(root) {
    var all = window.PM_ACADEMY || [];
    var q = new URLSearchParams(location.search);
    var slug = q.get("k");
    var c = all.filter(function (x) { return x.slug === slug; })[0] || all[0];
    if (!c) { root.innerHTML = '<p class="mono">Školení nenalezeno.</p>'; return; }

    var k = window.PM_ACADEMY_CAP(c);
    var free = k.free;
    document.title = "PRO MUSIC Academy — " + c.n;
    var crumb = document.querySelector(".cd-crumb");
    if (crumb) crumb.textContent = c.n;

    root.innerHTML =
      '<div class="pd">' +
        '<div class="pd-gal">' +
          '<div class="pd-shot pd-shot-cover">' +
            '<div class="pd-flags"><span class="pd-flag is-accent">' + esc(c.dateLabel) + '</span><span class="pd-flag">' + esc(c.cat) + "</span></div>" +
            (c.img ? '<img src="' + esc(c.img) + '" alt="' + esc(c.n) + '" />' : "") +
          "</div>" +
          '<div class="pd-prose">' + prose(c.body) + "</div>" +
        "</div>" +
        '<div class="pd-info">' +
          '<span class="pd-eyebrow">' + esc(c.dateLabel) + " · " + esc(c.dni) + "</span>" +
          "<h1>" + esc(c.n) + "</h1>" +
          (c.perex ? '<p class="pd-perex">' + esc(c.perex) + "</p>" : "") +
          '<div class="pd-price">' + esc(c.cena) + "<small>" + esc(c.cenaNote || "") + "</small></div>" +
          '<div class="pd-stock is-' + k.s + '" role="status"><ui-icon name="ui-users" aria-hidden="true"></ui-icon>' +
            '<span class="pd-stock-t">' + esc(k.t) + "</span></div>" +
          '<div class="cap-bar" aria-hidden="true"><i style="width:' + Math.round(((c.taken || 0) / (c.places || 1)) * 100) + '%"></i></div>' +
          '<p class="cap-note mono">Obsazenost ' + (c.taken || 0) + " / " + (c.places || 0) + " míst</p>" +
          '<div class="pd-buy">' +
            '<div class="qty" role="group" aria-label="Počet účastníků">' +
              '<button class="qty-b" data-s="-1" aria-label="Ubrat účastníka">–</button>' +
              '<input class="qty-i mono" type="text" inputmode="numeric" value="1" aria-label="Počet účastníků" />' +
              '<button class="qty-b" data-s="1" aria-label="Přidat účastníka">+</button>' +
            "</div>" +
            '<a class="btn btn-primary btn-md pd-cart" href="prihlaska-skoleni.html?k=' + esc(c.slug) + '">' +
              '<ui-icon class="btn-ico" name="contact-form" aria-hidden="true"></ui-icon>' +
              (k.s === "full" ? "Zapsat jako náhradníka" : "Přihlásit se na školení") + "</a>" +
          "</div>" +
          '<div class="cta-actions pd-cta">' +
            '<ui-button variant="ghost" size="md" href="mailto:academy@promusic.cz?subject=' + encodeURIComponent(c.n) + '">Zeptat se na kurz</ui-button>' +
          "</div>" +
          '<dl class="pd-facts">' +
            "<dt>Termín</dt><dd>" + esc(c.dateLabel) + "</dd>" +
            "<dt>Rozsah</dt><dd>" + esc(c.dni) + "</dd>" +
            "<dt>Místo</dt><dd>" + esc(c.misto) + "</dd>" +
            "<dt>Lektor</dt><dd>" + esc(c.lektor) + "</dd>" +
            (c.facts || []).map(function (f) { return "<dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd>"; }).join("") +
          "</dl>" +
          ((c.specs || []).length ? '<div class="pd-specs"><h3>Program</h3><dl>' + c.specs.map(function (s) {
            return "<dt>" + esc(s[0]) + "</dt><dd>" + esc(s[1]) + "</dd>";
          }).join("") + "</dl></div>" : "") +
        "</div>" +
      "</div>";

    var elQty = root.querySelector(".qty-i");
    function clampQty() {
      var v = parseInt(elQty.value, 10);
      if (!(v > 0)) v = 1;
      if (free > 0 && v > free) v = free;
      elQty.value = v;
    }
    root.querySelector(".pd-buy").addEventListener("click", function (e) {
      var b = e.target.closest(".qty-b"); if (!b) return;
      elQty.value = (parseInt(elQty.value, 10) || 1) + parseInt(b.getAttribute("data-s"), 10);
      clampQty();
    });
    elQty.addEventListener("change", clampQty);

    /* další termíny */
    var rel = document.querySelector(".cd-rel");
    if (rel && window.PM_ACADEMY_ROW) {
      rel.innerHTML = all.filter(function (x) { return x.slug !== c.slug; })
        .sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); })
        .slice(0, 3).map(window.PM_ACADEMY_ROW).join("");
    }

    if (window.UIArmGlow) window.UIArmGlow();
    if (window.UILoader && window.UILoader.scanGlow) window.UILoader.scanGlow();
  }

  document.querySelectorAll(".cd-root").forEach(build);
})();
