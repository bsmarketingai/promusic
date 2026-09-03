/* PRO MUSIC — THEME RUNTIME
   Čte uložené barvy (primary / secondary / main) a aplikuje je na <html>.
   Musí být načtený na KAŽDÉ stránce (ideálně v <head>, aby nebliklo).
   Změna v design systému → localStorage → propíše se celým projektem. */
(function () {
  var KEY = "pm-theme";
  var VARS = ["primary", "secondary", "main"];

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function apply(theme) {
    var root = document.documentElement;
    VARS.forEach(function (k) {
      if (theme && theme[k]) root.style.setProperty("--ui-" + k, theme[k]);
      else root.style.removeProperty("--ui-" + k);
    });
  }
  function save(theme) {
    try { localStorage.setItem(KEY, JSON.stringify(theme)); } catch (e) {}
    apply(theme);
    window.dispatchEvent(new CustomEvent("pm-theme-change", { detail: theme }));
  }
  function reset() {
    try { localStorage.removeItem(KEY); } catch (e) {}
    apply({});
    window.dispatchEvent(new CustomEvent("pm-theme-change", { detail: {} }));
  }
  /* aktuální hodnoty (uložené nebo výchozí z CSS) */
  function current() {
    var cs = getComputedStyle(document.documentElement);
    var stored = read(), out = {};
    VARS.forEach(function (k) {
      out[k] = stored[k] || cs.getPropertyValue("--ui-" + k).trim();
    });
    return out;
  }

  apply(read());
  /* synchronizace mezi otevřenými záložkami */
  window.addEventListener("storage", function (e) { if (e.key === KEY) apply(read()); });

  window.PMTheme = { read: read, save: save, apply: apply, reset: reset, current: current, KEY: KEY, VARS: VARS };
})();
