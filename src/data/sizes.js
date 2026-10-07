// ─── data/sizes.js — size charts ────────────────────────────────────────────
// One chart per garment that has one: the rashguard (one chart for both cuts,
// one for the men's fit and one for the women's),
// the two shorts, the t-shirt and the tank top. The gi and the belt have none
// yet — don't invent one, and don't let them borrow a chart from here.
//
// The numbers are our maker's size sheets, copied as supplied on 2026-10-05
// (the rashguard's were already here from 2026-10-02, in data/rashguards.js).
// Centimetres. The maker's own sheets are not shown: they carry the maker's
// name and other brands' artwork on the garments pictured, so the tables are
// retyped here and the measuring diagrams are redrawn as line drawings
// (components/SizeDiagram.jsx). Nothing in this file, or in the pictures, names
// the maker — keep it that way.
//
// Held as data rather than as pictures of tables so the charts can be read on
// a phone, translated, and printed in the reader's own number format (64.5 in
// English, 64,5 in French).
//
// A garment points at its chart with `sizeGuide: "<key>"` in its own data
// file, and Shop.jsx draws the "Size guide" button from that. A garment
// without the field gets no button.
//
// Two shapes of chart:
//   top     A = body length, B = half chest width
//   bottom  A = waist, B = length. `waistIn` is the maker's own inch figure,
//           given for the 2-in-1 shorts only — it is not computed here, and it
//           is not exactly cm ÷ 2.54, so don't "correct" it.

export const SIZE_GUIDES = {
  /** Long and short sleeve share this chart — the owner's word, 2026-10-05.
   *  `sharedNote` prints a line saying so, because someone who opens it from
   *  the short-sleeve card would otherwise wonder whether they got the right
   *  one. */
  rashguard: {
    type: "top",
    diagram: "long-sleeve",
    sharedNote: true,
    rows: [
      { size: "XS",  length: 64.5, halfChest: 40.5 },
      { size: "S",   length: 67,   halfChest: 43 },
      { size: "M",   length: 69.5, halfChest: 45.5 },
      { size: "L",   length: 72,   halfChest: 48 },
      { size: "XL",  length: 74.5, halfChest: 50.5 },
      { size: "2XL", length: 77,   halfChest: 53 },
      { size: "3XL", length: 79.5, halfChest: 55.5 },
      { size: "4XL", length: 82,   halfChest: 58 },
      { size: "5XL", length: 84.5, halfChest: 60.5 },
    ],
  },

  /** The women's cut — its own chart, from the maker's women's size sheet,
   *  copied as supplied on 2026-10-07: XS to 3XL, narrower in the chest than
   *  the men's at every size. The sheet is the long sleeve's; as with the
   *  men's, one chart stands for both cuts, so the short sleeve opens this
   *  too. Confirm with the maker if the short sleeve is cut differently. */
  "rashguard-women": {
    type: "top",
    diagram: "long-sleeve",
    sharedNote: true,
    rows: [
      { size: "XS",  length: 60.5, halfChest: 39 },
      { size: "S",   length: 63,   halfChest: 40.5 },
      { size: "M",   length: 65,   halfChest: 42 },
      { size: "L",   length: 67,   halfChest: 43 },
      { size: "XL",  length: 69.5, halfChest: 45 },
      { size: "2XL", length: 72,   halfChest: 47 },
      { size: "3XL", length: 74.5, halfChest: 49 },
    ],
  },

  tee: {
    type: "top",
    diagram: "short-sleeve",
    rows: [
      { size: "XS",  length: 64, halfChest: 44 },
      { size: "S",   length: 67, halfChest: 47 },
      { size: "M",   length: 70, halfChest: 50 },
      { size: "L",   length: 73, halfChest: 53 },
      { size: "XL",  length: 75, halfChest: 56 },
      { size: "2XL", length: 77, halfChest: 59 },
      { size: "3XL", length: 79, halfChest: 62 },
      { size: "4XL", length: 81, halfChest: 65 },
      { size: "5XL", length: 83, halfChest: 68 },
    ],
  },

  tank: {
    type: "top",
    diagram: "tank",
    rows: [
      { size: "XS",  length: 72, halfChest: 49 },
      { size: "S",   length: 74, halfChest: 51 },
      { size: "M",   length: 76, halfChest: 54 },
      { size: "L",   length: 78, halfChest: 57 },
      { size: "XL",  length: 80, halfChest: 60 },
      { size: "2XL", length: 82, halfChest: 63 },
      { size: "3XL", length: 84, halfChest: 66 },
      { size: "4XL", length: 86, halfChest: 69 },
      { size: "5XL", length: 88, halfChest: 71 },
    ],
  },

  "shorts-2in1": {
    type: "bottom",
    diagram: "shorts",
    rows: [
      { size: "XS",  waist: 70, waistIn: 27.5, length: 31.5 },
      { size: "S",   waist: 74, waistIn: 29,   length: 33 },
      { size: "M",   waist: 78, waistIn: 31,   length: 34.5 },
      { size: "L",   waist: 82, waistIn: 32,   length: 36 },
      { size: "XL",  waist: 86, waistIn: 34,   length: 37.5 },
      { size: "2XL", waist: 90, waistIn: 35,   length: 39 },
      { size: "3XL", waist: 94, waistIn: 37,   length: 40.5 },
    ],
  },

  /** The waist figures here are far smaller than the 2-in-1's (M is 63 against
   *  78). That is how the maker's sheet has them — presumably the compression
   *  fabric measured unstretched — and they are shown as supplied. If the
   *  maker confirms what the figure means, say it in the chart's notes rather
   *  than changing the numbers. */
  "shorts-compression": {
    type: "bottom",
    diagram: "compression-shorts",
    rows: [
      { size: "XS",  waist: 54, length: 36.5 },
      { size: "S",   waist: 58, length: 38.25 },
      { size: "M",   waist: 63, length: 40 },
      { size: "L",   waist: 68, length: 41.75 },
      { size: "XL",  waist: 73, length: 43.5 },
      { size: "2XL", waist: 78, length: 45.25 },
      { size: "3XL", waist: 83, length: 47 },
    ],
  },
};
