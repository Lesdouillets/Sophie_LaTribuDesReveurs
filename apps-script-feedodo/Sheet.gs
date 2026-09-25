/**
 * Sheet.gs — accès générique au Google Sheet Tally.
 *
 * Structure du Sheet "Données brutes" :
 *   ligne 1 = clés techniques (ex: PRENOM_ENFANT) — vides pour les
 *             sous-colonnes de cases à cocher (une colonne par option)
 *   ligne 2 = texte de la question, TOUJOURS unique (sert de libellé d'affichage)
 *   ligne 3 = numéro d'ordre Tally (non utilisé)
 *   ligne 4+ = une ligne par client
 */

const HEADER_KEY_ROW = 1;
const HEADER_LABEL_ROW = 2;
const DATA_START_ROW = 4;

// Clés techniques (ligne 1) utilisées pour la personnalisation.
const KEY_CHILD_FIRSTNAME = 'PRENOM_ENFANT';
const KEY_CHILD_LASTNAME = 'NOM_ENFANT';
const KEY_PARENT1 = 'PRENOM_NOM_RESP1';
const KEY_PARENT2 = 'PRENOM_NOM_RESP2';
const KEY_SEXE_ENFANT = 'SEXE_ENFANT';
const KEY_DATE_NAISSANCE = 'DATE_NAISSANCE';
const KEY_DATE_TERME = 'DATE_TERME';
const KEY_POIDS_ACTUEL = 'POIDS_ACTUEL';
const KEY_TYPE_LAIT = 'TYPE_LAIT';
const KEY_FICHE_GENEREE = 'Fiche générée?'; // colonne de l'automatisation existante, ne pas modifier
const KEY_EMAIL = 'EMAIL';

// Résolution du géniteur 1 / géniteur 2 (peu importe père/mère — la formule de Tanner
// est symétrique), logique reprise telle quelle de la fiche client Excel existante.
const KEY_EST_PARENT_BIO_1 = 'EST_PARENT_BIO_1';
const KEY_EST_PARENT_BIO_2 = 'EST_PARENT_BIO_2';
const KEY_LEQUEL_PARENT_BIO = 'LEQUEL_PARENT_BIO';
const KEY_TAILLE_RESP1 = 'TAILLE_RESP1';
const KEY_TAILLE_RESP2 = 'TAILLE_RESP2';
const KEY_TAILLE_CAS_A = 'TAILLE_PARENT_BIO_CAS_A';
const KEY_TAILLE_CAS_B_N1 = 'TAILLE_PARENT_BIO_N1_CAS_B';
const KEY_TAILLE_CAS_B_N2 = 'TAILLE_PARENT_BIO_N2_CAS_B';
const KEY_TAILLE_CAS_C = 'TAILLE_PARENT_BIO_CAS_C';
const KEY_TAILLE_CAS_D_N1 = 'TAILLE_PARENT_BIO_N1_CAS_D';
const KEY_TAILLE_CAS_D_N2 = 'TAILLE_PARENT_BIO_N2_CAS_D';

// Saisie manuelle directe des tailles des 2 geniteurs (via le badge
// "Potentiel génétique"), prioritaire sur la logique de cas ci-dessus
// quand les 2 sont renseignees — pratique quand le questionnaire Tally
// n'a pas ete rempli ou pour une correction rapide en consultation.
const KEY_TAILLE_GENITEUR_MANUEL_1 = 'TAILLE_GENITEUR_MANUEL_1';
const KEY_TAILLE_GENITEUR_MANUEL_2 = 'TAILLE_GENITEUR_MANUEL_2';

// Champs texte simples editables directement depuis l'appli (voir
// updateTextField ci-dessous) — liste blanche par securite.
const EDITABLE_TEXT_FIELDS = [KEY_CHILD_FIRSTNAME, KEY_PARENT1, KEY_PARENT2];

// Nombre de mois calendaires pleins entre deux dates (null si to < from).
function _moisEntre_(from, to) {
  if (!(from instanceof Date) || !(to instanceof Date) || to < from) return null;
  let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  if (to.getDate() < from.getDate()) months--;
  return months;
}

// "7 mois et 4 jours" entre deux dates (comptage calendaire, pas juste des
// jours/30) ; à partir de 24 mois, bascule sur "X ans et Y mois" (les jours
// ne sont plus une granularité utile passé cet âge).
function _ageEnToutesLettres_(from, to) {
  if (!(from instanceof Date) || !(to instanceof Date) || to < from) return '';
  let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months--;
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
  }
  if (months >= 24) {
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    const parts = [years + (years > 1 ? ' ans' : ' an')];
    if (remMonths > 0) parts.push(remMonths + ' mois');
    return parts.join(' et ');
  }
  const parts = [];
  if (months > 0) parts.push(months + ' mois');
  if (days > 0 || months === 0) parts.push(days + (days > 1 ? ' jours' : ' jour'));
  return parts.join(' et ');
}

// Règle d'Appert : (poids en kg × 100) + 200 mL si poids < 6 kg, sinon + 250 mL, ± 100 mL.
// Ne s'applique qu'aux enfants de moins de 12 mois en âge corrigé (appelant à filtrer sur ageCorrigeMois).
function _regleAppert_(poidsKg) {
  if (typeof poidsKg !== 'number' || isNaN(poidsKg)) return '';
  const base = poidsKg < 6 ? 200 : 250;
  const volume = Math.round(poidsKg * 100 + base);
  return volume + ' mL';
}

// Tables de référence taille adulte (cm) → percentile, fournies par Sophie.
const PERCENTILE_TABLE_GARCON = {159:1,160:2,161:2,162:3,163:4,164:5,165:7,166:10,167:12,168:14,169:17,170:21,171:25,172:30,173:35,174:40,175:45,176:50,177:54,178:59,179:64,180:69,181:74,182:78,183:82,184:85,185:87,186:90,187:92,188:94,189:96,190:97,191:97,192:98,193:99};
const PERCENTILE_TABLE_FILLE = {148:1,149:2,150:3,151:4,152:5,153:7,154:10,155:12,156:15,157:18,158:23,159:27,160:33,161:38,162:44,163:49,164:55,165:61,166:66,167:72,168:77,169:81,170:85,171:88,172:90,173:93,174:95,175:96,176:97,177:98,178:99};

// Percentile correspondant à une taille cible adulte (cm), selon le sexe ('fille'/'garcon').
// Arrondit au cm le plus proche et cale sur les bornes de la table en dehors de sa plage.
function _percentileTaille_(tailleCm, sexe) {
  const table = sexe === 'fille' ? PERCENTILE_TABLE_FILLE : (sexe === 'garcon' ? PERCENTILE_TABLE_GARCON : null);
  if (!table || typeof tailleCm !== 'number' || isNaN(tailleCm)) return null;
  const cm = Math.round(tailleCm);
  const keys = Object.keys(table).map(Number);
  const min = Math.min.apply(null, keys), max = Math.max.apply(null, keys);
  const clamped = Math.min(Math.max(cm, min), max);
  return table[clamped];
}

// Reproduit exactement les formules B34/B35 de la fiche Excel existante.
function _genitorHeights_(keys, values) {
  const estBio1 = _fieldValue_(keys, values, KEY_EST_PARENT_BIO_1);
  const estBio2 = _fieldValue_(keys, values, KEY_EST_PARENT_BIO_2);
  const lequel = _fieldValue_(keys, values, KEY_LEQUEL_PARENT_BIO);
  const tailleResp1 = _fieldValue_(keys, values, KEY_TAILLE_RESP1);
  const tailleResp2 = _fieldValue_(keys, values, KEY_TAILLE_RESP2);
  const casA = _fieldValue_(keys, values, KEY_TAILLE_CAS_A);
  const casBn1 = _fieldValue_(keys, values, KEY_TAILLE_CAS_B_N1);
  const casBn2 = _fieldValue_(keys, values, KEY_TAILLE_CAS_B_N2);
  const casC = _fieldValue_(keys, values, KEY_TAILLE_CAS_C);
  const casDn1 = _fieldValue_(keys, values, KEY_TAILLE_CAS_D_N1);
  const casDn2 = _fieldValue_(keys, values, KEY_TAILLE_CAS_D_N2);

  const num = v => (typeof v === 'number' && !isNaN(v)) ? v : null;

  let genitor1 = null;
  if (estBio1 === 'Oui' || estBio2 === 'Oui, pour les 2 parents' || lequel === 'Le premier (responsable légal n°1)') {
    genitor1 = num(tailleResp1);
  } else if (num(casBn1) !== null) {
    genitor1 = num(casBn1);
  } else if (num(casDn1) !== null) {
    genitor1 = num(casDn1);
  }

  let genitor2 = null;
  if (estBio2 === 'Oui, pour les 2 parents' || lequel === 'Le second (responsable légal n°2)') {
    genitor2 = num(tailleResp2);
  } else if (num(casA) !== null) {
    genitor2 = num(casA);
  } else if (num(casBn2) !== null) {
    genitor2 = num(casBn2);
  } else if (num(casC) !== null) {
    genitor2 = num(casC);
  } else if (num(casDn2) !== null) {
    genitor2 = num(casDn2);
  }

  return { genitor1, genitor2 };
}

// Formule de Tanner : (géniteur1 + géniteur2) / 2 − 6,5 (fille) ou + 6,5 (garçon).
function _tailleCible_(genitor1, genitor2, sexe) {
  if (genitor1 == null || genitor2 == null || !sexe) return null;
  const avg = (genitor1 + genitor2) / 2;
  return sexe === 'fille' ? avg - 6.5 : avg + 6.5;
}

// Libellés raccourcis pour la chip "Alim. lactée" (les autres valeurs s'affichent telles quelles).
const ALIM_LACTEE_LABELS = {
  'Lait pédiatrique spécialisé exclusivement (lait aux protéines de riz, lait hydrolysé, lait aux acides aminés...)': 'Lait spécifique',
  'Mixte: Lait maternel (sein et/ou biberon) + lait pédiatrique': 'Maternel + pédiatrique',
  'Mixte: Lait maternel (sein et/ou biberon) + lait pédiatrique spécialisé': 'Maternel + lait spécifique'
};
function _alimLactee_(rawValue) {
  if (!rawValue) return '';
  return ALIM_LACTEE_LABELS[rawValue] || rawValue;
}

