/**
 * FicheClient.gs — synchronise les compléments saisis dans l'app vers la
 * fiche client Excel (Google Sheet) générée automatiquement pour chaque
 * famille (même nom que "{Prénom enfant} / {Prénom Nom resp1} et {Prénom Nom resp2}",
 * retrouvée par recherche Drive).
 *
 * Deux mécanismes :
 * 1. Champs "génériques" (Informations générales, Problématique &
 *    objectifs, Connaissances sur le sommeil) : on cherche la ligne dont la
 *    colonne B (libellé) correspond EXACTEMENT au texte attendu, dans
 *    l'onglet "Modele_Fiche_Client", et on écrit le complément en colonne E,
 *    la coche en colonne F.
 * 2. Plan d'action (Leviers) : un onglet dédié "Plan d'action" (créé au
 *    premier écrit si besoin), une ligne par levier (voir _buildLeviers_()
 *    dans Sheet.gs), avec Abordé/À aborder/Conseils. Les lignes cochées se
 *    colorent en terracotta (mise en forme conditionnelle).
 *
 * Important : les numéros de ligne dérivent d'une fiche à l'autre (constaté
 * entre le modèle et une fiche réelle déjà générée), donc on ne les fige
 * jamais — on cherche la ligne par texte à chaque écriture, et on n'écrit
 * que si un unique match est trouvé (sinon on ignore, sans jamais risquer
 * d'écrire dans la mauvaise cellule).
 *
 * Best-effort : si la fiche n'est pas trouvée ou le libellé introuvable, on
 * ne bloque pas l'enregistrement principal (déjà sauvegardé dans
 * Annotations_Champs, qui reste la source de vérité côté app).
 */

const FICHE_SHEET_NAME = 'Modele_Fiche_Client';
// La fiche reelle melange 2 mises en page selon la section (verifie sur la
// fiche de Cass) : "Autorisations / Informations generales / Problematique &
// objectifs / Connaissances sur le sommeil" ont leur libelle en colonne B
// (valeur en C) ; tout le reste (Nutrition, Sante, Journee, Environnement,
// Histoire...) a son libelle en colonne A (valeur en B). _findRowByExactLabel_
// cherche donc dans LES DEUX colonnes A et B, quelle que soit la section —
// pas besoin de savoir a l'avance laquelle utiliser pour chaque champ.
const FICHE_LABEL_COLUMN = 1;      // colonne A (recherche principale, voir ci-dessus)
const FICHE_COMPLEMENT_COLUMN = 5; // colonne E
const FICHE_COCHE_COLUMN = 6;      // colonne F

