/* PRO MUSIC — lehký Tweaks panel (vanilla). Ovládá barevnost patičky. */
(function () {
  var DEFAULTS = /*EDITMODE-BEGIN*/{
    "footerStyle": "Oranžová"
  }/*EDITMODE-END*/;

  var LS = "pm-tweaks";
  var VER = 2;                       // bump = zahodit staré uložené hodnoty
  var state = Object.assign({}, DEFAULTS);
  try {
    var s = JSON.parse(localStorage.getItem(LS) || "{}");
    if (s.__v === VER) { delete s.__v; Object.assign(state, s); }
    else { localStorage.removeItem(LS); }   // migrace: starý default (Tmavá) ignorovat
  } catch (e) {}

  function apply() {
    document.body.classList.toggle("foot-dark", state.footerStyle === "Tmavá");
  }
  apply();

  function setTweak(key, val) {
    state[key] = val;
    apply();
    try { localStorage.setItem(LS, JSON.stringify(Object.assign({ __v: VER }, state))); } catch (e) {}
    try { window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { ["__root__:" + key]: val } }, "*"); } catch (e) {}
    render();
  }

  // ---- panel ----
  var style = document.createElement("style");
  style.textContent = `
    .pmtwk{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:2147483646;
      width:248px;background:#15130f;border:1px solid rgba(236,230,218,.18);border-radius:14px;
      box-shadow:0 24px 60px rgba(0,0,0,.55);font-family:'IBM Plex Sans',system-ui,sans-serif;color:#ece6da;
      display:none;overflow:hidden;}
    .pmtwk.show{display:block;}
    .pmtwk-hd{display:flex;align-items:center;justify-content:space-between;padding:13px 15px;border-bottom:1px solid rgba(236,230,218,.12);}
    .pmtwk-hd b{font-size:13px;letter-spacing:.02em;}
    .pmtwk-x{background:none;border:none;color:#a39d90;font-size:15px;cursor:pointer;line-height:1;}
    .pmtwk-x:hover{color:#ece6da;}
    .pmtwk-bd{padding:15px;}
    .pmtwk-lbl{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#7d7669;margin:0 0 9px;}
    .pmtwk-seg{display:flex;gap:6px;background:#0c0b09;border:1px solid rgba(236,230,218,.12);border-radius:999px;padding:4px;}
    .pmtwk-seg button{flex:1;border:none;background:transparent;color:#a39d90;font-family:'IBM Plex Sans',sans-serif;
      font-size:13px;font-weight:600;padding:8px 10px;border-radius:999px;cursor:pointer;transition:all .15s;}
    .pmtwk-seg button.on{background:#e0542b;color:#fff;}
  `;
  document.head.appendChild(style);

  var panel = document.createElement("div");
  panel.className = "pmtwk";
  panel.setAttribute("data-omelette-chrome", "");
  document.body.appendChild(panel);

  function render() {
    panel.innerHTML =
      '<div class="pmtwk-hd"><b>Tweaks</b><button class="pmtwk-x" aria-label="Zavřít">✕</button></div>' +
      '<div class="pmtwk-bd">' +
        '<p class="pmtwk-lbl">Barevnost patičky</p>' +
        '<div class="pmtwk-seg" data-k="footerStyle">' +
          '<button data-v="Oranžová" class="' + (state.footerStyle === "Oranžová" ? "on" : "") + '">Oranžová</button>' +
          '<button data-v="Tmavá" class="' + (state.footerStyle === "Tmavá" ? "on" : "") + '">Tmavá</button>' +
        '</div>' +
      '</div>';
    panel.querySelector(".pmtwk-x").addEventListener("click", dismiss);
    panel.querySelectorAll(".pmtwk-seg").forEach(function (seg) {
      var key = seg.getAttribute("data-k");
      seg.querySelectorAll("button").forEach(function (b) {
        b.addEventListener("click", function () { setTweak(key, b.getAttribute("data-v")); });
      });
    });
  }
  render();

  function show() { panel.classList.add("show"); }
  function hide() { panel.classList.remove("show"); }
  function dismiss() { hide(); try { window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*"); } catch (e) {} }

  window.addEventListener("message", function (e) {
    var t = e.data && e.data.type;
    if (t === "__activate_edit_mode") show();
    else if (t === "__deactivate_edit_mode") hide();
  });
  try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (e) {}
})();
