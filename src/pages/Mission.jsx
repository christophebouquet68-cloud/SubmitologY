import { T, t } from "../i18n";

/** Photographs for the kintsugi section: public/mission/, served from this site. */
const MEDIA = `${process.env.PUBLIC_URL}/mission/`;

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

      {/* This block used to hold a short, plainly-stated disclosure ("no
          product, no shop, no revenue yet" — still covered by planNote in
          the band above). It now carries the founder's personal note on why
          mental health sits at the centre of the mission, so it's styled as
          a full prose section rather than the small muted "stance" note. */}
      <h2 className="section-title" style={{ marginTop: "1.375rem" }}>{t(T.mh.stanceTitle, lang)}</h2>
      <div className="card" style={{ maxWidth: "48rem" }}>
        <p className="prose">{t(T.mh.stanceBody, lang)}</p>
        <p className="prose">{t(T.mh.stanceBody2, lang)}</p>
      </div>

      {/* ── What is kintsugi? ───────────────────────────────────────────
          Added 2026-10-17. The section sits straight after Why It Matters,
          which ends on the word Kintsugi, so a reader who stops at the word
          finds the answer one scroll later. The id is the anchor for
          /mission#kintsugi.

          Three parts, each with its own look: the idea (text beside a
          photograph), why it is our name for the mind (text beside a second
          photograph, mirrored), and what we are not saying (a purple-edged
          panel, the colour this page uses for care). A gold hairline above
          the whole block marks where it starts.

          The photographs are objects in the Walters Art Museum, Baltimore,
          released CC0. No credit is required; it is printed anyway. They are
          served from public/mission/ and never hot-linked, so the privacy
          policy's no-third-party-requests claim holds. */}
      <section className="kintsugi" id="kintsugi" aria-labelledby="kintsugi-heading">
        <p className="eyebrow eyebrow--gold">{t(T.mh.kintsugiTag, lang)}</p>
        <h2 id="kintsugi-heading" className="section-title kintsugi__title">{t(T.mh.kintsugiTitle, lang)}</h2>

        <div className="kintsugi__row">
          <figure className="kfig">
            <img
              className="kfig__img"
              src={MEDIA + "kintsugi-bowl.jpg"}
              alt={t(T.mh.kintsugiAlt1, lang)}
              width="900"
              height="804"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="kfig__cap">{t(T.mh.kintsugiFig1, lang)}</figcaption>
          </figure>
          <div className="kintsugi__text">
            <p className="prose">{t(T.mh.kintsugiP1, lang)}</p>
            <p className="prose">{t(T.mh.kintsugiP2, lang)}</p>
            <p className="prose">{t(T.mh.kintsugiP3, lang)}</p>
          </div>
        </div>

        <div className="kintsugi__row kintsugi__row--flip">
          <div className="kintsugi__text">
            <h3 className="kintsugi__sub">{t(T.mh.kintsugiWhyTitle, lang)}</h3>
            <p className="prose">{t(T.mh.kintsugiWhyP, lang)}</p>
            <p className="prose">{t(T.mh.kintsugiWhyP2, lang)}</p>
          </div>
          <figure className="kfig kfig--square">
            <img
              className="kfig__img"
              src={MEDIA + "kintsugi-dish.jpg"}
              alt={t(T.mh.kintsugiAlt2, lang)}
              width="1000"
              height="1000"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="kfig__cap">{t(T.mh.kintsugiFig2, lang)}</figcaption>
          </figure>
        </div>

        <aside className="card kintsugi__aside" aria-labelledby="kintsugi-not-heading">
          <h3 id="kintsugi-not-heading" className="kintsugi__sub">{t(T.mh.kintsugiNotTitle, lang)}</h3>
          <p className="prose">{t(T.mh.kintsugiNotBody, lang)}</p>
        </aside>

        <p className="kintsugi__motto">{t(T.mh.kintsugiMotto, lang)}</p>
      </section>

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
