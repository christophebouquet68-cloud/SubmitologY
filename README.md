# SubmitologY — revamped front end

Rebuild of the single-file `App.js` site, focused on navigation, cross-platform
usability and accessibility. The old photo-grid techniques view is gone
entirely — the interactive map is the only techniques view.

### Removed

The `SHOW_LEGACY_TECHNIQUES` flag and everything it gated no longer exist:

| Removed | Was in |
|---|---|
| `SHOW_LEGACY_TECHNIQUES` flag and its branch in the root component | `App.js` |
| `SEED_TECHNIQUES` (30 entries with `image` / `keyPoints` / `youtube`) | `App.js` |
| `TechniquesLegacy`, `Card`, `Modal` components | `App.js` |
| `CATS`, `DIFF_COLORS`, `CAT_COLORS`, `DEFAULT_IMAGE`, `NAV_KEYS` | `App.js` |
| Card/modal/badge/image styles (~25 entries in the `S` object) | `App.js` |
| `T.techniques`, `T.cats`, `T.modal`, `T.nav` blocks | `i18n.js` |
| `T.overview.stat*`, `conceptsCta`, `missionCta`, `scCta`; `T.about.catDescs`, `T.about.footer`; `T.whatsNew.message` | `i18n.js` |
| `public/images/` (all 24 photos, ~11 MB) | `public/` |
| "Browse the map by category" grid on the home page, plus `SUBCATS` / `SUBCAT_META` and the `.cat` styles it used | `Home.jsx`, `techmap.js`, `app.css` |
| CRA boilerplate: `App.css`, `index.css`, `App.test.js`, `setupTests.js`, `reportWebVitals.js` | `src/` |

`T.diffs` is kept — it still labels the Beginner/Intermediate/Advanced levels
in the Strength & Conditioning builder.

## Running it

```bash
npm install
npm start        # dev server
npm run build    # production bundle in build/
```

No new dependencies were added.

## What changed

### Navigation
- **Real URLs.** A small hash router (`src/router.js`) gives every section its
  own address — `#/map`, `#/strength`, `#/map/armbar`. Browser Back works,
  links are shareable and bookmarkable, and refreshing keeps your place.
  Hash-based rather than path-based so it deploys to any static host with no
  rewrite rules.
- **Four top-level categories**: Train · Shop · Mission · Brand.
  `Train` and `Brand` open a menu; `Shop` and `Mission` are single
  destinations, so they're direct links rather than one-item dropdowns.
- **Nothing is only reachable one way.** Every section appears in four places:
  the header, the mobile drawer (all seven listed flat, each with a one-line
  description), the "Everything on the site" block on the home page, and the
  footer sitemap. Search reaches all of them plus every individual technique.
- **Search** (`⌘K` / `Ctrl-K` / `/`) over sections and all 34 techniques, with
  arrow-key navigation. On a phone it's the fastest route to anything.
- Scroll position resets on section change; deep links into the map don't.

### Technique map
- **Pan, zoom and pinch**, with zoom/reset controls.
- **Route finder** — pick two techniques and it runs a breadth-first search
  over the existing adjacency data and highlights the shortest chain
  ("Closed Guard → Hip Bump Sweep → Mount → Back Control → Rear Naked Choke").
- **Deterministic layout.** The force-directed positions were seeded with
  `Math.random()`, so the graph shifted on every reload. Now seeded with a
  fixed-seed PRNG: identical every time, so spatial memory works.
- **44px touch targets** — an invisible hit circle behind each 9px node.
- **Progress tracking**: mark techniques as drilled, persisted in
  `localStorage`, shown as a green pip on the node.
- **Text fallback list** — a force-directed graph is not navigable by screen
  reader, so the same data is available as an alphabetical list.
- Detail is a sidebar on desktop and a bottom sheet on phones.

#### Typography

