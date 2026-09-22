# PRO MUSIC – Hero varianta H5 „Mixpult“ (Channel Strip Hero)

## Koncept v jedné větě
Hero je **mixážní pult**. Každý projekt je jeden **kanál (channel strip)**, tedy úzký svislý pruh přes celou výšku hero sekce. Aktivní kanál je „vytažený“ (SOLO) a roztáhne se na velkou fotku. Ostatní zůstanou jako úzké pruhy s LED metry a svislým popiskem. Web tak vypadá jako nástroj, se kterým firma denně pracuje, a nepůsobí jako další karusel.

Proč je to jiné než H1–H4:
- H1 je horizontální karusel karet, H2 coverflow, H3 bento mozaika a H4 fullbleed se seznamem náhledů.
- H5 ukazuje **všech 6–8 projektů najednou**. Každý projekt je pořád vidět (úzký pruh) a jeden má plný prostor. Metafora pultu vychází z oboru (audio), takže nejde o obecný vzor z šablony.

---

## Obsah (7 kanálů, podporovat 3–8)
| CH | Projekt | Kategorie | Podtitul |
|---|---|---|---|
| 01 | Eurovision Song Contest 2024 | TOURING / RENTAL / PRODUKCE | Malmö · ozvučení finálových večerů |
| 02 | Rammstein — Stadium Tour | TOURING / RENTAL / PRODUKCE | 34 koncertů v 17 zemích Evropy |
| 03 | Ed Sheeran — Mathematics Tour | TOURING / RENTAL | Stadionový rig Ayrton |
| 04 | Steel Aréna Košice | INSTALACE | Světelný systém Ayrton pro arénu |
| 05 | Hudební divadlo Karlín | INSTALACE | Největší instalace L-ISA v ČR |
| 06 | Nová scéna DJKT Plzeň | INSTALACE | Světová premiéra L-Acoustics Ambiance |
| 07 | UFFO Trutnov | INSTALACE | L-ISA Auditorium v Trutnově |

Stejné fotky jako v H1–H4.

---

## Layout (desktop ≥ 1024 px)
- Hero zabírá `100svh − header`. Stejná logika jako u stávajících variant: vyplnit okno, claim hned pod headerem.
- **Horní řádek (kompaktní, jako H1):** vlevo eyebrow `PROFESIONÁLNÍ AUDIO & LIGHT · OD 1997` a H1 „Professional show equipment“ na jeden řádek. Vpravo `Probrat projekt` (jediné plné červené tlačítko) a `Vybrané projekty` (ghost).
- **Pod ním „pult“:** flex řádek se 7 kanály přes celou šířku kontejneru, výška = zbytek hero (min 460 px). Mezera mezi kanály 4 px. Pozadí mezer je o odstín světlejší než pozadí stránky, aby připomínalo šasi pultu.
- **Pod pultem „scribble strip“:** tenká lišta (32 px) s mono popisky zarovnanými přesně pod každý kanál (`CH01 EUROVISION`, `CH02 RAMMSTEIN`…). Vpravo počítadlo `SOLO 02 / 07` a šipky ‹ ›. Na skutečných pultech je to proužek s názvy kanálů, tady nahrazuje dots a progress bar.

### Šířky kanálů
- Aktivní kanál: `flex-grow: 6`.
- Neaktivní: `flex-grow: 1`, `min-width: 72px`.
- Hover na neaktivním kanálu: `flex-grow: 1.6` (jen „nakoukne“).
- Přechod: `flex-grow 700ms cubic-bezier(.7,0,.2,1)`. Obsah aktivního kanálu se objeví až po 250 ms (fade + translateY 12 px), aby se text neroztahoval spolu s pruhem.

---

## Anatomie kanálu

### Neaktivní (úzký pruh)
- Fotka `object-fit: cover`, **grayscale 100 %**, brightness 0.45.
- Nahoře mono `CH 03` (11 px, letter-spacing 0.12em, šedá).
- Uprostřed **svislý popisek** názvu projektu (`writing-mode: vertical-rl; transform: rotate(180deg)`), mono uppercase, 13 px, čte se zdola nahoru.
- Dole **LED meter**: 12 segmentů nad sebou (4×10 px, mezera 3 px). Nesvítící segmenty jsou `rgba(255,255,255,.08)`. V klidu svítí 2–3 spodní segmenty v šedé, „signál je tam, ale ztlumený“.
- Hover: fotka přejde do barvy (grayscale 0, 400 ms), meter vyskočí o 3–4 segmenty.

