# Brief pro Claude Design — stránka „Partneři“ (PRO MUSIC, s.r.o.)

## Kontext
PRO MUSIC, s.r.o. je český distributor profesionální audio a světelné techniky (L-Acoustics, DiGiCo, ChamSys, Yamaha, Waves ad.). Stránka **Partneři** ukazuje firmy a instituce, které techniku od PRO MUSIC používají — rentaly, produkční firmy, divadla, kluby, festivaly a média. Slouží jako **sociální důkaz (reference)** a jako **rozcestník** pro pořadatele, kteří hledají dodavatele s touto technikou.

Zdroj obsahu: https://promusic.cz/partneri (stav k 16. 9. 2026), celkem **62 partnerů**.

## Co vytvořit
Navrhni novou stránku Partneři (desktop + mobil) s touto strukturou:

1. **Hero** — H1 „Partneři“ + krátký perex (1–2 věty), např.: „Naši techniku používají přední české a slovenské rentaly, divadla, kluby i festivaly.“ Pod ním řada čísel: **62 partnerů · 40 s L-Acoustics · 37 s DiGiCo**.
2. **Filtr** (chipy/taby): Vše · Rentaly a produkce (43) · Venues a instituce (19) + filtr podle značky (L-Acoustics, DiGiCo, ChamSys, Yamaha, Waves). Filtr po značce funguje nad sloupcem „Značky“.
3. **Zvýraznění: Certifikovaní L-Acoustics partneři** — samostatný pruh s 5 firmami (sloupec „L-Acoustics certifikace“), větší karty s uvedenými systémy (K1, K2, KARA, KUDO).
4. **Mřížka log** — sekce „Rentaly a produkce“ a „Venues a instituce“. Karta = logo (jednotná výška boxu, logo vycentrované, `object-fit: contain`), název, malé štítky značek; hover/klik vede na web partnera (pokud je), jinak na detail partnera.
5. **CTA na konci** — „Chcete se stát partnerem / hledáte dodavatele s technikou L-Acoustics či DiGiCo?“ + tlačítko Kontaktujte nás.

## Pravidla pro loga
- Loga jsou ve složce `logos/`, pojmenovaná `NN-nazev.ext` (NN = pořadí z tabulky níže, pořadí odpovídá současnému webu).
- Jsou to **rastry v malém rozlišení (max. 220 px na delší straně)**, různé formáty (PNG/JPG/GIF), některá mají bílé nebo barevné pozadí. Proto:
  - dávej je do **světlých karet se stejným poměrem stran** (např. 3:2) s vnitřním paddingem, ať rozdílné pozadí a proporce nerozbijí rytmus mřížky;
  - nezvětšuj je nad cca 160 px šířky (rozmazání);
  - volitelně jednotný vzhled: grayscale → barva na hover (ověř čitelnost u log s barevným pozadím).
- Loga nepřekresluj ani neupravuj jejich podobu — jen je umísti.
- V designu označ poznámkou, že pro produkci je vhodné vyžádat si od partnerů vektorová loga (SVG).

## Tón a copy
Česky, věcně, stručně. Žádné superlativy navíc. Názvy partnerů přebírej přesně podle tabulky.

