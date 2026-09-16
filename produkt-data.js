/* PRO MUSIC — SECOND HAND: detaily produktů (produkt.html?p=<slug>).
   Jediné místo, kde se edituje obsah detailu.
   { slug: { n, brand, flags[], stav, cena, cenaNote, stock (číslo ks) | vars[{n,q}],
             perex, body[] (odstavce), specs[[k,v]], img, facts[[k,v]] } } */
window.PM_PRODUCTS = {
"rf-venue-combine4": {
  n: "RF Venue COMBINE4™",
  brand: "RF Venue",
  flags: ["Nové", "Nerozbalené se zárukou"],
  stav: "Nové, nerozbalené, se zárukou",
  cena: "12 000 Kč",
  cenaNote: "bez DPH / ks",
  stock: 2,
  img: "assets/secondhand/produkt-001-rf-venue-combine4.jpg",
  perex: "Aktivní 4cestný anténní slučovač pro bezdrátové in-ear monitorovací systémy. Sloučí až 4 IEM vysílače do jediné vysílací antény — omezí rušení mezi vysílači a zajistí stabilnější provoz.",
  body: [
    "Kompatibilní s jakoukoliv značkou IEM systémů i směrových antén v pásmu 470–960 MHz. Jedna anténa místo čtyř znamená čistší RF prostředí na pódiu a výrazně méně práce při stavbě.",
    "COMBINE4 je vybaven 4× BNC vstupy pro vysílače, 1× BNC výstupem pro anténu a LED indikací signálu pro každý vstup na předním panelu. Součástí jsou také 4× DC výstupy pro napájení připojených IEM vysílačů. Dodáváno včetně napájecího kabelu, 4× DC kabelů a 4× BNC propojek."
  ],
  specs: [
    ["Frekvenční rozsah", "470 – 960 MHz"],
    ["Vstupy", "4× BNC RF In"],
    ["Výstup", "1× BNC Antenna Out"],
    ["Max. RF vstupní výkon", "+20 dBm (100 mW)"],
    ["Systémový zisk", "0 dB (±2 dB)"],
    ["Napájení", "100 – 240 V AC, 50/60 Hz"],
    ["DC výstupy", "+12 V / max. 1 A"],
    ["Rozměry (Š × V × H)", "480 × 45 × 250 mm"],
    ["Hmotnost", "2,3 kg"],
    ["Příslušenství", "AC kabel, 4× DC kabel, 4× BNC propojka"]
  ],
  facts: [
    ["Značka", "RF Venue"],
    ["Kategorie", "Pro Audio · bezdrátové systémy"],
    ["Záruka", "Plná, jako u nového zboží"],
    ["Vyzvednutí", "Trutnov nebo doprava po ČR"]
  ]
},
"at-lp140xp": {
  n: "Audio-Technica AT-LP140XP",
  brand: "Audio-Technica",
  flags: ["Nové", "Nerozbalené se zárukou"],
  stav: "Nové, nerozbalené, se zárukou",
  cena: "5 800 Kč",
  cenaNote: "bez DPH / ks",
  vars: [{ n: "Stříbrný", q: 2 }, { n: "Černý", q: 1 }],
  img: "assets/secondhand/produkt-016-audio-technica-at-lp140xp.jpg",
  perex: "Vysoce výkonný profesionální DJ gramofon s plně manuálním ovládáním, navržený pro vynikající stabilitu a přesnost.",
  body: [
    "Výkonný DC motor s vysokým točivým momentem a hliníkový talíř s tlumením proti rezonanci. Přehrává rychlosti 33⅓, 45 a 78 RPM a dodává se s DJ přenoskou AT-XP3 se silným výstupem 5,5 mV.",
    "Vyvážené S-raménko s hydraulicky tlumeným zvedákem, nastavitelnou výškou a dynamickým anti-skatingem. Stroboskopický talíř s indikátorem rychlosti, volitelný kvartzový zámek a pitch control v rozsahu ±8 %, ±16 % a ±24 %.",
    "V balení: odnímatelný RCA kabel, napájecí kabel, adaptér pro 45 RPM, závaží, plstěná podložka a odnímatelný kryt proti prachu."
  ],
  specs: [
    ["Typ", "3rychlostní, plně manuální"],
    ["Motor", "DC motor s vysokým točivým momentem"],
    ["Rychlosti", "33⅓ / 45 / 78 RPM"],
    ["Talíř", "Hliníkový odlitek"],
    ["Točivý moment", "2,2 kgf-cm"],
    ["Kolísání a třepotání", "< 0,2 % WRMS (33 RPM)"],
    ["Odstup signál/šum", "> 50 dB"],
    ["Výstupní úroveň", "5,5 mV při 1 kHz, 5 cm/s"],
    ["Rozsah pitch", "±8 % / ±16 % / ±24 %"],
    ["Napájení", "115/230 V AC, 60/50 Hz"],
    ["Hmotnost", "10,0 kg"]
  ],
  facts: [
    ["Značka", "Audio-Technica"],
    ["Kategorie", "Pro Audio · DJ technika"],
    ["Záruka", "Plná, jako u nového zboží"],
    ["Vyzvednutí", "Trutnov nebo doprava po ČR"]
  ]
}
};