// Libellé exact (colonne A OU B de la fiche, voir plus haut) correspondant à
// chaque champ de l'app. Une valeur peut être :
// - une chaîne (le libellé doit être UNIQUE dans la fiche) ;
// - { label, occurrence } quand le même libellé apparaît plusieurs fois
//   (ex: "Note grossesse" sous "Responsable légal 1" ET sous "Responsable
//   légal 2", ou "Ventre" qui est à la fois un titre de section ET le
//   libellé du champ juste en dessous) — `occurrence` (1 = 1ère apparition,
//   2 = 2e...) choisit laquelle ;
// - un tableau de chaînes, quand le libellé réel varie (ex: pronom "il"/
//   "elle" selon le sexe de l'enfant) — la 1ère qui correspond est utilisée.
const FICHE_LABEL_MAP = {
  // Informations générales
  ig_resp1: 'Prénom - responsable légal 1',
  ig_resp2: 'Prénom - responsable légal 2',
  ig_fratrie: 'Fratrie',
  ig_informes: '2 responsables légaux informés ?',
  ig_activites: 'Activités professionnelles',
  ig_prenom: 'Prénom',
  ig_naissance: 'Date de naissance',
  ig_terme: 'Date de terme prévue',
  ig_age_actuel: 'Âge réel aujourd\'hui',
  ig_age_corrige: 'Âge corrigé aujourd\'hui',
  ig_poids: 'Poids actuel (kg)',
  ig_appert: 'Besoins théoriques en lait / 24h',
  ig_taille_cible: 'Potentiel génétique - taille cible (cm)',
  ig_percentile: 'Correspondance percentile',
  // Problématique & objectifs
  pb_problematique: 'Problématiques',
  pb_objectifs: 'Objectifs',
  // Connaissances sur le sommeil
  cs_livres: 'Livre(s) déjà lu(s)',
  cs_medecin: 'A déjà parlé au médecin/pédiatre du sommeil ?',
  cs_avis_medecin: 'Ce que le médecin a dit',
  cs_deja_mis_en_place: 'Ce qui a déjà été mis en place',
  cs_pas_fonctionne: 'Ce qui n\'a pas fonctionné',
  // Santé (nutrition)
  sa_type_lait: 'Type de lait actuel',
  sa_lait_ar: 'Lait Anti-Reflux (AR) ?',
  sa_changement_lait: 'Changement d\'apports lactés depuis la naissance ?',
  sa_diversification: 'Enfant diversifié (solides/allergènes) ?',
  sa_nutrition_signaux: 'Signes de faim (pdt alimentation)',
  sa_apres_tetee: 'Signes de faim (après tétée/biberon)',
  sa_regime_grossesse: 'Régime/compléments pendant la grossesse?',
  sa_fer_verifie: 'Taux de fer déjà vérifié par prise de sang ?',
  sa_complement_fer: 'Complémenté en fer ?',
  sa_vitamine_d: 'Prend de la vitamine D ?',
  sa_probiotiques: 'Prend des probiotiques ?',
  sa_spasmes: 'A déjà fait des spasmes du sanglot ?',
  sa_courbe_poids: 'Courbe de poids (photo/lien)',
  sa_courbe_taille: 'Courbe de taille (photo/lien)',
  sa_courbe_pc: 'Courbe de périmètre crânien (photo/lien)',
  // Santé (généralités et suite)
  sa_vu_medecin: 'Déjà vu par un médecin/pédiatre depuis la naissance ?',
  sa_pediatre_confirme: 'Pédiatre a confirmé bonne santé ?',
  sa_pb_non_resolus: 'Problèmes de santé non résolus ?',
  sa_traitement: 'Traitement médical en cours ?',
  sa_dernier_rdv: 'Date du dernier RDV médecin/pédiatre',
  sa_antecedents_allergie: 'Antécédents familiaux d\'allergie',
  sa_antecedents_peau: 'Antécédents familiaux de problèmes de peau',
  sa_biberons_si_allaitement: 'Biberons de lait pédiatrique reçus (si allaitement exclusif) ?',
  sa_suspicion_aplv: 'Suspicion d\'APLV déjà évoquée par un pro ?',
  sa_confort_actuel: 'Symptômes (actuels)',
  sa_confort_passe: 'Symptômes (actuels)',
  sa_selles: 'Pb de selles',
  // "Ventre" est a la fois le titre de la sous-section ET le libelle du
  // champ juste en dessous : la 2e occurrence est le vrai champ.
  sa_ventre: { label: 'Ventre', occurrence: 2 },
  sa_dentaire: 'Symptômes poussée dentaire',
  sa_tensions: 'Symptômes tensions corporelles',
  sa_succion: 'Symptôme pb de succion',
  sa_frein_verifie: 'Freins de bouche vérifiés ?',
  sa_frein_sectionne: 'Frein déjà sectionné ?',
  sa_frein_reeduque: 'Frein déjà rééduqué ?',
  sa_sommeil_signaux: 'Signes cochés (sommeil)',
  sa_bouche_ouverte: 'Dort la bouche ouverte ?',
  sa_transpire: 'Transpire excessivement la nuit ?',
  sa_ronfle: 'Ronfle ?',
  sa_positions_inhabituelles: 'Dort dans des positions inhabituelles ? (assis, tête en arrière, s\'appuie sur ses mains...)',
  sa_pros_consultes: 'Professionnels déjà consultés',
  // La journée
  ja_garde: 'Mode de garde',
  ja_dev_moteur: 'Stade de développement moteur',
  ja_transat: 'Passe du temps en transat ?',
  ja_parc: 'Passe du temps dans un parc ?',
  ja_exterieur: 'Temps en extérieur tous les jours ?',
  ja_jouets_piles: 'A des jouets à piles sonores/lumineux ?',
  ja_ecrans: 'Exposé à des écrans ?',
  ja_fumeur: 'Fumeur dans le foyer ?',
  // Environnement de sommeil
  env_piece_actuelle: 'Pièce où il dort actuellement',
  env_piece_future: 'Pièce souhaitée à l\'avenir',
  env_familier_piece_future: 'Familier avec la pièce future en journée ?',
  env_type_lit_actuel: 'Type de lit actuel',
  env_type_lit_futur: 'Type de lit souhaité',
  env_sort_seul_lit: 'Peut sortir seul de son lit ?',
  env_sort_seul_chambre: 'Peut sortir seul de sa chambre ?',
  env_habillage_siestes: 'Habillage pour les siestes',
  env_habillage_nuits: 'Habillage pour les nuits',
  env_veilleuse: 'A une veilleuse ?',
  env_obscurite_siestes: 'Note obscurité chambre - siestes /10',
  env_obscurite_nuits: 'Note obscurité chambre - nuits /10',
  env_temperature: 'Température habituelle de la chambre',
  env_bruits_blancs: 'S\'endort/rendort avec bruits blancs ?',
  env_tetine: 'Dort avec une tétine ?',
  env_dispositifs_surveillance: 'Dispositifs de surveillance présents',
  env_doudou: 'A un doudou ?',
  env_photo_doudou: 'Photo du doudou',
  env_photo_chambre_1: 'Photo chambre - coin 2',
  env_photo_chambre_2: 'Photo chambre - coin 3',
  env_photo_chambre_3: 'Photo chambre - coin 4',
  // Histoire
  hi_changement_vie: 'Grand changement de vie ?',
  hi_antecedent_psy: 'A traversé dépression/anxiété/maladie grave ?',
  hi_autre_info: 'Autre chose à mentionner',
  hi_grossesse_resp1: { label: 'Note grossesse', occurrence: 1 },
  hi_grossesse_resp2: { label: 'Note grossesse', occurrence: 2 },
  hi_accouchement_resp1: { label: 'Note accouchement', occurrence: 1 },
  hi_accouchement_resp2: { label: 'Note accouchement', occurrence: 2 },
  hi_etat_emo_resp1: { label: 'Note état émotionnel', occurrence: 1 },
  hi_etat_emo_resp2: { label: 'Note état émotionnel', occurrence: 2 },
  // Le libelle reel change selon le sexe de l'enfant ("il"/"elle") : on
  // essaie chaque variante plausible.
  hi_canal_decouverte: [
    'Comment il a connu La Tribu des Rêveurs',
    'Comment elle a connu La Tribu des Rêveurs',
    'Comment avez-vous connu La Tribu des Rêveurs ?'
  ]
};

