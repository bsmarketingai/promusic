/* PRO MUSIC — REŽIM PODKLADU (dark / light / duo) + varianta hlavičky.
   Atributy na <html>: data-mode="dark|light|duo", data-header="dark|light", data-logo="color|mono".
   Varianta hlavičky je nezávislá na režimu podkladu — světlou hlavičku lze mít i v dark režimu.
   Nastavuje se ještě před vykreslením (skript patří do <head>), volba přežije refresh.
   Duo režim tagguje každou druhou „plochou“ sekci classou .pm-light;
   sekce s vlastním podkladem (vlna, fotka, statement, hero) zůstávají beze změny
   a do rytmu se nepočítají. */
(function () {
  var K = "pm-mode", KH = "pm-header", KL = "pm-logo", KHR = "pm-hero";
  var MODES = ["dark", "light", "duo"];

  function get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function mode() { var m = get(K, "dark"); return MODES.indexOf(m) > -1 ? m : "dark"; }
  function header() { return get(KH, "dark") === "light" ? "light" : "dark"; }
  function hero() { var h = get(KHR, "h1"); return ["h2", "h2-3d", "h3", "h5"].indexOf(h) > -1 ? h : "h1"; }
  function logo() { return get(KL, "color") === "mono" ? "mono" : "color"; }

  function tagDuo(on) {
    var app = document.getElementById("app");
    if (!app) return;
    var i = 0;
    Array.prototype.forEach.call(app.children, function (s) {
      if (s.tagName !== "SECTION" && s.tagName !== "HEADER") return;
      s.classList.remove("pm-light");
      var own = s.matches(".wave-band,.statement,.band-photo,.b-techbg,.listhead,.hero,.hstrip,.hmason,.hmix") || s.querySelector(":scope > .bg");
      if (own) return;
      if (on && i % 2 === 1) s.classList.add("pm-light");
      i++;
    });
  }

  function apply() {
    var m = mode(), r = document.documentElement;
    r.setAttribute("data-mode", m);
    r.setAttribute("data-header", header());
    r.setAttribute("data-logo", logo());
    r.setAttribute("data-hero", hero());
    if (document.getElementById("app")) tagDuo(m === "duo");
  }

  apply();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);

  window.PMMode = {
    mode: mode, header: header, logo: logo, hero: hero, MODES: MODES,
    setHero: function (h) { set(KHR, h); apply(); },
    setMode: function (m) { set(K, m); apply(); },
    setHeader: function (h) { set(KH, h); apply(); },
    setLogo: function (l) { set(KL, l); apply(); }
  };
  window.addEventListener("storage", function (e) { if (e.key === K || e.key === KH || e.key === KL || e.key === KHR) apply(); });
})();
