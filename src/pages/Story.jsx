import { T, t } from "../i18n";
import { ROUTES } from "../router";
import { TECH_TYPE_COLOR } from "../data/techmap";

const TYPES = ["position", "transition", "submission"];

export default function Story({ lang, navigate }) {
  return (
    <div>
      {/* ── Story band ───────────────────────────────────────────────────
          Frame 07, duotone, same treatment as the mission band. A formal,
          centred, symmetrical portrait reads as an introduction, which is
          exactly what this page is — and it is the one placement where a
          posed shot is right rather than a compromise.

          Duotone because a headline sits on it. The eyebrow reuses the
          section description from DESTINATIONS, so this adds no new string
          in any of the five languages. */}
      <section className="band storyband">
        <div className="band__photo" aria-hidden="true" />
        <div className="band__scrim" aria-hidden="true" />
        <div className="band__in">
          <p className="eyebrow">{t(T.ui.sections.story.desc, lang)}</p>
          <h1 className="page-title">{t(T.about.pageTitle, lang)}</h1>
        </div>
      </section>

      <div className="card" style={{ maxWidth: "44rem" }}>
        <p className="prose" style={{ color: "var(--text)", fontWeight: 600 }}>
          {t(T.about.mission, lang)}
        </p>
        <hr className="divider" />
        <p className="prose">{t(T.about.body1, lang)}</p>
        <p className="prose">{t(T.about.body2, lang)}</p>
        <hr className="divider" />

        <h2 className="eyebrow">{t(T.about.catsTitle, lang)}</h2>
        {TYPES.map((ty) => (
          <div key={ty} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", marginBottom: "0.625rem" }}>
            <span className="dot" style={{ background: TECH_TYPE_COLOR[ty], marginTop: "0.5rem", flexShrink: 0 }} aria-hidden="true" />
            <p style={{ margin: 0, fontSize: "0.9375rem" }}>
              <strong style={{ color: TECH_TYPE_COLOR[ty] }}>
                {t(T.techmap[`type${ty[0].toUpperCase()}${ty.slice(1)}`], lang)}
              </strong>
              <span style={{ color: "var(--text-muted)", marginLeft: "0.625rem" }}>
                {t(T.about.typeDescs[ty], lang)}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="card" style={{ maxWidth: "44rem", marginTop: "1.125rem", background: "var(--mission-wash)", borderColor: "var(--mission-edge)" }}>
        <h2 className="eyebrow eyebrow--mission">{t(T.about.linksTitle, lang)}</h2>
        <p className="prose" style={{ marginBottom: "1rem" }}>{t(T.about.linksBody, lang)}</p>
        <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
          <button className="btn btn--primary" onClick={() => navigate(ROUTES.shop)}>
            {t(T.about.shopLink, lang)}
          </button>
          <button className="btn btn--mission" onClick={() => navigate(ROUTES.mission)}>
            {t(T.about.missionLink, lang)}
          </button>
        </div>
      </div>

      <div className="quote">
        <p className="eyebrow eyebrow--accent">{t(T.about.invitationTitle, lang)}</p>
        <p>{t(T.about.invitation, lang)}</p>
      </div>
    </div>
  );
}
