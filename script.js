/* ============================================================
   apoliak.online — spoločný skript galérie, zákaziek, 404 a ochrany údajov
   (aj v jazykových verziách). Stránka je plne čitateľná aj bez tohto súboru.
   Nič neanimuje: filtruje ukážky, zatvára jazykové menu a dopočítava
   mierku živých náhľadov.
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

  /* ---------- 03 · prepínač jazykov (glóbus v hlavičke) ----------
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

  /* ---------- 04 · mierka živých náhľadov ----------
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
