import { T, t } from "../i18n";
import { ROUTES } from "../router";
import { UPDATES, formatDate } from "../data/updates";
import NotFound from "./NotFound";

/** One story from What's New, at /whats-new/<slug>.
 *
 *  A slug that matches nothing shows the site's own not-found page rather
 *  than an empty frame: these addresses get shared, and one day a story
 *  will be renamed or retired.
 *
 *  Everything on the page comes from the story's entry in data/updates.js.
 *  The only links out go to the shop — where the garment and, in time, the
 *  testers' feedback are — and back to What's New. */
export default function WhatsNewStory({ lang, slug, navigate }) {
  const u = UPDATES.find((x) => x.slug === slug);
  if (!u) return <NotFound lang={lang} navigate={navigate} />;

  const s = u.story;
  const go = (to) => (e) => { e.preventDefault(); navigate(to); };

  return (
    <article className="story-page">
      <a className="story-back" href={"#" + ROUTES.whatsNew} onClick={go(ROUTES.whatsNew)}>
        ← {t(T.ui.sections.whatsNew.name, lang)}
      </a>

      <div className="story-meta">
        <span className="eyebrow eyebrow--gold">
          {t(T.whatsNew.kinds[u.kind], lang)} · <time dateTime={u.date}>{formatDate(u.date, lang, "long")}</time>
        </span>
        {u.trial && <span className="news-badge news-badge--inline">{t(T.whatsNew.trialBadge, lang)}</span>}
      </div>

      <h1 className="page-title story-title">{t(u.title, lang)}</h1>
      <p className="story-standfirst">{t(u.standfirst, lang)}</p>

      <img className="story-hero" src={s.hero.src} alt={t(s.hero.alt, lang)}
           width={s.hero.w} height={s.hero.h} decoding="async" />

      <div className="story-cols">
        <div className="story-body">
          {s.body.map((p, i) => <p key={i}>{t(p, lang)}</p>)}
        </div>

        {/* A <dl>, like the shop's spec strips: these are label/value pairs,
            and "For sale — Not yet" should reach a screen reader as one
            unit, not as two unrelated lines. */}
        <aside className="card story-glance" aria-labelledby="story-glance">
          <p className="eyebrow" id="story-glance">{t(T.whatsNew.glanceTitle, lang)}</p>
          <dl>
            {s.glance.map((g, i) => (
              <div key={i}>
                <dt className="merch__spec-lbl">{t(g.label, lang)}</dt>
                <dd>{t(g.value, lang)}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <h2 className="section-title">{t(T.whatsNew.galleryTitle, lang)}</h2>
      <div className="story-gallery">
        {s.gallery.map((g) => (
          <img key={g.src}
               className={"story-gallery__img" + (g.shape ? ` story-gallery__img--${g.shape}` : "")}
               src={g.src} alt={t(g.alt, lang)} width={g.w} height={g.h}
               loading="lazy" decoding="async" />
        ))}
      </div>
      <p className="page-sub--note story-note">{t(T.whatsNew.facesNote, lang)}</p>

      <div className="story-ctas">
        <a className="btn btn--onphoto" href={"#" + ROUTES.shop} onClick={go(ROUTES.shop)}>
          {t(T.whatsNew.seeRashguard, lang)} →
        </a>
      </div>
    </article>
  );
}
