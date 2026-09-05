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
![Demos](https://img.shields.io/badge/demo%20sites-44-e9b45f?style=flat-square)
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

Apoliak MAIN WEB is a hand-written static site presenting custom website work for small businesses - restaurants, cafés, salons, garages, medical practices and the like. It covers the demos, the benefits, the services, how a project runs, pricing, an FAQ and the contact details. All content is in Slovak (`<html lang="sk">`).

A major part of the site is a gallery of **44 demo websites**. Each one is a standalone page for a fictional business with its own colour scheme, layout and a working interactive feature, so a visitor can click through and see what their own site could look like.

The project deliberately uses no framework, no bundler and no build step. These are plain files that open straight in a browser and deploy by copying them onto any static host. It runs on GitHub Pages under a custom domain defined in the `CNAME` file.

The site makes not a single external network request: no CDN, no web fonts, no analytics and no trackers. Typography relies on the system font stack, and all graphics are CSS and inline SVG.

---

## ✨ Features

- 🏪 **Twenty demo websites** - complete sites for fictional businesses, each a single self-contained HTML file with its own palette, typography and working interaction (see [Demo websites](#-demo-websites)).
- 🔎 **Filterable gallery** - `ukazky/index.html` sorts the demos by category; the filters toggle `hidden` on the cards, keep `aria-pressed` in sync and announce how many demos are showing in a live text.
- 🖼️ **Live previews instead of images** - the frame on every card runs the demo itself in an `<iframe>` scaled down with `transform: scale()`; `script.js` derives the factor from the frame's real width. A preview can therefore never go stale against its demo, and not a single image file is added. The frames are `loading="lazy"`, `pointer-events: none` and out of the tab order.
- 🔁 **Live demo right in the hero** - a real demo runs in a frame next to the headline and six chips (hair salon, restaurant, car service, dental clinic, joinery, municipality) swap it without a page load; without JavaScript the chips are plain links to the demos. Every page load shows a different demo than the last one (the last pick is kept in `sessionStorage`).
- 🎛️ **Interactions without libraries** - menu switching, a pizza builder, schedule filtering, appointment booking, price calculators and a shopping cart are all written in plain JavaScript.
- 🎨 **Custom dark design** - a warm charcoal background with a brass accent, a subtle SVG grain across the whole surface, and serif headings with italics. Nothing is downloaded; it is all CSS and inline SVG.
- ✉️ **Direct contact instead of a form** - there is no form. Through `mailto:` a form would promise a send it can only deliver for a visitor with a configured mail client; anyone reading mail in a browser tab would click and get nothing. In its place stand the address in large type, buttons for e-mail, phone and SMS, and a short list of what to put in the message.
- ♿ **WCAG AA accessibility** - contrast ratios are verified and noted next to the tokens; the page has a skip link, a single `h1`, visible focus states and `scroll-padding-top` so anchors do not land under the sticky header.
- 👁️ **Scroll reveal** - an `IntersectionObserver` adds the `.in` class to `.rv` elements. The effect only engages once the inline script in the head sets the `js` class on `<html>`, so without JavaScript the content is simply visible.
- 🐢 **Respect for `prefers-reduced-motion`** - with the setting on, content is revealed at once and transitions are turned off.
- 🔍 **SEO and sharing** - canonical URL, Open Graph and Twitter Card tags, a 1200 × 630 `og-image.png`, schema.org `ProfessionalService` structured data, `sitemap.xml`, `robots.txt` and an inline SVG favicon.
- 🚧 **Custom 404 page** - `404.html` in the same design, linking back to the home page and the gallery.
- 🔒 **Privacy policy** - a dedicated `ochrana-osobnych-udajov.html` page.
- 📅 **Automatic year in the footer** - `script.js` writes the current year into `#rok`, so it never needs a manual update.

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
> There is no watch mode and no hot reload - after editing `styles.css` or `script.js` simply refresh the page (or `Ctrl+F5` if the cache gets in the way).

---

## 📁 Project structure

```text
Apoliak-MAIN_WEB/
├── index.html                    # home page (31 KB)
├── styles.css                    # shared styles for the home page,
│                                 # gallery, 404 and privacy page (40 KB)
├── script.js                     # shared script (8 KB)
├── ukazky/                       # "ukazky" = demos
│   ├── index.html                # demo gallery with filtering (53 KB)
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
├── 404.html                      # custom page for unknown addresses
├── ochrana-osobnych-udajov.html  # privacy policy
├── og-image.png                  # sharing preview, 1200 × 630
├── sitemap.xml                   # sitemap
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

The project has no configuration system - no `.env`, no environment variables. The look of the home page, gallery, 404 and privacy page is changed by editing the CSS custom properties in the `:root` block at the top of `styles.css`.

| Token         | Value                                         | Meaning                                        |
| ------------- | --------------------------------------------- | ---------------------------------------------- |
| `--bg`        | `#131010`                                     | Base dark background                           |
| `--bg-2`      | `#1a1513`                                     | Alternating section tone                       |
| `--panel`     | `#201916`                                     | Card and panel background                      |
| `--panel-2`   | `#271e1a`                                     | Highlighted panel                              |
| `--line`      | `#3a2d26`                                     | Borders and dividers                           |
| `--line-soft` | `#2b211c`                                     | Softer line inside panels                      |
| `--ink`       | `#f7f0e7` (18.9:1)                            | Primary text                                   |
| `--ink-2`     | `#d8ccbf` (12.0:1)                            | Secondary text                                 |
| `--mut`       | `#b6a99b` (8.2:1)                             | Muted labels                                   |
| `--brass`     | `#e9b45f` (10.1:1)                            | Brass accent - links, figures, highlights      |
| `--brass-lo`  | `#c8913c`                                     | Darker accent shade, button fills              |
| `--brass-hi`  | `#f2c273`                                     | Lighter accent shade, hover states             |
| `--on-brass`  | `#1d1409` (6.5:1)                             | Text sitting on a brass surface                |
| `--sans`      | `system-ui` stack                             | Base sans-serif face                           |
| `--serif`     | Iowan Old Style / Palatino Linotype / Georgia | Serif headings and italics                     |
| `--mono`      | `ui-monospace` stack                          | Figures, codes, tabular data                   |
| `--pad`       | `clamp(18px,5vw,56px)`                        | Horizontal content padding                     |
| `--maxw`      | `1220px`                                      | Maximum content container width                |

> [!IMPORTANT]
> The tokens in `styles.css` cover the home page, the gallery, the 404 and the privacy page. **Every demo site carries its own colour scheme inside its own file** - deliberately standalone, so it can be sent to a client or deployed as a single file. Changing the tokens in `styles.css` has no effect on the demos.

Content lives directly in the HTML:

| What                                            | Where                                                 |
| ----------------------------------------------- | ----------------------------------------------------- |
| Package and add-on prices                       | the `#cennik` section in `index.html`                  |
| Benefit, service, process and FAQ copy          | the `#vyhody`, `#sluzby`, `#postup`, `#otazky` sections |
| E-mail and phone number                         | the `#kontakt` section and the JSON-LD block in `<head>` |
| Main address and phone                          | the `.kontakt-blok` in `#kontakt`, footer and JSON-LD  |
| Support address for clients                     | `support@apoliak.online` in `#kontakt`, footer, demos  |
| `<title>`, meta description, OG and Twitter tags | the `<head>` of each page                             |
| Structured data                                 | the JSON-LD block in the home page `<head>`            |
| Domain for GitHub Pages                         | the `CNAME` file (plus `sitemap.xml` and canonical URL) |

---

## 🧭 Page sections

| Anchor      | Section        | Content                                                        |
| ----------- | -------------- | -------------------------------------------------------------- |
| -           | Hero           | Headline and CTAs on the left, a live demo with six industry switches on the right, four facts below |
| -           | Marquee        | Business segments the sites are built for                       |
| `#vyhody`   | Benefits and services | Six reasons on the left, three kinds of jobs on the right (`#sluzby`), divided by a rule |
| `#cennik`   | Pricing        | Starter, Standard and Pro as three cards with the usual market price for comparison, the e-shop priced separately, add-ons below |
| `#postup`   | Process        | Steps from first contact to going live                          |
| `#otazky`   | FAQ            | Native `<details>` questions, working without JavaScript        |
| `#kontakt`  | Contact        | A short "about me" in the heading and one card: address, phone, SMS, what to write, what the free consultation covers, support and GitHub |
| -           | Footer         | Links, both addresses, privacy policy, automatic year           |
| -           | Mobile bar     | Fixed Call and Write below 720 px wide                          |

Navigation across the home page is same-page via hash links, only "44 ukážok" leads to the gallery; the gallery, the demos, the 404 and the privacy page are separate addresses.

### Pricing shown on the site

| Package      | Price     |
| ------------ | --------- |
| **Starter**  | from €250 |
| **Standard** | from €490 |
| **Pro**      | from €890 |

| Add-on                  | Price            |
| ----------------------- | ---------------- |
| Maintenance             | from €5 / month  |
| Extra subpage           | from €15         |
| Copywriting             | from €12 / page  |
| Rush fix within 48 h    | from €25         |

---

## 🏪 Demo websites

Twenty complete sites for fictional businesses - **not real clients and not references**. Each demo is a single self-contained HTML file with its own colours and layout, a sticky strip linking back to `apoliak.online`, and one working interactive feature.

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

- **The form has no backend** - submitting assembles a `mailto:` link and opens the visitor's mail client. A visitor without a configured mail client has to write to the listed address directly. Nothing is stored and there is no server-side receiver.
- **Contact details sit in the markup as plain text**, where scrapers read them without any trouble. There is no spam protection.
- **The demo sites are designs for fictional businesses** - names, addresses, opening hours and prices are illustrative. They collect no data, their forms, bookings and carts submit nowhere, and their state is lost on reload.
- **The demos carry no photographs at all** - typography, colour and geometry do all the work. On a real commission the client supplies photos, which then replace those areas.
- **Content is duplicated across the HTML** - prices, contact details and copy are hardcoded in several places (markup, meta tags, JSON-LD). Changing them means walking through every occurrence by hand.
- **Each demo carries its own copy of the styles and scripts** inside its file. That is intentional for portability, but a shared change has to be made 44 times.
- **No automated checks** - the repo contains no tests, linters, formatter config or GitHub Actions workflow. Quality rests on manual review.
- **There are no third-party fallbacks offline**, nor are any needed - the site uses no external resources at all.

**Runtime requirements:** any evergreen browser with support for CSS custom properties, `clamp()` and `IntersectionObserver`. Without JavaScript the content stays fully readable - only the reveal animations, the gallery filtering and the demo interactions go away.

**Verified viewports:** 375, 768 and 1280 px, with no horizontal scrolling.

---

## 📜 License

The repository contains a `LICENSE` file with the full, unmodified text of the **GNU General Public License v3**.

GPL-3.0 is a strong copyleft license intended for software. Applied to this website it means anyone may copy, modify and redistribute the markup, styles and scripts - on condition that the derived work is also under GPL-3.0 and its source code is made available.

---

<div align="center">

Built by **Alex Poliak**, Bratislava - [GitHub](https://github.com/Apoliak7777) - [apoliak@apoliak.online](mailto:apoliak@apoliak.online) - 0902 464 022

</div>
