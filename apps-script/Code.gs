/**
 * Code.gs — point d'entrée du Web App (remplace l'ancien site statique).
 */

function doGet(e) {
  const clientRow = e && e.parameter && e.parameter.client ? Number(e.parameter.client) : null;
  const template = HtmlService.createTemplateFromFile('Index');
  template.initialRow = clientRow;
  return template.evaluate()
    .setTitle('La Tribu des Rêveurs')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Permet d'inclure des fichiers HTML partiels (styles, scripts) dans Index.html.
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
