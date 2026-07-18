# SubmitologY — Brand Refresh (Merchandising + Mental Health Mission)

This folder contains only the files that changed. Drop `src/App.js`, `src/i18n.js`,
and `public/index.html` into your existing project (overwriting the current
versions) and `npm start` / `npm run build` as usual — no other files, images,
or `node_modules` were touched. The build was verified locally with
`react-scripts build` (compiles cleanly, zero warnings).

## What changed, and why

### 0. Full color and background overhaul
- **Base background**: `#0a0d12` (navy-charcoal) → `#120e16` (aubergine-black).
  A near-black with a faint violet undertone, chosen specifically so the new
  mental-health accent (below) feels native to the palette instead of dropped
  on top of it, while orange still pops at maximum contrast against a
  purple-leaning dark.
- **Mental-health accent**: `#4cc9f0` (a teal that was being reused from the
  Guards technique category — a real collision, since a teal badge on a
  technique card and a teal mission callout read as the same signal) →
  `#8c7ae6`, a dedicated synaptic violet. It no longer shares a color with
  any technique category. `MH_ACCENT` is a single constant in `App.js`, so
  every mental-health-related UI element (banner, stat, donation box, Mission
  button, Mental Health page accents) updated from one change.
- **Surface and border tokens retinted to match**: card backgrounds
  (`#111` → `#16121a`), primary borders (`#1a1a1a` → `#241c2a`), nav
  background/border, the language-selector dropdown, and secondary borders
  all picked up the same violet undertone as the new base, so the whole site
  reads as one deliberate material rather than a neutral dark theme with a
  color dropped in.
- **Background graphic**: the old noise-grain texture (`Grain` component) is
  replaced by `SynapticField` — a low-opacity (5%), inline-generated
  node-and-line pattern (no image file, same technique as the grain it
  replaces: a data-URI SVG). This is a direct implementation of the brand
  deck's own "neural network and synaptic patterns as graphic elements"
  design language, now present sitewide rather than only described in copy
  on the Mental Health page. It's tuned faint enough to stay out of the way
  of technique photography and long-form text.
- Technique category colors (Guards, Submissions, Transitions, Takedowns,
  Dark BJJ) and difficulty colors are untouched.

### 1. "The Invitation" added to About
The closing statement from Business Proposal §12 (Conclusion) is now the
closing statement of the About page too — styled as a distinct, italicised
pull-quote with an orange left rule: *"We are not just building a gear
brand. We are building a community that trains hard, talks openly, and
submits to nothing except growth. Welcome to SubmitologY."* Translated into
all 5 languages.

### 2. Mental health initiatives marked as planned (not yet live)
Since the company hasn't launched yet, every concrete mental-health claim on
the site reads as a **planned commitment starting in 2027**, not an ongoing
activity — a disclaimer banner on the Mental Health page, "Planned from
2027" on the donation callout and all four Social Impact pillars, and
future-tense copy in the sitewide banner and homepage stat. Translated
across all 5 languages.

### 3. Admin section removed
The password-gated "Add Techniques" admin flow — nav lock/unlock buttons, the
password prompt, the form/JSON import screen, and the `ADMIN_PASSWORD`
constant — has been removed entirely. The technique list (`SEED_TECHNIQUES`)
is now static; to add or edit techniques going forward, edit that array
directly in `src/App.js`.

### 4. Merchandising is now front and centre
- Nav reordered: `Overview → Shop → Techniques → Concepts → Mental Health → About`.
- Merchandise page rebuilt from a placeholder into a real launch-collection
  preview pulling from the Business Proposal's §5.1 product table (Gi,
  Rashguards, Shorts, Spats, Belt — specs and SGD pricing, tagged "Coming
  Q1 2027"), plus the four brand pillars from §2.1. No product photos used.
- Overview hero's primary CTA is "Shop the Gear"; Techniques/Concepts are
  secondary CTAs.
- About page ends with a cross-link card to both the Shop and the Mission
  page.

### 5. Mental health made visible sitewide
- New "Mental Health" nav page (Business Proposal §3): the BJJ/mental-health
  thesis, the "1% for Mental Health" callout, the four Social Impact
  pillars, and the design-language rationale. A supportive note with the
  Samaritans of Singapore helpline (1-767) sits at the bottom.
- Site-wide mission banner under the nav on every page, linking to the
  Mental Health page.

### 6. Everything else
All 22 techniques, images, filtering, and the 5-language i18n system are
untouched and fully reused.

## Suggested next steps
- Swap the merch card icons for real product photography once samples arrive.
- Wire the "Notify Me at Launch" banner to an actual email capture.
- Once the company incorporates and the 1% donation programme goes live,
  update the "planned" language back to present tense.
- If you want the synaptic pattern even more pronounced on the Mental Health
  page specifically (vs. the flat 5% everywhere), that's a one-line change —
  just say the word.
