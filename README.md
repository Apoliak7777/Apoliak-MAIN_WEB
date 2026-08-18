<div align="center">

[![Slovencina](https://img.shields.io/badge/SK-Sloven%C4%8Dina-2ea043?style=for-the-badge)](README.md) [![English](https://img.shields.io/badge/EN-English-30363d?style=for-the-badge)](README.en.md)

</div>

<div align="center">

# 🅰️ Apoliak - MAIN WEB

**Statický web freelance tvorby webstránok pre malé podniky, aj s galériou dvadsiatich preklikateľných ukážkových webov. Čisté HTML, CSS a vanilla JavaScript.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat-square&logo=githubpages&logoColor=white)
![Bez závislostí](https://img.shields.io/badge/závislosti-0-22c55e?style=flat-square)
![Ukážky](https://img.shields.io/badge/uk%C3%A1%C5%BEkov%C3%A9%20weby-20-e9b45f?style=flat-square)
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

Apoliak MAIN WEB je ručne písaný statický web, ktorý prezentuje tvorbu webstránok na mieru pre malé podniky - reštaurácie, kaviarne, salóny, autoservisy, ambulancie a podobné prevádzky. Obsahuje výhody, služby, postup spolupráce, cenník, časté otázky a kontaktný formulár. Celý obsah je v slovenčine (`<html lang="sk">`).

Podstatnou časťou webu je galéria **dvadsiatich ukážkových webov**. Každý je samostatná stránka vymysleného podniku s vlastnou farebnosťou, rozložením a funkčným interaktívnym prvkom, takže návštevník si vie priamo preklikať, ako môže vyzerať jeho vlastný web.

Projekt zámerne nepoužíva žiadny framework, bundler ani build krok. Sú to obyčajné súbory, ktoré sa dajú otvoriť priamo v prehliadači a nasadiť skopírovaním na akýkoľvek statický hosting. Beží na GitHub Pages pod vlastnou doménou definovanou v súbore `CNAME`.

Stránka nerobí ani jeden externý network request: žiadne CDN, žiadne webfonty, žiadne analytiky ani trackery. Typografia stojí na systémovom font stacku a celá grafika je CSS a inline SVG.

---

## ✨ Funkcie

- 🏪 **Dvadsať ukážkových webov** - kompletné weby vymyslených podnikov, každý ako jeden sebestačný HTML súbor s vlastnou paletou, typografiou a funkčnou interakciou (pozri [Ukážkové weby](#-ukážkové-weby)).
- 🔎 **Galéria s filtrovaním** - `ukazky/index.html` triedi ukážky podľa kategórie; filtre prepínajú `hidden` na kartách, držia `aria-pressed` v synchrone a hlásia počet zobrazených ukážok do živého textu.
- 🖼️ **Živé náhľady namiesto obrázkov** - v ráme každej karty beží samotná ukážka v `<iframe>` zmenšenom cez `transform: scale()`; mierku dopočíta `script.js` z reálnej šírky rámu. Náhľad tak nemôže zostarnúť voči ukážke a nepribúda ani jeden obrázkový súbor. Rámy sú `loading="lazy"`, `pointer-events: none` a mimo poradia tabulátora.
- 🎛️ **Interaktívne prvky bez knižníc** - prepínanie jedálneho lístka, konfigurátor pizze, filtrovanie rozvrhu, objednávanie termínov, cenové kalkulačky a nákupný košík sú napísané v čistom JavaScripte.
- 🎨 **Vlastný tmavý dizajn** - hnedo-uhlíkové pozadie s mosadzným akcentom, jemné SVG zrno cez celú plochu a pätkové nadpisy s kurzívou. Žiadna grafika sa nesťahuje, všetko je CSS a inline SVG.
- ✉️ **Kontaktný formulár** - polia meno, kontakt, typ podniku a správa sa po odoslaní poskladajú do predmetu a tela e-mailu a otvoria e-mailový program návštevníka. Žiadny backend, žiadne odosielanie údajov tretej strane.
- ♿ **Prístupnosť podľa WCAG AA** - kontrastné pomery sú overené a zapísané pri tokenoch, stránka má skip-link, jeden `h1`, viditeľné focus stavy a `scroll-padding-top`, aby kotvy nekončili pod sticky hlavičkou.
- 👁️ **Odhalenie sekcií pri scrollovaní** - `IntersectionObserver` pridáva triedu `.in` prvkom `.rv`. Efekt sa aktivuje len ak inline skript v hlavičke nastaví triedu `js` na `<html>`, takže bez JavaScriptu je obsah normálne viditeľný.
- 🐢 **Rešpekt k `prefers-reduced-motion`** - pri zapnutom nastavení sa obsah odhalí naraz a prechody sa vypnú.
- 🔍 **SEO a zdieľanie** - canonical URL, Open Graph aj Twitter Card, `og-image.png` v rozmere 1200 × 630, štruktúrované dáta schema.org `ProfessionalService`, `sitemap.xml`, `robots.txt` a inline SVG favicon.
- 🚧 **Vlastná 404 stránka** - `404.html` v rovnakom dizajne s odkazmi späť na hlavnú stránku a do galérie.
- 🔒 **Zásady ochrany osobných údajov** - samostatná stránka `ochrana-osobnych-udajov.html`.
- 📅 **Automatický rok v pätičke** - `script.js` zapíše aktuálny rok do `#rok`, netreba ho ručne aktualizovať.

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
> Neexistuje watch mód ani hot reload - po úprave `styles.css` alebo `script.js` stačí obnoviť stránku (pri cache prípadne `Ctrl+F5`).

---

## 📁 Štruktúra projektu

```text
Apoliak-MAIN_WEB/
├── index.html                    # hlavná stránka (41 KB)
├── styles.css                    # spoločné štýly pre hlavnú stránku,
│                                 # galériu, 404 aj GDPR stránku (30 KB)
├── script.js                     # spoločný skript (5 KB)
├── ukazky/
│   ├── index.html                # galéria ukážok s filtrovaním (27 KB)
│   ├── restauracia/index.html    # 20 samostatných ukážkových webov,
│   ├── kaviaren/index.html       # každý ako jeden sebestačný súbor
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
├── 404.html                      # vlastná stránka pre neexistujúce adresy
├── ochrana-osobnych-udajov.html  # zásady ochrany osobných údajov
├── og-image.png                  # náhľad pri zdieľaní, 1200 × 630
├── sitemap.xml                   # mapa stránok
├── robots.txt                    # pravidlá pre roboty
├── CNAME                         # vlastná doména pre GitHub Pages
├── .nojekyll                     # vypnutie Jekyll spracovania na Pages
├── LICENSE                       # plný text GNU GPL v3
├── README.md                     # tento súbor
└── README.en.md                  # anglická verzia tohto súboru
```

Priečinok `ukazky/` má spolu asi 1,9 MB. Žiadne buildy, žiadne node_modules, žiadne stiahnuté assety.

---

## ⚙️ Konfigurácia a dizajnové tokeny

Projekt nemá konfiguračný systém - žiadne `.env`, žiadne env premenné. Vizuál hlavnej stránky, galérie, 404 aj GDPR stránky sa mení editovaním CSS custom properties v bloku `:root` na začiatku `styles.css`.

| Token         | Hodnota                                       | Význam                                          |
| ------------- | --------------------------------------------- | ----------------------------------------------- |
| `--bg`        | `#131010`                                     | Základné tmavé pozadie                          |
| `--bg-2`      | `#1a1513`                                     | Striedavý tón sekcií                            |
| `--panel`     | `#201916`                                     | Pozadie kariet a panelov                        |
| `--panel-2`   | `#271e1a`                                     | Zvýraznený panel                                |
| `--line`      | `#3a2d26`                                     | Rámčeky a oddeľovače                            |
| `--line-soft` | `#2b211c`                                     | Jemnejšia linka vo vnútri panelov               |
| `--ink`       | `#f7f0e7` (18,9:1)                            | Primárny text                                   |
| `--ink-2`     | `#d8ccbf` (12,0:1)                            | Sekundárny text                                 |
| `--mut`       | `#b6a99b` (8,2:1)                             | Stlmené popisky                                 |
| `--brass`     | `#e9b45f` (10,1:1)                            | Mosadzný akcent - odkazy, čísla, zvýraznenia    |
| `--brass-lo`  | `#c8913c`                                     | Tmavší odtieň akcentu, plochy tlačidiel         |
| `--brass-hi`  | `#f2c273`                                     | Svetlejší odtieň akcentu, hover stavy           |
| `--on-brass`  | `#1d1409` (6,5:1)                             | Text na mosadznej ploche                        |
| `--sans`      | `system-ui` stack                             | Základné bezpätkové písmo                       |
| `--serif`     | Iowan Old Style / Palatino Linotype / Georgia | Pätkové nadpisy a kurzíva                       |
| `--mono`      | `ui-monospace` stack                          | Čísla, kódy, tabuľkové údaje                    |
| `--pad`       | `clamp(18px,5vw,56px)`                        | Bočný odstup obsahu                             |
| `--maxw`      | `1220px`                                      | Maximálna šírka obsahového kontajnera           |

> [!IMPORTANT]
> Tokeny v `styles.css` platia pre hlavnú stránku, galériu, 404 a GDPR stránku. **Každý ukážkový web má vlastnú farebnosť zapísanú vo svojom vlastnom súbore** - je zámerne samostatný, aby sa dal poslať klientovi alebo nasadiť ako jeden súbor. Zmena tokenov v `styles.css` sa na ukážkach neprejaví.

Obsahové veci sa menia priamo v HTML:

| Čo                                            | Kde                                                |
| --------------------------------------------- | -------------------------------------------------- |
| Ceny balíkov a doplnkov                       | sekcia `#cennik` v `index.html`                     |
| Texty výhod, služieb, postupu a otázok        | sekcie `#vyhody`, `#sluzby`, `#postup`, `#otazky`   |
| E-mail a telefón                              | sekcia `#kontakt` a JSON-LD blok v `<head>`         |
| Cieľová adresa formulára                      | `mailto:` v `script.js`                             |
| `<title>`, meta description, OG a Twitter tagy | `<head>` každej stránky                            |
| Štruktúrované dáta                            | JSON-LD blok v `<head>` hlavnej stránky             |
| Doména pre GitHub Pages                       | súbor `CNAME` (plus `sitemap.xml` a canonical URL)  |

---

## 🧭 Sekcie stránky

| Kotva       | Sekcia          | Obsah                                                              |
| ----------- | --------------- | ------------------------------------------------------------------ |
| -           | Hero            | Nadpis, hlavné CTA a odkaz na ukážky                                |
| -           | Bežiaci pás     | Segmenty podnikov, pre ktoré weby robím                             |
| `#vyhody`   | Výhody          | Deväť dôvodov pracovať so mnou a čo z webu podnik reálne má         |
| `#sluzby`   | Služby          | Rozsah práce - návrh, dizajn, kód, texty, nasadenie                 |
| `#postup`   | Postup          | Kroky spolupráce od prvého kontaktu po spustenie                    |
| `#cennik`   | Cenník          | Balíky Starter, Standard, Pro - čo je a čo nie je v cene            |
| `#ukazky`   | Ukážky          | Teaser s tromi živými náhľadmi a odkazom do galérie                 |
| `#projekty` | Projekty        | Ďalšie veci, ktoré som postavil                                     |
| `#otazky`   | Časté otázky    | Natívne `<details>` otázky, fungujú aj bez JavaScriptu              |
| `#kontakt`  | Kontakt         | Konzultácia zadarmo, formulár dopytu, e-mail a telefón              |
| -           | Pätička         | Odkazy, ochrana osobných údajov, automatický rok                    |

Navigácia po hlavnej stránke je same-page cez hash odkazy; galéria, ukážky, 404 a GDPR stránka sú samostatné adresy.

### Cenník na webe

| Balík        | Cena       |
| ------------ | ---------- |
| **Starter**  | od 250 €   |
| **Standard** | od 490 €   |
| **Pro**      | od 890 €   |

| Doplnok                  | Cena              |
| ------------------------ | ----------------- |
| Údržba                   | od 5 € / mesiac   |
| Extra podstránka         | od 15 €           |
| Texty                    | od 12 € / stránka |
| Rýchla oprava do 48 h    | od 25 €           |

---

## 🏪 Ukážkové weby

Dvadsať kompletných webov vymyslených podnikov - **nejde o reálnych klientov ani referencie**. Každá ukážka je jeden sebestačný HTML súbor s vlastnou farebnosťou a rozložením, so sticky pásikom s odkazom späť na `apoliak.online` a s funkčným interaktívnym prvkom.

| Priečinok      | Podnik                            | Kategória          | Interaktívny prvok                            |
| -------------- | --------------------------------- | ------------------ | --------------------------------------------- |
| `restauracia`  | Reštaurácia Dubová                | Gastro a ubytovanie | Prepínanie jedálneho lístka, rezervácia stola |
| `kaviaren`     | Lipová (kaviareň a pizzeria)      | Gastro a ubytovanie | Konfigurátor pizze s prepočtom ceny           |
| `cukraren`     | Pekáreň a cukráreň Kôrka          | Gastro a ubytovanie | Konfigurátor torty s cenou a termínom         |
| `penzion`      | Penzión Hrebeň                    | Gastro a ubytovanie | Rezervácia s prepočtom nocí a ceny            |
| `fitko`        | Fitness centrum Halová            | Služby             | Filtrovanie rozvrhu tréningov                 |
| `salon`        | Salón Brezová                     | Služby             | Rezervácia termínu so súhrnnou cenou          |
| `barber`       | Holičstvo Ostrie                  | Služby             | Objednanie podľa služby a dĺžky               |
| `wellness`     | Wellness Salvia                   | Služby             | Rezervácia procedúry so súhrnom               |
| `fotoatelier`  | Fotoateliér Škála                 | Služby             | Výber balíčka a počtu fotografií              |
| `autoskola`    | Autoškola Rondel                  | Služby             | Prihláška s prepočtom ceny kurzu              |
| `remeselnik`   | Stolárstvo Rovina                 | Remeslo            | Kalkulačka ceny zákazky                       |
| `autoservis`   | Autoservis 12                     | Remeslo            | Objednanie termínu s cenou úkonu              |
| `stavebna`     | Stavebná firma KVADER             | Remeslo            | Kalkulačka ceny podľa plochy                  |
| `ambulancia`   | Zubná ambulancia Vrbová           | Zdravie            | Objednanie ošetrenia                          |
| `veterina`     | Veterinárna klinika Alveron       | Zdravie            | Objednanie podľa druhu zvieraťa               |
| `optika`       | Optika Meridián                   | Zdravie            | Objednanie na meranie zraku                   |
| `kvetinarstvo` | Kvetinárstvo Steblo               | Obchod a firmy     | Plne funkčný nákupný košík                    |
| `reality`      | Kamenec reality                   | Obchod a firmy     | Filter ponuky a hypotekárna kalkulačka        |
| `uctovnictvo`  | SALDIA (účtovníctvo a mzdy)       | Obchod a firmy     | Kalkulačka mesačného paušálu                  |
| `advokat`      | Advokátska kancelária Meritum     | Obchod a firmy     | Dopyt s odhadom odmeny                        |

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

- **Formulár nemá backend** - odoslanie poskladá `mailto:` odkaz a otvorí e-mailový program návštevníka. Ak návštevník nemá nastavený e-mailový klient, musí napísať priamo na uvedenú adresu. Nič sa neukladá a neexistuje nič, čo by správy prijímalo na serveri.
- **Kontaktné údaje sú v markupe v čistom texte**, kde ich scrapery bez problémov prečítajú. Neexistuje ochrana proti spamu.
- **Ukážkové weby sú návrhy vymyslených podnikov** - názvy, adresy, otváracie hodiny aj ceny sú ilustračné. Nezbierajú žiadne údaje, ich formuláre, rezervácie ani košíky nikam nič neodosielajú a po obnovení stránky sa stav stráca.
- **Ukážky nemajú ani jednu fotografiu** - všetko nesie typografia, farba a geometria. Pri reálnej zákazke fotografie dodáva klient a nahrádzajú tieto plochy.
- **Obsah je duplikovaný v HTML** - ceny, kontakt aj texty sú zapísané natvrdo na viacerých miestach (markup, meta tagy, JSON-LD). Zmena znamená prejsť všetky výskyty ručne.
- **Každá ukážka má vlastnú kópiu štýlov aj skriptov** vo svojom súbore. Je to zámer, aby bola prenositeľná, ale znamená to, že spoločná zmena sa musí urobiť dvadsaťkrát.
- **Žiadne automatické kontroly** - v repe nie sú testy, lintery, formatter config ani GitHub Actions workflow. Kvalita stojí na manuálnej kontrole.
- **Bez pripojenia nie sú fallbacky tretích strán**, ale ani nie sú potrebné - stránka nepoužíva žiadne externé zdroje.

**Požiadavky na runtime:** ľubovoľný evergreen prehliadač s podporou CSS custom properties, `clamp()` a `IntersectionObserver`. Bez JavaScriptu ostáva obsah plne čitateľný, len bez odhaľovacích animácií, filtrovania galérie a interaktívnych prvkov v ukážkach.

**Overené rozlíšenia:** 375, 768 a 1280 px bez vodorovného rolovania.

---

## 📜 Licencia

Repozitár obsahuje súbor `LICENSE` s úplným a nezmeneným textom **GNU General Public License v3**.

GPL-3.0 je silné copyleft licencovanie určené pre softvér. Aplikované na tento web to znamená, že markup, štýly aj skripty smie ktokoľvek kopírovať, upravovať a ďalej šíriť - za podmienky, že odvodené dielo bude tiež pod GPL-3.0 a so sprístupneným zdrojovým kódom.

---

<div align="center">

Vytvoril **Alex Poliak**, Bratislava - [GitHub](https://github.com/Apoliak7777) - [info@apoliak.online](mailto:info@apoliak.online) - 0902 464 022

</div>
