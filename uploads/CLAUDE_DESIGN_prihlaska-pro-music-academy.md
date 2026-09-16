# Brief pro Claude Design: redesign stránky „Přihláška do Pro Music Academy“

## 0. Jak s briefem pracovat
- Stav předlohy: https://promusic.cz/content/prihlaska-do-pro-music-academy-1890 (září 2026)
- **Stránku postav čistě z našeho design systému PRO MUSIC**, který je v projektu.
  - Barvy, typografii, mezery, radiusy, stíny a breakpointy ber jen z jeho tokenů. Žádné hardcoded hodnoty.
  - Komponenty (Input, Textarea, Checkbox, Button, Alert, Badge, Card, Stepper…) použij z design systému. Nevytvářej jejich nové varianty.
  - Pokud komponenta chybí (např. „výběrová karta s checkboxem“), slož ji z existujících prvků. Na plátně ji označ poznámkou **„NOVÁ KOMPONENTA – schválit do DS“**.
- Výstup: desktop (1440) a mobil (390). K tomu stavy formuláře: prázdný, vyplňovaný, chyby, odesláno.
- Jazyk: čeština. Texty formuláře přebírej přesně podle sekce 4. Doplňkové texty (perex, nápovědy, chybové hlášky) jsou v tomto briefu.

## 1. Kontext a cíl
PRO MUSIC, s.r.o. je distributor profesionální audio techniky (L-Acoustics, DiGiCo…). **Pro Music Academy** nabízí certifikovaná školení L-Acoustics a Smaart. Na stránce se zájemce hlásí na jedno nebo více školení.

Dnes je to holý formulář: 18 checkboxů pod sebou, bez hierarchie a bez vysvětlení návazností kurzů.

**Cíl redesignu:** formulář, který působí prémiově (v duchu značky L-Acoustics), vyplní se do 2 minut a uživatel v něm jasně vidí:
1. jaké úrovně a řady školení existují,
2. která školení jsou povinná jako předpoklad,
3. co si právě vybral.

KPI: víc dokončených přihlášek a méně dotazů „které školení mám absolvovat první“.

## 2. Struktura stránky
1. **Header a drobečková navigace** (globální komponenty z DS): Domů › Pro Music Academy › Přihláška
2. **Hero (kompaktní, ne celostránkový)**
   - Overline: `PRO MUSIC ACADEMY`
   - H1: `Přihláška na školení`
   - Perex: `Vyberte školení L-Acoustics nebo Smaart, o která máte zájem. Ozveme se vám s nejbližšími termíny a podrobnostmi.`
   - Tři body s ikonami: `Certifikovaní lektoři L-Acoustics` · `Praktická výuka na reálných systémech` · `Termíny domluvíme individuálně`
3. **Formulář (hlavní obsah)**, rozvržení na desktopu:
   - levý sloupec (8/12): sekce formuláře,
   - pravý sloupec (4/12): **sticky panel „Vaše přihláška“** se souhrnem vybraných školení a tlačítkem pro odeslání.
   - Na mobilu je jeden sloupec. Souhrn se změní na **sticky spodní lištu**: `Vybráno: 3 školení` + tlačítko `Odeslat`, po rozkliknutí se zobrazí seznam.
4. **FAQ / info blok pod formulářem** (akordeon z DS), 3 otázky:
   - Kde školení probíhají?
   - Jak se dozvím termín a cenu?
   - Musím absolvovat System & Workflow?
   - Texty odpovědí nech jako placeholdery. Obsah dodá klient.
5. **Kontakt na koordinátora Academy** (karta: jméno, e-mail, telefon, vše placeholder) a globální patička.

## 3. Formulář je rozdělený do 4 číslovaných sekcí
Jedna stránka, žádný vícekrokový wizard. Sekce jsou vizuálně oddělené kartami nebo nadpisem s číslem (`1 Kontaktní údaje`, `2 Školení L-Acoustics`, `3 Školení Smaart`, `4 Poznámka a odeslání`). Nahoře je volitelně malý progress indikátor vyplněných sekcí.

### Sekce 1: Kontaktní údaje
Grid 2 sloupce na desktopu, 1 sloupec na mobilu.

