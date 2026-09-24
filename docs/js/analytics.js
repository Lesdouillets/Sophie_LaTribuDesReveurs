(function () {
  var GA_ID = "G-JPW637FYJE";
  var STORAGE_KEY = "ltdr_cookies_consent";

  function loadGA() {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  var consent = getConsent();
  if (consent === "accepted") { loadGA(); return; }
  if (consent === "refused") { return; }

  document.addEventListener("DOMContentLoaded", function () {
    var banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.innerHTML =
      '<p>Ce site utilise Google Analytics pour mesurer sa fréquentation. Vos données de navigation ne sont utilisées qu’à cette fin. <a href="confidentialite.html">En savoir plus</a></p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="cookie-refuse">Refuser</button>' +
      '<button type="button" class="cookie-accept">Accepter</button>' +
      "</div>";
    document.body.appendChild(banner);

    banner.querySelector(".cookie-accept").addEventListener("click", function () {
      setConsent("accepted");
      loadGA();
      banner.remove();
    });
    banner.querySelector(".cookie-refuse").addEventListener("click", function () {
      setConsent("refused");
      banner.remove();
    });
  });
})();
