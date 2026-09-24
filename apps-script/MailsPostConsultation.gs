/**
 * MailsPostConsultation.gs — mails envoyes au parent APRES une consultation
 * (1ere consultation, 1ere consultation + APLV, suivi, bilan).
 *
 * Declenchement : depuis Trello, via des boutons "Automatisations" (Butler)
 * qui postent un commentaire sur la carte, de la forme :
 *   MAIL_AUTOMATIQUE: initiale | initiale_aplv | suivi | bilan
 * Un declencheur horaire (toutes les minutes, voir
 * installerDeclencheurMailsTrello) repere ces commentaires et envoie le mail
 * correspondant a l'adresse "Email :" de la carte.
 */

const CALCOM_SUIVI_45_URL = 'https://cal.com/sophie-hg9fan/rdv-consultation-de-suivi-45min';
const HAS_APLV_URL = 'https://www.has-sante.fr/upload/docs/application/pdf/2024-03/arbre_decisionnel_de_prise_en_charge_du_reflux_gastro-oesophagien_chez_lenfant_de_moins_de_un_an.pdf';

const MAIL_TRELLO_PREFIXE = 'MAIL_AUTOMATIQUE:';
const MAIL_TRELLO_TYPES = ['initiale', 'initiale_aplv', 'suivi', 'bilan'];

// ============================================================
// A LANCER UNE SEULE FOIS MANUELLEMENT (bouton "Executer") : cree le
// declencheur horaire qui surveille les commentaires "MAIL_AUTOMATIQUE:".
// ============================================================
function installerDeclencheurMailsTrello() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'traiterDemandesMailTrello') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('traiterDemandesMailTrello').timeBased().everyMinutes(1).create();
  PropertiesService.getScriptProperties().setProperty('MAIL_TRELLO_DERNIER_CHECK', new Date().toISOString());
  Logger.log('Declencheur cree : les commentaires MAIL_AUTOMATIQUE: posts a partir de maintenant seront traites (delai : environ 1 minute).');
}

// ============================================================
// Appelee automatiquement toutes les minutes par le declencheur.
// ============================================================
function traiterDemandesMailTrello() {
  const verrou = LockService.getScriptLock();
  if (!verrou.tryLock(5000)) return;

  try {
    const props = PropertiesService.getScriptProperties();
    const debutExecution = new Date();
    const dernierCheck = props.getProperty('MAIL_TRELLO_DERNIER_CHECK');
    if (!dernierCheck) {
      props.setProperty('MAIL_TRELLO_DERNIER_CHECK', debutExecution.toISOString());
      return;
    }

    const url = 'https://api.trello.com/1/boards/' + TRELLO_BOARD_ID + '/actions'
      + '?filter=commentCard&limit=100'
      + '&since=' + encodeURIComponent(dernierCheck)
      + '&key=' + TRELLO_API_KEY
      + '&token=' + TRELLO_TOKEN;
    const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    if (response.getResponseCode() !== 200) {
      Logger.log('Erreur lecture commentaires Trello (' + response.getResponseCode() + ') : ' + response.getContentText());
      return;
    }

    const idsTraites = JSON.parse(props.getProperty('MAIL_TRELLO_IDS_TRAITES') || '[]');
    const demandes = (JSON.parse(response.getContentText()) || [])
      .filter(a => a.data && a.data.text && String(a.data.text).trim().indexOf(MAIL_TRELLO_PREFIXE) === 0)
      .filter(a => idsTraites.indexOf(a.id) === -1)
      .reverse(); // plus ancien d'abord

    demandes.forEach(action => {
      // Marque comme traite AVANT d'envoyer, pour ne jamais envoyer 2 fois
      // le meme mail meme si l'execution s'interrompt en route.
      idsTraites.push(action.id);
      props.setProperty('MAIL_TRELLO_IDS_TRAITES', JSON.stringify(idsTraites.slice(-100)));
      try {
        _traiterDemandeMailTrello_(action);
      } catch (err) {
        Logger.log('Erreur traitement demande mail (action ' + action.id + ') : ' + err.message);
        if (action.data.card && action.data.card.id) {
          _trelloAjouterCommentaire_(action.data.card.id, 'Erreur envoi mail automatique : ' + err.message);
        }
      }
    });

    // Leger chevauchement d'une fenetre a l'autre : les doublons sont
    // ecartes par la liste des ids deja traites.
    props.setProperty('MAIL_TRELLO_DERNIER_CHECK', new Date(debutExecution.getTime() - 2 * 60 * 1000).toISOString());
  } finally {
    verrou.releaseLock();
  }
}