## Data — Rentaly a produkce (43)
| # | Název | Logo | Rozměr (px) | Web | Značky (dodávka od PRO MUSIC) | L-Acoustics certifikace |
|---|---|---|---|---|---|---|
| 1 | High Lite Touring, s.r.o. | `logos/01-high-lite-touring-s-r-o.png` | 220×116 | www.highlite.cz | L-Acoustics, DiGiCo, ChamSys, Vari-Lite, Rational Acoustics, Waves | K1, K2, KARA |
| 2 | T-Servis | `logos/02-t-servis.jpg` | 220×72 | — | L-Acoustics, Yamaha, Luminex | K1, KARA, KUDO |
| 3 | Pink Panther Agency | `logos/03-pink-panther-agency.gif` | 220×69 | www.pink-panther.cz | L-Acoustics, DiGiCo, Audio-Technica, Cybermotion, TEQSAS, Waves |  |
| 4 | Laser Live | `logos/04-laser-live.jpg` | 220×89 | www.laserlive.sk | L-Acoustics | K1, KARA, KUDO |
| 5 | Ministry | `logos/05-ministry.gif` | 220×102 | www.ministryrental.sk | L-Acoustics, Yamaha | K2, KARA, KUDO |
| 6 | EVENTSUPPORT s.r.o. | `logos/06-eventsupport-s-r-o.png` | 220×220 | www.eventsupport.cz | L-Acoustics, DiGiCo, ChamSys, Luminex, Waves |  |
| 7 | JESA Sound & Light Equipment | `logos/07-jesa-sound-light-equipment.png` | 220×143 | www.jesa.cz | L-Acoustics, DiGiCo, Yamaha | K2, KARA, KUDO |
| 8 | Koncertservis | `logos/08-koncertservis.jpg` | 220×44 | — | L-Acoustics, DiGiCo, ChamSys |  |
| 9 | Start Production | `logos/09-start-production.png` | 220×43 | www.startproduction.cz | L-Acoustics, DiGiCo |  |
| 10 | Borovka Rental | `logos/10-borovka-rental.png` | 220×65 | — | L-Acoustics, DiGiCo, ChamSys, Waves |  |
| 11 | Audioblue | `logos/11-audioblue.jpg` | 220×52 | www.audioblue.cz | L-Acoustics, DiGiCo |  |
| 12 | ZL Production | `logos/12-zl-production.png` | 220×36 | www.zlproduction.cz | DiGiCo, ChamSys, Yamaha |  |
| 13 | AVT Group | `logos/13-avt-group.png` | 220×137 | — | L-Acoustics, DiGiCo, Yamaha |  |
| 14 | Pragosound s.r.o. | `logos/14-pragosound-s-r-o.png` | 220×71 | www.pragosound.cz | DiGiCo |  |
| 15 | Agentura Zvuk | `logos/15-agentura-zvuk.jpg` | 220×74 | — | L-Acoustics |  |
| 16 | Amex Audio | `logos/16-amex-audio.png` | 220×59 | www.amexaudio.sk | DiGiCo |  |
| 17 | BMM Art | `logos/17-bmm-art.jpg` | 220×94 | — | L-Acoustics, DiGiCo |  |
| 22 | Cross Audio | `logos/22-cross-audio.jpg` | 220×161 | www.crossaudio.cz | L-Acoustics, Yamaha |  |
| 23 | Danceshow | `logos/23-danceshow.jpg` | 220×70 | www.danceshow.cz | L-Acoustics, DiGiCo |  |
| 30 | EDWARD Sound and Light agency | `logos/30-edward-sound-and-light-agency.gif` | 220×80 | www.edward.cz | L-Acoustics, Yamaha |  |
| 31 | F.O.H s.r.o. | `logos/31-f-o-h-s-r-o.jpg` | 220×78 | www.fohsro.cz | L-Acoustics, Yamaha |  |
| 33 | Friends Media Slovakia s.r.o. | `logos/33-friends-media-slovakia-s-r-o.png` | 220×24 | www.friendsmedia.sk | L-Acoustics |  |
| 36 | Milan Andrle Sound Systems | `logos/36-milan-andrle-sound-systems.png` | 220×91 | www.andrlemilan.cz | DiGiCo, ChamSys |  |
| 39 | Petr Frýdecký | `logos/39-petr-frydecky.png` | 220×104 | www.prime-sound.cz | L-Acoustics, DiGiCo |  |
| 40 | Produkce na jedničku | `logos/40-produkce-na-jednicku.png` | 220×134 | www.produkce1.cz | L-Acoustics |  |
| 41 | Q-99 | `logos/41-q-99.jpg` | 220×216 | www.q-99.sk | L-Acoustics |  |
| 42 | Quix Event | `logos/42-quix-event.png` | 220×97 | www.quix.cz | DiGiCo |  |
| 43 | Remak Agency | `logos/43-remak-agency.png` | 220×96 | www.remakagency.cz | L-Acoustics, DiGiCo |  |
| 44 | Rock Audio | `logos/44-rock-audio.jpg` | 220×92 | www.rockaudio.cz | L-Acoustics, DiGiCo |  |
| 46 | Silent Sound | `logos/46-silent-sound.png` | 220×38 | www.silentsound.cz | L-Acoustics, Yamaha |  |
| 48 | SMART Production | `logos/48-smart-production.png` | 220×82 | www.smartproduction.cz | L-Acoustics |  |
| 49 | SONING Praha a.s. | `logos/49-soning-praha-a-s.png` | 220×86 | www.soning.cz | L-Acoustics, DiGiCo |  |
| 52 | AV media | `logos/52-av-media.png` | 220×45 | www.avmedia.cz | L-Acoustics |  |
| 53 | Balonton | `logos/53-balonton.jpg` | 220×65 | — | DiGiCo |  |
| 54 | Bohemia Sound | `logos/54-bohemia-sound.jpg` | 220×115 | www.bohemia-sound.cz | DiGiCo |  |
| 55 | Csound | `logos/55-csound.jpg` | 220×85 | — | L-Acoustics, DiGiCo |  |
| 56 | Eventlive | `logos/56-eventlive.jpg` | 220×220 | — | DiGiCo, ChamSys |  |
| 57 | Libor Chadraba | `logos/57-libor-chadraba.jpg` | 220×137 | www.zvuk-drak.cz | DiGiCo |  |
| 58 | MASOUND | `logos/58-masound.jpg` | 220×106 | — | L-Acoustics |  |
| 59 | Professional Sound | `logos/59-professional-sound.png` | 209×220 | — | DiGiCo |  |
| 60 | S-System | `logos/60-s-system.jpg` | 220×65 | www.s-system.cz | DiGiCo |  |
| 61 | Solitec rental | `logos/61-solitec-rental.jpg` | 220×155 | — | ChamSys |  |
| 62 | Švejk Team | `logos/62-svejk-team.jpg` | 220×185 | www.svejkteam.cz | ChamSys |  |

