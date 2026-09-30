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

/** Same contract as teeImage(): the id is the filename, so a rename here
 *  silently changes which garment appears under which name. */
export function rashguardImage(id) {
  return `${process.env.PUBLIC_URL}/shop/tshirts/${id}.jpg`;
}
