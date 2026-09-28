/* PRO MUSIC — SECOND HAND: detail produktu.
   Render z produkt-data.js podle ?p=<slug>. Varianty, quantity stepper,
   Koupit → UICart + modal „přidáno do košíku“. Bez ceny → CTA Poptat. */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function ks(n) { return n + " ks"; }

  function priceNum(s) { var n = parseInt(String(s || "").replace(/\D/g, ""), 10); return n > 0 ? n : 0; }
  function pl(n, a, b, c) { return n === 1 ? a : n > 1 && n < 5 ? b : c; }

  /* modal „přidáno do košíku“ — sdílený UIModal (hlavička, křížek, patička s navigací) */
  function openAdded(it, q, base, stock) {
    var U = window.UICart, a = U.get(), cnt = U.count(a);
    window.UIModal.open({
      title: q + " ks " + pl(q, "přidán", "přidány", "přidáno") + " do košíku",
      cls: "ui-modal-cart",
      body: '<div class="cartm">' +
        '<div class="cartm-prod">' +
          '<div class="cartm-img">' + (it.img ? '<img src="' + esc(it.img) + '" alt="' + esc(it.n) + '" />' : "") + "</div>" +
          '<div class="cartm-info">' +
            '<h3 class="cartm-n">' + esc(it.n) + "</h3>" +
            '<div class="cartm-price">' + U.fmt(it.p) + "<small>" + U.fmt(base) + " bez DPH</small></div>" +
            '<p class="cartm-stock">Dostupnost:<b>' + (stock > 0 ? "Skladem" : "Na dotaz") + "</b></p>" +
          "</div>" +
        "</div>" +
        '<div class="cartm-sum">' +
          '<div class="cartm-row"><span>Celková cena přidaného zboží</span><strong>' + U.fmt(it.p * q) + "</strong></div>" +
          '<p class="cartm-note">V košíku máte celkem <b>' + cnt + " " + pl(cnt, "produkt", "produkty", "produktů") + "</b> dohromady za <b>" + U.fmt(U.sum(a)) + "</b>.</p>" +
        "</div>" +
      "</div>",
      foot: '<button type="button" class="btn btn-ghost" data-modal-close>Zpět do obchodu</button>' +
        '<a class="btn btn-primary" href="kosik.html">Objednat zboží<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></a>'
    });
  }

  function stockLabel(n) {
    return n > 0 ? "Skladem " + ks(n) : "Na dotaz";
  }

  function build(root) {
    var db = window.PM_PRODUCTS || {};
    var q = new URLSearchParams(location.search);
    var slug = db[q.get("p")] ? q.get("p") : "rf-venue-combine4";
    var d = db[slug];
    if (!d) { root.innerHTML = '<p class="mono">Produkt nenalezen.</p>'; return; }

    document.title = "PRO MUSIC — " + d.n;
    var crumb = document.querySelector(".pd-crumb");
    if (crumb) crumb.textContent = d.n;

    var vars = d.vars || null;
    var vi = 0;
    var stock = vars ? vars[0].q : (d.stock || 0);

    root.innerHTML =
      '<div class="pd">' +
        '<div class="pd-gal">' +
          '<div class="pd-shot">' +
            '<div class="pd-flags">' + (d.flags || []).map(function (f, i) {
              return '<span class="pd-flag' + (i === 0 ? " is-accent" : "") + '">' + esc(f) + "</span>";
            }).join("") + "</div>" +
            (d.img ? '<button type="button" class="pd-zoom" aria-label="Zvětšit fotku"><img src="' + esc(d.img) + '" alt="' + esc(d.n) + '" /><span class="pd-zoom-b" aria-hidden="true"><ui-icon name="shop-search"></ui-icon></span></button>' : '<span class="shnoimg mono">bez fotky</span>') +
          "</div>" +
          '<div class="pd-prose">' + (d.body || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
        "</div>" +
        '<div class="pd-info">' +
          "<h1>" + esc(d.n) + "</h1>" +
          (d.perex ? '<p class="pd-perex">' + esc(d.perex) + "</p>" : "") +
          '<div class="pd-price">' + esc(d.cena) + '<small>' + esc(d.cenaNote || "") + "</small></div>" +
          '<div class="pd-stock" role="status"><ui-icon name="shop-package" aria-hidden="true"></ui-icon><span class="pd-stock-t">' + esc(stockLabel(stock)) + "</span></div>" +
          (vars ? '<div class="pd-varblock"><span class="pd-vlabel">Varianta</span><div class="pd-vars" role="radiogroup" aria-label="Varianta">' +
            vars.map(function (v, i) {
              return '<button type="button" class="pd-var' + (i === 0 ? " is-active" : "") + '" role="radio" aria-checked="' + (i === 0) + '" data-v="' + i + '">' +
                '<span class="pd-var-dot" aria-hidden="true"></span><span class="pd-var-n">' + esc(v.n) + "</span>" +
                '<span class="pd-vq">' + esc(ks(v.q)) + " skladem</span></button>";
            }).join("") + "</div></div>" : "") +
          (priceNum(d.cena) ? '<div class="pd-buy">' +
            '<div class="qty" role="group" aria-label="Počet kusů">' +
              '<button class="qty-b" data-s="-1" aria-label="Ubrat kus">–</button>' +
              '<input class="qty-i mono" type="text" inputmode="numeric" value="1" aria-label="Počet kusů" />' +
              '<button class="qty-b" data-s="1" aria-label="Přidat kus">+</button>' +
            "</div>" +
            '<button class="btn btn-primary btn-md pd-cart"><ui-icon class="btn-ico" name="shop-cart" aria-hidden="true"></ui-icon>Koupit</button>' +
          "</div>" :
          '<div class="cta-actions pd-cta"><ui-button variant="primary" size="md" href="mailto:info@promusic.cz?subject=' + encodeURIComponent(d.n) + '">Poptat tento kus →</ui-button><ui-button variant="ghost" size="md" href="kontakt.html">Kontakt</ui-button></div>') +
          '<dl class="pd-facts">' + (d.facts || []).map(function (f) {
            return "<dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd>";
          }).join("") + "</dl>" +
          '<div class="pd-specs"><h3>Specifikace</h3><dl>' + (d.specs || []).map(function (s) {
            return "<dt>" + esc(s[0]) + "</dt><dd>" + esc(s[1]) + "</dd>";
          }).join("") + "</dl></div>" +
        "</div>" +
      "</div>";

    var elStock = root.querySelector(".pd-stock-t"), elQty = root.querySelector(".qty-i");

    function clampQty() {
      if (!elQty) return;
      var v = parseInt(elQty.value, 10);
      if (!(v > 0)) v = 1;
      if (stock > 0 && v > stock) v = stock;
      elQty.value = v;
    }

    var varsEl = root.querySelector(".pd-vars");
    if (varsEl) varsEl.addEventListener("click", function (e) {
      var b = e.target.closest("[data-v]"); if (!b) return;
      vi = parseInt(b.getAttribute("data-v"), 10);
      stock = vars[vi].q;
      varsEl.querySelectorAll(".pd-var").forEach(function (x, i) {
        x.classList.toggle("is-active", i === vi);
        x.setAttribute("aria-checked", i === vi ? "true" : "false");
      });
      elStock.textContent = stockLabel(stock) + " · " + vars[vi].n.toLowerCase();
      clampQty();
    });

    var buy = root.querySelector(".pd-buy");
    if (buy) buy.addEventListener("click", function (e) {
      if (e.target.closest(".pd-cart")) {
        clampQty();
        if (!window.UICart || !window.UIModal) return;
        var q = parseInt(elQty.value, 10) || 1, base = priceNum(d.cena), v = vars ? vars[vi] : null;
        var it = { id: slug + (v ? "-" + vi : ""), n: d.n + (v ? " · " + v.n : ""), img: d.img, href: "produkt.html?p=" + slug, p: Math.round(base * 1.21), q: q, s: stock };
        window.UICart.add(it);
        openAdded(it, q, base, stock);
        return;
      }
      var b = e.target.closest(".qty-b"); if (!b) return;
      elQty.value = (parseInt(elQty.value, 10) || 1) + parseInt(b.getAttribute("data-s"), 10);
      clampQty();
    });
    if (elQty) elQty.addEventListener("change", clampQty);

    /* další produkty — všechny vedou na detail */
    var rel = document.querySelector(".pd-rel");
    if (rel) {
      var all = (window.PM_SECONDHAND || []).filter(function (x) { return x.n !== d.n && x.img; }).slice(0, 4);
      rel.innerHTML = all.map(function (x) {
        var cat = window.PM_STAV_CAT ? window.PM_STAV_CAT(x.stav) : "";
        return '<a class="ncard shcard outline-glow" href="produkt.html?p=' + esc(x.slug || "rf-venue-combine4") + '">' +
          '<div class="nmedia shmedia">' + (cat ? '<span class="shflag">' + esc(cat) + "</span>" : "") +
          '<img src="' + esc(x.img) + '" alt="' + esc(x.n) + '" loading="lazy" decoding="async" /></div>' +
          '<div class="nbody">' +
          "<h3>" + esc(x.n) + "</h3>" +
          '<div class="shprice">' + esc(x.cena || "na dotaz") + "</div>" +
          '<div class="ngo"><span class="btn btn-ghost btn-sm">Prohlédnout<ui-icon class="btn-ico" name="ui-chevron-right" aria-hidden="true"></ui-icon></span></div>' +
          "</div></a>";
      }).join("");
    }

    var zoom = root.querySelector(".pd-zoom");
    if (zoom) zoom.addEventListener("click", function () { openBox(d.img, d.n); });

    if (window.UIArmGlow) window.UIArmGlow();
    if (window.UILoader && window.UILoader.scanGlow) window.UILoader.scanGlow();
  }

  /* zvětšená fotka — vlastní, aby fungovala i uvnitř dynamicky vykresleného detailu */
  var box = null;
  function openBox(src, alt) {
    if (!box) {
      box = document.createElement("div");
      box.className = "pdbox";
      box.innerHTML = '<figure class="pdbox-fig"><img alt="" /><figcaption class="pdbox-cap"></figcaption></figure>' +
        '<button type="button" class="pdbox-close" aria-label="Zavřít"><ui-icon name="ui-close" aria-hidden="true"></ui-icon></button>';
      document.body.appendChild(box);
      box.addEventListener("click", function (e) { if (e.target === box || e.target.closest(".pdbox-close")) closeBox(); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeBox(); });
    }
    box.querySelector("img").src = src;
    box.querySelector("img").alt = alt;
    box.querySelector(".pdbox-cap").textContent = alt;
    box.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }
  function closeBox() {
    if (!box) return;
    box.classList.remove("open");
    document.documentElement.style.overflow = "";
  }

  /* render musí proběhnout SYNCHRONNĚ (skript je na konci <body>, kořen už existuje),
     aby lightbox v site.js našel [data-lightbox] — ten se váže při svém načtení. */
  document.querySelectorAll(".pd-root").forEach(build);
})();
