# PRO MUSIC — prezentační web

Nový prezentační web **PRO MUSIC, s.r.o.** (profesionální audio / light / zobrazovací technika, Trutnov, od 1997).
Statický web, bez build kroku — nasazuje se přímo na **GitHub Pages**.

> **Pozicioning:** „Z neviditelné odbornosti čitelná autorita." Není to eshop — je to důkazová výkladní skříň (reference, technologie, know-how) vedoucí ke kvalifikovanému kontaktu.

---

## Struktura souborů

### Stránky (HTML)
| soubor | co to je |
|---|---|
| `index.html` | Homepage |
| `realizace-ed-sheeran.html` | Case study — Ed Sheeran, Mathematics Tour |
| `instalace-hd-karlin-schema.html` | Case study — HD Karlín, vč. interaktivního schématu |
| `instalace-kulturni-domy-saly-divadla.html` | Segmentová landing — kulturní domy, sály, divadla |
| `technologie-schema-ozvuceni.html` | Vysvětlovací stránka — schéma ozvučení |
| `znacky.html` | Značky, které zastupujeme |
| `design-system.html` | Živý přehled design systému (interní) |
| `guidelines/*.html` | Specimen karty design systému (interní) |

### Styly
| soubor | co to je |
|---|---|
| `styles.css` | Vstupní bod — `@import`uje `tokens/*` |
| `tokens/colors.css` · `typography.css` · `spacing.css` · `motion.css` · `fonts.css` · `breakpoints.css` · `theme.css` | Design tokeny (CSS proměnné) |
| `ui.css` | Veškerá komponentní & sekční vrstva (jeden soubor, sekce oddělené komentářovými bloky) |

### Skripty
| soubor | co to je |
|---|---|
| `ui-theme.js` | Nastaví téma před vykreslením (zabrání probliknutí) |
| `ui-components.js` | Web components: `ui-button`, `ui-input`, `ui-dropdown`, `ui-search`, `ui-chip`, `ui-tag`, `ui-card`, `ui-lang-switch` |
| `ui-icons.js` | Kurátorská sada 103 ikon + `<ui-icon>`. **Jediný povolený zdroj ikon.** |
| `ui-loader.js` | Vkládá hlavičku / mobilní menu / patičku na každou stránku |
| `ui-header.html` · `ui-mobile-menu.html` · `ui-footer.html` | Markup těch tří sdílených bloků (jediný zdroj pravdy; samostatně otevřené fungují jako náhled) |
| `site.js` | Globální chování: reveal on scroll, parallax, tilt, outline-glow, coverflow karusel |
| `home-content.js` | Obsah sekcí homepage (vykresluje se z JS) |
| `karlin-schema.js` | Interaktivní schéma ozvučení (Karlín) |
| `page-transition.js` | Přechod mezi stránkami — „pódiové světlo" |

### Assety a podklady
- `assets/brand/promusic-logo.png` — logo (pro produkci dodat SVG)
- `assets/projekty/{ed-sheeran,djkt-plzen,steel-arena,karlin}/*` — fotky realizací
- `uploads/*` — surové materiály od klienta (loga značek, fotky) — **není součástí webu**
- `research/*.md` — rešerše a strategie (firma, značky, layout, menu, positioning)

### Pořadí načítání na stránce
```html
<script src="ui-theme.js"></script>          <!-- v <head>, před CSS -->
<link rel="stylesheet" href="styles.css" />  <!-- tokeny -->
<link rel="stylesheet" href="ui.css" />      <!-- komponenty -->
...
<script src="ui-icons.js"></script>          <!-- na konci <body> -->
<script src="ui-components.js"></script>
<script src="ui-loader.js"></script>
<script src="site.js"></script>
<script src="page-transition.js"></script>
```

---

