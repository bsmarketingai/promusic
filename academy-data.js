/* PRO MUSIC ACADEMY — data plánovaných školení.
   Jediné místo, kde se přidává nebo edituje termín školení.
   Výpis: skoleni.html (skoleni-list.js) · detail: skoleni-detail.html?k=<slug> (skoleni-detail.js)

   { slug, cat (kategorie = filtr), n, date (ISO začátek, řadí výpis), dateLabel,
     dni, misto, lektor, cena, cenaNote, places (kapacita), taken (obsazeno),
     img, perex, note (krátký popis do výpisu),
     body[] — detailní text: "odstavec" | {h:"Nadpis", p:["…"]} | {h, ul:["…"]},
     facts[[k,v]], specs[[k,v]] — program dne }  */
window.PM_ACADEMY_CATS = [
  "Základ",
  "System Engineer",
  "System Technician",
  "Immersive (L-ISA)",
  "System Expert",
  "Smaart"
];

window.PM_ACADEMY = [
{
  slug: "la-system-workflow-2026-10",
  cat: "Základ",
  n: "L-Acoustics System & Workflow",
  date: "2026-10-13",
  dateLabel: "13.–14. 10. 2026",
  dni: "2 dny · 9:00–17:00",
  misto: "PRO MUSIC, Trutnov",
  lektor: "Certifikovaný lektor L-Acoustics",
  cena: "9 800 Kč",
  cenaNote: "bez DPH / osoba",
  places: 12, taken: 9,
  img: "assets/firma/treninkove-prostory-pulty.jpg",
  note: "Vstupní školení celé řady L-Acoustics. Architektura systému, terminologie, workflow od návrhu po nasazení.",
  perex: "Vstupní bod celé certifikační řady L-Acoustics. Bez něj nemá smysl pokračovat dál — je povinným předpokladem pro všechna navazující školení.",
  body: [
    "Dvoudenní kurz staví společný jazyk: jak je systém L-Acoustics postavený, proč je postavený právě takhle a jak s ním pracovat od prvního návrhu až po předání na akci.",
    { h: "Pro koho je kurz", ul: [
      "Zvukaři a systémoví technici, kteří se systémy L-Acoustics pracují nebo je mají převzít do péče",
      "Rentalové firmy zařazující L-Acoustics do parku techniky",
      "Technici kulturních domů, divadel a sálů s pevnou instalací"
    ] },
    { h: "Co se naučíte", ul: [
      "Architektura systému — reproduktory, amplifikované kontrolery, sítě",
      "Terminologie a logika návrhu (coverage, headroom, rezerva)",
      "Workflow: návrh → simulace → nastavení → kontrola",
      "Bezpečné a opakovatelné postupy při stavbě"
    ] },
    { h: "Předpoklady", p: ["Praxe se zvukovou technikou. Není potřeba žádné předchozí školení L-Acoustics."] },
    { h: "Co dostanete", p: ["Certifikát L-Acoustics System & Workflow, skripta a přístup k dokumentaci. Občerstvení a obědy jsou v ceně."] }
  ],
  facts: [
    ["Značka", "L-Acoustics"],
    ["Úroveň", "Vstupní — bez předpokladů"],
    ["Jazyk", "Čeština"],
    ["Certifikát", "Ano, L-Acoustics"]
  ],
  specs: [
    ["Den 1 · dopoledne", "Architektura systému, terminologie"],
    ["Den 1 · odpoledne", "Amplifikované kontrolery, presety, sítě"],
    ["Den 2 · dopoledne", "Workflow návrhu, coverage a headroom"],
    ["Den 2 · odpoledne", "Praktická stavba, kontrola systému, test"]
  ]
},
{
  slug: "la-soundvision-2026-10",
  cat: "System Engineer",
  n: "Soundvision",
  date: "2026-10-27",
  dateLabel: "27. 10. 2026",
  dni: "1 den · 9:00–17:00",
  misto: "PRO MUSIC, Trutnov",
  lektor: "Certifikovaný lektor L-Acoustics",
  cena: "5 400 Kč",
  cenaNote: "bez DPH / osoba",
  places: 10, taken: 4,
  img: "assets/firma/soundvision-simulace.png",
  note: "3D simulace systému: model prostoru, návrh polí, predikce pokrytí a export dat pro stavbu.",
  perex: "Praktický den v Soundvision — od modelu prostoru po exportovaný návrh, se kterým jde rovnou stavět.",
  body: [
    "Soundvision je nástroj, ve kterém návrh systému vzniká a obhájí se ještě před tím, než se cokoli zavěsí. Kurz je postavený na reálných zadáních — sál, aréna, festivalové pódium.",
    { h: "Co se naučíte", ul: [
      "Modelování prostoru a import podkladů",
      "Návrh polí, mechanika závěsu a limity",
      "Predikce pokrytí, SPL mapy a čitelnost výstupů",
      "Export dat pro stavbu a pro LA Network Manager"
    ] },
    { h: "Předpoklady", p: ["Absolvované školení System & Workflow. Vlastní notebook s instalovaným Soundvision."] }
  ],
  facts: [
    ["Značka", "L-Acoustics"],
    ["Úroveň", "System engineer"],
    ["Předpoklad", "System & Workflow"],
    ["Certifikát", "Ano, L-Acoustics"]
  ],
  specs: [
    ["Dopoledne", "Model prostoru, podklady, mechanika"],
    ["Odpoledne", "Návrh polí, predikce, export dat"]
  ]
},
{
  slug: "la-lsi-2026-11",
  cat: "System Technician",
  n: "Loudspeaker System Implementation",
  date: "2026-11-10",
  dateLabel: "10.–11. 11. 2026",
  dni: "2 dny · 9:00–17:00",
  misto: "PRO MUSIC, Trutnov",
  lektor: "Certifikovaný lektor L-Acoustics",
  cena: "9 800 Kč",
  cenaNote: "bez DPH / osoba",
  places: 12, taken: 11,
  img: "assets/projekty/djkt-plzen/array-strop.jpg",
  note: "Praktická implementace reproduktorových systémů — stavba, zapojení, kontrola a předání.",
  perex: "Dva dny rukama na technice. Jak systém postavit, zapojit a zkontrolovat tak, aby se na něj dalo spolehnout.",
  body: [
    "Kurz stojí na praxi: reálné pole, reálné kabely, reálné chyby, které se dají udělat. Cílem je technik, který systém postaví bez asistence a dokáže ho předat s protokolem.",
    { h: "Co se naučíte", ul: [
      "Stavba a závěs polí, bezpečnost a zátěže",
      "Zapojení a topologie sítí, redundance",
      "Kontrola systému před akcí, hledání závad",
      "Dokumentace a předání"
    ] },
    { h: "Předpoklady", p: ["Absolvované školení System & Workflow."] }
  ],
  facts: [
    ["Značka", "L-Acoustics"],
    ["Úroveň", "System technician"],
    ["Předpoklad", "System & Workflow"],
    ["Certifikát", "Ano, L-Acoustics"]
  ],
  specs: [
    ["Den 1", "Mechanika, závěs, zapojení"],
    ["Den 2", "Sítě, kontrola, závady, předání"]
  ]
},
{
  slug: "la-lisa-technology-2026-11",
  cat: "Immersive (L-ISA)",
  n: "L-ISA Technology",
  date: "2026-11-24",
  dateLabel: "24. 11. 2026",
  dni: "1 den · 9:00–17:00",
  misto: "Hudební divadlo Karlín, Praha",
  lektor: "Certifikovaný lektor L-Acoustics",
  cena: "6 200 Kč",
  cenaNote: "bez DPH / osoba",
  places: 14, taken: 6,
  img: "assets/projekty/karlin/sal-full.png",
  note: "Objektový zvuk od základu — principy L-ISA, topologie systému, role v produkci. Povinné pro další L-ISA školení.",
  perex: "Jak objektový zvuk funguje a co znamená pro produkci. Povinný předpoklad pro navazující L-ISA školení.",
  body: [
    "Kurz probíhá v prostoru s nainstalovaným systémem L-ISA — největším v ČR. Teorie se tak dá hned poslechnout.",
    { h: "Co se naučíte", ul: [
      "Principy objektového zvuku a rozdíl proti stereu a LCR",
      "Topologie L-ISA systému a role jednotlivých vrstev",
      "Workflow produkce a dělba práce mezi mixem a systémem",
      "Co L-ISA vyžaduje od prostoru a od návrhu"
    ] },
    { h: "Předpoklady", p: ["Absolvované školení System & Workflow."] }
  ],
  facts: [
    ["Značka", "L-Acoustics"],
    ["Úroveň", "Immersive system / mixing engineer"],
    ["Předpoklad", "System & Workflow"],
    ["Certifikát", "Ano, L-Acoustics"]
  ],
  specs: [
    ["Dopoledne", "Principy objektového zvuku, topologie"],
    ["Odpoledne", "Poslech a rozbor systému v sále"]
  ]
},
{
  slug: "smaart-suite-v9-2026-12",
  cat: "Smaart",
  n: "Smaart Suite v9",
  date: "2026-12-08",
  dateLabel: "8.–9. 12. 2026",
  dni: "2 dny · 9:00–17:00",
  misto: "PRO MUSIC, Trutnov",
  lektor: "Lektor Rational Acoustics",
  cena: "10 500 Kč",
  cenaNote: "bez DPH / osoba",
  places: 10, taken: 10,
  img: "assets/firma/nabizime-konzultace.jpg",
  note: "Měření a analýza systému: přenosová funkce, impulsní odezva, delay, čtení dat a rozhodování podle nich.",
  perex: "Měření, které vede k rozhodnutí. Dva dny nad Smaart Suite v9 — od nastavení měřicí cesty po interpretaci dat.",
  body: [
    "Kurz učí měřit tak, aby výsledek něco znamenal: správně postavená měřicí cesta, opakovatelná metodika a čtení dat bez dohadů.",
    { h: "Co se naučíte", ul: [
      "Měřicí cesta, kalibrace a zdroje chyb",
      "Přenosová funkce, impulsní odezva, koherence",
      "Měření a nastavení delay mezi zdroji",
      "Interpretace dat a zásahy, které z nich vyplývají"
    ] },
    { h: "Předpoklady", p: ["Praxe se systémovým zvukem. Vlastní notebook s licencí Smaart Suite v9 (možno zapůjčit)."] }
  ],
  facts: [
    ["Značka", "Rational Acoustics"],
    ["Úroveň", "Systémový zvuk — středně pokročilí"],
    ["Jazyk", "Čeština"],
    ["Certifikát", "Ano, Rational Acoustics"]
  ],
  specs: [
    ["Den 1", "Měřicí cesta, přenosová funkce, koherence"],
    ["Den 2", "Impulsní odezva, delay, interpretace"]
  ]
},
{
  slug: "la-drive-system-2027-01",
  cat: "System Engineer",
  n: "Drive System",
  date: "2027-01-19",
  dateLabel: "19. 1. 2027",
  dni: "1 den · 9:00–17:00",
  misto: "PRO MUSIC, Trutnov",
  lektor: "Certifikovaný lektor L-Acoustics",
  cena: "5 400 Kč",
  cenaNote: "bez DPH / osoba",
  places: 10, taken: 2,
  img: "assets/firma/servisni-dilna.jpg",
  note: "Amplifikované kontrolery a LA Network Manager — konfigurace, presety, monitoring a redundance.",
  perex: "Celá driveová část systému v jednom dni: konfigurace kontrolerů, presety, monitoring a redundantní sítě.",
  body: [
    "Kurz pro ty, kdo systém nastavují a hlídají v provozu. Vše se dělá na živém racku, včetně simulovaných poruch.",
    { h: "Co se naučíte", ul: [
      "Konfigurace amplifikovaných kontrolerů",
      "LA Network Manager — projekty, presety, skupiny",
      "Monitoring, alarmy a diagnostika v provozu",
      "Redundantní topologie sítí"
    ] },
    { h: "Předpoklady", p: ["Absolvované školení System & Workflow."] }
  ],
  facts: [
    ["Značka", "L-Acoustics"],
    ["Úroveň", "System engineer"],
    ["Předpoklad", "System & Workflow"],
    ["Certifikát", "Ano, L-Acoustics"]
  ],
  specs: [
    ["Dopoledne", "Kontrolery, presety, skupiny"],
    ["Odpoledne", "Monitoring, poruchy, redundance"]
  ]
},
{
  slug: "la-lisa-live-mixing-2027-02",
  cat: "Immersive (L-ISA)",
  n: "L-ISA Live Mixing",
  date: "2027-02-09",
  dateLabel: "9.–10. 2. 2027",
  dni: "2 dny · 10:00–18:00",
  misto: "Hudební divadlo Karlín, Praha",
  lektor: "Certifikovaný lektor L-Acoustics",
  cena: "11 400 Kč",
  cenaNote: "bez DPH / osoba",
  places: 8, taken: 5,
  img: "assets/projekty/karlin/zvukar-foh.jpg",
  note: "Mix v objektovém zvuku — práce s objekty, prostorem a pohybem, workflow s L-ISA Controllerem.",
  perex: "Dva dny za pultem v objektovém zvuku. Jak mixovat scénu, ne kanály.",
  body: [
    "Kurz je postavený na živém materiálu v sále s L-ISA. Účastníci mixují na plném systému a rozebírají výsledek společně.",
    { h: "Co se naučíte", ul: [
      "Práce s objekty: pozice, šířka, vzdálenost, výška",
      "L-ISA Controller ve workflow s konzolí",
      "Pohyb, automatizace a snapshoty",
      "Kontrola výsledku po celém hledišti"
    ] },
    { h: "Předpoklady", p: ["Absolvované školení L-ISA Technology a System & Workflow."] }
  ],
  facts: [
    ["Značka", "L-Acoustics"],
    ["Úroveň", "Immersive mixing engineer"],
    ["Předpoklad", "L-ISA Technology"],
    ["Certifikát", "Ano, L-Acoustics"]
  ],
  specs: [
    ["Den 1", "Objekty, controller, workflow s konzolí"],
    ["Den 2", "Mix live materiálu, automatizace, rozbor"]
  ]
},
{
  slug: "la-k2-system-2027-02",
  cat: "System Technician",
  n: "K2 System",
  date: "2027-02-23",
  dateLabel: "23. 2. 2027",
  dni: "1 den · 9:00–17:00",
  misto: "PRO MUSIC, Trutnov",
  lektor: "Certifikovaný lektor L-Acoustics",
  cena: "5 400 Kč",
  cenaNote: "bez DPH / osoba",
  places: 12, taken: 1,
  img: "assets/projekty/steel-arena/montaz-rigger.jpg",
  note: "Konkrétní systém K2 — mechanika, závěs, konfigurace a typická nasazení od sálu po arénu.",
  perex: "Vše ke K2 v jednom dni: mechanika, závěs, konfigurace a scénáře nasazení.",
  body: [
    "Kurz zaměřený na jeden systém do hloubky — od bumperu po preset. Praxe na reálném poli.",
    { h: "Co se naučíte", ul: [
      "Mechanika, závěs a zátěžové limity K2",
      "Konfigurace a presety pro typická nasazení",
      "Kombinace s dalšími prvky systému",
      "Kontrola pole před akcí"
    ] },
    { h: "Předpoklady", p: ["Absolvované školení System & Workflow."] }
  ],
  facts: [
    ["Značka", "L-Acoustics"],
    ["Úroveň", "System technician"],
    ["Předpoklad", "System & Workflow"],
    ["Certifikát", "Ano, L-Acoustics"]
  ],
  specs: [
    ["Dopoledne", "Mechanika a závěs"],
    ["Odpoledne", "Konfigurace, presety, kontrola"]
  ]
},
{
  slug: "la-lsc-2027-03",
  cat: "System Expert",
  n: "Loudspeaker System Calibration",
  date: "2027-03-16",
  dateLabel: "16.–17. 3. 2027",
  dni: "2 dny · 9:00–17:00",
  misto: "PRO MUSIC, Trutnov",
  lektor: "Certifikovaný lektor L-Acoustics",
  cena: "12 600 Kč",
  cenaNote: "bez DPH / osoba",
  places: 8, taken: 3,
  img: "assets/firma/nabizime-skoleni.jpg",
  note: "Nadstavba pro ty, kdo systém ladí do detailu — metodika kalibrace, měření a rozhodování v prostoru.",
  perex: "Nejvyšší úroveň řady. Metodika kalibrace systému v reálném prostoru, od měření k rozhodnutí.",
  body: [
    "Kurz pro systémové inženýry s praxí. Řeší, co dělat, když prostor nesouhlasí s návrhem — a jak zásah obhájit daty.",
    { h: "Co se naučíte", ul: [
      "Metodika kalibrace krok za krokem",
      "Práce s měřením v problematických prostorech",
      "Rozhodování mezi zásahem do pole a do processingu",
      "Dokumentace kalibrace a předání"
    ] },
    { h: "Předpoklady", p: ["Absolvované školení System & Workflow a praxe s měřením systému (doporučeno Smaart)."] }
  ],
  facts: [
    ["Značka", "L-Acoustics"],
    ["Úroveň", "System expert"],
    ["Předpoklad", "System & Workflow + praxe"],
    ["Certifikát", "Ano, L-Acoustics"]
  ],
  specs: [
    ["Den 1", "Metodika, měření v prostoru"],
    ["Den 2", "Zásahy, verifikace, dokumentace"]
  ]
}
];
