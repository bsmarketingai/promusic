---
name: promusic-design
description: Use this skill to generate well-branded interfaces and assets for PRO MUSIC, s.r.o. (profesionální audio/light technika, dark-first značka), ať už pro produkci nebo prototypy/mocky. Obsahuje esenciální design guidelines, barvy, typografii, fonty, logo a komponentní vrstvu.
user-invocable: true
---

Read `readme.md` in this skill and explore the other files (`styles.css` → `tokens/*`, `hifi.css`, `guidelines/*`, `assets/*`).

Core rules:
- **100% dark.** Logo i UI vždy na tmavém pozadí (paper `#100f0d`). Akcent = oranžová `#e0542b` (zvuková vlna ze značky).
- **Typo:** headery Inter 800 (těsný tracking, line-height ~0.9), body IBM Plex Sans, eyebrow/štítky/data Space Mono.
- **Tón:** skromnost ve výrazu, síla v důkazech — bez superlativů bez doložení; CTA = kvalifikovaný kontakt („Probrat projekt").
- **Motion:** středně — jemné fade-up + lehký parallax; respektovat `prefers-reduced-motion`.
- Linkuj jediný `styles.css` pro tokeny; pro web komponenty využij `hifi.css`.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and produce static HTML files for the user to view. If working on production code, copy assets and apply these rules to design as an expert in this brand.

If invoked without guidance, ask what to build, ask a few questions, and act as an expert designer outputting HTML artifacts or production code as needed.
