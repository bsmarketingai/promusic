# PRO MUSIC — Design systém

Vizuální základ pro nový prezentační web firmy **PRO MUSIC, s.r.o.** (profesionální audio / light / zobrazovací technika, Trutnov, od 1997) a pro budoucí stránky.

> **Pozicioning:** „Z neviditelné odbornosti čitelná autorita." Skromnost ve výrazu, síla v důkazech. Není to eshop — je to důkazová výkladní skříň (reference, technologie, know-how) vedoucí ke kvalifikovanému kontaktu.

## Zdroje
- Stávající web klienta: https://promusic.cz/
- Logo: dodáno klientem (`assets/brand/promusic-logo.png`)
- Fotografie realizací: dodány klientem (`assets/projekty/*`) — Ed Sheeran (Mathematics Tour, foto Ralph Larmann), DJKT Plzeň (L-Acoustics Ambiance), Steel Aréna Košice (Ayrton), HD Karlín (DiGiCo)
- Rešerše a strategie: `research/*` (firma, značky, layout/responzivita, menu, brand positioning)

## Jak to funguje
Konzumenti linkují jediný soubor **`styles.css`**, který `@import`uje všechny tokeny:
```html
<link rel="stylesheet" href="styles.css" />
```
- `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` · `tokens/motion.css` · `tokens/fonts.css`
- Komponentní/sekční vrstva pro hi-fi web: `hifi.css` (+ `hifi-directions.css` pro skiny směrů).

## CONTENT FUNDAMENTALS (jak psát)
- **Jazyk:** česky (web dvojjazyčně CZ/EN, přepínač). Tykání produktu uživateli v CTA („Probrat projekt", „Vyber termín") — přímé, sebevědomé, ne familiární.
- **Tón:** věcný, profesionální, bez superlativů bez důkazu. NE „jsme nejlepší / jediní / lídr" bez doložení. Čísla ano (jsou doložená): „28 let", „17 zemí", „3× L-ISA".
- **Eyebrow / štítky:** UPPERCASE mono, krátké („PROFESIONÁLNÍ AUDIO · OD 1997", „TURNÉ / SVĚTLA").
- **Claimy:** krátké, smyslové, ale konkrétní v podtitulku. Hero: „Zvuk, který cítíš v hrudi." + věcný perex „Dodáváme špičkové technologie — a rozumíme tomu, aby to celé fungovalo."
- **CTA:** kvalifikovaný kontakt, ne „Napište nám". Primární: **Probrat projekt**. Dále: Kontaktovat specialistu, Domluvit konzultaci, Domluvit školení, Řešit servis.
- **Reference jako důkaz:** ne „stalo se", ale *co se řešilo · proč právě tak · jakou roli měl PRO MUSIC*.
- **Emoji:** nepoužívat. Akcentní glyfy: ★ (vlajkové značky), → ▶ ▾ (akce/směr).

## VISUAL FOUNDATIONS
- **Režim:** 100% dark. Logo i UI vždy na tmavém pozadí. Světlý režim mimo rozsah.
- **Barvy:** teplá černá `#070605` → paper `#100f0d` → povrchy `#1a1813 / #242019 / #2f2a22`; text teplá běl `#ece6da` ve 4 hladinách; akcent **oranžová `#e0542b`** (ze zvukové vlny v logu) + hover `#f2693f`, press `#b83f1c`, tint 10 %.
- **Typografie:** Display = **Inter** 800/900, těsný tracking (−0.035em), line-height 0.88 — moderní, až artová. Body = **IBM Plex Sans** (technický humanistický grotesk, plná čeština). Mono = **Space Mono** (eyebrow, štítky, data).
- **Pozadí:** velké fotky (koncerty, instalace), full-bleed s tmavým scrimem (gradient). Žádné gradientové „AI" plochy; jen jemný radiální accent-tint u CTA panelu.
- **Motiv:** oranžová **zvuková vlna (sinusoida)** ze značky → dělič sekcí, akcentní linka, animovaný prvek.
- **Radii:** karty 12–18 px, pill tlačítka/chips. **Stíny:** decentní pro dark (sm/md/lg + accent glow).
- **Hover:** karty lehký lift (−3px) + akcentní border; tlačítka primary → světlejší oranžová + glow; ghost → akcentní border/text. **Press:** tmavší oranžová.
- **Motion:** STŘEDNĚ — jemné fade-up (translateY 22px), lehký parallax (strop 14 %), pointer „švenk" na foto. Easing `cubic-bezier(.2,.7,.2,1)`. Vždy respektovat `prefers-reduced-motion`.
- **Imagery vibe:** koncertní, teplá/dramatická, mírně ztlumený jas + scrim pro čitelnost textu.

## ICONOGRAPHY
- Bez icon fontu. Akce řešeny **textovými glyfy / unicode**: → (akce), ▶ (přehrát), ▾ (dropdown), ★ (vlajková značka), ✕ (zavřít), ⇅/⊕ (motion anotace ve wireframech).
- Loga značek/referencí: **monochromatická bílá** (wordmarky), v mřížce logo-wall; ★ u vlajkových (L-Acoustics, DiGiCo, Ayrton).
- Brand logo: bílý wordmark „PRO MUSIC" + oranžová vlna — `assets/brand/promusic-logo.png`. Pro produkci dodat vektor (SVG) a self-hostované fonty.

## INDEX / manifest
**Foundations**
- `styles.css` — vstupní bod (@import)
- `tokens/` — colors, typography, spacing, motion, fonts
- `design-system.html` — jednostránkový přehled foundations (živý)
- `guidelines/*.html` — specimen karty (Design System záložka): barvy, typo, spacing, brand

**Hi-fi web (UI kit)**
- `hifi.css` — komponentní & sekční vrstva
- `hifi-directions.css` — skiny směrů (dir-a Cinematic / dir-b Editorial)
- `hifi-content.js` — sdílený obsah homepage + motion
- `hifi-A.html` / `index.html` — dva směry (celé stránky)
- `hifi-srovnani.html` — srovnání směrů vedle sebe

**Wireframy (předchozí fáze, nízkodetailní)**
- `wireframy-webu.html` (+ `wf-*.jsx/css`), case studies, mobilní náhledy

**Brand & assety**
- `assets/brand/promusic-logo.png`
- `assets/projekty/{ed-sheeran,djkt-plzen,steel-arena,karlin}/*`

## Caveats / k doplnění
- **Fonty:** zatím Google Fonts CDN — pro produkci self-hostovat (woff2).
- **Logo:** dodat vektor (SVG), ideálně i čistě bílou variantu pro drobné použití.
- **Komponenty:** hi-fi komponentní vrstva žije v `hifi.css`; formální React komponenty (`.jsx` + `.d.ts`) pro reusable bundle teprve doplníme (po výběru směru).
- **Fotky:** zatím 4 projekty — pro plný web doplnit širší knihovnu.
