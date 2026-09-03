/* PRO MUSIC — SMĚR B (Premium) micro-interakce & motion.
   Spouští se po pm-nav/hifi-content. Vše respektuje prefers-reduced-motion. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  /* ---- scroll progress линка ---- */
  var prog = document.createElement("div");
  prog.className = "pb-progress";
  document.body.appendChild(prog);
  function onScrollProg() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    prog.style.width = (max > 0 ? (h.scrollTop / max * 100) : 0) + "%";
  }
  window.addEventListener("scroll", onScrollProg, { passive: true });
  onScrollProg();

  /* ---- scroll-down indikátor v hero ---- */
  var hero = document.querySelector(".hero-wrap");
  if (hero) {
    var sc = document.createElement("div");
    sc.className = "pb-scroll";
    sc.innerHTML = '<span class="ln"></span> scroll';
    var heroSec = document.querySelector(".hero");
    if (heroSec) heroSec.appendChild(sc);
  }

  /* ---- count-up čísel ve stats ---- */
  function countUp(el) {
    var raw = el.textContent.trim();
    var m = raw.match(/^(\d+)(.*)$/);
    if (!m) return;
    var target = parseInt(m[1], 10), suffix = m[2], t0 = null, D = 1100;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / D, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var statsWrap = document.querySelector(".stats");
  if (statsWrap && !reduce) {
    var sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".stat").forEach(function (s) { s.classList.add("in"); });
          e.target.querySelectorAll(".stat .n").forEach(function (n) { countUp(n); });
          sio.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    sio.observe(statsWrap);
  }

  /* ---- marquee referencí (vloží se před footer) ---- */
  var foot = document.querySelector("footer.foot");
  if (foot) {
    var names = ["Rammstein", "Ed Sheeran", "Eurovize 2024", "Scorpions", "TOPFEST", "Mark Knopfler", "DJKT Plzeň", "HD Karlín", "Steel Aréna", "UFFO Trutnov"];
    var run = names.map(function (n) { return "<span>" + n + "</span>"; }).join("");
    var mq = document.createElement("div");
    mq.className = "pb-marquee";
    mq.innerHTML = '<div class="track">' + run + run + '</div>';
    foot.parentNode.insertBefore(mq, foot);
  }

  /* ---- magnetické tlačítka ---- */
  if (fine && !reduce) {
    document.querySelectorAll(".btn-primary, .btn-lg").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        var dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        b.style.transform = "translate(" + (dx * 10).toFixed(1) + "px," + (dy * 8).toFixed(1) + "px)";
      });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });
  }

  /* ---- scroll-driven parallax na workcard obrázcích ---- */
  if (!reduce) {
    var imgs = [].slice.call(document.querySelectorAll(".workcard img, .feature-media img"));
    imgs.forEach(function (i) { i.style.willChange = "transform"; i.style.height = "118%"; i.style.top = "-9%"; i.style.position = "absolute"; });
    var praf = null;
    function par() {
      if (praf) return;
      praf = requestAnimationFrame(function () {
        var vh = window.innerHeight;
        imgs.forEach(function (i) {
          var card = i.closest(".workcard, .feature-media");
          var r = card.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) { praf = null; return; }
          var c = r.top + r.height / 2 - vh / 2;
          var y = -(c / vh) * 26;
          i.style.transform = "translateY(" + y.toFixed(1) + "px)";
        });
        praf = null;
      });
    }
    window.addEventListener("scroll", par, { passive: true });
    par();
  }

  /* ---- custom cursor světlo ---- */
  if (fine && !reduce) {
    var cur = document.createElement("div");
    cur.className = "pb-cursor";
    document.body.appendChild(cur);
    window.addEventListener("pointermove", function (e) {
      cur.classList.add("on");
      cur.style.left = e.clientX + "px";
      cur.style.top = e.clientY + "px";
    }, { passive: true });
    window.addEventListener("pointerleave", function () { cur.classList.remove("on"); });
    var hov = ".btn, .workcard, .segcard, .hero-card, a, .nav-link";
    document.addEventListener("pointerover", function (e) {
      if (e.target.closest(hov)) cur.classList.add("big"); else cur.classList.remove("big");
    });
  }
})();
