# PRO MUSIC — Komponenty & interakce (jednotný systém)

> Zdroj pravdy pro celý web. Všechny odladěné prvky vznikly na homepage (`index.html`, směr B „Premium"). Tento dokument je závazný pro všechny stránky i budoucí práci. Stejné komponenty, stejný hover, stejná typografie všude.

## Typografie (role)
- **Display / nadpisy** → `var(--pm-font-display)` = **Archivo**, weight 700–800, tracking `-0.02em` až `-0.035em`, line-height `1.02` (nikdy ne pod 0.9 — diakritika).
- **Body / čtený text** → `var(--pm-font-body)` = **IBM Plex Sans**, 400/500/700, 17px, line-height 1.6.
- **Mono / eyebrow / štítky / data / čísla** → `var(--pm-font-mono)` = **Space Mono**, UPPERCASE, letter-spacing `.12–.2em`.
- **Tlačítka** používají **display font** (Archivo 700, tracking −0.01em) — ne mono.

## Tlačítka

### Primární (`.btn .btn-primary`)
- Vyplněné oranžové: `background:var(--accent)`, `color:var(--on-accent)` (#fff).
- Tvar: `padding:14px 24px` (velké `.btn-lg` = `17px 30px`), `border-radius:var(--pm-radius-pill)`, `gap:9px`.
- **Hover (kanonický, bez pohybu):** zesvětlí na `--accent-hover`, přidá **glow** `0 0 26px rgba(224,84,43,.5)` + jemný **lit okraj** (bílý→broskvový radiální gradient v 1.5px borderu) sledující kurzor přes `--mx/--my`. **Žádný posun/translate.**
- Press: `--accent-press`.

### Sekundární / ghost (`.btn .btn-ghost`)
- Průhledné, `1.5px solid var(--border-strong)`, text `var(--text)`.
- **Hover:** směrově nasvícený **1px oranžový okraj** (Apple iOS styl, světlo u kurzoru), `border-color:transparent`, podklad `var(--accent-tint)`, text `var(--accent)`, glow `0 0 22px rgba(224,84,43,.4)`. Jen jeden okraj — neduplikovat solid + glow.

> Pravidlo: primární i sekundární sdílí **jeden rukopis** — světelný okraj reagující na myš. Liší se jen tím, že primární je vyplněné (bílý lesk) a ghost má oranžový okraj na tmavém.

## Hover efekt „outline-glow" (univerzální)
Jeden interaktivní efekt pro VŠECHNY orámované prvky: tlačítka, chipsy/filtry, karty, záložky.
- 1px (volitelně 1.5px) gradientní okraj maskovaný přes `mask-composite`, jehož světlý bod je radiální gradient v pozici `--mx/--my`.
- `--mx/--my` aktualizuje sdílený `pointermove` handler (`hifi-B.js`) na každém `.outline-glow`, `.btn-ghost`, `.btn-primary`, `.chip-filter`, `.edu-tab`.
- Utility třída: **`class="outline-glow"`** na jakýkoli prvek. Volitelně `--og-size` (poloměr světla, default 140px), `--og-pad` (tloušťka, default 1.5px).
- Bez pohybu (žádné translate). Jen světlo + jemný glow. Ohleduplné k migréně.

## Boxy / karty (hover)
- **Segment karty, work karty, problem/proof/fact karty:** `outline-glow` okraj + případně jemný `translateY(-3px)` lift (`var(--pm-lift)`) a stín `var(--pm-shadow-md/lg)`.
- Povrch: `var(--surface)`, border `var(--border)`, radius `--pm-radius-lg`.
- Filtrační chipsy referencí (`.chip-filter`): hover = outline-glow; **selected** = plná oranžová + glow `0 0 26px rgba(224,84,43,.55)`.

## Chips & tagy
- `.chip` — mono, 1px `border-strong`, pill, text-soft. `.chip-accent` = oranžová varianta na `accent-tint`.
- `.tag` — mono 10px UPPERCASE, oranžový okraj; `.tag-solid` = plná oranžová. Vždy **hug** šířka (podle textu), nikdy 100 %.

## Sekce s vlnou (`.wave-band`)
- Oranžové pozadí (radiální glow nahoře i dole), horní + spodní hrana **vykrojená sinusoidou** z loga (jen tvar, ne objekt). Vertikální padding `clamp(90px,11vw,170px)`.
- Uvnitř přebarvený kontrast (tmavý ink na oranžové) — proměnné `--wink/--wsoft/--wline/--wbg`.
- Stejný tvar i amplituda vlny jako u patičky.

## Číslování sekcí (globální standard)
Každá sekce má hlavičku `.sec-head` s velkým **obrysovým číslem** (`.idx`) + nadpisem `h2`:
- `.sec-head .idx` — Archivo 800, `clamp(3rem,9vw,8rem)`, `color:transparent` + `-webkit-text-stroke:1.5px rgba(224,84,43,.55)` (na oranžové sekci stroke `rgba(28,17,9,.5)`), line-height .8, tracking −.04em.
- `.sec-head h2` — `clamp(2rem,3.4vw,3.4rem)`, tracking tight.
- `.sec-head` = flex, `align-items:flex-end`; `.rule` se nezobrazuje.
- **Definováno globálně v `hifi.css`** (ne dir-b) → stejné na VŠECH stránkách. Markup: `<div class="sec-head"><span class="idx">01</span><h2>Nadpis</h2></div>`.

## Velikosti nadpisů (závazné)
- Hero display → `--pm-text-display-1`; statement → `display-2`.
- Sekční `h2` (v `.sec-head`) → `clamp(2rem,3.4vw,3.4rem)`.
- Karty/boxy `strong`/`h3` → ~1.15–1.3rem.


- Full-bleed podklad (přes celou šířku), obsah zarovnaný na `container-wide`.
- **Silná typografie** položek (Archivo 800, ~29px), hover posune doprava + zoranžoví.
- Otevírá se hoverem; položka v liště je na celou výšku navigace, takže myš plynule přejede na panel bez mezery.
- Feature karta vpravo (foto + štítek).

## Mobilní menu (filozofie)
- Spouští se **plovoucím kruhovým FAB tlačítkem vpravo dole** (≤1000px) — palcový dosah pravé ruky, respektuje Safari spodní lištu (`env(safe-area-inset-bottom)`). FAB se po otevření mění na ✕.
- Celoobrazovkové tmavé overlay s tlumeným koncertním pozadím.
- **Pořadí položek vzestupně odspodu:** 01 dole (na dosah palce), čísla stoupají nahoru; kontakt a CTA nahoře (`flex-direction:column-reverse`).
- **Silná typografie** (Archivo Bold) — položky i rozbalené podsekce i kontakt; ne drobné mono.
- Velké **logo PRO MUSIC** integrované do hlavičky menu (42px).
- Rozbalovací podsekce (Realizace, Instalace) jako na desktopu.
- Spodní odsazení obsahu ~98px, aby nejnižší položka nekolidovala s FAB.
- **CTA „Probrat projekt →"** v menu vždy přítomné. V hlavičce na mobilu zůstává i CTA tlačítko.

## Pojmenování v menu
- „Práce" → **„Realizace"** (nesvádí k představě nabídky zaměstnání).
- Primární CTA všude: **„Probrat projekt →"** (kvalifikovaný kontakt dle positioningu).

## Přechody & motion
- **Mezi stránkami:** „pódiové světlo" — z místa kliknutí spotlight (`pm-transition.js/.css`), tlumené, dark-mode-friendly (ne křiklavé, ohled na migrénu).
- **Edukační karusel (imerzivní zvuk):** CRT glitch přechod — starý slide se „vypne" (kolaps do linky), pak naskočí nový (power-on + RGB rozštěp + scanline). Sekvenčně, nepřekrývat obsahy.
- **Reveal:** jemný fade-up / mask-wipe na nadpisy (`.b-mask`), rise na karty (`.b-rise`). Vždy `prefers-reduced-motion`.
- Easing `var(--pm-ease)` = `cubic-bezier(.2,.7,.2,1)`.

## Kontakt (závazné údaje)
- Telefon: **+420 775 328 292** (`tel:+420775328292`)
- E-mail: **support@promusic.cz** (`mailto:`)
- Sídlo: Horská 922, 541 01 Trutnov

## Soubory (kde to žije)
- `styles.css` → `tokens/*` — foundations (barvy, typo, spacing, motion, fonts).
- `hifi.css` — komponentní/sekční vrstva (tlačítka, chips, stat, wave-band, footer…).
- `hifi-parts.css` — outline-glow utility, mega-menu, mobilní menu, logo-wall, showreel, reference, academy.
- `hifi-B.css` — směr B (premium): button hovery, asymetrie, coverflow, reveal.
- `hifi-edu.css/js` — edukační karusel s mixážní-konzole navigací + CRT glitch.
- `pm-nav.js` — sdílené menu + footer (jeden zdroj pro všechny stránky).
- `pm-transition.js/.css` — přechod mezi stránkami.
