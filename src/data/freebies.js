// ─── data/freebies.js — everything the Freebies page shows ──────────────────
// Free downloads, grouped the way the page groups them. Added 2026-10-07 with
// two files: the kids' Mat Passport and the three-page Mat Rules poster.
//
// Adding another freebie is one entry in the right section plus its files in
// public/freebies/ — Freebies.jsx does not change, the same property the shop
// data files keep. A new section is a new key in SECTIONS and two strings in
// i18n-additions.js (freebiesPage.<key>Title / <key>Lead).
//
// `bytes` is the size of the file in public/freebies/. It is stated on the
// page ("77 KB") so a visitor on a slow connection knows what they are
// asking for, which makes it a claim that goes stale the moment a file is
// replaced; freebies.test.js compares it with the real file.
//
// The files themselves are in English. The page around them is translated,
// and says so ("In English") rather than letting a visitor discover it after
// the download. Titles stay English for the same reason: they are the names
// printed on the files.
//
// Honesty notes that belong with the data:
//   • Nothing here is sold, and the page asks for nothing in return — no
//     sign-up, no email. The files are plain links to this site's own
//     public/ folder, so the privacy policy is unchanged.
//   • The rules poster summarises a rulebook this brand does not publish and
//     is not affiliated with. Its `note` says so, in every language, beside
//     the download — the poster says it too, but a visitor should not have to
//     open the file to learn it.

const BASE = `${process.env.PUBLIC_URL}/freebies/`;

/** Order of the sections on the page. */
export const SECTIONS = ["kids", "everyone"];