// A LANCER UNE SEULE FOIS, sur le MODELE (pas une fiche de famille) : ajoute
// les vraies cases a cocher sur toutes les lignes labellisees de la fiche
// principale, et pre-cree les onglets "Plan d'action" et "Emploi du temps"
// (avec leurs propres cases a cocher). Comme ce modele est duplique pour
// chaque nouvelle famille, toutes les fiches futures auront ces cases et
// onglets des le depart, remplissables a la main si besoin, sans dependre
// de la synchro app -> fiche pour qu'ils apparaissent.
function preparerModeleAvecOngletsEtCases() {
  _preparerCasesEtOnglets_('1xC4eCpEMlXQEfZAyZzPub4TubKggmK9C', 'le modele');
}

// Meme preparation que ci-dessus, mais sur une fiche de famille DEJA CREEE
// (donc pas beneficiaire de la preparation faite sur le modele apres coup).
// A lancer une fois par fiche existante concernee.
function preparerFicheExistanteAvecOngletsEtCases() {
  _preparerCasesEtOnglets_('1J4MGAxedw7CHJmED4t9_fjesU5XdfATo', 'la fiche de Cass');
}

// Coeur commun : ajoute une vraie case a cocher sur toutes les lignes
// labellisees (colonne A OU B, voir FICHE_LABEL_MAP plus haut) de la fiche
// principale, et pre-cree/complete les onglets "Plan d'action" et "Emploi
// du temps".
function _preparerCasesEtOnglets_(spreadsheetId, description) {
  const ss = SpreadsheetApp.openById(spreadsheetId);

  const sheet = ss.getSheetByName(FICHE_SHEET_NAME);
  if (sheet) {
    const lastRow = sheet.getLastRow();
    const colA = sheet.getRange(1, 1, lastRow, 1).getValues();
    const colB = sheet.getRange(1, 2, lastRow, 1).getValues();
    let compteur = 0;
    for (let i = 0; i < lastRow; i++) {
      if (colA[i][0] || colB[i][0]) {
        sheet.getRange(i + 1, FICHE_COCHE_COLUMN).insertCheckboxes();
        compteur++;
      }
    }
    Logger.log(compteur + ' cases a cocher ajoutees sur "' + FICHE_SHEET_NAME + '" (colonne ' + FICHE_COCHE_COLUMN + ') pour ' + description + '.');
  } else {
    Logger.log('Onglet "' + FICHE_SHEET_NAME + '" introuvable pour ' + description + '.');
  }

  _ensurePlanActionSheet_(ss, _buildLeviers_());
  _ensureEdtSheet_(ss);
  Logger.log('Onglets "Plan d\'action" et "Emploi du temps" prets pour ' + description + '.');
}

// Diagnostic : liste tous les libellés reels (colonne A) de la fiche
// "Cass" deja identifiee, pour comparer d'un coup avec FICHE_LABEL_MAP
// plutot que de decouvrir les ecarts un par un via Debug_Fiche.
function listerLabelsFiche() {
  const ficheId = '1J4MGAxedw7CHJmED4t9_fjesU5XdfATo';
  const ss = SpreadsheetApp.openById(ficheId);
  const sheet = ss.getSheetByName(FICHE_SHEET_NAME) || ss.getSheets()[0];
  const lastRow = sheet.getLastRow();
  const values = sheet.getRange(1, FICHE_LABEL_COLUMN, lastRow, 1).getValues();
  values.forEach((v, i) => {
    if (v[0]) Logger.log((i + 1) + ': ' + v[0]);
  });
}

// Retourne l'URL de la fiche client (Google Sheet) de la famille, pour le
// bouton "Fiche client" de la barre de minuterie.
function getFicheUrl(rowIndex) {
  const client = getClientData(rowIndex);
  const ficheId = _findFicheSpreadsheetId_(client);
  if (!ficheId) throw new Error('Fiche client introuvable pour cette famille.');
  return 'https://docs.google.com/spreadsheets/d/' + ficheId + '/edit';
}

// Écrit dans les logs d'exécution ET, si fourni, dans `debugLog` (tableau
// accumulé par saveFieldAnnotation puis écrit dans la colonne "Debug_Fiche"
// du Sheet principal — pratique pour diagnostiquer sans accès aux logs
// Apps Script, qui demandent un projet GCP relié).
function _log_(debugLog, msg) {
  console.log(msg);
  if (debugLog) debugLog.push(msg);
}

