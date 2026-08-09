# Design revamp — 2026-08-09

What changed, why, and what is still open. Verified with `CI=true npm run build`
(compiles clean; 129 kB JS / 8 kB CSS gzipped).

---

## New files

| File | What it is |
|---|---|
| `src/components/Seam.jsx` | The kintsugi seam between sections |
| `src/fonts/Newsreader-Variable.woff2` | Body face, 74 KB, SIL OFL |
| `src/fonts/Newsreader-OFL.txt` | Licence — required to travel with the font |
| `src/fonts/IBMPlexMono-Regular.woff2` | Utility face, 21 KB, SIL OFL |
| `src/fonts/IBMPlexMono-Medium.woff2` | Utility face, 21 KB, SIL OFL |
| `src/fonts/IBMPlexMono-OFL.txt` | Licence |

Total added weight: **117 KB** of woff2, on top of Archivo's existing 40 KB.

---

## 1. Typography

**Georgia → Newsreader.** Georgia is a system default and reads like one.
Newsreader is a designed choice whose serif suits the "-ology" framing.

The source is variable on `opsz` + `wght`. The optical-size axis is
**instanced at 16 before subsetting** — the site only sets body text between
14 and 19 px, so a live `opsz` axis was 193 KB of payload nobody could see.
Pinning it gives 74 KB. Weight stays live at 200–600.

**System mono → IBM Plex Mono.** A laboratory register, which is the half of
the brand's stated "clinical, academic typography" the site had never cashed
in. Two static weights rather than the variable file, because this face only
ever sets `--fs-util` (12 px).

**Archivo is unchanged**, including the pinned `wdth` 108.

**Italics are gone.** Newsreader Italic subsets to a further 81 KB for two
pull quotes — poor value on the critical path. Without an italic file the
browser synthesises one by shearing glyphs, which is exactly what the
stylesheet already forbade for Archivo. Three declarations were converted to
weight contrast:

- `.thesis__text` — italic removed
- `.thesis__caption` — italic removed
- `.quote p` — italic → `font-weight: 500`
- `Story.jsx` mission statement — `fontStyle: "italic"` removed

To add italics back: subset `Newsreader-Italic[opsz,wght].ttf` the same way
and declare a second `@font-face` with `font-style: italic`.

**Japanese is unaffected.** Neither new face ships CJK, so the JP stack is
preserved in every fallback list and continues to fall through deliberately,
exactly as Archivo already does for headings.

## 2. Colour

`--bg` deepened `#120e16` → `#14111a`, so the new bone surface reads as a
lift rather than a hue shift. All three text tokens re-checked: `--text`
15.3:1, `--text-muted` 8.3:1, `--text-dim` 5.4:1. All still pass.

**New: the bone surface.** The site was one continuous dark field from header
to footer, which is why it read as undifferentiated however good the
individual sections were. A warm paper ground for editorial content gives the
scroll chapters.

**New: kintsugi gold.** The brand's central metaphor previously existed only
as pixels inside `logo512.png` — it had no token. Gold is for **seams and
hairlines only**: never a fill, never a button, never body copy. That role
separation is what stops it colliding with `--accent` orange, which is always
a fill and never a line.

**The finding that shaped the design:** none of the three brand colours
survive on paper. Gold is 1.8:1 on bone, orange 2.7:1, purple 1.9:1 — all
below AA, and gold below even the 3.0 floor for a non-text graphic. That is
why `.surface--bone` swaps the whole palette rather than just the background,
and why `--accent-on-bone`, `--mission-on-bone` and `--gold-on-bone` exist.
Semantics are unchanged: orange still means commerce, purple still means the
mental-health thread.

Run `tools/check-contrast.py` after touching any colour.

## 3. Layout

**`.chapter` + `.chapter__body`** — full-bleed sections inside the centred
1180 px `.main`. Two non-obvious details:

- `overflow-x: clip` on `.shell`, not `hidden`. The bleed uses `100vw`, which
  on desktop includes the scrollbar and would otherwise add a horizontal
  scrollbar of exactly that width. `hidden` would suppress it too, but it
  creates a scroll container, which silently breaks `position: sticky` on the
  header.
- The wrapper exists because `.home` is a flex column with a 2.5–3.75 rem
  gap. Bleeding the section directly would let that gap open a strip of ink
  between each seam and the chapter it belongs to.

**`Seam.jsx`** draws the fracture from a seeded PRNG — the same approach
already used for the technique-map layout — so a given `seed` always draws the
same break and it does not jitter between renders. Decorative, so
`aria-hidden` with no focusable child.

## 4. The logo crop

`.thesis__logo` had **two** things clipping it: `border-radius: 50%` on an
image whose corners are already transparent, and `object-fit: cover` scaling
it past the frame, which shaved the outer ring and the "Kintsugi for the Mind"
tagline. Now `object-fit: contain` at 104 px, uncropped. The artwork itself is
untouched.

## 5. Copy — all five languages

| Change | Key |
|---|---|
| New short hero body ending "A brand in the making … stay tuned." | `T.overview.heroBody` (new) |
| Shop lede: "Nothing is for sale yet" → "All coming up for you" | `T.merch.pageSubtitle` |
| SOS line reworded toward bystanders | `T.mh.supportNote` |

`T.overview.body1` was left in place rather than deleted, so reverting the
hero is a one-line change in `Home.jsx`.

`T.overview.logoCaption` already contained the kintsugi statement you wanted
kept — no change was needed.

`tools/make-og-card.py` had `--bg` hardcoded; updated to match. The card
renders the two taglines, which did not change, so **regenerating `og-card.png`
is optional** — do it whenever convenient.