- **Display face: Archivo**, self-hosted from `src/fonts/` rather than loaded
  from Google Fonts — no third-party request on every page view, and nothing
  extra to declare in the privacy policy. A variable font subset to Latin +
  Latin Extended, 40 KB, covering EN/FR/PT/RO; Japanese headings have no
  Archivo glyphs and fall through to the system CJK faces named in
  `--font-display`, which is correct rather than broken.
- The width axis is pinned at 108 to echo the letterspaced wordmark in the
  logo. The weight axis stays live, which is what lets the hero set an 800
  line against a 300 one.
- `--font-display` had been declared in `:root` and never used, so every
  heading was silently rendering in the body serif. It is now applied to
  `h1`–`h4` and to both wordmarks.
- `.hero__accent` was `font-style: italic`; Archivo ships no italic, so that
  asked the browser to synthesise an oblique by shearing the glyphs. Replaced
  with a real weight contrast.
- Body copy stays Georgia. Buttons, pills and eyebrows stay on the mono
  utility face — they were already right.

### What's New

The site's news page since 2026-10-03; before that, a changelog of the website
only. Every entry lives in `data/updates.js` and has a `kind`:

- **mat** — news from training, with photographs. Has a `slug` and a `story`,
  and its own page at `/whats-new/<slug>` (`pages/WhatsNewStory.jsx`).
- **range** — a change to what the shop shows. A card with the garment on it.
- **site** — a change to this website. A one-line log row with the detail
  behind a disclosure.

`pages/WhatsNew.jsx` is the feed, with a filter by kind. The home page shows
the newest story under the stat strip, and the trial banner in the hero links
to it. Publishing a story means adding an entry to `data/updates.js`; the feed,
the home insert and the unread dot all follow from the data.

The trial photographs in `public/whats-new/` have every face blurred. They are
built by `tools/trial-photos.py` from originals that are **not** in this
repository, because it is public — the script takes their folder as an
argument and recognises each original by its SHA-256.

### Shop

The page is now two tiers rather than one flat grid.

**The first drop — t-shirt and tank top.** One print, the Team Crest, on two
garments, each in white, dark blue and jet black, defined in `data/tshirts.js`.
(Four t-shirt designs until 2026-10-03; the other three are out of the shop for
the time being and live in git history.) Artwork lives in
`public/shop/tshirts/` as `<design>-<colour>.jpg`, so the ids in that file
*are* the filename parts: adding a design means dropping three files in and
adding one entry. Nothing in `Shop.jsx` changes. `tools/tees.py` builds the
images from `tools/tee-src/`; the tank top's dark blue and jet black sources
are recolours of its white mockup, made by `tools/tank-colourways.py`.

A colour row at the top switches the whole collection at once — the point of
three colourways is to see them as a set — and the swatches on each card
override a single shirt, for comparing two designs in different colours.
Choosing from the top row clears the overrides. The colourways not on screen
are preloaded 1.5s after mount, so the first switch doesn't show an empty
plate on a slow connection.

Each render is one wide frame with the front and back side by side
(1412 × 740). `.tee__media` reserves that aspect ratio up front, so the grid
does not reflow as the images land, and its background matches the cream the
artwork ships on (`#efece3`) so the plate reads as one printed card. The grid
is capped at **two columns**: at three the back print falls to around 190px
tall and stops being legible, which is the only reason to show the shirts at
all.

Swatches are a 22px dot inside a 44px hit area. Shrinking the target to the
dot would put them under the touch minimum the rest of the site holds to, and
colour pickers are exactly where mis-taps happen.

**The rest of the range.** `data/merch.js`, below the shirts, in a tighter
grid, badged "to be announced" rather than with a quarter. The shirts have a
date and a price; the gi does not, and sizing the two identically claimed a
readiness that does not exist.

Prices dropped the `$` prefix — the page appends `SGD`, and the old data
rendered as "$120 – $160 SGD".

### Contact and legal

