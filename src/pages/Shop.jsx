import { useEffect, useState } from "react";
import { T, t } from "../i18n";
import { RASHGUARDS, RASHGUARD_DESIGN, RASHGUARD_SIZES_LONG, rashguardImage } from "../data/rashguards";
import { SHORTS, shortsImage } from "../data/shorts";
import { GI_COLOURWAYS, GI_DESIGN, giImage } from "../data/gis";
import { BELT_NAME, BELT_PRICE, BELT_BLURB, beltImage } from "../data/belt";
import { REVIEWS } from "../data/reviews";
import {
  DEFAULT_COLOURWAY,
  TEE_COLOURWAYS,
  TEE_DESIGNS,
  teeImage,
} from "../data/tshirts";

/** The shop is entirely the first drop now — rashguards, shorts, the gi,
 *  t-shirts, then the belt. Everything here has artwork, a price and a
 *  quarter (Q1 2027, except the gi — Q2 2027 since 2026-09-30); there is no
 *  more undated "rest of the range" grid
 *  underneath, which is why merch.js no longer exists.
 *
 *  Rashguards lead, 2026-08-23. They were in that undated grid until artwork
 *  arrived; once it did, they were deleted from merch.js in the same change
 *  — listed in both places, the two entries would have drifted.
 *
 *  Shorts, the gi and the belt followed the same way on 2026-08-30, once
 *  photography existed for all three. Order on the page follows what each
 *  garment is, not the order artwork arrived in: shorts sit under the
 *  rashguards (both are something worn to train in, not a shirt), the gi
 *  follows, then the tees, then the belt last — it's the one piece nobody
 *  buys without already training, so it closes the list rather than
 *  competing for attention at the top. */