// Priorité à l'ID Drive stocké dans "Données brutes" (colonne
// FICHE_SPREADSHEET_ID, remplie par genererFichesClients à la création de la
// fiche) : fiable même si un prénom est modifié après coup dans l'appli. Se
// rabat sur la recherche par nom (fragile) seulement pour les lignes créées
// avant l'introduction de cette colonne, ou si le fichier stocké a été
// supprimé/déplacé.
function _findFicheSpreadsheetId_(client, debugLog) {
  if (client.ficheSpreadsheetId) {
    try {
      DriveApp.getFileById(client.ficheSpreadsheetId); // verifie que le fichier existe toujours
      _log_(debugLog, 'Fiche : ID stocké utilisé (' + client.ficheSpreadsheetId + ').');
      return client.ficheSpreadsheetId;
    } catch (e) {
      _log_(debugLog, 'Fiche : ID stocké (' + client.ficheSpreadsheetId + ') introuvable (' + e.message + '), repli sur la recherche par nom.');
    }
  }

  const expectedName = client.childName + ' / ' + client.parent1 + ' et ' + client.parent2;
  const files = DriveApp.getFilesByName(expectedName);
  const found = files.hasNext() ? files.next().getId() : null;
  _log_(debugLog, 'Fiche : nom cherché "' + expectedName + '" -> ' + (found ? ('trouvée (id ' + found + ')') : 'INTROUVABLE dans Drive'));
  return found;
}

// Retourne le numéro de ligne (1-based) dont la colonne A correspond
// EXACTEMENT à `labelText`. Sans `occurrence`, n'accepte que les libellés
// UNIQUES (0 ou plusieurs correspondances = on ignore, par sécurité). Avec
// `occurrence` (1 = 1ère apparition, 2 = 2e...), va chercher la Nième
// occurrence — pour les libellés qui se répètent volontairement (ex: "Note
// grossesse" sous Responsable légal 1 ET sous Responsable légal 2).
function _findRowByExactLabel_(sheet, labelOrLabels, occurrence) {
  const labels = Array.isArray(labelOrLabels) ? labelOrLabels : [labelOrLabels];
  const lastRow = sheet.getLastRow();
  const colA = sheet.getRange(1, 1, lastRow, 1).getValues();
  const colB = sheet.getRange(1, 2, lastRow, 1).getValues();
  const matches = [];
  for (let i = 0; i < colA.length; i++) {
    const a = String(colA[i][0]).trim();
    const b = String(colB[i][0]).trim();
    if (labels.indexOf(a) !== -1 || labels.indexOf(b) !== -1) matches.push(i + 1);
  }
  if (occurrence) return matches[occurrence - 1] || null;
  return matches.length === 1 ? matches[0] : null;
}

function _writeFicheComplement_(client, fieldKey, texte, coche, debugLog) {
  const mapping = FICHE_LABEL_MAP[fieldKey];
  if (!mapping) {
    _log_(debugLog, 'Complément générique : fieldKey "' + fieldKey + '" absent de FICHE_LABEL_MAP, ignoré (normal si ce n\'est pas un champ couvert).');
    return;
  }
  const estSimple = typeof mapping === 'string' || Array.isArray(mapping);
  const labelText = estSimple ? mapping : mapping.label;
  const occurrence = estSimple ? null : mapping.occurrence;

  const ficheId = _findFicheSpreadsheetId_(client, debugLog);
  if (!ficheId) return;

  const ss = SpreadsheetApp.openById(ficheId);
  const sheetByName = ss.getSheetByName(FICHE_SHEET_NAME);
  const sheet = sheetByName || ss.getSheets()[0];
  _log_(debugLog, 'Complément générique : onglet utilisé = "' + sheet.getName() + '"' + (sheetByName ? '' : ' (⚠️ "' + FICHE_SHEET_NAME + '" introuvable, on a pris le 1er onglet à la place)'));

  const row = _findRowByExactLabel_(sheet, labelText, occurrence);
  _log_(debugLog, 'Complément générique : libellé cherché (colonne A ou B) = "' + JSON.stringify(labelText) + '"' + (occurrence ? (' (occurrence ' + occurrence + ')') : '') + ' -> ' + (row ? ('ligne ' + row) : 'AUCUNE ligne (0 ou plusieurs correspondances)'));
  if (!row) return;

  sheet.getRange(row, FICHE_COMPLEMENT_COLUMN).setValue(texte);
  const cocheCell = sheet.getRange(row, FICHE_COCHE_COLUMN);
  cocheCell.insertCheckboxes(); // affiche une vraie case à cocher, pas "TRUE"/"FALSE" en texte
  cocheCell.setValue(!!coche);
  _log_(debugLog, 'Complément générique : écrit ligne ' + row + ', colonnes ' + FICHE_COMPLEMENT_COLUMN + '/' + FICHE_COCHE_COLUMN + '.');
}

// --- Plan d'action (Leviers) -----------------------------------------

const PLAN_ACTION_SHEET_NAME = 'Plan d\'action';
const PLAN_ACTION_HEADERS = ['Catégorie', 'Levier', 'Abordé', 'À aborder', 'Conseils'];
const PLAN_ACTION_ACCENT_COLOR = '#E07B2E'; // terracotta du logo

