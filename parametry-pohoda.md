# Parametry projektů — podklad pro Pohodu E1

Web bere obsah výpisů z parametrů, ne z volného textu. Karta ve výpisu **nikdy** neskloňuje a nekomentuje — vypíše hodnotu, jak je zapsaná. Věty (příběh projektu, „poprvé v ČR", „největší instalace") patří až na stránku detailu, do samostatného textového pole.

Zdroj pravdy na webu: `projects-data.js`. Až přijde napojení na Pohodu, tenhle soubor je mapovací tabulka.

---

## Společné parametry (obě kategorie)

| Parametr | Typ | Povinný | Příklad | Kde se zobrazí |
|---|---|---|---|---|
| **Název** | text | ✅ | `Hudební divadlo Karlín` · `Kabát — turné` | titulek karty i detailu |
| **Kategorie** | seznam (1 z) | ✅ | viz níž | štítek na kartě + chip filtrace |
| **Rok** | číslo / rozsah | — | `2019` · `2022—2025` | karta vpravo nahoře |
| **Technika** | seznam (více z) | — | `L-Acoustics K1`, `DiGiCo SD5` | šedé chipy na kartě |
| **Fotka** | obrázek | — | `karlin/zvukar-foh.jpg` | pozadí / horní část karty |
| **Detail (case study)** | odkaz | — | `instalace-hd-karlin-schema.html` | karta se stane klikatelnou |
| **Poznámka** | text (věta) | — | `Světová premiéra Ambiance.` | **jen detail**, na kartu se nevykresluje |

> Bez fotky karta zobrazí šrafovaný placeholder. Bez odkazu na detail není karta klikatelná (nemá ani hover).

---

## Live & turné — parametry navíc

| Parametr | Typ | Příklad | Kde se zobrazí |
|---|---|---|---|
| **Místo** | text | `Trenčín, SK` · `Wembley` | mono řádek pod titulkem |
| **Rozsah** | seznam (více z) | `34 koncertů`, `17 zemí`, `30 000 lidí` | oranžové chipy (před technikou) |
| **Ze světa** | ano / ne | `ano` | štítek *ZE SVĚTA* + samostatný chip ve filtru |

**Kategorie (vybere se jedna):** Turné · Festivaly · Koncerty · TV & broadcast · Eventy & korporát

**„Ze světa"** je jiná osa než kategorie — označuje referenci zastupované značky v zahraničí, ne vlastní produkci PRO MUSIC. Proto je to příznak, ne kategorie: projekt může být zároveň `Turné` a `Ze světa`.

---

## Stálé instalace — parametry navíc

| Parametr | Typ | Příklad | Kde se zobrazí |
|---|---|---|---|
| **Město** | text | `Praha` · `Košice, SK` | mono řádek pod titulkem (spolu s rokem) |
| **Kapacita** | text | `460 míst` · `8 300 míst` | oranžový chip (před technikou) |

**Kategorie (vybere se jedna):** Divadla & sály · Arény & stadiony · Kluby & venues · Broadcast & studia · Školy & konzervatoře · Hotely & gastro · Veřejné prostory

---

## Pravidla pro hodnoty

1. **Technika = celý název produktu**, značka na prvním místě: `L-Acoustics K1`, `DiGiCo Quantum 338`, `ChamSys MagicQ MQ100`, `Ayrton Domino Profile`, `ASL FLEXUS`.
   Ne `poprvé DiGiCo`, ne `K1 a MagicQ`, ne `pulty řady SD`.
2. **Jedna hodnota = jeden záznam.** Víc systémů se zapíše jako víc hodnot parametru, ne jako věta s „a".
3. **Rozsah / Kapacita** vždy s jednotkou: `34 koncertů`, ne `34`.
4. **Neplněný parametr nechte prázdný.** Zástupné `—`, `?` ani `nevíme` do dat nepatří — web prázdnou hodnotu prostě nevykreslí.
5. **Rok** jako číslo, nebo rozsah se spojovníkem em-dash: `2022—2025`.

---

## Co je dnes v datech

| | Live & turné | Stálé instalace |
|---|---|---|
| záznamů | 138 | 38 |
| s rokem | ~1/3 | 0 |
| s technikou | 68 | 28 |
| s fotkou | 1 | 3 |
| s detailem | 1 | 1 |

**K doplnění od klienta:** roky, města, kapacity sálů, fotky. Roky u instalací zcela chybí — v původních článcích nebyly.
