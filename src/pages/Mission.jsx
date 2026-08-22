import { T, t } from "../i18n";

export default function Mission({ lang }) {
  return (
    <div>
      {/* ── Mission band ─────────────────────────────────────────────────
          Frame 04, duotone. Duotone here is not a preference: this band
          always carries a headline, and the arena colour behind is exactly
          the kind of mid-range value that leaves white type nothing to sit
          against.

          The JJIF banner and the scoreboard are cropped out of the source
          file rather than hidden with CSS. An image carrying a federation
          mark claims a sanctioned result the brand has never had, and
          cropping is the only version of that fix which survives the file
          being reused somewhere else.

          No orange anywhere on this page. Orange means commerce, and this is
          the one page where the purple thread has to stay uncontested. */}
      <section className="band missionband">
        <div className="band__photo" aria-hidden="true" />
        <div className="band__scrim" aria-hidden="true" />
        <div className="band__in">
          <p className="eyebrow eyebrow--mission">{t(T.mh.pageTag, lang)}</p>
          <h1 className="page-title">{t(T.mh.pageTitle, lang)}</h1>
          <div className="note">
            <span className="dot" aria-hidden="true" />
            <span>{t(T.mh.planNote, lang)}</span>
          </div>
        </div>
      </section>

      <div className="card" style={{ maxWidth: "48rem", borderColor: "var(--mission-edge)" }}>
        <p className="prose">{t(T.mh.lead, lang)}</p>
        <p className="prose">{t(T.mh.lead2, lang)}</p>
      </div>

      {/* This block used to be the 1% donation pledge. The pledge is gone, so
          what stands here is the thing the brand can actually claim today —
          stated plainly, which is the register the rest of the site uses about
          its own limitations. */}
      <div className="stance" style={{ marginTop: "1.375rem" }}>
        <h2 className="stance__title">{t(T.mh.stanceTitle, lang)}</h2>
        <p className="stance__body">{t(T.mh.stanceBody, lang)}</p>
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
