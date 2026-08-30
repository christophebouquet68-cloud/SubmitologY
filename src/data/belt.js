// ─── data/belt.js — the first drop, part five ───────────────────────────────
// One product, one photograph: all five adult ranks shot together rather than
// per-colour files, so there's a single image rather than a colourway array
// like gis.js. Joined the first drop on 2026-08-30, same as the shorts, and
// was removed from merch.js in the same change — its price changed at the
// same time, from the old undated 25–35 SGD to a first-drop 40–60 SGD.

export const BELT_NAME = "Kintsugi Belt";

export const BELT_PRICE = "40 – 60";

export const BELT_BLURB = {
  en: "All five adult ranks — white, blue, purple, brown and black — in one cotton weave, each with the woven SubmitologY label and a gold thread wrapped at the tip.",
  fr: "Les cinq grades adultes — blanc, bleu, violet, marron et noir — dans un même tissage coton, chacune avec l'étiquette tissée SubmitologY et un fil doré enroulé à l'extrémité.",
  ja: "白帯・青帯・紫帯・茶帯・黒帯という成人の5階級すべてを、同じコットン織りで展開。それぞれにSubmitologYの織りネームと、先端に巻かれた金色の糸を添えています。",
  pt: "As cinco faixas adultas — branca, azul, roxa, marrom e preta — na mesma trama de algodão, cada uma com a etiqueta tecida SubmitologY e um fio dourado enrolado na ponta.",
  ro: "Toate cele cinci centuri pentru adulți — albă, albastră, mov, maro și neagră — în aceeași țesătură de bumbac, fiecare cu eticheta țesută SubmitologY și un fir auriu înfășurat la vârf.",
};

/** public/ asset, so it goes through PUBLIC_URL to survive the "." homepage
 *  setting used for static hosting. */
export function beltImage() {
  return `${process.env.PUBLIC_URL}/shop/tshirts/belt.jpg`;
}
