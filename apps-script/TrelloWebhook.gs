/**
 * TrelloWebhook.gs — reçoit les paiements Cal.com et crée/met à jour la carte
 * Trello correspondante (1 carte par famille, historique en commentaires).
 *
 * Sécurité : Apps Script ne peut pas lire les en-têtes HTTP (donc pas de
 * vérification par signature classique). Le secret est donc mis directement
 * dans l'URL du webhook, en paramètre : .../exec?secret=TA_PHRASE_SECRETE
 *
 * Format reçu : le format PAR DEFAUT de Cal.com (pas de "Custom Payload
 * Template" — désactive-le côté Cal.com), pour être sûr de recevoir aussi
 * les réponses aux questions personnalisées (téléphone, cases à cocher,
 * infos de l'enfant), qui ne sont pas garanties disponibles via un template.
 *
 * Tant qu'on n'a pas vérifié la forme exacte des réponses aux questions
 * personnalisées, TOUT le payload reçu est écrit dans le journal
 * d'exécution (Logger.log) pour qu'on puisse l'inspecter et ajuster
 * _extraireReponses_ si besoin.
 */

// ------------------------------------------------------------
// TRELLO_API_KEY, TRELLO_TOKEN et CAL_WEBHOOK_SECRET vivent dans les
// "Proprietes du script" (stockage separe du code, jamais touche par un
// envoi de code). Elles sont ecrites UNE SEULE FOIS via la fonction
// configurerSecretsUneFois() tout en bas de ce fichier — voir instructions
// fournies a part.
// ------------------------------------------------------------
const TRELLO_API_KEY = PropertiesService.getScriptProperties().getProperty('TRELLO_API_KEY');
const TRELLO_TOKEN = PropertiesService.getScriptProperties().getProperty('TRELLO_TOKEN');
const CAL_WEBHOOK_SECRET = PropertiesService.getScriptProperties().getProperty('CAL_WEBHOOK_SECRET');

// Dossier Drive de destination (celui qui contient tous les dossiers
// familles) et modele du tableau de suivi du sommeil — memes IDs que dans
// genererFichesClients, le dossier et le tableau sont desormais crees ICI,
// des la reservation payee, pas a l'arrivee du questionnaire Tally.
const DOSSIER_DESTINATION_ID = '1v3kKM3m_1uJEMF4uNxoCRmMHqqtG8nVF';
const TEMPLATE_TABLEAU_SUIVI_ID = '1GLdKOPXh2cMIf61rlhAlatdL8ip1y_DX59KSHppOlSA';

// Lien du questionnaire Tally envoye dans le mail de bienvenue (meme
// formulaire que celui utilise par genererFichesClients).
const TALLY_QUESTIONNAIRE_URL = 'https://tally.so/r/zxoyXg';

// Logo (fond transparent) insere dans la signature du mail de bienvenue.
const LOGO_FILE_ID = '1OTAxpic2OPr4qAzrrrEeZLBaoxTddN-a'; // fond blanc (lisible sur thème mail sombre)

// Modele de fiche client (meme modele que celui duplique par l'automatisation
// Tally "genererFichesClients", cote Sheet). Duplique ici des la reservation
// payee pour que la fiche soit TOUJOURS disponible depuis Trello, meme si le
// questionnaire Tally n'est jamais rempli. Si Tally est rempli ensuite,
// l'automatisation Tally retrouve cette meme fiche (via la ligne "Fiche
// client :" de la carte Trello) et la complete, au lieu d'en creer une 2e.
const MODELE_FICHE_CLIENT_ID = '1xC4eCpEMlXQEfZAyZzPub4TubKggmK9C';

// Identifiants Trello (récupérés le 13/09/2026, pas besoin d'y toucher).
const TRELLO_BOARD_ID = '6aa6559107598aa8d7263c93';
const TRELLO_LIST_A_VENIR = '6aa6559107598aa8d7263c9b';
const TRELLO_LIST_ARCHIVES = '6aa6559107598aa8d7263c9c';
const TRELLO_LIST_ANNULEES = '6aa6559107598aa8d7263c9d';
const TRELLO_LABEL_INITIALE = '6aa657f8819c9e21d9bb5dde';
const TRELLO_LABEL_SUIVI_30 = '6aa65941895909a7246c0d6c';
const TRELLO_LABEL_SUIVI_45 = '6aa6581d0ce1a01aa2b69356';

