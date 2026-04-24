// ============================================================
// DONNÉES DU SCRIPT DE CONSULTATION SOMMEIL
// Sophie Douesneau – La tribu des rêveurs
// ============================================================

// ─── LABELS DES LEVIERS (= labels des cases à cocher) ─────────
// Utilisés pour synchroniser les titres des sections / bandeaux enfant
// avec ce qui apparaît dans "Leviers identifiés". Source de vérité unique.
const PB_LABELS = {
  // Confort physique
  'rgo_allergie': 'RGO douloureux + Suspicion allergie (APLV)',
  'allergie_seule': 'Suspicion allergie seule',
  'rgo_seul': 'RGO seul',
  // Organisation de la journée (rythme)
  'rythme_te_trop_long': "Temps d'éveil trop long",
  'rythme_te_trop_court': "Temps d'éveil trop court",
  'rythme_siestes_courtes': 'Siestes courtes',
  'rythme_horaires_aleatoires': 'Horaires aléatoires',
  'rythme_activite_physique': "Pas d'activité physique",
  'rythme_reveil_decalage': 'Réveil matinal — Décalage horaire',
  'rythme_reveil_fatigue': 'Réveil matinal — Fatigue accumulée',
  'rythme_reveil_relationnel': 'Réveil matinal — Enjeu relationnel',
  'rythme_reveil_mange': 'Réveil matinal — Mange et ne peut pas se rendormir',
  'rythme_reveil_faim': "Réveil matinal — Faim et n'a pas le sein/bib",
  'rythme_reveil_dependance': 'Réveil matinal — Dépendance',
  'rythme_reveil_bruit': 'Réveil matinal — Bruit extérieur/lumière',
  // Stratégie de sommeil
  'strategie_rendormissement': 'Rendormissement difficile',
  'strategie_enjeu_relationnel': 'Enjeu relationnel',
  'strategie_tetine': 'Dépendance tétine',
  // Environnement de sommeil
  'env_obscurite': 'Obscurité insuffisante',
  'env_temperature': 'Température trop élevée',
  'env_lit_ouvert': 'Lit ouvert trop tôt',
  'env_rituel': 'Rituel absent ou trop court',
  'env_cadre': 'Cadre non clair',
  'env_stimulations': 'Stimulations visuelles',
  'env_ecrans': 'Ecrans',
  // Enjeux relationnels
  'relationnel_lit_parental': 'Vient dans le lit parental',
  'relationnel_conflit_autres': "En « conflit » sur d'autres sujets que le sommeil",
  'relationnel_rappels': 'Multiples rappels après le coucher',
  // Nutrition — Courbe de poids qui diminue
  'nutri_courbe_declinante': 'Courbe de poids qui diminue',
  'nutri_courbe_inferieur': 'Courbe de poids sur percentile inférieur',
  'nutri_esp_long': 'Espacement trop long entre 2 prises',
  'nutri_esp_court': 'Espacement trop court entre 2 prises',
  'nutri_vol_petit': 'Volume de biberon trop petit',
  'nutri_vol_gros': 'Volume de biberon trop gros',
  'nutri_vol_longtemps': 'Biberon bu trop longtemps',
  'nutri_tetee': 'Tétée — baisse de lactation',
  'nutri_tetee_longue': 'Tétées longues',
  'nutri_tetee_greve': 'Grève des tétées',
  'nutri_tetee_mode_garde': 'Baisse de lactation — mode de garde',
  'nutri_tetine_coupe_faim': 'Tétine = cache-faim',
  'nutri_autre_feculents': 'Pas assez de féculents',
  'nutri_autre_lait_solide_important': 'Lait / solide trop important',
  'nutri_autre_jus_vegetal': 'Jus végétal',
  'nutri_autre_lait_animal': 'Lait animal',
  'nutri_inversion_jour_nuit': 'Inversion Jour/Nuit',
  'nutri_inversion_lait_solide': 'Inversion ordre Lait / Solide',
  // Nutrition — Percentile inférieur (mêmes sous-items que "diminue")
  'nutri_inf_esp_long': 'Espacement trop long entre 2 prises',
  'nutri_inf_esp_court': 'Espacement trop court entre 2 prises',
  'nutri_inf_vol_petit': 'Volume de biberon trop petit',
  'nutri_inf_vol_gros': 'Volume de biberon trop gros',
  'nutri_inf_vol_longtemps': 'Biberon bu trop longtemps',
  'nutri_inf_tetee': 'Tétée — baisse de lactation',
  'nutri_inf_tetee_longue': 'Tétées longues',
  'nutri_inf_tetee_greve': 'Grève des tétées',
  'nutri_inf_tetee_mode_garde': 'Baisse de lactation — mode de garde',
  'nutri_inf_tetine_coupe_faim': 'Tétine = cache-faim',
  'nutri_inf_autre_feculents': 'Pas assez de féculents',
  'nutri_inf_autre_lait_solide_important': 'Lait / solide trop important',
  'nutri_inf_autre_jus_vegetal': 'Jus végétal',
  'nutri_inf_autre_lait_animal': 'Lait animal',
  'nutri_inf_inversion_jour_nuit': 'Inversion Jour/Nuit',
  'nutri_inf_inversion_lait_solide': 'Inversion ordre Lait / Solide',
  // Nutrition — Trop d'apport
  'nutri_trop_apport': "Trop d'apport",
  'nutri_ta_esp_long': 'Espacement trop long entre 2 prises',
  'nutri_ta_esp_court': 'Espacement trop court entre 2 prises',
  'nutri_ta_vol_petit': 'Volume de biberon trop petit',
  'nutri_ta_vol_gros': 'Volume de biberon trop gros',
  'nutri_ta_vol_longtemps': 'Biberon bu trop longtemps',
  'nutri_ta_inversion_jour_nuit': 'Inversion Jour/Nuit',
  'nutri_ta_inversion_lait_solide': 'Inversion ordre Lait / Solide',
  'nutri_ta_autre_feculents': 'Féculent IMPORTANT',
  'nutri_ta_autre_lait_solide_important': 'Lait / solide trop important',
  'nutri_ta_autre_jus_vegetal': 'Jus végétal',
  'nutri_ta_autre_lait_animal': 'Lait animal',
  // Nutrition — Lait (courbes OK) — Espacement trop long
  'nutri_lait_ok': 'Lait (courbes OK)',
  'nutri_lok_esp_long': 'Espacement trop long (courbes OK)',
  'nutri_lok_esp_court': 'Espacement trop court (courbes OK)',
  'nutri_lok_long_vol_petit': 'Petit bib',
  'nutri_lok_long_vol_gros': 'Gros bib',
  'nutri_lok_long_vol_longtemps': 'Biberon bu trop longtemps',
  'nutri_lok_long_tetee': 'Tétée — baisse de lactation',
  'nutri_lok_long_tetee_longue': 'Tétées longues',
  'nutri_lok_long_tetee_greve': 'Grève des tétées',
  'nutri_lok_long_tetee_mode_garde': 'Baisse de lactation — mode de garde',
  'nutri_lok_long_inversion_jour_nuit': 'Inversion Jour/Nuit',
  'nutri_lok_long_inversion_lait_solide': 'Inversion ordre lait/solide',
  'nutri_lok_long_tetine_cache_faim': 'Tétine = cache-faim',
  'nutri_lok_long_autre_feculents': 'Pas assez de féculents',
  'nutri_lok_long_autre_lait_solide_important': 'Lait / solide trop important',
  'nutri_lok_long_autre_jus_vegetal': 'Jus végétal',
  'nutri_lok_long_autre_lait_animal': 'Lait animal',
  'nutri_lok_long_conseq_inconfort': 'Conséquences : Inconfort',
  'nutri_lok_long_conseq_mange_nuit': 'Conséquences : Mange la nuit',
  // Nutrition — Lait (courbes OK) — Espacement trop court
  'nutri_lok_court_vol_petit': 'Petit bib',
  'nutri_lok_court_vol_gros': 'Gros bib',
  'nutri_lok_court_inconfort_digestif': 'Inconfort digestif',
  'nutri_lok_court_inversion_jour_nuit': 'Inversion Jour/Nuit',
  'nutri_lok_court_inversion_lait_solide': 'Inversion ordre lait/solide',
  'nutri_lok_court_autre_feculents': 'Pas assez de féculents',
  'nutri_lok_court_autre_lait_solide_important': 'Lait / solide trop important',
  'nutri_lok_court_autre_jus_vegetal': 'Jus végétal',
  'nutri_lok_court_autre_lait_animal': 'Lait animal',
  'nutri_lok_court_conseq_inconfort': 'Conséquences : Inconfort',
  'nutri_lok_court_conseq_mange_nuit': 'Conséquences : Mange la nuit',
  // Nutrition — Lait (courbes OK) — Lait animal
  'nutri_lok_lait_animal': 'Lait animal (courbes OK)',
  'nutri_lok_la_esp_long': 'Espacement trop long entre 2 prises',
  'nutri_lok_la_esp_court': 'Espacement trop court entre 2 prises',
  'nutri_lok_la_vol_petit': 'Petit bib',
  'nutri_lok_la_vol_gros': 'Gros bib',
  'nutri_lok_la_vol_longtemps': 'Biberon bu trop longtemps',
  'nutri_lok_la_inconfort_digestif': 'Inconfort digestif',
  'nutri_lok_la_tetee': 'Tétée — baisse de lactation',
  'nutri_lok_la_tetee_longue': 'Tétées longues',
  'nutri_lok_la_tetee_greve': 'Grève des tétées',
  'nutri_lok_la_tetee_mode_garde': 'Baisse de lactation — mode de garde',
  'nutri_lok_la_inversion_jour_nuit': 'Inversion Jour/Nuit',
  'nutri_lok_la_inversion_lait_solide': 'Inversion ordre lait/solide',
  'nutri_lok_la_tetine_cache_faim': 'Tétine = cache-faim',
  'nutri_lok_la_autre_feculents': 'Pas assez de féculents',
  'nutri_lok_la_autre_lait_solide_important': 'Lait / solide trop important',
  'nutri_lok_la_conseq_inconfort': 'Conséquences : Inconfort',
  'nutri_lok_la_conseq_mange_nuit': 'Conséquences : Mange la nuit',
  // Nutrition — Lait (courbes OK) — Jus végétal
  'nutri_lok_jus_vegetal': 'Jus végétal (courbes OK)',
  'nutri_lok_jv_esp_long': 'Espacement trop long entre 2 prises',
  'nutri_lok_jv_esp_court': 'Espacement trop court entre 2 prises',
  'nutri_lok_jv_vol_petit': 'Petit bib',
  'nutri_lok_jv_vol_gros': 'Gros bib',
  'nutri_lok_jv_vol_longtemps': 'Biberon bu trop longtemps',
  'nutri_lok_jv_inconfort_digestif': 'Inconfort digestif',
  'nutri_lok_jv_tetee': 'Tétée — baisse de lactation',
  'nutri_lok_jv_tetee_longue': 'Tétées longues',
  'nutri_lok_jv_tetee_greve': 'Grève des tétées',
  'nutri_lok_jv_tetee_mode_garde': 'Baisse de lactation — mode de garde',
  'nutri_lok_jv_inversion_jour_nuit': 'Inversion Jour/Nuit',
  'nutri_lok_jv_inversion_lait_solide': 'Inversion ordre lait/solide',
  'nutri_lok_jv_tetine_cache_faim': 'Tétine = cache-faim',
  'nutri_lok_jv_autre_feculents': 'Pas assez de féculents',
  'nutri_lok_jv_autre_lait_solide_important': 'Lait / solide trop important',
  'nutri_lok_jv_conseq_inconfort': 'Conséquences : Inconfort',
  'nutri_lok_jv_conseq_mange_nuit': 'Conséquences : Mange la nuit',
  // Nutrition — Lait (courbes OK) — Inversion Jour/Nuit
  'nutri_lok_inv_jn': 'Inversion Jour/Nuit (courbes OK)',
  'nutri_lok_ijn_esp_long': 'Espacement trop long entre 2 prises',
  'nutri_lok_ijn_esp_court': 'Espacement trop court entre 2 prises',
  'nutri_lok_ijn_vol_petit': 'Petit bib',
  'nutri_lok_ijn_vol_gros': 'Gros bib',
  'nutri_lok_ijn_vol_longtemps': 'Biberon bu trop longtemps',
  'nutri_lok_ijn_tetee': 'Tétée — baisse de lactation',
  'nutri_lok_ijn_tetee_longue': 'Tétées longues',
  'nutri_lok_ijn_tetee_greve': 'Grève des tétées',
  'nutri_lok_ijn_tetee_mode_garde': 'Baisse de lactation — mode de garde',
  'nutri_lok_ijn_inversion_lait_solide': 'Inversion ordre lait/solide',
  'nutri_lok_ijn_tetine_cache_faim': 'Tétine = cache-faim',
  'nutri_lok_ijn_autre_feculents': 'Pas assez de féculents',
  'nutri_lok_ijn_autre_lait_solide_important': 'Lait / solide trop important',
  'nutri_lok_ijn_autre_jus_vegetal': 'Jus végétal',
  'nutri_lok_ijn_autre_lait_animal': 'Lait animal',
  'nutri_lok_ijn_conseq_inconfort': 'Conséquences : Inconfort',
  // Nutrition — Lait (courbes OK) — Lait N°1
  'nutri_lok_lait_n1': 'Lait N°1 (courbes OK)',
  'nutri_lok_n1_esp_long': 'Espacement trop long entre 2 prises',
  'nutri_lok_n1_esp_court': 'Espacement trop court entre 2 prises',
  'nutri_lok_n1_vol_petit': 'Petit bib',
  'nutri_lok_n1_vol_gros': 'Gros bib',
  'nutri_lok_n1_vol_longtemps': 'Biberon bu trop longtemps',
  'nutri_lok_n1_tetee': 'Tétée — baisse de lactation',
  'nutri_lok_n1_tetee_longue': 'Tétées longues',
  'nutri_lok_n1_tetee_greve': 'Grève des tétées',
  'nutri_lok_n1_tetee_mode_garde': 'Baisse de lactation — mode de garde',
  'nutri_lok_n1_inversion_jour_nuit': 'Inversion Jour/Nuit',
  'nutri_lok_n1_inversion_lait_solide': 'Inversion ordre lait/solide',
  'nutri_lok_n1_tetine_cache_faim': 'Tétine = cache-faim',
  'nutri_lok_n1_autre_feculents': 'TROP de féculents',
  'nutri_lok_n1_autre_jus_vegetal': 'Jus végétal',
  'nutri_lok_n1_autre_lait_animal': 'Lait animal',
  'nutri_lok_n1_conseq_mange_nuit': 'Conséquences : Mange la nuit',
  // Nutrition — Diversification N°1
  'nutri_div_n1': 'Diversification N°1',
  'nutri_div_n1_bib_strat_dep': 'Bib = stratégie dépendante',
  'nutri_div_n1_esp_long': 'Espacement trop long entre 2 prises',
  'nutri_div_n1_esp_court': 'Espacement trop court entre 2 prises',
  'nutri_div_n1_vol_petit': 'Petit bib',
  'nutri_div_n1_vol_gros': 'Gros bib',
  'nutri_div_n1_vol_longtemps': 'Biberon bu trop longtemps',
  'nutri_div_n1_inversion_jour_nuit': 'Inversion Jour/Nuit',
  'nutri_div_n1_inversion_lait_solide': 'Inversion ordre lait/solide',
  'nutri_div_n1_tetine_cache_faim': 'Tétine = cache-faim',
  'nutri_div_n1_autre_feculents': 'Pas assez de féculents',
  'nutri_div_n1_autre_jus_vegetal': 'Jus végétal',
  'nutri_div_n1_autre_lait_animal': 'Lait animal',
  'nutri_div_n1_conseq_mange_nuit': 'Conséquences : Mange la nuit',
  // Nutrition — Pas assez de féculents
  'nutri_div_feculents': 'Pas assez de féculents',
  'nutri_div_fec_esp_long': 'Espacement trop long entre 2 prises',
  'nutri_div_fec_esp_court': 'Espacement trop court entre 2 prises',
  'nutri_div_fec_vol_petit': 'Petit bib',
  'nutri_div_fec_vol_gros': 'Gros bib',
  'nutri_div_fec_vol_longtemps': 'Biberon bu trop longtemps',
  'nutri_div_fec_inversion_jour_nuit': 'Inversion Jour/Nuit',
  'nutri_div_fec_inversion_lait_solide': 'Inversion ordre lait/solide',
  'nutri_div_fec_tetine_cache_faim': 'Tétine = cache-faim',
  'nutri_div_fec_autre_jus_vegetal': 'Jus végétal',
  'nutri_div_fec_autre_lait_animal': 'Lait animal',
  'nutri_div_fec_conseq_dependance': 'Conséquences : Dépendance',
  'nutri_div_fec_conseq_mange_nuit': 'Conséquences : Mange la nuit',
  // Souhaits
  'souhait_tetine': 'Suppression de la tétine',
  'souhait_position_dorsale': 'Vers une position dorsale',
  'souhait_changement_lit': 'Changement de lit',
  'souhait_changement_chambre': 'Changement de chambre',
  'souhait_changement_lit_chambre': 'Changement de lit + chambre',
};

const SCRIPT_DATA = {

  required: [

    // ── I. ACCUEIL ─────────────────────────────────────────
    {
      id: "accueil",
      title: "I. Accueil",
      emoji: "👋",
      blocks: [
        { type: "normal", text: "- Bonjour\n- Je suis Sophie Douesneau,\n- Je suis consultante du sommeil chez **[enseigne_nom]**\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0 6px;font-weight:400;line-height:1.7\">❓ Vous êtes <strong>BIEN</strong> <strong>[prénom_parents]</strong>, [role_parents] de <strong>[prénom_enfant]</strong> qui a <strong>[age]</strong> ?</div><div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:0 0 12px;font-weight:400;line-height:1.7\">❓ Est-ce que <strong>quelqu'un d'autre</strong> se <strong>joindra</strong> à nous aujourd'hui ?</div>" },
        { type: "normal", text: "- On est **ensemble aujourd'hui jusqu'à** [heure_fin]\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\">❓ Est-ce que vous avez <strong>bien prévu d'être disponible</strong> jusqu'à [heure_fin] ?</div>" },
        { type: "normal", text: "- Dans le cadre d'une **1ère consultation**, je vais vous **expliquer comment ça va se passer**\n\n- On va faire ensemble **l'évaluation de la situation de sommeil** de [prénom_enfant]\n\n  - 1. Je vais **m'appuyer sur le questionnaire** que vous avez rempli\n    - Pour **approfondir les choses**\n    - Pour être **sûr de ne passer à côté de rien** en terme d'**information importante**\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\">❓ En <strong>parlant de ça</strong>, y'a-t-il eu des <strong>changements récents</strong> depuis que vous <strong>m'avez envoyé le questionnaire</strong> ?</div>\n  - 2. On va **lire les courbes de taille/poids et périmètre crânien**, car le **sommeil et l'alimentation** sont **étroitement liés**\n\n  - 3. On va **lire ensemble** le **tableau de suivi** que vous avez rempli\n\n  - 4. On va **regarder** aussi **rapidement les photos de la chambre** que vous m'avez envoyé\n\n- À partir de là, je vais :\n  - avoir une **vue détaillée de votre situation**\n  - et pouvoir vous **établir un diagnostic**\n- Ensuite, je vais :\n  - vous **proposer un plan d'action** à mettre en place\n  - par rapport à tout ce que **j'aurai compris de nos échanges**\n\n- L'**idée** de cette **1ère consultation** c'est généralement:\n  - de vous **donner des 1ers conseils**\n  - par rapport à ce que **je comprends**\n  - et ce qui me **semble prioritaire** dans votre situation\n\n- Dans **certains cas**, il y aura **peut-être besoin d'une AUTRE petite consultation** de 20 min\n  - Pour **faire le point sur les 1ères choses** que vous aurez **mises en place**\n  - Pour vous **donner des conseils supplémentaires**\n  - OU Pour **répondre aux questions** qui seraient **survenues durant ces 1ers jours**\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\">❓ Est-ce que <strong>ça vous convient</strong> ?</div>" },
        { type: "important", text: "- Je **précise** aussi que je **NE suis PAS médecin**, et **NE remplace PAS** votre médecin\n- Les **conseils** que je donne, sont **donnés à titre informatif**\n- SI j'ai le **moindre doute médical** ⇒ Je vous **redirigerai** vers un professionnel de santé\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\">❓ Nous sommes <strong>BIEN d'accord</strong> que [prénom_enfant] est [un_une] [petit_petite] [fille_garcon] qui est :<br>• En <strong>bonne santé</strong> ?<br>• A été <strong>vu récemment par un médecin</strong> ?</div>" },
        { type: "normal", text: "- La consultation est **filmée et enregistrée** pour que vous puissiez la **revisionner** à tête reposée (et la montrer au co-parent)\n- Vous pouvez **prendre des notes**, si vous le souhaitez\n- Mais de **toute façon**, je vous **enverrai un compte rendu automatique** de cette consultation\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\">❓ Est-ce que c'est <strong>OK pour vous</strong> ?</div>" },
      ]
    },

    // ── II. PROBLÉMATIQUE ──────────────────────────────────
    {
      id: "problematique",
      title: "II. Problématique",
      emoji: "🤔",
      blocks: [
        { type: "pb_intro" },
        { type: "pb_recap" },
        {
          type: "option", _floatingBubble: true, _bubbleBottom: "320px", label: "Si pleurs difficiles", emoji: "😭", style: "pleurs",
          blocks: [
            { type: "empathie", text: "- J'entends que c'est **difficile pour vous** d'**entendre** votre enfant **pleurer**...\n- Merci de me le confier.\n- Il y a **beaucoup de parents** POUR QUI :\n  - c'est **vraiment compliqué**,\n  - et **chacun a sa sensibilité** là-dessus\n  - et **c'est OK**\n- L'**idée ici**, ça ne va **PAS ÊTRE de vous forcer** à faire **qqch qui ne vous correspond pas**.\n- On va plutôt **adapter les choses à vous**, à CE QUE vous **ÊTES CAPABLE de faire** aujourd'hui.\n- Parce que :\n  - **PLUS** vous serez **[aligne_alignee] avec vous-même**\n  - **PLUS** ce **sera fluide :**\n    - pour vous...\n    - et **pour votre enfant aussi.**\n- Et on va justement **trouver ensemble :**\n  - une **façon de faire**\n  - QUI **respecte ça**" }
          ]
        },
      ]
    },

    // ── III. DÉCOUVERTE ────────────────────────────────────
    {
      id: "decouverte",
      title: "III. Découverte",
      emoji: "🔍",
      blocks: [
        { type: "normal", text: "- Ce que je vous propose maintenant,<br>c'est de **dérouler** une **journée type**, pour essayer de **comprendre AU MIEUX** votre quotidien" },
        { type: "normal", text: "<div class=\"decouverte-steps\" data-active-step=\"1\" style=\"display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:14px;align-items:stretch\"><div class=\"dec-step-col\" data-step=\"1\" onclick=\"setDecouverteStep(this, 1)\" style=\"cursor:pointer;border:2px solid #cbd5e0;border-radius:14px;padding:12px;background:#ffffff;transition:all 0.15s;display:flex;flex-direction:column;height:100%;box-sizing:border-box\"><div class=\"dec-step-title\" data-step=\"1\" style=\"padding:10px 14px;border-radius:10px;font-weight:900;font-size:14px;text-align:center;display:flex;align-items:center;justify-content:center;min-height:48px;margin-bottom:10px;transition:all 0.15s\">📔 Fiche découverte</div><div class=\"dec-step-content\" data-step=\"1\" style=\"transition:opacity 0.15s\"><div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:12px 14px;margin-top:0;font-size:14px;line-height:1.5\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:6px 8px;align-items:start\"><span>❓</span><span>•</span><span><strong>CE QU'ON peut faire</strong>, c'est qu'on peut <strong>commencer par le réveil</strong> du matin, <strong>si ça vous va</strong> ?</span></div><div style=\"margin-top:6px;font-size:13px;color:#78716c;padding-left:30px\">⇒ [Suivre la fiche découverte]</div></div></div></div><div class=\"dec-step-col\" data-step=\"2\" onclick=\"setDecouverteStep(this, 2)\" style=\"cursor:pointer;border:2px solid #cbd5e0;border-radius:14px;padding:12px;background:#ffffff;transition:all 0.15s;display:flex;flex-direction:column;height:100%;box-sizing:border-box\"><div class=\"dec-step-title\" data-step=\"2\" style=\"padding:10px 14px;border-radius:10px;font-weight:900;font-size:14px;text-align:center;display:flex;align-items:center;justify-content:center;min-height:48px;margin-bottom:10px;transition:all 0.15s\">📊 Lecture des courbes</div><div class=\"dec-step-content\" data-step=\"2\" style=\"transition:opacity 0.15s\"><ul style=\"margin:2px 0 2px 18px;padding:0;list-style:disc\"><li style=\"line-height:1.5\">On va maintenant <strong>regarder les courbes</strong></li></ul><div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:12px 14px;margin-top:8px;margin-bottom:14px;font-size:14px;line-height:1.5\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:6px 8px;align-items:start\"><span>❓</span><span>•</span><span>Est-ce que vous pourriez <strong>me donner votre taille à TOUS les 2</strong> ?</span><span></span><span>•</span><span>Avez-vous des <strong>personnes très GRANDES dans vos familles</strong> ?</span></div></div><div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:12px 14px;margin-top:8px;margin-bottom:28px;font-size:14px;line-height:1.5\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:6px 8px;align-items:start\"><span>❓</span><span>•</span><span>Avez-vous les <strong>courbes devant vous</strong> ?</span><span></span><span>•</span><span>On va <strong>commencer</strong> par lire la <strong>courbe du périmètre crânien</strong></span></div></div></div></div><div class=\"dec-step-col\" data-step=\"3\" onclick=\"setDecouverteStep(this, 3)\" style=\"cursor:pointer;border:2px solid #cbd5e0;border-radius:14px;padding:12px;background:#ffffff;transition:all 0.15s;display:flex;flex-direction:column;height:100%;box-sizing:border-box\"><div class=\"dec-step-title\" data-step=\"3\" style=\"padding:10px 14px;border-radius:10px;font-weight:900;font-size:14px;text-align:center;display:flex;align-items:center;justify-content:center;min-height:48px;margin-bottom:10px;transition:all 0.15s\">📋 Tableau de suivi du sommeil</div><div class=\"dec-step-content\" data-step=\"3\" style=\"transition:opacity 0.15s\"><ul style=\"margin:2px 0 2px 18px;padding:0;list-style:disc\"><li style=\"line-height:1.5\">Maintenant, on va <strong>lire ensemble</strong> le <strong>tableau de suivi du sommeil</strong> que vous avez rempli</li></ul></div></div><div class=\"dec-step-col\" data-step=\"4\" onclick=\"setDecouverteStep(this, 4)\" style=\"cursor:pointer;border:2px solid #cbd5e0;border-radius:14px;padding:12px;background:#ffffff;transition:all 0.15s;display:flex;flex-direction:column;height:100%;box-sizing:border-box\"><div class=\"dec-step-title\" data-step=\"4\" style=\"padding:10px 14px;border-radius:10px;font-weight:900;font-size:14px;text-align:center;display:flex;align-items:center;justify-content:center;min-height:48px;margin-bottom:10px;transition:all 0.15s\">📸 Photos de la chambre</div><div class=\"dec-step-content\" data-step=\"4\" style=\"transition:opacity 0.15s\"><ul style=\"margin:2px 0 2px 18px;padding:0;list-style:disc\"><li style=\"line-height:1.5\">On va maintenant <strong>regarder rapidement les photos</strong> de la chambre</li></ul></div></div></div>" },
        { type: "decouverte_notes_question" },
        {
          type: "option", _floatingBubble: true, label: "Si Maman en dépression/très fatiguée", emoji: "😭", style: "pleurs",
          blocks: [
            { type: "question", text: "Est-ce que vous êtes **accompagnée** du coup ?", embeddedActions: [
              {
                label: "Accompagnée", emoji: "✅", style: "action-green", _pillStyle: true, mutexGroup: "decouverte-psy",
                blocks: [
                  { type: "empathie", text: "- **Super !**\n- **Je comprends…** ce que vous vivez, c'est **vraiment pas simple.**\n- Après une naissance, c'est **NORMAL** de se sentir **fatiguée**, et de se sentir un peu **perdue** par moments.\n- Vous êtes **LOIN** d'être la **SEULE** à passer par là" },
                  { type: "conseil", text: "- 👏 Et j'ai envie de vous dire **quelque chose d'important** :\n- vous faites déjà **énormément** pour votre BB\n- Même si parfois, vous avez l'impression **DE NE pas y arriver** ⇒ **EN RÉALITÉ**, vous vous en occupez **très bien**" },
                  { type: "empathie", text: "- Le **manque de sommeil**… tous les **changements**… ⇒ forcément, ça joue sur le **moral**\n- Mais ça ne remet absolument **PAS** en question le fait que vous êtes une **bonne maman**\n\n- Et je trouve ça **super** que vous soyez déjà **accompagnée par un professionnel** — C'est une **très bonne démarche** !\n\n- De mon côté, je suis là pour vous **accompagner sur le sommeil** de votre bébé **ET AUSSI** pour vous aider à retrouver un peu de **souffle au quotidien.**\n\n- **Vous n'êtes pas seule**, et vous faites de votre mieux (👏… et c'est **déjà beaucoup**)" }
                ]
              },
              {
                label: "PAS accompagnée", emoji: "❌", style: "action", _pillStyle: true, mutexGroup: "decouverte-psy",
                blocks: [
                  { type: "empathie", text: "- D'accord. **Je comprends…** ce que vous vivez, c'est **vraiment pas simple.**\n- Après une naissance, c'est **NORMAL** de se sentir **fatiguée** et un peu **perdue** par moments.\n- Vous êtes **LOIN** d'être la **SEULE** à passer par là." },
                  { type: "conseil", text: "- 👏 Vous faites déjà **énormément** pour votre BB\n- Même si parfois, vous avez l'impression **DE NE pas y arriver** ⇒ **EN RÉALITÉ**, vous vous en occupez **très bien**" },
                  { type: "empathie", text: "- Et si à un moment vous ressentez le **besoin d'en parler**, de ne **PAS rester seule** avec tout ça…\n- Ça peut être : votre **médecin**, votre **sage-femme**, ou un **psychologue.**\n- L'idée : de ne **PAS garder tout ça pour vous**, et d'avoir un **espace pour en parler.**\n\n- De mon côté, je suis là pour vous **accompagner sur le sommeil** **ET aussi** pour vous aider à retrouver un peu de **souffle au quotidien.**\n\n- Mais je voulais aussi que vous gardiez en tête que :\n  - → **vous n'êtes pas seule,**\n  - → que vous faites de votre mieux (👏… et c'est **déjà beaucoup**)" }
                ]
              }
            ]},
          ]
        },
      ]
    },

    // ── IV. OBJECTIFS ──────────────────────────────────────
    {
      id: "objectifs",
      title: "IV. Objectifs",
      emoji: "🎯",
      blocks: [
        { type: "obj_intro" },
        { type: "obj_recap" },
        {
          type: "option", label: "Lieu de sommeil/lit\nSouhait de changer ?", emoji: "🛌", style: "purple-btn", hideIfPb: ["souhait_changement_lit","souhait_changement_chambre","souhait_changement_lit_chambre"],
          blocks: [
            {
              type: "lieu_sommeil_intro_grid",
              text: "- J'ai aussi une **petite question** par rapport au **LIEU de sommeil**\n- Aujourd'hui, votre enfant **dort dans VOTRE chambre**",
              buttons: [
                {
                  label: "Cododo",
                  title: "Cododo",
                  width: "360px",
                  blocks: [
                    { type: "normal", text: "- **Cododo** :\n  - *Co-rooming* : lits accolés ✅\n  - *Room-sharing* : partage de chambre ✅\n  - *Bed-sharing* : partage de lit ❌\n- Le cododo est **recommandé par l'OMS jusque 6 mois** en prévention de la MIN (Mort Inattendue du Nourrisson) :\n  - Parent + vigilant\n  - Synchronisation des respirations parents/E.\n- En revanche, le **partage de lit** (*bed-sharing*) est vivement **déconseillé** par l'OMS (↗ le risque MIN)" },
                    { type: "normal", text: "<details style=\"border:1.5px solid #fcd34d;border-radius:10px;background:#fffbeb;padding:10px 14px\"><summary style=\"cursor:pointer;font-weight:800;color:#7c2d12;font-style:italic;user-select:none;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:10px\"><span>📊 Risque relatif de décès selon le mode de couchage</span><span style=\"font-size:13px\">▾</span></summary><table style=\"width:100%;border-collapse:collapse;font-size:13px;margin-top:10px\"><thead><tr style=\"background:#fef3c7\"><th style=\"padding:8px 10px;border:1px solid #fcd34d;text-align:left;color:#7c2d12\">Mode de couchage</th><th style=\"padding:8px 10px;border:1px solid #fcd34d;text-align:center;color:#7c2d12\">Risque</th></tr></thead><tbody><tr><td style=\"padding:6px 10px;border:1px solid #fcd34d\">Lit mère pdt la tétée puis berceau</td><td style=\"padding:6px 10px;border:1px solid #fcd34d;text-align:center;font-weight:700\">0,66</td></tr><tr><td style=\"padding:6px 10px;border:1px solid #fcd34d\">Partage de la chambre</td><td style=\"padding:6px 10px;border:1px solid #fcd34d;text-align:center;font-weight:700\">1</td></tr><tr><td style=\"padding:6px 10px;border:1px solid #fcd34d\">Chambre séparée</td><td style=\"padding:6px 10px;border:1px solid #fcd34d;text-align:center;font-weight:700\">1,9</td></tr><tr><td style=\"padding:6px 10px;border:1px solid #fcd34d\">Partage du lit maternel</td><td style=\"padding:6px 10px;border:1px solid #fcd34d;text-align:center;font-weight:700\">2,75</td></tr><tr><td style=\"padding:6px 10px;border:1px solid #fcd34d\">Sur un canapé avec son enfant</td><td style=\"padding:6px 10px;border:1px solid #fcd34d;text-align:center;font-weight:700;color:#dc2626\">31,25</td></tr></tbody></table><div style=\"margin-top:14px;font-size:14px;line-height:1.6\"><div style=\"font-style:italic;margin-bottom:6px\">Si on prend pour risque moyen (<strong>1</strong>) le partage de chambre, le risque :</div><ul style=\"margin:0 0 0 22px;padding:0;list-style:disc\"><li><strong>×2</strong> pour la <strong>chambre séparée</strong> (1,9)</li><li><strong>×3</strong> si BB dort dans le <strong>lit parental</strong> (2,75)</li><li><strong>×30</strong> — <strong>Majeur</strong> si le couchage est <strong>inadapté</strong></li><li><strong>2× moins de risque</strong> (0,66) si BB est reposé dans son <strong>berceau près de la maman</strong> que si le berceau est loin dans la chambre parentale</li></ul></div></details>" }
                  ]
                },
                {
                  label: "Si souhait de néanmoins partager le même lit",
                  title: "Si souhait de néanmoins partager le même lit",
                  width: "360px",
                  blocks: [
                    { type: "normal", text: "**Environnement de sommeil**\n\n- Mettre BB sur le **dos** dans **sa gigoteuse**\n- **Retirer les coussins, couette et couverture** (tout ce qui est lourd et pourrait étouffer BB)\n- Placer le **BB du côté de Maman** (elle a des hormones de vigilance que n'a pas le co-parent)\n- Cheveux de la maman attachés\n- Faire attention à la **fermeté du matelas** (pas trop mou : de canapé-lit ou matelas à eau)\n- Température autour de 18°\n- Veiller à ce que BB **ne puisse pas tomber** = mettre barrière de lit\n- Attention à ne pas **se retrouver coincé** (sur le côté et/ou tête de lit) = lit contre le mur et cadre de lit collé au matelas\n- Investir dans une chaussette connectée Owlet (alarme de respiration)\n- Pas d'autres E. dans le lit" },
                    { type: "normal", text: "**Pour les parents**\n\n- **Ne pas boire de l'alcool** ou consommer des substances illicites ⇒ Moins de vigilance ⇒ ↗ MIN\n- Ne pas être fumeur ⇒ Attention au tabagisme passif\n- Ne pas souffrir d'obésité morbide\n- **A éviter si vous êtes très fatigué** ⇒ Moins de vigilance ⇒ ↗ MIN" },
                    { type: "normal", text: "💡 Le cododo **augmente la vigilance** du parent qui **se réveille +** que si l'enfant était dans sa propre chambre" }
                  ]
                }
              ]
            },
            {
              type: "option", label: "Dort dans le lit parental", style: "purple",
              blocks: [
                { type: "normal", text: "- Et plus précisément **dans VOTRE LIT**\n\n- De mon côté, je dois **quand même** vous **partager les recommandations de l'OMS**…\n  - …qui **encouragent** à faire **dormir** les enfants dans **LEUR PROPRE LIT**…\n  - …car cela **diminue significativement le risque de Mort Inattendue du Nourrisson**\n\n- Mais **au-delà de ça**, l'idée, ce n'est **PAS de vous dire quoi faire.**\n- C'est surtout de **voir CE QUI vous convient** à vous, aujourd'hui.\n\n- Il n'y a **PAS** de **bonne** ou de **mauvaise réponse** :\n  - **certains parents** préfèrent **attendre** encore un peu,\n  - d'**autres** sont **prêts à faire la transition.**" },
              ]
            },
            { type: "question", text: "Est-ce que c'est **quelque chose qui vous CONVIENT** pour l'instant,\n…OU est-ce que vous **aimeriez qu'elle passe dans SA chambre / dans SON lit** ?\n\n- Il n'y a **PAS** de **bonne ou de mauvaise réponse** :\n  - certains parents **préfèrent attendre** encore un peu,\n  - d'autres **sont prêts** à faire la **transition**.\n\n- L'**idée** est surtout de voir ce qui **correspond le mieux** à votre **famille**\n  - Pour que je puisse m**'adapter au mieux**", choice: {
              id: "obj_lieu_sommeil",
              required: true,
              options: [
                { icon: "✅", label: "Garder le lit", value: "garder", variant: "positive" },
                { icon: "❌", label: "Changer le lit", value: "changer_lit", variant: "negative" },
                { icon: "❌", label: "Changer de chambre", value: "changer_chambre", variant: "negative" },
                { icon: "❌", label: "Changer de lit et de chambre", value: "changer_lit_chambre", variant: "negative" }
              ]
            }}
          ]
        },
        {
          type: "option", label: "Position ventrale\nSouhait de garder ou non ?", emoji: "🙂‍↕️", style: "purple-btn", hideIfPb: "souhait_position_dorsale",
          blocks: [
            {
              type: "lieu_sommeil_intro_grid",
              text: "- J'ai également une **question** concernant la **position de sommeil** de [prénom_enfant].\n- Aujourd'hui, elle **semble s'endormir sur le ventre**… c'est devenu **SA stratégie** pour **trouver le sommeil**…\n  - c'est **quelque chose** que l'on **observe souvent** chez les BB car c'est la **position la + physiologique** pour le corps\n\n- **Néanmoins**, je dois aussi vous **partager les recommandations de l'OMS**…\n  - …qui **encouragent** à **poser son enfant** sur le **DOS**…\n  - …car cette position **diminue significativement le risque de Mort Inattendue du Nourrisson**\n\n- Il n'y a **PAS** de **bonne ou mauvaise réponse**… SEULEMENT CELLE qui **correspond à vos besoins** !",
              buttons: [
                {
                  label: "Position ventrale vs. dorsale",
                  title: "Position ventrale vs. dorsale",
                  width: "360px",
                  blocks: [
                    { type: "normal", text: "<table style=\"width:100%;border-collapse:collapse;font-size:13px\"><thead><tr style=\"background:#f5f0ff\"><th style=\"padding:8px 10px;border:1px solid #c4b5e0;text-align:left;color:#5b21b6;width:34%\"></th><th style=\"padding:8px 10px;border:1px solid #c4b5e0;text-align:center;color:#5b21b6\">Position dorsale</th><th style=\"padding:8px 10px;border:1px solid #c4b5e0;text-align:center;color:#5b21b6\">Position ventrale</th></tr></thead><tbody><tr><td style=\"padding:8px 10px;border:1px solid #c4b5e0;font-weight:700;background:#faf7ff\">MIN ?</td><td style=\"padding:8px 10px;border:1px solid #c4b5e0\">↘ les risques (depuis la campagne de prévention des années '90, ↘ de <strong>80%</strong> des cas de MIN)</td><td style=\"padding:8px 10px;border:1px solid #c4b5e0;color:#dc2626;font-weight:600\">Principal facteur de risque de la MIN</td></tr><tr><td style=\"padding:8px 10px;border:1px solid #c4b5e0;font-weight:700;background:#faf7ff\">Plagiocéphalie ?<br><em style=\"font-weight:400;font-size:11px;color:#78716c\">= déformation du crâne</em></td><td style=\"padding:8px 10px;border:1px solid #c4b5e0\">↗ les risques (ex : S. dans transat)</td><td style=\"padding:8px 10px;border:1px solid #c4b5e0\">↘ les risques</td></tr><tr><td style=\"padding:8px 10px;border:1px solid #c4b5e0;font-weight:700;background:#faf7ff\">Bon pour le squelette ?</td><td style=\"padding:8px 10px;border:1px solid #c4b5e0\"><strong>Non</strong> : ne respecte pas la courbe en C de la colonne vertébrale</td><td style=\"padding:8px 10px;border:1px solid #c4b5e0\"><strong>Oui</strong> : s'apparente aux conditions de S. in-utéro ou en portage et permet la bonne courbure de la colonne vertébrale</td></tr><tr><td style=\"padding:8px 10px;border:1px solid #c4b5e0;font-weight:700;background:#faf7ff\">Réflexe de Moro ?</td><td style=\"padding:8px 10px;border:1px solid #c4b5e0\">Très présent, incontrôlable (donc multiples réveils)</td><td style=\"padding:8px 10px;border:1px solid #c4b5e0\">Limité</td></tr><tr><td style=\"padding:8px 10px;border:1px solid #c4b5e0;font-weight:700;background:#faf7ff\">Motricité et sentiment de sécurité ?</td><td style=\"padding:8px 10px;border:1px solid #c4b5e0\"><strong>Non</strong> : ventre exposé, impossibilité de ramper</td><td style=\"padding:8px 10px;border:1px solid #c4b5e0\"><strong>Oui</strong> : permet le mouvement autonome, le nichage et l'odeur de ses mains (liquide amniotique)</td></tr><tr><td style=\"padding:8px 10px;border:1px solid #c4b5e0;font-weight:700;background:#faf7ff\">Automassage ?</td><td style=\"padding:8px 10px;border:1px solid #c4b5e0\">Impossible</td><td style=\"padding:8px 10px;border:1px solid #c4b5e0\"><strong>Possible</strong> : facilite la digestion</td></tr><tr><td style=\"padding:8px 10px;border:1px solid #c4b5e0;font-weight:700;background:#faf7ff\">Accès aux mains / pouces pour faciliter les stratégies de S. autonomes ?</td><td style=\"padding:8px 10px;border:1px solid #c4b5e0\">Non</td><td style=\"padding:8px 10px;border:1px solid #c4b5e0\">Oui</td></tr></tbody></table>" }
                  ]
                }
              ]
            },
            { type: "normal", text: "- **Mon rôle** c'est de vous **transmettre ces informations..**\n  - …tout en **restant à l'écoute** de **votre réalité**\n\n- Il n'y a **pas de bonne ou mauvaise réponse**..\n  - ...**SEULEMENT CELLE** qui **correspond à vos besoins** !" },
            { type: "question", text: "J'**aimerais** beaucoup **connaître votre point de vue** sur ce sujet…\n- Souhaitez-vous **rester**\n  - **en position ventrale**\n  - ou changer **vers la position dorsale**?\n\n- Cela me **permettra** **d'adapter au mieux mon accompagnement** à votre famille\n  - ...et à **vos préférences.**", choice: {
              id: "obj_position_sommeil",
              required: true,
              options: [
                { icon: "✅", label: "Position ventrale", value: "ventrale", variant: "positive" },
                { icon: "❌", label: "Position dorsale", value: "dorsale", variant: "negative" }
              ]
            }}
          ]
        },
        { type: "normal", _noBorder: true, hideIfPb: "souhait_tetine", text: "<div class=\"obj-tetine-card\" style=\"border:3px dashed #7c3aed;border-radius:16px;padding:14px 22px 16px;background:#f5f0ff;margin:0;max-width:none;text-align:center\"><div style=\"font-size:28px;line-height:1;margin-bottom:4px\">🍭</div><div style=\"font-weight:800;color:#5b21b6;font-size:13px;margin:2px 0 10px\">Souhait Tétine</div><div class=\"block block-tickbox-choice\" data-choice-id=\"obj_tetine_static\" data-required=\"false\" style=\"background:transparent;border:none;box-shadow:none;padding:0;margin:0\"><div class=\"tbc-options\" style=\"justify-content:center;gap:12px\"><div class=\"tbc-opt\" data-variant=\"positive\" data-value=\"garder\" onclick=\"selectTickboxChoice(this)\"><span class=\"tbc-icon\">✅</span><span>Garder</span></div><div class=\"tbc-opt\" data-variant=\"negative\" data-value=\"supprimer\" onclick=\"selectTickboxChoice(this)\"><span class=\"tbc-icon\">❌</span><span>Supprimer</span></div></div></div></div>" },
      ]
    },

    // ── V. DIAGNOSTIC ─────────────────────────────────────
    {
      id: "diagnostic",
      title: "V. Diagnostic",
      emoji: "🩺",
      blocks: [
        { type: "normal", text: "- OK, là super, j'ai eu **beaucoup d'informations**\n- MERCI !\n\n- **Maintenant, j'ai :**\n  - une **vue PLUS globale** de la situation\n  - ET des **solutions à mettre en œuvre**" },
        {
          type: "columns_2",
          leftTitle: "📊 Besoins de sommeil selon l'âge",
          rightTitle: "📋 Difficultés identifiées",
          left: [
            { type: "normal", text: "- D'après les **données consolidées** de la **National Sleep Foundation** (États-Unis) ET du **laboratoire français d'étude du sommeil** :\n\n- Votre enfant a des <strong style=\"color:#c0392b\">BESOINS</strong> pour son âge\n- ⚠️ Je parle toujours en **<span style=\"border-bottom:1px dashed currentColor;cursor:help\" title=\"L'âge qu'aurait eu votre enfant s'il était né à terme. Cela permet de connaître l'âge de maturation du cerveau.\">âge CORRIGÉ</span>**" },
            {
              type: "besoins_sommeil",
              tranches: [
                { age: "0-2 mois", nuit: "8h-10h (entrecoupé tps d'alim)", jour: "8h-10h", total: "16h-20h (moy. 17-18h)", siestes: "–" },
                { age: "2-3 mois", nuit: "9h-12h (1 à 3 tps d'alim)", jour: "5h-6h", total: "14h-18h (moy. 16-17h)", siestes: "3 à 6 siestes" },
                { age: "4-7 mois", nuit: "10h-13h (1 à 3 tps d'alim)", jour: "4h-5h", total: "14h30-18h (moy. 15-16h)", siestes: "3 à 4 siestes" },
                { age: "8-14 mois", nuit: "10h-13h (moy. 11-12h ininterrompue)", jour: "2h30-4h", total: "13h-17h (moy. 14-15h)", siestes: "2 siestes (voire 3 jusqu'à 10 mois)" },
                { age: "15 mois - 2 ans", nuit: "10h-13h (moy. 11-12h ininterrompue)", jour: "2h-4h", total: "13h-16h (moy. 13h30-14h30)", siestes: "1 à 2 siestes" },
                { age: "2-3 ans", nuit: "10h-13h (moy. 11-12h ininterrompue)", jour: "2h-4h", total: "13h-16h (moy. 13h30-14h30)", siestes: "1 sieste" },
                { age: "4-5 ans", nuit: "11h-13h (moy. 11-12h)", jour: "2h-3h ou 45 min temps calme", total: "12h-16h (moy. 13-14h)", siestes: "1 sieste ou temps calme" },
              ]
            },
          ],
          thirdTitle: "✨ La bonne nouvelle",
          thirdStyle: "news-red",
          third: [
            { type: "normal", _noBorder: true, text: "<ul style=\"margin:0;padding-left:20px\"><li style=\"line-height:1.6\">MAIS la <strong>bonne nouvelle</strong> c'est que :<ul style=\"margin:4px 0 0 0;padding-left:22px\"><li style=\"line-height:1.6\"><strong>TOUT</strong> ce que vous m'avez partagé a du sens, est <strong>explicable</strong></li><li style=\"line-height:1.6\">Mais <strong>SURTOUT</strong> que c'est <strong>solutionnable</strong> !</li><li style=\"line-height:1.6\">ET que je peux vous <strong>accompagner</strong> pour les troubles du sommeil de [prénom_enfant]</li></ul></li></ul>" },
          ],
          right: [
            {
              type: "option", label: "Pas de dette de sommeil", emoji: "✅", style: "action-green", _pillStyle: true, _purpleContent: true, mutexGroup: "diag-sommeil",
              blocks: [
                { type: "normal", text: "- La **bonne nouvelle** c'est qu'aujourd'hui [prénom_enfant] n'est **PAS en dette de sommeil**\n- 👏 Vous faites **TOUT** pour que ça ne **soit pas le cas**!" },
                { type: "normal", text: "- <u>OPTION</u> : **<u>Au niveau du tps d'endormissement :</u>** Par contre, je vois des **difficultés** sur la **durée d'endormissement** … qui est **très longue**", _purpleDark: true },
                { type: "normal", text: "- <u>OPTION</u> : **<u>Au niveau du nombre de siestes …</u>** Par contre, je peux voir que le **nombre de siestes** … ne **correspond PAS** aux **besoins** d'un enfant de **cet âge**", _purpleDark: true },
              ]
            },
            {
              type: "option", label: "Difficultés de sommeil identifiées", emoji: "❌", style: "action", _pillStyle: true, _purpleContent: true, mutexGroup: "diag-sommeil",
              blocks: [
                { type: "normal", text: "- Au vu de ce qu'on s'est dit\n- En effet, vous aviez **BIEN identifié** que votre enfant a des **difficultés de sommeil**.\n<br>", _noBorder: true },
                { type: "normal", text: "- <u>OPTION</u> : **<u>Temps d'endormissement trop long :</u>** Il y a une **petite problématique** au niveau des **durées d'endormissement**… qui sont **très longues**", _purpleDark: true },
                { type: "normal", text: "- <u>OPTION</u> : **<u>Durée des siestes trop courte :</u>** Il y a aussi un **petit caillou** concernant la **durée des siestes**… qui sont **très courtes**", _purpleDark: true },
                { type: "normal", text: "- <u>OPTION</u> : **<u>Nombre de siestes inadapté :</u>** Il y a aussi **quelque chose à travailler** au niveau du **nombre de siestes**… qui ne **correspondent PAS** forcément aux **besoins de son âge**", _purpleDark: true },
              ]
            },
            {
              type: "option", label: "Difficultés alimentaires IDENTIFIÉES (courbes en déclin)", emoji: "🍼", style: "action-yellow", _pillStyle: true, _purpleContent: true,
              blocks: [
                { type: "normal", text: "- Je valide **AUSSI des difficultés alimentaires** parce que…\n- En effet,", _noBorder: true },
                { type: "normal", text: "- <u>OPTION</u> : **<u>Au niveau des courbes qu'on a vues ensemble,</u>** il y a quelque chose qui se joue", _purpleDark: true },
                { type: "normal", text: "- <u>OPTION</u> : **<u>Au niveau des différents symptômes que vous m'avez partagés,</u>** il y a quelque chose à creuser", _purpleDark: true },
                { type: "normal", text: "- <u>OPTION</u> : **<u>Au niveau de son inconfort,</u>** pour [prénom_enfant] il faudrait comprendre pourquoi il est ainsi", _purpleDark: true },
                { type: "normal", text: "- Du coup, il y a **BIEN quelque chose** qui **NE VA PAS** du côté de la **nutrition**", _noBorder: true },
              ]
            },
          ]
        },
        { type: "leviers_dynamiques" },
        { type: "leviers_count" },
        { type: "normal", text: "- On n'aura **PEUT-ÊTRE pas le temps** de tout voir aujourd'hui :\n- mais on pourra **toujours reprendre un RDV plus tard** pour **discuter des points** que l'on n'aura **pas eu le temps de voir aujourd'hui.**\n\n- Donc, **CE QUE je vois en 1er**, c'est **quelque chose au niveau de**…" },
        { type: "conditional_sections_inline" },
      ]
    },

    // ── VI. OBJECTIFS REVUS ────────────────────────────────
    {
      id: "objectifs_revus",
      title: "VI. Objectifs revus",
      emoji: "🎯",
      blocks: [
        {
          type: "option", label: "Objectifs faisables", emoji: "✅", style: "action-green", _pillStyle: true, mutexGroup: "objectifs-revus",
          blocks: [
            { type: "normal", text: "- Par rapport aux **objectifs que vous avez donné**\n- ⇒ moi ce que **je pense** c'est que c'est **tout à fait COHÉRENT et FAISABLES**" }
          ]
        },
        {
          type: "option", label: "Objectifs PAS faisables", emoji: "❌", style: "action", _pillStyle: true, mutexGroup: "objectifs-revus",
          blocks: [
            { type: "normal", text: "- Par rapport aux **objectifs que vous avez donné**\n- ⇒ Il y a **certains points** que je **voudrais re-discuter avec vous**" },
            {
              type: "option", label: "Nuits complètes (mais besoin de temps d'alimentation car PETIT)", style: "purple",
              blocks: [
                { type: "normal", text: "- BB trop petit ⇒ Il a encore **besoin de temps d'alimentation** la nuit\n- Son estomac n'est pas assez gros pour **\"TENIR\"** toute la nuit\n- ⇒ Il a donc encore **besoin de temps d'alimentation** la nuit" }
              ]
            },
            {
              type: "option", label: "Nuits complètes (mais besoin de rattrapage de courbe)", style: "purple",
              blocks: [
                { type: "normal", text: "- Aujourd'hui, votre enfant a besoin de faire un **rattrapage de courbe**\n- Il est possible que les **temps d'alimentation** la nuit soient encore présents quelque temps\n- Mais c'est **TEMPORAIRE** :\n  - le temps que sa **courbe de poids** remonte\n  - et que ses **apports alimentaires** se remettent en journée\n- ⇒ Il a donc encore **besoin de temps d'alimentation** la nuit de manière **temporaire**" }
              ]
            },
            {
              type: "option", label: "Si la crèche ne suit pas les recommandations", style: "purple",
              blocks: [
                { type: "normal", text: "- Si la crèche ne suit pas vos recommandations :\n  - ⇒ ça aura un **impact sur ses nuits** (ex: réveils nocturnes, réveils matinaux, terreurs nocturnes)\n  - ⇒ Vous faites un **test** et voyez si la crèche lui correspond ou pas" }
              ]
            },
            {
              type: "option", label: "Si activités qui obligent à réveiller l'enfant", style: "purple",
              blocks: [
                { type: "normal", text: "- Si votre enfant est réveillé pour aller à des activités :\n  - Son corps aura la validation que c'est **OK de faire de courtes siestes**\n  - Ne comprendra pas ses **variations de rythmes**\n  - Et n'arrivera pas à **enchaîner les cycles de sommeil** pour ses siestes\n- De plus, le **manque de sommeil de jour** aura un **impact sur ses nuits** (ex: réveils nocturnes, réveils matinaux, terreurs nocturnes)" }
              ]
            },
            {
              type: "option", label: "Si nuit supérieure à 12h", style: "purple",
              blocks: [
                { type: "normal", text: "- Votre enfant fait des nuits qui **correspondent à ses besoins.**\n- Si son horaire de lever ne correspond pas à **VOTRE rythme**\n  - ⇒ on peut voir pour **décaler toute sa journée** (temps d'alimentation, siestes…)" }
              ]
            },
          ]
        },
      ]
    },

    // ── VII. PLUSIEURS CHEMINS POSSIBLES ───────────────────
    {
      id: "chemins_possibles",
      title: "VII. Plusieurs chemins possibles",
      emoji: "🛤️",
      blocks: [
        { type: "normal", text: "- Il va y avoir **plusieurs chemins possibles** pour accompagner [prénom_enfant],\n  - et l'**idée** c'est vraiment de **trouver celui qui vous correspond le mieux**\n\n- Pour ça, j'aurais **besoin de savoir** :\n  - Est-ce que vous avez **BESOIN** **ça aille plutôt vite**,\n  - OU est-ce que vous **préférez mettre** un **peu + de progressivité** ?\n\n  - Sachant que la **progressivité pas à pas** sera:\n    - **+ douce**\n    - **MAIS + longue** en terme de résultats\n  - Tandis que le **chemin le + direct** permet de:\n    - **faire évoluer les choses + rapidement**\n    - mais **PEUT générer + d'émotions**\n\n- Donc, c'est **vraiment vous qui choisissez** le chemin en fonction de :\n  - ce que **vous préférez**\n  - de ce que vous **attendez en terme de rapidité**\n  - et VOTRE **gestion des émotions**\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:6px 8px;align-items:start\"><span>❓</span><span>•</span><span>Avec tout ça en tête, qu'est-ce qui vous <strong>semblerait le + juste</strong> pour vous et pour [prénom_enfant] :</span></div><ul style=\"margin:6px 0 0 60px;padding:0;list-style:disc\"><li style=\"line-height:1.6\"><strong>Quelque chose</strong> de <strong>plutôt progressif,</strong></li><li style=\"line-height:1.6\">Ou <strong>quelque chose</strong> de <strong>+ rapide ?</strong></li></ul></div>" },
        { type: "normal", text: "- Du coup, je préfère vous dire, pour **être totalement transparente** avec vous :\n  - QUAND on **met en place des changements**\n  - **même** avec **beaucoup de progressivité**,\n  - **il PEUT y avoir des émotions**\n  - surtout **au début.**\n    - ⇒ C'est tout à fait **NORMAL**\n\n- On va demander à [prénom_enfant] de **changer ses habitudes** et elle PEUT :\n  - **réagir**\n  - et **montrer qu'elle n'est pas d'accord**\n\n- Dans ces moments-là, CE QUI va **vraiment l'aider** c'est :\n  - que vous **soyez à ses côtés**\n  - et que **vous l'accompagniez** avec **COHERENCE**…\n- 👏… et avec **tout ce que vous avez déjà mis en place**, vous êtes **sur la bonne voie**" },
        { type: "question", text: "Est-ce que vous êtes <strong>à l'aise avec ça, avec les émotions</strong> ?", embeddedActions: [
          {
            label: "OUI", emoji: "✅", style: "action-green", _pillStyle: true, mutexGroup: "chemins-emotions",
            blocks: [
              { type: "normal", text: "- Alors, **si ça vous va :**\n  - On va pouvoir **passer à la suite,**\n  - et **voir concrètement** COMMENT on **va mettre ça en place**" }
            ]
          },
          {
            label: "NON", emoji: "❌", style: "action", _pillStyle: true, mutexGroup: "chemins-emotions",
            blocks: [
              { type: "normal", text: "- **Merci** de me le dire, c'est **vraiment important pour MOI** de le savoir.\n- **Je comprends…** c'est **difficile d'entendre son enfant pleurer**\n- Et franchement, **personne n'aime ça**\n\n- Et **CE QUE** je peux vous **dire TOUT DE SUITE**\n  ⇒ c'est qu'**ON NE** va **PAS laisser** [prénom_enfant] **seul** avec ses pleurs.\n\n- **Par contre**, il y a **quelque chose d'important** à comprendre :\n  - Les **pleurs chez l'enfant**, c'est surtout une **façon de communiquer.**\n\n- Aujourd'hui, on va **lui demander de changer une habitude** … et **comme pour nous,**\n  - **le changement**\n  - **personne n'aime ça !**\n\n- Donc oui, c'est **possible** qu'**il réagisse**,\n  - qu'il **proteste**\n  - ou qu'il **pleure**\n  - pour dire **\"*je préférais avant*\"**\n  ⇒ Et ça… c'est une **réaction normale**\n\n- L'idée, encore une fois, c'est vraiment de **VOUS respecter**\n- On va simplement :\n  - **adapter l'accompagnement**\n  - pour que ce soit le **+ confortable** possible **POUR VOUS**.\n\n- On pourra aller vers quelque chose :\n  - de **+ progressif**\n  - avec des **ajustements tout en douceur**\n  - et vous **POURREZ avancer à VOTRE rythme**\n\n- Et surtout, **vous ne SEREZ PAS SEULE**\n- On va **LE faire ensemble**\n- … ET LUI il aura **SURTOUT besoin** :\n  - de sentir que **VOUS êtes là**\n  - et CE QUE **vous SAVEZ ce que vous faites**" },
              { type: "normal", text: "<br><br><br>" },
              { type: "normal", text: "- Alors, **si ça vous va** :\n  - On va pouvoir **passer à la suite,**\n  - et **voir concrètement COMMENT** on va **mettre ça en place**" }
            ]
          }
        ]},
      ]
    },

    // ── VIII. PLAN D'ACTION ────────────────────────────────
    {
      id: "plan_action",
      title: "VIII. Plan d'action",
      emoji: "🧭",
      blocks: [
        { type: "solutions_checkboxes" },
      ]
    },

  ],

  // ── SECTIONS CONDITIONNELLES ─────────────────────────────
  conditional: [

    // ─── CONFORT ──────────────────────────────────────────
    {
      id: "rgo_allergie",
      problematiqueId: "rgo_allergie",
      leverId: "rgo_allergie",
      title: "RGO + Allergie (APLV)",
      emoji: "🩺",
      blocks: [
        { type: "normal", text: "- Avant de **commencer à parler \"sommeil\"**<br>j'aimerais, si vous êtes d'accord, qu'on **prenne un petit moment**<br>pour **revenir** sur CE QUE **vous m'avez partagé**\n\n- Parce que dans tout ce que vous décrivez, **on sent** :\n  - qu'il y a **beaucoup de choses à gérer**\n  - et que ça peut parfois être **un peu lourd au quotidien**\n  - parce que c'est **pas simple à vivre**\n\nEntre :" },
        {
          type: "checklist", label: "Symptômes rapportés par les parents",
          items: [
            "Le fait qu'il <strong>régurgite beaucoup</strong>",
            "Qu'il a du <strong>mal à rester allongé</strong>",
            "Qu'il a un <strong>sommeil très agité</strong>",
            "Que les <strong>repas sont parfois compliqués</strong>",
            "Qu'on sent qu'il est souvent <strong>gêné ou inconfortable</strong>",
            "Qu'il <strong>se cambre</strong>",
          ]
        },
        { type: "normal", text: "⇒ c'est **normal** que ce soit **difficile pour vous.**\n\n- Et **dans ces moments-là**,<br>**mon rôle**, c'est vraiment de **prendre un peu de recul sur l'ensemble**.<br>Parce que **chez les bébés**, très souvent, **tout est un peu lié**.\n\n- Et JUSTEMENT… dans ce que **vous m'avez décrit**…<br>il y a **plusieurs petites choses** qui **attirent mon attention**\n\n- Vous **m'avez parlé** :" },
        {
          type: "grouped_checklist",
          groups: [
            {
              items: [
                "Refus de s'alimenter (+ se cambre)",
                "Douleurs",
                "Eczéma / peau atopique / psoriasis",
                "Régurgitations :",
                { text: "en jet", subItem: true },
                { text: "sur tout le temps d'éveil", subItem: true },
                { text: "lait caillé", subItem: true },
              ]
            },
            {
              items: [
                "Respiration sifflante / bruits de dinosaure",
                "Ronflements (amygdales enflammées)",
                "Dort la bouche ouverte",
              ]
            },
            {
              title: "Sphère ORL :",
              items: [
                "Otites à répétition",
                "Toux chronique",
                "Bronchite à répétition",
                "Qu'il soit enrhumé très souvent",
              ]
            },
            {
              items: [
                "Selles diarrhéiques",
                "Selles glaireuses",
                "Selles avec des traces de sang",
              ]
            },
            {
              items: [
                "Terrain allergique dans la famille",
                "Le fait qu'il ait eu des <strong>compléments de lait artificiel contenant des PLV entières</strong> à la naissance, puis qu'il n'a plus été en contact direct avec les PLV (allaitement = PLV moins en contact direct)",
              ]
            },
          ]
        },
        {
          type: "normal",
          text: "- **Pris séparément**, CE SONT des **choses** qu'on **peut voir assez souvent**<br>mais QUAND on peut **lister au moins 2 symptômes,**<br>là, **ça me fait me dire** qu'il y a **peut-être autre chose derrière**\n\n⇒ pour moi, ça me **met la puce à l'oreille** :\n⇒ il **POURRAIT** s'**agir d'une possible allergie** (notamment aux Protéines de Lait de Vache = APLV)",
          trailingInfoButton: {
            label: "Causes du RGO",
            title: "Causes du RGO",
            blocks: [
              { type: "normal", text: "- Il peut y avoir **différentes causes** :\n  - <u>**Mécanique**</u> :\n    - Système digestif immature : **Sphincter Inférieur de l'œsophage (SIO) immature** *(anneau musculaire entre l'œsophage et l'estomac pas assez développé pour se contracter efficacement et maintenir le contenu du bol gastrique dans l'estomac)*\n    - Tensions corporelles\n    - Freins restrictifs\n    - Pb de succion\n  - <u>**Alimentaire**</u> :\n    - Allergie\n    - Œsophage court\n    - Bcp d'horizontalité\n    - Bcp d'alimentation liquide *(ex : bouteille d'eau à l'horizontal)*\n    - Trop d'alimentation\n    - Système digestif immature : microbiote immature" }
            ]
          }
        },
        { type: "normal", text: "- C'est une **allergie** qui est de **plus en plus diagnostiqué chez les enfants**\n\n- Alors ATTENTION, hein,<br>ça **ne veut pas dire** que c'est **forcément CA**\n  - et moi je ne suis **pas médecin**\n  - je ne **pose pas de diagnostic**\n\n- Mais ça **peut être intéressant** d'en **parler avec votre médecin**\n  - **Pour qu'il explore cette piste**\n    - simplement pour **confirmer**\n    - ou pour **écarter cette hypothèse**\n\n- Et puis :\n  - **si ce n'est pas cette piste là**,\n  - c'est **pas grave,**\n  - on **l'écartera du schéma,**\n  - et on **regardera autre chose**\n\n- Voilà\n- Je ne sais pas **si ça vous parle**, ce que je vous dit ?\n- Si vous aviez :\n  - des **petits soupçons**\n  - ….ou **pas du tout** ?\n\n- **En attendant**, CE QUE je peux vous dire, c'est **ce qu'on va faire AU MIEUX pour comprendre ce qui se passe**.\n- Moi, je **peux vous expliquer simplement** :\n  - ce qu'on FAIT **…. QUAND on soupçonne une allergie**\n  - JUSTE pour que **vous soyez au courant**\n\n- L'idée, ce n'est **PAS DU TOUT de vous inquiéter**<br>mais PLUTÔT de **vous accompagner** ET de **vous soutenir**." },
        { type: "question", text: "Qu'est ce que **vous pensez** de cette **suspicion d'allergie** ?" },
      ]
    },

    {
      id: "allergie_seule",
      problematiqueId: "allergie_seule",
      leverId: "allergie_seule",
      title: "Suspicion Allergie (APLV)",
      emoji: "🌿",
      blocks: [
        { type: "normal", text: "- Avant de **commencer à parler \"sommeil\"**<br>j'aimerais, si vous êtes d'accord, qu'on **prenne un petit moment**<br>pour **revenir** sur CE QUE **vous m'avez partagé**\n\n- Parce que DANS CE QUE **vous m'avez décrit**…<br>il y a **plusieurs petites choses** qui ONT **attiré mon attention**\n\n- Vous **m'avez parlé** :" },
        {
          type: "grouped_checklist",
          groups: [
            {
              items: [
                "Refus de s'alimenter (+ se cambre)",
                "Douleurs",
                "Eczéma / peau atopique / psoriasis",
                "Régurgitations :",
                { text: "en jet", subItem: true },
                { text: "sur tout le temps d'éveil", subItem: true },
                { text: "lait caillé", subItem: true },
              ]
            },
            {
              items: [
                "Respiration sifflante / bruits de dinosaure",
                "Ronflements (amygdales enflammées)",
                "Dort la bouche ouverte",
              ]
            },
            {
              title: "Sphère ORL :",
              items: [
                "Otites à répétition",
                "Toux chronique",
                "Bronchite à répétition",
                "Qu'il soit enrhumé très souvent",
              ]
            },
            {
              items: [
                "Selles diarrhéiques",
                "Selles glaireuses",
                "Selles avec des traces de sang",
              ]
            },
            {
              items: [
                "Terrain allergique dans la famille",
                "Le fait qu'il ait eu des <strong>compléments de lait artificiel contenant des PLV entières</strong> à la naissance, puis qu'il n'a plus été en contact direct avec les PLV (allaitement = PLV moins en contact direct)",
              ]
            },
          ]
        },
        { type: "normal", text: "- **Pris séparément**, CE SONT des **choses** qu'on **peut voir assez souvent**<br>mais QUAND on peut **lister au moins 2 symptômes,**<br>là, **ça me fait me dire** qu'il y a **peut-être autre chose derrière**\n\n⇒ pour moi, ça me **met la puce à l'oreille** :\n⇒ il **POURRAIT** s'**agir d'une possible allergie** (notamment aux Protéines de Lait de Vache = APLV)" },
        { type: "normal", text: "- C'est une **allergie** qui est de **plus en plus diagnostiqué chez les enfants**\n\n- Alors ATTENTION, hein,<br>ça **ne veut pas dire** que c'est **forcément ça**\n  - et moi je ne suis **pas médecin**\n  - je ne **pose pas de diagnostic**\n\n- Mais ça **peut être intéressant** d'en **parler avec votre médecin**\n  - **Pour qu'il explore cette piste**\n    - simplement pour confirmer\n    - ou pour écarter cette hypothèse\n\n- Et puis :\n  - **si ce n'est pas cette piste là**,\n  - c'est **pas grave,**\n  - on **l'écartera du schéma,**\n  - et on **regardera autre chose**" },
        { type: "normal", text: "- Voilà\n- Je ne sais pas **si ça vous parle**, ce que je vous dit ?\n- Si vous aviez :\n  - des **petits soupçons**\n  - ….ou **pas du tout** ?\n\n- **En attendant**, CE QUE je peux vous dire, c'est **ce qu'on va faire AU MIEUX pour comprendre ce qui se passe**.\n- Moi, je **peux vous expliquer simplement** :\n  - ce qu'on FAIT **…. QUAND on soupçonne une allergie**\n  - JUSTE pour que **vous soyez au courant**\n\n- L'idée, ce n'est PAS DU TOUT de vous inquiéter<br>mais PLUTÔT de **vous accompagner** ET de **vous soutenir**\n\n- Et une fois qu'on aura **remis du confort dans son quotidien**<br>**tout le reste** devient **beaucoup + simple**, et surtout + **durable pour son sommeil**" },
        { type: "question", text: "Est-ce que ça **vous irait** qu'on **en parle un peu** …tout à l'heure ?" },
      ]
    },

    {
      id: "rgo_seul",
      problematiqueId: "rgo_seul",
      leverId: "rgo_seul",
      title: "RGO",
      emoji: "🤮",
      blocks: [
        { type: "normal", text: "- Avant de **commencer à parler \"sommeil\"**<br>j'aimerais, si vous êtes d'accord, qu'on **prenne un petit moment**<br>pour **revenir** sur CE QUE **vous m'avez partagé** ….sur son reflux\n\n- Parce que dans TOUT ce que **vous décrivez,** on sent :\n  - qu'il y a **beaucoup de choses à gérer**\n  - et que ça peut parfois être **un peu lourd au quotidien**\n  - parce que c'est **pas simple à vivre**\n\nEntre :" },
        {
          type: "checklist", label: "Symptômes rapportés",
          items: [
            "Le fait qu'il <strong>régurgite beaucoup</strong>",
            "Qu'il a du <strong>mal à rester allongé</strong>",
            "Qu'il a un <strong>sommeil très agité</strong>",
            "Que les <strong>repas sont parfois compliqués</strong>",
            "Qu'on sent qu'il est souvent <strong>gêné ou inconfortable</strong>",
            "Qu'il <strong>se cambre</strong>",
          ]
        },
        { type: "normal", text: "⇒ c'est **normal** que ce soit **difficile pour vous.**" },
        {
          type: "normal",
          text: "- Le **reflux,** même si des fois il **peut être discret**, **va impacter** sur énormément de **choses du quotidien**\n\n- Alors, on aura BEAU **tout mettre en œuvre** au niveau du **sommeil,**<br>⇒ si il y a **toujours :**\n  - **ce petit cailloux**\n  - cet inconfort\n  - malheureusement, le **sommeil** sera **toujours perturbé.**",
          trailingInfoButton: {
            label: "Causes du RGO",
            title: "Causes du RGO",
            blocks: [
              { type: "normal", text: "- Il peut y avoir **différentes causes** :\n  - <u>**Mécanique**</u> :\n    - Système digestif immature : **Sphincter Inférieur de l'œsophage (SIO) immature** *(anneau musculaire entre l'œsophage et l'estomac pas assez développé pour se contracter efficacement et maintenir le contenu du bol gastrique dans l'estomac)*\n    - Tensions corporelles\n    - Freins restrictifs\n    - Pb de succion\n  - <u>**Alimentaire**</u> :\n    - Allergie\n    - Œsophage court\n    - Bcp d'horizontalité\n    - Bcp d'alimentation liquide *(ex : bouteille d'eau à l'horizontal)*\n    - Trop d'alimentation\n    - Système digestif immature : microbiote immature" }
            ]
          }
        },
        { type: "normal", text: "- Donc, l'idée ici **n'est pas de se focaliser uniquement sur le reflux**, mais d'avoir une **lecture globale de la situation** :\n- Essayer de trouver la cause, avant de s'attaquer aux symptômes :\n  - *est-ce que les **apports sont** :*\n    - ***suffisants***\n    - *et **bien répartis** ?*\n  - *est-ce que le **rythme est adapté à son âge** ?*\n  - *y a-t-il des **signes d'inconfort digestif** au quotidien ?*\n\n- **Mon rôle**, ce n'est :\n  - **pas d'étiqueter**\n  - ou de **poser un diagnostic**\n  - MAIS de **NE PAS passer** à **côté de qqch** qui pourrait **expliquer ces troubles du sommeil**\n\n- Et une fois qu'on aura **remis du confort** dans son quotidien, **tout le reste** deviendra :\n  - **beaucoup + simple**,\n  - et surtout + **durable pour son sommeil**" },
        { type: "question", text: "Est-ce que ça **vous irait** qu'on **parle de conseils concrets** pour **soulager son RGO** ?" },
      ]
    },

    // ─── NUTRITION : COURBE DE POIDS QUI DIMINUE ─────────
    {
      id: "nutri_courbe_declinante",
      problematiqueId: "nutri_courbe_declinante",
      leverId: "nutri_courbe_declinante",
      title: "Courbe de poids qui diminue",
      emoji: "📉",
      blocks: [
        { type: "normal", text: "- **Je peux voir** qu'il y a un **qqch au niveau** des **apports alimentaires**.\n\n- **Avant de travailler le sommeil**, on vient toujours **s'assurer que les besoins nutritionnels** d'un enfant **sont bien couverts**\n  car **un corps qui manque d'énergie** aura + **de mal :**\n  - **à s'apaiser**\n  - et **enchaîner ses cycles**" },
        {
          type: "grouped_block",
          blocks: [
            { type: "normal", text: "- En **tant que consultantes,** on va s'**appuyer** sur des **repères fiables,** comme les **courbes** de poids, la taille, le périmètre crânien\n- D'ailleurs **je vous invite** vivement à **demander** à votre médecin de **prendre les MESURES** à **chaque RDV**\n- On peut **voir les courbes** un peu comme **notre tableau de bord** :\n  elles **nous aident à savoir** si le **corps** reçoit **assez d'énergie** pour **soutenir** un **sommeil de qualité**" },
            { type: "normal", text: "<br><br>\n- 🔥 Donc **quand on a lu les courbes**, on a **pu voir** que [prénom_enfant] est **[ne_nee] autour** du <strong style=\"color:#dc2626\">XX</strong>ᵉ percentile." },
            { type: "normal", _purpleDark: true, text: "- 🔥 <u><em>OPTION</em> : [sil_sielle] a voulu remonter :</u> ET a **même réussi à monter** au <strong style=\"color:#dc2626\">XX</strong>ᵉ percentile" },
            { type: "normal", text: "- 🔥 Puis progressivement, [il_elle] s'est **[stabilise_stabilisee] autour** du <strong style=\"color:#dc2626\">XX</strong>ᵉ percentile.\n  ⇒ **Concrètement**, cela signifie qu'[il_elle] a **perdu <strong style=\"color:#dc2626\">XX</strong> couloirs** depuis <strong style=\"color:#dc2626\">sa naissance / sa tentative de montée</strong>.<br><br>" },
            {
              type: "normal", text: "- **En général**, un enfant **suit plutôt le couloir** dans LEQUEL **il est né**\n  ⇒ c'est son **couloir de référence**\n- Dans **certains cas**, certains enfants **peuvent même DEPASSER** leur **couloir de référence :**\n  - Par exemple, lorsqu'ils ont un **fort potentiel génétique** (si les **parents sont grands**, par exemple),\n  - OU **lorsque les enfants sont nés** un peu en **dessous de leur potentiel.**\n    ⇒ On parle alors de **rattrapage de courbe**.\n- Donc, il est **tout à fait possible** que [prénom_enfant] :\n  - **atteigne un couloir supérieur** à son **couloir de référence**\n  - et fasse ce **rattrapage**,",
              trailingInfoButton: {
                label: "Potentiel génétique",
                title: "Potentiel génétique",
                blocks: [
                  { type: "normal", text: "- **Définition :** Potentiel de croissance de l'enfant en fonction de la taille de ses parents." },
                  { type: "normal", text: "- **Formules** *(méthode de Tanner)* :\n  - 👧 **Fille** : (Taille père + Taille mère − 13) / 2\n  - 👦 **Garçon** : (Taille père + Taille mère + 13) / 2\n- Le résultat donne la **taille cible adulte** (± 8,5 cm)." },
                  { type: "potentiel_genetique_calculator" },
                ]
              }
            },
            { type: "normal", _purpleDark: true, text: "- 🔥 <u><em>OPTION</em> : il a voulu remonter :</u> comme [il_elle] **l'a montré** lors de sa **tentative de remontée de courbe** !" },
            { type: "normal", text: "<br><br>\n- Les courbes, ça va **nous donne** une **bonne indication**,\n  mais ça reste un **repère**.\n  ⇒ Le **+ important,** c'est vraiment d'ETRE **à l'écoute de son enfant**" },
          ]
        },
        {
          type: "normal", showIfAgeMaxMonths: 9, showIfAlim: ["Biberon lait infantile","Allaitement mixte","Allaitement au biberon"],
          text: "- Il y a un **2nd repère qu'on utilise** pour **se guider** : c'est la **règle d'Appert**\n- Elle nous donne des **indications sur la quantité \"théorique\" par 24h** en **fonction du poids,**<br><br>\n- 🔥 Aujourd'hui, [prénom_enfant] pèse **[poids]** kg\n  et vous me dites qu'[il_elle] boit environ <strong style=\"color:#dc2626\">XX</strong> mL sur 24 heures.\n- Si on se réfère à la **règle d'Appert**, ses besoins théoriques en lait seraient plutôt autour de **[besoin_lait_volume]** par jour (voire plus !).<br><br>\n- ⇒ Ca veut dire que **là aussi,** il y a un **écart** ENTRE **ses besoins** et ses **apports actuels**\n- Mais **ce n'est pas une règle stricte**, c'est **juste un repère** pour nous aider.\n- On reste surtout sur **une logique d'*à la demande***, surtout chez les plus petits.<br><br>\n- **Tous les BB** n'ont **pas :**\n  - **exactement le même rythme**\n  - et **leurs besoins** peuvent **varier d'un jour à l'autre.**\n  ⇒ On se fie surtout à leurs **signes de faim et de satiété**.",
          trailingInfoButton: {
            label: "Calcul règle d'Appert",
            title: "Calcul règle d'Appert",
            blocks: [
              { type: "normal", text: "- La **règle d'Appert** donne la **quantité théorique de lait sur 24h** selon le **poids** de l'enfant :" },
              { type: "normal", text: "- **Si poids < 6 kg** :\n  - (poids × 100) + **200 mL** ± 100 mL\n- **Si poids ≥ 6 kg** :\n  - (poids × 100) + **250 mL** ± 100 mL" },
              { type: "appert_calculator" },
            ]
          }
        },
        { type: "normal", text: "- Donc, si on **prend un peu de recul** sur tout ça…\n  on peut voir qu'il y a **AUSSI :**\n  - **d'AUTRES plusieurs petites choses**\n  - AUTOUR de son **alimentation**\n  - qui peuvent **jouer un rôle** sur son **sommeil**<br><br>\n- Je pense notamment…" },
        { type: "normal", _noBorder: true, text: "<div style=\"height:40px;background:#fff7ed;border-radius:12px;margin:0 -8px\"></div>" },
        {
          type: "courbe_cards_grid",
          items: [
            {
              id: "esp", emoji: "🔛", label: "Espacement bib et sein",
              pb: ["nutri_esp_long","nutri_esp_court"],
              sublabels: { "nutri_esp_long": "Trop long", "nutri_esp_court": "Trop court" },
              blocks: [
                { type: "normal", showIfPb: "nutri_esp_long", text: "<div class=\"cc-sub-banner\">Trop long</div>\n- 🔥 L'**intervalle entre 2 prises** alimentaires peut être parfois assez long (<strong style=\"color:#dc2626\">XX</strong> heures)<br><br>\n- A cet âge, les enfants ont **besoin de prises + rapprochés** pour s'**adapter** à leur **signaux de faim.**\n- **On devrait** normalement **leur donner** : \"***à la demande***\"\n- Et se **défaire** complètement du **mythe des espacements de 4h**, .. qui n'est **basé sur RIEN du TOUT**!\n- Avec des **espacements longs, [prénom_enfant]** a du **mal à \"TENIR\" jusqu'à la prochaine prise alimentaire**\n  ⇒ On **peut imaginer** qu'[il_elle] est **comme \"affamé\"** entre 2 prises alimentaires" },
                { type: "normal", showIfPb: "nutri_esp_court", text: "<div class=\"cc-sub-banner\">Trop court</div>\n- 🔥 L'**espacement entre 2 prises** alimentaires est **parfois très rapprochés** (<strong style=\"color:#dc2626\">XX</strong> heures)\n  ⇒ [prénom_enfant] n'a **PAS TOUJOURS le temps** d'**avoir** vraiment **faim**\n  ⇒ ce qui peut **limiter le volume pris** ... **par prise alimentaire**" },
              ]
            },
            {
              id: "vol", emoji: "🍼", label: "Volume des bib",
              pb: ["nutri_vol_petit","nutri_vol_gros","nutri_vol_longtemps"],
              sublabels: { "nutri_vol_petit": "Petit bib", "nutri_vol_gros": "Gros bib", "nutri_vol_longtemps": "Bu longtemps" },
              blocks: [
                { type: "normal", showIfPb: "nutri_vol_petit", text: "<div class=\"cc-sub-banner\">Petit bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez petit** pour :\n  - **son âge**\n  - **et ses besoins**\n  ⇒ Ca se **rapproche +** de la **taille des biberons d'un nourrisson**\n  ⇒ **SI** les **biberons sont petits** : la **sensation d'être RASSASIE** se **dissipe** assez **vite**" },
                { type: "normal", showIfPb: "nutri_vol_gros", text: "<div class=\"cc-sub-banner\">Gros bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez conséquent** par **rapport au volume de son estomac** (**souvent** on **suit ce qui est inscrit** sur les **boites de lait**)\n  ⇒ C'est **comme s'il était \"gavé\"**\n  ⇒ et **son estomac** doit **gérer une quantité importante** à chaque biberon\n  ⇒ ce qui peut **parfois entraîner une digestion + difficile...**\n<div style=\"background:#f5f0ff;border:3px dashed #a78bfa;border-radius:16px;padding:6px 20px 6px 0;box-shadow:0 2px 8px rgba(167,139,250,0.18);margin:8px 0\"><ul style=\"margin:0;padding-left:21px\"><li>🔥 <em>OPTION</em> — Reflux : ... qui peut <strong>favoriser le reflux</strong></li></ul></div>" },
                { type: "normal", showIfPb: "nutri_vol_longtemps", text: "<div class=\"cc-sub-banner\">Bu longtemps</div>\n- Les biberons sont **parfois bus pendant très longtemps** (souvent **pour terminer les quantités indiquées sur les boîtes de lait**)\n  ⇒ Ce qui peut **brouiller les signaux** naturels **de faim** et de **satiété**" },
              ]
            },
            {
              id: "tetee", emoji: "🤱", label: "Tétée : baisse de lactation",
              pb: ["nutri_tetee","nutri_tetee_longue","nutri_tetee_greve","nutri_tetee_mode_garde"],
              sublabels: { "nutri_tetee_longue": "Longue tétée", "nutri_tetee_greve": "Grève des tétées", "nutri_tetee_mode_garde": "Mode de garde" },
              blocks: [
                { type: "normal", showIfPb: "nutri_tetee_longue", text: "<div class=\"cc-sub-banner\">Longue tétée</div>\n- Les **tétées** SEMBLENT **être assez longues**\n- La durée des tétées MOYENNE est normalement autour de 20min\n  ⇒ On dirait que BB **cherche à avoir +**, mais qui **n'arrive pas à** avoir tout **ce dont il a besoin**" },
                { type: "normal", showIfPb: "nutri_tetee_greve", text: "<div class=\"cc-sub-banner\">Grève des tétées</div>\n- Vous m'avez aussi parlé du **refus de certaines tétées**" },
                { type: "normal", showIfPb: ["nutri_tetee","nutri_tetee_longue","nutri_tetee_greve","nutri_tetee_mode_garde"], text: "- **Au vu des courbes,** je me dis, qu'il y a peut-être **qqch qui se joue** au **niveau de votre lactation.**\n- Il y a peut-être eu une **possible diminution** (peut-être car **vos seins sont moins stimulés ?**)" },
                { type: "normal", showIfPb: "nutri_tetee_mode_garde", text: "- ...Ce sont des choses qui **peuvent arriver** lors d'un **changement de rythme**\n  notamment quand un **BB commence un mode de garde**\n  ⇒ car la **stimulation de vos seins** est **moins importante en journée**" },
                { type: "normal", showIfPb: ["nutri_tetee","nutri_tetee_longue","nutri_tetee_greve","nutri_tetee_mode_garde"], text: "- Et comme le **corps fonctionne** à la **demande,**\n  ⇒ ça **peut influencer** sur la **quantité de lait** que **boit** [prénom_enfant]\n- **Et surtout**, c'est qqch :\n  - de **fréquent**\n  - et sur lequel on peut **facilement agir**\n\n- **Heureusement,** il y a des **solutions qui existent** pour **re-booster la lactation**\n  et je vous en **reparlerai** un petit peu **plus tard**" },
                { type: "conseil_vert", showIfPb: ["nutri_tetee","nutri_tetee_longue","nutri_tetee_greve","nutri_tetee_mode_garde"], text: "👏 Et je voudrais couper court à **certaines idées reçues :**\n- **Comme QUOI** les BB allaités **ne dorment PAS MOINS BIEN** que les BB **au biberon !**\n- **L'allaitement n'est PAS un problème** pour le sommeil\n  **⇒ Beaucoup** de **BB allaités dorment très bien**\n  **⇒ Et les réveils nocturnes** font surtout **partie du développement NORMAL** du sommeil… **allaités ou non**" },
              ]
            },
            {
              id: "inv_jn", emoji: "🌞🌛", label: "Inversion Jour/Nuit",
              pb: "nutri_inversion_jour_nuit",
              blocks: [
                { type: "normal", showIfPb: "nutri_inversion_jour_nuit", text: "- La **majorité des apports** se fait **la nuit** (peut être dû au mode de garde)\n  ⇒ Il semble y avoir une **inversion jour/nuit** au niveau de son alimentation<br><br>\n- Or **la nuit,** le **corps est programmé** pour être en **\"mode repos\"**\n  ⇒ Il se pourrait alors :\n  - Qu'il **utilise la nuit** pour **compenser le manque d'apport en journée**\n  - Mais que la **pression de S.** de la nuit rendent les prises alimentaires **- efficaces**\n    ⇒ et donc qu'il **boive MOINS QUE CES véritables besoins**" },
              ]
            },
            {
              id: "inv_ls", emoji: "🔄", label: "Inversion ordre Lait/Solide",
              pb: "nutri_inversion_lait_solide",
              blocks: [
                { type: "normal", showIfPb: "nutri_inversion_lait_solide", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Mettre lait AVANT les solides</div>\n- Aujourd'hui, la **diversification** est **prise AVANT le lait**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place pour le lait,**\n  ⇒ Pourtant, le **lait reste l'apport n°1 pour** :\n  - les nutriments\n  - et la sensation de satiété" },
                { type: "normal", showIfPb: "nutri_inversion_lait_solide", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Mettre solide AVANT le lait</div>\n- Aujourd'hui, **le lait** est **pris AVANT la diversification**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place pour la diversification,**\n  ⇒ Pourtant, la **diversification reste l'apport n°1 pour** :\n  - les nutriments\n  - et la sensation de satiété" },
              ]
            },
            {
              id: "tetine", emoji: "🍭", label: "Tétine = cache-faim",
              pb: "nutri_tetine_coupe_faim",
              blocks: [
                { type: "normal", showIfPb: "nutri_tetine_coupe_faim", text: "- [prénom_enfant] **demande souvent la tétine** dans la bouche\n- La TETINE **PEUT répondre à un reflexe de succion**\n- MAIS peut aussi faire **office d'illusion** puisqu'**elle \"dupe\" le cerveau :**\n  - [prénom_enfant] \"**tète et déglutit\"** avec la tétine\n  - donc le **cerveau pense que qqch rentre** dans son estomac\n  - **mais rien ne rentre**…\n  - et **au bout d'un moment :**\n    - l'**illusion se perd**\n    - et la **faim se fait VRAIMENT ressentir**\n  - **MEME SI vous remettez la tétine :**\n    - il n'**en veut pas**\n    - et il pleure\n    - Parce qu'il **veut autre chose**\n    ⇒ Tout simplement car il a faim\n\n  ⇒ Donc, pour moi, la tétine joue ICI le **rôle d'un \"cache-faim\"**" },
              ]
            },
            {
              id: "feculents", emoji: "🥔", label: "Pas assez de féculents",
              pb: "nutri_autre_feculents",
              blocks: [
                { type: "normal", showIfPb: "nutri_autre_feculents", text: "- La **part des féculents** dans son alimentation **est assez faible**\n- Et pourtant, les **féculents participent** activement à :\n  - **l'apport énergétique**\n  - et… à la **satiété**" },
              ]
            },
            {
              id: "lait_solide_imp", emoji: "🍽️", label: "Lait/solide trop important",
              pb: "nutri_autre_lait_solide_important",
              blocks: [
                { type: "normal", showIfPb: "nutri_autre_lait_solide_important", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Solides TROP important</div>\n- La **place de la diversification** dans son alimentation **prend une part importante**\n- Or à son âge, le **lait** devrait être la **source principale d'apport nutritionnel** … qui apporte :\n  - les nutriments essentiels\n  - et la satiété\n\n  ⇒ On rentre alors dans un **cercle vicieux** :\n  - Il **boit peu de lait**\n  - Il **mange bcp de solides** pour compenser\n  - La **diversification prend la place du lait** dans l'estomac (qui devrait être la source n°1 d'apports nutritionnels)\n  - Il **boit peu de lait**…" },
                { type: "normal", showIfPb: "nutri_autre_lait_solide_important", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Lait TROP important</div>\n- La **place du lait** dans **son alimentation** prend une **part importante** dans **son alimentation**\n- Or **à son âge**, la **diversification** devrait être la **source principale d'apport nutritionnel**… qui **apporte** :\n  - **les nutriments** essentiels\n  - et **la satiété**\n\n  ⇒ On rentre alors dans un **cercle vicieux** :\n  - Il **mange peu de solides en journée**\n  - **Boit bcp de lait** pour compenser\n  - Le **lait prend la place des solides** dans l'estomac\n  - Il **mange peu de solides** …" },
              ]
            },
            {
              id: "jus_vegetal", emoji: "🧃", label: "Jus végétal",
              pb: "nutri_autre_jus_vegetal",
              blocks: [
                { type: "normal", showIfPb: "nutri_autre_jus_vegetal", text: "- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">jus végétal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir** ….. et **être rassasié**" },
              ]
            },
            {
              id: "lait_animal", emoji: "🥛", label: "Lait animal",
              pb: "nutri_autre_lait_animal",
              blocks: [
                { type: "normal", showIfPb: "nutri_autre_lait_animal", text: "- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">lait animal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir** ….. et **être rassasié**" },
              ]
            },
          ]
        },
        { type: "normal", _parentLevel: true, text: "- Voilà,\n- AVEC tous ces **petits indices,**\n- On commence à voir un **schéma qui se dessine** au **niveau de sa nutrition**<br><br>\n- Et **CE QUI est intéressant**, c'est que ça correspond à CE QUE **vous observez** :\n  - dans son comportement\n  - et dans son sommeil" },
        {
          type: "conclusion_nutrition",
          _parentLevel: true,
          blocks: [
            { type: "normal", text: "- Pour moi, **l'explication la + probable,**\n  <span style=\"color:#dc2626\">⇒ c'est que [prénom_enfant] a **encore faim**</span>\n\n- Et quand les **besoins d'un enfant** ne sont **pas complètement couverts**\n  **Ca se reflète** très souvent par un **sommeil fragmenté**\n\n  ⇒ 🎯L'**objectif** serait donc :\n  - d'**augmenter progressivement** ses **apports nutritionnels**\n  - pour **faire un rattrapage de courbe**" },
            { type: "normal", showIfPb: "nutri_conseq_inconfort", text: "- 🤮 ET potentiellement ça va **réduire son inconfort digestif**" },
            { type: "normal", showIfPb: "nutri_tetee_greve", text: "- 🪧 Et la \"grève des tétées\" pourrait **être une réponse** au fait que **l'effort pour obtenir le lait** est devenu **trop important.**\n- Dans **certains cas**, les BB vont \"**pèser le pour et le contre**\" :\n  - entre **l'effort pour téter**\n  - et la **quantité de lait reçue**\n- et parfois, la **balance penche du côté de l'effort**… alors ils **préfèrent refuser la tétée.**\n  ⇒ ils se **mettent en mode \"veille\"**" },
            { type: "normal", showIfPb: "nutri_conseq_mange_nuit", text: "- 🌛 L'**objectif** serait **aussi** de **réduire les réveils nocturnes** car il **semble utiliser la nuit** pour **compléter ce qu'**il ne **prend pas** encore en **journée**" },
            { type: "question", text: "Est-ce que **ça fait sens pour vous** quand je vous **l'explique comme ça** ?" },
            { type: "normal", text: "- Nous allons donc :\n  - **rétablir un rythme alimentaire + structuré**\n  - et **sécuriser les apports de lait** adaptés :\n    - à son âge\n    - et à son poids" },
            { type: "normal", showIfPb: "nutri_conseq_mange_nuit", text: "- 🌛 Et **progressivement,** l'**objectif** sera de **supprimer cette compensation nocturne**,\n  <u>**UNE FOIS**</u> que <u>**TOUS**</u> les apports de la journée seront **bien sécurisées**" },
            { type: "normal", text: "- Et **avec ces ajustements**, **vous allez voir** que ça va **solutionner une partie** de ses **troubles du sommeil**" },
          ]
        },
      ]
    },

    // ─── NUTRITION : COURBE DE POIDS SUR PERCENTILE INFÉRIEUR ─────────
    {
      id: "nutri_courbe_inferieur",
      problematiqueId: "nutri_courbe_inferieur",
      leverId: "nutri_courbe_inferieur",
      title: "Courbe de poids sur percentile inférieur",
      emoji: "📊",
      blocks: [
        { type: "normal", text: "- **Je peux voir** qu'il y a un **qqch au niveau** des **apports alimentaires**.\n\n- **Avant de travailler le sommeil**, on vient toujours **s'assurer que les besoins nutritionnels** d'un enfant **sont bien couverts**\n  car **un corps qui manque d'énergie** aura + **de mal :**\n  - **à s'apaiser**\n  - et **enchaîner ses cycles**" },
        {
          type: "grouped_block",
          blocks: [
            { type: "normal", text: "- En **tant que consultantes,** on va s'**appuyer** sur des **repères fiables,** comme les **courbes** de poids, la taille, le périmètre crânien\n- D'ailleurs **je vous invite** vivement à **demander** à votre médecin de **prendre les MESURES** à **chaque RDV**\n- On peut **voir les courbes** un peu comme **notre tableau de bord** :\n  elles **nous aident à savoir** si le **corps** reçoit **assez d'énergie** pour **soutenir** un **sommeil de qualité**" },
            { type: "normal", text: "<br><br>\n- Donc **quand on a lu les courbes**, on a **pu voir** que [prénom_enfant] était sur des **couloirs différents** entre le **poids, taille et le périmètre cranien.**\n- Mais que le **POIDS** était sur un **percentile INFERIEUR**\n\n- En général, les 3 courbes :\n  - **évoluent** de **manière** assez **harmonieuses**\n  - et **suivent** à **peu près** le **même percentile**" },
            {
              type: "normal", text: "- **En général**, un enfant **suit plutôt le couloir** dans LEQUEL **il est né**\n  ⇒ c'est son **couloir de référence**\n- Dans **certains cas**, certains enfants **peuvent même DEPASSER** leur **couloir de référence :**\n  - Par exemple, lorsqu'ils ont un **fort potentiel génétique** (si les **parents sont grands**, par exemple),\n  - OU **lorsque les enfants sont nés** un peu en **dessous de leur potentiel.**\n    ⇒ On parle alors de **rattrapage de courbe**.\n- Donc, il est **tout à fait possible** que [prénom_enfant] :\n  - **atteigne un couloir supérieur** à son **couloir de référence**\n  - et fasse ce **rattrapage**,",
              trailingInfoButton: {
                label: "Potentiel génétique",
                title: "Potentiel génétique",
                blocks: [
                  { type: "normal", text: "- **Définition :** Potentiel de croissance de l'enfant en fonction de la taille de ses parents." },
                  { type: "normal", text: "- **Formules** *(méthode de Tanner)* :\n  - 👧 **Fille** : (Taille père + Taille mère − 13) / 2\n  - 👦 **Garçon** : (Taille père + Taille mère + 13) / 2\n- Le résultat donne la **taille cible adulte** (± 8,5 cm)." },
                  { type: "potentiel_genetique_calculator" },
                ]
              }
            },
            { type: "normal", _purpleDark: true, text: "- 🔥 <u><em>OPTION</em> : il a voulu remonter :</u> comme [il_elle] **l'a montré** lors de sa **tentative de remontée de courbe** !" },
            { type: "normal", text: "<br><br>\n- Les courbes, ça va **nous donne** une **bonne indication**,\n  mais ça reste un **repère**.\n  ⇒ Le **+ important,** c'est vraiment d'ETRE **à l'écoute de son enfant**" },
          ]
        },
        {
          type: "normal", showIfAgeMaxMonths: 9, showIfAlim: ["Biberon lait infantile","Allaitement mixte","Allaitement au biberon"],
          text: "- Il y a un **2nd repère qu'on utilise** pour **se guider** : c'est la **règle d'Appert**\n- Elle nous donne des **indications sur la quantité \"théorique\" par 24h** en **fonction du poids,**<br><br>\n- 🔥 Aujourd'hui, [prénom_enfant] pèse **[poids]** kg\n  et vous me dites qu'[il_elle] boit environ <strong style=\"color:#dc2626\">XX</strong> mL sur 24 heures.\n- Si on se réfère à la **règle d'Appert**, ses besoins théoriques en lait seraient plutôt autour de **[besoin_lait_volume]** par jour (voire plus !).<br><br>\n- ⇒ Ca veut dire que **là aussi,** il y a un **écart** ENTRE **ses besoins** et ses **apports actuels**\n- Mais **ce n'est pas une règle stricte**, c'est **juste un repère** pour nous aider.\n- On reste surtout sur **une logique d'*à la demande***, surtout chez les plus petits.<br><br>\n- **Tous les BB** n'ont **pas :**\n  - **exactement le même rythme**\n  - et **leurs besoins** peuvent **varier d'un jour à l'autre.**\n  ⇒ On se fie surtout à leurs **signes de faim et de satiété**.",
          trailingInfoButton: {
            label: "Calcul règle d'Appert",
            title: "Calcul règle d'Appert",
            blocks: [
              { type: "normal", text: "- La **règle d'Appert** donne la **quantité théorique de lait sur 24h** selon le **poids** de l'enfant :" },
              { type: "normal", text: "- **Si poids < 6 kg** :\n  - (poids × 100) + **200 mL** ± 100 mL\n- **Si poids ≥ 6 kg** :\n  - (poids × 100) + **250 mL** ± 100 mL" },
              { type: "appert_calculator" },
            ]
          }
        },
        { type: "normal", text: "- Donc, si on **prend un peu de recul** sur tout ça…\n  on peut voir qu'il y a **AUSSI :**\n  - **d'AUTRES plusieurs petites choses**\n  - AUTOUR de son **alimentation**\n  - qui peuvent **jouer un rôle** sur son **sommeil**<br><br>\n- Je pense notamment…" },
        { type: "normal", _noBorder: true, text: "<div style=\"height:40px;background:#fff7ed;border-radius:12px;margin:0 -8px\"></div>" },
        {
          type: "courbe_cards_grid",
          items: [
            {
              id: "esp", emoji: "🔛", label: "Espacement bib et sein",
              pb: ["nutri_inf_esp_long","nutri_inf_esp_court"],
              sublabels: { "nutri_inf_esp_long": "Trop long", "nutri_inf_esp_court": "Trop court" },
              blocks: [
                { type: "normal", showIfPb: "nutri_inf_esp_long", text: "<div class=\"cc-sub-banner\">Trop long</div>\n- 🔥 L'**intervalle entre 2 prises** alimentaires peut être parfois assez long (<strong style=\"color:#dc2626\">XX</strong> heures)<br><br>\n- A cet âge, les enfants ont **besoin de prises + rapprochés** pour s'**adapter** à leur **signaux de faim.**\n- **On devrait** normalement **leur donner** : \"***à la demande***\"\n- Et se **défaire** complètement du **mythe des espacements de 4h**, .. qui n'est **basé sur RIEN du TOUT**!\n- Avec des **espacements longs, [prénom_enfant]** a du **mal à \"TENIR\" jusqu'à la prochaine prise alimentaire**\n  ⇒ On **peut imaginer** qu'[il_elle] est **comme \"affamé\"** entre 2 prises alimentaires" },
                { type: "normal", showIfPb: "nutri_inf_esp_court", text: "<div class=\"cc-sub-banner\">Trop court</div>\n- 🔥 L'**espacement entre 2 prises** alimentaires est **parfois très rapprochés** (<strong style=\"color:#dc2626\">XX</strong> heures)\n  ⇒ [prénom_enfant] n'a **PAS TOUJOURS le temps** d'**avoir** vraiment **faim**\n  ⇒ ce qui peut **limiter le volume pris** ... **par prise alimentaire**" },
              ]
            },
            {
              id: "vol", emoji: "🍼", label: "Volume des bib",
              pb: ["nutri_inf_vol_petit","nutri_inf_vol_gros","nutri_inf_vol_longtemps"],
              sublabels: { "nutri_inf_vol_petit": "Petit bib", "nutri_inf_vol_gros": "Gros bib", "nutri_inf_vol_longtemps": "Bu longtemps" },
              blocks: [
                { type: "normal", showIfPb: "nutri_inf_vol_petit", text: "<div class=\"cc-sub-banner\">Petit bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez petit** pour :\n  - **son âge**\n  - **et ses besoins**\n  ⇒ Ca se **rapproche +** de la **taille des biberons d'un nourrisson**\n  ⇒ **SI** les **biberons sont petits** : la **sensation d'être RASSASIE** se **dissipe** assez **vite**" },
                { type: "normal", showIfPb: "nutri_inf_vol_gros", text: "<div class=\"cc-sub-banner\">Gros bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez conséquent** par **rapport au volume de son estomac** (**souvent** on **suit ce qui est inscrit** sur les **boites de lait**)\n  ⇒ C'est **comme s'il était \"gavé\"**\n  ⇒ et **son estomac** doit **gérer une quantité importante** à chaque biberon\n  ⇒ ce qui peut **parfois entraîner une digestion + difficile...**\n<div style=\"background:#f5f0ff;border:3px dashed #a78bfa;border-radius:16px;padding:6px 20px 6px 0;box-shadow:0 2px 8px rgba(167,139,250,0.18);margin:8px 0\"><ul style=\"margin:0;padding-left:21px\"><li>🔥 <em>OPTION</em> — Reflux : ... qui peut <strong>favoriser le reflux</strong></li></ul></div>" },
                { type: "normal", showIfPb: "nutri_inf_vol_longtemps", text: "<div class=\"cc-sub-banner\">Bu longtemps</div>\n- Les biberons sont **parfois bus pendant très longtemps** (souvent **pour terminer les quantités indiquées sur les boîtes de lait**)\n  ⇒ Ce qui peut **brouiller les signaux** naturels **de faim** et de **satiété**" },
              ]
            },
            {
              id: "tetee", emoji: "🤱", label: "Tétée : baisse de lactation",
              pb: ["nutri_inf_tetee","nutri_inf_tetee_longue","nutri_inf_tetee_greve","nutri_inf_tetee_mode_garde"],
              sublabels: { "nutri_inf_tetee_longue": "Longue tétée", "nutri_inf_tetee_greve": "Grève des tétées", "nutri_inf_tetee_mode_garde": "Mode de garde" },
              blocks: [
                { type: "normal", showIfPb: "nutri_inf_tetee_longue", text: "<div class=\"cc-sub-banner\">Longue tétée</div>\n- Les **tétées** SEMBLENT **être assez longues**\n- La durée des tétées MOYENNE est normalement autour de 20min\n  ⇒ On dirait que BB **cherche à avoir +**, mais qui **n'arrive pas à** avoir tout **ce dont il a besoin**" },
                { type: "normal", showIfPb: "nutri_inf_tetee_greve", text: "<div class=\"cc-sub-banner\">Grève des tétées</div>\n- Vous m'avez aussi parlé du **refus de certaines tétées**" },
                { type: "normal", showIfPb: ["nutri_inf_tetee","nutri_inf_tetee_longue","nutri_inf_tetee_greve","nutri_inf_tetee_mode_garde"], text: "- **Au vu des courbes,** je me dis, qu'il y a peut-être **qqch qui se joue** au **niveau de votre lactation.**\n- Il y a peut-être eu une **possible diminution** (peut-être car **vos seins sont moins stimulés ?**)" },
                { type: "normal", showIfPb: "nutri_inf_tetee_mode_garde", text: "- ...Ce sont des choses qui **peuvent arriver** lors d'un **changement de rythme**\n  notamment quand un **BB commence un mode de garde**\n  ⇒ car la **stimulation de vos seins** est **moins importante en journée**" },
                { type: "normal", showIfPb: ["nutri_inf_tetee","nutri_inf_tetee_longue","nutri_inf_tetee_greve","nutri_inf_tetee_mode_garde"], text: "- Et comme le **corps fonctionne** à la **demande,**\n  ⇒ ça **peut influencer** sur la **quantité de lait** que **boit** [prénom_enfant]\n- **Et surtout**, c'est qqch :\n  - de **fréquent**\n  - et sur lequel on peut **facilement agir**\n\n- **Heureusement,** il y a des **solutions qui existent** pour **re-booster la lactation**\n  et je vous en **reparlerai** un petit peu **plus tard**" },
                { type: "conseil_vert", showIfPb: ["nutri_inf_tetee","nutri_inf_tetee_longue","nutri_inf_tetee_greve","nutri_inf_tetee_mode_garde"], text: "👏 Et je voudrais couper court à **certaines idées reçues :**\n- **Comme QUOI** les BB allaités **ne dorment PAS MOINS BIEN** que les BB **au biberon !**\n- **L'allaitement n'est PAS un problème** pour le sommeil\n  **⇒ Beaucoup** de **BB allaités dorment très bien**\n  **⇒ Et les réveils nocturnes** font surtout **partie du développement NORMAL** du sommeil… **allaités ou non**" },
              ]
            },
            {
              id: "inv_jn", emoji: "🌞🌛", label: "Inversion Jour/Nuit",
              pb: "nutri_inf_inversion_jour_nuit",
              blocks: [
                { type: "normal", showIfPb: "nutri_inf_inversion_jour_nuit", text: "- La **majorité des apports** se fait **la nuit** (peut être dû au mode de garde)\n  ⇒ Il semble y avoir une **inversion jour/nuit** au niveau de son alimentation<br><br>\n- Or **la nuit,** le **corps est programmé** pour être en **\"mode repos\"**\n  ⇒ Il se pourrait alors :\n  - Qu'il **utilise la nuit** pour **compenser le manque d'apport en journée**\n  - Mais que la **pression de S.** de la nuit rendent les prises alimentaires **- efficaces**\n    ⇒ et donc qu'il **boive MOINS QUE CES véritables besoins**" },
              ]
            },
            {
              id: "inv_ls", emoji: "🔄", label: "Inversion ordre Lait/Solide",
              pb: "nutri_inf_inversion_lait_solide",
              blocks: [
                { type: "normal", showIfPb: "nutri_inf_inversion_lait_solide", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Mettre lait AVANT les solides</div>\n- Aujourd'hui, la **diversification** est **prise AVANT le lait**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place pour le lait,**\n  ⇒ Pourtant, le **lait reste l'apport n°1 pour** :\n  - les nutriments\n  - et la sensation de satiété" },
                { type: "normal", showIfPb: "nutri_inf_inversion_lait_solide", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Mettre solide AVANT le lait</div>\n- Aujourd'hui, **le lait** est **pris AVANT la diversification**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place pour la diversification,**\n  ⇒ Pourtant, la **diversification reste l'apport n°1 pour** :\n  - les nutriments\n  - et la sensation de satiété" },
              ]
            },
            {
              id: "tetine", emoji: "🍭", label: "Tétine = cache-faim",
              pb: "nutri_inf_tetine_coupe_faim",
              blocks: [
                { type: "normal", showIfPb: "nutri_inf_tetine_coupe_faim", text: "- [prénom_enfant] **demande souvent la tétine** dans la bouche\n- La TETINE **PEUT répondre à un reflexe de succion**\n- MAIS peut aussi faire **office d'illusion** puisqu'**elle \"dupe\" le cerveau :**\n  - [prénom_enfant] \"**tète et déglutit\"** avec la tétine\n  - donc le **cerveau pense que qqch rentre** dans son estomac\n  - **mais rien ne rentre**…\n  - et **au bout d'un moment :**\n    - l'**illusion se perd**\n    - et la **faim se fait VRAIMENT ressentir**\n  - **MEME SI vous remettez la tétine :**\n    - il n'**en veut pas**\n    - et il pleure\n    - Parce qu'il **veut autre chose**\n    ⇒ Tout simplement car il a faim\n\n  ⇒ Donc, pour moi, la tétine joue ICI le **rôle d'un \"cache-faim\"**" },
              ]
            },
            {
              id: "feculents", emoji: "🥔", label: "Pas assez de féculents",
              pb: "nutri_inf_autre_feculents",
              blocks: [
                { type: "normal", showIfPb: "nutri_inf_autre_feculents", text: "- La **part des féculents** dans son alimentation **est assez faible**\n- Et pourtant, les **féculents participent** activement à :\n  - **l'apport énergétique**\n  - et… à la **satiété**" },
              ]
            },
            {
              id: "lait_solide_imp", emoji: "🍽️", label: "Lait/solide trop important",
              pb: "nutri_inf_autre_lait_solide_important",
              blocks: [
                { type: "normal", showIfPb: "nutri_inf_autre_lait_solide_important", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Solides TROP important</div>\n- La **place de la diversification** dans son alimentation **prend une part importante**\n- Or à son âge, le **lait** devrait être la **source principale d'apport nutritionnel** … qui apporte :\n  - les nutriments essentiels\n  - et la satiété\n\n  ⇒ On rentre alors dans un **cercle vicieux** :\n  - Il **boit peu de lait**\n  - Il **mange bcp de solides** pour compenser\n  - La **diversification prend la place du lait** dans l'estomac (qui devrait être la source n°1 d'apports nutritionnels)\n  - Il **boit peu de lait**…" },
                { type: "normal", showIfPb: "nutri_inf_autre_lait_solide_important", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Lait TROP important</div>\n- La **place du lait** dans **son alimentation** prend une **part importante** dans **son alimentation**\n- Or **à son âge**, la **diversification** devrait être la **source principale d'apport nutritionnel**… qui **apporte** :\n  - **les nutriments** essentiels\n  - et **la satiété**\n\n  ⇒ On rentre alors dans un **cercle vicieux** :\n  - Il **mange peu de solides en journée**\n  - **Boit bcp de lait** pour compenser\n  - Le **lait prend la place des solides** dans l'estomac\n  - Il **mange peu de solides** …" },
              ]
            },
            {
              id: "jus_vegetal", emoji: "🧃", label: "Jus végétal",
              pb: "nutri_inf_autre_jus_vegetal",
              blocks: [
                { type: "normal", showIfPb: "nutri_inf_autre_jus_vegetal", text: "- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">jus végétal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir** ….. et **être rassasié**" },
              ]
            },
            {
              id: "lait_animal", emoji: "🥛", label: "Lait animal",
              pb: "nutri_inf_autre_lait_animal",
              blocks: [
                { type: "normal", showIfPb: "nutri_inf_autre_lait_animal", text: "- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">lait animal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir** ….. et **être rassasié**" },
              ]
            },
          ]
        },
        { type: "normal", _parentLevel: true, text: "- Voilà,\n- AVEC tous ces **petits indices,**\n- On commence à voir un **schéma qui se dessine** au **niveau de sa nutrition**<br><br>\n- Et **CE QUI est intéressant**, c'est que ça correspond à CE QUE **vous observez** :\n  - dans son comportement\n  - et dans son sommeil" },
        {
          type: "conclusion_nutrition",
          _parentLevel: true,
          blocks: [
            { type: "normal", text: "- Pour moi, **l'explication la + probable,**\n  <span style=\"color:#dc2626\">⇒ c'est que [prénom_enfant] a **encore faim**</span>\n\n- Et quand les **besoins d'un enfant** ne sont **pas complètement couverts**\n  **Ca se reflète** très souvent par un **sommeil fragmenté**\n\n  ⇒ 🎯L'**objectif** serait donc :\n  - d'**augmenter progressivement** ses **apports nutritionnels**\n  - pour **faire un rattrapage de courbe**" },
            { type: "normal", showIfPb: "nutri_inf_conseq_inconfort", text: "- 🤮 ET potentiellement ça va **réduire son inconfort digestif**" },
            { type: "normal", showIfPb: "nutri_inf_tetee_greve", text: "- 🪧 Et la \"grève des tétées\" pourrait **être une réponse** au fait que **l'effort pour obtenir le lait** est devenu **trop important.**\n- Dans **certains cas**, les BB vont \"**pèser le pour et le contre**\" :\n  - entre **l'effort pour téter**\n  - et la **quantité de lait reçue**\n- et parfois, la **balance penche du côté de l'effort**… alors ils **préfèrent refuser la tétée.**\n  ⇒ ils se **mettent en mode \"veille\"**" },
            { type: "normal", showIfPb: "nutri_inf_conseq_mange_nuit", text: "- 🌛 L'**objectif** serait **aussi** de **réduire les réveils nocturnes** car il **semble utiliser la nuit** pour **compléter ce qu'**il ne **prend pas** encore en **journée**" },
            { type: "question", text: "Est-ce que **ça fait sens pour vous** quand je vous **l'explique comme ça** ?" },
            { type: "normal", text: "- Nous allons donc :\n  - **rétablir un rythme alimentaire + structuré**\n  - et **sécuriser les apports de lait** adaptés :\n    - à son âge\n    - et à son poids" },
            { type: "normal", showIfPb: "nutri_inf_conseq_mange_nuit", text: "- 🌛 Et **progressivement,** l'**objectif** sera de **supprimer cette compensation nocturne**,\n  <u>**UNE FOIS**</u> que <u>**TOUS**</u> les apports de la journée seront **bien sécurisées**" },
            { type: "normal", text: "- Et **avec ces ajustements**, **vous allez voir** que ça va **solutionner une partie** de ses **troubles du sommeil**" },
          ]
        },
      ]
    },

    // ─── NUTRITION : TROP D'APPORT ─────────
    {
      id: "nutri_trop_apport",
      problematiqueId: "nutri_trop_apport",
      leverId: "nutri_trop_apport",
      title: "Trop d'apport",
      emoji: "📈",
      blocks: [
        { type: "normal", text: "- **Je peux voir** qu'il y a un **qqch au niveau** des **apports alimentaires**.\n\n- **Avant de travailler le sommeil**, on vient toujours **s'assurer que :**\n  - **les besoins nutritionnels** d'un enfant **sont bien couverts**\n  - et qu'il n'a **pas de gène** qui pourrait venir **perturber son sommeil**" },
        {
          type: "grouped_block",
          blocks: [
            { type: "normal", text: "- En **tant que consultante**, on va s'**appuyer** sur des **repères fiables,** comme les **courbes** de poids, la taille, le périmètre crânien\n- D'ailleurs **je vous invite** vivement **si ce n'est pas pris systématiquement :**\n  - à **demander** à votre médecin de **prendre les mesures** à **chaque RDV**\n- On peut **voir les courbes** un peu comme **notre tableau de bord** :\n  elles **nous aident à savoir** si le **corps** reçoit **assez d'énergie** pour **soutenir** un **sommeil de qualité**" },
            { type: "normal", text: "<br><br>\n- À la lecture des courbes, on peut observer que :\n  - le **poids** de [prénom_enfant] a **augmenté rapidement,**\n  - ALORS QUE la **taille et le périmètre crânien** restent **stables.**\n  ⇒ Concrètement, la **prise de poids est + rapide QUE CE QU'ON attend habituellement** pour sa croissance" },
            { type: "normal", text: "- Pour vous **donner un repère** :\n  - **À cet âge**, la **croissance** devrait être **harmonieuse,** avec les **3 courbes** qui **évoluent sur le même couloir**" },
            { type: "normal", text: "- **La courbe nous aide** à avoir une **vue fonctionnelle** mais BIEN SUR**, il s'agit de repères**.\n  ⇒ On **reste toujours à l'écoute de son enfant** et **on ajuste** selon ce qu'**on observe au quotidien**" },
            { type: "normal", text: "<br><br>\n- Les courbes, ça va **nous donne** une **bonne indication**,\n  mais ça reste un **repère**.\n  ⇒ Le **+ important,** c'est vraiment d'ETRE **à l'écoute de son enfant**" },
          ]
        },
        {
          type: "normal", showIfAgeMaxMonths: 9, showIfAlim: ["Biberon lait infantile","Allaitement mixte","Allaitement au biberon"],
          text: "- Il y a un **2nd repère qu'on utilise** pour **se guider** : c'est la **règle d'Appert**\n- Elle nous donne des **indications sur la quantité \"théorique\" par 24h** en **fonction du poids,**<br><br>\n- 🔥 Aujourd'hui, [prénom_enfant] pèse **[poids]** kg\n  et vous me dites qu'[il_elle] boit environ <strong style=\"color:#dc2626\">XX</strong> mL sur 24 heures.\n- Si on se **réfère à la règle d'Appert**, ses **besoins théoriques** en lait seraient **plutôt autour** de **[besoin_lait_volume]** par jour **(voire plus !).**<br><br>\n- ⇒ Ca veut dire que **là aussi,** il y a un **écart** ENTRE **ses besoins** et ses **apports actuels**\n- Mais **ce n'est pas une règle stricte**, c'est **juste un repère** pour nous aider.\n- On reste surtout sur **une logique d'*à la demande***, surtout chez les plus petits.<br><br>\n- **Tous les BB** n'ont **pas :**\n  - **exactement le même rythme**\n  - et **leurs besoins** peuvent **varier d'un jour à l'autre.**\n  ⇒ On se fie surtout à leurs **signes de faim et de satiété**.",
          trailingInfoButton: {
            label: "Calcul règle d'Appert",
            title: "Calcul règle d'Appert",
            blocks: [
              { type: "normal", text: "- La **règle d'Appert** donne la **quantité théorique de lait sur 24h** selon le **poids** de l'enfant :" },
              { type: "normal", text: "- **Si poids < 6 kg** :\n  - (poids × 100) + **200 mL** ± 100 mL\n- **Si poids ≥ 6 kg** :\n  - (poids × 100) + **250 mL** ± 100 mL" },
              { type: "appert_calculator" },
            ]
          }
        },
        { type: "normal", text: "- Donc, si on **prend un peu de recul** sur tout ça…\n  on peut voir qu'il y a **AUSSI :**\n  - **d'AUTRES plusieurs petites choses**\n  - AUTOUR de son **alimentation**\n  - qui peuvent **jouer un rôle** sur son **sommeil**<br><br>\n- Je pense notamment…" },
        { type: "normal", _noBorder: true, text: "<div style=\"height:40px;background:#fff7ed;border-radius:12px;margin:0 -8px\"></div>" },
        {
          type: "courbe_cards_grid",
          items: [
            {
              id: "esp", emoji: "🔛", label: "Espacement bib et sein",
              pb: ["nutri_ta_esp_long","nutri_ta_esp_court"],
              sublabels: { "nutri_ta_esp_long": "Trop long", "nutri_ta_esp_court": "Trop court" },
              blocks: [
                { type: "normal", showIfPb: "nutri_ta_esp_long", text: "<div class=\"cc-sub-banner\">Trop long</div>\n- 🔥 L'**intervalle entre 2 prises** alimentaires peut être parfois assez long (<strong style=\"color:#dc2626\">XX</strong> heures)\n\n- A cet âge, les enfants ont **besoin de prises + rapprochés** pour s'**adapter** à leur **signaux de faim.**\n- **On devrait** normalement **leur donner** : \"***à la demande***\"\n- Et se **défaire** complètement du **mythe des espacements de 4h**, .. qui n'est **basé sur RIEN du TOUT**!\n- Avec des **espacements longs, [prénom_enfant]** a du **mal à \"TENIR\" jusqu'à la prochaine prise alimentaire**\n  ⇒ On **peut imaginer** qu'[il_elle] **se « rue »** sur sa nourriture **en mangeant + que nécessaire** pour combler ce manque" },
                { type: "normal", showIfPb: "nutri_ta_esp_court", text: "<div class=\"cc-sub-banner\">Trop court</div>\n- 🔥 L'**espacement entre 2 prises** alimentaires est **parfois très rapprochés** (<strong style=\"color:#dc2626\">XX</strong> heures)\n  ⇒ C'est **comme si** il était **« gavé » de nourriture**" },
              ]
            },
            {
              id: "vol", emoji: "🍼", label: "Volume des bib",
              pb: ["nutri_ta_vol_petit","nutri_ta_vol_gros","nutri_ta_vol_longtemps"],
              sublabels: { "nutri_ta_vol_petit": "Petit bib", "nutri_ta_vol_gros": "Gros bib", "nutri_ta_vol_longtemps": "Bu longtemps" },
              blocks: [
                { type: "normal", showIfPb: "nutri_ta_vol_petit", text: "<div class=\"cc-sub-banner\">Petit bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez petit** pour :\n  - **son âge**\n  - **et ses besoins**\n  ⇒ Ca se **rapproche +** de la **taille des biberons d'un nourrisson**\n  ⇒ **SI** les **biberons sont petits** : la **sensation d'être RASSASIE** se **dissipe** assez **vite**\n    ⇒ **Et augmente la demande** pour **+ de biberons**" },
                { type: "normal", showIfPb: "nutri_ta_vol_gros", text: "<div class=\"cc-sub-banner\">Gros bib</div>\n- Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez conséquent** par **rapport au volume de son estomac** (**souvent** on **suit ce qui est inscrit** sur les **boites de lait**)\n  ⇒ C'est **comme s'il était \"gavé\"**\n  ⇒ et **son estomac** doit **gérer une quantité importante** à chaque biberon\n  ⇒ ce qui peut **parfois entraîner une digestion + difficile...**\n<div style=\"background:#f5f0ff;border:3px dashed #a78bfa;border-radius:16px;padding:6px 20px 6px 0;box-shadow:0 2px 8px rgba(167,139,250,0.18);margin:8px 0\"><ul style=\"margin:0;padding-left:21px\"><li>🔥 <em>OPTION</em> — Reflux : ... qui peut <strong>favoriser le reflux</strong></li></ul></div>" },
                { type: "normal", showIfPb: "nutri_ta_vol_longtemps", text: "<div class=\"cc-sub-banner\">Bu longtemps</div>\n- Les biberons sont **parfois bus pendant très longtemps** (souvent **pour terminer les quantités indiquées sur les boîtes de lait**)\n  ⇒ Ce qui peut **brouiller les signaux** naturels **de faim** et de **satiété**" },
              ]
            },
            {
              id: "inv_jn", emoji: "🌞🌛", label: "Inversion Jour/Nuit",
              pb: "nutri_ta_inversion_jour_nuit",
              blocks: [
                { type: "normal", showIfPb: "nutri_ta_inversion_jour_nuit", text: "- La **majorité des apports** se fait **la nuit** (peut être dû au mode de garde)\n  ⇒ Il semble y avoir une **inversion jour/nuit** au niveau de son alimentation<br><br>\n- Or **la nuit,** le **corps est programmé** pour être en **\"mode repos\"**\n  ⇒ Il se pourrait alors :\n  - Qu'il **utilise la nuit** pour **compenser le manque d'apport en journée**\n  - Mais que la **pression de S.** de la nuit rendent les prises alimentaires **- efficaces**\n    ⇒ et donc qu'il **boive PLUS QUE CES véritables besoins**" },
              ]
            },
            {
              id: "inv_ls", emoji: "🔄", label: "Inversion ordre Lait/Solide",
              pb: "nutri_ta_inversion_lait_solide",
              blocks: [
                { type: "normal", showIfPb: "nutri_ta_inversion_lait_solide", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Mettre lait AVANT les solides</div>\n- Aujourd'hui, la **diversification** est **prise AVANT le lait**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **brouille** la **sensation de satiété**" },
                { type: "normal", showIfPb: "nutri_ta_inversion_lait_solide", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Mettre solide AVANT le lait</div>\n- Aujourd'hui, **le lait** est **pris AVANT la diversification**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **brouille** la **sensation de satiété**" },
              ]
            },
            {
              id: "feculents", emoji: "🥔", label: "Féculent <span style=\"color:#dc2626;font-weight:700\">IMPORTANT</span>",
              pb: "nutri_ta_autre_feculents",
              blocks: [
                { type: "normal", showIfPb: "nutri_ta_autre_feculents", text: "- La **part des féculents** dans son alimentation **est assez <span style=\"color:#dc2626\">IMPORTANTE</span>**\n  ⇒ L'**alimentation** devrait être **diversifiée**, et les **féculents** ne DEVRAIENT **pas dépasser 50%** des apports" },
              ]
            },
            {
              id: "lait_solide_imp", emoji: "🍽️", label: "Lait/solide trop important",
              pb: "nutri_ta_autre_lait_solide_important",
              blocks: [
                { type: "normal", showIfPb: "nutri_ta_autre_lait_solide_important", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Solides TROP important</div>\n- La **place de la diversification** dans son alimentation **prend une part importante**\n- Or à son âge, le **lait** devrait être la **source principale d'apport nutritionnel**" },
                { type: "normal", showIfPb: "nutri_ta_autre_lait_solide_important", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Lait TROP important</div>\n- La **place du lait** dans **son alimentation** prend une **part importante** dans **son alimentation**\n- Or **à son âge**, la **diversification** devrait être la **source principale d'apport nutritionnel**" },
              ]
            },
            {
              id: "jus_vegetal", emoji: "🧃", label: "Jus végétal",
              pb: "nutri_ta_autre_jus_vegetal",
              blocks: [
                { type: "normal", showIfPb: "nutri_ta_autre_jus_vegetal", text: "- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">jus végétal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports**" },
              ]
            },
            {
              id: "lait_animal", emoji: "🥛", label: "Lait animal",
              pb: "nutri_ta_autre_lait_animal",
              blocks: [
                { type: "normal", showIfPb: "nutri_ta_autre_lait_animal", text: "- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">lait animal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports**" },
              ]
            },
          ]
        },
        { type: "normal", _parentLevel: true, text: "- Voilà,\n- AVEC tous ces **petits indices,**\n- On commence à voir un **schéma qui se dessine** au **niveau de sa nutrition**\n- Et **CE QUI est intéressant**, c'est que ça correspond à CE QUE **vous observez** :\n  - dans son comportement\n  - et dans son sommeil" },
        {
          type: "conclusion_nutrition",
          _parentLevel: true,
          blocks: [
            { type: "normal", text: "- Pour moi, **l'explication la + probable,**\n- <span style=\"color:#dc2626\">⇒ c'est que [prénom_enfant] a **TROP d'apports nutritionnels**</span>\n\n- Et c'est une **situation** qui arrive **très souvent**, parce que :\n  - les **repères donnés sur les boîtes**\n  - ou dans l'entourage\n    ⇒ **POUSSENT** parfois à **donner des quantités + importantes** QUE **leur réellement besoin.**\n\n- Dans ce contexte, les **troubles du sommeil** que vous décrivez ne sont **peut-être** **PAS UNIQUEMENT liés à un problème de sommeil**\n  ⇒ MAIS à la **digestion perturbée** et à une **surcharge calorique**\n\n  ⇒ L'**objectif** serait donc d'**adapter progressivement la quantité de ses apports**" },
            { type: "question", text: "Est-ce que **ça fait sens pour vous** quand je vous **l'explique comme ça** ?" },
            { type: "normal", text: "- Nous allons donc :\n  - **Ré-équilibrer le rythme alimentaire** en fonction de **ces besoins**\n  - **Et redonner une structure à son alimentation**" },
            { type: "normal", text: "- Et **avec ces ajustements**, **vous allez voir** que ça va **solutionner une partie** de ses **troubles du sommeil**" },
          ]
        },
      ]
    },

    // ─── NUTRITION : LAIT (COURBES OK) — ESPACEMENT TROP LONG ─────────
    {
      id: "nutri_lok_esp_long",
      problematiqueId: "nutri_lok_esp_long",
      leverId: "nutri_lok_esp_long",
      title: "Lait (courbes OK) — Espacement trop long",
      emoji: "⏱️",
      blocks: [
        { type: "normal", text: "- 🔥 Aujourd'hui, les **prises alimentaires** de [prénom_enfant] sont espacées d'environ <strong style=\"color:#dc2626\">XX</strong> h\n\n- C'est un **espacement** relativement **LONG** pour un enfant de cet âge\n  - A cet âge, les enfants ont **besoin de prises + rapprochés** pour s'**adapter** à :\n    - leur **signaux de faim**\n    - leur digestion\n- **On devrait** normalement **leur donner** : \"***à la demande***\"\n- Et se **défaire** complètement du **mythe des espacements de 4h**, .. qui n'est **basé sur RIEN du TOUT**!" },
        { type: "normal", text: "- Donc, si on **prend un peu de recul** sur tout ça…\n  on peut voir qu'il y a **AUSSI :**\n  - **d'AUTRES plusieurs petites choses**\n  - AUTOUR de son **alimentation**\n  - qui peuvent **jouer un rôle** sur son **sommeil**<br><br>\n- Je pense notamment…" },
        { type: "normal", _noBorder: true, text: "<div style=\"height:40px;background:#fff7ed;border-radius:12px;margin:0 -8px\"></div>" },
        {
          type: "courbe_cards_grid",
          items: [
            {
              id: "vol", emoji: "🍼", label: "Taille / durée des bib",
              pb: ["nutri_lok_long_vol_petit","nutri_lok_long_vol_gros","nutri_lok_long_vol_longtemps"],
              sublabels: { "nutri_lok_long_vol_petit": "Petit bib", "nutri_lok_long_vol_gros": "Gros bib", "nutri_lok_long_vol_longtemps": "Bu longtemps" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_long_vol_petit", text: "<div class=\"cc-sub-banner\">Petit bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez petit** pour :\n  - **son âge**\n  - **et ses besoins**\n    ⇒ Ca se **rapproche +** de la **taille des biberons d'un nourrisson**\n    ⇒ **SI** les **biberons sont petits** : la **sensation d'être RASSASIE** se **dissipe** assez **vite**" },
                { type: "normal", showIfPb: "nutri_lok_long_vol_gros", text: "<div class=\"cc-sub-banner\">Gros bib</div>\n- Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez conséquent** par **rapport au volume de son estomac** (**souvent** on **suit ce qui est inscrit** sur les **boites de lait**)\n  ⇒ C'est **comme s'il était \"gavé\"**\n  ⇒ et **son estomac** doit **gérer une quantité importante** à chaque biberon\n  ⇒ ce qui peut **parfois entraîner une digestion + difficile...**\n<div style=\"background:#f5f0ff;border:3px dashed #a78bfa;border-radius:16px;padding:6px 20px 6px 0;box-shadow:0 2px 8px rgba(167,139,250,0.18);margin:8px 0\"><ul style=\"margin:0;padding-left:21px\"><li>🔥 <em>OPTION</em> — Reflux : ... qui peut <strong>favoriser le reflux</strong></li></ul></div>" },
                { type: "normal", showIfPb: "nutri_lok_long_vol_longtemps", text: "<div class=\"cc-sub-banner\">Bu longtemps</div>\n- Les biberons sont **parfois bus pendant très longtemps** (souvent **pour terminer les quantités indiquées sur les boîtes de lait**)\n  ⇒ Ce qui peut être un **moyen** de **lisser la faim** entre **chaque biberon**" },
              ]
            },
            {
              id: "tetee", emoji: "🤱", label: "Tétée : baisse de lactation",
              pb: ["nutri_lok_long_tetee","nutri_lok_long_tetee_longue","nutri_lok_long_tetee_greve","nutri_lok_long_tetee_mode_garde"],
              sublabels: { "nutri_lok_long_tetee_longue": "Longue tétée", "nutri_lok_long_tetee_greve": "Grève des tétées", "nutri_lok_long_tetee_mode_garde": "Mode de garde" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_long_tetee_longue", text: "<div class=\"cc-sub-banner\">Longue tétée</div>\n- Les **tétées** SEMBLENT **être assez longues**\n- La **durée des tétées MOYENNE** est normalement autour de **20 min**\n  ⇒ Peut-être un moyen de **lisser la faim** entre **chaque tétée**" },
                { type: "normal", showIfPb: "nutri_lok_long_tetee_greve", text: "<div class=\"cc-sub-banner\">Grève des tétées</div>\n- Vous m'avez aussi parlé du **refus de certaines tétées**" },
                { type: "normal", showIfPb: ["nutri_lok_long_tetee","nutri_lok_long_tetee_longue","nutri_lok_long_tetee_greve","nutri_lok_long_tetee_mode_garde"], text: "- Je pense, qu'il y a peut-être **qqch** au **niveau de votre lactation.**\n- Il y a peut-être eu une **possible diminution** (peut-être car **vos seins sont moins stimulés ?**)" },
                { type: "normal", showIfPb: "nutri_lok_long_tetee_mode_garde", text: "- ...Ce sont des choses qui **peuvent arriver** lors d'un **changement de rythme**\n  notamment quand un **BB commence un mode de garde**\n  ⇒ car la **stimulation de vos seins** est **moins importante en journée**" },
                { type: "normal", showIfPb: ["nutri_lok_long_tetee","nutri_lok_long_tetee_longue","nutri_lok_long_tetee_greve","nutri_lok_long_tetee_mode_garde"], text: "  ⇒ Donc, ça **peut influencer** sur la **quantité de lait** que **boit** [prénom_enfant]\n- **Heureusement,** il y a des **solutions qui existent** pour **re-booster la lactation**\n  et je vous en **reparlerai plus tard**" },
              ]
            },
            {
              id: "inv", emoji: "🔄", label: "Inversion",
              pb: ["nutri_lok_long_inversion_jour_nuit","nutri_lok_long_inversion_lait_solide"],
              sublabels: { "nutri_lok_long_inversion_jour_nuit": "Jour/Nuit", "nutri_lok_long_inversion_lait_solide": "Ordre lait/solide" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_long_inversion_jour_nuit", text: "<div class=\"cc-sub-banner\">Inversion Jour/Nuit 🌞🌛</div>\n- La **majorité des apports** se fait **la nuit** (peut être dû au mode de garde)\n  ⇒ Il semble y avoir une **inversion jour/nuit** au niveau de son alimentation\n- Or **la nuit,** le **corps est programmé** pour être en **\"mode repos\"**\n  ⇒ Il se pourrait alors :\n    - Qu'il **utilise la nuit** pour **compenser le manque d'apport en journée**\n    - MAIS que la **pression de sommeil** de la nuit rendent les prises alimentaires **- efficaces**\n      ⇒ et donc qu'il **boive MOINS QUE CES véritables besoins**" },
                { type: "normal", showIfPb: "nutri_lok_long_inversion_lait_solide", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Mettre lait AVANT les solides</div>\n- Aujourd'hui, la **diversification** est **prise AVANT le lait**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour le lait,**\n  ⇒ Pourtant, le **lait reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
                { type: "normal", showIfPb: "nutri_lok_long_inversion_lait_solide", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Mettre solide AVANT le lait</div>\n- Aujourd'hui, **le lait** est **pris AVANT la diversification**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour la diversification,**\n  ⇒ Pourtant, la **diversification reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
              ]
            },
            {
              id: "tetine", emoji: "🍭", label: "Tétine = cache-faim",
              pb: "nutri_lok_long_tetine_cache_faim",
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_long_tetine_cache_faim", text: "- [prénom_enfant] **demande souvent la tétine** dans la bouche\n- La TETINE **PEUT répondre à un reflexe de succion**\n- MAIS peut aussi faire **office d'illusion** puisqu'**elle \"dupe\" le cerveau :**\n  - [prénom_enfant] **\"tète et déglutit\"** avec la tétine\n  - donc le **cerveau pense que qqch rentre** dans son estomac\n  - **mais rien ne rentre**…\n  - et **au bout d'un moment :**\n    - l'**illusion se perd**\n    - et la **faim se fait VRAIMENT ressentir**\n  - **MEME SI vous remettez la tétine :**\n    - il n'**en veut pas**\n    - et il pleure\n    - Parce qu'il **veut autre chose**\n    ⇒ Tout simplement car il a faim\n\n  ⇒ Donc, pour moi, la tétine joue ICI le **rôle d'un \"cache-faim\"**" },
              ]
            },
            {
              id: "autre", emoji: "🍽️", label: "Autres (Féculent / Lait-Solide / Jus-Lait animal)",
              pb: ["nutri_lok_long_autre_feculents","nutri_lok_long_autre_lait_solide_important","nutri_lok_long_autre_jus_vegetal","nutri_lok_long_autre_lait_animal"],
              sublabels: { "nutri_lok_long_autre_feculents": "Féculents", "nutri_lok_long_autre_lait_solide_important": "Lait/solide imp.", "nutri_lok_long_autre_jus_vegetal": "Jus végétal", "nutri_lok_long_autre_lait_animal": "Lait animal" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_long_autre_feculents", text: "<div class=\"cc-sub-banner\">Féculent 🥔</div>\n- La **part des féculents** dans son alimentation **est assez faible**\n- Et pourtant, les **féculents participent** activement à :\n  - **l'apport énergétique**\n  - et... à la **satiété**" },
                { type: "normal", showIfPb: "nutri_lok_long_autre_lait_solide_important", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Solide trop important</div>\n- La **place de la diversification** dans son alimentation **prend une part importante**\n- Or à son âge, le **lait** devrait être la **source principale d'apport nutritionnel**" },
                { type: "normal", showIfPb: "nutri_lok_long_autre_lait_solide_important", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Lait trop important</div>\n- La **place du lait** dans **son alimentation** prend une **part importante** dans **son alimentation**\n- Or **à son âge**, la **diversification** devrait être la **source principale d'apport nutritionnel**" },
                { type: "normal", showIfPb: "nutri_lok_long_autre_jus_vegetal", text: "<div class=\"cc-sub-banner\">Jus végétal 🧃</div>\n- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">jus végétal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir**" },
                { type: "normal", showIfPb: "nutri_lok_long_autre_lait_animal", text: "<div class=\"cc-sub-banner\">Lait animal 🐄</div>\n- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">lait animal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir**" },
              ]
            },
          ]
        },
        { type: "normal", _parentLevel: true, text: "- Voilà,\n- AVEC tous ces **petits indices,**\n- On commence à voir un **schéma qui se dessine** au **niveau de sa nutrition**\n- Et **CE QUI est intéressant**, c'est que ça correspond à CE QUE **vous observez** :\n  - dans son comportement\n  - et dans son sommeil" },
        {
          type: "conclusion_nutrition",
          _parentLevel: true,
          blocks: [
            { type: "normal", text: "- Pour moi, **l'explication la + probable,**\n- <span style=\"color:#dc2626\">⇒ c'est que [prénom_enfant] a **encore faim ENTRE ses prises alimentaires** car elles sont **trop espacées** pour ses **besoins actuels**</span>\n\n- Et quand les **besoins d'un enfant** ne sont **pas complètement couverts**\n- **Ca se reflète** très souvent par un **sommeil fragmenté**\n\n  ⇒ 🎯 L'**objectif** serait donc :\n  - d'**adapter progressivement** la **répartition de ses apports** :\n    - avec des **prises + rapprochées**\n    - des **volumes + adaptés**" },
            { type: "normal", showIfPb: "nutri_lok_long_conseq_inconfort", text: "- 🤮 ET potentiellement ça va **réduire son inconfort digestif**" },
            { type: "normal", showIfPb: "nutri_lok_long_tetee_greve", text: "- 🪧 Et la \"grève des tétées\" pourrait **être une réponse** au fait que **l'effort pour obtenir le lait** est devenu **trop important.**\n- Dans **certains cas**, les BB se **mettent en mode \"veille\"**\n  ⇒ ils **\"pèsent le pour et le contre\"** :\n  - entre **l'effort pour téter**\n  - et la **quantité de lait reçue**\n- et parfois, la **balance penche du côté de l'effort**… alors ils **préfèrent refuser la tétée.**" },
            { type: "normal", showIfPb: "nutri_lok_long_conseq_mange_nuit", text: "- 🌛 L'**objectif** serait **aussi** de **réduire les réveils nocturnes** car il **semble utiliser la nuit** pour **compléter ce qu'**il ne **prend pas** encore en **journée**" },
            { type: "question", text: "Est-ce que **ça fait sens pour vous** quand je vous **l'explique comme ça** ?" },
            { type: "normal", text: "- Nous allons donc :\n  - **travailler ensemble** sur ce **pillier \"alimentation\"** en **rétablissant un rythme alimentaire** qui lui **convienne mieux**" },
            { type: "normal", text: "- Et **avec ces ajustements**, **vous allez voir** que ça va **solutionner une partie** de ses **troubles du sommeil**" },
          ]
        },
      ]
    },

    // ─── NUTRITION : LAIT (COURBES OK) — ESPACEMENT TROP COURT ─────────
    {
      id: "nutri_lok_esp_court",
      problematiqueId: "nutri_lok_esp_court",
      leverId: "nutri_lok_esp_court",
      title: "Lait (courbes OK) — Espacement trop court",
      emoji: "⏱️",
      blocks: [
        { type: "normal", text: "- 🔥 Aujourd'hui, les **biberons/tétées** de [prénom_enfant] sont espacés d'environ <strong style=\"color:#dc2626\">XX</strong> h\n\n- C'est un **espacement** relativement **COURT** pour un enfant de cet âge\n  ⇒ c'est plutôt un **rythme d'un nourrisson,** avec des **prises très rapprochées**" },
        { type: "normal", text: "- Donc, si on **prend un peu de recul** sur tout ça…\n  on peut voir qu'il y a **AUSSI :**\n  - **d'AUTRES plusieurs petites choses**\n  - AUTOUR de son **alimentation**\n  - qui peuvent **jouer un rôle** sur son **sommeil**<br><br>\n- Je pense notamment…" },
        { type: "normal", _noBorder: true, text: "<div style=\"height:40px;background:#fff7ed;border-radius:12px;margin:0 -8px\"></div>" },
        {
          type: "courbe_cards_grid",
          items: [
            {
              id: "vol", emoji: "🍼", label: "Taille / durée des bib",
              pb: ["nutri_lok_court_vol_petit","nutri_lok_court_vol_gros"],
              sublabels: { "nutri_lok_court_vol_petit": "Petit bib", "nutri_lok_court_vol_gros": "Gros bib" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_court_vol_petit", text: "<div class=\"cc-sub-banner\">Petit bib</div>\n- Le **volume** des biberons est **assez petit** pour :\n  - **son âge**\n  - **et ses besoins**\n  ⇒ L'**estomac** est **constamment sollicité**" },
                { type: "normal", showIfPb: "nutri_lok_court_vol_gros", text: "<div class=\"cc-sub-banner\">Gros bib</div>\n- Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez conséquent** par **rapport au volume de son estomac** (**souvent** on **suit ce qui est inscrit** sur les **boites de lait**)\n  ⇒ C'est **comme s'il était \"gavé\"**\n  ⇒ et **son estomac** doit **gérer une quantité importante** à chaque biberon et **TRES SOUVENT**\n  ⇒ ce qui peut **parfois entraîner une digestion + difficile...**\n<div style=\"background:#f5f0ff;border:3px dashed #a78bfa;border-radius:16px;padding:6px 20px 6px 0;box-shadow:0 2px 8px rgba(167,139,250,0.18);margin:8px 0\"><ul style=\"margin:0;padding-left:21px\"><li>🔥 <em>OPTION</em> — Reflux : ... qui peut <strong>favoriser le reflux</strong></li></ul></div>" },
              ]
            },
            {
              id: "inconfort", emoji: "🤮", label: "Inconfort digestif",
              pb: "nutri_lok_court_inconfort_digestif",
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_court_inconfort_digestif", text: "- Le fait qu'il semble **éprouver** un certain **inconfort digestif**" },
              ]
            },
            {
              id: "inv", emoji: "🔄", label: "Inversion",
              pb: ["nutri_lok_court_inversion_jour_nuit","nutri_lok_court_inversion_lait_solide"],
              sublabels: { "nutri_lok_court_inversion_jour_nuit": "Jour/Nuit", "nutri_lok_court_inversion_lait_solide": "Ordre lait/solide" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_court_inversion_jour_nuit", text: "<div class=\"cc-sub-banner\">Inversion Jour/Nuit 🌞🌛</div>\n- La **majorité des apports** se fait **la nuit** (peut être dû au mode de garde)\n  ⇒ Il semble y avoir une **inversion jour/nuit** au niveau de son alimentation\n  ⇒ Il se pourrait qu'il **compense le manque d'apport en journée** en se **nourrissant la nuit**" },
                { type: "normal", showIfPb: "nutri_lok_court_inversion_lait_solide", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Mettre lait AVANT les solides</div>\n- Aujourd'hui, la **diversification** est **prise AVANT le lait**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour le lait,**\n  ⇒ Pourtant, le **lait reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
                { type: "normal", showIfPb: "nutri_lok_court_inversion_lait_solide", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Mettre solide AVANT le lait</div>\n- Aujourd'hui, **le lait** est **pris AVANT la diversification**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour la diversification,**\n  ⇒ Pourtant, la **diversification reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
              ]
            },
            {
              id: "autre", emoji: "🍽️", label: "Autres (Féculent / Lait-Solide / Jus-Lait animal)",
              pb: ["nutri_lok_court_autre_feculents","nutri_lok_court_autre_lait_solide_important","nutri_lok_court_autre_jus_vegetal","nutri_lok_court_autre_lait_animal"],
              sublabels: { "nutri_lok_court_autre_feculents": "Féculents", "nutri_lok_court_autre_lait_solide_important": "Lait/solide imp.", "nutri_lok_court_autre_jus_vegetal": "Jus végétal", "nutri_lok_court_autre_lait_animal": "Lait animal" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_court_autre_feculents", text: "<div class=\"cc-sub-banner\">Féculent 🥔</div>\n- La **part des féculents** dans son alimentation **est assez faible**\n- Et pourtant, les **féculents participent** activement à :\n  - **l'apport énergétique**" },
                { type: "normal", showIfPb: "nutri_lok_court_autre_lait_solide_important", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Solide trop important</div>\n- La **place de la diversification** dans son alimentation **prend une part importante**\n- Or à son âge, le **lait** devrait être la **source principale d'apport nutritionnel**" },
                { type: "normal", showIfPb: "nutri_lok_court_autre_lait_solide_important", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Lait trop important</div>\n- La **place du lait** dans **son alimentation** prend une **part importante** dans **son alimentation**\n- Or **à son âge**, la **diversification** devrait être la **source principale d'apport nutritionnel**" },
                { type: "normal", showIfPb: "nutri_lok_court_autre_jus_vegetal", text: "<div class=\"cc-sub-banner\">Jus végétal 🧃</div>\n- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">jus végétal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir**" },
                { type: "normal", showIfPb: "nutri_lok_court_autre_lait_animal", text: "<div class=\"cc-sub-banner\">Lait animal 🐄</div>\n- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">lait animal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir**" },
              ]
            },
          ]
        },
        { type: "normal", _parentLevel: true, text: "- Voilà,\n- AVEC tous ces **petits indices,**\n- On commence à voir un **schéma qui se dessine** au **niveau de sa nutrition**\n- Et **CE QUI est intéressant**, c'est que ça correspond à CE QUE **vous observez** :\n  - dans son comportement\n  - et dans son sommeil" },
        {
          type: "conclusion_nutrition",
          _parentLevel: true,
          blocks: [
            { type: "normal", text: "- Pour moi, **l'explication la + probable,**\n  <span style=\"color:#dc2626\">⇒ c'est que [prénom_enfant] a un **vrai inconfort digestif**</span>\n\n- Il **reçoit peut-être** des **apports suffisants** sur 24 h, MAIS de **façon très fractionnée.**\n- **Dans ce cas**, leur **système digestif** peut **travailler presque en continu**, SANS véritable **tps de repos.**\n  ⇒ Cela peut **créer** :\n  - **un inconfort digestif**\n  - et un **sommeil + fragmenté,** avec des **réveils + fréquents.**\n\n- 🎯 L'**objectif** serait donc d'**adapter progressivement la répartition** de ses apports :\n  - avec des **prises - rapprochées** pour mieux **respecter sa digestion**\n  - des **volumes + adaptés**" },
            { type: "normal", showIfPb: "nutri_lok_court_conseq_inconfort", text: "- 🤮 ET potentiellement ça va **réduire son inconfort digestif**" },
            { type: "normal", showIfPb: "nutri_lok_court_conseq_mange_nuit", text: "- 🌛 L'**objectif** serait **aussi** de **réduire les réveils nocturnes** car il **semble utiliser la nuit** pour **compléter ce qu'**il ne **prend pas** encore en **journée**" },
            { type: "question", text: "Est-ce que **ça fait sens pour vous** quand je vous **l'explique comme ça** ?" },
            { type: "normal", text: "- Nous allons donc :\n  - **travailler ensemble** sur ce **pillier \"alimentation\"** en **rétablissant un rythme alimentaire** qui lui **convienne mieux**" },
            { type: "normal", text: "- Et **avec ces ajustements**, **vous allez voir** que ça va **solutionner une partie** de ses **troubles du sommeil**" },
          ]
        },
      ]
    },

    // ─── NUTRITION : LAIT (COURBES OK) — LAIT ANIMAL ─────────
    {
      id: "nutri_lok_lait_animal",
      problematiqueId: "nutri_lok_lait_animal",
      leverId: "nutri_lok_lait_animal",
      title: "Lait (courbes OK) — Lait animal",
      emoji: "🥛",
      blocks: [
        { type: "normal", text: "- Aujourd'hui, [prénom_enfant] boit des **biberons de lait animal** en **quantité importante**\n- Les **laits animaux** ne sont **pas TOUJOURS adaptés aux besoins des enfants**\n  - Ils sont soient :\n    - **trop pauvres**\n    - ou **trop riches** en **certains nutriments essentiels** à leur **croissance**\n\n- Ces boissons **PEUVENT faire partie de l'alimentation familiale**\n  mais elles **ne couvrent PAS les besoins nutritionnels** d'un jeune enfant\n\n- **Jusqu'à au moins 3 ans**, le **lait** *(infantile ou maternel)* reste **INDISPENSABLE** dans l'alimentation des enfants\n  car ils sont **spécialement conçus** pour leur **bon développement** *(source : Haute Autorité de Santé, et le PNNS : Programme National Nutrition et Santé)*" },
        { type: "normal", text: "- Donc, si on **prend un peu de recul** sur tout ça…\n  on peut voir qu'il y a **AUSSI :**\n  - **d'AUTRES plusieurs petites choses**\n  - AUTOUR de son **alimentation**\n  - qui peuvent **jouer un rôle** sur son **sommeil**<br><br>\n- Je pense notamment…" },
        { type: "normal", _noBorder: true, text: "<div style=\"height:40px;background:#fff7ed;border-radius:12px;margin:0 -8px\"></div>" },
        {
          type: "courbe_cards_grid",
          items: [
            {
              id: "esp", emoji: "🔛", label: "Espacement bib et sein",
              pb: ["nutri_lok_la_esp_long","nutri_lok_la_esp_court"],
              sublabels: { "nutri_lok_la_esp_long": "Trop long", "nutri_lok_la_esp_court": "Trop court" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_la_esp_long", text: "<div class=\"cc-sub-banner\">Espacement LONG</div>\n- 🔥 L'**intervalle entre 2 prises** alimentaires peut être parfois assez long (<strong style=\"color:#dc2626\">XX</strong> heures)\n\n- A cet âge, les enfants ont **besoin de prises + rapprochés** pour s'**adapter** à leur **signaux de faim.**\n- **On devrait** normalement **leur donner** : \"***à la demande***\"\n- Avec des **espacements longs, [prénom_enfant]** a du **mal à \"TENIR\" jusqu'à la prochaine prise alimentaire**\n  ⇒ On **peut imaginer** qu'[il_elle] est **comme \"affamé\"** entre 2 prises alimentaires" },
                { type: "normal", showIfPb: "nutri_lok_la_esp_court", text: "<div class=\"cc-sub-banner\">Espacement COURT</div>\n- 🔥 L'**espacement entre 2 prises** alimentaires est **parfois très rapprochés** (<strong style=\"color:#dc2626\">XX</strong> heures)\n  ⇒ **Son estomac** est **constamment sollicité**\n  ⇒ Ce qui peut provoquer un **certain inconfort digestif**" },
              ]
            },
            {
              id: "vol", emoji: "🍼", label: "Taille / durée des bib",
              pb: ["nutri_lok_la_vol_petit","nutri_lok_la_vol_gros","nutri_lok_la_vol_longtemps"],
              sublabels: { "nutri_lok_la_vol_petit": "Petit bib", "nutri_lok_la_vol_gros": "Gros bib", "nutri_lok_la_vol_longtemps": "Bu longtemps" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_la_vol_petit", text: "<div class=\"cc-sub-banner\">Petit bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez petit** pour :\n  - **son âge**\n  - **et ses besoins**\n  ⇒ Ca se **rapproche +** de la **taille des biberons d'un nourrisson**\n  ⇒ **SI** les **biberons sont petits** : la **sensation d'être RASSASIE** se **dissipe** assez **vite**" },
                { type: "normal", showIfPb: "nutri_lok_la_vol_gros", text: "<div class=\"cc-sub-banner\">Gros bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez conséquent** par **rapport au volume de son estomac** (**souvent** on **suit ce qui est inscrit** sur les **boites de lait**)\n  ⇒ C'est **comme s'il était \"gavé\"**\n  ⇒ et **son estomac** doit **gérer une quantité importante** à chaque biberon\n  ⇒ ce qui peut **parfois entraîner une digestion + difficile...**\n<div style=\"background:#f5f0ff;border:3px dashed #a78bfa;border-radius:16px;padding:6px 20px 6px 0;box-shadow:0 2px 8px rgba(167,139,250,0.18);margin:8px 0\"><ul style=\"margin:0;padding-left:21px\"><li>🔥 <em>OPTION</em> — Reflux : ... qui peut <strong>favoriser le reflux</strong></li></ul></div>" },
                { type: "normal", showIfPb: "nutri_lok_la_vol_longtemps", text: "<div class=\"cc-sub-banner\">Bu longtemps</div>\n- Les biberons sont **parfois bus pendant très longtemps** (souvent **pour terminer les quantités indiquées sur les boîtes de lait**)\n  ⇒ Ce qui peut **brouiller les signaux** naturels **de faim** et de **satiété**" },
              ]
            },
            {
              id: "inconfort", emoji: "🤮", label: "Inconfort digestif",
              pb: "nutri_lok_la_inconfort_digestif",
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_la_inconfort_digestif", text: "- Le fait qu'il **éprouve** un **inconfort digestif** après ses repas" },
              ]
            },
            {
              id: "tetee", emoji: "🤱", label: "Tétée : baisse de lactation",
              pb: ["nutri_lok_la_tetee","nutri_lok_la_tetee_longue","nutri_lok_la_tetee_greve","nutri_lok_la_tetee_mode_garde"],
              sublabels: { "nutri_lok_la_tetee_longue": "Longue tétée", "nutri_lok_la_tetee_greve": "Grève des tétées", "nutri_lok_la_tetee_mode_garde": "Mode de garde" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_la_tetee_longue", text: "<div class=\"cc-sub-banner\">Longue tétée</div>\n- Les **tétées** SEMBLENT **être assez longues**\n- La **durée des tétées MOYENNE** est normalement autour de **20 min**\n  ⇒ Ce qui **pourrait indiquer** peut-être un **manque de satiété** avec **le lait animal**" },
                { type: "normal", showIfPb: "nutri_lok_la_tetee_greve", text: "<div class=\"cc-sub-banner\">Grève des tétées</div>\n- Vous m'avez aussi parlé du **refus de certaines tétées**" },
                { type: "normal", showIfPb: ["nutri_lok_la_tetee","nutri_lok_la_tetee_longue","nutri_lok_la_tetee_greve","nutri_lok_la_tetee_mode_garde"], text: "- Il y a peut-être eu une **possible diminution** (peut-être car **vos seins sont moins stimulés ?**)" },
                { type: "normal", showIfPb: "nutri_lok_la_tetee_mode_garde", text: "- ...Ce sont des choses qui **peuvent arriver** lors d'un **changement de rythme**\n  notamment quand un **BB commence un mode de garde**\n  ⇒ car la **stimulation de vos seins** est **moins importante en journée**" },
                { type: "normal", showIfPb: ["nutri_lok_la_tetee","nutri_lok_la_tetee_longue","nutri_lok_la_tetee_greve","nutri_lok_la_tetee_mode_garde"], text: "  ⇒ Donc, ça **peut influencer** sur la **quantité de lait** que **boit** [prénom_enfant]\n\n- **Heureusement,** il y a des **solutions qui existent** pour :\n  - **re-booster la lactation**\n  - et donc de diminuer la part de **lait animal**\n\n  et je vous en **reparlerai plus tard**" },
              ]
            },
            {
              id: "inv", emoji: "🔄", label: "Inversion",
              pb: ["nutri_lok_la_inversion_jour_nuit","nutri_lok_la_inversion_lait_solide"],
              sublabels: { "nutri_lok_la_inversion_jour_nuit": "Jour/Nuit", "nutri_lok_la_inversion_lait_solide": "Ordre lait/solide" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_la_inversion_jour_nuit", text: "<div class=\"cc-sub-banner\">Inversion Jour/Nuit 🌞🌛</div>\n- La **majorité des apports** se fait **la nuit** (peut être dû au mode de garde)\n  ⇒ Il semble y avoir une **inversion jour/nuit** au niveau de son alimentation\n  ⇒ il est possible qu'il **compense le manque d'apports en journée** en se **nourrissant la nuit**" },
                { type: "normal", showIfPb: "nutri_lok_la_inversion_lait_solide", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Mettre lait AVANT les solides</div>\n- Aujourd'hui, la **diversification** est **prise AVANT le lait**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour le lait,**\n  ⇒ Pourtant, le **lait reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
                { type: "normal", showIfPb: "nutri_lok_la_inversion_lait_solide", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Mettre solide AVANT le lait</div>\n- Aujourd'hui, **le lait** est **pris AVANT la diversification**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour la diversification,**\n  ⇒ Pourtant, la **diversification reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
              ]
            },
            {
              id: "tetine", emoji: "🍭", label: "Tétine = cache-faim",
              pb: "nutri_lok_la_tetine_cache_faim",
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_la_tetine_cache_faim", text: "- [prénom_enfant] **demande souvent la tétine** dans la bouche\n- La TETINE **PEUT répondre à un reflexe de succion**\n- MAIS peut aussi faire **office d'illusion** puisqu'**elle \"dupe\" le cerveau :**\n  - [prénom_enfant] **\"tète et déglutit\"** avec la tétine\n  - donc le **cerveau pense que qqch rentre** dans son estomac\n  - **mais rien ne rentre**…\n  - et **au bout d'un moment :**\n    - l'**illusion se perd**\n    - et la **faim se fait VRAIMENT ressentir**\n  - **MEME SI vous remettez la tétine :**\n    - il n'**en veut pas**\n    - et il pleure\n    - Parce qu'il **veut autre chose**\n    ⇒ Tout simplement car il a faim\n\n  ⇒ Donc, pour moi, la tétine joue ICI le **rôle d'un \"cache-faim\"**" },
              ]
            },
            {
              id: "autre", emoji: "🍽️", label: "Autres (Féculent / Lait-Solide)",
              pb: ["nutri_lok_la_autre_feculents","nutri_lok_la_autre_lait_solide_important"],
              sublabels: { "nutri_lok_la_autre_feculents": "Féculents", "nutri_lok_la_autre_lait_solide_important": "Lait/solide imp." },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_la_autre_feculents", text: "<div class=\"cc-sub-banner\">Féculent 🥔</div>\n- La **part des féculents** dans son alimentation **est assez faible**\n- Et pourtant, les **féculents participent** activement à :\n  - **l'apport énergétique**\n  - et... à la **satiété**" },
                { type: "normal", showIfPb: "nutri_lok_la_autre_lait_solide_important", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Solide trop important</div>\n- La **place de la diversification** dans son alimentation **prend une part importante**\n- Or à son âge, le **lait** devrait être la **source principale d'apport nutritionnel**" },
                { type: "normal", showIfPb: "nutri_lok_la_autre_lait_solide_important", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Lait trop important</div>\n- La **place du lait** dans **son alimentation** prend une **part importante** dans **son alimentation**\n- Or **à son âge**, la **diversification** devrait être la **source principale d'apport nutritionnel**… qui **apporte :**\n  - **les nutriments** essentiels\n  - et **la satiété**\n\n  ⇒ On rentre alors dans un **cercle vicieux** :\n  - Il **mange peu de solides en journée**\n  - **Boit bcp de lait** pour compenser\n  - Le **lait prend la place des solides** dans l'estomac\n  - Il **mange peu de solides** …" },
              ]
            },
          ]
        },
        { type: "normal", _parentLevel: true, text: "- Voilà,\n- AVEC tous ces **petits indices,**\n- On commence à voir un **schéma qui se dessine** au **niveau de sa nutrition**\n- Et **CE QUI est intéressant**, c'est que ça correspond à CE QUE **vous observez** :\n  - dans son comportement\n  - et dans son sommeil" },
        {
          type: "conclusion_nutrition",
          _parentLevel: true,
          blocks: [
            { type: "normal", text: "- Pour moi, **l'explication la + probable**\n- <span style=\"color:#dc2626\">⇒ c'est que [prénom_enfant] **a faim**.</span>\n  Il a **CERTES souvent l'estomac rempli**\n  MAIS PAS forcément **avec les bons apports** pour grandir et être rassasié\n\n- Les **jus végétaux ou de lait animal** ne **couvrent PAS ses besoins nutritionnels des enfants**\n- Dans ce cas :\n  - la **faim revient rapidement**\n  - leur **système digestif** peut être **sollicité de manière inadaptée,** avec **inconfort ou reflux**\n- Cela peut contribuer à :\n  - un **sommeil + fragmenté**\n  - et à des **réveils plus fréquents.**\n\n  ⇒ 🎯 L'**idée** serait donc d'**adapter la QUALITÉ** de ses apports nutritionnels, pour qu'ils **répondent aux besoins d'un enfant de cet âge**" },
            { type: "normal", showIfPb: "nutri_lok_la_conseq_inconfort", text: "- 🤮 ET potentiellement ça va **réduire son inconfort digestif**" },
            { type: "normal", showIfPb: "nutri_lok_la_tetee_greve", text: "- 🪧 Et la \"grève des tétées\" pourrait **être une réponse** au fait que **l'effort pour obtenir le lait** est devenu **trop important.**\n- Dans **certains cas**, les BB se **mettent en mode \"veille\"**\n  ⇒ ils **\"pèsent le pour et le contre\"** :\n  - entre **l'effort pour téter**\n  - et la **quantité de lait reçue**\n- et parfois, la **balance penche du côté de l'effort**… alors ils **préfèrent refuser la tétée.**" },
            { type: "normal", showIfPb: "nutri_lok_la_conseq_mange_nuit", text: "- 🌛 L'**objectif** serait **aussi** de **réduire les réveils nocturnes** car il **semble utiliser la nuit** pour **compléter ce qu'**il ne **prend pas** encore en **journée**" },
            { type: "question", text: "Est-ce que **ça fait sens pour vous** quand je vous **l'explique comme ça** ?" },
            { type: "normal", text: "- On va donc **travailler ensemble** sur ce **pilier \"alimentation\"** en réintroduisant des **apports nutritionnels ADAPTÉS** à ses besoins, pour favoriser :\n  - une **satiété + durable**\n  - un meilleur **confort digestif**\n  - et un **sommeil + apaisé**" },
            { type: "normal", text: "- Et **avec ces ajustements**, **vous allez voir** que ça va **solutionner une partie** de ses **troubles du sommeil**" },
          ]
        },
      ]
    },

    // ─── NUTRITION : LAIT (COURBES OK) — JUS VÉGÉTAL ─────────
    {
      id: "nutri_lok_jus_vegetal",
      problematiqueId: "nutri_lok_jus_vegetal",
      leverId: "nutri_lok_jus_vegetal",
      title: "Lait (courbes OK) — Jus végétal",
      emoji: "🧃",
      blocks: [
        { type: "normal", text: "- Aujourd'hui, [prénom_enfant] boit des **biberons de jus végétal** en **quantité importante**\n- Les **jus végétaux** ne sont **pas TOUJOURS adaptés aux besoins des enfants**\n  - Ils sont soient :\n    - **trop pauvres**\n    - ou **trop riches** en **certains nutriments essentiels** à leur **croissance**\n\n- Ces boissons **PEUVENT faire partie de l'alimentation familiale**\n  mais elles **ne couvrent PAS les besoins nutritionnels** d'un jeune enfant\n\n- **Jusqu'à au moins 3 ans**, le **lait** *(infantile ou maternel)* reste **INDISPENSABLE** dans l'alimentation des enfants\n  car ils sont **spécialement conçus** pour leur **bon développement** *(source : Haute Autorité de Santé, et le PNNS : Programme National Nutrition et Santé)*" },
        { type: "normal", text: "- Donc, si on **prend un peu de recul** sur tout ça…\n  on peut voir qu'il y a **AUSSI :**\n  - **d'AUTRES plusieurs petites choses**\n  - AUTOUR de son **alimentation**\n  - qui peuvent **jouer un rôle** sur son **sommeil**<br><br>\n- Je pense notamment…" },
        { type: "normal", _noBorder: true, text: "<div style=\"height:40px;background:#fff7ed;border-radius:12px;margin:0 -8px\"></div>" },
        {
          type: "courbe_cards_grid",
          items: [
            {
              id: "esp", emoji: "🔛", label: "Espacement bib et sein",
              pb: ["nutri_lok_jv_esp_long","nutri_lok_jv_esp_court"],
              sublabels: { "nutri_lok_jv_esp_long": "Trop long", "nutri_lok_jv_esp_court": "Trop court" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_jv_esp_long", text: "<div class=\"cc-sub-banner\">Espacement LONG</div>\n- 🔥 L'**intervalle entre 2 prises** alimentaires peut être parfois assez long (<strong style=\"color:#dc2626\">XX</strong> heures)\n\n- A cet âge, les enfants ont **besoin de prises + rapprochés** pour s'**adapter** à leur **signaux de faim.**\n- **On devrait** normalement **leur donner** : \"***à la demande***\"\n- Avec des **espacements longs, [prénom_enfant]** a du **mal à \"TENIR\" jusqu'à la prochaine prise alimentaire**\n  ⇒ On **peut imaginer** qu'[il_elle] est **comme \"affamé\"** entre 2 prises alimentaires" },
                { type: "normal", showIfPb: "nutri_lok_jv_esp_court", text: "<div class=\"cc-sub-banner\">Espacement COURT</div>\n- 🔥 L'**espacement entre 2 prises** alimentaires est **parfois très rapprochés** (<strong style=\"color:#dc2626\">XX</strong> heures)\n  ⇒ **Son estomac** est **constamment sollicité**\n  ⇒ Ce qui peut provoquer un **certain inconfort digestif**" },
              ]
            },
            {
              id: "vol", emoji: "🍼", label: "Taille / durée des bib",
              pb: ["nutri_lok_jv_vol_petit","nutri_lok_jv_vol_gros","nutri_lok_jv_vol_longtemps"],
              sublabels: { "nutri_lok_jv_vol_petit": "Petit bib", "nutri_lok_jv_vol_gros": "Gros bib", "nutri_lok_jv_vol_longtemps": "Bu longtemps" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_jv_vol_petit", text: "<div class=\"cc-sub-banner\">Petit bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez petit** pour :\n  - **son âge**\n  - **et ses besoins**\n  ⇒ Ca se **rapproche +** de la **taille des biberons d'un nourrisson**\n  ⇒ **SI** les **biberons sont petits** : la **sensation d'être RASSASIE** se **dissipe** assez **vite**" },
                { type: "normal", showIfPb: "nutri_lok_jv_vol_gros", text: "<div class=\"cc-sub-banner\">Gros bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez conséquent** par **rapport au volume de son estomac** (**souvent** on **suit ce qui est inscrit** sur les **boites de lait**)\n  ⇒ C'est **comme s'il était \"gavé\"**\n  ⇒ et **son estomac** doit **gérer une quantité importante** à chaque biberon\n  ⇒ ce qui peut **parfois entraîner une digestion + difficile...**\n<div style=\"background:#f5f0ff;border:3px dashed #a78bfa;border-radius:16px;padding:6px 20px 6px 0;box-shadow:0 2px 8px rgba(167,139,250,0.18);margin:8px 0\"><ul style=\"margin:0;padding-left:21px\"><li>🔥 <em>OPTION</em> — Reflux : ... qui peut <strong>favoriser le reflux</strong></li></ul></div>" },
                { type: "normal", showIfPb: "nutri_lok_jv_vol_longtemps", text: "<div class=\"cc-sub-banner\">Bu longtemps</div>\n- Les biberons sont **parfois bus pendant très longtemps** (souvent **pour terminer les quantités indiquées sur les boîtes de lait**)\n  ⇒ Ce qui peut **brouiller les signaux** naturels **de faim** et de **satiété**" },
              ]
            },
            {
              id: "inconfort", emoji: "🤮", label: "Inconfort digestif",
              pb: "nutri_lok_jv_inconfort_digestif",
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_jv_inconfort_digestif", text: "- Le fait qu'il **éprouve** un **inconfort digestif** après ses repas" },
              ]
            },
            {
              id: "tetee", emoji: "🤱", label: "Tétée : baisse de lactation",
              pb: ["nutri_lok_jv_tetee","nutri_lok_jv_tetee_longue","nutri_lok_jv_tetee_greve","nutri_lok_jv_tetee_mode_garde"],
              sublabels: { "nutri_lok_jv_tetee_longue": "Longue tétée", "nutri_lok_jv_tetee_greve": "Grève des tétées", "nutri_lok_jv_tetee_mode_garde": "Mode de garde" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_jv_tetee_longue", text: "<div class=\"cc-sub-banner\">Longue tétée</div>\n- Les **tétées** SEMBLENT **être assez longues**\n- La **durée des tétées MOYENNE** est normalement autour de **20 min**\n  ⇒ Ce qui **pourrait indiquer** peut-être un **manque de satiété** avec **le jus végétal**" },
                { type: "normal", showIfPb: "nutri_lok_jv_tetee_greve", text: "<div class=\"cc-sub-banner\">Grève des tétées</div>\n- Vous m'avez aussi parlé du **refus de certaines tétées**" },
                { type: "normal", showIfPb: ["nutri_lok_jv_tetee","nutri_lok_jv_tetee_longue","nutri_lok_jv_tetee_greve","nutri_lok_jv_tetee_mode_garde"], text: "- Il y a peut-être eu une **possible diminution** (peut-être car **vos seins sont moins stimulés ?**)" },
                { type: "normal", showIfPb: "nutri_lok_jv_tetee_mode_garde", text: "- ...Ce sont des choses qui **peuvent arriver** lors d'un **changement de rythme**\n  notamment quand un **BB commence un mode de garde**\n  ⇒ car la **stimulation de vos seins** est **moins importante en journée**" },
                { type: "normal", showIfPb: ["nutri_lok_jv_tetee","nutri_lok_jv_tetee_longue","nutri_lok_jv_tetee_greve","nutri_lok_jv_tetee_mode_garde"], text: "  ⇒ Donc, ça **peut influencer** sur la **quantité de lait** que **boit** [prénom_enfant]\n\n- **Heureusement,** il y a des **solutions qui existent** pour :\n  - **re-booster la lactation**\n  - et donc de diminuer la part de **jus végétal**\n\n  et je vous en **reparlerai plus tard**" },
              ]
            },
            {
              id: "inv", emoji: "🔄", label: "Inversion",
              pb: ["nutri_lok_jv_inversion_jour_nuit","nutri_lok_jv_inversion_lait_solide"],
              sublabels: { "nutri_lok_jv_inversion_jour_nuit": "Jour/Nuit", "nutri_lok_jv_inversion_lait_solide": "Ordre lait/solide" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_jv_inversion_jour_nuit", text: "<div class=\"cc-sub-banner\">Inversion Jour/Nuit 🌞🌛</div>\n- La **majorité des apports** se fait **la nuit** (peut être dû au mode de garde)\n  ⇒ Il semble y avoir une **inversion jour/nuit** au niveau de son alimentation\n  ⇒ il est possible qu'il **compense le manque d'apports en journée** en se **nourrissant la nuit**" },
                { type: "normal", showIfPb: "nutri_lok_jv_inversion_lait_solide", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Mettre lait AVANT les solides</div>\n- Aujourd'hui, la **diversification** est **prise AVANT le lait**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour le lait,**\n  ⇒ Pourtant, le **lait reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
                { type: "normal", showIfPb: "nutri_lok_jv_inversion_lait_solide", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Mettre solide AVANT le lait</div>\n- Aujourd'hui, **le lait** est **pris AVANT la diversification**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour la diversification,**\n  ⇒ Pourtant, la **diversification reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
              ]
            },
            {
              id: "tetine", emoji: "🍭", label: "Tétine = cache-faim",
              pb: "nutri_lok_jv_tetine_cache_faim",
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_jv_tetine_cache_faim", text: "- [prénom_enfant] **demande souvent la tétine** dans la bouche\n- La TETINE **PEUT répondre à un reflexe de succion**\n- MAIS peut aussi faire **office d'illusion** puisqu'**elle \"dupe\" le cerveau :**\n  - [prénom_enfant] **\"tète et déglutit\"** avec la tétine\n  - donc le **cerveau pense que qqch rentre** dans son estomac\n  - **mais rien ne rentre**…\n  - et **au bout d'un moment :**\n    - l'**illusion se perd**\n    - et la **faim se fait VRAIMENT ressentir**\n  - **MEME SI vous remettez la tétine :**\n    - il n'**en veut pas**\n    - et il pleure\n    - Parce qu'il **veut autre chose**\n    ⇒ Tout simplement car il a faim\n\n  ⇒ Donc, pour moi, la tétine joue ICI le **rôle d'un \"cache-faim\"**" },
              ]
            },
            {
              id: "autre", emoji: "🍽️", label: "Autres (Féculent / Lait-Solide)",
              pb: ["nutri_lok_jv_autre_feculents","nutri_lok_jv_autre_lait_solide_important"],
              sublabels: { "nutri_lok_jv_autre_feculents": "Féculents", "nutri_lok_jv_autre_lait_solide_important": "Lait/solide imp." },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_jv_autre_feculents", text: "<div class=\"cc-sub-banner\">Féculent 🥔</div>\n- La **part des féculents** dans son alimentation **est assez faible**\n- Et pourtant, les **féculents participent** activement à :\n  - **l'apport énergétique**\n  - et... à la **satiété**" },
                { type: "normal", showIfPb: "nutri_lok_jv_autre_lait_solide_important", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Solide trop important</div>\n- La **place de la diversification** dans son alimentation **prend une part importante**\n- Or à son âge, le **lait** devrait être la **source principale d'apport nutritionnel**" },
                { type: "normal", showIfPb: "nutri_lok_jv_autre_lait_solide_important", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Lait trop important</div>\n- La **place du lait** dans **son alimentation** prend une **part importante** dans **son alimentation**\n- Or **à son âge**, la **diversification** devrait être la **source principale d'apport nutritionnel**… qui **apporte :**\n  - **les nutriments** essentiels\n  - et **la satiété**\n\n  ⇒ On rentre alors dans un **cercle vicieux** :\n  - Il **mange peu de solides en journée**\n  - **Boit bcp de lait** pour compenser\n  - Le **lait prend la place des solides** dans l'estomac\n  - Il **mange peu de solides** …" },
              ]
            },
          ]
        },
        { type: "normal", _parentLevel: true, text: "- Voilà,\n- AVEC tous ces **petits indices,**\n- On commence à voir un **schéma qui se dessine** au **niveau de sa nutrition**\n- Et **CE QUI est intéressant**, c'est que ça correspond à CE QUE **vous observez** :\n  - dans son comportement\n  - et dans son sommeil" },
        {
          type: "conclusion_nutrition",
          _parentLevel: true,
          blocks: [
            { type: "normal", text: "- Pour moi, **l'explication la + probable**\n- <span style=\"color:#dc2626\">⇒ c'est que [prénom_enfant] **a faim**.</span>\n  Il a **CERTES souvent l'estomac rempli**\n  MAIS PAS forcément **avec les bons apports** pour grandir et être rassasié\n\n- Les **jus végétaux** ne **couvrent PAS ses besoins nutritionnels des enfants**\n- Dans ce cas :\n  - la **faim revient rapidement**\n  - leur **système digestif** peut être **sollicité de manière inadaptée,** avec **inconfort ou reflux**\n- Cela peut contribuer à :\n  - un **sommeil + fragmenté**\n  - et à des **réveils plus fréquents.**\n\n  ⇒ 🎯 L'**idée** serait donc d'**adapter la QUALITÉ** de ses apports nutritionnels, pour qu'ils **répondent aux besoins d'un enfant de cet âge**" },
            { type: "normal", showIfPb: "nutri_lok_jv_conseq_inconfort", text: "- 🤮 ET potentiellement ça va **réduire son inconfort digestif**" },
            { type: "normal", showIfPb: "nutri_lok_jv_tetee_greve", text: "- 🪧 Et la \"grève des tétées\" pourrait **être une réponse** au fait que **l'effort pour obtenir le lait** est devenu **trop important.**\n- Dans **certains cas**, les BB se **mettent en mode \"veille\"**\n  ⇒ ils **\"pèsent le pour et le contre\"** :\n  - entre **l'effort pour téter**\n  - et la **quantité de lait reçue**\n- et parfois, la **balance penche du côté de l'effort**… alors ils **préfèrent refuser la tétée.**" },
            { type: "normal", showIfPb: "nutri_lok_jv_conseq_mange_nuit", text: "- 🌛 L'**objectif** serait **aussi** de **réduire les réveils nocturnes** car il **semble utiliser la nuit** pour **compléter ce qu'**il ne **prend pas** encore en **journée**" },
            { type: "question", text: "Est-ce que **ça fait sens pour vous** quand je vous **l'explique comme ça** ?" },
            { type: "normal", text: "- On va donc **travailler ensemble** sur ce **pilier \"alimentation\"** en réintroduisant des **apports nutritionnels ADAPTÉS** à ses besoins, pour favoriser :\n  - une **satiété + durable**\n  - un meilleur **confort digestif**\n  - et un **sommeil + apaisé**" },
            { type: "normal", text: "- Et **avec ces ajustements**, **vous allez voir** que ça va **solutionner une partie** de ses **troubles du sommeil**" },
          ]
        },
      ]
    },

    // ─── NUTRITION : LAIT (COURBES OK) — INVERSION JOUR/NUIT ─────────
    {
      id: "nutri_lok_inv_jn",
      problematiqueId: "nutri_lok_inv_jn",
      leverId: "nutri_lok_inv_jn",
      title: "Lait (courbes OK) — Inversion Jour/Nuit",
      emoji: "🌞🌛",
      blocks: [
        { type: "normal", text: "- Nous observons que la **majorité des apports** alimentaires **se fait la nuit**\n  - En **journée,** [prénom_enfant] **se nourrit** relativement **peu** `==> Crèche ?`\n  - Et le **soir**, il semble **chercher à « rattraper »** ses besoins\n- Or, la **nuit** n'est **PAS un moment optimal** pour **se nourrir** :\n  - le **corps** est **programmé pour dormir**\n  - les **prises alimentaires** peuvent être **- efficaces**\n- Un **enfant de cet âge** devrait tendre `majoritairement/totalement` vers une **alimentation 100% diurne**" },
        { type: "normal", text: "- Donc, si on **prend un peu de recul** sur tout ça…\n  on peut voir qu'il y a **AUSSI :**\n  - **d'AUTRES plusieurs petites choses**\n  - AUTOUR de son **alimentation**\n  - qui peuvent **jouer un rôle** sur son **sommeil**<br><br>\n- Je pense notamment…" },
        { type: "normal", _noBorder: true, text: "<div style=\"height:40px;background:#fff7ed;border-radius:12px;margin:0 -8px\"></div>" },
        {
          type: "courbe_cards_grid",
          items: [
            {
              id: "esp", emoji: "🔛", label: "Espacement bib et sein",
              pb: ["nutri_lok_ijn_esp_long","nutri_lok_ijn_esp_court"],
              sublabels: { "nutri_lok_ijn_esp_long": "Trop long", "nutri_lok_ijn_esp_court": "Trop court" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_ijn_esp_long", text: "<div class=\"cc-sub-banner\">Espacement LONG</div>\n- 🔥 L'**intervalle entre 2 prises** alimentaires peut être parfois assez long (<strong style=\"color:#dc2626\">XX</strong> heures)\n\n- A cet âge, les enfants ont **besoin de prises + rapprochés** pour s'**adapter** à leur **signaux de faim.**\n- **On devrait** normalement **leur donner** : \"***à la demande***\"\n- Avec des **espacements longs, [prénom_enfant]** a du **mal à \"TENIR\" jusqu'à la prochaine prise alimentaire**\n  ⇒ On **peut imaginer** qu'[il_elle] est **comme \"affamé\"** entre 2 prises alimentaires" },
                { type: "normal", showIfPb: "nutri_lok_ijn_esp_court", text: "<div class=\"cc-sub-banner\">Espacement COURT</div>\n- 🔥 L'**espacement entre 2 prises** alimentaires est **parfois très rapprochés** (<strong style=\"color:#dc2626\">XX</strong> heures)\n  ⇒ **Son estomac** est **constamment sollicité**\n  ⇒ Ce qui peut provoquer un **certain inconfort digestif**" },
              ]
            },
            {
              id: "vol", emoji: "🍼", label: "Taille / durée des bib",
              pb: ["nutri_lok_ijn_vol_petit","nutri_lok_ijn_vol_gros","nutri_lok_ijn_vol_longtemps"],
              sublabels: { "nutri_lok_ijn_vol_petit": "Petit bib", "nutri_lok_ijn_vol_gros": "Gros bib", "nutri_lok_ijn_vol_longtemps": "Bu longtemps" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_ijn_vol_petit", text: "<div class=\"cc-sub-banner\">Petit bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez petit** pour :\n  - **son âge**\n  - **et ses besoins**\n  ⇒ Ca se **rapproche +** de la **taille des biberons d'un nourrisson**\n  ⇒ **SI** les **biberons sont petits** : la **sensation d'être RASSASIE** se **dissipe** assez **vite**" },
                { type: "normal", showIfPb: "nutri_lok_ijn_vol_gros", text: "<div class=\"cc-sub-banner\">Gros bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez conséquent** par **rapport au volume de son estomac** (**souvent** on **suit ce qui est inscrit** sur les **boites de lait**)\n  ⇒ C'est **comme s'il était \"gavé\"**\n  ⇒ et **son estomac** doit **gérer une quantité importante** à chaque biberon\n  ⇒ ce qui peut **parfois entraîner une digestion + difficile...**\n<div style=\"background:#f5f0ff;border:3px dashed #a78bfa;border-radius:16px;padding:6px 20px 6px 0;box-shadow:0 2px 8px rgba(167,139,250,0.18);margin:8px 0\"><ul style=\"margin:0;padding-left:21px\"><li>🔥 <em>OPTION</em> — Reflux : ... qui peut <strong>favoriser le reflux</strong></li></ul></div>" },
                { type: "normal", showIfPb: "nutri_lok_ijn_vol_longtemps", text: "<div class=\"cc-sub-banner\">Bu longtemps</div>\n- Les biberons sont **parfois bus pendant très longtemps** (souvent **pour terminer les quantités indiquées sur les boîtes de lait**)\n  ⇒ Ce qui peut **brouiller les signaux** naturels **de faim** et de **satiété**" },
              ]
            },
            {
              id: "tetee", emoji: "🤱", label: "Tétée : baisse de lactation",
              pb: ["nutri_lok_ijn_tetee","nutri_lok_ijn_tetee_longue","nutri_lok_ijn_tetee_greve","nutri_lok_ijn_tetee_mode_garde"],
              sublabels: { "nutri_lok_ijn_tetee_longue": "Longue tétée", "nutri_lok_ijn_tetee_greve": "Grève des tétées", "nutri_lok_ijn_tetee_mode_garde": "Mode de garde" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_ijn_tetee_longue", text: "<div class=\"cc-sub-banner\">Longue tétée</div>\n- Les **tétées** SEMBLENT **être assez longues**\n- La **durée des tétées MOYENNE** est normalement autour de **20 min**\n  ⇒ On dirait que BB qui **cherche à avoir +**, mais qui **n'arrive pas à** avoir tout **ce dont il a besoin**" },
                { type: "normal", showIfPb: "nutri_lok_ijn_tetee_greve", text: "<div class=\"cc-sub-banner\">Grève des tétées</div>\n- Vous m'avez aussi parlé du **refus de certaines tétées**" },
                { type: "normal", showIfPb: ["nutri_lok_ijn_tetee","nutri_lok_ijn_tetee_longue","nutri_lok_ijn_tetee_greve","nutri_lok_ijn_tetee_mode_garde"], text: "- Il y a peut-être eu une **possible diminution** (peut-être car **vos seins sont moins stimulés ?**)" },
                { type: "normal", showIfPb: "nutri_lok_ijn_tetee_mode_garde", text: "- ...Ce sont des choses qui **peuvent arriver** lors d'un **changement de rythme**\n  notamment quand un **BB commence un mode de garde**\n  ⇒ car la **stimulation de vos seins** est **moins importante en journée**" },
                { type: "normal", showIfPb: ["nutri_lok_ijn_tetee","nutri_lok_ijn_tetee_longue","nutri_lok_ijn_tetee_greve","nutri_lok_ijn_tetee_mode_garde"], text: "  ⇒ Donc, ça **peut influencer** sur la **quantité de lait** que **boit** [prénom_enfant]\n\n- **Heureusement,** il y a des **solutions qui existent** pour :\n  - **re-booster la lactation**\n  - et donc de diminuer la part de jus végétaux/lait animal\n\n  et je vous en **reparlerai plus tard**" },
              ]
            },
            {
              id: "inv_ls", emoji: "🔄", label: "Inversion (Lait/Solide AVANT)",
              pb: "nutri_lok_ijn_inversion_lait_solide",
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_ijn_inversion_lait_solide", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Mettre lait AVANT les solides</div>\n- Aujourd'hui, la **diversification** est **prise AVANT le lait**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour le lait,**\n  ⇒ Pourtant, le **lait reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
                { type: "normal", showIfPb: "nutri_lok_ijn_inversion_lait_solide", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Mettre solide AVANT le lait</div>\n- Aujourd'hui, **le lait** est **pris AVANT la diversification**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour la diversification,**\n  ⇒ Pourtant, la **diversification reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
              ]
            },
            {
              id: "tetine", emoji: "🍭", label: "Tétine = cache-faim",
              pb: "nutri_lok_ijn_tetine_cache_faim",
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_ijn_tetine_cache_faim", text: "- [prénom_enfant] **demande souvent la tétine** dans la bouche\n- La TETINE **PEUT répondre à un reflexe de succion**\n- MAIS peut aussi faire **office d'illusion** puisqu'**elle \"dupe\" le cerveau :**\n  - [prénom_enfant] **\"tète et déglutit\"** avec la tétine\n  - donc le **cerveau pense que qqch rentre** dans son estomac\n  - **mais rien ne rentre**…\n  - et **au bout d'un moment :**\n    - l'**illusion se perd**\n    - et la **faim se fait VRAIMENT ressentir**\n  - **MEME SI vous remettez la tétine :**\n    - il n'**en veut pas**\n    - et il pleure\n    - Parce qu'il **veut autre chose**\n    ⇒ Tout simplement car il a faim\n\n  ⇒ Donc, pour moi, la tétine joue ICI le **rôle d'un \"cache-faim\"**" },
              ]
            },
            {
              id: "autre", emoji: "🍽️", label: "Autres (Féculent / Lait-Solide / Jus-Lait animal)",
              pb: ["nutri_lok_ijn_autre_feculents","nutri_lok_ijn_autre_lait_solide_important","nutri_lok_ijn_autre_jus_vegetal","nutri_lok_ijn_autre_lait_animal"],
              sublabels: { "nutri_lok_ijn_autre_feculents": "Féculents", "nutri_lok_ijn_autre_lait_solide_important": "Lait/solide imp.", "nutri_lok_ijn_autre_jus_vegetal": "Jus végétal", "nutri_lok_ijn_autre_lait_animal": "Lait animal" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_ijn_autre_feculents", text: "<div class=\"cc-sub-banner\">Féculent 🥔</div>\n- La **part des féculents** dans son alimentation **est assez faible**\n- Et pourtant, les **féculents participent** activement à :\n  - **l'apport énergétique**\n  - et... à la **satiété**" },
                { type: "normal", showIfPb: "nutri_lok_ijn_autre_lait_solide_important", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Solide trop important</div>\n- La **place de la diversification** dans son alimentation **prend une part importante**\n- Or à son âge, le **lait** devrait être la **source principale d'apport nutritionnel**\n  ⇒ Et parce que la **diversification** ne lui **apporte pas** tous **ces apports,**\n  ⇒ il est possible que [prénom_enfant] **aille chercher** ce qu'il lui **manque la nuit** avec du **lait.**" },
                { type: "normal", showIfPb: "nutri_lok_ijn_autre_lait_solide_important", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Lait trop important</div>\n- La **place du lait** dans **son alimentation** prend une **part importante** dans **son alimentation**\n- Or **à son âge**, la **diversification** devrait être la **source principale d'apport nutritionnel.**\n  ⇒ Je me demande s'il ne **compenserai pas DANS la nuit** son **manque d'apport de jour**\n  ⇒ Comme c'est **+ pratique de donner du lait la nuit,** (que des solides)\n  ⇒ Ca **jouerai aussi** dans une **inversion lait/diversification**" },
                { type: "normal", showIfPb: "nutri_lok_ijn_autre_jus_vegetal", text: "<div class=\"cc-sub-banner\">Jus végétal 🧃</div>\n- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">jus végétal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir**" },
                { type: "normal", showIfPb: "nutri_lok_ijn_autre_lait_animal", text: "<div class=\"cc-sub-banner\">Lait animal 🐄</div>\n- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">lait animal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir**" },
              ]
            },
          ]
        },
        { type: "normal", _parentLevel: true, text: "- Voilà,\n- AVEC tous ces **petits indices,**\n- On commence à voir un **schéma qui se dessine** au **niveau de sa nutrition**\n- Et **CE QUI est intéressant**, c'est que ça correspond à CE QUE **vous observez** :\n  - dans son comportement\n  - et dans son sommeil" },
        {
          type: "conclusion_nutrition",
          _parentLevel: true,
          blocks: [
            { type: "normal", text: "- Pour moi, **l'explication la + probable,**\n- <span style=\"color:#dc2626\">⇒ c'est que [prénom_enfant] a **encore faim** pendant la nuit car il n'a **pas suffisamment mangé en JOURNÉE**.</span>\n- Son **corps a appris** que :\n  - la **nuit était faite pour manger**\n  - et que la **journée n'était que secondaire** pour ses apports\n\n- Les **nombreux réveils nocturnes** ne sont donc **pas forcément** dûs un **« problème de sommeil ».**\n  ⇒ Ils sont la **conséquence logique d'apports caloriques majoritairement nocturnes**." },
            { type: "normal", showIfPb: "nutri_lok_ijn_conseq_inconfort", text: "- 🤮 ET potentiellement ça va **réduire son inconfort digestif**" },
            { type: "normal", showIfPb: "nutri_lok_ijn_tetee_greve", text: "- 🪧 Et la \"grève des tétées\" pourrait **être une réponse** au fait que **l'effort pour obtenir le lait** est devenu **trop important.**\n- Dans **certains cas**, les BB se **mettent en mode \"veille\"**\n  ⇒ ils **\"pèsent le pour et le contre\"** :\n  - entre **l'effort pour téter**\n  - et la **quantité de lait reçue**\n- et parfois, la **balance penche du côté de l'effort**… alors ils **préfèrent refuser la tétée.**" },
            { type: "question", text: "Est-ce que **ça fait sens pour vous** quand je vous **l'explique comme ça** ?" },
            { type: "normal", text: "- 🎯 L'**objectif** va donc être de **rééquilibrer** progressivement **ses apports**\n  en **ré-inversant ses moments de nutrition** **vers la journée**, pour :\n  - mieux couvrir ses besoins\n  - installer un rythme plus adapté à son âge\n  - diminuer les troubles du sommeil" },
            { type: "normal", text: "- Et **avec ces ajustements**, **vous allez voir** que ça va **solutionner une partie** de ses **troubles du sommeil**" },
          ]
        },
      ]
    },

    // ─── NUTRITION : LAIT (COURBES OK) — LAIT N°1 ─────────
    {
      id: "nutri_lok_lait_n1",
      problematiqueId: "nutri_lok_lait_n1",
      leverId: "nutri_lok_lait_n1",
      title: "Lait (courbes OK) — Lait N°1",
      emoji: "🍼",
      blocks: [
        { type: "normal", text: "- Nous observons que la **majorité des apports** alimentaires **se fait la nuit**\n  - En **journée,** [prénom_enfant] **se nourrit** relativement **peu** `==> Crèche ?`\n  - Et le **soir**, il semble **chercher à « rattraper »** ses besoins\n- Or, la **nuit** n'est **PAS un moment optimal** pour **se nourrir** :\n  - le **corps** est **programmé pour dormir**\n  - les **prises alimentaires** peuvent être **- efficaces**\n- Un **enfant de cet âge** devrait tendre `majoritairement/totalement` vers une **alimentation 100% diurne**" },
        { type: "normal", text: "- Donc, si on **prend un peu de recul** sur tout ça…\n  on peut voir qu'il y a **AUSSI :**\n  - **d'AUTRES plusieurs petites choses**\n  - AUTOUR de son **alimentation**\n  - qui peuvent **jouer un rôle** sur son **sommeil**<br><br>\n- Je pense notamment…" },
        { type: "normal", _noBorder: true, text: "<div style=\"height:40px;background:#fff7ed;border-radius:12px;margin:0 -8px\"></div>" },
        {
          type: "courbe_cards_grid",
          items: [
            {
              id: "esp", emoji: "🔛", label: "Espacement bib et sein",
              pb: ["nutri_lok_n1_esp_long","nutri_lok_n1_esp_court"],
              sublabels: { "nutri_lok_n1_esp_long": "Trop long", "nutri_lok_n1_esp_court": "Trop court" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_n1_esp_long", text: "<div class=\"cc-sub-banner\">Espacement LONG</div>\n- 🔥 L'**intervalle entre 2 prises** alimentaires peut être parfois assez long (<strong style=\"color:#dc2626\">XX</strong> heures)\n\n- A cet âge, les enfants ont **besoin de prises + rapprochés** pour s'**adapter** à leur **signaux de faim.**\n- **On devrait** normalement **leur donner** : \"***à la demande***\"\n- Avec des **espacements longs, [prénom_enfant]** a du **mal à \"TENIR\" jusqu'à la prochaine prise alimentaire**\n  ⇒ On **peut imaginer** qu'[il_elle] est **comme \"affamé\"** entre 2 prises alimentaires" },
                { type: "normal", showIfPb: "nutri_lok_n1_esp_court", text: "<div class=\"cc-sub-banner\">Espacement COURT</div>\n- 🔥 L'**espacement entre 2 prises** alimentaires est **parfois très rapprochés** (<strong style=\"color:#dc2626\">XX</strong> heures)\n  ⇒ **Son estomac** est **constamment sollicité**\n  ⇒ Ce qui peut provoquer un **certain inconfort digestif**" },
              ]
            },
            {
              id: "vol", emoji: "🍼", label: "Taille / durée des bib",
              pb: ["nutri_lok_n1_vol_petit","nutri_lok_n1_vol_gros","nutri_lok_n1_vol_longtemps"],
              sublabels: { "nutri_lok_n1_vol_petit": "Petit bib", "nutri_lok_n1_vol_gros": "Gros bib", "nutri_lok_n1_vol_longtemps": "Bu longtemps" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_n1_vol_petit", text: "<div class=\"cc-sub-banner\">Petit bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez petit** pour :\n  - **son âge**\n  - **et ses besoins**\n  ⇒ Ca se **rapproche +** de la **taille des biberons d'un nourrisson**\n  ⇒ **SI** les **biberons sont petits** : la **sensation d'être RASSASIE** se **dissipe** assez **vite**" },
                { type: "normal", showIfPb: "nutri_lok_n1_vol_gros", text: "<div class=\"cc-sub-banner\">Gros bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez conséquent** par **rapport au volume de son estomac** (**souvent** on **suit ce qui est inscrit** sur les **boites de lait**)\n  ⇒ C'est **comme s'il était \"gavé\"**\n  ⇒ et **son estomac** doit **gérer une quantité importante** à chaque biberon\n  ⇒ ce qui peut **parfois entraîner une digestion + difficile...**\n<div style=\"background:#f5f0ff;border:3px dashed #a78bfa;border-radius:16px;padding:6px 20px 6px 0;box-shadow:0 2px 8px rgba(167,139,250,0.18);margin:8px 0\"><ul style=\"margin:0;padding-left:21px\"><li>🔥 <em>OPTION</em> — Reflux : ... qui peut <strong>favoriser le reflux</strong></li></ul></div>" },
                { type: "normal", showIfPb: "nutri_lok_n1_vol_longtemps", text: "<div class=\"cc-sub-banner\">Bu longtemps</div>\n- Les biberons sont **parfois bus pendant très longtemps** (souvent **pour terminer les quantités indiquées sur les boîtes de lait**)\n  ⇒ Ce qui peut **brouiller les signaux** naturels **de faim** et de **satiété**" },
              ]
            },
            {
              id: "tetee", emoji: "🤱", label: "Tétée : baisse de lactation",
              pb: ["nutri_lok_n1_tetee","nutri_lok_n1_tetee_longue","nutri_lok_n1_tetee_greve","nutri_lok_n1_tetee_mode_garde"],
              sublabels: { "nutri_lok_n1_tetee_longue": "Longue tétée", "nutri_lok_n1_tetee_greve": "Grève des tétées", "nutri_lok_n1_tetee_mode_garde": "Mode de garde" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_n1_tetee_longue", text: "<div class=\"cc-sub-banner\">Longue tétée</div>\n- Les **tétées** SEMBLENT **être assez longues**\n- La **durée des tétées MOYENNE** est normalement autour de **20 min**\n  ⇒ On dirait que BB qui **cherche à avoir +**, mais qui **n'arrive pas à** avoir tout **ce dont il a besoin**" },
                { type: "normal", showIfPb: "nutri_lok_n1_tetee_greve", text: "<div class=\"cc-sub-banner\">Grève des tétées</div>\n- Vous m'avez aussi parlé du **refus de certaines tétées**" },
                { type: "normal", showIfPb: ["nutri_lok_n1_tetee","nutri_lok_n1_tetee_longue","nutri_lok_n1_tetee_greve","nutri_lok_n1_tetee_mode_garde"], text: "- Il y a peut-être eu une **possible diminution** (peut-être car **vos seins sont moins stimulés ?**)" },
                { type: "normal", showIfPb: "nutri_lok_n1_tetee_mode_garde", text: "- ...Ce sont des choses qui **peuvent arriver** lors d'un **changement de rythme**\n  notamment quand un **BB commence un mode de garde**\n  ⇒ car la **stimulation de vos seins** est **moins importante en journée**" },
                { type: "normal", showIfPb: ["nutri_lok_n1_tetee","nutri_lok_n1_tetee_longue","nutri_lok_n1_tetee_greve","nutri_lok_n1_tetee_mode_garde"], text: "  ⇒ Donc, ça **peut influencer** sur la **quantité de lait** que **boit** [prénom_enfant]\n\n- **Heureusement,** il y a des **solutions qui existent** pour :\n  - **re-booster la lactation**\n  - et donc de diminuer la part de jus végétaux/lait animal\n\n  et je vous en **reparlerai plus tard**" },
              ]
            },
            {
              id: "inv", emoji: "🔄", label: "Inversion",
              pb: ["nutri_lok_n1_inversion_jour_nuit","nutri_lok_n1_inversion_lait_solide"],
              sublabels: { "nutri_lok_n1_inversion_jour_nuit": "Jour/Nuit", "nutri_lok_n1_inversion_lait_solide": "Ordre lait/solide" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_n1_inversion_jour_nuit", text: "<div class=\"cc-sub-banner\">Inversion Jour/Nuit 🌞🌛</div>\n- La **majorité des apports** se fait **la nuit** (peut être dû au mode de garde)\n  ⇒ Il semble y avoir une **inversion jour/nuit** au niveau de son alimentation\n  ⇒ il est possible qu'il **compense le manque d'apports en journée** en se **nourrissant la nuit**" },
                { type: "normal", showIfPb: "nutri_lok_n1_inversion_lait_solide", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Mettre lait AVANT les solides</div>\n- Aujourd'hui, la **diversification** est **prise AVANT le lait**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour le lait,**\n  ⇒ Pourtant, le **lait reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
                { type: "normal", showIfPb: "nutri_lok_n1_inversion_lait_solide", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Mettre solide AVANT le lait</div>\n- Aujourd'hui, **le lait** est **pris AVANT la diversification**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour la diversification,**\n  ⇒ Pourtant, la **diversification reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
              ]
            },
            {
              id: "tetine", emoji: "🍭", label: "Tétine = cache-faim",
              pb: "nutri_lok_n1_tetine_cache_faim",
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_n1_tetine_cache_faim", text: "- [prénom_enfant] **demande souvent la tétine** dans la bouche\n- La TETINE **PEUT répondre à un reflexe de succion**\n- MAIS peut aussi faire **office d'illusion** puisqu'**elle \"dupe\" le cerveau :**\n  - [prénom_enfant] **\"tète et déglutit\"** avec la tétine\n  - donc le **cerveau pense que qqch rentre** dans son estomac\n  - **mais rien ne rentre**…\n  - et **au bout d'un moment :**\n    - l'**illusion se perd**\n    - et la **faim se fait VRAIMENT ressentir**\n  - **MEME SI vous remettez la tétine :**\n    - il n'**en veut pas**\n    - et il pleure\n    - Parce qu'il **veut autre chose**\n    ⇒ Tout simplement car il a faim\n\n  ⇒ Donc, pour moi, la tétine joue ICI le **rôle d'un \"cache-faim\"**" },
              ]
            },
            {
              id: "autre", emoji: "🍽️", label: "Autres (Féculent / Jus-Lait animal)",
              pb: ["nutri_lok_n1_autre_feculents","nutri_lok_n1_autre_jus_vegetal","nutri_lok_n1_autre_lait_animal"],
              sublabels: { "nutri_lok_n1_autre_feculents": "TROP féculents", "nutri_lok_n1_autre_jus_vegetal": "Jus végétal", "nutri_lok_n1_autre_lait_animal": "Lait animal" },
              blocks: [
                { type: "normal", showIfPb: "nutri_lok_n1_autre_feculents", text: "<div class=\"cc-sub-banner\">TROP de féculents 🥔</div>\n- La **part des féculents** dans son alimentation **est assez <span style=\"color:#dc2626\">IMPORTANTE</span>**\n  ⇒ L'**alimentation** devrait être **diversifiée**, et les **féculents** ne DEVRAIENT **pas dépasser 50%** des apports" },
                { type: "normal", showIfPb: "nutri_lok_n1_autre_jus_vegetal", text: "<div class=\"cc-sub-banner\">Jus végétal 🧃</div>\n- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">jus végétal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir**" },
                { type: "normal", showIfPb: "nutri_lok_n1_autre_lait_animal", text: "<div class=\"cc-sub-banner\">Lait animal 🐄</div>\n- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">lait animal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir**" },
              ]
            },
          ]
        },
        { type: "normal", _parentLevel: true, text: "- Voilà,\n- AVEC tous ces **petits indices,**\n- On commence à voir un **schéma qui se dessine** au **niveau de sa nutrition**\n- Et **CE QUI est intéressant**, c'est que ça correspond à CE QUE **vous observez** :\n  - dans son comportement\n  - et dans son sommeil" },
        {
          type: "conclusion_nutrition",
          _parentLevel: true,
          blocks: [
            { type: "normal", text: "- Pour moi, **l'explication la + probable,**\n- <span style=\"color:#dc2626\">⇒ c'est que [prénom_enfant] a **encore faim** pendant la nuit car il n'a **pas suffisamment mangé en JOURNÉE**.</span>\n- Son **corps a appris** que :\n  - la **nuit était faite pour manger**\n  - et que la **journée n'était que secondaire** pour ses apports\n\n- Les **nombreux réveils nocturnes** ne sont donc **pas forcément** dûs un **« problème de sommeil ».**\n  ⇒ Ils sont la **conséquence logique d'apports caloriques majoritairement nocturnes**." },
            { type: "normal", showIfPb: "nutri_lok_n1_tetee_greve", text: "- 🪧 Et la \"grève des tétées\" pourrait **être une réponse** au fait que **l'effort pour obtenir le lait** est devenu **trop important.**\n- Dans **certains cas**, les BB se **mettent en mode \"veille\"**\n  ⇒ ils **\"pèsent le pour et le contre\"** :\n  - entre **l'effort pour téter**\n  - et la **quantité de lait reçue**\n- et parfois, la **balance penche du côté de l'effort**… alors ils **préfèrent refuser la tétée.**" },
            { type: "normal", showIfPb: "nutri_lok_n1_conseq_mange_nuit", text: "- 🌛 L'**objectif** serait **aussi** de **réduire les réveils nocturnes** car il **semble utiliser la nuit** pour **compléter ce qu'**il ne **prend pas** encore en **journée**" },
            { type: "question", text: "Est-ce que **ça fait sens pour vous** quand je vous **l'explique comme ça** ?" },
            { type: "normal", text: "- 🎯 L'**objectif** va donc être de **rééquilibrer** progressivement **ses apports**\n  en **ré-inversant ses moments de nutrition** **vers la journée**, pour :\n  - mieux couvrir ses besoins\n  - installer un rythme plus adapté à son âge\n  - diminuer les troubles du sommeil" },
            { type: "normal", text: "- Et **avec ces ajustements**, **vous allez voir** que ça va **solutionner une partie** de ses **troubles du sommeil**" },
          ]
        },
      ]
    },

    // ─── NUTRITION : DIVERSIFICATION N°1 ─────────
    {
      id: "nutri_div_n1",
      problematiqueId: "nutri_div_n1",
      leverId: "nutri_div_n1",
      title: "Diversification N°1",
      emoji: "🥑",
      blocks: [
        { type: "normal", text: "- Aujourd'hui, le **lait prend une place très importante** dans l'alimentation de [prénom_enfant]\n- L'**alimentation solide** est **mise de côté** au profit du lait\n  ⇒ Votre enfant a une **quantité de lait similaire** à un **enfant de - d'1 an**\n- *Info lait enfant + d'1 an : autour de 500 mL*\n\n- Pourtant, **après 1 an,** les **besoins évoluent** :\n  - Les **solides** deviennent progressivement la **source principale d'énergie**\n  - La **mastication favorise** une **satiété + durable**\n  - L'**équilibre alimentaire** se **répartit** davantage sur les **différents repas de la journée**\n- Le **lait reste important MAIS NE DOIT PLUS** être la **base majoritaire des apports**" },
        { type: "normal", showIfPb: "nutri_div_n1_bib_strat_dep", text: "- De plus, [prénom_enfant] a **besoin de lait** pour **s'endormir**\n- Ce qui **augmente ENCORE +** ces **quantités de lait journalière**" },
        { type: "normal", text: "- Donc, si on **prend un peu de recul** sur tout ça…\n  on peut voir qu'il y a **AUSSI :**\n  - **d'AUTRES plusieurs petites choses**\n  - AUTOUR de son **alimentation**\n  - qui peuvent **jouer un rôle** sur son **sommeil**<br><br>\n- Je pense notamment…" },
        { type: "normal", _noBorder: true, text: "<div style=\"height:40px;background:#fff7ed;border-radius:12px;margin:0 -8px\"></div>" },
        {
          type: "courbe_cards_grid",
          items: [
            {
              id: "esp", emoji: "🔛", label: "Espacement bib et sein",
              pb: ["nutri_div_n1_esp_long","nutri_div_n1_esp_court"],
              sublabels: { "nutri_div_n1_esp_long": "Trop long", "nutri_div_n1_esp_court": "Trop court" },
              blocks: [
                { type: "normal", showIfPb: "nutri_div_n1_esp_long", text: "<div class=\"cc-sub-banner\">Espacement LONG</div>\n- 🔥 L'**intervalle entre 2 prises** alimentaires peut être parfois **assez long** (<strong style=\"color:#dc2626\">XX</strong> heures)\n\n- A cet âge, les enfants ont **besoin de prises + rapprochés** pour s'**adapter** à leur **signaux de faim.**\n- **On devrait** normalement **leur donner** : \"***à la demande***\"\n- Avec des **espacements longs, [prénom_enfant]** va **se ruer sur le lait** au **détriment des solides**" },
                { type: "normal", showIfPb: "nutri_div_n1_esp_court", text: "<div class=\"cc-sub-banner\">Espacement COURT</div>\n- 🔥 L'**espacement entre 2 prises** alimentaires est **parfois très rapprochés** (<strong style=\"color:#dc2626\">XX</strong> heures)\n  ⇒ Son **estomac** est alors **rempli de lait,** prenant **la place de la diversification**" },
              ]
            },
            {
              id: "vol", emoji: "🍼", label: "Taille / durée des bib",
              pb: ["nutri_div_n1_vol_petit","nutri_div_n1_vol_gros","nutri_div_n1_vol_longtemps"],
              sublabels: { "nutri_div_n1_vol_petit": "Petit bib", "nutri_div_n1_vol_gros": "Gros bib", "nutri_div_n1_vol_longtemps": "Bu longtemps" },
              blocks: [
                { type: "normal", showIfPb: "nutri_div_n1_vol_petit", text: "<div class=\"cc-sub-banner\">Petit bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez petit** pour :\n  - **son âge**\n  - **et ses besoins**\n  ⇒ Ca se **rapproche +** de la **taille des biberons d'un nourrisson**\n  ⇒ **SI** les **biberons sont petits** : la **sensation d'être RASSASIE** se **dissipe** assez **vite**\n  ⇒ **il cherche** alors à en **demander un autre**\n    ⇒ Et le **lait prendra** la **place** de la **diversification**" },
                { type: "normal", showIfPb: "nutri_div_n1_vol_gros", text: "<div class=\"cc-sub-banner\">Gros bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez conséquent** par **rapport au volume de son estomac** (**souvent** on **suit ce qui est inscrit** sur les **boites de lait**)\n  ⇒ C'est **comme s'il était \"gavé\"**\n  ⇒ et la **place dans son estomac** est alors **prise par le lait**" },
                { type: "normal", showIfPb: "nutri_div_n1_vol_longtemps", text: "<div class=\"cc-sub-banner\">Bu longtemps</div>\n- Les biberons sont **parfois bus pendant très longtemps** (souvent **pour terminer les quantités indiquées sur les boîtes de lait**)\n  ⇒ Ce qui peut **brouiller les signaux** naturels **de faim** et de **satiété**" },
              ]
            },
            {
              id: "inv", emoji: "🔄", label: "Inversion",
              pb: ["nutri_div_n1_inversion_jour_nuit","nutri_div_n1_inversion_lait_solide"],
              sublabels: { "nutri_div_n1_inversion_jour_nuit": "Jour/Nuit", "nutri_div_n1_inversion_lait_solide": "Ordre lait/solide" },
              blocks: [
                { type: "normal", showIfPb: "nutri_div_n1_inversion_jour_nuit", text: "<div class=\"cc-sub-banner\">Inversion Jour/Nuit 🌞🌛</div>\n- La **majorité des apports** se fait **la nuit** (peut être dû au mode de garde)\n  ⇒ Il semble y avoir une **inversion jour/nuit** au niveau de son alimentation\n  ⇒ Or la **nuit**, le **corps** est **programmé** pour être en **\"mode repos\"**\n  ⇒ Mais si [prénom_enfant] **mange majoritairement la nuit,** il est possible qu'il **compense le manque d'apports en journée** en se **nourrissant la nuit**\n  ⇒ Comme c'est **+ pratique de donner du lait la nuit**, (que des solides)\n  ⇒ ça va **jouer dans cette inversion** lait/diversification" },
                { type: "normal", showIfPb: "nutri_div_n1_inversion_lait_solide", text: "<div class=\"cc-sub-banner\">Mettre solide AVANT le lait</div>\n- Aujourd'hui, **le lait** est **pris AVANT la diversification**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour la diversification,**\n  ⇒ Pourtant, la **diversification reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
              ]
            },
            {
              id: "tetine", emoji: "🍭", label: "Tétine = cache-faim",
              pb: "nutri_div_n1_tetine_cache_faim",
              blocks: [
                { type: "normal", showIfPb: "nutri_div_n1_tetine_cache_faim", text: "- [prénom_enfant] **demande souvent la tétine** dans la bouche\n- La TETINE **PEUT répondre à un reflexe de succion**\n- MAIS peut aussi faire **office d'illusion** puisqu'**elle \"dupe\" le cerveau :**\n  - [prénom_enfant] **\"tète et déglutit\"** avec la tétine\n  - donc le **cerveau pense que qqch rentre** dans son estomac\n  - **mais rien ne rentre**…\n  - et **au bout d'un moment :**\n    - l'**illusion se perd**\n    - et la **faim se fait VRAIMENT ressentir**\n  - **MEME SI vous remettez la tétine :**\n    - il n'**en veut pas**\n    - et il pleure\n    - Parce qu'il **veut autre chose**\n    ⇒ Tout simplement car il a faim\n\n  ⇒ Donc, pour moi, la tétine joue ICI le **rôle d'un \"cache-faim\"**" },
              ]
            },
            {
              id: "autre", emoji: "🍽️", label: "Autres (Féculent / Jus-Lait animal)",
              pb: ["nutri_div_n1_autre_feculents","nutri_div_n1_autre_jus_vegetal","nutri_div_n1_autre_lait_animal"],
              sublabels: { "nutri_div_n1_autre_feculents": "Féculents", "nutri_div_n1_autre_jus_vegetal": "Jus végétal", "nutri_div_n1_autre_lait_animal": "Lait animal" },
              blocks: [
                { type: "normal", showIfPb: "nutri_div_n1_autre_feculents", text: "<div class=\"cc-sub-banner\">Féculent 🥔</div>\n- La **part des féculents** dans son alimentation **est assez faible**\n- Et ne le remplit et ne le rassasie pas\n  ⇒ Il compense donc avec le lait" },
                { type: "normal", showIfPb: "nutri_div_n1_autre_jus_vegetal", text: "<div class=\"cc-sub-banner\">Jus végétal 🧃</div>\n- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">jus végétal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir** …..et **être rassasié**" },
                { type: "normal", showIfPb: "nutri_div_n1_autre_lait_animal", text: "<div class=\"cc-sub-banner\">Lait animal 🐄</div>\n- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">lait animal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir** …..et **être rassasié**" },
              ]
            },
          ]
        },
        { type: "normal", _parentLevel: true, text: "- Voilà,\n- AVEC tous ces **petits indices,**\n- On commence à voir un **schéma qui se dessine** au **niveau de sa nutrition**\n- Et **CE QUI est intéressant**, c'est que ça correspond à CE QUE **vous observez** :\n  - dans son comportement\n  - et dans son sommeil" },
        {
          type: "conclusion_nutrition",
          _parentLevel: true,
          blocks: [
            { type: "normal", text: "- Pour moi, **l'explication la + probable,**\n- <span style=\"color:#dc2626\">⇒ c'est que [prénom_enfant] a **encore faim**</span>\n- ce qui crée un **cercle vicieux** :\n  - Il **mange peu de solides en journée**\n  - **Boit bcp de lait** pour **compenser**\n  - **le lait prend la place** des solides **dans l'estomac** (qui devraient être la source n°1 d'apports nutritionnels)\n  - il **mange peu de solides** …\n\n⇒ Résultat : Ses **besoins** ne sont **pas complètement couverts**, ce qui peut se **traduire** par un **sommeil fragmenté**\n\n⇒ 🎯 L'idée serait donc :\n- d'**augmenter progressivement** ses **apports SOLIDES**\n- tout en **ré-équilibrant la place du lait** dans l'alimentation" },
            { type: "normal", showIfPb: "nutri_div_n1_bib_strat_dep", text: "- 🪑 **OPTION Dépendance** : ET que [prénom_enfant] **découvre de nouvelle stratégie** pour s'endormir **SANS la dépendance au lait**" },
            { type: "normal", showIfPb: "nutri_div_n1_conseq_mange_nuit", text: "- 🌛 L'**objectif** serait **aussi** de **réduire les réveils nocturnes** car il **semble utiliser la nuit** pour **compléter ce qu'**il ne **prend pas** encore en **journée**" },
            { type: "question", text: "Est-ce que **ça fait sens pour vous** quand je vous **l'explique comme ça** ?" },
            { type: "normal", text: "- Nous allons donc :\n  - **Rétablir un rythme +** structuré\n  - **Revoir** les **apports de lait** adaptés à son âge\n  - **Retrouver** progressivement une **répartition + adaptée** entre lait et alimentation solide" },
            { type: "normal", showIfPb: "nutri_div_n1_conseq_mange_nuit", text: "- 🌛 **OPTION : Suppression alim la nuit** — Et **progressivement,** l'**objectif** sera de **supprimer cette compensation nocturne**,\n  <u>**UNE FOIS**</u> que <u>**TOUS**</u> les apports de la journée seront **bien sécurisées**" },
            { type: "normal", text: "- Et **avec ces ajustements**, **vous allez voir** que ça va **solutionner une partie** de ses **troubles du sommeil**" },
          ]
        },
      ]
    },

    // ─── NUTRITION : PAS ASSEZ DE FÉCULENTS ─────────
    {
      id: "nutri_div_feculents",
      problematiqueId: "nutri_div_feculents",
      leverId: "nutri_div_feculents",
      title: "Pas assez de féculents",
      emoji: "🥔",
      blocks: [
        { type: "normal", text: "- Aujourd'hui l'**alimentation** de [prénom_enfant] se **compose** essentiellement de **légumes et fruits.**\n- Or à cet âge, un enfant **a besoin,** dans son alimentation, **beaucoup + de féculents** pour pouvoir **grossir et donc grandir.**" },
        { type: "normal", text: "- Donc, si on **prend un peu de recul** sur tout ça…\n  on peut voir qu'il y a **AUSSI :**\n  - **d'AUTRES plusieurs petites choses**\n  - AUTOUR de son **alimentation**\n  - qui peuvent **jouer un rôle** sur son **sommeil**<br><br>\n- Je pense notamment…" },
        { type: "normal", _noBorder: true, text: "<div style=\"height:40px;background:#fff7ed;border-radius:12px;margin:0 -8px\"></div>" },
        {
          type: "courbe_cards_grid",
          items: [
            {
              id: "esp", emoji: "🔛", label: "Espacement bib et sein",
              pb: ["nutri_div_fec_esp_long","nutri_div_fec_esp_court"],
              sublabels: { "nutri_div_fec_esp_long": "Trop long", "nutri_div_fec_esp_court": "Trop court" },
              blocks: [
                { type: "normal", showIfPb: "nutri_div_fec_esp_long", text: "<div class=\"cc-sub-banner\">Espacement LONG</div>\n- 🔥 L'**intervalle entre 2 prises** alimentaires peut être parfois assez long (<strong style=\"color:#dc2626\">XX</strong> heures)\n\n- A cet âge, les enfants ont **besoin de prises + rapprochés** pour s'**adapter** à leur **signaux de faim.**\n- **On devrait** normalement **leur donner** : \"***à la demande***\"\n- Avec des **espacements longs, [prénom_enfant]** va **se ruer sur le lait** et se **remplira l'estomac de lait** au détriment des solides" },
                { type: "normal", showIfPb: "nutri_div_fec_esp_court", text: "<div class=\"cc-sub-banner\">Espacement COURT</div>\n- 🔥 L'**espacement entre 2 prises** alimentaires est **parfois très rapprochés** (<strong style=\"color:#dc2626\">XX</strong> heures)\n  ⇒ [prénom_enfant] n'a **PAS TOUJOURS le temps** d'**avoir** vraiment **faim**\n  ⇒ ce qui peut **limiter le volume des solides**" },
              ]
            },
            {
              id: "vol", emoji: "🍼", label: "Taille / durée des bib",
              pb: ["nutri_div_fec_vol_petit","nutri_div_fec_vol_gros","nutri_div_fec_vol_longtemps"],
              sublabels: { "nutri_div_fec_vol_petit": "Petit bib", "nutri_div_fec_vol_gros": "Gros bib", "nutri_div_fec_vol_longtemps": "Bu longtemps" },
              blocks: [
                { type: "normal", showIfPb: "nutri_div_fec_vol_petit", text: "<div class=\"cc-sub-banner\">Petit bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez petit** pour :\n  - **son âge**\n  - **et ses besoins**\n  ⇒ Ca se **rapproche +** de la **taille des biberons d'un nourrisson**\n  ⇒ **SI** les **biberons sont petits** : la **sensation d'être RASSASIE** se **dissipe** assez **vite**\n  ⇒ **il cherche** alors à en **demander 1 autre**\n    ⇒ **Le lait prendra** alors la **place** de la **diversification**" },
                { type: "normal", showIfPb: "nutri_div_fec_vol_gros", text: "<div class=\"cc-sub-banner\">Gros bib</div>\n- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez conséquent** par **rapport au volume de son estomac** (**souvent** on **suit ce qui est inscrit** sur les **boites de lait**)\n  ⇒ C'est **comme s'il était \"gavé\"**\n  ⇒ et **son estomac** doit **gérer une quantité importante** à chaque biberon\n  ⇒ ce qui peut **parfois entraîner une digestion + difficile...**\n<div style=\"background:#f5f0ff;border:3px dashed #a78bfa;border-radius:16px;padding:6px 20px 6px 0;box-shadow:0 2px 8px rgba(167,139,250,0.18);margin:8px 0\"><ul style=\"margin:0;padding-left:21px\"><li>🔥 <em>OPTION</em> — Reflux : ... qui peut <strong>favoriser le reflux</strong></li></ul></div>" },
                { type: "normal", showIfPb: "nutri_div_fec_vol_longtemps", text: "<div class=\"cc-sub-banner\">Bu longtemps</div>\n- Les biberons sont **parfois bus pendant très longtemps** (souvent **pour terminer les quantités indiquées sur les boîtes de lait**)\n  ⇒ Ce qui peut **brouiller les signaux** naturels **de faim** et de **satiété**" },
              ]
            },
            {
              id: "inv", emoji: "🔄", label: "Inversion",
              pb: ["nutri_div_fec_inversion_jour_nuit","nutri_div_fec_inversion_lait_solide"],
              sublabels: { "nutri_div_fec_inversion_jour_nuit": "Jour/Nuit", "nutri_div_fec_inversion_lait_solide": "Ordre lait/solide" },
              blocks: [
                { type: "normal", showIfPb: "nutri_div_fec_inversion_jour_nuit", text: "<div class=\"cc-sub-banner\">Inversion Jour/Nuit 🌞🌛</div>\n- La **majorité des apports** se fait **la nuit** (`peut être dû au mode de garde`)\n  ⇒ Il semble y avoir une **inversion jour/nuit** au niveau de son alimentation\n  ⇒ Il est **possible** qu'il **compense le manque d'apport en journée**" },
                { type: "normal", showIfPb: "nutri_div_fec_inversion_lait_solide", showIfAgeMaxMonths: 11, text: "<div class=\"cc-sub-banner\">Mettre lait AVANT les solides</div>\n- Aujourd'hui, la **diversification** est **prise AVANT le lait**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour le lait,**\n  ⇒ Pourtant, le **lait reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
                { type: "normal", showIfPb: "nutri_div_fec_inversion_lait_solide", showIfAgeMinMonths: 12, text: "<div class=\"cc-sub-banner\">Mettre solide AVANT le lait</div>\n- Aujourd'hui, **le lait** est **pris AVANT la diversification**\n  ⇒ Le **problème** c'est que **ça occupe de la place dans l'estomac,**\n  ⇒ et ça **donne moins de place** **pour la diversification,**\n  ⇒ Pourtant, la **diversification reste l'apport n°1 pour :**\n  - les nutriments\n  - et la sensation de satiété" },
              ]
            },
            {
              id: "tetine", emoji: "🍭", label: "Tétine = cache-faim",
              pb: "nutri_div_fec_tetine_cache_faim",
              blocks: [
                { type: "normal", showIfPb: "nutri_div_fec_tetine_cache_faim", text: "- [prénom_enfant] **demande souvent la tétine** dans la bouche\n- La TETINE **PEUT répondre à un reflexe de succion**\n- MAIS peut aussi faire **office d'illusion** puisqu'**elle \"dupe\" le cerveau :**\n  - [prénom_enfant] **\"tète et déglutit\"** avec la tétine\n  - donc le **cerveau pense que qqch rentre** dans son estomac\n  - **mais rien ne rentre**…\n  - et **au bout d'un moment :**\n    - l'**illusion se perd**\n    - et la **faim se fait VRAIMENT ressentir**\n  - **MEME SI vous remettez la tétine :**\n    - il n'**en veut pas**\n    - et il pleure\n    - Parce qu'il **veut autre chose**\n    ⇒ Tout simplement car il a faim\n\n  ⇒ Donc, pour moi, la tétine joue ICI le **rôle d'un \"cache-faim\"**" },
              ]
            },
            {
              id: "autre", emoji: "🍽️", label: "Autres (Jus-Lait animal)",
              pb: ["nutri_div_fec_autre_jus_vegetal","nutri_div_fec_autre_lait_animal"],
              sublabels: { "nutri_div_fec_autre_jus_vegetal": "Jus végétal", "nutri_div_fec_autre_lait_animal": "Lait animal" },
              blocks: [
                { type: "normal", showIfPb: "nutri_div_fec_autre_jus_vegetal", text: "<div class=\"cc-sub-banner\">Jus végétal 🧃</div>\n- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">jus végétal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir** …..et **être rassasié**" },
                { type: "normal", showIfPb: "nutri_div_fec_autre_lait_animal", text: "<div class=\"cc-sub-banner\">Lait animal 🐄</div>\n- [prénom_enfant] boit une **grande quantité** de biberons de <strong style=\"color:#c52f26\">lait animal</strong>\n- Or ils **n'apportent PAS les mêmes besoins nutritionnels** que le **lait maternel ou infantile**\n  ⇒ L'**estomac** est alors **rempli MAIS PAS** forcément **avec les bons apports** pour **grandir** …..et **être rassasié**" },
              ]
            },
          ]
        },
        { type: "normal", _parentLevel: true, text: "- Voilà,\n- AVEC tous ces **petits indices,**\n- On commence à voir un **schéma qui se dessine** au **niveau de sa nutrition**\n- Et **CE QUI est intéressant**, c'est que ça correspond à CE QUE **vous observez** :\n  - dans son comportement\n  - et dans son sommeil" },
        {
          type: "conclusion_nutrition",
          _parentLevel: true,
          blocks: [
            { type: "normal", text: "- Pour moi, **l'explication la + probable,**\n- <span style=\"color:#dc2626\">⇒ c'est que [prénom_enfant] a **encore faim**</span>\n- Une **faible part de féculents**, entraine alors une **satiété limitée,** ce qui **contribue à un sommeil fragmenté**\n- L'**objectif** serait donc d'**augmenter l'apport de féculents** dans ses repas" },
            { type: "normal", showIfPb: "nutri_div_fec_conseq_mange_nuit", text: "- 🌛 L'**objectif** serait **aussi** de **réduire les réveils nocturnes** car il **semble utiliser la nuit** pour **compléter ce qu'**il ne **prend pas** encore en **journée**" },
            { type: "question", text: "Est-ce que **ça fait sens pour vous** quand je vous **l'explique comme ça** ?" },
            { type: "normal", text: "- Nous allons donc :\n  - Rétablir un **rythme + structuré**\n  - **Revoir** les **apports de lait adaptés** à son âge\n  - **Retrouver** progressivement une **répartition + adaptée entre lait et alimentation solide**" },
            { type: "normal", showIfPb: "nutri_div_fec_conseq_mange_nuit", text: "- 🌛 **OPTION : Suppression alim la nuit** — Et **progressivement,** l'**objectif** sera de **supprimer cette compensation nocturne**,\n  <u>**UNE FOIS**</u> que <u>**TOUS**</u> les apports de la journée seront **bien sécurisées**" },
            { type: "normal", text: "- Et **avec ces ajustements**, **vous allez voir** que ça va **solutionner une partie** de ses **troubles du sommeil**" },
          ]
        },
      ]
    },

    // ─── ORGANISATION DE LA JOURNÉE ──────────────────────
    {
      id: "rythme_general",
      problematiqueId: "rythme_general",
      title: "Organisation de la journée",
      emoji: "⏰",
      blocks: [
        {
          type: "courbe_cards_grid",
          theme: "green",
          items: [
            {
              id: "rythme_te", emoji: "⏱⏳", label: "Temps d'éveil / Siestes",
              pb: ["rythme_te_trop_long","rythme_te_trop_court","rythme_siestes_courtes","rythme_te_long_siestes_courtes","rythme_te_long_reveils_matinaux","rythme_te_court_siestes_courtes"],
              sublabels: { "rythme_te_trop_long": "Trop long", "rythme_te_trop_court": "Trop court", "rythme_siestes_courtes": "Siestes courtes" },
              blocks: [
                { type: "normal", showIfPb: "rythme_te_trop_long", text: "<div class=\"cc-sub-banner\">Trop long</div>\n- Ce que j'observe, c'est que parfois, les **temps d'éveil de [prénom_enfant]** sont un **peu longs**.\n- Et ça, c'est **qqch de très fréquent**\n  ⇒ ce n'est PAS **toujours évident** de **trouver le bon rythme.**\n\n- Mais quand un **temps d'éveil** est **trop long** :\n  - le **cerveau** passe en **sur-stimulation**\n  - c'est-à-dire qu'il n'arrivera **pas à traiter toutes les informations** après la **fin de son tps d'éveil**\n\n- *💭 C'est comme si vous étiez dans une **boîte de nuit à 3h du matin** : il y a du bruit, des lumières, du monde…*\n\n- Du coup :\n  - le **corps va réagir**\n  - et **sécréter du cortisol** (hormone de l'éveil)\n  - pour **« rester éveillé »**\n  - *(💭 un peu **comme nous avec le café !**)*\n\n- **MAIS tant** que ce **taux de cortisol restera élevé** :\n  - ça sera **difficile de s'endormir**\n  - et **difficile de RESTER endormi**\n  ⇒ On **rentre alors** dans un **cercle vicieux** :\n{{cercle_vicieux:Temps d'éveil long|Fatigue|Sécrétion de cortisol|Difficulté à l'endormissement}}\n- Grosso modo, MÊME SI ÇA peut **paraître un peu paradoxal** :\n  - **PLUS** les **temps d'éveil sont longs**\n  - **PLUS** **[prénom_enfant]** est **[fatigue_fatiguee]**,\n  - **PLUS** son **corps VA [le_la] AIDER** à **rester [eveille_eveillee]**" },
                { type: "normal", showIfPb: "rythme_te_long_siestes_courtes", text: "  - ⇒ d'où la **problématique** des **siestes courtes**" },
                { type: "normal", showIfPb: "rythme_te_long_reveils_matinaux", text: "  - ⇒ d'où la **problématique** des **réveils matinaux**" },
                { type: "normal", showIfPb: "rythme_te_trop_long", text: "<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:4px 10px;align-items:start\"><span>❓</span><span>•</span><span>L'<strong>idée serait donc</strong> de <strong>RACCOURCIR un peu</strong> les <strong>temps d'éveil</strong> pour <strong>retrouver un rythme</strong> qui soit <strong>+ en lien</strong> avec :</span><span></span><span></span><span style=\"padding-left:20px\">• ses <strong>besoins</strong></span><span></span><span></span><span style=\"padding-left:20px\">• et <strong>son âge</strong></span><span></span><span>•</span><span>Et les <strong>choses</strong> vont se <strong>mettre NATURELLEMENT EN PLACE</strong> au niveau de <strong>SON sommeil</strong></span><span></span><span>•</span><span>⇒ Est-ce que <strong>ça vous parle</strong> jusque là ?</span></div></div>" },
                { type: "normal", showIfPb: "rythme_te_trop_court", text: "<div class=\"cc-sub-banner\">Trop court</div>\n- Ce que **je vois parfois**, c'est que les **temps d'éveil** de **[prénom_enfant]** peuvent être un **peu courts**.\n- C'est **très fréquent**, surtout quand ON VEUT **bien faire** et **respecter son rythme.**\n\n- Quand un **temps d'éveil** est **trop court** :\n  - le **corps** n'a **PAS** eu le temps d'**accumuler assez de fatigue**,\n  - c'est-à-dire que :\n    - quand **[prénom_enfant]** **sera [pose_posee] dans son lit**\n    - [il_elle] ne sera **PAS ASSEZ [fatigue_fatiguee]** pour **dormir**\n  - Du coup :\n    - l'**endormissement** peut **devenir un moment « d'attente »**\n    - petit à petit, [il_elle] peut **associer** le **sommeil** à **qqch de négatif**" },
                { type: "normal", showIfPb: "rythme_te_trop_court", text: "<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:4px 10px;align-items:start\"><span>❓</span><span>•</span><span>L'<strong>idée serait d'AUGMENTER un peu</strong> les <strong>temps d'éveil</strong> pour <strong>retrouver un rythme</strong> qui soit <strong>+ en lien</strong> avec :</span><span></span><span></span><span style=\"padding-left:20px\">• ses <strong>besoins</strong></span><span></span><span></span><span style=\"padding-left:20px\">• et <strong>son âge</strong></span><span></span><span>•</span><span>Et les <strong>choses</strong> vont se <strong>mettre NATURELLEMENT EN PLACE</strong> au niveau de <strong>SON sommeil</strong></span><span></span><span>•</span><span>⇒ Est-ce que <strong>ça vous parle</strong> jusque là ?</span></div></div>" },
                { type: "normal", showIfPb: "rythme_te_court_siestes_courtes", text: "- **Dans la journée**, des « petits » temps d'éveil peuvent se **traduire de 2 façons** :\n\n  1. SOIT par **PLUSIEURS petites siestes**\n     ⇒ mais ça, c'est **plutôt le rythme d'un enfant + jeune**\n\n  2. SOIT par **des siestes très courtes**\n     ⇒ souvent **limitées à 1 seul cycle de sommeil**\n     ⇒ Et **SI** ces siestes ne sont **pas prolongées** :\n     - la **fatigue** continue de **s'accumuler**\n     - et le **corps réagit** en sécrétant du **cortisol**, l'hormone de l'éveil.\n     - Ça **[le_la] donne un petit boost** pour **« tenir le coup »**\n     - *(💭 un peu **comme nous avec le café !**)*\n\n     - **MAIS tant** que ce **taux de cortisol restera élevé** :\n       - ça sera **difficile de s'endormir**\n       - et **difficile de RESTER [endormi_endormie]**\n- On **retrouve** alors un **cercle vicieux** :\n{{cercle_vicieux:Courte sieste|Fatigue|Sécrétion de cortisol|Difficulté à rester [endormi_endormie]}}" },
                { type: "normal", showIfPb: "rythme_te_court_siestes_courtes", _purpleDark: true, text: "- 🔥 <u>OPTION : réveils matinaux :</u> Et ça peut aussi **expliquer** la **problématique des réveils matinaux**" },
                { type: "normal", showIfPb: "rythme_siestes_courtes", text: "<div class=\"cc-sub-banner\">Siestes courtes</div>\n- Aujourd'hui, **[prénom_enfant]** fait des **siestes assez courtes**,\nsouvent limitées à **1 seul cycle de sommeil**.\n- Or à cet âge-là, [il_elle] aurait plutôt besoin **d'enchainer plusieurs cycles de sommeil** pour **vraiment récupérer.**\n- et on voit qu'[il_elle] n'**ARRIVE PAS à enchainer plusieurs cycles**\n\n- Le problème c'est que **SI** **[prénom_enfant]** fait **des siestes très courtes**\n⇒ **ET** que ces siestes ne sont **pas prolongées** :\n  - la **fatigue** continue de **s'accumuler**\n  - et le **corps réagit** en sécrétant du **cortisol**, l'hormone de l'éveil.\n  - Ça **lui donne un petit boost** pour **« tenir le coup »**\n  - *(💭 un peu **comme nous avec le café !**)*\n\n- **MAIS tant** que ce **taux de cortisol restera élevé** :\n  - ça sera **difficile de s'endormir**\n  - et **difficile de RESTER [endormi_endormie]**\n- On **retrouve** alors un **cercle vicieux** :\n{{cercle_vicieux:Siestes courtes|Fatigue + rapide|Sécrétion de cortisol|Difficulté de sommeil}}<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:4px 10px;align-items:start\"><span>❓</span><span>•</span><span>L'<strong>idée serait</strong> de <strong>RALLONGER ses siestes</strong> pour <strong>ramener un quota</strong> de sommeil qui soit <strong>+ en lien avec</strong> :</span><span></span><span></span><span style=\"padding-left:20px\">• <strong>ses besoins</strong></span><span></span><span></span><span style=\"padding-left:20px\">• et <strong>son âge</strong></span><span></span><span>•</span><span>Et les <strong>choses</strong> vont se <strong>mettre NATURELLEMENT EN PLACE</strong> au niveau de <strong>SON sommeil</strong></span><span></span><span>•</span><span>⇒ Est-ce que <strong>ça vous parle</strong> jusque là ?</span></div></div>" },
              ]
            },
            {
              id: "rythme_horaires", emoji: "🎲", label: "Horaires aléatoires",
              pb: "rythme_horaires_aleatoires",
              blocks: [
                { type: "normal", showIfPb: "rythme_horaires_aleatoires", text: "- Ce que j'**ai entendu**,\nc'est que **le rythme** de **[prénom_enfant]** peut **BEAUCOUP varier** d'un **jour à l'autre**\nnotamment au **niveau des siestes**\n\n- Du coup, QUAND les **horaires changent beaucoup** :\n  - le **corps** a un peu + **de mal à anticiper**\n  - car il **ne SAIT pas** toujours **QUAND** il va **pouvoir dormir**\n  - et donc **QUAND il faut qu'il se prépare pour dormir**\n  ⇒ et donc, ça sera **+ difficile** pour **[prénom_enfant]** d'**aller dormir** parce que son corps **manque de** :\n    - **repères**\n    - et de **prévisibilité**\n\n- 💭 Un peu comme si vous vous **couchiez CERTAINS soirs à 20h** et des fois à **2h du matin !**\n\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:4px 10px;align-items:start\"><span>❓</span><span>•</span><span>Donc l'<strong>idée serait</strong> de <strong>retrouver</strong> un <strong>rythme + PRÉVISIBLE</strong> pour <strong>ramener</strong> un peu <strong>+ de régularité</strong> ?</span><span></span><span>•</span><span>Et les <strong>choses</strong> vont se <strong>mettre NATURELLEMENT EN PLACE</strong> au niveau de <strong>SON sommeil</strong></span><span></span><span>•</span><span>⇒ Est-ce que <strong>ça vous parle</strong> jusque là ?</span></div></div>" },
              ]
            },
            {
              id: "rythme_activite", emoji: "🏃", label: "Pas d'activité physique",
              pb: "rythme_activite_physique",
              blocks: [
                { type: "normal", showIfPb: "rythme_activite_physique", text: "- Ce que **je remarque** aussi, c'est que **[prénom_enfant]** a des **moments dans la journée** :\n  - où [il_elle] est **plutôt calme**\n  - où [il_elle] **bouge un peu moins.**\n- Et ça, **c'est normal**, il y a **toujours des moments comme ça** dans une journée\n\n- Cependant, à cet âge-là, les **enfants ont AUSSI besoin** de :\n  - **bouger**\n  - **explorer,**\n  - **tester leur corps**…\n  ⇒ **C'EST ÇA** qui **VA les aider à CRÉER** ce qu'on appelle la **pression de sommeil**,\n  ⇒ CELLE qui aide à **bien s'endormir le soir**\n\n- 💭 C'est un peu comme si, **un dimanche,** vous **restiez** toute la **journée** dans **votre lit.**\nVous ne **dormez pas forcément,** mais vous faites des **activités calmes** :\n    - *lire*\n    - *regarder votre téléphone*\n    - *regarder une série à la TV…*\n- *Au final, votre **corps** ne s'est **PAS vraiment dépensé** pdt la journée.*\n  *⇒ Et **le soir**, vous avez souvent + **de mal à vous endormir***\n  *parce que votre **corps n'a pas accumulé assez** de **fatigue physique**.*\n\n- Pour **[prénom_enfant]**, c'est un peu **la même chose** :\n  - [sil_sielle] a eu **PEU d'occasions de bouger,**\n  - [il_elle] **accumule MOINS de pression de sommeil**\n  - et l'**endormissement peut être + difficile**\n\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:4px 10px;align-items:start\"><span>❓</span><span>•</span><span>Donc l'<strong>objectif serait</strong> de <strong>lui proposer DAVANTAGE de moments</strong> pour <strong>bouger</strong> et <strong>explorer…</strong> ⇒ pour <strong>favoriser</strong> son <strong>endormissement.</strong></span><span></span><span>•</span><span>Et les <strong>choses</strong> vont se <strong>mettre NATURELLEMENT EN PLACE</strong> au niveau de <strong>SON sommeil</strong></span><span></span><span>•</span><span>⇒ Est-ce que <strong>ça vous parle</strong> jusque là ?</span></div></div>" },
              ]
            },
            {
              id: "rythme_reveil", emoji: "🌅", label: "Réveils matinaux",
              pb: ["rythme_reveil_decalage","rythme_reveil_fatigue","rythme_reveil_relationnel","rythme_reveil_mange","rythme_reveil_faim","rythme_reveil_dependance","rythme_reveil_bruit"],
              blocks: [
                { type: "normal", showIfPb: ["rythme_reveil_decalage","rythme_reveil_fatigue","rythme_reveil_relationnel","rythme_reveil_mange","rythme_reveil_faim","rythme_reveil_dependance","rythme_reveil_bruit"], text: "- Aujourd'hui, **[prénom_enfant]** se **réveille tôt le matin**,\n**AVANT l'HEURE à LAQUELLE** vous **aimeriez commencer la journée.**\n- C'est une **situation** qui peut **être frustrante**\nmais qui peut être **expliquée**" },
                {
                  type: "courbe_cards_grid",
                  theme: "green",
                  items: [
                    {
                      id: "rev_decalage", emoji: "✅", label: "Décalage horaire",
                      pb: "rythme_reveil_decalage",
                      blocks: [
                        { type: "normal", showIfPb: "rythme_reveil_decalage", text: "- 🔥 Aujourd'hui, **[prénom_enfant]** est **[couche_couchee] à** <strong style=\"color:#dc2626\">XX</strong> h et **se lève à** <strong style=\"color:#dc2626\">XX</strong> h\n  ⇒ C'est-à-dire qu'[il_elle] dort <strong style=\"color:#dc2626\">XX</strong> h par nuit\n- 🔥 Or, à son âge, un enfant **a besoin** d'environ **[besoin_nuit]**\n  ⇒ Donc **ce réveil** à <strong style=\"color:#dc2626\">XX</strong> h est **logique**\n  ⇒ [il_elle] a **DÉJÀ EU sa nuit** et **peut commencer sa journée.**\n\n- Autrement dit, **ce n'est PAS** qu'[il_elle] se **réveille « trop tôt »**,\n  ⇒ C'est simplement que **son rythme** est un peu **en avance par rapport à VOTRE journée**\n\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:4px 10px;align-items:start\"><span>❓</span><span>•</span><span>Si ce <strong>rythme ne vous CONVIENT PAS</strong> dans votre organisation on pourra regarder à <strong>progressivement décaler TOUTE sa journée</strong></span><span></span><span>•</span><span>⇒ Qu'est-ce qui serait le <strong>+ adéquat</strong> pour vous ?</span></div></div>" },
                      ]
                    },
                    {
                      id: "rev_fatigue", emoji: "😵", label: "Fatigue accumulée",
                      pb: "rythme_reveil_fatigue",
                      blocks: [
                        { type: "normal", showIfPb: "rythme_reveil_fatigue", text: "- Aujourd'hui, **[prénom_enfant]** a un **total de sommeil sur 24h** plutôt **bas pour son âge.**\n⇒ Du coup :\n  - la **fatigue** s'**accumule au fur et à mesure** de la **journée**\n  - et son **corps va réagir**\n  - en **sécrétant du cortisol** (hormone de l'éveil)\n  - *(💭 un peu comme nous avec le café !)* **pour « tenir [eveille_eveillee] »**\n\n- SAUF qu'**en fin de nuit,** **SI** ce **cortisol accumulé** EN JOURNÉE est **trop élevé**\n  ⇒ Il va **prendre le dessus** sur **la mélatonine** (hormone du sommeil)… QUI ELLE est en train de **diminuer**\n\n- *💭 Pour faire simple, le **sommeil** c'est **comme une balance**, avec d'un **côté le sommeil** et de **l'autre l'éveil**.*\n*Si le **cortisol** est **trop important**,*\n*ça va faire **pencher la balance du côté « éveil »**.*\n\n- Résultat :\n  - [il_elle] se **réveille + facilement le matin**\n  - et le **rendormissement** est **très difficile**\n\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:4px 10px;align-items:start\"><span>❓</span><span>•</span><span>L'<strong>idée serait de rétablir des quotas de sommeil</strong> pour <strong>retrouver un rythme + en lien</strong> avec :</span><span></span><span></span><span style=\"padding-left:20px\">• ses <strong>besoins</strong></span><span></span><span></span><span style=\"padding-left:20px\">• et <strong>son âge</strong></span><span></span><span>•</span><span>Et les <strong>choses</strong> vont se <strong>mettre NATURELLEMENT EN PLACE</strong> au niveau de <strong>SON sommeil</strong></span><span></span><span>•</span><span>⇒ Est-ce que <strong>ça vous parle</strong> jusque là ?</span></div></div>" },
                      ]
                    },
                    {
                      id: "rev_rel", emoji: "💬", label: "Enjeu relationnel",
                      pb: "rythme_reveil_relationnel",
                      blocks: [
                        { type: "normal", showIfPb: "rythme_reveil_relationnel", text: "- Aujourd'hui, **on sent** que **[prénom_enfant]** est **super [enthousiaste_enthousiaste] PAR CE QUI L'ATTEND** dans la journée :\n  - **jouer**\n  - de tester ce qu'[il_elle] a appris\n  - ou **simplement** de **VOUS retrouver**\n\n-  Le **cerveau des enfants fonctionne** beaucoup sur **l'anticipation** et **l'excitation**\n  ⇒ Du coup, **certains enfants** vont **réduire leur nuit** au **strict minimum**\n  ⇒ Et donc **se réveiller tôt matin** :\n  - **PAS** parce qu'ils n'ont **PLUS besoin de dormir**\n  - **MAIS** parce que leur **cerveau** est **déjà en mode** *« allez, on démarre, j'ai **trop envie de découvrir** ce qu'on va faire aujourd'hui ! »*\n\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:4px 10px;align-items:start\"><span>❓</span><span>•</span><span>CE QUE je vous propose, c'est qu'<strong>on discute ensemble</strong></span><span></span><span></span><span style=\"padding-left:20px\">• de COMMENT <strong>sortir doucement de ce petit « jeu relationnel »</strong> qui s'est installé</span><span></span><span></span><span style=\"padding-left:20px\">• en vous proposant des <strong>manières concrètes de réagir</strong></span><span></span><span></span><span style=\"padding-left:20px\">• pour que <strong>le sommeil</strong> puisse <strong>se passer beaucoup + sereinement…</strong> pour tout le monde</span><span></span><span>•</span><span>⇒ Est-ce que <strong>vous reconnaissez</strong> VOTRE <strong>situation…</strong> dans ce que je vous dis là ?</span></div></div>" },
                      ]
                    },
                    {
                      id: "rev_mange", emoji: "🍼", label: "Mange la nuit",
                      pb: "rythme_reveil_mange",
                      blocks: [
                        { type: "normal", showIfPb: "rythme_reveil_mange", text: "- Aujourd'hui, CE QUE **je comprends**, c'est que **[prénom_enfant]** **se réveille car [il_elle] a faim**\n- En **fin de nuit,** la **faim se fait de plus en plus sentir,**\n  **⇒ c'est NORMAL !**\n  ⇒ Et [il_elle] va **vous appeler et manger**\n\n- MAIS **une fois [eveille_eveillee] et [nourri_nourrie]** :\n  ⇒ son **système digestif se remet en route**\n  ⇒ son **éveil augmente**\n  ⇒ du coup, il devient **+ difficile de se rendormir** (car la **mélatonine** (hormone du S.) **commence** déjà **doucement à diminuer**)\n\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:4px 10px;align-items:start\"><span>❓</span><span>•</span><span>On va faire en sorte que ces <strong>réveils alimentaires passent + inaperçus</strong> pour :</span><span></span><span></span><span style=\"padding-left:20px\">• que la fin de nuit se passe <strong>+ calmement</strong></span><span></span><span></span><span style=\"padding-left:20px\">• et que <strong>[prénom_enfant]</strong> puisse se <strong>rendormir + facilement</strong></span><span></span><span>•</span><span>⇒ Est-ce que vous <strong>sentez que ça a du sens</strong> pour vous ?</span></div></div>" },
                      ]
                    },
                    {
                      id: "rev_faim", emoji: "🥺", label: "A faim",
                      pb: "rythme_reveil_faim",
                      blocks: [
                        { type: "normal", showIfPb: "rythme_reveil_faim", text: "- Aujourd'hui, CE QUE **je comprends**, c'est que **[prénom_enfant]** **se réveille car [il_elle] a faim**\n- En **fin de nuit,** la **faim se fait de plus en plus sentir,**\n  **⇒ c'est NORMAL** qu'[il_elle] **vous appelle** pour **manger**\n\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:4px 10px;align-items:start\"><span>❓</span><span>•</span><span>Ce qu'on va faire, c'est qu'on va :</span><span></span><span></span><span style=\"padding-left:20px\">• <strong>AUGMENTER ses apports alimentaires en journée</strong></span><span></span><span></span><span style=\"padding-left:20px\">• pour que les <strong>réveils matinaux disparaissent PROGRESSIVEMENT</strong></span><span></span><span>•</span><span>⇒ Est-ce que <strong>ça fait sens</strong> pour vous quand je vous <strong>l'explique comme ça</strong> ?</span></div></div>" },
                      ]
                    },
                    {
                      id: "rev_dep", emoji: "🪑", label: "Dépendance",
                      pb: "rythme_reveil_dependance",
                      blocks: [
                        { type: "normal", showIfPb: "rythme_reveil_dependance", text: "- Aujourd'hui **[prénom_enfant]** **dépend de vous pour s'endormir**\n- Du coup, **quand [il_elle] se réveille** pendant la nuit, [il_elle] va **chercher à retrouver ces MÊMES conditions d'endormissement**\n  ⇒ et donc [il_elle] va **vous appeler**\n\n- Or en **fin de nuit,** la **mélatonine**, l'hormone du sommeil, **commence à diminuer**\n  ⇒ Et cette **baisse** **rend** :\n  - le **sommeil + léger**\n  - et on est **+ facilement réveillable**\n\n- Du coup, **en vous appelant** :\n  - **son corps se met en route**\n  - **son cerveau sort** du **sommeil**\n  - et comme [il_elle] est DÉJÀ **dans une phase** où le **sommeil est + fragile**\n    ⇒ il devient **bcp + difficile de replonger** dans le sommeil\n\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:4px 10px;align-items:start\"><span>❓</span><span>•</span><span>L'<strong>objectif</strong> va être de <strong>l'accompagner</strong> pour :</span><span></span><span></span><span style=\"padding-left:20px\">• qu'[il_elle] <strong>découvre</strong> SES PROPRES <strong>stratégies d'endormissement autonomes</strong></span><span></span><span></span><span style=\"padding-left:20px\">• pour qu'[il_elle] puisse :</span><span></span><span></span><span style=\"padding-left:40px\">• Se rendormir [seul_seule] entre 2 <strong>cycles de sommeil</strong></span><span></span><span>•</span><span>⇒ Est-ce que <strong>ça fait sens</strong> pour vous quand je vous <strong>l'explique comme ça</strong> ?</span></div></div>" },
                      ]
                    },
                    {
                      id: "rev_bruit", emoji: "🔊", label: "Bruit extérieur",
                      pb: "rythme_reveil_bruit",
                      blocks: [
                        { type: "normal", showIfPb: "rythme_reveil_bruit", text: "- En **fin de nuit,** le **sommeil** devient naturellement **+ léger**\n-  C'est une phase où le **cerveau** est beaucoup **+ sensible** à **ce qui se passe autour**\n- Du coup, un **bruit extérieur, de la lumière…** *(voiture, oiseau, voisin, lumière…)* peut suffire à **provoquer un réveil.**\n- Et à ce moment-là, **son corps** est déjà **doucement** en train de **se préparer à se réveiller** :\n  - la **mélatonine** (hormone du S.) commence à **diminuer**\n  - le **cerveau** est **+ proche de l'éveil**\n    ⇒ du coup, le **rendormissement** devient **beaucoup + difficile** qu'en **plein milieu de la nuit.**\n\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\"><div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:4px 10px;align-items:start\"><span>❓</span><span>•</span><span>On va faire en sorte que son <strong>environnement de sommeil</strong> soit le <strong>+ optimal possible</strong> pour :</span><span></span><span></span><span style=\"padding-left:20px\">• pouvoir <strong>prolonger sa nuit</strong></span><span></span><span></span><span style=\"padding-left:20px\">• et <strong>atteindre des quotas de sommeil</strong> adaptés à :</span><span></span><span></span><span style=\"padding-left:40px\">• son âge</span><span></span><span></span><span style=\"padding-left:40px\">• et ses besoins</span><span></span><span>•</span><span>Et les <strong>choses</strong> vont se <strong>mettre NATURELLEMENT EN PLACE</strong> au niveau de <strong>SON sommeil</strong></span><span></span><span>•</span><span>⇒ Est-ce que <strong>ça vous va</strong> ?</span></div></div>" },
                      ]
                    },
                  ]
                },
              ]
            },
          ]
        },
      ]
    },

    // ─── STRATÉGIE ───────────────────────────────────────
    {
      id: "strategie_rendormissement",
      problematiqueId: "strategie_rendormissement",
      title: "Stratégie de sommeil",
      emoji: "😴",
      blocks: [
        { type: "normal", text: "- Aujourd'hui, **[prénom_enfant]** ne s'endort que :" },
        {
          type: "checklist", label: "Stratégies d'endormissement",
          items: [
            "Avec <strong>votre présence</strong>",
            "Dans <strong>vos bras</strong>, en le berçant",
            "Avec sa <strong>tétine</strong>, qu'il vous demande de remettre plusieurs fois 🍭",
            "En <strong>portage ou en poussette</strong>",
            "Au <strong>biberon ou au sein</strong> 🍼",
            "En <strong>tenant votre main</strong> ou votre doigt",
            "Sur <strong>VOTRE ventre</strong>",
            "Dans <strong>VOTRE lit/chambre</strong> 🛌",
          ]
        },
        { type: "normal", text: "- **CES conditions** **pour s'endormir** sont **devenues** ⇒ SES **stratégies d'endormissement**\n- Et le **problème**, c'est que SES stratégies, [il_elle] ne peut **PAS les reproduire [TOUT_SEUL]**<br>⇒ On appelle ça une **stratégie d'endormissement DÉPENDANTE**, car elle **dépend d'une aide extérieure, c'est-à-dire de VOUS**" },
        {
          type: "courbe_cards_grid",
          theme: "blue",
          items: [
            {
              id: "strat_rend", emoji: "😴", label: "Rendormissement difficile",
              pb: "strategie_rendormissement",
              blocks: [
                { type: "normal", text: "- Et quand il se réveille, **l'environnement a parfois changé** :", showIfPb: "strategie_rendormissement" },
                {
                  type: "checklist", label: "Changements à l'environnement", showIfPb: "strategie_rendormissement",
                  items: [
                    "Il est <strong>seul</strong>",
                    "Dans <strong>son lit</strong>",
                    "Vous <strong>n'êtes plus là</strong>",
                    "Il n'a <strong>plus ses éléments rassurants</strong>",
                  ]
                },
                { type: "normal", text: "- Pour **comprendre ce qui se passe** avec ses **rendormissements difficiles** ⇒ il faut **comprendre la structure du sommeil** :\n  - Son sommeil est **composé de cycles**\n  - et **entre chaque cycle,** on fait tous des **micro-réveils (tout à fait normaux)**\n  - le **cerveau va faire :**\n    - un léger **retour à la surface**\n    - **\"vérifier\"** que **tout va bien**\n    - **puis va se rendormir** de manière inconsciente\n\n- Chez la **plupart des enfants,** ces **micro-réveils** passent **inaperçus**, car ils **arrivent à se rendormir seuls.**\n- Mais pour **[prénom_enfant]**, ça **devient + compliqué** :\n  - A CHACUN de ses **micro-réveils NATURELS** :\n    - il va **se réveiller**\n    - il va **vouloir chercher à se rendormir**\n    - **SAUF** qu'il **NE trouvera PLUS les mêmes conditions**\n    - ⇒ Et donc **il VOUS appellera** pour :\n      - **se rassurer** car l'**environnement aura changé**\n      - et pour **reproduire les mêmes conditions** pour **pouvoir s'endormir**\n- Et **CES micro-réveils**, qui **normalement passent inaperçus**, se transforment en **véritables réveils**\n- Et c'est la **MÊME CHOSE** avec les **endormissements difficiles**<br>⇒ Il **cherche JUSTE** à **s'endormir AVEC** les **conditions qu'il connaît**\n\n- 💭 *Imaginez : vous vous endormez dans votre lit, et vous vous réveillez… dans la cuisine*<br>***⇒ Pas très rassurant, n'est-ce pas ?***", showIfPb: "strategie_rendormissement" },
              ]
            },
            {
              id: "strat_rel", emoji: "😴", label: "Enjeu relationnel",
              pb: "strategie_enjeu_relationnel",
              blocks: [
                { type: "normal", text: "- Un **autre point important**\n- surtout pour **les + grands**\n- c'est que PARFOIS, la **séparation du coucher** peut **être difficile** pour [lui_elle] :\n  - [Il_Elle] n'a **pas envie** de **couper ce lien** avec vous,\n  - ⇒ donc [il_elle] essaye de le PROLONGER **comme [il_elle] peut** :", showIfPb: "strategie_enjeu_relationnel" },
                {
                  type: "checklist", label: "Signes de prolongation du lien", showIfPb: "strategie_enjeu_relationnel",
                  items: [
                    "en <strong>gardant</strong> un <strong>contact physique</strong> ☝️",
                    "en vous <strong>appelant</strong> 💬💬",
                    "en faisant <strong>durer le coucher</strong> 🕰️",
                    "ou en se <strong>réveillant la nuit pour aller vous voir</strong> 🌛",
                    "En se <strong>réveillant tôt</strong> le matin",
                  ]
                },
                { type: "normal", text: "- [Il_Elle] est [dependant_dependante] à **VOTRE PRÉSENCE**", showIfPb: "strategie_enjeu_relationnel" },
              ]
            },
            {
              id: "strat_tet", emoji: "🍭", label: "Dépendance tétine",
              pb: "strategie_tetine",
              blocks: [
                { type: "normal", text: "- Concernant la **tétine**, elle peut aussi **jouer un RÔLE dans ces réveils.**\n  - Aujourd'hui, **[prénom_enfant]** en a **BESOIN pour s'endormir,**<br>mais comme il est encore **trop jeune** pour la **remettre seul**\n  - **⇒** il va **vous appeler** à **CHAQUE FOIS** qu'elle n'est **plus dans sa bouche**\n\n  - Je vais vous **expliquer simplement pourquoi :**\n    - Le **sommeil** fonctionne **par cycles.**\n    - Et dans ces cycles, il y a **différentes phases de sommeil**\n    - **L'une d'elles** s'appelle le **sommeil paradoxal**, c'est le **sommeil des rêves**\n    - **Pendant** le **sommeil paradoxal**, le corps est **comme paralysé** *(peut-être justement pour éviter qu'on mette nos rêves à exécution !)*\n    - Et c'est souvent **à ce moment-là** que la **bouche s'ouvre**… et que la **tétine peut tomber**\n\n    - Et DONC à la **fin d'un cycle** de sommeil, il y a **CE fameux** « **micro-réveil** »\n    - Le **cerveau remonte** un peu **à la surface**, vérifie que **tout va bien** …….\n    - ⇒ Sauf que là…, **[prénom_enfant]** va se **rendre compte** que sa **tétine n'est plus là.**\n\n- Et comme, la **tétine** fait **partie de sa stratégie** pour s'endormir<br>⇒ Il va **vous appeler** pour que vous :\n  - **veniez la lui remettre**\n  - pour **pouvoir se rendormir**\n- Et ça, c'est **qqch de très fréquent**", showIfPb: "strategie_tetine" },
                { type: "normal", showIfPb: "strategie_tetine", text: "- Du coup, il y a **2 chemins possibles**… et les 2 sont **tout à fait valables** :\n  - La **1ère option** : **GARDER** la tétine", embeddedActions: [
                  {
                    label: "Peut remettre la tétine", emoji: "✅", style: "action-green", mutexGroup: "tetine-remettre",
                    blocks: [
                      { type: "normal", text: "- Et comme **[prénom_enfant]** [il_elle] est **assez [grand_grande] et [moteur_motrice]**\n- On peut **progressivement lui apprendre** à la **retrouver ET à la remettre [seul_seule]**\n- L'**objectif** est qu'[il_elle] **gère [SEUL] ses micro-réveils** avec sa tétine" }
                    ]
                  },
                  {
                    label: "Ne peut pas remettre la tétine", emoji: "❌", style: "action", mutexGroup: "tetine-remettre",
                    blocks: [
                      { type: "normal", text: "- Comme **[prénom_enfant]** est **encore [petit_petite]** et n'a **pas encore la capacité motrice** pour la **remettre [seul_seule]**\n- **Dans ce cas,** ce sera **VOUS qui viendrez** la lui **remettre** lorsqu'**elle tombera** pendant son sommeil\n- Donc **au départ,** [il_elle] **dépend encore de vous** pour ça ⛔\n- En lui **remettant sa tétine A CHAQUE FOIS ⇒** Vous allez **garder** la **cohérence** dans ses **stratégies d'endormissement** ET de **rendormissement.**\n- Mais on peut progressivement **lui apprendre** comment [il_elle] **peut la remettre** dans la bouche\n- Mais c'est **VRAIMENT vers 6-7 mois**, qu'[il_elle] **aura la capacité motrice** pour la **chercher ET la remettre [SEUL]**\n- ⇒ Et comme ça, [il_elle] **pourra gérer [SEUL]** ses micro-réveils **avec sa tétine**" }
                    ]
                  }
                ]},
                { type: "normal", showIfPb: "strategie_tetine", text: "- La **2ème possibilité**, c'est de **supprimer la tétine** dès maintenant.\n\n- L'**objectif** est de **faire disparaître les réveils** **liés à la tétine**\n- Quand on **évoque cette idée**, ça peut **parfois faire un peu peur aux parents**, parce que la **tétine** a souvent une **grande place** dans l'**apaisement d'un bébé.**\n- Mais **MON expérience** montre qu'**en général**, les BB **s'adaptent très vite**,\n- et en **qq jours**, la tétine devient souvent un **lointain souvenir** !" },
                { type: "normal", showIfPb: "strategie_tetine", text: "- Si je me base sur **ce qu'on a vu ensemble,**\n- **mon conseil** serait plutôt de la **supprimer maintenant**, car ça permettrait de **réduire les réveils \"tétine\"**.\n- Et bien sûr, **si vous choisissez cette option**, je serai là pour **vous accompagner** pour que ça se fasse le **+ en douceur possible.**\n- Mais dans tous les cas, ça **reste un choix parental.**\n- C'est **VOUS qui décidez**, ce qui **vous semble le + juste** pour votre enfant et pour votre famille,\n- et ensuite **on ajustera ensemble** en **fonction de VOTRE décision**" },
                { type: "question", showIfPb: "strategie_tetine", text: "Alors dites-moi,\n\n⇒ qu'est-ce qui vous semble **le + juste pour vous**, par **rapport à cette tétine** :\n- souhaitez-vous **la garder** MAIS avec les **conséquences que ça implique**\n- ou souhaitez-vous **la supprimer définitivement** ?\n- Après on peut AUSSI faire « **un hybride** » :\n  - la **supprimer** durant les **tps de sommeil** et **PAS la journée**\n  - ou JUSTE **sur la sieste** et **PAS la nuit**…\n  ⇒ ça sera un peu **+ compliqué** pour **[prénom_enfant]**, c'est **une option envisageable**\n\n⇒ vers quoi **vous voudriez aller** ?", choice: {
                  id: "strategie_tetine_choice",
                  required: true,
                  options: [
                    { icon: "✅", label: "Garder", value: "garder", variant: "positive" },
                    { icon: "❌", label: "Supprimer", value: "supprimer", variant: "negative" },
                    { icon: "🔀", label: "Hybride", value: "hybride", variant: "warning" }
                  ]
                }},
              ]
            },
          ]
        },
        { type: "normal", _parentLevel: true, text: "- Donc si **on résume tout ça** :<div style=\"padding-left:24px\"><ul style=\"margin:4px 0 0 18px;padding:0;list-style:disc;line-height:1.35\"><li>Ce n'est <strong>PAS</strong> que <strong>[prénom_enfant]</strong> <strong>refuse de dormir</strong></li><li>C'est tout simplement qu'il <strong>ne SAIT PAS encore COMMENT s'endormir autrement</strong>.</li><li>L'<strong>objectif</strong> va être de <strong>l'accompagner</strong> pour :<ul style=\"margin:2px 0 0 18px;padding:0;list-style:disc;line-height:1.35\"><li>qu'il <strong>découvre</strong> SES PROPRES <strong>stratégies d'endormissement autonomes</strong></li><li>⇒ pour qu'il puisse :<ul style=\"margin:2px 0 0 18px;padding:0;list-style:disc;line-height:1.35\"><li><strong>S'endormir seul</strong></li><li><strong>Enchaîner</strong> plusieurs <strong>cycles de sommeil</strong></li></ul></li></ul></li></ul></div>" },
        { type: "question", _parentLevel: true, text: "• Est-ce que **ça vous parle** comme ça ?" },
      ]
    },

    // ─── ENVIRONNEMENT DE SOMMEIL ────────────────────────
    {
      id: "env_general",
      problematiqueId: "env_general",
      title: "Environnement de sommeil",
      emoji: "🏠",
      blocks: [
        { type: "normal", text: "- Aujourd'hui je vois **une /plusieurs petite(s) chose(s)** QU'ON **pourrait ré-ajuster** dans l'**environnement de sommeil** de **[prénom_enfant]**.\n- L'environnement de sommeil, c'est **qqch:**\n  - **SUR LEQUEL** on PEUT **agir ASSEZ facilement**\n  - mais qu'on a **souvent tendance à négliger**\n  - … POURTANT ça **joue un rôle clé** dans la **qualité du sommeil.**\n\n- Je vois des choses au niveau de :" },
        {
          type: "courbe_cards_grid",
          theme: "violet",
          items: [
            {
              id: "env_obs", emoji: "🌑", label: "Obscurité insuffisante",
              pb: "env_obscurite",
              blocks: [
                { type: "normal", showIfPb: "env_obscurite", text: "- Car aujourd'hui, la chambre de **[prénom_enfant]** n'est **pas complètement dans le noir…**\n  ⇒ Vous ne **mettriez pas une note de 10/10**\n  - En **journée,** DEJA, l'obscurité va **permettre de couper les stimulations visuelles** : *quand il n'y a rien à voir, il n'y a rien à faire… à part dormir !*\n  - et le **soir,** elle joue un rôle important puisqu'elle va **aider à la sécrétion** de l'hormone du sommeil : **la mélatonine**\n\n- *💭 C'est un peu comme si :*\n- En allant **vous coucher ce soir,**\n- ***Vous voyez une tache au plafond***\n  *⇒ vous allez cogiter*\n  *⇒ vous allez vous imaginer une fuite au dessus,*\n  *⇒ et vous n'allez pas dormir de suite…*\n  *⇒ c'est NORMAL…*\n  *⇒ je ferais pareil ! 🤣*<br><br>\n- Et ben pour **[prénom_enfant]** **c'est pareil**\n- [Sil_Sielle] **peut voir** TOUT **ce qu'il y a autour** :\n  - il sera **happé par l'éveil**\n  - et **l'endormissement sera + difficile !**\n- Tandis que **s'il fait noir** :\n  - il ne **verra rien**…\n  - et ça sera **beaucoup + facile DE lâcher prise !**\n- (À noter que la **peur du noir** apparaît généralement plus tard, **autour de 2–2,5 ans**, voire jamais !)" },
              ]
            },
            {
              id: "env_temp", emoji: "🌡", label: "Température trop élevée",
              pb: "env_temperature",
              blocks: [
                { type: "normal", showIfPb: "env_temperature", text: "- Aujourd'hui, **on est** un peu **au-dessus des 19 degrés**… et **ça peut jouer, mine de rien,** sur le sommeil de **[prénom_enfant]**.\n- Parce que **pour bien dormir**, le **corps** a besoin de diminuer **légèrement sa température corporelle**…\n  ⇒ et la **température de la chambre** va **nous aider**\n\n💭 On l'a **TOUS déjà vécu** : quand il fait **très chaud l'été,** même quand on est fatigué…\n**⇒ on va beaucoup moins bien dormir !**\n\n- Pour **[prénom_enfant]**, c'est **exactement la même chose.**\n- Si la **chambre est un peu trop chaude**, ça peut rendre :\n  - l'**endormissement + difficile**\n  - le **sommeil moins profond**\n  - …et donc des **réveils multiples !**\n\n⇒ Donc on **peut jouer sur ça** !" },
              ]
            },
            {
              id: "env_lit", emoji: "🛏", label: "Lit ouvert trop tôt",
              pb: "env_lit_ouvert",
              blocks: [
                { type: "normal", showIfPb: "env_lit_ouvert", showIfAgeMinMonths: 12, text: "- J'aimerais AUSSI **revenir sur le lit ouvert** de **[prénom_enfant]**\n\n- Aujourd'hui, **[prénom_enfant]** **a un lit ouvert**\n- Avoir vers un lit ouvert, c'est une **étape importante** :\n  - du **développement**\n  - et de l'**autonomie d'un enfant**\n- Mais **avec un lit ouvert**, il y a quelques **éléments importants** à **avoir en tête.**\n\n- Le 1er, c'est la **sécurité**\n- Il a la **possibilité de se lever** et se **promener** dans toute la maison.\n- Parfois, il **peut aller** dans des **endroits dangereux**,\n  *comme la cuisine avec les produits ménagers ou le garage rempli d'outils.*\n\n- Le 2ème, c'est le **sentiment de sécurité**\n- Le **lit** est :\n  - **+ grand**\n  - **ouvert** sur **TOUTE la chambre**…\n\n⇒ et certains enfants peuvent **se sentir un peu moins rassurés**,\ncar ils n'ont plus ce **petit côté \"nid cosy\"** pour **se nicher**\n⇒ ils **sont + \"exposés\"** face à leur **grande chambre**\n\n- *💭 Imaginez-vous dans une **grande chambre d'un château**, vous vous **sentiriez un peu vulnérable**…*\n\n- Le 3ème, ce sont les **allers-retours**.\n- Comme il **peut sortir du lit**\n  **⇒** vous pouvez **intervenir** pour le **remettre dans son lit,**\n  ⇒ et ça peut parfois **créer de la fatigue** ET même des **conflits** qui **pourraient être évités**.\n\n- Et enfin le **dernier point**, peut-être le **+ important** :\n  c'est la **règle** \"tu dois rester dans ton lit\".\n- Pour un enfant de cet âge, c'est une **responsabilité très lourde.**\n- Le **désir d'explorer** est **NORMAL**\n  et **rester dans son lit** toute la nuit **peut être très difficile** pour lui.\n\n⇒ Et c'est souvent **pour ces raisons** que **certains parents** :\n- choisissent de REVENIR **à un lit fermé**\n- qui **crée** un **cadre PHYSIQUE autour du sommeil**\n- Et c'est aussi **pour ces raisons** que MOI, **je ne recommande pas** de passer à un **lit ouvert AVANT l'âge de 2,5-3 ans**\n\n⇒ Du coup **par rapport à ça**, il y a **2 chemins possibles**, et les **2 sont tout à fait valables**\n\n- La **1ère option ⇒** c'est de **garder le lit ouvert**\n- Dans ce cas, votre enfant **garde cette liberté** de **pouvoir se lever.**\n- **Mais** cela veut dire que vous **serez parfois amenés à** :\n  - **intervenir**\n  - pour **le ramener dans son lit**,\n  - y **compris la nuit.**\n  ⇒ C'est-à-dire que ces **allers-retours** feront donc **ENCORE partie du fonctionnement** pour le moment.\n\n- **Si** vous **choisissez cette option** :\n  - on **travaillera ensemble** dans ce cadre-là,\n  - pour que ça se **passe le + sereinement possible.**\n\n- La **2nde option ⇒** c'est de REVENIR **à un lit fermé** (à barreaux ou lit parapluie)\n\n- L'**objectif** ici est simplement de **remettre un cadre physique autour du sommeil**\n- Les **barreaux** font **office de limite naturelle** :\n  - votre enfant **reste dans son lit**,\n  - **peut se nicher**\n  - se **sentir protégé,**\n  - et vous **n'avez PLUS ces allers-retours** pour le remettre dans son lit.\n\n- Et c'est **important de dire** que ce n'est **PAS DU TOUT une régression.**\n  ⇒ C'est **simplement** un **outil TEMPORAIRE** pour un **sommeil de grand !**\n\n- Si je **me base** sur ce qu'on a **vu ensemble**,\n  **mon conseil** serait plutôt **d'envisager de revenir à un lit fermé** : à barreaux ou lit parapluie\n- Mais dans **tous les cas**, ça **reste un choix parental.**\n- C'est VOUS **qui décidez** ce qui vous **semble le + juste** pour votre enfant et pour votre famille,\n  et **ensuite** on **ajustera ensemble** en **fonction** de **votre décision.**\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\">❓ Alors dites-moi,<br>qu'est-ce qui vous <strong>semble le + juste pour vous</strong>, aujourd'hui :<ul style=\"margin:6px 0 10px 20px;padding:0;list-style:disc\"><li><strong>Garder</strong> le <strong>lit ouvert</strong></li><li><strong>Retourner</strong> vers un <strong>lit à barreaux / parapluie</strong> ?</li></ul><div class=\"block-tickbox-choice tbc-inline\" data-choice-id=\"env_lit_ouvert_apres_1an\" data-required=\"true\"><div class=\"tbc-options\"><div class=\"tbc-opt\" data-variant=\"positive\" data-value=\"garder\" onclick=\"selectTickboxChoice(this)\"><span class=\"tbc-icon\">✅</span><span>Garder</span></div><div class=\"tbc-opt\" data-variant=\"negative\" data-value=\"supprimer\" onclick=\"selectTickboxChoice(this)\"><span class=\"tbc-icon\">❌</span><span>Supprimer</span></div></div></div></div>" },
{ type: "normal", showIfPb: "env_lit_ouvert", showIfAgeMaxMonths: 11, text: "- J'aimerais AUSSI **revenir sur le lit ouvert** de **[prénom_enfant]**\n\n- Aujourd'hui, **[prénom_enfant]** **a un lit ouvert**\n  - Avoir vers un lit ouvert, c'est une **étape importante** :\n    - du **développement**\n    - et de l'**autonomie d'un enfant**\n- Mais **avec un lit ouvert**, il y a quelques **éléments importants** à **avoir en tête.**\n\n- Le 1er, c'est la **sécurité**\n- Il a la **possibilité de se lever** et se **promener** dans toute la maison.\n- Parfois, il **peut aller** dans des **endroits dangereux**,\n  *comme la cuisine avec les produits ménagers ou le garage rempli d'outils.*\n\n- Le 2ème, c'est le **sentiment de sécurité**\n- Le **lit** est :\n  - **+ grand**\n  - **ouvert** sur **TOUTE la chambre**…\n\n⇒ et certains enfants peuvent **se sentir un peu moins rassurés**,\ncar ils n'ont plus ce **petit côté \"nid cosy\"** pour **se nicher**\n⇒ ils **sont + \"exposés\"** face à leur **grande chambre**\n\n- *💭 Imaginez-vous dans une **grande chambre d'un château**, vous vous **sentiriez un peu vulnérable**…*\n\n⇒ Et c'est souvent **pour ces raisons (et d'autres quand votre enfant pourra marcher)** que **certains parents** :\n- choisissent de REVENIR **à un lit fermé**\n- qui **crée** un **cadre PHYSIQUE autour du sommeil**\n- Et c'est aussi **pour ces raisons** que MOI, **je ne recommande pas** de passer à un **lit ouvert AVANT l'âge de 2,5-3 ans**\n\n⇒ Du coup **par rapport à ça**, il y a **2 chemins possibles**, et les **2 sont tout à fait valables**\n\n- La **1ère option ⇒** c'est de **garder le lit ouvert**\n- En ayant en tête ce que je viens de citer\n\n- **Et si** vous **choisissez cette option** :\n  - on **travaillera ensemble** dans ce cadre-là,\n  - pour que ça se **passe le + sereinement possible.**\n\n- La **2nde option ⇒** c'est d'aller vers **un lit fermé** (à barreaux ou lit parapluie)\n\n- L'**objectif** ici est simplement de **remettre un cadre physique autour du sommeil**\n- Les **barreaux** font **office de limite naturelle** :\n  - votre enfant **reste dans son lit**,\n  - **peut se nicher**\n  - se **sentir protégé,**\n  - et vous **n'avez PLUS ces allers-retours** pour le remettre dans son lit.\n\n- Et c'est **important de dire** que ce n'est **PAS DU TOUT une régression.**\n  ⇒ C'est **simplement** un **outil TEMPORAIRE** pour un **sommeil de grand !**\n\n- Si je **me base** sur ce qu'on a **vu ensemble**,\n  **mon conseil** serait plutôt **d'envisager de revenir à un lit fermé** : à barreaux ou lit parapluie\n- Mais dans **tous les cas**, ça **reste un choix parental.**\n- C'est VOUS **qui décidez** ce qui vous **semble le + juste** pour votre enfant et pour votre famille,\n  et **ensuite** on **ajustera ensemble** en **fonction** de **votre décision.**\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\">❓ Alors dites-moi,<br>qu'est-ce qui vous <strong>semble le + juste pour vous</strong>, aujourd'hui :<ul style=\"margin:6px 0 10px 20px;padding:0;list-style:disc\"><li><strong>Garder</strong> le <strong>lit ouvert</strong></li><li><strong>Aller</strong> vers un <strong>lit à barreaux / parapluie</strong> ?</li></ul><div class=\"block-tickbox-choice tbc-inline\" data-choice-id=\"env_lit_ouvert_avant_1an\" data-required=\"true\"><div class=\"tbc-options\"><div class=\"tbc-opt\" data-variant=\"positive\" data-value=\"garder\" onclick=\"selectTickboxChoice(this)\"><span class=\"tbc-icon\">✅</span><span>Garder</span></div><div class=\"tbc-opt\" data-variant=\"negative\" data-value=\"supprimer\" onclick=\"selectTickboxChoice(this)\"><span class=\"tbc-icon\">❌</span><span>Supprimer</span></div></div></div></div>" },
              ]
            },
            {
              id: "env_rit", emoji: "🌙", label: "Rituel absent / court",
              pb: "env_rituel",
              blocks: [
                { type: "normal", showIfPb: "env_rituel", text: "- Aujourd'hui, **[prénom_enfant]** :" },
                { type: "checklist", showIfPb: "env_rituel", items: [
                  "n'a <strong>pas</strong> vraiment de <strong>rituel du soir</strong>,",
                  "ou alors il est <strong>assez court</strong>"
                ]},
                { type: "normal", showIfPb: "env_rituel", text: "- En fait, les enfants ont **besoin** d'un **moment rassurant et prévisible…** surtout avant cette **longue séparation qu'est la nuit**.\n- L'idée du rituel, c'est de :\n  - **Toujours** faire les **mêmes petites étapes**\n  - dans le **même ordre**\n- Petit à petit, **[prénom_enfant]** comprend : *« Ah, si y a ça et ça… c'est bientôt l'heure du dodo. »*\n- Et là, son cerveau peut **+ facilement passer en mode dodo**\n\n- *💭 Pour vous donner une image, c'est un peu comme préparer un voyage en voiture :*\n  1. *on fait les valises,*\n  2. *on regarde l'itinéraire*\n  3. *on vérifie que le réservoir est plein.*\n*⇒ Ces gestes répétés nous rassurent et nous préparent à partir.*\n\n- Pour **[prénom_enfant]**, le **rituel du soir**, c'est exactement pareil :\n  - ça **[le_la] rassure**\n  - et **prépare doucement son cerveau à la nuit**." },
              ]
            },
            {
              id: "env_cad", emoji: "🗺", label: "Cadre non clair",
              pb: "env_cadre",
              blocks: [
                { type: "normal", showIfPb: "env_cadre", text: "- Là, ce que je vois, c'est que parfois, pour **[prénom_enfant]**, **ce n'est pas toujours la même réponse** selon les moments.\n- Mais les enfants ont **besoin** de **savoir à QUOI s'attendre** pour :\n  - Se sentir en sécurité\n  - Se rassurer\n\n- *💭 Pour vous donner une image :*\n- *C'est comme si vous deviez aller manger chez Tata Martine.*\n  - *S'il y a plusieurs chemins possibles :*\n    - *Vous en choisissez 1*\n    - *Et au 1er embouteillage*\n    - *… HOP, vous bifurquez*\n    - *car vous SAVEZ qu'il y a un AUTRE chemin*\n    - *sauf qu'au bout d'un moment, Bah, on ne sait plus trop SI on est sur le bon chemin…*\n    - *⇒ et on peut vite se perdre.*\n  - *Alors que quand :*\n    - *il y a 1 **seul chemin***\n    - *et qu'on **SAIT** que **c'est LE BON***\n    - *⇒ on avance tranquillement SANS se poser de questions.*\n    - *⇒ Et c'est beaucoup + simple*\n\n- Pour **[prénom_enfant]**, c'est pareil :\n  - quand c'est **clair** et **toujours pareil,**\n  - [il_elle] sait à **quoi s'attendre**\n  - et ça rend les choses **plus faciles… pour [lui_elle]…** et pour **vous aussi**" },
              ]
            },
            {
              id: "env_stim", emoji: "👀", label: "Stimulations visuelles",
              pb: "env_stimulations",
              blocks: [
                { type: "normal", showIfPb: "env_stimulations", text: "- Aujourd'hui, **[prénom_enfant]** **s'endort** dans **une chambre** où il y a **pas mal de choses autour** qui peuvent :\n  - **attirer son regard**\n  - et **[le_la] maintenir [eveille_eveillee] + longtemps**.\n- Et ce n'est **PAS un reproche**… c'est **JUSTE une observation**\n\n- L'**environnement joue un vrai rôle** dans la façon dont :\n  - on **se détend**\n  - et dont on **s'endort**\n\n- *💭 Pour vous donner une image, c'est comme aller au cinéma :*\n- *si la salle est pleine de lumières et de bruits ⇒ on aura du mal à rentrer dans le film*\n- *mais si la salle est calme et sombre ⇒ ça devient tout de suite + facile de se mettre dans l'ambiance du film*\n\n- Pour le sommeil, c'est pareil : l'environnement peut :\n  - **faciliter**\n  - **ou compliquer l'endormissement**.\n- Du coup, si on **réduit un peu les distractions ⇒** son **cerveau** pourra plus facilement **se concentrer** sur **1 seule chose : …le sommeil** !" },
              ]
            },
            {
              id: "env_ecr", emoji: "📱", label: "Écrans",
              pb: "env_ecrans",
              blocks: [
                { type: "normal", showIfPb: "env_ecrans", text: "- Aujourd'hui, **[prénom_enfant]** est en **contact, direct ou indirect, avec des écrans**…\n- C'est un peu **inévitable de nos jours**\n- mais **malheureusement**, ça peut **jouer sur son sommeil**\n\n- Vous savez, les **écrans diffusent** une **lumière…** qu'on appelle **« lumière bleue »**, qui est assez **proche de celle du soleil.**\n- Du coup, le **cerveau** :\n  - peut être confus\n  - et penser que c'est encore le « jour »\n  - et avoir du **mal à se mettre en mode « dodo »**…\n\n  ⇒ Résultat :\n  - **La production de la mélatonine** (l'hormone qui prépare au sommeil) peut être **retardée**\n  - Et **le passage du train du Sommeil** peut **passer un peu + tard que prévu**" },
              ]
            },
          ]
        },
        { type: "question", _parentLevel: true, text: "Donc pour moi, **ces petites choses** sont pour moi **des petits cailloux** dans **l'engrenage du sommeil** sur lequel **on va travailler,**\n⇒ **pour offrir** à **[prénom_enfant]** les **meilleures conditions possibles** pour ses nuits et ses siestes\n\n⇒ Est-ce que ça **vous parle** tout ça ?" },
      ]
    },

    // ─── ENJEUX RELATIONNELS ─────────────────────────────
    {
      id: "relationnel_general",
      problematiqueId: "relationnel_general",
      title: "Enjeux relationnels",
      emoji: "💬",
      blocks: [
        {
          type: "courbe_cards_grid",
          theme: "pink",
          items: [
            {
              id: "rel_lit", emoji: "🛏️", label: "Vient dans le lit parental",
              pb: "relationnel_lit_parental",
              blocks: [
                { type: "normal", showIfPb: "relationnel_lit_parental", text: "- Aujourd'hui **[prénom_enfant]** :\n  - Vient souvent vous **rejoindre dans votre lit**\n    ⇒ Alors que **chez Papy et Mamie**, ça ne se **passe pas comme ça** !\n\n- À son âge, il n'y a **rien de plus excitant** que de **communiquer avec Papa et Maman.**\n- Et pour [lui_elle], **toute attention… EST** une **attention** :\nque ce soit **un câlin, un rire**… ou **même** un **petit conflit.**\n  ⇒ Parce que, **dans TOUS les cas,** C'EST un **moment de relation avec vous.**\n\n- Et au **moment du coucher…** c'est un **petit peu particulier** :\n  - c'est le **moment** où le **lien physique se coupe**\n  - où il y a une **VRAIE et LONGUE séparation avec vous**\n    ⇒ Et ça peut être un peu **difficile pour [lui_elle]**\n    parce qu'[il_elle] a simplement **envie de prolonger le moment** **…encore un peu plus longtemps**\n\n- Donc ce que je vois ici :\n  - c'est **PAS forcément** une **difficulté liée au sommeil**\n    - mais c'est surtout **un besoin de relation qui s'exprime**\n    - Un **moyen** pour [lui_elle] **de prolonger le lien** avec vous.\n    ⇒ Et c'est **qqch** qui **arrive très souvent** chez les enfants de cet âge\n    ⇒ et qui est **tout à fait normal !**" },
              ]
            },
            {
              id: "rel_conflit", emoji: "💬", label: "En conflit sur d'autres sujets",
              pb: "relationnel_conflit_autres",
              blocks: [
                { type: "normal", showIfPb: "relationnel_conflit_autres", text: "- Aujourd'hui **[prénom_enfant]** :\n  - semble parfois **en « conflit »** avec vous sur **différents sujets** (qui ne sont **pas forcément liés au sommeil**)\n    ⇒ Alors qu'à la **crèche / chez Papy et Mamie**, ça ne se **passe pas comme ça** !\n\n- À son âge, il n'y a **rien de plus excitant** que de **communiquer avec Papa et Maman.**\n- Et pour [lui_elle], **toute attention… EST** une **attention** :\nque ce soit **un câlin, un rire**… ou **même** un **petit conflit.**\n  ⇒ Parce que, **dans TOUS les cas,** C'EST un **moment de relation avec vous.**\n\n- Et au **moment du coucher…** c'est un **petit peu particulier** :\n  - c'est le **moment** où le **lien physique se coupe**\n  - où il y a une **VRAIE et LONGUE séparation avec vous**\n    ⇒ Et ça peut être un peu **difficile pour [lui_elle]**\n    parce qu'[il_elle] a simplement **envie de prolonger le moment** **…encore un peu plus longtemps**\n\n- Donc ce que je vois ici :\n  - c'est **PAS forcément** une **difficulté liée au sommeil**\n    - mais c'est surtout **un besoin de relation qui s'exprime**\n    - Un **moyen** pour [lui_elle] **de prolonger le lien** avec vous.\n    ⇒ Et c'est **qqch** qui **arrive très souvent** chez les enfants de cet âge\n    ⇒ et qui est **tout à fait normal !**" },
              ]
            },
            {
              id: "rel_rappels", emoji: "📢", label: "Multiples rappels après coucher",
              pb: "relationnel_rappels",
              blocks: [
                { type: "normal", showIfPb: "relationnel_rappels", text: "- Aujourd'hui **[prénom_enfant]** :" },
                { type: "checklist", showIfPb: "relationnel_rappels", items: [
                  "Fait de <strong>nombreux rappels …après l'avoir couché</strong>"
                ]},
                { type: "normal", showIfPb: "relationnel_rappels", text: "⇒ Alors qu'à la **crèche / chez Papy et Mamie**, ça ne se **passe pas comme ça** !\n\n- À son âge, il n'y a **rien de plus excitant** que de **communiquer avec Papa et Maman.**\n- Et pour [lui_elle], **toute attention EST** une **attention** :\nque ce soit **un câlin, un rire**… ou **même PLUSIEURS petits échanges**\n  ⇒ Parce que, **dans TOUS les cas,** C'EST un **moment de relation avec vous.**\n\n- Et au **moment du coucher…** c'est un **petit peu particulier** :\n  - c'est le **moment** où le **lien physique se coupe**\n  - où il y a une **VRAIE et LONGUE séparation avec vous**\n    ⇒ Et ça peut être un peu **difficile pour [lui_elle]**\n    parce qu'[il_elle] a simplement **envie de prolonger le moment** **…encore un peu plus longtemps**\n\n- Donc ce que je vois ici :\n  - c'est **PAS forcément** une **difficulté liée au sommeil**\n    - mais c'est surtout **un besoin de relation qui s'exprime**\n    - Un **moyen** pour [lui_elle] **de prolonger le lien** avec vous.\n    - et aussi une forme de **dépendance à votre présence pour :**\n      - **s'apaiser**\n      - **et s'endormir**\n    ⇒ Et c'est **qqch** qui **arrive très souvent** chez les enfants de cet âge\n    ⇒ et qui est **tout à fait normal !**" },
              ]
            },
          ]
        },
        { type: "question", _parentLevel: true, showIfPb: ["relationnel_lit_parental","relationnel_conflit_autres","relationnel_rappels"], text: "CE QUE **je vous propose,** c'est qu'**on discute ensemble**\n  - de COMMENT **sortir doucement de ce petit « jeu relationnel »** qui s'est installé\n  - en vous proposant des **manières concrètes de réagir**\n  - pour que **le coucher** puisse **se passer beaucoup + sereinement…** pour tout le monde\n\n- ⇒ Est-ce que **vous reconnaissez** VOTRE **situation**… dans ce que je vous dis là ?" },
      ]
    },

  ],

  // ── SOLUTIONS (Plan d'action VIII) — arbre catégorie → solutions enfants ──────
  // Chaque parent = catégorie (Confort, Nutrition, Rythme, Stratégie, Env, Relationnel).
  // Chaque enfant = solution concrète avec une case à cocher.
  // `autoCheckIfPbs` = liste de pb qui, quand cochées, auto-cochent cette solution.
  // L'utilisateur peut manuellement toggler les cases dans VIII.
  solutions: {
    categories: [
      {
        id: "confort_physique", title: "Confort physique", emoji: "🩺",
        introBlocks: [
          { type: "normal", text: "- **Avant** de passer aux **conseils concrets sur le sommeil**,\n- je voudrais qu'on **s'attarde un peu sur** le **confort physique** de [prénom_enfant].\n\n---\n\n- **Pour moi**, c'est un **point essentiel**, parce que :\n  ⇒ **même si on met en place tout ce qu'il faut pour le sommeil,**\n  ⇒ si votre BB ressent **une gêne ou un inconfort**\n  ⇒ son **sommeil restera toujours compliqué. Quoi qu'il arrive !**\n\n- 💭 *Imaginez-vous, dans un **beau palace de la côte d'Azur**, dans une **chambre magnifique** avec un **matelas confortable***\n  *Si le **repas de la veille** n'a **pas été bien digéré**,*\n  *vous allez **passer une très mauvaise nuit,***\n  ***même si** toutes les **conditions sont réunies** POUR.*\n\n---\n\n- Donc l'idée ici, ce n'est **PAS** de **donner un diagnostic**, ce n'est **PAS mon rôle**, je ne suis **PAS médecin**\n  mais plutôt de vous **donner des pistes** :\n  - pour **apaiser** [prénom_enfant], et voir ce qui peut :\n    - être mis en place\n    - ou exploré\n\n---\n\n- Parce qu'**1 fois** cette **base** rétablie\n  ⇒ **tout le reste devient bcp + simple, efficace …et durable dans le temps !**" },
        ],
        children: [
          { id: "conf_aplv", label: "APLV", cardLabel: "APLV suspectée", cardEmoji: "🌿", autoCheckIfPbs: ["allergie_seule", "rgo_allergie"],
            floatingButtons: [
              {
                label: "Maman culpabilise", emoji: "😭", title: "Si Maman culpabilise", color: "#a855f7",
                blocks: [
                  { type: "empathie", text: "- Vous avez **fait de votre mieux** avec **les informations que vous aviez** à ce moment-là\n  ⇒ et ça, c'est **déjà énorme**.\n- **Je comprends** que ça **soit difficile** d'entendre ça\n- **Je comprends** que vous vous **sentiez coupable**…\n- **Mais VRAIMENT** ⇒ vous n'avez RIEN **fait de mal.**\n\n- Les **allergies aux protéines de lait de vache**,\n  - c'est souvent très **difficile à repérer.**\n  - Les **signes** ne sont **pas toujours clairs**\n  - PARFOIS MEME les **médecins passent à côté** au début…\n    ⇒ **alors VOUS,**\n    ⇒ vous ne **pouviez pas deviner.**\n\n- Ce **qui compte aujourd'hui,**\n  - c'est que vous **avez écouté votre enfant**,\n  - que vous avez **cherché à comprendre,**\n  - et que **vous êtes là pour lui**.\n    ⇒ C'EST ÇA ÊTRE une **maman attentive et aimante.**" },
                  { type: "normal", text: "- Essayez d'**être un peu plus douce** avec **vous-même** :\n  - vous n'avez PAS **« raté » qqch**\n  - Vous avez **fait de VOTRE mieux**\n\n- Et aujourd'hui,\n  - on va **explorer d'autres pistes**,\n  - on a **peut-être mis le doigt sur qqch** qui pourrait vraiment **aider à soulager son inconfort.**\n\n- VOUS ÊTES en **train d'avancer pour lui**, pas à pas…\n  ⇒ et C'EST **ÇA qui compte** 💛" }
                ]
              }
            ],
            blocks: [
            { type: "normal", text: "- Dans ce qu'on a discuté tout à l'heure, il y a **quelques petites choses** qui me font **penser** à une **possible allergie.**\n- Vous **m'avez parlé :**" },
            {
              type: "grouped_checklist",
              groups: [
                {
                  items: [
                    "Refus de s'alimenter (+ se cambre)",
                    "Douleurs",
                    "Eczéma / peau atopique / psoriasis",
                    "Régurgitations :",
                    { text: "en jet", subItem: true },
                    { text: "sur tout le tps d'éveil", subItem: true },
                    { text: "lait caillé", subItem: true },
                  ]
                },
                {
                  items: [
                    "Respiration sifflante / bruits de dinosaure",
                    "Ronflements (amygdales enflammées)",
                    "Dort la bouche ouverte",
                  ]
                },
                {
                  title: "Sphère ORL :",
                  items: [
                    "Otites à répétition",
                    "Toux chronique",
                    "Bronchite à répétition",
                    "Qu'il soit enrhumé très souvent",
                  ]
                },
                {
                  items: [
                    "Selles diarrhéiques",
                    "Selles glaireuses",
                    "Selles avec des traces de sang",
                  ]
                },
                {
                  items: [
                    "Terrain allergique dans la famille",
                    "Le fait qu'il ait eu des <strong>compléments de lait artificiel contenant des PLV entières</strong> à la naissance, puis qu'il n'a plus été en contact direct avec les PLV (allaitement = PLV moins en contact direct). Normalement 1 bib / semaine",
                  ]
                },
              ]
            },
            {
              type: "normal",
              _leftTitle: "APLV",
              text: "- À cet âge, on **pense parfois à l'allergie aux protéines de lait de vache**… même si bien sûr, ça **reste une piste parmi d'autres**. *(ex : œuf, fruits à coques, poisson/crustacé…)*\n- L'**allergie** aux **Protéines de Lait de vache** est **plus courante qu'on ne le pense**\n- **D'ailleurs, CHEZ** les **bébés PRESENTANT un RGO**, ON ESTIME qu'environ **40 % sont concernés par une APLV**\n- L'idée, ce n'est **PAS** de **vous alarmer** mais **de vous guider**",
              trailingInfoButton: {
                label: "Allergique vs Intolérant",
                title: "Allergique vs Intolérant",
                blocks: [
                  { type: "normal", text: "**ALLERGIQUE :**\n- **Allergie** = **Réaction disproportionnée du système immunitaire** face à un allergène\n  ⇒ Le **corps réagit** comme si une **substance était dangereuse** (même si elle **ne l'est pas**).\n\n- On peut être **allergique aux PLV**\nmais **PAS allergique au lactose** (= sucre dans le lait)\n\n---\n\n**INTOLÉRANT :**\n- **Intolérance** = **Seuil** au-delà duquel **l'organisme ne peut plus digérer ou absorber correctement** certains aliments\n\n- Par contre, on peut être **intolérant au lactose** (= sucre du lait)\n⇒ Cependant, l'**intolérance au lactose** est **très rare** chez les **bébés**" }
                ]
              }
            },
            { type: "important", _leftTitle: "Allergie IgE-médiée et non IgE-médiée", text: "- CE QUI est **un peu piégeux**, c'est que **ça ne se voit pas toujours tout de suite**.\n  - Il y a des allergies où la **réaction est immédiate,** juste **après avoir mangé**… (allergie IgE-médiée)\n  - et d'autres où ça **arrive plus tard**, parfois 1 **ou 2 jours après** (allergie non-IgE-médiée)\n\n  ⇒ Du coup, c'est **+ difficile à faire le lien entre** :\n  - **1 produit ingéré**\n  - **et une allergie**" },
            { type: "normal", _leftTitle: "Pas médecin", text: "- De mon côté, je **ne pose pas de diagnostic**, je ne suis <strong style=\"color:#c0392b\">pas médecin</strong>\n  mais si ça vous parle, ça **peut intéressant** d'en **discuter avec votre médecin** pour voir si cette **piste mérite d'être creusée**" },
            {
              type: "normal",
              _leftTitle: "Éviction puis ré-introduction",
              text: "- **Selon les situations**, il existe **différentes façons de confirmer OU d'écarter** une allergie\n- Mais dans le **cas d'une possible APLV,** ça passe FORCÉMENT par :\n  - un **protocole d'éviction** des PLV\n  - PUIS de **ré-introduction** des PLV…\n    ⇒ c'est important car **BB PEUT grandir** et son **système digestif évoluer positivement**, et on peut **penser à TORT** que **c'est une allergie** (or une **éviction** ce n'est **pas ANODIN**)\n    ⇒ **SEULE** une **ré-introduction** permet de **valider une APLV** avec le **retour OU NON des symptômes**\n  - et c'est TOUJOURS **encadré par un professionnel de santé.**\n    ⇒ Vous pouvez **aller voir votre médecin** avec **l'arbre décisionnel** donné par **l'HAS** *(Haute Autorité de Santé)*,\n    ⇒ que je **pourrais vous envoyer**\n    ⇒ qui pourra vous servir de base pour échanger avec lui\n    ⇒ Si vous avez le **livre rouge** de Caroline Ferriol, il y a un **QR code page 29**, qui vous **renvoie vers ce schéma**\n\n- Je vous propose de **vous expliquer rapidement comment ça fonctionne**, pour que vous puissiez **mieux comprendre la démarche.**",
              trailingInfoButtons: [
                {
                  label: "Prise de sang",
                  title: "Prise de sang",
                  blocks: [
                    { type: "normal", text: "- Une **prise de sang** ne **permet PAS** de **savoir si un enfant est allergique** aux PLV ou non (que pour les allergies **IgE-médiées** = réactions immédiates).\n\n- **SEUL**, le **test d'éviction ET de ré-introduction** permet au **médecin** de **le diagnostiquer** (car allergie **non-IgE médiée** = retardée)" }
                  ]
                },
                {
                  label: "Arbre décisionnel HAS",
                  title: "Arbre décisionnel de la HAS",
                  blocks: [
                    { type: "normal", _noBorder: true, text: "<div style=\"font-size:15px;font-weight:700;color:#0f172a;margin-bottom:8px\">• D'après <u>l'arbre décisionnel</u> de la <u>Haute Autorité de Santé (HAS)</u> :</div><div style=\"display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap\"><span style=\"color:#64748b;font-size:15px\">🔗</span><a href=\"https://www.has-sante.fr/upload/docs/application/pdf/2024-03/arbre_decisionnel_de_prise_en_charge_du_reflux_gastro-oesophagien_chez_lenfant_de_moins_de_un_an.pdf\" target=\"_blank\" rel=\"noopener\" style=\"color:#64748b;font-size:14px;text-decoration:underline\">www.has-sante.fr</a><button type=\"button\" title=\"Ouvrir dans une fenêtre séparée (pour partage d'écran)\" onclick=\"window.open('https://www.has-sante.fr/upload/docs/application/pdf/2024-03/arbre_decisionnel_de_prise_en_charge_du_reflux_gastro-oesophagien_chez_lenfant_de_moins_de_un_an.pdf','has-aplv-window','width=1100,height=800,menubar=no,toolbar=no,location=yes');return false;\" style=\"width:32px;height:32px;border-radius:50%;border:none;background:#2563eb;color:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(37,99,235,0.35);padding:0;flex-shrink:0\"><span style=\"font-size:14px;margin-left:2px\">▶</span></button></div><div style=\"position:relative;width:100%;height:460px;border:1.5px solid #cbd5e0;border-radius:8px;overflow:hidden;background:#fff\"><iframe src=\"https://www.has-sante.fr/upload/docs/application/pdf/2024-03/arbre_decisionnel_de_prise_en_charge_du_reflux_gastro-oesophagien_chez_lenfant_de_moins_de_un_an.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH\" style=\"width:100%;height:540px;border:none;background:#fff;margin-top:-4px\" title=\"Arbre décisionnel HAS — aperçu\" loading=\"lazy\"></iframe></div>" }
                  ]
                },
                {
                  label: "Traitements médicaux",
                  title: "Traitements médicaux disponibles pour soulager TEMPORAIREMENT (sous avis médical)",
                  blocks: [
                    { type: "normal", _noBorder: true, text: "<details class=\"rgo-treatments-root\" style=\"border:2px solid #fcd34d;border-radius:10px;background:#fffbeb;padding:10px 14px\" open><summary style=\"cursor:pointer;font-weight:800;color:#7c2d12;user-select:none;list-style:none;display:flex;align-items:center;gap:10px;font-size:14px\"><span>💉 Traitements médicaux disponibles pour soulager TEMPORAIREMENT (sous avis médical)</span></summary><div style=\"margin-top:12px;display:flex;flex-direction:column;gap:8px\"><details style=\"border-left:3px solid #fcd34d;padding:6px 10px 6px 12px;background:#fff\" open><summary style=\"cursor:pointer;font-weight:700;color:#7c2d12;user-select:none;list-style:none\">▸ Traitements médicaux</summary><div style=\"margin-top:6px;padding-left:10px;display:flex;flex-direction:column;gap:6px\"><details style=\"border-left:2px dashed #fde68a;padding:4px 8px;background:#fffef5\"><summary style=\"cursor:pointer;font-weight:700;color:#7c2d12;list-style:none\">▸ Gaviscon</summary><div style=\"margin-top:4px;font-size:13.5px;line-height:1.55\"><ul style=\"margin:0;padding-left:18px\"><li>Forme une <strong>nappe sur le bol gastrique</strong> pour <strong>éviter les remontées</strong> + <strong>diminue l'acidité</strong> de l'estomac pour soulager l'œsophagite<ul style=\"margin:2px 0 0 18px\"><li>⚠️ À donner <strong>AVANT le repas</strong> car l'estomac est le + acide</li><li>⚠️ Provoque des <strong>selles dures / diarrhées</strong></li></ul></li></ul></div></details><details style=\"border-left:2px dashed #fde68a;padding:4px 8px;background:#fffef5\"><summary style=\"cursor:pointer;font-weight:700;color:#7c2d12;list-style:none\">▸ Polysilane</summary><div style=\"margin-top:4px;font-size:13.5px;line-height:1.55\"><ul style=\"margin:0;padding-left:18px\"><li><strong>Anti-flatulant</strong></li><li><strong>Tapisse l'œsophage</strong> pour protéger de l'acidité qui peut remonter + effet apaisant sur la brûlure</li><li>⚠️ Sucré donc l'enfant s'apaise (car il a faim) mais pas forcément le reflux</li></ul></div></details><details style=\"border-left:2px dashed #fde68a;padding:4px 8px;background:#fffef5\"><summary style=\"cursor:pointer;font-weight:700;color:#7c2d12;list-style:none\">▸ IPP (Inexium, Mopral, Omeprazole)</summary><div style=\"margin-top:4px;font-size:13.5px;line-height:1.55\"><ul style=\"margin:0;padding-left:18px\"><li><strong>Diminue l'acidité</strong> de l'estomac pour soulager l'œsophagite</li><li>MAIS <strong>ne diminue pas les reflux</strong></li><li>⚠️ Pas d'autorisation de mise sur le marché avant l'âge d'1 an</li></ul></div></details></div></details></div></details>" }
                  ]
                }
              ]
            },
            { type: "normal", _noBorder: true, text: "<div class=\"aplv-schema\" style=\"margin:14px 0;overflow-x:auto\"><table style=\"border-collapse:collapse;width:100%;font-size:14px;line-height:1.4;min-width:650px\"><thead><tr><th style=\"background:#d6e6f5;border:1px solid #94a3b8;padding:8px;color:#1e3a8a;width:22%\">Lait maternel</th><th colspan=\"4\" style=\"background:#d6e6f5;border:1px solid #94a3b8;padding:8px;color:#1e3a8a\">Lait infantile</th></tr><tr><td colspan=\"5\" style=\"border:1px solid #94a3b8;padding:8px;text-align:center;font-weight:700\">Faire un essai d'<strong>éviction des protéines de lait de vache</strong> (et brebis, chèvre, âne, jument car risque élevé d'allergies croisées dans 92% des cas)</td></tr><tr><td colspan=\"5\" style=\"border:1px solid #94a3b8;padding:6px;text-align:center;background:#f1f5f9;font-weight:700\">2 à 4 semaines</td></tr><tr><th rowspan=\"10\" style=\"background:#fff;border:1px solid #94a3b8;padding:8px;vertical-align:top;text-align:left;font-weight:400;width:22%\"><div style=\"margin-top:0\"><strong>Continuer l'allaitement</strong> (effet pansement + renforce le système immunitaire et ↘ les symptômes allergiques)</div><div style=\"margin-top:6px;font-weight:700\">Supplémentation de calcium pour la mère</div><div style=\"margin-top:6px\"><u>Position allaitement :</u><br>Mère : semi-allongée<br>BB : Posé sur la mère, semi-vertical</div><div style=\"margin-top:6px\">Consulter une <strong>consultante IBCLC</strong></div><div style=\"margin-top:6px\">Si REF : Exprimer le lait à la main en début pour décongestionner le sein et pour que BB régule le flux</div></th><th style=\"background:#eef2ff;border:1px solid #94a3b8;padding:6px;color:#1e3a8a;width:12%\"></th><th colspan=\"3\" style=\"background:#eef2ff;border:1px solid #94a3b8;padding:6px;color:#1e3a8a\">Sévérité</th></tr><tr><th style=\"background:#eef2ff;border:1px solid #94a3b8;padding:6px\"></th><th style=\"background:#eef2ff;border:1px solid #94a3b8;padding:6px\">+</th><th style=\"background:#eef2ff;border:1px solid #94a3b8;padding:6px\">++</th><th style=\"background:#eef2ff;border:1px solid #94a3b8;padding:6px\">+++</th></tr><tr><td style=\"border:1px solid #94a3b8;padding:6px;background:#f8fafc;font-weight:700;color:#1e3a8a\">Nom</td><td style=\"border:1px solid #94a3b8;padding:6px;vertical-align:top\">Lait à base de <strong>protéines hydrolysées de PLV</strong> <u>OU</u> <strong>Hydrolysats extensifs de PLV</strong></td><td style=\"border:1px solid #94a3b8;padding:6px;vertical-align:top\">Préparation à base d'<strong>acides aminés</strong></td><td style=\"border:1px solid #94a3b8;padding:6px;vertical-align:top\"><strong>Hydrolysats partiels</strong> <u>ou</u> <strong>extensifs de protéines de riz</strong></td></tr><tr><td style=\"border:1px solid #94a3b8;padding:6px;background:#f8fafc;font-weight:700;color:#1e3a8a\">Origine des protéines</td><td colspan=\"2\" style=\"border:1px solid #94a3b8;padding:6px;text-align:center\">Lait de <strong>vache</strong></td><td style=\"border:1px solid #94a3b8;padding:6px;text-align:center\">Protéine de <strong>riz</strong></td></tr><tr><td style=\"border:1px solid #94a3b8;padding:6px;background:#f8fafc;font-weight:700;color:#1e3a8a;vertical-align:top\">Fabrication</td><td style=\"border:1px solid #94a3b8;padding:6px;vertical-align:top\">Les PLV sont <strong>fortement découpées</strong> pour ↘ le risque de réaction allergique<br><br>⚠ Risque n'est pas nul car PLV</td><td style=\"border:1px solid #94a3b8;padding:6px;vertical-align:top\">Les PLV sont <strong>découpées au max</strong> donnant des morceaux appelés « acides aminés »</td><td style=\"border:1px solid #94a3b8;padding:6px\"></td></tr><tr><td style=\"border:1px solid #94a3b8;padding:6px;background:#f8fafc;font-weight:700;color:#1e3a8a\">Particularité</td><td colspan=\"2\" style=\"border:1px solid #94a3b8;padding:6px;text-align:center\">Lait difficilement accepté (goût plutôt mauvais)</td><td style=\"border:1px solid #94a3b8;padding:6px;text-align:center\">Pas assez gras</td></tr><tr><td style=\"border:1px solid #94a3b8;padding:6px;background:#f8fafc;font-weight:700;color:#1e3a8a\">Où trouver</td><td colspan=\"3\" style=\"border:1px solid #94a3b8;padding:6px;text-align:center\">Pharmacie</td></tr><tr><td style=\"border:1px solid #94a3b8;padding:6px;background:#f8fafc;font-weight:700;color:#1e3a8a\">Prescription médicale</td><td colspan=\"2\" style=\"border:1px solid #94a3b8;padding:6px;text-align:center;background:#dcfce7\"><strong>Oui</strong></td><td style=\"border:1px solid #94a3b8;padding:6px;text-align:center;background:#fee2e2\"><strong>Non</strong></td></tr><tr><td style=\"border:1px solid #94a3b8;padding:6px;background:#f8fafc;font-weight:700;color:#1e3a8a;vertical-align:top\">Marques</td><td style=\"border:1px solid #94a3b8;padding:6px;vertical-align:top;font-size:13px\">Alfaré HMO<br>Althéra HMO<br>Novalac Allernova<br>Novalac Allernova AR<br>Nutramigen LGG<br>Nutribén APLV<br>Pepticate<br>Picot Pepti Junior Caséine<br>Pregestimil</td><td style=\"border:1px solid #94a3b8;padding:6px;vertical-align:top;font-size:13px\">Alfamino HMO<br>Neocate<br>Neocate H<br>Neocate Junior <em>(fraise ou vanille)</em><br>Neocate Spoon<br>Novalac Amina<br>Puramino<br>Puramino Junior</td><td style=\"border:1px solid #94a3b8;padding:6px;vertical-align:top;font-size:13px\">Modilac Riz<br>Modilac Riz AR<br>Novalac Riz<br>Novalac Riz AR<br>Picot Pepti Junior Riz</td></tr></thead></table><div style=\"margin-top:18px\"><div style=\"text-align:center;font-weight:800;font-size:14px;margin-bottom:10px\">⬇ Amélioration des symptômes ?</div><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:18px\"><div style=\"text-align:center\"><div style=\"background:#dcfce7;border:2px solid #22c55e;border-radius:8px;padding:8px 14px;display:inline-block;font-weight:800;color:#166534\">NON</div><div style=\"margin:14px 0 10px;font-size:28px;line-height:1\">⬇</div><div style=\"font-size:13px;padding:0 6px\">Probablement <strong>pas d'APLV</strong> si protocole bien appliqué</div><div style=\"margin:14px 0 10px;font-size:28px;line-height:1\">⬇</div><div style=\"font-weight:700;font-size:13px\">Ré-introduction des PLV</div></div><div style=\"text-align:center\"><div style=\"background:#fee2e2;border:2px solid #dc2626;border-radius:8px;padding:8px 14px;display:inline-block;font-weight:800;color:#991b1b\">OUI</div><div style=\"margin:14px 0 10px;font-size:28px;line-height:1\">⬇</div><div style=\"font-weight:700;font-size:13px\">Ré-introduction des PLV</div><div style=\"margin:14px 0 10px;font-size:18px;line-height:1;font-weight:700\">⬇ Symptômes ?</div><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px\"><div><div style=\"background:#fee2e2;border:2px solid #dc2626;border-radius:8px;padding:6px 10px;font-weight:800;color:#991b1b;font-size:12.5px\">OUI</div><div style=\"font-size:13px;margin-top:3px;color:#991b1b\">Régurgitations réapparaissent</div><div style=\"margin:10px 0 6px;font-size:22px;line-height:1\">⬇</div><div style=\"font-weight:900;color:#dc2626;font-size:14px\">APLV</div></div><div><div style=\"background:#dcfce7;border:2px solid #22c55e;border-radius:8px;padding:6px 10px;font-weight:800;color:#166534;font-size:12.5px\">NON</div><div style=\"margin:10px 0 6px;font-size:22px;line-height:1\">⬇</div><div style=\"font-weight:900;color:#166534;font-size:13px\">Probablement pas d'APLV</div></div></div></div></div></div></div>" },
            { type: "normal", _leftTitle: "Allergies croisées", text: "- Les **laits** de :\n<ul style=\"margin:4px 0 6px 0;padding-left:40px;list-style:disc\"><li>Jument</li><li>Brebis</li><li>Chèvre</li><li>Ânesse</li><li>Soja</li></ul>ont des **propriétés très proches du lait de vache**\n⇒ À 92 %, il y a des **allergies croisées**\n⇒ Donc ces laits là, sont **AUSSI à proscrire** dans le **cadre d'une éviction**" },
            { type: "normal", _leftTitle: "Diététicienne nutritionniste pédiatrique", text: "- Un **diététicienne nutritionniste pédiatrique** pourra vous **aider dans cette éviction**\n  ⇒ car **beaucoup d'aliments** ont des **traces de protéines cachées** (charcuterie, biscuit, plats préparés…)\n\n- Nous avons **Tiffany Deroyer** chez Fée Dodo qui pourra vous **venir en aide sur l'alimentation**\n  et la consultation est **souvent prise en charge par la Mutuelle**" },
            { type: "important", _leftTitle: "Maman allaitante = calcium", showIfAlim: ["Allaitement au sein", "Allaitement au biberon", "Allaitement mixte"], text: "- Les **mamans allaitantes** devront être **complémentées** en **CALCIUM** pour **éviter une carence**\ncar une éviction c'est **LOIN d'être anodin** (fatigue, carence)" },
            { type: "normal", _leftTitle: "Directement lait de riz", showIfAlim: ["Allaitement mixte", "Biberon lait infantile"], text: "- Je vous conseille de demander à votre médecin de privilégier **directement un lait de riz** (sans passer par un lait avec des PLV) pour gagner du temps" },
            { type: "important", _leftTitle: "Pas lait anti-reflux", showIfAlim: ["Allaitement mixte", "Biberon lait infantile"], text: "- Je vous **déconseille** les **laits Anti-Reflux** qui vont :\n  - **masquer les symptômes** de reflux\n    ⇒ et qui ne vont **pas** vous **aider** à voir **si OUI ou NON la nouvelle composition** du lait **apporte des solutions**\n\n- 🎓 *Lait Anti-Reflux* :\n  - ***Plus lourd***\n  - *et donc **remonte moins facilement***" },
            { type: "normal", _leftTitle: "RDV allergologue", text: "- **Si l'allergie est confirmée :**\n  - Il sera aussi **important** de faire, AVEC UN ALLERGOLOGUE, un **protocole de désensibilisation**\n    - **Avec de la micro-ré-introduction de PLV** *(lait à base de lait de vache / yaourt)*\n    - pour **RESTER en contact avec les PLV à petites doses … mais assez souvent**\n      ⇒ Pour qu'il puisse **NE PAS** être allergique aux PLV toute sa vie\n\n  - Car le fait d'**être HORS contact des allergènes pendant longtemps**,\n  - peut provoquer des **grosses allergies immédiates** si il y a un contact,\n    ⇒ qui LÀ peuvent être **dangereuses**" },
            { type: "normal", _leftTitle: "Terrain allergique", text: "- **Sachez que** quand on a un **terrain allergique**, il peut y **avoir d'AUTRES allergies** qui **peuvent arriver** *(amandes, noix…)*\n  ⇒ C'est **bien d'avoir déjà un contact avec un allergologue**" },
            { type: "normal", _leftTitle: "RDV ORL", text: "- Je vous **re-dirigerai** aussi vers un **ORL pédiatrique**\n  car quand on a un **BB allergique**\n  c'est bien d'**aller faire vérifier toute la sphère ORL**,\n  ⇒ pour aller **voir les amygdales**, si elles **n'ont pas déjà gonflé**\n  ⇒ Ça peut **réduire le trou de l'œsophage**\n  ⇒ et donc le **passage des aliments solides** (pour **éviter** des **possibles troubles alimentaires + tard**)" },
            { type: "important", _leftTitle: "À faire avec un médecin", showIfAlim: ["Allaitement maternel"], text: "- Je me **répète peut-être** mais :\n  - ce protocole\n    ⇒ **doit être suivi par un médecin** (pédiatre ou allergologue)" },
            { type: "important", _leftTitle: "À faire avec un médecin", showIfAlim: ["Biberon lait infantile", "Allaitement mixte", "Diversification", "Sevrage en cours"], text: "- Je me **répète peut-être** mais :\n  - ce protocole\n  - le changement de lait\n    ⇒ **doit être suivi par un médecin** (pédiatre ou allergologue)" },
            { type: "normal", _leftTitle: "Bonne nouvelle", text: "- 👏 Et LES **bonnes nouvelles** :\n  - C'est qu'**en moins d'1 semaine**\n    ⇒ vous allez **voir les effets** (**certains BB** qui ont des **fortes allergies** vont **aller mieux** au **bout de 2-3 jours**)\n    🎓 La **régression inflammatoire complète** prend entre **2 à 3 semaines**\n\n  - LA 2ème bonne nouvelle, c'est que **l'allergie aux protéines de lait de vache disparaît** NATURELLEMENT généralement **toute seule** entre **3 et 6 ans** (**90 %**)" },
            { type: "normal", _noBorder: true, text: "<div style=\"height:72px\"></div>" },
            { type: "normal", _leftTitle: "Résumé", _catBg: true, text: "- Donc si je résume :\n<ol style=\"margin:6px 0 0 0;padding-left:32px\"><li style=\"margin-bottom:12px\">Vous pouvez <strong>aller voir votre médecin</strong> avec l'<strong>arbre décisionnel de l'HAS</strong>, et vous lui dites que [prénom_enfant] a les symptômes x et y et qu'il faudrait qu'il vous <strong>adresse vers un spécialiste (allergologue)</strong> au besoin (le médecin peut vous suivre aussi)</li><li style=\"margin-bottom:12px\">S'il est OK, vous <strong>mettez en place l'éviction de PLV pendant 2-4 semaines</strong> sous la <strong>supervision du docteur</strong> et avec <strong>une diététicienne nutritionniste pédiatrique</strong></li><li style=\"margin-bottom:12px\">Au bout de <strong>2 à 4 semaines</strong>, vous <strong>ré-introduisez</strong> les PLV, et <strong>voyez si les symptômes reviennent ou pas</strong> (symptômes dans les 72h)</li><li style=\"margin-bottom:12px\">S'<strong>ils reviennent</strong>, alors il faudra <strong>sans doute adapter son alimentation</strong></li><li>Enfin, il y aura le <strong>protocole de dé-sensibilisation</strong><ul style=\"margin:4px 0 0 0;padding-left:22px\"><li><strong>Avec de la micro-ré-introduction</strong></li><li>pour <strong>RESTER en contact avec les PLV à petites doses</strong><br>⇒ POUR QUE votre BB puisse <strong>consommer des PLV SANS QUE ÇA ne l'impacte</strong></li></ul></li></ol>" },
            { type: "important", showIfAlim: ["Allaitement au sein", "Allaitement au biberon", "Allaitement mixte"], text: "⚠️ Avec une **éviction des PLV de la Maman**" },
            { type: "important", showIfAlim: "Diversification", text: "⚠️ Avec une **éviction des PLV par l'enfant**" },
            { type: "normal", showIfAlim: ["Allaitement au sein", "Allaitement au biberon", "Allaitement mixte", "Allaitement maternel", "Diversification"], text: "- Je vous conseille de **noter chaque jour** :\n  - **comment** est **son comportement global**\n  - son **évolution digestive** (selles)\n  - **ORL**\n  - **son sommeil**…\n  - et **sa croissance**\n    ⇒ et vous le faites **AVANT, et PENDANT l'éviction et après la réintroduction** (dans les 72h)\n    ⇒ Pour pouvoir en **discuter avec votre médecin**" },
            { type: "important", showIfAlim: ["Allaitement mixte", "Biberon lait infantile"], text: "⚠️ Partez sur le **lait** que vous a **conseillé le médecin** *(lait aux protéines hydrolysées aux PLV, lait aux acides aminés ou lait infantile de riz)*" },
            { type: "important", showIfAlim: ["Allaitement mixte", "Biberon lait infantile"], text: "⚠️ Je vous déconseille les **laits anti-reflux** qui **masquent les symptômes** et ne **permettent pas** de voir si l'**éviction a un effet OU NON** sur les **régurgitations**" },
            { type: "important", showIfAlim: "Diversification", text: "⚠️ Attention au lait de **jument, brebis, chèvre, ânesse, soja**… pour les **allergies croisées**" },
            { type: "important", showIfAlim: "Diversification", text: "⚠️ Aux **carences** qu'une **éviction peut engendrer** :\n- en **fer** pour votre enfant ⇒ Au besoin, il y a des compléments (toujours se **valider auprès de votre médecin**) *(ex : Child Life : Iron liquid)*\n\n<img src=\"https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cdl/cdl12100/v/40.jpg\" alt=\"Child Life Iron Liquid\" style=\"max-width:120px;height:auto;margin-top:8px;border:1px solid #cbd5e0;border-radius:6px;background:#fff;padding:4px\">" },
            { type: "conseil", showIfAlim: "Diversification", text: "💡 Et vous pouvez vous faire **aider d'une diététicienne nutritionniste pédiatrique** (⇒ nous avons **Tiffany Deroyer** chez Fée Dodo qui pourra vous **venir en aide sur l'alimentation**)\n\net la consultation est **souvent prise en charge par la Mutuelle**" },
            { type: "important", showIfAlim: ["Allaitement au sein", "Allaitement au biberon", "Allaitement mixte"], text: "⚠️ Attention au lait de **jument, brebis, chèvre, ânesse, soja**… pour les **allergies croisées**" },
            { type: "important", showIfAlim: ["Allaitement au sein", "Allaitement au biberon", "Allaitement mixte"], text: "⚠️ Aux **carences** qu'une **éviction peut engendrer** :\n- en **fer** pour votre enfant ⇒ Au besoin, il y a des compléments (toujours valider auprès de votre médecin) *(ex : Child Life : Iron liquid)*\n- **au calcium** : il faudrait que vous vous **fassiez supplémenter**\n\n<img src=\"https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cdl/cdl12100/v/40.jpg\" alt=\"Child Life Iron Liquid\" style=\"max-width:120px;height:auto;margin-top:8px;border:1px solid #cbd5e0;border-radius:6px;background:#fff;padding:4px\">" },
            {
              type: "option", label: "OPTION Tensions corporelles", emoji: "🦴", style: "purple-btn",
              blocks: [
                { type: "normal", text: "- Je vous invite à **vérifier** s'il n'y a **pas de tensions corporelles** qui pourraient être à l'**origine du reflux** *(ex : accouchement difficile, BB qui est dans une position asymétrique, corps en forme banane…)*\n  ⇒ Vous pouvez aller voir un **ostéopathe pédiatrique**" },
              ]
            },
            {
              type: "option", label: "OPTION Freins restrictifs", emoji: "👄", style: "purple-btn",
              blocks: [
                { type: "normal", text: "- Je vous inviterai aussi à **vérifier** s'il n'y a **pas de freins restrictifs** qui pourraient **faire rentrer de l'air dans l'estomac** + qui peut rendre **+ difficile la prise alimentaire**\n\n- Vous pouvez aller voir :\n  - **Pédiatre** — à voir en 1er\n  - **Thérapeute manuel** type ostéopathe pédiatrique — voir si BB n'a pas de tension et non un frein\n  - **Consultante IBCLC** — voir **si un frein buccal** est la **cause des difficultés d'allaitement**\n  - **Chirurgien ORL** — pour **diagnostiquer et traiter les freins buccaux**\n  - **Dentiste pédiatrique ou spécialiste des freins buccaux** — pour évaluer et traiter les freins buccaux\n  - **Orthophoniste pédiatrique** — pour la **mobilité de la langue**\n  - **Kiné spécialisé en mobilité linguale** — pour la mobilité de la langue" },
              ]
            },
            {
              type: "option", label: "OPTION Pb de succion", emoji: "🤱", style: "purple-btn",
              blocks: [
                { type: "normal", text: "- Je vous inviterai aussi à **vérifier** s'il n'y a **pas de pb de succion** qui pourraient **faire rentrer de l'air dans l'estomac**, qui peut rendre **+ difficile la prise alimentaire**\n\n- Vous pouvez aller voir :\n  - **Pédiatre** à voir en 1er\n  - **Consultante IBCLC** : Observera la prise de sein et identifiera les pb de succion / positionnement + exercices à faire + si bib : changement de biberon\n  - **Chirurgien ORL ou ORL** : **Si frein** de langue ou lèvre suspecté\n  - **Orthophoniste pédiatrique** : En cas de **difficulté de coordination** entre la **succion / déglutition / respiration**" },
              ]
            },
          ]},
          { id: "conf_rgo", label: "Conseils RGO", cardLabel: "Conseils RGO", cardEmoji: "🤮", autoCheckIfPbs: ["rgo_seul"], blocks: [
            {
              type: "normal",
              _leftTitle: "Reflux = gêne",
              text: "- Très souvent, derrière cet inconfort, on retrouve …le **reflux**.\n- Le reflux, c'est **qqch** qui est **très fréquent** chez les BB…\n- parfois, il PEUT ETRE **discret** et **pas toujours évident** à **repérer.**\n  ⇒ Mais il peut **vraiment gêner**, surtout en **position allongée**…\n  ⇒ et du coup, **forcément,** ça peut **impacter le sommeil**\n\n- Donc, concrètement, il y a **plusieurs petits ajustements** qui peuvent déjà **faire une vraie différence**",
              trailingInfoButtons: [
                {
                  label: "Causes du RGO",
                  title: "Causes du RGO",
                  blocks: [
                    { type: "normal", text: "- Il peut y avoir **différentes causes** :\n  - <u>**Mécanique**</u> :\n    - Système digestif immature : **Sphincter Inférieur de l'œsophage (SIO) immature** *(anneau musculaire entre l'œsophage et l'estomac pas assez développé pour se contracter efficacement et maintenir le contenu du bol gastrique dans l'estomac)*\n    - Tensions corporelles\n    - Freins restrictifs\n    - Pb de succion\n  - <u>**Alimentaire**</u> :\n    - Allergie\n    - Œsophage court\n    - Bcp d'horizontalité\n    - Bcp d'alimentation liquide *(ex : bouteille d'eau à l'horizontal)*\n    - Trop d'alimentation\n    - Système digestif immature : microbiote immature" }
                  ]
                },
                {
                  label: "Gorge rouge =<br>acidité OU bcp de pleurs",
                  title: "Gorge rouge = acidité OU bcp de pleurs",
                  blocks: [
                    { type: "normal", text: "- La **gorge rouge** ne signifie **pas toujours** que le **reflux est acide** et **irrite la gorge** (⇒ traitement donné à tort)\n  ⇒ Ça peut AUSSI être un **symptôme d'un BB qui pleure beaucoup**" }
                  ]
                }
              ]
            },
            {
              type: "courbe_cards_grid",
              items: [
                {
                  id: "rgo_alim", emoji: "🍽", label: "Alimentation",
                  blocks: [
                    { type: "normal", text: "- **Autour des repas**, il y a aussi **quelques points importants** :" },
                    { type: "normal", _leftTitle: "Allaitement au sein", showIfAlim: ["Allaitement au sein"], text: "Je vous encourage grandement à :\n- ✅ Garder l'allaitement **à la demande**\n  ⇒ 🎓 *Le lait maternel a un **effet « pansement »** sur l'œsophage*\n  ⇒ 🎓 *Le fait de **donner à la demande**, va lui permettre de **prendre suffisamment de lait** MEME s'il régurgite beaucoup*\n\n- ✅ Favoriser les **prises alimentaires** dans un **environnement calme et peu stimulant**\n  ⇒ 🎓 *Les bébés avec du reflux ont besoin de beaucoup de calme*\n\n- ✅ Adapter la **position d'allaitement**\n  ⇒ 🎓 *La position « Biological Nurturing » sera la + adaptée : Maman semi-allongée, semi-inclinée, et bébé posé au-dessus ventre contre ventre*\n\n- ✅ Idéalement proposer un **temps d'alimentation** au **réveil des siestes** (ou dans les 30 min)\n  ⇒ 🎓 *C'est le meilleur moment pour nourrir un enfant, car il aura l'énergie suffisante pour boire efficacement*\n\n- ✅ Proposer des **« pauses » entre les prises** de 5 à 10 min avec des balancements\n  ⇒ 🎓 *Limite l'air dans l'estomac et les remontées*\n\n- ✅ Maintenir bébé **20 à 30 min en position verticale** après avoir mangé *(portage, écharpe, bébé contre l'épaule)*\n  ⇒ 🎓 *Pour éviter que le lait remonte dans l'œsophage et crée une œsophagite*\n\n- ❌ Évitez les **positions trop horizontales** trop rapidement **après la tétée** *(ex : transat, poser bébé immédiatement allongé)*\n  ⇒ 🎓 *L'horizontalité ou la compression de l'estomac favorise le reflux*\n\n- ✅ Faire un **rot à la fin du repas**\n  ⇒ 🎓 *Pour supprimer au maximum l'air dans l'estomac qui pourrait créer des remontées*\n\n- ✅ **Dissocier l'alimentation et le sommeil**\n  ⇒ 🎓 *La multiplication des prises alimentaires empêche la verticalisation après les repas ⇒ entretient le reflux*\n  ⇒ 🎓 *Peut favoriser une stratégie dépendante à l'endormissement*\n\n- ✅ Déposer bébé sur un **lit à plat**\n  ⇒ 🎓 *Diminue le risque de Mort Inattendue du Nourrisson*\n\n- ✅ Déposer bébé **sur le dos** OU alors **le faire en conscience** du risque\n  ⇒ 🎓 *Diminue le risque de Mort Inattendue du Nourrisson*\n\n\n- 💡 *La demi-vidange gastrique du lait maternel est de 36 min en moyenne*\n- 👏 Et c'est le **meilleur lait** pour un BB !" },
                    { type: "normal", _leftTitle: "Au biberon", showIfAlim: ["Allaitement au biberon", "Biberon lait infantile"], text: "Je vous encourage à :\n- ❌ À **ne PAS changer plusieurs fois de lait** à la suite\n  ⇒ 🎓 *temps d'adaptation = 2 semaines*\n\n- ✅ Idéalement proposer un **temps d'alimentation** au **réveil des siestes** (ou dans les 30 min)\n  ⇒ 🎓 *C'est le meilleur moment pour nourrir un enfant, car il aura l'énergie suffisante pour boire efficacement*\n\n- ✅ Au niveau de la **tétine du biberon**, vérifier le **débit de la tétine**\n  ⇒ 🎓 *Avec un débit trop lent, bébé avale de l'air ; avec un débit trop rapide, le reflux est aggravé*\n\n- ✅ Tester éventuellement un **biberon anti-reflux**\n  ⇒ 🎓 *Peut aider certains bébés*\n\n- ✅ Vérifier la **reconstitution du lait** : 1) l'eau 2) la poudre\n  ⇒ 🎓 *Un lait mal reconstitué peut priver un enfant d'apports nutritionnels et créer une déshydratation*\n\n- ✅ **Fractionner les prises** avec des biberons **+ petits mais + fréquents** (toutes les 2-3h30 environ)\n  ⇒ 💡 *La demi-vidange gastrique du lait infantile est de 74 min en moyenne ⇒ cela limite la distension de l'estomac et des remontées acides*\n\n- ✅ Favoriser les prises alimentaires dans un **environnement calme et peu stimulant**\n  ⇒ 🎓 *Les bébés avec du reflux ont besoin de beaucoup de calme*\n\n- ✅ Proposer des **« pauses » entre les prises** de 5 à 10 min avec des balancements\n  ⇒ 🎓 *Limite l'air dans l'estomac et les remontées*\n\n- ✅ Maintenir bébé **20 à 30 min en position verticale** après avoir mangé *(portage, écharpe, bébé contre l'épaule, portage physiologique)*\n  ⇒ 🎓 *Pour éviter que le lait remonte dans l'œsophage et crée une œsophagite*\n\n- ❌ Évitez les **positions trop horizontales** juste **après la tétée** *(ex : transat, poser bébé immédiatement allongé)*\n  ⇒ 🎓 *L'horizontalité ou la compression de l'estomac favorise le reflux*\n\n- ✅ Faire un **rot à la fin du repas**\n  ⇒ 🎓 *Pour supprimer au maximum l'air dans l'estomac qui pourrait créer des remontées*\n\n- ✅ Déposer bébé sur un **lit à plat**\n  ⇒ 🎓 *Diminue le risque de Mort Inattendue du Nourrisson*\n\n- ✅ Déposer bébé **sur le dos** OU alors **le faire en conscience** du risque\n  ⇒ 🎓 *Diminue le risque de Mort Inattendue du Nourrisson*" },
                  ]
                },
                {
                  id: "rgo_journee", emoji: "☀️", label: "Journée",
                  blocks: [
                    { type: "normal", _leftTitle: "Verticalité et calme", text: "- Déjà, en journée, tout ce qui va **favoriser la verticalité** et **le calme** …va l'aider.\n  - ✅ N'hésitez pas à utiliser le **portage** ⇒ aide à maintenir la verticalité pour soulager l'inconfort et apaiser BB\n  - ❌ Eviter les **positions recroquevillées** ⇒ qui comprime l'estomac *(ex : transat)*\n  - ❌ Eviter aussi de **trop stimuler** BB ⇒ Il a besoin de **bcp calme** *(ex : jouets à piles, écrans, environnement bruyant)*\n  - ❌ Eviter les **manipulations juste après les repas** ⇒ le liquide remonte + facilement si on manipule trop un enfant\n  - ❌ Eviter les **vêtements qui serrent** le ventre ⇒ Comprime l'estomac *(ex : vêtements avec des élastiques, couches trop serrées)*\n- L'idée, c'est vraiment de ne **pas comprimer l'estomac** et de **laisser la digestion se faire tranquillement**." },
                  ]
                },
                {
                  id: "rgo_rituel", emoji: "🌙", label: "Rituel du soir",
                  blocks: [
                    { type: "normal", _leftTitle: "Lait en 1er + routine", text: "- Le soir, l'idée, c'est d'être **encore plus doux** :\n  - ❌ Éviter les **sur-stimulations** avant le coucher\n  - ✅ Anticiper le **change AVANT le lait** ⇒ les manipulations peuvent faire remonter le reflux\n  - ✅ Mettre en place une **routine** ⇒ sécurise et diminue le stress. Les pleurs peuvent aggraver l'irritation de l'œsophage *(ex : repas → temps calme → rituel → coucher)*\n\n- 💡 Un bébé **suffisamment verticalisé la journée**, PEUT ne **pas** avoir **besoin d'être verticalisé la nuit**" },
                  ]
                },
              ]
            },
            {
              type: "normal",
              _leftTitle: "Autres vérifications",
              text: "- Et si malgré tout ça, vous **sentez que ça ne s'améliore pas**, ça peut **valoir le coup** de vérifier s'il n'y a **pas autre chose derrière** :\n  - Vérifier les **tensions corporelles** qui pourraient être à l'**origine** du reflux *(ex : si accouchement long, traumatisant, position dans le ventre)*\n    ⇒ Chez un **ostéopathe pédiatrique**\n  - Vérifier les **freins de bouche** qui pourraient faire **rentrer de l'air dans l'estomac**\n    ⇒ Chez un **ORL pédiatrique**"
            },
            {
              type: "normal",
              text: "- Vérifier s'il n'y a pas de **problèmes de succion** qui pourraient faire **rentrer de l'air dans l'estomac**\n  ⇒ Auprès d'une **conseillère en lactation IBCLC** spécialisée en détection de problème de succion.{{if-feedodo}} Nous avons **Fanny Rieusec** chez Fée Dodo qui pourrait vous aider sur ce sujet{{/if-feedodo}}",
              trailingInfoButton: {
                label: "IBCLC pb de succion",
                title: "Conseillère en lactation IBCLC",
                blocks: [
                  { type: "normal", text: "- 💉 **Conseillère en lactation IBCLC : Fanny Rieussec** *(chez Fée Dodo)* qui pourra vous **aider sur les problèmes de succion**" },
                  { type: "normal", _noBorder: true, text: "<table style=\"border-collapse:collapse;width:100%;font-size:13px;line-height:1.4;margin-top:10px\"><thead><tr><th style=\"background:#eef2ff;border:1px solid #94a3b8;padding:8px;color:#1e3a8a;text-align:left\">Spécialité</th><th style=\"background:#eef2ff;border:1px solid #94a3b8;padding:8px;color:#1e3a8a;text-align:left\">Nom</th><th style=\"background:#eef2ff;border:1px solid #94a3b8;padding:8px;color:#1e3a8a;text-align:center\">Tarif</th><th style=\"background:#eef2ff;border:1px solid #94a3b8;padding:8px;color:#1e3a8a;text-align:left\">Réseau</th><th style=\"background:#eef2ff;border:1px solid #94a3b8;padding:8px;color:#1e3a8a;text-align:left\">Remarque</th></tr></thead><tbody><tr><td rowspan=\"2\" style=\"border:1px solid #94a3b8;padding:8px;background:#f8fafc;font-weight:700;vertical-align:top\">Consultante en lactation IBCLC</td><td style=\"border:1px solid #94a3b8;padding:8px\">Fanny Rieussec <em>(Objectif Tétées)</em></td><td style=\"border:1px solid #94a3b8;padding:8px;text-align:center\">95€</td><td style=\"border:1px solid #94a3b8;padding:8px\">Réseau Fée Dodo</td><td style=\"border:1px solid #94a3b8;padding:8px\"></td></tr><tr><td style=\"border:1px solid #94a3b8;padding:8px\">Cécile Sérillon <em>(SOS allaitement 33)</em></td><td style=\"border:1px solid #94a3b8;padding:8px\"></td><td style=\"border:1px solid #94a3b8;padding:8px\"></td><td style=\"border:1px solid #94a3b8;padding:8px\"></td></tr><tr><td rowspan=\"2\" style=\"border:1px solid #94a3b8;padding:8px;background:#f8fafc;font-weight:700;vertical-align:top\">Diététicienne nutritionniste pédiatrique</td><td style=\"border:1px solid #94a3b8;padding:8px\">Tiffany Deroyer</td><td style=\"border:1px solid #94a3b8;padding:8px;text-align:center\">75€</td><td style=\"border:1px solid #94a3b8;padding:8px\">Réseau Fée Dodo</td><td style=\"border:1px solid #94a3b8;padding:8px\">Souvent pris en charge par la Mutuelle</td></tr><tr><td style=\"border:1px solid #94a3b8;padding:8px\">Julia Mellanger <em>(L'avocat Nutritionniste)</em></td><td style=\"border:1px solid #94a3b8;padding:8px\"></td><td style=\"border:1px solid #94a3b8;padding:8px\"></td><td style=\"border:1px solid #94a3b8;padding:8px\"></td></tr><tr><td style=\"border:1px solid #94a3b8;padding:8px;background:#f8fafc;font-weight:700\">Frein restrictif</td><td style=\"border:1px solid #94a3b8;padding:8px\">Virginie Ferrandez <em>(Parents en confiance)</em></td><td style=\"border:1px solid #94a3b8;padding:8px\"></td><td style=\"border:1px solid #94a3b8;padding:8px\"></td><td style=\"border:1px solid #94a3b8;padding:8px\"></td></tr><tr><td style=\"border:1px solid #94a3b8;padding:8px;background:#f8fafc;font-weight:700\">Frein Restrictif</td><td style=\"border:1px solid #94a3b8;padding:8px\">Annuaire Chirobliss <em>(chiropracteurs)</em></td><td style=\"border:1px solid #94a3b8;padding:8px\"></td><td style=\"border:1px solid #94a3b8;padding:8px\"></td><td style=\"border:1px solid #94a3b8;padding:8px\"></td></tr></tbody></table>" }
                ]
              }
            },
            {
              type: "normal",
              text: "- Surveiller les **allergènes alimentaires**\n  ⇒ car il y a toujours la **possibilité d'allergie**, notamment APLV",
              trailingInfoButton: {
                label: "Traitements médicaux",
                title: "Traitements médicaux du reflux",
                blocks: [
                  { type: "normal", text: "- Même avec tous ces ajustements, il **arrive parfois** que le **reflux reste gênant**.\n  ⇒ Dans ce cas, **des traitements médicaux peuvent être proposés** pour **soulager** certains symptômes, surtout si le **reflux est douloureux**.\n  ⇒ Ils peuvent vraiment **apporter du confort**\n  ⇒ et parfois, c'est **nécessaire pendant un temps**\n\n- ⚠️ **Mais l'important,** c'est de ne PAS **SE CONTENTER de masquer les symptômes**\n  Si :\n  - on **agit uniquement sur ce qui se voit** (les reflux)\n  - **sans chercher** ce qui les **provoque** *(troubles de succion, allergie, suralimentation, tensions corporelles…)*,\n    ⇒ l'amélioration peut être **partielle ou temporaire**\n\n---\n\n- L'idée n'est **PAS d'éviter un traitement** si nécessaire,\n  mais plutôt de **chercher en parallèle** ce qui **provoque l'inconfort.**" },
                  { type: "normal", _noBorder: true, text: "<details class=\"rgo-treatments-root\" style=\"border:2px solid #fcd34d;border-radius:10px;background:#fffbeb;padding:10px 14px;margin-top:12px\"><summary style=\"cursor:pointer;font-weight:800;color:#7c2d12;user-select:none;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:15px\"><span>Traitements disponibles (sous avis médical)</span><span style=\"font-size:13px\">▾</span></summary><div style=\"margin-top:12px;display:flex;flex-direction:column;gap:8px\"><details style=\"border-left:3px solid #fcd34d;padding:6px 10px 6px 12px;background:#fff\"><summary style=\"cursor:pointer;font-weight:700;color:#7c2d12;user-select:none;list-style:none\">▸ Changement de lait</summary><div style=\"margin-top:6px;padding-left:10px;font-size:14px;line-height:1.6\"><ul style=\"margin:0;padding-left:20px\"><li>Lait <strong>épaissi</strong></li><li>ou <strong>Anti-reflux</strong></li></ul>⇒ <strong>masque les symptômes</strong> mais ne <strong>résout pas la cause</strong> du reflux</div></details><details style=\"border-left:3px solid #fcd34d;padding:6px 10px 6px 12px;background:#fff\"><summary style=\"cursor:pointer;font-weight:700;color:#7c2d12;user-select:none;list-style:none\">▸ Traitements médicaux</summary><div style=\"margin-top:6px;padding-left:10px;display:flex;flex-direction:column;gap:6px\"><details style=\"border-left:2px dashed #fde68a;padding:4px 8px;background:#fffef5\"><summary style=\"cursor:pointer;font-weight:700;color:#7c2d12;list-style:none\">▸ Gaviscon</summary><div style=\"margin-top:4px;font-size:13.5px;line-height:1.55\"><ul style=\"margin:0;padding-left:18px\"><li>Forme une <strong>nappe sur le bol gastrique</strong> pour <strong>éviter les remontées</strong> + <strong>diminue l'acidité</strong> de l'estomac pour soulager l'œsophagite<ul style=\"margin:2px 0 0 18px\"><li>⚠️ À donner AVANT le repas car l'estomac est le plus acide</li><li>⚠️ Provoque des <strong>selles dures / diarrhées</strong></li></ul></li></ul></div></details><details style=\"border-left:2px dashed #fde68a;padding:4px 8px;background:#fffef5\"><summary style=\"cursor:pointer;font-weight:700;color:#7c2d12;list-style:none\">▸ Polysilane</summary><div style=\"margin-top:4px;font-size:13.5px;line-height:1.55\"><ul style=\"margin:0;padding-left:18px\"><li><strong>Anti-flatulant</strong></li><li><strong>Tapisse l'œsophage</strong> pour protéger de l'acidité qui peut remonter + effet apaisant sur la brûlure</li><li>⚠️ Sucré donc l'enfant s'apaise mais pas forcément le reflux</li></ul></div></details><details style=\"border-left:2px dashed #fde68a;padding:4px 8px;background:#fffef5\"><summary style=\"cursor:pointer;font-weight:700;color:#7c2d12;list-style:none\">▸ IPP (Inexium, Mopral, Omeprazole)</summary><div style=\"margin-top:4px;font-size:13.5px;line-height:1.55\"><ul style=\"margin:0;padding-left:18px\"><li><strong>Diminue l'acidité</strong> de l'estomac pour soulager l'œsophagite</li><li>MAIS <strong>ne diminue pas les reflux</strong></li><li>⚠️ Pas de mise sur le marché avant l'âge d'1 an</li></ul></div></details></div></details><details style=\"border-left:3px solid #fcd34d;padding:6px 10px 6px 12px;background:#fff\"><summary style=\"cursor:pointer;font-weight:700;color:#7c2d12;user-select:none;list-style:none\">▸ Incliner le matelas 20°</summary><div style=\"margin-top:6px;padding-left:10px;font-size:14px;line-height:1.6\"><ul style=\"margin:0;padding-left:20px\"><li>Vous pouvez <strong>incliner son matelas de 15-20°</strong> avec des <strong>dispositifs spéciaux</strong> (sous avis médical)</li><li>⚠️ L'<strong>OMS préconise</strong> de mettre un <strong>BB à plat</strong> dans son lit pour prévenir le risque de Mort Inattendue du Nourrisson</li></ul></div></details></div></details>" }
                ]
              }
            },
            { type: "normal", _leftTitle: "Résumé", _catBg: true, text: "- **En résumé**,\n- avec un **BB qui a du reflux**, on va surtout **l'aider à digérer tranquillement** :\n  - En **fractionnant les repas**, plutôt que de donner de grandes quantités d'un coup\n  - En **gardant BB bien vertical** après les repas, pendant environ 20 minutes\n  - En **favorisant un environnement calme** et une **routine régulière**, car stress et fatigue peuvent accentuer le reflux\n- **Avec** ces **petits changements**, [prénom_enfant] sera **beaucoup + à l'aise**… et trouvera plus facilement le **chemin du sommeil.**" },
          ]},
        ]
      },
      {
        id: "nutrition", title: "Nutrition", emoji: "🍽️",
        children: [
          // À compléter
        ]
      },
      {
        id: "rythme", title: "Rythme (Organisation de la journée)", emoji: "⏰",
        children: [
          // À compléter
        ]
      },
      {
        id: "strategie", title: "Stratégie de sommeil", emoji: "😴",
        children: [
          { id: "strat_tetine", label: "Tétine", cardLabel: "Tétine", cardEmoji: "🍼", autoCheckIfPbs: ["souhait_tetine", "strategie_tetine"],
            blocks: [
              { type: "normal", text: "- Maintenant, on **va parler \"tétine\"**\n  **PUISQU'on** EN A **discuté** ensemble\n  et que **vous souhaitez…**" },
              { type: "normal",
                showIfAnyOf: [
                  { pb: "souhait_tetine" },
                  { tickbox: { cid: "obj_tetine_static", value: "supprimer" } },
                  { tickbox: { cid: "strategie_tetine_choice", value: "supprimer" } },
                  { tickbox: { cid: "strategie_tetine_choice", value: "hybride" } }
                ],
                text: "- Il y a **plusieurs moyens de la supprimer**\n  1. Il y a l'option **\"DIRECT\"**… comme un **pansement qu'on arrache**\n     ⇒ On **y va \"franco\"**, on **coupe TOUTES les tétines** de la **maison**\n     ⇒ et comme ça il n'y a **plus de risque** de **retour en arrière !**\n\n  2. Il y a aussi des **livres** que vous pouvez **lire avec** [prénom_enfant]\n     ⇒ je pense à *\"La tétine de Nina\"* de Christine Naumann\n\n  3. Ce qui **peut marcher aussi** (pour les petits enfants)\n     ⚠️ mais c'est **à vous de voir** si vous **êtes à l'aise** avec ça,\n     ⇒ C'est d'**utiliser** la **\"pensée imaginaire\"** :\n     ⇒ **De dire**… qu'**on donne** la tétine **au Père Noël**, à la **Fée**, au **bébé**…"
              },
              { type: "normal",
                showIfRealAgeMinMonths: 24,
                showIfAnyOf: [
                  { pb: "souhait_tetine" },
                  { tickbox: { cid: "obj_tetine_static", value: "supprimer" } },
                  { tickbox: { cid: "strategie_tetine_choice", value: "supprimer" } },
                  { tickbox: { cid: "strategie_tetine_choice", value: "hybride" } }
                ],
                text: "- Il y a aussi des **tétines de sevrage**, je pense notamment à la **Tétine Clipp** *(une méthode progressive)*\n- On **met des collerettes** (x5) sur **l'embout de la tétine** *(c'est une tétine spéciale)* pour **réduire** de + en + **la taille de la zone de succion**\n\n<div style=\"background:#fef3c7;border:1.5px solid #fcd34d;border-radius:10px;padding:10px 14px;margin-top:10px\"><strong>Tétine Clipp (20€)</strong><br><a href=\"https://www.clipp.fr/clipp-tetine/\" target=\"_blank\" rel=\"noopener\" style=\"color:#b45309\">https://www.clipp.fr/clipp-tetine/</a></div>"
              },
              { type: "normal",
                showIfRealAgeMinMonths: 36,
                showIfAnyOf: [
                  { pb: "souhait_tetine" },
                  { tickbox: { cid: "obj_tetine_static", value: "supprimer" } },
                  { tickbox: { cid: "strategie_tetine_choice", value: "supprimer" } },
                  { tickbox: { cid: "strategie_tetine_choice", value: "hybride" } }
                ],
                text: "- Et enfin, il y a les boîtes **\"Stop Tétine\"** qui s'adressent aux **enfants qui SOUHAITENT arrêter la tétine**\n- Avec un mélange de : stickers, tableau motivationnel, guide explicatif pour les parents…\n\n<div style=\"background:#fef3c7;border:1.5px solid #fcd34d;border-radius:10px;padding:10px 14px;margin-top:10px\"><strong>Boîte \"Stop tétine\" (30€)</strong><br><a href=\"https://www.latribuhappykids.com/products/boite-stop-tetine\" target=\"_blank\" rel=\"noopener\" style=\"color:#b45309\">latribuhappykids.com/products/boite-stop-tetine</a></div>"
              },
              { type: "normal",
                showIfAnyOf: [
                  { pb: "souhait_tetine" },
                  { tickbox: { cid: "obj_tetine_static", value: "supprimer" } },
                  { tickbox: { cid: "strategie_tetine_choice", value: "supprimer" } },
                  { tickbox: { cid: "strategie_tetine_choice", value: "hybride" } }
                ],
                text: "- Je vous conseille de **toujours commencer par un soir**, car :\n  - la **pression de sommeil**\n  - et la **sécrétion de la mélatonine** vont **aider** vers un 1er endormissement + serein *(vs pour une sieste)*\n\n- Même si ça peut **faire peur aux parents de supprimer la tétine**\n  ⇒ en général, **elle** est **oubliée** en **qq jours !**"
              },
              { type: "normal",
                showIfAnyOf: [
                  { tickbox: { cid: "obj_tetine_static", value: "garder" } },
                  { tickbox: { cid: "strategie_tetine_choice", value: "garder" } }
                ],
                text: "- Dans ce cas, l'**objectif** va être d'**aider** [prénom_enfant] à DEVENIR **autonome AVEC SA tétine**\n  - On va lui **\"apprendre\"** à :\n    - la **retrouver**\n    - la **remettre dans sa bouche SEUL**\n\n  1. La **1ère étape**, ça va être de **lui mettre la tétine** dans **SA main** et de **guider son bras** et **sa main**… **vers sa bouche**\n\n  2. La **2nde étape**, ça va être de lui **mettre la tétine**, **NON PAS** dans **SA main**… mais **PRÈS de sa main**\n     - pour qu'[il_elle] puisse :\n       - la **retrouver**\n       - et **la mettre dans sa bouche**\n\n  3. Vous pouvez **pratiquer ces exercices plusieurs fois**, pour qu'[il_elle] puisse **développer sa motricité** et **son autonomie**"
              },
              { type: "normal", _noBorder: true,
                showIfAnyOf: [
                  { tickbox: { cid: "obj_tetine_static", value: "garder" } },
                  { tickbox: { cid: "strategie_tetine_choice", value: "garder" } }
                ],
                text: "<div style=\"background:#fef3c7;border:1.5px solid #fcd34d;border-radius:10px;padding:12px 16px;color:#7c2d12;font-size:14px;line-height:1.55\">💡 <strong>En combien de temps, [il_elle] acquiert cette compétence ?</strong><br>Ça va dépendre de :<ul style=\"margin:6px 0 6px 20px;padding:0\"><li>du <strong>nombre de fois</strong> que vous allez <strong>répéter le geste</strong></li><li>de SA <strong>motricité</strong></li><li>… de SON <strong>envie d'aller vers le changement !</strong></li></ul>⇒ L'<strong>âge moyen</strong> est autour de <strong>6 et 7 mois</strong></div>"
              },
              { type: "normal",
                showIfAnyOf: [
                  { tickbox: { cid: "obj_tetine_static", value: "garder" } },
                  { tickbox: { cid: "strategie_tetine_choice", value: "garder" } }
                ],
                text: "- 💡 Vous pouvez aussi mettre **plusieurs tétines dans le lit** *(idéalement fluorescentes)*, pour qu'[il_elle] puisse les **retrouver + facilement la nuit.**"
              },
              { type: "normal",
                showIfTickbox: { cid: "strategie_tetine_choice", value: "hybride" },
                text: "- Si vous souhaitez **aller vers ce mode \"hybride\"** : *\"Ok pour la tétine mais pas TOUT le temps\"*\n  ⇒ je vous conseille d'**être cohérent dans votre approche**\n\n  pour que [prénom_enfant] puisse avoir les **MÊMES stratégies d'endormissement**\n\n  - Si c'est **OK** pour garder la tétine **pendant les siestes** ⇒ alors il **aura sa tétine** pour **TOUTES ses siestes**\n  - Si ce n'est **PAS OK** pour **la garder la nuit** ⇒ alors il **dormira SANS** sa tétine **TOUTES les nuits**\n    ⇒ sinon ça **peut devenir confus**… et **compliquer l'endormissement**"
              },
            ]
          },
        ]
      },
      {
        id: "env", title: "Environnement de sommeil", emoji: "🏠",
        children: [
          // À compléter
        ]
      },
      {
        id: "relationnel", title: "Enjeux relationnels", emoji: "💬",
        children: [
          // À compléter
        ]
      },
    ]
  },

  // ── PLAN D'ACTION ─────────────────────────────────────────
  planAction: [

    {
      id: "plan_confort",
      problematiqueId: "rgo_seul",
      title: "Plan – Levier Confort (RGO)",
      emoji: "👌",
      blocks: [
        { type: "normal", text: "Avant de passer aux conseils concrets sur le sommeil,\nje voudrais qu'on s'attarde un peu sur le confort physique de [prénom_enfant].\n\nPour moi, c'est un point essentiel, parce que :\n⇒ même si on met en place tout ce qu'il faut pour le sommeil,\n⇒ si votre BB ressent une gêne ou un inconfort\n⇒ son sommeil restera toujours compliqué. Quoi qu'il arrive !\n\n💭 Imaginez-vous, dans un beau palace de la côte d'Azur, dans une chambre magnifique avec un matelas confortable…\n\nSi le repas de la veille n'a pas été bien digéré,\nvous allez passer une très mauvaise nuit,\nmême si toutes les conditions sont réunies POUR bien dormir.\n\nPour [prénom_enfant], c'est exactement la même chose !" },
        { type: "normal", text: "Très souvent, derrière cet inconfort, on retrouve… le reflux.\n\n💡 La gorge rouge ne signifie pas toujours que le reflux est acide et irrite la gorge (traitement donné à tort)\n⇒ Ça peut AUSSI être un symptôme d'un BB qui pleure beaucoup" },
        { type: "separator", text: "Causes du RGO" },
        { type: "normal", text: "Il peut y avoir différentes causes :\n\nMécanique :\n→ Système digestif immature (SIO immature)\n→ Tensions corporelles\n→ Freins restrictifs\n→ Problème de succion\n\nAlimentaire :\n→ Allergie\n→ Œsophage court\n→ Beaucoup d'horizontalité\n→ Beaucoup d'alimentation liquide\n→ Trop d'alimentation\n→ Microbiote immature" },
        { type: "separator", text: "✅ Conseils pratiques – Journée" },
        { type: "conseil", text: "✅ N'hésitez pas à utiliser le portage ⇒ aide à maintenir la verticalité pour soulager l'inconfort et apaiser BB\n❌ Éviter les positions recroquevillées ⇒ qui compriment l'estomac (ex: transat)\n❌ Éviter aussi de trop stimuler BB ⇒ il a besoin de calme pour digérer\n✅ Favoriser les prises alimentaires dans un environnement calme et peu stimulant\n✅ Adapter la position d'allaitement : La position Biological Nurturing sera la + adaptée (Maman semi-allongée, bébé posé au-dessus ventre contre ventre)\n✅ Idéalement proposer un temps d'alimentation au RÉVEIL des siestes (ou dans les 30min) ⇒ c'est le meilleur moment pour nourrir un enfant\n✅ Proposer des 'pauses éructation' pendant les repas\n✅ Mettre en place une routine ⇒ sécurise et diminue le stress. Les pleurs peuvent aggraver l'irritation de l'œsophage\n\n💡 La demi vidange gastrique du lait maternel est de 36min en moyenne\n💡 Un bébé suffisamment verticalisé la journée, PEUT ne pas avoir besoin d'être verticalisé la nuit" },
        { type: "separator", text: "✅ Conseils pratiques – Biberon" },
        { type: "conseil", text: "✅ Vérifier le débit de la tétine ⇒ Avec un débit trop lent, bébé avale de l'air; Avec un débit trop rapide, le reflux est aggravé\n✅ Tester éventuellement un biberon anti-reflux\n✅ Vérifier la reconstitution du lait : 1) l'eau 2) la poudre ⇒ Un lait mal reconstitué peut priver un enfant d'apports nutritionnels et créer une déshydratation\n✅ Fractionner les repas plutôt que de donner de grandes quantités d'un coup\n✅ Garder BB bien vertical après les repas, pendant environ 20 minutes" },
        {
          type: "option", label: "💊 Traitements disponibles (sous avis médical)",
          blocks: [
            { type: "important", text: "Changement de lait :\n→ Lait épaissi ou Anti-reflux ⇒ masque les symptômes mais ne résout pas la cause\n\nTraitements médicaux :\n→ Gaviscon : forme une nappe sur le bol gastrique + diminue l'acidité\n   ⚠️ À donner AVANT le repas (l'estomac est le plus acide)\n   ⚠️ Provoque des selles dures/diarrhées\n→ Polysilane : anti-flatulant, tapisse l'œsophage pour protéger de l'acidité\n   ⚠️ Sucré donc l'enfant s'apaise mais pas forcément le reflux\n→ IPP (Inexium, Mopral, Omeprazole) : Diminue l'acidité MAIS ne diminue pas les reflux\n   ⚠️ Pas de mise sur le marché avant l'âge d'1 an\n→ Incliner le matelas 20° (dispositifs spéciaux, sous avis médical)\n   ⚠️ L'OMS préconise de mettre un BB à plat dans son lit pour prévenir le risque de MIN\n\n⚠️ L'important, c'est de ne PAS SE CONTENTER de masquer les symptômes\nL'idée n'est PAS d'éviter un traitement si nécessaire,\nmais plutôt de chercher en parallèle ce qui provoque l'inconfort." }
          ]
        },
        {
          type: "option", label: "🌿 OPTION : Allergie suspectée (APLV)",
          blocks: [
            { type: "normal", text: "Dans ce qu'on a discuté tout à l'heure, il y a quelques petites choses qui me font penser à une possible allergie." },
            { type: "checklist", label: "Vous m'avez parlé de :", items: [
              "Eczéma / peau atopique",
              "Régurgitations en jet sur tout le temps d'éveil / lait caillé",
              "Respiration sifflante / bruits de dinosaure",
              "Ronflements / dort la bouche ouverte",
              "Sphère ORL : otites à répétition, bronchite à répétition",
              "Nez pris H24 / toux chronique",
              "Selles diarrhéiques",
              "Contact direct avec PLV à la maternité",
            ]},
            { type: "important", text: "À cet âge, on pense parfois à l'allergie aux protéines de lait de vache… même si bien sûr, ça reste une piste parmi d'autres (ex: œuf, fruits à coques, poisson/crustacé…)\n\nL'APLV est plus courante qu'on ne le pense — chez les BB présentant un RGO, on estime qu'environ 40% sont concernés\n\n💡 Les laits de jument, brebis, chèvre, ânesse, soja ont des propriétés très proches du lait de vache\n⇒ À 92%, il y a des allergies croisées !" },
            { type: "conseil", text: "Protocole si suspicion d'APLV :\n\n1. Aller voir votre médecin avec l'arbre décisionnel de l'HAS\n   → lui dire que [prénom_enfant] a les symptômes x et y\n   → et qu'il faudrait qu'il vous adresse vers un spécialiste (allergologue)\n\n2. Si le médecin est OK → ÉVICTION de PLV pendant 2-4 semaines sous supervision :\n   Option bib 🍼 : Lait aux protéines hydrolysées aux PLV, lait aux acides aminés ou lait de riz\n   ⚠️ Partir sur le lait conseillé par le médecin\n   Option Maman allaitante 🤱 : Éviction du lait de vache dans votre alimentation\n   ⚠️ Pensez aux carences en fer et calcium — compléments sous avis médical\n\n3. Après 2-4 semaines → Ré-introduction encadrée par un professionnel\n   ⇒ SEULE une ré-introduction permet de valider une APLV avec le retour OU NON des symptômes\n\n💉 Aide : diététicienne nutritionniste pédiatrique (Tiffany Deroyer chez Fée Dodo — souvent pris en charge par la Mutuelle)" },
          ]
        },
      ]
    },

    {
      id: "plan_nutrition",
      problematiqueId: "nutrition_courbe",
      title: "Plan – Levier Nutrition",
      emoji: "🍽️",
      blocks: [
        { type: "normal", text: "On va maintenant aborder un levier important : l'organisation de la journée de [prénom_enfant]\n\nParce qu'en réalité, le sommeil de jour ☀️ et le sommeil de nuit 🌛 sont étroitement liés…\n⇒ ce qui se passe la journée ☀️ A UN IMPACT sur les nuits 🌛 …et inversement !\n\nDonc ici, il y a un vrai équilibre à trouver entre les temps d'éveil, les siestes, leur durée…\ncar sinon, ça peut vite déséquilibrer la machine…" },
        { type: "conseil", text: "Concernant l'alimentation de [prénom_enfant] :\n\n→ Adapter la répartition des apports sur la journée\n→ Respecter les signaux de faim (alimentation à la demande)\n→ Ajuster les volumes à l'âge et aux besoins\n→ Veiller à l'équilibre lait/diversification selon l'âge :\n   → Avant 1 an : le lait reste l'apport n°1\n   → Après 1 an : la diversification devient l'apport n°1, donner lait APRÈS la diversification\n\n💉 Consultante en lactation IBCLC : Fanny Rieusec (Objectif Tétées) – 95€\n💉 Diététicienne nutritionniste pédiatrique : Tiffany Deroyer – 75€ (Réseau Fée Dodo)" },
      ]
    },

    // ── IX. REFORMULATION ET STATISTIQUES ──────────────────
    {
      id: "reformulation",
      title: "IX. Reformulation et statistiques",
      emoji: "📊",
      blocks: [
        { type: "normal", text: "- **Donc si je résume ce qu'on s'est dit !**\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\">❓ C'est <strong>bien ça</strong> ?<br>Est-ce <strong>clair pour vous</strong> ?</div>" },
        {
          type: "option", label: "Pas eu le temps de tout discuter", style: "purple",
          blocks: [
            { type: "normal", text: "- On a **discuté de pas mal de choses**\n- Mais **malheureusement**, on n'a **PAS** eu le temps de **TOUT** discuter\n- Ce que **je vous propose** c'est que l'on **finisse cette discussion** autour d'**un AUTRE RDV**\n<div style=\"background:#fdf0f0;border:2.5px solid #e8a0a0;border-radius:10px;padding:14px 18px;margin:12px 0;font-weight:400;line-height:1.7\">❓ Est-ce que <strong>ça vous irait</strong> ?</div>" },
            {
              type: "option", label: "💰 Tarifs", style: "purple",
              blocks: [
                { type: "tarifs_tableau" }
              ]
            },
            { type: "important", text: "🔥 On **peut se voir** le <strong style=\"color:#C0392B\">XXX</strong>" }
          ]
        },
        { type: "conseil", text: "👏 En tout cas, ON VOIT :\n  - que vous avez **essayé de mettre des choses en place**\n  - et AVEC CE QU'ON **vient de voir ensemble** :\n    - vous avez **toutes les bases**\n    - pour que ça **évolue dans le bon sens** !" },
        { type: "normal", showIfMinMinutesLeft: 8, text: "- Je vous invite à **parler du sommeil régulièrement** à votre enfant\n- Tjs le **prévenir que c'est l'heure du dodo**, qu'il **va aller se reposer**, que ça va lui faire du bien.\n\n---\n\n- N'hésitez AUSSI pas à **remettre de la joie** et du **plaisir autour du sommeil**\n- Pour que, petit à petit dans sa tête se créent 2 nouvelles associations :\n\n  <span style=\"color:#c52f26;padding-left:48px\"><strong>Dormir = Plaisir</strong></span>\n  <span style=\"color:#c52f26;padding-left:48px\"><strong>Fatigue = Dormir</strong></span>\n\n---\n\n- Et pour que ces **nouveaux repères** puissent **vraiment s'installer**,\n- il est **important** que le **chemin que vous choisissez** reste **clair et cohérent**.\n\n- Si vous **êtes convaincus** que c'est :\n  - le **bon chemin**\n  - ET qu'**il n'y en a qu'1**…<br>⇒ ...alors ce sera **+ facile pour vous**\n\n- Et **quand les parents** sont :\n  - **clairs**\n  - **et cohérents** dans **leur tête**…<br>⇒ ...l'**enfant comprend :**\n    - **+ facilement le cadre**\n    - et **trouve naturellement** ses **nouveaux repères.**" },
        { type: "normal", text: "- Voilà, en terme de **statistiques** :" },
        { type: "normal", showIfMinMinutesLeft: 8, text: "- Si le **1er soir** en revanche, ça **dure + de 1h30**\n  - Ce n'est **PAS normal**\n  - C'est y a **qqch qui ne va pas ⇒** Vous **arrêtez là**<br>⇒ Il faut que l'on **re-prenne RDV**" },
        { type: "normal", text: "- **Dans les 3 1ers jours**, vous devriez voir un **DEBUT d'amélioration**\n---\n- Normalement, dans les **2/3 1ères semaines** on peut s'attendre à une **vraie très belle amélioration**\n\n- Les **siestes,** par contre, peuvent **mettre + longtemps** à se mettre en place (**1-2 mois**)<br>⇒ **TOUT** va **dépendre de chaque situation ET** de **chaque enfant**" },
        { type: "normal", showIfMinMinutesLeft: 8, text: "- C'est vraiment **VOUS** qui **gardez la main** :\n  - Sur **le choix** de CE QUE vous **mettez en place OU NON**\n  - à quel **rythme**\n  - C'est **TRES important** que vous vous **sentiez acteur ET libre** dans vos choix" },
      ]
    },

  ],

  // ── CONCLUSION ────────────────────────────────────────────
  conclusion: {
    id: "conclusion",
    title: "X. Validation des objectifs et fin",
    emoji: "✅",
    blocks: [
      { type: "question", text: "Est-ce que **TOUT** ce que je **vous ai proposé** vous **correspond à vos valeurs**?" },
      { type: "obj_rappel" },
      { type: "question", text: "Est-ce que j'ai <strong>répondu à vos objectifs</strong> ?", embeddedActions: [
        {
          label: "OUI", emoji: "✅", style: "action-green", _pillStyle: true, mutexGroup: "conclusion-obj",
          blocks: [
            { type: "question", text: "Est-ce qu'il vous **reste des questions** ?" },
            { type: "question", text: "**QUAND** est-ce que vous **PENSEZ** **pouvoir commencer** à **mettre ces changements en place** ?" },
            {
              type: "option", label: "🔥 Si Pas pris de RDV", style: "purple", _compactClosed: true,
              blocks: [
                { type: "important", text: "- 🔥 Au vu de ce qu'on s'est dit, je pense qu'il serait **intéressant de se revoir**\n\n- Sachant que **vous voulez commencer** le <strong style=\"color:#C0392B\">XXX</strong>, on **peut se voir** le <strong style=\"color:#C0392B\">XXX</strong>" },
                { type: "question", text: "Qu'est-ce que <strong>vous en pensez</strong> ?", embeddedActions: [
                  {
                    label: "💰 Tarifs", style: "purple", _noPurpleStyle: true,
                    blocks: [
                      { type: "tarifs_tableau" }
                    ]
                  }
                ]}
              ]
            },
            { type: "question", text: "Moi, j'ai une **dernière question** pour VOUS qui est **très importante** :\n⇒ Comment vous **vous sentez LÀ,** à **l'idée de mettre** tout ceci **en place** ?" },
            { type: "normal", text: "- C'est super ! J'entends **plein de motivation** ! C'est génial !\n- Je vous **envoie** plein d'**énergie positive / bonnes ondes**\n- Je **vous souhaite** que les **nuits/siestes** de [prénom_enfant] **s'apaisent rapidement**, et que **les vôtres suivent** tout **aussi vite**.\n- Bonne journée !" },
            { type: "fin_consultation", text: "🏁 **FIN DE LA CONSULTATION** 🏁" },
          ]
        },
        {
          label: "NON", emoji: "❌", style: "action", _pillStyle: true, mutexGroup: "conclusion-obj",
          blocks: [
            { type: "normal", text: "- Ok je **vous entends**\n- Et **merci de me le dire** !" },
            {
              type: "option", label: "Si pas OK avec les valeurs/objectifs", emoji: "🤔", style: "purple",
              blocks: [
                { type: "question", text: "Qu'est-CE QUI… **dans ce que j'ai proposé, ne vous ressemble PAS / ne vous parle PAS** ?\nEt à **l'inverse**, qu'est-ce qui serait **+ juste pour vous** ?" }
              ]
            },
            {
              type: "option", label: "Si c'est TROP ⇒ il faut reprendre", emoji: "😮‍💨", style: "purple",
              blocks: [
                { type: "normal", text: "- OK, on est parti sur **qqch d'un peu trop compliqué**\n- **Ce qui compte**, c'est que:\n  - vous vous **sentiez soutenu(e)**,\n  - **PAS sous pression**\n    - ⇒ On **va simplifier**" },
                { type: "question", text: "**Là**, qu'est-ce qui vous **semble faisable, même tout petit** ?\nEst-ce qu'il y a **besoin** de **mettre + de progressivité** ?" }
              ]
            },
            {
              type: "option", label: "Si parent perdu", emoji: "🌀", style: "purple",
              blocks: [
                { type: "question", text: "J'ai **l'impression que c'est flou** pour vous là ⇒ est-ce que **je me trompe** ?" },
                { type: "important", text: "- 🔥 Si je devais vous **proposer 1 seule chose** pour commencer, ce serait <strong style=\"color:#C0392B\">XXX</strong>" }
              ]
            },
            { type: "normal", text: "- Je ne **peux PAS vous laisser** avec qqch qui ne vous **convient PAS** OU qui **n'est PAS aidant** pour vous.\n- Mais là, **malheureusement** je dois **arrêter là**\n- <strong style=\"color:#C0392B\"><u>JE</u></strong> n'ai **PAS pris le bon chemin**\n⇒ on va **trouver un autre chemin ensemble** et qui vous **convienne mieux**\n- MAIS **SI vous êtes d'accord**, je vous **propose qu'on se revoie** (gratuitement) :\n  - pour **reprendre tout ça + tranquillement**\n  - **simplifier**,\n  - et **ajuster** vraiment à **VOTRE rythme.**" },
            { type: "question", text: "<div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:6px 8px;align-items:start\"><span>❓</span><span>•</span><span>Est-ce que <strong>ça vous irait</strong> qu'on <strong>reprogramme un tps ensemble</strong> pour <strong>retravailler les choses + simplement</strong>, à VOTRE rythme ?</span><span></span><span>•</span><span>🔥 Écoutez, le <strong style=\"color:#C0392B\">XXX</strong> à <strong style=\"color:#C0392B\">XXX</strong> heures je suis libre, est-ce que <strong>ça vous conviendrait</strong> ?</span></div>" },
            { type: "normal", text: "- Ok, donc **on se reparle prochainement**\n- **En attendant**, vous pouvez :\n  - vous **reposer sur ce que l'on s'est dit**,\n  - et on **reprendra notre conversation**" },
            { type: "question", text: "Est-ce que c'est **OK pour vous** ?" },
            { type: "normal", text: "- Je vous souhaite une **bonne journée** et à **très bientôt**" },
            { type: "fin_consultation", text: "🏁 **FIN DE LA CONSULTATION** 🏁" }
          ]
        }
      ]},
    ]
  }

};
