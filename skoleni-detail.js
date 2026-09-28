/* PRO MUSIC ACADEMY — detail kurzu (skoleni-detail.html?k=<slug>), data: academy-courses.js.
   Šablona detailu Second Hand (.pd): vlevo fotka + popis (cíle, program, vybavení, benefity),
   vpravo název, perex, CTA a podmínky kurzu. Termín se domlouvá na poptávku. */
(function () {
  "use strict";
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function ul(a) { return "<ul>" + a.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>"; }
  function lines(a) { return (a || []).map(esc).join("<br />"); }

  function build(root) {
    var all = window.PM_COURSES || [];
    var slug = new URLSearchParams(location.search).get("k");
    var c = all.filter(function (x) { return x.slug === slug; })[0] || all[0];
    if (!c) { root.innerHTML = '<p class="mono">Kurz nenalezen.</p>'; return; }
    var m = c.mod;
    document.title = "PRO MUSIC Academy — " + c.n;
    var crumb = document.querySelector(".cd-crumb");
    if (crumb) crumb.textContent = c.n;

    var obj = ul(c.obj.map(function (o) {
      return typeof o === "string" ? esc(o) : esc(o.t) + ul(o.sub.map(esc));
    }));
    var agenda = c.agenda.map(function (s) {
      return "<h4>" + esc(s.h) + "</h4>" + ul(s.it.map(function (i) {
        return "<strong>" + esc(i[0]) + "</strong> · " + esc(i[1]) + "<br />" + esc(i[2].split("; ").join(" · "));
      }));
    }).join("");
    var eq = c.eq.map(function (e) { return (c.eq.length > 1 ? "<h4>" + esc(e[0]) + "</h4>" : "") + ul(e[1].map(esc)); }).join("");
    var ben =
      "<p>Po absolvování získáte certifikát" + (c.perk ? ", " + esc(c.perk) : "") +
      " a roční aktivaci nebo prodloužení účtu na online platformě L-Acoustics Education. Členství ve skupině " + esc(c.group) + " vám na platformě otevře:</p>" +
      ul(["vždy aktuální studijní materiály " + esc(c.group) + " v Learning center", "fórum všech certifikovaných absolventů a lektorů kurzu " + esc(c.group)]) +
      (c.avixa ? "<p>Po certifikaci získáte 3,5 AVIXA RU pro obnovení statusu " + esc(c.avixa) + ".</p>" : "");

    root.innerHTML =
      '<div class="pd">' +
        '<div class="pd-gal">' +
          '<div class="pd-shot pd-shot-cover">' +
            '<img src="' + esc(c.img) + '" alt="' + esc(c.n) + '" />' +
          "</div>" +
          '<div class="pd-prose">' +
            "<h3>Cíle kurzu</h3>" + obj +
            "<h3>Program</h3>" + agenda +
            "<h3>Potřebné vybavení</h3>" + eq +
            "<h3>Co získáte</h3>" + ben +
            (c.prod.length ? '<h3>Související produkty</h3><div class="cd-prod">' + c.prod.map(function (p) { return '<span class="chip">' + esc(p) + "</span>"; }).join("") + "</div>" : "") +
          "</div>" +
        "</div>" +
        '<div class="pd-info">' +
          '<span class="pd-eyebrow">Kurz L-Acoustics · ' + esc(m.dur[0].replace("Prezenčně: ", "")) + "</span>" +
          "<h1>" + esc(c.n) + "</h1>" +
          '<div class="cd-profblock"><span class="cd-proflabel">Pro koho je kurz určen</span><div class="cd-profs" aria-label="Pro koho je kurz určen">' + c.prof.map(function (p) { return '<span class="cd-prof">' + esc(p) + "</span>"; }).join("") + "</div></div>" +
          '<p class="pd-perex">' + esc(c.perex) + "</p>" +
          '<div class="pd-stock" role="status"><ui-icon name="academy-schedule" aria-hidden="true"></ui-icon><span class="pd-stock-t">Termín domluvíme na poptávku</span></div>' +
          '<div class="cta-actions pd-cta">' +
            '<ui-button variant="ghost" size="md" href="mailto:academy@promusic.cz?subject=' + encodeURIComponent(c.n) + '">Zeptat se na kurz</ui-button>' +
            '<ui-button variant="primary" size="md" href="prihlaska-skoleni.html?k=' + encodeURIComponent(c.slug) + '">Poptat školení →</ui-button>' +
          "</div>" +
          '<dl class="pd-facts">' +
            "<dt>Předpoklady</dt><dd>" + lines(m.pre) + "</dd>" +
            "<dt>Délka</dt><dd>" + lines(m.dur) + "</dd>" +
            "<dt>Účastníci</dt><dd>" + esc(m.cap) + "</dd>" +
            "<dt>Forma výuky</dt><dd>" + lines(m.fmt) + "</dd>" +
            "<dt>Metody výuky</dt><dd>" + esc(m.meth) + "</dd>" +
            "<dt>Jazyk</dt><dd>Výuka v češtině<br />Materiály v technické angličtině</dd>" +
            "<dt>Lektor</dt><dd>Odborník na živý zvuk, kterého vybírá, školí, certifikuje a pravidelně doškoluje vzdělávací tým L-Acoustics</dd>" +
            "<dt>Certifikace</dt><dd>" + lines(m.cert) + "</dd>" +
          "</dl>" +
        "</div>" +
      "</div>";

    /* další kurzy — nejdřív ze stejného learning profilu */
    var rel = document.querySelector(".cd-rel");
    if (rel && window.PM_COURSE_CARD) {
      var others = all.filter(function (x) { return x.slug !== c.slug; });
      var same = others.filter(function (x) { return x.prof.some(function (p) { return c.prof.indexOf(p) > -1; }); });
      var pick = same.concat(others.filter(function (x) { return same.indexOf(x) < 0; })).slice(0, 4);
      rel.innerHTML = pick.map(window.PM_COURSE_CARD).join("");
    }
    if (window.UIArmGlow) window.UIArmGlow();
    if (window.UILoader && window.UILoader.scanGlow) window.UILoader.scanGlow();
  }

  document.querySelectorAll(".cd-root").forEach(build);
})();
