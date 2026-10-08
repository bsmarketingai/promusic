# PRO MUSIC — kontext projektu (handoff)

> Tento soubor je **kompletní předávací kontext** pro pokračování na novém účtu. Přečti ho celý před první úpravou. Technický popis souborů je navíc v `readme.md` (struktura, design tokeny, ikony, breakpointy). Tento soubor = záměr, stav, pravidla, pasti.

## 0. Přenos na nový účet (1:1)
- Repo obsahuje **celý web** — statické HTML/CSS/JS, žádný build krok, žádné závislosti mimo Google Fonts CDN.
- Přenést **všechny soubory beze změny**, včetně `uploads/`, `research/`, `guidelines/`, `tokens/`, `assets/`. Nic nepřejmenovávat (odkazy jsou relativní a na názvy souborů se spoléhá).
- Po přenosu ověř: otevři `index.html`, `novinka.html?a=` (Quantum 638), `404.html`, `skoleni.html`, `design-system.html` — hlavička/patička se musí vložit (`ui-loader.js`), ikony vykreslit, žádné chyby v konzoli.
- Nasazení: **GitHub Pages** z rootu repa. `404.html` je v rootu záměrně (GH Pages ho servíruje automaticky) a sám se kotví na kořen webu, aby fungoval i z hlubokých cest.
- `screenshots/`, `03-_s.png`, `.thumbnail` jsou pracovní artefakty — nejsou součástí webu, ale nemazat bez souhlasu.

## 1. O co jde
Nový prezentační web **PRO MUSIC, s.r.o.** (profesionální audio / light / video technika, Trutnov, od 1997). Stávající web klienta: https://promusic.cz/
Cíl: ukázat firmu jako **velkého hráče se světovým dosahem** — zvučí/osvětlují největší koncerty (Rammstein, Ed Sheeran, Eurovize) a dělají špičkové instalace (divadla, arény). **Není to eshop** (Second Hand + košík existují, ale jsou vedlejší). Důraz na portfolio a důkazy.
**Fáze:** hi-fi web nad vlastním design systémem. Wireframová fáze je uzavřená a smazaná.