## Data — Venues a instituce (19)
| # | Název | Logo | Rozměr (px) | Web | Značky (dodávka od PRO MUSIC) | L-Acoustics certifikace |
|---|---|---|---|---|---|---|
| 18 | Česká Televize | `logos/18-ceska-televize.png` | 220×143 | — | L-Acoustics |  |
| 19 | Český Rozhlas | `logos/19-cesky-rozhlas.png` | 220×47 | — | DiGiCo |  |
| 20 | Club Epic Prague | `logos/20-club-epic-prague.jpg` | 220×124 | — | L-Acoustics |  |
| 21 | Colours of Ostrava | `logos/21-colours-of-ostrava.png` | 220×94 | — | L-Acoustics |  |
| 24 | Divadlo Hybernia | `logos/24-divadlo-hybernia.png` | 220×103 | — | DiGiCo |  |
| 25 | Divadlo Josefa Kajetána Tyla Plzeň | `logos/25-divadlo-josefa-kajetana-tyla-plzen.png` | 220×48 | — | L-Acoustics, DiGiCo |  |
| 26 | Divadlo Minor | `logos/26-divadlo-minor.jpg` | 220×206 | — | DiGiCo |  |
| 27 | Divadlo na Orlí | `logos/27-divadlo-na-orli.jpg` | 220×110 | — | — |  |
| 28 | Dolní oblast Vítkovice | `logos/28-dolni-oblast-vitkovice.png` | 218×220 | — | — |  |
| 29 | DOX | `logos/29-dox.jpg` | 220×41 | — | — |  |
| 32 | Forum Karlín | `logos/32-forum-karlin.jpg` | 220×147 | — | L-Acoustics, DiGiCo |  |
| 34 | Kongresové Centrum Praha | `logos/34-kongresove-centrum-praha.png` | 220×167 | — | DiGiCo, ChamSys |  |
| 35 | Lucerna Music Bar | `logos/35-lucerna-music-bar.jpg` | 220×138 | — | L-Acoustics, DiGiCo |  |
| 37 | Národní Divadlo | `logos/37-narodni-divadlo.png` | 220×38 | — | DiGiCo |  |
| 38 | Národní Divadlo Brno | `logos/38-narodni-divadlo-brno.jpg` | 220×77 | — | — |  |
| 45 | Roxy Club Prague | `logos/45-roxy-club-prague.jpg` | 220×65 | — | L-Acoustics |  |
| 47 | ŠKODA AUTO Muzeum | `logos/47-skoda-auto-muzeum.png` | 186×220 | — | L-Acoustics, DiGiCo, Vari-Lite, Ayrton, Waves |  |
| 50 | SONO centrum | `logos/50-sono-centrum.jpg` | 220×220 | — | L-Acoustics |  |
| 51 | UFFO | `logos/51-uffo.jpg` | 220×96 | — | L-Acoustics, DiGiCo |  |

## Poznámky k datům
- Rozdělení na „Rentaly a produkce“ / „Venues a instituce“ je odvozené z názvů (současný web kategorie nemá) — před finálem ověřit s klientem.
- Sloupec „Web“ je vytažený z detailu partnera; „—“ = web na současném detailu uveden není.
- Značky = značky, které partner od PRO MUSIC odebírá (podle detailu partnera na promusic.cz).
- Kontaktní údaje (adresy, telefony) na stránku Partneři nedávej — zůstávají na detailu partnera / webu partnera.
