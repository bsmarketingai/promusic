/* PRO MUSIC — přechod mezi stránkami „pódiové světlo"
   Při kliknutí na interní .html odkaz se z místa kurzoru rozletí oranžový reflektor
   přes celou stránku; na nové stránce se oranžová rozplyne zpět do dark mode.
   Sdílené, vkládá se na všech stránkách. Respektuje prefers-reduced-motion. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  // overlay element
  var ov = document.createElement("div");
  ov.className = "pm-trans";
  ov.innerHTML = '<span class="pm-trans-beam"></span>';
  document.addEventListener("DOMContentLoaded", function () { document.body.appendChild(ov); }, { once: true });
  if (document.body) document.body.appendChild(ov);

  var navTimer = 0;

  function setOrigin(x, y) {
    ov.style.setProperty("--tx", x + "px");
    ov.style.setProperty("--ty", y + "px");
  }

  function clearOverlay() {
    if (navTimer) { clearTimeout(navTimer); navTimer = 0; }
    ov.classList.remove("show", "cover", "reveal");
  }

  /* Návrat zpět v prohlížeči: stránka se obnoví z bfcache i s overlayem, který na ní
     zůstal ze zatmívání odchodu — v tom stavu překrývá a blokuje celý web.
     Proto při každém pageshow / popstate overlay bezpodmínečně zhasínáme. */
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) { sessionStorage.removeItem("pmTrans"); clearOverlay(); }
  });
  window.addEventListener("popstate", clearOverlay);
  window.addEventListener("pagehide", function (e) { if (e.persisted) clearOverlay(); });

  function isBackForward() {
    var nav = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || null;
    if (nav) return nav.type === "back_forward";
    return !!(performance.navigation && performance.navigation.type === 2);
  }

  /* ===== PŘÍCHOD: pokud jdeme z přechodu, rozsviť a rozplyň ===== */
  function playIntro() {
    /* při návratu zpět/vpřed žádný intro přechod nechceme */
    if (isBackForward()) { sessionStorage.removeItem("pmTrans"); clearOverlay(); return; }
    var raw = sessionStorage.getItem("pmTrans");
    if (!raw) return;
    sessionStorage.removeItem("pmTrans");
    var d = {};
    try { d = JSON.parse(raw); } catch (e) {}
    var x = (d.x != null) ? d.x : window.innerWidth / 2;
    var y = (d.y != null) ? d.y : window.innerHeight / 2;
    setOrigin(x, y);
    ov.classList.add("show", "cover");          // plně oranžová
    // vynutit reflow, pak rozplynout
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        ov.classList.add("reveal");               // fade + lehké stažení
        setTimeout(clearOverlay, 760);
      });
    });
  }
  if (document.readyState !== "loading") playIntro();
  else document.addEventListener("DOMContentLoaded", playIntro, { once: true });

  if (reduce) return;

  /* ===== ODCHOD: zachytit kliknutí na interní odkaz ===== */
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || a.target === "_blank" || /^(mailto:|tel:|https?:)/i.test(href)) return;
    if (!/\.html(\?|#|$)/i.test(href)) return;     // jen interní .html stránky

    e.preventDefault();
    setOrigin(e.clientX, e.clientY);
    ov.classList.add("show");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { ov.classList.add("cover"); });
    });
    sessionStorage.setItem("pmTrans", JSON.stringify({ x: e.clientX, y: e.clientY }));
    navTimer = setTimeout(function () { navTimer = 0; window.location.href = href; }, 540);
    /* pojistka: když navigace nenastane (zrušený požadavek, stejná adresa), overlay nesmí zůstat */
    setTimeout(function () { if (!navTimer && document.visibilityState === "visible") clearOverlay(); }, 4000);
  }, true);
})();
