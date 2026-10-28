<div align="center">

[![Slovencina](https://img.shields.io/badge/SK-Sloven%C4%8Dina-30363d?style=for-the-badge)](README.md) [![English](https://img.shields.io/badge/EN-English-2ea043?style=for-the-badge)](README.en.md)

</div>

<div align="center">

# 🅰️ Apoliak - MAIN WEB

**A static site for a freelance web-design practice serving small businesses, with a gallery of 44 fully clickable demo websites. Plain HTML, CSS and vanilla JavaScript.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat-square&logo=githubpages&logoColor=white)
![No dependencies](https://img.shields.io/badge/dependencies-0-22c55e?style=flat-square)
![Demos](https://img.shields.io/badge/demo%20sites-44-ffd23f?style=flat-square)
![License](https://img.shields.io/badge/license-GPL--3.0-blue?style=flat-square)

[Live site](https://apoliak.online) - [Demo gallery](https://apoliak.online/ukazky/) - [Quick start](#-quick-start) - [Structure](#-project-structure)

</div>

---

## 📑 Contents

- [Overview](#-overview)
- [Features](#-features)
- [Quick start](#-quick-start)
- [Project structure](#-project-structure)
- [Configuration and design tokens](#️-configuration-and-design-tokens)
- [Page sections](#-page-sections)
- [Demo websites](#-demo-websites)
- [Deployment](#-deployment)
- [Known limitations](#️-known-limitations)
- [License](#-license)

---

## 🔎 Overview

Apoliak MAIN WEB is a hand-written static site presenting custom website work for small businesses - restaurants, cafés, salons, garages, medical practices and the like. It covers the demos, the services, pricing with a price calculator, how a project runs, a short "about me", an FAQ and the contact details. Slovak sits at the root of the site; the Czech, Hungarian, Polish, English, German and Italian versions live in `/cs/` to `/it/`.

A major part of the site is a gallery of **44 demo websites**. Each one is a standalone page for a fictional business with its own colour scheme, layout and a working interactive feature, so a visitor can click through and see what their own site could look like.

The project deliberately uses no framework, no bundler and no build step. These are plain files that open straight in a browser and deploy by copying them onto any static host. It runs on GitHub Pages under a custom domain defined in the `CNAME` file.

The site makes not a single external network request: no CDN, no third-party web fonts, no analytics and no trackers. The Schibsted Grotesk typeface (OFL licence) is hosted on the site itself in `domov/pisma/`, the demo screenshots on the home page are WebP files in `domov/obrazky/`, and all other graphics are CSS and inline SVG.

---

## ✨ Features

- 🏪 **44 demo websites** - complete sites for fictional businesses, each a single self-contained HTML file with its own palette, typography and working interaction (see [Demo websites](#-demo-websites)).
- 🔎 **Filterable gallery** - `ukazky/index.html` sorts the demos by category; the filters toggle `hidden` on the cards, keep `aria-pressed` in sync and announce how many demos are showing in a live text.
- 🖼️ **Live previews in the gallery** - the frame on every card runs the demo itself in a 1280 px wide `<iframe>` (1000 px in a narrow frame), scaled down with `transform: scale()`; `script.js` derives the factor from the frame's real width. A preview can therefore never go stale against its demo, and every language version of the gallery shows its own translated demos. The frames are `loading="lazy"`, `pointer-events: none` and out of the tab order.
- 📸 **Home page with demo screenshots** - the intro shows a screenshot of the restaurant demo and the salon demo on a phone, the `#ukazky` section nine more screenshots (WebP at 800 and 1280 px, swiped sideways on mobile) and links to industries that preselect a gallery filter (`ukazky/#remeslo`). `node _PRACA/nahlady_domov.js` regenerates the screenshots and the sharing preview.
- 🧮 **Price calculator in the pricing section** - four packages as choices, add-ons (extra subpages, copywriting, maintenance) and a "Your set-up" box with the total and lead time. Nothing is submitted: the selection is turned into a message for e-mail, WhatsApp, SMS or the clipboard. Prices and copy live in `data-*` attributes so the translation tool can translate them.
- 🎛️ **Interactions without libraries** - menu switching, a pizza builder, schedule filtering, appointment booking, price calculators and a shopping cart are all written in plain JavaScript.
- 🎨 **Light design without a template** - a paper background, ink-coloured text and a single accent, yellow (buttons, a label, the contact band), set in one typeface, Schibsted Grotesk. The home page has its own `domov/domov.css`; the gallery, the 404, the privacy page and the language versions take the same tokens from `styles.css`. Until the new home page is translated, the language versions keep the original home page (a live demo in a frame with six industries, benefits and services, pricing as three cards) in the new look.
- ✉️ **Direct contact instead of a form** - there is no form. Through `mailto:` a form would promise a send it can only deliver for a visitor with a configured mail client; anyone reading mail in a browser tab would click and get nothing. In its place stand the address in large type, buttons for e-mail, phone, WhatsApp and SMS, and a short list of what to put in the message. WhatsApp is a plain `wa.me` link with a pre-filled line in the page's language (an icon in the bottom bar on mobile), and the e-mail templates also ask where the visitor heard about me.
- ♿ **WCAG AA accessibility** - contrast ratios are verified and noted next to the tokens; the page has a skip link, a single `h1`, visible focus states and `scroll-padding-top` so anchors do not land under the sticky header.
- 🐢 **No entrance animations** - the content is visible as soon as the page loads, and nothing moves, tilts or rotates on its own. With `prefers-reduced-motion` the short button and card transitions and the smooth scrolling to anchors are switched off as well.
- 🔍 **SEO and sharing** - canonical URL, Open Graph and Twitter Card tags, 1200 × 630 sharing previews (`domov/og-domov.png` for the home page, `og-image.png` for the gallery, `og-image-cs.png`, `og-image-hu.png`, `og-image-pl.png`, `og-image-en.png`, `og-image-de.png` and `og-image-it.png` for the language versions), schema.org `ProfessionalService` structured data, `sitemap.xml`, `robots.txt` and an inline SVG favicon.
- 🌍 **Slovak, Czech, Hungarian, Polish, English, German and Italian on one domain** - the Czech version lives in `/cs/` (rate 25 CZK/€), the Hungarian one in `/hu/` (rate 400 HUF/€), the Polish one in `/pl/` (rate 4.35 PLN/€), the English one in `/en/` (written for Ireland, prices stay in euro), the German one in `/de/` (written for Germany and Austria, prices stay in euro) and the Italian one in `/it/` (written for Italy, prices stay in euro). Each includes all 44 demos, with prices converted and local facts in place of Slovak ones. The language switcher sits in the header, search engines get `hreflang` in the head and in `sitemap.xml`. The Slovak files stay the source of truth - the translations are generated from them, so the versions cannot drift apart.
- 🚧 **Custom 404 page** - `404.html` in the same design, linking back to the home page and the gallery.
- 🔒 **Privacy policy** - a dedicated `ochrana-osobnych-udajov.html` page.
- 📅 **Automatic year in the footer** - `domov/domov.js` and `script.js` write the current year into `#rok`, so it never needs a manual update.

---

## 🚀 Quick start

The project has no dependencies, no `package.json` and no installation step. Just clone the repo.

```bash
git clone https://github.com/Apoliak7777/Apoliak-MAIN_WEB.git
cd Apoliak-MAIN_WEB
```

**The simplest way** - open `index.html` directly in a browser. All paths are relative, so `file://` works, gallery and demos included.

**Recommended via a local HTTP server** (more realistic behaviour, correct relative paths):

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`, and the gallery at `http://localhost:8000/ukazky/`. Any static server will do just as well:

```bash
npx serve .
php -S localhost:8000
```

> [!TIP]
> There is no watch mode and no hot reload - after editing `styles.css`, `script.js` or the files in `domov/` simply refresh the page (or `Ctrl+F5` if the cache gets in the way).

---

## 📁 Project structure

```text
Apoliak-MAIN_WEB/
├── index.html                    # home page (35 KB)
├── domov/                        # "domov" = home: styles, script, typeface and screenshots of the home page
│   ├── domov.css                 # home page styles (24 KB)
│   ├── domov.js                  # price calculator, language menu, year (6 KB)
│   ├── pisma/                    # Schibsted Grotesk as woff2 plus the OFL licence
│   ├── obrazky/                  # demo screenshots as WebP
│   └── og-domov.png              # home page sharing preview, 1200 × 630
├── styles.css                    # shared styles for the gallery, 404,
│                                 # privacy page and language versions (32 KB)
├── script.js                     # shared script for those pages (8 KB)
├── ukazky/                       # "ukazky" = demos
│   ├── index.html                # demo gallery with filtering (55 KB)
│   ├── restauracia/index.html    # 44 standalone demo sites,
│   ├── kaviaren/index.html       # each one a self-contained file
│   ├── cukraren/index.html
│   ├── penzion/index.html
│   ├── fitko/index.html
│   ├── salon/index.html
│   ├── barber/index.html
│   ├── wellness/index.html
│   ├── fotoatelier/index.html
│   ├── autoskola/index.html
│   ├── remeselnik/index.html
│   ├── autoservis/index.html
│   ├── stavebna/index.html
│   ├── ambulancia/index.html
│   ├── veterina/index.html
│   ├── optika/index.html
│   ├── kvetinarstvo/index.html
│   ├── reality/index.html
│   ├── uctovnictvo/index.html
│   └── advokat/index.html
├── cs/                           # Czech version of the whole site, all 44 demos
│   ├── index.html                # home page in Czech, still in the original layout
│   ├── ukazky/                   # gallery and all 44 demos in Czech
│   ├── 404.html
│   └── ochrana-osobnych-udajov.html
├── hu/                           # Hungarian version of the whole site, all 44 demos
│   ├── index.html                # home page in Hungarian, still in the original layout
│   ├── ukazky/                   # gallery and all 44 demos in Hungarian
│   ├── 404.html
│   └── ochrana-osobnych-udajov.html
├── pl/                           # Polish version of the whole site, all 44 demos
│   ├── index.html                # home page in Polish, still in the original layout
│   ├── ukazky/                   # gallery and all 44 demos in Polish
│   ├── 404.html
│   └── ochrana-osobnych-udajov.html
├── en/                           # English version of the whole site, all 44 demos (for Ireland)
│   ├── index.html                # home page in English, still in the original layout
│   ├── ukazky/                   # gallery and all 44 demos in English
│   ├── 404.html
│   └── ochrana-osobnych-udajov.html
├── de/                           # German version of the whole site, all 44 demos (Germany and Austria)
│   ├── index.html                # home page in German, still in the original layout
│   ├── ukazky/                   # gallery and all 44 demos in German
│   ├── 404.html
│   └── ochrana-osobnych-udajov.html
├── it/                           # Italian version of the whole site, all 44 demos (Italy)
│   ├── index.html                # home page in Italian, still in the original layout
│   ├── ukazky/                   # gallery and all 44 demos in Italian
│   ├── 404.html
│   └── ochrana-osobnych-udajov.html
├── 404.html                      # custom page for unknown addresses
├── ochrana-osobnych-udajov.html  # privacy policy
├── og-image.png                  # gallery sharing preview, 1200 × 630
├── og-image-cs.png               # the same for the Czech version
├── og-image-hu.png               # the same for the Hungarian version
├── og-image-pl.png               # the same for the Polish version
├── og-image-en.png               # the same for the English version
├── og-image-de.png               # the same for the German version
├── og-image-it.png               # the same for the Italian version
├── sitemap.xml                   # sitemap (all seven languages + hreflang)
├── robots.txt                    # crawler rules
├── CNAME                         # custom domain for GitHub Pages
├── .nojekyll                     # disables Jekyll processing on Pages
├── LICENSE                       # full text of the GNU GPL v3
├── README.md                     # Slovak version
└── README.en.md                  # this file
```

The `ukazky/` folder comes to roughly 1.9 MB in total. No builds, no node_modules, no downloaded assets.

---

## ⚙️ Configuration and design tokens

The project has no configuration system - no `.env`, no environment variables. The look is changed by editing the CSS custom properties in the `:root` block: the home page in `domov/domov.css`, the gallery, 404, privacy page and language versions in `styles.css`. Both files carry the same tokens, so a colour change has to be made in both.

| Token           | Value                                   | Meaning                                                |
| --------------- | --------------------------------------- | ------------------------------------------------------ |
| `--papier`      | `#fbfaf7`                               | Page background ("papier" = paper)                     |
| `--papier-2`    | `#f3f1eb`                               | Alternating section tone                               |
| `--biela`       | `#ffffff`                               | Cards, packages and menus                              |
| `--atrament`    | `#16181b` (17.0:1)                      | Headings, buttons, outlines of selected cards ("ink")  |
| `--text`        | `#33373d` (11.5:1)                      | Body text                                              |
| `--tlmene`      | `#62676f` (5.5:1)                       | Labels and notes ("muted")                             |
| `--ciara`       | `#e4e1d9`                               | Soft dividers ("line")                                 |
| `--ciara-2`     | `#cfcbc0`                               | Card and field borders                                 |
| `--zlta`        | `#ffd23f` (ink on it 12.3:1)            | The only accent ("yellow"): main buttons, label, contact band |
| `--zlta-svetla` | `#fff3c2`                               | Selected language, industry under the cursor           |
| `--tien`        | two-layer soft shadow                   | Cards under the cursor, language menu                  |
| `--pismo`       | Schibsted Grotesk, Segoe UI, system-ui  | The one typeface of the whole site                     |

Contrast is measured against `--papier`. Content width is held by `.obal` (home page) and `.wrap` (other pages): at most 1200 px, 16 px from the edge on mobile and 28 px from 640 px up.

> [!IMPORTANT]
> The tokens in `domov/domov.css` and `styles.css` cover the pages of the site. **Every demo site carries its own colour scheme inside its own file** - deliberately standalone, so it can be sent to a client or deployed as a single file. Changing the tokens has no effect on the demos.

Content lives directly in the HTML:

| What                                            | Where                                                 |
| ----------------------------------------------- | ----------------------------------------------------- |
| Package and add-on prices                       | the `#cennik` section in `index.html` (plus `data-cena` and `data-t-*` for the calculator) |
| Service, process, "about me" and FAQ copy       | the `#sluzby`, `#postup`, `#vyhody`, `#otazky` sections |
| E-mail and phone number                         | the `#kontakt` section and the JSON-LD block in `<head>` |
| Main address and phone                          | `#kontakt`, header, mobile bar, footer and JSON-LD     |
| Support address for clients                     | `support@apoliak.online` in `#kontakt`, footer, demos  |
| `<title>`, meta description, OG and Twitter tags | the `<head>` of each page                             |
| Structured data                                 | the JSON-LD block in the home page `<head>`            |
| Domain for GitHub Pages                         | the `CNAME` file (plus `sitemap.xml` and canonical URL) |

---

## 🧭 Page sections

| Anchor      | Section        | Content                                                        |
| ----------- | -------------- | -------------------------------------------------------------- |
| -           | Intro          | Headline, two buttons, three facts (from €250, first draft in 3 days, reply within 24 hours), a restaurant screenshot and the salon on a phone on the right |
| `#ukazky`   | Demos          | Nine screenshots of demo sites and links to industries in the gallery |
| `#sluzby`   | Services       | A new site, a new look for an old site, bookings, orders and e-shops |
| `#cennik`   | Pricing        | Four packages (Starter, Standard, Pro, E-shop) with the usual market price, add-ons and "Your set-up" with the total, sent by e-mail, WhatsApp or SMS |
| `#postup`   | Process        | Four steps from the first message to going live, each with what the client needs to provide |
| `#vyhody`   | About me       | Who builds the site and what a client can rely on               |
| `#otazky`   | FAQ            | Ten native `<details>`, working without JavaScript              |
| `#kontakt`  | Contact        | Yellow band: the address, e-mail, phone, WhatsApp and SMS buttons, what to write and the support address |
| -           | Footer         | Both addresses, GitHub, privacy policy, automatic year          |
| -           | Mobile bar     | Call, WhatsApp and Send an enquiry below 960 px wide            |

Navigation across the home page is same-page via hash links; the screenshots, the industry links and the "Všetkých 44 ukážok" button lead to the gallery. The gallery, the demos, the 404 and the privacy page are separate addresses. Until the new home page is translated, the language versions keep the original home page (a live demo in a frame, benefits and services, pricing as three cards, contact in one card) in the new look.

### Pricing shown on the site

| Package      | Price     |
| ------------ | --------- |
| **Starter**  | from €250   |
| **Standard** | from €490   |
| **Pro**      | from €890   |
| **E-shop**   | from €1,190 |

| Add-on                      | Price                                   |
| --------------------------- | --------------------------------------- |
| Extra subpage               | €35                                     |
| Copywriting                 | €19 / page (included in the Pro package) |
| Maintenance and small edits | from €9 / month, optional               |
| Rush fix within 48 h        | €35                                     |

---

## 🏪 Demo websites

44 complete sites for fictional businesses - **not real clients and not references**. Each demo is a single self-contained HTML file with its own colours and layout, a sticky strip linking back to `apoliak.online`, and one working interactive feature.

| Folder         | Business                                 | Category             | Interactive feature                            |
| -------------- | ---------------------------------------- | -------------------- | ---------------------------------------------- |
| `cukraren`     | Pekáreň a cukráreň Kôrka (bakery)        | Food and lodging     | Cake builder with price and pickup date        |
| `kaviaren`     | Lipová (café and pizzeria)               | Food and lodging     | Pizza builder with live price                  |
| `penzion`      | Penzión Hrebeň (guest house)             | Food and lodging     | Booking with night and price calculation       |
| `restauracia`  | Reštaurácia Dubová (restaurant)          | Food and lodging     | Menu switching, table booking                  |
| `autoskola`    | Autoškola Rondel (driving school)        | Services             | Enrolment with course price calculation        |
| `barber`       | Holičstvo Ostrie (barber shop)           | Services             | Booking by service and duration                |
| `fitko`        | Fitness centrum Halová (gym)             | Services             | Class timetable filtering                      |
| `fotoatelier`  | Fotoateliér Škála (photo studio)         | Services             | Package and photo count picker                 |
| `krajcirstvo`  | Ateliér Steh (tailor)                    | Services             | Alteration calculator with price and lead time |
| `salon`        | Salón Brezová (hair and beauty)          | Services             | Appointment booking with price summary         |
| `wellness`     | Wellness Salvia (spa)                    | Services             | Treatment booking with summary                 |
| `zabava`       | Kolkáreň Deviatka (bowling)              | Services             | Lane booking by day, time and party size       |
| `autoservis`   | Autoservis 12 (car and tyre service)     | Trades and building  | Booking with per-job price                     |
| `calunnictvo`  | Čalúnnictvo Pružina (upholstery)         | Trades and building  | Reupholstery calculator by piece and fabric    |
| `elektrikar`   | Elektro Fáza (electrician)               | Trades and building  | Wiring scope and on-site days calculator       |
| `instalater`   | Teplo a Voda (heating and plumbing)      | Trades and building  | Ten-year heat source comparison                |
| `remeselnik`   | Stolárstvo Rovina (joinery)              | Trades and building  | Job price calculator                           |
| `stavebna`     | Stavebná firma KVADER (builder)          | Trades and building  | Price calculator by floor area                 |
| `zamocnictvo`  | Kovanie Šesťhran (metalwork)             | Trades and building  | Gate configurator with drawn preview           |
| `ambulancia`   | Zubná ambulancia Vrbová (dental)         | Health               | Treatment booking                              |
| `optika`       | Optika Meridián (optician)               | Health               | Eye test booking                               |
| `veterina`     | Veterinárna klinika Alveron (vet)        | Health               | Booking by animal species                      |
| `farma`        | Dvor Rozsocha (farm shop)                | Retail               | Produce box builder and seasonal calendar      |
| `kvetinarstvo` | Kvetinárstvo Steblo (florist)            | Retail               | Fully working shopping cart                    |
| `reality`      | Kamenec reality (estate agency)          | Retail               | Listing filter and mortgage calculator         |
| `velkoobchod`  | Paleta Vzor (wholesaler)                 | Retail               | B2B price list with quantity tiers             |
| `advokat`      | Advokátska kancelária Meritum (law firm) | Firms and offices    | Enquiry with fee estimate                      |
| `poistovaci`   | Štít maklér (insurance broker)           | Firms and offices    | Three-way insurance quote comparison           |
| `poradca`      | Kompas financie (financial adviser)      | Firms and offices    | Compound interest savings calculator           |
| `projektant`   | Rysá projekcia (design and surveying)    | Firms and offices    | Building permit document guide                 |
| `reklamka`     | Studio Prietlač (print and signage)      | Firms and offices    | Print calculator with unit price chart         |
| `uctovnictvo`  | SALDIA (bookkeeping and payroll)         | Firms and offices    | Monthly retainer calculator                    |
| `autodiely`    | Kotva Automotive (automotive supplier)   | Manufacturing        | Order tracking with timeline                   |
| `fotovoltika`  | Slnovrat energia (solar power)           | Manufacturing        | Payback calculator with yearly balance         |
| `laboratorium` | Skúšobňa Etalón (testing laboratory)     | Manufacturing        | Test picker with standard, price and lead time |
| `plasty`       | Polyform (injection moulding)            | Manufacturing        | Batch calculator showing tooling amortisation  |
| `pocitace`     | Bit a Byte (computer repair)             | Manufacturing        | Fault diagnosis from symptoms                  |
| `strojarstvo`  | Obrobňa Merkur (CNC machining)           | Manufacturing        | Part calculator by material and batch          |
| `doprava`      | Traťová (haulage and removals)           | Transport and waste  | Transport calculator and shipment tracking     |
| `odpady`       | Zberná Vzor (waste and skips)            | Transport and waste  | Skip order with disposal pricing               |
| `internet`     | Vlnka net (internet provider)            | Education and public | Coverage check by village                      |
| `jazykovka`    | Slovosled (language school)              | Education and public | Placement test with level result               |
| `kulturak`     | Kino Orbis (cinema and culture)          | Education and public | Programme and seat picker                      |
| `obec`         | Obec Rakytie (municipal office)          | Education and public | Life-situation document guide                  |

> [!NOTE]
> The demos deliberately carry no photographs. The areas where photos would normally sit hold a composition of their own - layered gradients, geometry, hairline patterns and typography. The pages send nothing anywhere; the forms and carts are design mock-ups.

---

## 🌐 Deployment

The site runs on GitHub Pages. The procedure:

1. Push to the default branch (`main`).
2. Enable GitHub Pages for that branch and the root folder in the repository settings.
3. The `CNAME` file in the root binds the site to the custom domain (`apoliak.online`), and `.nojekyll` switches off Jekyll processing.
4. The domain's DNS records (A / ALIAS) must point at GitHub Pages; the TLS certificate is issued by GitHub automatically.

> [!NOTE]
> No database, application server, runtime or environment variables are needed. The same content can be uploaded to Netlify, Vercel, S3 or classic FTP hosting without a single change to the code.

After a domain change, update `CNAME`, the canonical URL, the Open Graph addresses and `sitemap.xml`.

---

## ⚠️ Known limitations

- **The site collects no data** - there is no form and no backend. The visitor writes from their own mailbox or calls. Nothing receives messages on a server.
- **Contact details sit in the markup as plain text**, where scrapers read them without any trouble. There is no spam protection.
- **The demo sites are designs for fictional businesses** - names, addresses, opening hours and prices are illustrative. They collect no data, their forms, bookings and carts submit nowhere, and their state is lost on reload.
- **The demos carry no photographs at all** - typography, colour and geometry do all the work. On a real commission the client supplies photos, which then replace those areas.
- **Content is duplicated across the HTML** - prices, contact details and copy are hardcoded in several places (markup, meta tags, JSON-LD). Changing them means walking through every occurrence by hand.
- **Each demo carries its own copy of the styles and scripts** inside its file. That is intentional for portability, but a shared change has to be made 44 times.
- **No automated checks** - the repo contains no tests, linters, formatter config or GitHub Actions workflow. Quality rests on manual review.
- **There are no third-party fallbacks offline**, nor are any needed - the site uses no external resources at all.

**Runtime requirements:** any evergreen browser with support for CSS custom properties, `clamp()` and `:has()`. Without JavaScript the content stays fully readable - only the gallery filtering, the price calculator and the demo interactions go away.

**Verified widths:** 320, 360, 390, 768, 1024, 1100, 1200 and 1440 px, with no horizontal scrolling, in all seven languages.

---

## 📜 License

The repository contains a `LICENSE` file with the full, unmodified text of the **GNU General Public License v3**.

GPL-3.0 is a strong copyleft license intended for software. Applied to this website it means anyone may copy, modify and redistribute the markup, styles and scripts - on condition that the derived work is also under GPL-3.0 and its source code is made available.

---

<div align="center">

Built by **Alex Poliak**, Bratislava - [GitHub](https://github.com/Apoliak7777) - [apoliak@apoliak.online](mailto:apoliak@apoliak.online) - 0902 464 022

</div>
