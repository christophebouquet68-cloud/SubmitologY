import { useRef } from "react";
import { createPortal } from "react-dom";
import { T, t } from "../i18n";
import { SIZE_GUIDES } from "../data/sizes";
import useFocusTrap from "../hooks/useFocusTrap";
import SizeDiagram from "./SizeDiagram";

/** ─── SizeGuideDialog ───────────────────────────────────────────────────────
 *  The size chart for one garment, in a dialog. Opened from the "Size guide"
 *  button on a shop card (pages/Shop.jsx).
 *
 *  WHY A DIALOG. Until 2026-10-05 the one chart the shop had — the long-sleeve
 *  rashguard's — sat open on the page under its spec strip. Five charts laid
 *  out that way would have been most of the page, and four of them irrelevant
 *  to whoever was reading. So each chart is one press away from the garment
 *  it belongs to, and the page stays the length it was.
 *
 *  The dialog borrows the search dialog's scrim and panel and the same focus
 *  hook: focus moves in, Tab stays in, Escape and a press on the scrim close
 *  it, and focus goes back to the button that opened it. Nothing here is
 *  hover-only, and the close button is a full 44px target.
 *
 *  A PORTAL, because a `position: fixed` scrim is only fixed to the viewport
 *  while no ancestor has a transform — and the shop cards have one on hover.
 *  Rendering into <body> takes the dialog out of that question for good.
 *
 *  The table is a real <table> with the sizes down the side, so it reads on a
 *  320px phone without scrolling sideways and a screen reader announces
 *  "M, body length, 69.5". Numbers are printed in the reader's locale.
 *
 *  Nothing in here sells anything: no "find your size", no stock, no button
 *  that goes anywhere but shut. A size chart is the strongest hint on the
 *  page that something can be ordered, and nothing can be yet.
 */
export default function SizeGuideDialog({ lang, guide, diagram, title, onClose }) {
  const panelRef = useRef(null);
  useFocusTrap(panelRef, { active: true, onClose });

  const chart = SIZE_GUIDES[guide];
  if (!chart) return null;

  const locale = lang === "pt" ? "pt-BR" : lang;
  const num = (v) => v.toLocaleString(locale);
  const top = chart.type === "top";

  return createPortal(
    <div className="dialog-scrim dialog-scrim--guide"
         onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dialog size-guide" role="dialog" aria-modal="true"
           aria-labelledby="size-guide-title" ref={panelRef} tabIndex={-1}>
        <div className="size-guide__head">
          <div>
            <p className="eyebrow eyebrow--gold size-guide__eyebrow">{t(T.merch.sizeGuide, lang)}</p>
            <h2 className="size-guide__title" id="size-guide-title">{title}</h2>
          </div>
          <button type="button" className="size-guide__close" onClick={onClose}
                  aria-label={t(T.ui.chrome.close, lang)}>✕</button>
        </div>

        <div className="size-guide__body">
          <div className="size-guide__figure">
            <SizeDiagram kind={diagram || chart.diagram} />
          </div>

          <table className="size-chart__table">
            <caption className="size-chart__title">
              {t(T.merch.sizeTitle, lang)} · cm
            </caption>
            <thead>
              <tr>
                <th scope="col">{t(T.merch.sizeCol, lang)}</th>
                <th scope="col">{t(top ? T.merch.sizeLength : T.merch.sizeWaist, lang)}</th>
                <th scope="col">{t(top ? T.merch.sizeChest : T.merch.sizeShortsLength, lang)}</th>
              </tr>
            </thead>
            <tbody>
              {chart.rows.map((row) => (
                <tr key={row.size}>
                  <th scope="row">{row.size}</th>
                  {top ? (
                    <>
                      <td>{num(row.length)}</td>
                      <td>{num(row.halfChest)}</td>
                    </>
                  ) : (
                    <>
                      <td>
                        {num(row.waist)}
                        {/* The maker's own inch figure, where the sheet gives
                            one. "in" is the unit symbol in every language
                            here, like "cm". */}
                        {row.waistIn != null && (
                          <span className="size-chart__alt"> · {num(row.waistIn)} in</span>
                        )}
                      </td>
                      <td>{num(row.length)}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="size-chart__notes">
            {chart.sharedNote && <p className="size-chart__shared">{t(T.merch.sizeBothCuts, lang)}</p>}
            <p>{t(top ? T.merch.sizeHowA : T.merch.sizeHowWaist, lang)}</p>
            <p>{t(top ? T.merch.sizeHowB : T.merch.sizeHowShortsLength, lang)}</p>
            <p>{t(T.merch.sizeNote, lang)}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
