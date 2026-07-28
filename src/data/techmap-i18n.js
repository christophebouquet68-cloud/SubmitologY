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
};

/** Description for a technique in the current language, falling back to
 *  English. Mirrors `t()` in i18n.js rather than reusing it, so this file has
 *  no import and stays trivially testable. */
export function techDesc(id, lang) {
  const entry = TECH_DESC[id];
  if (!entry) return "";
  return entry[lang] || entry.en || "";
}
