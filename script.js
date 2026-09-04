/* ============================================================
   apoliak.online — spoločný skript
   Stránka je plne čitateľná aj bez tohto súboru.
   ============================================================ */
(function () {
  "use strict";

  var redukovanyPohyb = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 01 · rok v pätičke ---------- */
  var rok = document.getElementById("rok");
  if (rok) { rok.textContent = String(new Date().getFullYear()); }

  /* ---------- 02 · odhalenie sekcií pri scrollovaní ---------- */
  var prvky = document.querySelectorAll(".rv");
  if (prvky.length) {
    if (!("IntersectionObserver" in window) || redukovanyPohyb) {
      for (var i = 0; i < prvky.length; i++) { prvky[i].classList.add("in"); }
    } else {
      var io = new IntersectionObserver(function (zaznamy) {
        zaznamy.forEach(function (z) {
          if (z.isIntersecting) { z.target.classList.add("in"); io.unobserve(z.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
      Array.prototype.forEach.call(prvky, function (el) { io.observe(el); });

      /* poistka: keby observer z akéhokoľvek dôvodu nezabral, obsah odkryjeme */
      setTimeout(function () {
        Array.prototype.forEach.call(document.querySelectorAll(".rv:not(.in)"), function (el) {
          if (el.getBoundingClientRect().top < window.innerHeight) { el.classList.add("in"); }
        });
      }, 1400);
    }
  }

  /* ---------- 03 · filtrovanie ukážok v galérii ---------- */
  var filtre = document.querySelector(".filtre");
  if (filtre) {
    var tlacidla = filtre.querySelectorAll(".filt");
    var karty = document.querySelectorAll(".uk-grid .uk");
    var info = document.getElementById("filt-info");
    var celkom = karty.length;

    var filtruj = function (kluc) {
      var viditelnych = 0;
      Array.prototype.forEach.call(karty, function (karta) {
        var kat = " " + (karta.getAttribute("data-kat") || "") + " ";
        var zobrazit = kluc === "vsetky" || kat.indexOf(" " + kluc + " ") !== -1;
        if (zobrazit) { karta.removeAttribute("hidden"); viditelnych++; }
        else { karta.setAttribute("hidden", "hidden"); }
      });
      Array.prototype.forEach.call(tlacidla, function (t) {
        t.setAttribute("aria-pressed", t.getAttribute("data-f") === kluc ? "true" : "false");
      });
      if (info) {
        info.textContent = viditelnych === celkom
          ? "Zobrazených všetkých " + celkom + " ukážok"
          : "Zobrazené ukážky: " + viditelnych + " z " + celkom;
      }
    };

    Array.prototype.forEach.call(tlacidla, function (t) {
      t.addEventListener("click", function () { filtruj(t.getAttribute("data-f")); });
    });
    /* Odkaz z hlavnej stránky (ukazky/#remeslo) predvolí filter. Hash nezodpovedá
       žiadnemu id, takže stránka nikam neposkočí. */
    var zHash = (window.location.hash || "").replace("#", "");
    var znamy = false;
    Array.prototype.forEach.call(tlacidla, function (t) {
      if (t.getAttribute("data-f") === zHash) { znamy = true; }
    });
    filtruj(znamy ? zHash : "vsetky");
  }

  /* ---------- 04 · lišta s výzvou na mobile ----------
     Ukáže sa až za hero a schová sa nad kontaktom, aby neprekrývala formulár.

     Stav sa počíta vždy z aktuálnej geometrie, spúšťače sú dva: pozorovateľ
     aj scrollovanie. Vo vloženom zobrazení (webview, náhľadový panel) sa
     stalo, že nezabral ani jeden z nich — dva nezávislé spúšťače nad jedným
     výpočtom to prežijú. */
  var lista = document.getElementById("bar-cta");
  if (lista) {
    var hero = document.querySelector(".hero");
    var kontakt = document.getElementById("kontakt");

    var prepniListu = function () {
      var zaHero = hero
        ? hero.getBoundingClientRect().bottom <= 8
        : window.scrollY > 520;
      var vKontakte = kontakt
        ? kontakt.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;
      lista.classList.toggle("vidno", zaHero && !vKontakte);
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

  /* ---------- 05 · živá ukážka v hero: prepnutie odvetvia ----------
     Chipy sú obyčajné odkazy — bez JS ukážku otvoria, s JS ju vymenia
     v jedinom ráme. V hero beží vždy len jeden iframe, nikdy nepribudne druhý. */
  var show = document.getElementById("hero-show");
  if (show) {
    var hsIfr = document.getElementById("hs-iframe");
    var hsOpen = document.getElementById("hs-open");
    var hsUrl = document.getElementById("hs-url");
    var hsNazov = document.getElementById("hs-nazov");
    var hsInt = document.getElementById("hs-int");
    var cipy = show.querySelectorAll(".hs-chip");
    var hsCasovac = null;
    var hotovo = function () { show.classList.remove("nacitava"); };
    if (hsIfr) { hsIfr.addEventListener("load", hotovo); }

    var ukazCip = function (cip) {
      var cesta = cip.getAttribute("href");
      var nazov = cip.getAttribute("data-nazov") || "";
      if (hsIfr && hsIfr.getAttribute("src") !== cesta) {
        show.classList.add("nacitava");
        hsIfr.setAttribute("title", "Živý náhľad ukážky " + nazov);
        hsIfr.setAttribute("src", cesta);
        clearTimeout(hsCasovac);
        hsCasovac = setTimeout(hotovo, 2500);         /* poistka, keby load nedobehol */
      }
      if (hsOpen) {
        hsOpen.setAttribute("href", cesta);
        hsOpen.setAttribute("aria-label", "Otvoriť ukážku " + nazov + " v plnej veľkosti");
      }
      if (hsUrl) { hsUrl.textContent = cip.getAttribute("data-url") || ""; }
      if (hsNazov) { hsNazov.textContent = nazov; }
      if (hsInt) { hsInt.textContent = cip.getAttribute("data-int") || ""; }
      for (var c = 0; c < cipy.length; c++) {
        if (cipy[c] === cip) { cipy[c].setAttribute("aria-current", "true"); }
        else { cipy[c].removeAttribute("aria-current"); }
      }
    };

    Array.prototype.forEach.call(cipy, function (cip) {
      cip.addEventListener("click", function (e) {
        if (!hsIfr) { return; }                       /* bez rámu ostáva chip odkazom */
        e.preventDefault();
        ukazCip(cip);
      });
    });

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
      ukazCip(nahodny);
    } else if (hsIfr && !hsIfr.getAttribute("src")) {
      hsIfr.setAttribute("src", hsIfr.getAttribute("data-src") || "ukazky/salon/");
    }
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
