/**
 * Config.gs — variante "Fée Dodo" : pointe sur un Sheet dédié, vierge (juste
 * les en-têtes de colonnes + 1 ligne vide), jamais sur les vraies données
 * clientes de La Tribu des Rêveurs. Pas de dossier Drive : la génération de
 * fiche (fonctionnalité retirée de cette variante) n'est pas utilisée ici.
 */

// ID du Sheet vierge dédié à cette variante (créé par Setup.gs).
const SHEET_ID = '1GoiGav2woodh1uQCNcTnNtE87QWTQfasczznC5jjX5M';

// Nom de l'onglet contenant une ligne par client
const SHEET_NAME = 'Données brutes';

// Non utilisé dans cette variante (pas de génération de fiche).
const DRIVE_FOLDER_ID = '';

// Colonnes (créées automatiquement si absentes) utilisées par l'appli pour
// stocker ce que Sophie écrit : les 2 encadrés persistants communs à tous les
// onglets, et un blob JSON pour les compléments + coches saisis champ par champ.
const QUESTIONS_COLUMN = 'Questions à poser';
const REFLEXIONS_COLUMN = 'Réflexions';
const ANNOTATIONS_COLUMN = 'Annotations_Champs';

// URL de ce Web App (sert de lien "Fiche" vers l'appli de consultation,
// ajoute sur la carte Trello des la reservation payee).
const URL_APPLICATION_WEB = 'https://script.google.com/macros/s/AKfycbxy_Z9iA9KGNy4duAI7ix1kNi8SpAZf6y0H4yTKXXcGj9yP7DiGBEEygSOlBiW2RJgaNQ/exec';
