import { T, t } from "../i18n";

/* The two survivors of the original six.

   The page used to present six "mental models" as equals. They were not
   equals: four of them were describing one thing from different angles, and
   that thing is the order jiu-jitsu is actually built in — which is now the
   spine of the page. These two are different in kind. They are advice about
   how to train rather than steps in a sequence, so folding them into the
   ladder would have made the ladder untrue.

   Matched by their English title so the translated copy stays in one place in
   i18n.js rather than being duplicated here. If either title is ever
   reworded, this list has to move with it — which is why the section is
   skipped entirely rather than rendering an empty grid if the match fails. */
const RECOMMENDED = ["Timing Over Force", "Tap Early, Tap Often"];

export default function Concepts({ lang }) {
  const rules = T.conceptItems.filter((c) => RECOMMENDED.includes(c.title.en));

  return (
    <div>
      {/* ── Page band ────────────────────────────────────────────────────
          Frame 08, graded rather than duotoned — the same treatment as the
          trio on the home page, and for the same reason: the pink gi is
          information, not decoration, and the headline sits in the dark left
          third rather than over her.

          The crop deliberately cuts the gym decal out of the top of the
          frame. SubmitologY is an apparel brand with no academy, and a wall
          reading "SubmitologY Jiu-Jitsu" behind a black belt would claim one.
          See tools/photo.py. */}
      <section className="band conceptsband">
        <div className="band__photo" aria-hidden="true" />
        <div className="band__scrim" aria-hidden="true" />
        <div className="band__in">
          <p className="eyebrow">{t(T.ui.conceptsPage.stepsEyebrow, lang)}</p>
          <h1 className="page-title">{t(T.concepts.pageTitle, lang)}</h1>
          <p className="page-sub">{t(T.concepts.pageSubtitle, lang)}</p>
        </div>
      </section>

      {/* ── The four ─────────────────────────────────────────────────────
          Numbered 1–4, and the numbers carry real information rather than
          decorating the list: you cannot pass legs you have not brought to
          the ground, and you cannot submit what you have not pinned. An
          ordered list is the honest markup for that, so a screen reader gets
          the sequence too.

          Each step is a claim and its reason, because the reason is the part
          that makes the order stick — "pass the legs" is an instruction, "the
          legs do three jobs at once and none of them are yours" is an
          explanation you can rebuild the instruction from. */}
      <section className="steps-section">
        <h2 className="section-title" style={{ marginTop: 0 }}>
          {t(T.ui.conceptsPage.stepsTitle, lang)}
        </h2>
        <p className="page-sub" style={{ marginBottom: "1.75rem" }}>
          {t(T.ui.conceptsPage.stepsLead, lang)}
        </p>

        <ol className="steps">
          {T.ui.conceptSteps.map((step, i) => (
            <li className="step" key={step.title.en}>
              <span className="step__n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="step__body">
                <h3 className="step__title">{t(step.title, lang)}</h3>
                <p className="step__what">{t(step.body, lang)}</p>
                <p className="step__why">
                  <span className="step__why-label">{t(T.ui.conceptsPage.why, lang)}</span>
                  {t(step.why, lang)}
                </p>
              </div>
              {/* Decorative rather than described. The title and the two
                  paragraphs beside it already say what the position is, so
                  alt text would only repeat them — and it would have to
                  repeat them in five languages to do it honestly. The image
                  is here to make the step concrete for people who can see it,
                  which is exactly what aria-hidden is for.

                  A background rather than an <img> so the crop stays a design
                  decision in one place: same treatment as every other
                  photograph on the site. */}
              <div className={`step__img step__img--${i + 1}`} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>

      {/* ── The two recommendations ──────────────────────────────────────
          Visually separated from the ladder on purpose: same page, different
          kind of thing. These are how you train the four, not a fifth and a
          sixth step. */}
      {rules.length > 0 && (
        <section>
          <p className="eyebrow eyebrow--mission">
            {t(T.ui.conceptsPage.rulesEyebrow, lang)}
          </p>
          <h2 className="section-title" style={{ margin: "0 0 1.25rem" }}>
            {t(T.ui.conceptsPage.rulesTitle, lang)}
          </h2>
          <div className="grid-cards">
            {rules.map((c) => (
              <article className="card rule-card" key={c.title.en}>
                <div className="concept__icon" aria-hidden="true">{c.icon}</div>
                <h3 className="concept__title">{t(c.title, lang)}</h3>
                <p className="concept__body">{t(c.body, lang)}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