export const FREEBIES = [
  {
    id: "mat-passport-kids",
    section: "kids",
    name: "Mat Passport — Kids Edition",
    file: "submitology-mat-passport-kids.pdf",
    bytes: 77395,
    pages: 12,
    paper: "A5",
    cta: { en: "Download the passport", fr: "Télécharger le passeport", ja: "パスポートをダウンロード", pt: "Baixar o passaporte", ro: "Descarcă pașaportul" },
    blurb: {
      en: "A passport for young students. After each class a coach adds a stamp, a sticker or a signature. Four characters — Octo, Shelly, Sid and Koi — walk a child through 48 classes.",
      fr: "Un passeport pour les jeunes élèves. Après chaque cours, un coach ajoute un tampon, un autocollant ou une signature. Quatre personnages — Octo, Shelly, Sid et Koi — accompagnent l'enfant sur 48 cours.",
      ja: "小さな生徒のためのパスポートです。クラスのあと、コーチがスタンプやシール、またはサインを入れてくれます。Octo、Shelly、Sid、Koiの4人のキャラクターが、48回のクラスを一緒にたどります。",
      pt: "Um passaporte para jovens alunos. Depois de cada aula, o professor coloca um carimbo, um adesivo ou uma assinatura. Quatro personagens — Octo, Shelly, Sid e Koi — acompanham a criança por 48 aulas.",
      ro: "Un pașaport pentru micii elevi. După fiecare curs, antrenorul adaugă o ștampilă, un autocolant sau o semnătură. Patru personaje — Octo, Shelly, Sid și Koi — îl însoțesc pe copil prin 48 de cursuri.",
    },
    // Inside the file, in the order it is laid out.
    inside: [
      { en: "The Mat Code: five things every kid on the mat does", fr: "Le Code du tatami : cinq choses que chaque enfant fait sur le tatami", ja: "マットの約束：マットに立つ子ども全員が守る5つのこと", pt: "O Código do Tatame: cinco coisas que toda criança faz no tatame", ro: "Codul saltelei: cinci lucruri pe care le face fiecare copil pe saltea" },
      { en: "The story of kintsugi, with a broken bowl to mend with a gold pen", fr: "L'histoire du kintsugi, avec un bol cassé à réparer au stylo doré", ja: "金継ぎの物語。金色のペンで直す、割れたお椀つき", pt: "A história do kintsugi, com uma tigela quebrada para consertar com caneta dourada", ro: "Povestea kintsugi, cu un bol spart de reparat cu un pix auriu" },
      { en: "Forty-eight stamp spaces, with a gold one at the end of every twelve", fr: "Quarante-huit cases de tampon, dont une dorée à la fin de chaque série de douze", ja: "48個のスタンプ欄。12回ごとの最後は金色の欄です", pt: "Quarenta e oito espaços para carimbos, com um dourado ao fim de cada doze", ro: "Patruzeci și opt de locuri pentru ștampile, unul auriu la sfârșitul fiecărei serii de douăsprezece" },
      { en: "Eight badges, a belt journey from white to green, and a notebook page to fill in after class", fr: "Huit badges, un parcours de ceinture du blanc au vert, et une page de carnet à remplir après le cours", ja: "8つのバッジ、白から緑までの帯の道のり、クラスのあとに書き込むノートのページ", pt: "Oito distintivos, uma jornada de faixas do branco ao verde e uma página de caderno para preencher depois da aula", ro: "Opt insigne, un drum al centurilor de la alb la verde și o pagină de caiet de completat după curs" },
      { en: "A coach's corner on the last page, with room for the academy stamp", fr: "Un coin du coach sur la dernière page, avec la place du tampon de l'académie", ja: "最後のページにコーチのコーナーがあり、道場のスタンプを押す場所があります", pt: "Um canto do professor na última página, com espaço para o carimbo da academia", ro: "Un colț al antrenorului pe ultima pagină, cu loc pentru ștampila academiei" },
    ],
    note: {
      en: "Belt colours and stripes differ between academies, so the passport tells children to go by what their coach says.",
      fr: "Les couleurs de ceinture et les barrettes varient d'une académie à l'autre : le passeport demande donc aux enfants de se fier à ce que dit leur coach.",
      ja: "帯の色やストライプは道場によって異なります。そのため、パスポートには、コーチの言うことに従うよう書かれています。",
      pt: "As cores das faixas e as listras variam de academia para academia, por isso o passaporte diz às crianças que sigam o que o professor disser.",
      ro: "Culorile centurilor și liniile diferă de la o academie la alta, așa că pașaportul le spune copiilor să țină cont de ce spune antrenorul lor.",
    },
    previews: [
      { src: BASE + "passport-cover.jpg", w: 525, h: 745,
        alt: { en: "Cover of the Mat Passport, Kids Edition: an octopus with a headband, a turtle, a koi and a crab", fr: "Couverture du Mat Passport, édition enfants : une pieuvre avec un bandeau, une tortue, une carpe koï et un crabe", ja: "Mat Passport キッズ版の表紙。ハチマキをしたタコ、カメ、鯉、カニ", pt: "Capa do Mat Passport, edição infantil: um polvo com faixa na cabeça, uma tartaruga, uma carpa koi e um caranguejo", ro: "Coperta Mat Passport, ediția pentru copii: o caracatiță cu bentiță, o broască țestoasă, un crap koi și un crab" } },
      { src: BASE + "passport-mat-code.jpg", w: 525, h: 745,
        alt: { en: "The Mat Code page: five things every kid on the mat does", fr: "La page Code du tatami : cinq choses que chaque enfant fait sur le tatami", ja: "「マットの約束」のページ：子ども全員が守る5つのこと", pt: "A página O Código do Tatame: cinco coisas que toda criança faz no tatame", ro: "Pagina Codul saltelei: cinci lucruri pe care le face fiecare copil pe saltea" } },
      { src: BASE + "passport-stamps.jpg", w: 525, h: 745,
        alt: { en: "A stamp page with twelve numbered spaces, one for each class", fr: "Une page de tampons avec douze cases numérotées, une par cours", ja: "1から12までの番号がついたスタンプのページ。1回のクラスにつき1つ", pt: "Uma página de carimbos com doze espaços numerados, um para cada aula", ro: "O pagină de ștampile cu douăsprezece locuri numerotate, câte unul pentru fiecare curs" } },
    ],
  },

  {
    id: "mat-rules-poster",
    section: "everyone",
    name: "Mat Rules Poster",
    file: "submitology-mat-rules-poster.pdf",
    bytes: 696370,
    pages: 3,
    paper: "A4",
    cta: { en: "Download the posters", fr: "Télécharger les affiches", ja: "ポスターをダウンロード", pt: "Baixar os pôsteres", ro: "Descarcă posterele" },
    blurb: {
      en: "Three A4 posters for a gym wall, a changing room or a bedroom. Free for individuals and academies to print and share.",
      fr: "Trois affiches A4 pour le mur d'une salle, un vestiaire ou une chambre. Particuliers et académies peuvent les imprimer et les partager librement.",
      ja: "ジムの壁、更衣室、自分の部屋に貼れるA4ポスター3枚。個人も道場も、自由に印刷して共有できます。",
      pt: "Três pôsteres A4 para a parede da academia, o vestiário ou o quarto. Pessoas e academias podem imprimir e compartilhar livremente.",
      ro: "Trei postere A4 pentru peretele unei săli, un vestiar sau o cameră. Persoanele și academiile le pot tipări și distribui liber.",
    },
    // One line per page, in page order. The page names are the English titles
    // printed on the posters, so only the description after them is translated
    // — which is why these entries are { name, text } where the passport's are
    // plain five-language strings. Freebies.jsx accepts either.
    inside: [
      { name: "Respect the Mat",
        text: { en: "six habits for stepping on, training and stepping off the mat", fr: "six habitudes pour monter sur le tatami, s'y entraîner et en descendre", ja: "マットに上がり、練習し、降りるまでの6つの習慣", pt: "seis hábitos para entrar no tatame, treinar e sair dele", ro: "șase obiceiuri pentru a urca pe saltea, a te antrena și a coborî" } },
      { name: "Tap Early, Tap Often",
        text: { en: "four ways to tap, and what to do when you are caught or your partner taps", fr: "quatre façons de taper, et quoi faire quand on est pris ou quand le partenaire tape", ja: "タップの4つの方法と、極められたとき、相手がタップしたときにすること", pt: "quatro formas de bater, e o que fazer quando você é pego ou seu parceiro bate", ro: "patru moduri de a bate, și ce faci când ești prins sau când partenerul bate" } },
      { name: "Know the Rules",
        text: { en: "match times by age and belt, which techniques are legal at which belt, and how points are scored", fr: "durée des combats selon l'âge et la ceinture, techniques autorisées selon la ceinture, et attribution des points", ja: "年齢と帯ごとの試合時間、帯ごとに許される技、ポイントの付き方", pt: "tempo de luta por idade e faixa, quais técnicas são permitidas em cada faixa e como os pontos são marcados", ro: "durata meciurilor în funcție de vârstă și centură, ce tehnici sunt permise la fiecare centură și cum se acordă punctele" } },
    ],
    note: {
      en: "Know the Rules is a summary for training, based on the IBJJF Rules Book v6.1 (June 2024). SubmitologY is not affiliated with or endorsed by the IBJJF, and rules change between seasons: check the current rulebook at ibjjf.com before you compete.",
      fr: "Know the Rules est un résumé pour l'entraînement, fondé sur le livre de règles de l'IBJJF v6.1 (juin 2024). SubmitologY n'est ni affilié à l'IBJJF ni approuvé par elle, et les règles changent d'une saison à l'autre : consultez le règlement en vigueur sur ibjjf.com avant de participer à une compétition.",
      ja: "「Know the Rules」は、IBJJFルールブック v6.1（2024年6月）をもとにした練習用の要約です。SubmitologYはIBJJFとは提携しておらず、公認も受けていません。ルールはシーズンごとに変わります。大会に出る前に、ibjjf.comで最新のルールブックを確認してください。",
      pt: "Know the Rules é um resumo para treino, baseado no Livro de Regras da IBJJF v6.1 (junho de 2024). A SubmitologY não é afiliada à IBJJF nem endossada por ela, e as regras mudam entre temporadas: consulte o livro de regras atual em ibjjf.com antes de competir.",
      ro: "Know the Rules este un rezumat pentru antrenament, bazat pe Regulamentul IBJJF v6.1 (iunie 2024). SubmitologY nu este afiliată cu IBJJF și nu este susținută de aceasta, iar regulile se schimbă de la un sezon la altul: verifică regulamentul în vigoare pe ibjjf.com înainte să concurezi.",
    },
    previews: [
      { src: BASE + "poster-page-1.jpg", w: 560, h: 792,
        alt: { en: "Respect the Mat poster: cream type on black, with six numbered habits", fr: "Affiche Respect the Mat : texte crème sur fond noir, avec six habitudes numérotées", ja: "「Respect the Mat」ポスター：黒地にクリーム色の文字、番号つきの6つの習慣", pt: "Pôster Respect the Mat: texto creme sobre fundo preto, com seis hábitos numerados", ro: "Poster Respect the Mat: text crem pe fond negru, cu șase obiceiuri numerotate" } },
      { src: BASE + "poster-page-2.jpg", w: 560, h: 792,
        alt: { en: "Tap Early, Tap Often poster: four ways to tap, with advice for both partners", fr: "Affiche Tap Early, Tap Often : quatre façons de taper, avec des conseils pour les deux partenaires", ja: "「Tap Early, Tap Often」ポスター：タップの4つの方法と、両方のパートナーへのアドバイス", pt: "Pôster Tap Early, Tap Often: quatro formas de bater, com conselhos para os dois parceiros", ro: "Poster Tap Early, Tap Often: patru moduri de a bate, cu sfaturi pentru ambii parteneri" } },
      { src: BASE + "poster-page-3.jpg", w: 560, h: 792,
        alt: { en: "Know the Rules poster: tables of match times and legal techniques, and the points for each position", fr: "Affiche Know the Rules : tableaux des durées de combat et des techniques autorisées, et points de chaque position", ja: "「Know the Rules」ポスター：試合時間と許される技の表、各ポジションのポイント", pt: "Pôster Know the Rules: tabelas de tempo de luta e técnicas permitidas, e pontos de cada posição", ro: "Poster Know the Rules: tabele cu durata meciurilor și tehnicile permise, și punctele pentru fiecare poziție" } },
    ],
  },
];

export const freebieHref = (f) => BASE + f.file;
