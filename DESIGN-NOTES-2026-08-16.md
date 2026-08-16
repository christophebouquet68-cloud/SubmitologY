# 2026-08-16 — donation removal, exercise diagrams, and a BJJ visual language

Three requests, in order. Verified with `CI=true npm run build` (compiles clean,
163 kB JS / 10 kB CSS gzipped) and `CI=true npx react-scripts test
--watchAll=false` — **43 tests, all passing**, up from 28.

---

## 1. The 1% donation is gone from the site

Nineteen edits across ten files. Every user-facing string was changed in all
five languages; nothing was left in English in a `ja` or `ro` slot.

| File | Change |
|---|---|
| `src/i18n.js` | `banner.text`, `overview.body1`, `statPledge`→`statExercises`, `about.linksBody`, the third shop pillar, `mh.planNote`, `donationTitle`/`donationBody`→`stanceTitle`/`stanceBody`, `mh.pillarsTitle`, three of the four Mission initiatives |
| `src/i18n-additions.js` | `sections.mission.desc` |
| `src/pages/Mission.jsx` | pledge block → stance block |
| `src/pages/Home.jsx` | the `1%` hero stat → a derived count of illustrated exercises |
| `src/styles/app.css` | `.pledge` → `.stance`, in both the part-1 and part-2 blocks |
| `src/data/legal.js` | the pledge sentence in Terms |
| `public/index.html` | meta description, `og:description` |
| `public/manifest.json` | description |
| `tools/make-og-card.py` | footer line; `og-card.png` regenerated |
| `src/revampSmoke.test.js` | updated, plus a new guard (below) |

### Two calls worth reviewing

**Giving for a cause, not only the 1% line.** Two initiatives were also
promises of money or goods and were reworded rather than kept:

- *The Mental Health Roll* — "an annual charity open mat, with proceeds to
  support local mental health organisations" → an annual open mat given over to
  mental health awareness. The event survives; the proceeds claim does not.
- *Academy Partnerships* — "subsidised gear for BJJ programmes" → working with
  academies that already run mental health initiatives and sharing what they
  learn.

The shop's *Community Over Commerce* pillar said profits are reinvested into
the community; it now points at the free tools, which is true today.

**What replaced the pledge.** The 1% initiative slot is now **Free by Design**,
and it is the only card on that page labelled *live today* rather than
*planned* — the technique map, the six concepts and the programme builder are
free, in five languages, with no account. The Mission page's numeral block is
now a stance block reading *"What we can say today"*, written in the register
the rest of the site already uses about its own limitations:

> SubmitologY has not launched. There is no product, no shop and no revenue.
> What exists is this site … That is the whole of the mission so far, and we
> would rather say so plainly than promise more.

The mental-health positioning, the Samaritans of Singapore line and the purple
`--mission` semantics are all untouched.

### A guard against it coming back

`revampSmoke.test.js` now renders Home, Mission, Story and Shop in all five
languages and fails on donation vocabulary. The pattern is deliberately narrow:
Romanian *doar* means "only" and Portuguese *doar* means "to donate", so the
verbs are matched in their inflected forms instead.

### Also fixed in passing

`tools/make-og-card.py` still said "34 techniques". The map has had 60 since
2026-08-12. Corrected and the card regenerated.

---

## 2. The exercise diagrams

**The pose data is untouched.** Forty-six hand-tuned skeletons are the
expensive part of that feature; every change is in `ExerciseFigure.jsx` and the
stylesheet, and `designSmoke.test.js` spot-checks the coordinates to keep it
that way.

What was wrong: one stroke weight for every limb, a hollow ring for a head, a
2-unit far-side offset that read as a doubled line rather than depth, and two
frames side by side that read as two drawings rather than one movement.

What changed:

- **A tapered torso capsule.** Two overlapping round-capped strokes, wider at
  the shoulders. A four-point polygon was tried first and read as a crate.
- **Graded limb weights** — thigh 3.0, shin 2.4, upper arm 2.6, forearm 2.0.
  Far side is thinner *and* dimmer, so the depth cue survives without colour.
- **An onion skin.** The end frame carries the start pose behind it at 22%.
  No ghost head — two overlapping head discs was the one thing that turned the
  onion skin into clutter.
- **A motion arrow** along the path of whichever joint travels furthest, drawn
  only when it travels more than 9 units, otherwise it is shorter than its own
  arrowhead. This is the part that says *movement*.
- **A mat with contact shadows** instead of a hairline — and, as before, only
  for poses that actually have a floor: a bench press and a pull-up get
  neither.
- **A plate around each frame**, so two figures read as before/after rather
  than as one wide picture.

**One bug fixed.** Bells, plates, bands and bars were drawn in `--mission`
purple, which breaks the site's own rule that purple means the mental-health
thread and nothing else. They now use a new `--equip` steel token (7.4:1 on
`--surface-sunk`). A dumbbell is not mental-health content.

Stroke widths are SVG attributes, not CSS, because they are geometry — a
stylesheet change should not be able to silently misdraw a body. Colour and
opacity stay in CSS so the print sheet can restate them, and it does: on paper
the mat becomes a tint, the shadows are dropped, and the figure goes to black.

