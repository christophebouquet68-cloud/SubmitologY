// ─── data/rashguards.js — the first drop, part one ──────────────────────────
// One design in two cuts. Artwork lives in public/shop/tshirts/ alongside the
// tees as `<id>.jpg`, built by tools/tees.py, so the folder holds everything
// the drop shows and the naming stays the lookup rather than a label.
//
// These moved up from merch.js on 2026-08-23. They used to sit in "the rest of
// the range" with a spec line, a price band and a "to be announced" badge,
// which was right while there was no artwork. There is artwork now, and a
// quarter, so they belong with the t-shirts — and were removed from merch.js
// in the same change rather than being listed in both places, where the two
// entries would drift apart.
//
// Prices are ranges in SGD and differ by cut, which is why they live per-item
// here rather than as one string like the tees' 30–50.

/** Design name stays in English, same reasoning as TEE_DESIGNS: it is a brand
 *  name, and translating it would make the collection harder to talk about.
 *  The cut label and the blurb are translated. */
export const RASHGUARD_DESIGN = "Kintsugi Fighter";

export const RASHGUARDS = [
  {
    id: "rashguard-long",
    cutKey: "cutLs",
    // Set 2026-09-30: the first physical long-sleeve pieces exist and are out
    // with testers. Shop.jsx prints T.merch.rgSamplingNote on the card while
    // this is true — drop the flag once sampling ends.
    sampling: true,
    price: "60 – 80",
    blurb: {
      en: "The kintsugi seam runs corner to corner across the body in gold, over an oversized S ghosted into the black. The wordmark runs down both sleeves; 金継ぎ sits at the back hem.",
      fr: "La couture kintsugi traverse le corps en diagonale, en or, par-dessus un S surdimensionné fondu dans le noir. Le logotype descend le long des deux manches ; 金継ぎ figure en bas du dos.",
      ja: "金継ぎの継ぎ目が、黒に沈めた大きなSの上を、金色で斜めに走ります。両袖にはワードマークを縦に配し、背面の裾には金継ぎの文字を入れています。",
      pt: "A emenda kintsugi atravessa o corpo na diagonal, em dourado, sobre um S superdimensionado esbatido no preto. O logotipo desce pelas duas mangas; 金継ぎ fica na barra das costas.",
      ro: "Cusătura kintsugi traversează corpul dintr-un colț în altul, în auriu, peste un S supradimensionat topit în negru. Logotipul coboară pe ambele mâneci; 金継ぎ stă la tivul din spate.",
    },
  },
  {
    id: "rashguard-short",
    cutKey: "cutSs",
    price: "55 – 75",
    blurb: {
      en: "The same design cut short in the sleeve, with the crest moved onto the cap. For warmer rooms, and for anyone who trains no-gi in the same shirt they warmed up in.",
      fr: "Le même design en manches courtes, le blason déplacé sur l'épaule. Pour les salles plus chaudes, et pour qui s'entraîne en no-gi avec le maillot de l'échauffement.",
      ja: "同じデザインの半袖仕様で、クレストは袖口に移しています。気温の高い道場向けに、そしてウォームアップのままノーギの練習に入る人のために。",
      pt: "O mesmo design em manga curta, com o brasão deslocado para a cava. Para salas mais quentes, e para quem treina no-gi com a mesma peça do aquecimento.",
      ro: "Același model cu mâneca scurtă, cu emblema mutată pe umăr. Pentru săli mai calde și pentru cine se antrenează no-gi în aceeași bluză cu care s-a încălzit.",
    },
  },
];

/** Size chart for the long sleeve, from the maker's sizing sheet (added
 *  2026-10-02). Centimetres. The sheet describes both as measured on the
 *  body: `length` is shoulder to waist, and `halfChest` is headed "1/2 chest"
 *  above an instruction to measure around the chest. Held as data rather than
 *  as the whole sheet so the table can be translated and read on a phone; the
 *  sheet's diagram is shown beside it. The short sleeve has no sheet yet —
 *  don't assume it shares these numbers. */
export const RASHGUARD_SIZES_LONG = [
  { size: "XS",  length: 64.5, halfChest: 40.5 },
  { size: "S",   length: 67,   halfChest: 43 },
  { size: "M",   length: 69.5, halfChest: 45.5 },
  { size: "L",   length: 72,   halfChest: 48 },
  { size: "XL",  length: 74.5, halfChest: 50.5 },
  { size: "2XL", length: 77,   halfChest: 53 },
  { size: "3XL", length: 79.5, halfChest: 55.5 },
  { size: "4XL", length: 82,   halfChest: 58 },
  { size: "5XL", length: 84.5, halfChest: 60.5 },
];

/** The measuring diagram from that same sheet (Risepect, our supplier),
 *  cropped to the garment: its A and B are the table's A and B columns.
 *  640×712, white ground as supplied. */
export const RASHGUARD_SIZE_DIAGRAM = `${process.env.PUBLIC_URL}/shop/tshirts/rashguard-size-guide.jpg`;

/** Same contract as teeImage(): the id is the filename, so a rename here
 *  silently changes which garment appears under which name. */
export function rashguardImage(id) {
  return `${process.env.PUBLIC_URL}/shop/tshirts/${id}.jpg`;
}