function doPost(e) {
  // Note tout ce qui arrive, meme si la requete est ensuite refusee —
  // pour pouvoir diagnostiquer via voirDernierPayloadRecu() sans deviner.
  PropertiesService.getScriptProperties().setProperty(
    'DERNIER_APPEL_BRUT',
    JSON.stringify({
      parametresRecus: e.parameter || null,
      secretAttendu: CAL_WEBHOOK_SECRET,
      aUnCorps: !!(e.postData && e.postData.contents),
      corps: e.postData ? e.postData.contents : null
    }, null, 2)
  );

  try {
    if (!e.parameter || e.parameter.secret !== CAL_WEBHOOK_SECRET) {
      return ContentService.createTextOutput('Non autorise');
    }

    const body = JSON.parse(e.postData.contents);
    const trigger = body.triggerEvent;
    const payload = body.payload || {};

    // Garde une copie du dernier payload recu, pour pouvoir l'inspecter
    // facilement via voirDernierPayloadRecu() (le journal des executions
    // declenchees de l'exterieur n'est pas simple a consulter dans l'UI).
    PropertiesService.getScriptProperties().setProperty(
      'DERNIER_PAYLOAD_CALCOM',
      JSON.stringify({ trigger: trigger, payload: payload }, null, 2)
    );

    if (trigger === 'BOOKING_CANCELLED') {
      _debloquerCreneauFeeDodo_(payload);
      annulerCarteTrello_(payload);
      return ContentService.createTextOutput('OK (annulation)');
    }

    if (trigger === 'BOOKING_RESCHEDULED') {
      _bloquerCreneauFeeDodo_(payload);
      return ContentService.createTextOutput('OK (report : blocage Fee Dodo mis a jour)');
    }

    if (trigger !== 'BOOKING_PAID') {
      return ContentService.createTextOutput('Ignore (trigger : ' + trigger + ')');
    }

    _bloquerCreneauFeeDodo_(payload);
    creerOuMettreAJourCarteTrello(payload);
    return ContentService.createTextOutput('OK');
  } catch (err) {
    Logger.log('Erreur webhook Cal.com : ' + err.message);
    return ContentService.createTextOutput('Erreur : ' + err.message);
  }
}

function creerOuMettreAJourCarteTrello(payload) {
  const attendee = (payload.attendees && payload.attendees[0]) || {};
  const email = attendee.email;
  const infos = _extraireReponses_(payload.responses);
  infos.telephone = attendee.phoneNumber || infos.telephone;

  const idLabel = _trelloChoisirLabel_(payload.type);
  const dateTexte = _trelloFormaterDate_(payload.startTime);
  // Le champ natif "Nom" de Cal.com ne contient que le nom de famille du
  // parent chez Sophie : son prenom vient d'une question personnalisee
  // separee ("Prenom"), a recombiner pour avoir le nom complet.
  const nomParentComplet = (infos.prenomParent ? infos.prenomParent + ' ' : '') + (attendee.name || '');
  const nomCarte = infos.prenomEnfant ? (infos.prenomEnfant + ' / ' + nomParentComplet) : nomParentComplet;
  const carteExistante = _trelloTrouverCarteParEmail_(email);

  const lienVisio = (payload.metadata && payload.metadata.videoCallUrl) || '';

  const blocInfos =
    'Type de consultation : ' + payload.type + '\n' +
    'Date/heure : ' + dateTexte + '\n' +
    'Age enfant : ' + _calculerAge_(infos.dateNaissance) + '\n' +
    'Age corrige : ' + _calculerAge_(infos.dateTerme) + '\n' +
    'Email : ' + email + '\n' +
    'Telephone : ' + (infos.telephone || '') + '\n' +
    (lienVisio ? 'Lien visio : ' + lienVisio + '\n' : '') +
    'Reservation Cal.com : ' + payload.uid;

  if (carteExistante) {
    // Le numero client et le lien du dossier (ajoutes une fois, plus tot)
    // ne sont pas recalcules ici : on les recopie tels quels en haut de la
    // nouvelle description pour ne pas les perdre a chaque mise a jour.
    const lignesAConserver = (carteExistante.desc || '').split('\n')
      .filter(l => l.indexOf('Numero client/enfant') === 0 || l.indexOf('Dossier') === 0 || l.indexOf('Fiche client') === 0)
      .join('\n');
    const descMiseAJour = (lignesAConserver ? lignesAConserver + '\n' : '') + blocInfos;

    _trelloAjouterCommentaire_(
      carteExistante.id,
      'Nouvelle reservation payee : ' + payload.type + ' le ' + dateTexte
    );
    _trelloMettreAJourCarte_(carteExistante.id, {
      idLabels: idLabel,
      due: payload.startTime,
      idList: TRELLO_LIST_A_VENIR,
      desc: descMiseAJour
    });
    Logger.log('Carte Trello mise a jour (id ' + carteExistante.id + ') pour ' + email);

    if (_dureeConsultationSuivi_(payload.type)) {
      _envoyerMailSuivi_(email, infos.prenomEnfant, payload, _recupererLienTableauExistant_(carteExistante.desc));
    }
  } else {
    const nouvelleCarte = _trelloCreerCarte_({
      idList: TRELLO_LIST_A_VENIR,
      name: nomCarte,
      desc: blocInfos,
      idLabels: idLabel,
      due: payload.startTime
    });
    Logger.log('Nouvelle carte Trello creee (id ' + nouvelleCarte.id + ') pour ' + email);
    _creerDossierEtTableauSuivi_(payload, infos, attendee, nouvelleCarte.id, nomCarte, nomParentComplet);
  }
}

