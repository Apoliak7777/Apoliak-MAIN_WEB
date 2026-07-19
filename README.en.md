<div align="center">

[![Slovencina](https://img.shields.io/badge/SK-Sloven%C4%8Dina-30363d?style=for-the-badge)](README.md) [![English](https://img.shields.io/badge/EN-English-2ea043?style=for-the-badge)](README.en.md)

</div>

<div align="center">

# 🅰️ Apoliak - MAIN WEB

**A static single-page showcase of freelance Web - Design - Development services, built purely on HTML, CSS and vanilla JavaScript.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat-square&logo=githubpages&logoColor=white)
![No dependencies](https://img.shields.io/badge/dependencies-0-22c55e?style=flat-square)
![License](https://img.shields.io/badge/license-GPL--3.0-blue?style=flat-square)

[Live demo](https://apoliak.online) - [Quick start](#-quick-start) - [Structure](#-project-structure)

</div>

---

## 📑 Contents

- [Overview](#-overview)
- [Features](#-features)
- [Quick start](#-quick-start)
- [Project structure](#-project-structure)
- [Configuration and design tokens](#️-configuration-and-design-tokens)
- [Page sections](#-page-sections)
- [Deployment](#-deployment)
- [Known limitations](#️-known-limitations)
- [License](#-license)

---

## 🔎 Overview

Apoliak MAIN WEB is a hand-written static site that presents website-building services - the services themselves, the collaboration process, pricing, FAQ and contact. All content is in Slovak (`<html lang="sk">`).

The project deliberately uses no framework, no bundler and no build step. It is three files - `index.html`, `styles.css`, `script.js` - that can be opened straight in a browser and deployed by copying them onto any static hosting. It currently runs on GitHub Pages under a custom domain defined in the `CNAME` file.

The site makes not a single external network request: no CDN, no web fonts, no analytics and no trackers. Typography relies on the system font stack and every icon is a Unicode emoji placed directly in the markup.

---

## ✨ Features

- 🧊 **Sticky glass header** - the header is `position:sticky` with `backdrop-filter:blur(14px)`; once the page is scrolled past 8 px, JS sets `data-shadow="true"` on it and a shadow appears.
- 🍔 **Mobile navigation** - below 980 px the menu hides behind a hamburger button; it opens via the `nav-open` class on `<body>` and closes on a backdrop click, the `Escape` key or a click on any link, while `aria-expanded` is kept in sync.
- 👁️ **Reveal animations on scroll** - an `IntersectionObserver` with a threshold of `0.12` adds the `.is-visible` class to every `.reveal` element and then stops observing it, so the animation runs only once.
- 🎨 **Decorative background** - two blurred colour orbs and a radially masked grid, all `pointer-events:none` and `aria-hidden`, so they get in the way of neither the content nor screen readers.
- 💻 **Hero with a fake code editor** - a card mimicking an editor with a hand-marked syntax highlighting scheme, three trust badges and three mini stats.
- 💶 **Pricing with three packages** - Starter, Standard (marked with a `Najčastejšie` badge) and Pro; each package links to the contact anchor.
- ❓ **FAQ built on native `<details>`** - expanding and collapsing the questions is handled by `<details>`/`<summary>` with the default marker hidden, so the interaction itself needs no JS. Careful though: every item is also a `.reveal`, which means it stays invisible without JS (see [Known limitations](#️-known-limitations)).
- ♿ **Accessibility** - a skip link to the content, an `.sr-only` helper, `aria-label` / `aria-hidden` / `aria-controls`, explicit `:focus-visible` outlines and `scroll-margin-top:86px` so that anchors do not end up underneath the sticky header.
- 🐢 **Respect for `prefers-reduced-motion`** - the media query disables smooth scrolling as well as transitions on `.reveal`, `.btn` and `.nav-panel`.
- 📅 **Automatic year in the footer** - `script.js` writes the current year into `#year`, so there is no need to update it by hand.

---

## 🚀 Quick start

The project has no dependencies, no `package.json` and no installation step. Just clone the repo.

```bash
git clone https://github.com/Apoliak7777/Apoliak-MAIN_WEB.git
cd Apoliak-MAIN_WEB
```

**The simplest way** - open `index.html` directly in a browser. All paths are relative, so `file://` works, including the reveal animations.

**Recommended via a local HTTP server** (more realistic behaviour, correct relative paths):

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`. Any static server will do just as well:

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
├── index.html      # the whole page - 318 lines, sections #top, #services,
│                   # #process, #pricing, #faq, #contact + footer and .backdrop
├── styles.css      # all styling - 394 lines: :root tokens, header/nav, hero,
│                   # cards, pricing, FAQ, reveal states, 980px breakpoint,
│                   # prefers-reduced-motion and focus rules
├── script.js       # 64 lines in a single IIFE: year, header shadow,
│                   # mobile menu, IntersectionObserver reveal
├── CNAME           # custom domain for GitHub Pages (apoliak.online)
├── LICENSE         # full text of the GNU GPL v3
├── README.md       # Slovak version
└── README.en.md    # this file
```

No subfolders, no builds, no assets - the repo holds exactly seven files in its root.

---

## ⚙️ Configuration and design tokens

The project has no configuration system - no `.env`, no environment variables. The visuals are changed by editing the CSS custom properties in the `:root` block at the top of `styles.css`.

| Token                    | Value                         | Meaning                                                                 |
| ------------------------ | ----------------------------- | ----------------------------------------------------------------------- |
| `--bg` / `--bg2`         | `#0b1020` / `#070a14`         | Base of the dark background gradient                                    |
| `--text`                 | `rgba(255,255,255,.92)`       | Primary text colour                                                     |
| `--muted`                | `rgba(255,255,255,.68)`       | Secondary, muted text                                                   |
| `--border`               | `rgba(255,255,255,.12)`       | Border of the skip link and the process steps (`.step`) - nothing more  |
| `--shadow`               | `0 18px 60px rgba(0,0,0,.55)` | Shadow of the hero glass card and the mobile nav panel                  |
| `--brand`                | `#2563eb`                     | Primary brand blue                                                      |
| `--brand2`               | `#22c55e`                     | Complementary green (gradients, accents)                                |
| `--radius` / `--radius2` | `18px` / `24px`               | Corner rounding of cards and larger blocks                              |
| `--container`            | `1120px`                      | Maximum width of the content container                                  |
| `--step`                 | `clamp(14px,1.2vw,16px)`      | Base fluid font size                                                    |
| `--h1` / `--h2` / `--h3` | `clamp(...)`                  | Fluid heading scale                                                     |

> [!IMPORTANT]
> The tokenisation is only partial. Most cards (`.card`, `.price-card`, `.faq-item`, `.contact-card`, `.trust-item`, `.stat`, `.glass`, `.nav-panel`) have their border hardcoded as `rgba(255,255,255,.10)` or `.12`, and `.card` / `.step` also carry their own hardcoded `box-shadow`. Changing `--border` or `--shadow` will not affect them - the relevant rules in `styles.css` have to be edited by hand.

Everything else is changed directly in `index.html`:

| What                                       | Where                                     |
| ------------------------------------------ | ----------------------------------------- |
| Prices (`od 100 €`, `od 225 €`, `dohodou`) | the `#pricing` section, hardcoded in the markup |
| Service and FAQ texts                      | the `#services` and `#faq` sections       |
| Contact email                              | the `mailto:` link in the `#contact` section |
| `<title>`, meta description, `theme-color` | `<head>`                                  |
| Domain for GitHub Pages                    | the `CNAME` file                          |

---

## 🧭 Page sections

| Anchor      | Section              | Content                                                                |
| ----------- | -------------------- | ---------------------------------------------------------------------- |
| `#top`      | Hero                 | Heading with a gradient accent, CTA, trust badges, fake code card      |
| `#services` | Services             | Three cards: custom website, redesign and fixes, deployment            |
| `#process`  | Collaboration process | Four steps: brief, design, implementation, deployment                 |
| `#pricing`  | Pricing              | Three packages: Starter, Standard (highlighted), Pro                   |
| `#faq`      | FAQ                  | Three native `<details>` questions                                     |
| `#contact`  | Contact              | A `mailto:` card and a shortcut back to the pricing                    |

The navigation is purely same-page through hash links - there is no router and no second page.

---

## 🌐 Deployment

The site runs on GitHub Pages. The procedure:

1. Push to the default branch (`main`).
2. Enable GitHub Pages for that branch in the repository settings.
3. The `CNAME` file in the root binds the site to the custom domain (`apoliak.online`).
4. The domain's DNS records (A / ALIAS) must point at GitHub Pages; the TLS certificate is issued by GitHub automatically.

> [!NOTE]
> No database, application server, runtime or environment variables are needed. The same content can be uploaded to Netlify, Vercel, S3 or classic FTP hosting without a single change to the code.

---

## ⚠️ Known limitations

> [!WARNING]
> **Without JavaScript the content is invisible.** `styles.css` sets `.reveal{opacity:0}` and visibility is only added by `script.js` through the `.is-visible` class. If JS is disabled, blocked or fails, only the header, footer and background get rendered. There is no `<noscript>` fallback and no CSS-only backup solution.

- **Contact is `mailto:` only** - there is no form and no backend, so nothing exists to receive messages and there is no spam protection whatsoever. The email address sits in the markup as plain text, where scrapers read it without any trouble.
- **Dead CSS** - the `.form`, `.field`, `input` and `textarea` rules (lines 282-301 in `styles.css`) style a contact form that does not exist in `index.html`. Likewise `.work-grid` in the mobile breakpoint has no corresponding element. These are leftovers from a removed section.
- **Unused attribute** - `<header>` carries `data-elevate`, but `script.js` writes `data-shadow` and `styles.css` reacts to it. The attribute is inactive.
- **Domain mismatch** - the decorative code card in the hero section displays the string `apoliak.site`, while `CNAME` declares `apoliak.online`. The text in the mockup is out of date.
- **Missing SEO and social metadata** - even though the site sells "basic SEO" as a service, the only metadata in `<head>` are `charset`, `viewport`, `theme-color`, `<title>` and the meta description. No favicon, Open Graph, Twitter Card, canonical URL, JSON-LD, `robots.txt` or `sitemap.xml`.
- **"Lighthouse 90+" is marketing copy** - nothing in the repository measures, tests or enforces that value.
- **Prices are hardcoded** in the HTML, there is no single source of truth - changing them means editing the markup by hand.
- **No automated checks** - the repo contains no tests, linters, formatter config, GitHub Actions workflow, `.gitignore` or `.editorconfig`. Quality rests on manual review.
- **`backdrop-filter`** (header and mobile panel) degrades to a flat translucent background on browsers without support; no `@supports` fallback is declared.
- **The git history is only two commits**, so there is nowhere to trace the intent behind specific decisions.

**Runtime requirements:** any evergreen browser with support for `IntersectionObserver`, CSS custom properties and `clamp()`.

---

## 📜 License

The repository contains a `LICENSE` file with the full, unmodified text of the **GNU General Public License v3** (29 June 2007, 674 lines).

> [!NOTE]
> The closing "how to apply" passage of the license still contains the unfilled `<year>` and `<name of author>` placeholders, so the copyright holder is not named anywhere in the repository and no source file carries a GPL header.

GPL-3.0 is a strong copyleft license intended for software. Applied to this website it means that anyone may copy, modify and further distribute the markup, styles and script - on condition that the derived work is also under GPL-3.0 and its source code is made available.

---

<div align="center">

Built by **Alex Poliak** - [GitHub](https://github.com/Apoliak7777) - [alexpoliak21@gmail.com](mailto:alexpoliak21@gmail.com)

</div>
