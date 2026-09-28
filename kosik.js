/* PRO MUSIC — KOŠÍK (kosik.html?krok=1|2|3)
   1 Nákupní košík (položky, země, doprava, platba) · 2 Kontaktní údaje · 3 Kontrola údajů.
   Položky bere z UICart (ui-components.js), rozpracované údaje drží v localStorage `pm-checkout`.
   Odeslání objednávky je zatím fingované (bez backendu). */
(function () {
  "use strict";
  var U = window.UICart, root = document.querySelector(".ck-root");
  if (!U || !root) return;

  var SHIP = [
    { id: "dpd", n: "DPD", ic: "shop-delivery", p: 194 },
    { id: "osobni", n: "Osobní odběr", ic: "ui-location", p: 0 }
  ];
  var PAY = [
    { id: "dobirka", n: "Dobírka", ic: "shop-package", p: 54.5, only: "dpd", hint: "Jen s dopravou DPD" },
    { id: "proforma", n: "Platba předem (proforma)", ic: "shop-payment", p: 0 },
    { id: "hotove", n: "Hotově", ic: "shop-cash", p: 0, only: "osobni", hint: "Jen s osobním odběrem" }
  ];
  var COUNTRY = [["CZ", "Česko"], ["SK", "Slovensko"]];
  var STEPS = ["Nákupní košík", "Kontaktní údaje", "Kontrola údajů"];
  var KEY = "pm-checkout";

  var st = { country: "CZ", ship: null, pay: null, acct: "new", mkAcct: false, firm: false, heureka: false, news: false, f: {} };
  try { var s0 = JSON.parse(localStorage.getItem(KEY)); if (s0) for (var k in s0) st[k] = s0[k]; } catch (e) {}
  var finished = false;
  /* hesla se do localStorage neukládají */
  function save() {
    var c = JSON.parse(JSON.stringify(st));
    Object.keys(c.f).forEach(function (k) { if (/heslo/.test(k)) delete c.f[k]; });
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
  }

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function kc(n) { return (Math.round(n * 100) / 100).toLocaleString("cs-CZ", { maximumFractionDigits: 2 }).replace(/\s/g, "\u00a0") + "\u00a0Kč"; }
  function byId(a, id) { return a.filter(function (x) { return x.id === id; })[0] || null; }
  function ship() { return byId(SHIP, st.ship); }
  function pay() { return byId(PAY, st.pay); }
  function fees() { return (ship() ? ship().p : 0) + (pay() ? pay().p : 0); }
  function total() { return U.sum() + fees(); }
  function cname(c) { var r = COUNTRY.filter(function (x) { return x[0] === c; })[0]; return r ? r[1] : c; }

  var step = parseInt(new URLSearchParams(location.search).get("krok"), 10) || 1;

  /* ---------- pole formuláře ---------- */
  var FIELDS = [
    ["jmeno", "Jméno", "text", "given-name", 1],
    ["prijmeni", "Příjmení", "text", "family-name", 1],
    ["email", "E-mail", "email", "email", 1],
    ["tel", "Telefon", "tel", "tel", 1],
    ["ulice", "Ulice, čp.", "text", "street-address", 1],
    ["psc", "PSČ", "text", "postal-code", 1],
    ["mesto", "Město", "text", "address-level2", 1]
  ];
  var FIRM = [["firma", "Firma", "text", "organization", 1], ["ico", "IČO", "text", "", 1], ["dic", "DIČ", "text", "", 0]];
  var CHECK = {
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : v ? "Zadejte platný e-mail." : "Vyplňte e-mail."; },
    tel: function (v) { return v.replace(/\D/g, "").length >= 9 ? "" : v ? "Zadejte platné telefonní číslo." : "Vyplňte telefon."; },
    psc: function (v) { return /^\d{3}\s?\d{2}$/.test(v) ? "" : v ? "PSČ má 5 číslic." : "Vyplňte PSČ."; },
    heslo2: function (v) { return v === (st.f.heslo || "") ? "" : "Hesla se neshodují."; }
  };
  function field(f, cls) {
    var v = st.f[f[0]] || "";
    return '<div class="ui-field' + (cls ? " " + cls : "") + '"><label class="ui-label" for="ck-' + f[0] + '">' + f[1] + (f[4] ? ' <span class="ui-req">*</span>' : "") + "</label>" +
      '<input class="ui-control" id="ck-' + f[0] + '" data-f="' + f[0] + '" type="' + f[2] + '"' + (f[3] ? ' autocomplete="' + f[3] + '"' : "") + (f[4] ? ' data-req="1"' : "") + ' value="' + esc(v) + '" />' +
      '<span class="ui-err" id="ck-' + f[0] + '-e"></span></div>';
  }
  function validate(scope) {
    var first = null;
    scope.querySelectorAll("[data-f]").forEach(function (el) {
      var v = el.value.trim(), id = el.getAttribute("data-f"), msg = "";
      if (el.hasAttribute("data-req") && !v) msg = "Vyplňte pole.";
      if (!msg && CHECK[id] && (v || el.hasAttribute("data-req"))) msg = CHECK[id](v);
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      var e = document.getElementById("ck-" + id + "-e"); if (e) e.textContent = msg;
      if (msg && !first) first = el;
    });
    return first;
  }

  /* ---------- stavební bloky ---------- */
  function stepper() {
    return '<ol class="ck-steps" aria-label="Kroky objednávky">' + STEPS.map(function (t, i) {
      var n = i + 1, cls = n < step ? "is-done" : n === step ? "is-cur" : "";
      var inner = '<span class="ck-step-n">' + n + '</span><span class="ck-step-t">' + t + "</span>";
      return '<li class="ck-step ' + cls + '"' + (n === step ? ' aria-current="step"' : "") + ">" +
        (n < step ? '<a href="?krok=' + n + '" data-go="' + n + '">' + inner + "</a>" : "<span>" + inner + "</span>") + "</li>";
    }).join("") + "</ol>";
  }

  function table(edit) {
    var a = U.get();
    return '<div class="ck-table" role="table" aria-label="Položky košíku">' +
      '<div class="ck-tr ck-th" role="row"><span role="columnheader">Název</span><span role="columnheader">Dostupnost</span><span role="columnheader">Množství</span><span role="columnheader">Cena s DPH (m. j.)</span><span role="columnheader">Cena celkem s DPH</span><span aria-hidden="true"></span></div>' +
      a.map(function (x) {
        var inStock = x.s == null || x.s > 0;
        return '<div class="ck-tr" role="row" data-id="' + esc(x.id) + '">' +
          '<span class="ck-prod" role="cell"><a class="ck-img" href="' + esc(x.href || "#") + '">' + (x.img ? '<img src="' + esc(x.img) + '" alt="" />' : "") + "</a>" +
            '<a class="ck-name" href="' + esc(x.href || "#") + '">' + esc(x.n) + "</a></span>" +
          '<span class="ck-stock' + (inStock ? "" : " is-off") + '" role="cell"><span class="ck-lbl">Dostupnost</span>' + (inStock ? "Skladem" : "Na dotaz") + "</span>" +
          '<span class="ck-q" role="cell"><span class="ck-lbl">Množství</span>' + (edit ?
            '<span class="qty" role="group" aria-label="Počet kusů"><button type="button" class="qty-b" data-s="-1" aria-label="Ubrat kus">–</button>' +
            '<input class="qty-i mono" type="text" inputmode="numeric" value="' + x.q + '" aria-label="Počet kusů" />' +
            '<button type="button" class="qty-b" data-s="1" aria-label="Přidat kus">+</button></span>' : x.q + " ks") + "</span>" +
          '<span class="ck-unit" role="cell"><span class="ck-lbl">Cena s DPH (m. j.)</span>' + kc(x.p) + "</span>" +
          '<span class="ck-sum" role="cell"><span class="ck-lbl">Celkem s DPH</span>' + kc(x.p * x.q) + "</span>" +
          '<span class="ck-del-c" role="cell">' + (edit ? '<button type="button" class="hcart-del" data-cart-del="' + esc(x.id) + '" aria-label="Odebrat ' + esc(x.n) + '"><ui-icon name="ui-trash" aria-hidden="true"></ui-icon></button>' : "") + "</span>" +
        "</div>";
      }).join("") + "</div>";
  }

  function opt(name, o, sel, off) {
    return '<label class="ck-opt' + (off ? " is-off" : "") + '">' +
      '<input class="ui-radio" type="radio" name="' + name + '" value="' + o.id + '"' + (sel ? " checked" : "") + (off ? " disabled" : "") + " />" +
      '<ui-icon class="ck-opt-ic" name="' + o.ic + '" aria-hidden="true"></ui-icon>' +
      '<span class="ck-opt-n">' + esc(o.n) + (off && o.hint ? "<small>" + o.hint + "</small>" : "") + "</span>" +
      '<span class="ck-opt-p">' + kc(o.p) + "</span></label>";
  }

  function bar(o) {
    return '<div class="ck-bar">' +
      '<a class="btn btn-ghost ck-back" href="' + o.back + '"' + (o.backStep ? ' data-go="' + o.backStep + '"' : "") + '><ui-icon class="btn-ico" name="ui-chevron-left" aria-hidden="true"></ui-icon>Zpět</a>' +
      '<div class="ck-bar-mid">' + o.mid + "</div>" +
      '<button type="button" class="btn btn-primary ck-next">' + o.next + '<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></button>' +
      "</div>";
  }
  function barSums() {
    return '<span class="ck-bar-sum">Poštovné a balné:<b>' + kc(fees()) + '</b></span><span class="ck-bar-sum">Konečná cena s DPH:<strong>' + kc(total()) + "</strong></span>";
  }

  function totals(withNet) {
    var s = ship(), p = pay();
    return '<div class="ck-tot">' +
      '<div class="ck-tot-r"><span><span class="ck-lbl-i">Doprava:</span>' + (s ? esc(s.n) : "—") + "</span><b>" + kc(s ? s.p : 0) + "</b></div>" +
      '<div class="ck-tot-r"><span><span class="ck-lbl-i">Platba:</span>' + (p ? esc(p.n) : "—") + "</span><b>" + kc(p ? p.p : 0) + "</b></div>" +
      (withNet ? '<div class="ck-tot-r is-net"><span>Konečná cena bez DPH:</span><b>' + kc(total() / 1.21) + "</b></div>" : "") +
      '<div class="ck-tot-r is-grand"><span>Konečná cena s DPH:</span><strong>' + kc(total()) + "</strong></div>" +
      "</div>";
  }

  /* ---------- kroky ---------- */
  function step1() {
    return '<div class="ck-block">' + table(true) + "</div>" +
      '<div class="ck-block ck-country"><h2 class="ck-h">Země dodání</h2><select class="ui-control" id="ck-country" aria-label="Země dodání">' +
        COUNTRY.map(function (c) { return '<option value="' + c[0] + '"' + (c[0] === st.country ? " selected" : "") + ">" + c[1] + "</option>"; }).join("") + "</select></div>" +
      '<div class="ck-block ck-grid2">' +
        '<fieldset class="ck-group"><legend class="ck-h">Způsob dopravy</legend><div class="ck-opts">' +
          SHIP.map(function (o) { return opt("ship", o, st.ship === o.id, false); }).join("") + '</div><span class="ui-err" id="ck-ship-e"></span></fieldset>' +
        '<fieldset class="ck-group"><legend class="ck-h">Způsob platby</legend><div class="ck-opts">' +
          PAY.map(function (o) { return opt("pay", o, st.pay === o.id, o.only && st.ship && st.ship !== o.only); }).join("") + '</div><span class="ui-err" id="ck-pay-e"></span></fieldset>' +
      "</div>" +
      bar({ back: "second-hand.html", mid: barSums(), next: "Pokračovat ke kontaktním údajům" });
  }

  function step2() {
    var a = U.get();
    return '<div class="ck-2col"><div class="ck-main">' +
      '<section class="ck-block"><h2 class="ck-h">Přihlášení a registrace</h2>' +
        '<div class="ck-acct">' +
          '<div class="ck-abox"><label class="ck-acard"><input class="ui-radio" type="radio" name="acct" value="new"' + (st.acct === "new" ? " checked" : "") + ' /><ui-icon class="ck-acard-ic" name="contact-person" aria-hidden="true"></ui-icon><span><strong>Jsem nový zákazník</strong></span></label>' +
            (st.acct === "new" ? '<div class="ck-panel">' +
              '<label class="ui-check"><input class="ui-cbox" type="checkbox" id="ck-mkacct"' + (st.mkAcct ? " checked" : "") + ' /><span class="ctext">Vytvořit nový účet</span></label>' +
              (st.mkAcct ? field(["heslo", "Heslo", "password", "new-password", 1]) + field(["heslo2", "Potvrzení hesla", "password", "new-password", 1]) : "") +
            "</div>" : "") + "</div>" +
          '<div class="ck-abox"><label class="ck-acard"><input class="ui-radio" type="radio" name="acct" value="login"' + (st.acct === "login" ? " checked" : "") + ' /><ui-icon class="ck-acard-ic" name="shop-account" aria-hidden="true"></ui-icon><span><strong>Mám zde svůj účet</strong><small>Chci se přihlásit ke svému účtu</small></span></label>' +
            (st.acct === "login" ? '<div class="ck-panel">' +
              field(["login_email", "E-mail", "email", "username", 0]) + field(["login_heslo", "Heslo", "password", "current-password", 0]) +
              '<div><button type="button" class="btn btn-ghost btn-sm" id="ck-login">Přihlásit se</button></div>' +
            "</div>" : "") + "</div>" +
        "</div>" +
      "</section>" +
      '<section class="ck-block"><h2 class="ck-h">Fakturační údaje</h2>' +
        '<label class="ui-check"><input class="ui-cbox" type="checkbox" id="ck-firm"' + (st.firm ? " checked" : "") + ' /><span class="ctext">Nákup na firmu</span></label>' +
        '<div class="fgrid2">' +
          (st.firm ? FIRM.map(function (f, i) { return field(f, i === 0 ? "col-2" : ""); }).join("") : "") +
          FIELDS.map(function (f) { return field(f); }).join("") +
          '<div class="ui-field"><label class="ui-label" for="ck-zeme">Země <span class="ui-req">*</span></label><select class="ui-control" id="ck-zeme">' +
            COUNTRY.map(function (c) { return '<option value="' + c[0] + '"' + (c[0] === st.country ? " selected" : "") + ">" + c[1] + "</option>"; }).join("") + "</select></div>" +
          '<div class="ui-field col-2"><label class="ui-label" for="ck-pozn">Poznámka</label><textarea class="ui-control" id="ck-pozn" data-f="pozn" rows="4">' + esc(st.f.pozn || "") + "</textarea></div>" +
        "</div>" +
        '<div class="ck-checks">' +
          '<label class="ui-check"><input class="ui-cbox" type="checkbox" id="ck-heureka"' + (st.heureka ? " checked" : "") + ' /><span class="ctext">Nesouhlasím se zasláním dotazníku spokojenosti v rámci programu Heureka Ověřeno zákazníky, který pomáhá zlepšovat naše služby</span></label>' +
          '<label class="ui-check"><input class="ui-cbox" type="checkbox" id="ck-news"' + (st.news ? " checked" : "") + ' /><span class="ctext">Mám zájem o zasílání novinek a akcí</span></label>' +
        "</div>" +
      "</section>" +
      "</div>" +
      '<aside class="ck-aside"><div class="sumpanel"><h3>Obsah košíku</h3>' +
        '<div class="ck-mini">' + a.map(function (x) {
          return '<div class="hcart-item"><span class="hcart-img">' + (x.img ? '<img src="' + esc(x.img) + '" alt="" />' : "") + '</span><div class="hcart-meta"><a href="' + esc(x.href || "#") + '">' + esc(x.n) + "</a><span>" + x.q + ' ks</span></div><div class="hcart-side"><span class="hcart-price">' + kc(x.p * x.q) + "</span></div></div>";
        }).join("") + "</div>" + totals(false) + "</div></aside>" +
      "</div>" +
      bar({ back: "?krok=1", backStep: 1, mid: barSums(), next: "Pokračovat ke kontrole údajů" });
  }

  function step3() {
    var f = st.f, rows = [];
    if (st.firm) { rows.push(["Firma", f.firma], ["IČO", f.ico]); if (f.dic) rows.push(["DIČ", f.dic]); }
    rows.push(["Jméno", (f.jmeno || "") + " " + (f.prijmeni || "")], ["Ulice, čp.", f.ulice], ["PSČ, Město", (f.psc || "") + ", " + (f.mesto || "")], ["Země", cname(st.country)], ["E-mail", f.email], ["Telefon", f.tel]);
    return '<div class="ck-block ck-review">' +
        '<div><h2 class="ck-h">Kontaktní údaje</h2><dl class="ck-dl">' + rows.map(function (r) { return "<dt>" + r[0] + ":</dt><dd>" + esc(r[1]) + "</dd>"; }).join("") + "</dl>" +
          '<a class="ck-edit" href="?krok=2" data-go="2">Upravit údaje</a></div>' +
        '<div><h2 class="ck-h">Poznámka</h2><p class="ck-note">' + (f.pozn ? esc(f.pozn) : "—") + "</p></div>" +
      "</div>" +
      '<div class="ck-block">' + table(false) + totals(true) + "</div>" +
      bar({ back: "?krok=2", backStep: 2, next: "Koupit",
        mid: '<label class="ui-check ck-terms"><input class="ui-cbox" type="checkbox" id="ck-terms" /><span class="ctext">Souhlasím s <a href="#">obchodními podmínkami</a> a beru na vědomí <a href="#">zpracování osobních údajů</a>. Odesláním objednávky se zavazuji k její úhradě.</span></label><span class="ui-err" id="ck-terms-e"></span>' });
  }

  function empty() {
    return '<div class="ck-empty"><ui-icon name="shop-cart" aria-hidden="true"></ui-icon><h2>Košík je prázdný</h2><p>Vyberte si z nabídky Second Hand — techniku z našeho skladu a rentalu.</p>' +
      '<a class="btn btn-primary" href="second-hand.html">Second Hand<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></a></div>';
  }

  function done(mail) {
    root.innerHTML = '<div class="fsuccess ck-done" role="status"><ui-icon class="sico" name="academy-completed" aria-hidden="true"></ui-icon>' +
      "<h2>Děkujeme, objednávka je odeslaná</h2><p>Potvrzení jsme poslali na <strong>" + esc(mail) + "</strong>. Ozveme se vám s dalším postupem.</p>" +
      '<div class="cta-actions"><a class="btn btn-ghost" href="second-hand.html">Zpět do Second Hand</a></div></div>';
    window.scrollTo(0, 0);
  }

  /* ---------- render + chování ---------- */
  function go(n) {
    step = n;
    history.replaceState(null, "", "?krok=" + n);
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function render() {
    if (!U.get().length) { root.innerHTML = stepper() + empty(); arm(); return; }
    if (step > 1 && !(ship() && pay())) step = 1;
    root.innerHTML = stepper() + '<div class="ck-body">' + (step === 1 ? step1() : step === 2 ? step2() : step3()) + "</div>";
    arm();
  }
  function arm() {
    if (window.UIArmGlow) window.UIArmGlow();
    if (window.UILoader && window.UILoader.scanGlow) window.UILoader.scanGlow();
  }
  function refreshSums() {
    root.querySelectorAll(".ck-bar-mid").forEach(function (m) { if (step < 3) m.innerHTML = barSums(); });
    var t = root.querySelector(".ck-tot"); if (t) t.outerHTML = totals(step === 3);
  }

  root.addEventListener("click", function (e) {
    var g = e.target.closest("[data-go]");
    if (g) { e.preventDefault(); go(parseInt(g.getAttribute("data-go"), 10)); return; }
    var qb = e.target.closest(".qty-b");
    if (qb) {
      var row = qb.closest("[data-id]"), inp = row.querySelector(".qty-i");
      setQty(row.getAttribute("data-id"), (parseInt(inp.value, 10) || 1) + parseInt(qb.getAttribute("data-s"), 10));
      return;
    }
    if (e.target.closest("#ck-login")) {
      var em = root.querySelector("#ck-login_email");
      if (em && em.value.trim()) { st.f.email = em.value.trim(); save(); }
      return;
    }
    if (e.target.closest(".ck-next")) next();
  });
  root.addEventListener("change", function (e) {
    var t = e.target;
    if (t.classList.contains("qty-i")) { setQty(t.closest("[data-id]").getAttribute("data-id"), parseInt(t.value, 10) || 1); return; }
    if (t.name === "ship") {
      st.ship = t.value;
      var p = pay(); if (p && p.only && p.only !== st.ship) st.pay = null;
      save(); render(); return;
    }
    if (t.name === "pay") { st.pay = t.value; save(); refreshSums(); var pe = root.querySelector("#ck-pay-e"); if (pe) pe.textContent = ""; return; }
    if (t.name === "acct") { st.acct = t.value; save(); render(); return; }
    if (t.id === "ck-country" || t.id === "ck-zeme") { st.country = t.value; save(); return; }
    if (t.id === "ck-mkacct") { st.mkAcct = t.checked; save(); render(); return; }
    if (t.id === "ck-firm") { st.firm = t.checked; save(); render(); return; }
    if (t.id === "ck-heureka") { st.heureka = t.checked; save(); return; }
    if (t.id === "ck-news") { st.news = t.checked; save(); return; }
    if (t.id === "ck-terms") { var te = root.querySelector("#ck-terms-e"); if (te && t.checked) te.textContent = ""; }
  });
  root.addEventListener("input", function (e) {
    var t = e.target, id = t.getAttribute("data-f"); if (!id) return;
    st.f[id] = t.value; save();
    if (t.getAttribute("aria-invalid") === "true") validate(t.closest(".ui-field"));
  });

  function setQty(id, q) {
    var it = U.get().filter(function (x) { return x.id === id; })[0]; if (!it) return;
    if (q < 1) q = 1;
    if (it.s > 0 && q > it.s) q = it.s;
    U.set(id, q);
  }
  window.addEventListener("pm-cart-change", function () {
    if (finished) return;
    if (!U.get().length || step !== 1) { render(); return; }
    var a = U.get();
    root.querySelectorAll(".ck-table [data-id]").forEach(function (row) {
      var it = a.filter(function (x) { return x.id === row.getAttribute("data-id"); })[0];
      if (!it) { row.remove(); return; }
      row.querySelector(".qty-i").value = it.q;
      row.querySelector(".ck-sum").innerHTML = '<span class="ck-lbl">Celkem s DPH</span>' + kc(it.p * it.q);
    });
    refreshSums();
  });

  function next() {
    if (step === 1) {
      var se = root.querySelector("#ck-ship-e"), pe = root.querySelector("#ck-pay-e");
      se.textContent = ship() ? "" : "Vyberte způsob dopravy.";
      pe.textContent = pay() ? "" : "Vyberte způsob platby.";
      if (ship() && pay()) go(2);
      return;
    }
    if (step === 2) {
      var bad = validate(root.querySelector(".ck-main"));
      if (bad) { bad.focus(); return; }
      go(3); return;
    }
    var terms = root.querySelector("#ck-terms");
    if (!terms.checked) { root.querySelector("#ck-terms-e").textContent = "Pro odeslání objednávky je potřeba souhlas s podmínkami."; terms.focus(); return; }
    var btn = root.querySelector(".ck-next"); btn.disabled = true; btn.firstChild.textContent = "Odesílám…";
    var mail = st.f.email || "";
    setTimeout(function () {
      finished = true;
      U.clear();
      try { localStorage.removeItem(KEY); } catch (e) {}
      done(mail);
    }, 700);
  }

  if (step === 3) {
    var need = FIELDS.some(function (f) { return f[4] && !(st.f[f[0]] || "").trim(); });
    if (need) step = 2;
  }
  render();
})();