// ============================================================
// A la toute premiere reservation payee d'une famille (nouvelle carte) :
// cree le dossier Drive de la famille et le tableau de suivi du sommeil
// personnalise, avec le prenom de l'enfant et le prenom du parent recus
// directement de Cal.com (pas besoin d'attendre le questionnaire Tally).
// ============================================================
function _creerDossierEtTableauSuivi_(payload, infos, attendee, carteId, nomDossier, nomParentComplet) {
  try {
    const dossierParent = DriveApp.getFolderById(DOSSIER_DESTINATION_ID);
    const familyFolder = dossierParent.createFolder(nomDossier);

    const templateTableau = DriveApp.getFileById(TEMPLATE_TABLEAU_SUIVI_ID);
    const nomTableau = 'Tableau de suivi du sommeil de ' + (infos.prenomEnfant || attendee.name);
    const nouveauTableauFichier = templateTableau.makeCopy(nomTableau, familyFolder);
    // Accessible par lien, en modification : le parent doit pouvoir y
    // ecrire directement, sans avoir a demander l'acces a chaque fois.
    nouveauTableauFichier.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
    const tableauSS = SpreadsheetApp.openById(nouveauTableauFichier.getId());

    tableauSS.createTextFinder('{{PRENOM_ENFANT}}').matchEntireCell(false).replaceAllWith(infos.prenomEnfant || '');
    tableauSS.createTextFinder('{{PRENOM_PARENT}}').matchEntireCell(false).replaceAllWith(infos.prenomParent || attendee.name || '');

    // B10 = jour ou la reservation est payee (aujourd'hui). G10 (= B10+5,
    // formule posee dans le modele) prend le relais pour ancrer les jours
    // du tableau, independamment de la date reelle du rendez-vous.
    const dateReservation = new Date();
    tableauSS.getSheets().forEach(feuille => {
      if (feuille.getName().trim().toLowerCase() !== 'bienvenue') {
        try {
          feuille.getRange('B10').setValue(dateReservation);
        } catch (e) {
          Logger.log('Impossible d\'ecrire la date en B10 sur l\'onglet "' + feuille.getName() + '" : ' + e.message);
        }
      }
    });

    // Fiche client (copie du modele) creee tout de suite, meme vide : elle
    // doit toujours etre disponible depuis Trello, que le questionnaire
    // Tally soit rempli ou non (voir MODELE_FICHE_CLIENT_ID plus haut).
    const modeleFiche = DriveApp.getFileById(MODELE_FICHE_CLIENT_ID);
    const ficheFichier = modeleFiche.makeCopy(nomDossier, familyFolder);

    // La fiche client n'apparait pas sur Trello (ni description, ni piece
    // jointe) : elle reste dans le dossier Drive de la famille, accessible
    // via le lien "Dossier" si besoin. Elle est retrouvee par NOM (et non
    // via Trello) par le script Tally, voir genererUneFiche cote
    // "Automatisation fiche client".
    _trelloAjouterLigneDossier_(carteId, familyFolder.getUrl());

    // Ordre des pieces jointes Trello (la plus recemment ajoutee s'affiche
    // en 1er) : Tableau ajoute D'ABORD, puis Google App en dernier, pour que
    // Google App apparaisse tout en haut de la liste.
    _trelloAjouterPieceJointe_(carteId, nouveauTableauFichier.getUrl(), nomTableau);

    // Ligne brouillon dans "Donnees brutes" : donne tout de suite un numero
    // de ligne pour le lien de l'appli de consultation ("Google App"), sans
    // attendre que le questionnaire Tally soit rempli.
    const ligneDonneesBrutes = assurerLigneDonneesBrutesPourReservation_(attendee.email, infos, nomParentComplet);
    if (ligneDonneesBrutes) {
      _trelloAjouterPieceJointe_(carteId, URL_APPLICATION_WEB + '?client=' + ligneDonneesBrutes, 'Fiche - ' + nomDossier);
    }

    Logger.log('Dossier, tableau de suivi et fiche client crees pour "' + nomDossier + '"');

    _envoyerMailBienvenue_(attendee.email, infos.prenomEnfant, payload, nouveauTableauFichier.getUrl());
  } catch (err) {
    Logger.log('Erreur creation dossier/tableau pour "' + nomDossier + '" : ' + err.message);
  }
}

