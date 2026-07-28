// ─── data/techmap.js — the technique graph ──────────────────────────────────
// Single source of truth for the map: nodes, edges, adjacency, layout and
// path-finding. Nothing here touches React, so it can be unit-tested directly.

export const TECH_TYPE_COLOR = {
  position:   "#4cc9f0",
  transition: "#ff8534",
  submission: "#ff5c5c",
};

// `slug` gives every technique a stable URL (#/map/closed-guard) — it must not
// change once published, since links will be shared.
export const TECHMAP_NODES = {
  closedGuard:      { slug: "closed-guard",        name: "Closed Guard",        type: "position",   sub: "guard",     hx: 170, hy: 190 },
  openGuard:        { slug: "open-guard",          name: "Open Guard",          type: "position",   sub: "guard",     hx: 250, hy: 140 },
  halfGuard:        { slug: "half-guard",          name: "Half Guard",          type: "position",   sub: "guard",     hx: 140, hy: 270 },
  butterflyGuard:   { slug: "butterfly-guard",     name: "Butterfly Guard",     type: "position",   sub: "guard",     hx: 250, hy: 250 },
  deLaRivaGuard:    { slug: "de-la-riva-guard",    name: "De La Riva Guard",    type: "position",   sub: "guard",     hx: 320, hy: 180 },
  xGuard:           { slug: "x-guard",             name: "X-Guard",             type: "position",   sub: "guard",     hx: 320, hy: 270 },
  mount:            { slug: "mount",               name: "Mount",               type: "position",   sub: "dominant",  hx: 170, hy: 470 },
  sideControl:      { slug: "side-control",        name: "Side Control",        type: "position",   sub: "dominant",  hx: 250, hy: 510 },
  kneeOnBelly:      { slug: "knee-on-belly",       name: "Knee-on-Belly",       type: "position",   sub: "dominant",  hx: 140, hy: 550 },
  backControl:      { slug: "back-control",        name: "Back Control",        type: "position",   sub: "dominant",  hx: 240, hy: 590 },
  northSouth:       { slug: "north-south",         name: "North-South",         type: "position",   sub: "dominant",  hx: 320, hy: 540 },
  toreandoPass:     { slug: "toreando-pass",       name: "Toreando Pass",       type: "transition", sub: "guardPass", hx: 520, hy: 110 },
  kneeCutPass:      { slug: "knee-cut-pass",       name: "Knee Cut Pass",       type: "transition", sub: "guardPass", hx: 600, hy:  80 },
  doubleUnderPass:  { slug: "double-under-pass",   name: "Double Under Pass",   type: "transition", sub: "guardPass", hx: 600, hy: 160 },
  legDrag:          { slug: "leg-drag",            name: "Leg Drag",            type: "transition", sub: "guardPass", hx: 680, hy: 110 },
  scissorSweep:     { slug: "scissor-sweep",       name: "Scissor Sweep",       type: "transition", sub: "sweep",     hx: 520, hy: 250 },
  hipBumpSweep:     { slug: "hip-bump-sweep",      name: "Hip Bump Sweep",      type: "transition", sub: "sweep",     hx: 600, hy: 220 },
  butterflySweep:   { slug: "butterfly-sweep",     name: "Butterfly Sweep",     type: "transition", sub: "sweep",     hx: 680, hy: 250 },
  berimbolo:        { slug: "berimbolo",           name: "Berimbolo",           type: "transition", sub: "sweep",     hx: 600, hy: 300 },
  xGuardSweep:      { slug: "x-guard-sweep",       name: "X-Guard Sweep",       type: "transition", sub: "sweep",     hx: 520, hy: 320 },
  mountEscape:      { slug: "mount-escape",        name: "Mount Escape (Upa)",  type: "transition", sub: "escape",    hx: 780, hy: 210 },
  sideControlEscape:{ slug: "side-control-escape", name: "Side Control Escape", type: "transition", sub: "escape",    hx: 850, hy: 170 },
  backEscape:       { slug: "back-escape",         name: "Back Escape",         type: "transition", sub: "escape",    hx: 850, hy: 250 },
  rearNakedChoke:   { slug: "rear-naked-choke",    name: "Rear Naked Choke",    type: "submission", sub: "choke",     hx: 520, hy: 490 },
  guillotine:       { slug: "guillotine",          name: "Guillotine",          type: "submission", sub: "choke",     hx: 600, hy: 460 },
  triangleChoke:    { slug: "triangle-choke",      name: "Triangle Choke",      type: "submission", sub: "choke",     hx: 680, hy: 490 },
  armTriangle:      { slug: "arm-triangle",        name: "Arm Triangle",        type: "submission", sub: "choke",     hx: 600, hy: 540 },
  crossCollarChoke: { slug: "cross-collar-choke",  name: "Cross Collar Choke",  type: "submission", sub: "choke",     hx: 520, hy: 570 },
  bowAndArrowChoke: { slug: "bow-and-arrow-choke", name: "Bow and Arrow Choke", type: "submission", sub: "choke",     hx: 680, hy: 570 },
  armbar:           { slug: "armbar",              name: "Armbar",              type: "submission", sub: "jointLock", hx: 780, hy: 440 },
  kimura:           { slug: "kimura",              name: "Kimura",              type: "submission", sub: "jointLock", hx: 850, hy: 480 },
  americana:        { slug: "americana",           name: "Americana",           type: "submission", sub: "jointLock", hx: 850, hy: 550 },
  omoplata:         { slug: "omoplata",            name: "Omoplata",            type: "submission", sub: "jointLock", hx: 780, hy: 590 },
  straightAnkleLock:{ slug: "straight-ankle-lock", name: "Straight Ankle Lock", type: "submission", sub: "jointLock", hx: 850, hy: 620 },
};

