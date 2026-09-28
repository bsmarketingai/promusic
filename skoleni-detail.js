/* PRO MUSIC ACADEMY — detail kurzu (skoleni-detail.html?k=<slug>), data: academy-courses.js.
   Šablona detailu Second Hand (.pd): vlevo fotka + popis (cíle, program, vybavení, benefity),
   vpravo název, perex, CTA a podmínky kurzu. Termín se domlouvá na poptávku. */
(function () {
  "use strict";
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function ul(a) { return "<ul>" + a.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>"; }
  function lines(a) { return (a || []).map(esc).join("<br />"); }

  /* Poptávka školení v modalu — odeslání je zatím fingované (bez backendu). */
  function row(id, label, ctl, req, top) {
    return '<div class="ui-form-row' + (top ? " is-top" : "") + '"><label class="ui-form-l" for="' + id + '">' + label +
      (req ? '<span class="req" aria-hidden="true">*</span>' : "") + "</label>" + ctl +
      '<span class="ui-form-err" id="' + id + '-e"></span></div>';
  }
  function openInquiry(c) {
    if (!window.UIModal) return;
    var box = window.UIModal.open({
      title: "Poptávka školení",
      body: '<form id="inq-form" class="ui-form" novalidate>' +
        row("inq-course", "Školení", '<input id="inq-course" class="ui-control" type="text" readonly value="' + esc(c.n) + '" />') +
        row("inq-mail", "Váš e-mail", '<input id="inq-mail" name="email" class="ui-control" type="email" autocomplete="email" placeholder="@" required />', 1) +
        row("inq-tel", "Váš telefon", '<input id="inq-tel" name="tel" class="ui-control" type="tel" autocomplete="tel" required />', 1) +
        row("inq-firm", "Firma / fyzická osoba", '<input id="inq-firm" name="firma" class="ui-control" type="text" autocomplete="organization" required />', 1) +
        row("inq-ppl", "Počet osob", '<select id="inq-ppl" name="osob" class="ui-control">' +
          Array.from({ length: 12 }, function (_, i) { var n = i + 1; return '<option value="' + n + '">' + n + (n === 1 ? " osoba" : n < 5 ? " osoby" : " osob") + "</option>"; }).join("") + "</select>", 1) +
        row("inq-note", "Poznámka", '<textarea id="inq-note" name="pozn" class="ui-control" rows="4"></textarea>', 0, 1) +
        "</form>",
      foot: '<span class="ui-hint">* povinné údaje</span>' +
        '<button type="submit" form="inq-form" class="btn btn-primary">Odeslat poptávku</button>'
    });
    var form = box.querySelector("form");
    var checks = [
      ["inq-mail", function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : v ? "Zadejte platný e-mail." : "Vyplňte e-mail."; }],
      ["inq-tel", function (v) { return v.replace(/\D/g, "").length >= 9 ? "" : v ? "Zadejte platné telefonní číslo." : "Vyplňte telefon."; }],
      ["inq-firm", function (v) { return v ? "" : "Vyplňte firmu nebo jméno."; }]
    ];
    function validate(only) {
      var first = null;
      checks.forEach(function (k) {
        if (only && only !== k[0]) return;
        var el = box.querySelector("#" + k[0]), msg = k[1](el.value.trim());
        el.setAttribute("aria-invalid", msg ? "true" : "false");
        box.querySelector("#" + k[0] + "-e").textContent = msg;
        if (msg && !first) first = el;
      });
      return first;
    }
    checks.forEach(function (k) {
      box.querySelector("#" + k[0]).addEventListener("input", function () {
        if (this.getAttribute("aria-invalid") === "true") validate(k[0]);
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = validate();
      if (bad) { bad.focus(); return; }
      var btn = box.querySelector('[type="submit"]');
      btn.disabled = true; btn.textContent = "Odesílám…";
      setTimeout(function () {
        box.querySelector(".ui-modal-body").innerHTML =
          '<div class="ui-form-done" role="status"><span class="ui-form-done-ico"><ui-icon name="ui-check" aria-hidden="true"></ui-icon></span>' +
          "<h3>Poptávka školení byla úspěšně odeslána.</h3>" +
          "<p>Na váš e-mail obdržíte potvrzení, že poptávku evidujeme a budeme vás kontaktovat, jakmile se kurz kapacitně naplní.</p></div>";
        box.querySelector(".ui-modal-foot").innerHTML = '<button type="button" class="btn btn-ghost" data-modal-close>Zavřít</button>';
        if (window.UIArmGlow) window.UIArmGlow();
      }, 700);
    });
  }

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
            '<ui-button variant="primary" size="md" class="cd-inquire">Poptat školení →</ui-button>' +
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
    var inq = root.querySelector(".cd-inquire");
    if (inq) inq.addEventListener("click", function () { openInquiry(c); });
    if (window.UIArmGlow) window.UIArmGlow();
    if (window.UILoader && window.UILoader.scanGlow) window.UILoader.scanGlow();
  }

  document.querySelectorAll(".cd-root").forEach(build);
})();
