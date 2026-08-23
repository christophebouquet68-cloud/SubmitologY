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

---

# Addendum — background music

A speaker button in the header, between search and the language selector.
**Off by default, and that is not a preference — it is the requirement.**

## Default OFF — after briefly trying the other way

Flipped on 2026-08-23 on request, and reverted the same day once the measured
behaviour was on the table. Recording the reasoning so nobody re-litigates it.

**Every current browser refuses audible playback until it has seen a gesture it
trusts.** A page cannot assert autoplay. Every honest implementation of "on by
default" therefore reduces to *"starts whenever you happen to touch
something"* — and that is worse than silence, because the visitor gets music at
an arbitrary moment they did not choose, from a control they had not yet
noticed. This is what the measurements showed:

| Visitor | On load | After first click anywhere |
|---|---|---|
| First-time (strict policy) | silent, button reads off | music starts |
| Returning (browser trusts the site) | music starts | — |

Two visitors, two completely different first experiences of the same page, and
neither of them chose it. Off by default, with a visible control, is the
coherent option.

Three further reasons it belongs at off: WCAG 1.4.2 (auto-playing audio over
three seconds needs a stop mechanism — not autoplaying satisfies that more
simply than any control can); a default-on toggle spends most of its life
showing "on" over silence; and this site carries distress content and a crisis
line, where music that starts by itself is an ambush.

### The gesture path is kept, and it is not autoplay

`armGesture()` survives the revert. It only ever arms when `wanted` is already
true — which now requires an explicit opt-in on a previous visit. Someone who
turned sound on last week, whose browser declines to resume without a fresh
gesture, gets it back on their first interaction instead of having to hunt for
the button again. **That is the preference working, not the site helping
itself.**

## The bug that shaped the component

The first version held one flag. It broke on the commonest path: turn sound
on, come back tomorrow, browser declines to start without a fresh gesture.
One flag forces a choice between two wrong behaviours — `aria-pressed` claims
"on" over silence, or the refusal writes `false` back and quietly discards the
preference the visitor set.

`SoundToggle` now holds two:

- **`wanted`** — persisted, what the visitor asked for.
- **`playing`** — not persisted, what is actually audible.

They diverge only on an autoplay refusal, and then correctly: the button
reports silence, the stored wish survives to be honoured on a visit the
browser trusts. Verified both ways in Chromium, with the autoplay policy
strict and relaxed.

## Weight

The master is 320 kbps stereo, 2:44, **6.3 MB** — seven times the weight of
the entire rest of the site. Re-encoded to 96 kbps stereo, **1.9 MB**
(`tools/audio.sh`, ID3 stripped). At this playback level 96k is transparent.

More important than the re-encode: **the track is never fetched unless it is
actually going to play.** `preload="none"`, the `<audio>` element is not
constructed until playback is attempted, and — the part that matters now the
default is on — a refused `play()` tears the element down (`removeAttribute
("src")` then `load()`), which cancels the request in flight. `play()` forces a
load regardless of `preload`, so without that teardown every bounce would have
pulled 1.9 MB for nothing.

Measured: a visitor who opens the page and never touches it issues **zero**
requests for the mp3. Default page weight is unchanged for them.

## Details

- Volume 0.32 — under reading, not over it.
- 600 ms fade in and out. Hard starts are the jarring part of background
  audio, not the audio.
- `prefers-reduced-motion` jumps to the target level instead of ramping. Less
  motion is not a request for less sound, but it is a request for fewer
  animated transitions.
- Icon is inline SVG on `currentColor` — no icon font, no extra request, crisp
  at any zoom. No colour change when playing: an accent living permanently in
  the header for anyone leaving music on would put orange (which means
  commerce here) where it does not belong.
- Hidden below 520px. The header is tight there, and this is the least
  essential of the three utilities. No duplicate in the drawer, deliberately.
- 38px box, matching `.search-btn` rather than the site's 44px rule — recorded
  as a decision in the stylesheet, not a slip.

## Privacy policy updated in the same change

`src/data/legal.js` **enumerates** the localStorage keys, so it gained one:
*"Whether you've switched the background music on."* This is exactly the rule
that has bitten before. Nothing else in the policy moves — the audio is
self-hosted, so "loading a page doesn't announce your visit to anyone else"
stays true.

## Known limitation

The track is 2:44 and loops natively, so there is a hard seam at the loop
point. Fixing it properly needs either a track authored to loop or a
two-second crossfade via the Web Audio API; the latter is real complexity for
a background element and was not worth it here. If the seam annoys you, the
cheaper fix is a shorter track that was written to repeat.

---

# Addendum — sound simplified, Basic Concepts rebuilt

## Sound: one flag, always off

Third and final shape. The history is worth keeping because each version was a
correct fix for the last one's problem:

1. **One persisted flag.** Broke on the commonest path — opt in, return
   tomorrow, browser declines to resume without a gesture. The button then
   either claimed "on" over silence or silently discarded the preference.
2. **Two flags plus a first-gesture fallback.** Fixed that, and was still
   confusing: the honest consequence was that music could begin at a moment
   the visitor had not chosen, from a control they had not yet noticed, and
   only on some visits.
3. **One flag, no persistence.** Sound is off at every load. The button's
   pressed state *is* whether audio is playing. There is no second source of
   truth that can drift out of step with it.