// ============================================================
// Mail de bienvenue envoye au parent apres la 1ere consultation payee
// (jamais pour un suivi, puisque cette fonction n'est appelee que pour une
// carte TOUTE NOUVELLE). Contient la date du RDV, le lien Meet, le
// questionnaire Tally et le tableau de suivi personnalise au prenom de
// l'enfant.
// ============================================================
function _envoyerMailBienvenue_(email, prenomEnfant, payload, lienTableau) {
  if (!email) {
    Logger.log('Mail de bienvenue non envoye : pas d\'email.');
    return;
  }
  const dateTexte = _trelloFormaterDate_(payload.startTime);
  const lienVisio = (payload.metadata && payload.metadata.videoCallUrl) || '';
  const prenom = prenomEnfant || 'votre enfant';
  // Elision ("de"/"que" -> "d'"/"qu'") si le prenom commence par une
  // voyelle (ou un h) : "de Emma" -> "d'Emma", "que Hugo" -> "qu'Hugo".
  const deElide = _avecElision_('de', prenomEnfant);
  const queElide = _avecElision_('que', prenomEnfant);

  const sujet = 'Confirmation de votre Première Consultation - La Tribu des Rêveurs';

  const htmlBody =
    '<p>Bonjour,</p>' +
    '<p>Je me réjouis de notre prochain rendez-vous. Sachez qu\'il n\'y a aucun souci à ce ' + queElide + prenom + ' soit avec vous durant notre échange.</p>' +
    '<ul>' +
    '<li>📅 <strong>Quand :</strong> ' + dateTexte + '</li>' +
    '<li>💻 <strong>Où :</strong> en visio, sur Google Meet — <a href="' + lienVisio + '">Lien vers Google Meet</a><br>' +
    '<em>(pensez à télécharger l\'application si vous vous connectez depuis votre téléphone)</em></li>' +
    '</ul>' +
    '<p>Afin de préparer au mieux notre consultation, pourriez-vous, s\'il vous plaît, prendre quelques minutes pour compléter le questionnaire ci-dessous, et commencer à noter le sommeil ' + deElide + prenom + ' dans le tableau de suivi ?</p>' +
    '<ul>' +
    '<li>👉 <a href="' + TALLY_QUESTIONNAIRE_URL + '">Lien vers le questionnaire</a></li>' +
    '<li>👉 <a href="' + lienTableau + '">Lien vers le tableau</a></li>' +
    '</ul>' +
    '<p>Cela me permettra d\'avoir une vision la plus complète possible de la situation ' + deElide + prenom + ' avant notre échange, et de consacrer davantage de temps ensemble aux solutions à mettre en place pour améliorer son sommeil.</p>' +
    '<p>Pour rappel, mon accompagnement concerne uniquement les enfants n\'ayant pas de trouble du sommeil d\'ordre médical.</p>' +
    '<p>N\'hésitez pas à me contacter si vous avez la moindre question d\'ici notre rendez-vous.</p>' +
    '<p>À bientôt,<br>Bien à vous,<br>Sophie</p>';

  const logo = _logoSignatureMail_();

  const mailOptions = {
    to: email,
    bcc: 'sophie@latribudesreveurs.fr', // copie cachee, pour verifier que ça part bien
    subject: sujet,
    htmlBody: htmlBody + logo.html,
    name: 'Sophie - La Tribu des Rêveurs',
    from: 'sophie@latribudesreveurs.fr'
  };
  if (logo.inlineImages) {
    mailOptions.inlineImages = logo.inlineImages;
  }

  try {
    MailApp.sendEmail(mailOptions);
    Logger.log('Mail de bienvenue envoye a ' + email);
  } catch (err) {
    Logger.log('Erreur envoi mail de bienvenue a ' + email + ' : ' + err.message);
  }
}

// ============================================================
// Recupere le blob du logo (pour l'inserer en piece jointe inline, cid:)
// et le HTML a ajouter dans la signature. Partage entre tous les mails
// automatiques envoyes aux parents.
// ============================================================
function _logoSignatureMail_() {
  try {
    const blob = DriveApp.getFileById(LOGO_FILE_ID).getBlob().setName('La-Tribu-des-Reveurs-logo.jpg');
    return {
      html: '<img src="cid:logo" alt="La Tribu des Rêveurs" style="width:180px;height:auto;margin-top:10px;">',
      inlineImages: { logo: blob }
    };
  } catch (err) {
    Logger.log('Logo non recupere pour un mail automatique : ' + err.message);
    return { html: '', inlineImages: null };
  }
}

// ============================================================
// Duree ("45" ou "30") d'une consultation de suivi, a partir du type
// Cal.com. Vide si ce n'est pas un suivi (ex : consultation initiale).
// ============================================================
function _dureeConsultationSuivi_(typeConsultation) {
  const t = String(typeConsultation || '');
  if (t.indexOf('45') !== -1) return '45';
  if (t.indexOf('30') !== -1) return '30';
  return '';
}

// ============================================================
// Retrouve le lien du tableau de suivi deja cree pour cette famille, a
// partir de la ligne "Dossier : <url>" conservee dans la description de
// la carte Trello (le tableau lui-meme n'est plus recreable : on va le
// chercher dans le dossier Drive de la famille).
// ============================================================
function _recupererLienTableauExistant_(descCarte) {
  return _trouverLiensDossierFamille_(descCarte).tableauUrl;
}

