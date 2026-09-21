/**
 * Config.gs — identifiants à renseigner une fois le Google Sheet (Tally) et
 * le dossier Drive des fiches créés. Tant que ces valeurs sont vides,
 * l'appli tourne quand même mais renvoie des listes vides / erreurs claires.
 */

// ID du Google Sheet alimenté par Tally (dans l'URL du Sheet :
// https://docs.google.com/spreadsheets/d/CET_ID_ICI/edit)
const SHEET_ID = '1K7HK8i_AuNG12XZ6RTmt6W226MbKurtaZ6NPmWglixI';

// Nom de l'onglet contenant une ligne par client (réponses Tally)
const SHEET_NAME = 'Données brutes';

// ID du dossier Google Drive où seront enregistrées les fiches générées
// (dans l'URL du dossier Drive : https://drive.google.com/drive/folders/CET_ID_ICI)
const DRIVE_FOLDER_ID = '1v3kKM3m_1uJEMF4uNxoCRmMHqqtG8nVF';

// Colonnes (créées automatiquement si absentes) utilisées par l'appli pour
// stocker ce que Sophie écrit : les 2 encadrés persistants communs à tous les
// onglets, et un blob JSON pour les compléments + coches saisis champ par champ.
const QUESTIONS_COLUMN = 'Questions à poser';
const REFLEXIONS_COLUMN = 'Réflexions';
const ANNOTATIONS_COLUMN = 'Annotations_Champs';

// URL de ce Web App (sert de lien "Fiche" vers l'appli de consultation,
// ajoute sur la carte Trello des la reservation payee).
const URL_APPLICATION_WEB = 'https://script.google.com/macros/s/AKfycbxy_Z9iA9KGNy4duAI7ix1kNi8SpAZf6y0H4yTKXXcGj9yP7DiGBEEygSOlBiW2RJgaNQ/exec';
