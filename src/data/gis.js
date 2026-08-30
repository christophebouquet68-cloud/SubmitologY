// ─── data/gis.js — the first drop, part three ───────────────────────────────
// One design, four colourways. Artwork lives in public/shop/tshirts/ alongside
// the tees and rashguards, as `gi-<colour>.jpg`, so the colour id is also the
// filename part — adding a colourway means dropping the file in and adding
// one entry here, and nothing in Shop.jsx changes.
//
// The gi joined the first drop on 2026-08-30: real photography exists now
// (front, side and back, all four colourways), so it sits between the
// rashguards and the t-shirts rather than in the undated "rest of the range"
// grid — and was removed from merch.js in the same change so the two entries
// don't drift apart, the same move the rashguards made on 2026-08-23.
//
// Unlike the tees, every colourway is shown at once rather than behind a
// picker: there is one design, not four, so there is nothing for a picker to
// switch between — it would just hide three of the four photographs someone
// came to see. The rashguard section makes the same choice for the same
// reason.

/** Design name stays in English, same reasoning as TEE_DESIGNS and
 *  RASHGUARD_DESIGN: it is a brand name, and translating it would make the
 *  collection harder to talk about. */
export const GI_DESIGN = "Kintsugi Gi";

/** `womensCut` marks the one colourway cut for women, called out in the card
 *  body under `T.merch.giWomensCut` rather than folded into the colour name —
 *  "Pink" stays a colour choice like the other three, not a separate product. */
export const GI_COLOURWAYS = [
  { id: "black" },
  { id: "blue" },
  { id: "pink", womensCut: true },
  { id: "white" },
];

/** public/ asset, so it goes through PUBLIC_URL to survive the "." homepage
 *  setting used for static hosting. */
export function giImage(colourId) {
  return `${process.env.PUBLIC_URL}/shop/tshirts/gi-${colourId}.jpg`;
}
