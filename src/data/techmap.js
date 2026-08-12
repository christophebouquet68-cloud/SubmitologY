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
  /* Guards — where the bottom player attacks from */
  closedGuard:          { slug: "closed-guard",            name: "Closed Guard",            type: "position",    sub: "guard",      hx:  150, hy:  150 },
  openGuard:            { slug: "open-guard",              name: "Open Guard",              type: "position",    sub: "guard",      hx:  280, hy:  130 },
  spiderGuard:          { slug: "spider-guard",            name: "Spider Guard",            type: "position",    sub: "guard",      hx:  400, hy:  140 },
  lassoGuard:           { slug: "lasso-guard",             name: "Lasso Guard",             type: "position",    sub: "guard",      hx:  420, hy:  240 },
  deLaRivaGuard:        { slug: "de-la-riva-guard",        name: "De La Riva Guard",        type: "position",    sub: "guard",      hx:  300, hy:  230 },
  reverseDeLaRiva:      { slug: "reverse-de-la-riva",      name: "Reverse De La Riva",      type: "position",    sub: "guard",      hx:  410, hy:  330 },
  butterflyGuard:       { slug: "butterfly-guard",         name: "Butterfly Guard",         type: "position",    sub: "guard",      hx:  190, hy:  240 },
  halfGuard:            { slug: "half-guard",              name: "Half Guard",              type: "position",    sub: "guard",      hx:  130, hy:  320 },
  kneeShieldHalfGuard:  { slug: "knee-shield-half-guard",  name: "Knee Shield Half Guard",  type: "position",    sub: "guard",      hx:  150, hy:  410 },
  deepHalfGuard:        { slug: "deep-half-guard",         name: "Deep Half Guard",         type: "position",    sub: "guard",      hx:  260, hy:  420 },
  xGuard:               { slug: "x-guard",                 name: "X-Guard",                 type: "position",    sub: "guard",      hx:  300, hy:  330 },
  singleLegX:           { slug: "single-leg-x",            name: "Single Leg X",            type: "position",    sub: "guard",      hx:  390, hy:  430 },

  /* Dominant / controlling positions */
  mount:                { slug: "mount",                   name: "Mount",                   type: "position",    sub: "dominant",   hx:  180, hy:  600 },
  sideControl:          { slug: "side-control",            name: "Side Control",            type: "position",    sub: "dominant",   hx:  300, hy:  630 },
  kneeOnBelly:          { slug: "knee-on-belly",           name: "Knee-on-Belly",           type: "position",    sub: "dominant",   hx:  150, hy:  700 },
  northSouth:           { slug: "north-south",             name: "North-South",             type: "position",    sub: "dominant",   hx:  390, hy:  670 },
  backControl:          { slug: "back-control",            name: "Back Control",            type: "position",    sub: "dominant",   hx:  250, hy:  740 },
  crucifix:             { slug: "crucifix",                name: "Crucifix",                type: "position",    sub: "dominant",   hx:  170, hy:  800 },
  frontHeadlock:        { slug: "front-headlock",          name: "Front Headlock",          type: "position",    sub: "dominant",   hx:  360, hy:  780 },

  /* Guard passes */
  toreandoPass:         { slug: "toreando-pass",           name: "Toreando Pass",           type: "transition",  sub: "guardPass",  hx:  640, hy:  110 },
  kneeCutPass:          { slug: "knee-cut-pass",           name: "Knee Cut Pass",           type: "transition",  sub: "guardPass",  hx:  760, hy:   80 },
  legDrag:              { slug: "leg-drag",                name: "Leg Drag",                type: "transition",  sub: "guardPass",  hx:  880, hy:  110 },
  doubleUnderPass:      { slug: "double-under-pass",       name: "Double Under Pass",       type: "transition",  sub: "guardPass",  hx:  700, hy:  210 },
  overUnderPass:        { slug: "over-under-pass",         name: "Over-Under Pass",         type: "transition",  sub: "guardPass",  hx:  820, hy:  200 },
  stackPass:            { slug: "stack-pass",              name: "Stack Pass",              type: "transition",  sub: "guardPass",  hx:  940, hy:  190 },

  /* Sweeps */
  scissorSweep:         { slug: "scissor-sweep",           name: "Scissor Sweep",           type: "transition",  sub: "sweep",      hx:  620, hy:  310 },
  hipBumpSweep:         { slug: "hip-bump-sweep",          name: "Hip Bump Sweep",          type: "transition",  sub: "sweep",      hx:  740, hy:  300 },
  pendulumSweep:        { slug: "pendulum-sweep",          name: "Pendulum Sweep",          type: "transition",  sub: "sweep",      hx:  860, hy:  320 },
  butterflySweep:       { slug: "butterfly-sweep",         name: "Butterfly Sweep",         type: "transition",  sub: "sweep",      hx:  620, hy:  410 },
  xGuardSweep:          { slug: "x-guard-sweep",           name: "X-Guard Sweep",           type: "transition",  sub: "sweep",      hx:  740, hy:  400 },
  berimbolo:            { slug: "berimbolo",               name: "Berimbolo",               type: "transition",  sub: "sweep",      hx:  870, hy:  410 },
  tripodSweep:          { slug: "tripod-sweep",            name: "Tripod Sweep",            type: "transition",  sub: "sweep",      hx:  660, hy:  500 },
  oldSchoolSweep:       { slug: "old-school-sweep",        name: "Old School Sweep",        type: "transition",  sub: "sweep",      hx:  790, hy:  500 },

  /* Escapes and guard recovery */
  mountEscape:          { slug: "mount-escape",            name: "Mount Escape (Upa)",      type: "transition",  sub: "escape",     hx: 1040, hy:  190 },
  sideControlEscape:    { slug: "side-control-escape",     name: "Side Control Escape",     type: "transition",  sub: "escape",     hx: 1170, hy:  150 },
  backEscape:           { slug: "back-escape",             name: "Back Escape",             type: "transition",  sub: "escape",     hx: 1180, hy:  270 },
  hipEscape:            { slug: "hip-escape",              name: "Hip Escape (Shrimp)",     type: "transition",  sub: "escape",     hx: 1040, hy:  300 },
  kneeOnBellyEscape:    { slug: "knee-on-belly-escape",    name: "Knee-on-Belly Escape",    type: "transition",  sub: "escape",     hx: 1160, hy:  380 },
  granbyRoll:           { slug: "granby-roll",             name: "Granby Roll",             type: "transition",  sub: "escape",     hx: 1030, hy:  410 },

  /* Chokes and strangles */
  rearNakedChoke:       { slug: "rear-naked-choke",        name: "Rear Naked Choke",        type: "submission",  sub: "choke",      hx:  620, hy:  600 },
  guillotine:           { slug: "guillotine",              name: "Guillotine",              type: "submission",  sub: "choke",      hx:  730, hy:  590 },
  triangleChoke:        { slug: "triangle-choke",          name: "Triangle Choke",          type: "submission",  sub: "choke",      hx:  840, hy:  600 },
  dArceChoke:           { slug: "darce-choke",             name: "D'Arce Choke",            type: "submission",  sub: "choke",      hx:  940, hy:  600 },
  crossCollarChoke:     { slug: "cross-collar-choke",      name: "Cross Collar Choke",      type: "submission",  sub: "choke",      hx:  620, hy:  700 },
  armTriangle:          { slug: "arm-triangle",            name: "Arm Triangle",            type: "submission",  sub: "choke",      hx:  730, hy:  690 },
  bowAndArrowChoke:     { slug: "bow-and-arrow-choke",     name: "Bow and Arrow Choke",     type: "submission",  sub: "choke",      hx:  840, hy:  700 },
  anacondaChoke:        { slug: "anaconda-choke",          name: "Anaconda Choke",          type: "submission",  sub: "choke",      hx:  940, hy:  690 },
  ezekielChoke:         { slug: "ezekiel-choke",           name: "Ezekiel Choke",           type: "submission",  sub: "choke",      hx:  620, hy:  800 },
  loopChoke:            { slug: "loop-choke",              name: "Loop Choke",              type: "submission",  sub: "choke",      hx:  730, hy:  790 },
  clockChoke:           { slug: "clock-choke",             name: "Clock Choke",             type: "submission",  sub: "choke",      hx:  840, hy:  800 },
  northSouthChoke:      { slug: "north-south-choke",       name: "North-South Choke",       type: "submission",  sub: "choke",      hx:  940, hy:  790 },

  /* Joint locks */
  armbar:               { slug: "armbar",                  name: "Armbar",                  type: "submission",  sub: "jointLock",  hx: 1040, hy:  540 },
  kimura:               { slug: "kimura",                  name: "Kimura",                  type: "submission",  sub: "jointLock",  hx: 1160, hy:  520 },
  wristLock:            { slug: "wrist-lock",              name: "Wrist Lock",              type: "submission",  sub: "jointLock",  hx: 1270, hy:  590 },
  americana:            { slug: "americana",               name: "Americana",               type: "submission",  sub: "jointLock",  hx: 1050, hy:  650 },
  omoplata:             { slug: "omoplata",                name: "Omoplata",                type: "submission",  sub: "jointLock",  hx: 1170, hy:  640 },
  heelHook:             { slug: "heel-hook",               name: "Heel Hook",               type: "submission",  sub: "jointLock",  hx: 1270, hy:  700 },
  straightAnkleLock:    { slug: "straight-ankle-lock",     name: "Straight Ankle Lock",     type: "submission",  sub: "jointLock",  hx: 1040, hy:  760 },
  kneebar:              { slug: "kneebar",                 name: "Kneebar",                 type: "submission",  sub: "jointLock",  hx: 1160, hy:  750 },
  toeHold:              { slug: "toe-hold",                name: "Toe Hold",                type: "submission",  sub: "jointLock",  hx: 1170, hy:  840 },
};

