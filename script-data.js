// ============================================================
// DONNÉES DU SCRIPT DE CONSULTATION SOMMEIL
// Sophie Douesneau – La tribu des rêveurs
// ============================================================

const SCRIPT_DATA = {

  required: [

    // ── I. ACCUEIL ─────────────────────────────────────────
    {
      id: "accueil",
      title: "I. Accueil",
      emoji: "👋",
      blocks: [
        { type: "normal", text: "- Bonjour\n- Je suis Sophie Douesneau,\n- Je suis consultante du sommeil chez [enseigne_nom]" },
        { type: "question", text: "Vous êtes BIEN [prénom_parents], [role_parents] de [prénom_enfant] qui a [age] ?" },
        { type: "question", text: "Est-ce que **quelqu'un d'autre** se **joindra** à nous aujourd'hui?" },
        { type: "normal", text: "- On est **ensemble aujourd'hui jusque** [heure_fin]" },
        { type: "question", text: "Est-ce que vous avez **bien prévu d'être disponible** jusque [heure_fin] ?" },
        { type: "normal", text: "- Dans le cadre d'une 1ère consultation, je vais vous **expliquer comment ça va se passer**\n\n- On va faire ensemble **l'évaluation de la situation de sommeil** de [prénom_enfant]\n\n  - 1. Je vais m'appuyer sur le questionnaire que vous avez rempli\n    - Pour **approfondir les choses**\n    - Pour être **sûr de ne passer à côté de rien** en terme d'**information importante**" },
        { type: "question", text: "En **parlant de ça**, y'a-t-il eu des **changements récents** depuis que vous **m'avez envoyé le questionnaire**?" },
        { type: "normal", text: "  - 2. On va **lire les courbes de taille/poids et périmètre crânien**, car le **sommeil et l'alimentation** sont **étroitement liés**\n\n  - 3. On va **lire ensemble** le **tableau de suivi** que vous avez rempli\n\n  - 4. On va **regarder** aussi **rapidement les photos de la chambre** que vous m'avez envoyé\n\n- À partir de là, je vais avoir une **vue détaillée de votre situation** et je vais pouvoir vous **établir un diagnostic**\n- Ensuite, je vais vous **proposer un plan d'action** à mettre en place par rapport à tout ce que **j'aurais compris de nos échanges**\n\n- L'**idée** de cette **1ère consultation** c'est généralement:\n  - de vous **donner des 1ers conseils**\n  - par rapport à ce que **je comprends**\n  - et ce qui me **semble prioritaire** dans votre situation\n\n- Dans certains cas, elle y aura **peut-être besoin d'une AUTRE petite consultation** de 20 min\n  - Pour **faire le point sur les 1ères choses** que vous aurez **mises en place**\n  - Pour vous **donner des conseils supplémentaires**\n  - OU Pour **répondre aux questions** qui seraient **survenues durant ses 1ers jours**" },
        { type: "question", text: "Est-ce que **ça vous convient**?" },
        { type: "important", text: "- Je précise aussi que je **NE suis PAS médecin**, et NE remplace PAS votre médecin\n- Les **conseils** que je donne, sont **donnés à titre informatif**\n- SI j'ai le **moindre doute médical** ⇒ Je vous **redirigerai** vers un professionnel de santé" },
        { type: "question", text: "Nous sommes **BIEN d'accord** que [prénom_enfant] est [un_une] [petit_petite] [fille_garcon] qui est :\n  - En **bonne santé** ?\n  - A été **vu récemment par un médecin** ?" },
        { type: "normal", text: "- La consultation est **filmée et enregistrée** pour que vous puissiez la **revisionner** à tête reposée (et la montrer au co-parent)\n- Vous pouvez **prendre des notes**, si vous le souhaitez\n- Mais de **toute façon**, je vous **enverrai un compte rendu automatique** de cette consultation" },
        { type: "question", text: "Est-ce que c'est **OK pour vous**?" },
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
        { type: "pb_question" },
        {
          type: "option", label: "Si pleurs difficiles", emoji: "😭", style: "pleurs",
          blocks: [
            { type: "empathie", text: "- J'entends que c'est **difficile pour vous** d'**entendre** votre enfant **pleurer**...\n- Merci de me le confier.\n- Il y a **beaucoup de parents** POUR QUI :\n  - c'est **vraiment compliqué**,\n  - et **chacun a sa sensibilité** là-dessus\n  - et **c'est OK**\n- L'**idée ici**, ça ne va **PAS ÊTRE de vous forcer** à faire **qqch qui ne vous correspond pas**.\n- On va plutôt **adapter les choses à vous**, à CE QUE vous **ÊTES CAPABLE de faire** aujourd'hui.\n- Parce que :\n  - **PLUS** vous serez **alignée avec vous-même**\n  - **PLUS** ce **sera fluide :**\n    - pour vous...\n    - et **pour votre enfant aussi.**\n- Et on va justement **trouver ensemble :**\n  - une **façon de faire**\n  - QUI **respecte ça**" }
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
        { type: "normal", text: "- Ce que je vous propose maintenant,\nc'est de **dérouler** une **journée type**, pour essayer de **comprendre AU MIEUX** votre quotidien" },
        { type: "question", text: "**CE QU'ON peut faire**, c'est qu'on peut **commencer par le réveil** du matin, si ça vous va?\n⇒ [Suivre la fiche découverte]" },
        { type: "separator", text: "📊 Lecture des courbes" },
        { type: "normal", text: "- On va maintenant **regarder les courbes**" },
        { type: "question", text: "Est-ce que vous pourriez **me donner votre taille à TOUS les 2**?\nAvez-vous des **personnes très GRANDES dans vos familles**?" },
        { type: "question", text: "Avez-vous les **courbes devant vous**?\nOn va **commencer** par lire la **courbe du périmètre crânien**" },
        { type: "separator", text: "📋 Tableau de suivi du sommeil" },
        { type: "normal", text: "- Maintenant, on va **lire ensemble** le **tableau de suivi du sommeil** que vous avez rempli" },
        { type: "separator", text: "📸 Photos de la chambre" },
        { type: "normal", text: "- On va maintenant **regarder rapidement les photos** de la chambre" },
        { type: "question", text: "Maintenant, je **voudrai savoir:**\n- Si vous deviez mettre une **note de 0 à 10**, 10 étant la meilleure note, quelle note vous mettriez à :\n  - **Votre grossesse** ET <u>pour le Papa</u>?\n  - **Votre accouchement** ET <u>pour le Papa</u>?\n  - Et maintenant à **votre ÉTAT D'ÊTRE actuel** (en prenant en compte votre **vie perso/pro/par rapport au sommeil de votre enfant**) ET <u>pour le Papa</u>?" },
        {
          type: "option", label: "Si Maman en dépression/très fatiguée", emoji: "😭", style: "pleurs",
          blocks: [
            { type: "question", text: "Est-ce que vous êtes accompagnée du coup?" },
            {
              type: "option", label: "✅ Accompagnée avec un psy", style: "pleurs",
              blocks: [
                { type: "empathie", text: "Super !\nJe comprends… ce que vous vivez, c'est vraiment pas simple.\nAprès une naissance, c'est NORMAL de se sentir fatiguée, et de se sentir un peu perdue par moments.\nVous êtes LOIN d'être la SEULE à passer par là" },
                { type: "conseil", text: "👏 Et j'ai envie de vous dire quelque chose d'important :\nvous faites déjà énormément pour votre BB\nMême si parfois, vous avez l'impression DE NE pas y arriver ⇒ EN RÉALITÉ, vous vous en occupez très bien" },
                { type: "empathie", text: "Le manque de sommeil… tous les changements… ⇒ forcément, ça joue sur le moral\nMais ça ne remet absolument PAS en question le fait que vous êtes une bonne maman\n\nEt je trouve ça super que vous soyez déjà accompagnée par un professionnel — C'est une très bonne démarche !\n\nDe mon côté, je suis là pour vous accompagner sur le sommeil de votre bébé ET AUSSI pour vous aider à retrouver un peu de souffle au quotidien.\n\nVous n'êtes pas seule, et vous faites de votre mieux\n\n(👏… et c'est déjà beaucoup)" }
              ]
            },
            {
              type: "option", label: "❌ PAS accompagnée avec un psy", style: "pleurs",
              blocks: [
                { type: "empathie", text: "D'accord. Je comprends… ce que vous vivez, c'est vraiment pas simple.\nAprès une naissance, c'est NORMAL de se sentir fatiguée et un peu perdue par moments.\nVous êtes LOIN d'être la SEULE à passer par là." },
                { type: "conseil", text: "👏 Vous faites déjà énormément pour votre BB\nMême si parfois, vous avez l'impression DE NE pas y arriver ⇒ EN RÉALITÉ, vous vous en occupez très bien" },
                { type: "empathie", text: "Et si à un moment vous ressentez le besoin d'en parler, de ne PAS rester seule avec tout ça…\nÇa peut être : votre médecin, votre sage-femme, ou un psychologue.\nL'idée : de ne PAS garder tout ça pour vous, et d'avoir un espace pour en parler.\n\nDe mon côté, je suis là pour vous accompagner sur le sommeil ET aussi pour vous aider à retrouver un peu de souffle au quotidien.\n\nMais je voulais aussi que vous gardiez en tête que :\n→ vous n'êtes pas seule,\n→ que vous faites de votre mieux (👏… et c'est déjà beaucoup)" }
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
        { type: "obj_question" },
        {
          type: "option", label: "🛌 Souhaitent changer de lieu de sommeil / lit", style: "purple",
          blocks: [
            { type: "normal", text: "- J'ai aussi une **petite question** par rapport au **LIEU de sommeil**\n- Aujourd'hui, votre enfant **dort dans VOTRE chambre**" },
            {
              type: "option", label: "Dort dans le lit parental", style: "purple",
              blocks: [
                { type: "normal", text: "- Et plus précisément **dans VOTRE LIT**\n\n- De mon côté, je dois **quand même** vous **partager les recommandations de l'OMS**…\n  - …qui **encouragent** à faire **dormir** les enfants dans **LEUR PROPRE LIT**…\n  - …car cela **diminue significativement le risque de Mort Inattendue du Nourrisson**\n\n- Mais **au-delà de ça**, l'idée, ce n'est **PAS de vous dire quoi faire.**\n- C'est surtout de **voir CE QUI vous convient** à vous, aujourd'hui.\n\n- Il n'y a **PAS** de **bonne** ou de **mauvaise réponse** :\n  - **certains parents** préfèrent **attendre** encore un peu,\n  - d'**autres** sont **prêts à faire la transition.**" },
              ]
            },
            { type: "question", text: "Est-ce que c'est **quelque chose qui vous CONVIENT** pour l'instant,\n…OU est-ce que vous **aimeriez qu'elle passe dans SA chambre / dans SON lit** ?\n\n- Il n'y a **PAS** de **bonne ou de mauvaise réponse** :\n  - certains parents **préfèrent attendre** encore un peu,\n  - d'autres **sont prêts** à faire la **transition**.\n\n- L'**idée** est surtout de voir ce qui **correspond le mieux** à votre **famille**\n  - Pour que je puisse m**'adapter au mieux**" }
          ]
        },
        {
          type: "option", label: "Position ventrale – souhait de garder ou non ?", style: "purple",
          blocks: [
            { type: "normal", text: "- J'ai également une **question** concernant la **position de sommeil** de [prénom_enfant].\n- Aujourd'hui, elle **semble s'endormir sur le ventre**… c'est devenu **SA stratégie** pour **trouver le sommeil**…\n  - c'est **quelque chose** que l'on **observe souvent** chez les BB car c'est la **position la + physiologique** pour le corps\n\n- **Néanmoins**, je dois aussi vous **partager les recommandations de l'OMS**…\n  - …qui **encouragent** à **poser son enfant** sur le **DOS**…\n  - …car cette position **diminue significativement le risque de Mort Inattendue du Nourrisson**\n\n- Il n'y a **PAS** de **bonne ou mauvaise réponse**… SEULEMENT CELLE qui **correspond à vos besoins** !" },
            { type: "normal", text: "- **Mon rôle** c'est de vous **transmettre ces informations..**\n  - …tout en **restant à l'écoute** de **votre réalité**\n\n- Il n'y a **pas de bonne ou mauvaise réponse**..\n  - ...**SEULEMENT CELLE** qui **correspond à vos besoins** !" },
            { type: "question", text: "J'**aimerais** beaucoup **connaître votre point de vue** sur ce sujet…\n- Souhaitez-vous **rester**\n  - **en position ventrale**\n  - ou changer **vers la position dorsale**?\n\n- Cela me **permettra** **d'adapter au mieux mon accompagnement** à votre famille\n  - ...et à **vos préférences.**" }
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
        { type: "normal", text: "- D'après les **données consolidées** de la **National Sleep Foundation** (États-Unis) ET le **laboratoire français d'étude du sommeil** :\n\n- Votre enfant a des <strong style=\"color:#c0392b\">BESOINS</strong> pour son âge\n- ⚠️ Je parle toujours en **âge CORRIGÉ** *(l'âge qu'aurait eu votre enfant s'il était né à terme)*" },
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
          type: "option", label: "❌ Difficultés de sommeil identifiées", style: "purple",
          blocks: [
            { type: "normal", text: "- Au vu de ce qu'on s'est dit\n- En effet, vous aviez **BIEN identifié** que votre enfant a des **difficultés de sommeil**.", _noBorder: true },
            { type: "normal", text: "**<u>⏱ Temps d'endormissement trop long :</u>** Il y a une **petite problématique** au niveau des **durées d'endormissement**… qui sont **très longues**", _purpleDark: true },
            { type: "normal", text: "**<u>⏰ Durée des siestes trop courte :</u>** Il y a aussi un **petit caillou** concernant la **durée des siestes**… qui sont **très courtes**", _purpleDark: true },
            { type: "normal", text: "**<u>🔢 Nombre de siestes inadapté :</u>** Il y a aussi **quelque chose à travailler** au niveau du **nombre de siestes**… qui ne **correspondent PAS** forcément aux **besoins de son âge**", _purpleDark: true },
          ]
        },
        {
          type: "option", label: "✅ Pas de dette de sommeil", style: "purple",
          blocks: [
            { type: "conseil", text: "- La **bonne nouvelle** c'est qu'aujourd'hui [prénom_enfant] n'est **PAS en dette de sommeil**" },
            { type: "conseil_vert", text: "👏 Vous faites **TOUT** pour que ça ne **soit pas le cas**!" },
            { type: "normal", text: "**<u>Au niveau du tps d'endormissement :</u>** Par contre, je vois des **difficultés** sur la **durée d'endormissement** … qui est **très long**", _purpleDark: true },
            { type: "normal", text: "**<u>Au niveau du nombre de siestes …</u>** Par contre, je peux voir que le **nombre de siestes** … ne **correspond PAS** aux **besoins** d'un enfant de **cet âge**", _purpleDark: true },
          ]
        },
        {
          type: "option", label: "🍼 Difficultés alimentaires identifiées (courbes en déclin)", style: "purple",
          blocks: [
            { type: "normal", text: "Je valide AUSSI des difficultés alimentaires parce que… En effet,", _noBorder: true },
            { type: "normal", text: "**<u>Au niveau des courbes qu'on a vues ensemble,</u>** il y a quelque chose qui se joue", _purpleDark: true },
            { type: "normal", text: "**<u>Au niveau des différents symptômes que vous m'avez partagé,</u>** il y a quelque chose à creuser", _purpleDark: true },
            { type: "normal", text: "**<u>Au niveau de son inconfort,</u>** pour [prénom_enfant] il faudrait comprendre pourquoi il est ainsi", _purpleDark: true },
            { type: "normal", text: "Du coup il y a BIEN quelque chose qui NE VA PAS du côté de la nutrition", _noBorder: true },
          ]
        },
        { type: "conseil_vert", text: "👏 MAIS la **bonne nouvelle** c'est que :\n- **TOUT** ce que vous m'avez partagé a du sens, est **explicable**\n- Mais **SURTOUT** que c'est **solutionnable** !\n- ET que je peux vous **accompagner** pour les troubles du sommeil de [prénom_enfant]" },
        { type: "separator", text: "⚙️ Leviers identifiés" },
        { type: "leviers_dynamiques" },
        { type: "normal", text: "On aura PEUT-ÊTRE pas le temps de tout voir aujourd'hui :\nmais on pourra toujours reprendre un RDV plus tard pour discuter des points que l'on n'aura pas eu le temps de voir aujourd'hui.\n\nDonc, CE QUE je vois en 1er, je vois quelque chose au niveau de…\n[→ enchaîner avec les sections conditionnelles correspondantes]" },
      ]
    },

    // ── VI. OBJECTIFS REVUS ────────────────────────────────
    {
      id: "objectifs_revus",
      title: "VI. Objectifs revus",
      emoji: "🎯",
      blocks: [
        {
          type: "option", label: "✅ Objectifs faisables",
          blocks: [
            { type: "normal", text: "Par rapport aux objectifs que vous avez donné ⇒ moi ce que je pense c'est que c'est tout à fait COHÉRENT et FAISABLES" }
          ]
        },
        {
          type: "option", label: "⚠️ Objectifs PAS faisables — points à re-discuter",
          blocks: [
            { type: "normal", text: "Par rapport aux objectifs que vous avez donné ⇒ Il y a certains points que je voudrais re-discuter avec vous" },
            {
              type: "option", label: "Nuits complètes (mais besoin de temps d'alimentation car PETIT)",
              blocks: [
                { type: "normal", text: "BB trop petit ⇒ Il a encore besoin de temps d'alimentation la nuit\nSon estomac n'est pas assez gros pour \"TENIR\" toute la nuit\n⇒ Il a donc encore besoin de temps d'alimentation la nuit" }
              ]
            },
            {
              type: "option", label: "Nuits complètes (mais besoin de rattrapage de courbe)",
              blocks: [
                { type: "normal", text: "Aujourd'hui, votre enfant a besoin de faire un rattrapage de courbe\nIl est possible que les temps d'alimentation la nuit soient encore présents quelque temps\nMais c'est TEMPORAIRE :\n- le temps que sa courbe de poids remonte\n- et que ses apports alimentaires se remettent en journée\n⇒ Il a donc encore besoin de temps d'alimentation la nuit de manière temporaire" }
              ]
            },
            {
              type: "option", label: "Si la crèche ne suit pas les recommandations",
              blocks: [
                { type: "normal", text: "Si la crèche ne suit pas vos recommandations :\n⇒ ça aura un impact sur ses nuits (ex: réveils nocturnes, réveils matinaux, terreurs nocturnes)\n⇒ Vous faites un test et voyez si la crèche lui correspond ou pas" }
              ]
            },
            {
              type: "option", label: "Si activités qui obligent à réveiller l'enfant",
              blocks: [
                { type: "normal", text: "Si votre enfant est réveillé pour aller à des activités :\n- Son corps aura la validation que c'est OK de faire de courtes siestes\n- Ne comprendra pas ses variations de rythmes\n- Et n'arrivera pas à enchaîner les cycles de sommeil pour ses siestes\nDe plus, le manque de sommeil de jour aura un impact sur ses nuits (ex: réveils nocturnes, réveils matinaux, terreurs nocturnes)" }
              ]
            },
            {
              type: "option", label: "Si nuit supérieure à 12h",
              blocks: [
                { type: "normal", text: "Votre enfant fait des nuits qui correspondent à ses besoins.\nSi son horaire de lever ne correspond pas à VOTRE rythme\n⇒ on peut voir pour décaler toute sa journée (temps d'alimentation, siestes…)" }
              ]
            },
          ]
        },
        {
          type: "option", label: "🍭 Tétine = stratégie dépendante",
          blocks: [
            { type: "normal", text: "Et j'aimerais aussi qu'on prenne un moment pour REPARLER de la tétine.\n\nAu vu de ce qu'on s'est dit ensemble, aujourd'hui la tétine FAIT PARTIE de la stratégie d'endormissement de [prénom_enfant]\nMais elle fait AUSSI partie des éléments qui contribuent à ses réveils\n\n⇒ Et c'est pour ça qu'il va vous appeler pour :\n- venir la lui remettre\n- pour pouvoir se rendormir\n\nEt ça, c'est quelque chose qu'on voit très fréquemment\n\n⇒ Du coup par rapport à ça, il y a 2 chemins possibles… et les 2 sont tout à fait valables" },
            {
              type: "option", label: "Option 1 : GARDER la tétine",
              blocks: [
                {
                  type: "option", label: "Bébé PAS assez moteur (moins de 6 mois)",
                  blocks: [
                    { type: "normal", text: "Comme [prénom_enfant] est encore petit et n'a pas encore la capacité motrice pour la remettre seul\n\nDans ce cas, ce sera VOUS qui viendrez la lui remettre lorsqu'elle tombera pendant son sommeil\n\nDonc au départ, il dépend encore de vous pour ça\n\nEn lui remettant sa tétine À CHAQUE FOIS ⇒ Vous allez garder la cohérence dans ses stratégies d'endormissement ET de rendormissement.\n\nMais on peut progressivement lui apprendre comment il peut la remettre dans la bouche\n\nC'est vraiment vers 6-7 mois qu'il aura la capacité motrice pour la chercher ET la remettre SEUL\n⇒ Et comme ça, il pourra gérer SEUL ses micro-réveils avec sa tétine" }
                  ]
                },
                {
                  type: "option", label: "Bébé assez moteur (plus de 6 mois)",
                  blocks: [
                    { type: "normal", text: "Et comme [prénom_enfant] il est assez grand et moteur\n\nOn peut progressivement lui apprendre à la retrouver ET à la remettre seul\n\nL'objectif est qu'il gère SEUL ses micro-réveils avec sa tétine" }
                  ]
                },
              ]
            },
            {
              type: "option", label: "Option 2 : SUPPRIMER la tétine",
              blocks: [
                { type: "normal", text: "L'objectif est de faire disparaître les réveils liés à la tétine\n\nQuand on évoque cette idée, ça peut parfois faire un peu peur aux parents, parce que la tétine a souvent une grande place dans l'apaisement d'un bébé.\n\nMais MON expérience montre qu'en général, les BB s'adaptent très vite,\net en quelques jours, la tétine devient souvent un lointain souvenir !" },
                { type: "question", text: "Alors dites-moi :\n→ Souhaitez-vous la garder MAIS avec les conséquences que ça implique\n→ ou souhaitez-vous la supprimer définitivement ?\n→ Option hybride : la supprimer durant les temps de sommeil (et pas la journée)\n\n⇒ Vers quoi vous voudriez aller ?" }
              ]
            },
          ]
        },
        {
          type: "option", label: "🛌 Objectif lit ouvert MAIS enfant trop petit (1 à 2,5 ans)",
          blocks: [
            { type: "normal", text: "J'aimerais aussi revenir sur votre objectif d'aller vers un lit ouvert.\n\nAller vers un lit ouvert, c'est une étape naturelle du développement et de l'autonomie d'un enfant\nMais avec un lit ouvert, il y a quelques éléments importants à avoir en tête.\n\n1. La sécurité : il a la possibilité de se lever et de se promener dans toute la maison\n   Parfois, il peut aller dans des endroits dangereux\n\n2. Le sentiment de sécurité : le lit est + grand, ouvert sur toute la chambre…\n\n⇒ C'est pour ces raisons que je ne recommande pas le lit ouvert AVANT l'âge de 2,5-3 ans\n\nMais dans tous les cas, ça reste un choix parental.\nC'est VOUS qui décidez ce qui vous semble le + juste pour votre enfant et pour votre famille." },
            { type: "question", text: "Qu'est-ce qui vous semble le + juste pour vous, aujourd'hui :\n→ Garder le lit ouvert\n→ Retourner vers un lit à barreaux/parapluie ?\n\n(Ce n'est PAS DU TOUT une régression — c'est simplement un outil TEMPORAIRE pour un sommeil de grand !)" }
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
        { type: "normal", text: "- Il va y avoir **plusieurs chemins possibles** pour accompagner [prénom_enfant],\n  - et l'idée c'est vraiment de **trouver celui qui vous correspond le mieux**\n\n- Pour ça, j'aurais **besoin de savoir** :\n  - Est-ce que vous avez **BESOIN** **ça aille plutôt vite**,\n  - OU est-ce que vous **préférez mettre** un **peu + de progressivité** ?\n\n  - Sachant que la **progressivité pas à pas** sera:\n    - **+ douce**\n    - **MAIS + longue** en terme de résultats\n  - Tandis que le **chemin le + direct** permet de:\n    - **faire évoluer les choses + rapidement**\n    - mais **PEUT générer + d'émotions**\n\n- Donc, c'est **vraiment vous qui choisissez** le chemin en fonction de :\n  - ce que **vous préférez**\n  - de ce que vous **attendez en terme de rapidité**\n  - et VOTRE **gestion des émotions**" },
        { type: "question", text: "Avec tout ça en tête, qu'est-ce qui vous **semblerait le plus juste** pour vous et pour [prénom_enfant] :\n- **Quelque chose** de **plutôt progressif,**\n- Ou **quelque chose** de **+ rapide?**" },
        { type: "normal", text: "- Du coup, je préfère vous dire, pour **être totalement transparente** avec vous :\n  - QUAND on **met en place des changements**\n  - **même** avec **beaucoup de progressivité**,\n  - **il PEUT y avoir des émotions**\n  - surtout **au début.**\n    - ⇒ C'est tout à fait **NORMAL**\n\n- On va demander à [prénom_enfant] de **changer ses habitudes** et elle PEUT :\n  - **réagir**\n  - et **montrer qu'elle n'est pas d'accord**\n\n- Dans ces moments-là, CE QUI va **vraiment l'aider** c'est :\n  - que vous **soyez à ses côtés**\n  - et que **vous l'accompagniez** avec **COHERENCE**…" },
        { type: "conseil_vert", text: "- 👏 … et avec **TOUT** ce que vous avez **déjà mis en place**,\n- …vous êtes **sur la bonne voie**" },
        { type: "question", text: "Est-ce que vous êtes **à l'aise avec ça, avec les émotions?**" },
        {
          type: "option", label: "Si PAS OK avec les émotions 😭",
          blocks: [
            { type: "normal", text: "- **Merci** de me le dire, c'est **vraiment important pour MOI** de le savoir.\n- **Je comprends…** c'est **difficile d'entendre son enfant pleurer**\n- Et franchement, **personne n'aime ça**\n\n- Et **CE QUE** je peux vous **dire TOUT DE SUITE**\n  ⇒ c'est qu'**ON NE** va **PAS laisser** [prénom_enfant] **seul** avec ses pleurs.\n\n- **Par contre**, il y a **quelque chose d'important** à comprendre :\n  - Les **pleurs chez l'enfant**, c'est surtout une **façon de communiquer.**\n\n- Aujourd'hui, on va **lui demander de changer une habitude**\n  … et **comme pour nous,**\n  - le changement\n  - personne n'aime ça !\n\n- Donc oui, c'est **possible** qu'il réagisse,\n  - qu'il **proteste**\n  - ou qu'il **pleure**\n  - pour dire \"je préférais avant\"\n  ⇒ Et ça… c'est une **réaction normale**\n\n- L'idée, encore une fois, c'est vraiment de **VOUS respecter**\n- On va simplement :\n  - **adapter l'accompagnement**\n  - pour que ce soit le **+ confortable** possible **POUR VOUS**.\n\n- On pourra aller vers quelque chose :\n  - **de** + progressif\n  - **avec des** ajustements tout en douceur\n  - **et vous** POURREZ avancer à VOTRE rythme\n\n- Et surtout, **vous ne SEREZ PAS SEULE**\n- On va **LE faire ensemble**\n- … ET LUI il aura **SURTOUT** besoin :\n  - de sentir que **VOUS** êtes là\n  - et que **vous SAVEZ** ce que vous faites" }
          ]
        },
        { type: "normal", text: "- Alors, **si ça vous va** :\n  - On va pouvoir **passer à la suite,**\n  - et **voir concrètement COMMENT** on va **mettre ça en place**" },
      ]
    },

  ],

  // ── SECTIONS CONDITIONNELLES ─────────────────────────────
  conditional: [

    // ─── CONFORT ──────────────────────────────────────────
    {
      id: "rgo_allergie",
      problematiqueId: "rgo_allergie",
      title: "Confort – RGO + Allergie (APLV)",
      emoji: "🩺",
      blocks: [
        { type: "normal", text: "Avant de commencer à parler 'sommeil'\nj'aimerais, si vous êtes d'accord, qu'on prenne un petit moment pour revenir sur CE QUE vous m'avez partagé\n\nParce que dans tout ce que vous décrivez, on sent qu'il y a beaucoup de choses à gérer et que ça peut parfois être un peu lourd au quotidien — parce que c'est pas simple à vivre." },
        { type: "separator", text: "✅ Cochez les symptômes présents" },
        {
          type: "checklist", label: "Symptômes rapportés par les parents",
          items: [
            "Il régurgite beaucoup",
            "Il a du mal à rester allongé",
            "Il a un sommeil très agité",
            "Les repas sont parfois compliqués (s'arc en arrière, rejette biberon/sein)",
            "On sent qu'il est souvent gêné ou inconfortable",
            "Il se cambre",
            "Il y a de l'eczéma / peau atopique",
            "Régurgitations en jet sur tout le temps d'éveil / lait caillé",
            "Respiration sifflante / bruits de dinosaure",
            "Ronflements (amygdales enflammées) / dort la bouche ouverte",
            "Sphère ORL : otites à répétition, toux chronique, bronchite à répétition",
            "Nez pris H24",
            "Selles diarrhéiques",
            "Contact direct avec PLV à la maternité puis allaitement",
          ]
        },
        { type: "normal", text: "Pris séparément, CE SONT des choses qu'on peut voir assez souvent\nMAIS QUAND on peut lister au moins 2 symptômes,\nlà, ça me fait me dire qu'il y a peut-être autre chose derrière" },
        { type: "important", text: "⇒ Pour moi, ça me met la puce à l'oreille :\n⇒ il POURRAIT s'agir d'une possible allergie (notamment aux Protéines de Lait de Vache = APLV)\n\nC'est une allergie qui est de plus en plus diagnostiquée chez les enfants\nD'ailleurs, chez les BB présentant un RGO, on estime qu'environ 40% sont concernés\n\n⚠️ ATTENTION : ça ne veut pas dire que c'est forcément CA\net moi je ne suis pas médecin, je ne pose pas de diagnostic\n\nMais ça peut être intéressant d'en parler avec votre médecin\npour qu'il explore cette piste, simplement pour confirmer ou pour écarter cette hypothèse" },
        { type: "question", text: "Je ne sais pas si ça vous parle, ce que je vous dis ?\nSi vous aviez des petits soupçons… ou pas du tout ?" },
        { type: "question", text: "Est-ce que ça vous irait qu'on en parle un peu… tout à l'heure?" },
      ]
    },

    {
      id: "allergie_seule",
      problematiqueId: "allergie_seule",
      title: "Confort – Suspicion Allergie (APLV)",
      emoji: "🌿",
      blocks: [
        { type: "normal", text: "Avant de commencer à parler 'sommeil'\nj'aimerais, si vous êtes d'accord, qu'on prendre un petit moment pour revenir sur CE QUE vous m'avez partagé\n\nParce que DANS CE QUE vous m'avez décrit… il y a plusieurs petites choses qui ONT attiré mon attention :" },
        {
          type: "checklist", label: "Éléments qui attirent mon attention",
          items: [
            "Eczéma / peau atopique",
            "Régurgitations fréquentes / avec du lait caillé",
            "Durée sur tout le temps d'éveil",
            "Repas compliqués (s'arc en arrière, rejette biberon/sein)",
            "Soucis ORL à répétition (otites, bronchites)",
            "Nez pris H24 / toux",
            "Selles diarrhéiques",
          ]
        },
        { type: "normal", text: "Pris séparément, ce sont des choses qu'on peut voir assez souvent\nmais QUAND on peut lister au moins 2 symptômes, ça me fait me dire qu'il y a peut-être autre chose derrière" },
        { type: "important", text: "⇒ il POURRAIT s'agir d'une possible allergie (notamment aux Protéines de Lait de Vache = APLV)\n\nATTENTION : ça ne veut pas dire que c'est forcément ça\net moi je ne suis pas médecin, je ne pose pas de diagnostic" },
        { type: "question", text: "Est-ce que ça vous irait qu'on en parle un peu… tout à l'heure?" },
      ]
    },

    {
      id: "rgo_seul",
      problematiqueId: "rgo_seul",
      title: "Confort – RGO",
      emoji: "😣",
      blocks: [
        { type: "normal", text: "Avant de commencer à parler 'sommeil'\nj'aimerais, si vous êtes d'accord, qu'on prenne un petit moment\npour revenir sur CE QUE vous m'avez partagé… sur son reflux" },
        { type: "separator", text: "✅ Cochez les symptômes présents" },
        {
          type: "checklist", label: "Ce que vous m'avez décrit",
          items: [
            "Il régurgite beaucoup",
            "Il a du mal à rester allongé",
            "Il a un sommeil très agité",
            "Les repas sont parfois compliqués",
            "On sent qu'il est souvent gêné ou inconfortable",
            "Il se cambre",
          ]
        },
        { type: "empathie", text: "⇒ c'est normal que ce soit difficile pour vous.\n\nLe reflux, même si des fois il peut être discret, va impacter sur énormément de choses du quotidien" },
        { type: "important", text: "Alors, on aura BEAU tout mettre en œuvre au niveau du sommeil,\n⇒ si il y a toujours ce petit caillou, cet inconfort\n⇒ malheureusement, le sommeil sera toujours perturbé." },
        { type: "separator", text: "Causes du RGO" },
        { type: "normal", text: "Il peut y avoir différentes causes :\n\nMécanique :\n→ Système digestif immature (Sphincter Inférieur de l'œsophage immature)\n→ Tensions corporelles\n→ Freins restrictifs\n→ Problème de succion\n\nAlimentaire :\n→ Allergie\n→ Œsophage court\n→ Beaucoup d'horizontalité\n→ Trop d'alimentation\n→ Système digestif immature (microbiote immature)" },
        { type: "normal", text: "Donc, l'idée ici n'est pas de se focaliser uniquement sur le reflux, mais d'avoir une lecture globale de la situation :\n→ Essayer de trouver la cause, avant de s'attaquer aux symptômes\n→ Est-ce que les apports sont suffisants et bien répartis ?\n→ Est-ce que le rythme est adapté à son âge ?\n→ Y a-t-il des signes d'inconfort digestif au quotidien ?\n\nMon rôle, ce n'est pas d'étiqueter ou de poser un diagnostic\nMAIS de NE PAS passer à côté de quelque chose qui pourrait expliquer ces troubles du sommeil\n\nEt une fois qu'on aura remis du confort dans son quotidien, tout le reste deviendra beaucoup + simple, et surtout + durable pour son sommeil" },
        { type: "question", text: "Est-ce que ça vous irait qu'on parle de conseils concrets pour soulager son RGO ?" },
      ]
    },

    // ─── NUTRITION ────────────────────────────────────────
    {
      id: "nutrition_courbe",
      problematiqueId: "nutrition_courbe",
      title: "Nutrition – Courbe déclinante (Faim)",
      emoji: "📉",
      blocks: [
        { type: "normal", text: "Je peux voir qu'il y a quelque chose au niveau des apports alimentaires.\n\nAvant de travailler le sommeil, on vient toujours s'assurer que les besoins nutritionnels d'un enfant sont bien couverts car un corps qui manque d'énergie aura + de mal à s'apaiser et à enchaîner ses cycles" },
        { type: "normal", text: "On peut voir les courbes un peu comme notre tableau de bord : elles nous aident à savoir si le corps reçoit assez d'énergie pour soutenir un sommeil de qualité\n\n🔥 [prénom_enfant] est né autour du XXème percentile\nPuis progressivement, il s'est stabilisé autour du XXème percentile.\n⇒ Concrètement, il a perdu XX couloirs depuis sa naissance.\n\nEn général, un enfant suit plutôt le couloir dans LEQUEL il est né ⇒ c'est son couloir de référence" },
        { type: "question", text: "Pour moi, l'explication la + probable :\n⇒ c'est que [prénom_enfant] a encore faim ENTRE ses prises alimentaires\n\nEt quand les besoins d'un enfant ne sont pas complètement couverts\n→ Ça se reflète très souvent par un sommeil fragmenté\n\n🎯 L'objectif serait donc d'adapter progressivement la répartition de ses apports\n\n⇒ Est-ce que ça fait sens pour vous ?" },
      ]
    },

    {
      id: "nutrition_espacement_long",
      problematiqueId: "nutrition_espacement_long",
      title: "Nutrition – Espacement trop long",
      emoji: "⏱️",
      blocks: [
        { type: "normal", text: "🔥 Aujourd'hui, les prises alimentaires de [prénom_enfant] sont espacées d'environ XX h\n\nC'est un espacement relativement LONG pour un enfant de cet âge\nÀ cet âge, les enfants ont besoin de prises + rapprochées pour s'adapter à leurs signaux de faim et à leur digestion\n\n🎓 On devrait normalement leur donner : 'à la demande'\nEt se défaire complètement du mythe des espacements de 4h… qui n'est basé sur RIEN DU TOUT !" },
        { type: "question", text: "Pour moi, l'explication la + probable :\n⇒ c'est que [prénom_enfant] a encore faim ENTRE ses prises alimentaires car elles sont trop espacées\n\nEt quand les besoins d'un enfant ne sont pas complètement couverts → Ça se reflète très souvent par un sommeil fragmenté\n\n🎯 L'objectif serait d'adapter progressivement la répartition de ses apports :\n→ avec des prises + rapprochées\n→ des volumes + adaptés\n\n⇒ Est-ce que ça fait sens pour vous ?" },
      ]
    },

    {
      id: "nutrition_espacement_court",
      problematiqueId: "nutrition_espacement_court",
      title: "Nutrition – Espacement trop court (Inconfort)",
      emoji: "🔄",
      blocks: [
        { type: "normal", text: "🔥 Aujourd'hui, les prises de [prénom_enfant] sont espacées d'environ XX h\nC'est un espacement relativement COURT — c'est plutôt un rythme de nourrisson, avec des prises très rapprochées\n\n⇒ Son estomac est constamment sollicité\n⇒ Ce qui peut provoquer un certain inconfort digestif" },
        { type: "question", text: "Pour moi, l'explication la + probable :\n⇒ c'est que [prénom_enfant] a un vrai inconfort digestif\nSon système digestif travaille presque en continu, SANS véritable temps de repos.\n\n🎯 L'objectif serait d'adapter progressivement la répartition de ses apports :\n→ avec des prises - rapprochées pour mieux respecter sa digestion\n→ des volumes + adaptés\n\n⇒ Est-ce que ça fait sens pour vous ?" },
      ]
    },

    {
      id: "nutrition_inversion_jour_nuit",
      problematiqueId: "nutrition_inversion_jour_nuit",
      title: "Nutrition – Inversion Jour/Nuit 🌞🌛",
      emoji: "🌛",
      blocks: [
        { type: "normal", text: "Nous observons que la majorité des apports alimentaires se fait la NUIT\n\nEn journée, [prénom_enfant] se nourrit relativement peu — et le soir, il semble chercher à 'rattraper' ses besoins\n\nOr, la nuit n'est PAS un moment optimal pour se nourrir :\n→ le corps est programmé pour dormir\n→ les prises alimentaires peuvent être moins efficaces" },
        { type: "question", text: "Pour moi, l'explication la + probable :\n⇒ c'est que [prénom_enfant] a encore faim pendant la nuit car il n'a pas suffisamment mangé en JOURNÉE.\n\nSon corps a appris que la nuit était faite pour manger — et que la journée n'était que secondaire.\nLes nombreux réveils nocturnes ne sont donc pas forcément dus à un 'problème de sommeil'.\n⇒ Ils sont la conséquence logique d'apports caloriques majoritairement nocturnes.\n\n⇒ Est-ce que ça fait sens pour vous ?" },
      ]
    },

    {
      id: "nutrition_jus_vegetaux",
      problematiqueId: "nutrition_jus_vegetaux",
      title: "Nutrition – Jus végétaux / Lait animal inadapté",
      emoji: "🐄",
      blocks: [
        { type: "normal", text: "Aujourd'hui, [prénom_enfant] boit des biberons de jus végétal/lait animal en quantité importante\n\nLes jus végétaux et laits animaux ne sont pas TOUJOURS adaptés aux besoins des enfants — ils sont soit trop pauvres, soit trop riches en certains nutriments essentiels à leur croissance\n\nCes boissons PEUVENT faire partie de l'alimentation familiale\nmais elles ne couvrent PAS les besoins nutritionnels d'un jeune enfant\n\nJusqu'à au moins 3 ans, Le lait (infantile ou maternel) reste INDISPENSABLE dans l'alimentation des enfants\n(source : Haute Autorité de Santé, et le PNNS)" },
        { type: "question", text: "Pour moi, l'explication la + probable :\n⇒ c'est que [prénom_enfant] a faim — il a CERTES souvent l'estomac rempli\nMAIS PAS forcément avec les bons apports pour grandir et être rassasié\n\n⇒ 🎯 L'idée serait d'adapter la QUALITÉ de ses apports nutritionnels\n\n⇒ Est-ce que ça fait sens pour vous ?" },
      ]
    },

    // ─── RYTHME ──────────────────────────────────────────
    {
      id: "rythme_dette_sommeil",
      problematiqueId: "rythme_dette_sommeil",
      title: "Rythme – Dette de sommeil",
      emoji: "😴",
      blocks: [
        { type: "normal", text: "Aujourd'hui, [prénom_enfant] a un total de sommeil sur 24h plutôt bas pour son âge.\n\n⇒ Du coup :\n→ la fatigue s'accumule au fur et à mesure de la journée\n→ et son corps va réagir en sécrétant du cortisol (hormone de l'éveil)\n→ (💭 un peu comme nous avec le café !) pour 'tenir éveillé'\n\nSAUF qu'en fin de nuit, SI ce cortisol accumulé EN JOURNÉE est trop élevé\n⇒ Il va prendre le dessus sur la mélatonine (hormone du sommeil)… QUI ELLE est en train de diminuer\n\n💭 Le sommeil c'est comme une balance : si le cortisol est trop important, ça va faire pencher la balance du côté de l'éveil" },
      ]
    },

    {
      id: "rythme_reveil_matinal",
      problematiqueId: "rythme_reveil_matinal",
      title: "Rythme – Réveil matinal précoce 🌄",
      emoji: "🌅",
      blocks: [
        { type: "normal", text: "Je peux voir que [prénom_enfant] se réveille tôt le matin\n\nEn fin de nuit, le sommeil devient naturellement + léger\n🎓 C'est une phase où le cerveau est beaucoup + sensible à ce qui se passe autour\n\nDu coup, certains enfants vont réduire leur nuit au strict minimum et se réveiller tôt matin :\n→ PAS parce qu'ils n'ont PLUS besoin de dormir\n→ MAIS parce que leur cerveau est déjà en mode 'allez, on démarre !'" },
        { type: "question", text: "CE QUE je vous propose, c'est qu'on discute ensemble\nde COMMENT sortir doucement de ce petit 'jeu' qui s'est installé\nen vous proposant des manières concrètes de réagir\npour que la fin de nuit se passe + calmement\net que [prénom_enfant] puisse se rendormir + facilement\n\n⇒ Est-ce que vous sentez que ça a du sens pour vous ?" },
      ]
    },

    {
      id: "rythme_activite_physique",
      problematiqueId: "rythme_activite_physique",
      title: "Rythme – Manque d'activité physique",
      emoji: "🏃",
      blocks: [
        { type: "normal", text: "Ce que je remarque aussi, c'est que [prénom_enfant] a des moments dans la journée où il est plutôt calme, où il bouge un peu moins.\n\nCependant, à cet âge-là, les enfants ont AUSSI besoin de bouger !\n\n💭 Imaginez : si vous passiez une journée entière assis sans bouger et qu'on vous demandait de bien dormir le soir…\nCe serait difficile ! Parce que votre corps n'a pas accumulé assez de fatigue physique.\n\nPour [prénom_enfant], c'est un peu la même chose :\n→ s'il a eu PEU d'occasions de bouger,\n→ il accumule MOINS de pression de sommeil\n→ et l'endormissement peut être + difficile" },
        { type: "question", text: "Donc l'objectif serait de lui proposer DAVANTAGE de moments pour bouger et explorer…\n⇒ pour favoriser son endormissement.\n\n⇒ Est-ce que ça vous parle jusque là?" },
      ]
    },

    // ─── STRATÉGIE ───────────────────────────────────────
    {
      id: "strategie_presence",
      problematiqueId: "strategie_presence",
      title: "Stratégie – Présence parentale indispensable",
      emoji: "👐",
      blocks: [
        { type: "normal", text: "Aujourd'hui, [prénom_enfant] ne s'endort que :\n→ Avec votre présence\n→ Dans vos bras, en le berçant\n→ Avec votre contact physique\n\nEt quand il se réveille, l'environnement a parfois changé :\n→ Il est seul, dans son lit, vous n'êtes plus là, il n'a plus ses éléments rassurants\n→ Pas très rassurant, n'est-ce pas ?" },
        { type: "normal", text: "Pour comprendre ce qui se passe avec ses rendormissements difficiles ⇒ il faut comprendre la structure du sommeil :\n\nSon sommeil est composé de cycles, et entre chaque cycle, on fait TOUS des micro-réveils (tout à fait normaux)\nle cerveau va faire :\n→ un léger retour à la surface\n→ 'vérifier' que tout va bien\n→ puis va se rendormir de manière inconsciente\n\nChez la plupart des enfants, ces micro-réveils passent inaperçus, car ils retrouvent les MÊMES conditions qu'à l'endormissement\n\nMais pour [prénom_enfant] : il s'est endormi dans vos bras… et là il se réveille seul dans son lit." },
        { type: "question", text: "Du coup si on résume tout ça :\nCe n'est PAS que [prénom_enfant] refuse de dormir\nC'est tout simplement qu'il ne SAIT PAS encore COMMENT s'endormir autrement.\n\nL'objectif va être de l'accompagner pour :\n→ qu'il découvre SES PROPRES stratégies d'endormissement autonomes\n→ pour qu'il puisse se rendormir seul entre 2 cycles de sommeil\n\n⇒ Est-ce que ça fait sens pour vous ?" },
      ]
    },

    {
      id: "strategie_tetine",
      problematiqueId: "strategie_tetine",
      title: "Stratégie – Tétine (cause de réveils)",
      emoji: "🍭",
      blocks: [
        { type: "normal", text: "Concernant la tétine, elle peut jouer un RÔLE dans ces réveils.\n\nAujourd'hui, [prénom_enfant] s'endort avec la tétine\nEt DONC à la fin d'un cycle de sommeil, il y a CE fameux 'micro-réveil'\nLe cerveau remonte un peu à la surface, vérifie que tout va bien…\n⇒ Sauf que là… [prénom_enfant] va se rendre compte que sa tétine n'est plus là.\n\nEt comme, la tétine fait partie de sa stratégie pour s'endormir\n⇒ Il va vous appeler pour que vous veniez la lui remettre\n\nEt ça, c'est quelque chose de très fréquent !" },
        { type: "question", text: "Du coup, il y a 2 chemins possibles… et les 2 sont tout à fait valables :\n\n→ La 1ère option : GARDER la tétine\n→ La 2ème option : la supprimer définitivement\n→ Option hybride : la supprimer durant les temps de sommeil uniquement\n\n⇒ Vers quoi vous voudriez aller ?" },
      ]
    },

    {
      id: "strategie_biberon_sein",
      problematiqueId: "strategie_biberon_sein",
      title: "Stratégie – Biberon / Sein pour s'endormir",
      emoji: "🍼",
      blocks: [
        { type: "normal", text: "Aujourd'hui, [prénom_enfant] s'endort avec le biberon / en tétant\n\nC'est une stratégie d'endormissement qui est très confortable pour lui\nMais le problème, c'est que :\n→ son cerveau associe le fait de manger avec le fait de s'endormir\n→ et donc, à chaque micro-réveil entre deux cycles de sommeil,\n→ son cerveau va chercher cette même condition pour se rendormir\n⇒ Et il va vous appeler !" },
        { type: "question", text: "L'objectif va être d'aider [prénom_enfant] à dissocier le moment de l'alimentation du moment de l'endormissement\n\n⇒ Est-ce que ça fait sens pour vous ?" },
      ]
    },

    // ─── ENVIRONNEMENT ────────────────────────────────────
    {
      id: "env_obscurite",
      problematiqueId: "env_obscurite",
      title: "Environnement – Obscurité insuffisante",
      emoji: "🌑",
      blocks: [
        { type: "normal", text: "Ce que je vois, c'est que la chambre de [prénom_enfant] n'est pas complètement dans le noir…\n\nEn journée, l'obscurité va permettre de couper les stimulations visuelles :\n→ quand il n'y a rien à voir, il n'y a rien à faire… à part dormir !\n\net le soir, elle joue un rôle important puisqu'elle va aider à la sécrétion de la mélatonine\n\n💭 C'est un peu comme si, en allant vous coucher ce soir, vous voyiez une tache au plafond\n⇒ vous allez cogiter, votre cerveau va être stimulé, et vous allez avoir du mal à vous endormir\n\nPour [prénom_enfant], c'est exactement la même chose !\n⇒ La chambre idéale : obscurité totale (note 10/10), rideaux occultants ou store blackout" },
      ]
    },

    {
      id: "env_temperature",
      problematiqueId: "env_temperature",
      title: "Environnement – Température trop élevée",
      emoji: "🌡️",
      blocks: [
        { type: "normal", text: "Aujourd'hui, on est un peu au-dessus des 19 degrés… et ça peut jouer, mine de rien, sur le sommeil de [prénom_enfant].\n\nParce que pour bien dormir, le corps a besoin de diminuer légèrement sa température corporelle…\n⇒ et la température de la chambre va nous aider\n\n💭 On l'a TOUS déjà vécu : quand il fait très chaud l'été, même quand on est fatigué…\n⇒ on va beaucoup moins bien dormir !\n\nPour [prénom_enfant], c'est exactement la même chose.\nSi la chambre est un peu trop chaude, ça peut rendre :\n→ l'endormissement + difficile, le sommeil moins profond\n→ …et donc des réveils multiples !\n\n⇒ Température idéale : entre 18 et 20°C" },
      ]
    },

    {
      id: "env_lit_ouvert",
      problematiqueId: "env_lit_ouvert",
      title: "Environnement – Lit ouvert trop tôt",
      emoji: "🛏️",
      blocks: [
        { type: "normal", text: "J'aimerais AUSSI revenir sur le lit ouvert de [prénom_enfant]\n\nAvoir un lit ouvert, c'est une étape importante du développement et de l'autonomie d'un enfant\nMais avec un lit ouvert, il y a quelques éléments importants à avoir en tête :\n\n1. La sécurité : il peut se lever et se promener dans toute la maison, parfois dans des endroits dangereux\n\n2. La règle 'tu dois rester dans ton lit' :\nPour un enfant de cet âge, c'est une responsabilité très lourde.\nLe désir d'explorer est NORMAL\net rester dans son lit toute la nuit peut être très difficile pour lui.\n\n⇒ C'est pour ces raisons que je ne recommande pas le lit ouvert AVANT l'âge de 2,5-3 ans\n\nMais dans tous les cas, ça reste un choix parental.\nC'est VOUS qui décidez ce qui vous semble le + juste pour votre enfant et pour votre famille." },
        { type: "question", text: "Qu'est-ce qui vous semble le + juste pour vous, aujourd'hui :\n→ Garder le lit ouvert\n→ Retourner vers un lit à barreaux/parapluie ?\n\n(Ce n'est PAS DU TOUT une régression — c'est simplement un outil TEMPORAIRE pour un sommeil de grand !)" },
      ]
    },

    {
      id: "env_rituel",
      problematiqueId: "env_rituel",
      title: "Environnement – Rituel absent / trop court",
      emoji: "🌙",
      blocks: [
        { type: "normal", text: "Aujourd'hui, [prénom_enfant] n'a pas vraiment de rituel du soir, ou alors il est assez court\n\nEn fait, les enfants ont besoin d'un moment rassurant et prévisible avant de dormir\n\n💭 Pour vous donner une image :\nEn prenant l'avion, vous avez des rituels avant de décoller :\n1. on attache les ceintures\n2. on écoute les consignes de sécurité\n3. on vérifie que le réservoir est plein.\n⇒ Ces gestes répétés nous rassurent et nous préparent à partir.\n\nPour [prénom_enfant], le rituel du soir, c'est exactement pareil : ça le rassure et prépare doucement son cerveau à la nuit.\n\nUn bon rituel :\n→ 20 à 30 minutes de rituel calme\n→ Toujours dans le même ordre\n→ Dans la chambre ou au moins finir dans la chambre\n→ Sans écran\n→ Avec des éléments constants : bain, histoire, chanson, massage…" },
      ]
    },

    {
      id: "env_cadre",
      problematiqueId: "env_cadre",
      title: "Environnement – Cadre non clair",
      emoji: "🗺️",
      blocks: [
        { type: "normal", text: "Là, ce que je vois, c'est que parfois, pour [prénom_enfant], ce n'est pas toujours la même réponse selon les moments.\n\nMais les enfants ont besoin de savoir à QUOI s'attendre pour se sentir en sécurité et se rassurer\n\n💭 Pour vous donner une image :\nC'est comme si vous deviez aller manger chez Tata Martine.\nS'il y a plusieurs chemins possibles, vous en choisissez 1.\nEt au bout d'un moment, vous connaissez ce chemin par cœur — Ça devient automatique.\n\nPour [prénom_enfant], c'est pareil :\nquand c'est clair et toujours pareil,\nil sait à quoi s'attendre\net ça rend les choses plus faciles… pour lui… et pour vous aussi" },
      ]
    },

    {
      id: "env_stimulations",
      problematiqueId: "env_stimulations",
      title: "Environnement – Stimulations visuelles",
      emoji: "👀",
      blocks: [
        { type: "normal", text: "Aujourd'hui, [prénom_enfant] s'endort dans une chambre où il y a pas mal de choses autour qui peuvent attirer son regard et le maintenir éveillé + longtemps.\n\nEt ce n'est PAS un reproche… c'est JUSTE une observation\n\nL'environnement joue un vrai rôle dans la façon dont on se détend et dont on s'endort\n\n💭 C'est comme aller au cinéma :\nsi la salle est pleine de lumières et de bruits ⇒ on aura du mal à rentrer dans le film\nsi au contraire tout est calme et feutré ⇒ on plonge beaucoup plus facilement\n\nPour [prénom_enfant], le fait de simplifier l'environnement visuel de sa chambre\nva lui envoyer un signal clair : 'c'est le moment de se poser'" },
      ]
    },

    // ─── RELATIONNEL ─────────────────────────────────────
    {
      id: "relationnel_conflit",
      problematiqueId: "relationnel_conflit",
      title: "Enjeux relationnels – Conflit / Lit parental",
      emoji: "💬",
      blocks: [
        { type: "normal", text: "Aujourd'hui [prénom_enfant] :\n→ Vient souvent vous rejoindre dans votre lit 🛏️\n→ semble parfois en 'conflit' avec vous sur différents sujets\n⇒ Alors qu'à la crèche/chez Papy et Mamie, ça ne se passe pas comme ça !\n\nÀ son âge, il commence à comprendre qu'il peut influencer les choses autour de lui\n→ Et il découvre que certains comportements peuvent lui permettre d'avoir PLUS de temps avec vous\n\nCe n'est PAS de la manipulation — c'est tout à fait normal !" },
        { type: "question", text: "CE QUE je vous propose, c'est qu'on discute ensemble\nde COMMENT sortir doucement de ce petit 'jeu relationnel' qui s'est installé\nen vous proposant des manières concrètes de réagir\npour que le coucher puisse se passer beaucoup + sereinement… pour tout le monde\n\n⇒ Est-ce que vous reconnaissez VOTRE situation… dans ce que je vous dis là?" },
      ]
    },

    {
      id: "relationnel_rappels",
      problematiqueId: "relationnel_rappels",
      title: "Enjeux relationnels – Rappels multiples après coucher",
      emoji: "📢",
      blocks: [
        { type: "normal", text: "Aujourd'hui [prénom_enfant] fait de nombreux rappels…après l'avoir couché\n⇒ Alors qu'à la crèche/chez Papy et Mamie, ça ne se passe pas comme ça !\n\nÀ son âge, il n'y a rien de plus excitant que de jouer ou de rester avec vous !\nEt le coucher, c'est une séparation qu'il n'a pas forcément envie de faire.\n\nDu coup, il va tout faire pour retarder ce moment :\n→ il a soif, il a faim, il a chaud, il a froid…\n→ il a perdu son doudou, il veut un câlin, il a besoin d'aller aux toilettes\n→ …ou il a juste 'peur'\n\nMais en réalité : ce n'est PAS forcément une difficulté liée au sommeil\nmais c'est surtout un besoin de relation qui s'exprime — c'est tout à fait normal !" },
        { type: "question", text: "CE QUE je vous propose, c'est qu'on discute ensemble\nde COMMENT sortir doucement de ce petit 'jeu relationnel' qui s'est installé\npour que le coucher puisse se passer beaucoup + sereinement… pour tout le monde\n\n⇒ Est-ce que vous reconnaissez VOTRE situation… dans ce que je vous dis là?" },
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

    {
      id: "plan_rythme",
      problematiqueId: null,
      title: "Plan – Organisation de la journée",
      emoji: "⏰",
      blocks: [
        { type: "normal", text: "On va donner à [prénom_enfant] des repères cohérents :\n→ Des moments qui vont se répéter TOUS LES JOURS,\n→ des manières d'agir similaires, que ce soit à la maison, chez la nounou ou à la crèche\n\n💡 Un TE (Temps d'Éveil) commence à partir du moment où l'enfant s'est réveillé\n(donc un rallongement de sieste qui n'a pas fonctionné FAIT PARTIE du TE)\nSAUF pour le 1er TE : il commence à partir de la sortie du lit, pour donner un tempo à la journée\n\n⚠️ Tout ce qui va se passer AVANT l'heure du réveil le matin sera considéré comme un réveil nocturne" },
        { type: "important", text: "🔥 Proposition d'un nouvel emploi du temps adapté à [prénom_enfant] :\n[→ À compléter en live pendant la consultation selon l'âge et le rythme de l'enfant]" },
      ]
    },

    {
      id: "plan_environnement",
      problematiqueId: null,
      title: "Plan – Environnement de sommeil",
      emoji: "🏠",
      blocks: [
        { type: "normal", text: "Maintenant, je vous propose d'aborder le levier 'environnement de sommeil' de [prénom_enfant]\n\nC'est quelque chose sur lequel on PEUT agir ASSEZ facilement, mais qu'on a souvent tendance à négliger…\nalors qu'il joue un rôle clé dans la qualité du sommeil." },
        { type: "conseil", text: "✅ Checklist environnement de sommeil optimal :\n\n🌑 Obscurité totale\n   → Rideaux occultants ou store blackout\n   → Vérifier fenêtres, LED, veilleuses\n\n🌡️ Température idéale : 18-20°C\n   → Pas de surchauffe — adapter tenue/turbulette\n\n🔇 Bruit blanc si nécessaire (temporaire)\n   → Utile si bruits extérieurs ponctuels — sur tout le temps de la nuit/sieste\n\n🛏️ Lit adapté à l'âge\n   → Avant 2,5-3 ans : lit fermé (barreaux ou parapluie)\n   → Pas de coussin/couverture avant 2 ans\n   ⚠️ Attention aux éléments DANS et AUTOUR du lit (risque d'étouffement)\n\n🌙 Rituel régulier\n   → 20-30 minutes de rituel calme\n   → Toujours dans le même ordre\n   → Sans écran\n\n👁️ Stimulations visuelles réduites\n   → Chambre sobre — pas de lumières/jouets lumineux pendant le sommeil\n\n📷 Photos de la chambre\n   → [Voir les photos envoyées par les parents]" },
      ]
    },

    {
      id: "plan_strategie_accompagnement",
      problematiqueId: null,
      title: "Plan – Stratégie d'accompagnement",
      emoji: "😴",
      blocks: [
        { type: "normal", text: "Maintenant, on va parler de COMMENT accompagner les émotions\n\n🎯 Objectif de l'enfant :\nDécouvrir PAR LUI-MÊME de nouvelles manières de s'endormir\nC'est en EXPÉRIMENTANT seulement qu'il pourra se sentir fier d'avoir réussi\n\n🎯 Objectif du parent :\nVotre objectif ne sera PAS de stopper la colère mais de l'accueillir\nVotre travail c'est d'avoir confiance en votre enfant et de le lui dire" },
        { type: "normal", text: "Il y a 2 grands chemins possibles :\n→ Le chemin PROGRESSIF : plus doux, génère peut-être moins d'émotions, mais les changements arrivent plus lentement\n→ Le chemin DIRECT : peut générer + d'émotions mais les changements arrivent + rapidement\n\nC'est vraiment vous qui choisissez en fonction de :\n→ ce que vous préférez\n→ de ce que vous attendez en terme de rapidité\n→ et de gestion des émotions." },
        { type: "question", text: "Avec tout ça en tête, qu'est-ce qui vous semblerait le plus juste pour vous et pour [prénom_enfant] :\n→ Quelque chose de plutôt progressif,\n→ ou quelque chose de + rapide?" },
        { type: "separator", text: "Étapes progressives possibles" },
        { type: "conseil", text: "Étape 1 : L'accompagner dans son lit\n→ Le mettre dans son lit ÉVEILLÉ\n→ Garder une main immobile sur lui\n→ En cas d'émotions : Bercer de la main temporairement\n→ Rester jusqu'à l'endormissement\n\nÉtape 2 : L'accompagner depuis le milieu de la chambre\n→ Positionner une chaise au milieu de la chambre\n→ Supprimer le contact physique en continu\n→ En cas d'émotions : Poser une main immobile sur lui temporairement\n→ Rester jusqu'à l'endormissement\n\nÉtape 3 : Sortir une fois posé dans son lit\n→ Sortir de la chambre une fois déposé\n\nÉtape 4 : Accompagner depuis l'entrebâillement\n→ Accompagner les émotions depuis l'entrebâillement de la porte\n→ Fermer la porte quand il est calme\n→ Recommencer si besoin 20 fois… ou plus !" },
        { type: "important", text: "💭 En cas de pleurs difficiles :\nLes pleurs chez l'enfant, c'est surtout une façon de communiquer.\nAujourd'hui, on va lui demander de changer une habitude — et le changement, personne n'aime ça !\nDonc oui, c'est possible qu'il réagisse, qu'il proteste — mais vous serez là pour l'accompagner.\n\n💖 Si envie d'un câlin ?\nN'hésitez pas à vous écouter et à écouter votre enfant\nEssayez néanmoins de garder ses pieds qui touchent le matelas\n⚠️ À ne PAS le bercer mais RESTER STATIQUE\n⚠️ Il faudrait éviter qu'il ne s'endorme dans vos bras\n\n💖💖💖 Difficile d'entendre pleurer ?\nN'hésitez pas à le reprendre dans vos bras MAIS dans une POSITION DIFFÉRENTE de l'habitude (pour ne pas reproduire les mêmes stratégies d'endormissement)\n\n🥱 Fatigué ?\nN'hésitez pas à vous relayer. Dites simplement à votre enfant : 'maintenant Maman s'en va mais c'est Papa qui va venir. Et que vous l'aimez toujours'\n\n⚠️ L'OMS recommande sur le DOS ⇒ Il existe des alarmes de respiration pour se rassurer\nmais ne prévient pas à 100% de la Mort Inattendue du Nourrisson" },
        {
          type: "option", label: "💬💬💬 Multiples rappels après le coucher",
          blocks: [
            { type: "conseil", text: "Pour les rappels multiples, je vous invite à :\n\n→ Mettre en place un tableau de rituel visuel\n→ Répondre 1 SEULE fois\n→ Anticiper les rappels :\n   Nez qui coule → boîte de mouchoirs à disposition de l'enfant\n   Couette mal mise → surpyjama ou couette zippée\n   Doudou perdu → mettre un 2ème doudou, rendre le doudou visible la nuit (ruban phosphorescent)\n   Bouton qui gratte → pendant le rituel, proposer de la pommade anti-démangeaisons\n   Dernier câlin → pendant le rituel, bien verbaliser ce dernier câlin\n   Soif → gourde à proximité\n\n→ Donner 3 cartes pour 3 rappels ⇒ au-delà : le parent ne revient pas\n   (diminuer le nombre de cartes au fil du temps)\n\n→ Mettre en place un tableau de récompenses :\n   Chaque nuit SANS rappel → le matin : chocolat/bonbon, élément d'un kit playmobil…\n\n→ Faire des jeux de rôle en journée (ex: avec une poupée)\n\n→ Les livres de Caroline Ferriol pour les + grands (6,99€) :\n   → Arthur met du temps à s'endormir\n   → Jade veut dormir avec Papa et Maman\n   → Louise ne veut pas aller se coucher" }
          ]
        },
      ]
    },

    // ── IX. REFORMULATION ET STATISTIQUES ──────────────────
    {
      id: "reformulation",
      title: "IX. Reformulation et statistiques",
      emoji: "📊",
      blocks: [
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
      { type: "question", text: "Est-ce que j'ai **répondu à ces objectifs**?" },
      {
        type: "option", label: "Si parent pas OK / perdu 😕", style: "purple",
        blocks: [
          { type: "normal", text: "- Ok je **vous entends**\n- Et **merci de me le dire** !" },
          {
            type: "option", label: "Si pas OK avec les valeurs/objectifs", style: "purple",
            blocks: [
              { type: "question", text: "Qu'est-CE QUI… **dans ce que j'ai proposé, ne vous ressemble PAS / ne vous parle PAS** ?\nEt à **l'inverse**, qu'est-ce qui serait **+ juste pour vous** ?" }
            ]
          },
          {
            type: "option", label: "Si c'est TROP ⇒ il faut reprendre", style: "purple",
            blocks: [
              { type: "normal", text: "- OK, on est parti sur **qqch d'un peu trop compliqué**\n- **Ce qui compte**, c'est que:\n  - vous vous **sentiez soutenu(e)**,\n  - **PAS sous pression**\n    - ⇒ On **va simplifier**" },
              { type: "question", text: "**Là**, qu'est-ce qui vous **semble faisable, même tout petit** ?\nEst-ce qu'il y a **besoin** de **mettre + de progressivité** ?" }
            ]
          },
          {
            type: "option", label: "Si parent perdu", style: "purple",
            blocks: [
              { type: "question", text: "J'ai **l'impression que c'est flou** pour vous là ⇒ est-ce que **je me trompe** ?" },
              { type: "important", text: "- 🔥 Si je devais vous **proposer 1 seule chose** pour commencer, ce serait <strong style=\"color:#C0392B\">XXX</strong>" }
            ]
          },
          { type: "normal", text: "- Je ne **peux PAS vous laisser** avec qqch qui ne vous **convient PAS** OU qui **n'est PAS aidant** pour vous.\n- Mais là, **malheureusement** je dois **arrêter là**\n- <strong style=\"color:#C0392B\"><u>JE</u></strong> n'ai **PAS pris le bon chemin**\n⇒ on va **trouver un autre chemin ensemble** et qui vous **convienne mieux**\n- MAIS **SI vous êtes d'accord**, je vous **propose qu'on se revoie** (gratuitement) :\n  - pour **reprendre tout ça + tranquillement**\n  - **simplifier**,\n  - et **ajuster** vraiment à **VOTRE rythme.**" },
          { type: "question", text: "Est-ce que **ça vous irait** qu'on **reprogramme un tps ensemble** pour **retravailler les choses + simplement**, à VOTRE rythme ?" },
          { type: "important", text: "- 🔥 Écoutez, le <strong style=\"color:#C0392B\">XXX</strong> à <strong style=\"color:#C0392B\">XXX</strong> heures je suis libre, est-ce que **ça vous conviendrait** ?" },
          { type: "normal", text: "- Ok, donc **on se reparle prochainement**\n- **En attendant**, vous pouvez :\n  - vous **reposer sur ce que l'on s'est dit**,\n  - et on **reprendra notre conversation**" },
          { type: "question", text: "Est-ce que c'est **OK pour vous** ?" },
          { type: "normal", text: "- Je vous souhaite une **bonne journée** et à **très bientôt**" },
          { type: "fin_consultation", text: "🏁 **FIN DE LA CONSULTATION** 🏁" }
        ]
      },
      { type: "question", text: "Est-ce qu'il vous **reste des questions**?" },
      { type: "question", text: "**QUAND** est-ce que vous pensez **pouvoir commencer** à **mettre ces changements en place** ?" },
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
      { type: "separator", text: "📅 Proposition de suivi" },
      { type: "question", text: "Moi, j'ai une **dernière question** pour VOUS qui est **très importante** :\n⇒ Comment vous **vous sentez LÀ,** à **l'idée de mettre** tout ceci **en place** ?" },
      { type: "normal", text: "- C'est super ! J'entends **plein de motivation** ! C'est génial !\n- Je vous **envoie** plein d'**énergie positive / bonnes ondes**\n- Je **vous souhaite** que les **nuits/siestes** de [prénom_enfant] **s'apaisent rapidement**, et que **les vôtres suivent** tout **aussi vite**.\n- Bonne journée !" },
      { type: "fin_consultation", text: "🏁 **FIN DE LA CONSULTATION** 🏁" },
    ]
  }

};
