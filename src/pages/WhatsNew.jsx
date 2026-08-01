import { T, t } from "../i18n";

/** Release notes. Newest first; `date` is ISO so it sorts and localises
 *  predictably. The header dot lights up while the newest entry is unread. */
export const RELEASES = [
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