export const TECHMAP_EDGES = [
  /* Closed guard */
  ["closedGuard", "scissorSweep"], ["closedGuard", "hipBumpSweep"], ["closedGuard", "pendulumSweep"],
  ["closedGuard", "triangleChoke"], ["closedGuard", "armbar"], ["closedGuard", "omoplata"],
  ["closedGuard", "crossCollarChoke"], ["closedGuard", "guillotine"], ["closedGuard", "ezekielChoke"],
  ["closedGuard", "loopChoke"], ["closedGuard", "wristLock"], ["closedGuard", "stackPass"],

  /* Open guard and its variants */
  ["openGuard", "deLaRivaGuard"], ["openGuard", "butterflyGuard"], ["openGuard", "xGuard"],
  ["openGuard", "spiderGuard"], ["openGuard", "lassoGuard"], ["openGuard", "reverseDeLaRiva"],
  ["openGuard", "toreandoPass"], ["openGuard", "legDrag"], ["openGuard", "overUnderPass"],
  ["openGuard", "stackPass"], ["openGuard", "tripodSweep"], ["openGuard", "loopChoke"],
  ["spiderGuard", "lassoGuard"], ["spiderGuard", "triangleChoke"], ["spiderGuard", "omoplata"],
  ["spiderGuard", "toreandoPass"],
  ["lassoGuard", "omoplata"], ["lassoGuard", "triangleChoke"], ["lassoGuard", "pendulumSweep"],
  ["deLaRivaGuard", "berimbolo"], ["deLaRivaGuard", "reverseDeLaRiva"], ["deLaRivaGuard", "tripodSweep"],
  ["reverseDeLaRiva", "kneeCutPass"], ["reverseDeLaRiva", "singleLegX"],

  /* Half guard family */
  ["halfGuard", "kimura"], ["halfGuard", "backControl"], ["halfGuard", "kneeCutPass"], ["halfGuard", "backEscape"],
  ["halfGuard", "kneeShieldHalfGuard"], ["halfGuard", "deepHalfGuard"], ["halfGuard", "overUnderPass"],
  ["halfGuard", "dArceChoke"], ["halfGuard", "toeHold"],
  ["kneeShieldHalfGuard", "oldSchoolSweep"], ["kneeShieldHalfGuard", "kimura"], ["kneeShieldHalfGuard", "kneeCutPass"],
  ["deepHalfGuard", "xGuard"], ["deepHalfGuard", "singleLegX"], ["deepHalfGuard", "oldSchoolSweep"],

  /* Butterfly, X and single leg X */
  ["butterflyGuard", "butterflySweep"], ["butterflyGuard", "xGuard"], ["butterflyGuard", "straightAnkleLock"],
  ["xGuard", "xGuardSweep"], ["xGuard", "singleLegX"], ["xGuard", "heelHook"], ["xGuard", "kneebar"],
  ["singleLegX", "straightAnkleLock"], ["singleLegX", "heelHook"], ["singleLegX", "toeHold"],
  ["singleLegX", "kneebar"], ["singleLegX", "xGuardSweep"],

  /* Sweeps land in top positions */
  ["scissorSweep", "mount"], ["hipBumpSweep", "mount"], ["butterflySweep", "mount"], ["butterflySweep", "backControl"],
  ["berimbolo", "backControl"], ["xGuardSweep", "mount"], ["xGuardSweep", "backControl"],
  ["pendulumSweep", "mount"], ["pendulumSweep", "armbar"],
  ["tripodSweep", "sideControl"], ["oldSchoolSweep", "mount"], ["oldSchoolSweep", "sideControl"],

  /* Passes land in top positions */
  ["toreandoPass", "sideControl"], ["toreandoPass", "kneeOnBelly"], ["kneeCutPass", "sideControl"], ["kneeCutPass", "mount"],
  ["doubleUnderPass", "mount"], ["doubleUnderPass", "sideControl"], ["legDrag", "backControl"], ["legDrag", "sideControl"],
  ["overUnderPass", "sideControl"], ["stackPass", "sideControl"], ["stackPass", "northSouth"],
  ["doubleUnderPass", "openGuard"],

  /* Dominant positions and their attacks */
  ["mount", "armbar"], ["mount", "americana"], ["mount", "crossCollarChoke"], ["mount", "backControl"],
  ["mount", "kneeOnBelly"], ["mount", "mountEscape"], ["mount", "ezekielChoke"], ["mount", "wristLock"],
  ["sideControl", "kimura"], ["sideControl", "americana"], ["sideControl", "armTriangle"], ["sideControl", "kneeOnBelly"],
  ["sideControl", "sideControlEscape"], ["sideControl", "dArceChoke"], ["sideControl", "northSouthChoke"],
  ["sideControl", "clockChoke"], ["sideControl", "wristLock"],
  ["kneeOnBelly", "armbar"], ["kneeOnBelly", "crossCollarChoke"], ["kneeOnBelly", "kneeOnBellyEscape"],
  ["backControl", "rearNakedChoke"], ["backControl", "bowAndArrowChoke"], ["backControl", "armbar"],
  ["backControl", "backEscape"], ["backControl", "crucifix"], ["backControl", "ezekielChoke"], ["backControl", "clockChoke"],
  ["northSouth", "kimura"], ["northSouth", "armTriangle"], ["northSouth", "sideControl"], ["northSouth", "mount"],
  ["northSouth", "northSouthChoke"], ["northSouth", "anacondaChoke"], ["northSouth", "granbyRoll"],
  ["crucifix", "armbar"], ["crucifix", "clockChoke"],
  ["frontHeadlock", "guillotine"], ["frontHeadlock", "dArceChoke"], ["frontHeadlock", "anacondaChoke"],
  ["frontHeadlock", "backControl"], ["frontHeadlock", "loopChoke"],

  /* Escapes and guard recovery */
  ["mountEscape", "closedGuard"], ["mountEscape", "openGuard"],
  ["sideControlEscape", "closedGuard"], ["sideControlEscape", "openGuard"],
  ["backEscape", "openGuard"],
  ["hipEscape", "sideControl"], ["hipEscape", "mount"], ["hipEscape", "closedGuard"],
  ["hipEscape", "halfGuard"], ["hipEscape", "openGuard"],
  ["kneeOnBellyEscape", "openGuard"], ["kneeOnBellyEscape", "halfGuard"],
  ["granbyRoll", "sideControl"], ["granbyRoll", "openGuard"],

  /* Leg locks share an entry */
  ["kneebar", "straightAnkleLock"], ["toeHold", "straightAnkleLock"], ["heelHook", "kneebar"],
  ["openGuard", "straightAnkleLock"],
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

// Constants retuned when the map grew from 34 nodes to 60. They are not
// arbitrary, and three of the changes are the difference between a readable
// graph and an unusable one:
//
//   MAX_FORCE / MAX_STEP  Repulsion is summed over every pair, so it scales
//                         with n². At 34 nodes the old constants settled; at
//                         60 the velocities compounded faster than DAMPING
//                         could bleed them off and the simulation diverged —
//                         2200×1500 bounds with two nodes 8px apart. Capping
//                         the per-pair force and the per-iteration step makes
//                         the integrator stable at any node count.
//   REST_LEN 85 → 145     Springs pull connected nodes together, and the map
//                         now spans a wider canvas. At the old rest length the
//                         cross-cluster edges (guard → pass → dominant) hauled
//                         everything into one ball.
//   HOME_K 0.015 → 0.30   Stronger home attraction is what keeps the seven
//                         zones where they were placed rather than letting the
//                         springs decide the arrangement.
//
// The property being protected is spacing: hit testing picks the nearest node
// within ~52px, so any pair closer than that becomes ambiguous to tap. The
// closest pair under these constants is ~55 units apart. If you add
// techniques, re-check that number before shipping.
function computeLayout() {
  const rand = mulberry32(20260724);
  const pos = {};
  NODE_IDS.forEach((id) => {
    const n = TECHMAP_NODES[id];
    pos[id] = { x: n.hx + (rand() - 0.5) * 20, y: n.hy + (rand() - 0.5) * 20, vx: 0, vy: 0 };
  });

  const REPULSE_K = 6000, SPRING_K = 0.015, REST_LEN = 145, HOME_K = 0.30;
  const DAMPING = 0.89, ITER = 500, MAX_FORCE = 55, MAX_STEP = 12;

  for (let iter = 0; iter < ITER; iter++) {
    for (let i = 0; i < NODE_IDS.length; i++) {
      for (let j = i + 1; j < NODE_IDS.length; j++) {
        const a = pos[NODE_IDS[i]], b = pos[NODE_IDS[j]];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d2 = dx * dx + dy * dy + 0.01, d = Math.sqrt(d2);
        // Clamped: without this, two nodes that start close produce an
        // effectively infinite impulse and fling each other off the canvas.
        const f = Math.min(REPULSE_K / d2, MAX_FORCE);
        const fx = (f * dx) / d, fy = (f * dy) / d;
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
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > MAX_STEP) { p.vx = (p.vx / speed) * MAX_STEP; p.vy = (p.vy / speed) * MAX_STEP; }
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
    // Averaged over the SETTLED positions rather than the `hx`/`hy` hints.
    // Home coordinates are only a starting suggestion — a node can finish a
    // couple of hundred units away — so a centroid of hints would float the
    // zone label off its own cluster.
    const p = TECHMAP_LAYOUT[id];
    if (!acc[n.sub]) acc[n.sub] = { sx: 0, sy: 0, c: 0 };
    acc[n.sub].sx += p.x; acc[n.sub].sy += p.y; acc[n.sub].c += 1;
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
