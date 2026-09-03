/* PRO MUSIC — SMĚR B (Premium) motion vrstva.
   Scroll-driven parallax, scrub reveal, magnetická tlačítka, tilt karet.
   Běží jen na body.dir-b; respektuje prefers-reduced-motion. */
(function () {
  if (!document.body.classList.contains("dir-b")) return;
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  function ready(fn){ if (document.readyState !== "loading") setTimeout(fn,40); else document.addEventListener("DOMContentLoaded", fn); }

  ready(function () {
    /* ---- Technologie: fotka jako pozadí celé sekce (wave edges + glass) ---- */
    (function () {
      var fm = document.querySelector(".feature");
      var sec = fm && fm.closest("section");
      if (sec) { sec.classList.add("wave-band", "b-techbg"); }
    })();

    /* ---- doplnit krátké popisy pod nadpisy sekcí (jen B) ---- */
    var DESCS = [
      ["Co řešíte", "Vyberte situaci, ne produkt. Každá cesta vede k relevantním referencím a řešení na míru."],
      ["Technologie", "Imerzivní zvuk a virtuální akustika světové úrovně — a know-how, jak je správně nasadit."],
      ["Vybrané realizace", "Od stadionových turné po stálé instalace v divadlech a arénách. Výběr z toho, co jsme rozsvítili a ozvučili."],
      ["Showreel", "Pár vteřin atmosféry z koncertů, festivalů a instalací. Posuňte se karuselem."],
      ["Zastupujeme", "Výhradní distribuce světové špičky pro ČR a SK — značky, kterým rozumíme do hloubky."],
      ["Partner Program", "Síť produkčních a rentalových partnerů, kteří staví na našich systémech."],
      ["Reference", "Stovky realizací napříč divadly, arénami, broadcastem i veřejným sektorem."],
      ["školení", "Certifikované tréninky přímo od distributora — pro zvukaře, light designéry a integrátory."],
    ];
    [].slice.call(document.querySelectorAll(".sec-head")).forEach(function (head) {
      var h2 = head.querySelector("h2"); if (!h2) return;
      var sec = head.closest("section");
      if (sec && sec.querySelector(".sec-desc")) return;
      if (sec && sec.querySelector(".lead")) return; // už má perex
      var txt = h2.textContent;
      var m = DESCS.find(function (d) { return txt.indexOf(d[0]) >= 0; });
      if (!m) return;
      var p = document.createElement("p");
      p.className = "sec-desc";
      p.textContent = m[1];
      if (head.nextSibling) head.parentNode.insertBefore(p, head.nextSibling);
      else head.parentNode.appendChild(p);
    });

    /* ---- SHOWREEL → 3D coverflow ---- */
    (function () {
      var reel = document.querySelector(".reel");
      if (!reel) return;
      reel.classList.add("coverflow");
      reel.removeAttribute("data-stagger");
      var clips = [].slice.call(reel.querySelectorAll(".clip"));
      if (clips.length < 2) return;
      var active = Math.floor(clips.length / 2), timer = null, DUR = 4200;
      function render() {
        var n = clips.length;
        clips.forEach(function (c, i) {
          var off = i - active;
          if (off > n / 2) off -= n; else if (off < -n / 2) off += n;
          c.setAttribute("data-pos", Math.abs(off) > 2 ? "hidden" : String(off));
        });
        if (dots) dots.forEach(function (d, i) { d.classList.toggle("is-active", i === active); });
      }
      function go(n) { active = (n + clips.length) % clips.length; render(); }
      function start() { stop(); if (!reduce) timer = setInterval(function () { go(active + 1); }, DUR); }
      function stop() { if (timer) clearInterval(timer); }
      clips.forEach(function (c, i) {
        c.addEventListener("click", function (e) {
          if (i === active) return; e.preventDefault();
          go(i); start();
        });
      });
      // šipky
      var prev = document.createElement("button"); prev.className = "cf-nav cf-prev"; prev.setAttribute("aria-label", "Předchozí"); prev.innerHTML = "‹";
      var next = document.createElement("button"); next.className = "cf-nav cf-next"; next.setAttribute("aria-label", "Další"); next.innerHTML = "›";
      prev.addEventListener("click", function () { go(active - 1); start(); });
      next.addEventListener("click", function () { go(active + 1); start(); });
      reel.appendChild(prev); reel.appendChild(next);
      // tečky
      var dotWrap = document.createElement("div"); dotWrap.className = "cf-dots";
      var dots = clips.map(function (_, i) {
        var d = document.createElement("button"); d.className = "cf-dot"; d.setAttribute("aria-label", "Klip " + (i + 1));
        d.addEventListener("click", function () { go(i); start(); });
        dotWrap.appendChild(d); return d;
      });
      reel.appendChild(dotWrap);
      reel.addEventListener("pointerenter", stop);
      reel.addEventListener("pointerleave", start);
      render(); start();
    })();

    /* ---- reveal: rozšířené varianty ---- */
    var heads = [].slice.call(document.querySelectorAll(".sec-head h2"));
    heads.forEach(function (h) { h.classList.add("b-mask"); });
    var risers = [].slice.call(document.querySelectorAll(".segcard, .workcard, .stat, .acard, .reftile, .feature > div"));
    risers.forEach(function (el, i) { el.classList.add("b-rise"); el.style.transitionDelay = (i % 4 * 0.06) + "s"; });

    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.05 });
    document.querySelectorAll(".b-mask, .b-rise").forEach(function (el) { io.observe(el); });
    /* pojistka: nic nesmí zůstat skryté, i kdyby observer nesepnul */
    setTimeout(function () {
      document.querySelectorAll(".b-mask:not(.in), .b-rise:not(.in)").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add("in");
      });
    }, 1400);

    if (reduce) return;

    /* ---- scroll parallax: jemné vrstvení ---- */
    var layers = [];
    document.querySelectorAll(".feature-media, .workcard img, .statement .bg img, .reel .clip img, .cshero .bg img, .csgal img, .seghero .bg img, .solrow .media img").forEach(function (el) {
      var depth = el.closest(".statement") ? 0.06 : 0.04;
      layers.push({ el: el, d: depth });
    });
    var raf = null;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var vh = window.innerHeight;
        layers.forEach(function (L) {
          var r = L.el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          var c = r.top + r.height / 2 - vh / 2;
          var y = -c * L.d;
          L.el.style.transform = "translate3d(0," + y.toFixed(1) + "px,0) scale(1.08)";
        });
        raf = null;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (!fine) return;

    /* ---- magnetická primary tlačítka ---- */
    /* ---- směrově nasvícený okraj tlačítek/karet (sleduje kurzor, bez motion) ---- */
    document.querySelectorAll(".btn-primary, .btn-ghost, .segcard, .acard, .fixcard, .problem, .proof, .hero-card, .outline-glow, .stage-glow").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
        b.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
      });
    });

    /* ---- tilt na náhledových/realizačních kartách ---- */
    document.querySelectorAll(".workcard, .hero-card").forEach(function (c) {
      c.addEventListener("pointermove", function (e) {
        var r = c.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        c.style.transition = "transform .1s linear";
        c.style.transform = "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
      });
      c.addEventListener("pointerleave", function () { c.style.transition = "transform .5s var(--pm-ease)"; c.style.transform = ""; });
    });
  });
})();

/* Obrysová čísla sekcí jsou dekorace — skryj je čtečkám (a11y). */
document.querySelectorAll(".sec-head .idx,.idx").forEach(function(e){e.setAttribute("aria-hidden","true")});
