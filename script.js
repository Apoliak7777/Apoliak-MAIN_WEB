/* ============================================================
   apoliak.online — spoločný skript
   Stránka je plne čitateľná aj bez tohto súboru.
   ============================================================ */
(function () {
  "use strict";

  var ADRESA = "apoliak@apoliak.online";
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
    filtruj("vsetky");
  }

  /* ---------- 04 · kontaktný formulár ----------
     Formulár nemá backend, otvára e-mailový program. Ten sa ale na mobile
     a na počítači bez nastaveného klienta neotvorí a dopyt je stratený.
     Preto po odoslaní ponúkneme text správy na skopírovanie a telefón. */
  var form = document.getElementById("dopyt");
  if (form) {
    var stav = document.getElementById("form-stav");
    var zaloha = document.getElementById("form-zaloha");
    var zalohaText = document.getElementById("fz-text");
    var kopirujBtn = document.getElementById("fz-kopiruj");
    var zalohaMail = document.getElementById("fz-mail");

    var ukazZalohu = function (scrollnut) {
      if (!zaloha) { return; }
      zaloha.hidden = false;
      if (scrollnut && zaloha.scrollIntoView) {
        zaloha.scrollIntoView({ behavior: redukovanyPohyb ? "auto" : "smooth", block: "nearest" });
      }
    };

    form.addEventListener("submit", function (e) {
      if (typeof form.reportValidity === "function" && !form.reportValidity()) { e.preventDefault(); return; }
      e.preventDefault();

      var hodnota = function (id) {
        var pole = document.getElementById(id);
        return pole ? pole.value.trim() : "";
      };
      var meno = hodnota("meno");
      var kontakt = hodnota("kontakt-udaj");
      var typ = hodnota("typ");
      var balik = hodnota("balik");
      var sprava = hodnota("sprava");

      var predmet = "Dopyt na web — " + (typ || "podnik") + (meno ? " — " + meno : "");
      var telo =
        "Meno: " + meno + "\n" +
        "Kontakt: " + kontakt + "\n" +
        "Typ podniku: " + typ + "\n" +
        "Zaujíma ma: " + balik + "\n\n" +
        "Správa:\n" + sprava + "\n";

      /* text pripravíme ešte pred skokom do mailto — po ňom už nemusíme dostať slovo */
      if (zalohaText) { zalohaText.value = "Komu: " + ADRESA + "\nPredmet: " + predmet + "\n\n" + telo; }
      if (zalohaMail) {
        zalohaMail.href = "mailto:" + ADRESA +
          "?subject=" + encodeURIComponent(predmet) +
          "&body=" + encodeURIComponent(telo);
      }

      /* Či sa e-mailový program otvoril, prehliadač nepovie. Poznáme to len podľa
         toho, že stránka stratila fokus alebo sa skryla. Keď sa nestane ani jedno,
         klient sa nespustil a záložný panel odkryjeme sami. */
      var odisiel = false;
      var oznacOdchod = function () { odisiel = true; };
      window.addEventListener("blur", oznacOdchod);
      window.addEventListener("pagehide", oznacOdchod);
      document.addEventListener("visibilitychange", oznacOdchod);

      window.location.href = "mailto:" + ADRESA +
        "?subject=" + encodeURIComponent(predmet) +
        "&body=" + encodeURIComponent(telo);

      window.setTimeout(function () {
        window.removeEventListener("blur", oznacOdchod);
        window.removeEventListener("pagehide", oznacOdchod);
        document.removeEventListener("visibilitychange", oznacOdchod);

        if (odisiel || document.hidden) {
          if (stav) {
            stav.innerHTML = "Otváram váš e-mailový program s vyplnenou správou. " +
              "<button type=\"button\" class=\"stav-odkaz\" id=\"stav-zaloha\">Neotvorilo sa? Skopírujte si správu.</button>";
            var odkaz = document.getElementById("stav-zaloha");
            if (odkaz) { odkaz.addEventListener("click", function () { ukazZalohu(true); }); }
          }
        } else {
          if (stav) { stav.textContent = "E-mailový program sa neotvoril. Správa je pripravená nižšie."; }
          ukazZalohu(true);
        }
      }, 1500);
    });

    if (kopirujBtn && zalohaText) {
      kopirujBtn.addEventListener("click", function () {
        var hotovo = function () {
          kopirujBtn.textContent = "Skopírované";
          window.setTimeout(function () { kopirujBtn.textContent = "Skopírovať správu"; }, 2200);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(zalohaText.value).then(hotovo, function () {
            zalohaText.select(); hotovo();
          });
        } else {
          zalohaText.select();
          try { document.execCommand("copy"); } catch (chyba) { /* ostane aspoň označené */ }
          hotovo();
        }
      });
    }
  }

  /* ---------- 05 · lišta s výzvou na mobile ----------
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

  /* Náhľady v galérii: v ráme beží zmenšená skutočná stránka.
     Mierku počítame z reálnej šírky rámu, aby sedela pri každej šírke okna. */
  var nahlady = document.querySelectorAll(".shot--live");
  if (nahlady.length) {
    var ZAKLAD = 1400;
    var prepocitaj = function () {
      for (var i = 0; i < nahlady.length; i++) {
        var sirka = nahlady[i].clientWidth;
        if (sirka) nahlady[i].style.setProperty("--shot-s", String(sirka / ZAKLAD));
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