| Pole | Typ | Povinné | Nápověda / placeholder | Chybová hláška |
|---|---|---|---|---|
| Jméno | text | ano | placeholder: `Jan` | `Vyplňte jméno.` |
| Příjmení | text | ano | placeholder: `Novák` | `Vyplňte příjmení.` |
| E-mail | email | ano | placeholder: `jan@firma.cz` | `Zadejte platný e-mail, např. jan@firma.cz.` |
| Telefon | tel | ano | helper: `Ve formátu +420 123 456 789` | `Zadejte telefon ve formátu +420 123 456 789.` |
| Firma | text | ne | štítek `(nepovinné)`, placeholder: `Název firmy nebo rentalu` | – |

Povinná pole označ hvězdičkou podle DS. Pod nadpis formuláře dej vysvětlivku `* povinné údaje`.

### Sekce 2: Školení L-Acoustics (jádro stránky, vyžaduje nejvíc péče)
Nadpis: `Školení L-Acoustics`. Podnadpis: `O jaká školení máte zájem? Vyberte libovolný počet.`

Checkboxy nahraď **výběrovými kartami** (celá karta je klikatelná, v rohu checkbox, stav vybráno = zvýrazněný border a pozadí podle DS). Karty seskup do **úrovní**. Každá skupina má nadpis, krátký popis a grid karet (desktop: 2 sloupce, mobil: 1 sloupec).

**Skupina A: Základ**
- `System & Workflow`. Badge: `Povinné pro ostatní školení`. Karta je širší (přes celou šířku) a vizuálně výraznější, protože je to vstupní bod.

**Skupina B: System Engineer**
- `Soundvision`
- `Drive System`
- `M1 - P1 Measurement & Tuning`

**Skupina C: System Technician**
- `Loudspeaker System Implementation`
- `Kiva II System`
- `Kara II System`
- `K3 System`
- `K2 System`
- `K1 System`
- `L2 System`

**Skupina D: Immersive (L-ISA)**
- `L-ISA Technology`. Role: `Immersive system/mixing engineer`. Badge: `Povinné pro další L-ISA školení`.
- `L-ISA Loudspeaker System`. Role: `Immersive system engineer`
- `L-ISA Live Mixing`. Role: `Immersive mixing engineer`
- `L-ISA Preproduction`. Role: `Immersive mixing engineer`

**Skupina E: System Expert**
- `Variable Curvature Line Source`
- `Loudspeaker System Calibration`

Obsah karty: **název kurzu** (hlavní text), nad ním malá overline s rolí (např. `SYSTEM TECHNICIAN`), případně badge návaznosti. Popisy kurzů nevymýšlej. Nech jeden volitelný řádek `Popis kurzu – doplní klient` jako placeholder ve stylu textu nápovědy.

Skupiny B–E mohou být na mobilu sbalitelné (akordeon) s počtem vybraných v hlavičce, např. `System Technician · 2 vybráno`.

**Logika návazností (navrhni i vizuálně):**
- Vybere-li uživatel jakýkoli kurz ze skupin B–E a nemá zaškrtnutý `System & Workflow`, kurz se **automaticky zaškrtne**. Zobrazí se inline info alert (varianta Info z DS): `Přidali jsme System & Workflow – je povinným předpokladem pro ostatní školení. Pokud ho již máte absolvované, můžete ho odznačit.`
- Stejně to funguje u L-ISA: výběr `L-ISA Loudspeaker System` / `Live Mixing` / `Preproduction` automaticky přidá `L-ISA Technology` a zobrazí obdobnou hlášku.
- Předpoklad **nezamykej**, uživatel ho může odznačit (může ho mít absolvovaný).
- Nakresli stav karty „přidáno automaticky“ (např. drobný štítek `Předpoklad`).

### Sekce 3: Školení Smaart
Nadpis: `Školení Smaart`. Podnadpis: `Máte zájem o školení Smaart?`
- Jedna výběrová karta: `Smaart Suite v9`. Stejná komponenta jako v sekci 2.

### Sekce 4: Poznámka a odeslání
- **Poznámka**: textarea (nepovinné), label `Poznámka`, placeholder `Chcete nám napsat něco navíc? Např. preferované termíny, počet účastníků z firmy…`. Min. 4 řádky, počítadlo znaků podle DS, pokud existuje.
- **Souhlas se zpracováním osobních údajů** (povinné)
  - Dnes je to radio „Ano, souhlasím“. **Změň na checkbox.**
  - Label: `Souhlasím se zpracováním osobních údajů pro účely registrace ke školením v rámci Pro Music Academy. *`
  - Pod labelem odkaz `Zásady zpracování osobních údajů` (odkaz z DS).
  - Chyba: `Pro odeslání přihlášky je nutný souhlas.`
