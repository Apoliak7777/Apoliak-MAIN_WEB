/* ============================================================
   apoliak.online — spoločný skript
   Stránka je plne čitateľná aj bez tohto súboru.
   ============================================================ */
(function () {
  "use strict";

  var koren = document.documentElement;
  var redukovanyPohyb = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* myš alebo touchpad — náklon rámu a svetlo pod kurzorom nemajú na dotykovej obrazovke zmysel */
  var jemnyKurzor = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var kazdy = function (zoznam, fn) { Array.prototype.forEach.call(zoznam, fn); };

  /* ---------- 00 · nadpis v hero po slovách ----------
     Slová sa zabalia hneď na začiatku, CSS ich nechá nabehnúť jedno po druhom.
     Kým skript nebeží, nadpis drží skrytý CSS a poistka ho po chvíli ukáže aj bez neho.
     Čítačka dostane celý nadpis v aria-label, nie kúsky po slovách. */
  var h1 = document.querySelector(".hero--show h1");
  if (h1 && !h1.classList.contains("rozdelene")) {
    var poradie = 0;
    var rozdel = function (uzol) {
      kazdy(Array.prototype.slice.call(uzol.childNodes), function (n) {
        if (n.nodeType === 1 && n.tagName !== "BR") { rozdel(n); return; }
        if (n.nodeType !== 3 || !n.data.trim()) { return; }
        var frag = document.createDocumentFragment();
        /* delí sa len na obyčajnej medzere — slová spojené pevnou medzerou ostávajú spolu */
        kazdy(n.data.split(/([ \t\r\n]+)/), function (kus) {
          if (!kus) { return; }
          if (/^[ \t\r\n]+$/.test(kus)) { frag.appendChild(document.createTextNode(kus)); return; }
          var s = document.createElement("span");
          s.className = "sl";
          s.style.setProperty("--i", poradie++);
          s.textContent = kus;
          frag.appendChild(s);
        });
        uzol.replaceChild(frag, n);
      });
    };
    h1.setAttribute("aria-label", h1.textContent.replace(/\s+/g, " ").trim());
    rozdel(h1);
    h1.classList.add("rozdelene");
  }
  /* od tejto chvíle za odhaľovanie ručí skript, poistky v CSS sa vypnú */
  koren.classList.add("skript");

  /* ---------- 01 · rok v pätičke ---------- */
  var rok = document.getElementById("rok");
  if (rok) { rok.textContent = String(new Date().getFullYear()); }

  /* ---------- 02 · poradie položiek pre postupné nabiehanie ----------
     CSS číta --i (a v zoznamoch balíčkov --j) a podľa neho oneskorí každú položku. */
  var indexuj = function (vyber, premenna) {
    kazdy(document.querySelectorAll(vyber), function (rodic) {
      kazdy(rodic.children, function (dieta, i) { dieta.style.setProperty(premenna || "--i", i); });
    });
  };
  indexuj(".fakty"); indexuj(".pas-list"); indexuj(".dv-list"); indexuj(".baliky");
  indexuj(".balik-list", "--j"); indexuj(".extras"); indexuj(".flow"); indexuj(".faq");
  indexuj(".kb-zoznam"); indexuj(".kb-konz-list");

  /* ---------- 03 · počítadlá (od 250 €, do 3 dní, ceny balíčkov) ----------
     Číslo sa nájde v texte, nech je v akomkoľvek jazyku („od 250 €", „€1,190", „ab 1.190 €"),
     a nabehne od nuly. Oddeľovač tisícov sa berie z pôvodného zápisu. Šírka prvku sa počas
     počítania drží, aby sa okolie neposúvalo. */
  var CISLO = /\d{1,3}(?:[   .,]\d{3})+|\d+/;
  var pocitaj = function (el) {
    if (el.getAttribute("data-spocitane")) { return; }
    el.setAttribute("data-spocitane", "1");
    var chodec = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    var uzol = null;
    while (chodec.nextNode()) { if (CISLO.test(chodec.currentNode.data)) { uzol = chodec.currentNode; break; } }
    if (!uzol) { return; }
    var m = uzol.data.match(CISLO);
    var ciel = parseInt(m[0].replace(/\D/g, ""), 10);
    if (!(ciel > 1)) { return; }
    var odd = (m[0].match(/[   .,]/) || [""])[0];
    var pred = uzol.data.slice(0, m.index);
    var po = uzol.data.slice(m.index + m[0].length);
    var zapis = function (x) {
      var s = String(x);
      return odd && x >= 1000 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, odd) : s;
    };
    var bolInline = getComputedStyle(el).display === "inline";
    if (bolInline) { el.style.display = "inline-block"; }
    el.style.minWidth = el.getBoundingClientRect().width + "px";
    var dlzka = 1400, zaciatok = null;
    var krok = function (t) {
      if (zaciatok === null) { zaciatok = t; }
      var p = Math.min(1, (t - zaciatok) / dlzka);
      var e = 1 - Math.pow(1 - p, 4);
      uzol.data = pred + zapis(Math.round(ciel * e)) + po;
      if (p < 1) { window.requestAnimationFrame(krok); }
      else { el.style.minWidth = ""; if (bolInline) { el.style.display = ""; } }
    };
    uzol.data = pred + zapis(0) + po;
    window.requestAnimationFrame(krok);
  };

  /* ---------- 04 · odhalenie sekcií pri scrollovaní ----------
     Pri obmedzenom pohybe sa sekcie tiež odhaľujú, ale CSS ich len prelína, bez posunu. */
  var odkry = function (el) {
    if (el.classList.contains("in")) { return; }
    el.classList.add("in");
    kazdy(el.querySelectorAll(".fakty .v, .balik-cena, .eshop-txt p b"), pocitaj);
  };
  var prvky = document.querySelectorAll(".rv, .pas");
  if (prvky.length) {
    if (!("IntersectionObserver" in window)) {
      kazdy(prvky, odkry);
    } else {
      var io = new IntersectionObserver(function (zaznamy) {
        zaznamy.forEach(function (z) {
          if (z.isIntersecting) { odkry(z.target); io.unobserve(z.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
      kazdy(prvky, function (el) { io.observe(el); });

      /* poistka: keby observer nezabral (vložené zobrazenia), odkryje sa to, čo je na obrazovke */
      var dobehni = function () {
        kazdy(document.querySelectorAll(".rv:not(.in), .pas:not(.in)"), function (el) {
          if (el.getBoundingClientRect().top < window.innerHeight * 0.94) { odkry(el); }
        });
      };
      var cakaDobeh = false;
      setTimeout(dobehni, 1400);
      window.addEventListener("scroll", function () {
        if (cakaDobeh) { return; }
        cakaDobeh = true;
        setTimeout(function () { cakaDobeh = false; dobehni(); }, 180);
      }, { passive: true });
    }
  }

  /* ---------- 05 · hlavička: lišta čítania, tieň a aktívna sekcia ---------- */
  var hlavicka = document.querySelector(".top");
  if (hlavicka) {
    var lista = document.createElement("span");
    lista.className = "top-prog";
    lista.setAttribute("aria-hidden", "true");
    hlavicka.appendChild(lista);
    var odkazy = [], ciele = [];
    kazdy(hlavicka.querySelectorAll("nav a[href^='#']"), function (a) {
      var ciel = document.getElementById(a.getAttribute("href").slice(1));
      if (ciel) { odkazy.push(a); ciele.push(ciel); }
    });
    var cakaHlavicka = false;
    var obnovHlavicku = function () {
      cakaHlavicka = false;
      var y = window.pageYOffset || koren.scrollTop;
      var max = koren.scrollHeight - window.innerHeight;
      lista.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max).toFixed(4) : 0) + ")";
      hlavicka.classList.toggle("skrol", y > 8);
      var akt = -1, hranica = window.innerHeight * 0.36;
      for (var i = 0; i < ciele.length; i++) { if (ciele[i].getBoundingClientRect().top <= hranica) { akt = i; } }
      if (max > 0 && y >= max - 4 && ciele.length) { akt = ciele.length - 1; }
      for (var j = 0; j < odkazy.length; j++) { odkazy[j].classList.toggle("akt", j === akt); }
    };
    window.addEventListener("scroll", function () {
      if (!cakaHlavicka) { cakaHlavicka = true; window.requestAnimationFrame(obnovHlavicku); }
    }, { passive: true });
    window.addEventListener("resize", obnovHlavicku);
    obnovHlavicku();
  }

  /* ---------- 06 · filtrovanie ukážok v galérii ---------- */
  var filtre = document.querySelector(".filtre");
  if (filtre) {
    var tlacidla = filtre.querySelectorAll(".filt");
    var karty = document.querySelectorAll(".uk-grid .uk");
    var info = document.getElementById("filt-info");
    var celkom = karty.length;

    var filtruj = function (kluc) {
      var viditelnych = 0;
      kazdy(karty, function (karta) {
        var kat = " " + (karta.getAttribute("data-kat") || "") + " ";
        var zobrazit = kluc === "vsetky" || kat.indexOf(" " + kluc + " ") !== -1;
        if (zobrazit) { karta.removeAttribute("hidden"); viditelnych++; }
        else { karta.setAttribute("hidden", "hidden"); }
      });
      kazdy(tlacidla, function (t) {
        t.setAttribute("aria-pressed", t.getAttribute("data-f") === kluc ? "true" : "false");
      });
      if (info) {
        /* galéria hovorí o ukážkach, stránka zákaziek o projektoch — text si nesie .filtre v data-* */
        var text = viditelnych === celkom
          ? (filtre.getAttribute("data-info-vsetky") || "Zobrazených všetkých {n} ukážok")
          : (filtre.getAttribute("data-info-cast") || "Zobrazené ukážky: {v} z {n}");
        info.textContent = text.replace("{n}", celkom).replace("{v}", viditelnych);
      }
    };

    kazdy(tlacidla, function (t) {
      t.addEventListener("click", function () { filtruj(t.getAttribute("data-f")); });
    });
    /* Odkaz z hlavnej stránky (ukazky/#remeslo) predvolí filter. Hash nezodpovedá
       žiadnemu id, takže stránka nikam neposkočí. */
    var zHash = (window.location.hash || "").replace("#", "");
    var znamy = false;
    kazdy(tlacidla, function (t) {
      if (t.getAttribute("data-f") === zHash) { znamy = true; }
    });
    filtruj(znamy ? zHash : "vsetky");
  }

  /* ---------- 07 · lišta s výzvou na mobile ----------
     Ukáže sa až za hero a schová sa nad kontaktom, aby neprekrývala formulár.

     Stav sa počíta vždy z aktuálnej geometrie, spúšťače sú dva: pozorovateľ
     aj scrollovanie. Vo vloženom zobrazení (webview, náhľadový panel) sa
     stalo, že nezabral ani jeden z nich — dva nezávislé spúšťače nad jedným
     výpočtom to prežijú. */
  var barCta = document.getElementById("bar-cta");
  if (barCta) {
    var hero = document.querySelector(".hero");
    var kontakt = document.getElementById("kontakt");

    var prepniListu = function () {
      var zaHero = hero
        ? hero.getBoundingClientRect().bottom <= 8
        : window.scrollY > 520;
      var vKontakte = kontakt
        ? kontakt.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;
      barCta.classList.toggle("vidno", zaHero && !vKontakte);
    };

    prepniListu();
    window.addEventListener("scroll", prepniListu, { passive: true });
    window.addEventListener("resize", prepniListu);
    window.addEventListener("orientationchange", prepniListu);

    if ("IntersectionObserver" in window) {
      var strazca = new IntersectionObserver(prepniListu, { threshold: [0, 1] });
      if (hero) { strazca.observe(hero); }
      if (kontakt) { strazca.observe(kontakt); }
    }
  }

  /* ---------- 08 · živá ukážka v hero ----------
     Chipy sú obyčajné odkazy — bez JS ukážku otvoria, s JS ju vymenia
     v jedinom ráme. V hero beží vždy len jeden iframe, nikdy nepribudne druhý.

     Navyše: pod aktívnym chipom sa presúva zlatá pilulka, adresa v lište rámu
     sa vypíše po písmenách a odvetvia sa samy striedajú. Časovač striedania je
     CSS animácia pásika v pilulke — keď dobehne, príde ďalšie odvetvie. Stojí,
     kým je nad ukážkou myš alebo fokus, kým sa ukážka načítava, keď rám nie je
     vidieť a keď je karta na pozadí. Po prvom kliknutí na chip sa striedanie
     vypne úplne a pri obmedzenom pohybe sa nezapne vôbec. */
  var show = document.getElementById("hero-show");
  if (show) {
    var hsIfr = document.getElementById("hs-iframe");
    var hsOpen = document.getElementById("hs-open");
    var hsUrl = document.getElementById("hs-url");
    var hsNazov = document.getElementById("hs-nazov");
    var hsInt = document.getElementById("hs-int");
    var hsCapTxt = show.querySelector(".hs-cap-txt");
    var hsChips = show.querySelector(".hs-chips");
    var cipy = show.querySelectorAll(".hs-chip");
    var hsCasovac = null;
    /* texty pre čítačky nesie #hero-show v data-*, aby ich mala každá jazyková verzia po svojom */
    var tNahlad = show.getAttribute("data-t-nahlad") || "Živý náhľad ukážky {n}";
    var tOtvorit = show.getAttribute("data-t-otvorit") || "Otvoriť ukážku {n} v plnej veľkosti";

    /* pilulka pod aktívnym chipom, v nej pásik, ktorý meria čas do ďalšieho odvetvia */
    var pilulka = null;
    if (hsChips) {
      pilulka = document.createElement("span");
      pilulka.className = "hs-ind bez";
      pilulka.setAttribute("aria-hidden", "true");
      pilulka.appendChild(document.createElement("i"));
      hsChips.insertBefore(pilulka, hsChips.firstChild);
      hsChips.classList.add("s-ind");
    }
    var posunPilulku = function (hned) {
      if (!pilulka) { return; }
      var akt = hsChips.querySelector('.hs-chip[aria-current="true"]');
      if (!akt) { return; }
      if (hned) { pilulka.classList.add("bez"); }
      pilulka.style.width = akt.offsetWidth + "px";
      pilulka.style.height = akt.offsetHeight + "px";
      pilulka.style.transform = "translate(" + akt.offsetLeft + "px," + akt.offsetTop + "px)";
      if (hned) { void pilulka.offsetWidth; pilulka.classList.remove("bez"); }
    };

    /* adresa v lište rámu sa vypisuje po písmenách, za ňou bliká kurzor */
    var urlText = null, pisCasovac = null;
    if (hsUrl) {
      urlText = document.createTextNode(hsUrl.textContent);
      hsUrl.textContent = "";
      hsUrl.appendChild(urlText);
      if (!redukovanyPohyb) {
        var kurzor = document.createElement("i");
        kurzor.className = "hs-kurzor";
        kurzor.setAttribute("aria-hidden", "true");
        hsUrl.appendChild(kurzor);
      }
    }
    var pisUrl = function (text, oneskorenie) {
      if (!urlText) { return; }
      clearTimeout(pisCasovac);
      if (redukovanyPohyb) { urlText.data = text; return; }
      var i = 0;
      urlText.data = "";
      var pismeno = function () {
        urlText.data = text.slice(0, ++i);
        if (i < text.length) { pisCasovac = setTimeout(pismeno, 34 + Math.random() * 38); }
      };
      pisCasovac = setTimeout(pismeno, oneskorenie || 140);
    };

    var rotacia = !redukovanyPohyb && !!pilulka && cipy.length > 1 && !!hsIfr;
    var zastavene = false;
    var spustiCas = function () {
      if (!rotacia || zastavene) { return; }
      pilulka.classList.remove("bezi");
      void pilulka.offsetWidth;
      pilulka.classList.add("bezi");
    };
    var hotovo = function () {
      if (!show.classList.contains("nacitava")) { return; }
      show.classList.remove("nacitava");
      spustiCas();
    };
    if (hsIfr) { hsIfr.addEventListener("load", hotovo); }

    var ukazCip = function (cip, prvy) {
      var cesta = cip.getAttribute("href");
      var nazov = cip.getAttribute("data-nazov") || "";
      if (hsIfr && hsIfr.getAttribute("src") !== cesta) {
        show.classList.add("nacitava");
        hsIfr.setAttribute("title", tNahlad.replace("{n}", nazov));
        hsIfr.setAttribute("src", cesta);
        clearTimeout(hsCasovac);
        hsCasovac = setTimeout(hotovo, 2500);         /* poistka, keby load nedobehol */
      }
      if (hsOpen) {
        hsOpen.setAttribute("href", cesta);
        hsOpen.setAttribute("aria-label", tOtvorit.replace("{n}", nazov));
      }
      pisUrl(cip.getAttribute("data-url") || "", prvy ? 900 : 0);
      if (hsNazov) { hsNazov.textContent = nazov; }
      if (hsInt) { hsInt.textContent = cip.getAttribute("data-int") || ""; }
      if (hsCapTxt && !prvy) {
        hsCapTxt.classList.remove("prelin");
        void hsCapTxt.offsetWidth;
        hsCapTxt.classList.add("prelin");
      }
      for (var c = 0; c < cipy.length; c++) {
        if (cipy[c] === cip) { cipy[c].setAttribute("aria-current", "true"); }
        else { cipy[c].removeAttribute("aria-current"); }
      }
      posunPilulku(prvy);
    };

    kazdy(cipy, function (cip) {
      cip.addEventListener("click", function (e) {
        if (!hsIfr) { return; }                       /* bez rámu ostáva chip odkazom */
        e.preventDefault();
        zastavene = true;
        if (pilulka) { pilulka.classList.remove("bezi"); }
        ukazCip(cip);
      });
    });

    if (rotacia) {
      pilulka.firstChild.addEventListener("animationend", function () {
        if (zastavene) { return; }
        var akt = 0;
        for (var c = 0; c < cipy.length; c++) { if (cipy[c].getAttribute("aria-current") === "true") { akt = c; } }
        ukazCip(cipy[(akt + 1) % cipy.length]);
      });
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (z) {
          show.classList.toggle("pauza", !z[0].isIntersecting);
        }, { threshold: 0.3 }).observe(show);
      }
      document.addEventListener("visibilitychange", function () {
        show.classList.toggle("skryte", document.hidden);
      });
    }

    /* Pri každom načítaní stránky sa v ráme ukáže iná ukážka než naposledy,
       aby návštevník (aj Alex pri F5) videl, že ich je viac. Iframe nemá v HTML
       src — nastaví sa až tu, nech sa predvolená ukážka nesťahuje zbytočne dvakrát.
       Bez JavaScriptu ho nahrádza rám v <noscript>. Posledná voľba sa pamätá
       v sessionStorage (len pre túto kartu, nie je to cookie a nikam sa neposiela). */
    if (hsIfr && cipy.length) {
      var KLUC = "hs-ukazka";
      var posledna = null;
      try { posledna = window.sessionStorage.getItem(KLUC); } catch (err) { posledna = null; }
      var kandidati = [];
      for (var k = 0; k < cipy.length; k++) {
        if (cipy[k].getAttribute("href") !== posledna) { kandidati.push(cipy[k]); }
      }
      if (!kandidati.length) { kandidati = Array.prototype.slice.call(cipy); }
      var nahodny = kandidati[Math.floor(Math.random() * kandidati.length)];
      try { window.sessionStorage.setItem(KLUC, nahodny.getAttribute("href")); } catch (err) { /* súkromný režim */ }
      ukazCip(nahodny, true);
    } else if (hsIfr && !hsIfr.getAttribute("src")) {
      hsIfr.setAttribute("src", hsIfr.getAttribute("data-src") || "ukazky/salon/");
    }
    window.addEventListener("resize", function () { posunPilulku(true); });
    window.addEventListener("load", function () { posunPilulku(true); });

    /* náklon rámu za myšou a odlesk na skle — len s myšou a bez obmedzeného pohybu */
    var javisko = show.querySelector(".hs-stage");
    var ram = javisko && javisko.querySelector(".hs-frame");
    if (ram && jemnyKurzor && !redukovanyPohyb) {
      var poslednyPohyb = null, cakaNaklon = false;
      var naklon = function () {
        cakaNaklon = false;
        if (!poslednyPohyb) { return; }
        var r = javisko.getBoundingClientRect();
        var x = Math.min(1, Math.max(0, (poslednyPohyb.clientX - r.left) / r.width));
        var y = Math.min(1, Math.max(0, (poslednyPohyb.clientY - r.top) / r.height));
        ram.style.setProperty("--ry", ((x - 0.5) * 7).toFixed(2) + "deg");
        ram.style.setProperty("--rx", ((0.5 - y) * 5).toFixed(2) + "deg");
        ram.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
        ram.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
      };
      javisko.addEventListener("pointerenter", function () { javisko.classList.add("tilt"); });
      javisko.addEventListener("pointermove", function (e) {
        poslednyPohyb = e;
        if (!cakaNaklon) { cakaNaklon = true; window.requestAnimationFrame(naklon); }
      });
      javisko.addEventListener("pointerleave", function () {
        poslednyPohyb = null;
        javisko.classList.remove("tilt");
        ram.style.setProperty("--rx", "0deg");
        ram.style.setProperty("--ry", "0deg");
      });
    }
  }

  /* ---------- 09 · svetlo pod kurzorom na kartách ----------
     Jemná zlatá žiara ide za myšou po balíčkoch, krokoch postupu a kontakte. */
  if (jemnyKurzor) {
    kazdy(document.querySelectorAll(".balik, .eshop, .flow > div, .kontakt-blok"), function (el) {
      el.classList.add("svetlo");
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", Math.round(e.clientX - r.left) + "px");
        el.style.setProperty("--my", Math.round(e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- 10 · prepínač jazykov (glóbus v hlavičke) ----------
     Je to <details>, takže sa otvára aj bez JavaScriptu. Skript ho len zatvorí
     klikom mimo alebo Escape a pri prepnutí zachová kotvu (#cennik ostane #cennik). */
  var jazyky = document.querySelectorAll("details.jazyk");
  if (jazyky.length) {
    document.addEventListener("click", function (e) {
      kazdy(jazyky, function (d) {
        if (d.open && !d.contains(e.target)) { d.removeAttribute("open"); }
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") { return; }
      kazdy(jazyky, function (d) {
        if (d.open) {
          d.removeAttribute("open");
          var s = d.querySelector("summary");
          if (s) { s.focus(); }
        }
      });
    });
    kazdy(document.querySelectorAll(".jazyk-menu a"), function (a) {
      a.addEventListener("click", function () {
        var zaklad = a.getAttribute("data-zaklad") || a.getAttribute("href");
        a.setAttribute("data-zaklad", zaklad);
        a.setAttribute("href", zaklad + (window.location.hash || ""));
      });
    });
  }

  /* Náhľady v galérii: v ráme beží zmenšená skutočná stránka.
     Mierku počítame z reálnej šírky rámu, aby sedela pri každej šírke okna. */
  var nahlady = document.querySelectorAll(".shot--live");
  if (nahlady.length) {
    var ZAKLAD = 1400;
    /* Základ mierky sa číta z nezmenšenej šírky iframu (offsetWidth ignoruje
       transform) — hero rám má pod 960 px iframe široký 1000 px, galéria 1400. */
    var prepocitaj = function () {
      for (var i = 0; i < nahlady.length; i++) {
        var sirka = nahlady[i].clientWidth;
        if (!sirka) { continue; }
        var ifr = nahlady[i].querySelector("iframe");
        var zaklad = (ifr && ifr.offsetWidth) || ZAKLAD;
        nahlady[i].style.setProperty("--shot-s", String(sirka / zaklad));
      }
    };
    prepocitaj();
    /* Prepočítavame pri zmene šírky okna aj cez ResizeObserver — samotný
       observer pri zmene šírky okna spoľahlivo nezaberie v každom prehliadači. */
    window.addEventListener("resize", prepocitaj);
    window.addEventListener("orientationchange", prepocitaj);
    window.addEventListener("load", prepocitaj);
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(prepocitaj);
      for (var n = 0; n < nahlady.length; n++) { ro.observe(nahlady[n]); }
    }
  }
})();
