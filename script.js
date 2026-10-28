/* ============================================================
   apoliak.online — spoločný skript galérie, zákaziek, 404, ochrany údajov
   a jazykových verzií. Stránka je plne čitateľná aj bez tohto súboru.
   Nič neanimuje: filtruje ukážky, prepína ukážku v ráme, zatvára jazykové
   menu a dopočítava mierku živých náhľadov.
   ============================================================ */
(function () {
  "use strict";

  var kazdy = function (zoznam, fn) { Array.prototype.forEach.call(zoznam, fn); };

  /* ---------- 01 · rok v pätičke ---------- */
  var rok = document.getElementById("rok");
  if (rok) { rok.textContent = String(new Date().getFullYear()); }

  /* ---------- 02 · filtrovanie ukážok v galérii ---------- */
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

  /* ---------- 03 · ukážka v ráme (hlavná stránka jazykových verzií) ----------
     Odvetvia sú obyčajné odkazy — bez JS ukážku otvoria, s JS ju vymenia v jedinom ráme.
     Pri každom načítaní sa v ráme ukáže iná ukážka než naposledy; posledná voľba sa pamätá
     v sessionStorage (len pre túto kartu, nie je to cookie a nikam sa neposiela). */
  var show = document.getElementById("hero-show");
  if (show) {
    var hsIfr = document.getElementById("hs-iframe");
    var hsOpen = document.getElementById("hs-open");
    var hsUrl = document.getElementById("hs-url");
    var hsNazov = document.getElementById("hs-nazov");
    var hsInt = document.getElementById("hs-int");
    var cipy = show.querySelectorAll(".hs-chip");
    /* texty pre čítačky nesie #hero-show v data-*, aby ich mala každá jazyková verzia po svojom */
    var tNahlad = show.getAttribute("data-t-nahlad") || "Živý náhľad ukážky {n}";
    var tOtvorit = show.getAttribute("data-t-otvorit") || "Otvoriť ukážku {n} v plnej veľkosti";

    var ukazCip = function (cip) {
      var cesta = cip.getAttribute("href");
      var nazov = cip.getAttribute("data-nazov") || "";
      if (hsIfr && hsIfr.getAttribute("src") !== cesta) {
        hsIfr.setAttribute("title", tNahlad.replace("{n}", nazov));
        hsIfr.setAttribute("src", cesta);
      }
      if (hsOpen) {
        hsOpen.setAttribute("href", cesta);
        hsOpen.setAttribute("aria-label", tOtvorit.replace("{n}", nazov));
      }
      if (hsUrl) { hsUrl.textContent = cip.getAttribute("data-url") || ""; }
      if (hsNazov) { hsNazov.textContent = nazov; }
      if (hsInt) { hsInt.textContent = cip.getAttribute("data-int") || ""; }
      kazdy(cipy, function (c) {
        if (c === cip) { c.setAttribute("aria-current", "true"); }
        else { c.removeAttribute("aria-current"); }
      });
    };

    kazdy(cipy, function (cip) {
      cip.addEventListener("click", function (e) {
        if (!hsIfr) { return; }                       /* bez rámu ostáva odvetvie odkazom */
        e.preventDefault();
        ukazCip(cip);
      });
    });

    if (hsIfr && cipy.length) {
      var KLUC = "hs-ukazka";
      var posledna = null;
      try { posledna = window.sessionStorage.getItem(KLUC); } catch (err) { posledna = null; }
      var kandidati = [];
      kazdy(cipy, function (c) { if (c.getAttribute("href") !== posledna) { kandidati.push(c); } });
      if (!kandidati.length) { kandidati = Array.prototype.slice.call(cipy); }
      var nahodny = kandidati[Math.floor(Math.random() * kandidati.length)];
      try { window.sessionStorage.setItem(KLUC, nahodny.getAttribute("href")); } catch (err) { /* súkromný režim */ }
      ukazCip(nahodny);
    } else if (hsIfr && !hsIfr.getAttribute("src")) {
      hsIfr.setAttribute("src", hsIfr.getAttribute("data-src") || "ukazky/salon/");
    }
  }

  /* ---------- 04 · prepínač jazykov (glóbus v hlavičke) ----------
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

  /* ---------- 05 · mierka živých náhľadov ----------
     V ráme beží zmenšená skutočná stránka. Základ mierky sa číta z nezmenšenej šírky
     iframu (offsetWidth ignoruje transform): 1280 px, v úzkom ráme 1000 px podľa styles.css. */
  var nahlady = document.querySelectorAll(".shot--live");
  if (nahlady.length) {
    var prepocitaj = function () {
      for (var i = 0; i < nahlady.length; i++) {
        var sirka = nahlady[i].clientWidth;
        if (!sirka) { continue; }
        var ifr = nahlady[i].querySelector("iframe");
        var zaklad = (ifr && ifr.offsetWidth) || 1280;
        nahlady[i].style.setProperty("--shot-s", String(sirka / zaklad));
      }
    };
    prepocitaj();
    /* pri zmene šírky okna aj cez ResizeObserver — samotný observer spoľahlivo nezaberie v každom prehliadači */
    window.addEventListener("resize", prepocitaj);
    window.addEventListener("orientationchange", prepocitaj);
    window.addEventListener("load", prepocitaj);
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(prepocitaj);
      for (var n = 0; n < nahlady.length; n++) { ro.observe(nahlady[n]); }
    }
  }
})();
