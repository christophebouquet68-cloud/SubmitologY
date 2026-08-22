# Design notes — the photographic system

**2026-08-22.** Reference: atosjiujitsuhq.com. Content unchanged — no copy, no
i18n keys, no `legal.js`, no new dependencies. 43/43 tests still pass.

---

## What changed and why

The site had one image on the home page and it was the logo. Everything else
was drawn: the technique graph, the belt rail, the 46 exercise figures, the
kintsugi seam. All of it more considered than the reference site's visuals —
and none of it a person. **The gap was inventory, not craft.**

Seven photographs closed it. This is what was built on top of them.

Second, measurable problem: `.main` is 1180px and page content occupied its
left ~60%. Every page header had an empty right column. Six structural moves
address that; the photographic system sits on top of them.

---

## The rule — colour vs duotone

**Colour** where the photograph *is* the content: the hero, the story split,
product cards.
**Duotone** (`#08080A → #E9E1D2`, contrast +12%) wherever type sits on top of
it.

Duotone compresses the mid-tones so white type separates from the image, and
it stops the gi blue (`#02225F`) and gi pink (`#B59492`) competing with
`--accent` orange. One decision solves legibility and the accent clash at once.

**Rhythm:** never two colour photo bands adjacent, never two duotones. On Home:

| Band | Frame | Treatment |
|---|---|---|
| Hero | 01 back crest | Colour |
| Stat strip | — | Flat |
| Seam | 03 fist bump | Duotone |
| Story split | 06 trio + bone chapter | Colour |
| Taxonomy | — | Flat |
| Technique band | 02 grip + live map | Duotone |
| Site index | — | Flat |
| Shop band | — | Orange |

Every photographic band is separated from the next by something that is not a
photograph. That is what stops the page reading as a gallery.

The treatments are **baked into the files**, not applied with a CSS filter: a
filter on a full-bleed background repaints on every scroll frame, and it cannot
reach `og:image`. `tools/photo.py` regenerates the whole set from
`tools/photo-src/`.

---

## The six structural moves

1. **Full-bleed bands.** New `.band` / `.band__in` primitive using the same
   `100vw` + negative-inline-margin escape as `.chapter`, held by
   `.shell { overflow-x: clip }`. Section padding 56–80px → `clamp(3rem, 7vw,
   6.5rem)`.
2. **Display scale.** `--fs-hero` 4.25rem → 6.5rem max; `--fs-h2` 2 → 3.4rem;
   `--fs-h3` 1.25 → 1.75rem. Page titles, section titles and band titles are
   uppercase at weight 900, tracking −0.04em.
3. **Buttons.** 44px → 52px min-height, uppercase, tracking 0.05 → 0.12em,
   radius 6px → 2px. `.btn--lg` at 54px for hero and band CTAs.
4. **Hero has a floor.** `min(88vh, 780px)`, and the stat row is lifted out of
   the hero box into a full-width `.statstrip` on a gold hairline.
5. **Nav dropdowns are panels.** `.nav__group` goes static so `.nav__menu`
   positions against `.nav`; auto-fit columns, names in caps. Zero new strings
   — `DESTINATIONS` already carried a name and a description per section,
   already translated into five languages.
6. **Orange owns one surface per page.** `.band--orange` on Home, pointing at
   the shop. Never on Mission, where the purple thread has to stay uncontested.

---

## New: the photographic seam

`.photoseam` — frame 03 cropped to 32:9 and duotoned, doing the job the drawn
kintsugi seam does elsewhere. It carries no type, so it costs nothing in
legibility; it repeats between chapters without becoming the subject; and it is
the one frame in the set that is purely about two people agreeing to train.

`Seam.jsx` is unchanged and is still the default — on the bone chapter, where a
photograph would break the paper ground, and on every page that has to load
light.

---

## Colour

One new token: **`--ink: #08080A`**, used only behind full-bleed imagery.
Photographs on `--bg` (`#14111A`, warm aubergine) read as tinted. The value came
from sampling the supplied frames: the mat and walls are *warm* neutral
(`#4E4740`, `#716459`), which is why this is a near-neutral black rather than
the cooler `#0B0D12` originally proposed.

Registered in `tools/check-contrast.py`. All existing text tokens clear AA on
it — `--text` 16.4:1, `--text-muted` 8.9:1, `--text-dim` 5.8:1.

The gold seam on the crest in frame 01 samples ≈`#B8933F`, which is what
`--gold` (`#D4A03C`) already was. The token is validated by the garment.

**Contrast over photographs is not covered by that script.** The veil gradients
in `.hero--photo::after` and `.band__scrim` carry those ratios and have to be
checked on the rendered page. One was caught during this pass: at 54vw the hero
body copy's last words landed at ~0.68 veil over the white gi, putting
`--text-muted` at 3.4:1. Fixed by narrowing the measure *and* raising the veil's
mid stop — narrowing alone was not enough, because one long word still reached.

---

## Typography — the harder push

`--font-body` moved from Newsreader to Archivo. The photographs now supply the
athleticism the type used to have to carry alone, so display and body run on one
grotesque. Body leading dropped 1.7 → 1.62, which is what a grotesque wants at
this measure.

To A/B the other option: `--font-body: var(--font-editorial)`. One line.

**If Archivo body is kept permanently**, delete the Newsreader `@font-face` and
`src/fonts/Newsreader-Variable.woff2` — it is 40 KB of dead payload. It is still
shipped today so the A/B is one edit away.

Caps are applied to the **display tier only**: page titles, section titles, band
titles, taxonomy names, destination names, nav item names. Data-bearing names
are deliberately excluded — technique names, exercise names and t-shirt design
names stay sentence case, because they are read for meaning rather than scanned
for hierarchy, and "Knee Shield Half Guard" in caps is markedly slower to read.

