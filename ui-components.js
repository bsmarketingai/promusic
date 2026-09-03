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
      node.innerHTML = label + (icon ? '<span class="btn-i">' + icon + "</span>" : "");
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

  var defs = {
    "ui-button": UIButton, "ui-input": UIInput, "ui-search": UISearch,
    "ui-dropdown": UIDropdown, "ui-lang-switch": UILangSwitch,
    "ui-tag": UITag, "ui-chip": UIChip, "ui-card": UICard,
    "ui-header": UIHeader, "ui-footer": UIFooter, "ui-mobile-menu": UIMobileMenu
  };
  Object.keys(defs).forEach(function (k) { if (!customElements.get(k)) customElements.define(k, defs[k]); });

  /* globální glow pro cokoli s .outline-glow (i staticky psané) */
  function armAll() {
    document.querySelectorAll(".outline-glow,.btn,.chip-filter,.ui-control,.ui-search,.ui-dd-btn").forEach(glow);
  }
  if (document.readyState !== "loading") armAll();
  else document.addEventListener("DOMContentLoaded", armAll);
  window.UIArmGlow = armAll;
})();
