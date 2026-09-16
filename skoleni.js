/* PRO MUSIC Academy — přihláška na školení.
   Data kurzů + logika: výběr karet, návaznosti (předpoklady), souhrn, validace, odeslání. */
(function () {
  var DESC = "Popis kurzu – doplní klient";

  var GROUPS = [
    { id: "base", legend: "Základ", desc: "Vstupní bod celé řady. Bez něj nemá smysl pokračovat dál.", wide: true,
      items: [{ v: "la_syswork", n: "System & Workflow", badge: "Povinné pro ostatní školení" }] },
    { id: "se", legend: "System Engineer", role: "System engineer", desc: "Návrh systému, simulace a jeho nastavení do prostoru.",
      items: [
        { v: "la_se_soundvision", n: "Soundvision" },
        { v: "la_se_drivesystem", n: "Drive System" },
        { v: "la_se_p1m1", n: "M1 - P1 Measurement & Tuning" }
      ] },
    { id: "st", legend: "System Technician", role: "System technician", desc: "Praktická implementace konkrétních reproduktorových systémů.",
      items: [
        { v: "la_st_lsi", n: "Loudspeaker System Implementation" },
        { v: "la_st_kiva", n: "Kiva II System" },
        { v: "la_st_kara", n: "Kara II System" },
        { v: "la_st_k3", n: "K3 System" },
        { v: "la_st_k2", n: "K2 System" },
        { v: "la_st_k1", n: "K1 System" },
        { v: "la_st_l2", n: "L2 System" }
      ] },
    { id: "is", legend: "Immersive (L-ISA)", desc: "Objektový zvuk — technologie, systém i mix.",
      items: [
        { v: "la_is_lisatech", n: "L-ISA Technology", role: "Immersive system/mixing engineer", badge: "Povinné pro další L-ISA školení" },
        { v: "la_is_lisasys", n: "L-ISA Loudspeaker System", role: "Immersive system engineer" },
        { v: "la_is_lisamix", n: "L-ISA Live Mixing", role: "Immersive mixing engineer" },
        { v: "la_is_lisapre", n: "L-ISA Preproduction", role: "Immersive mixing engineer" }
      ] },
    { id: "adv", legend: "System Expert", role: "System expert", desc: "Nadstavba pro ty, kdo systém ladí do detailu.",
      items: [
        { v: "la_adv_vcls", n: "Variable Curvature Line Source" },
        { v: "la_adv_lsc", n: "Loudspeaker System Calibration" }
      ] }
  ];

  var NAMES = {};
  var GROUP_OF = {};
  GROUPS.forEach(function (g) { g.items.forEach(function (it) { NAMES[it.v] = it.n; GROUP_OF[it.v] = g.legend; }); });
  NAMES.smaart = "Smaart Suite v9";
  GROUP_OF.smaart = "Smaart";

  var LISA_DEPS = ["la_is_lisasys", "la_is_lisamix", "la_is_lisapre"];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function card(it, name, wide) {
    return '<label class="selcard' + (wide ? " selcard-wide" : "") + ' outline-glow">' +
      '<input class="ui-cbox js-course" type="checkbox" name="' + name + '" value="' + it.v + '" />' +
      '<span class="selbody">' +
      (it.role ? '<span class="selrole">' + esc(it.role) + "</span>" : "") +
      '<span class="selname">' + esc(it.n) + "</span>" +
      '<span class="seldesc">' + DESC + "</span>" +
      (it.badge ? '<span class="selbadge tag">' + esc(it.badge) + "</span>" : "") +
      '<span class="selauto">Předpoklad — přidáno automaticky</span>' +
      "</span></label>";
  }

  function render() {
    var host = document.getElementById("la-groups");
    if (!host) return;
    host.innerHTML = GROUPS.map(function (g) {
      return '<fieldset class="sgroup" data-g="' + g.id + '">' +
        '<button class="sgroup-h" type="button" aria-expanded="true">' +
        '<legend class="sgroup-lg">' + esc(g.legend) + "</legend>" +
        '<span class="sgroup-c" data-count></span>' +
        '<span class="sgroup-pm" aria-hidden="true">+</span>' +
        "</button>" +
        '<div class="sgroup-body">' +
        '<p class="sgroup-d">' + esc(g.desc) + "</p>" +
        '<div class="selgrid">' + g.items.map(function (it) { return card(it, "pma_lacoustics[]", g.wide); }).join("") + "</div>" +
        "</div></fieldset>";
    }).join("");
  }

  function init() {
    var form = document.getElementById("pma-form");
    if (!form) return;
    render();

    var boxes = function () { return Array.prototype.slice.call(form.querySelectorAll('.js-course')); };
    var byVal = {};
    boxes().forEach(function (b) { byVal[b.value] = b; });

    var alertHost = document.getElementById("la-alert");
    var errCourses = document.getElementById("err-courses");

    function selected() { return boxes().filter(function (b) { return b.checked; }).map(function (b) { return b.value; }); }

    function showAuto(v, msg) {
      var b = byVal[v];
      if (!b || b.checked) return false;
      b.checked = true;
      b.closest(".selcard").classList.add("is-auto");
      alertHost.innerHTML = '<div class="pm-alert pm-alert-info" role="status"><ui-icon class="ic" name="service-issue" aria-hidden="true"></ui-icon><span>' + msg + "</span></div>";
      return true;
    }

    function prereqs(changed) {
      var sel = selected();
      var needsBase = sel.some(function (v) { return /^la_(se|st|is|adv)_/.test(v); });
      if (needsBase) showAuto("la_syswork", "Přidali jsme <strong>System &amp; Workflow</strong> – je povinným předpokladem pro ostatní školení. Pokud ho již máte absolvované, můžete ho odznačit.");
      if (sel.some(function (v) { return LISA_DEPS.indexOf(v) > -1; }))
        showAuto("la_is_lisatech", "Přidali jsme <strong>L-ISA Technology</strong> – je povinným předpokladem pro další L-ISA školení. Pokud ho již máte absolvované, můžete ho odznačit.");
      if (changed && !changed.checked) changed.closest(".selcard").classList.remove("is-auto");
    }

    function counts() {
      form.querySelectorAll(".sgroup").forEach(function (g) {
        var n = g.querySelectorAll("input:checked").length;
        g.querySelector("[data-count]").textContent = n ? n + " vybráno" : "";
        g.classList.toggle("has-sel", n > 0);
      });
    }

    function summary() {
      var sel = selected();
      var listEl = document.getElementById("sum-list");
      var cntEl = document.querySelectorAll("[data-sumcount]");
      var bar = document.getElementById("pma-mobar");
      cntEl.forEach(function (e) { e.textContent = sel.length ? "Vybráno " + sel.length + " " + plural(sel.length) : "Vybráno 0 školení"; });
      if (!sel.length) {
        listEl.innerHTML = '<div class="sum-empty"><ui-icon name="academy-course" aria-hidden="true"></ui-icon><p>Zatím jste nevybrali žádné školení.</p></div>';
      } else {
        var groups = {};
        sel.forEach(function (v) { (groups[GROUP_OF[v]] = groups[GROUP_OF[v]] || []).push(v); });
        listEl.innerHTML = Object.keys(groups).map(function (k) {
          return '<div class="sum-group"><span class="sum-gl">' + esc(k) + "</span>" + groups[k].map(function (v) {
            return '<div class="sum-item"><span>' + esc(NAMES[v]) + '</span><button class="sum-x" type="button" data-rm="' + v + '" aria-label="Odebrat ' + esc(NAMES[v]) + '">✕</button></div>';
          }).join("") + "</div>";
        }).join("");
      }
      var ml = document.getElementById("mobar-list");
      if (ml) ml.innerHTML = listEl.innerHTML;
      if (bar) bar.classList.toggle("has-sel", sel.length > 0);
      if (sel.length && errCourses) errCourses.textContent = "";
      progress();
    }

    function plural(n) { return n === 1 ? "školení" : "školení"; }

    function progress() {
      var done = 0;
      if (["pma_jmeno", "pma_prijmeni", "pma_email", "pma_telefon"].every(function (n) { return (form.elements[n] || {}).value; })) done++;
      if (selected().length) done++;
      if (form.elements.pma_poznamka.value) done++;
      if (form.elements.pma_souhlas.checked) done++;
      var el = document.getElementById("pma-prog");
      if (el) {
        el.querySelectorAll("span").forEach(function (s, i) { s.classList.toggle("on", i < done); });
        document.getElementById("pma-prog-t").textContent = done + " / 4 hotovo";
      }
    }

    /* ---- validace ---- */
    var MSG = {
      pma_jmeno: "Vyplňte jméno.",
      pma_prijmeni: "Vyplňte příjmení.",
      pma_email: "Zadejte platný e-mail, např. jan@firma.cz.",
      pma_telefon: "Zadejte telefon ve formátu +420 123 456 789."
    };

    function ok(name) {
      var el = form.elements[name];
      var v = (el.value || "").trim();
      if (name === "pma_email") return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v);
      if (name === "pma_telefon") return v.replace(/[^\d]/g, "").length >= 9;
      return v.length > 0;
    }

    function mark(name, bad) {
      var el = form.elements[name];
      el.setAttribute("aria-invalid", bad ? "true" : "false");
      var e = document.getElementById("err-" + name);
      if (e) e.textContent = bad ? MSG[name] : "";
    }

    Object.keys(MSG).forEach(function (name) {
      form.elements[name].addEventListener("blur", function () { mark(name, !ok(name)); });
      form.elements[name].addEventListener("input", progress);
    });

    var ta = form.elements.pma_poznamka;
    ta.addEventListener("input", function () {
      document.getElementById("pma-chars").textContent = ta.value.length + " / 800";
      progress();
    });

    form.elements.pma_souhlas.addEventListener("change", function () {
      document.getElementById("err-souhlas").textContent = this.checked ? "" : "";
      progress();
    });

    form.addEventListener("change", function (e) {
      if (e.target.classList.contains("js-course")) { prereqs(e.target); counts(); summary(); }
    });

    document.addEventListener("click", function (e) {
      var rm = e.target.closest("[data-rm]");
      if (rm) {
        var b = byVal[rm.getAttribute("data-rm")];
        if (b) { b.checked = false; b.closest(".selcard").classList.remove("is-auto"); counts(); summary(); }
      }
      var h = e.target.closest(".sgroup-h");
      if (h) {
        var g = h.closest(".sgroup");
        var closed = g.classList.toggle("closed");
        h.setAttribute("aria-expanded", closed ? "false" : "true");
      }
      var t = e.target.closest("[data-mobar-toggle]");
      if (t) document.getElementById("pma-mobar").classList.toggle("open");
    });

    /* ---- odeslání ---- */
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = [];
      Object.keys(MSG).forEach(function (n) { var b = !ok(n); mark(n, b); if (b) bad.push(n); });
      var noCourse = selected().length === 0;
      errCourses.textContent = noCourse ? "Vyberte alespoň jedno školení." : "";
      var noConsent = !form.elements.pma_souhlas.checked;
      document.getElementById("err-souhlas").textContent = noConsent ? "Pro odeslání přihlášky je nutný souhlas." : "";

      var top = document.getElementById("pma-error");
      if (bad.length || noCourse || noConsent) {
        top.innerHTML = '<div class="pm-alert pm-alert-error" role="alert"><ui-icon class="ic" name="service-issue" aria-hidden="true"></ui-icon><span>Přihlášku se nepodařilo odeslat. Zkontrolujte zvýrazněná pole.</span></div>';
        var first = bad.length ? form.elements[bad[0]] : (noCourse ? document.querySelector("#la-groups input") : form.elements.pma_souhlas);
        if (first) { try { first.focus({ preventScroll: false }); } catch (err) { first.focus(); } }
        return;
      }
      top.innerHTML = "";

      var btns = form.querySelectorAll('[type="submit"], #sum-submit');
      btns.forEach(function (b) { b.classList.add("is-loading"); b.disabled = true; });

      setTimeout(function () {
        var sel = selected();
        document.getElementById("succ-mail").textContent = form.elements.pma_email.value;
        document.getElementById("succ-list").innerHTML = sel.map(function (v) {
          return '<li><ui-icon name="academy-completed" aria-hidden="true"></ui-icon>' + esc(NAMES[v]) + "</li>";
        }).join("");
        document.getElementById("pma-shell").hidden = true;
        document.getElementById("pma-success").hidden = false;
        var bar = document.getElementById("pma-mobar");
        if (bar) bar.classList.remove("has-sel");
        btns.forEach(function (b) { b.classList.remove("is-loading"); b.disabled = false; });
        window.scrollTo({ top: document.getElementById("pma-success").getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
      }, 900);
    });

    document.getElementById("sum-submit").addEventListener("click", function () { form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit", { cancelable: true })); });

    /* mobil: skupiny sbalené */
    if (window.matchMedia("(max-width:819px)").matches)
      form.querySelectorAll(".sgroup").forEach(function (g, i) { if (i) { g.classList.add("closed"); g.querySelector(".sgroup-h").setAttribute("aria-expanded", "false"); } });

    counts();
    summary();
    if (window.PM_BIND_GLOW) window.PM_BIND_GLOW();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
