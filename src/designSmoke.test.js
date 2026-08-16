import { render, screen, fireEvent } from "@testing-library/react";
import BeltRail, { stripesForProgress } from "./components/BeltRail";
import ExerciseFigure from "./components/ExerciseFigure";
import Strength from "./pages/Strength";
import { EX_FIGURES } from "./data/exercise-figures";
import { EX_CUES } from "./data/exercise-cues";
import { LEVEL_BELTS, LEVEL_COLORS, LEVELS } from "./data/program";

/* ═══ The belt rail ═══════════════════════════════════════════════════════ */

test("a belt always has four slots and fills only the stripes it is given", () => {
  const { container } = render(<BeltRail colour="#3c5a8a" stripes={2} />);
  expect(container.querySelectorAll(".rail__stripe").length).toBe(4);
  expect(container.querySelectorAll(".rail__stripe.is-on").length).toBe(2);
  expect(container.querySelector(".rail").style.getPropertyValue("--belt")).toBe("#3c5a8a");
});

test("the belt never overflows its four slots", () => {
  [-3, 0, 4, 9].forEach((n) => {
    const { container } = render(<BeltRail colour="#f1eee6" stripes={n} />);
    const on = container.querySelectorAll(".rail__stripe.is-on").length;
    expect(on).toBe(Math.max(0, Math.min(4, n)));
  });
});

test("the belt is decorative — the fact is always in the text beside it", () => {
  const { container } = render(<BeltRail colour="#f1eee6" stripes={1} />);
  expect(container.querySelector(".rail").getAttribute("aria-hidden")).toBe("true");
});

test("the fourth stripe lands only on a fully drilled map", () => {
  expect(stripesForProgress(0, 60)).toBe(0);
  expect(stripesForProgress(14, 60)).toBe(0);
  expect(stripesForProgress(15, 60)).toBe(1);
  expect(stripesForProgress(59, 60)).toBe(3);
  expect(stripesForProgress(60, 60)).toBe(4);
  expect(stripesForProgress(3, 0)).toBe(0);   // never divides by zero
});