export default function Shop({ lang }) {
  /* One colourway drives the whole rail: the point of the picker is to see the
     collection *as a collection* in white, then in dark blue, then in black.
     `overrides` is the escape hatch — the swatches on a card change only that
     card, for when someone wants to compare two designs side by side in
     different colours. Choosing from the top row clears them again. */
  const [colourway, setColourway] = useState(DEFAULT_COLOURWAY);
  const [overrides, setOverrides] = useState({});
  const colourOf = (designId) => overrides[designId] || colourway;

  const pickAll = (id) => { setColourway(id); setOverrides({}); };
  const pickOne = (designId, id) =>
    setOverrides((prev) => ({ ...prev, [designId]: id }));

  /* Warm the colourways that aren't on screen shortly after the page settles.
     Without this the first switch shows an empty plate on a slow connection,
     which reads as a broken control rather than a loading image. Deferred so
     it never competes with the four images actually being looked at. */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      for (const design of TEE_DESIGNS) {
        for (const colour of TEE_COLOURWAYS) {
          if (colour.id === DEFAULT_COLOURWAY) continue;
          const img = new Image();
          img.src = teeImage(design.id, colour.id);
        }
      }
    }, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const colourName = (id) => t(T.merch.colours[id], lang);

  return (
    <div>
      <div className="page-header">
        <div className="eyebrow eyebrow--accent">{t(T.merch.pageTag, lang)}</div>
        <h1 className="page-title">{t(T.merch.pageTitle, lang)}</h1>
        {/* Six short paragraphs rather than one standfirst — the brand copy
            reads as a short piece of writing (the Kintsugi philosophy, then
            the lineup, then the belt, then the line, then the date), not a
            single descriptive sentence. Stacked page-sub paragraphs with a
            little breathing room between them, same device TechniqueMap.jsx
            uses for its second header paragraph. */}
        <p className="page-sub">{t(T.merch.pageSubtitle, lang)}</p>
        <p className="page-sub" style={{ marginTop: "0.75rem" }}>{t(T.merch.pageIntroPhilosophy, lang)}</p>
        <p className="page-sub" style={{ marginTop: "0.75rem" }}>{t(T.merch.pageIntroLineup, lang)}</p>
        <p className="page-sub" style={{ marginTop: "0.75rem" }}>{t(T.merch.pageIntroBelt, lang)}</p>
        <p className="page-sub" style={{ marginTop: "0.75rem" }}>{t(T.merch.pageIntroTagline, lang)}</p>
        <p className="page-sub" style={{ marginTop: "0.75rem" }}>{t(T.merch.pageIntroDate, lang)}</p>
      </div>

      {/* ── Rashguards ───────────────────────────────────────────────────
          One design, two cuts, one colourway — so no picker and no swatches.
          The cards are otherwise the tee cards: same media ratio, same badge,
          same foot. Two grids that look like siblings read as one drop; two
          that look designed apart read as two shops. */}
      <section aria-labelledby="rg-heading">
        <h2 id="rg-heading" className="section-title" style={{ marginTop: 0 }}>
          {t(T.merch.rgSection, lang)}
        </h2>

        <div className="tee-grid">
          {RASHGUARDS.map((rg) => (
            <article className="card tee" key={rg.id}>
              <div className="tee__media">
                <img
                  className="tee__img"
                  src={rashguardImage(rg.id)}
                  alt={`${RASHGUARD_DESIGN} — ${t(T.merch[rg.cutKey], lang)} · ${t(T.merch.frontBack, lang)}`}
                  width="1200"
                  height="857"
                  loading="lazy"
                  decoding="async"
                />
                <span className="tee__badge">{t(T.merch.comingSoon, lang)}</span>
              </div>

              <div className="tee__body">
                <h3 className="tee__name">
                  {RASHGUARD_DESIGN} — {t(T.merch[rg.cutKey], lang)}
                </h3>
                <p className="tee__blurb">{t(rg.blurb, lang)}</p>
                {/* Sampling status sits under the blurb, not in the corner
                    badge: the badge is the drop date, and this is a second,
                    separate fact — the garment exists, and still can't be
                    bought. */}
                {rg.sampling && (
                  <p className="tee__note">
                    <span className="dot" aria-hidden="true" />
                    {t(T.merch.rgSamplingNote, lang)}
                  </p>
                )}
                <p className="tee__caption">{t(T.merch.frontBack, lang)}</p>

                <div className="tee__foot">
                  {/* "Target Price" rather than the cut, which the card's own
                      heading already says. The tee cards fill this slot with
                      swatches; here it carries the same label the gear grid
                      below uses, so the price never appears as a bare number
                      that could be read as a price you can pay. */}
                  <span className="tee__caption">{t(T.merch.priceLbl, lang)}</span>
                  <span className="tee__price">{rg.price} SGD</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Spec strip ───────────────────────────────────────────────── */}
        <h2 className="section-title">{t(T.merch.rgSpecsTitle, lang)}</h2>
        <dl className="spec-strip">
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.fabricLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.rgFabricVal, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.buildLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.rgBuildVal, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.priceLbl, lang)}</dt>
            <dd className="spec-strip__val spec-strip__val--accent">{t(T.merch.rgPriceBoth, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.availLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.availVal, lang)}</dd>
          </div>
        </dl>

        {/* ── Size chart ───────────────────────────────────────────────
            Long sleeve only: that is the cut the maker's sizing sheet covers.
            A real <table> with the sizes down the side, so it reads on a
            phone without sideways scrolling. Numbers live in
            data/rashguards.js and are printed in the reader's locale
            (64.5 in English, 64,5 in French). */}
        <div className="size-chart">
          <table className="size-chart__table">
            <caption className="size-chart__title">
              {t(T.merch.rgSizeTitle, lang)} — {t(T.merch.cutLs, lang)} · cm
            </caption>
            <thead>
              <tr>
                <th scope="col">{t(T.merch.rgSizeCol, lang)}</th>
                <th scope="col">{t(T.merch.rgSizeLength, lang)}</th>
                <th scope="col">{t(T.merch.rgSizeChest, lang)}</th>
              </tr>
            </thead>
            <tbody>
              {RASHGUARD_SIZES_LONG.map((row) => (
                <tr key={row.size}>
                  <th scope="row">{row.size}</th>
                  <td>{row.length.toLocaleString(lang === "pt" ? "pt-BR" : lang)}</td>
                  <td>{row.halfChest.toLocaleString(lang === "pt" ? "pt-BR" : lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="size-chart__notes">
            <p>{t(T.merch.rgSizeNote, lang)}</p>
            <p>{t(T.merch.rgSizeHowA, lang)}</p>
            <p>{t(T.merch.rgSizeHowB, lang)}</p>
          </div>
        </div>
      </section>

      {/* ── Tester feedback ──────────────────────────────────────────────
          Sits right under the rashguards because they are what is being
          tested; if later garments go out for trial, their reviews land here
          too (each card names its product). Data-driven from reviews.js — an
          empty list shows one honest line rather than a hidden section, and
          there are deliberately no stars: see the header of reviews.js. */}
      <section aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="section-title">{t(T.merch.reviewsTitle, lang)}</h2>
        <p className="page-sub" style={{ marginBottom: "1.25rem" }}>{t(T.merch.reviewsIntro, lang)}</p>

        {REVIEWS.length === 0 ? (
          <p className="reviews__empty">{t(T.merch.reviewsEmpty, lang)}</p>
        ) : (
          <div className="reviews-grid">
            {REVIEWS.map((r) => (
              <figure className="card review" key={r.id}>
                <p className="review__product">{r.product}</p>
                <blockquote className="review__quote" lang={r.lang}>
                  <p>{r.quote}</p>
                </blockquote>
                <figcaption className="review__who">
                  <span className="review__name">{r.name}</span>
                  {r.detail && <span className="review__detail">{r.detail}</span>}
                  <time className="review__detail" dateTime={r.date}>
                    {new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : lang, { dateStyle: "medium" }).format(new Date(r.date))}
                  </time>
                  {r.gifted && <span className="review__gifted">{t(T.merch.reviewsGifted, lang)}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* ── Shorts ───────────────────────────────────────────────────────
          Two products, not two variants of one — an outer 2-in-1 short with
          a compression liner built in, and the compression layer sold on its
          own. Different fabrics, so unlike the rashguard's shared spec line
          the two get their own fabric text, joined the way the rashguard's
          two prices already are. */}
      <section aria-labelledby="shorts-heading">
        <h2 id="shorts-heading" className="section-title">{t(T.merch.shortsSection, lang)}</h2>

        <div className="tee-grid">
          {SHORTS.map((s) => (
            <article className="card tee" key={s.id}>
              <div className="tee__media tee__media--shorts">
                <img
                  className="tee__img"
                  src={shortsImage(s.id)}
                  alt={`${s.name} · ${t(T.merch.frontBack, lang)}`}
                  width="1402"
                  height="609"
                  loading="lazy"
                  decoding="async"
                />
                <span className="tee__badge">{t(T.merch.comingSoon, lang)}</span>
              </div>

              <div className="tee__body">
                <h3 className="tee__name">{s.name}</h3>
                <p className="tee__blurb">{t(s.blurb, lang)}</p>
                <p className="tee__caption">{t(T.merch.frontBack, lang)}</p>

                <div className="tee__foot">
                  <span className="tee__caption">{t(T.merch.priceLbl, lang)}</span>
                  <span className="tee__price">{s.price} SGD</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Spec strip ───────────────────────────────────────────────── */}
        <h2 className="section-title">{t(T.merch.shortsSpecsTitle, lang)}</h2>
        <dl className="spec-strip">
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.fabricLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.shortsFabricVal, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.buildLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.shortsBuildVal, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.priceLbl, lang)}</dt>
            <dd className="spec-strip__val spec-strip__val--accent">{t(T.merch.shortsPriceBoth, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.availLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.availVal, lang)}</dd>
          </div>
        </dl>
      </section>

      {/* ── Gi ───────────────────────────────────────────────────────────
          One design, four colourways — all shown at once, same as the
          rashguards above and for the same reason: there's one design here,
          not several, so a picker would only hide three of the four
          photographs someone came to see.

          Its date is its own (giComingSoon / giAvailVal, Q2 2027) rather than
          the drop-wide Q1 strings every other section uses. */}
      <section aria-labelledby="gi-heading">
        <h2 id="gi-heading" className="section-title">{t(T.merch.giSection, lang)}</h2>

        <div className="tee-grid">
          {GI_COLOURWAYS.map((c) => (
            <article className="card tee" key={c.id}>
              <div className="tee__media tee__media--gi">
                <img
                  className="tee__img"
                  src={giImage(c.id)}
                  alt={`${GI_DESIGN} — ${t(T.merch.giColours[c.id], lang)} · ${t(T.merch.frontSideBack, lang)}`}
                  width="1402"
                  height="710"
                  loading="lazy"
                  decoding="async"
                />
                <span className="tee__badge">{t(T.merch.giComingSoon, lang)}</span>
              </div>

              <div className="tee__body">
                <h3 className="tee__name">
                  {GI_DESIGN} — {t(T.merch.giColours[c.id], lang)}
                </h3>
                <p className="tee__blurb">{t(T.merch.giBlurb, lang)}</p>
                {c.womensCut && <p className="tee__caption">{t(T.merch.giWomensCut, lang)}</p>}
                <p className="tee__caption">{t(T.merch.frontSideBack, lang)}</p>

                <div className="tee__foot">
                  {/* Same reasoning as the rashguard foot: "Target Price"
                      rather than a bare number, so it never reads as a price
                      you can actually pay. */}
                  <span className="tee__caption">{t(T.merch.priceLbl, lang)}</span>
                  <span className="tee__price">{t(T.merch.giPrice, lang)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Spec strip ───────────────────────────────────────────────── */}
        <h2 className="section-title">{t(T.merch.giSpecsTitle, lang)}</h2>
        <dl className="spec-strip">
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.fabricLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.giFabricVal, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.buildLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.giBuildVal, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.priceLbl, lang)}</dt>
            <dd className="spec-strip__val spec-strip__val--accent">{t(T.merch.giPrice, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.availLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.giAvailVal, lang)}</dd>
          </div>
        </dl>
      </section>

      {/* ── T-shirts ─────────────────────────────────────────────────────
          The colour picker belongs to this grid alone: the rashguards come in
          one colourway, so a shared control at the top of the page would have
          been half-dead the moment it was pressed. */}
      <section aria-labelledby="tees-heading">
        <h2 id="tees-heading" className="section-title">{t(T.merch.teesSection, lang)}</h2>
        <div className="tee-toolbar">
          <span className="field-label" id="colourway-label">
            {t(T.merch.colourLbl, lang)}
          </span>
          <div className="pill-row" role="group" aria-labelledby="colourway-label">
            {TEE_COLOURWAYS.map((c) => (
              <button
                key={c.id}
                type="button"
                className="pill tee-pill"
                aria-pressed={colourway === c.id}
                title={t(T.merch.colourAll, lang)}
                onClick={() => pickAll(c.id)}
              >
                <span className="tee-pill__dot" style={{ background: c.swatch }} aria-hidden="true" />
                {colourName(c.id)}
              </button>
            ))}
          </div>
        </div>

        <div className="tee-grid">
          {TEE_DESIGNS.map((design) => {
            const active = colourOf(design.id);
            return (
              <article className="card tee" key={design.id}>
                <div className="tee__media">
                  <img
                    className="tee__img"
                    src={teeImage(design.id, active)}
                    /* A middle dot rather than a full stop: the Japanese copy
                       ends its own sentences with 。 and a Latin period read
                       as a stray character between the two. */
                    alt={`${design.name} — ${colourName(active)} · ${t(T.merch.frontBack, lang)}`}
                    width="1412"
                    height="740"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="tee__badge">{t(T.merch.comingSoon, lang)}</span>
                </div>

                <div className="tee__body">
                  <h3 className="tee__name">{design.name}</h3>
                  <p className="tee__blurb">{t(design.blurb, lang)}</p>
                  <p className="tee__caption">{t(T.merch.frontBack, lang)}</p>

                  <div className="tee__foot">
                    {/* Each card's swatches are a radio group in behaviour, but
                        they're buttons: aria-pressed keeps the state audible
                        without the arrow-key semantics a radio group promises
                        and this row doesn't implement. */}
                    <div className="swatches" role="group"
                         aria-label={`${t(T.merch.colourLbl, lang)} — ${design.name}`}>
                      {TEE_COLOURWAYS.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          className="swatch"
                          aria-pressed={active === c.id}
                          aria-label={colourName(c.id)}
                          title={colourName(c.id)}
                          onClick={() => pickOne(design.id, c.id)}
                        >
                          <span className="swatch__dot" style={{ background: c.swatch }} />
                        </button>
                      ))}
                    </div>
                    <span className="tee__price">{t(T.merch.teePrice, lang)}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Spec strip ───────────────────────────────────────────────── */}
        <h2 className="section-title">{t(T.merch.specsTitle, lang)}</h2>
        <dl className="spec-strip">
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.fabricLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.fabricVal, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.rangeLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.rangeVal, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.priceLbl, lang)}</dt>
            <dd className="spec-strip__val spec-strip__val--accent">{t(T.merch.teePrice, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.availLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.availVal, lang)}</dd>
          </div>
        </dl>
      </section>

      {/* ── Belt ─────────────────────────────────────────────────────────
          One product, one photograph — all five adult ranks shot together,
          so a single card rather than the gi's per-colourway grid. Last of
          the apparel sections on purpose: it's the one piece nobody buys
          without already training, so it closes the list rather than
          competing with the rashguards or the tees for the top of the page. */}
      <section aria-labelledby="belt-heading">
        <h2 id="belt-heading" className="section-title">{t(T.merch.beltSection, lang)}</h2>

        <div className="tee-grid">
          <article className="card tee">
            <div className="tee__media tee__media--belt">
              <img
                className="tee__img"
                src={beltImage()}
                alt={`${BELT_NAME} — ${t(T.merch.beltRanks, lang)}`}
                width="1536"
                height="1024"
                loading="lazy"
                decoding="async"
              />
              <span className="tee__badge">{t(T.merch.comingSoon, lang)}</span>
            </div>

            <div className="tee__body">
              <h3 className="tee__name">{BELT_NAME}</h3>
              <p className="tee__blurb">{t(BELT_BLURB, lang)}</p>
              <p className="tee__caption">{t(T.merch.beltRanks, lang)}</p>

              <div className="tee__foot">
                <span className="tee__caption">{t(T.merch.priceLbl, lang)}</span>
                <span className="tee__price">{BELT_PRICE} SGD</span>
              </div>
            </div>
          </article>
        </div>

        {/* ── Spec strip ───────────────────────────────────────────────── */}
        <h2 className="section-title">{t(T.merch.beltSpecsTitle, lang)}</h2>
        <dl className="spec-strip">
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.fabricLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.beltFabricVal, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.buildLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.beltBuildVal, lang)}</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.priceLbl, lang)}</dt>
            <dd className="spec-strip__val spec-strip__val--accent">{BELT_PRICE} SGD</dd>
          </div>
          <div className="spec-strip__cell">
            <dt className="merch__spec-lbl">{t(T.merch.availLbl, lang)}</dt>
            <dd className="spec-strip__val">{t(T.merch.availVal, lang)}</dd>
          </div>
        </dl>
      </section>

      {/* ── Why ────────────────────────────────────────────────────────── */}
      <h2 className="section-title">{t(T.merch.pillarsTitle, lang)}</h2>
      <div className="grid-cards">
        {T.merch.pillars.map((p, i) => (
          <article className="card" key={i}>
            <h3 className="concept__title">{t(p.title, lang)}</h3>
            <p className="concept__body">{t(p.body, lang)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
