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

### Layout and design
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
  a real preview. **You'll need to add `public/og-card.png` at 1200×630.**
- Mission banner is dismissible and stays dismissed.
- Footer with full sitemap and a launch email capture (stored locally — wire it
  to a real list before launch; see `components/Footer.jsx`).
- Error boundary so one broken page can't blank the site; a 404 route.
- S&C selections persist, so you don't re-answer three questions every visit.

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
    merch.js              launch collection
  hooks/                  useMediaQuery, usePersistentState, useFocusTrap
  components/             Header, Footer, SearchDialog, MissionBanner,
                          LangSelector, ErrorBoundary
  pages/                  Home, TechniqueMap, Concepts, Strength, Mission,
                          Shop, Story, WhatsNew, NotFound
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
- The email signup needs a real backend.
- Add `public/og-card.png` (1200×630) for link previews.