export const TECHMAP_EDGES = [
  ["closedGuard", "scissorSweep"], ["closedGuard", "hipBumpSweep"], ["closedGuard", "triangleChoke"],
  ["closedGuard", "armbar"], ["closedGuard", "omoplata"], ["closedGuard", "crossCollarChoke"], ["closedGuard", "guillotine"],
  ["openGuard", "deLaRivaGuard"], ["openGuard", "butterflyGuard"], ["openGuard", "xGuard"],
  ["openGuard", "toreandoPass"], ["openGuard", "legDrag"],
  ["halfGuard", "kimura"], ["halfGuard", "backControl"], ["halfGuard", "kneeCutPass"], ["halfGuard", "backEscape"],
  ["butterflyGuard", "butterflySweep"], ["butterflyGuard", "xGuard"],
  ["deLaRivaGuard", "berimbolo"], ["xGuard", "xGuardSweep"],
  ["scissorSweep", "mount"], ["hipBumpSweep", "mount"], ["butterflySweep", "mount"], ["butterflySweep", "backControl"],
  ["berimbolo", "backControl"], ["xGuardSweep", "mount"], ["xGuardSweep", "backControl"],
  ["toreandoPass", "sideControl"], ["toreandoPass", "kneeOnBelly"], ["kneeCutPass", "sideControl"], ["kneeCutPass", "mount"],
  ["doubleUnderPass", "mount"], ["doubleUnderPass", "sideControl"], ["legDrag", "backControl"], ["legDrag", "sideControl"],
  ["mount", "armbar"], ["mount", "americana"], ["mount", "crossCollarChoke"], ["mount", "backControl"], ["mount", "kneeOnBelly"], ["mount", "mountEscape"],
  ["sideControl", "kimura"], ["sideControl", "americana"], ["sideControl", "armTriangle"], ["sideControl", "kneeOnBelly"],
  ["sideControl", "sideControlEscape"],
  ["kneeOnBelly", "armbar"], ["kneeOnBelly", "crossCollarChoke"],
  ["backControl", "rearNakedChoke"], ["backControl", "bowAndArrowChoke"], ["backControl", "armbar"], ["backControl", "backEscape"],
  ["northSouth", "kimura"], ["northSouth", "armTriangle"], ["northSouth", "sideControl"],
  ["mountEscape", "closedGuard"], ["mountEscape", "openGuard"],
  ["sideControlEscape", "closedGuard"], ["sideControlEscape", "openGuard"],
  ["backEscape", "openGuard"],
  ["xGuard", "straightAnkleLock"], ["butterflyGuard", "straightAnkleLock"], ["openGuard", "straightAnkleLock"],
  ["doubleUnderPass", "openGuard"], ["northSouth", "mount"],
];

export const NODE_IDS = Object.keys(TECHMAP_NODES);

export const TECHMAP_NEIGHBORS = (() => {
  const map = {};
  NODE_IDS.forEach((id) => { map[id] = []; });
  TECHMAP_EDGES.forEach(([a, b]) => {
    if (!map[a].includes(b)) map[a].push(b);
    if (!map[b].includes(a)) map[b].push(a);
  });
  return map;
})();

export const SLUG_TO_ID = (() => {
  const map = {};
  NODE_IDS.forEach((id) => { map[TECHMAP_NODES[id].slug] = id; });
  return map;
})();

