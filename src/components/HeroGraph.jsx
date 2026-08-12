import React, { useMemo } from "react";
import {
  TECHMAP_NODES,
  TECHMAP_EDGES,
  TECHMAP_LAYOUT,
  TECHMAP_BOUNDS,
  TECH_TYPE_COLOR,
} from "../data/techmap";

/**
 * HeroGraph — the technique map, drawn faintly behind the hero.
 *
 * This is the real graph, not decoration: the same 60 nodes, the same edges
 * and the same seeded layout the map page renders. The site's most distinctive
 * asset used to sit one click away behind a promo card; opening with it means
 * the first thing a visitor sees is the thing no other BJJ brand page has.
 *
 * Deliberately faint. It sits behind live text, so it must never compete —
 * hence the low opacity here and the darker gradient veil applied in CSS.
 *
 * Accessibility: purely decorative, aria-hidden, not focusable and not
 * interactive. The real, navigable version lives on the map page, and the
 * hero's primary CTA points at it.
 *
 * No animation. A drifting graph behind a headline is the kind of ambient
 * motion that reads as decoration for its own sake, and it would fight the
 * `prefers-reduced-motion` contract the rest of the site keeps.
 */
export default function HeroGraph() {
  const { edges, nodes, viewBox } = useMemo(() => {
    const b = TECHMAP_BOUNDS;

    const e = TECHMAP_EDGES.map(([a, z], i) => {
      const p = TECHMAP_LAYOUT[a];
      const q = TECHMAP_LAYOUT[z];
      if (!p || !q) return null;
      return { key: `${a}-${z}-${i}`, x1: p.x, y1: p.y, x2: q.x, y2: q.y };
    }).filter(Boolean);

    const n = Object.keys(TECHMAP_NODES).map((id) => {
      const p = TECHMAP_LAYOUT[id];
      if (!p) return null;
      return { id, x: p.x, y: p.y, color: TECH_TYPE_COLOR[TECHMAP_NODES[id].type] };
    }).filter(Boolean);

    return { edges: e, nodes: n, viewBox: `${b.x} ${b.y} ${b.w} ${b.h}` };
  }, []);

  return (
    <svg
      className="hero__graph"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className="hero__graph-edges">
        {edges.map((e) => (
          <line key={e.key} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} />
        ))}
      </g>
      <g>
        {nodes.map((n) => (
          <circle key={n.id} cx={n.x} cy={n.y} r={7} fill={n.color} />
        ))}
      </g>
    </svg>
  );
}