## 2. Potvrzené zadání
- **Tón:** tmavý, koncertní, dramatický. **Dark mode je výchozí a hlavní** (light/duo existují jen jako přepínač v náhledovém panelu — `ui-mode.js`, `preview-bar.js`).
- **Hero:** velká fotka koncertu + silný claim („Zvuk, který cítíš v hrudi.").
- **Důraz příběhu:** technologie & know-how (L-ISA, L-Acoustics Ambiance, SoundVision).
- **Jazyk:** CZ + EN (přepínač zatím jen UI prvek, EN obsah neexistuje).
- **Cílovka:** divadla a kulturní/společenské prostory, pořadatelé koncertů/festivalů, rentalové firmy, architekti & projektanti, zvukaři & LD, vedení měst / veřejný sektor.
- **Hlavní CTA:** **Probrat projekt**; sekundárně přihlášení na školení (PRO MUSIC Academy).
- **Loga značek:** jen **monochromatická bílá**.
- **Must-have:** velké fotky, video/showreel, silné hlášky, silná typografie, motion, parallax.
- **Míra animací:** **STŘEDNĚ** — jemné fade-up + lehký parallax. Žádný agresivní zoom/blur/stagger. Vždy respektovat `prefers-reduced-motion`.
- **Nadpisy v článcích novinek:** celé bílé, bez oranžové druhé části (globálně v `ui.css`, `.art-claim em`).

## 3. Klíčová fakta o firmě
- Založeno 1997, Trutnov (sídlo Horská 922). Realizace na klíč: návrh → 3D simulace (SoundVision) → realizace → servis → školení.
- Vlajkové značky (výhradní distribuce): **L-Acoustics** (L-ISA, Ambiance), **DiGiCo**, **Ayrton**. Dále ChamSys, Audio-Technica, Luminex, DirectOut, Naostage, Yamaha, High End, Antelope, Waves, ASL, KLANG, Smaart a další (loga v `assets/brands/`).
- TOP reference: Rammstein 2019 (34 koncertů / 17 zemí), Ed Sheeran Mathematics Tour, Eurovize 2024, Scorpions, TOPFEST.
- Instalace: Hudební divadlo Karlín (největší L-ISA v ČR), Nová scéna DJKT Plzeň (světová premiéra Ambiance), UFFO Trutnov, Steel Aréna Košice, Český rozhlas (DiGiCo Quantum 338).

## 4. Terminologie (potvrzeno klientem — dodržovat striktně)
- **Touring / Rental / produkce** = dočasné nasazení techniky na akci. Dřív „Realizace", pak „Live & turné" — obojí už nikde nepoužívat.
- Menu i výpisy mají **jen 3 hlavní kategorie**: Touring / Rental / produkce · Instalace · Ze světa. Dělení podle prostoru se jako kategorie nepoužívá.
- **Instalace** = trvale zabudovaný systém v budově. Dřív „Stálé instalace" — nepoužívat.
- **„realizace"** jen jako fáze procesu (návrh → realizace → servis), nikdy jako název sekce. Souhrn projektů = „Vybrané projekty" / „Další projekty".
- Názvy souborů (`live-*.html`, `stale-instalace.html`, `realizace-*`) zůstávají — mění se jen popisky v UI.
- Copy: tykání v CTA, věcně, bez nedoložených superlativů, čísla ano. Bez emoji.

## 5. Mapa stránek
- **Homepage:** `index.html` (obsah sekcí z `home-content.js`, hero mixpult `hero-mixpult.js`; `H5-mixpult.html` = samostatný prototyp hero).
- **Touring / Rental / produkce:** výpis `live-a-turne.html`; case studies `live-ed-sheeran.html`, `live-rammstein.html`, `live-eurovize-2024.html`.
- **Instalace:** výpis `stale-instalace.html`; `instalace-co-resime.html`, `instalace-jak-to-delame.html`, `instalace-kulturni-domy-saly-divadla.html`, `instalace-hd-karlin-schema.html` (+ `karlin-schema.js`), `technologie-schema-ozvuceni.html`.
- **Reference:** `reference.html`. Data všech projektů: `projects-data.js` (`PM_LIVE`, `PM_INST`) + `listing.js`.
- **Značky:** `znacky.html`, `znacka-l-acoustics.html`.
- **O společnosti:** `o-spolecnosti-kdo-jsme.html`, `o-spolecnosti-nabizime.html`, `o-spolecnosti-partneri.html` (`partneri-data.js`, `partneri.js`), `o-spolecnosti-cyklisticky-tym.html`.
- **Novinky:** `novinky.html` (výpis), `novinka.html?a=<slug>` (detail). Data: `news-index.js` (metadata, 89 článků + Quantum 638), `news-bodies.js` (texty), render `news.js`. Bohatý článek **DiGiCo Quantum 638** — assety v `assets/novinky/q638/` (fotky, videa, datasheet PDF).
- **Academy:** `skoleni.html` (katalog 18 kurzů L-Acoustics, `academy-courses.js`, `skoleni-kurzy.js`), `skoleni-detail.html?k=<slug>` (`skoleni-detail.js`), `prihlaska-skoleni.html` (`skoleni.js`). `academy-data.js` = zástupné termíny jen pro homepage blok.
- **Second Hand:** `second-hand.html` (`secondhand-data.js`, `secondhand.js`), `produkt.html?p=<slug>` (`produkt-data.js`, `produkt.js`), `kosik.html?krok=1|2|3` (`kosik.js`).
- **Servis / RMA:** `rma.html` (`rma.js`), reklamační řád `assets/docs/`.
- **Kontakt:** `kontakt.html`. **Hledání:** `hledani.html?q=` (`hledani.js`, `site-search.js`).
- **404:** `404.html` — obrysové 404 přes koncertní fotku, badge „CH 404 · NO SIGNAL" se signálovým metrem, CTA Zpět na úvod / Probrat projekt, 6 karet Kam dál (bez vyhledávání — na přání klienta odstraněno).
- **Interní:** `design-system.html`, `guidelines/*.html`, `baglog.html` (backlog změn), `readme.md`, `research/*.md`, `parametry-pohoda.md`.

## 6. Architektura & design systém
- Design systém je **jediný zdroj pravdy**: tokeny `tokens/*` → zkopírované do `styles.css`; komponenty v `ui.css` + `ui-components.js`; ikony jen z `ui-icons.js` (`<ui-icon name="…">`). Nová stránka nesmí zavádět vlastní barvy/fonty/komponenty/SVG ikony — když něco chybí, přidat do systému.
- **Barvy:** teplá černá `#070605`, paper `#100f0d`, povrchy `#1a1813 / #242019 / #2f2a22`, text `#ece6da` ve 4 hladinách, akcent oranžová `#e0542b` (hover `#f2693f`, press `#b83f1c`).
- **Fonty:** Archivo 800 (display), IBM Plex Sans (body), Space Mono (eyebrow/štítky/data).
- **Hover:** `outline-glow` (gradientní okraj sledující kurzor, napojuje `site.js`). Každá nová karta musí mít hover/glow.
- Hlavička / mobilní menu / patička jsou **jeden soubor pro celý web** (`ui-header.html`, `ui-mobile-menu.html`, `ui-footer.html`, vkládá `ui-loader.js`). Needituj je po stránkách.
- Globální chování (`site.js`): reveal on scroll, parallax, tilt, outline-glow, coverflow, lightbox galerií. `page-transition.js` = přechod „pódiové světlo".

## 7. Pasti (důležité)
- **`styles.css` není @import** — je to ruční slitá kopie `tokens/*.css`. Nový token zapiš do `tokens/<soubor>.css` **i** do odpovídající sekce `styles.css`. Ověř `getComputedStyle(document.documentElement).getPropertyValue("--token")`.
- **Cache-busting:** po editaci `.js`/`.css` **bumpni `?v=N`** v `<link>`/`<script>` na všech stránkách, které soubor načítají. Aktuálně `styles.css?v=16`, `ui.css?v=319` (ověř grepem, verze se liší po souborech).
- `news.js` vykresluje detail hned (ne na DOMContentLoaded), aby lightbox v `site.js` našel galerie v článku — neměnit pořadí.
- Náhledový screenshot nástroj snímá foto-sekce s transformy (parallax) **černě** — artefakt, ne chyba. Ověřuj přes `eval_js_user_view` / `screenshot_user_view`.
- `ui-icons.js` je destilace z `uploads/pm-*.svg` — needitovat ručně; obrysové ikony `stroke-width: 1.125`.
- `uploads/` = surové podklady klienta, **není součástí webu**; co web používá, musí být zkopírované do `assets/`.

## 8. Stav — co chybí
1. **Case study HD Karlín** v plné podobě (dnes jen `instalace-hd-karlin-schema.html` se schématem).
2. **Steel Aréna Košice** a **DJKT Plzeň** — case studies nejsou, na homepage vedou na `#`.
3. Detail produktu existuje pro 2 položky (`produkt.html?p=rf-venue-combine4`, `?p=at-lp140xp`) — ostatní karty vedou na první detail.
4. **Academy:** bez termínů (termín na poptávku). Fotky kurzů zatím z l-acoustics.com (stáhnout do `assets/`). Chybí texty FAQ, kontakt na koordinátora; přihláška nečte `?k=`; homepage blok „Nejbližší školení" bere zástupné termíny z `academy-data.js`. Servisní sekce zatím není.
5. **404:** karta Kontakt uvádí Trutnov i Prahu — **čeká na potvrzení klienta, zda pražská pobočka zůstává.**
6. **EN mutace** obsahu.
7. Produkce: self-hostované fonty (woff2) + vektorové logo (SVG, čistě bílá varianta).

## 9. Pracovní pravidla
- Komunikace s uživatelem **česky, stručně, věcně**.
- **Kontroluj po sobě.** Nová komponenta: hover/glow, správná specificita, žádná duplicita v `ui.css`.
- Malá změna = měň jen to, o co jde. Větší redesign → ptát se.
- **Každou změnu designu zapisuj do `baglog.html`** — automaticky, ve stejném tahu jako úpravu. Struktura: nejnovější den nahoře (`.chday` → `.when` s datem a počtem změn v `<small>`), položka `.chitem.is-new` s tagem `.chtag` (Struktura / Layout / Komponenty / Velikost / Funkce / Barvy), tučné shrnutí `<b>` a jedna vysvětlující věta `<span>`. Dnešní den = přidat položku do existujícího bloku a přepočítat počet. Nezapisují se nové stránky bez designového dopadu a drobné textové korektury.
- Při přidání stránky/souboru aktualizuj `readme.md` (tabulky) a mapu stránek v tomto souboru.
