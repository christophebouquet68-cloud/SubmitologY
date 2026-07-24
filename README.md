# SubmitologY — Brand Refresh (Merchandising + Mental Health + S&C + Technique Map)

This folder contains only the files that changed *and* any new asset the code
now depends on. Drop `src/App.js`, `src/i18n.js`, and `public/index.html` into
your existing project (overwriting the current versions), and also add
`public/logo512.png` if it isn't already there — the Overview page references
it directly. Then `npm start` / `npm run build` as usual. Verified locally
with `react-scripts build` (compiles cleanly, zero warnings).

## What changed, and why

### 0. Removed outdated "takedowns" mention on About
The intro paragraph now reads: *"SubmitologY is a structured BJJ knowledge
base built to help practitioners of all levels explore positions,
submissions and transitions, in an organised, visual way."* — dropping
"takedowns," which isn't a category in the Technique Map. Updated in all 5
languages.

### 1. "Built with React..." footer line removed
The small "Built with React · Images via Unsplash · Video links via YouTube"
line under the Categories section on the About page is gone.

### 2. About page second paragraph updated
Now reads: *"Explore techniques in a unique way using our interactive BJJ
map, guiding you through various inter-related techniques in an intuitive
way."* Translated across all 5 languages.

### 3. About page "Categories Explained" matches the Technique Map
Lists exactly the map's three top-level types — **Positions**,
**Transitions**, **Submissions** — colored with the same scheme used in the
Technique Map's "Show" filter chips (`TECH_TYPE_COLOR`).

### 4. Logo caption beside the logo, not below it
The small italic kintsugi caption sits to the right of the circular logo.

### 5. "New — Interactive" → "Interactive !"
The highlight banner tag on the Technique Map callout, in all 5 languages.

### 6. Logo + kintsugi caption next to the brand thesis
The "SubmitologY... double meaning" pull-quote sits in a two-column row with
the circular logo (`public/logo512.png`) and its caption on the right.

### 7. Overview page reflects the Technique Map, not the old grid
The clickable category rectangles and highlight banner are computed
directly from the Technique Map data (`TECHMAP_SUBCATS`,
`TECHMAP_SUBCAT_COUNT`, `TECHMAP_SUBCAT_TYPE`) — nothing hardcoded.

### 8. Technique Map replaces the Techniques section
- 34 techniques across Positions, Transitions, and Submissions, laid out by
  a force-directed simulation computed once at module load.
- **The old Techniques page is fully preserved, just hidden.** Renamed
  `TechniquesLegacy`, nothing deleted. Flip the flag near the top of
  `App.js` to restore it:
  ```js
  const SHOW_LEGACY_TECHNIQUES = false; // set to true to restore the old grid view
  ```

### 9. "What's New?" nav item, top-right
Sits next to the language selector. Currently shows "You're up to date!" —
real content goes in `T.whatsNew` in `i18n.js` whenever you're ready.

### 10. Everything else from before is still in place
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