---

## Still open

**1. Item 7 has no counterpart in the code.** "Five languages. No cookies, no
analytics, no third-party trackers" was mockup copy. The real footer has
`T.ui.footer.tagline` (about community) and `T.ui.footer.preLaunch`
("Pre-launch site — nothing is for sale yet"). Neither was touched.

**2. The crest field does not match the bone ground.** The logo's own field is
`#f2f0ea`, cooler and lighter than `--bone` `#e9e1d2`, so on the bone chapter
it reads as a label stuck on kraft paper. Two fixes:

- Set `--bone: #f2f0ea`. Every token's contrast *improves* (checked: text
  14.67, muted 7.51, dim 5.69, accent 5.46, mission 7.98, gold 4.71). But that
  value sits close to the cream-and-serif look that has become an AI-design
  cliché.
- Export a crest variant with a transparent field, so it takes whatever ground
  it sits on. This is the better long-term fix.

**3. The Shop page and Terms now disagree.** `data/legal.js` still has the
heading "Nothing is for sale yet", and `T.merch.notForSale` still states it on
the Shop page itself — deliberately, so the disclaimer survives the lede
change. If you want it gone everywhere, both need editing together; a shop
page implying availability while Terms denies it is the one version that is
actually a problem rather than a style choice.

**4. The SOS line lost its reader-facing clause.** The original opened *"If
you or someone you know is struggling, support is available"* — dropped
because the mockup had already stripped it. The page's only helpline reference
now addresses bystanders, so someone in distress has to work out the number is
for them too. A merged version keeps both:

> If you or someone you know is struggling, support is available — you can
> reach out to associations such as the Samaritans of Singapore (SOS)
> @ 1-767 · 24 hours.

**5. No `WhatsNew` entry was added** for this release. It needs five
languages and an ISO date; say the word.

---

## After unzipping

```bash
npm install
npm start
```

`.env.local` is gitignored and was never in the upload, so the signup form
will report "not connected" until you recreate it from `.env.example`.
See `SIGNUP-SETUP.md`.

---

# Part 2 — 2026-08-09 (second pass)

The first pass built the token system and the seam primitive but left the
visible design almost entirely untouched: `--gold` appeared five times in
1,340 lines and `.surface--bone` was used once. This pass builds the mockup.

Verified by `src/revampSmoke.test.js` — 9 tests, all passing. Run with
`CI=true npx react-scripts test --testPathPattern=revampSmoke --watchAll=false`.

## New: `src/components/HeroGraph.jsx`

The hero opens with the **real** technique map — the same 34 nodes, the same
edges, the same seeded layout the map page renders, imported from
`data/techmap.js`. Not a decorative stand-in. The site's most distinctive
asset used to sit one click away behind a promo card.

No animation. A drifting graph behind a headline is decoration for its own
sake and would fight the `prefers-reduced-motion` contract.

`.hero::after` paints a veil over the graph, weighted to the left where the
type sits. Without it, hero body copy would sit over cyan nodes at whatever
contrast the layout happened to produce — which is not a ratio anyone can
check. The veil and the type it protects are defined together in the
stylesheet on purpose.

## Hero type and stats

`titleLine1` is now weight 200 in `--text-muted`, `titleLine2` weight 800 in
`--text`. Two weights, one sentence — this is what Archivo's live weight axis
was being kept for. `.hero__accent` (orange, weight 300) is deleted; the
orange now lives on the primary CTA, where it means something.

The stats row is a `<dl>`, and **every number is derived**:

| Shown | Source |
|---|---|
| 34 | `Object.keys(TECHMAP_NODES).length` |
| 36 | `AGE_RANGES × LEVELS × PROGRAM_TYPES` |
| 5 | `LANGUAGES.length` |
| 1% | the pledge |

A hardcoded 34 becomes a lie the moment someone adds a technique.

## Taxonomy grid

Three cells, colour-barred from `TECH_TYPE_COLOR`. The type names and
descriptions already existed (`T.techmap.typePosition`, `T.about.typeDescs`)
so nothing was invented.

The eyebrow is the **count**, not a decorative 01 / 02 / 03. The map is not
evenly split — 11 positions, 12 transitions, 11 submissions — and that
asymmetry is real information. A sequence number would have said nothing.

## Tee lighting — what could not be done

The mockup showed the shirts on a lit ground with a cast shadow. **That is not
possible with the current artwork.** The PNGs are opaque plates whose
background is `#efece3`, within three levels of the white colourway
`#f1eee6`. There is no cutout to drop a shadow under, and removing the
background programmatically would eat the white shirt's edges.

What works on an opaque image is light, not shadow: an overhead vignette
(`multiply`) plus a separate highlight (`screen`, because multiply would
darken the highlight away), so the shirt reads as lit from above rather than
scanned flat. The plate/container colour match is a deliberate earlier
decision and is left intact.

**A real cast shadow needs new artwork** — renders exported on transparency,
or photographs of a made sample.

## Pledge and wordmark

`1%` moves to display size in Archivo — it is the whole claim. Purple only;
gold would dilute the one signal the Mission page reserves.

The capital `Y` in the header wordmark is gold, matching the crest. One
letter, so nothing depends on colour alone.

## Not done

The gold seam running through the word "Resilience" is **not** implemented.
It relied on a hard-stop gradient with `background-clip: text`, which breaks
at arbitrary line-wrap points and across five languages of differing word
length. The seam earns its place between sections, where it is structural.
Spending it a second time inside a word would be the accessory to remove.