// Une fieldKey de "Plan d'action" ressemble à "lev_confort_0_abordee" (voir
// _buildLeviers_() dans Sheet.gs). On ignore volontairement les sous-items
// individuels ("..._sub2_abordee"...) : seule la ligne du levier parent est
// répercutée dans la fiche, comme demandé (une ligne par levier, pas par
// bullet point).
function _parseLeviersFieldKey_(fieldKey) {
  const m = /^lev_([a-z_]+)_(\d+)_(abordee|a_aborder|conseils|sub_complement)$/.exec(fieldKey);
  if (!m) return null;
  return {
    catId: m[1],
    itemIndex: Number(m[2]),
    field: m[3] === 'sub_complement' ? 'conseils' : m[3]
  };
}

function _writeFicheLevier_(client, fieldKey, texte, coche, debugLog) {
  const parsed = _parseLeviersFieldKey_(fieldKey);
  if (!parsed) {
    _log_(debugLog, 'Plan d\'action : fieldKey "' + fieldKey + '" ne correspond pas au format Plan d\'action, ignoré (normal si ce n\'est pas un champ Plan d\'action).');
    return;
  }

  const categories = _buildLeviers_();
  const cat = categories.find(c => c.id === parsed.catId);
  const item = cat && cat.items[parsed.itemIndex];
  if (!cat || !item) {
    _log_(debugLog, 'Plan d\'action : catégorie/item introuvable pour "' + fieldKey + '" (catId=' + parsed.catId + ', itemIndex=' + parsed.itemIndex + ').');
    return;
  }
  _log_(debugLog, 'Plan d\'action : fieldKey "' + fieldKey + '" -> catégorie "' + cat.label + '", levier "' + item.label + '", champ "' + parsed.field + '".');

  const ficheId = _findFicheSpreadsheetId_(client, debugLog);
  if (!ficheId) return;

  const ss = SpreadsheetApp.openById(ficheId);
  const sheet = _ensurePlanActionSheet_(ss, categories);

  const row = _findPlanActionRow_(sheet, cat.label, item.label);
  _log_(debugLog, 'Plan d\'action : recherche ligne "' + cat.label + '" / "' + item.label + '" -> ' + (row ? ('ligne ' + row) : 'INTROUVABLE'));
  if (!row) return;

  if (parsed.field === 'abordee') sheet.getRange(row, 3).setValue(!!coche);
  else if (parsed.field === 'a_aborder') sheet.getRange(row, 4).setValue(!!coche);
  else if (parsed.field === 'conseils') sheet.getRange(row, 5).setValue(texte || '');
  _log_(debugLog, 'Plan d\'action : écrit ligne ' + row + ', champ "' + parsed.field + '".');
}

// Cherche, dans l'onglet "Plan d'action", la ligne dont la Catégorie (col A)
// ET le Levier (col B) correspondent EXACTEMENT (au cas où un même intitulé
// de levier existerait dans 2 catégories différentes).
function _findPlanActionRow_(sheet, catLabel, itemLabel) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  const values = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === catLabel && values[i][1] === itemLabel) return i + 2;
  }
  return null;
}

// Crée (au 1er écrit seulement, jamais recréé/écrasé ensuite) l'onglet
// "Plan d'action" avec une ligne par levier — uniquement les catégories du
// Plan d'action (Confort physiologique, Alimentation, Rythme, Stratégies de
// sommeil, Environnement de sommeil, Enjeux relationnels, Journée,
// Expérience positive), donc PAS Emploi du temps type / Siestes /
// Accompagnement qui sont des sous-onglets à part dans l'app. Les lignes
// où "Abordé" ou "À aborder" est coché se colorent en terracotta.
function _ensurePlanActionSheet_(ss, categories) {
  let sheet = ss.getSheetByName(PLAN_ACTION_SHEET_NAME);
  if (sheet && sheet.getLastRow() >= 2) return sheet;

  if (!sheet) sheet = ss.insertSheet(PLAN_ACTION_SHEET_NAME);
  sheet.clear();

  const rows = [PLAN_ACTION_HEADERS];
  categories.forEach(cat => {
    cat.items.forEach(item => {
      rows.push([cat.label, item.label, false, false, '']);
    });
  });
  sheet.getRange(1, 1, rows.length, PLAN_ACTION_HEADERS.length).setValues(rows);
  sheet.getRange(1, 1, 1, PLAN_ACTION_HEADERS.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, PLAN_ACTION_HEADERS.length);

  // Vraies cases à cocher (Abordé / À aborder), pas "TRUE"/"FALSE" en texte.
  sheet.getRange(2, 3, rows.length - 1, 2).insertCheckboxes();

  const dataRange = sheet.getRange(2, 1, rows.length - 1, PLAN_ACTION_HEADERS.length);
  const rule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=OR($C2,$D2)')
    .setFontColor(PLAN_ACTION_ACCENT_COLOR)
    .setRanges([dataRange])
    .build();
  sheet.setConditionalFormatRules([rule]);

  return sheet;
}

// --- Emploi du temps ---------------------------------------------------

const EDT_SHEET_NAME = 'Emploi du temps';
const EDT_HEADERS = ['Bloc', 'Champ', 'Valeur'];

