import React, { useMemo } from "react";

/**
 * Seam — the kintsugi break between two sections.
 *
 * Sections meet at a visible gold fracture rather than a neutral rule.
 * The brand's central metaphor previously existed only as pixels inside
 * logo512.png; this puts it in the layout, where it encodes something true
 * about the content instead of decorating it.
 *
 * Accessibility: purely decorative, so aria-hidden and no focusable child.
 * Screen readers get the section landmarks either side, which is the real
 * structure.
 *
 * Colour: gold is 7.91:1 on --bg but only 1.82:1 on --bone, below the 3.0
 * floor for a meaningful non-text graphic. Pass `onBone` when the seam sits
 * on the paper surface; it swaps to --gold-on-bone at 4.13:1.
 *
 * Determinism: the fracture is generated from a seeded PRNG rather than
 * Math.random, matching the approach already used for the technique-map
 * layout. A given `seed` always draws the same break, so the seam does not
 * shift on re-render or between server and client.
 */

const W = 1400;
const H = 34;

/* mulberry32 — same shape as the map's seeded PRNG */
function prng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildPath(seed, segments) {
  const rand = prng(seed);
  const step = W / segments;
  const mid = H / 2;
  /* Amplitude stays well inside the band so the stroke never clips at the
     element edge once non-scaling-stroke widens it. */
  const amp = H * 0.34;
  const pts = [];
  for (let i = 0; i <= segments; i += 1) {
    const x = Math.round(i * step);
    const y = i === 0 || i === segments
      ? mid
      : Math.round(mid + (rand() * 2 - 1) * amp);
    pts.push(`${x} ${y}`);
  }
  return `M${pts.join(" L")}`;
}

export default function Seam({ seed = 1, segments = 8, onBone = false }) {
  const d = useMemo(() => buildPath(seed, segments), [seed, segments]);

  return (
    <div className={`seam${onBone ? " seam--on-bone" : ""}`} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" focusable="false">
        <path className="seam__glow" d={d} />
        <path className="seam__crack" d={d} />
      </svg>
    </div>
  );
}
