import { useState } from "react";
import { T, t } from "../i18n";
import { ROUTES } from "../router";
import { KINDS, UPDATES, formatDate } from "../data/updates";

/** What's New — the site's news page.
 *
 *  Until 2026-10-03 this was a changelog of the website and nothing else.
 *  It now carries three kinds of entry (see data/updates.js) and shows them
 *  the way their content deserves rather than all the same way:
 *
 *    mat    a story with photographs gets a lead card and a page of its own
 *    range  a change to the shop gets a card with the garment on it
 *    site   a change to this website stays a log — a date, a line, and the
 *           detail behind a disclosure for the few who want it
 *
 *  The filter narrows the page to one kind. It hides sections rather than
 *  re-sorting one list, so "All" is a designed page and not a default.
 *
 *  The data moved to data/updates.js because three files read it now: this
 *  page, the story page, and the insert on the home page. */
export default function WhatsNew({ lang, navigate }) {
  const [kind, setKind] = useState("all");
  const show = (k) => kind === "all" || kind === k;
  const of = (k) => UPDATES.filter((u) => u.kind === k);
  const count = (k) => (k === "all" ? UPDATES.length : of(k).length);

  const go = (to) => (e) => { e.preventDefault(); navigate(to); };
  const storyPath = (u) => `${ROUTES.whatsNew}/${u.slug}`;
  const bullets = (u) => (
    <ul className="sc-list">
      {u.items.map((item, i) => (
        <li key={i}><span className="dot" aria-hidden="true" />{t(item, lang)}</li>
      ))}
    </ul>
  );

  return (
    <div>
      <div className="page-header">
        <div className="eyebrow eyebrow--accent">{t(T.whatsNew.pageTag, lang)}</div>
        <h1 className="page-title">{t(T.whatsNew.pageTitle, lang)}</h1>
        <p className="page-sub">{t(T.whatsNew.pageSub, lang)}</p>
      </div>

      {/* Buttons with aria-pressed, the same contract as the shop's colour
          pills: one is always pressed, and pressing another moves it. */}
      <div className="pill-row news-filter" role="group" aria-label={t(T.whatsNew.filterLbl, lang)}>
        {["all", ...KINDS].map((k) => (
          <button key={k} type="button" className="pill" aria-pressed={kind === k} onClick={() => setKind(k)}>
            {t(T.whatsNew.kinds[k], lang)} · {count(k)}
          </button>
        ))}
      </div>

      {/* ── From the mat ─────────────────────────────────────────────────
          The photograph is a link for the mouse and the button is the link
          for the keyboard: two tab stops to one place would be one too
          many, so the picture is taken out of the tab order. */}
      {show("mat") && of("mat").map((u) => (
        <article className="card news-lead" key={u.id}>
          <a className="news-lead__media" href={"#" + storyPath(u)} tabIndex={-1} onClick={go(storyPath(u))}>
            <img src={u.image} alt={t(u.imageAlt, lang)} width="1366" height="870" decoding="async" />
            {u.trial && <span className="news-badge">{t(T.whatsNew.trialBadge, lang)}</span>}
          </a>
          <div className="news-lead__body">
            <p className="eyebrow eyebrow--gold">
              {t(T.whatsNew.kinds.mat, lang)} · <time dateTime={u.date}>{formatDate(u.date, lang)}</time>
            </p>
            <h2 className="news-lead__title">{t(u.title, lang)}</h2>
            <p className="news-lead__standfirst">{t(u.standfirst, lang)}</p>
            <div className="news-lead__thumbs" aria-hidden="true">
              {u.story.gallery.slice(1, 4).map((g) => (
                <img key={g.src} src={g.src} alt="" width="88" height="66" loading="lazy" decoding="async" />
              ))}
              <span className="tee__caption">
                {t(T.whatsNew.morePhotos, lang).replace("{n}", u.story.gallery.length - 3)}
              </span>
            </div>
            <a className="btn btn--onphoto news-lead__cta" href={"#" + storyPath(u)} onClick={go(storyPath(u))}>
              {t(T.whatsNew.readUpdate, lang)} →
            </a>
          </div>
        </article>
      ))}

      {/* ── The range ────────────────────────────────────────────────────
          The picture is decoration here — the title already says which
          garment — so its alt is empty rather than a second reading of the
          heading beside it. */}
      {show("range") && (
        <section aria-labelledby="news-range">
          <h2 id="news-range" className="section-title">{t(T.whatsNew.kinds.range, lang)}</h2>
          <div className="news-grid">
            {of("range").map((u) => (
              <article className="card news-card" key={u.id}>
                {u.image && (
                  <img className="news-card__img" src={u.image} alt="" width="1200" height="857"
                       loading="lazy" decoding="async" />
                )}
                <div className="news-card__body">
                  <p className="eyebrow"><time dateTime={u.date}>{formatDate(u.date, lang)}</time></p>
                  <h3 className="news-card__title">{t(u.title, lang)}</h3>
                  <details className="news-details">
                    <summary>{t(T.whatsNew.details, lang)}</summary>
                    {bullets(u)}
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── The site ─────────────────────────────────────────────────────
          <details>, not a button and some state: the browser already knows
          how to open one from the keyboard, announce it, and find text
          inside it with find-in-page. */}
      {show("site") && (
        <section aria-labelledby="news-site">
          <div className="news-sitehead">
            <h2 id="news-site" className="section-title">{t(T.whatsNew.kinds.site, lang)}</h2>
            <p className="page-sub--note">{t(T.whatsNew.siteNote, lang)}</p>
          </div>
          <div className="news-log">
            {of("site").map((u) => (
              <details className="news-log__row" key={u.id}>
                <summary>
                  <time className="news-log__date" dateTime={u.date}>{formatDate(u.date, lang)}</time>
                  <span className="news-log__title">{t(u.title, lang)}</span>
                  <span className="news-log__mark" aria-hidden="true" />
                </summary>
                {bullets(u)}
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
