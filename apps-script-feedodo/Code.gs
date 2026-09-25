/**
 * Code.gs — point d'entrée du Web App.
 *
 * Variante "Fée Dodo" : toujours ouvert sur la ligne vierge (ligne 2) de son
 * propre Sheet dédié (jamais lié aux vraies données La Tribu), pas besoin de
 * paramètre ?client=... dans l'URL.
 */

function doGet(e) {
  const template = HtmlService.createTemplateFromFile('Index');
  template.initialRow = 2;
  return template.evaluate()
    .setTitle('Fée Dodo')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Permet d'inclure des fichiers HTML partiels (styles, scripts) dans Index.html.
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