### Aktivní (SOLO)
- Fotka plně barevná. Spodní gradient `transparent → #0d0b0a` (přes 55 % výšky, gradient musí jít až k okraji karty bez 1px mezery).
- Vlevo nahoře malý štítek `● SOLO` (červená tečka, mono 11 px) a `CH 02`.
- Dole vlevo obsah jako karty v H1: eyebrow kategorie (mono, červená), titulek (bold grotesk, 40–48 px), podtitul, **ghost** tlačítko `Zobrazit projekt →`.
- Volitelně řádek 2–3 spec chipů (mono, border 1 px, 11 px), např. `L-ISA` · `96 boxů` · `Ayrton`. Tyhle chipy jsou pro PRO MUSIC důležité, ukazují konkrétní značky.
- Vpravo dole **LED meter aktivní**: 12 segmentů, animovaný „živý signál“ (náhodná úroveň 6–11 segmentů, update po 90–140 ms, easing). Spodních 8 segmentů je světle béžových (barva textu), 9–10 oranžové/amber a 11–12 v brand červené.
- Vedle metru **fader**: svislá dráha 2 px a jezdec 18×8 px. Jezdec během autoplay **plynule vyjíždí zdola nahoru** a slouží jako progress bar. Když dojede nahoru, přepne se na další kanál.

---

## Chování
- **Autoplay:** 6 s na kanál, cyklí dokola. Pauza při hoveru nad pultem nebo při focusu uvnitř.
- **Klik** na neaktivní kanál ho udělá SOLO. Fader předchozího kanálu sjede dolů (300 ms).
- **Klávesnice:** ← → mezi kanály, `1`–`8` přímý skok. Každý kanál je `<button aria-pressed>`, aktivní obsah je `aria-live="polite"`.
- **Obrázky:** lazy, kromě prvních 2. Aktivní fotka ≥ 1600 px na šířku.
- **prefers-reduced-motion:** bez autoplay, LED metery statické (aktivní svítí 8 segmentů), přechody šířky 0 ms.

---

## Tablet (768–1023 px)
- Stejný princip, ale maximálně 5 kanálů viditelných. Další jsou za šipkou ve scribble stripu (strip posouvá okno kanálů).
- Neaktivní `min-width: 56px`, svislý popisek zůstává.

## Mobil (< 768 px)
- Pult se **otočí o 90°**: kanály jsou vodorovné řádky pod sebou (vertikální akordeon).
- Aktivní řádek má výšku 56svh a zobrazuje fotku a obsah. Neaktivní řádky mají 52 px: vlevo `CH 03`, název vodorovně a vpravo LED meter vodorovně (12 segmentů zleva doprava).
- Headline nad pultem na 2 řádky, CTA pod ním vedle sebe (plné + ghost).
- Autoplay na mobilu vypnutý, přepíná se tapem.

---

## Vizuální tokeny (převzít z existujícího systému)
- Pozadí `#0d0b0a`. Šasi pultu (mezery a scribble strip) `#17140f`.
- Brand červená (stejná jako `Kontakt` / `Probrat projekt`) se používá jen na: plné CTA, eyebrow, SOLO tečku a horní LED segmenty. Nikde jinde.
- Text béžový (stejný jako headline), sekundární text šedý.
- Mono font = stávající mono z eyebrow a statistik.
- **Na kartách jen ghost tlačítka.** Jediné plné tlačítko v hero je `Probrat projekt`.
- Border radius kanálů 14 px (stejný jako karty v H1/H3). Krajní kanály mají radius jen na vnější straně, pult tak působí jako jeden celek.

---

## Co nedělat
- Žádné skeuomorfní knoby, fotky pultů, šroubky ani textury kovu. Metafora má být **typografická a grafická** (mono popisky, LED segmenty, fader linka), žádná ilustrace.
- Nezobrazovat ve svislých popiscích dlouhé podtituly, jen název projektu.
- Nedávat pod kanály dots ani klasický progress bar. Tuhle roli má fader a scribble strip.

## Pod hero
Beze změny: řádek statistik `28 let · 17 zemí · 20+ značek · 3× L-ISA`.

---

## Pojmenování v projektu
Stránka `H5-mixpult.html`, zápis změny do `baglog.html`.