test("every level has a belt to wear, and its text colour passes AA", () => {
  // Contrast against --bg #14111a. The belt fill may be dark because it is a
  // bounded block; the label colour may not, because it is text.
  const lum = (hex) => {
    const c = [1, 3, 5].map((i) => parseInt(hex.substr(i, 2), 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const bg = lum("#14111a");
  LEVELS.forEach((l) => {
    expect(LEVEL_BELTS[l]).toMatch(/^#[0-9a-f]{6}$/i);
    const ratio = (Math.max(lum(LEVEL_COLORS[l]), bg) + 0.05)
                / (Math.min(lum(LEVEL_COLORS[l]), bg) + 0.05);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});

test("the conditioning page wears the belt for the level chosen", () => {
  render(<Strength lang="en" />);
  fireEvent.click(screen.getByText("20 – 30"));
  fireEvent.click(screen.getByText("Intermediate"));
  fireEvent.click(screen.getByText("No Equipment"));
  fireEvent.click(screen.getByText("Build My Program"));

  const rail = document.querySelector(".rail--result");
  expect(rail).toBeTruthy();
  expect(rail.style.getPropertyValue("--belt")).toBe(LEVEL_BELTS.Intermediate);
  expect(rail.querySelectorAll(".rail__stripe.is-on").length).toBe(2);
});

/* ═══ The exercise figures ════════════════════════════════════════════════ */

test("every exercise with a cue still draws, and draws the right number of frames", () => {
  Object.keys(EX_CUES).forEach((id) => {
    const { container } = render(<ExerciseFigure id={id} lang="en" />);
    expect(container.querySelectorAll(".figure__svg").length)
      .toBe(EX_FIGURES[id] ? EX_FIGURES[id].frames.length : 0);
  });
});

test("a two-frame movement shows the start pose behind the end pose", () => {
  const { container } = render(<ExerciseFigure id="bodyweightSquat" lang="en" />);
  const [start, end] = container.querySelectorAll(".figure__svg");
  // The onion skin belongs to the end frame only — a ghost of the start pose
  // drawn behind the start pose would be the same drawing twice.
  expect(start.querySelector(".figure__ghost")).toBeNull();
  expect(end.querySelector(".figure__ghost")).toBeTruthy();
  expect(end.querySelector(".figure__arc")).toBeTruthy();
  expect(end.querySelector(".figure__arrowhead")).toBeTruthy();
});

test("an isometric hold gets no ghost and no arrow — there is no second position", () => {
  const { container } = render(<ExerciseFigure id="plank" lang="en" />);
  expect(container.querySelectorAll(".figure__svg").length).toBe(1);
  expect(container.querySelector(".figure__ghost")).toBeNull();
  expect(container.querySelector(".figure__arc")).toBeNull();
});

test("the mat is drawn only where the pose has a floor under it", () => {
  const onFloor = render(<ExerciseFigure id="pushUp" lang="en" />).container;
  expect(onFloor.querySelector(".figure__mat")).toBeTruthy();
  expect(onFloor.querySelector(".figure__shadow")).toBeTruthy();

  // A bench press and a pull-up hang in space; the old renderer keyed its
  // floor line off the `ground` prop and this one keys the whole mat off it.
  ["dbBenchPress", "latPulldownOrPullup"].forEach((id) => {
    const { container } = render(<ExerciseFigure id={id} lang="en" />);
    expect(container.querySelector(".figure__mat")).toBeNull();
    expect(container.querySelector(".figure__shadow")).toBeNull();
  });
});

test("the figure has a body, not just a wire outline", () => {
  const { container } = render(<ExerciseFigure id="gobletSquat" lang="en" />);
  const svg = container.querySelector(".figure__svg");
  expect(svg.querySelectorAll(".figure__torso").length).toBe(2);  // tapered: two strokes
  expect(svg.querySelector(".figure__head")).toBeTruthy();
});

test("limb weights are graded — a thigh is not a forearm", () => {
  const { container } = render(<ExerciseFigure id="bodyweightSquat" lang="en" />);
  const widths = [...container.querySelectorAll(".figure__svg")[0]
    .querySelectorAll(".figure__limb")]
    .map((l) => Number(l.getAttribute("stroke-width")));
  expect(new Set(widths).size).toBeGreaterThan(1);
});

test("no equipment is drawn in the mission purple", () => {
  // --mission is reserved for mental-health content. Bells and bands used to
  // borrow it, which is the one rule the old figures broke.
  const { container } = render(<ExerciseFigure id="gobletSquat" lang="en" />);
  expect(container.querySelector(".figure__load")).toBeTruthy();
  expect(container.innerHTML).not.toMatch(/mission/);
});

test("the pose data is untouched by the redraw", () => {
  // Spot-check the numbers the drawing is built from. Forty-six hand-tuned
  // poses are the expensive part of this feature; a renderer change must not
  // quietly become a data change.
  expect(EX_FIGURES.bodyweightSquat.frames[0].hd).toEqual([52, 17]);
  expect(EX_FIGURES.bodyweightSquat.frames[1].an).toEqual([63, 75]);
  expect(EX_FIGURES.plank.frames.length).toBe(1);
  expect(Object.keys(EX_FIGURES).length).toBe(46);
});

test("the technique map wears a white belt that takes stripes as you drill", () => {
  // jsdom has no matchMedia, and the map asks for one to choose between the
  // desktop sidebar and the phone bottom sheet.
  window.matchMedia = (query) => ({
    matches: false, media: query, onchange: null,
    addEventListener: () => {}, removeEventListener: () => {},
    addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false,
  });
  const TechniqueMap = require("./pages/TechniqueMap").default;
  const { NODE_IDS } = require("./data/techmap");

  // No progress, no belt: a rail showing nothing is decoration.
  const blank = render(<TechniqueMap lang="en" navigate={() => {}} />).container;
  expect(blank.querySelector(".rail--legend")).toBeNull();

  // Half the map drilled → two of four stripes.
  // usePersistentState namespaces every key with "submitology:".
  window.localStorage.setItem("submitology:drilled",
    JSON.stringify(NODE_IDS.slice(0, NODE_IDS.length / 2)));
  const half = render(<TechniqueMap lang="en" navigate={() => {}} />).container;
  const rail = half.querySelector(".rail--legend");
  expect(rail).toBeTruthy();
  expect(rail.style.getPropertyValue("--belt")).toBe("#f1eee6");
  expect(rail.querySelectorAll(".rail__stripe.is-on").length).toBe(2);
  window.localStorage.removeItem("submitology:drilled");
});
