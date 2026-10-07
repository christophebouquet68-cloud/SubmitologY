import { T, t } from "../i18n";
import { ROUTES } from "../router";
import { FREEBIES, SECTIONS, freebieHref } from "../data/freebies";

/** Freebies — free downloads, "sharing is caring".
 *
 *  Two sections for now, For kids and For everyone, each a list of cards that
 *  read from data/freebies.js. The page knows nothing about any particular
 *  file: adding a download is one data entry and its files in
 *  public/freebies/, the same property the shop's data files keep.
 *
 *  Plain `<a href download>` links to this site's own files. No form, no
 *  email, no count of who downloaded what, no third-party host — which is why
 *  the privacy policy did not change with this page, and why it must the day
 *  any of those things is added. */

/** "77 KB" / "0.7 MB", in the reader's own number format. Decimal units, as a
 *  file manager on a Mac shows them. */
function fileSize(bytes, lang) {
  const locale = lang === "pt" ? "pt-BR" : lang;
  if (bytes < 1_000_000) {
    return `${new Intl.NumberFormat(locale).format(Math.max(1, Math.round(bytes / 1000)))} KB`;
  }
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`;
}

/** A line of "inside" copy is either a five-language string, or — for the
 *  poster, whose pages have English titles printed on them — { name, text }. */
function InsideLine({ entry, lang }) {
  if (entry.name) {
    return (<><strong>{entry.name}</strong>: {t(entry.text, lang)}</>);
  }
  return t(entry, lang);
}

export default function Freebies({ lang, navigate }) {
  const P = T.ui.freebiesPage;

  const meta = (f) => [
    "PDF",
    t(P.inEnglish, lang),
    t(P.pages, lang).replace("{n}", f.pages),
    f.paper,
    fileSize(f.bytes, lang),
  ].join(" · ");

  return (
    <div>
      <div className="page-header">
        <div className="eyebrow eyebrow--gold">{t(P.tag, lang)}</div>
        <h1 className="page-title">{t(T.ui.sections.freebies.name, lang)}</h1>
        <p className="page-sub">{t(P.sub, lang)}</p>
      </div>

      {SECTIONS.map((section) => (
        <section key={section} aria-labelledby={`free-${section}`}>
          <h2 id={`free-${section}`} className="section-title">{t(P[`${section}Title`], lang)}</h2>
          <p className="page-sub free__lead">{t(P[`${section}Lead`], lang)}</p>

          {FREEBIES.filter((f) => f.section === section).map((f) => (
            <article className="card free" key={f.id} aria-labelledby={`free-${f.id}`}>
              {/* The previews are real pages from the file, so the visitor
                  sees what they will be printing before they click. Each has
                  its own alt: they are content, not decoration. */}
              <div className="free__media">
                <span className="news-badge">{t(P.free, lang)}</span>
                {f.previews.map((p) => (
                  <img key={p.src} className="free__page" src={p.src} alt={t(p.alt, lang)}
                       width={p.w} height={p.h} loading="lazy" decoding="async" />
                ))}
              </div>

              <div className="free__body">
                <p className="eyebrow eyebrow--gold">{meta(f)}</p>
                <h3 id={`free-${f.id}`} className="free__title">{f.name}</h3>
                <p className="free__blurb">{t(f.blurb, lang)}</p>

                <p className="eyebrow free__inside-title">{t(P.inside, lang)}</p>
                <ul className="sc-list free__list">
                  {f.inside.map((entry, i) => (
                    <li key={i}>
                      <span className="dot" aria-hidden="true" />
                      <span><InsideLine entry={entry} lang={lang} /></span>
                    </li>
                  ))}
                </ul>

                <p className="free__note">{t(f.note, lang)}</p>

                {/* The file's own details are in the accessible name, since a
                    screen-reader user tabbing between links should hear what
                    each one fetches without reading the paragraph above. */}
                <a className="btn btn--primary free__cta" href={freebieHref(f)} download>
                  <span>{t(f.cta, lang)}</span>
                  <span aria-hidden="true">↓</span>
                  <span className="sr-only"> ({meta(f)})</span>
                </a>
              </div>
            </article>
          ))}
        </section>
      ))}

      <div className="card free-close">
        <div>
          <p className="eyebrow eyebrow--gold">{t(P.closeTitle, lang)}</p>
          <p className="free-close__text">{t(P.closeBody, lang)}</p>
        </div>
        <button className="btn btn--ghost" onClick={() => navigate(ROUTES.contact)}>
          {t(T.ui.legal.contact, lang)}
        </button>
      </div>
    </div>
  );
}