`/contact`, `/privacy` and `/terms`, sharing one renderer (`pages/Legal.jsx`)
over copy in `data/legal.js`. They are deliberately **not** in `DESTINATIONS`:
everything in that array propagates to the header, drawer, search and home
index, which is right for the seven sections and wrong for these. They live in
a new footer row.

The copy is written to what this site actually does — it names the six things
kept in `localStorage`, and states that there are no cookies and no
third-party trackers, which is true only while it stays true. Terms carry a
training-risk callout and Singapore crisis numbers.

> Every `{{double-braced}}` span in `data/legal.js` is a blank you must fill.
> They render in orange with a dashed underline so an unfilled one cannot
> quietly ship. `grep -n "{{" src/data/legal.js` lists them all.
>
> These are drafts, not legal advice. Have them reviewed before you take money.

### Footer contact

There is no signup form and no email provider. The footer's contact block
(`components/Footer.jsx`) is a plain `mailto:` link built from
`BUSINESS.general` in `data/legal.js` — clicking it opens the visitor's own
mail app, so nothing is collected, stored or sent through this site. Update
`BUSINESS.general` (and the footer copy in `i18n-additions.js`, keys
`footer.contactTitle` / `footer.contactBody`) if the address or the framing
ever changes.

## Layout and design
- All styling moved from the inline `S` object into `src/styles/app.css`.
  That's what makes media queries, `:hover`, `:focus-visible` and
  `prefers-reduced-motion` possible at all — inline styles support none of them.
- Breakpoints at 900px (map goes single column) and 760px (nav → drawer).
- Body copy raised to a 16px floor; secondary text lightened from `#555`/`#666`
  (2.6:1, fails WCAG AA) to tokens that pass. Submission red raised from
  `#d63031` to `#ff5c5c` for the same reason.
- Design tokens in `:root` — one place for colour, type scale and spacing.
- `100dvh` and `env(safe-area-inset-bottom)` so mobile browser chrome and
  notches don't clip anything.
- **Print stylesheet** — the generated S&C program prints as a clean handout.

### Accessibility
- Visible focus rings everywhere; skip-to-content link.
- `aria-current` on navigation, `aria-pressed` on filter pills.
- Search dialog and mobile drawer are proper dialogs: `role="dialog"`,
  `aria-modal`, focus trap, Escape to close, focus returned on close.
- `prefers-reduced-motion` respected.

### Other
- Language choice persists, sets `<html lang>`, and is picked from the browser
  on a first visit. Flags replaced with text codes (a flag is a country, not a
  language).
- Per-page `<title>`; Open Graph and Twitter card meta so shared links produce
  a real preview. `public/og-card.png` is generated by `tools/make-og-card.py`
  — rerun it whenever the hero copy changes.
- Mission banner is dismissible and stays dismissed.
- Footer with full sitemap and a contact block (see "Footer contact" below).
- Error boundary so one broken page can't blank the site; a 404 route.
- S&C selections persist, so you don't re-answer three questions every visit.

### Typography

- **Display face: Archivo**, self-hosted from `src/fonts/` rather than loaded
  from Google Fonts — no third-party request on every page view, and nothing
  extra to declare in the privacy policy. A variable font subset to Latin +
  Latin Extended, 40 KB, covering EN/FR/PT/RO; Japanese headings have no
  Archivo glyphs and fall through to the system CJK faces named in
  `--font-display`, which is correct rather than broken.
- The width axis is pinned at 108 to echo the letterspaced wordmark in the
  logo. The weight axis stays live, which is what lets the hero set an 800
  line against a 300 one.
- `--font-display` had been declared in `:root` and never used, so every
  heading was silently rendering in the body serif. It is now applied to
  `h1`–`h4` and to both wordmarks.
- `.hero__accent` was `font-style: italic`; Archivo ships no italic, so that
  asked the browser to synthesise an oblique by shearing the glyphs. Replaced
  with a real weight contrast.
- Body copy stays Georgia. Buttons, pills and eyebrows stay on the mono
  utility face — they were already right.

### Contact and legal

