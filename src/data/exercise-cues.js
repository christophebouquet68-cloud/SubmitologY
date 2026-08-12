// ─── data/exercise-cues.js — how to perform each exercise, five languages ───
//
// Keyed identically to `T.sc.ex` in i18n.js: every id that has a name has a
// cue here, and the smoke test asserts that stays true. Split into its own
// file for the same reason techmap-i18n.js is separate from techmap.js — the
// program engine is logic, this is copy, and mixing them makes both harder to
// read.
//
// SCOPE, DELIBERATELY: these describe the movement. They are not coaching and
// they are not medical advice — `T.sc.disclaimer` renders with every program
// and stays there. One sentence each, present tense, no rep counts (the rx
// carries those), no "explode" or "smash" verbs. Someone who has never seen
// the exercise should be able to recognise it; someone who has should not
// feel talked down to.
//
// ⚠️  As with the technique descriptions, these translations have not been
// reviewed by a native-speaking practitioner. Get one pair of eyes per
// language on them before launch.

export const EX_CUES = {

  /* ── Warm-up ──────────────────────────────────────────────────────────── */
  armLegSwings: {
    en: "Swing one limb at a time in a controlled arc, front to back then side to side, letting the range grow as the joint warms.",
    fr: "Balancez un membre à la fois selon un arc contrôlé, d'avant en arrière puis latéralement, en laissant l'amplitude croître à mesure que l'articulation s'échauffe.",
    ja: "手足を一本ずつ、前後・左右にコントロールした弧を描いて振ります。関節が温まるにつれて可動域を広げていきます。",
    pt: "Balance um membro de cada vez em um arco controlado, da frente para trás e depois lateralmente, deixando a amplitude aumentar conforme a articulação aquece.",
    ro: "Balansează câte un membru pe rând, într-un arc controlat, înainte-înapoi apoi lateral, lăsând amplitudinea să crească pe măsură ce articulația se încălzește.",
  },
  hipRotations: {
    en: "Sit with one leg bent in front and one to the side at right angles, then rotate the knees from one side to the other without using your hands.",
    fr: "Asseyez-vous avec une jambe pliée devant et l'autre sur le côté à angle droit, puis faites pivoter les genoux d'un côté à l'autre sans vous aider des mains.",
    ja: "片脚を前に、もう片脚を横に直角に曲げて座り、手を使わずに両膝を左右に倒して入れ替えます。",
    pt: "Sente-se com uma perna dobrada à frente e a outra ao lado em ângulo reto, e gire os joelhos de um lado para o outro sem usar as mãos.",
    ro: "Așază-te cu un picior îndoit în față și celălalt lateral, în unghi drept, apoi rotește genunchii dintr-o parte în alta fără să te ajuți cu mâinile.",
  },
  neckShoulderRolls: {
    en: "Roll the shoulders backwards in slow circles, then take the neck gently through its range — never forcing the end of a movement.",
    fr: "Faites rouler les épaules vers l'arrière en cercles lents, puis emmenez doucement la nuque dans toute son amplitude — sans jamais forcer en fin de mouvement.",
    ja: "肩をゆっくり後ろ回しし、続いて首を無理のない範囲で丁寧に動かします。可動域の終点で決して力を加えないこと。",
    pt: "Gire os ombros para trás em círculos lentos, depois leve o pescoço suavemente por toda a sua amplitude — sem nunca forçar o fim do movimento.",
    ro: "Rotește umerii spre spate în cercuri lente, apoi plimbă gâtul ușor prin toată amplitudinea sa — fără să forțezi niciodată capătul mișcării.",
  },

  /* ── Lower body ───────────────────────────────────────────────────────── */
  bodyweightSquat: {
    en: "Feet about shoulder width, sit the hips down and back between the heels, keeping the chest tall and the knees tracking over the toes.",
    fr: "Pieds à largeur d'épaules, descendez les hanches vers l'arrière entre les talons, buste droit et genoux alignés au-dessus des orteils.",
    ja: "足を肩幅に開き、かかとの間に腰を落として後ろに引きます。胸を張り、膝はつま先の方向に沿わせます。",
    pt: "Pés na largura dos ombros, desça o quadril para baixo e para trás entre os calcanhares, mantendo o peito erguido e os joelhos alinhados com os pés.",
    ro: "Picioarele la lățimea umerilor, coboară șoldurile în jos și în spate între călcâie, cu pieptul sus și genunchii pe direcția vârfurilor.",
  },
  bulgarianSplitSquat: {
    en: "Rear foot raised on a bench, lower the back knee straight down until the front thigh is roughly level, then drive back up through the front heel.",
    fr: "Pied arrière surélevé sur un banc, descendez le genou arrière à la verticale jusqu'à ce que la cuisse avant soit à l'horizontale, puis remontez en poussant sur le talon avant.",
    ja: "後ろ足をベンチに乗せ、後ろの膝を真下に下ろして前の腿が床とほぼ平行になるまで沈み、前足のかかとで押し上げます。",
    pt: "Pé de trás apoiado em um banco, desça o joelho traseiro na vertical até a coxa da frente ficar quase paralela ao chão, e suba empurrando pelo calcanhar da frente.",
    ro: "Piciorul din spate ridicat pe o bancă, coboară genunchiul din spate drept în jos până coapsa din față ajunge aproape paralelă cu solul, apoi urcă împingând în călcâiul din față.",
  },
  broadJump: {
    en: "Swing the arms back, jump forward for distance from both feet, and land softly with bent knees before resetting for the next one.",
    fr: "Ramenez les bras en arrière, sautez vers l'avant à pieds joints pour aller le plus loin possible, et amortissez la réception genoux fléchis avant de recommencer.",
    ja: "両腕を後ろに振り、両足で前方に跳びます。膝を曲げて柔らかく着地し、姿勢を整えてから次の一回に移ります。",
    pt: "Leve os braços para trás, salte para frente com os dois pés buscando distância e aterrisse suavemente com os joelhos flexionados antes de repetir.",
    ro: "Duci brațele în spate, sari înainte de pe ambele picioare pentru distanță și aterizează moale, cu genunchii îndoiți, înainte de a relua.",
  },
  stepUp: {
    en: "Place one whole foot on a stable step, stand up by pushing through that heel rather than pushing off the floor with the trailing leg.",
    fr: "Posez tout un pied sur une marche stable et montez en poussant sur ce talon, plutôt qu'en vous aidant de la jambe restée au sol.",
    ja: "安定した台に片足全体を乗せ、後ろ足で床を蹴るのではなく、乗せた足のかかとで押して立ち上がります。",
    pt: "Apoie o pé inteiro em um degrau firme e suba empurrando por esse calcanhar, em vez de impulsionar com a perna que ficou no chão.",
    ro: "Așază toată talpa pe o treaptă stabilă și ridică-te împingând în acel călcâi, nu împingând din piciorul rămas pe podea.",
  },
  wallSit: {
    en: "Back flat against a wall, slide down until the knees are bent to a right angle and hold, keeping the weight in the heels.",
    fr: "Dos plaqué contre un mur, glissez vers le bas jusqu'à ce que les genoux forment un angle droit et maintenez, poids sur les talons.",
    ja: "背中を壁に平らにつけ、膝が直角になるまで滑り下ろして保持します。体重はかかとに乗せたままにします。",
    pt: "Costas apoiadas na parede, deslize até os joelhos formarem um ângulo reto e sustente, mantendo o peso nos calcanhares.",
    ro: "Cu spatele lipit de perete, alunecă în jos până genunchii formează un unghi drept și menține, cu greutatea în călcâie.",
  },
  gobletSquat: {
    en: "Hold a single weight at your chest and squat between your hips, letting the load in front help you keep your chest upright.",
    fr: "Tenez une charge unique contre la poitrine et accroupissez-vous entre les hanches, la charge à l'avant vous aidant à garder le buste droit.",
    ja: "重りを一つ胸の前で抱え、腰の間に沈み込むようにしゃがみます。前方の重量が胸を起こした姿勢を保つ助けになります。",
    pt: "Segure um único peso junto ao peito e agache entre os quadris, deixando a carga à frente ajudar a manter o peito ereto.",
    ro: "Ține o singură greutate la piept și coboară în genuflexiune între șolduri, lăsând încărcătura din față să te ajute să menții pieptul drept.",
  },
  romanianDeadliftDB: {
    en: "Knees softly bent and fixed, push the hips backwards to lower the weights along the thighs until you feel the hamstrings, then stand tall.",
    fr: "Genoux légèrement fléchis et fixes, poussez les hanches vers l'arrière pour descendre les haltères le long des cuisses jusqu'à sentir les ischio-jambiers, puis redressez-vous.",
    ja: "膝を軽く曲げた角度で固定し、腰を後ろに押し出しながら太ももに沿って重りを下ろします。ハムストリングに張りを感じたら立ち上がります。",
    pt: "Joelhos levemente flexionados e fixos, empurre o quadril para trás descendo os pesos ao longo das coxas até sentir os posteriores, e volte a ficar ereto.",
    ro: "Cu genunchii ușor îndoiți și fixați, împinge șoldurile în spate coborând greutățile de-a lungul coapselor până simți ischiogambierii, apoi ridică-te drept.",
  },
  walkingLunge: {
    en: "Step forward and lower the back knee towards the floor, then bring the rear foot through into the next step without stopping.",
    fr: "Avancez d'un pas et descendez le genou arrière vers le sol, puis ramenez le pied arrière pour enchaîner directement le pas suivant.",
    ja: "一歩前に踏み出して後ろの膝を床に近づけ、そのまま後ろ足を前に運んで次の一歩につなげます。",
    pt: "Dê um passo à frente e desça o joelho de trás em direção ao chão, depois traga o pé traseiro para o passo seguinte sem parar.",
    ro: "Pășește înainte și coboară genunchiul din spate spre podea, apoi adu piciorul din spate direct în pasul următor, fără oprire.",
  },
  dbStepUp: {
    en: "The same step-up holding a weight in each hand — keep the ribs down so the load doesn't pull you into a lean.",
    fr: "Le même passage sur marche avec un haltère dans chaque main — gardez les côtes basses pour que la charge ne vous fasse pas pencher.",
    ja: "両手に重りを持って行うステップアップです。肋骨を下げた姿勢を保ち、重量に引かれて上体が傾かないようにします。",
    pt: "A mesma subida no banco segurando um peso em cada mão — mantenha as costelas baixas para que a carga não o incline.",
    ro: "Aceeași urcare pe bancă, cu o greutate în fiecare mână — ține coastele jos, ca încărcătura să nu te tragă într-o înclinare.",
  },

  /* ── Upper body: push ─────────────────────────────────────────────────── */
  pushUp: {
    en: "Hands under the shoulders, body in one straight line from head to heels, lower until the chest is just off the floor and press back up.",
    fr: "Mains sous les épaules, corps aligné de la tête aux talons, descendez jusqu'à ce que la poitrine frôle le sol puis remontez.",
    ja: "手を肩の真下に置き、頭からかかとまで一直線を保ちます。胸が床すれすれになるまで下ろし、押し戻します。",
    pt: "Mãos sob os ombros, corpo em linha reta da cabeça aos calcanhares, desça até o peito quase tocar o chão e empurre de volta.",
    ro: "Mâinile sub umeri, corpul într-o linie dreaptă de la cap la călcâie, coboară până pieptul e la un deget de podea și împinge înapoi.",
  },
  pikePushUp: {
    en: "From a high hip position with straight legs, bend the elbows to lower the crown of your head towards the floor between your hands.",
    fr: "Hanches hautes et jambes tendues, fléchissez les coudes pour amener le sommet du crâne vers le sol entre vos mains.",
    ja: "脚を伸ばして腰を高く突き上げた姿勢から肘を曲げ、両手の間の床に向けて頭頂を下ろします。",
    pt: "A partir de uma posição com o quadril alto e as pernas estendidas, dobre os cotovelos para levar o topo da cabeça ao chão entre as mãos.",
    ro: "Din poziția cu șoldurile sus și picioarele întinse, îndoaie coatele pentru a coborî creștetul spre podea, între mâini.",
  },
  benchDip: {
    en: "Hands on the edge of a stable surface behind you, lower until the elbows are bent to a right angle, then press back up.",
    fr: "Mains sur le bord d'une surface stable derrière vous, descendez jusqu'à ce que les coudes forment un angle droit, puis remontez.",
    ja: "背後の安定した台の縁に手をつき、肘が直角になるまで体を下ろしてから押し上げます。",
    pt: "Mãos na borda de uma superfície firme atrás de você, desça até os cotovelos formarem um ângulo reto e empurre de volta.",
    ro: "Mâinile pe marginea unei suprafețe stabile din spatele tău, coboară până coatele ajung la unghi drept, apoi împinge înapoi.",
  },
  dbBenchPress: {
    en: "Lying on a bench, press the weights up over the chest and lower them under control until the elbows pass just below the torso.",
    fr: "Allongé sur un banc, poussez les haltères au-dessus de la poitrine et redescendez-les de façon contrôlée jusqu'à ce que les coudes passent légèrement sous le buste.",
    ja: "ベンチに仰向けになり、重りを胸の上に押し上げます。肘が胴体よりわずかに下がる位置まで、制御しながら下ろします。",
    pt: "Deitado no banco, empurre os pesos acima do peito e desça de forma controlada até os cotovelos passarem um pouco abaixo do tronco.",
    ro: "Întins pe bancă, împinge greutățile deasupra pieptului și coboară-le controlat până coatele trec puțin sub nivelul trunchiului.",
  },
  dbOverheadPress: {
    en: "Standing with the ribs down, press the weights from shoulder height to overhead without letting the lower back arch.",
    fr: "Debout, côtes basses, poussez les haltères de la hauteur des épaules jusqu'au-dessus de la tête sans cambrer le bas du dos.",
    ja: "肋骨を下げて立ち、肩の高さから頭上へ重りを押し上げます。腰が反らないように注意します。",
    pt: "Em pé com as costelas baixas, empurre os pesos da altura dos ombros até acima da cabeça sem arquear a lombar.",
    ro: "În picioare, cu coastele jos, împinge greutățile de la nivelul umerilor deasupra capului, fără să arcuiești zona lombară.",
  },
  tricepExtension: {
    en: "Upper arms fixed beside the ears, bend at the elbow to lower the weight behind the head, then straighten the arms again.",
    fr: "Bras fixés le long des oreilles, fléchissez les coudes pour descendre la charge derrière la tête, puis tendez à nouveau les bras.",
    ja: "上腕を耳の横に固定したまま肘を曲げて重りを頭の後ろに下ろし、再び腕を伸ばします。",
    pt: "Braços fixos ao lado das orelhas, dobre os cotovelos para descer o peso atrás da cabeça e estenda os braços novamente.",
    ro: "Brațele fixate lângă urechi, îndoaie din coate pentru a coborî greutatea în spatele capului, apoi întinde brațele din nou.",
  },

  /* ── Upper body: pull ─────────────────────────────────────────────────── */
  towelRow: {
    en: "Loop a towel around a door handle, lean back with straight arms, and pull your chest towards your hands with the elbows close in.",
    fr: "Passez une serviette autour d'une poignée de porte, penchez-vous en arrière bras tendus, et tirez la poitrine vers vos mains, coudes près du corps.",
    ja: "タオルをドアノブに掛け、腕を伸ばして後ろに体重を預けます。肘を体に近づけたまま、胸を手の方へ引き寄せます。",
    pt: "Passe uma toalha na maçaneta, incline-se para trás com os braços estendidos e puxe o peito em direção às mãos com os cotovelos próximos ao corpo.",
    ro: "Petrece un prosop pe clanța ușii, lasă-te pe spate cu brațele întinse și trage pieptul spre mâini, cu coatele aproape de corp.",
  },
  supermanHold: {
    en: "Face down with arms extended, lift the chest, arms and thighs a few centimetres off the floor and hold without straining the neck.",
    fr: "À plat ventre bras tendus, décollez la poitrine, les bras et les cuisses de quelques centimètres et maintenez sans forcer sur la nuque.",
    ja: "うつ伏せで腕を前に伸ばし、胸・腕・太ももを数センチ床から浮かせて保持します。首に力を入れないようにします。",
    pt: "De bruços com os braços estendidos, eleve o peito, os braços e as coxas alguns centímetros do chão e sustente sem forçar o pescoço.",
    ro: "Culcat pe burtă cu brațele întinse, ridică pieptul, brațele și coapsele câțiva centimetri de podea și menține fără să încordezi gâtul.",
  },
  invertedRowChair: {
    en: "Lie under a sturdy table or bar, grip the edge, and pull your chest up to it keeping the body in one line from shoulders to heels.",
    fr: "Allongez-vous sous une table solide ou une barre, saisissez le bord et tirez votre poitrine vers celui-ci en gardant le corps aligné des épaules aux talons.",
    ja: "頑丈なテーブルやバーの下に仰向けになり、縁を握って胸を引き上げます。肩からかかとまで一直線を保ちます。",
    pt: "Deite-se sob uma mesa firme ou barra, segure a borda e puxe o peito até ela mantendo o corpo alinhado dos ombros aos calcanhares.",
    ro: "Întinde-te sub o masă solidă sau o bară, prinde marginea și trage pieptul spre ea, păstrând corpul într-o linie de la umeri la călcâie.",
  },
  bentOverRow: {
    en: "Hinge forward with a flat back, let the weights hang, then row them towards the hips by leading with the elbows.",
    fr: "Penchez-vous en avant dos plat, laissez pendre les haltères, puis tirez-les vers les hanches en menant avec les coudes.",
    ja: "背中を平らに保って前傾し、重りをぶら下げます。肘から先導するようにして、重りを腰へ向かって引き上げます。",
    pt: "Incline-se à frente com as costas retas, deixe os pesos pendurados e puxe-os em direção ao quadril conduzindo com os cotovelos.",
    ro: "Apleacă-te în față cu spatele drept, lasă greutățile să atârne, apoi trage-le spre șolduri conducând mișcarea din coate.",
  },
  latPulldownOrPullup: {
    en: "Hanging or seated at the machine, pull the elbows down and back until the chin clears the bar or the bar reaches the collarbones.",
    fr: "En suspension ou assis à la machine, tirez les coudes vers le bas et l'arrière jusqu'à ce que le menton dépasse la barre ou que la barre atteigne les clavicules.",
    ja: "ぶら下がるか、マシンに座った状態で、肘を下後方に引きます。顎がバーを越えるか、バーが鎖骨に触れるまで引きます。",
    pt: "Pendurado ou sentado no aparelho, puxe os cotovelos para baixo e para trás até o queixo passar da barra ou a barra chegar às clavículas.",
    ro: "Atârnat sau așezat la aparat, trage coatele în jos și în spate până bărbia depășește bara sau bara ajunge la clavicule.",
  },
  facePullBand: {
    en: "Anchor a band at head height and pull it towards your face, separating the hands and finishing with the elbows high.",
    fr: "Fixez un élastique à hauteur de tête et tirez-le vers votre visage en écartant les mains, coudes hauts en fin de mouvement.",
    ja: "バンドを頭の高さに固定し、両手を左右に開きながら顔に向かって引きます。動作の終わりで肘を高く保ちます。",
    pt: "Fixe um elástico na altura da cabeça e puxe-o em direção ao rosto, separando as mãos e terminando com os cotovelos altos.",
    ro: "Ancorează o bandă la înălțimea capului și trage-o spre față, depărtând mâinile și terminând cu coatele sus.",
  },

  /* ── Core ─────────────────────────────────────────────────────────────── */
  plank: {
    en: "On the forearms with the elbows under the shoulders, hold one straight line from head to heels and keep breathing.",
    fr: "Sur les avant-bras, coudes sous les épaules, tenez une ligne droite de la tête aux talons et continuez à respirer.",
    ja: "肘を肩の真下に置いて前腕で支え、頭からかかとまで一直線を保ちます。呼吸は止めません。",
    pt: "Nos antebraços com os cotovelos sob os ombros, mantenha uma linha reta da cabeça aos calcanhares e continue respirando.",
    ro: "Pe antebrațe, cu coatele sub umeri, menține o linie dreaptă de la cap la călcâie și continuă să respiri.",
  },
  deadBug: {
    en: "On your back with the lower spine pressed down, extend the opposite arm and leg away, then return them without letting the back lift.",
    fr: "Sur le dos, bas du dos plaqué au sol, étendez un bras et la jambe opposée, puis ramenez-les sans laisser le dos se décoller.",
    ja: "仰向けで腰を床に押しつけたまま、対角の腕と脚を伸ばします。背中が浮かないように戻します。",
    pt: "De costas com a lombar pressionada no chão, estenda o braço e a perna opostos e retorne sem deixar as costas subirem.",
    ro: "Pe spate, cu zona lombară lipită de sol, întinde brațul și piciorul opus, apoi revino fără să lași spatele să se ridice.",
  },
  sidePlank: {
    en: "On one forearm with the feet stacked, lift the hips until the body forms a straight line, and hold without letting them drop.",
    fr: "Sur un avant-bras, pieds superposés, levez les hanches jusqu'à former une ligne droite et maintenez sans les laisser redescendre.",
    ja: "片方の前腕で支え、両足を重ねて腰を持ち上げます。体が一直線になった位置を、腰を落とさずに保持します。",
    pt: "Sobre um antebraço com os pés empilhados, eleve o quadril até o corpo formar uma linha reta e sustente sem deixá-lo cair.",
    ro: "Pe un antebraț, cu picioarele suprapuse, ridică șoldurile până corpul formează o linie dreaptă și menține fără să le lași să coboare.",
  },
  weightedPlank: {
    en: "A plank with a plate resting on the upper back — the same line, held against more load, so brace before it is placed.",
    fr: "Une planche avec un disque posé sur le haut du dos — la même ligne, tenue sous plus de charge : gainez avant qu'il soit posé.",
    ja: "背中上部にプレートを乗せて行うプランクです。同じ一直線をより大きな負荷で保ちます。乗せる前に体幹を締めておきます。",
    pt: "Uma prancha com uma anilha apoiada na parte alta das costas — a mesma linha, sustentada com mais carga: contraia antes de ela ser colocada.",
    ro: "Un plank cu o discă așezată pe partea superioară a spatelui — aceeași linie, ținută sub mai multă încărcătură: încordează-te înainte să fie pusă.",
  },
  palloffPress: {
    en: "Standing side-on to an anchored band, press it straight out from the chest and resist the pull that wants to rotate you.",
    fr: "Debout de profil par rapport à un élastique fixé, poussez-le droit devant depuis la poitrine et résistez à la traction qui cherche à vous faire pivoter.",
    ja: "固定したバンドに対して横向きに立ち、胸の前からまっすぐ押し出します。体を回そうとする張力に抵抗します。",
    pt: "Em pé, de lado para um elástico fixo, empurre-o à frente a partir do peito e resista à tração que tenta girá-lo.",
    ro: "În picioare, cu lateralul spre o bandă ancorată, împinge-o drept în față de la piept și rezistă tracțiunii care vrea să te rotească.",
  },
  farmerCarry: {
    en: "Pick up a heavy weight in each hand and walk with the shoulders back and the ribs down, taking normal-length steps.",
    fr: "Prenez une charge lourde dans chaque main et marchez épaules en arrière, côtes basses, avec des pas de longueur normale.",
    ja: "両手に重い重りを持ち、肩を後ろに引き肋骨を下げた姿勢で歩きます。歩幅は普段どおりにします。",
    pt: "Pegue um peso pesado em cada mão e caminhe com os ombros para trás e as costelas baixas, com passos de comprimento normal.",
    ro: "Ridică o greutate mare în fiecare mână și mergi cu umerii trași în spate și coastele jos, cu pași de lungime normală.",
  },

  /* ── Conditioning ─────────────────────────────────────────────────────── */
  burpee: {
    en: "Drop to a push-up position, return the feet under the hips, and stand or jump up — one continuous cycle rather than four separate moves.",
    fr: "Descendez en position de pompe, ramenez les pieds sous les hanches et relevez-vous ou sautez — un cycle continu plutôt que quatre gestes séparés.",
    ja: "腕立ての姿勢まで下り、足を腰の下に戻して立ち上がる（または跳ぶ）動作です。4つの別々の動きではなく、一つの連続した流れとして行います。",
    pt: "Desça para a posição de flexão, traga os pés de volta sob o quadril e levante-se ou salte — um ciclo contínuo, não quatro movimentos separados.",
    ro: "Coboară în poziția de flotare, adu picioarele înapoi sub șolduri și ridică-te sau sari — un ciclu continuu, nu patru mișcări separate.",
  },
  mountainClimber: {
    en: "From a push-up position, drive the knees alternately towards the chest while keeping the hips level and the shoulders over the hands.",
    fr: "En position de pompe, ramenez alternativement les genoux vers la poitrine en gardant les hanches stables et les épaules au-dessus des mains.",
    ja: "腕立ての姿勢から、膝を交互に胸へ引き寄せます。腰の高さを一定に保ち、肩は手の真上に置きます。",
    pt: "Da posição de flexão, leve os joelhos alternadamente em direção ao peito mantendo o quadril nivelado e os ombros sobre as mãos.",
    ro: "Din poziția de flotare, adu genunchii alternativ spre piept, menținând șoldurile la același nivel și umerii deasupra mâinilor.",
  },
  jumpingJack: {
    en: "Jump the feet out while the arms travel overhead, then back in — landing lightly through the whole foot.",
    fr: "Sautez en écartant les pieds pendant que les bras montent au-dessus de la tête, puis revenez — en amortissant sur tout le pied.",
    ja: "両足を開くと同時に腕を頭上へ上げ、元に戻します。足裏全体で軽く着地します。",
    pt: "Salte abrindo os pés enquanto os braços sobem acima da cabeça, e volte — aterrissando leve com o pé inteiro.",
    ro: "Sari depărtând picioarele în timp ce brațele urcă deasupra capului, apoi revino — aterizând ușor pe toată talpa.",
  },
  marchInPlace: {
    en: "March on the spot lifting each knee to hip height, swinging the opposite arm, at a pace you could hold a conversation through.",
    fr: "Marchez sur place en levant chaque genou à hauteur de hanche, bras opposé en balancier, à une allure permettant de tenir une conversation.",
    ja: "その場で足踏みし、膝を腰の高さまで上げて反対の腕を振ります。会話ができる程度のペースで行います。",
    pt: "Marche no lugar levantando cada joelho até a altura do quadril, balançando o braço oposto, em um ritmo em que consiga conversar.",
    ro: "Mergi pe loc ridicând fiecare genunchi până la nivelul șoldului, balansând brațul opus, într-un ritm în care poți purta o conversație.",
  },
  sitToStand: {
    en: "Sit back onto a chair and stand up again under control, using the hands only if you need them.",
    fr: "Asseyez-vous sur une chaise puis relevez-vous de façon contrôlée, en n'utilisant les mains qu'en cas de besoin.",
    ja: "椅子に腰を下ろし、コントロールしながら立ち上がります。手は必要な場合のみ使います。",
    pt: "Sente-se em uma cadeira e levante-se novamente de forma controlada, usando as mãos apenas se precisar.",
    ro: "Așază-te pe un scaun și ridică-te din nou controlat, folosind mâinile doar dacă ai nevoie.",
  },
  stepTouch: {
    en: "Step to one side and bring the other foot to meet it, then reverse — a low-impact way to keep the heart rate up.",
    fr: "Faites un pas de côté et ramenez l'autre pied contre le premier, puis inversez — un moyen sans impact de maintenir le rythme cardiaque.",
    ja: "横に一歩踏み出し、もう一方の足を寄せます。左右交互に繰り返す、関節に優しい心拍維持の動作です。",
    pt: "Dê um passo para o lado e traga o outro pé até ele, depois inverta — uma forma de baixo impacto de manter a frequência cardíaca elevada.",
    ro: "Pășește lateral și adu celălalt picior lângă el, apoi invers — o metodă cu impact redus de a menține pulsul ridicat.",
  },
  kettlebellSwing: {
    en: "A hip hinge, not a squat or a lift: snap the hips forward to float the bell to chest height and let it fall back between the legs.",
    fr: "Une charnière de hanche, ni squat ni soulevé : projetez les hanches vers l'avant pour faire monter la kettlebell à hauteur de poitrine et laissez-la redescendre entre les jambes.",
    ja: "スクワットでも持ち上げでもなく、股関節のヒンジ動作です。腰を前に伸展させてケトルベルを胸の高さまで浮かせ、脚の間へ振り戻します。",
    pt: "Um movimento de quadril, não um agachamento nem um levantamento: projete o quadril à frente para o kettlebell subir à altura do peito e deixe-o cair entre as pernas.",
    ro: "O mișcare de șold, nu o genuflexiune și nu o ridicare: împinge șoldurile înainte pentru a face gireta să urce la nivelul pieptului și las-o să cadă înapoi între picioare.",
  },
  rowMachineInterval: {
    en: "Drive with the legs first, then lean back, then pull the handle to the ribs — and reverse that order on the way in.",
    fr: "Poussez d'abord avec les jambes, puis inclinez-vous en arrière, puis tirez la poignée aux côtes — et inversez cet ordre au retour.",
    ja: "まず脚で押し、次に上体を後ろに倒し、最後にハンドルを肋骨へ引きます。戻りはこの順序を逆にします。",
    pt: "Empurre primeiro com as pernas, depois incline o tronco para trás e por fim puxe a alça até as costelas — invertendo a ordem na volta.",
    ro: "Împinge întâi cu picioarele, apoi lasă-te pe spate, apoi trage mânerul la coaste — și inversează ordinea la revenire.",
  },
  battleRopes: {
    en: "Knees soft and hips back, drive alternating waves down the ropes from the shoulders rather than the wrists.",
    fr: "Genoux souples et hanches en arrière, envoyez des vagues alternées dans les cordes en initiant depuis les épaules plutôt que les poignets.",
    ja: "膝を柔らかく保ち腰を引いた姿勢で、手首ではなく肩から動かして交互の波をロープに送ります。",
    pt: "Joelhos macios e quadril para trás, produza ondas alternadas nas cordas iniciando pelos ombros, não pelos punhos.",
    ro: "Cu genunchii moi și șoldurile în spate, trimite unde alternative prin corzi pornind din umeri, nu din încheieturi.",
  },
  kettlebellSwingLight: {
    en: "The same hip hinge with a lighter bell, stopping the swing at chest height and keeping every repetition smooth.",
    fr: "La même charnière de hanche avec une kettlebell plus légère, en arrêtant le balancement à hauteur de poitrine et en gardant chaque répétition fluide.",
    ja: "同じ股関節のヒンジ動作を軽めのケトルベルで行います。振りは胸の高さで止め、各回を滑らかに保ちます。",
    pt: "O mesmo movimento de quadril com um kettlebell mais leve, parando o balanço na altura do peito e mantendo cada repetição suave.",
    ro: "Aceeași mișcare de șold cu o gireta mai ușoară, oprind balansul la nivelul pieptului și păstrând fiecare repetare lină.",
  },
  rowMachineSteady: {
    en: "The same rowing sequence held at an even, unhurried pace you could sustain for the whole interval.",
    fr: "La même séquence de rame, tenue à une allure régulière et sans hâte que vous pourriez maintenir sur tout l'intervalle.",
    ja: "同じローイングの手順を、一定のゆったりしたペースで行います。インターバル全体を通して維持できる強度にします。",
    pt: "A mesma sequência de remada mantida em um ritmo constante e tranquilo, que você consiga sustentar por todo o intervalo.",
    ro: "Aceeași secvență de vâslit, menținută într-un ritm constant și fără grabă, pe care îl poți susține tot intervalul.",
  },
  farmerCarryInterval: {
    en: "Carry the weights for a set stretch, set them down, rest, and pick them up again — posture first, distance second.",
    fr: "Portez les charges sur une distance donnée, posez-les, récupérez, puis reprenez — la posture d'abord, la distance ensuite.",
    ja: "決めた距離を運んだら重りを下ろし、休んでから再び持ち上げます。距離よりも姿勢を優先します。",
    pt: "Carregue os pesos por uma distância definida, apoie-os no chão, descanse e pegue-os de novo — postura primeiro, distância depois.",
    ro: "Cară greutățile pe o distanță stabilită, lasă-le jos, odihnește-te și ridică-le din nou — întâi postura, apoi distanța.",
  },

  /* ── Cooldown & mobility ──────────────────────────────────────────────── */
  childsPose: {
    en: "Kneel and sit back towards the heels with the arms extended forward, letting the back and shoulders lengthen as you breathe out.",
    fr: "À genoux, asseyez-vous vers les talons bras tendus devant vous, en laissant le dos et les épaules s'allonger à l'expiration.",
    ja: "膝立ちからかかとの方へ腰を下ろし、腕を前に伸ばします。息を吐きながら背中と肩が伸びていくのに任せます。",
    pt: "Ajoelhe-se e sente-se em direção aos calcanhares com os braços estendidos à frente, deixando as costas e os ombros alongarem ao expirar.",
    ro: "Îngenunchează și așază-te spre călcâie cu brațele întinse înainte, lăsând spatele și umerii să se lungească la expirație.",
  },
  hamstringStretch: {
    en: "With one leg extended, hinge forward from the hips with a flat back until you feel a stretch behind the thigh, and hold there.",
    fr: "Une jambe tendue, penchez-vous vers l'avant depuis les hanches dos plat jusqu'à sentir un étirement à l'arrière de la cuisse, et maintenez.",
    ja: "片脚を伸ばし、背中を平らに保ったまま股関節から前に倒します。太もも裏に伸びを感じたところで止めて保持します。",
    pt: "Com uma perna estendida, incline-se para frente a partir do quadril com as costas retas até sentir um alongamento atrás da coxa, e sustente.",
    ro: "Cu un picior întins, apleacă-te înainte din șolduri, cu spatele drept, până simți o întindere în spatele coapsei, și menține.",
  },
  hip9090Stretch: {
    en: "Sit with one leg bent in front and one to the side, both at right angles, and lean gently over the front shin.",
    fr: "Asseyez-vous avec une jambe pliée devant et l'autre sur le côté, toutes deux à angle droit, et penchez-vous doucement sur le tibia avant.",
    ja: "片脚を前、もう片脚を横に、いずれも直角に曲げて座り、前側のすねの上へ静かに上体を倒します。",
    pt: "Sente-se com uma perna dobrada à frente e a outra ao lado, ambas em ângulo reto, e incline-se suavemente sobre a canela da frente.",
    ro: "Așază-te cu un picior îndoit în față și celălalt lateral, ambele în unghi drept, și apleacă-te ușor peste tibia din față.",
  },
  boxBreathing: {
    en: "Breathe in for four counts, hold for four, out for four, hold for four — a deliberate way to bring the heart rate down.",
    fr: "Inspirez sur quatre temps, retenez quatre temps, expirez sur quatre, retenez quatre — une façon délibérée de faire redescendre le rythme cardiaque.",
    ja: "4カウントで吸い、4カウント止め、4カウントで吐き、4カウント止めます。心拍を意識的に落ち着かせるための呼吸法です。",
    pt: "Inspire em quatro tempos, segure quatro, expire em quatro, segure quatro — uma forma deliberada de baixar a frequência cardíaca.",
    ro: "Inspiră pe patru timpi, ține patru, expiră pe patru, ține patru — o metodă deliberată de a coborî pulsul.",
  },
};

/** Cue for an exercise in the current language, falling back to English.
 *  Mirrors `t()` rather than importing it, so this file stays dependency-free
 *  and directly testable — the same reasoning as techmap-i18n.js. */
export function exCue(id, lang) {
  const entry = EX_CUES[id];
  if (!entry) return "";
  return entry[lang] || entry.en || "";
}