// ============================================================
// Mail de confirmation envoye au parent pour une consultation de suivi
// (carte Trello deja existante). Contient la date du RDV, le lien Meet et
// le tableau de suivi deja cree lors de la 1ere consultation.
// ============================================================
function _envoyerMailSuivi_(email, prenomEnfant, payload, lienTableau) {
  if (!email) {
    Logger.log('Mail de suivi non envoye : pas d\'email.');
    return;
  }
  if (!lienTableau) {
    Logger.log('Mail de suivi non envoye a ' + email + ' : lien du tableau introuvable.');
    return;
  }
  const dateTexte = _trelloFormaterDate_(payload.startTime);
  const lienVisio = (payload.metadata && payload.metadata.videoCallUrl) || '';
  const prenom = prenomEnfant || 'votre enfant';
  const deElide = _avecElision_('de', prenomEnfant);
  const duree = _dureeConsultationSuivi_(payload.type);
  const dureeTexte = duree ? ' de ' + duree + ' minutes' : '';

  const sujet = 'Confirmation de votre consultation de suivi' + dureeTexte + ' - La Tribu des Rêveurs';

  const htmlBody =
    '<p>Bonjour,</p>' +
    '<p>Merci d\'avoir réservé une consultation de suivi' + dureeTexte + '. Ce rendez-vous est l\'occasion de faire le point sur l\'évolution de la situation depuis notre dernier échange, et de construire ensemble les prochaines étapes.</p>' +
    '<ul>' +
    '<li>📅 <strong>Quand :</strong> ' + dateTexte + '</li>' +
    '<li>💻 <strong>Où :</strong> en visio, sur Google Meet — <a href="' + lienVisio + '">Lien vers Google Meet</a><br>' +
    '<em>(pensez à télécharger l\'application si vous vous connectez depuis votre téléphone)</em></li>' +
    '</ul>' +
    '<p>Pour préparer au mieux notre échange, pourriez-vous, s\'il vous plaît, mettre à jour le tableau de suivi ' + deElide + prenom + ' avant notre rendez-vous ?</p>' +
    '<ul>' +
    '<li>👉 <a href="' + lienTableau + '">Lien vers le tableau</a></li>' +
    '</ul>' +
    '<p>Pour rappel, mon accompagnement concerne uniquement les enfants n\'ayant pas de trouble du sommeil d\'ordre médical.</p>' +
    '<p>N\'hésitez pas à me contacter si vous avez la moindre question d\'ici notre rendez-vous.</p>' +
    '<p>À bientôt,<br>Bien à vous,<br>Sophie</p>';

  const logo = _logoSignatureMail_();

  const mailOptions = {
    to: email,
    bcc: 'sophie@latribudesreveurs.fr',
    subject: sujet,
    htmlBody: htmlBody + logo.html,
    name: 'Sophie - La Tribu des Rêveurs',
    from: 'sophie@latribudesreveurs.fr'
  };
  if (logo.inlineImages) {
    mailOptions.inlineImages = logo.inlineImages;
  }

  try {
    MailApp.sendEmail(mailOptions);
    Logger.log('Mail de suivi envoye a ' + email);
  } catch (err) {
    Logger.log('Erreur envoi mail de suivi a ' + email + ' : ' + err.message);
  }
}

// ============================================================
// Ajoute la ligne "Dossier : <url>" en haut de la description de la carte
// (au lieu d'une piece jointe visible), pour que genererFichesClients
// puisse retrouver ce dossier plus tard sans avoir a lister les pieces
// jointes.
// ============================================================
function _trelloAjouterLigneDossier_(carteId, dossierUrl) {
  _trelloAjouterLigneEnHautDesc_(carteId, 'Dossier', dossierUrl);
}

// ============================================================
// Ajoute la ligne "Fiche client : <url>" en haut de la description de la
// carte (juste apres la ligne Dossier), pour un acces direct a la fiche
// depuis Trello sans avoir a ouvrir le dossier Drive.
// ============================================================
function _trelloAjouterLigneFiche_(carteId, ficheUrl) {
  _trelloAjouterLigneEnHautDesc_(carteId, 'Fiche client', ficheUrl);
}

// Coeur commun : insere "<label> : <url>" comme toute 1ere ligne de la
// description actuelle de la carte (les lignes existantes suivent, non
// modifiees).
function _trelloAjouterLigneEnHautDesc_(carteId, label, url) {
  const getUrl = 'https://api.trello.com/1/cards/' + carteId
    + '?fields=desc'
    + '&key=' + TRELLO_API_KEY
    + '&token=' + TRELLO_TOKEN;
  const getResponse = UrlFetchApp.fetch(getUrl, { muteHttpExceptions: true });
  if (getResponse.getResponseCode() !== 200) {
    Logger.log('Erreur lecture carte Trello (ajout ' + label + ') : ' + getResponse.getContentText());
    return;
  }
  const carteActuelle = JSON.parse(getResponse.getContentText());
  const nouvelleDesc = label + ' : ' + url + '\n' + (carteActuelle.desc || '');

  const putUrl = 'https://api.trello.com/1/cards/' + carteId
    + '?key=' + TRELLO_API_KEY
    + '&token=' + TRELLO_TOKEN
    + '&desc=' + encodeURIComponent(nouvelleDesc);
  const putResponse = UrlFetchApp.fetch(putUrl, { method: 'put', muteHttpExceptions: true });
  if (putResponse.getResponseCode() !== 200) {
    Logger.log('Erreur ajout ligne ' + label + ' dans la description : ' + putResponse.getContentText());
  }
}