`/contact`, `/privacy` and `/terms`, sharing one renderer (`pages/Legal.jsx`)
over copy in `data/legal.js`. They are deliberately **not** in `DESTINATIONS`:
everything in that array propagates to the header, drawer, search and home
index, which is right for the seven sections and wrong for these. They live in
a new footer row.

The copy is written to what this site actually does — it names the six things
kept in `localStorage`, and states that there are no cookies and no
third-party trackers, which is true only while it stays true. Terms carry a
training-risk callout and Singapore crisis numbers.

> Every `{{double-braced}}` span in `data/legal.js` is a blank you must fill.
> They render in orange with a dashed underline so an unfilled one cannot
> quietly ship. `grep -n "{{" src/data/legal.js` lists them all.
>
> These are drafts, not legal advice. Have them reviewed before you take money.

### Footer contact

There is no signup form and no email provider. The footer's contact block
(`components/Footer.jsx`) is a plain `mailto:` link built from
`BUSINESS.general` in `data/legal.js` — clicking it opens the visitor's own
mail app, so nothing is collected, stored or sent through this site. Update
`BUSINESS.general` (and the footer copy in `i18n-additions.js`, keys
`footer.contactTitle` / `footer.contactBody`) if the address or the framing
ever changes.

## Layout

```
src/
  App.jsx                 root: routing, language, titles, search shortcut
  router.js               hash router + the single list of destinations
  i18n.js                 original translations (unchanged content)
  i18n-additions.js       new strings for this revamp, all five languages
  styles/app.css          tokens + every component style + media queries
  data/
    techmap.js            nodes, edges, seeded layout, BFS path finding
    program.js            S&C program engine
    tshirts.js            the first drop: 4 designs × 3 colourways
    merch.js              the rest of the range, undated
    legal.js              contact / privacy / terms copy
  fonts/                  Archivo-Display.woff2 + its OFL licence
  hooks/                  useMediaQuery, usePersistentState, useFocusTrap
  components/             Header, Footer, SearchDialog, MissionBanner,
                          LangSelector, ErrorBoundary
  pages/                  Home, TechniqueMap, Concepts, Strength, Mission,
                          Shop, Story, WhatsNew, Legal, NotFound
```

`DESTINATIONS` in `router.js` is the single source of truth for what sections
exist. Add an entry there and it appears in the header, the drawer, the footer,
the home index and search automatically.

## Notes on the map's pointer handling

Node selection is resolved from the pointer gesture, not from an `onClick` on
each node, and the SVG does **not** use `setPointerCapture`. Capture retargets
the `pointerup` to the capturing element, so the browser computes the click
target as the `<svg>` and never fires the handler on the `<g>` — Safari applies
this strictly, which is why nodes appeared dead there.

Hit testing picks the *nearest* node within roughly a 52px radius rather than
enlarging each node's hit shape. On a graph this dense, 44px hit circles
overlap and the topmost one silently wins; nearest-wins gives large effective
targets and correct behaviour in clusters.

## Known follow-ups

- Technique names and descriptions are still English-only; the UI chrome is
  translated into all five languages. Worth either translating the content or
  saying so explicitly in the UI.
- `react-scripts` 5.0.1 is unmaintained. Migrating to Vite is roughly a
  half-day and cuts dev-server start to under a second.
- Fill in the remaining `{{placeholder}}`s in `src/data/legal.js` (registered
  name, UEN, address, Instagram handle, reply-time and last-updated date).
  `BUSINESS.general` and `BUSINESS.privacy` are already real —
  submitology@proton.me.
- The t-shirt renders are flat vector artwork, not photographs of a made
  garment. They are honest about what exists today, but the page will want
  real photography — on a body, in daylight — before the shirts go on sale.
- The gear below the shirts still has no imagery and quotes price *ranges*.
  That is now the largest remaining gap on the page.
- No size chart yet. It needs the actual garment measurements, so it is
  blocked on the first sample rather than on the site.
