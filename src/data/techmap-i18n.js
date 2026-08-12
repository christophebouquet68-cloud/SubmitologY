// ─── data/techmap-i18n.js — technique descriptions, five languages ──────────
//
// Split out from techmap.js so that file stays what it is: graph structure,
// layout and path-finding. This one is pure copy.
//
// TECHNIQUE NAMES ARE DELIBERATELY NOT TRANSLATED.
//
// They are the shared vocabulary of the sport and they do not localise evenly.
// A Romanian practitioner says "closed guard" and "armbar" in English —
// inventing `gardă închisă` would read as machine translation to anyone who
// actually trains. Keeping the names fixed also means `#/map/armbar` stays
// meaningful in every language, and search matches the same term everywhere.
// So the names below stay in English *inside* these sentences too, because
// that is what the reader sees on the node they just tapped.
//
// ⚠️  These translations have not been reviewed by a native-speaking
// practitioner. Get one pair of eyes per language on them before launch —
// they are technical terms, and the gap between "correct" and "correct the way
// people actually say it" is exactly what a customer notices.

export const TECH_DESC = {

  /* ── Positions: guards ─────────────────────────────────────────────── */
  closedGuard: {
    en: "Legs locked around the opponent's waist, controlling distance and setting up attacks from the bottom.",
    fr: "Les jambes verrouillées autour de la taille de l'adversaire, pour contrôler la distance et lancer des attaques depuis le sol.",
    ja: "相手の腰に両脚をロックし、距離をコントロールしながら下から攻撃を組み立てるポジション。",
    pt: "Pernas travadas em volta da cintura do adversário, controlando a distância e montando ataques por baixo.",
    ro: "Picioarele blocate în jurul taliei adversarului, controlând distanța și construind atacuri de jos.",
  },
  openGuard: {
    en: "A family of guards played with the legs unlocked, using feet, hooks or frames to control distance and off-balance the opponent.",
    fr: "Une famille de gardes jouées jambes déverrouillées, en utilisant les pieds, les crochets ou les appuis pour contrôler la distance et déséquilibrer l'adversaire.",
    ja: "脚をロックせずに用いるガードの総称。足やフック、フレームで距離を管理し、相手の体勢を崩す。",
    pt: "Uma família de guardas jogadas com as pernas destravadas, usando pés, ganchos ou frames para controlar a distância e desequilibrar o adversário.",
    ro: "O familie de gărzi jucate cu picioarele descuiate, folosind tălpile, cârligele sau frame-urile pentru a controla distanța și a dezechilibra adversarul.",
  },
  halfGuard: {
    en: "One of the opponent's legs is trapped between yours, used to prevent a full pass while hunting sweeps and underhooks.",
    fr: "Une des jambes de l'adversaire est piégée entre les vôtres, pour empêcher un passage complet tout en cherchant renversements et sous-crochets.",
    ja: "相手の片脚を自分の両脚で挟み込み、パスを防ぎながらスイープやアンダーフックを狙う。",
    pt: "Uma das pernas do adversário fica presa entre as suas, impedindo a passagem completa enquanto você busca raspagens e underhooks.",
    ro: "Unul dintre picioarele adversarului este prins între ale tale, ca să împiedici pasarea completă în timp ce cauți răsturnări și underhook-uri.",
  },
  butterflyGuard: {
    en: "Seated guard with both feet hooked inside the thighs of the opponent, generating lift for sweeps.",
    fr: "Garde assise avec les deux pieds crochetés à l'intérieur des cuisses de l'adversaire, générant la portance nécessaire aux renversements.",
    ja: "座った状態で両足を相手の腿の内側にフックし、スイープに必要な浮かせる力を生み出すガード。",
    pt: "Guarda sentada com os dois pés enganchados por dentro das coxas do adversário, gerando elevação para raspagens.",
    ro: "Gardă din șezut, cu ambele tălpi agățate pe interiorul coapselor adversarului, generând ridicarea necesară răsturnărilor.",
  },
  deLaRivaGuard: {
    en: "One leg hooks around the outside of the opponent's lead leg, controlling their base from a distance.",
    fr: "Une jambe crochète l'extérieur de la jambe avant de l'adversaire, contrôlant son appui à distance.",
    ja: "片脚で相手の前足の外側をフックし、距離を保ったまま相手の土台を崩し続ける。",
    pt: "Uma perna engancha por fora da perna da frente do adversário, controlando a base dele à distância.",
    ro: "Un picior agață pe exteriorul piciorului din față al adversarului, controlându-i baza de la distanță.",
  },
  xGuard: {
    en: "Positioned underneath the opponent with the legs crossed around one of their legs, a powerful sweeping platform.",
    fr: "Placé sous l'adversaire, les jambes croisées autour de l'une des siennes : une plateforme de renversement redoutable.",
    ja: "相手の下に入り、両脚を相手の片脚に交差させて絡めるポジション。強力なスイープの土台となる。",
    pt: "Posicionado por baixo do adversário, com as pernas cruzadas em volta de uma das dele — uma plataforma poderosa de raspagem.",
    ro: "Poziționat sub adversar, cu picioarele încrucișate în jurul unuia dintre ale lui — o platformă puternică de răsturnare.",
  },

  /* ── Positions: dominant ───────────────────────────────────────────── */
  mount: {
    en: "Sitting astride the opponent's torso, one of the most dominant and highest-scoring control positions.",
    fr: "À califourchon sur le torse de l'adversaire : l'une des positions de contrôle les plus dominantes et les mieux notées.",
    ja: "相手の胴体にまたがる形。最も支配的で、ポイントも高い抑え込みポジションのひとつ。",
    pt: "Sentado sobre o tronco do adversário — uma das posições de controle mais dominantes e mais pontuadas.",
    ro: "Așezat călare pe trunchiul adversarului — una dintre cele mai dominante și mai bine punctate poziții de control.",
  },
  sideControl: {
    en: "Pinning the opponent perpendicular to their body from the side, controlling their hips and shoulders.",
    fr: "Immobiliser l'adversaire perpendiculairement à son corps, depuis le côté, en contrôlant ses hanches et ses épaules.",
    ja: "相手の横から体を直角に重ね、腰と肩を抑えて動きを止める。",
    pt: "Imobilizar o adversário pela lateral, perpendicular ao corpo dele, controlando quadril e ombros.",
    ro: "Imobilizarea adversarului din lateral, perpendicular pe corpul lui, controlându-i șoldurile și umerii.",
  },
  kneeOnBelly: {
    en: "A mobile pin with one knee driven into the opponent's stomach, trading stability for freedom to attack.",
    fr: "Une immobilisation mobile, un genou enfoncé dans le ventre de l'adversaire : on échange de la stabilité contre de la liberté d'attaque.",
    ja: "片膝を相手の腹に乗せる機動的な抑え込み。安定性を犠牲にして攻撃の自由度を得る。",
    pt: "Uma imobilização móvel, com um joelho cravado na barriga do adversário: troca estabilidade por liberdade de ataque.",
    ro: "O imobilizare mobilă, cu un genunchi înfipt în abdomenul adversarului: schimbi stabilitatea pe libertatea de a ataca.",
  },
  backControl: {
    en: "Attached to the opponent's back with hooks or a body triangle — considered the most dominant position in BJJ.",
    fr: "Accroché au dos de l'adversaire par les crochets ou un triangle de jambes — considérée comme la position la plus dominante du BJJ.",
    ja: "フックやボディトライアングルで相手の背中に密着する。BJJで最も支配的なポジションとされる。",
    pt: "Preso às costas do adversário com ganchos ou um triângulo de pernas — considerada a posição mais dominante do BJJ.",
    ro: "Agățat de spatele adversarului cu cârlige sau cu un triunghi de picioare — considerată cea mai dominantă poziție din BJJ.",
  },
  northSouth: {
    en: "Controlling from the opponent's head, facing the opposite direction, chest to chest.",
    fr: "Contrôle depuis la tête de l'adversaire, orienté dans la direction opposée, poitrine contre poitrine.",
    ja: "相手の頭側から、体を逆向きに重ねて胸と胸で抑え込む。",
    pt: "Controle a partir da cabeça do adversário, virado para o lado oposto, peito com peito.",
    ro: "Control dinspre capul adversarului, orientat în direcția opusă, piept la piept.",
  },

  /* ── Transitions: guard passes ─────────────────────────────────────── */
  toreandoPass: {
    en: "A standing pass that sweeps the opponent's legs to one side like a bullfighter's cape, circling around them.",
    fr: "Un passage debout qui balaie les jambes de l'adversaire sur le côté, comme la cape d'un torero, avant de le contourner.",
    ja: "立った状態から、闘牛士のケープのように相手の両脚を横へ払い、回り込んでパスする。",
    pt: "Uma passagem em pé que joga as pernas do adversário para um lado, como a capa de um toureiro, contornando-o em seguida.",
    ro: "O pasare din picioare care mătură picioarele adversarului într-o parte, ca pelerina unui toreador, ocolindu-l apoi.",
  },
  kneeCutPass: {
    en: "Driving a knee across the opponent's leg to slice through to side control while controlling their far arm.",
    fr: "Enfoncer un genou en travers de la jambe de l'adversaire pour trancher jusqu'au side control, tout en contrôlant son bras opposé.",
    ja: "相手の脚を膝で斬るように越えてサイドコントロールへ抜けるパス。遠い側の腕の制御が鍵になる。",
    pt: "Cravar o joelho por cima da perna do adversário para cortar até o side control, controlando o braço distante dele.",
    ro: "Împingi genunchiul peste piciorul adversarului ca să tai spre side control, controlându-i brațul îndepărtat.",
  },
  doubleUnderPass: {
    en: "Both arms hook under the legs of the opponent to stack them and drive through to a dominant position.",
    fr: "Les deux bras crochètent sous les jambes de l'adversaire pour le plier sur lui-même et forcer le passage vers une position dominante.",
    ja: "両腕を相手の両脚の下にくぐらせて相手を折り畳み、押し込みながら優位なポジションへ抜ける。",
    pt: "Os dois braços passam por baixo das pernas do adversário para empilhá-lo e atravessar até uma posição dominante.",
    ro: "Ambele brațe trec pe sub picioarele adversarului ca să-l îndoi și să treci într-o poziție dominantă.",
  },
  legDrag: {
    en: "Pulling the opponent's leg across your body to take their hip out of the equation en route to the back.",
    fr: "Tirer la jambe de l'adversaire en travers de votre corps pour neutraliser sa hanche, en route vers son dos.",
    ja: "相手の脚を自分の体の前へ引き寄せて腰の力を奪い、そのまま背後を取りにいく。",
    pt: "Puxar a perna do adversário atravessando o seu corpo, tirando o quadril dele da jogada a caminho das costas.",
    ro: "Tragi piciorul adversarului de-a curmezișul corpului tău ca să-i scoți șoldul din ecuație, în drum spre spate.",
  },

  /* ── Transitions: sweeps ───────────────────────────────────────────── */
  scissorSweep: {
    en: "A classic closed guard sweep using a scissoring leg motion to off-balance and roll the opponent over.",
    fr: "Un renversement classique de closed guard : un mouvement de ciseaux des jambes déséquilibre l'adversaire et le fait basculer.",
    ja: "クローズドガードからの基本的なスイープ。両脚をハサミのように使って相手を崩し、転がす。",
    pt: "Uma raspagem clássica da closed guard, usando um movimento de tesoura com as pernas para desequilibrar e virar o adversário.",
    ro: "O răsturnare clasică din closed guard, folosind o mișcare de foarfecă a picioarelor ca să dezechilibrezi și să rostogolești adversarul.",
  },
  hipBumpSweep: {
    en: "Sitting up from closed guard and driving the hips into the opponent to knock them backward.",
    fr: "Se redresser depuis la closed guard et projeter les hanches dans l'adversaire pour le faire basculer en arrière.",
    ja: "クローズドガードから上体を起こし、腰を相手にぶつけて後ろへ倒すスイープ。",
    pt: "Sentar a partir da closed guard e projetar o quadril contra o adversário para derrubá-lo para trás.",
    ro: "Te ridici din closed guard și împingi șoldul în adversar ca să-l răstorni pe spate.",
  },
  butterflySweep: {
    en: "Using the butterfly hooks to elevate and off-balance the opponent to one side.",
    fr: "Utiliser les crochets de butterfly guard pour soulever l'adversaire et le déséquilibrer sur un côté.",
    ja: "バタフライフックで相手を持ち上げ、片側へ崩して倒す。",
    pt: "Usar os ganchos da butterfly guard para elevar e desequilibrar o adversário para um dos lados.",
    ro: "Folosești cârligele din butterfly guard ca să ridici adversarul și să-l dezechilibrezi într-o parte.",
  },
  berimbolo: {
    en: "An inverted rolling sweep from De La Riva guard that ends with taking the opponent's back.",
    fr: "Un renversement inversé depuis la De La Riva guard, exécuté en roulant, qui se termine par une prise de dos.",
    ja: "デラヒーバガードから体を逆さに回転させて仕掛けるスイープ。最終的に相手の背後を取る。",
    pt: "Uma raspagem invertida a partir da De La Riva guard, rolando por baixo até terminar nas costas do adversário.",
    ro: "O răsturnare inversată din De La Riva guard, executată prin rostogolire, care se termină cu luarea spatelui.",
  },
  xGuardSweep: {
    en: "Using the leg control of X-guard to off-balance and elevate the opponent onto their back.",
    fr: "Utiliser le contrôle des jambes de la X-guard pour déséquilibrer l'adversaire et le soulever jusqu'à le mettre sur le dos.",
    ja: "Xガードの脚の制御を使って相手を崩し、持ち上げて仰向けに倒す。",
    pt: "Usar o controle de pernas da X-guard para desequilibrar e elevar o adversário até deixá-lo de costas.",
    ro: "Folosești controlul picioarelor din X-guard ca să dezechilibrezi și să ridici adversarul până ajunge pe spate.",
  },

  /* ── Transitions: escapes ──────────────────────────────────────────── */
  mountEscape: {
    en: "Bridging and rolling the opponent off from underneath mount to recover guard.",
    fr: "Ponter et faire rouler l'adversaire sur le côté depuis le dessous de la mount, pour récupérer sa garde.",
    ja: "マウントの下からブリッジして相手を横に転がし、ガードを取り戻す。",
    pt: "Fazer a ponte e rolar o adversário para o lado por baixo da mount, recuperando a guarda.",
    ro: "Faci podul și rostogolești adversarul într-o parte de sub mount, ca să recuperezi garda.",
  },
  sideControlEscape: {
    en: "Framing and shrimping to create space and recover guard from underneath side control.",
    fr: "Placer des appuis et faire la crevette pour créer de l'espace et récupérer sa garde sous le side control.",
    ja: "フレームを作り、エビの動きでスペースを作って、サイドコントロールの下からガードを回復する。",
    pt: "Criar frames e fazer fuga de quadril para abrir espaço e recuperar a guarda por baixo do side control.",
    ro: "Îți faci frame-uri și te retragi din șold ca să creezi spațiu și să recuperezi garda de sub side control.",
  },
  backEscape: {
    en: "Removing the opponent's hooks and turning into them to neutralise back control.",
    fr: "Retirer les crochets de l'adversaire et se retourner vers lui pour neutraliser son contrôle du dos.",
    ja: "相手のフックを外し、相手の方へ向き直ってバックコントロールを無力化する。",
    pt: "Remover os ganchos do adversário e virar-se para ele, neutralizando o controle das costas.",
    ro: "Îi scoți cârligele adversarului și te întorci spre el ca să neutralizezi controlul spatelui.",
  },

  /* ── Submissions: chokes ───────────────────────────────────────────── */
  rearNakedChoke: {
    en: "A blood choke applied from back control — the most common finish from that position.",
    fr: "Un étranglement sanguin appliqué depuis le back control — la finition la plus courante depuis cette position.",
    ja: "バックコントロールから極める、血流を止めるチョーク。そのポジションで最も多いフィニッシュ。",
    pt: "Um estrangulamento sanguíneo aplicado a partir do back control — a finalização mais comum daquela posição.",
    ro: "O strangulare sangvină aplicată din back control — cea mai frecventă finalizare din acea poziție.",
  },
  guillotine: {
    en: "A front headlock choke applied when the opponent's head is trapped under an arm, from guard or standing.",
    fr: "Un étranglement de face appliqué lorsque la tête de l'adversaire est piégée sous un bras, depuis la garde ou debout.",
    ja: "相手の頭を腕の下に抱え込んで極める前方からのチョーク。ガードからでも立った状態からでも入る。",
    pt: "Um estrangulamento frontal aplicado quando a cabeça do adversário fica presa sob o braço, da guarda ou em pé.",
    ro: "O strangulare frontală aplicată când capul adversarului este prins sub braț, din gardă sau din picioare.",
  },
  triangleChoke: {
    en: "Locking the legs around the opponent's neck and one arm to cut off blood flow, usually from guard.",
    fr: "Verrouiller les jambes autour du cou et d'un bras de l'adversaire pour couper la circulation, le plus souvent depuis la garde.",
    ja: "相手の首と片腕を両脚で挟み込み、血流を断つ。主にガードから仕掛ける。",
    pt: "Travar as pernas em volta do pescoço e de um braço do adversário para cortar a circulação, normalmente da guarda.",
    ro: "Blochezi picioarele în jurul gâtului și al unui braț al adversarului ca să tai circulația, de obicei din gardă.",
  },
  armTriangle: {
    en: "Trapping one of the opponent's arms against their own neck using shoulder pressure, typically from side control.",
    fr: "Coincer l'un des bras de l'adversaire contre son propre cou par la pression de l'épaule, typiquement depuis le side control.",
    ja: "肩の圧力で相手の片腕を相手自身の首に押し当てて絞める。多くはサイドコントロールから。",
    pt: "Prender um dos braços do adversário contra o próprio pescoço dele usando a pressão do ombro, tipicamente do side control.",
    ro: "Prinzi unul dintre brațele adversarului lipit de propriul lui gât, folosind presiunea umărului, de obicei din side control.",
  },
  crossCollarChoke: {
    en: "Using crossed grips on the opponent's own collar to choke them, common from mount or guard.",
    fr: "Étrangler l'adversaire avec des prises croisées sur son propre col, courant depuis la mount ou la garde.",
    ja: "相手の襟を左右交差して握り、絞め上げる。マウントやガードからよく使われる。",
    pt: "Estrangular o adversário com pegadas cruzadas na gola dele — comum da mount ou da guarda.",
    ro: "Îl strangulezi pe adversar cu prize încrucișate pe propriul lui guler, frecvent din mount sau din gardă.",
  },
  bowAndArrowChoke: {
    en: "A powerful collar choke from back control using the legs to pull the opponent into the choke.",
    fr: "Un étranglement au col puissant depuis le back control, les jambes tirant l'adversaire dans l'étranglement.",
    ja: "バックコントロールからの強力な襟絞め。脚で相手を引き込みながら絞める。",
    pt: "Um estrangulamento de gola potente a partir do back control, usando as pernas para puxar o adversário para dentro do estrangulamento.",
    ro: "O strangulare puternică de guler din back control, folosind picioarele ca să tragi adversarul în strangulare.",
  },

  /* ── Submissions: joint locks ──────────────────────────────────────── */
  armbar: {
    en: "Hyperextending the elbow by controlling the arm across the hips — from guard, mount, or side control.",
    fr: "Hyperextension du coude en contrôlant le bras en travers des hanches — depuis la garde, la mount ou le side control.",
    ja: "相手の腕を自分の腰の上で制し、肘を過伸展させる関節技。ガード、マウント、サイドコントロールから狙える。",
    pt: "Hiperextensão do cotovelo controlando o braço sobre o quadril — da guarda, da mount ou do side control.",
    ro: "Hiperextensia cotului prin controlul brațului peste șolduri — din gardă, din mount sau din side control.",
  },
  kimura: {
    en: "A shoulder lock using a figure-four grip on the wrist and arm, attacking internal shoulder rotation.",
    fr: "Une clé d'épaule en prise figure-four sur le poignet et le bras, attaquant la rotation interne de l'épaule.",
    ja: "手首と腕をフィギュアフォーで握り、肩の内旋を攻める関節技。",
    pt: "Uma chave de ombro com pegada em figura-quatro no punho e no braço, atacando a rotação interna do ombro.",
    ro: "O cheie de umăr cu priză figure-four pe încheietură și braț, atacând rotația internă a umărului.",
  },
  americana: {
    en: "A shoulder lock attacking external rotation, typically applied from side control or mount.",
    fr: "Une clé d'épaule attaquant la rotation externe, appliquée le plus souvent depuis le side control ou la mount.",
    ja: "肩の外旋を攻める関節技。サイドコントロールやマウントから極めることが多い。",
    pt: "Uma chave de ombro que ataca a rotação externa, aplicada normalmente do side control ou da mount.",
    ro: "O cheie de umăr care atacă rotația externă, aplicată de obicei din side control sau din mount.",
  },
  omoplata: {
    en: "A shoulder lock using the legs to trap the arm, applied from guard without using the hands.",
    fr: "Une clé d'épaule qui piège le bras avec les jambes, appliquée depuis la garde sans utiliser les mains.",
    ja: "両脚で相手の腕を挟み込む肩関節技。手を使わずガードから極める。",
    pt: "Uma chave de ombro que prende o braço com as pernas, aplicada da guarda sem usar as mãos.",
    ro: "O cheie de umăr care prinde brațul cu picioarele, aplicată din gardă fără a folosi mâinile.",
  },
  straightAnkleLock: {
    en: "Hyperextending the ankle by trapping the foot and applying pressure with the hips or arm.",
    fr: "Hyperextension de la cheville en piégeant le pied et en appliquant une pression avec les hanches ou l'avant-bras.",
    ja: "相手の足を抱え込み、腰や腕で圧をかけて足首を過伸展させる。",
    pt: "Hiperextensão do tornozelo prendendo o pé e aplicando pressão com o quadril ou com o braço.",
    ro: "Hiperextensia gleznei prin prinderea labei piciorului și aplicarea presiunii cu șoldul sau cu brațul.",
  },

  /* ── Added 2026-08: the map's second pass, 34 → 60 techniques ───────── */
  spiderGuard: {
    en: "Feet on the biceps with sleeve grips, stretching the opponent's arms to break their posture and open sweeps and triangles.",
    fr: "Les pieds sur les biceps et les prises aux manches, pour étirer les bras de l'adversaire, casser sa posture et ouvrir renversements et triangles.",
    ja: "袖を持ち両足を相手の上腕に当て、腕を伸ばして姿勢を崩し、スイープやトライアングルにつなげるガード。",
    pt: "Pés nos bíceps com pegadas nas mangas, esticando os braços do adversário para quebrar a postura e abrir raspagens e triângulos.",
    ro: "Picioarele pe bicepși și prize la mâneci, întinzând brațele adversarului pentru a-i rupe postura și a deschide răsturnări și triunghiuri.",
  },
  lassoGuard: {
    en: "One leg threaded around the opponent's arm from the outside, trapping it and taking away their ability to pass on that side.",
    fr: "Une jambe enroulée autour du bras de l'adversaire par l'extérieur, le piégeant et lui retirant toute possibilité de passer de ce côté.",
    ja: "片脚を相手の腕に外側から巻きつけて固定し、その側からのパスを封じるガード。",
    pt: "Uma perna enrolada por fora do braço do adversário, prendendo-o e tirando a possibilidade de passar por aquele lado.",
    ro: "Un picior înfășurat pe la exterior în jurul brațului adversarului, imobilizându-l și eliminându-i posibilitatea de a trece pe acea parte.",
  },
  reverseDeLaRiva: {
    en: "The hook placed on the inside of the opponent's near leg, most often used to meet a knee cut before it arrives.",
    fr: "Le crochet placé à l'intérieur de la jambe avant de l'adversaire, le plus souvent pour contrer un knee cut avant qu'il n'arrive.",
    ja: "相手の近い方の脚の内側にフックをかけるガード。ニーカットに対して、それが入る前に対応する形で使われることが多い。",
    pt: "O gancho colocado por dentro da perna próxima do adversário, usado principalmente para receber uma passagem knee cut antes que ela chegue.",
    ro: "Cârligul plasat pe interiorul piciorului apropiat al adversarului, folosit cel mai des pentru a întâmpina o trecere knee cut înainte să ajungă.",
  },
  deepHalfGuard: {
    en: "Sliding underneath the opponent from half guard to sit beneath their hips, where their base is easiest to take away.",
    fr: "Se glisser sous l'adversaire depuis la demi-garde pour s'installer sous ses hanches, là où sa base est la plus facile à supprimer.",
    ja: "ハーフガードから相手の下に潜り込み、腰の真下に入るポジション。相手のベースを最も崩しやすい位置。",
    pt: "Deslizar por baixo do adversário a partir da meia-guarda para ficar sob o quadril dele, onde a base é mais fácil de tirar.",
    ro: "Alunecarea pe sub adversar din half guard, până sub șoldurile lui, acolo unde baza îi poate fi luată cel mai ușor.",
  },
  kneeShieldHalfGuard: {
    en: "A shin across the opponent's hip from half guard, holding the frame that keeps their chest off yours.",
    fr: "Un tibia en travers de la hanche de l'adversaire depuis la demi-garde, formant le cadre qui empêche son buste de coller au vôtre.",
    ja: "ハーフガードから相手の腰にすねを当て、胸を合わせられないようにフレームを作るポジション。",
    pt: "Uma canela atravessada no quadril do adversário a partir da meia-guarda, mantendo o frame que impede o peito dele de encostar no seu.",
    ro: "O tibie așezată de-a curmezișul șoldului adversarului din half guard, menținând cadrul care îi ține pieptul departe de al tău.",
  },
  singleLegX: {
    en: "One of the opponent's legs isolated between yours from underneath — the entry to most straight-leg attacks and a strong sweeping position.",
    fr: "Une jambe de l'adversaire isolée entre les vôtres par en dessous — l'entrée vers la plupart des attaques de jambes et une position de renversement solide.",
    ja: "下から相手の片脚を自分の両脚で挟み込むポジション。多くの足関節技への入口であり、強力なスイープの体勢でもある。",
    pt: "Uma das pernas do adversário isolada entre as suas por baixo — a entrada para a maioria dos ataques de perna e uma posição forte de raspagem.",
    ro: "Unul dintre picioarele adversarului izolat între ale tale, de dedesubt — intrarea către majoritatea atacurilor la picioare și o poziție bună de răsturnare.",
  },
  crucifix: {
    en: "Both of the opponent's arms trapped at once — one with the legs, one with the arms — leaving them nothing to defend with.",
    fr: "Les deux bras de l'adversaire piégés en même temps — l'un par les jambes, l'autre par les bras — ne lui laissant rien pour se défendre.",
    ja: "相手の両腕を同時に制する — 一方を脚で、もう一方を腕で — 防御に使える手が残らないポジション。",
    pt: "Os dois braços do adversário presos ao mesmo tempo — um com as pernas, outro com os braços — sem deixar nada para ele defender.",
    ro: "Ambele brațe ale adversarului prinse simultan — unul cu picioarele, celălalt cu brațele — fără să-i mai rămână cu ce să se apere.",
  },
  frontHeadlock: {
    en: "Control of the head and one arm from in front, the gateway to guillotines, D'Arces and anacondas as well as the back.",
    fr: "Contrôle de la tête et d'un bras par l'avant, porte d'entrée vers les guillotines, D'Arce et anacondas, mais aussi vers le dos.",
    ja: "正面から相手の頭と片腕をコントロールする形。ギロチン、ダースチョーク、アナコンダ、そしてバックへの入口となる。",
    pt: "Controle da cabeça e de um braço pela frente, a porta de entrada para guilhotinas, D'Arce e anacondas, além das costas.",
    ro: "Controlul capului și al unui braț din față, poarta de intrare către ghilotine, D'Arce și anaconda, dar și către spate.",
  },
  overUnderPass: {
    en: "One arm over the far leg and one under the near one, then walking the hips forward with heavy chest pressure.",
    fr: "Un bras au-dessus de la jambe éloignée et un en dessous de la jambe proche, puis avancer les hanches avec une forte pression du buste.",
    ja: "片腕を遠い方の脚の上から、もう片腕を近い方の脚の下から通し、胸で強い圧をかけながら腰を前へ運ぶパス。",
    pt: "Um braço por cima da perna distante e outro por baixo da perna próxima, avançando o quadril com forte pressão de peito.",
    ro: "Un braț pe deasupra piciorului depărtat și unul pe sub cel apropiat, apoi înaintarea șoldurilor cu presiune puternică din piept.",
  },
  stackPass: {
    en: "Folding the opponent onto their own shoulders so their hips can't turn, then stepping around the stack.",
    fr: "Plier l'adversaire sur ses propres épaules pour empêcher ses hanches de tourner, puis contourner l'empilement.",
    ja: "相手を自分の肩の上に折り畳んで腰の回転を封じ、その状態で回り込んでパスする。",
    pt: "Dobrar o adversário sobre os próprios ombros para que o quadril não gire, e então contornar a pilha.",
    ro: "Plierea adversarului peste propriii umeri, astfel încât șoldurile să nu se mai poată roti, apoi ocolirea stivei.",
  },
  pendulumSweep: {
    en: "Swinging one leg like a pendulum from closed guard to roll the opponent over the shoulder, often chained with the armbar.",
    fr: "Balancer une jambe comme un pendule depuis la garde fermée pour faire rouler l'adversaire par-dessus l'épaule, souvent enchaîné avec l'armbar.",
    ja: "クローズドガードから片脚を振り子のように振り、相手を肩越しに転がすスイープ。腕十字と連携させることが多い。",
    pt: "Balançar uma perna como um pêndulo a partir da guarda fechada para rolar o adversário por cima do ombro, muitas vezes encadeada com o armbar.",
    ro: "Balansarea unui picior ca un pendul din garda închisă pentru a rostogoli adversarul peste umăr, adesea înlănțuită cu armbar-ul.",
  },
  tripodSweep: {
    en: "A push on one knee with a pull on the opposite ankle from open guard, taking the base out from under a standing opponent.",
    fr: "Une poussée sur un genou et une traction sur la cheville opposée depuis la garde ouverte, ôtant la base à un adversaire debout.",
    ja: "オープンガードから片膝を押し、反対の足首を引いて、立っている相手のベースを奪うスイープ。",
    pt: "Um empurrão em um joelho com uma puxada no tornozelo oposto a partir da guarda aberta, tirando a base de um adversário em pé.",
    ro: "O împingere într-un genunchi și o tragere de glezna opusă din garda deschisă, luând baza unui adversar aflat în picioare.",
  },
  oldSchoolSweep: {
    en: "From half guard, coming up on the underhook and taking the far ankle to roll the opponent forward.",
    fr: "Depuis la demi-garde, se relever sur l'underhook et saisir la cheville éloignée pour faire basculer l'adversaire vers l'avant.",
    ja: "ハーフガードからアンダーフックで起き上がり、遠い方の足首を取って相手を前方に転がすスイープ。",
    pt: "Da meia-guarda, subir no underhook e pegar o tornozelo distante para rolar o adversário para frente.",
    ro: "Din half guard, ridicarea pe underhook și prinderea gleznei depărtate pentru a rostogoli adversarul în față.",
  },
  hipEscape: {
    en: "The shrimping movement that creates the space to recover guard — the single most repeated motion in the sport.",
    fr: "Le mouvement de crevette qui crée l'espace pour récupérer la garde — le geste le plus répété de tout le sport.",
    ja: "ガードをリカバリーするためのスペースを作るエビの動き。この競技で最も繰り返される基本動作。",
    pt: "O movimento de fuga de quadril que cria o espaço para recuperar a guarda — o gesto mais repetido do esporte.",
    ro: "Mișcarea de „creveți” care creează spațiul necesar pentru a recupera garda — cea mai repetată mișcare din acest sport.",
  },
  kneeOnBellyEscape: {
    en: "Framing on the shin and turning in to remove the knee before the pressure settles and the position becomes an attack.",
    fr: "Placer un cadre sur le tibia et se tourner vers l'adversaire pour dégager le genou avant que la pression ne s'installe et que la position ne devienne une attaque.",
    ja: "すねにフレームを作り相手側へ向き直り、圧が定まって攻撃に移られる前に膝を外すエスケープ。",
    pt: "Fazer frame na canela e virar para dentro para remover o joelho antes que a pressão se firme e a posição vire um ataque.",
    ro: "Formarea unui cadru pe tibie și întoarcerea către adversar pentru a scoate genunchiul înainte ca presiunea să se așeze și poziția să devină un atac.",
  },
  granbyRoll: {
    en: "An inverted shoulder roll used to face the opponent again when they have got past your legs.",
    fr: "Une roulade inversée sur l'épaule, utilisée pour refaire face à l'adversaire lorsqu'il a dépassé vos jambes.",
    ja: "相手に脚を越えられたときに、肩を軸に反転して再び相手と正対するためのロール。",
    pt: "Um rolamento invertido sobre o ombro usado para voltar a encarar o adversário quando ele já passou das suas pernas.",
    ro: "O rostogolire inversată pe umăr, folosită pentru a te reorienta către adversar atunci când acesta ți-a depășit picioarele.",
  },
  dArceChoke: {
    en: "An arm-triangle threaded from the far side under the neck and arm, finished from the side rather than on top.",
    fr: "Un étranglement en triangle de bras passé depuis le côté opposé sous le cou et le bras, finalisé sur le côté plutôt qu'au-dessus.",
    ja: "遠い側から首と腕の下に腕を通して作る腕三角絞め。上からではなく横から極める。",
    pt: "Um triângulo de braço passado pelo lado oposto sob o pescoço e o braço, finalizado de lado em vez de por cima.",
    ro: "Un triunghi de braț trecut dinspre partea opusă pe sub gât și braț, finalizat din lateral, nu de deasupra.",
  },
  anacondaChoke: {
    en: "The mirror of the D'Arce, threaded under the near arm and finished by rolling the opponent onto their side.",
    fr: "Le miroir du D'Arce, passé sous le bras proche et finalisé en faisant rouler l'adversaire sur le côté.",
    ja: "ダースチョークの鏡像。近い側の腕の下に腕を通し、相手を横に転がして極める。",
    pt: "O espelho do D'Arce, passado por baixo do braço próximo e finalizado rolando o adversário de lado.",
    ro: "Oglinda D'Arce-ului, trecut pe sub brațul apropiat și finalizat prin rostogolirea adversarului pe o parte.",
  },
  ezekielChoke: {
    en: "A sleeve-assisted choke applied with the forearm across the throat, available from mount and from inside the guard.",
    fr: "Un étranglement à l'aide de la manche, appliqué avec l'avant-bras en travers de la gorge, disponible depuis la montée comme depuis l'intérieur de la garde.",
    ja: "自分の袖を利用し、前腕を喉に当てて極める絞め技。マウントからも、ガードの中からも使える。",
    pt: "Um estrangulamento com auxílio da manga, aplicado com o antebraço atravessado na garganta, disponível da montada e de dentro da guarda.",
    ro: "O sufocare cu ajutorul mânecii, aplicată cu antebrațul de-a curmezișul gâtului, disponibilă din montare și din interiorul gărzii.",
  },
  loopChoke: {
    en: "A collar grip that tightens as the opponent drives forward, turning their own posture break into the finish.",
    fr: "Une prise au col qui se resserre lorsque l'adversaire avance, transformant sa propre cassure de posture en finalisation.",
    ja: "相手が前に出ることで締まっていく襟の絞め。相手自身の姿勢の崩れをそのまま極めに変える。",
    pt: "Uma pegada na gola que aperta conforme o adversário avança, transformando a própria quebra de postura dele na finalização.",
    ro: "O priză la guler care se strânge pe măsură ce adversarul înaintează, transformând propria lui aplecare în finalizare.",
  },
  clockChoke: {
    en: "A collar choke applied from on top of a turtled opponent while walking around their head like a clock hand.",
    fr: "Un étranglement au col appliqué au-dessus d'un adversaire en tortue, en tournant autour de sa tête comme une aiguille d'horloge.",
    ja: "亀になった相手の上から襟を取り、時計の針のように頭の周りを回りながら極める絞め技。",
    pt: "Um estrangulamento de gola aplicado por cima de um adversário de quatro apoios, caminhando ao redor da cabeça dele como o ponteiro de um relógio.",
    ro: "O sufocare la guler aplicată de deasupra unui adversar aflat în „broască”, mergând în jurul capului său precum acul unui ceas.",
  },
  northSouthChoke: {
    en: "A no-gi strangle from the north-south position, closing the space around the neck with the shoulder and bicep.",
    fr: "Un étranglement sans kimono depuis la position nord-sud, fermant l'espace autour du cou avec l'épaule et le biceps.",
    ja: "ノースサウスの体勢から、肩と上腕で首周りの空間を潰して極めるノーギの絞め技。",
    pt: "Um estrangulamento no-gi a partir da posição norte-sul, fechando o espaço em volta do pescoço com o ombro e o bíceps.",
    ro: "O sufocare no-gi din poziția nord-sud, închizând spațiul din jurul gâtului cu umărul și bicepsul.",
  },
  kneebar: {
    en: "Hyperextending the knee by trapping the leg and bridging the hips against it, in the same family as the ankle lock.",
    fr: "Hyperextension du genou en piégeant la jambe et en poussant les hanches contre elle, de la même famille que la clé de cheville.",
    ja: "相手の脚を抱え込み、腰を突き上げて膝を過伸展させる関節技。アンクルロックと同じ系統。",
    pt: "Hiperextensão do joelho prendendo a perna e empurrando o quadril contra ela, da mesma família da chave de tornozelo.",
    ro: "Hiperextensia genunchiului prin prinderea piciorului și împingerea șoldurilor în el, din aceeași familie cu cheia de gleznă.",
  },
  toeHold: {
    en: "A rotational lock on the foot applied with a figure-four grip, turning the ankle rather than extending it.",
    fr: "Une clé rotationnelle sur le pied appliquée avec une prise en figure-quatre, qui tourne la cheville plutôt que de l'étendre.",
    ja: "フィギュア4のグリップで足を握り、伸ばすのではなく捻って極める足関節技。",
    pt: "Uma chave rotacional no pé aplicada com pegada em figura-quatro, girando o tornozelo em vez de estendê-lo.",
    ro: "O cheie de rotație la laba piciorului, aplicată cu o priză în figura-patru, care răsucește glezna în loc să o întindă.",
  },
  heelHook: {
    en: "A rotational attack on the knee through the heel. It gives very little warning before damage, is banned in most gi rulesets, and belongs in supervised practice only.",
    fr: "Une attaque rotationnelle du genou via le talon. Elle prévient très peu avant la blessure, est interdite dans la plupart des règlements en kimono, et doit rester réservée à une pratique encadrée.",
    ja: "踵を介して膝を捻る関節技。損傷までの予兆がほとんどなく、多くの道着ルールでは禁止されている。指導者の監督下でのみ扱うべき技術。",
    pt: "Um ataque rotacional ao joelho através do calcanhar. Dá pouquíssimo aviso antes da lesão, é proibido na maioria dos regulamentos com kimono e só deve ser treinado sob supervisão.",
    ro: "Un atac de rotație asupra genunchiului prin călcâi. Dă foarte puține semne înainte de accidentare, este interzis în majoritatea regulamentelor cu kimono și ține strict de antrenamentul supravegheat.",
  },
  wristLock: {
    en: "A small-joint lock on the wrist, available from almost every position and often found when a larger attack is defended.",
    fr: "Une clé sur le poignet, disponible depuis presque toutes les positions et souvent trouvée lorsqu'une attaque plus large est défendue.",
    ja: "手首への関節技。ほぼあらゆるポジションから狙え、大きな技を防がれた際に現れることが多い。",
    pt: "Uma chave de pequena articulação no punho, disponível de quase todas as posições e frequentemente encontrada quando um ataque maior é defendido.",
    ro: "O cheie la încheietura mâinii, disponibilă din aproape orice poziție și găsită adesea atunci când un atac mai amplu este apărat.",
  },
};

/** Description for a technique in the current language, falling back to
 *  English. Mirrors `t()` in i18n.js rather than reusing it, so this file has
 *  no import and stays trivially testable. */
export function techDesc(id, lang) {
  const entry = TECH_DESC[id];
  if (!entry) return "";
  return entry[lang] || entry.en || "";
}
