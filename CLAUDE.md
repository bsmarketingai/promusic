# PRO MUSIC — prezentační web (handoff / kontext projektu)

> Tento soubor je shrnutí pro pokračování v novém chatu. Drž se ho, ať se neladíme znovu od nuly.

## O co jde
Tvoříme **nový prezentační web** firmy **PRO MUSIC, s.r.o.** (audio/light technika, Trutnov, od 1997).
Cíl: ukázat, že jsou **velcí hráči se světovým dosahem** — zvučí/osvětlují největší koncerty (Rammstein, Ed Sheeran, Eurovize) a dělají špičkové pevné instalace (divadla, arény). **Není to eshop**, je to prezentace příběhu, úspěchů a dovedností. Důraz na **portfolio**.

Aktuální fáze: **wireframy** (nízkodetailní náčrtkový styl), ne hi-fi. Stávající web klienta: https://promusic.cz/

## Potvrzené zadání (z dotazníků)
- **Počet směrů:** nakonec pracujeme na **jedné verzi** (Směr A — Showreel/Cinematic). Uživatel řekl „pracuj jen na jedné verzi".
- **Hero:** velká fotka koncertu + silný claim (ponechat).
- **Tón:** tmavý, koncertní, dramatický. **100% dark mode** (světlý jen jako náhledový tweak).
- **Důraz příběhu:** technologie & know-how (L-ISA, L-Acoustics Ambiance).
- **Jazyk:** dvojjazyčně CZ + EN (přepínač v navigaci, zatím jen UI prvek).
- **Cílovka:** divadla & kulturní/společenské prostory, pořadatelé koncertů/festivalů, rentalové/produkční firmy, architekti & projektanti, zvukaři & LD, vedení měst/veřejný sektor.
- **Hlavní CTA:** přihlásit se na školení (PRO MUSIC Academy).
- **Loga:** jen **monochromatická bílá**. Rozsah = značky + Partner Program + reference.
- **Must-have:** dark mode, velké fotky, práce s videem, showreel, silné hlášky, silná typografie, motion design, parallax.
- **Míra animací:** uživatel nově upřesnil → **STŘEDNĚ, jemné fade/parallax** (ubrat z dosavadního „hodně motion": zoom/stagger/blur byly možná příliš agresivní — zjemnit).

## ⚠️ NEVYŘÍZENÉ ÚKOLY (priorita)
1. **Headery na bezpatkové moderní písmo** (typu **Inter / Helvetica**). Teď jsou nadpisy v `Caveat` (rukopis) — uživatel chce moderní sans-serif na headery. Pozn.: brand guide obecně varuje před Inter jako „AI slop", ale **zde to klient explicitně chce** → respektovat. Zvážit Helvetica/Helvetica Neue, Archivo, nebo Inter dle přání. Aplikovat na `.hand` nadpisy / `.disp` / case-study leady — ale promyslet, ať to neztratí charakter (možná ponechat `Space Mono` na štítcích/labelech).
2. **Zjemnit motion** na „středně" (viz výše) — méně zoomu/stagger/blur, spíš jen fade-up + lehký parallax.
3. **Case study Ed Sheeran** — rozpracováno (`wireframe-ed-sheeran.html` + `wf-casestudy.jsx`). Dotáhnout.

## Soubory v projektu
**Hlavní deliverables (HTML):**
- `wireframy-webu.html` — homepage wireframe (Směr A). React+Babel, načítá `wf-style.css`, `wf-shared.jsx`, `wf-directionA.jsx`, app shell inline.
- `wireframe-ed-sheeran.html` — case study stránka (načítá `wf-casestudy.jsx`).
- `nahled-vybrane-realizace.html` — mobilní reflow ukázka.
- `wireframy-webu-print.html` — tisková verze.
- `band-demo.html` — pomocná ukázka.

**Sdílené zdroje:**
- `wf-style.css` — VŠECHEN CSS (sketch systém + sekce + case study + mega footer). Bumpuje se `?v=N` v `<link>`.
- `wf-shared.jsx` — sdílené primitivy: `Tag, Mtag, Reveal, LogoWall, Ph, Img, Lines, Btn, Chip, Stat, Slab, Note, WFNav, WFFoot`. Exportované přes `Object.assign(window, …)`.
- `wf-directionA.jsx` — homepage sekce (`DirectionA`, `FbBand`, `RefCol`, `RefTile`).
- `wf-casestudy.jsx` — case study komponenta (`CaseStudy`).
- `tweaks-panel.jsx` — starter Tweaks panel.

**Research (čti pro obsah):**
- `research/promusic-reserse.md` — kompletní rešerše firmy (historie, služby, reference, tón).
- `research/znacky-a-reference.md` — inventář VŠECH značek (rozdělené Pro Audio/Light/Data…), Partner Program vs. reference, vyjasnění log.
- `research/layout-responzivita.md` — full-bleed vs. container strategie + breakpointy + reflow pravidla.
- `research/menu-prace-vs-instalace.md` — struktura menu.

**Fotky (reálné, v `assets/projekty/`):**
- `ed-sheeran/` — stage-modra, sing-pultiky, cervena-show, rig-detail, ohnostroj (Mathematics Tour, Cardiff, foto Ralph Larmann).
- `djkt-plzen/` — array-detail, sal-pohled, array-strop, rig-svetla, budova-otvory, budova-roh (L-Acoustics Ambiance).
- `steel-arena/` — montaz-rigger, arena-kostra, kostka-led, projekce-led, projekce-barvy (Ayrton Domino Profile, Košice).

## Designový systém (aktuální stav wireframu)
- **Náčrtkový/sketch styl:** wobbly border-radius rámečky, čárkované linky, „greeked" textové linky (`.tl`), placeholder boxy (`Ph`) se šrafováním, rukopisné anotace s šipkami (`Note`), motion-tagy (`Mtag`: ✦ MOTION, ⇅ parallax, ⊕ zoom, ⏵ VIDEO).
- **Barvy (dark-first):** `--paper:#100f0d` (pozadí), `--ink:#ece6da` (text), `--ink-soft:#857e72`, `--accent:#e0542b` (oranžová, laditelná v Tweaks: oranžová/modrá/zelená/magenta), `--grayfill:#221f1a`. Světlý režim = `.app.light`.
- **Písma (TEĎ, před změnou):** `Caveat` (rukopis na nadpisy/.hand), `Space Mono` (mono body, labely, štítky), `Gloria Hallelujah` (brandmark). → **Headery se mění na sans-serif (viz úkol 1).**
- **Tweaks panel:** akcentní barva, velikost typografie (`--type`), hustota (`--sp`), styl hero (Cinematic/Editorial → `--scrim`), světlý režim, **Layout vodítka** (`.guide` → ukazuje container hranice + full-bleed štítky).
- **Motion engine** (v app shellu `wireframy-webu.html`): IntersectionObserver přidává `.in` na `.reveal` a `[data-stagger]`; scroll handler řeší `[data-par]` (parallax) a `[data-zoom]` (zoom-on-scroll). Respektuje `prefers-reduced-motion`.

## Struktura homepage (Směr A, shora dolů)
1. **Hero** — full-bleed video/foto + claim „Zvuk, který cítíš v hrudi." + nav (CZ/EN, CTA Školení) + play button.
2. **Čísla** (boxed, stagger) — 28 let, 17 zemí, 20+ značek, 3× L-ISA.
3. **Technologie** (full-bleed split) — L-ISA & Ambiance, text + vytékající foto se zoomem.
4. **Portfolio bandy** (full-bleed, stagger) — Ed Sheeran, Steel Aréna, DJKT; mono loga na fotkách.
5. **Statement** (full-bleed) — foto + obří typo „Když zhasnou světla, začíná naše práce." + mono logo.
6. **Showreel** (boxed, asymetrický grid) — video klipy.
7. **Značky** (boxed) — mono bílá logo-wall.
8. **Partner Program** (boxed) — placeholder loga partnerů.
9. **Reference** (boxed) — čísla + filtry + foto-dlaždice (mozaika) + logo-wall referencí.
10. **Academy / proč školení** (boxed) — 3 důvody, pro koho, jak funguje, cena/dotace.
11. **CTA band** — školení.
12. **Mega footer.**

## Klíčová fakta o firmě (pro obsah)
- Založeno 1997, Trutnov. Realizace „na klíč": návrh → 3D simulace (SoundVision) → instalace → servis → školení.
- Vlajkové značky (výhradní distribuce): **L-Acoustics** (L-ISA, Ambiance), **DiGiCo**, **Ayrton**. Dále ChamSys, Audio-Technica, Luminex, DirectOut, Naostage, Yamaha, High End, Antelope, Waves, ASL, KLANG, Smaart…
- TOP reference: Rammstein 2019 (34 koncertů/17 zemí), Ed Sheeran Mathematics Tour (Ayrton rig), Eurovize 2024, Scorpions, TOPFEST; instalace: Hudební divadlo Karlín (největší L-ISA v ČR), Nová scéna DJKT Plzeň (světová premiéra Ambiance), UFFO Trutnov, Steel Aréna Košice, Český rozhlas (DiGiCo Quantum 338).

## Pracovní poznámky
- Náhledový **screenshot nástroj snímá foto-sekce s transformy černě** (artefakt html-to-image). Ověřuj přes `eval_js_user_view` / `screenshot_user_view`, ne přes save_screenshot.
- Po editaci `.jsx`/`.css` **bumpni `?v=N`** v `<link>`/`<script>` a vynuť `location.reload(true)`, jinak cache drží starou verzi.
- Názvy s pomlčkou/diakritikou v `grep` `path` občas neprojdou — používej čtení souboru.
