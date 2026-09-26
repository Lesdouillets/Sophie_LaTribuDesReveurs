/**
 * BlocageFeeDodo.gs — pour chaque reservation La Tribu, cree dans l'agenda
 * Fee Dodo (sophie@feedodo.fr) un evenement "Occupe" au meme horaire, pour que
 * le systeme de creneaux Fee Dodo (qui ne regarde que les evenements de cet
 * agenda) ne propose pas ce creneau. Aucune info sur la famille n'y est ecrite.
 *
 * Necessite que l'agenda sophie@feedodo.fr soit partage avec le compte qui fait
 * tourner ce script, avec "Apporter des modifications aux evenements".
 *
 * Toutes les fonctions ci-dessous ne levent jamais d'erreur : un souci de
 * blocage ne doit jamais empecher la creation de la carte Trello.
 */

const FEEDODO_CALENDAR_ID = 'sophie@feedodo.fr';
const FEEDODO_BLOCS_PROP = 'FEEDODO_BLOCS';

// Cree (ou recree, si le meme uid existe deja ou si c'est un report) le
// bloc "Occupe" correspondant a une reservation Cal.com.
function _bloquerCreneauFeeDodo_(payload) {
  const verrou = LockService.getScriptLock();
  try {
    verrou.waitLock(10000);
    if (!payload || !payload.uid || !payload.startTime || !payload.endTime) {
      Logger.log('Blocage Fee Dodo : payload incomplet (uid/startTime/endTime), ignore.');
      return;
    }
    const cal = CalendarApp.getCalendarById(FEEDODO_CALENDAR_ID);
    if (!cal) {
      Logger.log('Blocage Fee Dodo : agenda ' + FEEDODO_CALENDAR_ID + ' introuvable (partage non accepte ?).');
      return;
    }
    const blocs = _feedodoBlocsCharger_();
    if (payload.rescheduleUid) _feedodoBlocSupprimer_(cal, blocs, payload.rescheduleUid);
    _feedodoBlocSupprimer_(cal, blocs, payload.uid);

    const evenement = cal.createEvent('Occupé', new Date(payload.startTime), new Date(payload.endTime));
    blocs[payload.uid] = { id: evenement.getId(), t: Date.now() };
    _feedodoBlocsSauver_(blocs);
    try {
      evenement.setVisibility(CalendarApp.Visibility.PRIVATE);
      evenement.removeAllReminders();
    } catch (errReglages) {
      Logger.log('Blocage Fee Dodo : reglages (prive/rappels) non appliques : ' + errReglages.message);
    }
    Logger.log('Blocage Fee Dodo cree pour la reservation ' + payload.uid);
  } catch (err) {
    Logger.log('Erreur blocage Fee Dodo : ' + err.message);
  } finally {
    try { verrou.releaseLock(); } catch (e) {}
  }
}

// Supprime le bloc "Occupe" d'une reservation annulee.
function _debloquerCreneauFeeDodo_(payload) {
  const verrou = LockService.getScriptLock();
  try {
    verrou.waitLock(10000);
    if (!payload || !payload.uid) return;
    const blocs = _feedodoBlocsCharger_();
    if (!blocs[payload.uid]) return;
    const cal = CalendarApp.getCalendarById(FEEDODO_CALENDAR_ID);
    if (!cal) {
      Logger.log('Deblocage Fee Dodo : agenda ' + FEEDODO_CALENDAR_ID + ' introuvable.');
      return;
    }
    _feedodoBlocSupprimer_(cal, blocs, payload.uid);
    _feedodoBlocsSauver_(blocs);
    Logger.log('Blocage Fee Dodo supprime pour la reservation ' + payload.uid);
  } catch (err) {
    Logger.log('Erreur deblocage Fee Dodo : ' + err.message);
  } finally {
    try { verrou.releaseLock(); } catch (e) {}
  }
}

function _feedodoBlocSupprimer_(cal, blocs, uid) {
  const bloc = blocs[uid];
  if (!bloc) return;
  try {
    const evenement = cal.getEventById(bloc.id);
    if (evenement) evenement.deleteEvent();
  } catch (err) {
    Logger.log('Suppression du bloc Fee Dodo (' + uid + ') impossible : ' + err.message);
  }
  delete blocs[uid];
}

function _feedodoBlocsCharger_() {
  return JSON.parse(PropertiesService.getScriptProperties().getProperty(FEEDODO_BLOCS_PROP) || '{}');
}

function _feedodoBlocsSauver_(blocs) {
  const limite = Date.now() - 180 * 24 * 60 * 60 * 1000;
  Object.keys(blocs).forEach(uid => { if (blocs[uid].t < limite) delete blocs[uid]; });
  PropertiesService.getScriptProperties().setProperty(FEEDODO_BLOCS_PROP, JSON.stringify(blocs));
}

// ============================================================
// ESSAI BOUT EN BOUT (sans payer) : cree un vrai bloc "Occupe" dans l'agenda
// Fee Dodo, comme le ferait une reservation payee, le lundi 5 octobre 2026
// de 9h a 10h30 (heure de Paris). Verifier ensuite que l'outil Fee Dodo
// considere ce creneau comme indisponible, puis lancer
// supprimerEssaiBlocageFeeDodo() pour l'enlever.
// ============================================================
function creerEssaiBlocageFeeDodo() {
  _bloquerCreneauFeeDodo_({
    uid: 'essai-blocage-feedodo',
    startTime: '2026-10-05T07:00:00.000Z',
    endTime: '2026-10-05T08:30:00.000Z'
  });
}

function supprimerEssaiBlocageFeeDodo() {
  _debloquerCreneauFeeDodo_({ uid: 'essai-blocage-feedodo' });
}

// ============================================================
// A LANCER UNE SEULE FOIS MANUELLEMENT (bouton "Executer") : demande
// l'autorisation d'acces a l'agenda, puis verifie que l'agenda Fee Dodo est
// accessible en ecriture (cree un evenement de 5 min dans 2 mois, a 3h du
// matin, puis le supprime aussitot).
// ============================================================
function testerBlocageFeeDodo() {
  const cal = CalendarApp.getCalendarById(FEEDODO_CALENDAR_ID);
  if (!cal) {
    Logger.log('ECHEC : agenda ' + FEEDODO_CALENDAR_ID + ' introuvable. Le partage a-t-il ete accepte sur le Gmail perso ?');
    return;
  }
  Logger.log('Agenda trouve : ' + cal.getName());
  const debut = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
  debut.setHours(3, 0, 0, 0);
  const fin = new Date(debut.getTime() + 5 * 60 * 1000);
  const evenement = cal.createEvent('TEST blocage (supprime aussitot)', debut, fin);
  Logger.log('Ecriture OK.');
  evenement.deleteEvent();
  Logger.log('Suppression OK : tout fonctionne.');
}