## CONTENT FUNDAMENTALS (jak psát)
- **Jazyk:** česky (web dvojjazyčně CZ/EN, přepínač). Tykání v CTA („Probrat projekt", „Vyber termín") — přímé, sebevědomé, ne familiární.
- **Tón:** věcný, profesionální, bez superlativů bez důkazu. NE „jsme nejlepší / jediní / lídr". Čísla ano (jsou doložená): „28 let", „17 zemí", „3× L-ISA".
- **Eyebrow / štítky:** UPPERCASE mono, krátké („PROFESIONÁLNÍ AUDIO · OD 1997").
- **Claimy:** krátké, smyslové, konkrétní v podtitulku. Hero: „Zvuk, který cítíš v hrudi."
- **CTA:** kvalifikovaný kontakt, ne „Napište nám". Primární: **Probrat projekt**.
- **Reference jako důkaz:** ne „stalo se", ale *co se řešilo · proč právě tak · jakou roli měl PRO MUSIC*.
- **Emoji:** nepoužívat. Akcentní glyfy: ★ → ▶ ▾ ✕.

## VISUAL FOUNDATIONS
- **Režim:** 100% dark. Světlý režim mimo rozsah.
- **Barvy:** teplá černá `#070605` → paper `#100f0d` → povrchy `#1a1813 / #242019 / #2f2a22`; text teplá běl `#ece6da` ve 4 hladinách; akcent **oranžová `#e0542b`** + hover `#f2693f`, press `#b83f1c`, tint 10 %.
- **Typografie:** Display = **Archivo** 800, těsný tracking. Body = **IBM Plex Sans**. Mono = **Space Mono** (eyebrow, štítky, data).
- **Pozadí:** velké fotky full-bleed s tmavým scrimem. Žádné gradientové „AI" plochy.
- **Motiv:** oranžová **zvuková vlna (sinusoida)** ze značky → dělič sekcí, akcentní linka.
- **Radii:** karty 12–18 px, pill tlačítka/chips. **Stíny:** decentní pro dark + accent glow.
- **Hover:** `outline-glow` — 1px gradientní okraj se světlem sledujícím kurzor. Napojuje `site.js` automaticky.
- **Motion:** STŘEDNĚ — jemné fade-up (22 px), lehký parallax (strop 14 %). Easing `cubic-bezier(.2,.7,.2,1)`. Vždy `prefers-reduced-motion`.

## POZOR: tokeny se do styles.css přenášejí RUČNĚ (KONKATENACE)
`styles.css` **není** `@import` souborů `tokens/*.css` — je to jejich **slitá kopie**, oddělená banner komentáři (`/* ══ tokens/spacing.css ══ */`). Prohlížeč načítá **jen** `styles.css` a `ui.css`; adresář `tokens/` se nestahuje.

**Nový token proto musíš zapsat na DVĚ místa:** do `tokens/<soubor>.css` (zdroj pravdy pro čtení) i do odpovídající sekce ve `styles.css` (co reálně platí v prohlížeči). Jinak je token mrtvý a funguje jen fallback ve `var(--x, fallback)`.

Ověření po přidání: `getComputedStyle(document.documentElement).getPropertyValue("--muj-token")` musí vrátit hodnotu, ne prázdný string.

## IKONOGRAFIE
- **Kurátorská sada 103 ikon v `ui-icons.js`** — jediný povolený zdroj. Do stránek se nekreslí vlastní SVG; když ikona chybí, doplní se do sady.
- Použití: `<ui-icon name="audio-mixer"></ui-icon>`. Dědí `font-size` a `currentColor`. Velikosti `.icon-sm/md/lg/xl`, nebo `size="26"`. V kroužku `.icon-badge`. V JS šablonách `pmIcon("ui-play")`.
- Kategorie: `ui-` (22) · `shop-` (16) · `audio-` (15) · `service-` (11) · `academy-` (8) · `light-` (7) · `contact-` (6) · `venue-` (5) · `video-` (5) · `social-` (4) · `stage-` (4).
- Přístupnost: ikona bez textu vedle potřebuje `label="…"`, jinak zůstane `aria-hidden`.
- **Váha tahu:** sada míchá plné a obrysové ikony. Obrysové jdou na `stroke-width: 1.125` (= 24 × 12/256), aby měly shodnou optickou váhu jako plné. Nová obrysová ikona musí dodržet stejnou hodnotu — a ověř to měřením, ne okem (světlý tah na tmavém pozadí působí silněji, než je).
- **Bez icon fontu.** Textové glyfy zůstávají jen jako akcenty v textu: → ★ ·
- Loga značek: **monochromatická bílá** wordmarky v logo-wallu; ★ u vlajkových (L-Acoustics, DiGiCo, Ayrton).
- Sociální sítě: `social-facebook/instagram/youtube/linkedin` ze sady. Pro produkci ověřit proti brand guidelines dané sítě.
- **Zdrojová SVG** žijí v `uploads/pm-*.svg` (surová, s metadaty). `ui-icons.js` je jejich vyčištěná destilace — needituj ho ručně, regeneruj ze zdrojů.

## Breakpointy
XXS 0–419 · XS 420–549 · S 550–819 · M 820–999 (hamburger) · L 1000–1149 · XL 1150–1559 · XXL 1560+

---

## K doplnění
- **Fonty:** zatím Google Fonts CDN — pro produkci self-hostovat (woff2).
- **Logo:** dodat vektor (SVG) + čistě bílou variantu.
- **Case study HD Karlín** v plné podobě (existuje jen varianta se schématem).
- **Fotky:** zatím 4 projekty — pro plný web doplnit knihovnu.
- **EN mutace:** přepínač je zatím jen UI prvek bez obsahu.
