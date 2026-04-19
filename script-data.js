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
  'nutri_esp_long': 'Espacement trop long entre 2 prises',
  'nutri_esp_court': 'Espacement trop court entre 2 prises',
  'nutri_vol_petit': 'Volume de biberon trop petit',
  'nutri_vol_gros': 'Volume de biberon trop gros',
  'nutri_vol_longtemps': 'Biberon bu trop longtemps',
  'nutri_tetee': 'Tétée — baisse de lactation',
  'nutri_tetee_longue': 'Tétées longues',
  'nutri_tetee_greve': 'Grève des tétées',
  'nutri_tetee_mode_garde': 'Baisse de lactation — mode de garde',
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
          type: "option", label: "Si pleurs difficiles", emoji: "😭", style: "pleurs",
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
        { type: "question", text: "Maintenant, je **voudrais savoir** :\nSi vous deviez mettre une **note de 0 à 10**, 10 étant la meilleure note, quelle note vous mettriez à :\n\n- **Votre grossesse** ET <u>pour le Papa</u> ?\n- **Votre accouchement** ET <u>pour le Papa</u> ?\n- Et maintenant à **votre ÉTAT D'ÊTRE actuel** (en prenant en compte votre **vie perso/pro/par rapport au sommeil de votre enfant**) ET <u>pour le Papa</u> ?" },
        {
          type: "option", label: "Si Maman en dépression/très fatiguée", emoji: "😭", style: "pleurs",
          blocks: [
            { type: "question", text: "Est-ce que vous êtes **accompagnée** du coup ?" },
            {
              type: "option", label: "Accompagnée avec un psy", emoji: "✅", style: "action-green", mutexGroup: "decouverte-psy",
              blocks: [
                { type: "empathie", text: "- **Super !**\n- **Je comprends…** ce que vous vivez, c'est **vraiment pas simple.**\n- Après une naissance, c'est **NORMAL** de se sentir **fatiguée**, et de se sentir un peu **perdue** par moments.\n- Vous êtes **LOIN** d'être la **SEULE** à passer par là" },
                { type: "conseil", text: "- 👏 Et j'ai envie de vous dire **quelque chose d'important** :\n- vous faites déjà **énormément** pour votre BB\n- Même si parfois, vous avez l'impression **DE NE pas y arriver** ⇒ **EN RÉALITÉ**, vous vous en occupez **très bien**" },
                { type: "empathie", text: "- Le **manque de sommeil**… tous les **changements**… ⇒ forcément, ça joue sur le **moral**\n- Mais ça ne remet absolument **PAS** en question le fait que vous êtes une **bonne maman**\n\n- Et je trouve ça **super** que vous soyez déjà **accompagnée par un professionnel** — C'est une **très bonne démarche** !\n\n- De mon côté, je suis là pour vous **accompagner sur le sommeil** de votre bébé **ET AUSSI** pour vous aider à retrouver un peu de **souffle au quotidien.**\n\n- **Vous n'êtes pas seule**, et vous faites de votre mieux (👏… et c'est **déjà beaucoup**)" }
              ]
            },
            {
              type: "option", label: "PAS accompagnée avec un psy", emoji: "❌", style: "action", mutexGroup: "decouverte-psy",
              blocks: [
                { type: "empathie", text: "- D'accord. **Je comprends…** ce que vous vivez, c'est **vraiment pas simple.**\n- Après une naissance, c'est **NORMAL** de se sentir **fatiguée** et un peu **perdue** par moments.\n- Vous êtes **LOIN** d'être la **SEULE** à passer par là." },
                { type: "conseil", text: "- 👏 Vous faites déjà **énormément** pour votre BB\n- Même si parfois, vous avez l'impression **DE NE pas y arriver** ⇒ **EN RÉALITÉ**, vous vous en occupez **très bien**" },
                { type: "empathie", text: "- Et si à un moment vous ressentez le **besoin d'en parler**, de ne **PAS rester seule** avec tout ça…\n- Ça peut être : votre **médecin**, votre **sage-femme**, ou un **psychologue.**\n- L'idée : de ne **PAS garder tout ça pour vous**, et d'avoir un **espace pour en parler.**\n\n- De mon côté, je suis là pour vous **accompagner sur le sommeil** **ET aussi** pour vous aider à retrouver un peu de **souffle au quotidien.**\n\n- Mais je voulais aussi que vous gardiez en tête que :\n  - → **vous n'êtes pas seule,**\n  - → que vous faites de votre mieux (👏… et c'est **déjà beaucoup**)" }
              ]
            },
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
            { type: "normal", text: "- J'ai aussi une **petite question** par rapport au **LIEU de sommeil**\n- Aujourd'hui, votre enfant **dort dans VOTRE chambre**" },
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
            { type: "normal", text: "- J'ai également une **question** concernant la **position de sommeil** de [prénom_enfant].\n- Aujourd'hui, elle **semble s'endormir sur le ventre**… c'est devenu **SA stratégie** pour **trouver le sommeil**…\n  - c'est **quelque chose** que l'on **observe souvent** chez les BB car c'est la **position la + physiologique** pour le corps\n\n- **Néanmoins**, je dois aussi vous **partager les recommandations de l'OMS**…\n  - …qui **encouragent** à **poser son enfant** sur le **DOS**…\n  - …car cette position **diminue significativement le risque de Mort Inattendue du Nourrisson**\n\n- Il n'y a **PAS** de **bonne ou mauvaise réponse**… SEULEMENT CELLE qui **correspond à vos besoins** !" },
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
      ]
    },

    // ── V. DIAGNOSTIC ─────────────────────────────────────
    {
      id: "diagnostic",
      title: "V. Diagnostic",
      emoji: "🩺",
      blocks: [
        { type: "normal", text: "- OK, là super, j'ai eu **beaucoup d'information**\n- MERCI !\n\n- **Maintenant, j'ai :**\n  - une **vue PLUS globale** de la situation\n  - ET des **solutions à mettre en œuvre**" },
        { type: "separator", text: "📊 Besoins de sommeil selon l'âge" },
        { type: "normal", text: "- D'après les **données consolidées** de la **National Sleep Foundation** (États-Unis) ET le **laboratoire français d'étude du sommeil** :\n\n- Votre enfant a des <strong style=\"color:#c0392b\">BESOINS</strong> pour son âge\n- ⚠️ Je parle toujours en **<span style=\"border-bottom:1px dashed currentColor;cursor:help\" title=\"L'âge qu'aurait eu votre enfant s'il était né à terme. Cela permet de connaître l'âge de maturation du cerveau.\">âge CORRIGÉ</span>**" },
        {
          type: "besoins_sommeil",
          tranches: [
            { age: "0-2 mois", nuit: "8h-10h (entrecoupé tps alimentation)", jour: "8h-10h", total: "16h-20h (moy. 17-18h)", siestes: "–" },
            { age: "2-3 mois", nuit: "9h-12h (1 à 3 tps alimentation)", jour: "5h-6h", total: "14h-18h (moy. 16-17h)", siestes: "3 à 6 siestes" },
            { age: "4-7 mois", nuit: "10h-13h (1 à 3 tps alimentation)", jour: "4h-5h", total: "14h30-18h (moy. 15-16h)", siestes: "3 à 4 siestes" },
            { age: "8-14 mois", nuit: "10h-13h (moy. 11-12h ininterrompue)", jour: "2h30-4h", total: "13h-17h (moy. 14-15h)", siestes: "2 siestes (voire 3 jusqu'à 10 mois)" },
            { age: "15 mois – 2 ans", nuit: "10h-13h (moy. 11-12h ininterrompue)", jour: "2h-4h", total: "13h-16h (moy. 13h30-14h30)", siestes: "1 à 2 siestes" },
            { age: "2-3 ans", nuit: "10h-13h (moy. 11-12h ininterrompue)", jour: "2h-4h", total: "13h-16h (moy. 13h30-14h30)", siestes: "1 sieste" },
            { age: "4-5 ans", nuit: "11h-13h (moy. 11-12h)", jour: "2h-3h ou 45 min temps calme", total: "12h-16h (moy. 13-14h)", siestes: "1 sieste ou temps calme" },
          ]
        },
        { type: "separator", text: "📋 Difficultés identifiées" },
        {
          type: "option", label: "Pas de dette de sommeil", emoji: "✅", style: "action-green", _purpleContent: true, mutexGroup: "diag-sommeil",
          blocks: [
            { type: "normal", text: "- La **bonne nouvelle** c'est qu'aujourd'hui [prénom_enfant] n'est **PAS en dette de sommeil**" },
            { type: "conseil_vert", text: "👏 Vous faites **TOUT** pour que ça ne **soit pas le cas**!" },
            { type: "normal", text: "**<u>Au niveau du tps d'endormissement :</u>** Par contre, je vois des **difficultés** sur la **durée d'endormissement** … qui est **très long**", _purpleDark: true },
            { type: "normal", text: "**<u>Au niveau du nombre de siestes …</u>** Par contre, je peux voir que le **nombre de siestes** … ne **correspond PAS** aux **besoins** d'un enfant de **cet âge**", _purpleDark: true },
          ]
        },
        {
          type: "option", label: "Difficultés de sommeil identifiées", emoji: "❌", style: "action", _purpleContent: true, mutexGroup: "diag-sommeil",
          blocks: [
            { type: "normal", text: "- Au vu de ce qu'on s'est dit\n- En effet, vous aviez **BIEN identifié** que votre enfant a des **difficultés de sommeil**.", _noBorder: true },
            { type: "normal", text: "**<u>⏱ Temps d'endormissement trop long :</u>** Il y a une **petite problématique** au niveau des **durées d'endormissement**… qui sont **très longues**", _purpleDark: true },
            { type: "normal", text: "**<u>⏰ Durée des siestes trop courte :</u>** Il y a aussi un **petit caillou** concernant la **durée des siestes**… qui sont **très courtes**", _purpleDark: true },
            { type: "normal", text: "**<u>🔢 Nombre de siestes inadapté :</u>** Il y a aussi **quelque chose à travailler** au niveau du **nombre de siestes**… qui ne **correspondent PAS** forcément aux **besoins de son âge**", _purpleDark: true },
          ]
        },
        {
          type: "option", label: "Difficultés alimentaires IDENTIFIÉES (courbes en déclin)", emoji: "🍼", style: "action-yellow", _purpleContent: true,
          blocks: [
            { type: "normal", text: "- Je valide **AUSSI des difficultés alimentaires** parce que…\n- En effet,", _noBorder: true },
            { type: "normal", text: "**<u>Au niveau des courbes qu'on a vues ensemble,</u>** il y a quelque chose qui se joue", _purpleDark: true },
            { type: "normal", text: "**<u>Au niveau des différents symptômes que vous m'avez partagé,</u>** il y a quelque chose à creuser", _purpleDark: true },
            { type: "normal", text: "**<u>Au niveau de son inconfort,</u>** pour [prénom_enfant] il faudrait comprendre pourquoi il est ainsi", _purpleDark: true },
            { type: "normal", text: "- Du coup, il y a **BIEN quelque chose** qui **NE VA PAS** du côté de la **nutrition**", _noBorder: true },
          ]
        },
        { type: "normal", _noBorder: true, text: "<div style=\"width:fit-content;max-width:100%;margin:0 auto;text-align:left;background:#ffffff;padding:16px 22px;border-radius:12px;border:1px solid #c8d3e5;box-shadow:0 2px 6px rgba(45,63,92,0.08)\"><ul style=\"margin:0;padding-left:20px\"><li style=\"line-height:1.6\">MAIS la <strong>bonne nouvelle</strong> c'est que :</li><li style=\"line-height:1.6\"><strong>TOUT</strong> ce que vous m'avez partagé a du sens, est <strong>explicable</strong></li><li style=\"line-height:1.6\">Mais <strong>SURTOUT</strong> que c'est <strong>solutionnable</strong> !</li><li style=\"line-height:1.6\">ET que je peux vous <strong>accompagner</strong> pour les troubles du sommeil de [prénom_enfant]</li></ul></div>" },
        { type: "separator", text: "⚙️ Leviers identifiés" },
        { type: "leviers_dynamiques" },
        { type: "leviers_count" },
        { type: "normal", text: "- On aura **PEUT-ÊTRE pas le temps** de tout voir aujourd'hui :\n- mais on pourra **toujours reprendre un RDV plus tard** pour **discuter des points** que l'on n'aura **pas eu le temps de voir aujourd'hui.**\n\n- Donc, **CE QUE je vois en 1er**, c'est **quelque chose au niveau de**…" },
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
          type: "option", label: "Objectifs faisables", emoji: "✅", style: "action-green", mutexGroup: "objectifs-revus",
          blocks: [
            { type: "normal", text: "- Par rapport aux **objectifs que vous avez donné**\n- ⇒ moi ce que **je pense** c'est que c'est **tout à fait COHÉRENT et FAISABLES**" }
          ]
        },
        {
          type: "option", label: "Objectifs PAS faisables", emoji: "⚠️", style: "action", mutexGroup: "objectifs-revus",
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
        { type: "normal", text: "- Il va y avoir **plusieurs chemins possibles** pour accompagner [prénom_enfant],\n  - et l'**idée** c'est vraiment de **trouver celui qui vous correspond le mieux**\n\n- Pour ça, j'aurais **besoin de savoir** :\n  - Est-ce que vous avez **BESOIN** **ça aille plutôt vite**,\n  - OU est-ce que vous **préférez mettre** un **peu + de progressivité** ?\n\n  - Sachant que la **progressivité pas à pas** sera:\n    - **+ douce**\n    - **MAIS + longue** en terme de résultats\n  - Tandis que le **chemin le + direct** permet de:\n    - **faire évoluer les choses + rapidement**\n    - mais **PEUT générer + d'émotions**\n\n- Donc, c'est **vraiment vous qui choisissez** le chemin en fonction de :\n  - ce que **vous préférez**\n  - de ce que vous **attendez en terme de rapidité**\n  - et VOTRE **gestion des émotions**" },
        { type: "question", text: "<div style=\"display:grid;grid-template-columns:auto auto 1fr;gap:6px 8px;align-items:start\"><span>❓</span><span>•</span><span>Avec tout ça en tête, qu'est-ce qui vous <strong>semblerait le + juste</strong> pour vous et pour [prénom_enfant] :</span></div><ul style=\"margin:6px 0 0 60px;padding:0;list-style:disc\"><li style=\"line-height:1.6\"><strong>Quelque chose</strong> de <strong>plutôt progressif,</strong></li><li style=\"line-height:1.6\">Ou <strong>quelque chose</strong> de <strong>+ rapide ?</strong></li></ul>" },
        { type: "normal", text: "- Du coup, je préfère vous dire, pour **être totalement transparente** avec vous :\n  - QUAND on **met en place des changements**\n  - **même** avec **beaucoup de progressivité**,\n  - **il PEUT y avoir des émotions**\n  - surtout **au début.**\n    - ⇒ C'est tout à fait **NORMAL**\n\n- On va demander à [prénom_enfant] de **changer ses habitudes** et elle PEUT :\n  - **réagir**\n  - et **montrer qu'elle n'est pas d'accord**\n\n- Dans ces moments-là, CE QUI va **vraiment l'aider** c'est :\n  - que vous **soyez à ses côtés**\n  - et que **vous l'accompagniez** avec **COHERENCE**…\n- 👏… et avec **tout ce que vous avez déjà mis en place**, vous êtes **sur la bonne voie**" },
        { type: "question", text: "Est-ce que vous êtes **à l'aise avec ça, avec les émotions** ?" },
        {
          type: "option", label: "OUI", emoji: "✅", style: "action-green", mutexGroup: "chemins-emotions",
          blocks: [
            { type: "normal", text: "- Alors, **si ça vous va :**\n  - On va pouvoir **passer à la suite,**\n  - et **voir concrètement** COMMENT on **va mettre ça en place**" }
          ]
        },
        {
          type: "option", label: "NON", emoji: "❌", style: "action", mutexGroup: "chemins-emotions",
          blocks: [
            { type: "normal", text: "- **Merci** de me le dire, c'est **vraiment important pour MOI** de le savoir.\n- **Je comprends…** c'est **difficile d'entendre son enfant pleurer**\n- Et franchement, **personne n'aime ça**\n\n- Et **CE QUE** je peux vous **dire TOUT DE SUITE**\n  ⇒ c'est qu'**ON NE** va **PAS laisser** [prénom_enfant] **seul** avec ses pleurs.\n\n- **Par contre**, il y a **quelque chose d'important** à comprendre :\n  - Les **pleurs chez l'enfant**, c'est surtout une **façon de communiquer.**\n\n- Aujourd'hui, on va **lui demander de changer une habitude** … et **comme pour nous,**\n  - **le changement**\n  - **personne n'aime ça !**\n\n- Donc oui, c'est **possible** qu'**il réagisse**,\n  - qu'il **proteste**\n  - ou qu'il **pleure**\n  - pour dire **\"*je préférais avant*\"**\n  ⇒ Et ça… c'est une **réaction normale**\n\n- L'idée, encore une fois, c'est vraiment de **VOUS respecter**\n- On va simplement :\n  - **adapter l'accompagnement**\n  - pour que ce soit le **+ confortable** possible **POUR VOUS**.\n\n- On pourra aller vers quelque chose :\n  - de **+ progressif**\n  - avec des **ajustements tout en douceur**\n  - et vous **POURREZ avancer à VOTRE rythme**\n\n- Et surtout, **vous ne SEREZ PAS SEULE**\n- On va **LE faire ensemble**\n- … ET LUI il aura **SURTOUT besoin** :\n  - de sentir que **VOUS êtes là**\n  - et CE QUE **vous SAVEZ ce que vous faites**" },
            { type: "normal", text: "<br><br><br>" },
            { type: "normal", text: "- Alors, **si ça vous va** :\n  - On va pouvoir **passer à la suite,**\n  - et **voir concrètement COMMENT** on va **mettre ça en place**" }
          ]
        },
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
        { type: "normal", text: "- **Je peux voir** qu'il y a un **qqch au niveau** des **apports alimentaires**.\n\n- **Avant de travailler le sommeil**, on vient toujours **s'assurer que les besoins nutritionnels** d'un enfant **sont bien couverts**\n  car **un corps qui manque d'énergie** aura + **de mal :**\n  - **à s'apaiser**\n  - et **enchaîner ses cycles**\n\n- En **tant que consultantes,** on va s'**appuyer** sur des **repères fiables,** comme les **courbes** de poids, la taille, le périmètre crânien\n  *D'ailleurs **je vous invite** vivement à **demander** à votre médecin de **prendre les MESURES** à **chaque RDV***\n- On peut **voir les courbes** un peu comme **notre tableau de bord** : elles **nous aident à savoir** si le **corps** reçoit **assez d'énergie** pour **soutenir** un **sommeil de qualité**" },
        { type: "normal", _purpleDark: true, text: "🔥 Donc **quand on a lu les courbes**, on a **pu voir** que [prénom_enfant] est **[ne_nee] autour** du <strong style=\"color:#dc2626\">XX</strong>ᵉ percentile.\n<em>OPTION</em> : S'il a voulu remonter : ET a **même réussi à monter** au <strong style=\"color:#dc2626\">XX</strong>ᵉ percentile\nPuis progressivement, [il_elle] s'est **[stabilise_stabilisee] autour** du <strong style=\"color:#dc2626\">XX</strong>ᵉ percentile.\n⇒ **Concrètement**, cela signifie qu'[il_elle] a **perdu <strong style=\"color:#dc2626\">XX</strong> couloirs** depuis <strong style=\"color:#dc2626\">sa naissance / sa tentative de montée</strong>." },
        { type: "normal", text: "- **En général**, un enfant **suit plutôt le couloir** dans LEQUEL **il est né**\n  ⇒ c'est son **couloir de référence**\n- Dans **certains cas**, certains enfants **peuvent même DEPASSER** leur **couloir de référence :**\n  - Par exemple, lorsqu'ils ont un **fort potentiel génétique** (si les **parents sont grands**, par exemple),\n  - OU **lorsque les enfants sont nés** un peu en **dessous de leur potentiel.**\n    ⇒ On parle alors de **rattrapage de courbe**.\n- Donc, il est **tout à fait possible** que [prénom_enfant] :\n  - **atteigne un couloir supérieur** à son **couloir de référence**\n  - et fasse ce **rattrapage**," },
        { type: "normal", _purpleDark: true, text: "🔥 <em>OPTION</em> : il a voulu remonter : comme [il_elle] **l'a montré** lors de sa **tentative de remontée de courbe** !" },
        { type: "normal", text: "- Les courbes, ça va **nous donne** une **bonne indication**,\n  mais ça reste un **repère**.\n  ⇒ Le **+ important,** c'est vraiment d'ETRE **à l'écoute de son enfant**" },
        { type: "normal", showIfAgeMaxMonths: 9, showIfAlim: ["Biberon lait infantile","Allaitement au biberon","Allaitement mixte"], text: "- Il y a un **2nd repère qu'on utilise** pour **se guider** : c'est la **règle d'Appert**\n- Elle nous donne des **indications sur la quantité \"théorique\" par 24h** en **fonction du poids,**" },
        { type: "normal", showIfAgeMaxMonths: 9, showIfAlim: ["Biberon lait infantile","Allaitement au biberon","Allaitement mixte"], text: "- 🔥 Aujourd'hui, [prénom_enfant] pèse **[poids]** kg\n  et vous me dites qu'[il_elle] boit environ <strong style=\"color:#dc2626\">XX</strong> mL sur 24 heures." },
        {
          type: "normal", showIfAgeMaxMonths: 9, showIfAlim: ["Biberon lait infantile","Allaitement au biberon","Allaitement mixte"],
          text: "- Si on se réfère à la **règle d'Appert**, ses besoins théoriques en lait seraient plutôt autour de **[besoin_lait_volume]** par jour (voire plus !).",
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
        { type: "normal", showIfAgeMaxMonths: 9, showIfAlim: ["Biberon lait infantile","Allaitement au biberon","Allaitement mixte"], text: "⇒ Ca veut dire que **là aussi,** il y a un **écart** ENTRE **ses besoins** et ses **apports actuels**\n- Mais **ce n'est pas une règle stricte**, c'est **juste un repère** pour nous aider.\n- On reste surtout sur **une logique d'*à la demande***, surtout chez les plus petits.\n- **Tous les BB** n'ont **pas :**\n  - **exactement le même rythme**\n  - et **leurs besoins** peuvent **varier d'un jour à l'autre.**\n  ⇒ On se fie surtout à leurs **signes de faim et de satiété**." },
        { type: "normal", text: "- Donc, si on **prend un peu de recul** sur tout ça…\n  on peut voir qu'il y a **AUSSI :**\n  - **d'AUTRES plusieurs petites choses**\n  - AUTOUR de son **alimentation**\n  - qui peuvent **jouer un rôle** sur son **sommeil**" },
        { type: "normal", text: "- Je pense notamment…" },
        { type: "option_banner", leverId: "nutri_esp_long", emoji: "⏱️", showIfPb: "nutri_esp_long", variant: "orange" },
        { type: "normal", showIfPb: "nutri_esp_long", text: "- 🔥 L'**intervalle entre 2 prises** alimentaires peut être parfois assez long (<strong style=\"color:#dc2626\">XX</strong> heures)\n- A cet âge, les enfants ont **besoin de prises + rapprochés** pour s'**adapter** à leur **signaux de faim.**\n- **🎓On devrait** normalement **leur donner** : \"***à la demande***\"\n- Et se **défaire** complètement du **mythe des espacements de 4h**, .. qui n'est **basé sur RIEN du TOUT**!\n- Avec des **espacements longs, [prénom_enfant]** a du **mal à \"TENIR\" jusqu'à la prochaine prise alimentaire**\n  ⇒ On **peut imaginer** qu'[il_elle] est **comme \"affamé\"** entre 2 prises alimentaires" },
        { type: "option_banner", leverId: "nutri_esp_court", emoji: "⏳", showIfPb: "nutri_esp_court", variant: "orange" },
        { type: "normal", showIfPb: "nutri_esp_court", text: "- 🔥 L'**espacement entre 2 prises** alimentaires est **parfois très rapprochés** (<strong style=\"color:#dc2626\">XX</strong> heures)\n  ⇒ [prénom_enfant] n'a **PAS TOUJOURS le temps** d'**avoir** vraiment **faim**\n  ⇒ ce qui peut **limiter le volume pris** ... **par prise alimentaire**" },
        { type: "option_banner", leverId: "nutri_vol_petit", emoji: "🍼", showIfPb: "nutri_vol_petit", variant: "orange" },
        { type: "normal", showIfPb: "nutri_vol_petit", text: "- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez petit** pour :\n  - **son âge**\n  - **et ses besoins**\n  ⇒ Ca se **rapproche +** de la **taille des biberons d'un nourrisson**\n  ⇒ **SI** les **biberons sont petits** : la **sensation d'être RASSASIE** se **dissipe** assez **vite**" },
        { type: "option_banner", leverId: "nutri_vol_gros", emoji: "🍼", showIfPb: "nutri_vol_gros", variant: "orange" },
        { type: "normal", showIfPb: "nutri_vol_gros", text: "- 🔥 Le **volume** des biberons (<strong style=\"color:#dc2626\">XX</strong>ml) est **assez conséquent** par **rapport au volume de son estomac** (**souvent** on **suit ce qui est inscrit** sur les **boites de lait**)\n  ⇒ C'est **comme s'il était \"gavé\"**\n  ⇒ et **son estomac** doit **gérer une quantité importante** à chaque biberon\n  ⇒ ce qui peut **parfois entraîner une digestion + difficile...**" },
        { type: "normal", _purpleDark: true, showIfPb: "nutri_vol_gros", text: "🔥 <em>OPTION</em> — Reflux : ... qui peut **favoriser le reflux**" },
        { type: "option_banner", leverId: "nutri_vol_longtemps", emoji: "⏳", showIfPb: "nutri_vol_longtemps", variant: "orange" },
        { type: "normal", showIfPb: "nutri_vol_longtemps", text: "- Les biberons sont **parfois bus pendant très longtemps** (souvent **pour terminer les quantités indiquées sur les boîtes de lait**)\n  ⇒ Ce qui peut **brouiller les signaux** naturels **de faim** et de **satiété**" },
        { type: "option_banner", emoji: "🤱", label: "🤱 Baisse de la lactation", showIfPb: ["nutri_tetee","nutri_tetee_longue","nutri_tetee_greve","nutri_tetee_mode_garde"], variant: "orange" },
        { type: "option_banner", leverId: "nutri_tetee_longue", emoji: "🤱", showIfPb: "nutri_tetee_longue", variant: "orange", subLevel: true },
        { type: "normal", showIfPb: "nutri_tetee_longue", text: "- Les **tétées** SEMBLENT **être assez longues**\n- 🎓La durée des tétées MOYENNE est normalement autour de 20min\n  ⇒ On dirait que BB **cherche à avoir +**, mais qui **n'arrive pas à** avoir tout **ce dont il a besoin**" },
        { type: "option_banner", leverId: "nutri_tetee_greve", emoji: "🙅", showIfPb: "nutri_tetee_greve", variant: "orange", subLevel: true },
        { type: "normal", showIfPb: "nutri_tetee_greve", text: "- Vous m'avez aussi parlé du refus de certaines tétées" },
        { type: "option_banner", leverId: "nutri_tetee_mode_garde", emoji: "👶", showIfPb: "nutri_tetee_mode_garde", variant: "orange", subLevel: true },
        { type: "normal", showIfPb: "nutri_tetee_mode_garde", text: "- ...Ce sont des choses qui **peuvent arriver** lors d'un **changement de rythme**\n  notamment quand un **BB commence un mode de garde**\n  ⇒ car la **stimulation de vos seins** est **moins importante en journée**" },
        { type: "normal", showIfPb: ["nutri_tetee","nutri_tetee_longue","nutri_tetee_greve"], text: "- Et comme le **corps fonctionne** à la **demande,**\n  ⇒ ça **peut influencer** sur la **quantité de lait** que **boit** [prénom_enfant]\n- **Et surtout**, c'est qqch :\n  - de **fréquent**\n  - et sur lequel on peut **facilement agir**\n- **Heureusement,** il y a des **solutions qui existent** pour **re-booster la lactation**\n  et je vous en **reparlerai** un petit peu **plus tard**" },
        { type: "conseil_vert", showIfPb: ["nutri_tetee","nutri_tetee_longue","nutri_tetee_greve"], text: "👏 Et je voudrais couper court à **certaines idées reçues :**\n- **Comme QUOI** les BB allaités **ne dorment PAS MOINS BIEN** que les BB **au biberon !**\n- **L'allaitement n'est PAS un problème** pour le sommeil\n  **⇒ Beaucoup** de **BB allaités dorment très bien**\n  **⇒ Et les réveils nocturnes** font surtout **partie du développement NORMAL** du sommeil… **allaités ou non**" },
      ]
    },

    // ─── ORGANISATION DE LA JOURNÉE ──────────────────────
    {
      id: "rythme_general",
      problematiqueId: "rythme_general",
      title: "Organisation de la journée",
      emoji: "⏰",
      blocks: [
        { type: "option_banner", leverId: "rythme_te_trop_long", emoji: "⏱", showIfPb: "rythme_te_trop_long", variant: "green" },
        { type: "normal", showIfPb: "rythme_te_trop_long", text: "- Ce que j'observe, c'est que parfois, les **temps d'éveil de [prénom_enfant]** sont un **peu longs**.\n- Et ça, c'est **qqch de très fréquent**\n  ⇒ ce n'est PAS **toujours évident** de **trouver le bon rythme.**\n\n- Mais quand un **temps d'éveil** est **trop long** :\n  - le **cerveau** passe en **sur-stimulation**\n  - c'est-à-dire qu'il n'arrivera **pas à traiter toutes les informations** après la **fin de son tps d'éveil**\n\n*💭 C'est comme si vous étiez dans une **boîte de nuit à 3h du matin** : il y a du bruit, des lumières, du monde…*\n\n- Du coup :\n  - le **corps va réagir**\n  - et **sécréter du cortisol** (hormone de l'éveil)\n  - pour **« rester éveillé »**\n  - *(💭 un peu **comme nous avec le café !**)*\n\n- **MAIS tant** que ce **taux de cortisol restera élevé** :\n  - ça sera **difficile de s'endormir**\n  - et **difficile de RESTER endormi**\n  ⇒ On **rentre alors** dans un **cercle vicieux** *(tps d'éveil long → fatigue → sécrétion du cortisol → difficulté à l'endormissement → fatigue → cortisol élevé…)*\n\n- Grosso modo, MÊME SI ÇA peut **paraître un peu paradoxal** :\n  - **PLUS** les **temps d'éveil sont longs**\n  - **PLUS** **[prénom_enfant]** est **[fatigue_fatiguee]**,\n  - **PLUS** son **corps VA [le_la] AIDER** à **rester [eveille_eveillee]**" },
        { type: "normal", showIfPb: "rythme_te_long_siestes_courtes", text: "  - ⇒ d'où la **problématique** des **siestes courtes**" },
        { type: "normal", showIfPb: "rythme_te_long_reveils_matinaux", text: "  - ⇒ d'où la **problématique** des **réveils matinaux**" },
        { type: "question", showIfPb: "rythme_te_trop_long", text: "- L'**idée serait donc** de **RACCOURCIR un peu** les **temps d'éveil** pour **retrouver un rythme** qui soit **+ en lien** avec :\n  - ses **besoins**\n  - et **son âge**\n- Et les **choses** vont se **mettre NATURELLEMENT EN PLACE** au niveau de **SON sommeil**\n\n⇒ Est-ce que **ça vous parle** jusque là ?" },
        { type: "option_banner", leverId: "rythme_te_trop_court", emoji: "⏳", showIfPb: "rythme_te_trop_court", variant: "green" },
        { type: "normal", showIfPb: "rythme_te_trop_court", text: "- Ce que **je vois parfois**, c'est que les **temps d'éveil** de **[prénom_enfant]** peuvent être un **peu courts**.\n- C'est **très fréquent**, surtout quand ON VEUT **bien faire** et **respecter son rythme.**\n\n- Quand un **temps d'éveil** est **trop court** :\n  - le **corps** n'a **PAS** eu le temps d'**accumuler assez de fatigue**,\n  - c'est-à-dire que :\n    - quand **[prénom_enfant]** **sera [pose_posee] dans son lit**\n    - [il_elle] ne sera **PAS ASSEZ [fatigue_fatiguee]** pour **dormir**\n  - Du coup :\n    - l'**endormissement** peut **devenir un moment « d'attente »**\n    - petit à petit, [il_elle] peut **associer** le **sommeil** à **qqch de négatif**" },
        { type: "normal", showIfPb: "rythme_te_court_siestes_courtes", text: "- **Dans la journée**, des « petits » temps d'éveil peuvent se **traduire de 2 façons** :\n  1. SOIT par **PLUSIEURS petites siestes**\n     ⇒ mais ça, c'est **plutôt le rythme d'un enfant + jeune**\n  2. SOIT par **des siestes très courtes**\n     ⇒ souvent **limitées à 1 seul cycle de sommeil**\n     ⇒ Et **SI** ces siestes ne sont **pas prolongées** :\n     - la **fatigue** continue de **s'accumuler**\n     - et le **corps réagit** en sécrétant du **cortisol**, l'hormone de l'éveil.\n     - Ça **[le_la] donne un petit boost** pour **« tenir le coup »**\n     - *(💭 un peu **comme nous avec le café !**)*\n\n     - **MAIS tant** que ce **taux de cortisol restera élevé** :\n       - ça sera **difficile de s'endormir**\n       - et **difficile de RESTER [endormi_endormie]**" },
        { type: "normal", showIfPb: "rythme_te_court_siestes_courtes", text: "- On **retrouve** alors un **cercle vicieux** : *courte sieste → fatigue → sécrétion de cortisol → difficulté pour rester [endormi_endormie] → sieste courte →*" },
        { type: "normal", showIfPb: "rythme_te_court_siestes_courtes", text: "- Et ça peut aussi **expliquer** la **problématique des réveils matinaux**" },
        { type: "question", showIfPb: "rythme_te_trop_court", text: "- L'**idée serait d'AUGMENTER un peu** les **temps d'éveil** pour **retrouver un rythme** qui soit **+ en lien** avec :\n  - ses **besoins**\n  - et **son âge**\n- Et les **choses** vont se **mettre NATURELLEMENT EN PLACE** au niveau de **SON sommeil**\n\n⇒ Est-ce que **ça vous parle** jusque là ?" },
        { type: "option_banner", leverId: "rythme_siestes_courtes", emoji: "💤", showIfPb: "rythme_siestes_courtes", variant: "green" },
        { type: "normal", showIfPb: "rythme_siestes_courtes", text: "- Aujourd'hui, **[prénom_enfant]** fait des **siestes assez courtes**,\nsouvent limitées à **1 seul cycle de sommeil**.\n- Or à cet âge-là, [il_elle] aurait plutôt besoin **d'enchainer plusieurs cycles de sommeil** pour **vraiment récupérer.**\n- et on voit qu'[il_elle] n'**ARRIVE PAS à enchainer plusieurs cycles**\n\n- Le problème c'est que **SI** **[prénom_enfant]** fait **des siestes très courtes**\n⇒ **ET** que ces siestes ne sont **pas prolongées** :\n  - la **fatigue** continue de **s'accumuler**\n  - et le **corps réagit** en sécrétant du **cortisol**, l'hormone de l'éveil.\n  - Ça **lui donne un petit boost** pour **« tenir le coup »**\n  - *(💭 un peu **comme nous avec le café !**)*\n\n- **MAIS tant** que ce **taux de cortisol restera élevé** :\n  - ça sera **difficile de s'endormir**\n  - et **difficile de RESTER [endormi_endormie]**\n- On **retrouve** alors un **cercle vicieux** : *courtes siestes → fatigue + rapidement → sécrétion de cortisol → difficulté de sommeil → siestes courtes…*" },
        { type: "question", showIfPb: "rythme_siestes_courtes", text: "- L'**idée serait** de **RALLONGER ses siestes** pour **ramener un quota** de sommeil qui soit **+ en lien avec** :\n  - **ses besoins**\n  - et **son âge**\n- Et les **choses** vont se **mettre NATURELLEMENT EN PLACE** au niveau de **SON sommeil**\n\n⇒ Est-ce que **ça vous parle** jusque là ?" },
        { type: "option_banner", leverId: "rythme_horaires_aleatoires", emoji: "🎲", showIfPb: "rythme_horaires_aleatoires", variant: "green" },
        { type: "normal", showIfPb: "rythme_horaires_aleatoires", text: "- Ce que j'**ai entendu**,\nc'est que **le rythme** de **[prénom_enfant]** peut **BEAUCOUP varier** d'un **jour à l'autre**\nnotamment au **niveau des siestes**\n\n- Du coup, QUAND les **horaires changent beaucoup** :\n  - le **corps** a un peu + **de mal à anticiper**\n  - car il **ne SAIT pas** toujours **QUAND** il va **pouvoir dormir**\n  - et donc **QUAND il faut qu'il se prépare pour dormir**\n  ⇒ et donc, ça sera **+ difficile** pour **[prénom_enfant]** d'**aller dormir** parce que son corps **manque de** :\n    - **repères**\n    - et de **prévisibilité**\n\n*💭 Un peu comme si vous vous **couchiez CERTAINS soirs à 20h** et des fois à **2h du matin !**" },
        { type: "question", showIfPb: "rythme_horaires_aleatoires", text: "- Donc l'**idée serait** de **retrouver** un **rythme + PRÉVISIBLE** pour **ramener** un peu **+ de régularité** ?\n- Et les **choses** vont se **mettre NATURELLEMENT EN PLACE** au niveau de **SON sommeil**\n\n⇒ Est-ce que **ça vous parle** jusque là ?" },
        { type: "option_banner", leverId: "rythme_activite_physique", emoji: "🏃", showIfPb: "rythme_activite_physique", variant: "green" },
        { type: "normal", showIfPb: "rythme_activite_physique", text: "- Ce que **je remarque** aussi, c'est que **[prénom_enfant]** a des **moments dans la journée** :\n  - où [il_elle] est **plutôt calme**\n  - où [il_elle] **bouge un peu moins.**\n- Et ça, **c'est normal**, il y a **toujours des moments comme ça** dans une journée\n\n- Cependant, à cet âge-là, les **enfants ont AUSSI besoin** de :\n  - **bouger**\n  - **explorer,**\n  - **tester leur corps**…\n  ⇒ **C'EST ÇA** qui **VA les aider à CRÉER** ce qu'on appelle la **pression de sommeil**,\n  ⇒ CELLE qui aide à **bien s'endormir le soir**\n\n*💭 C'est un peu comme si, **un dimanche,** vous **restiez** toute la **journée** dans **votre lit.**\nVous ne **dormez pas forcément,** mais vous faites des **activités calmes** :*\n- *lire*\n- *regarder votre téléphone*\n- *regarder une série à la TV…*\n\n*Au final, votre **corps** ne s'est **PAS vraiment dépensé** pdt la journée.*\n*⇒ Et **le soir**, vous avez souvent + **de mal à vous endormir***\n*parce que votre **corps n'a pas accumulé assez** de **fatigue physique**.*\n\n- Pour **[prénom_enfant]**, c'est un peu **la même chose** :\n  - [sil_sielle] a eu **PEU d'occasions de bouger,**\n  - [il_elle] **accumule MOINS de pression de sommeil**\n  - et l'**endormissement peut être + difficile**" },
        { type: "question", showIfPb: "rythme_activite_physique", text: "- Donc l'**objectif serait** de **lui proposer DAVANTAGE de moments** pour **bouger** et **explorer…** ⇒ pour **favoriser** son **endormissement.**\n- Et les **choses** vont se **mettre NATURELLEMENT EN PLACE** au niveau de **SON sommeil**\n\n⇒ Est-ce que **ça vous parle** jusque là ?" },
        { type: "option_banner", emoji: "🌅", label: "🌅 Réveils matinaux", showIfPb: ["rythme_reveil_decalage","rythme_reveil_fatigue","rythme_reveil_relationnel","rythme_reveil_mange","rythme_reveil_faim","rythme_reveil_dependance","rythme_reveil_bruit"], variant: "green" },
        { type: "normal", showIfPb: ["rythme_reveil_decalage","rythme_reveil_fatigue","rythme_reveil_relationnel","rythme_reveil_mange","rythme_reveil_faim","rythme_reveil_dependance","rythme_reveil_bruit"], text: "- Aujourd'hui, **[prénom_enfant]** se **réveille tôt le matin**,\n**AVANT l'HEURE à LAQUELLE** vous **aimeriez commencer la journée.**\n- C'est une **situation** qui peut **être frustrante**\nmais qui peut être **expliquée**" },
        { type: "option_banner", leverId: "rythme_reveil_decalage", emoji: "✅", showIfPb: "rythme_reveil_decalage", variant: "green", subLevel: true },
        { type: "normal", showIfPb: "rythme_reveil_decalage", text: "- 🔥 Aujourd'hui, **[prénom_enfant]** est **[couche_couchee] à** <strong style=\"color:#dc2626\">XX</strong> h et **se lève à** <strong style=\"color:#dc2626\">XX</strong> h\n  ⇒ C'est-à-dire qu'[il_elle] dort <strong style=\"color:#dc2626\">XX</strong> h par nuit\n- Or, à son âge, un enfant **a besoin** d'environ **[besoin_nuit]**\n  ⇒ Donc **ce réveil** à <strong style=\"color:#dc2626\">XX</strong> h est **logique**\n  ⇒ [il_elle] a **DÉJÀ EU sa nuit** et **peut commencer sa journée.**\n\n- Autrement dit, **ce n'est PAS** qu'[il_elle] se **réveille « trop tôt »**,\n  ⇒ C'est simplement que **son rythme** est un peu **en avance par rapport à VOTRE journée**" },
        { type: "question", showIfPb: "rythme_reveil_decalage", text: "Si ce **rythme ne vous CONVIENT PAS** dans votre organisation\non pourra regarder à **progressivement décaler TOUTE sa journée**\n\n⇒ Qu'est-ce qui serait le **+ adéquat** pour vous ?" },
        { type: "option_banner", leverId: "rythme_reveil_fatigue", emoji: "😵", showIfPb: "rythme_reveil_fatigue", variant: "green", subLevel: true },
        { type: "normal", showIfPb: "rythme_reveil_fatigue", text: "- Aujourd'hui, **[prénom_enfant]** a un **total de sommeil sur 24h** plutôt **bas pour son âge.**\n⇒ Du coup :\n  - la **fatigue** s'**accumule au fur et à mesure** de la **journée**\n  - et son **corps va réagir**\n  - en **sécrétant du cortisol** (hormone de l'éveil)\n  - *(💭 un peu comme nous avec le café !)* **pour « tenir [eveille_eveillee] »**\n\n- SAUF qu'**en fin de nuit,** **SI** ce **cortisol accumulé** EN JOURNÉE est **trop élevé**\n  ⇒ Il va **prendre le dessus** sur **la mélatonine** (hormone du sommeil)… QUI ELLE est en train de **diminuer**\n\n*💭 Pour faire simple, le **sommeil** c'est **comme une balance**, avec d'un **côté le sommeil** et de **l'autre l'éveil**.*\n*Si le **cortisol** est **trop important**,*\n*ça va faire **pencher la balance du côté « éveil »**.*\n\n- Résultat :\n  - [il_elle] se **réveille + facilement le matin**\n  - et le **rendormissement** est **très difficile**" },
        { type: "question", showIfPb: "rythme_reveil_fatigue", text: "- L'**idée serait de rétablir des quotas de sommeil** pour **retrouver un rythme + en lien** avec :\n  - ses **besoins**\n  - et **son âge**\n- Et les **choses** vont se **mettre NATURELLEMENT EN PLACE** au niveau de **SON sommeil**\n\n⇒ Est-ce que **ça vous parle** jusque là ?" },
        { type: "option_banner", leverId: "rythme_reveil_relationnel", emoji: "💬", showIfPb: "rythme_reveil_relationnel", variant: "green", subLevel: true },
        { type: "normal", showIfPb: "rythme_reveil_relationnel", text: "- Aujourd'hui, **on sent** que **[prénom_enfant]** est **super [enthousiaste_enthousiaste] PAR CE QUI L'ATTEND** dans la journée :\n  - **jouer**\n  - de tester ce qu'[il_elle] a appris\n  - ou **simplement** de **VOUS retrouver**\n\n- 🎓 Le **cerveau des enfants fonctionne** beaucoup sur **l'anticipation** et **l'excitation**\n  ⇒ Du coup, **certains enfants** vont **réduire leur nuit** au **strict minimum**\n  ⇒ Et donc **se réveiller tôt matin** :\n  - **PAS** parce qu'ils n'ont **PLUS besoin de dormir**\n  - **MAIS** parce que leur **cerveau** est **déjà en mode** *« allez, on démarre, j'ai **trop envie de découvrir** ce qu'on va faire aujourd'hui ! »*" },
        { type: "question", showIfPb: "rythme_reveil_relationnel", text: "- CE QUE je vous propose, c'est qu'**on discute ensemble**\n  - de COMMENT **sortir doucement de ce petit « jeu relationnel »** qui s'est installé\n  - en vous proposant des **manières concrètes de réagir**\n  - pour que **le sommeil** puisse **se passer beaucoup + sereinement…** pour tout le monde\n\n⇒ Est-ce que **vous reconnaissez** VOTRE **situation…** dans ce que je vous dis là ?" },
        { type: "option_banner", leverId: "rythme_reveil_mange", emoji: "🍼", showIfPb: "rythme_reveil_mange", variant: "green", subLevel: true },
        { type: "normal", showIfPb: "rythme_reveil_mange", text: "- Aujourd'hui, CE QUE **je comprends**, c'est que **[prénom_enfant]** **se réveille car [il_elle] a faim**\n- En **fin de nuit,** la **faim se fait de plus en plus sentir,**\n  **⇒ c'est NORMAL !**\n  ⇒ Et [il_elle] va **vous appeler et manger**\n\n- MAIS **une fois [eveille_eveillee] et [nourri_nourrie]** :\n  ⇒ son **système digestif se remet en route**\n  ⇒ son **éveil augmente**\n  ⇒ du coup, il devient **+ difficile de se rendormir** (car la **mélatonine** (hormone du S.) **commence** déjà **doucement à diminuer**)" },
        { type: "question", showIfPb: "rythme_reveil_mange", text: "On va faire en sorte que ces **réveils alimentaires passent + inaperçus** pour :\n- que la fin de nuit se passe **+ calmement**\n- et que **[prénom_enfant]** puisse se **rendormir + facilement**\n\n⇒ Est-ce que vous **sentez que ça a du sens** pour vous ?" },
        { type: "option_banner", leverId: "rythme_reveil_faim", emoji: "🥺", showIfPb: "rythme_reveil_faim", variant: "green", subLevel: true },
        { type: "normal", showIfPb: "rythme_reveil_faim", text: "- Aujourd'hui, CE QUE **je comprends**, c'est que **[prénom_enfant]** **se réveille car [il_elle] a faim**\n- En **fin de nuit,** la **faim se fait de plus en plus sentir,**\n  **⇒ c'est NORMAL** qu'[il_elle] **vous appelle** pour **manger**" },
        { type: "question", showIfPb: "rythme_reveil_faim", text: "Ce qu'on va faire, c'est qu'on va :\n- **AUGMENTER ses apports alimentaires en journée**\n- pour que les **réveils matinaux disparaissent PROGRESSIVEMENT**\n\n⇒ Est-ce que **ça fait sens** pour vous quand je vous **l'explique comme ça** ?" },
        { type: "option_banner", leverId: "rythme_reveil_dependance", emoji: "🪑", showIfPb: "rythme_reveil_dependance", variant: "green", subLevel: true },
        { type: "normal", showIfPb: "rythme_reveil_dependance", text: "- Aujourd'hui **[prénom_enfant]** **dépend de vous pour s'endormir**\n- Du coup, **quand [il_elle] se réveille** pendant la nuit, [il_elle] va **chercher à retrouver ces MÊMES conditions d'endormissement**\n  ⇒ et donc [il_elle] va **vous appeler**\n\n- Or en **fin de nuit,** la **mélatonine**, l'hormone du sommeil, **commence à diminuer**\n  ⇒ Et cette **baisse** **rend** :\n  - le **sommeil + léger**\n  - et on est **+ facilement réveillable**\n\n- Du coup, **en vous appelant** :\n  - **son corps se met en route**\n  - **son cerveau sort** du **sommeil**\n  - et comme [il_elle] est DÉJÀ **dans une phase** où le **sommeil est + fragile**\n    ⇒ il devient **bcp + difficile de replonger** dans le sommeil" },
        { type: "question", showIfPb: "rythme_reveil_dependance", text: "- L'**objectif** va être de **l'accompagner** pour :\n  - qu'[il_elle] **découvre** SES PROPRES **stratégies d'endormissement autonomes**\n  - pour qu'[il_elle] puisse :\n    - Se rendormir [seul_seule] entre 2 **cycles de sommeil**\n\n⇒ Est-ce que **ça fait sens** pour vous quand je vous **l'explique comme ça** ?" },
        { type: "option_banner", leverId: "rythme_reveil_bruit", emoji: "🔊", showIfPb: "rythme_reveil_bruit", variant: "green", subLevel: true },
        { type: "normal", showIfPb: "rythme_reveil_bruit", text: "- En **fin de nuit,** le **sommeil** devient naturellement **+ léger**\n- 🎓 C'est une phase où le **cerveau** est beaucoup **+ sensible** à **ce qui se passe autour**\n- Du coup, un **bruit extérieur, de la lumière…** *(voiture, oiseau, voisin, lumière…)* peut suffire à **provoquer un réveil.**\n- Et à ce moment-là, **son corps** est déjà **doucement** en train de **se préparer à se réveiller** :\n  - la **mélatonine** (hormone du S.) commence à **diminuer**\n  - le **cerveau** est **+ proche de l'éveil**\n    ⇒ du coup, le **rendormissement** devient **beaucoup + difficile** qu'en **plein milieu de la nuit.**" },
        { type: "question", showIfPb: "rythme_reveil_bruit", text: "- On va faire en sorte que son **environnement de sommeil** soit le **+ optimal possible** pour :\n  - pouvoir **prolonger sa nuit**\n  - et **atteindre des quotas de sommeil** adaptés à :\n    - son âge\n    - et ses besoins\n- Et les **choses** vont se **mettre NATURELLEMENT EN PLACE** au niveau de **SON sommeil**\n\n⇒ Est-ce que **ça vous va** ?" },
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
        { type: "option_banner", leverId: "strategie_rendormissement", emoji: "😴", showIfPb: "strategie_rendormissement", variant: "blue" },
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
        { type: "option_banner", leverId: "strategie_enjeu_relationnel", emoji: "😴", showIfPb: "strategie_enjeu_relationnel", variant: "blue" },
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
        { type: "option_banner", leverId: "strategie_tetine", emoji: "🍭", showIfPb: "strategie_tetine", variant: "blue" },
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
            { icon: "❌", label: "Supprimer", value: "supprimer", variant: "negative" }
          ]
        }},
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
        { type: "option_banner", leverId: "env_obscurite", emoji: "🌑", showIfPb: "env_obscurite", variant: "violet" },
        { type: "normal", showIfPb: "env_obscurite", text: "  - Car aujourd'hui, la chambre de **[prénom_enfant]** n'est **pas complètement dans le noir…**\n    ⇒ Vous ne **mettriez pas une note de 10/10**\n    - En **journée,** DEJA, l'obscurité va **permettre de couper les stimulations visuelles** : *quand il n'y a rien à voir, il n'y a rien à faire… à part dormir !*\n    - et le **soir,** elle joue un rôle important puisqu'elle va **aider à la sécrétion** de l'hormone du sommeil : **la mélatonine**\n\n  *💭 C'est un peu comme si :*\n  - en allant **vous coucher ce soir,**\n  - ***Vous voyez une tache au plafond***\n    *⇒ vous allez cogiter*\n    *⇒ vous allez vous imaginer une fuite au dessus,*\n    *⇒ et vous n'allez pas dormir de suite…*\n    *⇒ c'est NORMAL…*\n    *⇒ je ferais pareil ! 🤣*\n  - Et ben pour **[prénom_enfant]** **c'est pareil**\n  - S'il **peut voir** TOUT **ce qu'il y a autour** :\n    - il sera **happé par l'éveil**\n    - et **l'endormissement sera + difficile !**\n  - Tandis que **s'il fait noir** :\n    - il ne **verra rien**…\n    - et ça sera **beaucoup + facile DE lâcher prise !**\n  - (À noter que la **peur du noir** apparaît généralement plus tard, **autour de 2–2,5 ans**, voire jamais !)" },
        { type: "option_banner", leverId: "env_temperature", emoji: "🌡", showIfPb: "env_temperature", variant: "violet" },
        { type: "normal", showIfPb: "env_temperature", text: "  - Aujourd'hui, **on est** un peu **au-dessus des 19 degrés**… et **ça peut jouer, mine de rien,** sur le sommeil de **[prénom_enfant]**.\n  - Parce que **pour bien dormir**, le **corps** a besoin de diminuer **légèrement sa température corporelle**…\n    ⇒ et la **température de la chambre** va **nous aider**\n\n  💭 On l'a **TOUS déjà vécu** : quand il fait **très chaud l'été,** même quand on est fatigué…\n  **⇒ on va beaucoup moins bien dormir !**\n\n  - Pour **[prénom_enfant]**, c'est **exactement la même chose.**\n  - Si la **chambre est un peu trop chaude**, ça peut rendre :\n    - l'**endormissement + difficile**\n    - le **sommeil moins profond**\n    - …et donc des **réveils multiples !**\n\n  ⇒ Donc on **peut jouer sur ça** !" },
        { type: "option_banner", leverId: "env_lit_ouvert", emoji: "🛏", showIfPb: "env_lit_ouvert", showIfAgeMinMonths: 12, variant: "violet" },
        { type: "normal", showIfPb: "env_lit_ouvert", showIfAgeMinMonths: 12, text: "- J'aimerais AUSSI **revenir sur le lit ouvert** de **[prénom_enfant]**\n\n- Aujourd'hui, **[prénom_enfant]** **a un lit ouvert**\n- Avoir vers un lit ouvert, c'est une **étape importante** :\n  - du **développement**\n  - et de l'**autonomie d'un enfant**\n- Mais **avec un lit ouvert**, il y a quelques **éléments importants** à **avoir en tête.**\n\n- Le 1er, c'est la **sécurité**\n- Il a la **possibilité de se lever** et se **promener** dans toute la maison.\n- Parfois, il **peut aller** dans des **endroits dangereux**,\n  *comme la cuisine avec les produits ménagers ou le garage rempli d'outils.*\n\n- Le 2ème, c'est le **sentiment de sécurité**\n- Le **lit** est :\n  - **+ grand**\n  - **ouvert** sur **TOUTE la chambre**…\n\n⇒ et certains enfants peuvent **se sentir un peu moins rassurés**,\ncar ils n'ont plus ce **petit côté \"nid cosy\"** pour **se nicher**\n⇒ ils **sont + \"exposés\"** face à leur **grande chambre**\n\n*💭 Imaginez-vous dans une **grande chambre d'un château**, vous vous **sentiriez un peu vulnérable**…*\n\n- Le 3ème, ce sont les **allers-retours**.\n- Comme il **peut sortir du lit**\n  **⇒** vous pouvez **intervenir** pour le **remettre dans son lit,**\n  ⇒ et ça peut parfois **créer de la fatigue** ET même des **conflits** qui **pourraient être évités**.\n\n- Et enfin le **dernier point**, peut-être le **+ important** :\n  c'est la **règle** \"tu dois rester dans ton lit\".\n- Pour un enfant de cet âge, c'est une **responsabilité très lourde.**\n- Le **désir d'explorer** est **NORMAL**\n  et **rester dans son lit** toute la nuit **peut être très difficile** pour lui.\n\n⇒ Et c'est souvent **pour ces raisons** que **certains parents** :\n- choisissent de REVENIR **à un lit fermé**\n- qui **crée** un **cadre PHYSIQUE autour du sommeil**\n- Et c'est aussi **pour ces raisons** que MOI, **je ne recommande pas** de passer à un **lit ouvert AVANT l'âge de 2,5-3 ans**\n\n⇒ Du coup **par rapport à ça**, il y a **2 chemins possibles**, et les **2 sont tout à fait valables**\n\n- La **1ère option ⇒** c'est de **garder le lit ouvert**\n- Dans ce cas, votre enfant **garde cette liberté** de **pouvoir se lever.**\n- **Mais** cela veut dire que vous **serez parfois amenés à** :\n  - **intervenir**\n  - pour **le ramener dans son lit**,\n  - y **compris la nuit.**\n  ⇒ C'est-à-dire que ces **allers-retours** feront donc **ENCORE partie du fonctionnement** pour le moment.\n\n- **Si** vous **choisissez cette option** :\n  - on **travaillera ensemble** dans ce cadre-là,\n  - pour que ça se **passe le + sereinement possible.**\n\n- La **2nde option ⇒** c'est de REVENIR **à un lit fermé** (à barreaux ou lit parapluie)\n\n- L'**objectif** ici est simplement de **remettre un cadre physique autour du sommeil**\n- Les **barreaux** font **office de limite naturelle** :\n  - votre enfant **reste dans son lit**,\n  - **peut se nicher**\n  - se **sentir protégé,**\n  - et vous **n'avez PLUS ces allers-retours** pour le remettre dans son lit.\n\n- Et c'est **important de dire** que ce n'est **PAS DU TOUT une régression.**\n  ⇒ C'est **simplement** un **outil TEMPORAIRE** pour un **sommeil de grand !**\n\n- Si je **me base** sur ce qu'on a **vu ensemble**,\n  **mon conseil** serait plutôt **d'envisager de revenir à un lit fermé** : à barreaux ou lit parapluie\n- Mais dans **tous les cas**, ça **reste un choix parental.**\n- C'est VOUS **qui décidez** ce qui vous **semble le + juste** pour votre enfant et pour votre famille,\n  et **ensuite** on **ajustera ensemble** en **fonction** de **votre décision.**" },
        { type: "question", showIfPb: "env_lit_ouvert", showIfAgeMinMonths: 12, text: "Alors dites-moi,\nqu'est-ce qui vous **semble le + juste pour vous**, aujourd'hui :\n  - **Garder** le **lit ouvert**\n  - **Retourner** vers un **lit à barreaux / parapluie** ?", choice: {
          id: "env_lit_ouvert_apres_1an",
          required: true,
          options: [
            { icon: "✅", label: "Garder", value: "garder", variant: "positive" },
            { icon: "❌", label: "Supprimer", value: "supprimer", variant: "negative" }
          ]
        }},
        { type: "option_banner", leverId: "env_lit_ouvert", emoji: "🛏", showIfPb: "env_lit_ouvert", showIfAgeMaxMonths: 11, variant: "violet" },
        { type: "normal", showIfPb: "env_lit_ouvert", showIfAgeMaxMonths: 11, text: "- J'aimerais AUSSI **revenir sur le lit ouvert** de **[prénom_enfant]**\n\n- Aujourd'hui, **[prénom_enfant]** **a un lit ouvert**\n  - Avoir vers un lit ouvert, c'est une **étape importante** :\n    - du **développement**\n    - et de l'**autonomie d'un enfant**\n- Mais **avec un lit ouvert**, il y a quelques **éléments importants** à **avoir en tête.**\n\n- Le 1er, c'est la **sécurité**\n- Il a la **possibilité de se lever** et se **promener** dans toute la maison.\n- Parfois, il **peut aller** dans des **endroits dangereux**,\n  *comme la cuisine avec les produits ménagers ou le garage rempli d'outils.*\n\n- Le 2ème, c'est le **sentiment de sécurité**\n- Le **lit** est :\n  - **+ grand**\n  - **ouvert** sur **TOUTE la chambre**…\n\n⇒ et certains enfants peuvent **se sentir un peu moins rassurés**,\ncar ils n'ont plus ce **petit côté \"nid cosy\"** pour **se nicher**\n⇒ ils **sont + \"exposés\"** face à leur **grande chambre**\n\n*💭 Imaginez-vous dans une **grande chambre d'un château**, vous vous **sentiriez un peu vulnérable**…*\n\n⇒ Et c'est souvent **pour ces raisons (et d'autres quand votre enfant pourra marcher)** que **certains parents** :\n- choisissent de REVENIR **à un lit fermé**\n- qui **crée** un **cadre PHYSIQUE autour du sommeil**\n- Et c'est aussi **pour ces raisons** que MOI, **je ne recommande pas** de passer à un **lit ouvert AVANT l'âge de 2,5-3 ans**\n\n⇒ Du coup **par rapport à ça**, il y a **2 chemins possibles**, et les **2 sont tout à fait valables**\n\n- La **1ère option ⇒** c'est de **garder le lit ouvert**\n- En ayant en tête ce que je viens de citer\n\n- **Et si** vous **choisissez cette option** :\n  - on **travaillera ensemble** dans ce cadre-là,\n  - pour que ça se **passe le + sereinement possible.**\n\n- La **2nde option ⇒** c'est d'aller vers **un lit fermé** (à barreaux ou lit parapluie)\n\n- L'**objectif** ici est simplement de **remettre un cadre physique autour du sommeil**\n- Les **barreaux** font **office de limite naturelle** :\n  - votre enfant **reste dans son lit**,\n  - **peut se nicher**\n  - se **sentir protégé,**\n  - et vous **n'avez PLUS ces allers-retours** pour le remettre dans son lit.\n\n- Et c'est **important de dire** que ce n'est **PAS DU TOUT une régression.**\n  ⇒ C'est **simplement** un **outil TEMPORAIRE** pour un **sommeil de grand !**\n\n- Si je **me base** sur ce qu'on a **vu ensemble**,\n  **mon conseil** serait plutôt **d'envisager de revenir à un lit fermé** : à barreaux ou lit parapluie\n- Mais dans **tous les cas**, ça **reste un choix parental.**\n- C'est VOUS **qui décidez** ce qui vous **semble le + juste** pour votre enfant et pour votre famille,\n  et **ensuite** on **ajustera ensemble** en **fonction** de **votre décision.**" },
        { type: "question", showIfPb: "env_lit_ouvert", showIfAgeMaxMonths: 11, text: "Alors dites-moi,\nqu'est-ce qui vous **semble le + juste pour vous**, aujourd'hui :\n  - **Garder** le **lit ouvert**\n  - **Aller** vers un **lit à barreaux / parapluie** ?", choice: {
          id: "env_lit_ouvert_avant_1an",
          required: true,
          options: [
            { icon: "✅", label: "Garder", value: "garder", variant: "positive" },
            { icon: "❌", label: "Supprimer", value: "supprimer", variant: "negative" }
          ]
        }},
        { type: "option_banner", leverId: "env_rituel", emoji: "🌙", showIfPb: "env_rituel", variant: "violet" },
        { type: "normal", showIfPb: "env_rituel", text: "- Aujourd'hui, **[prénom_enfant]** :" },
        { type: "checklist", showIfPb: "env_rituel", items: [
          "n'a <strong>pas</strong> vraiment de <strong>rituel du soir</strong>,",
          "ou alors il est <strong>assez court</strong>"
        ]},
        { type: "normal", showIfPb: "env_rituel", text: "- En fait, les enfants ont **besoin** d'un **moment rassurant et prévisible…** surtout avant cette **longue séparation qu'est la nuit**.\n- L'idée du rituel, c'est de :\n  - **Toujours** faire les **mêmes petites étapes**\n  - dans le **même ordre**\n- Petit à petit, **[prénom_enfant]** comprend : *« Ah, si y a ça et ça… c'est bientôt l'heure du dodo. »*\n- Et là, son cerveau peut **+ facilement passer en mode dodo**\n\n*💭 Pour vous donner une image, c'est un peu comme préparer un voyage en voiture :*\n  1. *on fait les valises,*\n  2. *on regarde l'itinéraire*\n  3. *on vérifie que le réservoir est plein.*\n\n*⇒ Ces gestes répétés nous rassurent et nous préparent à partir.*\n\n- Pour **[prénom_enfant]**, le **rituel du soir**, c'est exactement pareil :\n  - ça **[le_la] rassure**\n  - et **prépare doucement son cerveau à la nuit**." },
        { type: "option_banner", leverId: "env_cadre", emoji: "🗺", showIfPb: "env_cadre", variant: "violet" },
        { type: "normal", showIfPb: "env_cadre", text: "- Là, ce que je vois, c'est que parfois, pour **[prénom_enfant]**, **ce n'est pas toujours la même réponse** selon les moments.\n- Mais les enfants ont **besoin** de **savoir à QUOI s'attendre** pour :\n  - Se sentir en sécurité\n  - Se rassurer\n\n*💭 Pour vous donner une image :*\n\n- *C'est comme si vous deviez aller manger chez Tata Martine.*\n  - *S'il y a plusieurs chemins possibles :*\n    - *Vous en choisissez 1*\n    - *Et au 1er embouteillage*\n    - *… HOP, vous bifurquez*\n    - *car vous SAVEZ qu'il y a un AUTRE chemin*\n    - *sauf qu'au bout d'un moment, Bah, on ne sait plus trop SI on est sur le bon chemin…*\n    - *⇒ et on peut vite se perdre.*\n  - *Alors que quand :*\n    - *il y a 1 **seul chemin***\n    - *et qu'on **SAIT** que **c'est LE BON***\n    - *⇒ on avance tranquillement SANS se poser de questions.*\n    - *⇒ Et c'est beaucoup + simple*\n\n- Pour **[prénom_enfant]**, c'est pareil :\n  - quand c'est **clair** et **toujours pareil,**\n  - [il_elle] sait à **quoi s'attendre**\n  - et ça rend les choses **plus faciles… pour [lui_elle]…** et pour **vous aussi**" },
        { type: "option_banner", leverId: "env_stimulations", emoji: "👀", showIfPb: "env_stimulations", variant: "violet" },
        { type: "normal", showIfPb: "env_stimulations", text: "- Aujourd'hui, **[prénom_enfant]** **s'endort** dans **une chambre** où il y a **pas mal de choses autour** qui peuvent :\n  - **attirer son regard**\n  - et **[le_la] maintenir [eveille_eveillee] + longtemps**.\n- Et ce n'est **PAS un reproche**… c'est **JUSTE une observation**\n\n- L'**environnement joue un vrai rôle** dans la façon dont :\n  - on **se détend**\n  - et dont on **s'endort**\n\n*💭 Pour vous donner une image, c'est comme aller au cinéma :*\n- *si la salle est pleine de lumières et de bruits ⇒ on aura du mal à rentrer dans le film*\n- *mais si la salle est calme et sombre ⇒ ça devient tout de suite + facile de se mettre dans l'ambiance du film*\n\n- Pour le sommeil, c'est pareil : l'environnement peut :\n  - **faciliter**\n  - **ou compliquer l'endormissement**.\n- Du coup, si on **réduit un peu les distractions ⇒** son **cerveau** pourra plus facilement **se concentrer** sur **1 seule chose : …le sommeil** !" },
        { type: "option_banner", leverId: "env_ecrans", emoji: "📱", showIfPb: "env_ecrans", variant: "violet" },
        { type: "normal", showIfPb: "env_ecrans", text: "- Aujourd'hui, **[prénom_enfant]** est en **contact, direct ou indirect, avec des écrans**…\n- C'est un peu **inévitable de nos jours**\n- mais **malheureusement**, ça peut **jouer sur son sommeil**\n\n- Vous savez, les **écrans diffusent** une **lumière…** qu'on appelle **« lumière bleue »**, qui est assez **proche de celle du soleil.**\n- Du coup, le **cerveau** :\n  - peut être confus\n  - et penser que c'est encore le « jour »\n  - et avoir du **mal à se mettre en mode « dodo »**…\n\n  ⇒ Résultat :\n  - **La production de la mélatonine** (l'hormone qui prépare au sommeil) peut être **retardée**\n  - Et **le passage du train du Sommeil** peut **passer un peu + tard que prévu**" },
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
        { type: "option_banner", leverId: "relationnel_lit_parental", emoji: "🛏️", showIfPb: "relationnel_lit_parental", variant: "pink" },
        { type: "normal", showIfPb: "relationnel_lit_parental", text: "- Aujourd'hui **[prénom_enfant]** :\n  - Vient souvent vous **rejoindre dans votre lit** 🛏️\n    ⇒ Alors que **chez Papy et Mamie**, ça ne se **passe pas comme ça** !\n\n- À son âge, il n'y a **rien de plus excitant** que de **communiquer avec Papa et Maman.**\n- Et pour [lui_elle], **toute attention… EST** une **attention** :\nque ce soit **un câlin, un rire**… ou **même** un **petit conflit.**\n  ⇒ Parce que, **dans TOUS les cas,** C'EST un **moment de relation avec vous.**\n\n- Et au **moment du coucher…** c'est un **petit peu particulier** :\n  - c'est le **moment** où le **lien physique se coupe**\n  - où il y a une **VRAIE et LONGUE séparation avec vous**\n    ⇒ Et ça peut être un peu **difficile pour [lui_elle]**\n    parce qu'[il_elle] a simplement **envie de prolonger le moment** **…encore un peu plus longtemps**\n\n- Donc ce que je vois ici :\n  - c'est **PAS forcément** une **difficulté liée au sommeil**\n    - mais c'est surtout **un besoin de relation qui s'exprime**\n    - Un **moyen** pour [lui_elle] **de prolonger le lien** avec vous.\n    ⇒ Et c'est **qqch** qui **arrive très souvent** chez les enfants de cet âge\n    ⇒ et qui est **tout à fait normal !**" },
        { type: "question", showIfPb: "relationnel_lit_parental", text: "- CE QUE **je vous propose,** c'est qu'**on discute ensemble**\n  - de COMMENT **sortir doucement de ce petit « jeu relationnel »** qui s'est installé\n  - en vous proposant des **manières concrètes de réagir**\n  - pour que **le coucher** puisse **se passer beaucoup + sereinement…** pour tout le monde\n\n⇒ Est-ce que **vous reconnaissez** VOTRE **situation**… dans ce que je vous dis là ?" },
        { type: "option_banner", leverId: "relationnel_conflit_autres", emoji: "💬", showIfPb: "relationnel_conflit_autres", variant: "pink" },
        { type: "normal", showIfPb: "relationnel_conflit_autres", text: "- Aujourd'hui **[prénom_enfant]** :\n  - semble parfois **en « conflit »** avec vous sur **différents sujets** (qui ne sont **pas forcément liés au sommeil**)\n    ⇒ Alors qu'à la **crèche / chez Papy et Mamie**, ça ne se **passe pas comme ça** !\n\n- À son âge, il n'y a **rien de plus excitant** que de **communiquer avec Papa et Maman.**\n- Et pour [lui_elle], **toute attention… EST** une **attention** :\nque ce soit **un câlin, un rire**… ou **même** un **petit conflit.**\n  ⇒ Parce que, **dans TOUS les cas,** C'EST un **moment de relation avec vous.**\n\n- Et au **moment du coucher…** c'est un **petit peu particulier** :\n  - c'est le **moment** où le **lien physique se coupe**\n  - où il y a une **VRAIE et LONGUE séparation avec vous**\n    ⇒ Et ça peut être un peu **difficile pour [lui_elle]**\n    parce qu'[il_elle] a simplement **envie de prolonger le moment** **…encore un peu plus longtemps**\n\n- Donc ce que je vois ici :\n  - c'est **PAS forcément** une **difficulté liée au sommeil**\n    - mais c'est surtout **un besoin de relation qui s'exprime**\n    - Un **moyen** pour [lui_elle] **de prolonger le lien** avec vous.\n    ⇒ Et c'est **qqch** qui **arrive très souvent** chez les enfants de cet âge\n    ⇒ et qui est **tout à fait normal !**" },
        { type: "question", showIfPb: "relationnel_conflit_autres", text: "- CE QUE **je vous propose,** c'est qu'**on discute ensemble**\n  - de COMMENT **sortir doucement de ce petit « jeu relationnel »** qui s'est installé\n  - en vous proposant des **manières concrètes de réagir**\n  - pour que **le coucher** puisse **se passer beaucoup + sereinement…** pour tout le monde\n\n⇒ Est-ce que **vous reconnaissez** VOTRE **situation**… dans ce que je vous dis là ?" },
        { type: "option_banner", leverId: "relationnel_rappels", emoji: "📢", showIfPb: "relationnel_rappels", variant: "pink" },
        { type: "normal", showIfPb: "relationnel_rappels", text: "- Aujourd'hui **[prénom_enfant]** :" },
        { type: "checklist", showIfPb: "relationnel_rappels", items: [
          "Fait de <strong>nombreux rappels …après l'avoir couché</strong>"
        ]},
        { type: "normal", showIfPb: "relationnel_rappels", text: "⇒ Alors qu'à la **crèche / chez Papy et Mamie**, ça ne se **passe pas comme ça** !\n\n- À son âge, il n'y a **rien de plus excitant** que de **communiquer avec Papa et Maman.**\n- Et pour [lui_elle], **toute attention EST** une **attention** :\nque ce soit **un câlin, un rire**… ou **même PLUSIEURS petits échanges**\n  ⇒ Parce que, **dans TOUS les cas,** C'EST un **moment de relation avec vous.**\n\n- Et au **moment du coucher…** c'est un **petit peu particulier** :\n  - c'est le **moment** où le **lien physique se coupe**\n  - où il y a une **VRAIE et LONGUE séparation avec vous**\n    ⇒ Et ça peut être un peu **difficile pour [lui_elle]**\n    parce qu'[il_elle] a simplement **envie de prolonger le moment** **…encore un peu plus longtemps**\n\n- Donc ce que je vois ici :\n  - c'est **PAS forcément** une **difficulté liée au sommeil**\n    - mais c'est surtout **un besoin de relation qui s'exprime**\n    - Un **moyen** pour [lui_elle] **de prolonger le lien** avec vous.\n    - et aussi une forme de **dépendance à votre présence pour :**\n      - **s'apaiser**\n      - **et s'endormir**\n    ⇒ Et c'est **qqch** qui **arrive très souvent** chez les enfants de cet âge\n    ⇒ et qui est **tout à fait normal !**" },
        { type: "question", showIfPb: "relationnel_rappels", text: "- CE QUE je vous propose, c'est qu'**on discute ensemble**\n  - de COMMENT **sortir doucement de ce petit « jeu relationnel »** qui s'est installé\n  - en vous proposant des **manières concrètes de réagir**\n  - pour que **le coucher** puisse **se passer beaucoup + sereinement…** pour tout le monde\n\n⇒ Est-ce que **vous reconnaissez** VOTRE **situation…** dans ce que je vous dis là ?" },
      ]
    },

  ],

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
        { type: "normal", text: "- **Donc si je résume ce qu'on s'est dit !**" },
        { type: "question", text: "C'est **bien ça** ?\nEst-ce **clair pour vous** ?" },
        {
          type: "option", label: "Pas eu le temps de tout discuter", style: "purple",
          blocks: [
            { type: "normal", text: "- On a **discuté de pas mal de choses**\n- Mais **malheureusement**, on n'a **PAS** eu le temps de **TOUT** discuter\n- Ce que **je vous propose** c'est que l'on **finisse cette discussion** autour d'**un AUTRE RDV**" },
            { type: "question", text: "Est-ce que **ça vous irait** ?" },
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
        { type: "normal", showIfMinMinutesLeft: 8, text: "- Je vous invite à **parler du sommeil régulièrement** à votre enfant\n- Tjs le **prévenir que c'est l'heure du dodo**, qu'il **va aller se reposer**, que ça va lui faire du bien.\n\n---\n\n- N'hésitez AUSSI pas à **remettre de la joie** et du **plaisir autour du sommeil**\n- Pour que, petit à petit dans sa tête se créent 2 nouvelles associations :\n\n  **Dormir = Plaisir**\n\n  **Fatigue = Dormir**\n\n---\n\n- Et pour que ces **nouveaux repères** puissent **vraiment s'installer**,\n- il est **important** que le **chemin que vous choisissez** reste **clair et cohérent**.\n\n- Si vous **êtes convaincus** que c'est :\n  - le **bon chemin**\n  - ET qu'**il n'y en a qu'1**…\n\n  ⇒ ...alors ce sera **+ facile pour vous**\n\n- Et **quand les parents** sont :\n  - **clairs**\n  - **et cohérents** dans **leur tête**…\n\n  ⇒ ...l'**enfant comprend :**\n\n  **+ facilement le cadre**\n\n  et **trouve naturellement** ses **nouveaux repères.**" },
        { type: "normal", text: "- Voilà, en terme de **statistiques** :" },
        { type: "normal", showIfMinMinutesLeft: 8, text: "Si le **1er soir** en revanche, ça **dure + de 1h30**\n\n- Ce n'est **PAS normal**\n- C'est y a **qqch qui ne va pas ⇒** Vous **arrêtez là**\n\n⇒ Il faut que l'on **re-prenne RDV**" },
        { type: "normal", text: "- **Dans les 3 1ers jours**, vous devriez voir un **DEBUT d'amélioration**\n\n---\n\n- Normalement, dans les **2/3 1ères semaines** on peut s'attendre à une **vraie très belle amélioration**\n- Les **siestes,** par contre, peuvent **mettre + longtemps** à se mettre en place (**1-2 mois**)\n\n  ⇒ **TOUT** va **dépendre de chaque situation ET** de **chaque enfant**" },
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
      { type: "question", text: "Est-ce que j'ai **répondu à [ces_vos_objectifs]** ?" },
      {
        type: "option", label: "OUI", emoji: "✅", style: "action-green", mutexGroup: "conclusion-obj",
        blocks: [
          { type: "question", text: "Est-ce qu'il vous **reste des questions** ?" },
          { type: "question", text: "**QUAND** est-ce que vous **PENSEZ** **pouvoir commencer** à **mettre ces changements en place** ?" },
          {
            type: "option", label: "🔥 Si Pas pris de RDV", style: "purple",
            blocks: [
              { type: "important", text: "🔥 Au vu de ce qu'on s'est dit, je pense qu'il serait **intéressant de se revoir**\n\nSachant que **vous voulez commencer** le <strong style=\"color:#C0392B\">XXX</strong>, on **peut se voir** le <strong style=\"color:#C0392B\">XXX</strong>" },
              { type: "question", text: "Qu'est-ce que vous en pensez ?" },
              {
                type: "option", label: "💰 Tarifs", style: "purple",
                blocks: [
                  { type: "tarifs_tableau" }
                ]
              }
            ]
          },
          { type: "question", text: "Moi, j'ai une **dernière question** pour VOUS qui est **très importante** :\n⇒ Comment vous **vous sentez LÀ,** à **l'idée de mettre** tout ceci **en place** ?" },
          { type: "normal", text: "- C'est super ! J'entends **plein de motivation** ! C'est génial !\n- Je vous **envoie** plein d'**énergie positive / bonnes ondes**\n- Je **vous souhaite** que les **nuits/siestes** de [prénom_enfant] **s'apaisent rapidement**, et que **les vôtres suivent** tout **aussi vite**.\n- Bonne journée !" },
          { type: "fin_consultation", text: "🏁 **FIN DE LA CONSULTATION** 🏁" },
        ]
      },
      {
        type: "option", label: "NON", emoji: "❌", style: "action", mutexGroup: "conclusion-obj",
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
      },
    ]
  }

};
