/* PRO MUSIC — PARTNEŘI (render + filtrace)
   Data: partneri-data.js (window.PM_PARTNERS)
   Na stránce: #pcert, #pgrids, #pcount */
(function () {
  var items = window.PM_PARTNERS || [];
  var elCert = document.getElementById("pcert");
  var elGrids = document.getElementById("pgrids");
  var elCount = document.getElementById("pcount");
  if (!elGrids) return;

  var CATS = [{ k: "rental", t: "Rentaly a produkce" }, { k: "venue", t: "Venues a instituce" }];
  var BRANDS = ["L-Acoustics", "DiGiCo", "ChamSys", "Yamaha", "Waves"];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function nOf(k) { return items.filter(function (d) { return d.cat === k; }).length; }
  function hasBrand(d, b) { return (d.brands || []).indexOf(b) > -1; }

  function card(d) {
    var href = d.web ? "https://" + d.web.replace(/^https?:\/\//, "") : "";
    var open = href ? '<a class="pcard outline-glow" href="' + esc(href) + '" target="_blank" rel="noopener">' : '<div class="pcard">';
    return open
      + '<div class="pcard-box"><img loading="lazy" src="' + esc(d.img) + '" alt="Logo ' + esc(d.name) + '" /></div>'
      + '<div class="pcard-b"><h4>' + esc(d.name) + "</h4>"
      + ((d.brands || []).length ? '<div class="ptags">' + d.brands.map(function (b) { return '<span class="ptag' + (BRANDS.indexOf(b) > -1 ? " key" : "") + '">' + esc(b) + "</span>"; }).join("") + "</div>" : "")
      + (d.web ? '<span class="pweb">' + esc(d.web) + " →</span>" : "")
      + "</div>" + (href ? "</a>" : "</div>");
  }

  function certCard(d) {
    var href = d.web ? "https://" + d.web.replace(/^https?:\/\//, "") : "";
    var open = href ? '<a class="pcertcard outline-glow" href="' + esc(href) + '" target="_blank" rel="noopener">' : '<div class="pcertcard">';
    return open
      + '<div class="pcard-box"><img loading="lazy" src="' + esc(d.img) + '" alt="Logo ' + esc(d.name) + '" /></div>'
      + '<div class="pcard-b"><h4>' + esc(d.name) + "</h4>"
      + '<div class="pcerts">' + d.cert.map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div>"
      + (d.web ? '<span class="pweb">' + esc(d.web) + " →</span>" : "")
      + "</div>" + (href ? "</a>" : "</div>");
  }

  if (elCert) elCert.innerHTML = items.filter(function (d) { return (d.cert || []).length; }).map(certCard).join("");

  function render() {
    var rows = items.slice();
    if (elCount) elCount.textContent = rows.length === 1 ? "1 partner" : (rows.length >= 5 ? rows.length + " partnerů" : rows.length + " partneři");

    elGrids.innerHTML = CATS.map(function (c) {
      var g = rows.filter(function (d) { return d.cat === c.k; });
      if (!g.length) return "";
      return '<div class="pgroup"><div class="pgroup-h"><h3>' + c.t + "</h3><span>" + g.length + "</span></div>"
        + '<div class="pgrid">' + g.map(card).join("") + "</div></div>";
    }).join("");
  }

  /* outline-glow na dynamickém obsahu: site.js váže jen jednou při loadu,
     proto tady delegace na kontejneru (přežije každý re-render) */
  function glow(scope) {
    scope.addEventListener("pointermove", function (e) {
      var b = e.target.closest(".outline-glow"); if (!b) return;
      var r = b.getBoundingClientRect();
      b.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
      b.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
    });
  }
  glow(elGrids); if (elCert) glow(elCert);

  render();
})();
