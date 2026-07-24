# SubmitologY — Brand Refresh (Merchandising + Mental Health + S&C + Technique Map)

This folder contains only the files that changed. Drop `src/App.js`, `src/i18n.js`,
and `public/index.html` into your existing project (overwriting the current
versions) and `npm start` / `npm run build` as usual — no other files, images,
or `node_modules` were touched. The build was verified locally with
`react-scripts build` (compiles cleanly, zero warnings).

## What changed, and why

### 0. Stat row removed, brand thesis moved up
The "3 Categories · 7 Sub-categories · 34 Techniques Mapped · 1%" stat row
is gone. In its place, right under the CTA buttons, is the second hero
paragraph — the "SubmitologY... double meaning" brand-thesis statement —
now styled as a distinct pull-quote (violet left rule, italic) instead of
sitting as plain body text above the buttons. The first hero paragraph
(business description) stays in the hero as before. The highlight banner
and the sub-category grid below are unchanged.

### 1. Overview page reflects the Technique Map, not the old grid
The clickable category rectangles are computed directly from the Technique
Map data itself — nothing hardcoded:

```js
TECHMAP_SUBCATS        // 7 distinct sub-categories (guard, dominant, guardPass, …)
TECHMAP_SUBCAT_COUNT   // per-subcategory technique counts, e.g. guard: 6, choke: 6
TECHMAP_SUBCAT_TYPE    // which top-level type (position/transition/submission) each belongs to
```

If you add or remove techniques from `TECHMAP_NODES` later, the grid updates
automatically — there's nothing to keep in sync by hand.

- **Highlight banner**, between the hero and the category grid: an
  orange-accented, clickable card tagged "New — Interactive" that reads
  "Explore the Technique Map" with a one-line pitch and an "Open the Map →"
  CTA.
- **Category grid** lists the map's 7 actual sub-categories — Guards,
  Dominant Control, Guard Passes, Sweeps, Escapes, Chokes & Strangles, Joint
  Locks — each showing its real technique count and colored by its parent
  type (teal for Positions, orange for Transitions, red for Submissions),
  instead of the old Guards/Submissions/Transitions/Takedowns/Dark BJJ
  taxonomy. All still link to the Techniques page.
- All new copy translated across all 5 languages.

### 2. Technique Map replaces the Techniques section
- 34 techniques across Positions (Guards, Dominant Control), Transitions
  (Guard Passes, Sweeps, Escapes), and Submissions (Chokes & Strangles, Joint
  Locks), laid out by a force-directed simulation computed once at module
  load. Click a technique to see its description and connections.
- **The old Techniques page is fully preserved, just hidden.** Renamed
  `TechniquesLegacy`, nothing deleted. Flip the flag near the top of
  `App.js` to restore it:
  ```js
  const SHOW_LEGACY_TECHNIQUES = false; // set to true to restore the old grid view
  ```

### 3. "What's New?" nav item, top-right
Sits next to the language selector, separated from the main section links.
Currently shows "You're up to date!" — real content goes in `T.whatsNew` in
`i18n.js` whenever you're ready.

### 4. Everything else from before is still in place
Aubergine-black background, synaptic-violet mental-health accent, synaptic
background pattern, nav order (Overview → Shop → Concepts → Techniques →
Strength & Conditioning → Mental Health → About), Strength & Conditioning
program builder, "The Invitation" on About, mental health initiatives marked
as planned from 2027, admin section removed, Merchandise launch-collection
preview, sitewide mission banner. All 22 original technique photos/videos
are untouched in `TechniquesLegacy` and `Modal`.

## Suggested next steps
- Expand the Technique Map beyond the 34-technique first pass.
- Consider small line-art pictograms in the technique detail panel.
- Wire real content into "What's New?" when you have updates to publish.
