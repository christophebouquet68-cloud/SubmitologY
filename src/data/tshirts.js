// ─── data/tshirts.js — the first drop ───────────────────────────────────────
// One print, two garments, three colourways. The artwork lives in
// public/shop/tshirts/ as `<design>-<colour>.jpg`, so the id fields below are
// also the filename parts: adding a colourway or a design means dropping the
// files in and adding an entry here, and nothing in Shop.jsx changes.
//
// Every image shows the front and the back side by side at 1200 × 857 (7:5).
// The card reserves that ratio up front so the grid doesn't reflow as the
// images arrive.
//
// PNG → JPG, 2026-08-23. These were flat vector renders — a shirt outline with
// the artwork placed on it, on a cream plate — and are now photographic
// mockups, built by tools/tees.py from tools/tee-src/. Still a render rather
// than a photograph of a garment that exists, so the shop's oldest open gap is
// narrowed rather than closed, but it is the first thing on the page that
// reads as a product instead of a diagram.
//
// Team Crest only, 2026-10-03. The range was four designs; the Kintsugi Crest
// and both Wordmarks are out of the shop for the time being, and a tank top in
// the Team Crest print has joined. The removed entries are not commented out
// below — a commented-out product is one stray keystroke from being back on
// the page — they are in git history, with their images, if the designs return.
//
// The tank top's dark blue and jet black images are a step further from a
// photograph than the rest: only a white mockup exists, and the other two are
// recolours of it (tools/tank-colourways.py). Replace them when real mockups
// arrive; the filenames stay the same.

/** Design names stay in English. They're brand names, like the technique
 *  names in techmap.js, and translating them would make the collection harder
 *  to talk about, not easier. The blurbs are translated. */
export const TEE_DESIGNS = [
  {
    id: "crest-team",
    name: "Team Crest T-Shirt",
    blurb: {
      en: "The full crest across the back, set between SUBMITOLOGY and BJJ TEAM, with the small crest on the chest. Plain enough to wear anywhere.",
      fr: "Le blason complet dans le dos, entre SUBMITOLOGY et BJJ TEAM, avec le petit blason sur la poitrine. Assez sobre pour se porter partout.",
      ja: "背面にはSUBMITOLOGYとBJJ TEAMの文字の間に大きなクレスト、前面の胸には小さなクレスト。どこにでも着ていけるシンプルな一枚です。",
      pt: "O brasão completo nas costas, entre SUBMITOLOGY e BJJ TEAM, com o pequeno brasão no peito. Sóbria o bastante para usar em qualquer lugar.",
      ro: "Emblema completă pe spate, între SUBMITOLOGY și BJJ TEAM, cu emblema mică pe piept. Destul de sobru pentru a fi purtat oriunde.",
    },
  },
  {
    // Same print, different garment — so it is its own entry, not a fourth
    // colourway. The id keeps the `crest-team` prefix so the files sort next
    // to the tee's and the print they share is obvious from the name.
    //
    // It has no price or spec of its own on purpose: the owner confirmed on
    // 2026-10-03 that the tank shares the tee's price band, fabric and date,
    // so it reads them from the same strings the tee does.
    id: "crest-team-tank",
    name: "Team Crest Tank Top",
    blurb: {
      en: "The same Team Crest print, front and back, on a sleeveless cut. For hot days, the weights room and the walk home.",
      fr: "Le même imprimé Team Crest, devant et dans le dos, sur une coupe sans manches. Pour les journées chaudes, la salle de musculation et le retour à la maison.",
      ja: "Team Crestと同じプリントを前後に配した、ノースリーブのカット。暑い日にも、ウェイトトレーニングにも、帰り道にも。",
      pt: "A mesma estampa Team Crest, na frente e nas costas, em um corte sem mangas. Para os dias quentes, a sala de musculação e a volta para casa.",
      ro: "Același imprimeu Team Crest, față și spate, într-o croială fără mâneci. Pentru zilele călduroase, sala de forță și drumul spre casă.",
    },
  },
];

/** `swatch` is only the dot in the picker — it approximates the garment so the
 *  choice is legible before the image loads. It is not a spec value. */
export const TEE_COLOURWAYS = [
  { id: "white", swatch: "#f1eee6" },
  { id: "navy",  swatch: "#1d2b45" },
  { id: "black", swatch: "#15141a" },
];

export const DEFAULT_COLOURWAY = "white";

/** public/ asset, so it goes through PUBLIC_URL to survive the "." homepage
 *  setting used for static hosting. */
export function teeImage(designId, colourId) {
  return `${process.env.PUBLIC_URL}/shop/tshirts/${designId}-${colourId}.jpg`;
}
