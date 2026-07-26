import { T, t } from "../i18n";
import { DESTINATIONS, ROUTES } from "../router";

// public/ asset, so it must go through PUBLIC_URL to survive the "." homepage
// setting used for static hosting.
const LOGO = `${process.env.PUBLIC_URL}/logo512.png`;

// Groups in reading order for the "everything on the site" index.
const GROUP_ORDER = ["train", "shop", "mission", "about"];

export default function Home({ lang, navigate }) {
  return (
    <div className="home">
      {/* ── Hero ─────────────────────────────────────────────────────────
          Two CTAs, not five. The map is the thing this site has that no
          other BJJ brand page does, so it gets the primary button; the shop
          gets the secondary. Everything else is one scroll or one menu away
          and repeating it here only flattened the hierarchy. */}
      <section className="hero">
        <p className="eyebrow">{t(T.overview.tag, lang)}</p>
        <h1 className="hero__title">
          {t(T.overview.titleLine1, lang)}<br />
          <span className="hero__accent">{t(T.overview.titleLine2, lang)}</span>
        </h1>
        <p className="hero__body">{t(T.overview.body1, lang)}</p>
        <div className="hero__ctas">
          <button className="btn btn--primary" onClick={() => navigate(ROUTES.map)}>
            {t(T.overview.exploreCta, lang)}
          </button>
          <button className="btn btn--ghost" onClick={() => navigate(ROUTES.shop)}>
            {t(T.overview.merchCta, lang)}
          </button>
        </div>
      </section>

      {/* ── Thesis ───────────────────────────────────────────────────────── */}
      <section className="thesis">
        <p className="thesis__text">{t(T.overview.body2, lang)}</p>
        <div className="thesis__mark">
          <img className="thesis__logo" src={LOGO} alt="SubmitologY logo"
               width="88" height="88" />
          <p className="thesis__caption">{t(T.overview.logoCaption, lang)}</p>
        </div>
      </section>

      {/* ── Map feature ──────────────────────────────────────────────────── */}
      <section>
        {/* An anchor rather than a button: <button> may only contain phrasing
            content, so the <h2> inside would be invalid markup. */}
        <a className="feature" href={"#" + ROUTES.map}
           onClick={(e) => { e.preventDefault(); navigate(ROUTES.map); }}>
          <span>
            <span className="eyebrow eyebrow--accent" style={{ display: "block" }}>
              {t(T.overview.mapTag, lang)}
            </span>
            <h2 className="section-title" style={{ margin: "0 0 0.375rem" }}>
              {t(T.overview.mapTitle, lang)}
            </h2>
            <span className="feature__body">{t(T.overview.mapBody, lang)}</span>
          </span>
          <span className="feature__cta" aria-hidden="true">{t(T.overview.mapCta, lang)}</span>
        </a>
      </section>

      {/* ── Everything on the site ───────────────────────────────────────
          The nav groups seven sections under four headings, which keeps the
          header short but hides two of them behind a dropdown. This block is
          the counterweight: every destination, visible, with a line saying
          what it's for. */}
      <section>
        <h2 className="section-title" style={{ marginTop: 0 }}>
          {t(T.ui.home.everythingTitle, lang)}
        </h2>
        <p className="page-sub" style={{ marginBottom: "1.25rem" }}>
          {t(T.ui.home.everythingSub, lang)}
        </p>

        {GROUP_ORDER.map((group) => {
          const items = DESTINATIONS.filter((d) => d.group === group);
          return (
            <div key={group} style={{ marginBottom: "1.25rem" }}>
              <p className="eyebrow" style={{ marginBottom: "0.625rem" }}>
                {t(T.ui.groups[group], lang)}
              </p>
              <div className="dest-grid">
                {items.map((d) => (
                  <button key={d.key} className="dest" onClick={() => navigate(d.path)}>
                    <span className="dest__name">{t(T.ui.sections[d.titleKey].name, lang)}</span>
                    <span className="dest__desc">{t(T.ui.sections[d.titleKey].desc, lang)}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </section>

    </div>
  );
}
