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
        info.textContent = viditelnych === 10
          ? "Zobrazených všetkých 10 ukážok"
          : "Zobrazené ukážky: " + viditelnych + " z 10";
      }
    };

    Array.prototype.forEach.call(tlacidla, function (t) {
      t.addEventListener("click", function () { filtruj(t.getAttribute("data-f")); });
    });
    filtruj("vsetky");
  }

  /* ---------- 04 · kontaktný formulár (otvorí e-mailový program) ---------- */
  var form = document.getElementById("dopyt");
  if (form) {
    var stav = document.getElementById("form-stav");
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
      var sprava = hodnota("sprava");

      var predmet = "Dopyt na web — " + (typ || "podnik") + (meno ? " — " + meno : "");
      var telo =
        "Meno: " + meno + "\n" +
        "Kontakt: " + kontakt + "\n" +
        "Typ podniku: " + typ + "\n\n" +
        "Správa:\n" + sprava + "\n";

      window.location.href = "mailto:info@apoliak.online" +
        "?subject=" + encodeURIComponent(predmet) +
        "&body=" + encodeURIComponent(telo);

      if (stav) {
        stav.textContent = "Otváram váš e-mailový program s vyplnenou správou. Ak sa neotvoril, napíšte mi priamo na info@apoliak.online.";
      }
    });
  }
})();