// ============================================================
// Ajoute une piece jointe (lien) a une carte Trello.
// ============================================================
// "nom" ne sert qu'aux journaux (Logger.log) : on ne l'envoie pas a Trello,
// pour que la piece jointe affiche l'URL complete plutot qu'un simple mot.
function _trelloAjouterPieceJointe_(carteId, url, nom) {
  const postUrl = 'https://api.trello.com/1/cards/' + carteId + '/attachments'
    + '?key=' + TRELLO_API_KEY
    + '&token=' + TRELLO_TOKEN
    + '&url=' + encodeURIComponent(url);
  const response = UrlFetchApp.fetch(postUrl, { method: 'post', muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) {
    Logger.log('Erreur ajout piece jointe Trello "' + nom + '" (' + response.getResponseCode() + ') : ' + response.getContentText());
  }
}

// ============================================================
// Reservation annulee sur Cal.com : deplace la carte de la famille vers
// "Consultations annulees" et ajoute un commentaire.
// ============================================================
function annulerCarteTrello_(payload) {
  const attendee = (payload.attendees && payload.attendees[0]) || {};
  const email = attendee.email;
  const carte = _trelloTrouverCarteParEmail_(email);
  if (!carte) {
    Logger.log('Annulation recue mais aucune carte Trello trouvee pour ' + email);
    return;
  }
  _trelloAjouterCommentaire_(
    carte.id,
    'Reservation annulee : ' + (payload.type || '') + ' prevue le ' + _trelloFormaterDate_(payload.startTime)
  );
  _trelloDeplacerCarte_(carte.id, TRELLO_LIST_ANNULEES);
  Logger.log('Carte Trello deplacee vers Consultations annulees (id ' + carte.id + ') pour ' + email);
}

function _trelloDeplacerCarte_(idCarte, idList) {
  const url = 'https://api.trello.com/1/cards/' + idCarte
    + '?key=' + TRELLO_API_KEY
    + '&token=' + TRELLO_TOKEN
    + '&idList=' + encodeURIComponent(idList);
  const response = UrlFetchApp.fetch(url, { method: 'put', muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) {
    Logger.log('Erreur deplacement carte Trello (' + response.getResponseCode() + ') : ' + response.getContentText());
  }
}

// ============================================================
// Extraction des reponses aux questions personnalisees Cal.com.
// La forme exacte de "responses" n'est pas garantie tant qu'on ne l'a
// pas verifiee en conditions reelles : on essaie plusieurs cles/formes
// plausibles pour chaque info, et on degrade en douceur (chaine vide) si
// rien ne correspond, plutot que de planter.
// ============================================================
function _extraireReponses_(responses) {
  return {
    telephone: _reponseParCles_(responses, ['attendeePhoneNumber', 'phone']),
    prenomEnfant: _reponseParCles_(responses, ['prenom-enfant']),
    prenomParent: _reponseParCles_(responses, ['Prenom']),
    dateNaissance: _reponseParCles_(responses, ['Date-de-naissance']),
    dateTerme: _reponseParCles_(responses, ['Date-Accouchement'])
  };
}

function _reponseParCles_(responses, cles) {
  if (!responses) return '';
  for (let i = 0; i < cles.length; i++) {
    const brut = responses[cles[i]];
    if (brut === undefined || brut === null) continue;
    // La valeur peut arriver soit directement, soit sous la forme { value: ... }.
    const valeur = (typeof brut === 'object' && brut !== null && 'value' in brut) ? brut.value : brut;
    if (valeur !== undefined && valeur !== null && String(valeur).trim() !== '') {
      return String(valeur).trim();
    }
  }
  return '';
}

// ============================================================
// Calcule un age en "X ans et Y mois" / "X mois" a partir d'un texte
// JJ/MM/AAAA (accepte aussi les tirets/points comme separateurs).
// ============================================================
function _calculerAge_(texteDate) {
  if (!texteDate) return '';
  const m = String(texteDate).match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})/);
  if (!m) {
    Logger.log('Date non reconnue pour calcul age : "' + texteDate + '"');
    return '';
  }
  const naissance = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  const maintenant = new Date();
  let mois = (maintenant.getFullYear() - naissance.getFullYear()) * 12 + (maintenant.getMonth() - naissance.getMonth());
  if (maintenant.getDate() < naissance.getDate()) mois -= 1;
  if (mois < 0) return '';

  const ans = Math.floor(mois / 12);
  const moisRestants = mois % 12;
  if (ans === 0) return moisRestants + ' mois';
  return ans + ' ans et ' + moisRestants + ' mois';
}

// ============================================================
// FONCTIONS UTILITAIRES TRELLO
// ============================================================

function _trelloChoisirLabel_(typeConsultation) {
  const t = String(typeConsultation || '').toLowerCase();
  if (t.indexOf('45') !== -1) return TRELLO_LABEL_SUIVI_45;
  if (t.indexOf('30') !== -1) return TRELLO_LABEL_SUIVI_30;
  return TRELLO_LABEL_INITIALE;
}

// Elision d'un petit mot ("de", "que"...) devant un prenom qui commence par
// une voyelle ou un h muet : "le sommeil de Emma" -> "le sommeil d'Emma",
// "à ce que Hugo" -> "à ce qu'Hugo".
function _avecElision_(mot, prenom) {
  if (!prenom) return mot + ' ';
  const premiereLettre = prenom.trim().charAt(0).toLowerCase();
  const besoinElision = 'aeiouyàâäéèêëïîôöùûüh'.indexOf(premiereLettre) !== -1;
  return besoinElision ? mot.slice(0, -1) + '\'' : mot + ' ';
}

function _trelloFormaterDate_(isoString) {
  try {
    const d = new Date(isoString);
    return Utilities.formatDate(d, 'Europe/Paris', 'dd/MM/yyyy HH:mm');
  } catch (e) {
    return isoString;
  }
}

function _trelloTrouverCarteParEmail_(email) {
  // On liste toutes les cartes du tableau plutot que d'utiliser le moteur de
  // recherche de Trello (qui gere mal les recherches d'adresses email), puis
  // on filtre nous-memes celles dont la description contient cet email.
  const url = 'https://api.trello.com/1/boards/' + TRELLO_BOARD_ID + '/cards'
    + '?fields=name,desc,due,idLabels'
    + '&key=' + TRELLO_API_KEY
    + '&token=' + TRELLO_TOKEN;

  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) {
    Logger.log('Erreur recherche Trello (' + response.getResponseCode() + ') : ' + response.getContentText());
    return null;
  }
  const cartes = JSON.parse(response.getContentText()) || [];
  const emailLower = String(email).toLowerCase();
  const trouvee = cartes.find(c => (c.desc || '').toLowerCase().indexOf(emailLower) !== -1);
  return trouvee || null;
}

