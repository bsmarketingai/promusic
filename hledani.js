/* PRO MUSIC — STRÁNKA VÝSLEDKŮ HLEDÁNÍ
   Čte ?q= a vypíše tři skupiny (Reference · Novinky · Second Hand) —
   stejné dělení jako našeptávač v hlavičce. Index i filtrování žijí
   v site-search.js (window.PMSearch), tady je jen render. */
(function () {
  "use strict";
  var root = document.getElementById("resRoot");
  if (!root) return;
  var input = document.getElementById("resInput");
  var form = document.getElementById("resForm");
  var qLabel = document.getElementById("resQ");
  var q = new URLSearchParams(location.search).get("q") || "";

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  function card(it, k) {
    return '<a class="rescard outline-glow" href="' + esc(it.href) + '">' +
      '<span class="rescard-img' + (k === "sh" ? " rescard-img-fit" : "") + '">' + (it.img ? '<img loading="lazy" src="' + esc(it.img) + '" alt="" />' : '') + '</span>' +
      '<span class="rescard-b">' +
        '<strong class="rescard-t">' + esc(it.t) + '</strong>' +
        (it.desc ? '<span class="rescard-d">' + esc(it.desc) + '</span>' : '') +
        '<span class="btn btn-ghost btn-sm rescard-go">Zobrazit<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></span>' +
      '</span></a>';
  }

  function render() {
    if (qLabel) qLabel.textContent = q ? '„' + q + '"' : "—";
    if (!q || q.trim().length < 2) {
      root.innerHTML = '<p class="reshint">Zadej alespoň dva znaky — hledáme v referencích, novinkách i second handu.</p>';
      return;
    }
    var data = window.PMSearch.results(q), total = 0, html = "";
    window.PMSearch.GROUPS.forEach(function (g) {
      var hits = data[g.k] || [];
      total += hits.length;
      if (!hits.length) return;
      var head = hits.slice(0, 4), rest = hits.slice(4);
      html += '<section class="resgroup" id="' + g.k + '">' +
        '<div class="sec-head"><h2>' + g.label + '</h2><span class="rescount">' + hits.length + '</span><span class="rule"></span></div>' +
        '<div class="resgrid">' + head.map(function (i) { return card(i, g.k); }).join("") + '</div>' +
        (rest.length ? '<div class="resgrid resgrid-more" hidden>' + rest.map(function (i) { return card(i, g.k); }).join("") + '</div>' +
          '<div class="resmore"><button class="btn btn-ghost" type="button" data-resmore aria-expanded="false">Zobrazit všechny výsledky<ui-icon class="btn-ico" name="ui-caret-down" aria-hidden="true"></ui-icon></button></div>' : '') +
        '</section>';
    });
    root.innerHTML = total ? html
      : '<p class="reshint">Pro ' + esc(q) + ' jsme nic nenašli. Zkus značku (L-Acoustics, DiGiCo), město nebo typ akce.</p>';
    root.querySelectorAll("[data-resmore]").forEach(function (b) {
      b.addEventListener("click", function () {
        var more = b.closest(".resgroup").querySelector(".resgrid-more");
        var open = b.getAttribute("aria-expanded") === "true";
        if (more) more.hidden = open;
        b.setAttribute("aria-expanded", open ? "false" : "true");
        b.innerHTML = (open ? "Zobrazit všechny výsledky" : "Skrýt všechny výsledky") +
          '<ui-icon class="btn-ico" name="ui-caret-' + (open ? "down" : "up") + '" aria-hidden="true"></ui-icon>';
        if (window.UILoader) window.UILoader.scanGlow();
      });
    });
    if (window.UILoader) window.UILoader.scanGlow();
    if (total && location.hash) {
      var t = document.getElementById(location.hash.slice(1));
      if (t) window.scrollTo(0, t.getBoundingClientRect().top + window.pageYOffset - 120);
    }
  }

  if (input) input.value = q;
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    q = input.value.trim();
    history.replaceState(null, "", "hledani.html?q=" + encodeURIComponent(q));
    render();
  });

  function boot() { window.PMSearch.load().then(render); }
  if (window.PMSearch) boot();
  else window.addEventListener("load", boot);
})();