- **Validace „alespoň jedno školení“** (nové pravidlo): pokud není vybrané žádné školení ze sekcí 2 a 3, zobraz u sekce 2 chybu `Vyberte alespoň jedno školení.`
- **Primární tlačítko**: `Odeslat přihlášku` (dnes „Pokračovat“, přejmenovat), velikost Large, na mobilu přes celou šířku.
- Pod tlačítkem drobný text: `Odpovíme vám do 2 pracovních dnů.` (placeholder, ověřit s klientem).

## 4. Sticky panel „Vaše přihláška“
- Nadpis `Vaše přihláška`
- Seznam vybraných školení seskupený podle skupin. U každé položky je ikona × pro odebrání.
- Prázdný stav: ilustrační ikona + `Zatím jste nevybrali žádné školení.`
- Počet: `Vybráno 4 školení`
- Tlačítko `Odeslat přihlášku` (duplicitní CTA, submitne formulář)
- Pod ním kontakt: `Nevíte si rady s výběrem? Zavolejte nám.` + telefon (placeholder)

## 5. Stavy, které navrhnout
1. **Výchozí:** prázdný formulář, panel v prázdném stavu.
2. **Rozpracovaný:** vyplněné kontakty, vybrané 3–4 kurzy včetně automaticky přidaného předpokladu a info alertu.
3. **Chyby po odeslání:**
   - nahoře souhrnný error alert `Přihlášku se nepodařilo odeslat. Zkontrolujte zvýrazněná pole.` s kotvami na pole,
   - chybová pole ve stavu Error podle DS,
   - scroll/fokus na první chybu.
4. **Odesláno (success):** formulář se nahradí potvrzením:
   - ikona úspěchu,
   - H2 `Děkujeme, přihláška je odeslaná`,
   - text `Potvrzení jsme poslali na {e-mail}. Ozveme se vám s termíny vybraných školení.`,
   - rekapitulace vybraných kurzů,
   - sekundární tlačítko `Zpět na Pro Music Academy`.
5. **Loading:** tlačítko ve stavu loading během odesílání.
6. Stavy komponent: default / hover / focus / selected / disabled / error pro výběrovou kartu, input a checkbox.

## 6. UX a přístupnost
- Validace **po opuštění pole** (on blur) a při odeslání. Neukazuj chybu při psaní.
- Labely vždy nad polem, placeholder nesmí nahrazovat label.
- Výběrová karta: `<label>` obaluje celý obsah karty, klávesnice (Tab / mezerník), viditelný focus ring z DS.
- Kontrast textu minimálně WCAG AA. Stav selected nesmí být rozlišený jen barvou (checkbox + border).
- Touch target minimálně 44 px. Na mobilu `inputmode`/typ `tel` a `email`.
- Skupiny checkboxů sémanticky jako `fieldset` + `legend` (nadpis skupiny).

## 7. Technické poznámky pro implementaci (nechat v anotaci)
Stávající web běží na Drupal Webform. Zachovej názvy polí, aby šel nový front-end napojit na stávající backend:

| Pole | name |
|---|---|
| Jméno | `pma_jmeno` |
| Příjmení | `pma_prijmeni` |
| E-mail | `pma_email` |
| Telefon | `pma_telefon` |
| Firma | `pma_firma` |
| Školení L-Acoustics (checkbox group) | `pma_lacoustics[]` |
| Smaart | `skoleni_smaart[smaart]` |
| Poznámka | `pma_poznamka` |
| Souhlas | `…zpracovanim_osobnich_udaju` (dnes radio) |

Hodnoty checkboxů `pma_lacoustics`: `la_syswork`, `la_se_soundvision`, `la_se_drivesystem`, `la_se_p1m1`, `la_st_lsi`, `la_st_kiva`, `la_st_kara`, `la_st_k3`, `la_st_k2`, `la_st_k1`, `la_st_l2`, `la_is_lisatech`, `la_is_lisasys`, `la_is_lisamix`, `la_is_lisapre`, `la_adv_vcls`, `la_adv_lsc`.

Předpony hodnot odpovídají skupinám v sekci 2: `se` = System Engineer, `st` = System Technician, `is` = Immersive, `adv` = System Expert.

## 8. K ověření s klientem (zapsat jako poznámky na plátno)
- Popisy jednotlivých kurzů, délka, cena, místo konání. Mají se zobrazit v kartách?
- Doba odpovědi a kontakt na koordinátora.
- Text FAQ.
- Změna radio → checkbox u souhlasu a nové pravidlo „alespoň jedno školení“.
