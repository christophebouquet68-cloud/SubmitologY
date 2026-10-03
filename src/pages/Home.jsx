import { T, t, LANGUAGES } from "../i18n";
import { DESTINATIONS, ROUTES } from "../router";
import Seam from "../components/Seam";
import HeroGraph from "../components/HeroGraph";
import { TECHMAP_NODES, TECH_TYPE_COLOR } from "../data/techmap";
import { AGE_RANGES, LEVELS, PROGRAM_TYPES } from "../data/program";
import { EX_FIGURES } from "../data/exercise-figures";
import { UPDATES, formatDate } from "../data/updates";

// Derived, never typed. A hardcoded count is a claim that rots the moment
// someone adds a technique or a language.
const TECHNIQUE_COUNT = Object.keys(TECHMAP_NODES).length;
const PROGRAM_COUNT = AGE_RANGES.length * LEVELS.length * PROGRAM_TYPES.length;
const FIGURE_COUNT = Object.keys(EX_FIGURES).length;

// The taxonomy is the site's own structure, so the grid counts it rather than
// restating it: 19 positions, 20 transitions, 21 submissions, from the data.
const TYPES = ["position", "transition", "submission"];
const TYPE_COUNTS = TYPES.reduce((acc, ty) => {
  acc[ty] = Object.values(TECHMAP_NODES).filter((n) => n.type === ty).length;
  return acc;
}, {});

// public/ asset, so it must go through PUBLIC_URL to survive the "." homepage
// setting used for static hosting. (The photographs are different — they live
// in src/photo/ and are resolved by webpack from the stylesheet.)
const LOGO = `${process.env.PUBLIC_URL}/logo512.png`;

// Groups in reading order for the "everything on the site" index.
const GROUP_ORDER = ["train", "shop", "mission", "news", "about"];

// What the "From the mat" insert shows: the newest story with photographs,
// and beside it the two newest entries that are not about the website —
// someone on the home page wants to know what is new with the brand, not
// that a menu moved. Derived from the data, so publishing a story in
// data/updates.js updates the home page with nothing to edit here.
const LEAD = UPDATES.find((u) => u.story);
const LEAD_PATH = LEAD ? `${ROUTES.whatsNew}/${LEAD.slug}` : ROUTES.whatsNew;
const RECENT = UPDATES.filter((u) => u !== LEAD && u.kind !== "site").slice(0, 2);

