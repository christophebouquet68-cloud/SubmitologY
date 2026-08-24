import { useEffect, useState } from "react";
import { T, t } from "../i18n";
import { MERCH_PRODUCTS } from "../data/merch";
import { RASHGUARDS, RASHGUARD_DESIGN, rashguardImage } from "../data/rashguards";
import {
  DEFAULT_COLOURWAY,
  TEE_COLOURWAYS,
  TEE_DESIGNS,
  teeImage,
} from "../data/tshirts";

/** The shop, in two parts.
 *
 *  The first drop — rashguards, then t-shirts — has artwork, prices and a
 *  quarter, so it takes the top of the page with the largest cards. The wider
 *  gear range is real but undated, so it sits underneath as a smaller grid
 *  labelled "to be announced". Putting them in one flat grid, as the page once
 *  did, gave a shirt we can show and a gi we can't equal billing.
 *
 *  Rashguards lead, 2026-08-23. They were in the undated grid until artwork
 *  arrived; now they are the newest thing the brand can actually show, and the
 *  page should open with it. They were deleted from merch.js in the same
 *  change — listed in both places, the two entries would have drifted.
 */
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
        <p className="page-sub">{t(T.merch.pageSubtitle, lang)}</p>
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

      {/* ── The rest of the range ──────────────────────────────────────── */}
      <section aria-labelledby="gear-heading">
        <h2 id="gear-heading" className="section-title">{t(T.merch.gearTitle, lang)}</h2>
        <p className="page-sub" style={{ marginBottom: "1rem" }}>{t(T.merch.gearIntro, lang)}</p>

        <div className="merch-grid">
          {MERCH_PRODUCTS.map((p) => (
            <article className="card merch" key={p.id}>
              <div className="merch__top">
                <span className="merch__icon" aria-hidden="true">{p.icon}</span>
                <span className="merch__soon">{t(T.merch.tba, lang)}</span>
              </div>
              <h3 className="merch__name">{p.name}</h3>
              <p className="merch__spec">
                <span className="merch__spec-lbl">{t(T.merch.specLbl, lang)}</span>{p.spec}
              </p>
              <div className="merch__price-row">
                <span className="merch__spec-lbl">{t(T.merch.priceLbl, lang)}</span>
                <span className="merch__price">{p.price} SGD</span>
              </div>
            </article>
          ))}
        </div>

        <div className="note note--plain">
          <span className="dot" aria-hidden="true" />
          <span>{t(T.merch.gearNote, lang)}</span>
        </div>
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
