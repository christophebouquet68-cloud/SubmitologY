// ─── data/tshirts.js — the first drop ───────────────────────────────────────
// Four designs, each rendered in three colourways. The artwork lives in
// public/shop/tshirts/ as `<design>-<colour>.png`, so the id fields below are
// also the filename parts: adding a colourway or a design means dropping the
// files in and adding an entry here, and nothing in Shop.jsx changes.
//
// Every render is a single wide image showing the front and the back side by
// side (1412 × 740). The card reserves that aspect ratio up front so the grid
// doesn't reflow as the images arrive.

/** Design names stay in English. They're brand names, like the technique
 *  names in techmap.js, and translating them would make the collection harder
 *  to talk about, not easier. The blurbs are translated. */
export const TEE_DESIGNS = [
  {
    id: "crest-team",
    name: "Team Crest",
    blurb: {
      en: "The full crest across the back in a single ink, with the small chest logo on the front. The plain, wear-it-anywhere version.",
      fr: "Le blason complet dans le dos en une seule encre, avec le petit logo sur la poitrine à l'avant. La version sobre, à porter partout.",
      ja: "背面にシングルインクで大きくクレストを配置し、前面には小さな胸ロゴ。どこにでも着ていけるシンプルなバージョンです。",
      pt: "O brasão completo nas costas em uma única tinta, com o pequeno logotipo no peito na frente. A versão sóbria, para usar em qualquer lugar.",
      ro: "Emblema completă pe spate, într-o singură cerneală, cu logo-ul mic pe piept în față. Versiunea sobră, de purtat oriunde.",
    },
  },
  {
    id: "crest-kintsugi",
    name: "Kintsugi Crest",
    blurb: {
      en: "The same crest, with the kintsugi seam picked out in gold — the break repaired in plain sight rather than hidden.",
      fr: "Le même blason, avec la couture kintsugi rehaussée d'or — la fracture réparée au grand jour plutôt que dissimulée.",
      ja: "同じクレストに、金継ぎの継ぎ目をゴールドで表現。割れを隠さず、あえて見えるかたちで修復しています。",
      pt: "O mesmo brasão, com a emenda kintsugi destacada em dourado — a quebra reparada à vista, e não escondida.",
      ro: "Aceeași emblemă, cu cusătura kintsugi evidențiată în auriu — ruptura reparată la vedere, nu ascunsă.",
    },
  },
  {
    id: "wordmark-team",
    name: "Team Wordmark",
    blurb: {
      en: "The wordmark set large across the back with both taglines beneath it. Quieter than the crest, and the easier one to wear off the mats.",
      fr: "Le logotype en grand dans le dos, avec les deux slogans en dessous. Plus discret que le blason, et plus facile à porter en dehors du tatami.",
      ja: "背面に大きくワードマークを配置し、その下に2つのタグラインを添えたデザイン。クレストより控えめで、道場の外でも着やすい一枚です。",
      pt: "O logotipo em grande nas costas, com as duas frases abaixo. Mais discreto que o brasão e mais fácil de usar fora do tatame.",
      ro: "Logotipul mare pe spate, cu ambele sloganuri dedesubt. Mai discret decât emblema și mai ușor de purtat în afara sălii.",
    },
  },
  {
    id: "wordmark-kintsugi",
    name: "Kintsugi Wordmark",
    blurb: {
      en: "The back wordmark broken by a gold kintsugi seam running straight through the letters.",
      fr: "Le logotype dorsal traversé par une couture kintsugi dorée qui passe à travers les lettres.",
      ja: "背面のワードマークを、金継ぎの金色の継ぎ目が文字を貫くように走るデザイン。",
      pt: "O logotipo nas costas atravessado por uma emenda kintsugi dourada que corta as letras.",
      ro: "Logotipul de pe spate străbătut de o cusătură kintsugi aurie care trece prin litere.",
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
  return `${process.env.PUBLIC_URL}/shop/tshirts/${designId}-${colourId}.png`;
}
