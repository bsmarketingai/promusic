/* PRO MUSIC — Karlín interaktivní schéma (data + render + interakce). */
(function () {
  var ICON = {
    mic: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0012 0M12 17v4M8 21h8"/></svg>',
    box: '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="1.5"/><path d="M7 11v2M11 11v2M15 11v2M19 11v2"/></svg>',
    net: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2.5 2.5M16.5 16.5L19 19M19 5l-2.5 2.5M7.5 16.5L5 19"/></svg>',
    console: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M7 9v6M12 9v6M17 9v6M5 12h4M10 10h4M15 13h4"/></svg>',
    proc: '<svg viewBox="0 0 24 24"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 3v18M4 7.5l8 4.5 8-4.5"/></svg>',
    pa: '<svg viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="1.5"/><circle cx="12" cy="9" r="2.4"/><circle cx="12" cy="16" r="1.4"/></svg>',
    people: '<svg viewBox="0 0 24 24"><circle cx="8" cy="9" r="2.6"/><circle cx="16" cy="9" r="2.6"/><path d="M3 19c0-2.8 2.2-5 5-5M21 19c0-2.8-2.2-5-5-5M9.5 19c0-1.8 1.1-3 2.5-3s2.5 1.2 2.5 3"/></svg>'
  };

  // hotspoty: x/y v %, strana karty, volitelně nahoru
  var NODES = [
    { id:"k2l", x:21, y:30, side:"right", waves:1,
      title:"L-Acoustics K2", items:["Hlavní PA systém","2× 12 kabinetů / strana","Max SPL: 143 dB","Frekvenční rozsah: 26 Hz – 20 kHz"], more:"Více o L-Acoustics →" },
    { id:"k2r", x:78, y:30, side:"left", waves:1,
      title:"L-Acoustics K2", items:["Hlavní PA systém","2× 12 kabinetů / strana","Max SPL: 143 dB","Frekvenční rozsah: 26 Hz – 20 kHz"], more:"Více o L-Acoustics →" },
    { id:"lisa", x:57, y:18, side:"right", waves:1,
      title:"L-ISA Immersive System", items:["96 kanálový imerzivní systém","13 L-ISA clusters","360° prostorový zvuk","Technologie od L-Acoustics"], more:"Více o L-ISA →" },
    { id:"ff", x:24, y:46, side:"right", waves:1,
      title:"Front Fill", items:["L-Acoustics Kara II","Diskrétní pokrytí","Minimalizace odrazů"] },
    { id:"sb", x:37, y:55, side:"right", waves:0,
      title:"Stageboxes", items:["Optocore stageboxy","Redundantní propojení","96 kanálů / stagebox"] },
    { id:"racks", x:19, y:62, side:"right", waves:0,
      title:"Systémové racky", items:["Optocore redundantní síť","L-ISA procesory","Napájení & záloha","Monitoring & řízení"] },
    { id:"foh", x:43, y:85, side:"right", up:1, waves:1,
      title:"DiGiCo Quantum 7T", items:["128 vstupních kanálů","64 mix buss","36 DCA / 36 mute group","FPGA processing","True Solo","Waves integrováno","Redundantní napájení"], more:"Více o DiGiCo →" }
  ];

  var SIGNAL = [
    ["mic","Mikrofony","& nástroje"], ["box","Stageboxy","(Optocore)"], ["net","Optická síť","(Optocore)"],
    ["console","DiGiCo","Quantum 7T"], ["proc","L-ISA","Processing"], ["pa","PA systém","(L-Acoustics K2)"], ["people","Diváci",""]
  ];

  var root = document.getElementById("kschema");
  if (!root) return;

  var nodesHTML = NODES.map(function (n) {
    var waves = n.waves ? '<div class="ks-waves"><span></span><span></span><span></span></div>' : '';
    var cls = "ks-card side-" + n.side + (n.up ? " up" : "");
    var more = n.more ? '<a class="more" href="instalace-hd-karlin-schema.html">' + n.more + '</a>' : '';
    return '<div class="ks-node ks-anim" data-id="' + n.id + '" style="left:' + n.x + '%;top:' + n.y + '%">' +
woven(waves) +
      '<div class="ks-dot" role="button" tabindex="0" aria-label="' + n.title + '"></div>' +
      '<div class="' + cls + '"><h4>' + n.title + '</h4><ul>' +
        n.items.map(function (it) { return '<li>' + it + '</li>'; }).join("") +
      '</ul>' + more + '</div>' +
    '</div>';
  }).join("");
  function woven(w){return w;}

  var signalHTML = '<div class="ks-signal ks-anim"><h3>Signálová cesta</h3>' +
    SIGNAL.map(function (s, i) {
      var step = '<div class="ks-step"><div class="ic">' + ICON[s[0]] + '</div>' +
        '<div class="tx"><b>' + s[1] + '</b>' + (s[2] || "") + '</div></div>';
      var arrow = i < SIGNAL.length - 1 ? '<div class="ks-arrow"></div>' : '';
      return step + arrow;
    }).join("") + '</div>';

  var legendHTML = '<div class="ks-legend ks-anim">' +
    '<div class="ks-leg"><span class="mk"></span><span class="tx"><b>Interaktivní prvek</b>Kliknutím zobrazíte detail</span></div>' +
    '<div class="ks-leg"><span class="mk w"></span><span class="tx"><b>Aktivní zvukové vlny</b>Vizualizace pokrytí</span></div>' +
  '</div>';

  root.insertAdjacentHTML("beforeend",
    '<div class="ks-scrim"></div>' + nodesHTML + signalHTML + legendHTML);

  // ===== interakce =====
  var nodes = [].slice.call(root.querySelectorAll(".ks-node"));
  var scrim = root.querySelector(".ks-scrim");
  function closeAll(except) {
    nodes.forEach(function (n) { if (n !== except) n.classList.remove("active", "pinned"); });
    root.classList.toggle("has-active", !!except);
  }
  nodes.forEach(function (n) {
    var dot = n.querySelector(".ks-dot");
    dot.addEventListener("click", function (e) {
      e.stopPropagation();
      var pinned = n.classList.contains("pinned");
      closeAll(pinned ? null : n);
      if (pinned) { n.classList.remove("active", "pinned"); }
      else { n.classList.add("active", "pinned"); }
    });
    dot.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); dot.click(); }
    });
    if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
      n.addEventListener("mouseenter", function () { closeAll(n); n.classList.add("active"); });
      n.addEventListener("mouseleave", function () {
        if (!n.classList.contains("pinned")) { n.classList.remove("active"); root.classList.remove("has-active"); }
      });
    }
  });
  scrim.addEventListener("click", function () { closeAll(null); });
  document.addEventListener("click", function () { closeAll(null); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(null); });

  // ===== entrance animace =====
  var reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  if (!reduce) {
    var head = root.querySelector(".ks-head");
    if (head) { head.style.opacity = 0; head.animate(
      [{opacity:0, transform:"translateY(14px)"},{opacity:1, transform:"none"}],
      {duration:700, easing:"cubic-bezier(.16,1,.3,1)", fill:"both", delay:200}); }

    nodes.forEach(function (n, i) {
      n.animate(
        [{opacity:0, transform:"translate(-50%,-50%) scale(.4) translateY(24px)"},
         {opacity:1, transform:"translate(-50%,-50%) scale(1)"}],
        {duration:650, easing:"cubic-bezier(.16,1,.3,1)", fill:"both", delay:500 + i*130});
    });

    var steps = [].slice.call(root.querySelectorAll(".ks-signal .ks-step, .ks-signal .ks-arrow, .ks-signal h3"));
    root.querySelector(".ks-signal").style.opacity = 1;
    steps.forEach(function (s, i) {
      s.animate([{opacity:0, transform:"translateX(20px)"},{opacity:1, transform:"none"}],
        {duration:500, easing:"cubic-bezier(.16,1,.3,1)", fill:"both", delay:700 + i*90});
    });

    var legs = root.querySelector(".ks-legend");
    legs.style.opacity = 1;
    legs.animate([{opacity:0},{opacity:1}], {duration:600, fill:"both", delay:1600});
  } else {
    root.querySelectorAll(".ks-anim").forEach(function (e) { e.style.opacity = 1; });
  }

  // jemný parallax podkladu na pohyb myši
  if (!reduce && matchMedia("(pointer:fine)").matches) {
    var bg = root.querySelector(".ks-bg img");
    root.addEventListener("mousemove", function (e) {
      var dx = (e.clientX / innerWidth - .5), dy = (e.clientY / innerHeight - .5);
      bg.style.transform = "scale(1.08) translate(" + (-dx*1.4) + "%," + (-dy*1.4) + "%)";
    });
  }
})();