// ─── Layout ──────────────────────────────────────────────────────────────────
// Previously seeded with Math.random(), so the graph shifted on every reload
// and users could never build spatial memory of it. A fixed-seed PRNG keeps the
// organic force-directed feel while making the result byte-identical each load.
function mulberry32(seed) {
  return function next() {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function computeLayout() {
  const rand = mulberry32(20260724);
  const pos = {};
  NODE_IDS.forEach((id) => {
    const n = TECHMAP_NODES[id];
    pos[id] = { x: n.hx + (rand() - 0.5) * 20, y: n.hy + (rand() - 0.5) * 20, vx: 0, vy: 0 };
  });

  const REPULSE_K = 6000, SPRING_K = 0.03, REST_LEN = 85, HOME_K = 0.015, DAMPING = 0.85, ITER = 300;

  for (let iter = 0; iter < ITER; iter++) {
    for (let i = 0; i < NODE_IDS.length; i++) {
      for (let j = i + 1; j < NODE_IDS.length; j++) {
        const a = pos[NODE_IDS[i]], b = pos[NODE_IDS[j]];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d2 = dx * dx + dy * dy + 0.01, d = Math.sqrt(d2);
        const f = REPULSE_K / d2, fx = (f * dx) / d, fy = (f * dy) / d;
        a.vx -= fx; a.vy -= fy; b.vx += fx; b.vy += fy;
      }
    }
    TECHMAP_EDGES.forEach(([a, b]) => {
      const na = pos[a], nb = pos[b];
      const dx = nb.x - na.x, dy = nb.y - na.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const diff = d - REST_LEN;
      const fx = SPRING_K * diff * (dx / d), fy = SPRING_K * diff * (dy / d);
      na.vx += fx; na.vy += fy; nb.vx -= fx; nb.vy -= fy;
    });
    NODE_IDS.forEach((id) => {
      const n = TECHMAP_NODES[id], p = pos[id];
      p.vx += (n.hx - p.x) * HOME_K; p.vy += (n.hy - p.y) * HOME_K;
      p.vx *= DAMPING; p.vy *= DAMPING;
      p.x += p.vx; p.y += p.vy;
    });
  }
  return pos;
}

export const TECHMAP_LAYOUT = computeLayout();

export const TECHMAP_BOUNDS = (() => {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  NODE_IDS.forEach((id) => {
    const p = TECHMAP_LAYOUT[id];
    minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
  });
  const PAD = 70;
  return { x: minX - PAD, y: minY - PAD, w: maxX - minX + PAD * 2, h: maxY - minY + PAD * 2 };
})();

export const ZONE_CENTROIDS = (() => {
  const acc = {};
  NODE_IDS.forEach((id) => {
    const n = TECHMAP_NODES[id];
    if (!acc[n.sub]) acc[n.sub] = { sx: 0, sy: 0, c: 0 };
    acc[n.sub].sx += n.hx; acc[n.sub].sy += n.hy; acc[n.sub].c += 1;
  });
  const out = {};
  Object.keys(acc).forEach((k) => {
    out[k] = { x: acc[k].sx / acc[k].c, y: acc[k].sy / acc[k].c - 34 };
  });
  return out;
})();

// ─── Path finding ────────────────────────────────────────────────────────────
/** Breadth-first shortest path between two techniques. Returns an array of node
 *  ids including both ends, or null if unreachable. This is the feature the
 *  graph data was always capable of but never exposed: "how do I get from
 *  closed guard to a rear naked choke?" */
export function findPath(fromId, toId) {
  if (!fromId || !toId || !TECHMAP_NODES[fromId] || !TECHMAP_NODES[toId]) return null;
  if (fromId === toId) return [fromId];

  const queue = [fromId];
  const cameFrom = { [fromId]: null };

  while (queue.length) {
    const current = queue.shift();
    for (const next of TECHMAP_NEIGHBORS[current]) {
      if (next in cameFrom) continue;
      cameFrom[next] = current;
      if (next === toId) {
        const path = [next];
        let step = current;
        while (step !== null) { path.unshift(step); step = cameFrom[step]; }
        return path;
      }
      queue.push(next);
    }
  }
  return null;
}

/** Consecutive pairs of a path, for highlighting edges. */
export function pathEdgeSet(path) {
  const set = new Set();
  if (!path) return set;
  for (let i = 0; i < path.length - 1; i++) {
    set.add([path[i], path[i + 1]].sort().join("|"));
  }
  return set;
}

export function edgeKey(a, b) {
  return [a, b].sort().join("|");
}
