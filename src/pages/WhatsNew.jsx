import { T, t } from "../i18n";

/** Release notes. Newest first; `date` is ISO so it sorts and localises
 *  predictably. The header dot lights up while the newest entry is unread. */
export const RELEASES = [
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