Two consequences worth knowing. `usePersistentState` is gone from the
component, so the localStorage key is gone, so **the privacy policy lost a
line** — `src/data/legal.js` enumerates what is stored, and it changed in the
same commit, as it must whenever what the site stores changes. And because the
only route to playback is now a press of this button, the autoplay policy never
comes into it: `play()` is always inside a user gesture, always allowed.

State still survives navigation — single-page app, the header never remounts —
so music runs until it is switched off or the page is genuinely reloaded.

### Visibility

The button sat at `--text-dim` to match `.search-btn` and disappeared. It now
reads at full `--text` with a **gold hairline**, and inverts to a filled cream
chip while playing. Gold rather than orange or purple: those two carry meaning
here (commerce, and the mental-health thread) and a music control is neither.
Gold is the site's line colour and this is a border — the one brand colour that
can take the job without saying something false.

## Train menu order

`DESTINATIONS` now reads Basic Concepts → Technique Map → Strength &
Conditioning. Teaching order rather than build order: the concepts explain why
the map is shaped the way it is, and conditioning is what you add once you know
what you are conditioning for. One array, and it propagated to the header
panel, the drawer, search and the home-page index without touching any of them.

## Basic Concepts, rebuilt

The page presented six "mental models" as equals. **They were not equals** —
four of them were describing one thing from different angles, and that thing is
the order jiu-jitsu is actually built in. That order is now the spine:

1. **Take it to the ground** — a standing opponent can step, load their hips
   and swing; on the ground there is no room to wind up and nowhere to step to.
2. **Pass the legs** — the longest, strongest limbs they have, doing three jobs
   at once: holding distance, threatening sweeps and leg attacks, and making
   control impossible.
3. **Pin, then climb** — positions are not equal; the difference is how much of
   their movement you own. Top of the ladder is mount or the back.
4. **Submit** — the end of the sequence, not the start. Hunted early it is a
   gamble that gives the position back when it fails.

Each step carries its reason, because the reason is what makes the order stick:
*"pass the legs"* is an instruction, *"the legs do three jobs at once and none
of them are yours"* is an explanation you can rebuild the instruction from.

**Numbering is information here, not decoration** — you cannot pass legs you
have not brought to the ground, and you cannot submit what you have not pinned.
Marked up as an `<ol>` so assistive tech gets the sequence too, with the
visible numbers `aria-hidden` rather than duplicated.

**Timing Over Force** and **Tap Early, Tap Often** survive unchanged, in their
own section on the purple thread. They are advice about how to train rather
than steps in a sequence, and folding them into the ladder would have made the
ladder untrue. They are matched out of `T.conceptItems` by English title, so
the translated copy stays in one place — if either title is ever reworded, the
`RECOMMENDED` array in `Concepts.jsx` has to move with it, and the section is
skipped rather than rendering empty if the match fails.

The four other originals — Positional Hierarchy, The Guard, Flowing &
Chaining, Base & Posture — are not deleted so much as absorbed: the hierarchy
*is* step 3, and the guard *is* what step 2 passes.

All new copy is in five languages, verified complete before build.

## The photograph

Frame 08, graded to match the home-page story split rather than duotoned — the
pink gi is information there and here, and the headline sits in the dark left
third rather than over her.

**The crop removes the gym decal at source.** The frame has "SUBMITOLOGY
JIU-JITSU" on the wall behind her, and SubmitologY is an apparel brand with no
academy — a wall sign implying one is the same class of overclaim as the gi
that does not exist yet. Cropped in `tools/photo.py` at anchor 0.17, not hidden
with CSS. It is a tight anchor: below it the decal returns, above it her face
gets cut. Check the render if you change it.

32:9 rather than 21:9, because this band's content is a title and one line, so
`cover` in a short box was eating nearly half the height and cropping her at
the nose.

---

# Addendum — the four steps, illustrated

One photograph per step, in a third column beside the number and the copy.
Frames 09–12: takedown, guard pass, mount, rear choke — one per element, in
the order the page teaches them.

**4:3, not square, and the reason is the decal again.** All four frames carry
"SUBMITOLOGY JIU-JITSU" on the wall at roughly y=205 of 1402. A square crop
leaves only 280px of vertical travel and cannot clear it without cutting heads
off; 4:3 leaves ~560px, which is enough to start the window below the decal and
still hold the action. Anchors are per-frame and were picked against the render
rather than guessed — 0.50 on the takedown because 0.40 still caught a sliver
of "JIU-JITSU", 0.45 on the pass and the mount because anything lower crops the
top player's head.

Graded with the same `grade()` as the concepts band and the home story split,
so the page reads as one photographic pass rather than a header followed by a
gallery.

**The images are `aria-hidden`.** The step title and its two paragraphs already
say what the position is, so alt text would only repeat them — and would have
to repeat them in five languages to do it honestly. They are background images
on a `div` rather than `<img>` elements, which keeps the crop a design decision
in one place, consistent with every other photograph on the site.

Fixed aspect ratio rather than intrinsic height, so the four rows keep a common
rhythm however long the copy runs; the number column is fixed and the text
column takes the slack.

**Two breakpoints, not one.** Below 900px the image column squeezes the reason
paragraph to about four words a line, so the picture drops under the text and
takes the full text width. Below 620px the number column collapses too and the
row becomes a single stack.

## Spacing

`.steps-section` gained `margin-bottom: clamp(3.5rem, 8vw, 6rem)`. At the
default section gap the ladder and the two recommendations read as one
continuous list, which is exactly the confusion the two sections exist to
avoid — they are different kinds of thing and now they look it.
