import { T, t } from "../i18n";

/** Release notes. Newest first; `date` is ISO so it sorts and localises
 *  predictably. The header dot lights up while the newest entry is unread. */
export const RELEASES = [
  {
    date: "2026-08-16",
    title: { en: "Clearer exercise diagrams, and the belt as a progress mark", fr: "Des schémas d'exercices plus clairs, et la ceinture comme repère de progression", ja: "より分かりやすい動作図と、進捗を示す帯", pt: "Diagramas de exercício mais claros e a faixa como marca de progresso", ro: "Diagrame de exerciții mai clare și centura ca semn de progres" },
    items: [
      { en: "Every exercise diagram has been redrawn: the figure now has a body rather than a wire outline, and the start position stays on screen behind the end position with an arrow showing the direction of travel", fr: "Tous les schémas d'exercices ont été redessinés : la silhouette a désormais un corps plutôt qu'un contour filaire, et la position de départ reste visible derrière la position finale, avec une flèche indiquant le sens du mouvement", ja: "動作図をすべて描き直しました。人物は線画ではなく身体を持つ形になり、開始姿勢が終了姿勢の背後に残り、動く方向を矢印で示します", pt: "Todos os diagramas de exercício foram redesenhados: a figura agora tem um corpo em vez de um contorno de arame, e a posição inicial permanece atrás da posição final, com uma seta indicando a direção do movimento", ro: "Toate diagramele de exerciții au fost redesenate: silueta are acum un corp, nu un contur filiform, iar poziția de start rămâne în spatele celei finale, cu o săgeată care arată direcția mișcării" },
      { en: "Exercises done on the floor are now drawn on a mat, with a contact shadow, so the figure stands on something", fr: "Les exercices au sol sont désormais dessinés sur un tapis, avec une ombre de contact, pour que la silhouette repose sur quelque chose", ja: "床で行う種目はマットの上に描かれ、接地部分に影が付きました。人物が何かの上に立っているように見えます", pt: "Os exercícios feitos no chão agora são desenhados sobre um tatame, com sombra de contato, para que a figura se apoie em algo", ro: "Exercițiile la sol sunt acum desenate pe o saltea, cu umbră de contact, ca silueta să stea pe ceva" },
      { en: "The level you pick in the programme builder is shown as a belt, and the technique map takes a stripe for each quarter you have drilled", fr: "Le niveau choisi dans le générateur de programme s'affiche sous forme de ceinture, et la carte des techniques gagne un degré par quart travaillé", ja: "プログラムビルダーで選んだレベルを帯で表示します。テクニックマップは、練習済みが4分の1進むごとに線が1本増えます", pt: "O nível escolhido no gerador de programa aparece como uma faixa, e o mapa de técnicas ganha um grau a cada quarto que você treinou", ro: "Nivelul ales în generatorul de program este arătat ca o centură, iar harta tehnicilor primește un grad pentru fiecare sfert exersat" },
      { en: "New textures across the site: a woven ground behind every page, and a cotton weave on the light sections", fr: "De nouvelles textures sur tout le site : un fond tissé derrière chaque page, et une trame de coton sur les sections claires", ja: "サイト全体に新しい質感を加えました。各ページの背景に織り目、明るいセクションには綿の織り地を敷いています", pt: "Novas texturas em todo o site: um fundo trançado atrás de cada página e uma trama de algodão nas seções claras", ro: "Texturi noi în tot site-ul: un fundal țesut în spatele fiecărei pagini și o tramă de bumbac pe secțiunile deschise" },
      { en: "The mission page has been rewritten around what the brand can state today, and the planned 1% donation has been removed from the site", fr: "La page Mission a été réécrite autour de ce que la marque peut affirmer aujourd'hui, et le don de 1% prévu a été retiré du site", ja: "「使命」のページを、現時点で確かに言えることを中心に書き直しました。予定していた1%の寄付についての記載はサイトから削除しました", pt: "A página da missão foi reescrita em torno do que a marca pode afirmar hoje, e a doação planejada de 1% foi removida do site", ro: "Pagina de misiune a fost rescrisă în jurul a ceea ce brandul poate afirma astăzi, iar donația planificată de 1% a fost eliminată din site" },
    ],
  },
  {
    date: "2026-08-12",
    title: { en: "A bigger map, and exercises that show you what to do", fr: "Une carte plus grande, et des exercices qui montrent quoi faire", ja: "より大きなマップと、動作を示すエクササイズ", pt: "Um mapa maior e exercícios que mostram o que fazer", ro: "O hartă mai mare și exerciții care îți arată ce ai de făcut" },
    items: [
      { en: "The technique map has grown from 34 techniques to 60 — spider and lasso guard, single leg X, deep half, the crucifix, D'Arce and anaconda chokes, kneebars, toe holds and more", fr: "La carte des techniques passe de 34 à 60 techniques — gardes spider et lasso, single leg X, demi-garde profonde, crucifix, étranglements D'Arce et anaconda, kneebars, toe holds et bien d'autres", ja: "テクニックマップを34から60の技術に拡張しました — スパイダーガード、ラッソーガード、シングルレッグX、ディープハーフ、クルシフィックス、ダースチョーク、アナコンダチョーク、ニーバー、トーホールドなど", pt: "O mapa de técnicas cresceu de 34 para 60 técnicas — guardas spider e lasso, single leg X, meia-guarda profunda, crucifixo, estrangulamentos D'Arce e anaconda, kneebars, toe holds e mais", ro: "Harta tehnicilor a crescut de la 34 la 60 de tehnici — gărzile spider și lasso, single leg X, half guard profund, crucifix, sufocările D'Arce și anaconda, kneebar, toe hold și altele" },
      { en: "Every exercise in the program builder now explains how to perform it, in all five languages", fr: "Chaque exercice du générateur de programme explique désormais comment l'exécuter, dans les cinq langues", ja: "プログラムビルダーのすべてのエクササイズに、5言語すべてで実施方法の解説を追加しました", pt: "Cada exercício do gerador de programa agora explica como executá-lo, nos cinco idiomas", ro: "Fiecare exercițiu din generatorul de program explică acum cum se execută, în toate cele cinci limbi" },
      { en: "Each one comes with a simple diagram of the movement, drawn rather than photographed so it reads the same in every language", fr: "Chacun est accompagné d'un schéma simple du mouvement, dessiné plutôt que photographié pour être lisible dans toutes les langues", ja: "各エクササイズには動作の簡単な図を添えています。写真ではなく図なので、どの言語でも同じように伝わります", pt: "Cada um vem com um diagrama simples do movimento, desenhado em vez de fotografado para ser igual em todos os idiomas", ro: "Fiecare vine cu o diagramă simplă a mișcării, desenată și nu fotografiată, ca să se citească la fel în orice limbă" },
      { en: "A set counter with a rest timer, so you can tick off each set as you go — it clears when you leave the page and nothing is saved", fr: "Un compteur de séries avec minuteur de repos, pour cocher chaque série au fur et à mesure — il s'efface en quittant la page et rien n'est enregistré", ja: "休憩タイマー付きのセットカウンターを追加しました。セットごとに記録できます。ページを離れると消去され、保存は行われません", pt: "Um contador de séries com temporizador de descanso, para marcar cada série conforme avança — ele é apagado ao sair da página e nada é salvo", ro: "Un contor de serii cu cronometru de pauză, ca să bifezi fiecare serie pe măsură ce o faci — se șterge când părăsești pagina și nimic nu este salvat" },
      { en: "The printed program now includes the instructions and diagrams instead of only the exercise names", fr: "Le programme imprimé inclut désormais les consignes et les schémas, et non plus seulement les noms des exercices", ja: "印刷版のプログラムに、種目名だけでなく解説と図も含まれるようになりました", pt: "O programa impresso agora inclui as instruções e os diagramas, não apenas os nomes dos exercícios", ro: "Programul tipărit include acum instrucțiunile și diagramele, nu doar denumirile exercițiilor" },
    ],
  },
  {
    date: "2026-08-01",
    title: { en: "The first t-shirts are on the site", fr: "Les premiers t-shirts sont en ligne", ja: "最初のTシャツを公開しました", pt: "As primeiras camisetas estão no site", ro: "Primele tricouri sunt pe site" },
    items: [
      { en: "Four t-shirt designs, shown front and back, in white, dark blue and jet black", fr: "Quatre designs de t-shirts, vus de face et de dos, en blanc, bleu foncé et noir intense", ja: "4つのTシャツデザインを、前面と背面の両方で、ホワイト・ダークブルー・ジェットブラックの3色で掲載", pt: "Quatro designs de camiseta, mostrados de frente e de costas, em branco, azul-escuro e preto", ro: "Patru modele de tricou, arătate față și spate, în alb, albastru închis și negru intens" },
      { en: "Pick a colour and the whole collection switches, or change one design on its own", fr: "Choisissez un coloris et toute la collection change, ou modifiez un seul design", ja: "色を選ぶとコレクション全体が切り替わります。デザインごとの個別変更も可能です", pt: "Escolha uma cor e toda a coleção muda, ou altere um design individualmente", ro: "Alege o culoare și toată colecția se schimbă, sau schimbă un singur model" },
      { en: "Fabric, price range and expected date stated plainly — the shirts are not for sale yet", fr: "Matière, fourchette de prix et date prévue indiquées clairement — les t-shirts ne sont pas encore en vente", ja: "素材・価格帯・発売予定時期を明記。Tシャツはまだ販売しておりません", pt: "Tecido, faixa de preço e data prevista informados claramente — as camisetas ainda não estão à venda", ro: "Material, interval de preț și dată estimată, spuse clar — tricourile nu sunt încă de vânzare" },
      { en: "The wider gear range moved below the shirts and is marked to be announced", fr: "Le reste de la gamme passe sous les t-shirts et est marqué « à annoncer »", ja: "その他のギアはTシャツの下に移動し、「近日発表」と表示されます", pt: "O restante da linha foi movido para baixo das camisetas e está marcado como a ser anunciado", ro: "Restul gamei a fost mutat sub tricouri și este marcat ca urmând să fie anunțat" },
    ],
  },
  {
    date: "2026-07-26",
    title: { en: "Rebuilt for phones, tablets and desktops", fr: "Reconstruit pour mobiles, tablettes et ordinateurs", ja: "スマートフォン・タブレット・PC向けに再構築", pt: "Reconstruído para celulares, tablets e desktops", ro: "Reconstruit pentru telefoane, tablete și desktop" },
    items: [
      { en: "Real addresses for every section, so Back and bookmarks work", fr: "Une adresse pour chaque section : le bouton Retour et les favoris fonctionnent", ja: "各セクションに固有のURLを付与。戻るボタンとブックマークが機能します", pt: "Endereços reais para cada seção, então Voltar e favoritos funcionam", ro: "Adrese reale pentru fiecare secțiune, deci Înapoi și favoritele funcționează" },
      { en: "Search across every technique and section (⌘K)", fr: "Recherche sur toutes les techniques et sections (⌘K)", ja: "全テクニック・セクションを横断検索（⌘K）", pt: "Busca em todas as técnicas e seções (⌘K)", ro: "Căutare în toate tehnicile și secțiunile (⌘K)" },
      { en: "The technique map now pans, zooms and finds routes between techniques", fr: "La carte se déplace, zoome et trouve des chemins entre techniques", ja: "テクニックマップの移動・拡大縮小と、技術間のルート検索に対応", pt: "O mapa agora move, amplia e encontra caminhos entre técnicas", ro: "Harta se deplasează, mărește și găsește trasee între tehnici" },
      { en: "Mark techniques as drilled and keep the count between visits", fr: "Marquez les techniques travaillées et conservez le compte entre visites", ja: "練習済みの技術を記録し、次回訪問時にも保持", pt: "Marque técnicas como treinadas e mantenha a contagem entre visitas", ro: "Marchează tehnicile exersate și păstrează progresul între vizite" },
    ],
  },
];

export default function WhatsNew({ lang }) {
  return (
    <div>
      <div className="page-header">
        <div className="eyebrow eyebrow--accent">{t(T.whatsNew.pageTag, lang)}</div>
        <h1 className="page-title">{t(T.whatsNew.pageTitle, lang)}</h1>
      </div>

      {RELEASES.map((r) => (
        <article className="card" key={r.date} style={{ maxWidth: "48rem", marginBottom: "0.875rem" }}>
          <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>
            {new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : lang, { dateStyle: "long" }).format(new Date(r.date))}
          </p>
          <h2 className="concept__title" style={{ fontSize: "1.0625rem" }}>{t(r.title, lang)}</h2>
          <ul className="sc-list" style={{ marginTop: "0.75rem" }}>
            {r.items.map((item, i) => (
              <li key={i}>
                <span className="dot" aria-hidden="true" />
                {t(item, lang)}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
