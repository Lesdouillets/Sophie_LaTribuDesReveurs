# La Tribu des Rêveurs — Apps Script

Remplace l'ancien site statique par un Google Apps Script (Web App) personnel,
branché sur le Google Sheet alimenté par Tally, avec fiches clients générées
dans Google Drive.

## Fichiers

- `Config.gs` — IDs du Sheet et du dossier Drive à renseigner
- `Sheet.gs` — lecture/écriture générique du Sheet (mapping par en-têtes)
- `Drive.gs` — génération de la fiche client (Google Doc) dans Drive
- `Code.gs` — `doGet` : sert la page web
- `Index.html` — interface (sélecteur client, fiche personnalisée, remarques)
- `appsscript.json` — manifeste (Web App exécuté en tant que toi, accès privé)

## Mise en route (une seule fois)

1. **Connexion** (fenêtre Google qui s'ouvre dans le navigateur) :
   ```bash
   clasp login
   ```
2. **Créer le projet Apps Script** (depuis le dossier `apps-script/`) :
   ```bash
   cd apps-script
   clasp create --type webapp --title "La Tribu des Rêveurs" --rootDir .
   ```
   Cela génère un `.clasp.json` avec l'ID du script (ne pas committer si tu
   préfères le garder privé — déjà ignoré si besoin).
3. **Renseigner `Config.gs`** avec :
   - `SHEET_ID` : l'ID de ton Google Sheet Tally (dans son URL)
   - `SHEET_NAME` : le nom de l'onglet contenant les réponses
   - `DRIVE_FOLDER_ID` : l'ID du dossier Drive où ranger les fiches générées
4. **Pousser le code** :
   ```bash
   clasp push
   ```
5. **Déployer en Web App** :
   ```bash
   clasp deploy
   ```
   `clasp open` ouvre l'éditeur en ligne si tu veux vérifier/déployer
   manuellement (Déployer > Nouveau déploiement > Application Web,
   "Exécuter en tant que : Moi", "Qui a accès : Uniquement moi").

## Mises à jour suivantes

Après chaque modification de ces fichiers :
```bash
clasp push
```
(Un nouveau `clasp deploy` n'est nécessaire que si tu utilises une URL de
déploiement figée ; sinon la version `HEAD` du script se met à jour à chaud
via `clasp open`.)

## À affiner une fois le vrai Sheet branché

- Le regroupement des champs par section (Informations générales,
  Problématique, Santé, Environnement, Leviers…) reprendra la structure du
  modèle une fois les vrais noms de colonnes connus.
- Idem pour les "Leviers à proposer" (cases à cocher) si elles doivent être
  éditables depuis l'appli.