export default function Home({ lang, navigate }) {
  return (
    <div className="home">
      {/* ── Hero ─────────────────────────────────────────────────────────
          Frame 01 in colour: the crest at full size on the back of a gi,
          gold seam legible, over a black wall that fills the left of the
          frame. That wall is why the scrim here runs diagonally instead of
          fading from the bottom — a bottom fade flattens the crest, and the
          crest is the reason to use this frame at all.

          Two CTAs, not five. The map is the thing this site has that no
          other BJJ brand page does, so it gets the primary button; the shop
          gets the secondary. On a photograph the primary is white rather
          than orange: white is louder and cleaner over an image, and it
          leaves orange free to own the shop band by itself. */}
      <section className="hero hero--photo">
        <div className="hero__photo" aria-hidden="true" />
        <div className="hero__inner">
          <p className="eyebrow">{t(T.overview.tag, lang)}</p>
          {/* The two taglines are the same length and name two halves of one
              idea, so they are set as one sentence at two weights rather than
              as a heading with a subheading under it. */}
          <h1 className="hero__title">
            <span className="hero__line1">{t(T.overview.titleLine1, lang)}</span>
            <span className="hero__line2">{t(T.overview.titleLine2, lang)}</span>
          </h1>
          {/* The line already on the crest behind this section, now typed
              rather than only photographed. Gold, not white — it echoes the
              crest's seam instead of competing with the title above it. */}
          <p className="eyebrow eyebrow--gold hero__kicker">{t(T.overview.heroKicker, lang)}</p>
          <p className="hero__body">{t(T.overview.heroBody, lang)}</p>
          <div className="hero__ctas">
            <button className="btn btn--onphoto btn--lg" onClick={() => navigate(ROUTES.map)}>
              {t(T.overview.exploreCta, lang)}
            </button>
            <button className="btn btn--ghost btn--lg" onClick={() => navigate(ROUTES.shop)}>
              {t(T.overview.merchCta, lang)}
            </button>
          </div>
          {/* Trial-phase banner, 2026-09-30. Under the CTAs rather than above
              them: it is news, not the site's thesis, so it shouldn't push the
              two buttons down the hero. An opaque dark panel (like the shop's
              .tee__badge) so its contrast holds over any part of the photo.
              A link since 2026-10-03, to the story with the photographs — the copy
              says outright that nothing is on sale. Remove it when the trial
              ends. */}
          <a className="hero__trial" href={"#" + LEAD_PATH}
             onClick={(e) => { e.preventDefault(); navigate(LEAD_PATH); }}>
            <span className="hero__trial-tag">{t(T.overview.trialTag, lang)}</span>
            <span className="hero__trial-body">{t(T.overview.trialBody, lang)}</span>
            <span className="hero__trial-cta">{t(T.whatsNew.seePhotos, lang)} →</span>
          </a>
        </div>
      </section>

      {/* ── Stat strip ───────────────────────────────────────────────────
          Pulled out of the hero box and pinned across the full width on a
          gold hairline. Every number is derived, not typed: if a technique
          is added to techmap.js or a language to LANGUAGES, this row updates
          itself — a hardcoded "34" would quietly become a lie.

          A <dl> because these genuinely are term/definition pairs, and it
          gives screen readers the number and its label as one unit. */}
      <div className="statstrip">
        <dl className="hero__stats">
          <div><dt>{TECHNIQUE_COUNT}</dt><dd>{t(T.overview.statTechniques, lang)}</dd></div>
          <div><dt>{PROGRAM_COUNT}</dt><dd>{t(T.overview.statPrograms, lang)}</dd></div>
          <div><dt>{LANGUAGES.length}</dt><dd>{t(T.overview.statLanguages, lang)}</dd></div>
          <div><dt>{FIGURE_COUNT}</dt><dd>{t(T.overview.statExercises, lang)}</dd></div>
        </dl>
      </div>

      {/* ── From the mat ─────────────────────────────────────────────────
          The entry point to What's New, 2026-10-03. Directly under the
          numbers and above the first photograph band: high enough to be
          seen without hunting, and below the hero so the site still opens
          on what it is rather than on what happened this week.

          One story with its photograph, then two lines for whatever else
          is recent. The photograph is a link for the mouse and the button
          is the link for the keyboard, as on the What's New page. */}
      {LEAD && (
        <section className="latest" aria-labelledby="latest-heading">
          <div className="latest__head">
            <div>
              <p className="eyebrow eyebrow--gold">{t(T.ui.sections.whatsNew.name, lang)}</p>
              <h2 className="latest__title" id="latest-heading">{t(T.whatsNew.kinds.mat, lang)}</h2>
            </div>
            <a className="latest__all" href={"#" + ROUTES.whatsNew}
               onClick={(e) => { e.preventDefault(); navigate(ROUTES.whatsNew); }}>
              {t(T.whatsNew.allUpdates, lang)} →
            </a>
          </div>

          <div className="latest__grid">
            <a className="latest__media" href={"#" + LEAD_PATH} tabIndex={-1}
               onClick={(e) => { e.preventDefault(); navigate(LEAD_PATH); }}>
              <img src={LEAD.image} alt={t(LEAD.imageAlt, lang)} width="1366" height="870"
                   loading="lazy" decoding="async" />
              {LEAD.trial && <span className="news-badge">{t(T.whatsNew.trialBadge, lang)}</span>}
              <span className="latest__count">
                {t(T.whatsNew.photoCount, lang).replace("{n}", LEAD.story.gallery.length + 1)}
              </span>
            </a>

            <div className="latest__body">
              <p className="eyebrow">
                <time dateTime={LEAD.date}>{formatDate(LEAD.date, lang)}</time> · {t(T.whatsNew.kinds.mat, lang)}
              </p>
              <h3 className="latest__story-title">{t(LEAD.title, lang)}</h3>
              <p className="latest__standfirst">{t(LEAD.standfirst, lang)}</p>
              <a className="btn btn--onphoto latest__cta" href={"#" + LEAD_PATH}
                 onClick={(e) => { e.preventDefault(); navigate(LEAD_PATH); }}>
                {t(T.whatsNew.readUpdate, lang)} →
              </a>

              <div className="latest__rows">
                {RECENT.map((u) => (
                  <a key={u.id} className="latest__row" href={"#" + ROUTES.whatsNew}
                     onClick={(e) => { e.preventDefault(); navigate(ROUTES.whatsNew); }}>
                    <span className="latest__row-text">
                      <span className="latest__row-meta">
                        <time dateTime={u.date}>{formatDate(u.date, lang)}</time> · {t(T.whatsNew.kinds[u.kind], lang)}
                      </span>
                      <span className="latest__row-title">{t(u.title, lang)}</span>
                    </span>
                    <span className="latest__row-arrow" aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Photographic seam ────────────────────────────────────────────
          Frame 03 cropped to 32:9 and duotoned. It carries no type, so it
          costs nothing in legibility; it repeats between chapters without
          becoming the subject; and it is the one frame in the set that is
          purely about two people agreeing to train.

          Decorative, so aria-hidden with no focusable child — the same
          contract as the drawn Seam, which is still what runs on the bone
          chapter and on every page that has to load light. */}
      <div className="photoseam" aria-hidden="true" />

      {/* ── Thesis ───────────────────────────────────────────────────────
          The bone chapter, now split: frame 06 in colour on the left, paper
          on the right. Frame 06 is the only one with faces to camera and the
          only one showing more than one colourway, so it belongs where the
          page is talking about the brand rather than about the sport.

          Still bracketed by drawn seams, because kintsugi means the join is
          visible — and because a photograph either side of paper would leave
          the chapter with no edge of its own. */}
      <div className="chapter">
        <Seam seed={11} />
        <div className="storysplit">
          <div className="storysplit__img" aria-hidden="true" />
          <section className="thesis storysplit__body surface--bone">
            <p className="thesis__text">{t(T.overview.body2, lang)}</p>
            <div className="thesis__mark">
              <img className="thesis__logo" src={LOGO} alt="SubmitologY logo"
                   width="104" height="104" />
              <p className="thesis__caption">{t(T.overview.logoCaption, lang)}</p>
            </div>
          </section>
        </div>
        <Seam seed={12} />
      </div>

      {/* ── Taxonomy ──────────────────────────────────────────────────────
          One word per cell with a line beneath it. The device is borrowed;
          the content is not invented — the three type names and their
          descriptions already existed for the map and the Story page, and
          the counts come straight from techmap.js.

          Flat ground on purpose: it is the beat between two photographic
          bands, and without it the scroll starts to read as a gallery. */}
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

      {/* ── Technique band ───────────────────────────────────────────────
          Frame 02 duotoned, with the real map drawn over the right-hand
          side. Two hands fighting for a grip is the most literal possible
          illustration of a graph edge, and the graph itself moved here from
          the hero: it belongs beside the thing it links to rather than
          behind an unrelated headline.

          An anchor rather than a button for the CTA: <button> may only
          contain phrasing content, and this one sits in a block that also
          carries a heading. */}
      <section className="band techband">
        <div className="band__photo" aria-hidden="true" />
        <HeroGraph />
        <div className="band__scrim" aria-hidden="true" />
        <div className="band__in">
          <p className="eyebrow eyebrow--accent">{t(T.overview.mapTag, lang)}</p>
          <h2 className="band__title">{t(T.overview.mapTitle, lang)}</h2>
          <p className="band__body">{t(T.overview.mapBody, lang)}</p>
          {/* The legend names what the colours already mean on the map, so
              the graph behind reads as data rather than as decoration. */}
          <p className="legend">
            {TYPES.map((ty) => (
              <span key={ty}>
                <i style={{ "--c": TECH_TYPE_COLOR[ty] }} aria-hidden="true" />
                {t(T.techmap[`type${ty[0].toUpperCase()}${ty.slice(1)}`], lang)}
              </span>
            ))}
          </p>
          <div className="hero__ctas" style={{ marginTop: "1.75rem" }}>
            <a className="btn btn--onphoto btn--lg" href={"#" + ROUTES.map}
               onClick={(e) => { e.preventDefault(); navigate(ROUTES.map); }}>
              {t(T.overview.mapCta, lang)}
            </a>
          </div>
        </div>
      </section>

      {/* ── Everything on the site ───────────────────────────────────────
          The nav groups seven sections under five headings, which keeps the
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

      {/* ── Shop band ────────────────────────────────────────────────────
          The one orange surface on the page, and the last beat in the
          rhythm. Orange means commerce, so it appears exactly once and only
          where there is something to point at.

          No new copy: the eyebrow, title and button are strings that already
          exist and are already translated into all five languages. Nothing
          here implies anything can be bought — the shop it links to is still
          labelled "Target Price" and "Coming Q1/Q2 2027", and there is still no
          cart anywhere on the site. Deliberately no email field: promoting
          the footer signup into a full-width orange band is the kind of
          conversion pressure a brand with nothing to sell has not earned. */}
      <section className="band band--orange">
        <div className="band__in band__in--row">
          <div>
            <p className="eyebrow">{t(T.ui.sections.shop.desc, lang)}</p>
            <h2 className="band__title" style={{ marginBottom: 0 }}>
              {t(T.ui.sections.shop.name, lang)}
            </h2>
          </div>
          <button className="btn btn--onphoto btn--lg" onClick={() => navigate(ROUTES.shop)}>
            {t(T.overview.merchCta, lang)}
          </button>
        </div>
      </section>

    </div>
  );
}
