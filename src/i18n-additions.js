// ─── i18n-additions.js — strings added by the 2026-07 revamp ────────────────
// Kept in its own file so the original translated copy in i18n.js stays
// untouched and easy to diff. Merged into `T` at the bottom of i18n.js.

export const UI = {


  // ── Basic Concepts: the four elements ──────────────────────────────────
  // Reworked 2026-08-23. The page used to be six parallel "mental models"
  // presented as equals. They were not equals — four of them were describing
  // one thing from different angles, which is the order jiu-jitsu is actually
  // built in. Numbering these 1–4 is legitimate because the order is real
  // information: you cannot pass legs you have not brought to the ground, and
  // you cannot submit what you have not pinned.
  //
  // Two of the original six survive unchanged, as recommendations rather than
  // structure: Timing Over Force and Tap Early. They are advice about how to
  // train, not steps in a sequence, and flattening them into the ladder would
  // have made the ladder untrue.
  conceptsPage: {
    stepsEyebrow: { en: "The order of operations", fr: "L'ordre des opérations", ja: "手順の順序", pt: "A ordem das operações", ro: "Ordinea operațiilor" },
    stepsTitle:   { en: "The 4 steps sequence", fr: "La séquence en 4 étapes", ja: "4ステップのシークエンス", pt: "A sequência de 4 passos", ro: "Secvența în 4 pași" },
    stepsLead:    { en: "Almost everything in jiu-jitsu is a detail of one of these four, or a way of stopping an opponent completing them. Learn the order and the map stops looking like a list of names.", fr: "Presque tout, au jiu-jitsu, est un détail de l'un de ces quatre points, ou un moyen d'empêcher l'adversaire de les accomplir. Apprenez l'ordre et la carte cesse de ressembler à une liste de noms.", ja: "柔術のほとんどは、この四つのいずれかの細部か、相手にそれをさせないための手段です。順序を覚えれば、マップは技名の一覧には見えなくなります。", pt: "Quase tudo no jiu-jitsu é um detalhe de um destes quatro pontos, ou uma forma de impedir que o adversário os cumpra. Aprenda a ordem e o mapa deixa de parecer uma lista de nomes.", ro: "Aproape tot în jiu-jitsu este un detaliu al unuia dintre aceste patru lucruri, sau o modalitate de a-l împiedica pe adversar să le ducă la capăt. Învață ordinea și harta încetează să mai pară o listă de nume." },
    why:          { en: "Why", fr: "Pourquoi", ja: "理由", pt: "Por quê", ro: "De ce" },
    rulesEyebrow: { en: "Two rules, from the first day", fr: "Deux règles, dès le premier jour", ja: "初日からの二つの約束", pt: "Duas regras, desde o primeiro dia", ro: "Două reguli, din prima zi" },
    rulesTitle:   { en: "How to train the four", fr: "Comment travailler ces quatre points", ja: "四つをどう練習するか", pt: "Como treinar os quatro", ro: "Cum antrenezi cele patru" },
  },

  conceptSteps: [
    {
      title: { en: "Take it to the ground", fr: "Amener le combat au sol", ja: "寝技に持ち込む", pt: "Levar para o chão", ro: "Du lupta la sol" },
      body:  { en: "Close the distance and bring the fight off the feet — a takedown, a throw, or pulling guard.", fr: "Réduire la distance et faire quitter la position debout — un amené au sol, une projection, ou tirer la garde.", ja: "距離を詰め、立ち技から寝技へ移行します。テイクダウン、投げ、あるいはガードを引く形で。", pt: "Fechar a distância e tirar a luta de pé — uma queda, um arremesso, ou puxar para a guarda.", ro: "Reduci distanța și scoți lupta din picioare — un takedown, o aruncare, sau tragi garda." },
      why:   { en: "A standing opponent can step, load their hips and swing. On the ground almost all of that is gone: there is no room to wind up and nowhere to step to, so the same person becomes far less dangerous without becoming any weaker.", fr: "Debout, un adversaire peut se déplacer, charger ses hanches et frapper. Au sol, presque tout cela disparaît : plus d'espace pour armer un coup, nulle part où poser un appui. La même personne devient bien moins dangereuse sans avoir perdu la moindre force.", ja: "立っている相手は、足を運び、腰に力をため、大きく振ることができます。寝た状態ではその大半が失われます。力をためる空間も、踏み出す先もありません。相手は弱くなったわけではないのに、はるかに危険でなくなります。", pt: "Em pé, um adversário pode dar passos, carregar o quadril e girar com força. No chão quase tudo isso desaparece: não há espaço para armar nem para onde pisar. A mesma pessoa fica muito menos perigosa sem ficar nem um pouco mais fraca.", ro: "În picioare, un adversar poate păși, își poate încărca șoldurile și poate lovi din elan. La sol aproape tot ce ține de asta dispare: nu are spațiu să se încarce și nu are unde să pășească. Aceeași persoană devine mult mai puțin periculoasă fără să fi devenit mai slabă." },
    },
    {
      title: { en: "Pass the legs", fr: "Passer les jambes", ja: "脚を越える", pt: "Passar as pernas", ro: "Treci de picioare" },
      body:  { en: "Get past the guard, so that the legs are no longer between you and their upper body.", fr: "Franchir la garde, pour que les jambes ne soient plus entre vous et le haut de son corps.", ja: "ガードを突破し、脚が自分と相手の上半身のあいだから外れた状態をつくります。", pt: "Ultrapassar a guarda, de modo que as pernas deixem de estar entre você e o tronco dele.", ro: "Treci de gardă, astfel încât picioarele să nu mai fie între tine și trunchiul lui." },
      why:   { en: "The legs are the longest and strongest limbs they have, and while they are in the way they do three jobs at once: they hold distance, they threaten sweeps and leg attacks of their own, and they make control impossible. Nothing after this step is available until they are dealt with.", fr: "Les jambes sont les membres les plus longs et les plus puissants dont il dispose, et tant qu'elles sont là, elles font trois choses à la fois : elles maintiennent la distance, elles menacent renversements et attaques de jambes, et elles rendent tout contrôle impossible. Rien de ce qui suit n'est possible avant de les avoir réglées.", ja: "脚は相手の最も長く強い部位であり、あいだにある限り三つの働きを同時に果たします。距離を保ち、スイープや脚関節の脅威となり、コントロールを不可能にします。この段階を越えるまで、その先の手はどれも成立しません。", pt: "As pernas são os membros mais longos e fortes que ele tem, e enquanto estiverem no caminho fazem três coisas ao mesmo tempo: mantêm distância, ameaçam raspagens e ataques de perna, e tornam o controle impossível. Nada depois deste passo fica disponível antes de resolvê-las.", ro: "Picioarele sunt cele mai lungi și mai puternice membre pe care le are, iar cât timp stau în cale fac trei lucruri deodată: țin distanța, amenință cu răsturnări și atacuri la picioare, și fac controlul imposibil. Nimic din ce urmează nu este disponibil până nu le rezolvi." },
    },
    {
      title: { en: "Pin, then climb", fr: "Immobiliser, puis progresser", ja: "抑え込み、そして上へ", pt: "Prender, depois subir", ro: "Imobilizează, apoi urcă" },
      body:  { en: "Hold them still, then improve: side control, knee-on-belly, and upward. The top of the ladder is the mount or the back.", fr: "Le maintenir immobile, puis progresser : contrôle latéral, genou sur le ventre, et plus haut. Le sommet de l'échelle, c'est la montée ou le dos.", ja: "まず相手を止め、そこから位置を上げます。サイドコントロール、ニーオンベリー、さらに上へ。階段の頂点はマウントかバックです。", pt: "Mantê-lo imóvel e então melhorar: cem-quilos, joelho na barriga, e acima. O topo da escada é a montada ou as costas.", ro: "Îl ții pe loc, apoi îmbunătățești: control lateral, genunchi pe burtă, și mai sus. Vârful scării este montarea sau spatele." },
      why:   { en: "Positions are not equal, and the difference between them is how much of their movement you own. Control is what turns a submission from something you catch into something you choose — and the top two positions are the ones where they can offer the least in return.", fr: "Les positions ne se valent pas, et ce qui les distingue, c'est la part de ses mouvements que vous contrôlez. Le contrôle est ce qui transforme une soumission trouvée par hasard en une soumission choisie — et les deux positions les plus hautes sont celles où il peut le moins vous répondre.", ja: "ポジションは対等ではなく、その差は相手の動きをどれだけ握っているかで決まります。コントロールこそが、たまたま極まった技を、選んで極める技に変えます。上位二つのポジションは、相手が返せるものが最も少ない場所です。", pt: "As posições não são iguais, e o que as diferencia é quanto do movimento dele você domina. O controle é o que transforma uma finalização de algo que você pega em algo que você escolhe — e as duas posições do topo são aquelas em que ele tem menos a oferecer de volta.", ro: "Pozițiile nu sunt egale, iar diferența dintre ele este cât din mișcarea lui controlezi. Controlul transformă o submisie din ceva ce prinzi în ceva ce alegi — iar primele două poziții sunt cele în care el are cel mai puțin de oferit în schimb." },
    },
    {
      title: { en: "Submit", fr: "Soumettre", ja: "極める", pt: "Finalizar", ro: "Finalizează" },
      body:  { en: "Finish with a choke or a joint lock, from a position you already own.", fr: "Conclure par un étranglement ou une clé articulaire, depuis une position déjà acquise.", ja: "すでに支配しているポジションから、絞めか関節技で終わらせます。", pt: "Finalizar com um estrangulamento ou uma chave articular, a partir de uma posição que você já domina.", ro: "Închei cu o sufocare sau o cheie articulară, dintr-o poziție pe care o deții deja." },
      why:   { en: "The submission is the end of the sequence, not the start of it. Hunted early it is a gamble that gives the position back when it fails; arrived at in order it is the only thing left for them to defend.", fr: "La soumission est la fin de la séquence, pas son début. Cherchée trop tôt, c'est un pari qui rend la position quand il échoue ; atteinte dans l'ordre, c'est la seule chose qu'il lui reste à défendre.", ja: "サブミッションは流れの終点であって、出発点ではありません。早く狙えば、失敗した時にポジションを返す賭けになります。順序どおりに辿り着けば、相手に守るものはそれしか残りません。", pt: "A finalização é o fim da sequência, não o começo. Caçada cedo demais é uma aposta que devolve a posição quando falha; alcançada na ordem certa, é a única coisa que resta para ele defender.", ro: "Submisia este finalul secvenței, nu începutul ei. Vânată devreme, e un pariu care îți dă poziția înapoi când eșuează; atinsă în ordine, e singurul lucru care îi mai rămâne de apărat." },
    },
  ],

  // ── Freebies page (added 2026-10-07) ───────────────────────────────────
  // The page chrome. The text of each download lives with it in
  // data/freebies.js, so adding a file does not touch this block.
  freebiesPage: {
    tag:         { en: "Sharing is caring", fr: "Partager, c'est prendre soin", ja: "分かち合いは思いやり", pt: "Compartilhar é cuidar", ro: "A împărți înseamnă a purta de grijă" },
    sub:         { en: "Things we made for the mat and are happy to give away. Download them, print them, pass them on. No sign-up, no email address.", fr: "Des choses que nous avons créées pour le tatami et que nous offrons volontiers. Téléchargez-les, imprimez-les, faites-les circuler. Sans inscription, sans adresse e-mail.", ja: "マットのためにつくったものを、無料でお配りします。ダウンロードして、印刷して、まわりの人にも渡してください。登録もメールアドレスも必要ありません。", pt: "Coisas que fizemos para o tatame e que damos de bom grado. Baixe, imprima, passe adiante. Sem cadastro, sem e-mail.", ro: "Lucruri făcute de noi pentru saltea, pe care le oferim cu drag. Descarcă-le, tipărește-le, dă-le mai departe. Fără înregistrare, fără adresă de e-mail." },
    kidsTitle:     { en: "For kids", fr: "Pour les enfants", ja: "子ども向け", pt: "Para crianças", ro: "Pentru copii" },
    kidsLead:      { en: "For young students on the mat, and for the coaches and parents helping them along.", fr: "Pour les jeunes élèves sur le tatami, et pour les coachs et les parents qui les accompagnent.", ja: "マットに立つ小さな生徒たちと、それを支えるコーチや保護者のために。", pt: "Para os jovens alunos no tatame, e para os professores e pais que os acompanham.", ro: "Pentru micii elevi de pe saltea și pentru antrenorii și părinții care îi însoțesc." },
    everyoneTitle: { en: "For everyone", fr: "Pour tout le monde", ja: "みんなのために", pt: "Para todos", ro: "Pentru toți" },
    everyoneLead:  { en: "For anyone who trains, and for academies that want something for the wall.", fr: "Pour toute personne qui s'entraîne, et pour les académies qui veulent quelque chose à afficher au mur.", ja: "練習するすべての人と、壁に貼れるものを探している道場のために。", pt: "Para quem treina, e para as academias que querem algo para pôr na parede.", ro: "Pentru oricine se antrenează și pentru academiile care vor ceva de pus pe perete." },
    free:        { en: "Free", fr: "Gratuit", ja: "無料", pt: "Grátis", ro: "Gratuit" },
    inEnglish:   { en: "In English", fr: "En anglais", ja: "英語版", pt: "Em inglês", ro: "În engleză" },
    // {n} is replaced with the page count. No plural forms: both files have
    // more than one page, and the languages here have no case that differs
    // between 3 and 12.
    pages:       { en: "{n} pages", fr: "{n} pages", ja: "{n}ページ", pt: "{n} páginas", ro: "{n} pagini" },
    inside:      { en: "What is inside", fr: "Au programme", ja: "内容", pt: "O que tem dentro", ro: "Ce găsești înăuntru" },
    closeTitle:  { en: "Print it, pin it up, pass it on", fr: "Imprimez, affichez, partagez", ja: "印刷して、貼って、まわりに伝えて", pt: "Imprima, pendure, passe adiante", ro: "Tipărește, afișează, dă mai departe" },
    closeBody:   { en: "Using one at your academy? Tell us how it went. We would like to hear.", fr: "Vous en utilisez un dans votre académie ? Dites-nous comment cela s'est passé. Nous serions heureux de le savoir.", ja: "道場で使っていただけましたか？ ご感想をぜひお聞かせください。", pt: "Está usando na sua academia? Conte como foi. Queremos saber.", ro: "Îl folosești la academia ta? Spune-ne cum a mers. Ne-ar plăcea să aflăm." },
  },

  // ── Navigation groups (the four top-level categories) ──────────────────
  groups: {
    train:   { en: "Train",   fr: "S'entraîner", ja: "練習",     pt: "Treinar",  ro: "Antrenament" },
    shop:    { en: "Shop",    fr: "Boutique",    ja: "ショップ", pt: "Loja",     ro: "Magazin" },
    mission: { en: "Mission", fr: "Mission",     ja: "ミッション", pt: "Missão", ro: "Misiune" },
    // Its own group since 2026-10-03, so it is a link in the header rather
    // than the second item of a dropdown. A group of one renders as a plain
    // link, and this label is that link's text.
    news:    { en: "What's New", fr: "Nouveautés", ja: "更新情報", pt: "Novidades", ro: "Noutăți" },
    // Its own group since 2026-10-07, for the same reason as What's New: it
    // is a single page, so it shows in the header as a plain link.
    freebies: { en: "Freebies", fr: "Cadeaux", ja: "無料配布", pt: "Brindes", ro: "Cadouri" },
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
      desc: { en: "60 techniques and how they connect", fr: "60 techniques et leurs connexions", ja: "60の技術とそのつながり", pt: "60 técnicas e como se conectam", ro: "60 de tehnici și legăturile dintre ele" },
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
      desc: { en: "Why BJJ belongs in the conversation", fr: "Pourquoi le BJJ a sa place dans la conversation", ja: "BJJがこの議論に加わる理由", pt: "Por que o BJJ faz parte dessa conversa", ro: "De ce BJJ face parte din această discuție" },
    },
    story: {
      name: { en: "Our Story", fr: "Notre Histoire", ja: "私たちの物語", pt: "Nossa História", ro: "Povestea Noastră" },
      desc: { en: "What SubmitologY means", fr: "Ce que signifie SubmitologY", ja: "SubmitologYの意味", pt: "O que significa SubmitologY", ro: "Ce înseamnă SubmitologY" },
    },
    whatsNew: {
      name: { en: "What's New", fr: "Nouveautés", ja: "更新情報", pt: "Novidades", ro: "Noutăți" },
      desc: { en: "News from the mats, the range and the site", fr: "Nouvelles du tatami, de la gamme et du site", ja: "マット、ラインナップ、サイトの最新情報", pt: "Notícias do tatame, da linha e do site", ro: "Vești de pe saltea, din gamă și de pe site" },
    },
    freebies: {
      name: { en: "Freebies", fr: "Cadeaux", ja: "無料配布", pt: "Brindes", ro: "Cadouri" },
      desc: { en: "Free to download, print and share", fr: "À télécharger, imprimer et partager, gratuitement", ja: "無料でダウンロード、印刷、共有できます", pt: "Grátis para baixar, imprimir e compartilhar", ro: "Gratuit de descărcat, tipărit și distribuit" },
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
    /* Labels describe the ACTION, not the state — the button already reports
       its state through aria-pressed, and a screen reader announcing
       "Sound on, pressed" is ambiguous about what a click will do. */
    soundOn:       { en: "Turn sound on", fr: "Activer le son", ja: "音を再生する", pt: "Ligar o som", ro: "Pornește sunetul" },
    soundOff:      { en: "Turn sound off", fr: "Couper le son", ja: "音を停止する", pt: "Desligar o som", ro: "Oprește sunetul" },
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
    everythingSub:   { en: "Six areas, eight sections. Each one is also in the menu at the top.", fr: "Six domaines, huit sections. Chacune est aussi dans le menu en haut.", ja: "6つの領域、8つのセクション。すべて上部メニューからもアクセスできます。", pt: "Seis áreas, oito seções. Cada uma também está no menu no topo.", ro: "Șase zone, opt secțiuni. Fiecare se află și în meniul de sus." },
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

    // ── Exercise detail: the cue and the diagram ────────────────────────
    howTo:      { en: "How to do it", fr: "Comment l'exécuter", ja: "動作の解説", pt: "Como executar", ro: "Cum se execută" },
    hideHowTo:  { en: "Hide", fr: "Masquer", ja: "閉じる", pt: "Ocultar", ro: "Ascunde" },
    phaseStart: { en: "Start", fr: "Départ", ja: "開始", pt: "Início", ro: "Start" },
    phaseEnd:   { en: "End", fr: "Fin", ja: "終了", pt: "Fim", ro: "Final" },
    phaseHold:  { en: "Hold", fr: "Maintien", ja: "保持", pt: "Sustentação", ro: "Menținere" },
    figureNote: { en: "The figures are simplified — they show the shape of the movement, not perfect form.", fr: "Les figures sont simplifiées : elles montrent la forme du mouvement, pas une exécution parfaite.", ja: "図は簡略化されています。完璧なフォームではなく、動作の形を示すものです。", pt: "As figuras são simplificadas — mostram o formato do movimento, não a execução perfeita.", ro: "Figurile sunt simplificate — arată forma mișcării, nu execuția perfectă." },

    // ── Set tracker ─────────────────────────────────────────────────────
    setDone:    { en: "Set done", fr: "Série faite", ja: "セット完了", pt: "Série feita", ro: "Serie făcută" },
    roundDone:  { en: "Round done", fr: "Round fait", ja: "ラウンド完了", pt: "Round feito", ro: "Rundă făcută" },
    skipRest:   { en: "Skip rest", fr: "Passer le repos", ja: "休憩をスキップ", pt: "Pular descanso", ro: "Sari peste pauză" },
    resting:    { en: "Rest", fr: "Repos", ja: "休憩", pt: "Descanso", ro: "Pauză" },
    resetSets:  { en: "Reset", fr: "Réinitialiser", ja: "リセット", pt: "Zerar", ro: "Resetează" },
    sets:       { en: "sets", fr: "séries", ja: "セット", pt: "séries", ro: "serii" },
    rounds:     { en: "rounds", fr: "rounds", ja: "ラウンド", pt: "rounds", ro: "runde" },
    allLogged:  { en: "All done", fr: "Terminé", ja: "すべて完了", pt: "Concluído", ro: "Gata" },
    trackerNote:{ en: "Set progress is kept while this page is open and clears when you leave — nothing is saved.", fr: "La progression est conservée tant que cette page est ouverte et s'efface lorsque vous la quittez — rien n'est enregistré.", ja: "セットの進捗はこのページを開いている間だけ保持され、離れると消去されます。保存は行われません。", pt: "O progresso das séries é mantido enquanto esta página estiver aberta e é apagado ao sair — nada é salvo.", ro: "Progresul seriilor este păstrat cât timp pagina este deschisă și se șterge când pleci — nimic nu este salvat." },
  },

  // ── Footer ─────────────────────────────────────────────────────────────
  footer: {
    tagline:   { en: "Singapore BJJ brand built around one idea: building a community that trains hard, talks openly, and submits to nothing except growth.", fr: "Marque de BJJ singapourienne bâtie sur une idée : créer une communauté qui s'entraîne dur, parle ouvertement et ne se soumet à rien d'autre qu'à sa propre progression.", ja: "シンガポール発のBJJブランド。ハードに練習し、率直に語り合い、成長以外の何ものにも屈しないコミュニティをつくる — その一つの信念から生まれました。", pt: "Marca de BJJ de Singapura construída sobre uma ideia: criar uma comunidade que treina forte, fala abertamente e não se submete a nada além do próprio crescimento.", ro: "Brand de BJJ din Singapore construit pe o idee: o comunitate care se antrenează serios, vorbește deschis și nu se supune nimănui în afară de propria creștere." },
    explore:   { en: "Explore", fr: "Explorer", ja: "探索", pt: "Explorar", ro: "Explorează" },
    brandCol:  { en: "Brand", fr: "La Marque", ja: "ブランド", pt: "A Marca", ro: "Brandul" },
    // The footer used to run a launch-notification signup form that posted
    // to a form-to-inbox provider (see git history). It never got connected,
    // so it was replaced with a plain mailto: link — no provider, nothing
    // collected by this site, one real inbox. Keep this copy honest about
    // that: it points people at contacting us, it doesn't promise a list or
    // a launch email.
    contactTitle: { en: "Want to know more?", fr: "Envie d'en savoir plus ?", ja: "もっと知りたい方へ", pt: "Quer saber mais?", ro: "Vrei să afli mai multe?" },
    contactBody:  { en: "Contact us for details on the first collection, or any other request for information.", fr: "Contactez-nous pour des précisions sur la première collection, ou pour toute autre demande d'information.", ja: "最初のコレクションの詳細やその他のご質問は、メールでお問い合わせください。", pt: "Fale conosco para detalhes sobre a primeira coleção, ou qualquer outro pedido de informação.", ro: "Contactează-ne pentru detalii despre prima colecție sau pentru orice altă solicitare de informații." },
    rights:    { en: "SubmitologY · Singapore", fr: "SubmitologY · Singapour", ja: "SubmitologY · シンガポール", pt: "SubmitologY · Singapura", ro: "SubmitologY · Singapore" },
    preLaunch: { en: "Pre-launch site — nothing is for sale yet.", fr: "Site de pré-lancement — rien n'est encore en vente.", ja: "プレローンチサイト — 現在販売はしていません。", pt: "Site de pré-lançamento — nada está à venda ainda.", ro: "Site pre-lansare — nimic nu este încă de vânzare." },
  },

  // ── Technique map ──────────────────────────────────────────────────────
  techmapLang: {
    // Shown once under the map heading, in every language including English.
    // The descriptions are translated but the names are not, and a reader who
    // isn't told that will assume the translation is simply unfinished.
    namesInEnglish: {
      en: "Technique names are kept in English — the language they're called by on the mat almost everywhere.",
      fr: "Les noms des techniques restent en anglais — c'est ainsi qu'on les appelle sur le tatami presque partout. Les descriptions sont traduites.",
      ja: "技の名称は英語のままにしています。世界中の道場で実際にそう呼ばれているためです。説明文は日本語に翻訳されています。",
      pt: "Os nomes das técnicas ficam em inglês — é como são chamadas no tatame em quase todo lugar. As descrições estão traduzidas.",
      ro: "Numele tehnicilor rămân în engleză — așa li se spune pe saltea aproape peste tot. Descrierile sunt traduse.",
    },
  },

  // ── Contact & legal ────────────────────────────────────────────────────
  // Only the labels and the chrome are translated. The documents themselves
  // are English-only, and `englishOnly` says so on the page rather than
  // letting a French reader hit a wall of English without warning.
  legal: {
    contact:     { en: "Contact", fr: "Contact", ja: "お問い合わせ", pt: "Contato", ro: "Contact" },
    privacy:     { en: "Privacy", fr: "Confidentialité", ja: "プライバシー", pt: "Privacidade", ro: "Confidențialitate" },
    terms:       { en: "Terms", fr: "Conditions", ja: "利用規約", pt: "Termos", ro: "Termeni" },
    lastUpdated: { en: "Last updated", fr: "Dernière mise à jour", ja: "最終更新", pt: "Última atualização", ro: "Ultima actualizare" },
    englishOnly: {
      en: "This page is available in English only.",
      fr: "Cette page n'est disponible qu'en anglais.",
      ja: "このページは英語のみでご覧いただけます。",
      pt: "Esta página está disponível apenas em inglês.",
      ro: "Această pagină este disponibilă doar în limba engleză.",
    },
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
