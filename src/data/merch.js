// ─── data/merch.js — the rest of the range ──────────────────────────────────
// The two rashguards left this list on 2026-08-23, once artwork and a quarter
// existed for them: they are part of the first drop now and live in
// data/rashguards.js. Deliberately not listed in both places — duplicated
// product data drifts, and the spec line here would have quietly disagreed
// with the spec strip there.
// Sourced from the Business Proposal §5.1 product range.
//
// These sit *below* the t-shirts on the shop page and carry no date. The
// t-shirts are the first drop and have a quarter attached to them; everything
// here is a stated intention, so the page labels it "to be announced" rather
// than implying a schedule that hasn't been committed to.
//
// Prices are ranges in SGD, written without a currency symbol — the page
// appends "SGD" so the unit is unambiguous for a regional audience.

export const MERCH_PRODUCTS = [
  { id: "gi",     name: "BJJ Gi (Adult)",           spec: "Pearl weave 350–450 GSM, IBJJF legal",      price: "120 – 160", icon: "🥋" },
  { id: "shorts", name: "No-Gi Shorts",             spec: "Stretch ripstop, 4-way stretch",           price: "65 – 85",   icon: "⚡" },
  { id: "spats",  name: "Spats / Compression",      spec: "Poly-spandex, full sublimation",           price: "60 – 75",   icon: "⚡" },
  { id: "belt",   name: "Belt",                     spec: "Cotton, custom woven label",               price: "25 – 35",   icon: "🎗️" },
];