// Libellés des 4 champs d'un "Réveil nocturne" dynamique (edt_rn<N>_...),
// dans le même ordre que _buildEdtReveilNocturne_ côté app (Index.html).
const EDT_RN_FIELD_LABELS = {
  reveil: 'Heure de réveil',
  coucher: 'Heure de coucher',
  volume: 'Volume biberon (ml)',
  complement: 'Complément'
};

// Reprend _buildEmploiDuTemps_() (Sheet.gs) — entièrement statique (keys/
// values ne sont pas utilisés dedans) — pour ne jamais dupliquer la liste
// des blocs/champs entre l'app et la fiche.
function _edtGroups_() {
  return _buildEmploiDuTemps_(null, null);
}

// Retrouve, pour une fieldKey de l'onglet "Emploi du Temps" (ex:
// "edt_eveil1_volume", "edt_sieste2_complement", "edt_rn3_reveil"...), le
// { bloc, champ } correspondant, en réutilisant EXACTEMENT la même liste de
// champs que l'app (voir _edtGroups_ ci-dessus) plutôt que de la retaper.
// Retourne null pour les champs calculés (kind "duration", jamais saisis)
// ou toute clé qui ne serait pas de l'Emploi du Temps.
function _resolveEdtField_(fieldKey) {
  const groups = _edtGroups_();
  for (const group of groups) {
    if (group.complementKey === fieldKey) return { bloc: group.label, champ: 'Complément' };
    for (const f of (group.fields || [])) {
      if (f.key === fieldKey) return { bloc: group.label, champ: f.label };
    }
  }
  const rn = /^edt_rn(\d+)_(reveil|coucher|volume|complement)$/.exec(fieldKey);
  if (rn) {
    return { bloc: 'Réveil nocturne ' + rn[1], champ: EDT_RN_FIELD_LABELS[rn[2]] };
  }
  return null;
}

function _writeFicheEdt_(client, fieldKey, texte, coche, debugLog) {
  const resolved = _resolveEdtField_(fieldKey);
  if (!resolved) {
    _log_(debugLog, 'Emploi du temps : fieldKey "' + fieldKey + '" ne correspond à aucun champ Emploi du Temps connu, ignoré.');
    return;
  }
  _log_(debugLog, 'Emploi du temps : fieldKey "' + fieldKey + '" -> bloc "' + resolved.bloc + '", champ "' + resolved.champ + '".');

  const ficheId = _findFicheSpreadsheetId_(client, debugLog);
  if (!ficheId) return;

  const ss = SpreadsheetApp.openById(ficheId);
  const sheet = _ensureEdtSheet_(ss);

  const row = _findOrCreateEdtRow_(sheet, resolved.bloc, resolved.champ);
  sheet.getRange(row, 3).setValue(texte || '');
  _log_(debugLog, 'Emploi du temps : écrit ligne ' + row + '.');

  _writeFicheEdtSummary_(sheet, client, debugLog);
}

// --- Résumé (3 pastilles fixes de l'app : volume bib., durée siestes,
// durée nuit) --------------------------------------------------------

function _edtTimeToMinutes_(v) {
  if (!v) return null;
  const parts = String(v).split(':');
  if (parts.length !== 2) return null;
  const h = Number(parts[0]), m = Number(parts[1]);
  if (isNaN(h) || isNaN(m)) return null;
  return h * 60 + m;
}

function _edtFormatDuration_(minutes) {
  if (minutes === null) return '—';
  let m = minutes;
  if (m < 0) m += 24 * 60;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return (h > 0 ? h + 'h ' : '') + mm + 'min';
}

// Reprend EXACTEMENT le calcul de _edtRecomputeSummary_ (Index.html) pour
// ne jamais désynchroniser les 2 versions.
function _edtComputeSummary_(annotations) {
  const annMinutes = key => _edtTimeToMinutes_((annotations[key] || {}).texte);

  let totalVolume = 0, hasVolume = false;
  Object.keys(annotations).forEach(key => {
    if (key.indexOf('edt_') === 0 && key.indexOf('_volume', key.length - '_volume'.length) !== -1) {
      const texte = annotations[key].texte;
      if (texte !== '' && texte !== undefined && texte !== null) {
        const n = parseFloat(texte);
        if (!isNaN(n)) { totalVolume += n; hasVolume = true; }
      }
    }
  });
  const volume = hasVolume ? (totalVolume + ' mL') : '';

  let totalSieste = 0, hasSieste = false;
  for (let n = 1; n <= 4; n++) {
    const reveilMin = annMinutes('edt_sieste' + n + '_reveil');
    const endoMin = annMinutes('edt_sieste' + n + '_endormissement');
    if (reveilMin !== null && endoMin !== null) {
      totalSieste += reveilMin - endoMin;
      hasSieste = true;
    }
  }
  const siestes = hasSieste ? _edtFormatDuration_(totalSieste) : '';

  let nuit = '';
  const endormissementMin = annMinutes('edt_coucher_endormissement');
  const reveilMatinMin = annMinutes('edt_eveil1_reveil');
  if (endormissementMin !== null && reveilMatinMin !== null) {
    let span = reveilMatinMin - endormissementMin;
    if (span < 0) span += 24 * 60;
    let totalReveils = 0;
    Object.keys(annotations).forEach(key => {
      const m = /^edt_rn(\d+)_coucher$/.exec(key);
      if (!m) return;
      const rCoucherMin = annMinutes(key);
      const rReveilMin = annMinutes('edt_rn' + m[1] + '_reveil');
      if (rCoucherMin !== null && rReveilMin !== null) {
        const d = rCoucherMin - rReveilMin;
        if (d > 0) totalReveils += d;
      }
    });
    nuit = _edtFormatDuration_(span - totalReveils);
  }

  return { volume: volume, siestes: siestes, nuit: nuit };
}

