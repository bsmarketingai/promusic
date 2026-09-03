# PRO MUSIC web — layout & responzivita

Princip: **dramatické momenty jdou přes celou šířku (full-bleed)**, **čtecí obsah žije v containeru** (max ~1180–1280 px, vystředěný). V náhledu si to zapneš přes Tweaks → „Layout vodítka".

## FULL-BLEED (100 % šířky, edge-to-edge)
Vizuální / imerzivní momenty — fotka/video se nesmí „krčit" v rámečku.
- **Hero / showreel** — video přes celý viewport, claim a nav uvnitř bezpečné zóny (padding clamp 24→56 px).
- **Portfolio bandy** — velké koncertní fotky edge-to-edge, tmavý band na pozadí; nadpis sekce zůstává v containeru, fotka může „vytéct".
- **Marquee** jmen (běžící lišta) — přes celou šířku.
- **CTA band školení** (volitelně) — barevný/tmavý pruh přes celou šířku, obsah uvnitř containeru.
- **Section breaky / mezititulky** s velkou typografií — můžou jít full-bleed pro rytmus.

## CONTAINER (max ~1180–1280 px, vystředěno, padding po stranách)
Vše, co se „čte" nebo porovnává — potřebuje měřítko řádku a zarovnání.
- Stat strip (čísla)
- Technologie (text + obrázek)
- Showreel mřížka klipů
- Logo-wall značek
- Partner Program
- Reference — čísla, filtry, logo-wall (foto-dlaždice mohou jít šíř)
- Academy / proč školení (textové karty)
- Patička (obsah v containeru, horní linka přes celou šířku)

## Breakpointy & reflow
| Šířka | Chování |
|---|---|
| **≥ 1280** | plný layout: 4 sloupce (čísla), 3 sloupce (karty), 6 sloupců (logo-wall), splity 2 sloupce |
| **768–1279** (tablet) | 2–3 sloupce; hero typo se zmenší (clamp); splity → 2 nebo 1 sloupec; logo-wall 4–6 |
| **< 768** (mobil) | vše 1 sloupec; nav → hamburger; hero = fotka na celý + claim dole; logo-wall 3 sloupce; reffeat 1; parallax ztlumit; CTA jako sticky lišta dole |

## Konkrétní reflow pravidla
- **Hero:** type `clamp(54px → 9vw → 128px)`; na mobilu fotka full-bleed na pozadí, claim přes spodek, tlačítka pod sebe.
- **Portfolio band:** desktop 2 sloupce (text / fotka, střídavě) → mobil stack, **fotka nahoře**, text pod.
- **Technologie split:** 2 → 1 sloupec, obrázek první.
- **Reference:** foto-dlaždice 3 → 2 → 1; logo-wall 6 → 3 sloupce.
- **Academy:** 3 karty → 1; split „pro koho / jak funguje" 2 → 1.
- **Container padding:** `clamp(20px, 4vw, 40px)` po stranách; full-bleed sekce padding 0, vnitřní obsah dostane svůj container.

## Bezpečná zóna v hero
Nav + claim + CTA drží v containeru i uvnitř full-bleed hera (nelepí se na hranu) — padding `clamp(24px, 5vw, 56px)`.
