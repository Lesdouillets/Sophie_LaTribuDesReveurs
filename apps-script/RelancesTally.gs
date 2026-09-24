/**
 * RelancesTally.gs — relance automatique par mail des parents qui n'ont pas
 * encore rempli le questionnaire Tally, a J-3 et J-1 avant leur rendez-vous.
 *
 * Declenchement : un declencheur horaire quotidien (voir
 * installerDeclencheurRelancesTally) qui, chaque jour :
 *   1. Liste les cartes de "Consultations a venir" (avec leur date "due").
 *   2. Pour celles a 3 jours ou 1 jour du rendez-vous, verifie si le
 *      questionnaire Tally a deja ete rempli (via la ligne "Donnees brutes"
 *      liee a la carte).
 *   3. Si non, envoie un mail de relance avec le lien du questionnaire et
 *      le lien du tableau de suivi, puis note l'envoi (pour ne jamais
 *      relancer 2 fois la meme etape pour la meme carte).
 *
 * Si la famille finit par remplir Tally avec une autre adresse e-mail que
 * celle de la reservation, la ligne "Donnees brutes" ne sera jamais liee a
 * la carte (Tally la cree comme une ligne a part, sans lien avec la carte
 * Trello) : la relance continuera donc d'etre envoyee tant que la ligne
 * d'origine reste vide. Voir verifierLigneTallyOrpheline() plus bas pour
 * un diagnostic manuel dans ce cas.
 */

// ============================================================
// A LANCER UNE SEULE FOIS MANUELLEMENT (bouton "Executer") : cree le
// declencheur quotidien qui verifie les relances a envoyer.
// ============================================================
function installerDeclencheurRelancesTally() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'envoyerRelancesQuestionnaireTally') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('envoyerRelancesQuestionnaireTally').timeBased().everyDays(1).atHour(9).create();
  Logger.log('Declencheur cree : la relance Tally sera verifiee chaque jour vers 9h (heure de Paris).');
}

// ============================================================
// Appelee automatiquement chaque jour par le declencheur.
// ============================================================
function envoyerRelancesQuestionnaireTally() {
  const verrou = LockService.getScriptLock();
  if (!verrou.tryLock(5000)) return;

  try {
    const cartes = _trelloCartesAVenir_();
    const maintenant = new Date();
    cartes.forEach(carte => {
      try {
        _traiterRelanceCarte_(carte, maintenant);
      } catch (err) {
        Logger.log('Erreur relance Tally (carte ' + carte.id + ') : ' + err.message);
      }
    });
  } finally {
    verrou.releaseLock();
  }
}

// ============================================================
// Cartes de "Consultations a venir", avec leur description (pour l'email et
// le lien du tableau) et leurs pieces jointes (pour retrouver la ligne
// "Donnees brutes" via le lien "Fiche - ..." qui contient "?client=NNN").
// ============================================================
function _trelloCartesAVenir_() {
  const url = 'https://api.trello.com/1/lists/' + TRELLO_LIST_A_VENIR + '/cards'
    + '?fields=name,desc,due'
    + '&attachments=true&attachment_fields=url'
    + '&key=' + TRELLO_API_KEY
    + '&token=' + TRELLO_TOKEN;

  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) {
    Logger.log('Erreur lecture des cartes "A venir" (' + response.getResponseCode() + ') : ' + response.getContentText());
    return [];
  }
  return JSON.parse(response.getContentText()) || [];
}