function _writeFicheEdtSummary_(sheet, client, debugLog) {
  const summary = _edtComputeSummary_(client.annotations || {});
  const rows = [
    ['Résumé', 'Volume total biberons', summary.volume],
    ['Résumé', 'Durée totale siestes', summary.siestes],
    ['Résumé', 'Durée nuit', summary.nuit]
  ];
  rows.forEach(r => {
    const row = _findOrCreateEdtRow_(sheet, r[0], r[1]);
    sheet.getRange(row, 3).setValue(r[2]);
  });
  _log_(debugLog, 'Emploi du temps : résumé mis à jour (volume=' + summary.volume + ', siestes=' + summary.siestes + ', nuit=' + summary.nuit + ').');
}

// Cherche la ligne "Bloc" + "Champ" exacts ; si absente (cas des "Réveils
// nocturnes", dont le nombre varie d'une famille à l'autre et ne sont donc
// pas pré-remplis à la création de l'onglet), l'ajoute à la fin.
function _findOrCreateEdtRow_(sheet, bloc, champ) {
  const lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    const values = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === bloc && values[i][1] === champ) return i + 2;
    }
  }
  const newRow = lastRow + 1;
  sheet.getRange(newRow, 1, 1, 2).setValues([[bloc, champ]]);
  return newRow;
}

// Crée (au 1er écrit seulement) l'onglet "Emploi du temps", pré-rempli avec
// tous les blocs/champs statiques (Temps d'éveil, Siestes, Coucher du soir)
// dans le même ordre que l'app — même principe que _ensurePlanActionSheet_.
// Les "Réveils nocturnes" (nombre variable) s'ajoutent au fil de l'eau via
// _findOrCreateEdtRow_.
function _ensureEdtSheet_(ss) {
  let sheet = ss.getSheetByName(EDT_SHEET_NAME);
  if (sheet && sheet.getLastRow() >= 2) return sheet;

  if (!sheet) sheet = ss.insertSheet(EDT_SHEET_NAME);
  sheet.clear();

  const rows = [
    EDT_HEADERS,
    ['Résumé', 'Volume total biberons', ''],
    ['Résumé', 'Durée totale siestes', ''],
    ['Résumé', 'Durée nuit', '']
  ];
  _edtGroups_().forEach(group => {
    (group.fields || []).forEach(f => {
      if (f.kind === 'duration') return; // calculé, jamais saisi
      rows.push([group.label, f.label, '']);
    });
    if (group.complementKey) rows.push([group.label, 'Complément', '']);
  });
  sheet.getRange(1, 1, rows.length, EDT_HEADERS.length).setValues(rows);
  sheet.getRange(1, 1, 1, EDT_HEADERS.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, EDT_HEADERS.length);

  return sheet;
}

// --- Consultation de suivi ----------------------------------------------

const SUIVI_SHEET_PREFIX = 'Suivi ';
const SUIVI_HEADERS = ['Champ', 'Valeur'];

// Reconnait les fieldKey "suivi_note_generales_suivi_N" (Notes, tous les
// suivis) generees par renderSuiviTab_ (Index.html). Renvoie l'id
// ("suivi_N") ou null si le format ne correspond pas.
function _parseSuiviFieldKey_(fieldKey) {
  const m = /^suivi_note_generales_(suivi_\d+)$/.exec(fieldKey);
  return m ? m[1] : null;
}

// Reconnait les fieldKey "suivi45_note_aborde_lev_xxx_N_abordee" / "..._a_aborder_...",
// qui n'existent que sur le TOUT 1ER suivi ("suivi_1", seul a afficher les
// leviers abordes/a aborder). Renvoie null si le format ne correspond pas.
function _parseSuiviLevierFieldKey_(fieldKey) {
  const m = /^suivi45_note_(aborde|a_aborder)_lev_([a-z_]+)_(\d+)_abordee$/.exec(fieldKey);
  if (!m) return null;
  return { mode: m[1], catId: m[2], itemIndex: Number(m[3]) };
}