---

## 3. Look and feel — the proposal

The site was revamped on 9 August and is considered work, so this is an
addition rather than a teardown. **The logo artwork is untouched.** Colour
semantics are unchanged: orange is still commerce, purple is still the
mental-health thread, gold is still seams and hairlines only. No new
dependencies.

The gap was specific: nothing on the site borrowed from the sport it is about.
The mat, the weave and the belt are the three things every practitioner
recognises on sight, and the site used none of them.

### The signature: the belt rail

`src/components/BeltRail.jsx`. A belt — coloured body, two rows of stitching, a
black tip, four stripe slots. It appears in exactly two places, because it
appears only where there is a real rank to show:

- **Strength & Conditioning** — the level you chose, as a belt. White belt for
  Beginner, blue for Intermediate, brown for Advanced, with one stripe per
  level. It changes when you change the level.
- **Technique Map** — a white belt taking one stripe per quarter of the map
  drilled. The fourth stripe lands only at 100%, not by rounding up at 88%.

Both are `aria-hidden`, because both print the same fact in words immediately
beside them ("Intermediate", "27 / 60 drilled") — the same arrangement the
map's legend dots already use. A rail on the contact page would be decoration
wearing a uniform, so there isn't one.

**`LEVEL_COLORS` changed.** It was `#35d07f / #f5a524 / #ff5c5c` — a
green-amber-red difficulty scale, which is the generic answer and belongs to no
sport. The levels now take the first three belts. Two values per belt, because
one cannot do both jobs on a dark ground: `LEVEL_BELTS` is the true belt colour
filling a bounded block, `LEVEL_COLORS` is the same belt lifted until it passes
AA as pill text (6.8:1 and 6.2:1). Purple is skipped even though it is the belt
after blue — spending the mental-health signal on a difficulty setting would
dilute it.

The `.rail` border is load-bearing, not decoration: a brown belt is 2.7:1 on the
page ground, which is fine for a bounded block and would not be fine for an
unbounded one, so the block is always bounded.

### Texture: the mat and the weave

- **`.matfield`** — a woven ground fixed behind every page, under the existing
  synaptic field, which is unchanged. The site's stated design language is
  neuroscience; this supplies the thing it never had.
- **`.surface--bone`** — the paper chapter gains a cotton weave. BJJ is a
  textile sport and this is the only large light surface on the site, so it is
  the only place a weave can actually be seen.

Both are CSS gradients, not images: no request, so the privacy policy's "no
third-party requests" claim is untouched, and nothing to route through
`PUBLIC_URL`. The pitch is deliberately uneven (4px against 5px) — an exact
square grid moirés at fractional zoom. `.matfield` is a fixed layer rather than
a background on `.shell` because a scrolling 4px weave shimmers, and rather
than `background-attachment: fixed` because that repaints badly on mobile
Safari.

### Type: the page-header rule

Every page title now carries a short gold hairline between it and its
standfirst — the same mark the seam uses between sections, so one idea does
both jobs. On the bone surface it swaps to `--gold-on-bone` (4.1:1); gold at
34% alpha vanishes on paper.

### Not done, and why

- **A gold seam through the word "Resilience"** — still not implemented, for
  the reason recorded in `REVAMP-NOTES.md`: `background-clip: text` with a
  hard-stop gradient breaks at arbitrary wrap points across five languages.
- **The belt on every page header.** Tempting and rejected. Assigning a belt
  colour to Shop or Contact would encode nothing, and a structural device that
  encodes nothing is a decoration.
- **The crest field still doesn't match the bone ground**, and the new weave
  makes it marginally more visible rather than less. The real fix is unchanged
  from `REVAMP-NOTES.md` open item 2 — export a crest variant on transparency.
  The logo artwork was not touched here.

---

## Verification

```bash
npm install
CI=true npm run build                      # compiles clean
CI=true npx react-scripts test --watchAll=false   # 43 tests
python3 tools/check-contrast.py            # now covers belts and figures
```

`tools/check-contrast.py` gained two sections: the belt palette (text vs fill)
and the figure colours against `--surface-sunk`. Run it after touching any
colour, as before.

`.env.local` is gitignored and was never in the upload, so the signup form will
report "not connected" until you recreate it from `.env.example`. See
`SIGNUP-SETUP.md`.

## Still open, carried forward

Unchanged from `REVAMP-NOTES.md` unless noted:

1. 12 `{{double-braced}}` placeholders in `src/data/legal.js`. `grep -n "{{"
   src/data/legal.js`.
2. The crest field / bone ground mismatch — see above.
3. Terms and the Shop page still disagree slightly on "nothing is for sale
   yet"; both were left as they were.
4. The SOS line still addresses bystanders. The merged wording suggested last
   time is still the better one and still isn't in.
5. Technique names and descriptions remain English-only while the chrome is
   translated.
6. `react-scripts` 5.0.1 is unmaintained; a Vite migration is about half a day.
