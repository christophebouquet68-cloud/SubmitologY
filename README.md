# SubmitologY — Brand Refresh (Merchandising + Mental Health Mission + S&C)

This folder contains only the files that changed. Drop `src/App.js`, `src/i18n.js`,
and `public/index.html` into your existing project (overwriting the current
versions) and `npm start` / `npm run build` as usual — no other files, images,
or `node_modules` were touched. The build was verified locally with
`react-scripts build` (compiles cleanly, zero warnings).

## What changed, and why

### 0. Overview hero buttons updated
The CTA row next to "Shop the Gear" now reads: **Shop the Gear → Concepts →
Techniques → Strength & Conditioning → Our Mission** — Concepts before
Techniques (matching the nav swap), and a new button linking straight to the
Strength & Conditioning program builder. Translated in all 5 languages.

### 1. Nav reorder + new "Strength & Conditioning" section
- **Concepts and Techniques swapped**: nav is now `Overview → Shop → Concepts
  → Techniques → Strength & Conditioning → Mental Health → About`.
- **New "Strength & Conditioning" page**, right after Techniques. It's a
  small program-builder, not a static article:
  - The visitor selects three inputs via pill buttons (same interaction
    pattern as the existing Techniques filter bar): **age range** (Under 20,
    20–30, 30–40, 40–50, 50–60, Over 60), **fitness level** (reuses the
    existing Beginner/Intermediate/Advanced translations from the Techniques
    page), and **equipment** (No Equipment / With Equipment).
  - "Build My Program" is disabled until all three are chosen — the page
    won't render a program from partial input.
  - Once submitted, only the one matching program is shown: warm-up,
    lower body, upper push, upper pull, core, conditioning, and cooldown
    blocks, each with a specific exercise list and prescription (sets ×
    reps, or rounds/work/rest), plus a suggested weekly frequency and an
    age-specific coaching note.
  - **How the programs are generated**: there are 6 × 3 × 2 = 36 possible
    combinations. Rather than hand-writing 36 static articles, `App.js`
    defines exercise pools (calisthenics vs. equipment), prescription
    tables per fitness level, and a pure function `buildSCProgram(age,
    level, type)` that deterministically assembles the right program from
    those tables — this *is* the "pre-processed and stored" approach:
    everything lives in the code as data, nothing is fetched or generated
    live, and only the single relevant result is ever displayed.
  - **Age-aware, not just relabelled**: the 50–60 and Over 60 brackets swap
    out high-impact/explosive exercises (broad jumps, burpees, walking
    lunges) for joint-friendlier alternatives (step-ups, wall sits, marching
    in place), automatically drop suggested frequency to 2×/week, add 15
    extra seconds of rest between sets, and extend the warm-up/cooldown by a
    minute. Each result also carries a short, age-specific coaching note and
    a general fitness disclaimer (this is guidance, not medical advice —
    consult a physician before starting, especially with an existing
    condition).

### 2. Language coverage
Every part of the Strength & Conditioning page — labels, all 6 age options,
the 2 equipment options, section headers, the frequency/rest copy, the 6
age-specific notes, the disclaimer, and all ~30 individual exercise names —
is translated into all 5 site languages (EN/FR/JA/PT/RO), not just English.
Fitness-level labels reuse the site's existing Beginner/Intermediate/Advanced
translations rather than duplicating them.

### 3. Everything from before is still in place
- Aubergine-black background, synaptic-violet mental-health accent, and the
  low-opacity synaptic-network background pattern.
- "The Invitation" closing statement on the About page.
- Mental health initiatives clearly marked as planned from 2027.
- Admin section fully removed.
- Merchandise launch-collection preview and sitewide mission banner.
- All 22 techniques, images, and filtering untouched and fully reused.

## Suggested next steps
- If you'd like actual demonstration photos/video per exercise, that's a
  separate content pass — the current version is text-only by design, to
  keep the page lightweight and avoid large files.
- Consider letting a logged-in user save their last selection (would need
  basic persistence — currently the page re-asks each visit).