function _traiterDemandeMailTrello_(action) {
  const carteId = action.data.card && action.data.card.id;
  if (!carteId) return;

  const type = String(action.data.text).trim().substring(MAIL_TRELLO_PREFIXE.length).trim().toLowerCase();
  if (MAIL_TRELLO_TYPES.indexOf(type) === -1) {
    _trelloAjouterCommentaire_(carteId, 'Mail automatique non envoye : type "' + type + '" inconnu (types possibles : ' + MAIL_TRELLO_TYPES.join(', ') + ').');
    return;
  }

  // Anti-doublon : un double clic (ou un bouton qui poste le commentaire
  // plusieurs fois) ne doit pas envoyer plusieurs fois le meme mail a la
  // famille. Meme carte + meme type dans les 10 minutes = ignore.
  const props = PropertiesService.getScriptProperties();
  const cleEnvoi = carteId + '|' + type;
  const maintenant = Date.now();
  const derniersEnvois = JSON.parse(props.getProperty('MAIL_TRELLO_DERNIERS_ENVOIS') || '{}');
  Object.keys(derniersEnvois).forEach(k => {
    if (maintenant - derniersEnvois[k] > 60 * 60 * 1000) delete derniersEnvois[k];
  });
  if (derniersEnvois[cleEnvoi] && maintenant - derniersEnvois[cleEnvoi] < 10 * 60 * 1000) {
    Logger.log('Demande de mail "' + type + '" ignoree (doublon, deja traitee il y a moins de 10 minutes) pour la carte ' + carteId);
    return;
  }
  derniersEnvois[cleEnvoi] = maintenant;
  props.setProperty('MAIL_TRELLO_DERNIERS_ENVOIS', JSON.stringify(derniersEnvois));

  const getResponse = UrlFetchApp.fetch(
    'https://api.trello.com/1/cards/' + carteId + '?fields=desc&key=' + TRELLO_API_KEY + '&token=' + TRELLO_TOKEN,
    { muteHttpExceptions: true }
  );
  // En cas d'echec, on libere le verrou anti-doublon pour pouvoir reessayer.
  const oublierEnvoi = () => {
    const courant = JSON.parse(props.getProperty('MAIL_TRELLO_DERNIERS_ENVOIS') || '{}');
    delete courant[cleEnvoi];
    props.setProperty('MAIL_TRELLO_DERNIERS_ENVOIS', JSON.stringify(courant));
  };

  if (getResponse.getResponseCode() !== 200) {
    oublierEnvoi();
    throw new Error('lecture de la carte impossible (' + getResponse.getResponseCode() + ')');
  }
  const desc = JSON.parse(getResponse.getContentText()).desc || '';

  const matchEmail = desc.match(/^Email\s*:\s*(\S+)/im);
  if (!matchEmail) {
    oublierEnvoi();
    _trelloAjouterCommentaire_(carteId, 'Mail automatique non envoye : aucune ligne "Email :" trouvee dans la description de la carte.');
    return;
  }
  const email = matchEmail[1].replace(/[,;.]+$/, '');

  const liens = _trouverLiensDossierFamille_(desc);
  const envoye = _envoyerMailPostConsultation_(email, type, liens, '');

  let compteRendu = '';
  if (!liens.compteRenduUrl) compteRendu += ' Compte-rendu introuvable dans le dossier Drive : ligne omise.';
  if (!liens.tableauUrl) compteRendu += ' Tableau de suivi introuvable dans le dossier Drive : ligne omise.';
  _trelloAjouterCommentaire_(
    carteId,
    envoye
      ? 'Mail automatique envoye (' + type + ') a ' + email + '.' + compteRendu + ' Carte deplacee vers Archives.'
      : 'Erreur : le mail automatique (' + type + ') n\'a pas pu etre envoye a ' + email + ' (voir les journaux d\'execution).'
  );

  // Seulement si le mail est bien parti : la carte passe dans "Archives" et
  // sa date limite est cochee (tick vert + date verte). Si la famille
  // reserve a nouveau, creerOuMettreAJourCarteTrello remet la carte dans
  // "Consultations a venir" avec une date non cochee.
  if (envoye) _trelloArchiverCarteApresMail_(carteId);
  else oublierEnvoi();
}

