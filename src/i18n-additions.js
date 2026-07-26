// ─── i18n-additions.js — strings added by the 2026-07 revamp ────────────────
// Kept in its own file so the original translated copy in i18n.js stays
// untouched and easy to diff. Merged into `T` at the bottom of i18n.js.

export const UI = {

  // ── Navigation groups (the four top-level categories) ──────────────────
  groups: {
    train:   { en: "Train",   fr: "S'entraîner", ja: "練習",     pt: "Treinar",  ro: "Antrenament" },
    shop:    { en: "Shop",    fr: "Boutique",    ja: "ショップ", pt: "Loja",     ro: "Magazin" },
    mission: { en: "Mission", fr: "Mission",     ja: "ミッション", pt: "Missão", ro: "Misiune" },
    about:   { en: "Brand",   fr: "La Marque",   ja: "ブランド", pt: "A Marca",  ro: "Brandul" },
  },

  // ── Every destination: name + a one-line "what's in here" ──────────────
  sections: {
    home: {
      name: { en: "Home", fr: "Accueil", ja: "ホーム", pt: "Início", ro: "Acasă" },
      desc: { en: "Back to the start", fr: "Retour au début", ja: "最初に戻る", pt: "Voltar ao início", ro: "Înapoi la început" },
    },
    map: {
      name: { en: "Technique Map", fr: "Carte des Techniques", ja: "テクニックマップ", pt: "Mapa de Técnicas", ro: "Harta Tehnicilor" },
      desc: { en: "34 techniques and how they connect", fr: "34 techniques et leurs connexions", ja: "34の技術とそのつながり", pt: "34 técnicas e como se conectam", ro: "34 de tehnici și legăturile dintre ele" },
    },
    concepts: {
      name: { en: "Basic Concepts", fr: "Concepts de base", ja: "基本概念", pt: "Conceitos Básicos", ro: "Concepte de bază" },
      desc: { en: "The ideas underneath the techniques", fr: "Les idées derrière les techniques", ja: "技術の土台となる考え方", pt: "As ideias por trás das técnicas", ro: "Ideile din spatele tehnicilor" },
    },
    strength: {
      name: { en: "Strength & Conditioning", fr: "Force & Préparation", ja: "筋力・コンディショニング", pt: "Força & Condicionamento", ro: "Forță & Pregătire Fizică" },
      desc: { en: "Build a BJJ-specific program for your age and level", fr: "Créez un programme spécifique au BJJ selon votre âge et niveau", ja: "年齢とレベルに合わせたBJJ専用プログラム", pt: "Monte um programa específico de BJJ para sua idade e nível", ro: "Creează un program specific BJJ pentru vârsta și nivelul tău" },
    },
    shop: {
      name: { en: "Shop", fr: "Boutique", ja: "ショップ", pt: "Loja", ro: "Magazin" },
      desc: { en: "The launch collection", fr: "La collection de lancement", ja: "ローンチコレクション", pt: "A coleção de lançamento", ro: "Colecția de lansare" },
    },
    mission: {
      name: { en: "Mental Health", fr: "Santé Mentale", ja: "メンタルヘルス", pt: "Saúde Mental", ro: "Sănătate Mintală" },
      desc: { en: "Why we pledge 1% of profits", fr: "Pourquoi nous reversons 1% des profits", ja: "利益の1%を寄付する理由", pt: "Por que doamos 1% dos lucros", ro: "De ce donăm 1% din profit" },
    },
    story: {
      name: { en: "Our Story", fr: "Notre Histoire", ja: "私たちの物語", pt: "Nossa História", ro: "Povestea Noastră" },
      desc: { en: "What SubmitologY means", fr: "Ce que signifie SubmitologY", ja: "SubmitologYの意味", pt: "O que significa SubmitologY", ro: "Ce înseamnă SubmitologY" },
    },
    whatsNew: {
      name: { en: "What's New", fr: "Nouveautés", ja: "更新情報", pt: "Novidades", ro: "Noutăți" },
      desc: { en: "Recent changes to the site", fr: "Derniers changements du site", ja: "サイトの最近の更新", pt: "Mudanças recentes no site", ro: "Modificări recente pe site" },
    },
  },

  // ── Chrome ─────────────────────────────────────────────────────────────
  chrome: {
    skipToContent: { en: "Skip to content", fr: "Aller au contenu", ja: "本文へスキップ", pt: "Ir para o conteúdo", ro: "Sari la conținut" },
    openMenu:      { en: "Open menu", fr: "Ouvrir le menu", ja: "メニューを開く", pt: "Abrir menu", ro: "Deschide meniul" },
    closeMenu:     { en: "Close menu", fr: "Fermer le menu", ja: "メニューを閉じる", pt: "Fechar menu", ro: "Închide meniul" },
    menuTitle:     { en: "Menu", fr: "Menu", ja: "メニュー", pt: "Menu", ro: "Meniu" },
    dismiss:       { en: "Dismiss", fr: "Masquer", ja: "閉じる", pt: "Dispensar", ro: "Ascunde" },
    language:      { en: "Language", fr: "Langue", ja: "言語", pt: "Idioma", ro: "Limbă" },
    close:         { en: "Close", fr: "Fermer", ja: "閉じる", pt: "Fechar", ro: "Închide" },
  },

  // ── Search ─────────────────────────────────────────────────────────────
  search: {
    open:        { en: "Search", fr: "Rechercher", ja: "検索", pt: "Buscar", ro: "Caută" },
    placeholder: { en: "Search techniques and sections…", fr: "Rechercher techniques et sections…", ja: "テクニックやセクションを検索…", pt: "Buscar técnicas e seções…", ro: "Caută tehnici și secțiuni…" },
    empty:       { en: "Nothing matches that yet. Try a position or submission name.", fr: "Aucun résultat. Essayez le nom d'une position ou d'une soumission.", ja: "一致するものがありません。ポジションやサブミッション名で試してください。", pt: "Nada encontrado. Tente o nome de uma posição ou finalização.", ro: "Niciun rezultat. Încearcă numele unei poziții sau submisii." },
    groupPages:      { en: "Sections", fr: "Sections", ja: "セクション", pt: "Seções", ro: "Secțiuni" },
    groupTechniques: { en: "Techniques", fr: "Techniques", ja: "テクニック", pt: "Técnicas", ro: "Tehnici" },
    hintMove:  { en: "↑↓ move", fr: "↑↓ naviguer", ja: "↑↓ 移動", pt: "↑↓ navegar", ro: "↑↓ navighează" },
    hintOpen:  { en: "↵ open", fr: "↵ ouvrir", ja: "↵ 開く", pt: "↵ abrir", ro: "↵ deschide" },
    hintClose: { en: "esc close", fr: "échap fermer", ja: "esc 閉じる", pt: "esc fechar", ro: "esc închide" },
  },

  // ── Home page additions ────────────────────────────────────────────────
  home: {
    everythingTitle: { en: "Everything on the site", fr: "Tout le site", ja: "サイトの全コンテンツ", pt: "Tudo no site", ro: "Tot ce e pe site" },
    everythingSub:   { en: "Four areas, seven sections. Each one is also in the menu at the top.", fr: "Quatre domaines, sept sections. Chacune est aussi dans le menu en haut.", ja: "4つの領域、7つのセクション。すべて上部メニューからもアクセスできます。", pt: "Quatro áreas, sete seções. Cada uma também está no menu no topo.", ro: "Patru zone, șapte secțiuni. Fiecare se află și în meniul de sus." },
  },

  // ── Technique map additions ────────────────────────────────────────────
  map: {
    pathTitle:  { en: "Find a route", fr: "Trouver un chemin", ja: "ルートを探す", pt: "Encontrar um caminho", ro: "Găsește un traseu" },
    pathIntro:  { en: "Pick a starting position and a finish — the map will show the shortest chain between them.", fr: "Choisissez une position de départ et une finalisation — la carte affichera la chaîne la plus courte.", ja: "開始ポジションと極め技を選ぶと、最短の連携が表示されます。", pt: "Escolha uma posição inicial e uma finalização — o mapa mostrará a cadeia mais curta.", ro: "Alege o poziție de start și o finalizare — harta va arăta cel mai scurt lanț." },
    pathFrom:   { en: "From", fr: "Depuis", ja: "開始", pt: "De", ro: "De la" },
    pathTo:     { en: "To", fr: "Vers", ja: "終了", pt: "Para", ro: "Către" },
    pathClear:  { en: "Clear route", fr: "Effacer", ja: "クリア", pt: "Limpar", ro: "Șterge" },
    pathNone:   { en: "No route between those two in the current map.", fr: "Aucun chemin entre ces deux techniques dans la carte actuelle.", ja: "現在のマップではこの2つを結ぶ経路がありません。", pt: "Não há caminho entre esses dois no mapa atual.", ro: "Nu există traseu între cele două în harta curentă." },
    pathSteps:  { en: "steps", fr: "étapes", ja: "ステップ", pt: "passos", ro: "pași" },
    zoomIn:     { en: "Zoom in", fr: "Zoom avant", ja: "拡大", pt: "Aproximar", ro: "Mărește" },
    zoomOut:    { en: "Zoom out", fr: "Zoom arrière", ja: "縮小", pt: "Afastar", ro: "Micșorează" },
    resetView:  { en: "Reset view", fr: "Réinitialiser la vue", ja: "表示をリセット", pt: "Redefinir visão", ro: "Resetează vizualizarea" },
    hintDesktop:{ en: "Drag to pan · scroll to zoom", fr: "Glisser pour déplacer · molette pour zoomer", ja: "ドラッグで移動・スクロールで拡大縮小", pt: "Arraste para mover · role para ampliar", ro: "Trage pentru a muta · derulează pentru zoom" },
    hintTouch:  { en: "Drag to pan · pinch to zoom", fr: "Glisser pour déplacer · pincer pour zoomer", ja: "ドラッグで移動・ピンチで拡大縮小", pt: "Arraste para mover · pince para ampliar", ro: "Trage pentru a muta · ciupește pentru zoom" },
    markDrilled:   { en: "Mark as drilled", fr: "Marquer comme travaillée", ja: "練習済みにする", pt: "Marcar como treinada", ro: "Marchează ca exersată" },
    markedDrilled: { en: "Drilled", fr: "Travaillée", ja: "練習済み", pt: "Treinada", ro: "Exersată" },
    progress:      { en: "drilled", fr: "travaillées", ja: "練習済み", pt: "treinadas", ro: "exersate" },
    clearProgress: { en: "Reset progress", fr: "Réinitialiser", ja: "進捗をリセット", pt: "Redefinir progresso", ro: "Resetează progresul" },
    listTitle:     { en: "View all techniques as a list", fr: "Voir toutes les techniques en liste", ja: "すべてのテクニックをリストで表示", pt: "Ver todas as técnicas em lista", ro: "Vezi toate tehnicile ca listă" },
    graphLabel:    { en: "Interactive diagram of Brazilian Jiu-Jitsu techniques and the transitions between them. A full text list follows below the diagram.", fr: "Diagramme interactif des techniques de Jiu-Jitsu Brésilien et des transitions entre elles. Une liste textuelle complète suit sous le diagramme.", ja: "ブラジリアン柔術の技術とその遷移を示すインタラクティブな図。図の下に完全なテキストリストがあります。", pt: "Diagrama interativo de técnicas de Jiu-Jitsu Brasileiro e as transições entre elas. Uma lista completa em texto segue abaixo do diagrama.", ro: "Diagramă interactivă a tehnicilor de Jiu-Jitsu Brazilian și tranzițiile dintre ele. O listă completă în text urmează sub diagramă." },
  },

  // ── Strength & conditioning additions ──────────────────────────────────
  sc: {
    print:      { en: "Print / save as PDF", fr: "Imprimer / enregistrer en PDF", ja: "印刷・PDF保存", pt: "Imprimir / salvar em PDF", ro: "Printează / salvează PDF" },
    restored:   { en: "Showing the program you built last time.", fr: "Affichage du programme créé la dernière fois.", ja: "前回作成したプログラムを表示しています。", pt: "Mostrando o programa que você montou da última vez.", ro: "Se afișează programul creat data trecută." },
  },

  // ── Footer ─────────────────────────────────────────────────────────────
  footer: {
    tagline:   { en: "Singapore BJJ brand built around one idea: building a community that trains hard, talks openly, and submits to nothing except growth.", fr: "Marque de BJJ singapourienne bâtie sur une idée : créer une communauté qui s'entraîne dur, parle ouvertement et ne se soumet à rien d'autre qu'à sa propre progression.", ja: "シンガポール発のBJJブランド。ハードに練習し、率直に語り合い、成長以外の何ものにも屈しないコミュニティをつくる — その一つの信念から生まれました。", pt: "Marca de BJJ de Singapura construída sobre uma ideia: criar uma comunidade que treina forte, fala abertamente e não se submete a nada além do próprio crescimento.", ro: "Brand de BJJ din Singapore construit pe o idee: o comunitate care se antrenează serios, vorbește deschis și nu se supune nimănui în afară de propria creștere." },
    explore:   { en: "Explore", fr: "Explorer", ja: "探索", pt: "Explorar", ro: "Explorează" },
    brandCol:  { en: "Brand", fr: "La Marque", ja: "ブランド", pt: "A Marca", ro: "Brandul" },
    signupTitle: { en: "Hear when the first collection drops", fr: "Soyez averti de la première collection", ja: "最初のコレクション発売のお知らせ", pt: "Saiba quando a primeira coleção sair", ro: "Află când apare prima colecție" },
    signupBody:  { en: "One email at launch. Nothing else.", fr: "Un seul e-mail au lancement. Rien d'autre.", ja: "発売時にメール1通のみ。それ以外は送りません。", pt: "Um e-mail no lançamento. Nada mais.", ro: "Un singur e-mail la lansare. Nimic altceva." },
    emailPlaceholder: { en: "you@example.com", fr: "vous@exemple.com", ja: "you@example.com", pt: "voce@exemplo.com", ro: "tu@exemplu.com" },
    signupBtn: { en: "Notify me", fr: "Me prévenir", ja: "通知を受け取る", pt: "Avise-me", ro: "Anunță-mă" },
    signupDone:{ en: "Saved on this device. We'll wire this to a real list before launch.", fr: "Enregistré sur cet appareil. Nous le connecterons à une vraie liste avant le lancement.", ja: "この端末に保存しました。発売前に実際のリストへ接続します。", pt: "Salvo neste dispositivo. Vamos conectar a uma lista real antes do lançamento.", ro: "Salvat pe acest dispozitiv. Îl vom conecta la o listă reală înainte de lansare." },
    rights:    { en: "SubmitologY · Singapore", fr: "SubmitologY · Singapour", ja: "SubmitologY · シンガポール", pt: "SubmitologY · Singapura", ro: "SubmitologY · Singapore" },
    preLaunch: { en: "Pre-launch site — nothing is for sale yet.", fr: "Site de pré-lancement — rien n'est encore en vente.", ja: "プレローンチサイト — 現在販売はしていません。", pt: "Site de pré-lançamento — nada está à venda ainda.", ro: "Site pre-lansare — nimic nu este încă de vânzare." },
  },

  // ── Error / empty states ───────────────────────────────────────────────
  notFound: {
    title: { en: "That page got swept", fr: "Cette page a été renversée", ja: "そのページは見つかりません", pt: "Essa página foi raspada", ro: "Pagina asta a fost răsturnată" },
    body:  { en: "The address you followed doesn't exist. Everything on the site is reachable from the menu or the home page.", fr: "L'adresse suivie n'existe pas. Tout le site est accessible depuis le menu ou la page d'accueil.", ja: "指定されたアドレスは存在しません。すべてのコンテンツはメニューまたはホームからアクセスできます。", pt: "O endereço que você seguiu não existe. Tudo no site é acessível pelo menu ou pela página inicial.", ro: "Adresa accesată nu există. Tot conținutul este accesibil din meniu sau de pe pagina principală." },
    back:  { en: "Go to the home page", fr: "Aller à l'accueil", ja: "ホームへ戻る", pt: "Ir para o início", ro: "Mergi la pagina principală" },
  },
  crash: {
    title:  { en: "Something broke on this page", fr: "Un problème est survenu sur cette page", ja: "このページでエラーが発生しました", pt: "Algo quebrou nesta página", ro: "Ceva s-a stricat pe această pagină" },
    body:   { en: "Reloading usually clears it. If it keeps happening, the rest of the site still works from the menu.", fr: "Recharger règle généralement le problème. Si cela persiste, le reste du site reste accessible depuis le menu.", ja: "再読み込みで解消することがほとんどです。続く場合も、メニューから他のページはご利用いただけます。", pt: "Recarregar geralmente resolve. Se continuar, o resto do site ainda funciona pelo menu.", ro: "Reîncărcarea rezolvă de obicei. Dacă persistă, restul site-ului funcționează din meniu." },
    reload: { en: "Reload the page", fr: "Recharger la page", ja: "ページを再読み込み", pt: "Recarregar a página", ro: "Reîncarcă pagina" },
  },
};