// Ecrit les notes de "Consultation de suivi" (notes generales, tous les
// suivis ; notes par levier, seulement le 1er) dans un onglet de la fiche
// NOMME AVEC LA DATE de la consultation concernee (ex: "Suivi 15/09/2026"),
// retrouvee dans client.suivisHistorique (voir _getHistoriqueSuivis_ dans
// Sheet.gs) : chaque nouvelle consultation de suivi cree ainsi naturellement
// un nouvel onglet distinct au lieu d'ecraser le precedent.
function _writeFicheSuivi_(client, fieldKey, texte, coche, debugLog) {
  const suiviIdNotesGenerales = _parseSuiviFieldKey_(fieldKey);
  const parsedLevier = _parseSuiviLevierFieldKey_(fieldKey);
  if (!suiviIdNotesGenerales && !parsedLevier) {
    _log_(debugLog, 'Suivi : fieldKey "' + fieldKey + '" ne correspond pas au format Suivi, ignoré (normal si ce n\'est pas un champ de suivi).');
    return;
  }

  // Les notes par levier n'existent que sur le 1er suivi de l'historique.
  const suiviId = suiviIdNotesGenerales || 'suivi_1';
  const occurrence = (client.suivisHistorique || []).find(s => s.id === suiviId);
  if (!occurrence) {
    _log_(debugLog, 'Suivi : occurrence "' + suiviId + '" introuvable dans l\'historique Trello actuel, écriture ignorée.');
    return;
  }

  const ficheId = _findFicheSpreadsheetId_(client, debugLog);
  if (!ficheId) return;

  const ss = SpreadsheetApp.openById(ficheId);
  const nomOnglet = SUIVI_SHEET_PREFIX + occurrence.date;
  const sheet = _ensureSuiviSheet_(ss, nomOnglet);

  if (suiviIdNotesGenerales) {
    const row = _findOrCreateSuiviRow_(sheet, 'Notes générales');
    sheet.getRange(row, 2).setValue(texte || '');
    _log_(debugLog, 'Suivi : notes générales écrites (onglet "' + nomOnglet + '", ligne ' + row + ').');
    return;
  }

  const categories = _buildLeviers_();
  const cat = categories.find(c => c.id === parsedLevier.catId);
  const item = cat && cat.items[parsedLevier.itemIndex];
  if (!cat || !item) {
    _log_(debugLog, 'Suivi : catégorie/item introuvable pour "' + fieldKey + '" (catId=' + parsedLevier.catId + ', itemIndex=' + parsedLevier.itemIndex + ').');
    return;
  }

  const champLabel = (parsedLevier.mode === 'aborde' ? 'Note (abordé) — ' : 'Note (à aborder) — ') + cat.label + ' / ' + item.label;
  const row = _findOrCreateSuiviRow_(sheet, champLabel);
  sheet.getRange(row, 2).setValue(texte || '');
  _log_(debugLog, 'Suivi : note levier écrite (onglet "' + nomOnglet + '", ligne ' + row + ').');
}

// Crée (au 1er écrit seulement) l'onglet de suivi daté, avec juste
// l'en-tête — les lignes se remplissent au fil de l'eau (nombre de leviers
// abordés/à aborder variable d'une famille à l'autre).
function _ensureSuiviSheet_(ss, nomOnglet) {
  let sheet = ss.getSheetByName(nomOnglet);
  if (sheet) return sheet;

  sheet = ss.insertSheet(nomOnglet);
  sheet.getRange(1, 1, 1, SUIVI_HEADERS.length).setValues([SUIVI_HEADERS]);
  sheet.getRange(1, 1, 1, SUIVI_HEADERS.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(2, 500);
  sheet.getRange(2, 2, 50, 1).setWrap(true);
  return sheet;
}

// Cherche la ligne "Champ" exact ; si absente, l'ajoute a la fin.
function _findOrCreateSuiviRow_(sheet, champ) {
  const lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === champ) return i + 2;
    }
  }
  const newRow = Math.max(lastRow + 1, 2);
  sheet.getRange(newRow, 1).setValue(champ);
  return newRow;
}

// --- Réflexions & Questions à poser -------------------------------------

const NOTES_SHEET_NAME = 'Réflexions & Questions à poser';

// Écrit le texte libre de "Réflexions" ou "Questions à poser" (saveNote,
// PAS saveFieldAnnotation — ce sont 2 zones de texte, pas des compléments
// par champ) dans un onglet dédié de la fiche, 1 ligne chacune.
function _writeFicheNote_(client, column, text, debugLog) {
  const label = column === QUESTIONS_COLUMN ? 'Questions à poser'
    : column === REFLEXIONS_COLUMN ? 'Réflexions/Diagnostic'
    : null;
  if (!label) return;

  const ficheId = _findFicheSpreadsheetId_(client, debugLog);
  if (!ficheId) return;

  const ss = SpreadsheetApp.openById(ficheId);
  const sheet = _ensureNotesSheet_(ss);
  const row = label === 'Questions à poser' ? 2 : 3;
  sheet.getRange(row, 2).setValue(text || '');
  _log_(debugLog, 'Notes : écrit "' + label + '" (ligne ' + row + ').');
}

function _ensureNotesSheet_(ss) {
  let sheet = ss.getSheetByName(NOTES_SHEET_NAME);
  if (sheet) return sheet;

  sheet = ss.insertSheet(NOTES_SHEET_NAME);
  sheet.getRange(1, 1, 3, 2).setValues([
    ['Champ', 'Contenu'],
    ['Questions à poser', ''],
    ['Réflexions/Diagnostic', '']
  ]);
  sheet.getRange(1, 1, 1, 2).setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(2, 500);
  sheet.getRange(2, 2, 2, 1).setWrap(true);
  sheet.autoResizeColumn(1);

  return sheet;
}