function _trelloCreerCarte_(champs) {
  const url = 'https://api.trello.com/1/cards'
    + '?key=' + TRELLO_API_KEY
    + '&token=' + TRELLO_TOKEN
    + '&idList=' + encodeURIComponent(champs.idList)
    + '&name=' + encodeURIComponent(champs.name)
    + '&desc=' + encodeURIComponent(champs.desc)
    + '&idLabels=' + encodeURIComponent(champs.idLabels)
    + '&due=' + encodeURIComponent(champs.due);

  const response = UrlFetchApp.fetch(url, { method: 'post', muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) {
    throw new Error('Erreur creation carte Trello (' + response.getResponseCode() + ') : ' + response.getContentText());
  }
  return JSON.parse(response.getContentText());
}

function _trelloMettreAJourCarte_(idCarte, champs) {
  const url = 'https://api.trello.com/1/cards/' + idCarte
    + '?key=' + TRELLO_API_KEY
    + '&token=' + TRELLO_TOKEN
    + '&idLabels=' + encodeURIComponent(champs.idLabels)
    + '&due=' + encodeURIComponent(champs.due)
    // Nouvelle reservation : la nouvelle date n'est pas encore "faite",
    // meme si la carte avait ete cochee apres l'envoi du mail precedent.
    + '&dueComplete=false'
    + '&idList=' + encodeURIComponent(champs.idList)
    + '&desc=' + encodeURIComponent(champs.desc);

  const response = UrlFetchApp.fetch(url, { method: 'put', muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) {
    throw new Error('Erreur mise a jour carte Trello (' + response.getResponseCode() + ') : ' + response.getContentText());
  }
  return JSON.parse(response.getContentText());
}

function _trelloAjouterCommentaire_(idCarte, texte) {
  const url = 'https://api.trello.com/1/cards/' + idCarte + '/actions/comments'
    + '?key=' + TRELLO_API_KEY
    + '&token=' + TRELLO_TOKEN
    + '&text=' + encodeURIComponent(texte);

  const response = UrlFetchApp.fetch(url, { method: 'post', muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) {
    Logger.log('Erreur ajout commentaire Trello (' + response.getResponseCode() + ') : ' + response.getContentText());
  }
}

// ============================================================
// Diagnostic pur : verifie que TRELLO_API_KEY / TRELLO_TOKEN /
// CAL_WEBHOOK_SECRET sont bien definis (dans le fichier "Secrets").
// A lancer manuellement pour verifier avant de tester le webhook.
// ============================================================
function verifierProprietes() {
  Logger.log('TRELLO_API_KEY defini : ' + (typeof TRELLO_API_KEY !== 'undefined' && !!TRELLO_API_KEY));
  Logger.log('TRELLO_TOKEN defini : ' + (typeof TRELLO_TOKEN !== 'undefined' && !!TRELLO_TOKEN));
  Logger.log('CAL_WEBHOOK_SECRET defini : ' + (typeof CAL_WEBHOOK_SECRET !== 'undefined' && !!CAL_WEBHOOK_SECRET));
}

// ============================================================
// A lancer manuellement (bouton Executer) apres une reservation test sur
// Cal.com, pour voir exactement ce qui a ete recu (dans le journal
// d'execution normal, celui qui s'affiche apres avoir clique Executer).
// ============================================================
function voirDernierPayloadRecu() {
  const appelBrut = PropertiesService.getScriptProperties().getProperty('DERNIER_APPEL_BRUT');
  Logger.log('=== Dernier appel recu (meme si refuse) ===');
  Logger.log(appelBrut || 'Aucun appel recu pour le moment.');

  const brut = PropertiesService.getScriptProperties().getProperty('DERNIER_PAYLOAD_CALCOM');
  Logger.log('=== Dernier payload accepte ===');
  if (!brut) {
    Logger.log('Aucun payload recu pour le moment.');
    return;
  }
  Logger.log(brut);
}

// ============================================================
// Diagnostic cible : cherche le lien de visio (Google Meet) dans le
// dernier payload recu, sans se faire tronquer par le journal (le payload
// complet est trop long pour Logger.log). Affiche tous les champs
// plausibles trouves.
// ============================================================
function voirLienVisio() {
  const brut = PropertiesService.getScriptProperties().getProperty('DERNIER_PAYLOAD_CALCOM');
  if (!brut) {
    Logger.log('Aucun payload recu pour le moment.');
    return;
  }
  const data = JSON.parse(brut);
  const payload = data.payload || {};

  Logger.log('location : ' + JSON.stringify(payload.location));
  Logger.log('videoCallData : ' + JSON.stringify(payload.videoCallData));
  Logger.log('metadata : ' + JSON.stringify(payload.metadata));
  Logger.log('conferenceData : ' + JSON.stringify(payload.conferenceData));
  Logger.log('uid : ' + payload.uid);

  // Filet de secours : parcourt tout le payload a la recherche d'un texte
  // ressemblant a une URL Meet/Zoom/visio, ou qu'on n'aurait pas pense a lister.
  const trouve = [];
  (function chercher(obj, chemin) {
    if (!obj || typeof obj !== 'object') return;
    Object.keys(obj).forEach(k => {
      const val = obj[k];
      const nouveauChemin = chemin + '.' + k;
      if (typeof val === 'string' && /meet\.google\.com|zoom\.us|https?:\/\/.*(meet|visio|call)/i.test(val)) {
        trouve.push(nouveauChemin + ' = ' + val);
      } else if (typeof val === 'object') {
        chercher(val, nouveauChemin);
      }
    });
  })(payload, 'payload');

  Logger.log('=== Recherche large (URLs ressemblant a un lien de visio) ===');
  Logger.log(trouve.length ? trouve.join('\n') : 'Rien trouve.');
}

// ============================================================
// Diagnostic : liste les listes du tableau Trello avec leur ID (utile pour
// recuperer l'ID d'une nouvelle liste comme "Consultations annulees").
// ============================================================
function listerListesDuTableau() {
  const url = 'https://api.trello.com/1/boards/' + TRELLO_BOARD_ID + '/lists'
    + '?key=' + TRELLO_API_KEY + '&token=' + TRELLO_TOKEN;
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) {
    Logger.log('Erreur (' + response.getResponseCode() + ') : ' + response.getContentText());
    return;
  }
  const listes = JSON.parse(response.getContentText());
  listes.forEach(l => Logger.log(l.name + ' : ' + l.id));
}

// ============================================================
// Diagnostic : retrouve la trace d'une piece jointe supprimee sur une
// carte, via l'historique des actions Trello (qui garde le nom/URL meme
// apres suppression). Remplace la valeur ci-dessous par le code trouve
// dans l'URL de la carte (https://trello.com/c/CE_CODE/...), sauvegarde,
// puis lance cette fonction et regarde le journal d'execution.
// ============================================================
function retrouverPieceJointeSupprimee() {
  const idCarteCourt = 'COLLE_LE_CODE_DE_L_URL_ICI';

  const url = 'https://api.trello.com/1/cards/' + idCarteCourt + '/actions'
    + '?filter=addAttachmentToCard'
    + '&key=' + TRELLO_API_KEY
    + '&token=' + TRELLO_TOKEN;
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) {
    Logger.log('Erreur (' + response.getResponseCode() + ') : ' + response.getContentText());
    return;
  }
  const actions = JSON.parse(response.getContentText());
  if (!actions.length) {
    Logger.log('Aucune piece jointe trouvee dans l\'historique de cette carte.');
    return;
  }
  actions.forEach(a => {
    const att = a.data && a.data.attachment;
    if (att) {
      Logger.log('Nom : ' + att.name + '  |  URL : ' + att.url + '  |  ajoutee le ' + a.date);
    }
  });
}

// ============================================================
// Fonction de TEST manuelle — simule une reservation payee avec
// des reponses personnalisees (forme a confirmer avec un vrai test).
// ============================================================
// A LANCER UNE SEULE FOIS MANUELLEMENT (bouton "Executer"), pour que Google
// te demande d'autoriser l'envoi d'e-mails — les webhooks Cal.com ne
// peuvent pas declencher cette demande d'autorisation eux-memes.
function autoriserEnvoiMail() {
  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: 'Test autorisation mail - La Tribu des Reveurs',
    htmlBody: '<p>Si tu reçois ce mail, l\'autorisation est bien passée.</p>',
    name: 'Sophie - La Tribu des Rêveurs'
  });
  Logger.log('Mail de test envoye.');
}

