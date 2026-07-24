# SubmitologY — Brand Refresh (Merchandising + Mental Health + S&C + Technique Map)

This folder contains only the files that changed. Drop `src/App.js`, `src/i18n.js`,
and `public/index.html` into your existing project (overwriting the current
versions) and `npm start` / `npm run build` as usual — no other files, images,
or `node_modules` were touched. The build was verified locally with
`react-scripts build` (compiles cleanly, zero warnings).

## What changed, and why

### 0. Technique Map replaces the Techniques section
The "Techniques" nav item now shows an interactive relationship graph instead
of the old photo/video grid:
- 34 techniques across your taxonomy — Positions (Guards, Dominant Control),
  Transitions (Guard Passes, Sweeps, Escapes), Submissions (Chokes &
  Strangles, Joint Locks) — laid out by a small force-directed simulation
  computed once from static data (nodes repel, edges pull connected
  techniques together, each technique has a gentle pull toward its
  sub-category cluster).
- Click any technique to see its description and a clickable list of
  everything it connects to in the side panel, so you can walk a full chain
  (Closed Guard → Scissor Sweep → Mount → Armbar) without losing your place.
- Three filter chips (Positions / Transitions / Submissions) let you isolate
  just one type at a time.
- This is the same interaction model from the prototype you approved, now
  rebuilt as a proper React component (`TechniqueMap` in `App.js`) instead of
  a standalone file, with the layout math running once at module load — not
  on every render.
- 34 is a representative first pass, not the literal exhaustive list — see
  the note in my previous message about expanding coverage (Spider Guard,
  50/50, Darce, Heel Hook, etc.) once you're happy with the shape of this.

**The old Techniques page is fully preserved, just hidden.** The original
grid+filter+photo component was renamed `TechniquesLegacy` (nothing was
deleted) and there's a single flag near the top of `App.js`:

```js
const SHOW_LEGACY_TECHNIQUES = false; // set to true to restore the old grid view
```

Flip that to `true` and rebuild to get the old Techniques page back exactly
as it was — all its state, filters, and the `Card`/`Modal` photo/video
behaviour are untouched.

### 1. New "What's New?" nav item, top-right
A small button sits at the top-right of the nav bar, next to the language
selector — separated visually from the main section links since it's a
utility/status item rather than a content section. For now it just shows:
**"You're up to date!"** Swap in real changelog content in `T.whatsNew` in
`i18n.js` whenever you're ready to start using it for real updates.

### 2. Language coverage
All Technique Map and What's New UI chrome — page titles, filter labels, the
three type names, the legend, the empty-panel prompt, the "Connects to"
label, the footnote, and all 7 sub-category names — is translated into all 5
languages (EN/FR/JA/PT/RO). Technique names and descriptions themselves stay
English-only for now, consistent with how the original `SEED_TECHNIQUES` data
already works elsewhere in the site.

### 3. Everything from before is still in place
- Aubergine-black background, synaptic-violet mental-health accent, and the
  low-opacity synaptic-network background pattern.
- Nav order: Overview → Shop → Concepts → Techniques → Strength &
  Conditioning → Mental Health → About, plus the matching Overview hero CTAs.
- Strength & Conditioning program builder, "The Invitation" on About, mental
  health initiatives marked as planned from 2027, admin section removed,
  Merchandise launch-collection preview, sitewide mission banner.
- All 22 original technique photos/videos are untouched and still exist in
  the codebase (in `TechniquesLegacy` and `Modal`) — nothing was deleted.

## Suggested next steps
- Expand the Technique Map beyond the 34-technique first pass once you're
  happy with the shape (more guards, more submissions, etc.).
- Per the earlier discussion: consider small line-art pictograms in the
  detail panel per technique (not on the graph itself, to keep it legible) —
  happy to mock one up before you invest in a full icon set.
- Wire real content into "What's New?" — could reuse the same simple pattern
  as the other pages (a list of dated entries) whenever you have updates to
  publish.
