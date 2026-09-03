# Kategorie realizací — štítky (tagy) portfolia

> Slovník kategorií pro štítky u realizací (workcard `.tag`), reference a filtry portfolia.
> Cíl: konzistentní pojmenování napříč webem. Štítek má vždy **HUG** šířku (podle obsahu textu), nikdy ne na celou šířku.

## Formát štítku
- Krátký, výstižný, **VELKÝMI PÍSMENY** (CSS `text-transform:uppercase`).
- Většinou dvojice **TYP / DISCIPLÍNA** (např. `TURNÉ / SVĚTLA`), nebo jednoslovný (`DIVADLO`).
- Font: Space Mono (štítek), oranžová `.tag` nebo plná `.tag-solid`.

## A) Typ akce / prostoru (primární kategorie)
| Štítek | Použití |
|---|---|
| `TURNÉ` | koncertní turné, tour |
| `KONCERT` | jednorázový koncert |
| `FESTIVAL` | festival, open-air |
| `ARÉNA` | aréna, hala, stadion |
| `DIVADLO` | divadlo, scéna |
| `KULTURNÍ DŮM` | kulturní dům, společenské centrum |
| `KONCERTNÍ SÁL` | filharmonie, koncertní sál |
| `KLUB` | hudební klub, venue |
| `TV / BROADCAST` | televize, přenos, studio |
| `STUDIO` | nahrávací / produkční studio |
| `HOTEL` | hotel, resort |
| `RESTAURACE / BAR` | gastro provoz |
| `KINO` | kino, multikino |
| `SAKRÁLNÍ` | kostel, katedrála |
| `KONFERENCE` | konferenční / kongresový prostor |
| `ŠKOLA / AULA` | univerzita, aula, vzdělávání |
| `VEŘEJNÝ PROSTOR` | náměstí, město, veřejná zakázka |
| `KORPORÁT` | firemní event |

## B) Disciplína (sekundární — za lomítkem)
| Štítek | Použití |
|---|---|
| `ZVUK` | ozvučení / audio |
| `SVĚTLA` | osvětlení / light |
| `VIDEO` | projekce, LED, obraz |
| `INSTALACE` | pevná instalace (na klíč) |
| `RENTAL` | pronájem techniky |
| `AKUSTIKA` | akustické řešení / studie |
| `INTERKOM` | komunikace / interkom |

## C) Charakter realizace (volitelný 3. štítek / odznak)
| Štítek | Použití |
|---|---|
| `NA KLÍČ` | kompletní dodávka |
| `SVĚTOVÁ PREMIÉRA` | první nasazení technologie |
| `IMERZIVNÍ` | L-ISA / prostorový zvuk |
| `CASE STUDY` | má rozpracovanou případovku |

## Doporučené kombinace (příklady z portfolia)
- Ed Sheeran → `TURNÉ / SVĚTLA`
- Steel Aréna Košice → `ARÉNA / SVĚTLA`
- HD Karlín → `DIVADLO / ZVUK`
- Nová scéna DJKT → `DIVADLO / ZVUK` + `SVĚTOVÁ PREMIÉRA`
- UFFO Trutnov → `KULTURNÍ DŮM / ZVUK` + `IMERZIVNÍ`
- Eurovize → `TV / BROADCAST`

## Pravidla pro UI
- Štítek = **inline / hug** šířka (`align-self:flex-start` ve flex sloupci), padding `5–9px`, nikdy 100 %.
- Max 1 primární + 1 disciplína na kartě; 3. (charakter) jen výjimečně.
- Filtry portfolia odvozené z kategorie A (Vše / Divadla / Arény & stadiony / TV & broadcast / Školy & veřejný sektor / Festivaly …).
