// ─── data/shorts.js — the first drop, part four ─────────────────────────────
// Two products, not one design in two variants: the shorts and the
// compression shorts are different garments (an outer ripstop short with a
// built-in compression liner, and a standalone compression short/spat), not a
// cut of the same thing the way the rashguard's long and short sleeve are.
// They keep separate fabric specs for that reason even though they share one
// spec strip and one section, the same way the rashguards share one strip
// with a combined price line.
//
// Both joined the first drop on 2026-08-30, alongside the belt — real
// photography exists for all three now — and were removed from merch.js in
// the same change. `id` is the filename part in public/shop/tshirts/.

export const SHORTS = [
  {
    id: "shorts-2in1",
    name: "Kintsugi NoGi Shorts",
    price: "65 – 85",
    blurb: {
      en: "A 2-in-1 build: stretch ripstop shorts with a compression liner sewn in, so there's nothing separate to put on underneath. The kintsugi seam runs from waist to hem in gold; 金継ぎ sits on the back hem.",
      fr: "Une construction 2-en-1 : un short en ripstop stretch avec une doublure de compression cousue à l'intérieur, sans rien à enfiler séparément. La couture kintsugi descend en or de la ceinture à l'ourlet ; 金継ぎ figure en bas du dos.",
      ja: "アウターとインナーが一体化した2-in-1構造。ストレッチリップストップのショーツに、コンプレッションライナーを内蔵しているため、下に別のインナーを着る必要がありません。金継ぎの継ぎ目がウエストから裾まで金色で走り、背面の裾には金継ぎの文字を入れています。",
      pt: "Uma construção 2 em 1: short em ripstop com elastano, com um forro de compressão costurado por dentro, então não há nada separado para vestir por baixo. A emenda kintsugi desce em dourado da cintura até a barra; 金継ぎ fica na barra das costas.",
      ro: "O construcție 2-în-1: pantaloni scurți din ripstop elastic, cu un strat de compresie cusut în interior, așa că nu mai e nevoie de nimic separat pe dedesubt. Cusătura kintsugi coboară în auriu de la talie până la tiv; 金継ぎ stă la tivul din spate.",
    },
  },
  {
    id: "shorts-compression",
    name: "Kintsugi NoGi Compression Shorts",
    price: "60 – 75",
    blurb: {
      en: "The compression layer on its own, for anyone who already has an outer short or trains no-gi in spats alone. Same poly-spandex build, same gold seam, same 金継ぎ at the back hem.",
      fr: "La couche de compression seule, pour qui possède déjà un short extérieur ou s'entraîne en no-gi en spats seuls. Même construction poly-élasthanne, même couture dorée, même 金継ぎ au bas du dos.",
      ja: "アウターショーツを別にお持ちの方、またはスパッツのみでノーギの練習をする方向けに、コンプレッションレイヤー単体でも展開。素材・金色の継ぎ目・背面裾の金継ぎ文字は同仕様です。",
      pt: "A camada de compressão isolada, para quem já tem um short externo ou treina no-gi só de spat. Mesma construção em poliéster-elastano, mesma emenda dourada, mesmo 金継ぎ na barra das costas.",
      ro: "Doar stratul de compresie, pentru cine are deja un pantalon scurt exterior sau se antrenează no-gi doar în colanți. Aceeași construcție poliester-elastan, aceeași cusătură aurie, același 金継ぎ la tivul din spate.",
    },
  },
];

/** Same contract as teeImage() / rashguardImage(): the id is the filename, so
 *  a rename here silently changes which garment appears under which name. */
export function shortsImage(id) {
  return `${process.env.PUBLIC_URL}/shop/tshirts/${id}.jpg`;
}
