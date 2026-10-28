/* Hlavná stránka apoliak.online: kalkulačka ceny, jazykové menu a rok v pätičke.
   Ceny a texty zostavy sú v data-* atribútoch #kalk v index.html, nie tu — tak ich vie preložiť _PRACA/preklad.
   Kalkulačka nič neodosiela: z výberu poskladá text do e-mailu, WhatsAppu, SMS alebo schránky. */
(function () {
  "use strict";

  var rok = document.getElementById("rok");
  if (rok) rok.textContent = String(new Date().getFullYear());

  // jazykové menu sa zavrie klikom mimo neho aj klávesom Escape
  var jazyk = document.querySelector(".jazyk");
  if (jazyk) {
    document.addEventListener("click", function (e) {
      if (jazyk.open && !jazyk.contains(e.target)) jazyk.open = false;
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && jazyk.open) {
        jazyk.open = false;
        jazyk.querySelector("summary").focus();
      }
    });
  }

  var kalk = document.getElementById("kalk");
  if (!kalk) return;

  var MAIL = "apoliak@apoliak.online";
  var TEL = "421902464022";
  var MAX_PODSTRANOK = 30;
  var d = kalk.dataset;
  var cenaPodstranka = Number(d.cenaPodstranka);
  var cenaTexty = Number(d.cenaTexty);
  var podstranky = document.getElementById("d-podstranky");
  var texty = document.getElementById("d-texty");
  var udrzba = document.getElementById("d-udrzba");
  var riadky = document.getElementById("z-riadky");
  var spolu = document.getElementById("z-spolu");
  var cas = document.getElementById("z-cas");
  var odkazMail = document.getElementById("z-mail");
  var odkazWa = document.getElementById("z-wa");
  var odkazSms = document.getElementById("z-sms");
  var kopia = document.getElementById("z-kopia");
  var textSpravy = "";

  function eur(n) { return n.toLocaleString("sk-SK"); }

  function dosad(sablona, hodnoty) {
    return sablona.replace(/\{(\w+)\}/g, function (cela, kluc) {
      return Object.prototype.hasOwnProperty.call(hodnoty, kluc) ? hodnoty[kluc] : cela;
    });
  }

  // 1 stránka · 2 až 4 stránky · 5 a viac stránok
  function tvar(n, tvary) {
    var t = tvary.split("|");
    if (n === 1) return t[0];
    return n >= 2 && n <= 4 ? t[1] : t[2];
  }

  function pocetPodstranok() {
    var n = parseInt(podstranky.value, 10);
    if (isNaN(n) || n < 0) return 0;
    return Math.min(n, MAX_PODSTRANOK);
  }

  function prepocitaj() {
    var balik = kalk.querySelector(".balik-volba:checked") || document.getElementById("b-standard");
    var nazov = balik.dataset.nazov;
    var zaklad = Number(balik.dataset.cena);
    var n = pocetPodstranok();
    var sucet = zaklad;
    var polozky = [[nazov, dosad(d.tSuma, { s: eur(zaklad) })]];

    if (n > 0) {
      sucet += n * cenaPodstranka;
      polozky.push([dosad(d.tPodstranky, { p: n }), dosad(d.tSuma, { s: eur(n * cenaPodstranka) })]);
    }
    if (texty.checked) {
      if (balik.dataset.textyVCene === "1") {
        polozky.push([d.tTextyPro, d.tVCene]);
      } else {
        var stranok = 1 + n;
        sucet += stranok * cenaTexty;
        polozky.push([
          dosad(d.tTexty, { p: stranok, slovo: tvar(stranok, d.tStranky) }),
          dosad(d.tSuma, { s: eur(stranok * cenaTexty) })
        ]);
      }
    }
    if (udrzba.checked) polozky.push([d.tUdrzba, d.tUdrzbaCena]);

    riadky.textContent = "";
    polozky.forEach(function (p) {
      var r = document.createElement("div");
      var dt = document.createElement("dt");
      var dd = document.createElement("dd");
      dt.textContent = p[0];
      dd.textContent = p[1];
      r.appendChild(dt);
      r.appendChild(dd);
      riadky.appendChild(r);
    });
    spolu.textContent = dosad(d.tSpolu, { s: eur(sucet) });
    cas.textContent = dosad(d.tCas, { cas: balik.dataset.cas });

    var uvod = d.mUvod.split("|");
    var sprava = [uvod[0], "", uvod[1], "- " + dosad(d.mBalicek, { n: nazov, s: eur(zaklad) })];
    polozky.slice(1).forEach(function (p) { sprava.push("- " + p[0] + " (" + p[1] + ")"); });
    sprava.push(dosad(d.mSpolu, { s: eur(sucet) }), "");
    d.mPolia.split("|").forEach(function (pole) { sprava.push(pole + " "); });
    // nezlomiteľná medzera z toLocaleString patrí na stránku, do správy ide obyčajná
    textSpravy = sprava.join("\n").replace(/[  ]/g, " ");

    var zostava = polozky.map(function (p) { return p[0]; }).join(", ");
    odkazMail.href = "mailto:" + MAIL + "?subject=" + encodeURIComponent(dosad(d.mPredmet, { n: nazov })) +
      "&body=" + encodeURIComponent(textSpravy);
    odkazWa.href = "https://wa.me/" + TEL + "?text=" + encodeURIComponent(textSpravy);
    // „?&body=“ prečíta Android aj iPhone
    odkazSms.href = "sms:+" + TEL + "?&body=" +
      encodeURIComponent(dosad(d.mSms, { zostava: zostava, s: eur(sucet) }).replace(/[  ]/g, " "));
  }

  kalk.addEventListener("change", prepocitaj);
  podstranky.addEventListener("input", prepocitaj);
  podstranky.addEventListener("blur", function () {
    podstranky.value = pocetPodstranok();
    prepocitaj();
  });
  Array.prototype.forEach.call(kalk.querySelectorAll(".pocitadlo-btn"), function (btn) {
    btn.addEventListener("click", function () {
      var n = pocetPodstranok() + Number(btn.dataset.krok);
      podstranky.value = Math.max(0, Math.min(MAX_PODSTRANOK, n));
      prepocitaj();
    });
  });

  kopia.addEventListener("click", function () {
    var popis = kopia.textContent;
    function hotovo() {
      kopia.textContent = d.tSkopirovane;
      setTimeout(function () { kopia.textContent = popis; }, 2000);
    }
    function cezPole() {
      var pole = document.createElement("textarea");
      pole.value = textSpravy;
      pole.setAttribute("readonly", "");
      pole.style.position = "fixed";
      pole.style.opacity = "0";
      document.body.appendChild(pole);
      pole.select();
      try { if (document.execCommand("copy")) hotovo(); } catch (e) { /* schránka nedostupná */ }
      document.body.removeChild(pole);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textSpravy).then(hotovo, cezPole);
    } else {
      cezPole();
    }
  });

  // prehliadač pri návrate na stránku obnoví zaškrtnutia, zostava sa musí prepočítať s nimi
  window.addEventListener("pageshow", prepocitaj);
  prepocitaj();
})();
