import { T, t } from "../i18n";
import { MERCH_PRODUCTS } from "../data/merch";

export default function Shop({ lang }) {
  return (
    <div>
      <div className="page-header">
        <div className="eyebrow eyebrow--accent">{t(T.merch.pageTag, lang)}</div>
        <h1 className="page-title">{t(T.merch.pageTitle, lang)}</h1>
        <p className="page-sub">{t(T.merch.pageSubtitle, lang)}</p>
      </div>

      <div className="merch-grid">
        {MERCH_PRODUCTS.map((p) => (
          <article className="card merch" key={p.id}>
            <div className="merch__top">
              <span className="merch__icon" aria-hidden="true">{p.icon}</span>
              <span className="merch__soon">{t(T.merch.comingSoon, lang)}</span>
            </div>
            <h2 className="merch__name">{p.name}</h2>
            <p className="merch__spec">
              <span className="merch__spec-lbl">{t(T.merch.specLbl, lang)}</span>{p.spec}
            </p>
            <div className="merch__price-row">
              <span className="merch__spec-lbl">{t(T.merch.priceLbl, lang)}</span>
              <span className="merch__price">{p.price} SGD</span>
            </div>
          </article>
        ))}
      </div>

      <div className="note">
        <span className="dot" aria-hidden="true" />
        <span>{t(T.merch.notify, lang)}</span>
      </div>

      <h2 className="section-title">{t(T.merch.pillarsTitle, lang)}</h2>
      <div className="grid-cards">
        {T.merch.pillars.map((p, i) => (
          <article className="card" key={i}>
            <h3 className="concept__title">{t(p.title, lang)}</h3>
            <p className="concept__body">{t(p.body, lang)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
