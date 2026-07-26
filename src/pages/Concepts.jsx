import { T, t } from "../i18n";

export default function Concepts({ lang }) {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t(T.concepts.pageTitle, lang)}</h1>
        <p className="page-sub">{t(T.concepts.pageSubtitle, lang)}</p>
      </div>
      <div className="grid-cards">
        {T.conceptItems.map((c) => (
          <article className="card" key={c.title.en}>
            <div className="concept__icon" aria-hidden="true">{c.icon}</div>
            <h2 className="concept__title">{t(c.title, lang)}</h2>
            <p className="concept__body">{t(c.body, lang)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
