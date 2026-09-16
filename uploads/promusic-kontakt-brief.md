# Brief pro Claude Design — redesign stránky Kontakt (PRO MUSIC, s.r.o.)

## 1. Zadání
Redesign stránky **Kontaktní informace** na webu promusic.cz.
Cíl: návštěvník do 5 sekund najde, **komu volat / psát** (obchod, technická podpora, servis, kancelář), a snadno dohledá fakturační údaje a cestu na firmu.

- Aktuální URL: https://promusic.cz/content/kontaktni-informace-3
- Title: `Kontaktní informace | PRO MUSIC, s.r.o.`
- Breadcrumb: Domů › Kontakt
- Jazyk: čeština
- Firma: distributor a dodavatel profesionální audio, světelné a video techniky (Pro Audio, Pro Light, Video, Instalace A/V)
- Výstup: desktop + mobil (mobile-first, telefony a e-maily klikací `tel:` / `mailto:`)

---

## 2. Kompletní data (použij přesně, nic nevymýšlej)

### Firma
| Pole | Hodnota |
|---|---|
| Název | PRO MUSIC, s.r.o. |
| Adresa | Horská 922, 541 01 Trutnov, Česká republika |
| IČ | 26006171 |
| DIČ | CZ26006171 |
| Zápis v OR | Krajský soud v Hradci Králové, oddíl C, vložka 19640 (zapsáno 24. 2. 2004) |

### Hlavní spojení
| Kanál | Hodnota |
|---|---|
| Telefon (ústředna) | +420 499 735 010 |
| Fax | +420 499 735 011 |
| E-mail | info@promusic.cz |
| Web | www.promusic.cz |

### Technická podpora
| Kanál | Hodnota |
|---|---|
| Hotline | +420 775 328 292 |
| E-mail | support@promusic.cz |
| RMA formulář | https://promusic.cz/node/1302 |
| RMA formulář Audio-Technica | https://promusic.cz/node/1484 |
| Reklamační řád | PDF (odkaz převzít z aktuální stránky) |

### Bankovní spojení
| Pole | Hodnota |
|---|---|
| Banka | ČSOB a.s. |
| Číslo účtu | 189519585 / 0300 |

### Tým PRO MUSIC (8 lidí)
| # | Jméno | Pozice | Telefon | E-mail |
|---|---|---|---|---|
| 1 | Ing. Daniel Krčmář | Jednatel / ředitel společnosti | — | dan@promusic.cz |
| 2 | Mgr. Petr Hájek | Obchodní ředitel | +420 602 402 429 | hajek@promusic.cz |
| 3 | Ing. Michal Konštacký | Projektový manažer – světla | +420 728 514 717 | michal@promusic.cz |
| 4 | Jan Rýdl | Produktový specialista | +420 775 328 294 | jan@promusic.cz |
| 5 | Petr Šťásek | Produktový specialista, technická podpora | +420 777 613 215 | petr@promusic.cz |
| 6 | Michal Šedivec | Servisní technik | +420 737 231 176 | sedivec@promusic.cz |
| 7 | Ing. Radek Lesa | Aplikační specialista | — | lesa@promusic.cz |
| 8 | Markéta Holá | Office manager | +420 499 735 010, +420 775 328 293 | marketa@promusic.cz |

> Přesné znění pozic ověř na živé stránce — v podkladu byly převzaty strojově.

### Mapa
- Google Maps embed na adresu Horská 922, Trutnov (na současné stránce je iframe `google.com/maps/embed`).
- Přidej tlačítko „Navigovat“ → `https://maps.google.com/?q=Horská+922,+541+01+Trutnov`

### Vizuální podklady
- Logo: `promusic_whitebg_1262x562.jpg` (verze na bílém pozadí)
- Fotka budovy / letecký snímek sídla (je na současné stránce)
- Fotky členů týmu na současné stránce **nejsou** → navrhni kartu s iniciálami / placeholderem, aby šly fotky doplnit později.

---

## 3. Současný stav (co redesignujeme)
Pořadí obsahu dnes:
1. Tabulka podpory (hotline, e-mail, užitečné odkazy RMA)
2. Logo
3. Fotka budovy
4. Adresa
5. Mapa
6. Tabulka spojení (tel., fax, e-mail, web)
7. Fakturační údaje (IČ, DIČ)
8. Bankovní spojení
9. Text o zápisu v OR
10. Tým PRO MUSIC – tabulka 8 lidí

Problémy:
- Vše jsou za sebou řazené tabulky bez hierarchie, logo uprostřed obsahu je zbytečné.
- Fakturační údaje jsou výš než lidé, přitom lidi hledá většina návštěvníků.
- Tým je jen tabulka – bez rozdělení podle toho, s čím mi kdo pomůže.
- Na mobilu tabulky nefungují.

Globální prvky webu (zachovat konzistenci):
- Header: logo, hlavní menu **O společnosti · Produkty · Značky · Novinky · Reference · Second Hand · Školení · Kontakt**, vyhledávání
- Footer: sloupce Kategorie, Značky, Kontakt; odkaz „Zásady použití cookies a ochrany soukromí“

---

## 4. Doporučená struktura nové stránky
1. **Hero / rychlý kontakt** – H1 „Kontakt“, 3 hlavní dlaždice:
   - Obchod a poptávky → +420 499 735 010 · info@promusic.cz
   - Technická podpora → +420 775 328 292 · support@promusic.cz
   - Servis a reklamace → RMA formulář · RMA Audio-Technica · Reklamační řád
2. **Tým podle oblasti** – karty (jméno, pozice, tel., e-mail), seskupené:
   - Vedení a obchod: Krčmář, Hájek
   - Projekty a produkty: Konštacký (světla), Rýdl, Lesa
   - Technická podpora a servis: Šťásek, Šedivec
   - Kancelář: Holá
3. **Kde nás najdete** – adresa + fotka budovy + mapa + tlačítko Navigovat
4. **Firemní údaje** – kompaktní blok: IČ, DIČ, zápis v OR, banka + účet, fax (s tlačítkem „Kopírovat“ u IČ, DIČ a čísla účtu)

## 5. Požadavky na UX
- Každý telefon `tel:`, každý e-mail `mailto:`; na mobilu velké tap targety (min. 44 px).
- Telefony formátovat jednotně: `+420 XXX XXX XXX`.
- Fax vizuálně upozadit (sekundární údaj).
- Nepřidávat údaje, které v podkladu nejsou (otevírací doba, sociální sítě, kontaktní formulář) – označit jako volitelné sloty.

## 6. Otevřené otázky ke klientovi (neblokují návrh)
- Otevírací doba / pracovní doba podpory?
- Je fax ještě aktivní, nebo ho vypustit?
- Mají být na stránce fotky členů týmu?
- Chtějí kontaktní / poptávkový formulář?
- Sociální sítě (Facebook, Instagram, YouTube)?
- Je adresa sídla zároveň adresou pro zasílání servisu / osobní odběr?
