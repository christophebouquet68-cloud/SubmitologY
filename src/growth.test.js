import { render, screen, fireEvent, act } from "@testing-library/react";
import { T } from "./i18n";
import Strength from "./pages/Strength";
import {
  TECHMAP_NODES, TECHMAP_EDGES, TECHMAP_NEIGHBORS, TECHMAP_LAYOUT,
  NODE_IDS, SLUG_TO_ID, findPath,
} from "./data/techmap";
import { TECH_DESC } from "./data/techmap-i18n";
import { EX_CUES } from "./data/exercise-cues";
import { EX_FIGURES } from "./data/exercise-figures";
import {
  parseRx, buildProgram, AGE_RANGES, LEVELS, PROGRAM_TYPES,
} from "./data/program";

const LANGS = ["en", "fr", "ja", "pt", "ro"];

// The Strength page persists `sc-choice` and `sc-built`, so a test that builds
// a program leaves the next one rendering the *result* instead of the form —
// and the age pills it wants to click are never on screen. Clearing between
// tests is what makes each one start from the same place.
beforeEach(() => window.localStorage.clear());

/* ── The technique map ────────────────────────────────────────────────────── */

test("every technique has a description in all five languages", () => {
  NODE_IDS.forEach((id) => {
    expect(TECH_DESC[id]).toBeTruthy();
    LANGS.forEach((l) => expect(TECH_DESC[id][l] && TECH_DESC[id][l].length).toBeGreaterThan(10));
  });
});

test("no description is orphaned from a node", () => {
  Object.keys(TECH_DESC).forEach((id) => expect(TECHMAP_NODES[id]).toBeTruthy());
});

test("slugs are unique — they are public URLs and must not collide", () => {
  expect(Object.keys(SLUG_TO_ID).length).toBe(NODE_IDS.length);
});

test("every edge points at a real node, and no technique is stranded", () => {
  TECHMAP_EDGES.forEach(([a, b]) => {
    expect(TECHMAP_NODES[a]).toBeTruthy();
    expect(TECHMAP_NODES[b]).toBeTruthy();
  });
  NODE_IDS.forEach((id) => expect(TECHMAP_NEIGHBORS[id].length).toBeGreaterThan(0));
});

test("the graph is one connected component, so the route finder always answers", () => {
  // findPath returns null for unreachable pairs. A second component would mean
  // a technique you can see on the map but can never route to.
  const start = NODE_IDS[0];
  NODE_IDS.forEach((id) => expect(findPath(start, id)).not.toBeNull());
});

test("no two nodes land closer than the map's ~52px hit radius", () => {
  // TechniqueMap resolves a tap to the nearest node within ~52px. Any pair
  // closer than that is ambiguous to tap, which is what happened the first
  // time the map grew: the force simulation diverged and put two nodes 8px
  // apart. Guard the property, not the constants that produce it.
  let min = Infinity;
  for (let i = 0; i < NODE_IDS.length; i++) {
    for (let j = i + 1; j < NODE_IDS.length; j++) {
      const a = TECHMAP_LAYOUT[NODE_IDS[i]], b = TECHMAP_LAYOUT[NODE_IDS[j]];
      min = Math.min(min, Math.hypot(a.x - b.x, a.y - b.y));
    }
  }
  expect(min).toBeGreaterThan(52);
});

test("the layout is deterministic, so spatial memory survives a reload", () => {
  const snapshot = JSON.stringify(TECHMAP_LAYOUT);
  jest.resetModules();
  return import("./data/techmap").then((again) => {
    expect(JSON.stringify(again.TECHMAP_LAYOUT)).toBe(snapshot);
  });
});

/* ── Exercise cues ────────────────────────────────────────────────────────── */

test("every exercise the engine can prescribe has a cue in five languages", () => {
  const ids = new Set();
  AGE_RANGES.forEach((a) => LEVELS.forEach((l) => PROGRAM_TYPES.forEach((ty) => {
    const p = buildProgram(a, l, ty);
    p.warmup.items.forEach((i) => ids.add(i));
    p.cooldown.items.forEach((i) => ids.add(i));
    p.blocks.forEach((b) => b.items.forEach((i) => ids.add(i)));
  })));
  expect(ids.size).toBeGreaterThan(40);
  ids.forEach((id) => {
    expect(EX_CUES[id]).toBeTruthy();
    LANGS.forEach((l) => expect(EX_CUES[id][l] && EX_CUES[id][l].length).toBeGreaterThan(20));
  });
});

test("cues and exercise names cover exactly the same ids", () => {
  expect(Object.keys(EX_CUES).sort()).toEqual(Object.keys(T.sc.ex).sort());
});

/* ── Figures ──────────────────────────────────────────────────────────────── */

const JOINTS = ["hd", "nk", "hp", "kn", "an", "kf", "af", "el", "ha", "ef", "hf"];
const SEGMENTS = [
  ["hd", "nk"], ["nk", "hp"], ["hp", "kn"], ["kn", "an"], ["hp", "kf"],
  ["kf", "af"], ["nk", "el"], ["el", "ha"], ["nk", "ef"], ["ef", "hf"],
];
const len = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

test("every exercise has a figure, and every figure has all its joints", () => {
  Object.keys(EX_CUES).forEach((id) => expect(EX_FIGURES[id]).toBeTruthy());
  Object.entries(EX_FIGURES).forEach(([id, fig]) => {
    expect(fig.frames.length).toBeGreaterThan(0);
    expect(fig.frames.length).toBeLessThan(3);
    fig.frames.forEach((f) => JOINTS.forEach((j) => {
      expect(Array.isArray(f[j])).toBe(true);
    }));
  });
});

