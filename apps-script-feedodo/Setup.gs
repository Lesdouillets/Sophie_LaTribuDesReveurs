/**
 * Setup.gs — A LANCER UNE SEULE FOIS MANUELLEMENT (bouton "Executer"), puis à
 * supprimer. Crée un nouveau Google Sheet, avec les MEMES colonnes que le
 * Sheet "Données brutes" de La Tribu des Rêveurs (uniquement la ligne
 * d'en-têtes, aucune donnée de famille copiée), plus une ligne 2 vierge.
 *
 * Une fois exécutée, la fonction affiche l'ID du nouveau Sheet dans le
 * journal d'exécution (View > Logs) : copier cet ID dans SHEET_ID
 * (Config.gs) de CE projet.
 */
function creerSheetVierge() {
  const SOURCE_SHEET_ID = '1K7HK8i_AuNG12XZ6RTmt6W226MbKurtaZ6NPmWglixI';
  const SOURCE_SHEET_NAME = 'Données brutes';

  const source = SpreadsheetApp.openById(SOURCE_SHEET_ID).getSheetByName(SOURCE_SHEET_NAME);
  const nbColonnes = source.getLastColumn();
  const entetes = source.getRange(1, 1, 1, nbColonnes).getValues();

  const nouveauClasseur = SpreadsheetApp.create('Données brutes - Fée Dodo (vierge)');
  const nouvelOnglet = nouveauClasseur.getSheets()[0];
  nouvelOnglet.setName(SOURCE_SHEET_NAME);
  nouvelOnglet.getRange(1, 1, 1, nbColonnes).setValues(entetes);
  nouvelOnglet.getRange(2, 1, 1, nbColonnes).setValues([new Array(nbColonnes).fill('')]);

  Logger.log('Nouveau Sheet cree. ID a copier dans Config.gs (SHEET_ID) :');
  Logger.log(nouveauClasseur.getId());
}
