// ─── i18n.js — All UI translations for SubmitologY ───────────────────────────
// Languages: en (English), fr (French), ja (Japanese), pt (Brazilian Portuguese), ro (Romanian)

export const LANGUAGES = [
  { code: "en", label: "English",    flag: "🇬🇧" },
  { code: "fr", label: "Français",   flag: "🇫🇷" },
  { code: "ja", label: "日本語",      flag: "🇯🇵" },
  { code: "pt", label: "Português",  flag: "🇧🇷" },
  { code: "ro", label: "Română",     flag: "🇷🇴" },
];

export const T = {

  // ── NAV ──────────────────────────────────────────────────────────────────
  nav: {
    overview:   { en: "Overview",   fr: "Accueil",   ja: "概要",     pt: "Visão Geral", ro: "Prezentare" },
    concepts:   { en: "Concepts",   fr: "Concepts",  ja: "概念",     pt: "Conceitos",   ro: "Concepte"   },
    techniques: { en: "Techniques", fr: "Techniques",ja: "技術",     pt: "Técnicas",    ro: "Tehnici"    },
    about:      { en: "About",      fr: "À propos",  ja: "について", pt: "Sobre",       ro: "Despre"     },
    addAdmin:   { en: "🔒 Admin",   fr: "🔒 Admin",  ja: "🔒 管理",  pt: "🔒 Admin",    ro: "🔒 Admin"   },
    exitAdmin:  { en: "🔓 Admin",   fr: "🔓 Admin",  ja: "🔓 管理",  pt: "🔓 Admin",    ro: "🔓 Admin"   },
    addBtn:     { en: "+ Add",      fr: "+ Ajouter", ja: "+ 追加",   pt: "+ Adicionar",  ro: "+ Adaugă"   },
  },

  // ── OVERVIEW ─────────────────────────────────────────────────────────────
  overview: {
    tag:         { en: "Brazilian Jiu-Jitsu Knowledge Base", fr: "Base de connaissances Jiu-Jitsu Brésilien", ja: "ブラジリアン柔術ナレッジベース", pt: "Base de Conhecimento de Jiu-Jitsu Brasileiro", ro: "Baza de cunoștințe Jiu-Jitsu Brazilian" },
    titleLine1:  { en: "The Art of",           fr: "L'Art des",          ja: "人間チェスの",     pt: "A Arte do",          ro: "Arta" },
    titleLine2:  { en: "Human Chess",          fr: "Échecs Humain",     ja: "芸術",             pt: "Xadrez Humano",      ro: "Șahului Uman" },
    body:        { en: "BJJ is a ground-based martial art built on leverage, timing, and positional strategy. A smaller practitioner can — and regularly does — defeat larger opponents using technique alone. This lab is your structured guide to positions, submissions, and concepts.", fr: "Le BJJ est un art martial au sol basé sur l'effet de levier, le timing et la stratégie positionnelle. Un pratiquant plus petit peut — et le fait régulièrement — battre des adversaires plus grands grâce à la seule technique. Ce laboratoire est votre guide structuré des positions, soumissions et concepts.", ja: "BJJはレバレッジ、タイミング、ポジション戦略に基づく地上格闘技です。体格の小さい練習者でも技術だけで大きな相手に勝つことができます。このラボはポジション、サブミッション、概念への体系的なガイドです。", pt: "O BJJ é uma arte marcial de combate no chão baseada em alavanca, timing e estratégia posicional. Um praticante menor pode — e regularmente o faz — derrotar oponentes maiores usando apenas a técnica. Este lab é o seu guia estruturado para posições, finalizações e conceitos.", ro: "BJJ este o artă marțială la sol bazată pe pârghie, timp și strategie pozițională. Un practician mai mic poate — și în mod regulat reușește — să învingă adversari mai mari folosind doar tehnica. Acest laborator este ghidul tău structurat pentru poziții, submisii și concepte." },
    exploreCta:  { en: "Explore Techniques →", fr: "Explorer les Techniques →", ja: "技術を探索する →", pt: "Explorar Técnicas →", ro: "Explorează Tehnicile →" },
    conceptsCta: { en: "Basic Concepts",       fr: "Concepts de base",          ja: "基本概念",         pt: "Conceitos Básicos",   ro: "Concepte de bază" },
    statTech:    { en: "Techniques Indexed",   fr: "Techniques indexées",       ja: "技術収録数",       pt: "Técnicas Indexadas",  ro: "Tehnici indexate" },
    statCats:    { en: "Categories",           fr: "Catégories",                ja: "カテゴリー",       pt: "Categorias",          ro: "Categorii" },
    statDiffs:   { en: "Difficulty Levels",    fr: "Niveaux de difficulté",     ja: "難易度レベル",     pt: "Níveis de Dificuldade",ro: "Niveluri de dificultate" },
    statCombo:   { en: "Combinations",         fr: "Combinaisons",              ja: "組み合わせ",       pt: "Combinações",         ro: "Combinații" },
    techCount:   { en: "Techniques",           fr: "Techniques",                ja: "技術",             pt: "Técnicas",            ro: "Tehnici" },
  },

  // ── CONCEPTS ─────────────────────────────────────────────────────────────
  concepts: {
    pageTitle:    { en: "Basic Concepts",  fr: "Concepts de base", ja: "基本概念",       pt: "Conceitos Básicos", ro: "Concepte de bază" },
    pageSubtitle: { en: "The mental models every BJJ practitioner should internalise from day one.", fr: "Les modèles mentaux que chaque pratiquant de BJJ devrait intérioriser dès le premier jour.", ja: "すべてのBJJ練習者が初日から内面化すべきメンタルモデル。", pt: "Os modelos mentais que todo praticante de BJJ deve internalizar desde o primeiro dia.", ro: "Modelele mentale pe care fiecare practicant de BJJ ar trebui să le internalizeze din prima zi." },
  },

  // ── CONCEPTS CONTENT ─────────────────────────────────────────────────────
  conceptItems: [
    {
      icon: "⚖️",
      title: { en: "Positional Hierarchy", fr: "Hiérarchie positionnelle", ja: "ポジション階層", pt: "Hierarquia Posicional", ro: "Ierarhia pozițională" },
      body:  { en: "BJJ ranks positions by dominance: back control → mount → knee-on-belly → side control → guard. The higher on the ladder, the more control and submission options you have.", fr: "Le BJJ classe les positions par dominance : contrôle du dos → montée → genou sur le ventre → contrôle latéral → garde. Plus on monte, plus on a de contrôle et d'options de soumission.", ja: "BJJは支配度でポジションを順位付けします：バックコントロール→マウント→ニーオンベリー→サイドコントロール→ガード。上位ほどコントロールとサブミッションの選択肢が多くなります。", pt: "O BJJ classifica as posições por dominância: controle das costas → montada → joelho na barriga → controle lateral → guarda. Quanto mais alto na hierarquia, mais controle e opções de finalização você tem.", ro: "BJJ clasifică pozițiile după dominanță: controlul spatelui → montare → genunchi pe burtă → control lateral → gardă. Cu cât ești mai sus, cu atât ai mai mult control și mai multe opțiuni de submisie." },
    },
    {
      icon: "🔄",
      title: { en: "The Guard", fr: "La Garde", ja: "ガード", pt: "A Guarda", ro: "Garda" },
      body:  { en: "Unique to BJJ — fighting effectively from your back. The guard is not defensive; it is an attacking platform. Developing a strong guard changed martial arts forever.", fr: "Unique au BJJ — se battre efficacement sur le dos. La garde n'est pas défensive ; c'est une plateforme d'attaque. Développer une garde solide a changé les arts martiaux pour toujours.", ja: "BJJに固有の技術 — 仰向けから効果的に戦う。ガードは防御的ではなく攻撃的なプラットフォームです。強いガードの開発は武道を永遠に変えました。", pt: "Único no BJJ — lutar efetivamente de costas para o chão. A guarda não é defensiva; é uma plataforma de ataque. Desenvolver uma guarda forte mudou as artes marciais para sempre.", ro: "Unic în BJJ — luptând eficient de pe spate. Garda nu este defensivă; este o platformă de atac. Dezvoltarea unei gărzi puternice a schimbat artele marțiale pentru totdeauna." },
    },
    {
      icon: "🌊",
      title: { en: "Flowing & Chaining", fr: "Fluidité et enchaînements", ja: "フローとチェーン", pt: "Fluxo e Encadeamento", ro: "Fluiditate și înlănțuire" },
      body:  { en: "Techniques are rarely isolated. A failed armbar should flow into a triangle; a blocked triangle feeds an omoplata. Train combinations, not just individual moves.", fr: "Les techniques sont rarement isolées. Un armbar raté devrait se transformer en triangle ; un triangle bloqué alimente une omoplata. Entraînez des combinaisons, pas seulement des mouvements individuels.", ja: "技術は孤立していることはほとんどありません。失敗したアームバーはトライアングルに流れ込むべきです。ブロックされたトライアングルはオモプラタにつながります。個々の動きだけでなく、コンビネーションを練習しましょう。", pt: "As técnicas raramente são isoladas. Um armbar falhado deve fluir para um triângulo; um triângulo bloqueado alimenta uma omoplata. Treine combinações, não apenas movimentos individuais.", ro: "Tehnicile sunt rar izolate. Un armbar eșuat ar trebui să curgă într-un triunghi; un triunghi blocat alimentează o omoplata. Antrenați combinații, nu doar mișcări individuale." },
    },
    {
      icon: "🎯",
      title: { en: "Base & Posture", fr: "Base et posture", ja: "ベースとポスチャー", pt: "Base e Postura", ro: "Bază și postură" },
      body:  { en: "Before attacking, establish base (hips low, weight distributed) and posture (spine neutral). Neglecting these fundamentals is the fastest way to get submitted.", fr: "Avant d'attaquer, établissez la base (hanches basses, poids réparti) et la posture (colonne vertébrale neutre). Négliger ces fondamentaux est le moyen le plus rapide d'être soumis.", ja: "攻撃する前に、ベース（腰を低く、体重を分散）とポスチャー（脊椎を中立）を確立します。これらの基本を怠ることは、サブミットされる最速の方法です。", pt: "Antes de atacar, estabeleça a base (quadris baixos, peso distribuído) e a postura (coluna neutra). Negligenciar esses fundamentos é a maneira mais rápida de ser finalizado.", ro: "Înainte de a ataca, stabiliți baza (șolduri joase, greutate distribuită) și postura (coloana neutră). Neglijarea acestor fundamente este cel mai rapid mod de a fi supus." },
    },
    {
      icon: "⏱️",
      title: { en: "Timing Over Force", fr: "Le timing plutôt que la force", ja: "力よりタイミング", pt: "Timing sobre Força", ro: "Timing înainte de forță" },
      body:  { en: "BJJ was designed so a smaller person can overcome a larger one. Timing, leverage, and technique consistently beat raw strength — especially over a long roll.", fr: "Le BJJ a été conçu pour qu'une personne plus petite puisse surmonter une plus grande. Le timing, l'effet de levier et la technique battent constamment la force brute — surtout sur un long assaut.", ja: "BJJは体の小さい人が大きな人を克服できるように設計されました。タイミング、レバレッジ、技術は一貫して生の力を打ち負かします — 特に長いロールでは。", pt: "O BJJ foi projetado para que uma pessoa menor possa superar uma maior. Timing, alavanca e técnica consistentemente superam a força bruta — especialmente em um rolar longo.", ro: "BJJ a fost conceput astfel încât o persoană mai mică să poată depăși una mai mare. Timing-ul, pârghia și tehnica înving în mod constant forța brută — mai ales într-un antrenament lung." },
    },
    {
      icon: "🦺",
      title: { en: "Tap Early, Tap Often", fr: "Tapoter tôt, tapoter souvent", ja: "早めにタップ、よくタップ", pt: "Toque cedo, toque com frequência", ro: "Tapează devreme, tapează des" },
      body:  { en: "Tapping is not failure — it's the mechanism that lets training continue safely. Pride in refusing to tap leads to injuries. The mats will always be there tomorrow.", fr: "Tapoter n'est pas un échec — c'est le mécanisme qui permet à l'entraînement de se poursuivre en toute sécurité. La fierté de refuser de tapoter entraîne des blessures. Les tatamis seront toujours là demain.", ja: "タップは失敗ではありません — 安全にトレーニングを続けるためのメカニズムです。タップを拒否することへの誇りはけがにつながります。マットは常に明日もそこにあります。", pt: "Tocar não é falha — é o mecanismo que permite que o treino continue com segurança. O orgulho em recusar tocar leva a lesões. Os tapetes sempre estarão lá amanhã.", ro: "Taparea nu este un eșec — este mecanismul care permite antrenamentul să continue în siguranță. Mândria de a refuza să tapezi duce la răni. Salteaua va fi întotdeauna acolo mâine." },
    },
  ],

  // ── TECHNIQUES PAGE ───────────────────────────────────────────────────────
  techniques: {
    typeLabel:    { en: "Type",    fr: "Type",       ja: "タイプ",    pt: "Tipo",     ro: "Tip"     },
    levelLabel:   { en: "Level",   fr: "Niveau",     ja: "レベル",    pt: "Nível",    ro: "Nivel"   },
    results:      { en: "results", fr: "résultats",  ja: "件",        pt: "resultados",ro: "rezultate" },
    result:       { en: "result",  fr: "résultat",   ja: "件",        pt: "resultado", ro: "rezultat"  },
    noResults:    { en: "No techniques match these filters.", fr: "Aucune technique ne correspond à ces filtres.", ja: "フィルターに一致する技術がありません。", pt: "Nenhuma técnica corresponde a esses filtros.", ro: "Nicio tehnică nu corespunde acestor filtre." },
    openCta:      { en: "Open →",  fr: "Ouvrir →",  ja: "開く →",   pt: "Abrir →",  ro: "Deschide →" },
  },

  // ── CATEGORY NAMES (used in filters + pills) ──────────────────────────────
  cats: {
    All:         { en: "All",        fr: "Tous",       ja: "すべて",   pt: "Todos",     ro: "Toate"     },
    Guards:      { en: "Guards",     fr: "Gardes",     ja: "ガード",   pt: "Guardas",   ro: "Gărzi"     },
    Submissions: { en: "Submissions",fr: "Soumissions",ja: "サブミッション", pt: "Finalizações", ro: "Submisii" },
    Transitions: { en: "Transitions",fr: "Transitions",ja: "トランジション", pt: "Transições",  ro: "Tranziții" },
    Takedowns:   { en: "Takedowns",  fr: "Projections",ja: "テイクダウン",   pt: "Quedas",      ro: "Proiectări" },
    "Dark BJJ":  { en: "Dark BJJ",   fr: "BJJ Sombre", ja: "ダークBJJ",     pt: "BJJ Negro",   ro: "BJJ Întunecat" },
  },

  // ── DIFFICULTY NAMES ──────────────────────────────────────────────────────
  diffs: {
    All:          { en: "All",          fr: "Tous",          ja: "すべて",  pt: "Todos",       ro: "Toate"       },
    Beginner:     { en: "Beginner",     fr: "Débutant",      ja: "初心者",  pt: "Iniciante",   ro: "Începător"   },
    Intermediate: { en: "Intermediate", fr: "Intermédiaire", ja: "中級者",  pt: "Intermediário",ro: "Intermediar" },
    Advanced:     { en: "Advanced",     fr: "Avancé",        ja: "上級者",  pt: "Avançado",    ro: "Avansat"     },
  },

  // ── MODAL ─────────────────────────────────────────────────────────────────
  modal: {
    keyPoints:  { en: "Key Points",           fr: "Points clés",          ja: "重要ポイント",   pt: "Pontos-chave",        ro: "Puncte cheie"         },
    watchYT:    { en: "▶ Watch on YouTube",   fr: "▶ Voir sur YouTube",   ja: "▶ YouTubeで見る", pt: "▶ Ver no YouTube",   ro: "▶ Urmărește pe YouTube"},
  },

  // ── ABOUT PAGE ────────────────────────────────────────────────────────────
  about: {
    pageTitle:   { en: "About SubmitologY", fr: "À propos de SubmitologY", ja: "SubmitologYについて", pt: "Sobre o SubmitologY", ro: "Despre SubmitologY" },
    body1:       { en: "SubmitologY is a structured BJJ knowledge base built to help practitioners of all levels explore positions, submissions, transitions, and takedowns in an organised, visual way.", fr: "SubmitologY est une base de connaissances BJJ structurée pour aider les pratiquants de tous niveaux à explorer les positions, soumissions, transitions et projections de manière organisée et visuelle.", ja: "SubmitologYは、あらゆるレベルの練習者がポジション、サブミッション、トランジション、テイクダウンを整理された視覚的な方法で探索できるように作られた構造化されたBJJナレッジベースです。", pt: "O SubmitologY é uma base de conhecimento de BJJ estruturada para ajudar praticantes de todos os níveis a explorar posições, finalizações, transições e quedas de forma organizada e visual.", ro: "SubmitologY este o bază de cunoștințe BJJ structurată, concepută pentru a ajuta practicanții de toate nivelurile să exploreze pozițiile, submisiile, tranzițiile și proiectările într-un mod organizat și vizual." },
    body2:       { en: "Each technique entry includes a description, coaching key points, difficulty rating, and a link to external video resources.", fr: "Chaque entrée de technique comprend une description, des points clés d'entraînement, une évaluation de difficulté et un lien vers des ressources vidéo externes.", ja: "各技術エントリーには、説明、コーチングのキーポイント、難易度評価、外部ビデオリソースへのリンクが含まれています。", pt: "Cada entrada de técnica inclui uma descrição, pontos-chave de treino, classificação de dificuldade e um link para recursos de vídeo externos.", ro: "Fiecare intrare de tehnică include o descriere, puncte cheie de antrenament, evaluare a dificultății și un link către resurse video externe." },
    catsTitle:   { en: "Categories Explained", fr: "Catégories expliquées", ja: "カテゴリーの説明", pt: "Categorias Explicadas", ro: "Categorii explicate" },
    catDescs: {
      Guards:      { en: "Bottom positions to control, sweep, or submit.", fr: "Positions au sol pour contrôler, sweeper ou soumettre.", ja: "コントロール、スイープ、またはサブミットするための底部ポジション。", pt: "Posições de baixo para controlar, sweepear ou finalizar.", ro: "Poziții inferioare pentru a controla, mătura sau supune." },
      Submissions: { en: "Force a tap via joint locks or chokes.", fr: "Forcer un tapotement via des clés articulaires ou des étranglements.", ja: "関節技や絞め技でタップを強要する。", pt: "Forçar um toque via travamentos de articulação ou estrangulamentos.", ro: "Forțați taparea prin blocaje articulare sau sugrumări." },
      Transitions: { en: "Movement between positions — where grappling really lives.", fr: "Mouvement entre les positions — c'est là que vit vraiment le grappling.", ja: "ポジション間の移動 — グラップリングが本当に生きる場所。", pt: "Movimentação entre posições — onde o grappling realmente vive.", ro: "Mișcarea între poziții — unde trăiește cu adevărat grappling-ul." },
      Takedowns:   { en: "Getting the fight to the ground on your terms.", fr: "Amener le combat au sol selon vos conditions.", ja: "自分のペースで試合を地上に持ち込む。", pt: "Levar a luta ao chão nos seus termos.", ro: "Ducerea luptei la sol în condițiile tale." },
      "Dark BJJ":  { en: "High-risk techniques — study carefully, apply with control.", fr: "Techniques à haut risque — étudiez attentivement, appliquez avec contrôle.", ja: "高リスクな技術 — 注意深く研究し、コントロールして適用する。", pt: "Técnicas de alto risco — estude com cuidado, aplique com controle.", ro: "Tehnici cu risc ridicat — studiați cu atenție, aplicați cu control." },
    },
    footer:      { en: "Built with React · Images via Unsplash · Video links via YouTube", fr: "Construit avec React · Images via Unsplash · Liens vidéo via YouTube", ja: "Reactで構築 · 画像はUnsplash · 動画リンクはYouTube", pt: "Construído com React · Imagens via Unsplash · Links de vídeo via YouTube", ro: "Construit cu React · Imagini via Unsplash · Linkuri video via YouTube" },
  },

  // ── ADD TECHNIQUES ────────────────────────────────────────────────────────
  add: {
    pageTitle:    { en: "Add Techniques",    fr: "Ajouter des techniques",  ja: "技術を追加",       pt: "Adicionar Técnicas",   ro: "Adaugă tehnici"       },
    pageSubtitle: { en: "Extend the library with new entries. Use the Form for one technique at a time, or paste a JSON array to import many at once.", fr: "Étendez la bibliothèque avec de nouvelles entrées. Utilisez le Formulaire pour une technique à la fois, ou collez un tableau JSON pour en importer plusieurs à la fois.", ja: "ライブラリを新しいエントリで拡張します。一度に1つの技術にはフォームを使用するか、JSONアレイを貼り付けて一度に多くをインポートします。", pt: "Estenda a biblioteca com novas entradas. Use o Formulário para uma técnica de cada vez, ou cole um array JSON para importar muitas de uma vez.", ro: "Extindeți biblioteca cu intrări noi. Folosiți Formularul pentru o tehnică la un moment dat, sau lipiți un array JSON pentru a importa mai multe deodată." },
    formTab:      { en: "📝  Form (single)",   fr: "📝  Formulaire (unique)", ja: "📝  フォーム (1件)", pt: "📝  Formulário (único)", ro: "📝  Formular (unic)"    },
    jsonTab:      { en: "{ }  JSON (batch)",   fr: "{ }  JSON (lot)",         ja: "{ }  JSON (一括)",  pt: "{ }  JSON (lote)",      ro: "{ }  JSON (lot)"       },
    nameLbl:      { en: "Technique Name *",    fr: "Nom de la technique *",   ja: "技術名 *",           pt: "Nome da Técnica *",     ro: "Numele tehnicii *"     },
    namePh:       { en: "e.g. Butterfly Guard",fr: "ex. Garde papillon",      ja: "例: バタフライガード", pt: "ex. Guarda Borboleta",  ro: "ex. Gardă fluture"    },
    catLbl:       { en: "Category *",          fr: "Catégorie *",             ja: "カテゴリー *",        pt: "Categoria *",           ro: "Categorie *"           },
    diffLbl:      { en: "Difficulty",          fr: "Difficulté",              ja: "難易度",             pt: "Dificuldade",           ro: "Dificultate"           },
    imgLbl:       { en: "Image URL",           fr: "URL de l'image",          ja: "画像URL",            pt: "URL da Imagem",         ro: "URL imagine"           },
    imgPh:        { en: "https://… (leave blank for default)", fr: "https://… (laisser vide pour défaut)", ja: "https://… (デフォルトには空白)", pt: "https://… (deixe em branco para padrão)", ro: "https://… (lăsați gol pentru implicit)" },
    descLbl:      { en: "Description *",       fr: "Description *",           ja: "説明 *",             pt: "Descrição *",           ro: "Descriere *"           },
    descPh:       { en: "Describe the position, its purpose, and when it's used.", fr: "Décrivez la position, son objectif et quand elle est utilisée.", ja: "ポジション、その目的、使用タイミングを説明してください。", pt: "Descreva a posição, seu propósito e quando é usada.", ro: "Descrieți poziția, scopul ei și când se folosește." },
    ytLbl:        { en: "YouTube URL",         fr: "URL YouTube",             ja: "YouTube URL",        pt: "URL do YouTube",        ro: "URL YouTube"           },
    ytPh:         { en: "https://www.youtube.com/watch?v=…", fr: "https://www.youtube.com/watch?v=…", ja: "https://www.youtube.com/watch?v=…", pt: "https://www.youtube.com/watch?v=…", ro: "https://www.youtube.com/watch?v=…" },
    kpLbl:        { en: "Key Points (up to 3 — optional)", fr: "Points clés (jusqu'à 3 — optionnel)", ja: "重要ポイント（最大3つ — オプション）", pt: "Pontos-chave (até 3 — opcional)", ro: "Puncte cheie (până la 3 — opțional)" },
    kp1Ph:        { en: "e.g. Break posture first",   fr: "ex. Casser la posture d'abord", ja: "例: まずポスチャーを崩す", pt: "ex. Quebre a postura primeiro", ro: "ex. Rupeți postura mai întâi" },
    kp2Ph:        { en: "e.g. Control the sleeve",    fr: "ex. Contrôler la manche",       ja: "例: 袖をコントロールする",  pt: "ex. Controle a manga",         ro: "ex. Controlați mâneca" },
    kp3Ph:        { en: "e.g. Hip angle matters",     fr: "ex. L'angle des hanches compte",ja: "例: 腰の角度が重要",        pt: "ex. O ângulo do quadril importa",ro: "ex. Unghiul șoldului contează" },
    addBtn:       { en: "Add to Library →",           fr: "Ajouter à la bibliothèque →",   ja: "ライブラリに追加 →",        pt: "Adicionar à Biblioteca →",     ro: "Adaugă în bibliotecă →" },
    importBtn:    { en: "Import JSON →",              fr: "Importer JSON →",               ja: "JSONをインポート →",          pt: "Importar JSON →",              ro: "Importă JSON →" },
    resetBtn:     { en: "Reset Template",             fr: "Réinitialiser le modèle",       ja: "テンプレートをリセット",      pt: "Redefinir Template",           ro: "Resetați șablonul" },
  },

  // ── ADMIN / PASSWORD GATE ─────────────────────────────────────────────────
  gate: {
    title:   { en: "Admin Access",    fr: "Accès Admin",       ja: "管理者アクセス",  pt: "Acesso Admin",     ro: "Acces Admin"    },
    sub:     { en: "Enter the admin password to manage techniques.", fr: "Entrez le mot de passe admin pour gérer les techniques.", ja: "技術を管理するには管理者パスワードを入力してください。", pt: "Digite a senha de admin para gerenciar técnicas.", ro: "Introduceți parola admin pentru a gestiona tehnicile." },
    ph:      { en: "Password",        fr: "Mot de passe",      ja: "パスワード",      pt: "Senha",            ro: "Parolă"         },
    unlock:  { en: "Unlock →",        fr: "Déverrouiller →",   ja: "ロック解除 →",   pt: "Desbloquear →",    ro: "Deblochează →"  },
    cancel:  { en: "Cancel",          fr: "Annuler",           ja: "キャンセル",      pt: "Cancelar",         ro: "Anulează"       },
    wrong:   { en: "Incorrect password.", fr: "Mot de passe incorrect.", ja: "パスワードが正しくありません。", pt: "Senha incorreta.", ro: "Parolă incorectă." },
    hint:    { en: "Hint: the default password is", fr: "Indice: le mot de passe par défaut est", ja: "ヒント: デフォルトのパスワードは", pt: "Dica: a senha padrão é", ro: "Indiciu: parola implicită este" },
    hintEnd: { en: ". Change ADMIN_PASSWORD in the source before deploying.", fr: ". Changez ADMIN_PASSWORD dans la source avant de déployer.", ja: "です。デプロイ前にソースのADMIN_PASSWORDを変更してください。", pt: ". Mude ADMIN_PASSWORD no código antes de fazer o deploy.", ro: ". Schimbați ADMIN_PASSWORD în sursă înainte de a implementa." },
  },

  // ── SUCCESS SCREEN (after adding technique) ───────────────────────────────
  success: {
    techAdded:  { en: "Technique",  fr: "Technique",  ja: "件の技術",  pt: "Técnica",  ro: "Tehnică"   },
    techsAdded: { en: "Techniques", fr: "Techniques", ja: "件の技術",  pt: "Técnicas", ro: "Tehnici"   },
    addedTo:    { en: "Added to Session", fr: "Ajouté à la session", ja: "がセッションに追加されました", pt: "Adicionada à Sessão", ro: "Adăugată la sesiune" },
    body:       { en: "The library is updated for this session. To make it permanent, export the JSON and paste it into SEED_TECHNIQUES in the source file, then republish.", fr: "La bibliothèque est mise à jour pour cette session. Pour la rendre permanente, exportez le JSON et collez-le dans SEED_TECHNIQUES dans le fichier source, puis republiez.", ja: "ライブラリはこのセッション用に更新されました。永続化するには、JSONをエクスポートしてソースファイルのSEED_TECHNIQUESに貼り付け、再公開してください。", pt: "A biblioteca está atualizada para esta sessão. Para torná-la permanente, exporte o JSON e cole em SEED_TECHNIQUES no arquivo fonte, depois republique.", ro: "Biblioteca este actualizată pentru această sesiune. Pentru a o face permanentă, exportați JSON-ul și lipiți-l în SEED_TECHNIQUES în fișierul sursă, apoi republicați." },
    exportLbl:  { en: "📋 Export JSON — paste into SEED_TECHNIQUES", fr: "📋 Exporter JSON — coller dans SEED_TECHNIQUES", ja: "📋 JSONをエクスポート — SEED_TECHNIQUESに貼り付け", pt: "📋 Exportar JSON — colar em SEED_TECHNIQUES", ro: "📋 Exportă JSON — lipește în SEED_TECHNIQUES" },
    copy:       { en: "Copy",       fr: "Copier",     ja: "コピー",    pt: "Copiar",   ro: "Copiați"   },
    copied:     { en: "✓ Copied!",  fr: "✓ Copié !",  ja: "✓ コピー済み！", pt: "✓ Copiado!", ro: "✓ Copiat!" },
    addAnother: { en: "Add Another", fr: "Ajouter un autre", ja: "もう1つ追加", pt: "Adicionar Outro", ro: "Adaugă altul" },
    hint:       { en: "Assign the next sequential id, paste above the ▲▲▲ END OF TECHNIQUE LIST marker, and republish.", fr: "Attribuez l'id séquentiel suivant, collez au-dessus du marqueur ▲▲▲ FIN DE LA LISTE, et republiez.", ja: "次の連番idを割り当て、▲▲▲ 技術リストの終わり マーカーの上に貼り付け、再公開してください。", pt: "Atribua o próximo id sequencial, cole acima do marcador ▲▲▲ FIM DA LISTA DE TÉCNICAS, e republique.", ro: "Atribuiți următorul id secvențial, lipiți deasupra marcatorului ▲▲▲ SFÂRȘITUL LISTEI DE TEHNICI și republicați." },
  },
};

// Helper: get translation for current language
export function t(obj, lang) {
  if (!obj) return "";
  return obj[lang] || obj["en"] || "";
}
