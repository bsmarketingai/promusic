# PRO MUSIC — kontext projektu

> Shrnutí pro pokračování v novém chatu. Technický popis souborů žije v `readme.md` — ten je zdroj pravdy o struktuře, tenhle soubor o záměru a stavu.

## O co jde
Nový prezentační web **PRO MUSIC, s.r.o.** (audio/light technika, Trutnov, od 1997).
Cíl: ukázat firmu jako **velkého hráče se světovým dosahem** — zvučí/osvětlují největší koncerty (Rammstein, Ed Sheeran, Eurovize) a dělají špičkové pevné instalace (divadla, arény). **Není to eshop.** Důraz na portfolio a důkazy.
Stávající web klienta: https://promusic.cz/

**Fáze:** hi-fi web nad vlastním design systémem. Wireframová fáze je uzavřená a smazaná.
**Nasazení:** statika na GitHub Pages, žádný build krok.

## Potvrzené zadání
- **Tón:** tmavý, koncertní, dramatický. **100% dark mode.**
- **Hero:** velká fotka koncertu + silný claim.
- **Důraz příběhu:** technologie & know-how (L-ISA, L-Acoustics Ambiance).
- **Jazyk:** CZ + EN (přepínač zatím jen UI prvek).
- **Cílovka:** divadla a kulturní/společenské prostory, pořadatelé koncertů/festivalů, rentalové firmy, architekti & projektanti, zvukaři & LD, vedení měst / veřejný sektor.
- **Hlavní CTA:** Probrat projekt; sekundárně přihlášení na školení (PRO MUSIC Academy).
- **Loga značek:** jen **monochromatická bílá**.
- **Must-have:** dark mode, velké fotky, video/showreel, silné hlášky, silná typografie, motion, parallax.
- **Míra animací:** **STŘEDNĚ** — jemné fade-up + lehký parallax. Žádný agresivní zoom/blur/stagger.

## Klíčová fakta o firmě (pro obsah)
- Založeno 1997, Trutnov. Realizace na klíč: návrh → 3D simulace (SoundVision) → instalace → servis → školení.
- Vlajkové značky (výhradní distribuce): **L-Acoustics** (L-ISA, Ambiance), **DiGiCo**, **Ayrton**. Dále ChamSys, Audio-Technica, Luminex, DirectOut, Naostage, Yamaha, High End, Antelope, Waves, ASL, KLANG, Smaart.
- TOP reference: Rammstein 2019 (34 koncertů / 17 zemí), Ed Sheeran Mathematics Tour, Eurovize 2024, Scorpions, TOPFEST. Instalace: Hudební divadlo Karlín (největší L-ISA v ČR), Nová scéna DJKT Plzeň (světová premiéra Ambiance), UFFO Trutnov, Steel Aréna Košice, Český rozhlas (DiGiCo Quantum 338).

## Stav — co chybí
1. **Case study HD Karlín** v plné podobě (dnes existuje jen `instalace-hd-karlin-schema.html` se schématem).
2. **Steel Aréna Košice** a **DJKT Plzeň** — case studies zatím nejsou, na homepage vedou na `#`.
3. **Stránka Academy / školení**, kontakt, servis.
4. **EN mutace** obsahu.
5. Self-hostované fonty + vektorové logo pro produkci.

## Pracovní pravidla
- Design systém je **jediný zdroj pravdy**: tokeny v `tokens/*`, komponenty v `ui.css` + `ui-components.js`. Nová stránka nesmí zavádět vlastní barvy/fonty/komponenty — když něco chybí, přidat do systému.
- Hlavička / mobilní menu / patička jsou **jeden soubor pro celý web** (`ui-header.html`, `ui-mobile-menu.html`, `ui-footer.html`, vkládá `ui-loader.js`). Needituj je po stránkách.
- Po editaci `.js`/`.css` **bumpni `?v=N`** v `<link>`/`<script>`, jinak drží cache.
- Náhledový screenshot nástroj snímá foto-sekce s transformy černě (artefakt). Ověřuj přes `eval_js_user_view` / `screenshot_user_view`.
- **Kontroluj po sobě.** Když přidáš komponentu, ověř, že má hover/glow, správnou specificitu a že se nikde nezduplikovala.