function _traiterRelanceCarte_(carte, maintenant) {
  if (!carte.due) return; // pas de date : rien a comparer

  const dateRdv = new Date(carte.due);
  const joursRestants = Math.ceil((dateRdv - maintenant) / (24 * 60 * 60 * 1000));

  let etape = null;
  if (joursRestants >= 0 && joursRestants <= 1) etape = 'J1';
  else if (joursRestants > 1 && joursRestants <= 3) etape = 'J3';
  if (!etape) return; // ni a 3 jours ni a 1 jour du rendez-vous

  if (_relanceDejaEnvoyee_(carte.id, etape)) return;

  const desc = carte.desc || '';
  const matchEmail = desc.match(/^Email\s*:\s*(\S+)/im);
  if (!matchEmail) return; // pas d'email exploitable sur cette carte
  const email = matchEmail[1].replace(/[,;.]+$/, '');

  const ligneFiche = _ligneFicheDepuisAttachments_(carte.attachments);
  if (_questionnaireTallyRempli_(ligneFiche)) return; // deja rempli : pas de relance

  const dateTexte = _trelloFormaterDate_(carte.due);
  const lienTableau = _recupererLienTableauExistant_(desc);

  // Marque l'envoi AVANT d'envoyer (comme pour les mails post-consultation) :
  // si l'execution echoue en cours de route, on ne relance jamais 2 fois.
  _marquerRelanceEnvoyee_(carte.id, etape);
  const envoye = _envoyerRelanceTally_(email, etape, dateTexte, lienTableau);
  if (!envoye) _oublierRelance_(carte.id, etape);

  const noteTableau = lienTableau ? '' : ' Tableau de suivi introuvable dans le dossier Drive : lien omis.';
  _trelloAjouterCommentaire_(
    carte.id,
    envoye
      ? 'Relance automatique questionnaire Tally (' + etape + ') envoyee a ' + email + '.' + noteTableau
      : 'Erreur : la relance automatique (' + etape + ') n\'a pas pu etre envoyee a ' + email + ' (voir les journaux d\'execution).'
  );
}

// ============================================================
// Retrouve, parmi les pieces jointes d'une carte, le lien "Fiche - ..."
// (de la forme URL_APPLICATION_WEB + "?client=NNN") et renvoie NNN, le
// numero de ligne dans "Donnees brutes". Null si introuvable.
// ============================================================
function _ligneFicheDepuisAttachments_(attachments) {
  const piece = (attachments || []).find(a => /[?&]client=(\d+)/.test(a.url || ''));
  if (!piece) return null;
  const match = piece.url.match(/[?&]client=(\d+)/);
  return match ? Number(match[1]) : null;
}

// ============================================================
// Vrai si la ligne "Donnees brutes" contient au moins une reponse a une
// question posee UNIQUEMENT par Tally (jamais ecrite par la ligne brouillon
// creee des la reservation payee, voir assurerLigneDonneesBrutesPourReservation_
// dans Sheet.gs) — preuve que le questionnaire a bien ete rempli.
// ============================================================
function _questionnaireTallyRempli_(ligne) {
  if (!ligne) return false;
  try {
    const sheet = _getSheet_();
    const { keys } = _getHeaders_(sheet);
    const clesUniquementTally = [KEY_TYPE_LAIT, 'VEILLEUSE', 'REGIME_GROSSESSE'];
    return clesUniquementTally.some(cle => {
      const col = _keyIndex_(keys, cle);
      if (col === -1) return false;
      const valeur = sheet.getRange(ligne, col + 1).getValue();
      return String(valeur || '').trim() !== '';
    });
  } catch (err) {
    Logger.log('Erreur verification questionnaire Tally (ligne ' + ligne + ') : ' + err.message);
    return false; // par prudence : en cas de doute, on relance quand meme
  }
}

// ============================================================
// Anti-doublon : une etape ('J3' ou 'J1') n'est jamais envoyee 2 fois pour
// la meme carte, meme si le declencheur tourne plusieurs jours de suite
// avant le rendez-vous.
// ============================================================
function _relanceDejaEnvoyee_(carteId, etape) {
  const marques = JSON.parse(PropertiesService.getScriptProperties().getProperty('RELANCE_TALLY_ENVOYEES') || '{}');
  return !!marques[carteId + '|' + etape];
}

function _marquerRelanceEnvoyee_(carteId, etape) {
  const props = PropertiesService.getScriptProperties();
  const marques = JSON.parse(props.getProperty('RELANCE_TALLY_ENVOYEES') || '{}');
  const maintenant = Date.now();
  const quaranteJours = 40 * 24 * 60 * 60 * 1000;
  Object.keys(marques).forEach(cle => {
    if (maintenant - marques[cle] > quaranteJours) delete marques[cle];
  });
  marques[carteId + '|' + etape] = maintenant;
  props.setProperty('RELANCE_TALLY_ENVOYEES', JSON.stringify(marques));
}

