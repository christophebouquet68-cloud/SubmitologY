// ─── data/reviews.js — feedback from the people wearing the samples ────────
// Added 2026-09-30, when the first Kintsugi Fighter rashguard samples went out
// for trial. The Shop page renders these under the rashguards; with the list
// empty it shows a one-line "nothing published yet" instead, so the section
// is honest from day one rather than waiting for a first review to appear.
//
// HOW TO ADD ONE: copy the commented example below, fill it in, rebuild and
// redeploy. Nothing in Shop.jsx changes — same contract as tshirts.js.
//
// Rules this file exists to keep (they are the site's honesty rules applied
// to reviews):
//   • Real words from a real person who actually wore the sample. Trim for
//     length if you must, but never reword — the quote is theirs.
//   • Ask before publishing, and publish only the name they agree to (first
//     name + initial is plenty). No photos of faces without the same yes.
//   • `gifted: true` whenever the item was given free. The page then prints a
//     "Sample provided free of charge for testing" line under the quote —
//     Singapore's advertising guidelines expect a free product behind a
//     review to be disclosed, and a reader deserves to know either way.
//   • Keep the critical ones. "Collar rubs after an hour" is worth more to a
//     reader — and to the product — than another "love it".
//   • No star ratings. An average of a handful of testers who got the garment
//     for free would read as a verdict it isn't; words don't.
//
// `quote` stays in the language the tester wrote it in (`lang` sets the HTML
// lang attribute so screen readers pronounce it correctly). Translating
// someone's words would be putting words in their mouth. `product` and
// `detail` are free text, English, like technique and design names.

/**
 * @typedef {Object} Review
 * @property {string}  id       Unique and stable, e.g. "2026-10-alex-rg-long".
 * @property {string}  product  What they tested, as shown on the shop page.
 * @property {string}  name     The name they agreed to publish.
 * @property {string} [detail]  Optional context, e.g. "Blue belt · trains 4×/week".
 * @property {string}  date     ISO date (YYYY-MM-DD) the feedback was given.
 * @property {string}  lang     "en" | "fr" | "ja" | "pt" | "ro" — language of the quote.
 * @property {string}  quote    Their words.
 * @property {boolean} gifted   true if the sample was given free of charge.
 */

/** Newest first. @type {Review[]} */
export const REVIEWS = [
  // {
  //   id: "2026-10-alex-rg-long",
  //   product: "Kintsugi Fighter — Long sleeve",
  //   name: "Alex T.",
  //   detail: "Blue belt · trains 4×/week",
  //   date: "2026-10-12",
  //   lang: "en",
  //   quote: "Three weeks of rolling and two cold washes: no fading on the gold seam, and the sleeves stayed put. Neck is a touch tight.",
  //   gifted: true,
  // },
];