test("no joint falls outside the 120 × 88 viewBox", () => {
  Object.entries(EX_FIGURES).forEach(([id, fig]) => {
    fig.frames.forEach((f, i) => JOINTS.forEach((j) => {
      const [x, y] = f[j];
      expect(`${id}.${i}.${j}.x=${x}`).toBe(x >= 3 && x <= 117 ? `${id}.${i}.${j}.x=${x}` : "in range");
      expect(`${id}.${i}.${j}.y=${y}`).toBe(y >= 3 && y <= 85 ? `${id}.${i}.${j}.y=${y}` : "in range");
    }));
  });
});

test("limbs keep their length between the two frames of a movement", () => {
  // A shin that grows 40% between start and end reads as a broken drawing
  // rather than as movement. Small variation is foreshortening and fine.
  Object.entries(EX_FIGURES).forEach(([id, fig]) => {
    if (fig.frames.length !== 2) return;
    SEGMENTS.forEach(([a, b]) => {
      const l0 = len(fig.frames[0][a], fig.frames[0][b]);
      const l1 = len(fig.frames[1][a], fig.frames[1][b]);
      const ratio = Math.max(l0, l1) / Math.min(l0, l1);
      expect(`${id} ${a}-${b} ${ratio.toFixed(2)}`)
        .toBe(ratio < 1.2 ? `${id} ${a}-${b} ${ratio.toFixed(2)}` : "within tolerance");
    });
  });
});

/* ── The prescription parser and the tracker ──────────────────────────────── */

test("parseRx reads all three prescription shapes and refuses the fourth", () => {
  expect(parseRx("2 × 10")).toEqual({ kind: "reps", sets: 2, amount: 10 });
  expect(parseRx("4 × 45s")).toEqual({ kind: "time", sets: 4, amount: 45 });
  expect(parseRx("5 rounds · 30s on / 30s off"))
    .toEqual({ kind: "rounds", sets: 5, workSec: 30, restSec: 30 });
  expect(parseRx("6 min")).toBeNull();
  expect(parseRx(undefined)).toBeNull();
});

test("every rx the engine can emit is countable", () => {
  AGE_RANGES.forEach((a) => LEVELS.forEach((l) => PROGRAM_TYPES.forEach((ty) => {
    buildProgram(a, l, ty).blocks.forEach((b) => {
      expect(parseRx(b.rx)).not.toBeNull();
    });
  })));
});

/* ── The page ─────────────────────────────────────────────────────────────── */

function buildOnPage() {
  render(<Strength lang="en" />);
  fireEvent.click(screen.getByText("20 – 30"));
  fireEvent.click(screen.getByText("Beginner"));
  fireEvent.click(screen.getByText("No Equipment"));
  fireEvent.click(screen.getByText("Build My Program"));
}

test("the cue is hidden until asked for, and the diagram comes with it", () => {
  buildOnPage();
  const toggle = screen.getAllByText("How to do it")[0];
  const panel = document.getElementById(toggle.getAttribute("aria-controls"));
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  expect(panel.hasAttribute("hidden")).toBe(true);
  // Present in the DOM while collapsed — that is what lets the print
  // stylesheet open it for the handout.
  expect(panel.querySelector("svg")).toBeTruthy();
  fireEvent.click(toggle);
  expect(toggle.getAttribute("aria-expanded")).toBe("true");
  expect(panel.hasAttribute("hidden")).toBe(false);
});

test("logging a set fills a pip and starts the rest clock", () => {
  jest.useFakeTimers();
  buildOnPage();
  const tracker = document.querySelector(".tracker");
  expect(tracker.querySelectorAll(".tracker__pip").length).toBe(2); // Beginner: 2 × 10
  expect(tracker.querySelectorAll(".tracker__pip.is-done").length).toBe(0);

  fireEvent.click(tracker.querySelector(".tracker__btn"));
  expect(tracker.querySelectorAll(".tracker__pip.is-done").length).toBe(1);
  expect(tracker.querySelector(".tracker__status").textContent).toMatch(/Rest 1:00/);

  act(() => { jest.advanceTimersByTime(60000); });
  expect(tracker.querySelector(".tracker__status").textContent).toBe("1 / 2 sets");
  jest.useRealTimers();
});

test("the rest clock does not run after the final set", () => {
  jest.useFakeTimers();
  buildOnPage();
  const tracker = document.querySelector(".tracker");
  fireEvent.click(tracker.querySelector(".tracker__btn"));
  act(() => { jest.advanceTimersByTime(60000); });
  fireEvent.click(tracker.querySelector(".tracker__btn"));
  expect(tracker.querySelector(".tracker__status").textContent).toBe("All done");
  jest.useRealTimers();
});

test("tracker progress is not written to localStorage", () => {
  // The privacy policy lists the exact keys this site writes. If mid-workout
  // progress ever starts persisting, legal.js has to change in the same
  // commit — this test is the tripwire.
  //
  // The keys carry usePersistentState's "submitology:" namespace, so the two
  // the builder legitimately writes are spelled out in full here rather than
  // by their bare names.
  jest.useFakeTimers();
  const before = new Set(Object.keys(window.localStorage));
  buildOnPage();
  fireEvent.click(document.querySelector(".tracker__btn"));
  const added = Object.keys(window.localStorage).filter((k) => !before.has(k));
  expect(added.sort()).toEqual(["submitology:sc-built", "submitology:sc-choice"]);
  jest.useRealTimers();
});
