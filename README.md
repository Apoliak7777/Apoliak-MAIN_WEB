<div align="center">

[![Slovencina](https://img.shields.io/badge/SK-Sloven%C4%8Dina-2ea043?style=for-the-badge)](README.md) [![English](https://img.shields.io/badge/EN-English-30363d?style=for-the-badge)](README.en.md)

</div>

<div align="center">

# 🅰️ Apoliak - MAIN WEB

**Statická jednostránková prezentácia freelance služieb Web - Design - Development, postavená čisto na HTML, CSS a vanilla JavaScripte.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat-square&logo=githubpages&logoColor=white)
![Bez závislostí](https://img.shields.io/badge/závislosti-0-22c55e?style=flat-square)
![License](https://img.shields.io/badge/license-GPL--3.0-blue?style=flat-square)

[Živé demo](https://apoliak.online) - [Rýchly štart](#-rýchly-štart) - [Štruktúra](#-štruktúra-projektu)

</div>

---

## 📑 Obsah

- [Prehľad](#-prehľad)
- [Funkcie](#-funkcie)
- [Rýchly štart](#-rýchly-štart)
- [Štruktúra projektu](#-štruktúra-projektu)
- [Konfigurácia a dizajnové tokeny](#️-konfigurácia-a-dizajnové-tokeny)
- [Sekcie stránky](#-sekcie-stránky)
- [Nasadenie](#-nasadenie)
- [Známe obmedzenia](#️-známe-obmedzenia)
- [Licencia](#-licencia)

---

## 🔎 Prehľad

Apoliak MAIN WEB je ručne písaný statický web, ktorý prezentuje služby tvorby webstránok - služby, proces spolupráce, cenník, FAQ a kontakt. Celý obsah je v slovenčine (`<html lang="sk">`).

Projekt zámerne nepoužíva žiadny framework, bundler ani build krok. Sú to tri súbory - `index.html`, `styles.css`, `script.js` - ktoré sa dajú otvoriť priamo v prehliadači a nasadiť skopírovaním na akýkoľvek statický hosting. Aktuálne beží na GitHub Pages pod vlastnou doménou definovanou v súbore `CNAME`.

Stránka nerobí ani jeden externý network request: žiadne CDN, žiadne webfonty, žiadne analytiky ani trackery. Typografia stojí na systémovom font stacku a všetky ikony sú Unicode emoji priamo v markupe.

---

## ✨ Funkcie

- 🧊 **Sticky glass header** - hlavička je `position:sticky` s `backdrop-filter:blur(14px)`; po prekročení 8 px scrollu jej JS nastaví `data-shadow="true"` a pribudne tieň.
- 🍔 **Mobilná navigácia** - pod 980 px sa menu skryje za hamburger tlačidlo; otvára sa triedou `nav-open` na `<body>` a zatvára kliknutím na backdrop, klávesou `Escape` alebo kliknutím na ktorýkoľvek odkaz, pričom `aria-expanded` sa drží v synchrone.
- 👁️ **Reveal animácie pri scrollovaní** - `IntersectionObserver` s prahom `0.12` pridá každému `.reveal` elementu triedu `.is-visible` a následne ho prestane sledovať, takže animácia prebehne raz.
- 🎨 **Dekoratívne pozadie** - dve rozostrené farebné orby a radiálne maskovaná mriežka, všetko `pointer-events:none` a `aria-hidden`, takže nezavadzia obsahu ani čítačkám.
- 💻 **Hero s fake code editorom** - kartička imitujúca editor s ručne označenou syntax highlight schémou, tri trust badge a tri mini štatistiky.
- 💶 **Cenník s tromi balíkmi** - Starter, Standard (označený badgeom `Najčastejšie`) a Pro; každý balík odkazuje na kontaktnú kotvu.
- ❓ **FAQ na natívnych `<details>`** - rozbaľovanie a zbaľovanie otázok rieši `<details>`/`<summary>` so skrytým default markerom, takže samotná interakcia nepotrebuje JS. Pozor: každá položka je zároveň `.reveal`, čiže bez JS ostáva neviditeľná (pozri [Známe obmedzenia](#️-známe-obmedzenia)).
- ♿ **Prístupnosť** - skip-link na obsah, `.sr-only` helper, `aria-label` / `aria-hidden` / `aria-controls`, explicitné `:focus-visible` outliny a `scroll-margin-top:86px`, aby kotvy nekončili pod sticky hlavičkou.
- 🐢 **Rešpekt k `prefers-reduced-motion`** - médiový dotaz vypína smooth scroll aj prechody na `.reveal`, `.btn` a `.nav-panel`.
- 📅 **Automatický rok v pätičke** - `script.js` zapíše aktuálny rok do `#year`, netreba ho ručne aktualizovať.

---

## 🚀 Rýchly štart

Projekt nemá žiadne závislosti, žiadny `package.json` ani inštalačný krok. Stačí repo naklonovať.

```bash
git clone https://github.com/Apoliak7777/Apoliak-MAIN_WEB.git
cd Apoliak-MAIN_WEB
```

**Najjednoduchšie** - otvor `index.html` priamo v prehliadači. Všetky cesty sú relatívne, takže `file://` funguje vrátane reveal animácií.

**Odporúčane cez lokálny HTTP server** (realistickejšie správanie, správne relatívne cesty):

```bash
python -m http.server 8000
```

Potom otvor `http://localhost:8000/`. Rovnako dobre poslúži hociktorý statický server:

```bash
npx serve .
php -S localhost:8000
```

> [!TIP]
> Neexistuje watch mód ani hot reload - po úprave `styles.css` alebo `script.js` stačí obnoviť stránku (pri cache prípadne `Ctrl+F5`).

---

## 📁 Štruktúra projektu

```text
Apoliak-MAIN_WEB/
├── index.html      # celá stránka - 318 riadkov, sekcie #top, #services,
│                   # #process, #pricing, #faq, #contact + footer a .backdrop
├── styles.css      # všetok štýl - 394 riadkov: :root tokeny, header/nav, hero,
│                   # karty, cenník, FAQ, reveal stavy, breakpoint 980px,
│                   # prefers-reduced-motion a focus pravidlá
├── script.js       # 64 riadkov v jednej IIFE: rok, tieň hlavičky,
│                   # mobilné menu, IntersectionObserver reveal
├── CNAME           # vlastná doména pre GitHub Pages (apoliak.online)
├── LICENSE         # plný text GNU GPL v3
├── README.md       # tento súbor
└── README.en.md    # anglická verzia tohto súboru
```

Žiadne podpriečinky, žiadne buildy, žiadne assety - repo má presne sedem súborov v roote.

---

## ⚙️ Konfigurácia a dizajnové tokeny

Projekt nemá konfiguračný systém - žiadne `.env`, žiadne env premenné. Vizuál sa mení editovaním CSS custom properties v bloku `:root` na začiatku `styles.css`.

| Token                    | Hodnota                       | Význam                                                                  |
| ------------------------ | ----------------------------- | ----------------------------------------------------------------------- |
| `--bg` / `--bg2`         | `#0b1020` / `#070a14`         | Základ tmavého gradientu pozadia                                        |
| `--text`                 | `rgba(255,255,255,.92)`       | Primárna farba textu                                                    |
| `--muted`                | `rgba(255,255,255,.68)`       | Sekundárny, stlmený text                                                |
| `--border`               | `rgba(255,255,255,.12)`       | Rámček skip-linku a krokov procesu (`.step`) - nič viac                 |
| `--shadow`               | `0 18px 60px rgba(0,0,0,.55)` | Tieň hero glass karty a mobilného nav panelu                            |
| `--brand`                | `#2563eb`                     | Primárna značková modrá                                                 |
| `--brand2`               | `#22c55e`                     | Doplnková zelená (gradienty, akcenty)                                   |
| `--radius` / `--radius2` | `18px` / `24px`               | Zaoblenie kariet a väčších blokov                                       |
| `--container`            | `1120px`                      | Maximálna šírka obsahového kontajnera                                   |
| `--step`                 | `clamp(14px,1.2vw,16px)`      | Základná fluidná veľkosť písma                                          |
| `--h1` / `--h2` / `--h3` | `clamp(...)`                  | Fluidná škála nadpisov                                                  |

> [!IMPORTANT]
> Tokenizácia je len čiastočná. Väčšina kariet (`.card`, `.price-card`, `.faq-item`, `.contact-card`, `.trust-item`, `.stat`, `.glass`, `.nav-panel`) má rámček zapísaný natvrdo ako `rgba(255,255,255,.10)` alebo `.12` a `.card` / `.step` majú aj vlastný hardcoded `box-shadow`. Zmena `--border` alebo `--shadow` sa na nich neprejaví - treba prejsť príslušné pravidlá v `styles.css` ručne.

Ostatné veci sa menia priamo v `index.html`:

| Čo                                        | Kde                                       |
| ----------------------------------------- | ----------------------------------------- |
| Ceny (`od 100 €`, `od 225 €`, `dohodou`)  | sekcia `#pricing`, hardcoded v markupe    |
| Texty služieb a FAQ                       | sekcie `#services` a `#faq`               |
| Kontaktný email                           | `mailto:` odkaz v sekcii `#contact`       |
| `<title>`, meta description, `theme-color` | `<head>`                                 |
| Doména pre GitHub Pages                   | súbor `CNAME`                             |

---

## 🧭 Sekcie stránky

| Kotva       | Sekcia            | Obsah                                                             |
| ----------- | ----------------- | ----------------------------------------------------------------- |
| `#top`      | Hero              | Nadpis s gradientovým akcentom, CTA, trust badge, fake code karta |
| `#services` | Služby            | Tri karty: Web na mieru, Redizajn a opravy, Nasadenie             |
| `#process`  | Proces spolupráce | Štyri kroky: Brief, Dizajn, Implementácia, Nasadenie              |
| `#pricing`  | Cenník            | Tri balíky: Starter, Standard (highlight), Pro                    |
| `#faq`      | FAQ               | Tri natívne `<details>` otázky                                    |
| `#contact`  | Kontakt           | `mailto:` kartička a skratka späť na cenník                       |

Navigácia je čisto same-page cez hash odkazy - neexistuje router ani druhá stránka.

---

## 🌐 Nasadenie

Web beží na GitHub Pages. Postup:

1. Pushni na default branch (`main`).
2. V nastaveniach repozitára zapni GitHub Pages pre tento branch.
3. Súbor `CNAME` v roote naviaže stránku na vlastnú doménu (`apoliak.online`).
4. DNS záznamy domény (A / ALIAS) musia smerovať na GitHub Pages; TLS certifikát vystaví GitHub automaticky.

> [!NOTE]
> Nie je potrebná databáza, aplikačný server, runtime ani žiadne environment premenné. Rovnaký obsah sa dá nahrať na Netlify, Vercel, S3 alebo klasický FTP hosting bez jedinej zmeny v kóde.

---

## ⚠️ Známe obmedzenia

> [!WARNING]
> **Bez JavaScriptu je obsah neviditeľný.** `styles.css` nastavuje `.reveal{opacity:0}` a viditeľnosť pridáva až `script.js` triedou `.is-visible`. Ak je JS vypnutý, blokovaný alebo spadne, vykreslí sa iba hlavička, pätička a pozadie. Neexistuje `<noscript>` fallback ani CSS-only záložné riešenie.

- **Kontakt je len `mailto:`** - nie je tu formulár ani backend, takže neexistuje nič, čo by prijímalo správy, a žiadna ochrana proti spamu. Emailová adresa je v markupe v čistom texte, kde ju scrapery bez problémov prečítajú.
- **Mŕtve CSS** - pravidlá `.form`, `.field`, `input`, `textarea` (riadky 282-301 v `styles.css`) štýlujú kontaktný formulár, ktorý v `index.html` neexistuje. Podobne `.work-grid` v mobilnom breakpointe nemá žiadny zodpovedajúci element. Ide o zvyšky po odstránenej sekcii.
- **Nepoužitý atribút** - `<header>` nesie `data-elevate`, ale `script.js` zapisuje `data-shadow` a `styles.css` naň reaguje. Atribút je neaktívny.
- **Nesúlad domény** - dekoratívna code karta v hero sekcii zobrazuje reťazec `apoliak.site`, zatiaľ čo `CNAME` deklaruje `apoliak.online`. Text v mockupe je zastaraný.
- **Chýba SEO a social metadata** - hoci stránka predáva "Základné SEO" ako službu, z metadát sú v `<head>` len `charset`, `viewport`, `theme-color`, `<title>` a meta description. Žiadny favicon, Open Graph, Twitter Card, canonical URL, JSON-LD, `robots.txt` ani `sitemap.xml`.
- **"Lighthouse 90+" je marketingový text** - v repozitári nič túto hodnotu nemeria, netestuje ani nevynucuje.
- **Ceny sú hardcoded** v HTML, neexistuje jediný zdroj pravdy - zmena znamená ručnú editáciu markupu.
- **Žiadne automatické kontroly** - v repe nie sú testy, lintery, formatter config, GitHub Actions workflow, `.gitignore` ani `.editorconfig`. Kvalita stojí na manuálnej kontrole.
- **`backdrop-filter`** (hlavička a mobilný panel) na prehliadačoch bez podpory degraduje na plocho priesvitné pozadie; nie je deklarovaný `@supports` fallback.
- **Git história má len dva commity**, takže nie je kde dohľadať zámer za konkrétnymi rozhodnutiami.

**Požiadavky na runtime:** ľubovoľný evergreen prehliadač s podporou `IntersectionObserver`, CSS custom properties a `clamp()`.

---

## 📜 Licencia

Repozitár obsahuje súbor `LICENSE` s úplným a nezmeneným textom **GNU General Public License v3** (29. jún 2007, 674 riadkov).

> [!NOTE]
> Záverečná "how to apply" pasáž licencie stále obsahuje nevyplnené placeholdery `<year>` a `<name of author>`, takže držiteľ autorských práv nie je nikde v repozitári menovite uvedený a žiadny zdrojový súbor nenesie GPL hlavičku.

GPL-3.0 je silné copyleft licencovanie určené pre softvér. Aplikované na tento web to znamená, že markup, štýly aj skript smie ktokoľvek kopírovať, upravovať a ďalej šíriť - za podmienky, že odvodené dielo bude tiež pod GPL-3.0 a so sprístupneným zdrojovým kódom.

---

<div align="center">

Vytvoril **Alex Poliak** - [GitHub](https://github.com/Apoliak7777) - [alexpoliak21@gmail.com](mailto:alexpoliak21@gmail.com)

</div>
