/* PRO MUSIC — UI KOMPONENTY (web components, light DOM)
   Prefix ui- · light DOM = platí na ně globální CSS ze design systému.
   Import: <script src="ui-components.js?v=1"></script>
   Pak stačí v HTML psát <ui-button variant="primary">Text</ui-button> atd. */
(function () {
  "use strict";

  /* ---------- sdílený outline-glow pointer tracking ---------- */
  function glow(el) {
    if (el.__glow) return; el.__glow = true;
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
    });
  }
  function attr(el, name, def) { var v = el.getAttribute(name); return v === null ? def : v; }

  /* ================= ui-button ================= */
  class UIButton extends HTMLElement {
    connectedCallback() {
      if (this.__b) return;
      var variant = attr(this, "variant", "primary");   // primary | ghost | link
      var size = attr(this, "size", "md");              // md | lg
      var href = this.getAttribute("href");
      var icon = attr(this, "icon", "");
      var label = this.textContent.trim();
      var cls = "btn btn-" + variant + (size === "lg" ? " btn-lg" : "");
      var tag = href ? "a" : "button";
      var node = document.createElement(tag);
      node.className = cls;
      if (href) node.setAttribute("href", href);
      if (this.hasAttribute("disabled")) { node.setAttribute("disabled", ""); node.setAttribute("aria-disabled", "true"); }
      /* Koncová šipka / play patří ikonografii, ne textu. Autor může psát
         „Probrat projekt →“ i „Probrat projekt“ + arrow="right" — obojí
         skončí jako <ui-icon> z knihovny. Ad hoc znaky se do stránek nepíšou. */
      var TRAIL = { "\u2192": "ui-arrow-right", "\u2190": "ui-arrow-left",
                    "\u2197": "ui-arrow-up-right", "\u25b6": "ui-play" };
      var trail = this.getAttribute("arrow");
      if (trail) trail = { right: "ui-arrow-right", left: "ui-arrow-left",
                           up: "ui-arrow-up-right", play: "ui-play" }[trail] || null;
      var last = label.slice(-1);
      if (!trail && TRAIL[last]) { trail = TRAIL[last]; label = label.slice(0, -1).trim(); }
      node.innerHTML = label +
        (trail ? '<ui-icon class="btn-ico" name="' + trail + '" aria-hidden="true"></ui-icon>' : "") +
        (icon ? '<span class="btn-i">' + icon + "</span>" : "");
      this.textContent = ""; this.appendChild(node);
      this.__b = node; glow(node);
    }
  }

  /* ================= ui-input ================= */
  class UIInput extends HTMLElement {
    connectedCallback() {
      if (this.__b) return; this.__b = 1;
      var label = attr(this, "label", "");
      var ph = attr(this, "placeholder", "");
      var type = attr(this, "type", "text");
      var id = "ui-i-" + Math.random().toString(36).slice(2, 7);
      var multi = type === "textarea";
      this.innerHTML =
        '<div class="ui-field">' +
        (label ? '<label class="ui-label" for="' + id + '">' + label + "</label>" : "") +
        (multi
          ? '<textarea id="' + id + '" class="ui-control" rows="4" placeholder="' + ph + '"></textarea>'
          : '<input id="' + id + '" class="ui-control" type="' + type + '" placeholder="' + ph + '" />') +
        (this.getAttribute("hint") ? '<span class="ui-hint">' + this.getAttribute("hint") + "</span>" : "") +
        "</div>";
      glow(this.querySelector(".ui-control"));
    }
  }

  /* ================= ui-search ================= */
  class UISearch extends HTMLElement {
    connectedCallback() {
      if (this.__b) return; this.__b = 1;
      var ph = attr(this, "placeholder", "Hledat realizace, značky, technologie…");
      this.innerHTML =
        '<form class="ui-search" role="search">' +
        '<span class="ui-search-ico" aria-hidden="true">⌕</span>' +
        '<input class="ui-search-input" type="search" placeholder="' + ph + '" aria-label="Hledat" />' +
        '<kbd class="ui-search-kbd">/</kbd>' +
        "</form>";
      var form = this.querySelector(".ui-search");
      glow(form);
      form.addEventListener("submit", function (e) { e.preventDefault(); });
    }
  }

  /* ================= ui-dropdown ================= */
  class UIDropdown extends HTMLElement {
    connectedCallback() {
      if (this.__b) return; this.__b = 1;
      var label = attr(this, "label", "Vyberte");
      var items = attr(this, "items", "").split("|").filter(Boolean);
      this.innerHTML =
        '<div class="ui-dd">' +
        '<button class="ui-dd-btn" aria-expanded="false"><span class="ui-dd-val">' + label + '</span><span class="ui-dd-caret">▾</span></button>' +
        '<div class="ui-dd-menu" role="listbox">' +
        items.map(function (it) { return '<button class="ui-dd-item" role="option">' + it + "</button>"; }).join("") +
        "</div></div>";
      var wrap = this.querySelector(".ui-dd");
      var btn = this.querySelector(".ui-dd-btn");
      var val = this.querySelector(".ui-dd-val");
      glow(btn);
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = wrap.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      this.querySelectorAll(".ui-dd-item").forEach(function (it) {
        it.addEventListener("click", function () {
          val.textContent = it.textContent;
          wrap.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
          wrap.dispatchEvent(new CustomEvent("ui-change", { bubbles: true, detail: it.textContent }));
        });
      });
      document.addEventListener("click", function () { wrap.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); });
    }
  }

  /* ================= ui-lang-switch ================= */
  class UILangSwitch extends HTMLElement {
    connectedCallback() {
      if (this.__b) return; this.__b = 1;
      var langs = attr(this, "langs", "CZ|EN").split("|");
      var active = attr(this, "active", langs[0]);
      this.innerHTML = '<div class="nav-czen" role="group" aria-label="Jazyk">' +
        langs.map(function (l) { return '<span' + (l === active ? ' class="on"' : "") + ' role="button" tabindex="0">' + l + "</span>"; }).join("") +
        "</div>";
      var spans = this.querySelectorAll("span");
      spans.forEach(function (s) {
        s.addEventListener("click", function () {
          spans.forEach(function (x) { x.classList.remove("on"); });
          s.classList.add("on");
          s.dispatchEvent(new CustomEvent("ui-lang", { bubbles: true, detail: s.textContent }));
        });
      });
    }
  }

  /* ================= ui-tag / ui-chip ================= */
  class UITag extends HTMLElement {
    connectedCallback() {
      if (this.__b) return; this.__b = 1;
      var solid = this.hasAttribute("solid");
      var t = this.textContent.trim();
      this.innerHTML = '<span class="tag' + (solid ? " tag-solid" : "") + '">' + t + "</span>";
    }
  }
  class UIChip extends HTMLElement {
    connectedCallback() {
      if (this.__b) return; this.__b = 1;
      var t = this.textContent.trim();
      var active = this.hasAttribute("active");
      this.innerHTML = '<button class="chip chip-filter' + (active ? " is-active" : "") + '">' + t + "</button>";
      glow(this.querySelector("button"));
    }
  }

  /* ================= ui-card ================= */
  class UICard extends HTMLElement {
    connectedCallback() {
      if (this.__b) return; this.__b = 1;
      var title = attr(this, "title", "");
      var kicker = attr(this, "kicker", "");
      var body = this.innerHTML;
      var href = this.getAttribute("href");
      var tag = href ? "a" : "div";
      this.innerHTML = "<" + tag + ' class="ui-card outline-glow"' + (href ? ' href="' + href + '"' : "") + ">" +
        (kicker ? '<span class="ui-card-kicker">' + kicker + "</span>" : "") +
        (title ? "<h3>" + title + "</h3>" : "") +
        '<div class="ui-card-body">' + body + "</div>" +
        "</" + tag + ">";
      glow(this.querySelector(".ui-card"));
    }
  }

  /* ================= ui-header / ui-footer / ui-mobile-menu =================
     Delegují na sdílený builder v pm-nav.js (jeden zdroj pravdy). */
  function mountFromNav(host, kind) {
    if (!window.PMNav || !window.PMNav.build) {
      host.setAttribute("data-pending", kind); return false;
    }
    window.PMNav.build(kind, host);
    host.removeAttribute("data-pending");
    return true;
  }
  class UIHeader extends HTMLElement { connectedCallback(){ mountFromNav(this,"header"); } }
  class UIFooter extends HTMLElement { connectedCallback(){ mountFromNav(this,"footer"); } }
  class UIMobileMenu extends HTMLElement { connectedCallback(){ mountFromNav(this,"mobile"); } }

  /* pokud pm-nav.js dorazí později, domountuj */
  window.addEventListener("pm-nav-ready", function () {
    document.querySelectorAll("[data-pending]").forEach(function (h) {
      mountFromNav(h, h.getAttribute("data-pending"));
    });
  });

  /* ================= ui-stats / ui-stat =================
     Blok velkých čísel. Používá se na homepage i na case studies — stejné
     ražení, jiná data. Počet sloupců si komponenta spočítá z počtu položek,
     takže na stránkách nezůstávají inline grid-template-columns.

       <ui-stats>
         <ui-stat n="28" u="let">zkušeností od 1997</ui-stat>
         <ui-stat n="17">zemí Evropy</ui-stat>
       </ui-stats>

     n     = číslo (bílé)      u = jednotka nebo znak (oranžová, na účaří)
     obsah = popisek pod číslem
     compact = drobnější varianta do sekce Reference
  */
  class UIStat extends HTMLElement {
    connectedCallback() {
      if (this.__b) return; this.__b = 1;
      var n = this.getAttribute("n") || "";
      var u = this.getAttribute("u");
      var label = this.textContent.trim();
      this.className = "stat";
      /* Slova a znaky jako +, × sedí na účaří. Stupeň patří nahoru,
         jinak vypadá jako tečka za číslem („360.“). */
      var sup = u === "\u00b0" || u === "\u2032" || u === "\u2033";
      this.innerHTML = '<div class="n">' + n +
        (u ? '<span class="u' + (sup ? " u-sup" : "") + '">' + u + "</span>" : "") +
        '</div><div class="l">' + label + "</div>";
    }
  }
  class UIStats extends HTMLElement {
    connectedCallback() {
      if (this.__b) return; this.__b = 1;
      var kids = this.querySelectorAll("ui-stat").length;
      this.className = this.hasAttribute("compact") ? "stats refcounts" : "stats";
      this.setAttribute("data-stagger", "");
      if (kids) this.style.setProperty("--stat-cols", kids);
    }
  }

  /* ================= ui-live-card =================
     PARAMETROVÁ karta výpisu Live & turné. Hodnoty, nikdy věty.
     title · cat · year · place · tech="L-Acoustics K1|DiGiCo SD5"
     scale="34 koncertů|17 zemí" · world · img · href
     Původní dokumentace:
     Karta do výpisu Live & turné. Akce je hlavní hrdina → foto na plnou
     plochu, text v přesvitu. Parametry: kdo, kdy, jak velké to bylo.

       <ui-live-card title="Ed Sheeran" sub="Mathematics Tour" cat="Turné"
                     year="2022" scope="stadiony Evropy" role="Světla"
                     tech="Ayrton" img="…" href="…"></ui-live-card>

     role / tech = seznam oddělený |    img="" → placeholder pro fotku
     href="" → karta bez odkazu (case study ještě není)
  */
  function pills(v, cls) {
    return (v || "").split("|").filter(Boolean)
      .map(function (x) { return '<span class="' + cls + '">' + x + "</span>"; }).join("");
  }
  /* placeholder „—“ v datech znamená „nevíme“ — do UI nepatří (ani u live, ani u inst karty) */
  function val(v) { return v && v !== "\u2014" && v !== "—" ? v : ""; }
  function media(img, alt) {
    return img
      ? '<img src="' + img + '" alt="' + (alt || "") + '" loading="lazy" />'
      : '<span class="pcard-nophoto">foto doplníme</span>';
  }
  class UILiveCard extends HTMLElement {
    connectedCallback() {
      if (this.__b) return; this.__b = 1;
      var href = attr(this, "href", ""), tag = href ? "a" : "div";
      this.innerHTML = "<" + tag + ' class="pcard pcard-live' + (href ? ' outline-glow" href="' + href + '"' : '"') + ">" +
        '<span class="pcard-media">' + media(attr(this, "img", ""), attr(this, "title", "")) + "</span>" +
        '<span class="pcard-top"><span class="tag tag-solid">' + attr(this, "cat", "") + "</span>" +
          (this.hasAttribute("world") ? '<span class="pcard-world">ze světa</span>' : "") +
          (val(attr(this, "year", "")) ? '<span class="pcard-year">' + val(attr(this, "year", "")) + "</span>" : "") + "</span>" +
        '<span class="pcard-body">' +
          "<h3>" + attr(this, "title", "") + "</h3>" +
          (val(attr(this, "place", "")) ? '<span class="pcard-place">' + val(attr(this, "place", "")) + "</span>" : "") +
          '<span class="pcard-pills">' + pills(attr(this, "scale", ""), "pcard-role") + pills(attr(this, "tech", ""), "pcard-tech") + "</span>" +
          (href ? '<span class="pcard-go">Case study<ui-icon class="btn-ico" name="ui-arrow-right" aria-hidden="true"></ui-icon></span>' : "") +
        "</span></" + tag + ">";
      if (href) glow(this.firstElementChild);
    }
  }

  /* ================= ui-inst-card =================
     Karta do výpisu Stálé instalace. Tady rozhoduje prostor a parametry
     systému → foto nahoře, pod ním katalogový panel se specifikací.

       <ui-inst-card title="Hudební divadlo Karlín" cat="Divadla & sály"
                     city="Praha" year="2021" system="L-Acoustics L-ISA"
                     cap="1 000 míst" scope="Zvuk|Světla" img="…" href="…">
         Největší instalace L-ISA v ČR.
       </ui-inst-card>
  */
  class UIInstCard extends HTMLElement {
    connectedCallback() {
      if (this.__b) return; this.__b = 1;
      var href = attr(this, "href", ""), tag = href ? "a" : "div";
      var meta = [attr(this, "city", ""), attr(this, "year", "")].map(val).filter(Boolean).join(" · ");
      var cap = val(attr(this, "cap", ""));
      this.innerHTML = "<" + tag + ' class="pcard pcard-inst' + (href ? ' outline-glow" href="' + href + '"' : '"') + ">" +
        '<span class="pcard-media">' + media(attr(this, "img", ""), attr(this, "title", "")) +
          '<span class="pcard-cat">' + attr(this, "cat", "") + "</span></span>" +
        '<span class="pcard-body">' +
          "<h3>" + attr(this, "title", "") + "</h3>" +
          (meta ? '<span class="pcard-place">' + meta + "</span>" : "") +
          '<span class="pcard-pills">' + (cap ? '<span class="pcard-role">' + cap + "</span>" : "") + pills(attr(this, "tech", ""), "pcard-tech") + "</span>" +
          (href ? '<span class="pcard-go">Case study<ui-icon class="btn-ico" name="ui-arrow-right" aria-hidden="true"></ui-icon></span>' : "") +
        "</span></" + tag + ">";
      if (href) glow(this.firstElementChild);
    }
  }

  var defs = {
    "ui-stats": UIStats, "ui-stat": UIStat,
    "ui-live-card": UILiveCard, "ui-inst-card": UIInstCard,
    "ui-button": UIButton, "ui-input": UIInput, "ui-search": UISearch,
    "ui-dropdown": UIDropdown, "ui-lang-switch": UILangSwitch,
    "ui-tag": UITag, "ui-chip": UIChip, "ui-card": UICard,
    "ui-header": UIHeader, "ui-footer": UIFooter, "ui-mobile-menu": UIMobileMenu
  };
  Object.keys(defs).forEach(function (k) { if (!customElements.get(k)) customElements.define(k, defs[k]); });

  /* globální glow pro cokoli s .outline-glow (i staticky psané) */
  function armAll() {
    document.querySelectorAll(".outline-glow,.btn,.chip-filter,.ui-control,.ui-search,.ui-dd-btn,.pcard,.pager-n,.pager-arrow").forEach(glow);
  }
  if (document.readyState !== "loading") armAll();
  else document.addEventListener("DOMContentLoaded", armAll);
  window.UIArmGlow = armAll;
})();
