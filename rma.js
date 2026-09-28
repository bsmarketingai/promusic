/* PRO MUSIC — RMA FORMULÁŘ (rma.html?krok=1..5)
   1 Údaje o odesílateli · 2 Údaje o zboží · 3 Údaje o zásilce · 4 Náhled · 5 Odesláno (RMA číslo).
   Staví na komponentách košíku (.ck-*), rozpracované údaje drží v localStorage `pm-rma`.
   Odeslání je zatím fingované (bez backendu), reCAPTCHA je zástupný prvek. */
(function () {
  "use strict";
  var root = document.querySelector(".rma-root");
  if (!root) return;
  var KEY = "pm-rma";
  var STEPS = ["Údaje o odesílateli", "Údaje o zboží", "Údaje o zásilce", "Náhled", "Odeslat"];
  var SYMPT = ["Trvale", "V závislosti na teplotě", "V závislosti na čase (náhodně)", "Při přítomnosti signálu", "Na konkrétním kanále", "Při konkrétním nastavení", "Jiné…"];
  var SHOWT = ["Venkovní", "Vnitřní", "Pevná instalace", "Koncert", "Divadlo", "Jiné…"];
  var ACC = ["FlightCase", "Dust Cover", "Lampičky", "UPS", "Napájecí kabel(y)", "Jiné…"];
  var CARR = ["Česká pošta", "UPS", "PPL", "TopTrans", "Dachser", "Jiné…"];

  var st = { f: {}, sym: [], showt: [], acc: [], carr: "", gdpr: false, robot: false, done: null };
  try { var s0 = JSON.parse(localStorage.getItem(KEY)); if (s0) for (var k in s0) st[k] = s0[k]; } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function v(id) { return (st.f[id] || "").trim(); }

  var step = parseInt(new URLSearchParams(location.search).get("krok"), 10) || 1;

  /* ---------- pole ---------- */
  var CHECK = {
    email: function (x) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x) ? "" : "Zadejte platný e-mail."; },
    tel: function (x) { return x.replace(/\D/g, "").length >= 9 ? "" : "Zadejte platné telefonní číslo."; },
    psc: function (x) { return /^\d{3}\s?\d{2}$/.test(x) ? "" : "PSČ má 5 číslic."; }
  };
  /* [id, label, type, autocomplete, req, placeholder, hint, cls] */
  function field(f) {
    var id = f[0], val = st.f[id] || "", ctl;
    var attrs = ' id="rma-' + id + '" data-f="' + id + '"' + (f[3] ? ' autocomplete="' + f[3] + '"' : "") + (f[4] ? ' data-req="1"' : "") + (f[5] ? ' placeholder="' + esc(f[5]) + '"' : "") + (f[6] ? ' aria-describedby="rma-' + id + '-h"' : "");
    if (f[2] === "area") ctl = '<textarea class="ui-control"' + attrs + ' rows="5">' + esc(val) + "</textarea>";
    else ctl = '<input class="ui-control" type="' + f[2] + '"' + attrs + ' value="' + esc(val) + '" />';
    return '<div class="ui-field' + (f[7] ? " " + f[7] : "") + '"><label class="ui-label" for="rma-' + id + '">' + f[1] + (f[4] ? ' <span class="ui-req">*</span>' : "") + "</label>" +
      (f[6] ? '<span class="ui-hint" id="rma-' + id + '-h">' + f[6] + "</span>" : "") + ctl + '<span class="ui-err" id="rma-' + id + '-e"></span></div>';
  }
  function validate(scope) {
    var first = null;
    scope.querySelectorAll("[data-f]").forEach(function (el) {
      var x = el.value.trim(), id = el.getAttribute("data-f"), msg = "";
      if (el.hasAttribute("data-req") && !x) msg = "Vyplňte pole.";
      if (!msg && x && CHECK[id]) msg = CHECK[id](x);
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      var e = document.getElementById("rma-" + id + "-e"); if (e) e.textContent = msg;
      if (msg && !first) first = el;
    });
    return first;
  }

  /* skupina voleb: checkboxy (multi) nebo radia; „Jiné…“ odkryje textové pole */
  function group(name, list, sel, multi, other) {
    var on = function (o) { return multi ? sel.indexOf(o) > -1 : sel === o; };
    var otherOn = list.some(function (o) { return o === "Jiné…" && on(o); });
    return '<div class="ck-optgrid">' + list.map(function (o) {
      return '<label class="ck-opt is-sm"><input class="' + (multi ? "ui-cbox" : "ui-radio") + '" type="' + (multi ? "checkbox" : "radio") + '" name="' + name + '" value="' + esc(o) + '"' + (on(o) ? " checked" : "") + ' /><span class="ck-opt-n">' + esc(o) + "</span></label>";
    }).join("") + "</div>" + (other && otherOn ? field([other, "Upřesnění", "text", "", 0, "Popište vlastními slovy"]) : "");
  }

  /* ---------- stavební bloky ---------- */
  function stepper() {
    return '<ol class="ck-steps is-5" aria-label="Kroky RMA formuláře">' + STEPS.map(function (t, i) {
      var n = i + 1, cur = step, cls = n < cur || (cur === 5) ? "is-done" : n === cur ? "is-cur" : "";
      if (cur === 5 && n === 5) cls = "is-cur";
      var inner = '<span class="ck-step-n">' + (cls === "is-done" ? '<ui-icon name="ui-check" aria-hidden="true"></ui-icon>' : n) + '</span><span class="ck-step-t">' + t + "</span>";
      var link = n < cur && cur < 5;
      return '<li class="ck-step ' + cls + '"' + (n === cur ? ' aria-current="step"' : "") + ">" + (link ? '<a href="?krok=' + n + '" data-go="' + n + '">' + inner + "</a>" : "<span>" + inner + "</span>") + "</li>";
    }).join("") + "</ol>";
  }
  function bar(back, backStep, next, mid) {
    return '<div class="ck-bar">' +
      (back ? '<a class="btn btn-ghost ck-back" href="' + back + '"' + (backStep ? ' data-go="' + backStep + '"' : "") + '><ui-icon class="btn-ico" name="ui-chevron-left" aria-hidden="true"></ui-icon>' + (backStep ? STEPS[backStep - 1] : "Zpět") + "</a>" : "<span></span>") +
      '<div class="ck-bar-mid">' + (mid || "") + "</div>" +
      '<button type="button" class="btn btn-primary ck-next">' + next + '<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></button></div>';
  }
  function block(title, body, sub) {
    return '<section class="ck-block"><div class="rma-bh"><h2 class="ck-h">' + title + "</h2>" + (sub ? "<p>" + sub + "</p>" : "") + "</div>" + body + "</section>";
  }
  function aside() {
    return '<aside class="ck-aside"><div class="sumpanel rma-aside">' +
      '<h3>Jak to funguje</h3>' +
      '<ol class="rma-how"><li>Vyplníte formulář a odešlete ho.</li><li>Obratem dostanete <b>RMA číslo</b> a PDF formulář e-mailem.</li><li>Zásilku viditelně označíte RMA číslem a pošlete na servis.</li></ol>' +
      '<div class="rma-addr"><span class="ck-lbl-i">Adresa servisu</span><address>PRO MUSIC, s.r.o.<br />Horská 922<br />541 01 Trutnov<br />Česká republika</address></div>' +
      '<a class="rma-help" href="kontakt.html#servis"><ui-icon name="service-support" aria-hidden="true"></ui-icon>Poradit se se servisem</a>' +
      "</div></aside>";
  }

  /* ---------- kroky ---------- */
  function step1() {
    return '<div class="ck-2col"><div class="ck-main">' +
      block("Kontaktní údaje", '<div class="fgrid2">' +
        field(["kontakt", "Kontaktní osoba", "text", "name", 1, "Jméno a příjmení"]) +
        field(["firma", "Společnost", "text", "organization", 0, "Název společnosti"]) +
        field(["ulice", "Ulice, čp.", "text", "street-address", 1, "Horská 922", "", "col-2"]) +
        field(["psc", "PSČ", "text", "postal-code", 1, "541 01"]) +
        field(["mesto", "Město", "text", "address-level2", 1, "Trutnov"]) +
        field(["tel", "Telefon", "tel", "tel", 1, "+420 123 456 789"]) +
        field(["email", "E-mail", "email", "email", 1, "jmeno@firma.cz"]) + "</div>") +
      block("Souhlas a ověření",
        '<label class="ui-check"><input class="ui-cbox" type="checkbox" id="rma-gdpr"' + (st.gdpr ? " checked" : "") + ' /><span class="ctext">Souhlasím se zpracováním osobních údajů <span class="ui-req">*</span><br />Údaje z formuláře zpracujeme pouze pro vyřízení vašeho požadavku. Více v <a href="#">zásadách ochrany osobních údajů</a>.</span></label>' +
        '<span class="ui-err" id="rma-gdpr-e"></span>' +
        '<label class="rma-captcha"><input class="ui-cbox" type="checkbox" id="rma-robot"' + (st.robot ? " checked" : "") + ' /><span>Nejsem robot</span><small>reCAPTCHA</small></label>' +
        '<span class="ui-err" id="rma-robot-e"></span>') +
      "</div>" + aside() + "</div>" +
      bar("kontakt.html#servis", 0, "Pokračovat na údaje o zboží");
  }

  function step2() {
    return '<div class="ck-2col"><div class="ck-main">' +
      block("Zařízení", '<div class="fgrid2">' +
        field(["nazev", "Název zboží", "text", "", 1, "např. L-Acoustics LA12X"]) +
        field(["sn", "Sériové číslo", "text", "", 1, "S/N ze štítku zařízení"]) + "</div>") +
      block("Závada", field(["popis", "Popis závady", "area", "", 1, "", "Co nejpodrobněji — viditelné/slyšitelné symptomy, chybová hlášení, typ a počet připojených zařízení. Pečlivý popis zrychlí řešení."]) +
        field(["kroky", "Kroky podniknuté k odstranění závady", "area", "", 0, "", "Jak jste se pokoušeli závadu odstranit"]) +
        '<div class="ui-field"><span class="ui-label">Projevy závady</span><span class="ui-hint">Vyberte okolnosti, za kterých se závada projevuje</span>' + group("sym", SYMPT, st.sym, true, "sym_jine") + "</div>") +
      block("Show", field(["show", "Název show", "text", "", 0, "Akce, na které došlo k závadě"]) +
        '<div class="ui-field"><span class="ui-label">Typ show</span>' + group("showt", SHOWT, st.showt, true, "showt_jine") + "</div>" +
        field(["test", "Bylo zařízení otestováno na skladě po návratu ze show?", "area", "", 0, "Výsledek testu, pokud proběhl"]), "Vyplňte, pokud k závadě došlo při akci.") +
      block("Napájení", '<div class="fgrid2">' +
        field(["nap_typ", "Typ napájení", "text", "", 0, "např. powerCON, IEC, agregát"]) +
        field(["nap_u", "Jmenovité napětí", "text", "", 0, "např. 230 V / 50 Hz"]) + "</div>") +
      "</div>" + aside() + "</div>" +
      bar("?krok=1", 1, "Pokračovat na údaje o zásilce");
  }

  function step3() {
    return '<div class="ck-2col"><div class="ck-main">' +
      block("Příslušenství", group("acc", ACC, st.acc, true, "acc_jine"), "Co je součástí balení?") +
      block("Doprava", '<div class="ui-field"><span class="ui-label">Dopravce</span><span class="ui-hint">Přepravní společnost, kterou zásilku posíláte</span>' + group("carr", CARR, st.carr, false, "carr_jine") + "</div>" +
        '<div class="fgrid2">' +
        field(["tracking", "Tracking", "text", "", 0, "Sledovací číslo nebo odkaz", "Pokud je k dispozici"]) +
        field(["datum", "Předpokládané datum doručení", "date", "", 0, "", "Kdy zásilka dorazí na servis"]) + "</div>") +
      block("Poznámka", field(["pozn", "Upřesňující informace k zásilce", "area", "", 0]).replace('class="ui-label"', 'class="ui-label sr-only"')) +
      "</div>" + aside() + "</div>" +
      bar("?krok=2", 2, "Náhled");
  }

  function list(a, other) {
    var out = a.map(function (x) { return x === "Jiné…" ? (v(other) ? v(other) : "Jiné") : x; });
    return out.length ? out.join(", ") : "";
  }
  function dl(rows) {
    rows = rows.filter(function (r) { return r[1]; });
    return rows.length ? '<dl class="ck-dl">' + rows.map(function (r) { return "<dt>" + r[0] + ":</dt><dd>" + esc(r[1]) + "</dd>"; }).join("") + "</dl>" : '<p class="ck-note">—</p>';
  }
  function fmtDate(d) { if (!d) return ""; var x = new Date(d + "T00:00"); return isNaN(x) ? d : x.toLocaleDateString("cs-CZ", { weekday: "short", day: "numeric", month: "numeric", year: "numeric" }); }
  function card(title, body, edit, cls) {
    return '<div class="' + (cls || "") + '"><h2 class="ck-h">' + title + "</h2>" + body + (edit ? '<a class="ck-edit" href="?krok=' + edit + '" data-go="' + edit + '">Upravit</a>' : "") + "</div>";
  }
  function review(edit) {
    var f = st.f;
    return '<div class="ck-review rma-review">' +
      card("Odesílatel", dl([["Kontaktní osoba", f.kontakt], ["Společnost", f.firma], ["Adresa", [v("ulice"), (v("psc") + " " + v("mesto")).trim()].filter(Boolean).join(", ")], ["Telefon", f.tel], ["E-mail", f.email]]), edit && 1) +
      card("Zásilka", dl([["Příslušenství", list(st.acc, "acc_jine")], ["Dopravce", st.carr === "Jiné…" ? v("carr_jine") || "Jiné" : st.carr], ["Tracking", f.tracking], ["Doručení", fmtDate(f.datum)]]), edit && 3) +
      card("Závada", dl([["Popis", f.popis], ["Kroky k odstranění", f.kroky], ["Projevuje se", list(st.sym, "sym_jine")]]), edit && 2, "col-2") +
      card("Show a napájení", dl([["Název show", f.show], ["Typ show", list(st.showt, "showt_jine")], ["Test na skladě", f.test], ["Typ napájení", f.nap_typ], ["Jmenovité napětí", f.nap_u]]), edit && 2) +
      card("Poznámka", '<p class="ck-note">' + (f.pozn ? esc(f.pozn) : "—") + "</p>", edit && 3) +
      "</div>";
  }
  function device() {
    return '<div class="rma-dev"><span class="ck-lbl-i">Zařízení</span><strong>' + esc(v("nazev")) + '</strong><span class="mono">S/N ' + esc(v("sn")) + "</span></div>";
  }

  function step4() {
    return '<div class="rma-check"><ui-icon name="ui-eye" aria-hidden="true"></ui-icon><p>Zkontrolujte prosím zadané údaje před odesláním formuláře.</p></div>' +
      device() + review(true) +
      bar("?krok=3", 3, "Odeslat RMA");
  }

  function step5() {
    var d = st.done || {};
    return '<div class="rma-done">' +
      '<div class="rma-num"><span class="ck-lbl-i">Vaše RMA číslo</span><strong class="mono">' + esc(d.no) + "</strong>" +
        "<p>Děkujeme za vyplnění. Kopii formuláře jsme poslali na <b>" + esc(d.mail) + "</b>.</p></div>" +
      '<div class="rma-next">' +
        '<div class="rma-warn"><ui-icon name="shop-package" aria-hidden="true"></ui-icon><div><h2 class="ck-h">Označte zásilku viditelně číslem RMA</h2>' +
          "<p>Pokud je to možné, vytiskněte PDF formulář z e-mailu a přiložte ho k zásilce.</p>" +
          '<p class="rma-fee">Zásilku bez RMA čísla účtujeme manipulačním poplatkem 500 Kč bez DPH.</p></div></div>' +
        '<div class="rma-addr"><span class="ck-lbl-i">Zásilku zašlete na adresu</span><address>PRO MUSIC, s.r.o.<br />Horská 922<br />541 01 Trutnov<br />Česká republika</address></div>' +
      "</div>" +
      '<h2 class="ck-h rma-rh">Rekapitulace</h2>' + device() + review(false) +
      '<div class="cta-actions"><a class="btn btn-primary" href="rma.html?krok=1" data-new="1">Nový RMA formulář<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></a><a class="btn btn-ghost" href="index.html">Zpět na úvod</a></div>' +
      "</div>";
  }

  /* ---------- render + chování ---------- */
  function go(n) { step = n; history.replaceState(null, "", "?krok=" + n); render(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function render() {
    root.innerHTML = stepper() + '<div class="ck-body">' + [step1, step2, step3, step4, step5][step - 1]() + "</div>";
    if (window.UIArmGlow) window.UIArmGlow();
    if (window.UILoader && window.UILoader.scanGlow) window.UILoader.scanGlow();
  }

  root.addEventListener("click", function (e) {
    var nw = e.target.closest("[data-new]");
    if (nw) { e.preventDefault(); st = { f: {}, sym: [], showt: [], acc: [], carr: "", gdpr: false, robot: false, done: null }; save(); go(1); return; }
    var g = e.target.closest("[data-go]");
    if (g) { e.preventDefault(); go(parseInt(g.getAttribute("data-go"), 10)); return; }
    if (e.target.closest(".ck-next")) next();
  });
  root.addEventListener("change", function (e) {
    var t = e.target;
    if (t.id === "rma-gdpr") { st.gdpr = t.checked; if (t.checked) root.querySelector("#rma-gdpr-e").textContent = ""; save(); return; }
    if (t.id === "rma-robot") { st.robot = t.checked; if (t.checked) root.querySelector("#rma-robot-e").textContent = ""; save(); return; }
    if (t.name === "carr") { st.carr = t.value; save(); render(); return; }
    if (["sym", "showt", "acc"].indexOf(t.name) > -1) {
      var a = st[t.name], i = a.indexOf(t.value);
      if (t.checked && i < 0) a.push(t.value); if (!t.checked && i > -1) a.splice(i, 1);
      save(); if (t.value === "Jiné…") render(); return;
    }
  });
  root.addEventListener("input", function (e) {
    var t = e.target, id = t.getAttribute("data-f"); if (!id) return;
    st.f[id] = t.value; save();
    if (t.getAttribute("aria-invalid") === "true") validate(t.closest(".ui-field"));
  });

  function next() {
    if (step <= 3) {
      var bad = validate(root.querySelector(".ck-main"));
      if (step === 1) {
        var ge = root.querySelector("#rma-gdpr-e"), re = root.querySelector("#rma-robot-e");
        ge.textContent = st.gdpr ? "" : "Pro vyřízení požadavku potřebujeme váš souhlas.";
        re.textContent = st.robot ? "" : "Potvrďte, že nejste robot.";
        if (!bad && !st.gdpr) bad = root.querySelector("#rma-gdpr");
        if (!bad && !st.robot) bad = root.querySelector("#rma-robot");
      }
      if (bad) { bad.focus(); return; }
      go(step + 1); return;
    }
    var btn = root.querySelector(".ck-next"); btn.disabled = true; btn.firstChild.textContent = "Odesílám…";
    setTimeout(function () { st.done = { no: String(600 + Math.floor(Math.random() * 400)), mail: v("email") }; save(); go(5); }, 700);
  }

  /* hlídání přeskočení kroků přes URL */
  function ok1() { return v("kontakt") && v("ulice") && v("psc") && v("mesto") && v("tel") && v("email") && st.gdpr && st.robot; }
  function ok2() { return v("nazev") && v("sn") && v("popis"); }
  if (step === 5 && !st.done) step = 4;
  if (step < 5 && st.done) { st.done = null; save(); }
  if (step > 1 && !ok1()) step = 1;
  else if (step > 2 && !ok2()) step = 2;
  render();
})();