function testerWebhookCalCom() {
  const fauxEvenement = {
    parameter: { secret: CAL_WEBHOOK_SECRET },
    postData: {
      contents: JSON.stringify({
        triggerEvent: 'BOOKING_PAID',
        payload: {
          type: 'rdv-consultation-initiale',
          startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          uid: 'test-uid-123',
          attendees: [{ name: 'Test Famille', email: 'test-famille@example.com', phoneNumber: '+33612345678' }],
          responses: {
            'prenom-enfant': { value: 'Testine' },
            'Date-de-naissance': { value: '15/03/2025' },
            'Date-Accouchement': { value: '' }
          }
        }
      })
    }
  };
  const resultat = doPost(fauxEvenement);
  Logger.log(resultat.getContent());
}

// ============================================================
// A LANCER UNE SEULE FOIS : colle tes vraies valeurs ci-dessous a la
// place des 3 textes entre guillemets, sauvegarde (Ctrl+S), selectionne
// cette fonction dans le menu Executer, lance-la UNE FOIS, verifie avec
// verifierProprietes(), puis efface ces 3 vraies valeurs de cette
// fonction (remets des textes bidon) et sauvegarde a nouveau — les
// valeurs restent enregistrees dans les Proprietes du script meme
// une fois effacees d'ici.
// ============================================================
function configurerSecretsUneFois() {
  PropertiesService.getScriptProperties().setProperties({
    TRELLO_API_KEY: 'COLLE_TA_CLE_ICI',
    TRELLO_TOKEN: 'COLLE_TON_TOKEN_ICI',
    CAL_WEBHOOK_SECRET: 'COLLE_TON_SECRET_ICI'
  });
  Logger.log('Proprietes enregistrees.');
}