// Minuscules + sans accents, pour comparer des reponses Tally sans etre
// sensible a la casse ni aux accents.
function _sansAccentsMinuscules_(texte) {
  return String(texte || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

// Vrai si la reponse "Actuellement, votre enfant prend-il du lait" (TYPE_LAIT)
// designe un allaitement maternel EXCLUSIF : lait maternel/allaitement/sein
// mentionne, sans "mixte" ni lait pediatrique/specifique.
function _estAllaitementExclusif_(typeLait) {
  const t = _sansAccentsMinuscules_(typeLait);
  if (!t) return false;
  const maternel = t.indexOf('maternel') !== -1 || t.indexOf('allaitement') !== -1 || t.indexOf('sein') !== -1;
  const autreLait = t.indexOf('mixte') !== -1 || t.indexOf('pediatrique') !== -1
    || t.indexOf('specifique') !== -1 || t.indexOf('specialise') !== -1;
  return maternel && !autreLait;
}

// Vrai si la reponse commence par "Non" (ex: "Non", "Non, pas a ma connaissance").
function _reponseEstNon_(valeur) {
  return /^non\b/.test(_sansAccentsMinuscules_(valeur));
}

// Vrai si la reponse commence par "Oui" (ex: "Oui", "Oui, ...").
function _reponseEstOui_(valeur) {
  return /^oui\b/.test(_sansAccentsMinuscules_(valeur));
}

function _sexeCode_(rawValue) {
  const v = String(rawValue || '').toLowerCase();
  if (v.indexOf('fille') !== -1) return 'fille';
  if (v.indexOf('garçon') !== -1 || v.indexOf('garcon') !== -1) return 'garcon';
  return '';
}

function _getSheet_() {
  if (!SHEET_ID) {
    throw new Error('SHEET_ID non renseigné dans Config.gs — colle l\'ID de ton Google Sheet Tally.');
  }
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
  if (!sheet) {
    throw new Error('Onglet "' + SHEET_NAME + '" introuvable dans le Sheet. Vérifie SHEET_NAME dans Config.gs.');
  }
  return sheet;
}

// { keys: [...], labels: [...] } — même longueur, alignées par colonne.
function _getHeaders_(sheet) {
  const lastCol = sheet.getLastColumn();
  const keys = sheet.getRange(HEADER_KEY_ROW, 1, 1, lastCol).getValues()[0].map(h => String(h).trim());
  const labels = sheet.getRange(HEADER_LABEL_ROW, 1, 1, lastCol).getValues()[0].map(h => String(h).trim());
  return { keys, labels };
}

function _keyIndex_(keys, key) {
  return keys.indexOf(key);
}

// Renvoie l'index (0-based) de la colonne `name`, en la créant en fin de
// Sheet (avec en-tête ligne 1 + ligne 2) si elle n'existe pas encore.
function _ensureColumn_(sheet, keys, name) {
  let idx = keys.indexOf(name);
  if (idx === -1) {
    const col = keys.length + 1;
    sheet.getRange(HEADER_KEY_ROW, col).setValue(name);
    sheet.getRange(HEADER_LABEL_ROW, col).setValue(name);
    keys.push(name);
    idx = keys.length - 1;
  }
  return idx;
}

function _readJsonColumn_(keys, values, name) {
  const idx = _keyIndex_(keys, name);
  const raw = idx >= 0 ? values[idx] : '';
  if (!raw) return {};
  try { return JSON.parse(raw); } catch (e) { return {}; }
}

// ============================================================
// Cree (si absente) une ligne "brouillon" dans "Donnees brutes" des la
// reservation payee sur Cal.com, avec les quelques infos deja connues, pour
// donner tout de suite un numero de ligne utilisable pour le lien "Fiche"
// (webapp) sur Trello — meme si le questionnaire Tally n'est pas encore
// rempli (voir TrelloWebhook.gs, _creerDossierEtTableauSuivi_). Si une
// ligne existe deja pour cet email (Tally deja rempli avant la reservation,
// ou reservation de suivi d'une famille existante), on ne cree rien et on
// renvoie son numero de ligne existant.
// ============================================================
function assurerLigneDonneesBrutesPourReservation_(email, infos, nomParentComplet) {
  if (!email) return null;
  const sheet = _getSheet_();
  const { keys } = _getHeaders_(sheet);
  const emailCol = _keyIndex_(keys, KEY_EMAIL);
  if (emailCol === -1) {
    Logger.log('Colonne EMAIL introuvable dans "' + SHEET_NAME + '", ligne brouillon non creee.');
    return null;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow >= DATA_START_ROW) {
    const emails = sheet.getRange(DATA_START_ROW, emailCol + 1, lastRow - DATA_START_ROW + 1, 1).getValues();
    const emailLower = String(email).toLowerCase();
    for (let i = 0; i < emails.length; i++) {
      if (String(emails[i][0]).toLowerCase() === emailLower) {
        return DATA_START_ROW + i; // ligne existante (Tally deja rempli, ou suivi)
      }
    }
  }

  const newRow = Math.max(lastRow + 1, DATA_START_ROW);
  const ecrire = (key, valeur) => {
    if (!valeur) return;
    const col = _keyIndex_(keys, key);
    if (col !== -1) sheet.getRange(newRow, col + 1).setValue(valeur);
  };
  ecrire(KEY_EMAIL, email);
  ecrire(KEY_CHILD_FIRSTNAME, infos.prenomEnfant);
  ecrire(KEY_PARENT1, nomParentComplet);
  ecrire(KEY_DATE_NAISSANCE, infos.dateNaissance);
  ecrire(KEY_DATE_TERME, infos.dateTerme);

  Logger.log('Ligne brouillon creee dans "' + SHEET_NAME + '" (ligne ' + newRow + ') pour ' + email);
  return newRow;
}

/**
 * Liste des clients pour le sélecteur : [{ rowIndex, label }]
 * rowIndex = numéro de ligne réel dans le Sheet (sert de clé stable).
 */
function getClients() {
  const sheet = _getSheet_();
  const { keys } = _getHeaders_(sheet);
  const lastRow = sheet.getLastRow();
  if (lastRow < DATA_START_ROW) return [];

  const childCol = _keyIndex_(keys, KEY_CHILD_FIRSTNAME);
  const p1Col = _keyIndex_(keys, KEY_PARENT1);
  const p2Col = _keyIndex_(keys, KEY_PARENT2);

  const data = sheet.getRange(DATA_START_ROW, 1, lastRow - DATA_START_ROW + 1, keys.length).getValues();

  return data
    .map((row, i) => {
      const child = childCol >= 0 ? row[childCol] : '';
      const p1 = p1Col >= 0 ? row[p1Col] : '';
      const p2 = p2Col >= 0 ? row[p2Col] : '';
      const label = [child, [p1, p2].filter(Boolean).join(' & ')].filter(Boolean).join(' — ');
      return label ? { rowIndex: DATA_START_ROW + i, label: label } : null;
    })
    .filter(Boolean);
}

// Parse une date "YYYY-MM-DD" (valeur d'un <input type="date">) en objet
// Date local (midnight), pour éviter le décalage d'1 jour d'un parsing UTC.
function _parseIsoDate_(iso) {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

/**
 * Correction manuelle de la date de naissance et/ou de la date de terme
 * (écrit directement dans les colonnes brutes du questionnaire) : l'âge réel,
 * l'âge corrigé et tout ce qui en dépend (règle d'Appert...) sont recalculés
 * automatiquement au rechargement du client.
 */
function updateChildDates(rowIndex, dateNaissance, dateTerme) {
  const sheet = _getSheet_();
  const { keys } = _getHeaders_(sheet);
  const colNaissance = _ensureColumn_(sheet, keys, KEY_DATE_NAISSANCE) + 1;
  const colTerme = _ensureColumn_(sheet, keys, KEY_DATE_TERME) + 1;

  const parsedNaissance = _parseIsoDate_(dateNaissance);
  if (parsedNaissance) sheet.getRange(rowIndex, colNaissance).setValue(parsedNaissance);

  const parsedTerme = _parseIsoDate_(dateTerme);
  if (parsedTerme) sheet.getRange(rowIndex, colTerme).setValue(parsedTerme);

  return getClientData(rowIndex);
}

/**
 * Modifie un champ texte simple (prénom enfant, nom d'un parent), depuis
 * l'appli. Restreint à EDITABLE_TEXT_FIELDS par sécurité.
 */
function updateTextField(rowIndex, key, value) {
  if (EDITABLE_TEXT_FIELDS.indexOf(key) === -1) {
    throw new Error('Champ non autorisé : ' + key);
  }
  const sheet = _getSheet_();
  const { keys } = _getHeaders_(sheet);
  const col = _ensureColumn_(sheet, keys, key) + 1;
  sheet.getRange(rowIndex, col).setValue(value);
  return getClientData(rowIndex);
}

/**
 * Modifie le poids actuel de l'enfant (kg), depuis l'appli.
 */
function updateWeight(rowIndex, poidsKg) {
  const sheet = _getSheet_();
  const { keys } = _getHeaders_(sheet);
  const col = _ensureColumn_(sheet, keys, KEY_POIDS_ACTUEL) + 1;
  const n = Number(String(poidsKg).replace(',', '.'));
  sheet.getRange(rowIndex, col).setValue(isNaN(n) ? '' : n);
  return getClientData(rowIndex);
}

/**
 * Modifie directement les tailles des 2 géniteurs (cm), depuis le badge
 * "Potentiel génétique" de l'appli — prend le pas sur la logique de cas
 * du questionnaire dès que les 2 valeurs sont renseignées.
 */
function updateGenitorHeightsManuel(rowIndex, taille1, taille2) {
  const sheet = _getSheet_();
  const { keys } = _getHeaders_(sheet);
  const col1 = _ensureColumn_(sheet, keys, KEY_TAILLE_GENITEUR_MANUEL_1) + 1;
  const col2 = _ensureColumn_(sheet, keys, KEY_TAILLE_GENITEUR_MANUEL_2) + 1;
  const n1 = Number(String(taille1).replace(',', '.'));
  const n2 = Number(String(taille2).replace(',', '.'));
  sheet.getRange(rowIndex, col1).setValue(isNaN(n1) ? '' : n1);
  sheet.getRange(rowIndex, col2).setValue(isNaN(n2) ? '' : n2);
  return getClientData(rowIndex);
}

/**
 * Cherche, sur Trello, si la famille (par email) a actuellement une
 * consultation de suivi 45 min en cours (label "Suivi 45"), et renvoie sa
 * date. Utilise les identifiants Trello et fonctions déjà définis dans
 * TrelloWebhook.gs (même projet Apps Script, même Script Properties).
 * best-effort : ne fait jamais échouer getClientData en cas d'erreur Trello.
 */
// Historique de TOUTES les consultations de suivi (30 min ET 45 min, sans
// distinction), reconstruit a partir des commentaires deja ajoutes sur la
// carte Trello par TrelloWebhook.gs : une reservation ("Nouvelle reservation
// payee : ... le JJ/MM/AAAA HH:mm") cree une entree, sauf si une annulation
// ("Reservation annulee : ... prevue le JJ/MM/AAAA HH:mm") existe pour la
// MEME date/heure — ce suivi n'apparait alors ni dans l'appli ni dans la
// fiche. On ne stocke rien de nouveau : Trello sert deja de source de verite.
// Renvoie un tableau trie chronologiquement (plus ancienne en 1er) :
// [{ id: 'suivi_1', date: 'JJ/MM/AAAA' }, ...].
function _getHistoriqueSuivis_(email) {
  if (!email) return [];
  try {
    const carte = _trelloTrouverCarteParEmail_(email);
    if (!carte) return [];

    const url = 'https://api.trello.com/1/cards/' + carte.id + '/actions'
      + '?filter=commentCard'
      + '&fields=data,date'
      + '&key=' + TRELLO_API_KEY
      + '&token=' + TRELLO_TOKEN;
    const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    if (response.getResponseCode() !== 200) return [];

    const actions = JSON.parse(response.getContentText()) || [];
    const reservations = [];
    const annulees = [];
    actions.forEach(a => {
      const texte = a.data && a.data.text;
      if (!texte) return;

      const mReservation = /^Nouvelle reservation payee : (.+) le (\d{2}\/\d{2}\/\d{4}) \d{2}:\d{2}$/.exec(texte);
      if (mReservation) {
        // Compte tout suivi (30 min OU 45 min) sans distinction, seule la
        // toute 1ere consultation (Initiale, jamais commentee) n'est pas comptee.
        const type = mReservation[1].toLowerCase();
        if (type.indexOf('30') !== -1 || type.indexOf('45') !== -1) reservations.push(mReservation[2]);
        return;
      }

      const mAnnulation = /^Reservation annulee : .+ prevue le (\d{2}\/\d{2}\/\d{4}) \d{2}:\d{2}$/.exec(texte);
      if (mAnnulation) annulees.push(mAnnulation[1]);
    });

    const dates = reservations.filter(d => annulees.indexOf(d) === -1);

    dates.sort((d1, d2) => {
      const [j1, mo1, a1] = d1.split('/').map(Number);
      const [j2, mo2, a2] = d2.split('/').map(Number);
      return new Date(a1, mo1 - 1, j1) - new Date(a2, mo2 - 1, j2);
    });

    return dates.map((date, i) => ({ id: 'suivi_' + (i + 1), date: date }));
  } catch (e) {
    Logger.log('Erreur historique suivis : ' + e.message);
    return [];
  }
}

/**
 * Toutes les valeurs d'une ligne client, avec libellés (ligne 2) et
 * métadonnées de personnalisation.
 */
function getClientData(rowIndex) {
  const sheet = _getSheet_();
  const { keys, labels } = _getHeaders_(sheet);
  const values = sheet.getRange(rowIndex, 1, 1, keys.length).getValues()[0];

  const skipColumns = [QUESTIONS_COLUMN, REFLEXIONS_COLUMN, ANNOTATIONS_COLUMN];
  const fields = []; // [{ label, value }], dans l'ordre des colonnes du Sheet
  for (let i = 0; i < keys.length; i++) {
    if (skipColumns.indexOf(keys[i]) !== -1 || labels[i] === KEY_FICHE_GENEREE) continue;
    let val = values[i];
    if (val === '' || val === null || val === undefined) continue;
    if (val instanceof Date) val = Utilities.formatDate(val, Session.getScriptTimeZone(), 'dd/MM/yyyy');
    fields.push({ label: labels[i] || keys[i] || ('Colonne ' + (i + 1)), value: val });
  }

  const questionsIdx = _keyIndex_(keys, QUESTIONS_COLUMN);
  const reflexionsIdx = _keyIndex_(keys, REFLEXIONS_COLUMN);

  const naissance = _fieldValue_(keys, values, KEY_DATE_NAISSANCE);
  const terme = _fieldValue_(keys, values, KEY_DATE_TERME);
  const today = new Date();
  const ageCorrigeMois = _moisEntre_(terme, today);
  const poids = _fieldValue_(keys, values, KEY_POIDS_ACTUEL);
  const sexe = _sexeCode_(_fieldValue_(keys, values, KEY_SEXE_ENFANT));

  const manuel1 = _fieldValue_(keys, values, KEY_TAILLE_GENITEUR_MANUEL_1);
  const manuel2 = _fieldValue_(keys, values, KEY_TAILLE_GENITEUR_MANUEL_2);
  const aSaisieManuelle = typeof manuel1 === 'number' && typeof manuel2 === 'number';
  const { genitor1, genitor2 } = aSaisieManuelle
    ? { genitor1: manuel1, genitor2: manuel2 }
    : _genitorHeights_(keys, values);
  const tailleCible = _tailleCible_(genitor1, genitor2, sexe);
  const percentile = tailleCible !== null ? _percentileTaille_(tailleCible, sexe) : null;

  const computed = {
    sexe: sexe,
    ageReel: _ageEnToutesLettres_(naissance, today),
    ageCorrige: _ageEnToutesLettres_(terme, today),
    ageCorrigeMois: ageCorrigeMois,
    poids: typeof poids === 'number' ? poids : null,
    regleAppert: (ageCorrigeMois !== null && ageCorrigeMois < 12) ? _regleAppert_(poids) : '',
    tailleCible: tailleCible !== null ? Math.round(tailleCible * 10) / 10 : null,
    percentile: percentile,
    genitorManuel1: typeof manuel1 === 'number' ? manuel1 : null,
    genitorManuel2: typeof manuel2 === 'number' ? manuel2 : null,
    suivisHistorique: _getHistoriqueSuivis_(_fieldValue_(keys, values, 'EMAIL')),
    // ID Drive de la fiche client (colonne remplie une fois par
    // genererFichesClients a la creation) : evite de retrouver la fiche par
    // recherche de nom, fragile des qu'un prenom est modifie apres coup.
    ficheSpreadsheetId: _fieldValue_(keys, values, 'FICHE_SPREADSHEET_ID') || null
  };

  return Object.assign({
    rowIndex: rowIndex,
    fields: fields,
    childName: _fieldValue_(keys, values, KEY_CHILD_FIRSTNAME),
    parent1: _fieldValue_(keys, values, KEY_PARENT1),
    parent2: _fieldValue_(keys, values, KEY_PARENT2),
    questions: questionsIdx >= 0 ? values[questionsIdx] : '',
    reflexions: reflexionsIdx >= 0 ? values[reflexionsIdx] : '',
    annotations: _readJsonColumn_(keys, values, ANNOTATIONS_COLUMN),
    alimLactee: _alimLactee_(_fieldValue_(keys, values, KEY_TYPE_LAIT)),
    autorisations: _buildAutorisations_(keys, values),
    informationsGenerales: _buildInformationsGenerales_(keys, values, computed),
    problematiqueObjectifs: _buildProblematiqueObjectifs_(keys, values),
    connaissancesSommeil: _buildConnaissancesSommeil_(keys, values),
    sante: _buildSante_(keys, values),
    laJournee: _buildLaJournee_(keys, values),
    environnementSommeil: _buildEnvironnementSommeil_(keys, values),
    histoire: _buildHistoire_(keys, values),
    emploiDuTemps: _buildEmploiDuTemps_(keys, values),
    leviers: _buildLeviers_()
  }, computed);
}

// Construit l'onglet "Leviers" : une section par catégorie de leviers
// (grille reprise du site d'origine), chaque item ayant 2 cases
// indépendantes (Abordé / À aborder) + un champ Conseils en saisie libre.
// Saisies manuelles pendant la consultation (pas de donnée Tally source).
function _buildLeviers_() {
  const categories = [
    {
      id: 'confort', label: 'Confort physiologique', items: [
        { label: 'Reflux / RGO', subItems: [
          'Lait maternel = pansement',
          'Fractionnement de l\'alimentation (+ petit, + souvent)',
          'Pause dans les repas',
          'Verticalisation 20min après repas',
          'Rot',
          'Changer la couche AVANT le lait',
          'Environnement calme',
          'Changer tétine (lent = avale air, rapide = augmente reflux)',
          'Biberon anti-reflux',
          'OK pour portage (= verticalité)',
          'Éviter transat',
          'Éviter vêtements serrés',
          'Éviter manipulations après le repas',
          'Éviter les surstimulations'
        ] },
        { label: 'Tensions corporelles', subItems: [
          'Redirection vers ostéo pédiatrique'
        ] },
        { label: 'Succion / freins restrictifs', subItems: [
          'Redirection vers Chiropracteur (annuaire Chirobliss) ou ORL spé succion',
          'Pas de tétine après frénectomie'
        ] },
        { label: 'Poussées dentaires', subItems: [
          'Doliprane en suppo (sous avis pharmacien)',
          'Domilia de Weleda en suppo (homéopathie)'
        ] },
        { label: 'APLV / Allergies / intolérances', subItems: [
          'Arbre décisionnel HAS',
          '3 semaines de test',
          '3 laits (hydrolysat extensif de PLV, lait protéine de riz, acides aminés)',
          'Allergies croisées à 90% (jument, ânesse, brebis, chèvre, soja)',
          'Ré-introduction obligatoire',
          'Diet pédiatrique pour bébé et maman (souvent pris en charge par la mutuelle)',
          'Pas de prise de sang (car IgE non-médiée)',
          'Calcium pour maman allaitante',
          'Pas de lait anti-reflux (cache les symptômes)',
          'Micro-ré-introduction',
          'Redirection ORL (si amygdales gonflées, car possible trouble de l\'oralité, apnée du sommeil)',
          'Redirection allergologue'
        ] },
        { label: 'Carences', subItems: [
          'Calcium si maman allaitante qui évite PLV',
          'Fer pour bébé si allaité et entre 6-12 mois'
        ] },
        'Apnée du sommeil (transpiration ++, ronfle, bouche ouverte = amygdales importantes/terrain allergique ?)',
        'Réorientation médicale rapide'
      ]
    },
    {
      id: 'alimentation', label: 'Alimentation', items: [
        { label: 'Le lait — bébé allaité', subItems: [
          'Power pumping',
          'Tirer après la tétée',
          'Boire suffisamment (lait = 87% d\'eau)',
          'Manger équilibré',
          'Conseillère en lactation IBCLC',
          'Règle d\'Appert',
          'Fer (bébé + 6 mois)',
          'Tétées en début de sieste + rituel du soir',
          'Tétées du soir groupées',
          'À la demande',
          '2 seins',
          'Gras de fin de tétée (sinon selles vertes car excès de lactose)',
          'Compléter avec un biberon lait pédiatrique',
          'Réf. selles vertes (excès de lactose) : pause + exprimer le lait + donner le sein en étant allongée pour que bébé gère le débit',
          'Sevrage : mixer lait maternel + pédiatrique et diminuer le % de lait maternel',
          'Essayer de dissocier l\'alimentation du sommeil',
          'Endroit calme et peu stimulant'
        ] },
        { label: 'Le lait — bébé au biberon', subItems: [
          'Conseillère en lactation IBCLC',
          'Règle d\'Appert (+ 30ml de plus)',
          'Biberon en début de sieste + rituel du soir',
          'Débit tétine',
          'Changement tétine',
          'Changement contenant',
          'Espacement de 4h',
          'Restitution du lait',
          'Essayer de dissocier l\'alimentation du sommeil',
          'Endroit calme et peu stimulant'
        ] },
        { label: 'Les solides / diversification', subItems: [
          'Cuillérée de lait pédiatrique (⚠️ validation diet pédiatrique)',
          'Cuisiner avec le lait pédiatrique/maternel',
          '25%/50% de féculents',
          'Bon gras : 1 cc pour 100g de purée/compote (colza, olive, noix, Quitensens)',
          'Yaourt ≠ lait maternel/pédiatrique',
          'Diététicienne nutritionniste pédiatrique (souvent remboursée par la Mutuelle)'
        ] },
        'Tétine/petit doigt = coupe-faim'
      ]
    },
    {
      id: 'rythme', label: 'Rythme', items: [
        'Besoins de sommeil', 'Temps d\'éveil',
        { label: 'Emploi du temps type', subItems: [
          'Proposition d\'un nouvel emploi du temps',
          'Changement sur le nombre de sieste',
          'Heure de réveil du matin fixe',
          'Horaires fixes (si 2 siestes ou moins)'
        ] },
        'Siestes / sommeil de jour',
        { label: 'Rituel du coucher', subItems: [
          'Bain',
          'Change',
          'Histoire',
          'Biberon/tétée',
          'Volets',
          'Chanson du dodo',
          'Coucher éveillé',
          'Rituel imagé'
        ] },
        { label: 'Rituel du lever', subItems: [
          'Joie en arrivant',
          'Prendre l\'enfant ou non de suite en fonction de son apaisement'
        ] },
        { label: 'Décalage horaire', subItems: [
          'Décalage de 15min tous les 3 jours',
          'Décalage en 1 fois'
        ] }
      ]
    },
    {
      id: 'strategies', label: 'Stratégies de sommeil', items: [
        { label: 'Endormissement autonome / diminution des dépendances', subItems: [
          'Progressivité',
          '🪑 Chaise : Sortir au Jour 7',
          '🪑 Chaise : Sortir dès l\'apaisement au Jour 1',
          '🪑 Chaise : Sortir après le coucher au Jour 1',
          '🛌🚪 Connaît son lit / Peut sortir de sa chambre',
          '🛌 Connaît son lit / Ne peut PAS sortir de sa chambre',
          '🚪 Ne connaît PAS son lit / Peut sortir de sa chambre',
          '🚶 Allers-retours (Dépendance à la présence ++)',
          '🚪 Intervenir porte fermée (Dépendance à la présence +++)'
        ] },
        'Accompagnement des émotions : 4 outils',
        { label: 'Multiples rappels', subItems: [
          'Anticiper les appels (gourde, mouchoirs, surpyjama vs. couette, 2ème doudou...)',
          'Verbaliser que c\'est le dernier câlin',
          'Carte de rappel',
          'Tableau de récompense',
          'Jeux de rôle',
          'Autonomiser l\'enfant',
          'Boite à bisous'
        ] },
        'Tétine', 'Changement de lit', 'Changement de chambre', 'Point famille'
      ]
    },
    {
      id: 'environnement_lev', label: 'Environnement de sommeil', items: [
        { label: 'Lit', subItems: [
          'Doudou (+ reco OMS rien avant 1 an)',
          'Tresse de tour de lit (+ reco OMS rien avant 1 an)',
          'Surpyjama',
          'Positionnement du lit dans la chambre',
          'Hauteur sommier',
          'Pas de couverture'
        ] },
        { label: 'Chambre', subItems: [
          'Apprivoiser la chambre',
          'Obscurité insuffisante',
          'Température trop élevée',
          'Simplifier l\'environnement',
          'Plan de change',
          'Bruits de la maison',
          'Taux d\'humidité (40-60%)',
          'Veilleuse'
        ] },
        { label: 'Outils pour les plus grands', subItems: [
          'Coin propreté',
          'Veilleuse',
          'Réveil pédagogique',
          'Minuteur visuel'
        ] }
      ]
    },
    {
      id: 'relationnels', label: 'Enjeux relationnels', items: [
        { label: 'Gérer l\'angoisse de séparation', subItems: [
          'Coucou caché',
          'Jeux de permanence de l\'objet',
          'Doudou de séparation (Atelier Bombus)',
          'Dire au revoir au parent au moment de la séparation',
          'Parler et se déplacer dans une pièce à côté',
          'Éviter de partir sans prévenir (= reste en alerte)',
          'Retrouvailles = moment de joie (séparation = temporaire et rassurante)',
          'Boite à bisous',
          'Petit cœur sur le poignet',
          'Temps qualitatif 15min'
        ] },
        'Remplir le réservoir affectif',
        { label: 'Peur et phobie', subItems: [
          'Jour : parler de la peur avec légèreté et assurance',
          'Jour : lire des livres dessus',
          'Jour : valoriser les situations où l\'enfant n\'a pas peur',
          'Nuit : rituel sécurisant, calme et remplir réservoir affectif',
          'Nuit : réconfort/écoute',
          'Nuit : changer les idées',
          'Nuit : éviter de faire croire aux monstres',
          'Nuit : éviter les sprays anti-monstres',
          'Nuit : ne pas rester (sinon valide l\'existence du monstre)'
        ] },
        'Relais entre parents/famille/amis', 'Posture parentale'
      ]
    },
    {
      id: 'soins', label: 'Journée', items: [
        'Changes', 'Motricité libre', 'Sorties en extérieur', 'Jouets à pile', 'Transat',
        'Zyma D (huile essentielle d\'orange douce = troubles digestifs)',
        'Écran', 'Sucre', 'Exposition à la lumière dès le matin',
        'Retournement dos/ventre (Tummy Time + presser le pied pour plier le genou et basculer + à faire en turbulette)'
      ]
    },
    {
      id: 'experience', label: 'Expérience positive', items: [
        { label: 'Joie autour du sommeil, motivation', subItems: [
          'Parler positivement du sommeil',
          'Calendrier pour marquer le début du changement',
          'Nouveau pyjama/drap/doudou',
          'Jeux de rôle',
          'Temps quali de 15min',
          'Réveil pédagogique',
          'Doudou de séparation (Atelier Bombus)',
          'Dessin de cœur sur le poignet',
          'Boite à bisous',
          'Rituel imagé',
          'Choix (pyjama/livre...)',
          'Minuteur visuel',
          'Anticiper les rappels (mouchoirs, gourde...)',
          'AutoNOmiser l\'enfant',
          'Veilleuse (peur du noir)',
          'Coin propreté',
          'Tableau de récompense',
          'Rituel du lever'
        ] }
      ]
    }
  ];

  return categories.map(cat => ({
    id: cat.id,
    label: cat.label,
    items: cat.items.map((item, i) => {
      const isObj = typeof item === 'object';
      const subItemsRaw = isObj ? (item.subItems || []) : [];
      return {
        label: isObj ? item.label : item,
        abordeKey: 'lev_' + cat.id + '_' + i + '_abordee',
        aAborderKey: 'lev_' + cat.id + '_' + i + '_a_aborder',
        // "Conseils" (déjà donnés, visible tout le temps) et "Conseils à
        // donner" (n'apparaît que si "À aborder" est coché) : 2 champs
        // distincts pour ne pas mélanger ce qui a déjà été dit et ce qui
        // reste à dire.
        conseilsKey: 'lev_' + cat.id + '_' + i + '_conseils',
        conseilsAAborderKey: 'lev_' + cat.id + '_' + i + '_conseils_a_aborder',
        // Sous-items : bullet points affichés uniquement si "Abordé" ou "À
        // aborder" est coché sur la ligne parente, chacun avec ses propres
        // cases Abordé/À aborder.
        subItems: subItemsRaw.map((subLabel, j) => ({
          label: subLabel,
          abordeKey: 'lev_' + cat.id + '_' + i + '_sub' + j + '_abordee',
          aAborderKey: 'lev_' + cat.id + '_' + i + '_sub' + j + '_a_aborder'
        })),
        // Complément commun à l'item + tous ses sous-items (une seule case,
        // pas une par bullet point) — même principe déjà donné/à donner.
        subComplementKey: subItemsRaw.length ? ('lev_' + cat.id + '_' + i + '_sub_complement') : null,
        subComplementAAborderKey: subItemsRaw.length ? ('lev_' + cat.id + '_' + i + '_sub_complement_a_aborder') : null
      };
    })
  }));
}

// Champs d'un "Temps d'éveil" : saisies manuelles pendant la consultation
// (pas de donnée Tally source). `kind` dit au front quel widget afficher :
// "time" (horaire natif), "number", "toggle" (Oui/Non) ou "duration" (lecture
// seule, calculée à partir de 2 autres champs horaire : fromKey - toKey).
function _buildTempsEveilFields_(n) {
  const fields = [];
  if (n === 1) {
    fields.push({ key: 'edt_eveil1_reveil', label: 'Réveil du matin', kind: 'time' });
  }
  fields.push(
    { key: 'edt_eveil' + n + '_volume', label: 'Volume biberon (ml)', kind: 'number' },
    { key: 'edt_eveil' + n + '_repas_debut', label: 'Repas en début de TE ?', kind: 'toggle' },
    { key: 'edt_eveil' + n + '_lait_avant_solide', label: 'Lait/solide en 1er', kind: 'toggle', options: ['OK', 'Pas OK'] },
    { key: 'edt_eveil' + n + '_feculents', label: 'Féculents (%)', kind: 'number' },
    { key: 'edt_eveil' + n + '_gras', label: 'Gras', kind: 'toggle' }
  );
  // Durée du temps d'éveil = heure du coucher de la sieste qui suit moins
  // l'heure de lever précédente (réveil du 1er TE, ou réveil de la sieste
  // d'avant pour les suivants). Pas de ligne pour le dernier TE (pas de
  // sieste après).
  if (n < 5) {
    const coucherKey = 'edt_sieste' + n + '_coucher';
    const leverKey = n === 1 ? 'edt_eveil1_reveil' : 'edt_sieste' + (n - 1) + '_reveil';
    fields.push({
      key: 'edt_eveil' + n + '_duree',
      label: 'Durée du temps d\'éveil ' + n,
      kind: 'duration',
      fromKey: coucherKey,
      toKey: leverKey
    });
  }
  return fields;
}

// Champs d'une "Sieste" : coucher / endormissement (+ durée d'endormissement
// calculée juste à côté) / réveil (+ durée totale de la sieste, calculée).
function _buildSiesteFields_(n) {
  const coucherKey = 'edt_sieste' + n + '_coucher';
  const endormissementKey = 'edt_sieste' + n + '_endormissement';
  const reveilKey = 'edt_sieste' + n + '_reveil';
  return [
    { key: coucherKey, label: 'Heure dans le lit', kind: 'time' },
    {
      key: endormissementKey,
      label: 'Heure d\'endormissement',
      kind: 'time',
      companionDuration: { label: 'Temps pour s\'endormir', fromKey: endormissementKey, toKey: coucherKey }
    },
    { key: reveilKey, label: 'Heure de réveil', kind: 'time' },
    {
      key: 'edt_sieste' + n + '_duree',
      label: 'Durée de la sieste ' + n,
      kind: 'duration',
      fromKey: reveilKey,
      toKey: endormissementKey,
      summary: 'sieste'
    }
  ];
}

// Champs de "Coucher du soir" : rituel / mise au lit / endormissement (+
// durée d'endormissement calculée juste à côté, comme pour une sieste) /
// volume de biberon.
function _buildCoucherDuSoirFields_() {
  const litKey = 'edt_coucher_lit';
  const endormissementKey = 'edt_coucher_endormissement';
  return [
    { key: 'edt_coucher_rituel', label: 'Heure du rituel', kind: 'time' },
    { key: litKey, label: 'Heure dans le lit', kind: 'time' },
    {
      key: endormissementKey,
      label: 'Heure d\'endormissement',
      kind: 'time',
      companionDuration: { label: 'Temps pour s\'endormir', fromKey: endormissementKey, toKey: litKey }
    },
    { key: 'edt_coucher_volume', label: 'Volume biberon (ml)', kind: 'number' }
  ];
}

// Nombre maximum de "réveils nocturnes" ajoutables (le nombre réellement
// affiché est piloté côté client par l'annotation 'edt_rn_count').
const EDT_MAX_REVEILS_NOCTURNES = 10;

// Construit l'onglet "Emploi du Temps" : une section par temps d'éveil /
// sieste de la journée, avec un seul complément par section (au lieu d'un
// par champ).
function _buildEmploiDuTemps_(keys, values) {
  return [
    { id: 'eveil1', label: 'Temps éveil 1', complementKey: 'edt_eveil1_complement', fields: _buildTempsEveilFields_(1) },
    { id: 'sieste1', label: 'Sieste 1', complementKey: 'edt_sieste1_complement', fields: _buildSiesteFields_(1), jumpToCoucher: true },
    { id: 'eveil2', label: 'Temps d\'éveil 2', complementKey: 'edt_eveil2_complement', fields: _buildTempsEveilFields_(2) },
    { id: 'sieste2', label: 'Sieste 2', complementKey: 'edt_sieste2_complement', fields: _buildSiesteFields_(2), jumpToCoucher: true },
    { id: 'eveil3', label: 'Temps d\'éveil 3', complementKey: 'edt_eveil3_complement', fields: _buildTempsEveilFields_(3) },
    { id: 'sieste3', label: 'Sieste 3', complementKey: 'edt_sieste3_complement', fields: _buildSiesteFields_(3), jumpToCoucher: true },
    { id: 'eveil4', label: 'Temps d\'éveil 4', complementKey: 'edt_eveil4_complement', fields: _buildTempsEveilFields_(4) },
    { id: 'sieste4', label: 'Sieste 4', complementKey: 'edt_sieste4_complement', fields: _buildSiesteFields_(4), jumpToCoucher: true },
    { id: 'eveil5', label: 'Temps d\'éveil 5', complementKey: 'edt_eveil5_complement', fields: _buildTempsEveilFields_(5) },
    { id: 'coucher_du_soir', label: 'Coucher du soir', complementKey: 'edt_coucher_complement', fields: _buildCoucherDuSoirFields_() },
    { id: 'reveils_nocturnes', label: 'Réveils nocturnes', reveilsNocturnes: true, maxReveils: EDT_MAX_REVEILS_NOCTURNES }
  ];
}

function _fieldValue_(keys, values, key) {
  const idx = _keyIndex_(keys, key);
  return idx >= 0 ? values[idx] : '';
}

function _formatDate_(val) {
  return (val instanceof Date) ? Utilities.formatDate(val, Session.getScriptTimeZone(), 'dd/MM/yyyy') : '';
}

// Format attendu par un <input type="date"> côté app.
function _formatDateIso_(val) {
  return (val instanceof Date) ? Utilities.formatDate(val, Session.getScriptTimeZone(), 'yyyy-MM-dd') : '';
}

// Construit les lignes de l'onglet "Autorisations" (les 3 consentements du
// questionnaire) : { key, label, value }. `alertIfNon` signale au front-end
// qu'une réponse "Non" doit alerter (catégorie en rouge + coche pré-cochée).
function _buildAutorisations_(keys, values) {
  const v = k => _fieldValue_(keys, values, k);

  return [
    { key: 'ig_informes', label: 'Les 2 responsables légaux sont-ils informés ?', value: v('RESP_LEGAUX_INFORMES') || '—' },
    { key: 'auth_donnees_sante', label: "M'autorisez-vous à collecter les données de santé de votre enfant (taille, poids, périmètre crânien, questions diverses et habitudes sommeil) et les habitudes de votre famille UNIQUEMENT dans le cadre de cet accompagnement ?", value: v('CONSENT_DONNEES_SANTE') || '—', autoTickValue: 'Non', alertCategory: true },
    { key: 'auth_email', label: "M'autorisez-vous à utiliser vos adresses e-mail pour communiquer avec vous dans le cadre de cet accompagnement ?", value: v('CONSENT_EMAIL') || '—', autoTickValue: 'Non', alertCategory: true },
    { key: 'auth_tel', label: "M'autorisez-vous à utiliser votre numéro de téléphone pour communiquer avec vous dans le cadre de cet accompagnement ?", value: v('CONSENT_TEL') || '—', autoTickValue: 'Non', alertCategory: true }
  ];
}

// Construit les lignes de l'onglet "Informations générales" : { key, label, value }.
// `key` sert d'identifiant stable pour les compléments/coches saisis à la main.
function _buildInformationsGenerales_(keys, values, computed) {
  const v = k => _fieldValue_(keys, values, k);

  const tailleSuffix1 = v(KEY_TAILLE_RESP1) ? v(KEY_TAILLE_RESP1) + ' cm' : '';
  const tailleSuffix2 = v(KEY_TAILLE_RESP2) ? v(KEY_TAILLE_RESP2) + ' cm' : '';

  return [
    { key: 'ig_resp1', label: 'Responsable légal 1', value: v(KEY_PARENT1) || '—', special: 'nomParent', dataKey: KEY_PARENT1, tailleSuffix: tailleSuffix1 },
    { key: 'ig_resp2', label: 'Responsable légal 2', value: v(KEY_PARENT2) || '—', special: 'nomParent', dataKey: KEY_PARENT2, tailleSuffix: tailleSuffix2 },
    { key: 'ig_activites', label: 'Activités professionnelles', value: v('ACTIVITE_PRO') || '—' },
    { key: 'ig_email_rdv', label: "Adresse mail ayant servi à la prise de rendez-vous", value: v('EMAIL') || '—' },
    { key: 'ig_geniteur', label: 'Géniteur', value: '—' },
    { key: 'ig_genitrice', label: 'Génitrice', value: '—' },
    { key: 'ig_fratrie', label: 'Fratrie', value: v('FRATRIE') || '—' },
    { key: 'ig_spacer_prenom', spacer: true },
    { key: 'ig_prenom', label: 'Prénom', value: v(KEY_CHILD_FIRSTNAME) || '—', special: 'prenom', dataKey: KEY_CHILD_FIRSTNAME },
    { key: 'ig_naissance', label: 'Date de naissance', value: _formatDate_(v(KEY_DATE_NAISSANCE)) || '—', special: 'date', dateField: 'naissance', dateValue: _formatDateIso_(v(KEY_DATE_NAISSANCE)) },
    { key: 'ig_terme', label: 'Date de terme', value: _formatDate_(v(KEY_DATE_TERME)) || '—', special: 'date', dateField: 'terme', dateValue: _formatDateIso_(v(KEY_DATE_TERME)) },
    { key: 'ig_age_actuel', label: 'Âge actuel', value: computed.ageReel || '—' },
    { key: 'ig_age_corrige', label: 'Âge corrigé actuel', value: computed.ageCorrige || '—' },
    { key: 'ig_poids', label: 'Poids', value: computed.poids !== null ? computed.poids + ' kg' : '—', special: 'poids', poidsValue: computed.poids },
    { key: 'ig_appert', label: "Règle d'Appert", value: computed.regleAppert || '—' },
    { key: 'ig_taille', label: 'Taille', value: '—' },
    { key: 'ig_taille_cible', label: 'Taille cible', value: computed.tailleCible !== null ? computed.tailleCible + ' cm' : '—' },
    { key: 'ig_percentile', label: 'Percentile taille cible', value: computed.percentile !== null ? computed.percentile + 'e' : '—' }
  ];
}

// Construit les lignes de l'onglet "Problématique & objectifs" : { key, label, value }.
function _buildProblematiqueObjectifs_(keys, values) {
  const v = k => _fieldValue_(keys, values, k);
  const problematiqueQuestionnaire = v('PROBLEMATIQUE_SOMMEIL');

  return [
    { key: 'pb_problematique', label: 'Problématique', value: problematiqueQuestionnaire || '—' },
    { key: 'pb_objectifs', label: 'Vos objectifs de sommeil', value: v('OBJECTIFS_ACCOMPAGNEMENT') || '—' }
  ];
}

// Construit les lignes de l'onglet "Connaissances sur le sommeil" : { key, label, value }.
function _buildConnaissancesSommeil_(keys, values) {
  const v = k => _fieldValue_(keys, values, k);

  const livres = v('A_LU_LIVRES_SOMMEIL')
    ? [v('A_LU_LIVRES_SOMMEIL'), v('LIVRES_LUS')].filter(Boolean).join(' — ')
    : (v('A_LU_LIVRES_SOMMEIL') || '—');
  return [
    { key: 'cs_livres', label: 'Avez-vous déjà lu des livres sur le sommeil des enfants ?', value: livres || '—' },
    { key: 'cs_medecin', label: 'Avez-vous déjà parlé à votre médecin des problèmes de sommeil de votre enfant ?', value: v('A_PARLE_MEDECIN_SOMMEIL') || '—' },
    { key: 'cs_avis_medecin', label: 'Que vous a-t-il dit ?', value: v('AVIS_MEDECIN') || '—' },
    { key: 'cs_deja_mis_en_place', label: 'Qu\'avez-vous déjà mis en place pour le sommeil de votre enfant ?', value: v('DEJA_MIS_EN_PLACE') || '—' },
    { key: 'cs_pas_fonctionne', label: 'Qu\'est-ce qui n\'a pas fonctionné ?', value: v('CE_QUI_NA_PAS_FONCTIONNE') || '—' }
  ];
}

// Construit l'onglet "Santé" : liste de groupes { id, label, rows: [{key,label,value}] }.
// Basé sur les vraies colonnes du Sheet Tally (pas sur les captures d'un autre site).
// Listes complètes des choix possibles pour les questions à cases à cocher
// (checkboxes) du Tally, récupérées depuis le schéma réel du formulaire
// (https://tally.so/r/zxoyXg) pour ne jamais inventer d'options.
const SANTE_MULTI_OPTIONS = {
  CHANGEMENT_LAIT: [
    'Non, aucun changement depuis sa naissance',
    'Oui: sein => biberon de lait maternel (passé ou en cours)',
    'Oui: lait maternel (sein et/ou biberon) => lait pédiatrique (passé ou en cours)',
    'Oui: changement de lait pédiatrique (passé ou en cours)',
    'Oui: lait maternel /lait pédiatrique => lait pédiatrique spécialisé (lait aux protéines de riz, lait hydrolysé, lait aux acides aminés...) (passé ou en cours)',
    "Sevrage de l'allaitement maternel en cours",
    'Autre'
  ],
  NUTRITION_SIGNAUX: [
    'Réclame à manger très souvent (plus de 12x/jour avant 1 mois, plus de 10x/jour après 1 mois)',
    'Tète/boit très rapidement (moins de 5 min)',
    'Tète/boit très longtemps (plus de 20 min)',
    'A fréquemment le hoquet',
    'Fait des gargouillements (bruits digestifs audibles)',
    "S'endort pendant le repas alors que vous sentez qu'il n'a pas assez mangé",
    'Pleure de façon aiguë / inhabituelle',
    'Aspire très fort sur votre doigt pour s\'apaiser',
    "Refuse de s'alimenter",
    'Repousse le sein ou le biberon',
    'Si allaité au sein: Tire sur le sein, le lâche, le reprend (fait le pic-vert)',
    'Tourne la tête quand vous essayez de le nourrir',
    'Ne se calme qu\'avec une tétine',
    'Repousse le parent quand il est porté dans les bras',
    'Dort mieux porté, en peau à peau, ou contre quelqu\'un',
    'Prend du poids difficilement',
    'Perd du poids',
    'Prend du poids de façon excessive',
    'A une courbe de taille et/ou de poids irrégulière',
    'Aucune de ses situations'
  ],
  APRES_TETEE_SIGNAUX: [
    'A les poings fermés',
    'A les poings ouverts',
    'S\'agite sur le biberon/sein',
    'Se tortille/grogne',
    'Semble frustré(e)',
    'Pleure',
    'Autre',
    'Aucune de ses situations'
  ],
  SELLES_SIGNAUX: [
    'A du sang dans les selles',
    'A des selles glaireuses',
    'A des selles noires et nauséabondes',
    'A une absence de selles sur quelques jours',
    'A des selles en formes de billes noires et dures',
    'Aucune de ses situations'
  ],
  SANTE_DETAIL: [
    'A des coliques',
    'A du reflux',
    'Régurgite juste après la tétée/le biberon',
    'Régurgite tout au long de son temps d\'éveil',
    'Vomit en jet',
    'Vomit fréquemment (plus de 5x/jour)',
    'Vomit de grande quantité de lait',
    'Vomit du lait caillé',
    'Vomit un liquide à l\'odeur acide',
    'Vomit un liquide vert ou jaune',
    'Fait un bruit de déglutition audible quand le lait remonte',
    'Se tortille/ se cambre / se jette en arrière ou pleure pendant ou juste après le repas',
    'Semble mâchonner en dehors des repas',
    'Semble avoir mal en position allongée, surtout après manger',
    'Refuse le sein/le biberon après quelques secondes alors qu\'il semblait avoir faim',
    'Met beaucoup de temps à téter ou à boire son biberon (supérieur à 30min)',
    'A une demande constante d\'alimentation',
    'Si diversification: A des difficultés pour la diversification ou le changement de texture',
    'Pleure de façon inhabituelle, difficile à calmer, sans cause apparente',
    'A des gaz fréquents',
    'A des selles très dures',
    'A des selles explosives',
    'A la diarrhée',
    'A des traces de sang dans les selles',
    'Est souvent malade',
    'A le nez bouché de façon fréquente ou constante',
    'A souvent des problèmes respiratoires ou ORL (otites, bronchiolites, asthme, toux chronique...)',
    'Fait des bruits respiratoires inhabituels en dormant (bruits de dinosaure)',
    'Éternue fréquemment',
    'A l\'haleine acide/malodorante',
    'Dort la bouche ouverte',
    'Dort dans des positions inhabituelles (assis, tête en arrière, s\'appuie sur ses mains...)',
    'A des problèmes de peau (ex: eczéma, peau atopique, petits boutons, urticaire, peau qui pèle/granuleuse..)',
    'Transpire excessivement la nuit',
    'A un reflux a déjà été diagnostiqué par le pédiatre/médecin',
    'A un traitement a déjà été prescrit (ex: Inexium, Mopral, Gaviscon, Polysilane...)',
    'Aucune de ses situations'
  ],
  VENTRE_SIGNAUX: [
    'A le ventre gonflé',
    'A le ventre dur',
    'A le ventre sensible',
    'A beaucoup de gaz parfois douloureux ou malodorants',
    'Aucune de ses situations'
  ],
  DENTAIRE_SIGNAUX: [
    'A les dents qui poussent',
    'Bave et salive abondamment',
    'A les joues rouges',
    'A les fesses rouges (erythème fessier)',
    'Aucune de ses situations'
  ],
  CORPOREL_SIGNAUX: [
    'A un côté préférentiel (tourne toujours la tête du même côté)',
    'A l\'arrière du crâne aplati ou une asymétrie du crâne (plagiocéphalie)',
    'Prend une forme de C ou de banane en position allongée sur le dos',
    'Si vous allaitez au sein: A une préférence marquée pour un sein',
    'A une préférence marquée pour une position ou un côté au biberon',
    'A la tête en hyperextension (penchée en arrière)',
    'A des mouvements de bras/jambes saccadés, anarchiques, très vifs',
    'Ne pose jamais la tête sur l\'épaule du parent',
    'N\'est pas à l\'aise en système de portage',
    'Aucune de ses situations'
  ],
  SUCCION_SIGNAUX: [
    'N\'arrive pas à tenir une tétine en bouche',
    'A une prise en bouche superficielle (bouche peu ouverte)',
    'A les joues qui se creusent / une fossette pendant la tétée/le biberon',
    'Mordille ou mâchonne le sein ou la tétine',
    'A les lèvres pincées, refermées vers l\'intérieur pendant la tétée/le biberon',
    'Présente une fuite de lait autour de la bouche pendant la tétée/le biberon',
    'Régurgite par le nez ou la bouche pendant la tétée/le biberon',
    'A du mal à se concentrer, se crispe ou s\'agite pendant la tétée/le biberon',
    'Ne s\'alimente qu\'en demi-sommeil',
    'S\'étouffe pendant la tétée/le biberon',
    'Avale de l\'air de façon audible pendant la tétée/le biberon',
    'Avale souvent en fausse route pendant la tétée/le biberon',
    'Fait des bruits de claquement de langue pendant la tétée/le biberon',
    'Devient marbré pendant la tétée/le biberon',
    'Fait des allers-retours ou des mouvements de va-et-vient excessifs sur le sein/biberon (comme un pic-vert)',
    'A une succion faible ou "cassée" (n\'arrive pas à ventouser, fait des bruits de "pop")',
    'A la langue qui ne forme pas la gouttière quand il tète votre doigt',
    'A la langue qui n\'avance pas sur la gencive inférieure',
    'Ne peut pas tirer la langue au-delà de la lèvre inférieure',
    'A le fond de la langue qui ne se lève pas',
    'A un réflexe nauséeux marqué',
    'A des ampoules/cloques de succion sur les lèvres',
    'Si allaitement au sein: Mamelons plissés, aplatis ou blanchis après la tétée',
    'Si allaitement au sein: Mamelon biseauté après la tétée',
    'Si allaitement au sein: Crevasses',
    'Si allaitement au sein: Douleurs pendant l\'allaitement',
    'Si allaitement au sein: Engorgements ou mastites à répétition',
    'Si allaitement au sein: Utilisation d\'un bout de sein indispensable',
    'Aucune de ses situations'
  ],
  PROS_CONSULTES: [
    'Sage-femme',
    'Infirmière puéricultrice',
    'Consultante du sommeil',
    'Consultante en lactation IBCLC',
    'Conseillère en allaitement',
    'Diététicienne nutritioniste pédiatrique',
    'Gastropédiatre',
    'Allergologue pédiatrique',
    'ORL pédiatrique',
    'Orthophoniste pédiatrique',
    'Osthéopathe pédiatrique',
    'Kinésithérapeute pédiatrique',
    'Autre thérapeute manuel pédiatrique',
    'Chiropracteur pédiatrique',
    'Psychomotricien',
    'Pédopsychiatre',
    'Autre',
    'Aucun professionnel n\'a été consulté'
  ],
  SOMMEIL_SIGNAUX: [
    'A du mal à s\'endormir en début de nuit',
    'A du mal à s\'endormir au milieu de sa nuit',
    'A du mal à s\'endormir pour ses siestes',
    'Fait des siestes courtes (inférieures à 45 min)',
    'Se réveille rapidement une fois posé dans son lit',
    'N\'aime pas être allongé',
    'N\'aime pas dormir dans son lit',
    'Se réveille en pleurant systématiquement',
    'Se réveille fréquemment la nuit',
    'Fait des pauses respiratoires pendant le sommeil (plus de 3 secondes)',
    'Dort la bouche ouverte',
    'Ronfle',
    'Transpire excessivement la nuit',
    'Ne fait que des siestes courtes (environ 30 min)',
    'A un sommeil agité',
    'Fait des mouvements rythmiques pendant son sommeil (bercement, balancement)',
    'Sursaute pendant son sommeil',
    'Gémit pendant la nuit',
    'Se rendort facilement, sans souci de digestion ni de prise de biberon la nuit',
    'Autre',
    'Tout va bien!'
  ]
};

// Construit une ligne "choix multiples" : affiche TOUTES les options possibles
// en chips, celles sélectionnées par la famille ressortant en terracotta.
// `rawValue` est la valeur brute de la feuille (options sélectionnées jointes
// en texte) ; le matching se fait par recherche de sous-chaîne (plutôt qu'un
// split sur la virgule, car certaines options contiennent elles-même des
// virgules) pour rester robuste même si le séparateur exact varie.
function _multiChoiceRow_(key, label, rawValue, optionsKey) {
  const options = SANTE_MULTI_OPTIONS[optionsKey] || [];
  const normalized = String(rawValue || '').toLowerCase();
  return {
    key: key,
    label: label,
    value: rawValue || '—',
    multiChoice: true,
    options: options.map(opt => ({
      text: opt,
      selected: normalized.indexOf(opt.toLowerCase()) !== -1
    }))
  };
}

// Construit une ligne "choix multiples" en 2 colonnes côte à côte (ex:
// confort physique actuellement / par le passé), chaque colonne gardant son
// propre complément + coche puisque ce sont 2 champs Tally distincts.
function _pairedMultiChoiceRow_(label, columns) {
  return {
    type: 'pairedMultiChoice',
    label: label,
    columns: columns.map(c => {
      const options = SANTE_MULTI_OPTIONS[c.optionsKey] || [];
      const normalized = String(c.rawValue || '').toLowerCase();
      return {
        key: c.key,
        label: c.label,
        value: c.rawValue || '—',
        options: options.map(opt => ({
          text: opt,
          selected: normalized.indexOf(opt.toLowerCase()) !== -1
        }))
      };
    })
  };
}

function _buildSante_(keys, values) {
  const v = k => _fieldValue_(keys, values, k);
  const d = k => _formatDate_(v(k)) || v(k) || '—';

  return [
    { id: 'courbes', label: 'Courbes', rows: [
      { key: 'sa_courbe_poids', label: 'Courbes de poids', value: v('COURBE_POIDS') || '—', special: 'link' },
      { key: 'sa_courbe_taille', label: 'Courbes de taille', value: v('COURBE_TAILLE') || '—', special: 'link' },
      { key: 'sa_courbe_pc', label: 'Courbes de périmètre crânien', value: v('COURBE_PC') || '—', special: 'link' }
    ]},
    { id: 'generalites', label: 'Généralités', rows: [
      { key: 'sa_vu_medecin', label: 'A-t-il été vu par un pédiatre/médecin depuis sa naissance ?', value: v('VU_MEDECIN_DEPUIS_NAISSANCE') || '—', autoTickValue: 'Non', alertCategory: true },
      { key: 'sa_pediatre_confirme', label: 'Le pédiatre/médecin a-t-il attesté que votre enfant est en bonne santé ?', value: v('PEDIATRE_CONFIRME_BONNE_SANTE') || '—', autoTickValue: 'Non', alertCategory: true },
      { key: 'sa_pb_non_resolus', label: 'Votre enfant a-t-il des problèmes de santé non résolus (hors maladies virales) ?', value: v('PROBLEMES_SANTE_NON_RESOLUS') || '—', autoTickValue: 'Oui' },
      { key: 'sa_traitement', label: 'Votre enfant a-t-il un traitement médical en cours ?', value: v('TRAITEMENT_EN_COURS') || '—', autoTickValue: 'Oui' },
      { key: 'sa_dernier_rdv', label: 'Date du dernier RDV médecin/pédiatre', value: d('DATE_DERNIER_RDV') }
    ]},
    { id: 'alimentation', label: 'Alimentation', rows: [
      { key: 'sa_type_lait', label: 'Mode d\'alimentation lactée actuel', value: v('TYPE_LAIT') || '—' },
      { key: 'sa_lait_ar', label: 'Lait Anti-Reflux (AR) ?', value: v('LAIT_AR') || '—' },
      _multiChoiceRow_('sa_changement_lait', 'Changement dans son alimentation lactée depuis la naissance ?', v('CHANGEMENT_LAIT'), 'CHANGEMENT_LAIT'),
      { key: 'sa_diversification', label: 'Diversification alimentaire', value: v('DIVERSIFICATION') || '—' }
    ]},
    { id: 'dents', label: 'Dents', rows: [
      _multiChoiceRow_('sa_dentaire', 'Dentaire', v('DENTAIRE_SIGNAUX'), 'DENTAIRE_SIGNAUX')
    ]},
    { id: 'aplv_rgo', label: 'APLV / RGO', rows: [
      { key: 'sa_antecedents_allergie', label: 'Antécédents familiaux d\'allergie', value: v('ANTECEDENTS_ALLERGIE') || '—' },
      { key: 'sa_antecedents_peau', label: 'Antécédents familiaux de problèmes de peau', value: v('ANTECEDENTS_PEAU') || '—' },
      { key: 'sa_biberons_si_allaitement', label: 'Biberons de lait pédiatrique reçus (si allaitement exclusif) ?', value: v('BIBERONS_SI_ALLAITEMENT') || '—' },
      { key: 'sa_suspicion_aplv', label: 'Suspicion d\'APLV déjà évoquée par un pro ?', value: v('SUSPICION_APLV') || '—' },
      _pairedMultiChoiceRow_('Confort physique', [
        { key: 'sa_confort_actuel', label: 'Actuellement', rawValue: v('SANTE_DETAIL_ACTUEL'), optionsKey: 'SANTE_DETAIL' },
        { key: 'sa_confort_passe', label: 'Par le passé', rawValue: v('SANTE_DETAIL_PASSE'), optionsKey: 'SANTE_DETAIL' }
      ])
    ]},
    { id: 'selles', label: 'Selles', rows: [
      _multiChoiceRow_('sa_selles', 'Selles', v('SELLES_SIGNAUX'), 'SELLES_SIGNAUX'),
      _multiChoiceRow_('sa_ventre', 'Ventre', v('VENTRE_SIGNAUX'), 'VENTRE_SIGNAUX')
    ]},
    { id: 'tensions', label: 'Tensions', rows: [
      _multiChoiceRow_('sa_tensions', 'Tensions corporelles', v('CORPOREL_SIGNAUX'), 'CORPOREL_SIGNAUX')
    ]},
    { id: 'succion', label: 'Succion', rows: [
      _multiChoiceRow_('sa_succion', 'Succion', v('SUCCION_SIGNAUX'), 'SUCCION_SIGNAUX')
    ]},
    { id: 'frein', label: 'Frein', rows: [
      { key: 'sa_frein_verifie', label: 'Le frein de langue a-t-il été vérifié ?', value: v('FREINS_VERIFIES') || '—' },
      { key: 'sa_frein_sectionne', label: 'Le frein de langue a-t-il été sectionné ?', value: v('FREIN_SECTIONNE') || '—' },
      { key: 'sa_frein_reeduque', label: 'Le frein de langue a-t-il été rééduqué ?', value: v('FREIN_REEDUQUE') || '—' }
    ]},
    { id: 'faim', label: 'Faim', rows: [
      _multiChoiceRow_('sa_nutrition_signaux', 'Signes pendant l\'alimentation', v('NUTRITION_SIGNAUX'), 'NUTRITION_SIGNAUX'),
      _multiChoiceRow_('sa_apres_tetee', 'Signes après la tétée/le biberon', v('APRES_TETEE_SIGNAUX'), 'APRES_TETEE_SIGNAUX')
    ]},
    { id: 'sommeil', label: 'Sommeil', rows: [
      _multiChoiceRow_('sa_sommeil_signaux', 'Sommeil', v('SOMMEIL_SIGNAUX'), 'SOMMEIL_SIGNAUX'),
      { key: 'sa_bouche_ouverte', label: 'Dort la bouche ouverte ?', value: v('DORT_BOUCHE_OUVERTE') || '—' },
      { key: 'sa_transpire', label: 'Transpire excessivement la nuit ?', value: v('TRANSPIRE_NUIT') || '—' },
      { key: 'sa_ronfle', label: 'Ronfle ?', value: v('RONFLE') || '—' },
      { key: 'sa_positions_inhabituelles', label: 'Dort dans des positions inhabituelles ?', value: v('DORT_POSITIONS_INHABITUELLES') || '—' }
    ]},
    { id: 'nutriments', label: 'Nutriments', rows: [
      { key: 'sa_regime_grossesse', label: 'Régime/compléments pendant la grossesse ?', value: v('REGIME_GROSSESSE') || '—', autoTick: _reponseEstOui_(v('REGIME_GROSSESSE')) },
      { key: 'sa_fer_verifie', label: 'Taux de fer vérifié par prise de sang ?', value: v('FER_VERIFIE') || '—' },
      // Tick par defaut : allaitement exclusif ET pas complemente en fer.
      { key: 'sa_complement_fer', label: 'Complémenté en fer ?', value: v('COMPLEMENT_FER') || '—', autoTick: _estAllaitementExclusif_(v('TYPE_LAIT')) && _reponseEstNon_(v('COMPLEMENT_FER')) },
      { key: 'sa_vitamine_d', label: 'Prend de la vitamine D ?', value: v('VITAMINE_D') || '—' },
      { key: 'sa_probiotiques', label: 'Prend des probiotiques ?', value: v('PROBIOTIQUES') || '—' },
      { key: 'sa_spasmes', label: 'A déjà fait des spasmes du sanglot ?', value: v('SPASMES_SANGLOT') || '—' }
    ]},
    { id: 'autre', label: 'Autre', rows: [
      _multiChoiceRow_('sa_pros_consultes', 'Professionnels déjà consultés', v('PROS_CONSULTES'), 'PROS_CONSULTES')
    ]}
  ];
}

// Construit les lignes de l'onglet "La journée" (garde, activités de la
// journée) : { key, label, value }.
function _buildLaJournee_(keys, values) {
  const v = k => _fieldValue_(keys, values, k);

  return [
    { key: 'ja_garde', label: 'Mode de garde de votre enfant', value: v('MODE_GARDE') || '—' },
    { key: 'ja_dev_moteur', label: 'Stade de développement moteur', value: v('DEV_MOTEUR') || '—' },
    { key: 'ja_transat', label: 'Passe du temps dans un transat ?', value: v('TEMPS_TRANSAT') || '—' },
    { key: 'ja_parc', label: 'Passe du temps dans un parc à l\'intérieur ?', value: v('TEMPS_PARC') || '—' },
    { key: 'ja_exterieur', label: 'Passe du temps en extérieur tous les jours ?', value: v('TEMPS_EXTERIEUR') || '—' },
    { key: 'ja_jouets_piles', label: 'A des jouets à piles (son/lumières) ?', value: v('JOUETS_A_PILES') || '—' },
    { key: 'ja_ecrans', label: 'Exposé à des écrans (direct ou indirect) ?', value: v('EXPOSITION_ECRANS') || '—' },
    { key: 'ja_fumeur', label: 'Quelqu\'un du foyer est fumeur ?', value: v('FUMEUR_FOYER') || '—' }
  ];
}

// Construit les lignes de l'onglet "Environnement de sommeil" : { key, label, value }.
function _buildEnvironnementSommeil_(keys, values) {
  const v = k => _fieldValue_(keys, values, k);

  return [
    { key: 'env_piece_actuelle', label: 'Dans quelle pièce dort-il actuellement ?', value: v('PIECE_ACTUELLE') || '—' },
    { key: 'env_piece_future', label: 'Dans quelle pièce à l\'avenir ?', value: v('PIECE_FUTURE') || '—' },
    { key: 'env_familier_piece_future', label: 'Familier avec cette future pièce durant l\'éveil ?', value: v('FAMILIER_PIECE_FUTURE') || '—' },
    { key: 'env_type_lit_actuel', label: 'Type de lit actuellement', value: v('TYPE_LIT_ACTUEL') || '—' },
    { key: 'env_type_lit_futur', label: 'Type de lit souhaité à l\'avenir', value: v('TYPE_LIT_FUTUR') || '—' },
    { key: 'env_sort_seul_lit', label: 'Peut sortir de son lit tout seul ?', value: v('SORT_SEUL_LIT') || '—' },
    { key: 'env_sort_seul_chambre', label: 'Peut sortir seul de sa chambre ?', value: v('SORT_SEUL_CHAMBRE') || '—' },
    { key: 'env_habillage_siestes', label: 'Habillage pour les siestes', value: v('HABILLAGE_SIESTES') || '—' },
    { key: 'env_habillage_nuits', label: 'Habillage pour les nuits', value: v('HABILLAGE_NUITS') || '—' },
    { key: 'env_veilleuse', label: 'A une veilleuse dans sa chambre ?', value: v('VEILLEUSE') || '—', autoTick: _reponseEstOui_(v('VEILLEUSE')) },
    { key: 'env_obscurite_siestes', label: 'Note obscurité chambre — siestes (/10)', value: v('NOTE_OBSCURITE_SIESTES') || '—' },
    { key: 'env_obscurite_nuits', label: 'Note obscurité chambre — nuits (/10)', value: v('NOTE_OBSCURITE_NUITS') || '—' },
    { key: 'env_temperature', label: 'Température habituelle de la chambre', value: v('TEMPERATURE_CHAMBRE') || '—' },
    { key: 'env_bruits_blancs', label: 'S\'endort/se rendort avec des bruits blancs ?', value: v('BRUITS_BLANCS') || '—' },
    { key: 'env_tetine', label: 'Dort avec une tétine ?', value: v('DORT_AVEC_TETINE') || '—' },
    { key: 'env_dispositifs_surveillance', label: 'Dispositifs de surveillance (chambre/lit)', value: v('DISPOSITIFS_SURVEILLANCE') || '—' },
    { key: 'env_doudou', label: 'A un doudou ?', value: v('A_DOUDOU') || '—' },
    { key: 'env_photo_doudou', label: 'Photo du doudou', value: v('PHOTO_DOUDOU') || '—', special: 'link', linkText: 'Voir la photo ↗' },
    { key: 'env_photo_chambre_1', label: 'Photo chambre 1', value: v('PHOTO_CHAMBRE_1') || '—', special: 'link', linkText: 'Voir la photo ↗' },
    { key: 'env_photo_chambre_2', label: 'Photo chambre 2', value: v('PHOTO_CHAMBRE_2') || '—', special: 'link', linkText: 'Voir la photo ↗' },
    { key: 'env_photo_chambre_3', label: 'Photo chambre 3', value: v('PHOTO_CHAMBRE_3') || '—', special: 'link', linkText: 'Voir la photo ↗' }
  ];
}

// Construit les lignes de l'onglet "Histoire" (vécu grossesse/accouchement des
// 2 parents, antécédents) : { key, label, value }.
function _buildHistoire_(keys, values) {
  const v = k => _fieldValue_(keys, values, k);

  return [
    { type: 'pairedValue', label: 'Note grossesse (/10)', columns: [
      { key: 'hi_grossesse_resp1', label: 'Parent 1', value: v('NOTE_GROSSESSE_RESP1') || '—' },
      { key: 'hi_grossesse_resp2', label: 'Parent 2', value: v('NOTE_GROSSESSE_RESP2') || '—' }
    ]},
    { type: 'pairedValue', label: 'Note accouchement (/10)', columns: [
      { key: 'hi_accouchement_resp1', label: 'Parent 1', value: v('NOTE_ACCOUCHEMENT_RESP1') || '—' },
      { key: 'hi_accouchement_resp2', label: 'Parent 2', value: v('NOTE_ACCOUCHEMENT_RESP2') || '—' }
    ]},
    { type: 'pairedValue', label: 'État émotionnel actuel (/10)', columns: [
      { key: 'hi_etat_emo_resp1', label: 'Parent 1', value: v('NOTE_ETAT_EMO_RESP1') || '—' },
      { key: 'hi_etat_emo_resp2', label: 'Parent 2', value: v('NOTE_ETAT_EMO_RESP2') || '—' }
    ]},
    { key: 'hi_changement_vie', label: 'Grand changement de vie pendant/après la grossesse ?', value: v('CHANGEMENT_VIE_GROSSESSE') || '—' },
    { key: 'hi_antecedent_psy', label: 'Épisode de dépression, anxiété ou maladie grave (parent) ?', value: v('ANTECEDENT_PSY_PARENT') || '—' },
    { key: 'hi_autre_info', label: 'Autre chose à mentionner', value: v('AUTRE_INFO') || '—' },
    { key: 'hi_canal_decouverte', label: 'Comment avez-vous connu La Tribu des Rêveurs ?', value: v('CANAL_DECOUVERTE') || '—' }
  ];
}

/**
 * Enregistre le contenu d'un des 2 encadrés persistants (communs à tous les onglets).
 * `column` doit être QUESTIONS_COLUMN ou REFLEXIONS_COLUMN.
 */
function saveNote(rowIndex, column, text) {
  if (column !== QUESTIONS_COLUMN && column !== REFLEXIONS_COLUMN) {
    throw new Error('Colonne non autorisée : ' + column);
  }
  const sheet = _getSheet_();
  const { keys } = _getHeaders_(sheet);
  const col = _ensureColumn_(sheet, keys, column) + 1; // 1-based pour getRange
  sheet.getRange(rowIndex, col).setValue(text);

  try {
    _writeFicheNote_(getClientData(rowIndex), column, text);
  } catch (e) {
    // best-effort : la fiche externe ne doit pas faire échouer la sauvegarde principale
  }

  return { ok: true, savedAt: new Date().toISOString() };
}

/**
 * Enregistre le complément texte + la coche d'un champ précis (identifié par sa
 * `fieldKey`, ex: "ig_fratrie"), quel que soit l'onglet. Fusionné dans le blob
 * JSON de la colonne ANNOTATIONS_COLUMN pour ne pas multiplier les colonnes.
 */
function saveFieldAnnotation(rowIndex, fieldKey, texte, coche) {
  const sheet = _getSheet_();
  const { keys } = _getHeaders_(sheet);
  const col = _ensureColumn_(sheet, keys, ANNOTATIONS_COLUMN) + 1; // 1-based
  const cell = sheet.getRange(rowIndex, col);
  let annotations = {};
  try { annotations = JSON.parse(cell.getValue() || '{}'); } catch (e) {}
  annotations[fieldKey] = { texte: texte || '', coche: !!coche };
  cell.setValue(JSON.stringify(annotations));

  // Journal de diagnostic de la synchro fiche client, écrit dans la colonne
  // "Debug_Fiche" de CETTE ligne (pas besoin d'accès aux logs Apps
  // Script/GCP : il suffit de regarder cette cellule après un test).
  const debugLog = [];
  try {
    const client = getClientData(rowIndex);
    debugLog.push('fieldKey="' + fieldKey + '" pour ' + client.childName + ' / ' + client.parent1 + ' et ' + client.parent2);
    try {
      _writeFicheComplement_(client, fieldKey, texte || '', coche, debugLog);
    } catch (e) {
      debugLog.push('ERREUR _writeFicheComplement_ : ' + e.message);
    }
    try {
      _writeFicheLevier_(client, fieldKey, texte || '', coche, debugLog);
    } catch (e) {
      debugLog.push('ERREUR _writeFicheLevier_ : ' + e.message);
    }
    try {
      _writeFicheEdt_(client, fieldKey, texte || '', coche, debugLog);
    } catch (e) {
      debugLog.push('ERREUR _writeFicheEdt_ : ' + e.message);
    }
    try {
      _writeFicheSuivi_(client, fieldKey, texte || '', coche, debugLog);
    } catch (e) {
      debugLog.push('ERREUR _writeFicheSuivi_ : ' + e.message);
    }
  } catch (e) {
    debugLog.push('ERREUR getClientData : ' + e.message);
  }

  try {
    const debugCol = _ensureColumn_(sheet, keys, 'Debug_Fiche') + 1;
    sheet.getRange(rowIndex, debugCol).setValue(
      '[' + new Date().toLocaleTimeString('fr-FR') + '] ' + debugLog.join(' | ')
    );
  } catch (e) {
    // best-effort : la colonne de debug ne doit jamais faire échouer la sauvegarde
  }

  return { ok: true, savedAt: new Date().toISOString() };
}