// ============================================================
// Deplace la carte vers "Archives" et coche sa date limite ("dueComplete" :
// c'est ce qui affiche le tick vert et la date en vert dans Trello).
// ============================================================
function _trelloArchiverCarteApresMail_(carteId) {
  const url = 'https://api.trello.com/1/cards/' + carteId
    + '?key=' + TRELLO_API_KEY
    + '&token=' + TRELLO_TOKEN
    + '&idList=' + encodeURIComponent(TRELLO_LIST_ARCHIVES)
    + '&dueComplete=true';
  const response = UrlFetchApp.fetch(url, { method: 'put', muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) {
    Logger.log('Erreur archivage carte apres mail (' + response.getResponseCode() + ') : ' + response.getContentText());
  }
}

// ============================================================
// Dans le dossier Drive de la famille (ligne "Dossier :" de la carte),
// retrouve le tableau de suivi et le compte-rendu. Le compte-rendu est
// repere par son nom (contient "compte-rendu" / "compte rendu") : a ajuster
// ici si la convention de nommage change. Le plus recent est retenu s'il y
// en a plusieurs. Renvoie { tableauUrl, compteRenduUrl } (null si absent).
// ============================================================
function _trouverLiensDossierFamille_(descCarte) {
  const resultat = { tableauUrl: null, compteRenduUrl: null };
  const matchDossier = (descCarte || '').match(/Dossier\s*:\s*(\S+)/i);
  if (!matchDossier) return resultat;
  const matchId = matchDossier[1].match(/[-\w]{25,}/);
  if (!matchId) return resultat;

  try {
    const fichiers = DriveApp.getFolderById(matchId[0]).getFiles();
    let dateCompteRendu = 0;
    while (fichiers.hasNext()) {
      const fichier = fichiers.next();
      const nom = fichier.getName();
      if (nom.indexOf('Tableau de suivi du sommeil') === 0) {
        resultat.tableauUrl = fichier.getUrl();
      } else if (/compte[-\s]?rendu/i.test(nom)) {
        const modifie = fichier.getLastUpdated().getTime();
        if (modifie > dateCompteRendu) {
          dateCompteRendu = modifie;
          resultat.compteRenduUrl = fichier.getUrl();
        }
      }
    }
  } catch (err) {
    Logger.log('Impossible de parcourir le dossier de la famille : ' + err.message);
  }
  return resultat;
}

// ============================================================
// Construit et envoie le mail. Renvoie true si l'envoi a reussi.
// `prefixeSujet` sert uniquement aux apercus ("[APERCU] ").
// ============================================================
function _envoyerMailPostConsultation_(email, type, liens, prefixeSujet) {
  const mail = _construireMailPostConsultation_(type, liens);
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
    Logger.log('Mail post-consultation (' + type + ') envoye a ' + email);
    return true;
  } catch (err) {
    Logger.log('Erreur envoi mail post-consultation (' + type + ') a ' + email + ' : ' + err.message);
    return false;
  }
}

