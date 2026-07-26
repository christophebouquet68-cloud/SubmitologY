import { T, t } from "../i18n";

export default function Mission({ lang }) {
  return (
    <div>
      <div className="page-header">
        <div className="eyebrow eyebrow--mission">{t(T.mh.pageTag, lang)}</div>
        <h1 className="page-title">{t(T.mh.pageTitle, lang)}</h1>
        <div className="note">
          <span className="dot" aria-hidden="true" />
          <span>{t(T.mh.planNote, lang)}</span>
        </div>
      </div>

      <div className="card" style={{ maxWidth: "48rem", borderColor: "var(--mission-edge)" }}>
        <p className="prose">{t(T.mh.lead, lang)}</p>
        <p className="prose">{t(T.mh.lead2, lang)}</p>
      </div>

      <div className="pledge" style={{ marginTop: "1.375rem" }}>
        <span className="pledge__num">1%</span>
        <div>
          <h2 className="pledge__title">{t(T.mh.donationTitle, lang)}</h2>
          <p className="pledge__body">{t(T.mh.donationBody, lang)}</p>
        </div>
      </div>

      <h2 className="section-title">{t(T.mh.pillarsTitle, lang)}</h2>
      <div className="grid-cards">
        {T.mh.pillars.map((p, i) => (
          <article className="card" key={i} style={{ borderColor: "rgba(168,151,240,0.18)" }}>
            <div className="concept__icon" aria-hidden="true">{p.icon}</div>
            <h3 className="concept__title">{t(p.title, lang)}</h3>
            <p className="concept__body">{t(p.body, lang)}</p>
          </article>
        ))}
      </div>

      <h2 className="section-title">{t(T.mh.designTitle, lang)}</h2>
      <div className="card" style={{ maxWidth: "48rem" }}>
        <p className="prose">{t(T.mh.designBody, lang)}</p>
      </div>

      <p className="disclaimer">{t(T.mh.supportNote, lang)}</p>
    </div>
  );
}