---

## Files

```
src/photo/              8 crops, webpack-resolved from app.css (like src/fonts/)
public/photo/           og-crest.jpg only — index.html references it literally
tools/photo-src/        the seven originals
tools/photo.py          regenerates every crop and treatment
```

`public/og-card.png` is now unreferenced. Left in place rather than deleted, in
case the generated card is wanted back; `tools/make-og-card.py` still builds it.

---

## Open items — decisions still outstanding

These were raised with the proposal and are **not** resolved by this commit.

1. **The gi in these frames does not exist.** Five of the seven show a branded
   SubmitologY gi being worn, while the shop lists the gi under "to be
   announced" with no artwork, date or price. This build keeps the frames on
   brand surfaces (hero, story, mission) and off the product listing, which
   holds the line — but the decision should be explicit so the images don't
   drift onto the shop page later.
2. **The competition frames.** Frames 04 and 05 are shot at what reads as a
   sanctioned event. The JJIF banner and the scoreboard are **cropped out at
   source** in `tools/photo.py`, not hidden with CSS — an image carrying a
   federation mark claims a result the brand has never had. Do not widen that
   crop back out. Frame 05 (referee) is generated but not yet placed; it is
   duotone-only for the same reason.
3. **"Kintsugi for the mind" is new copy.** It is on the crest in every frame
   and it says in four words what the mission page takes two paragraphs to say.
   It appears nowhere in `i18n.js`. Adding it is an i18n change in five
   languages and was deliberately left out of this commit, which touches no
   copy at all.
4. **They still read as rendered.** Sharper than the first pair — the fabric
   weave and knuckles in frame 02 hold up well — but the crest sub-text degrades
   at distance and the arena crowds are indistinct. Duotone helps, which is a
   second argument for the alternating system. A caption as light as *Brand
   visualisation* near product would cost nothing and protect the register the
   whole site is built on.

Carried over from before, still open: the crest artwork needs a
transparent-background export to sit cleanly on bone; technique names remain
English-only while the chrome is translated; `react-scripts` 5.0.1 is
unmaintained.

---

## Verification run for this change

```
npm test                       43/43 pass
npm run build                  OK — CSS 10.04 → 11.7 kB, JS +239 B
python3 tools/check-contrast.py   all tokens PASS on --ink
python3 tools/photo.py         reproduces src/photo/ byte-for-byte
```

Checked at 1440px and 390px on Home, Mission, Technique Map, Shop and Strength:
no horizontal overflow, no console errors, nav panel and mobile drawer intact.

---

# Addendum — second pass, same day

## The mission banner was a dead control

The whole strip is one `<button>` that navigates to `ROUTES.mission`. On the
mission page that meant its "Learn more →" pointed at the page you were already
reading, so a click did nothing — a dead control styled to look live. The banner
is now suppressed on that route in `App.jsx`, which also gives the page it
advertises the full first screen.

This is worth remembering as a pattern: any persistent strip that promotes one
destination needs to know when it is standing on it.

## Our Story now opens with a band

`.storyband` — frame 07, duotone, sharing every rule with `.missionband` so the
two pages read as the same kind of page rather than as two one-off designs. The
eyebrow reuses `T.ui.sections.story.desc`, so no new string in any language.

The crop is anchored at 0.06, not 0.20: the standing figure's head sits high in
the frame and a 21:9 window taken any lower crops it at the jaw.

## The home story split is graded — a third state in the rule

First attempt at this was duotone, and it was wrong: the three colourways are
half of what that frame is saying, so draining the colour threw away content.
But full colour was wrong too — the royal blue and the pink sat two inches from
paper and from an orange button, and nothing on the row read as the accent.

The answer is a third state, now written down in `tools/photo.py`:

> **Colour** where the photograph *is* the content.
> **Graded** where the photograph is the content **and its colour is
> information**, but it butts against a coloured surface it would otherwise
> fight — saturation down, a warm cast toward the paper.
> **Duotone** wherever type sits on top of it.

`grade()` runs saturation 0.62, brightness 0.88, contrast 1.05, then multiplies
a `--bone`-coloured layer at 0.22. At that strength it is a cast rather than a
tint: the gis are still plainly blue and pink, they have simply stopped
shouting. The photograph and the paper now belong to the same picture instead
of being an image glued to a panel.

Four grades were rendered side by side before picking this one; the two more
aggressive settings started reading as sepia, which is a different and much
more dated look.

## What's New

One release entry added for 2026-08-22 in all five languages, covering the
photographs, the layout, the two-tone rule, the map preview move, the Story
band, and the banner fix. Its last item restates that nothing about the site's
claims has changed — no product, no shop, no account, first run still Q1 2027.

## Still outstanding

**Basic Concepts.** The requested image (`ChatGPT Image Aug 22, 2026 at
07_56_49 PM.png`) never reached the session — it is not in the uploads and the
desktop bridge is not connected. The page is unchanged.

Layout recommendation for when it arrives, in order of preference:

1. **A band header, like Mission and Story.** Duotone, headline over it. Three
   pages then share one opening gesture, and the six concept cards keep the
   flat ground they need — six cards over a photograph is six competing
   backgrounds.
2. **A single full-bleed band between concepts 3 and 4**, breaking the grid
   into two rows of three. Works if the image is figurative; gives the page a
   midpoint it currently lacks.
3. **Behind the grid** — only if the image is near-abstract (texture, mat
   weave) and heavily darkened. A photograph with a subject behind six cards
   fights every card border, and the cards would each need their own scrim,
   which is six more surfaces to contrast-check.

If the image turns out to be a diagram of the six concepts rather than a
photograph, none of the above applies — it should replace or sit above the
grid at full width, in colour, with no scrim.
