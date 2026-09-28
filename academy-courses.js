/* PRO MUSIC ACADEMY — katalog kurzů L-Acoustics (bez termínů; termín se domlouvá na poptávku).
   Zdroj: l-acoustics.com/education/courses (25. 9. 2026), texty přeloženy do CZ.
   Anglicky zůstávají názvy kurzů, learning profily, produkty a software.
   Výpis: skoleni.html (skoleni-kurzy.js) · detail: skoleni-detail.html?k=<slug> (skoleni-detail.js)

   { slug, n, prof[] (learning profily = filtr), img, perex,
     obj[] — cíle ("text" | {t, sub[]}), prod[] — související produkty,
     mod: {pre[], dur[], cap, fmt[], meth, cert[]},
     agenda[{h, it:[[název, délka, "téma; téma"]]}], eq[[nadpis, [položky]]],
     group — název skupiny na platformě, avixa — statusy CTS (nebo null), perk — extra benefit } */
(function () {
  var IMG = "https://www.l-acoustics.com/wp-content/uploads/";
  var SW = "Certifikace kurzu System & Workflow", EN = "Technická angličtina",
    EXP = "Praxe s živým ozvučením", AC = "Znalost akustiky a živého ozvučení";
  var D7 = ["7 hodin"],
    DBOTH = ["Prezenčně: 7 hodin", "Online: 2 virtuální lekce po 2,5 h s týdenním odstupem, mezi nimi cca 2 h samostudia"],
    FON = ["Lektorovaná výuka: prezenčně v učebně"],
    FBOTH = ["Lektorovaná výuka: prezenčně nebo online", "Doplňkové aktivity: online vzdělávací platforma"];
  var C_ON = ["Účast na výuce", "Splnění online aktivit"],
    C_TEST = ["Účast na výuce", "Certifikační test"],
    C_ONT = ["Účast na výuce", "Splnění online aktivit", "Certifikační test"],
    C_PRAC = ["Účast na výuce", "Účast na praktických cvičeních", "Certifikační test"];
  var SVNM = "Notebook s myší a nejnovější verzí Soundvision a LA Network Manager (ke stažení na webu L-Acoustics)",
    PEN = "Blok a pero", PPE = "Osobní ochranné pomůcky včetně bezpečnostní obuvi",
    NET = "Počítač s myší a připojením k internetu";
  var EQ = [["Lektorovaná výuka", [SVNM, PEN]]],
    EQ_ON = [["Lektorovaná výuka", [SVNM, PEN]], ["Online aktivity", [NET]]],
    EQ_RIG = [["Lektorovaná výuka", [SVNM, PPE, PEN]]];
  var ALL3 = "CTS, CTS-D a CTS-I";
  var S1 = "Prezenčně dopoledne · online 1/2", S2 = "Prezenčně odpoledne · online 2/2";

  /* kurzy konkrétních line source systémů mají stejnou osnovu */
  function sys(slug, n, prod, img, exp, group) {
    return {
      slug: slug, n: n, prof: ["System Technician"], img: IMG + img,
      perex: "Poznejte standardní konfigurace referenčního systému " + n.replace(" System", "") + " a vyzkoušejte si v praxi jeho závěs i poslech.",
      obj: ["Rozpoznat součásti systému " + n.replace(" System", ""), "Znát standardní konfigurace reproduktorů " + n.replace(" System", ""),
        "Sestavit a zavěsit systém " + n.replace(" System", ""), "Zapojit kabeláž reproduktorového systému " + n.replace(" System", "")],
      prod: prod,
      mod: { pre: exp ? [SW, EXP, EN] : [SW, EN], dur: D7, cap: "max. 12", fmt: FON, meth: "Prezentace, demonstrace, praktický workshop", cert: C_PRAC },
      agenda: [
        { h: "Dopoledne · učebna", it: [
          ["Představení systému", "0,5 h", "Technologická koncepce; technické parametry"],
          ["Konfigurace reproduktorů", "1 h", "Fyzické rozmístění; elektronická nastavení; akustický výsledek; typická použití"],
          ["Závěs a drive systém", "2 h", "Závěs – možnosti sestavení a mechanická bezpečnost; drive systém – tovární presety a kabeláž reproduktorů"]] },
        { h: "Odpoledne · workshop", it: [
          ["Závěs v praxi", "2 h", "Mechanické prvky; postupy"],
          ["Příprava a poslech", "1,5 h", "Základní nastavení; spuštění a test; porovnání konfigurací"]] }
      ],
      eq: EQ_RIG, group: group, avixa: null
    };
  }

  var LISA_EQ = [["Lektorovaná výuka", ["Notebook s myší (ideálně Apple MacBook Pro nebo srovnatelný, min. macOS 10.13)",
    "Na Macu nejnovější verze L-ISA Studio (aktivuje se během kurzu), na Windows L-ISA Controller – ke stažení na webu L-Acoustics", PEN]]];

  window.PM_COURSE_PROFILES = ["System Technician", "System Engineer", "Immersive System Engineer", "Immersive Mixing Engineer", "Audio Professional", "System Expert"];

  window.PM_COURSES = [
  {
    slug: "system-workflow", n: "System & Workflow",
    prof: ["System Technician", "System Engineer", "Immersive System Engineer", "Immersive Mixing Engineer", "Audio Professional"],
    img: IMG + "2021/03/SystemWorkflow_banner2.jpg",
    perex: "Najděte své místo v ekosystému L-Acoustics a sjednoťte svou praxi s nejnovějšími nástroji a špičkovým workflow.",
    obj: ["Pochopit systémový přístup L-Acoustics k živé reprodukci zvuku", "Znát součásti systému L-Acoustics",
      "Pochopit jednotlivé kroky workflow projektu ozvučení a profesní role, které k nim patří", "Znát nástroje L-Acoustics pro jednotlivé fáze projektu"],
    prod: ["L1 System", "LA1.16i", "Soundvision Connect", "Milan Manager", "LA7.16", "LA-RAK III", "L2", "L2D", "LA7.16i", "L-ISA Studio", "L-ISA Controller", "LA Network Manager", "Soundvision", "LA-RAK II AVB", "KIVA II", "KARA II", "KARA IIi", "K3", "K3i", "K2", "K1", "K1-SB", "P1", "LA2Xi", "LS10", "LA4X", "LA12X", "L-ISA Processor II Core"],
    mod: { pre: [EN], dur: DBOTH, cap: "max. 12", fmt: FBOTH, meth: "Prezentace, demonstrace, tutoriál", cert: C_ON },
    agenda: [
      { h: S1, it: [
        ["Systémový přístup", "2 h", "Zvukový systém; systém L-Acoustics; reproduktorový systém; drive systém; závěsný systém; systém L-ISA"],
        ["Malý systém", "1,5 h", "Základy Soundvision a LA Network Manager; plug-and-play zapojení"]] },
      { h: S2, it: [
        ["Workflow projektu", "2 h", "Projekt; návrh; implementace; kalibrace; provoz"],
        ["Střední systém", "1,5 h", "Tutoriál: návrh systému pro divadlo; ukázka měření a ladění v M1"]] }
    ],
    eq: EQ_ON, group: "System & Workflow", avixa: ALL3
  },
  sys("kiva-ii-system", "Kiva II System", ["KIVA II"], "2021/03/kiva-ii-system-course.jpg", false, "Kiva II System"),
  sys("kara-ii-system", "Kara II System", ["KARA II"], "2021/03/kara-ii-system-course-2k.jpg", false, "Kara II System"),
  sys("k3-system", "K3 System", ["K3"], "2021/03/k3-system-course.jpg", false, "K3"),
  sys("k2-system", "K2 System", ["K2"], "2021/03/k2-system-course.jpg", true, "K2"),
  sys("k1-system", "K1 System", ["K1", "K1-SB"], "2021/03/k1-system-course.jpg", true, "K1 System"),
  {
    slug: "l2-system", n: "L2 System", prof: ["System Technician"],
    img: IMG + "2023/04/Training_Visual_Website_L2_site_certificate.jpg",
    perex: "Poznejte standardní konfigurace referenčního systému L2 a vyzkoušejte si v praxi jeho závěs i poslech.",
    obj: ["Rozpoznat prvky systému L2 a pochopit, jak se navzájem doplňují", "Znát doporučené konfigurace reproduktorů",
      "Připravit a nainstalovat systém L2 tak, aby byl bezpečný a připravený ke kalibraci"],
    prod: ["LA7.16", "L2", "L2D"],
    mod: { pre: [SW, EXP, EN], dur: D7, cap: "max. 12", fmt: FON, meth: "Prezentace, demonstrace, praktický workshop", cert: C_PRAC },
    agenda: [
      { h: "Dopoledne · učebna", it: [
        ["Systém", "15 min", "Technologická koncepce; technické parametry"],
        ["Konfigurace a použití", "45 min", "Fyzické rozmístění; elektronická nastavení; akustický výsledek; typická použití"],
        ["Závěs a drive systém", "1 h", "Závěs – možnosti sestavení a mechanická bezpečnost; drive systém – tovární presety a kabeláž reproduktorů"],
        ["Práce v softwaru", "1,5 h", "Tutoriál se specifiky systému L2"]] },
      { h: "Odpoledne · workshop", it: [
        ["Závěs v praxi", "1,5 h", "Praktický workshop; zavěšení i postavení na zem (ground stack)"],
        ["Příprava a poslech", "2 h", "Základní nastavení; spuštění a test; porovnání konfigurací"]] }
    ],
    eq: EQ_RIG, group: "L2", avixa: null
  },
  {
    slug: "l-acoustics-system-implementation", n: "L-Acoustics System Implementation", prof: ["System Technician"],
    img: IMG + "2023/04/L-Acoustics-implementation-system_L-Acoustics-Education-platform.jpg",
    perex: "Posuňte své dovednosti: naučte se implementovat bezpečný a funkční systém L-Acoustics a připravit ho ke kalibraci.",
    obj: ["Shromáždit a vyhodnotit projektovou dokumentaci a všechny podklady potřebné k implementaci", "Pochopit své odpovědnosti při implementaci",
      { t: "Pochopit, jak:", sub: ["bezpečně sestavit a zavěsit systém podle postupů L-Acoustics", "zapojit a propojit reproduktorový systém",
        "nakonfigurovat drive systém a zkontrolovat reproduktorový systém tak, aby byl připravený ke kalibraci"] }],
    prod: ["L1 System", "LA1.16i", "LA7.16", "L2", "L2D", "LA7.16i", "KARA IIi", "K3i", "LA2Xi"],
    mod: { pre: [SW, EN], dur: DBOTH, cap: "max. 12", fmt: FBOTH, meth: "Prezentace, kvíz", cert: C_ONT },
    agenda: [
      { h: S1, it: [
        ["Dokumentace", "1,5 h", "Referenční soubory; ověření modelu Soundvision proti skutečnosti"],
        ["Sestavení a závěs", "2 h", "Odpovědnosti; závěsné systémy L-Acoustics; reproduktorové zdroje; typ nasazení; možnosti montáže; pozice zdroje; montáž pole"]] },
      { h: S2, it: [
        ["Kabeláž a zapojení", "2 h", "Napájení; signál do reproduktorů; datová síť; distribuce audia; AV řídicí systémy"],
        ["Spuštění a test", "1,5 h", "Konfigurace drive systému; elektronická kontrola; akustická kontrola"]] }
    ],
    eq: EQ_ON, group: "L-Acoustics System Implementation", avixa: "CTS a CTS-I"
  },
  {
    slug: "soundvision", n: "Soundvision", prof: ["System Engineer"],
    img: IMG + "2021/03/courses-soundvision-1.jpg",
    perex: "Naučte se nejpokročilejší funkce softwaru pro 3D modelování prostoru, simulaci systému a optimalizaci line source.",
    obj: ["Znát funkce softwaru Soundvision", "Navrhnout jednoduché prostory a rozmístění reproduktorového systému",
      "Pochopit tvorbu pokročilých 3D modelů sálů", "Pochopit indikátory kvality a autosolvery pro optimalizovaný návrh zdrojů"],
    prod: ["Soundvision Connect", "Soundvision"],
    mod: { pre: [SW, EXP, EN], dur: DBOTH, cap: "max. 12", fmt: FBOTH, meth: "Prezentace, demonstrace, tutoriál, kvíz", cert: C_ONT },
    agenda: [
      { h: S1, it: [
        ["Úvod", "0,5 h", "Představení softwaru; struktura projektu"],
        ["Modelování prostoru", "2 h", "Základy geometrie; postupy sběru dat; tutoriál"],
        ["Pokročilý 3D návrh sálu", "1 h", "SketchUp pro Soundvision"]] },
      { h: S2, it: [
        ["Simulace systému", "2 h", "Jednotlivé zdroje; kombinace zdrojů; tutoriál"],
        ["Modelování prostoru", "1,5 h", "Indikátory kvality; autosolvery"]] }
    ],
    eq: EQ_ON, group: "Soundvision", avixa: ALL3
  },
  {
    slug: "drive-system", n: "Drive System", prof: ["System Engineer"],
    img: IMG + "2021/03/rr3DR_LS10_P1_LA4X_LA12X_MacBook_2_800-400.jpg",
    perex: "Ovládněte konfiguraci, řízení a monitoring systému L-Acoustics od výstupu zdroje až po vstupy reproduktorů, včetně audio sítě AVB-Milan.",
    obj: ["Rozpoznat součásti a funkce drive systému L-Acoustics v audio řetězci", "Implementovat hardware drive systému tak, aby byl připravený ke kalibraci a provozu",
      "Používat LA Network Manager k řízení a monitoringu drive systému L-Acoustics", "Pochopit rámec distribuce audia AVB-Milan"],
    prod: ["LA1.16i", "Milan Manager", "LC16D", "LA7.16", "LA-RAK III", "LA7.16i", "LA Network Manager", "LA-RAK II AVB", "P1", "LA2Xi", "LS10", "LA4X", "LA12X"],
    mod: { pre: [SW, EXP, EN], dur: DBOTH, cap: "max. 12", fmt: FBOTH, meth: "Prezentace, demonstrace, tutoriál, kvíz",
      cert: ["Účast na výuce", "Splnění online aktivit", "Hodnocení praktických cvičení"] },
    agenda: [
      { h: S1, it: [
        ["Implementace hardwaru", "2 h", "Zesílení; reproduktorový processing; datová síť; distribuce audia; správa front-endu"],
        ["Zaměřeno na AVB-Milan", "1 h", "Technologie přenosu audia po Ethernetu; čím se liší standard AVB-Milan"]] },
      { h: S2, it: [
        ["LA Network Manager", "3 h", "Elektronická konfigurace; tutoriál"],
        ["Redundance AVB-Milan", "0,5 h", "Ukázka"]] }
    ],
    eq: EQ_ON, group: "Drive System", avixa: ALL3
  },
  {
    slug: "m1-p1-measurement-tuning", n: "M1-P1 Measurement & Tuning", prof: ["System Engineer"],
    img: IMG + "2022/06/M1_P1-Training-_Site-web-L-Acoustics_800x400px-blue-copie.jpg",
    perex: "Naučte se nahrávat měření procesorem P1 a ladit reproduktorový systém v softwaru M1.",
    obj: ["Znát workflow ladění s nástroji L-Acoustics", "Připravit ladicí session a měřicí pozice", "Nahrát sadu měření v LA Network Manageru a P1",
      "Sladit main a sub pomocí M1 Autoalign a ekvalizovat frekvenční charakteristiku systému v M1", "Sledovat akustické metriky naživo v real-time analyzéru M1"],
    prod: [],
    mod: { pre: [SW, AC, EN], dur: D7, cap: "max. 12", fmt: FON, meth: "Prezentace, demonstrace, workshop, tutoriál", cert: C_TEST },
    agenda: [
      { h: "Dopoledne", it: [
        ["Úvod", "20 min", "Workflow ladění a kalibrace"],
        ["Nástroje pro ladění na místě", "2,5 h", "Pozice; nahrávání; Autoalign; EQ"],
        ["Monitoring naživo", "10 min", "Kalibrace mikrofonu; spektrum; SPL"]] },
      { h: "Odpoledne", it: [
        ["Praktický workshop", "3 h", "Příprava; měření; ladění; poslech"],
        ["Softwarový tutoriál", "1 h", "Sladění subů s hlavním systémem; ekvalizace tonální vyváženosti; ekvalizace pro vyrovnanou charakteristiku"]] }
    ],
    eq: EQ, group: "M1/P1 Measurement & Tuning", avixa: null
  },
  {
    slug: "l-isa-technology", n: "L-ISA Technology", prof: ["Immersive System Engineer", "Immersive Mixing Engineer"],
    img: IMG + "2021/03/Blue-Man-Group-Speechless-tour_Costa-Mesa_USA_03.jpg",
    perex: "Začněte svou cestu k imerzivnímu zvuku přehledem technologie L-ISA – od návrhu reproduktorového systému přes objektový mix a imerzivní algoritmy až po workflow projektu.",
    obj: ["Pochopit imerzivní přístup L-ISA a znát základy systémového inženýrství i mixu", "Pracovat s objekty, snapshoty a dozvukem v L-ISA Controlleru",
      "Pochopit klíčové kroky projektu se systémem L-ISA – od příležitosti přes plánování preprodukce po podporu hostujících zvukařů"],
    prod: ["L-ISA Studio", "L-ISA Controller", "L-ISA Processor II Core"],
    mod: { pre: [SW, EN], dur: DBOTH, cap: "max. 12", fmt: FBOTH, meth: "Prezentace, řízené tutoriály, poslechové ukázky", cert: ["Účast na výuce"] },
    agenda: [
      { h: "Prezenčně / online 1/3", it: [["Celosystémový přístup", "3 h", "Od left-right k imerzi; principy návrhu reproduktorového systému; objektově orientovaný mix; imerzivní algoritmy"]] },
      { h: "Prezenčně / online 2/3", it: [["L-ISA Controller", "2 h", "Úvod do L-ISA Controlleru; tutoriál; vytváření a správa audio kanálů objektů"]] },
      { h: "Prezenčně / online 3/3", it: [["Řízení projektu", "2 h", "Workflow preprodukce; monitorový systém; přizpůsobení setupu; podpora hostujících zvukařů"]] }
    ],
    eq: [["Lektorovaná výuka", ["Notebook s myší", "Nejnovější verze softwaru L-ISA Controller (ke stažení na webu L-Acoustics)", PEN]]],
    group: "L-ISA Technology", avixa: ALL3
  },
  {
    slug: "l-isa-live-mixing", n: "L-ISA Live Mixing", prof: ["Immersive Mixing Engineer"],
    img: IMG + "2021/03/Training_Visual_Website_L-ISA_Live_Mixing_site_web.jpg",
    perex: "Vytvořte imerzivní živý mix přímo ze vstupních kanálů pultu nebo z původního left-right mixu.",
    obj: ["Pochopit a vyzkoušet prostorové parametry L-ISA", "Pochopit a zažít rozdíly mezi tradičním left-right systémem a L-ISA",
      "Vyzkoušet si podporu hostujících zvukařů na instalaci L-ISA"],
    prod: ["L-ISA Studio", "L-ISA Controller", "L-ISA Processor II Core"],
    mod: { pre: [SW, EN], dur: D7, cap: "max. 8", fmt: FON, meth: "Prezentace, řízené tutoriály, poslechové ukázky", cert: C_TEST },
    agenda: [
      { h: "Prezenčně 1/3", it: [["Objektový mix – prostorové parametry", "3 h", "Ukázka – popový nebo klasický mix; doporučení k mixu; ukázka – L-ISA vs. mono, stereo a dual-mono; nastavení mixážního prostředí L-ISA"]] },
      { h: "Prezenčně 2/3", it: [["Mix v praxi", "3 h", "Tutoriál – budování prostorového balancu; tutoriál – podpora hostujícího zvukaře; přehrávání a diskuse"]] },
      { h: "Prezenčně 3/3", it: [["Objektový mix – snapshoty", "1 h", "Ukázka – popový nebo klasický mix; práce se snapshoty"]] }
    ],
    eq: LISA_EQ, group: "L-ISA Live Mixing", avixa: null,
    perk: "roční vzdělávací slevu na L-ISA Studio (1 individuální licence) v eStore L-Acoustics"
  },
  {
    slug: "l-isa-preproduction", n: "L-ISA Preproduction", prof: ["Immersive Mixing Engineer"],
    img: IMG + "2021/03/L-ISA_800x400px_siteweb.jpg",
    perex: "Naučte se a vyzkoušejte si preprodukci živé akce s L-ISA – od studia až po sál, s ohledem na nároky velkého měřítka.",
    obj: ["Pochopit a vyzkoušet osvědčené postupy, díky kterým se mix L-ISA přenese ze studia do velkého prostoru",
      "Pochopit a zažít rozdíly mezi odposlechem na reproduktorech a ve sluchátkách", "Pochopit a vyzkoušet dynamické funkce, které mix L-ISA obohatí"],
    prod: [],
    mod: { pre: ["Certifikace kurzů System & Workflow, L-ISA Technology a L-ISA Live Mixing", "Praxe v mixu", EN], dur: D7, cap: "8",
      fmt: ["Lektorovaná výuka: prezenčně"], meth: "Demonstrace, praktická cvičení, poslechové session", cert: C_TEST },
    agenda: [
      { h: "Prezenčně 1/4", it: [["Objektový mix – prostorové parametry", "2 h", "Ukázka škálování; ze studia do velkého prostoru; ukázka – sluchátka vs. reproduktory"]] },
      { h: "Prezenčně 2/4", it: [["Objektový mix – dynamické funkce 1", "1 h", "Ovládání z aplikací třetích stran a řídicí logika; nastavení dálkového ovládání L-ISA (MIDI, plugin)"]] },
      { h: "Prezenčně 3/4", it: [["Mix v praxi", "3 h", "Tutoriál škálování; tutoriál dynamických funkcí; přehrávání a diskuse"]] },
      { h: "Prezenčně 4/4", it: [["Objektový mix – dynamické funkce 2", "1 h", "Ukázka imerzivní produkce; jaké ovládání k jakému účelu?"]] }
    ],
    eq: LISA_EQ, group: "L-ISA Preproduction", avixa: null
  },
  {
    slug: "l-isa-loudspeaker-system", n: "L-ISA Loudspeaker System", prof: ["Immersive System Engineer"],
    img: IMG + "2021/03/course_L-ISA_loudspeaker_system.jpg",
    perex: "Ovládněte klíčové kroky systémového inženýrství při plánování a nasazení systémů L-ISA: návrh reproduktorového systému, implementaci a kalibraci.",
    obj: ["Znát funkce Soundvision a certifikační metriky pro návrh optimalizovaných reproduktorových systémů L-ISA",
      "Implementovat reproduktorový systém L-ISA – konfigurací drive systému a fyzickým rozmístěním v prostoru", "Pochopit specifika kalibrace reproduktorových systémů L-ISA"],
    prod: [],
    mod: { pre: ["Certifikace kurzu L-ISA Technology", EN], dur: D7, cap: "max. 12", fmt: FBOTH, meth: "Prezentace, řízené tutoriály, demonstrace", cert: C_TEST },
    agenda: [
      { h: "Prezenčně 1/2", it: [["Návrh", "3,5 h", "Od zadání k návrhu; scéna a subwoofery; rozšíření a fills; prostorové fills; surround a další"]] },
      { h: "Prezenčně 2/2", it: [
        ["Implementace", "2 h", "Procesor; síť a komunikační data; reproduktory v L-ISA Controlleru; reproduktory v prostoru"],
        ["Kalibrace", "1,5 h", "Osvědčené postupy; příklady"]] }
    ],
    eq: [["Lektorovaná výuka", ["Notebook s myší", "Nejnovější verze Soundvision a L-ISA Controller (ke stažení na webu L-Acoustics)", PEN]]],
    group: "L-ISA Loudspeaker Systems", avixa: ALL3
  },
  {
    slug: "loudspeaker-system-calibration", n: "Loudspeaker System Calibration", prof: ["System Expert"],
    img: IMG + "2021/03/Calibration_website.jpg",
    perex: "Osvojte si ucelený přístup ke kalibraci v celém workflow projektu – touring, rental i instalace.",
    obj: ["Pochopit cíl kalibrace reproduktorového systému a její vazbu na ostatní fáze projektu",
      "Pochopit metodiky zarovnání pro optimalizaci kombinací main-sub a main-fill",
      "Pochopit metodiky ekvalizace pro korekci podstatných odchylek frekvenční charakteristiky",
      "Uplatnit osvědčené postupy pro přesné a reprezentativní měření frekvenční charakteristiky systému",
      "Postupovat podle racionální metodiky při ověření, ladění a předání reproduktorového systému"],
    prod: ["P1"],
    mod: { pre: [AC, EN], dur: D7, cap: "max. 12", fmt: FON, meth: "Prezentace, demonstrace, tutoriál", cert: C_TEST },
    agenda: [
      { h: "Dopoledne", it: [
        ["Frekvenční charakteristika", "2 h", "Definice; cíle ladění; analýza systému; hřebenová filtrace"],
        ["Doporučení pro ladění", "2 h", "Zarovnání subů; ekvalizace; zarovnání fills"]] },
      { h: "Odpoledne", it: [
        ["Doporučení pro měření", "1,5 h", "Přesnost; reprezentativnost"],
        ["Workflow kalibrace", "1,5 h", "Příprava; ověření; ladění; předání"]] }
    ],
    eq: EQ, group: "Loudspeaker System Calibration", avixa: null
  },
  {
    slug: "variable-curvature-line-source", n: "Variable Curvature Line Source", prof: ["System Expert"],
    img: IMG + "2021/03/VCLS_800x400px_siteweb.jpg",
    perex: "Prohloubte své porozumění chování line source a optimalizujte mechanický návrh i práci s elektronickým nastavením.",
    obj: ["Pochopit akustické chování line source s proměnnou křivostí a jeho zvukové vlastnosti v hledišti",
      "Zvládnout fyzické nasazení line source s proměnnou křivostí tak, aby elektronické úpravy byly optimalizací, ne korekcí",
      "Navrhnout line source s proměnnou křivostí v Soundvision s využitím pokročilých nástrojů pro úhly mezi prvky a FIR filtry"],
    prod: ["KIVA II", "KARA II", "KARA IIi", "K3", "K3i", "K2", "K1", "K1-SB"],
    mod: { pre: [AC, EN], dur: D7, cap: "max. 12", fmt: FON, meth: "Prezentace", cert: ["Účast na výuce"] },
    agenda: [
      { h: "Dopoledne", it: [
        ["Řízení směrovosti", "1,5 h", "Fresnelova analýza; chování line source"],
        ["Pokrytí SPL", "2 h", "Absolutní dosah; relativní dosah; průměrný SPL; profily SPL"]] },
      { h: "Odpoledne", it: [
        ["Frekvenční charakteristika", "2 h", "Vyrovnanost výšek; homogenita tonální vyváženosti"],
        ["Postup v Soundvision", "1,5 h", "Definice zdroje; optimalizace cílového SPL; asistence autosolverů"]] }
    ],
    eq: EQ, group: "Variable Curvature Line Source", avixa: null
  },
  {
    slug: "sub-low-frequencies", n: "Sub Low Frequencies", prof: ["System Expert"],
    img: IMG + "2024/12/sublow-ps-scaled.jpg",
    perex: "Ovládněte ozvučení v pásmu subbasů – od reproduktorových technologií až po optimalizaci kombinace main-sub pro jakékoli prostředí.",
    obj: ["Pochopit podstatu subbasových frekvencí v kontextu ozvučení", "Znát reproduktorové technologie a výkonnostní kritéria pro subbasové frekvence",
      "Konfigurovat subbasové zdroje s řízenou směrovostí", "Optimalizovat kombinaci main-sub správným návrhem a zarovnáním",
      "Přizpůsobit reproduktorový systém vlivu provozního prostředí na subbasové frekvence"],
    prod: [],
    mod: { pre: [AC, EN], dur: ["1 den – 7 hodin"], cap: "max. 12", fmt: FON, meth: "Prezentace, poslechová ukázka, kvíz", cert: C_TEST },
    agenda: [
      { h: "Dopoledne", it: [
        ["Subbasy v ozvučení", "2 h", "Zvuková podstata; potřeba kontroly; reproduktorové zdroje"],
        ["Řízení směrovosti zdroje", "2 h", "Pokrytí publika; potlačení směrem dozadu"]] },
      { h: "Odpoledne", it: [
        ["Konfigurace celého systému", "1,5 h", "Rozmístění systému; zarovnání main-sub; kombinace main-fill"],
        ["Vlivy prostředí", "1,5 h", "Akustika prostoru; atmosférické podmínky; hustota publika"]] }
    ],
    eq: EQ, group: "Sub-Low Frequencies", avixa: null
  }
  ];
})();
