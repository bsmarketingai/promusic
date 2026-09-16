/* PRO MUSIC — REŽIM PODKLADU (dark / light / duo) + varianta hlavičky.
   Atributy na <html>: data-mode="dark|light|duo", data-header="dark|light".
   Nastavuje se ještě před vykreslením (skript patří do <head>), volba přežije refresh.
   Duo režim tagguje každou druhou „plochou“ sekci classou .pm-light;
   sekce s vlastním podkladem (vlna, fotka, statement, hero) zůstávají beze změny
   a do rytmu se nepočítají. */
(function () {
  var K = "pm-mode", KH = "pm-header";
  var MODES = ["dark", "light", "duo"];

  function get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function mode() { var m = get(K, "dark"); return MODES.indexOf(m) > -1 ? m : "dark"; }
  function header() { return get(KH, "dark") === "light" ? "light" : "dark"; }

  function tagDuo(on) {
    var app = document.getElementById("app");
    if (!app) return;
    var i = 0;
    Array.prototype.forEach.call(app.children, function (s) {
      if (s.tagName !== "SECTION" && s.tagName !== "HEADER") return;
      s.classList.remove("pm-light");
      var own = s.matches(".wave-band,.statement,.band-photo,.b-techbg,.listhead,.hero") || s.querySelector(":scope > .bg");
      if (own) return;
      if (on && i % 2 === 1) s.classList.add("pm-light");
      i++;
    });
  }

  function apply() {
    var m = mode(), r = document.documentElement;
    r.setAttribute("data-mode", m);
    r.setAttribute("data-header", m === "dark" ? "dark" : header());
    if (document.getElementById("app")) tagDuo(m === "duo");
  }

  apply();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);

  window.PMMode = {
    mode: mode, header: header, MODES: MODES,
    setMode: function (m) { set(K, m); apply(); },
    setHeader: function (h) { set(KH, h); apply(); }
  };
  window.addEventListener("storage", function (e) { if (e.key === K || e.key === KH) apply(); });
})();
