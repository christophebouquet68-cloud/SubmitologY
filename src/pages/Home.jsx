import { T, t, LANGUAGES } from "../i18n";
import { DESTINATIONS, ROUTES } from "../router";
import Seam from "../components/Seam";
import HeroGraph from "../components/HeroGraph";
import { TECHMAP_NODES, TECH_TYPE_COLOR } from "../data/techmap";
import { AGE_RANGES, LEVELS, PROGRAM_TYPES } from "../data/program";

// Derived, never typed. A hardcoded count is a claim that rots the moment
// someone adds a technique or a language.
const TECHNIQUE_COUNT = Object.keys(TECHMAP_NODES).length;
const PROGRAM_COUNT = AGE_RANGES.length * LEVELS.length * PROGRAM_TYPES.length;

// The taxonomy is the site's own structure, so the grid counts it rather than
// restating it: 11 positions, 12 transitions, 11 submissions, from the data.
const TYPES = ["position", "transition", "submission"];
const TYPE_COUNTS = TYPES.reduce((acc, ty) => {
  acc[ty] = Object.values(TECHMAP_NODES).filter((n) => n.type === ty).length;
  return acc;
}, {});

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
        <HeroGraph />
        <div className="hero__inner">
          <p className="eyebrow">{t(T.overview.tag, lang)}</p>
          {/* The two taglines are the same length and name two halves of one
              idea, so they are set as one sentence at two weights rather than
              as a heading with a subheading under it. The weight axis doing
              the work is why Archivo's is left live. */}
          <h1 className="hero__title">
            <span className="hero__line1">{t(T.overview.titleLine1, lang)}</span>
            <span className="hero__line2">{t(T.overview.titleLine2, lang)}</span>
          </h1>
          <p className="hero__body">{t(T.overview.heroBody, lang)}</p>
          <div className="hero__ctas">
            <button className="btn btn--primary" onClick={() => navigate(ROUTES.map)}>
              {t(T.overview.exploreCta, lang)}
            </button>
            <button className="btn btn--ghost" onClick={() => navigate(ROUTES.shop)}>
              {t(T.overview.merchCta, lang)}
            </button>
          </div>

          {/* Every number here is derived, not typed. If a technique is added
              to techmap.js or a language to LANGUAGES, this row updates
              itself — a hardcoded "34" would quietly become a lie. */}
          <dl className="hero__stats">
            <div><dt>{TECHNIQUE_COUNT}</dt><dd>{t(T.overview.statTechniques, lang)}</dd></div>
            <div><dt>{PROGRAM_COUNT}</dt><dd>{t(T.overview.statPrograms, lang)}</dd></div>
            <div><dt>{LANGUAGES.length}</dt><dd>{t(T.overview.statLanguages, lang)}</dd></div>
            <div><dt>1%</dt><dd>{t(T.overview.statPledge, lang)}</dd></div>
          </dl>
        </div>
      </section>

      {/* ── Thesis ───────────────────────────────────────────────────────
          The bone chapter. The page was one continuous dark field, so the
          scroll had no rhythm; giving the "what the name means" block a
          paper ground turns it into a chapter rather than another card.
          Bracketed by seams, because kintsugi means the join is visible. */}
      <div className="chapter">
        <Seam seed={11} />
        <section className="thesis chapter__body surface--bone">
          <p className="thesis__text">{t(T.overview.body2, lang)}</p>
          <div className="thesis__mark">
            <img className="thesis__logo" src={LOGO} alt="SubmitologY logo"
                 width="104" height="104" />
            <p className="thesis__caption">{t(T.overview.logoCaption, lang)}</p>
          </div>
        </section>
        <Seam seed={12} />
      </div>

      {/* ── Taxonomy ──────────────────────────────────────────────────────
          One word per cell with a line beneath it. The device is borrowed;
          the content is not invented — the three type names and their
          descriptions already existed for the map and the Story page, and
          the counts come straight from techmap.js. */}
      <section>
        <p className="eyebrow">{t(T.overview.taxEyebrow, lang)}</p>
        <h2 className="section-title" style={{ margin: "0 0 1.25rem" }}>
          {t(T.overview.taxTitle, lang)}
        </h2>
        <div className="tax">
          {TYPES.map((ty) => (
            <div key={ty} className="tax__cell" style={{ "--c": TECH_TYPE_COLOR[ty] }}>
              <span className="tax__n">
                {TYPE_COUNTS[ty]} {t(T.overview.taxCount, lang)}
              </span>
              <h3 className="tax__name">
                {t(T.techmap[`type${ty[0].toUpperCase()}${ty.slice(1)}`], lang)}
              </h3>
              <p className="tax__body">{t(T.about.typeDescs[ty], lang)}</p>
            </div>
          ))}
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