function _construireMailPostConsultation_(type, liens) {
  const lienResa = '<a href="' + CALCOM_SUIVI_45_URL + '">Lien de réservation</a>';
  const signature = '<p>Bien à vous,<br>Sophie</p>';

  // Compte-rendu et tableau : chacun n'apparait que s'il a ete retrouve
  // dans le dossier Drive de la famille.
  const lienCompteRendu = liens.compteRenduUrl
    ? '<li>👉 <a href="' + liens.compteRenduUrl + '">Le compte-rendu de notre échange</a></li>'
    : '';
  const introLiens = (nbLiens) => nbLiens === 1 ? 'le lien' : 'les liens';
  const liste = (items) => items.length ? '<ul>' + items.join('') + '</ul>' : '';

  if (type === 'initiale' || type === 'initiale_aplv') {
    const items = [lienCompteRendu];
    if (liens.tableauUrl) {
      items.push('<li>👉 <a href="' + liens.tableauUrl + '">Votre tableau de suivi</a> : n\'hésitez pas à le compléter régulièrement, il permet de visualiser les rythmes et les petites victoires, et d\'ajuster les conseils au plus juste.</li>');
    }
    const puces = items.filter(Boolean);
    const suiteIntro = puces.length ? ' Pour vous y accompagner, vous trouverez ' + introLiens(puces.length) + ' vers :' : '';

    const paragrapheAplv = type === 'initiale_aplv'
      ? '<p>Comme convenu, voici aussi le lien vers l\'arbre décisionnel de la Haute Autorité de Santé (HAS), qui détaille le chemin sur la prise en charge en cas de suspicion d\'Allergie aux Protéines de lait de Vache (APLV) : <a href="' + HAS_APLV_URL + '">Lien vers l\'arbre décisionnel HAS</a></p>'
      : '';

    return {
      sujet: 'Suite à votre Première Consultation - La Tribu des Rêveurs',
      htmlBody:
        '<p>Bonjour,</p>' +
        '<p>Je vous remercie encore pour cet échange lors de notre Première consultation. Les pistes que nous avons vues ensemble pourront se mettre en place pas à pas, à votre rythme.' + suiteIntro + '</p>' +
        liste(puces) +
        paragrapheAplv +
        '<p>Je reste bien sûr disponible si besoin. Si vous souhaitez poursuivre ou ajuster les conseils lors d\'un rendez-vous de suivi, voici le lien : ' + lienResa + '</p>' +
        '<p>Vous faites déjà beaucoup, et je me suis avant tout appuyée sur ce que vous avez mis en place. Votre démarche montre que vous voulez le meilleur pour votre enfant : c\'est une belle base pour avancer. 😊</p>' +
        signature
    };
  }

  if (type === 'suivi') {
    const items = [lienCompteRendu];
    if (liens.tableauUrl) {
      items.push('<li>👉 <a href="' + liens.tableauUrl + '">Votre tableau de suivi</a> : n\'hésitez pas à continuer à le compléter, il donne du recul sur les évolutions, et aide à ajuster les conseils.</li>');
    }
    const puces = items.filter(Boolean);
    const suiteIntro = puces.length ? ' Pour vous aider à mettre en place les ajustements dont nous avons parlé, vous trouverez ' + introLiens(puces.length) + ' vers :' : '';

    return {
      sujet: 'Suite à votre consultation de suivi - La Tribu des Rêveurs',
      htmlBody:
        '<p>Bonjour,</p>' +
        '<p>Merci pour ce nouvel échange autour du sommeil de votre enfant.' + suiteIntro + '</p>' +
        liste(puces) +
        '<p>Les prochains jours permettront de voir l\'effet de ces ajustements, et nous pourrons, si vous le souhaitez, refaire le point ensemble lors d\'un prochain rendez-vous : ' + lienResa + '</p>' +
        '<p>Je vous souhaite de belles nuits et siestes, et de jolis moments en famille ! 😊</p>' +
        signature
    };
  }

  // bilan
  const blocCompteRendu = liens.compteRenduUrl
    ? '<p>Je vous laisse le compte-rendu de notre échange, qui reprend les points abordés ensemble :</p>' +
      '<ul><li>👉 <a href="' + liens.compteRenduUrl + '">Lien vers le compte-rendu</a></li></ul>'
    : '';
  return {
    sujet: 'Bilan de notre accompagnement - La Tribu des Rêveurs',
    htmlBody:
      '<p>Bonjour,</p>' +
      '<p>Notre accompagnement touche à sa fin, et je tenais à vous féliciter pour tout ce que vous avez accompli. 💪</p>' +
      blocCompteRendu +
      '<p>Vous pouvez tirer une vraie fierté de tout le chemin parcouru, pour vous comme pour votre enfant : ses siestes et ses nuits en sont la preuve.</p>' +
      '<p>Le sommeil de votre enfant continuera d\'évoluer avec son âge (poussées dentaires, changements de rythme, nouvelles étapes...), mais vous avez là de très bonnes bases pour continuer sur cette lancée. Si un jour vous en ressentez le besoin, vous pourrez reprendre rendez-vous : ' + lienResa + '</p>' +
      '<p>Encore bravo, et de belles nuits et siestes à toute la famille ! 😊</p>' +
      signature
  };
}

// ============================================================
// A LANCER MANUELLEMENT pour verifier le rendu : t'envoie les 4 mails a
// toi-meme (avec des liens factices), sans toucher a aucune famille.
// ============================================================
function envoyerApercusMailsPostConsultation() {
  const moi = Session.getEffectiveUser().getEmail();
  const liensFactices = {
    tableauUrl: 'https://docs.google.com/spreadsheets',
    compteRenduUrl: 'https://docs.google.com/document'
  };
  MAIL_TRELLO_TYPES.forEach(type => {
    _envoyerMailPostConsultation_(moi, type, liensFactices, '[APERCU ' + type + '] ');
  });
}
