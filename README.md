<div align="center">

[![Slovencina](https://img.shields.io/badge/SK-Sloven%C4%8Dina-2ea043?style=for-the-badge)](README.md) [![English](https://img.shields.io/badge/EN-English-30363d?style=for-the-badge)](README.en.md)

</div>

<div align="center">

# 🅰️ Apoliak - MAIN WEB

**Statický web freelance tvorby webstránok pre malé podniky, aj s galériou 44 preklikateľných ukážkových webov. Čisté HTML, CSS a vanilla JavaScript.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat-square&logo=githubpages&logoColor=white)
![Bez závislostí](https://img.shields.io/badge/závislosti-0-22c55e?style=flat-square)
![Ukážky](https://img.shields.io/badge/uk%C3%A1%C5%BEkov%C3%A9%20weby-44-ffd23f?style=flat-square)
![License](https://img.shields.io/badge/license-GPL--3.0-blue?style=flat-square)

[Živý web](https://apoliak.online) - [Galéria ukážok](https://apoliak.online/ukazky/) - [Rýchly štart](#-rýchly-štart) - [Štruktúra](#-štruktúra-projektu)

</div>

---

## 📑 Obsah

- [Prehľad](#-prehľad)
- [Funkcie](#-funkcie)
- [Rýchly štart](#-rýchly-štart)
- [Štruktúra projektu](#-štruktúra-projektu)
- [Konfigurácia a dizajnové tokeny](#️-konfigurácia-a-dizajnové-tokeny)
- [Sekcie stránky](#-sekcie-stránky)
- [Ukážkové weby](#-ukážkové-weby)
- [Nasadenie](#-nasadenie)
- [Známe obmedzenia](#️-známe-obmedzenia)
- [Licencia](#-licencia)

---

## 🔎 Prehľad

Apoliak MAIN WEB je ručne písaný statický web, ktorý prezentuje tvorbu webstránok na mieru pre malé podniky - reštaurácie, kaviarne, salóny, autoservisy, ambulancie a podobné prevádzky. Obsahuje ukážky, služby, cenník s kalkulačkou, postup spolupráce, krátke „O mne“, časté otázky a kontakt. Slovenčina je na koreni webu, česká, maďarská, poľská, anglická, nemecká a talianska verzia ležia v `/cs/` až `/it/`.

Podstatnou časťou webu je galéria **44 ukážkových webov**. Každý je samostatná stránka vymysleného podniku s vlastnou farebnosťou, rozložením a funkčným interaktívnym prvkom, takže návštevník si vie priamo preklikať, ako môže vyzerať jeho vlastný web.

Projekt zámerne nepoužíva žiadny framework, bundler ani build krok. Sú to obyčajné súbory, ktoré sa dajú otvoriť priamo v prehliadači a nasadiť skopírovaním na akýkoľvek statický hosting. Beží na GitHub Pages pod vlastnou doménou definovanou v súbore `CNAME`.

Stránka nerobí ani jeden externý network request: žiadne CDN, žiadne cudzie webfonty, žiadne analytiky ani trackery. Písmo Schibsted Grotesk (licencia OFL) je uložené priamo na webe v `domov/pisma/`, snímky ukážok na hlavnej stránke sú súbory WebP v `domov/obrazky/` a ostatná grafika je CSS a inline SVG.

---

## ✨ Funkcie

- 🏪 **44 ukážkových webov** - kompletné weby vymyslených podnikov, každý ako jeden sebestačný HTML súbor s vlastnou paletou, typografiou a funkčnou interakciou (pozri [Ukážkové weby](#-ukážkové-weby)).
- 🔎 **Galéria s filtrovaním** - `ukazky/index.html` triedi ukážky podľa kategórie; filtre prepínajú `hidden` na kartách, držia `aria-pressed` v synchrone a hlásia počet zobrazených ukážok do živého textu.
- 🖼️ **Živé náhľady v galérii** - v ráme každej karty beží samotná ukážka v `<iframe>` široká 1280 px (v úzkom ráme 1000 px), zmenšená cez `transform: scale()`; mierku dopočíta `script.js` z reálnej šírky rámu. Náhľad tak nemôže zostarnúť voči ukážke a každá jazyková verzia galérie ukazuje svoje preložené ukážky. Rámy sú `loading="lazy"`, `pointer-events: none` a mimo poradia tabulátora.
- 📸 **Hlavná stránka so snímkami ukážok** - úvod ukazuje snímku reštaurácie a mobil salónu, sekcia `#ukazky` deväť ďalších snímok (WebP 800 a 1280 px, na mobile sa posúvajú do strany) a odkazy na odvetvia, ktoré v galérii predvolia filter (`ukazky/#remeslo`). Snímky aj náhľady pri zdieľaní prerobí `node _PRACA/nahlady_domov.js` (jazykovú verziu `--jazyk cs` a pod., snímky preložených ukážok idú do `cs/domov/obrazky/`).
- 🧮 **Kalkulačka ceny v cenníku** - štyri balíčky ako voľby, doplnky (ďalšie podstránky, texty, údržba) a „Vaša zostava“ so súčtom a termínom. Nič neodosiela: z výberu poskladá text do e-mailu, WhatsAppu, SMS alebo schránky. Ceny a texty sú v atribútoch `data-*`, aby ich vedel preložiť prekladový nástroj.
- 🎛️ **Interaktívne prvky bez knižníc** - prepínanie jedálneho lístka, konfigurátor pizze, filtrovanie rozvrhu, objednávanie termínov, cenové kalkulačky a nákupný košík sú napísané v čistom JavaScripte.
- 🎨 **Svetlý dizajn bez šablóny** - papierové pozadie, atramentový text a jediný akcent, žltá (tlačidlá, štítok, kontaktný pás), jedno písmo Schibsted Grotesk. Hlavná stránka (aj preložené jazykové) má vlastné `domov/domov.css`, galéria, 404 a ochrana údajov berú tie isté tokeny zo `styles.css`.
- ✉️ **Priamy kontakt namiesto formulára** - stránka nemá formulár. Ten by cez `mailto:` slúboval odoslanie, ktoré vie splniť len u návštevníka s nastaveným e-mailovým programom; kto má poštu vo webovom prehliadači, tomu by kliknutie neurobilo nič. Namiesto neho stojí adresa veľkým písmom, tlačidlá na e-mail, telefón, WhatsApp a SMS a zoznam toho, čo do správy napísať. WhatsApp je obyčajný odkaz na `wa.me` s predvyplnenou vetou v jazyku stránky (na mobile ikona v spodnej lište), e-mailové šablóny sa pýtajú aj na to, odkiaľ o mne záujemca vie.
- ♿ **Prístupnosť podľa WCAG AA** - kontrastné pomery sú overené a zapísané pri tokenoch, stránka má skip-link, jeden `h1`, viditeľné focus stavy a `scroll-padding-top`, aby kotvy nekončili pod sticky hlavičkou.
- 🐢 **Bez nabiehacích animácií** - obsah je viditeľný hneď po načítaní, nič sa samo nehýbe, nenakláňa ani nestrieda. Pri `prefers-reduced-motion` sa vypnú aj krátke prechody tlačidiel a kariet a plynulé posúvanie ku kotvám.
- 🔍 **SEO a zdieľanie** - canonical URL, Open Graph aj Twitter Card, náhľady pri zdieľaní v rozmere 1200 × 630 (`domov/og-domov.png` a `cs/domov/og-domov.png` … `it/domov/og-domov.png` pre hlavnú stránku, `og-image.png` a `og-image-cs.png` … `og-image-it.png` pre galériu, všetky svetlé ako web), štruktúrované dáta schema.org `ProfessionalService`, `sitemap.xml`, `robots.txt` a inline SVG favicon.
- 🌍 **Slovenčina, čeština, maďarčina, poľština, angličtina, nemčina a taliančina na jednej doméne** - česká verzia je v `/cs/` (kurz 25 Kč/€), maďarská v `/hu/` (kurz 400 Ft/€), poľská v `/pl/` (kurz 4,35 zł/€), anglická v `/en/` (pre Írsko, ceny ostávajú v eurách), nemecká v `/de/` (pre Nemecko a Rakúsko, ceny ostávajú v eurách), talianska v `/it/` (pre Taliansko, ceny ostávajú v eurách), všetky vrátane 44 ukážok, s prepočítanými cenami a miestnymi reáliami. Prepínač jazyka je v hlavičke, vyhľadávače dostávajú `hreflang` v hlavičke aj v `sitemap.xml`. Slovenské súbory ostávajú zdrojom pravdy - preklady sa z nich generujú, takže sa verzie nemôžu rozísť.
- 🚧 **Vlastná 404 stránka** - `404.html` v rovnakom dizajne s odkazmi späť na hlavnú stránku a do galérie.
- 🔒 **Zásady ochrany osobných údajov** - samostatná stránka `ochrana-osobnych-udajov.html`.
- 📅 **Automatický rok v pätičke** - `domov/domov.js` a `script.js` zapíšu aktuálny rok do `#rok`, netreba ho ručne aktualizovať.

---

## 🚀 Rýchly štart

Projekt nemá žiadne závislosti, žiadny `package.json` ani inštalačný krok. Stačí repo naklonovať.

```bash
git clone https://github.com/Apoliak7777/Apoliak-MAIN_WEB.git
cd Apoliak-MAIN_WEB
```

**Najjednoduchšie** - otvor `index.html` priamo v prehliadači. Všetky cesty sú relatívne, takže `file://` funguje vrátane galérie aj ukážok.

**Odporúčane cez lokálny HTTP server** (realistickejšie správanie, správne relatívne cesty):

```bash
python -m http.server 8000
```

Potom otvor `http://localhost:8000/` a galériu na `http://localhost:8000/ukazky/`. Rovnako dobre poslúži hociktorý statický server:

```bash
npx serve .
php -S localhost:8000
```

> [!TIP]
> Neexistuje watch mód ani hot reload - po úprave `styles.css`, `script.js` alebo súborov v `domov/` stačí obnoviť stránku (pri cache prípadne `Ctrl+F5`).

---

## 📁 Štruktúra projektu

```text
Apoliak-MAIN_WEB/
├── index.html                    # hlavná stránka (35 KB)
├── domov/                        # vzhľad, skript, písmo a snímky hlavnej stránky
│   ├── domov.css                 # štýly hlavnej stránky (24 KB)
│   ├── domov.js                  # kalkulačka ceny, jazykové menu, rok (6 KB)
│   ├── pisma/                    # Schibsted Grotesk vo woff2 a licencia OFL
│   ├── obrazky/                  # snímky ukážok vo WebP
│   └── og-domov.png              # náhľad hlavnej stránky pri zdieľaní, 1200 × 630
├── styles.css                    # spoločné štýly galérie, 404 a ochrany
│                                 # údajov vo všetkých jazykoch (15 KB)
├── script.js                     # spoločný skript týchto stránok (5 KB)
├── ukazky/
│   ├── index.html                # galéria ukážok s filtrovaním (55 KB)
│   ├── advokat/index.html
│   ├── ambulancia/index.html
│   ├── autodiely/index.html
│   ├── autoservis/index.html
│   ├── autoskola/index.html
│   ├── barber/index.html
│   ├── calunnictvo/index.html
│   ├── cukraren/index.html
│   ├── doprava/index.html
│   ├── elektrikar/index.html
│   ├── farma/index.html
│   ├── fitko/index.html
│   ├── fotoatelier/index.html
│   ├── fotovoltika/index.html
│   ├── instalater/index.html
│   ├── internet/index.html
│   ├── jazykovka/index.html
│   ├── kaviaren/index.html
│   ├── krajcirstvo/index.html
│   ├── kulturak/index.html
│   ├── kvetinarstvo/index.html
│   ├── laboratorium/index.html
│   ├── obec/index.html
│   ├── odpady/index.html
│   ├── optika/index.html
│   ├── penzion/index.html
│   ├── plasty/index.html
│   ├── pocitace/index.html
│   ├── poistovaci/index.html
│   ├── poradca/index.html
│   ├── projektant/index.html
│   ├── reality/index.html
│   ├── reklamka/index.html
│   ├── remeselnik/index.html
│   ├── restauracia/index.html
│   ├── salon/index.html
│   ├── stavebna/index.html
│   ├── strojarstvo/index.html
│   ├── uctovnictvo/index.html
│   ├── velkoobchod/index.html
│   ├── veterina/index.html
│   ├── wellness/index.html
│   ├── zabava/index.html
│   └── zamocnictvo/index.html
├── cs/                           # česká verzia celého webu vrátane 44 ukážok
│   ├── index.html                # hlavná stránka po česky
│   ├── domov/                    # snímky preložených ukážok a náhľad pri zdieľaní
│   ├── ukazky/                   # galéria a všetkých 44 ukážok po česky
│   ├── 404.html
│   └── ochrana-osobnych-udajov.html
├── hu/                           # maďarská verzia celého webu vrátane 44 ukážok
│   ├── index.html                # hlavná stránka po maďarsky
│   ├── domov/                    # snímky preložených ukážok a náhľad pri zdieľaní
│   ├── ukazky/                   # galéria a všetkých 44 ukážok po maďarsky
│   ├── 404.html
│   └── ochrana-osobnych-udajov.html
├── pl/                           # poľská verzia celého webu vrátane 44 ukážok
│   ├── index.html                # hlavná stránka po poľsky
│   ├── domov/                    # snímky preložených ukážok a náhľad pri zdieľaní
│   ├── ukazky/                   # galéria a všetkých 44 ukážok po poľsky
│   ├── 404.html
│   └── ochrana-osobnych-udajov.html
├── en/                           # anglická verzia celého webu vrátane 44 ukážok (pre Írsko)
│   ├── index.html                # hlavná stránka po anglicky
│   ├── domov/                    # snímky preložených ukážok a náhľad pri zdieľaní
│   ├── ukazky/                   # galéria a všetkých 44 ukážok po anglicky
│   ├── 404.html
│   └── ochrana-osobnych-udajov.html
├── de/                           # nemecká verzia celého webu vrátane 44 ukážok (pre Nemecko a Rakúsko)
│   ├── index.html                # hlavná stránka po nemecky
│   ├── domov/                    # snímky preložených ukážok a náhľad pri zdieľaní
│   ├── ukazky/                   # galéria a všetkých 44 ukážok po nemecky
│   ├── 404.html
│   └── ochrana-osobnych-udajov.html
├── it/                           # talianska verzia celého webu vrátane 44 ukážok (pre Taliansko)
│   ├── index.html                # hlavná stránka po taliansky
│   ├── domov/                    # snímky preložených ukážok a náhľad pri zdieľaní
│   ├── ukazky/                   # galéria a všetkých 44 ukážok po taliansky
│   ├── 404.html
│   └── ochrana-osobnych-udajov.html
├── 404.html                      # vlastná stránka pre neexistujúce adresy
├── ochrana-osobnych-udajov.html  # zásady ochrany osobných údajov
├── og-image.png                  # náhľad galérie pri zdieľaní, 1200 × 630
├── og-image-cs.png               # to isté pre českú verziu
├── og-image-hu.png               # to isté pre maďarskú verziu
├── og-image-pl.png               # to isté pre poľskú verziu
├── og-image-en.png               # to isté pre anglickú verziu
├── og-image-de.png               # to isté pre nemeckú verziu
├── og-image-it.png               # to isté pre taliansku verziu
├── sitemap.xml                   # mapa stránok (všetkých sedem jazykových verzií + hreflang)
├── robots.txt                    # pravidlá pre roboty
├── CNAME                         # vlastná doména pre GitHub Pages
├── .nojekyll                     # vypnutie Jekyll spracovania na Pages
├── LICENSE                       # plný text GNU GPL v3
├── README.md                     # tento súbor
└── README.en.md                  # anglická verzia tohto súboru
```

Priečinok `ukazky/` má spolu asi 4,5 MB. Žiadne buildy, žiadne node_modules, žiadne stiahnuté assety.

---

## ⚙️ Konfigurácia a dizajnové tokeny

Projekt nemá konfiguračný systém - žiadne `.env`, žiadne env premenné. Vizuál sa mení editovaním CSS custom properties v bloku `:root`: hlavná stránka (vo všetkých jazykoch) v `domov/domov.css`, galéria, 404 a ochrana údajov v `styles.css`. Oba súbory majú tie isté tokeny, pri zmene farby treba upraviť obidva.

| Token           | Hodnota                                 | Význam                                                  |
| --------------- | --------------------------------------- | ------------------------------------------------------- |
| `--papier`      | `#fbfaf7`                               | Pozadie stránky                                         |
| `--papier-2`    | `#f3f1eb`                               | Striedavý tón sekcií                                    |
| `--biela`       | `#ffffff`                               | Karty, balíčky a menu                                   |
| `--atrament`    | `#16181b` (17,0:1)                      | Nadpisy, tlačidlá, rámčeky vybraných kariet             |
| `--text`        | `#33373d` (11,5:1)                      | Bežný text                                              |
| `--tlmene`      | `#62676f` (5,5:1)                       | Popisky a poznámky                                      |
| `--ciara`       | `#e4e1d9`                               | Jemné oddeľovače                                        |
| `--ciara-2`     | `#cfcbc0`                               | Rámčeky kariet a polí                                   |
| `--zlta`        | `#ffd23f` (atrament na nej 12,3:1)      | Jediný akcent: hlavné tlačidlá, štítok, kontaktný pás   |
| `--zlta-svetla` | `#fff3c2`                               | Vybraný jazyk, odvetvie pod myšou                       |
| `--tien`        | dvojitý jemný tieň                      | Karty pod myšou, jazykové menu                          |
| `--pismo`       | Schibsted Grotesk, Segoe UI, system-ui  | Jediné písmo celého webu                                |

Kontrast je počítaný voči `--papier`. Šírku obsahu drží trieda `.obal` (hlavná stránka) a `.wrap` (ostatné stránky): najviac 1200 px, na mobile 16 px a od 640 px 28 px od okraja.

> [!IMPORTANT]
> Tokeny v `domov/domov.css` a `styles.css` platia pre stránky webu. **Každý ukážkový web má vlastnú farebnosť zapísanú vo svojom vlastnom súbore** - je zámerne samostatný, aby sa dal poslať klientovi alebo nasadiť ako jeden súbor. Zmena tokenov sa na ukážkach neprejaví.

Obsahové veci sa menia priamo v HTML:

| Čo                                            | Kde                                                |
| --------------------------------------------- | -------------------------------------------------- |
| Ceny balíkov a doplnkov                       | sekcia `#cennik` v `index.html` (aj `data-cena` a `data-t-*` pre kalkulačku) |
| Texty služieb, postupu, „O mne“ a otázok      | sekcie `#sluzby`, `#postup`, `#vyhody`, `#otazky`   |
| E-mail a telefón                              | sekcia `#kontakt` a JSON-LD blok v `<head>`         |
| Hlavná adresa a telefón                       | `#kontakt`, hlavička, lišta na mobile, patička a JSON-LD |
| Adresa podpory pre klientov                   | `support@apoliak.online` v `#kontakt`, patičke a ukážkach |
| `<title>`, meta description, OG a Twitter tagy | `<head>` každej stránky                            |
| Štruktúrované dáta                            | JSON-LD blok v `<head>` hlavnej stránky             |
| Doména pre GitHub Pages                       | súbor `CNAME` (plus `sitemap.xml` a canonical URL)  |

---

## 🧭 Sekcie stránky

| Kotva       | Sekcia          | Obsah                                                              |
| ----------- | --------------- | ------------------------------------------------------------------ |
| -           | Úvod            | Nadpis, dve tlačidlá, tri fakty (od 250 €, prvý návrh do 3 dní, odpoveď do 24 hodín), vpravo snímka reštaurácie a mobil salónu |
| `#ukazky`   | Ukážky          | Deväť snímok ukážkových webov a odkazy na odvetvia v galérii       |
| `#sluzby`   | Služby          | Nový web, nový vzhľad starého webu, rezervácie, objednávky a e-shop |
| `#cennik`   | Cenník          | Štyri balíčky (Starter, Standard, Pro, E-shop) s bežnou cenou na trhu, doplnky a „Vaša zostava“ so súčtom a odoslaním e-mailom, cez WhatsApp alebo SMS |
| `#postup`   | Postup          | Štyri kroky od prvej správy po spustenie, pri každom čo treba od klienta |
| `#vyhody`   | O mne           | Kto web robí a na čo sa dá spoľahnúť                                |
| `#otazky`   | Časté otázky    | Desať natívnych `<details>`, fungujú aj bez JavaScriptu             |
| `#kontakt`  | Kontakt         | Žltý pás: adresa, tlačidlá e-mail, telefón, WhatsApp a SMS, čo mi napísať a adresa podpory |
| -           | Pätička         | Obe adresy, GitHub, ochrana osobných údajov, automatický rok        |
| -           | Lišta na mobile | Zavolať, WhatsApp a Napísať dopyt pod 960 px šírky                  |

Navigácia po hlavnej stránke je same-page cez hash odkazy; do galérie vedú snímky, odkazy na odvetvia a tlačidlo „Všetkých 44 ukážok“. Galéria, ukážky, 404 a stránka ochrany údajov sú samostatné adresy. Jazykové verzie majú tú istú hlavnú stránku v preklade, s kalkulačkou aj snímkami preložených ukážok.

### Cenník na webe

| Balík        | Cena       |
| ------------ | ---------- |
| **Starter**  | od 250 €   |
| **Standard** | od 490 €   |
| **Pro**      | od 890 €   |
| **E-shop**   | od 1 190 € |

| Doplnok                  | Cena                                |
| ------------------------ | ----------------------------------- |
| Ďalšia podstránka        | 35 €                                |
| Texty                    | 19 € / stránka (v balíčku Pro v cene) |
| Údržba a drobné úpravy   | od 9 € / mesiac, voliteľná          |
| Rýchla oprava do 48 h    | 35 €                                |

---

## 🏪 Ukážkové weby

44 kompletných webov vymyslených podnikov - **nejde o reálnych klientov ani referencie**. Každá ukážka je jeden sebestačný HTML súbor s vlastnou farebnosťou a rozložením, so sticky pásikom s odkazom späť na `apoliak.online` a s funkčným interaktívnym prvkom.

| Priečinok      | Podnik                        | Kategória           | Interaktívny prvok |
| -------------- | ----------------------------- | ------------------- | ------------------ |
| `cukraren` | Pekáreň a cukráreň Kôrka | Gastro a ubytovanie | Konfigurátor torty s prepočtom ceny podľa veľkosti |
| `kaviaren` | Lipová | Gastro a ubytovanie | Konfigurátor pizze |
| `penzion` | Penzión Hrebeň | Gastro a ubytovanie | Rezervácia s prepočtom počtu nocí a celkovej ceny vrátane… |
| `restauracia` | Reštaurácia Dubová | Gastro a ubytovanie | Jedálny lístok sa prepína po kategóriách a rezerváciu… |
| `autoskola` | Autoškola Rondel | Služby | Prihláška s prepočtom ceny kurzu podľa skupiny vodičského… |
| `barber` | Holičstvo Ostrie | Služby | Objednanie podľa vybranej služby a jej dĺžky |
| `fitko` | Fitness centrum Halová | Služby | Rozvrh skupinových tréningov sa filtruje podľa dňa aj typu… |
| `fotoatelier` | Fotoateliér Škála | Služby | Výber balíčka a počtu upravených fotografií s okamžitým… |
| `krajcirstvo` | Ateliér Steh | Služby | Kalkulačka úprav |
| `salon` | Salón Brezová | Služby | Rezervácia termínu s okamžitým súhrnom vybraných úkonov |
| `wellness` | Wellness Salvia | Služby | Rezervácia procedúry so súhrnom |
| `zabava` | Kolkáreň Deviatka | Služby | Rezervácia dráhy |
| `autoservis` | Autoservis 12 | Remeslo a stavba | Objednanie termínu s cenou úkonu vopred |
| `calunnictvo` | Čalúnnictvo Pružina | Remeslo a stavba | Kalkulačka prečalúnenia podľa kusa a látky |
| `elektrikar` | Elektro Fáza | Remeslo a stavba | Kalkulačka rozsahu elektroinštalácie |
| `instalater` | Teplo a Voda | Remeslo a stavba | Porovnávač zdrojov tepla |
| `remeselnik` | Stolárstvo Rovina | Remeslo a stavba | Kalkulačka ceny zákazky podľa rozmerov |
| `stavebna` | Stavebná firma KVADER | Remeslo a stavba | Kalkulačka ceny podľa plochy a rozsahu prác |
| `zamocnictvo` | Kovanie Šesťhran | Remeslo a stavba | Konfigurátor brány s náhľadom |
| `ambulancia` | Zubná ambulancia Vrbová | Zdravie | Objednanie ošetrenia s výberom výkonu a rozlíšením |
| `optika` | Optika Meridián | Zdravie | Objednanie na meranie zraku s výberom typu vyšetrenia a… |
| `veterina` | Veterinárna klinika Alveron | Zdravie | Objednanie podľa druhu a veľkosti zvieraťa |
| `farma` | Dvor Rozsocha | Obchod a predaj | Skladačka debničky so sezónnym kalendárom |
| `kvetinarstvo` | Kvetinárstvo Steblo | Obchod a predaj | Plne funkčný nákupný košík |
| `reality` | Kamenec reality | Obchod a predaj | Filter ponuky nehnuteľností a hypotekárna kalkulačka s… |
| `velkoobchod` | Paleta Vzor | Obchod a predaj | B2B cenník s množstevnými pásmami |
| `advokat` | Advokátska kancelária Meritum | Firmy a kancelárie | Dopyt s odhadom odmeny podľa typu veci |
| `poistovaci` | Štít maklér | Firmy a kancelárie | Porovnávač poistenia |
| `poradca` | Kompas financie | Firmy a kancelárie | Kalkulačka sporenia so zloženým úročením |
| `projektant` | Rysá projekcia | Firmy a kancelárie | Sprievodca stavebným povolením |
| `reklamka` | Studio Prietlač | Firmy a kancelárie | Kalkulačka tlače s grafom |
| `uctovnictvo` | SALDIA | Firmy a kancelárie | Kalkulačka mesačného paušálu podľa počtu dokladov |
| `autodiely` | Kotva Automotive | Výroba a technika | Portál pre odberateľov so sledovaním zákazky |
| `fotovoltika` | Slnovrat energia | Výroba a technika | Kalkulačka návratnosti s grafom bilancie po rokoch |
| `laboratorium` | Skúšobňa Etalón | Výroba a technika | Výber skúšky |
| `plasty` | Polyform | Výroba a technika | Kalkulačka série |
| `pocitace` | Bit a Byte | Výroba a technika | Diagnostika podľa príznakov |
| `strojarstvo` | Obrobňa Merkur | Výroba a technika | Kalkulačka dielca podľa materiálu |
| `doprava` | Traťová | Doprava a odpady | Kalkulačka prepravy z trasy a objemu |
| `odpady` | Zberná Vzor | Doprava a odpady | Objednávka kontajnera |
| `internet` | Vlnka net | Vzdelávanie a obec | Overenie pokrytia podľa obce |
| `jazykovka` | Slovosled | Vzdelávanie a obec | Rozraďovací test z ôsmich otázok |
| `kulturak` | Kino Orbis | Vzdelávanie a obec | Program s rezerváciou konkrétneho sedadla |
| `obec` | Obec Rakytie | Vzdelávanie a obec | Sprievodca životnými situáciami |

> [!NOTE]
> Ukážky sú zámerne bez fotografií. Plochy, kde by inak boli, nesú vlastnú kompozíciu - vrstvené prechody, geometriu, vlásočnicové vzory a typografiu. Stránky nikam nič neodosielajú, formuláre a košíky sú návrhové makety.

---

## 🌐 Nasadenie

Web beží na GitHub Pages. Postup:

1. Pushni na default branch (`main`).
2. V nastaveniach repozitára zapni GitHub Pages pre tento branch a koreňový priečinok.
3. Súbor `CNAME` v roote naviaže stránku na vlastnú doménu (`apoliak.online`), `.nojekyll` vypne Jekyll spracovanie.
4. DNS záznamy domény (A / ALIAS) musia smerovať na GitHub Pages; TLS certifikát vystaví GitHub automaticky.

> [!NOTE]
> Nie je potrebná databáza, aplikačný server, runtime ani žiadne environment premenné. Rovnaký obsah sa dá nahrať na Netlify, Vercel, S3 alebo klasický FTP hosting bez jedinej zmeny v kóde.

Po zmene domény treba upraviť `CNAME`, canonical URL, Open Graph adresy a `sitemap.xml`.

---

## ⚠️ Známe obmedzenia

- **Stránka nezbiera žiadne údaje** - nemá formulár ani backend. Návštevník píše z vlastnej pošty alebo volá. Neexistuje nič, čo by správy prijímalo na serveri.
- **Kontaktné údaje sú v markupe v čistom texte**, kde ich scrapery bez problémov prečítajú. Neexistuje ochrana proti spamu.
- **Ukážkové weby sú návrhy vymyslených podnikov** - názvy, adresy, otváracie hodiny aj ceny sú ilustračné. Nezbierajú žiadne údaje, ich formuláre, rezervácie ani košíky nikam nič neodosielajú a po obnovení stránky sa stav stráca.
- **Ukážky nemajú ani jednu fotografiu** - všetko nesie typografia, farba a geometria. Pri reálnej zákazke fotografie dodáva klient a nahrádzajú tieto plochy.
- **Obsah je duplikovaný v HTML** - ceny, kontakt aj texty sú zapísané natvrdo na viacerých miestach (markup, meta tagy, JSON-LD). Zmena znamená prejsť všetky výskyty ručne.
- **Každá ukážka má vlastnú kópiu štýlov aj skriptov** vo svojom súbore. Je to zámer, aby bola prenositeľná, ale znamená to, že spoločná zmena sa musí urobiť 44krát.
- **Žiadne automatické kontroly** - v repe nie sú testy, lintery, formatter config ani GitHub Actions workflow. Kvalita stojí na manuálnej kontrole.
- **Bez pripojenia nie sú fallbacky tretích strán**, ale ani nie sú potrebné - stránka nepoužíva žiadne externé zdroje.

**Požiadavky na runtime:** ľubovoľný evergreen prehliadač s podporou CSS custom properties, `clamp()` a `:has()`. Bez JavaScriptu ostáva obsah plne čitateľný, len bez filtrovania galérie, výpočtu kalkulačky a interaktívnych prvkov v ukážkach.

**Overené šírky:** 320, 360, 390, 768, 1024, 1100, 1200 a 1440 px bez vodorovného rolovania, vo všetkých siedmich jazykoch.

---

## 📜 Licencia

Repozitár obsahuje súbor `LICENSE` s úplným a nezmeneným textom **GNU General Public License v3**.

GPL-3.0 je silné copyleft licencovanie určené pre softvér. Aplikované na tento web to znamená, že markup, štýly aj skripty smie ktokoľvek kopírovať, upravovať a ďalej šíriť - za podmienky, že odvodené dielo bude tiež pod GPL-3.0 a so sprístupneným zdrojovým kódom.

---

<div align="center">

Vytvoril **Alex Poliak**, Bratislava - [GitHub](https://github.com/Apoliak7777) - [apoliak@apoliak.online](mailto:apoliak@apoliak.online) - 0902 464 022

</div>