function _oublierRelance_(carteId, etape) {
  const props = PropertiesService.getScriptProperties();
  const marques = JSON.parse(props.getProperty('RELANCE_TALLY_ENVOYEES') || '{}');
  delete marques[carteId + '|' + etape];
  props.setProperty('RELANCE_TALLY_ENVOYEES', JSON.stringify(marques));
}

// ============================================================
// Construit et envoie le mail de relance. Renvoie true si l'envoi a reussi.
// `prefixeSujet` sert uniquement a l'apercu ("[APERCU J3] ").
// ============================================================
function _envoyerRelanceTally_(email, etape, dateTexte, lienTableau, prefixeSujet) {
  const mail = _construireMailRelanceTally_(etape, dateTexte, lienTableau);
  const logo = _logoSignatureMail_();
  const adresseCopie = 'sophie@latribudesreveurs.fr';

  const options = {
    to: email,
    subject: (prefixeSujet || '') + mail.sujet,
    htmlBody: mail.htmlBody + logo.html,
    name: 'Sophie - La Tribu des Rêveurs',
    from: 'sophie@latribudesreveurs.fr'
  };
  if (email !== adresseCopie) options.bcc = adresseCopie;
  if (logo.inlineImages) options.inlineImages = logo.inlineImages;

  try {
    MailApp.sendEmail(options);
    Logger.log('Relance Tally (' + etape + ') envoyee a ' + email);
    return true;
  } catch (err) {
    Logger.log('Erreur envoi relance Tally (' + etape + ') a ' + email + ' : ' + err.message);
    return false;
  }
}

function _construireMailRelanceTally_(etape, dateTexte, lienTableau) {
  const lienTableauLigne = lienTableau
    ? '<li>👉 <a href="' + lienTableau + '">Votre tableau de suivi</a></li>'
    : '';

  const phraseDate = etape === 'J1'
    ? 'Votre rendez-vous a lieu <strong>demain, le ' + dateTexte + '</strong>.'
    : 'Votre rendez-vous approche : il aura lieu le <strong>' + dateTexte + '</strong>.';

  const sujet = etape === 'J1'
    ? 'Votre rendez-vous est demain : pensez au questionnaire et au tableau de suivi du sommeil - La Tribu des Rêveurs'
    : 'Votre rendez-vous approche : pensez au questionnaire et au tableau de suivi du sommeil - La Tribu des Rêveurs';

  const htmlBody =
    '<p>Bonjour,</p>' +
    '<p>' + phraseDate + '</p>' +
    '<p>Je me permets un petit rappel au sujet du questionnaire et du tableau du sommeil transmis lors de la réservation. Pourriez-vous, s\'il vous plaît, les remplir en amont de notre consultation afin de m\'aider à préparer au mieux notre échange et à consacrer le plus de temps possible aux solutions à mettre en place.</p>' +
    '<ul>' +
    '<li>👉 <a href="' + TALLY_QUESTIONNAIRE_URL + '">Lien vers le questionnaire</a></li>' +
    lienTableauLigne +
    '</ul>' +
    '<p>Si vous avez déjà rempli l\'un ou l\'autre, ou avec une autre adresse e-mail que celle de la réservation, ne tenez pas compte de ce message.</p>' +
    '<p>À bientôt,<br>Bien à vous,<br>Sophie</p>';

  return { sujet, htmlBody };
}

// ============================================================
// A LANCER MANUELLEMENT pour verifier le rendu : t'envoie les 2 mails
// (J-3 et J-1) a toi-meme, avec des infos et des liens factices, sans
// toucher a aucune famille ni marquer aucune carte.
// ============================================================
function envoyerApercusRelancesTally() {
  const moi = Session.getEffectiveUser().getEmail();
  const lienTableauFactice = 'https://docs.google.com/spreadsheets';
  ['J3', 'J1'].forEach(etape => {
    _envoyerRelanceTally_(moi, etape, '15/10/2026 10:00', lienTableauFactice, '[APERCU ' + etape + '] ');
  });
}
