/* PRO MUSIC — Hero H5 „Mixpult" (channel strip hero).
   Každý projekt = jeden kanál; aktivní (SOLO) se roztáhne na velkou fotku.
   Vkládá se do #app před H1 hero; zobrazuje se jen při html[data-hero="h5"]. */
(function () {
  var app = document.getElementById("app");
  if (!app) return;
  var P = "assets/projekty/";
  var CH = [
    { img: P + "eurovize/nemo-kruh-final.jpg", s: "Eurovision", t: "Eurovision Song Contest 2024", k: "Touring / Rental / produkce", d: "Malmö · ozvučení finálových večerů", chips: [], href: "live-eurovize-2024.html" },
    { img: P + "rammstein/stadion-plameny.jpg", s: "Rammstein", t: "Rammstein — Stadium Tour", k: "Touring / Rental / produkce", d: "34 koncertů v 17 zemích Evropy", chips: ["34 koncertů", "17 zemí"], href: "live-rammstein.html" },
    { img: P + "ed-sheeran/ohnostroj.jpg", s: "Ed Sheeran", t: "Ed Sheeran — Mathematics Tour", k: "Touring / Rental", d: "Stadionový rig Ayrton", chips: ["Ayrton"], href: "live-ed-sheeran.html" },
    { img: P + "steel-arena/projekce-barvy.jpg", s: "Steel Aréna", t: "Steel Aréna Košice", k: "Instalace", d: "Světelný systém Ayrton pro arénu", chips: ["Ayrton"], href: "#" },
    { img: P + "karlin/sal-full.png", s: "HD Karlín", t: "Hudební divadlo Karlín", k: "Instalace", d: "Největší instalace L-ISA v ČR", chips: ["L-ISA", "L-Acoustics"], href: "instalace-hd-karlin-schema.html" },
    { img: P + "djkt-plzen/sal-pohled.jpg", s: "DJKT Plzeň", t: "Nová scéna DJKT Plzeň", k: "Instalace", d: "Světová premiéra L-Acoustics Ambiance", chips: ["Ambiance", "L-Acoustics"], href: "#" },
    { img: "assets/novinky/028.jpg", s: "UFFO", t: "UFFO Trutnov", k: "Instalace", d: "L-ISA Auditorium v Trutnově", chips: ["L-ISA"], href: "novinka.html?a=l-isa-auditorium-v-trutnove-1697" }
  ];
  var N = CH.length;
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  var seg = new Array(13).join("<i></i>");

  var chans = CH.map(function (c, i) {
    return '<div class="mixch' + (i === 0 ? " is-active" : "") + '" data-i="' + i + '">' +
      '<img src="' + c.img + '" alt="" loading="' + (i < 2 ? "eager" : "lazy") + '" />' +
      '<button type="button" class="mixch-hit" aria-pressed="' + (i === 0) + '" aria-label="Kanál ' + pad(i + 1) + ': ' + c.t + '"></button>' +
      '<span class="mixch-no">CH ' + pad(i + 1) + '</span>' +
      '<span class="mixch-v" aria-hidden="true">' + c.t + '</span>' +
      '<span class="meter" aria-hidden="true">' + seg + '</span>' +
      '<span class="mixch-solo"><span class="mixch-tag"><b></b>SOLO</span>CH ' + pad(i + 1) + '</span>' +
      '<div class="mixch-body"' + (i === 0 ? ' aria-live="polite"' : "") + '>' +
        '<span class="mixch-k">' + c.k + '</span>' +
        '<strong class="mixch-t">' + c.t + '</strong>' +
        '<span class="mixch-d">' + c.d + '</span>' +
        (c.chips.length ? '<span class="mixch-chips">' + c.chips.map(function (x) { return "<span>" + x + "</span>"; }).join("") + "</span>" : "") +
        '<a class="btn btn-ghost btn-sm" href="' + c.href + '" tabindex="-1">Zobrazit projekt<ui-icon class="btn-ico" name="ui-arrow-right" aria-hidden="true"></ui-icon></a>' +
      '</div>' +
      '<span class="fader" aria-hidden="true"><b></b></span>' +
    '</div>';
  }).join("");

  var labels = CH.map(function (c, i) {
    return '<span class="mixlab' + (i === 0 ? " is-active" : "") + '" data-i="' + i + '"><span><b>CH' + pad(i + 1) + '</b> ' + c.s + '</span></span>';
  }).join("");

  var sec = document.createElement("section");
  sec.className = "hmix";
  sec.setAttribute("aria-label", "Úvod a vybrané projekty");
  sec.innerHTML =
    '<div class="hmix-in">' +
      '<div class="wrap-wide hmix-head">' +
        '<div><span class="eyebrow">Profesionální audio &amp; light · od 1997</span><h1 class="display">Professional show equipment</h1></div>' +
        '<div class="cta-actions"><ui-button variant="primary" href="kontakt.html">Probrat projekt →</ui-button><ui-button variant="ghost" href="reference.html">Vybrané projekty →</ui-button></div>' +
      '</div>' +
      '<div class="mixdesk">' +
        '<div class="mixrow" role="group" aria-label="Kanály — projekty">' + chans +
          '<div class="mixmst"><span class="mixch-no" aria-hidden="true">MST</span>' +
            '<span class="mixarrs"><button type="button" class="mixarr" data-dir="-1" aria-label="Předchozí kanál"><ui-icon name="ui-chevron-left"></ui-icon></button>' +
            '<button type="button" class="mixarr" data-dir="1" aria-label="Další kanál"><ui-icon name="ui-chevron-right"></ui-icon></button></span>' +
            '<span class="mixmst-m" aria-hidden="true"><span class="meter meter-mst">' + seg + '</span><span class="meter meter-mst">' + seg + '</span></span></div>' +
        '</div>' +
        '<div class="mixstrip">' + labels +
          '<span class="mixctl"><b>SOLO</b> <span id="mixCnt">01</span>/' + pad(N) + '</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  app.insertBefore(sec, app.firstChild);

  var chs = [].slice.call(sec.querySelectorAll(".mixch"));
  var labs = [].slice.call(sec.querySelectorAll(".mixlab"));
  var row = sec.querySelector(".mixrow"), cnt = sec.querySelector("#mixCnt");
  var mst = [].slice.call(sec.querySelectorAll(".meter-mst"));
  var act = 0, prog = 0, paused = false, last = 0, nextTick = 0, lvl = 8;
  var DUR = 6000;
  var RM = window.matchMedia("(prefers-reduced-motion: reduce)");
  var MOB = window.matchMedia("(max-width: 767px)");
  var TAB = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
  function on() { return document.documentElement.getAttribute("data-hero") === "h5"; }

  function lightMeter(m, n) { var s = m.children; for (var k = 0; k < 12; k++) s[k].classList.toggle("on", k < n); }
  function setFader(el, p, anim) { var f = el.querySelector(".fader"); f.style.transition = anim ? "" : "none"; f.style.setProperty("--p", p); }

  function windowTablet() {
    var W = 5, st = TAB.matches ? Math.max(0, Math.min(N - W, act - 2)) : 0;
    chs.forEach(function (c, i) { var out = TAB.matches && (i < st || i >= st + W); c.classList.toggle("is-out", out); labs[i].classList.toggle("is-out", out); });
  }
  function go(i) {
    i = (i + N) % N;
    if (i === act) return;
    var prev = chs[act];
    prev.classList.remove("is-active");
    prev.querySelector(".mixch-hit").setAttribute("aria-pressed", "false");
    prev.querySelector(".mixch-body").removeAttribute("aria-live");
    prev.querySelector(".btn").setAttribute("tabindex", "-1");
    lightMeter(prev.querySelector(".meter"), 0);
    setFader(prev, 0, true);
    labs[act].classList.remove("is-active");
    act = i;
    var c = chs[act];
    c.classList.add("is-active");
    c.querySelector(".mixch-hit").setAttribute("aria-pressed", "true");
    c.querySelector(".mixch-body").setAttribute("aria-live", "polite");
    c.querySelector(".btn").removeAttribute("tabindex");
    labs[act].classList.add("is-active");
    cnt.textContent = pad(act + 1);
    prog = 0; setFader(c, 0, false);
    windowTablet();
    if (RM.matches) staticMeters();
  }
  function staticMeters() {
    chs.forEach(function (c, i) { lightMeter(c.querySelector(".meter"), i === act ? 8 : 0); });
    mst.forEach(function (m) { lightMeter(m, 8); });
  }

  function loop(t) {
    requestAnimationFrame(loop);
    if (!on() || RM.matches) { last = t; return; }
    var dt = last ? Math.min(t - last, 100) : 0; last = t;
    if (t >= nextTick) {
      nextTick = t + 90 + Math.random() * 50;
      var target = 6 + Math.random() * 5;
      lvl += (target - lvl) * 0.55;
      var n = Math.round(lvl);
      lightMeter(chs[act].querySelector(".meter"), n);
      mst[0] && lightMeter(mst[0], Math.max(0, n - 1));
      mst[1] && lightMeter(mst[1], Math.min(12, n + (Math.random() < .5 ? 0 : 1)));
    }
    if (paused || MOB.matches) return;
    prog += dt / DUR;
    if (prog >= 1) { go(act + 1); return; }
    setFader(chs[act], prog, false);
  }

  chs.forEach(function (c, i) {
    c.querySelector(".mixch-hit").addEventListener("click", function () { go(i); });
    /* hover „nakouknutí" kanálu se zrcadlí do scribble stripu, aby popisky seděly pod kanály */
    c.addEventListener("mouseenter", function () { labs[i].classList.add("is-peek"); });
    c.addEventListener("mouseleave", function () { labs[i].classList.remove("is-peek"); });
  });
  labs.forEach(function (l, i) { l.addEventListener("click", function () { go(i); }); });
  [].forEach.call(sec.querySelectorAll(".mixarr"), function (b) { b.addEventListener("click", function () { go(act + +b.getAttribute("data-dir")); }); });
  var desk = sec.querySelector(".mixdesk");
  desk.addEventListener("mouseenter", function () { paused = true; });
  desk.addEventListener("mouseleave", function () { paused = desk.contains(document.activeElement); });
  desk.addEventListener("focusin", function () { paused = true; });
  desk.addEventListener("focusout", function () { setTimeout(function () { paused = desk.contains(document.activeElement) || desk.matches(":hover"); }, 0); });
  desk.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { go(act + 1); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { go(act - 1); e.preventDefault(); }
    else if (/^[1-8]$/.test(e.key) && +e.key <= N) { go(+e.key - 1); e.preventDefault(); }
    else return;
    var h = chs[act].querySelector(".mixch-hit"); if (document.activeElement && document.activeElement.classList.contains("mixch-hit")) h.focus();
  });
  (TAB.addEventListener ? TAB.addEventListener("change", windowTablet) : TAB.addListener(windowTablet));
  chs[0].querySelector(".btn").removeAttribute("tabindex");
  windowTablet();
  if (RM.matches) staticMeters();
  requestAnimationFrame(loop);
})();
