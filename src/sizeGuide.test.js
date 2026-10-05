import { render, screen, fireEvent, within } from "@testing-library/react";
import Shop from "./pages/Shop";
import { SIZE_GUIDES } from "./data/sizes";
import { DIAGRAM_KINDS } from "./components/SizeDiagram";
import { RASHGUARDS } from "./data/rashguards";
import { SHORTS } from "./data/shorts";
import { TEE_DESIGNS } from "./data/tshirts";
import { T } from "./i18n";

/* ═══ Size guides ═════════════════════════════════════════════════════════
   The charts are data (data/sizes.js) and a garment points at one by key.
   These tests hold the two ends together, and hold the dialog to the same
   keyboard behaviour as the rest of the site. */

const GARMENTS = [...RASHGUARDS, ...SHORTS, ...TEE_DESIGNS];

test("every garment that names a size chart names one that exists", () => {
  const named = GARMENTS.filter((g) => g.sizeGuide);
  // Two rashguards, two shorts, the t-shirt and the tank top.
  expect(named.length).toBe(6);
  named.forEach((g) => {
    expect(SIZE_GUIDES[g.sizeGuide]).toBeDefined();
    if (g.sizeDiagram) expect(DIAGRAM_KINDS).toContain(g.sizeDiagram);
  });
});

test("every chart has a drawing, and sizes that only ever get bigger", () => {
  Object.values(SIZE_GUIDES).forEach((chart) => {
    expect(DIAGRAM_KINDS).toContain(chart.diagram);
    expect(["top", "bottom"]).toContain(chart.type);
    const cols = chart.type === "top" ? ["length", "halfChest"] : ["waist", "length"];
    cols.forEach((col) => {
      chart.rows.forEach((row, i) => {
        expect(typeof row[col]).toBe("number");
        // A typo in a retyped table shows up as a size smaller than the last.
        if (i > 0) expect(row[col]).toBeGreaterThan(chart.rows[i - 1][col]);
      });
    });
  });
});

test("the size guide strings exist in all five languages", () => {
  ["sizeGuide", "sizeTitle", "sizeCol", "sizeLength", "sizeChest", "sizeWaist",
   "sizeShortsLength", "sizeHowA", "sizeHowB", "sizeHowWaist",
   "sizeHowShortsLength", "sizeNote", "sizeBothCuts"].forEach((key) => {
    ["en", "fr", "ja", "pt", "ro"].forEach((lang) => {
      expect(T.merch[key][lang]).toBeTruthy();
    });
  });
});

test("no chart is open on the page until a Size guide button is pressed", () => {
  render(<Shop lang="en" />);
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(screen.queryByRole("table")).toBeNull();
  // One button per garment with a chart; the gi and the belt have none.
  expect(screen.getAllByRole("button", { name: /^Size guide — / }).length).toBe(6);
});

test("a Size guide button opens that garment's chart, and Escape closes it", () => {
  render(<Shop lang="en" />);
  const button = screen.getByRole("button", { name: "Size guide — Team Crest Tank Top" });
  button.focus();
  fireEvent.click(button);

  const dialog = screen.getByRole("dialog");
  expect(dialog.getAttribute("aria-modal")).toBe("true");
  expect(within(dialog).getByRole("heading", { name: "Team Crest Tank Top" })).toBeTruthy();
  // Header row plus the tank top's nine sizes, XS to 5XL.
  expect(within(dialog).getAllByRole("row").length).toBe(10);
  expect(within(dialog).getByRole("row", { name: /^5XL 88 71$/ })).toBeTruthy();
  // Focus has moved into the dialog.
  expect(dialog.contains(document.activeElement)).toBe(true);

  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.queryByRole("dialog")).toBeNull();
  // …and comes back to the button that opened it.
  expect(document.activeElement).toBe(button);
});

test("the two rashguard cuts open the same chart, and it says so", () => {
  render(<Shop lang="en" />);
  ["Long sleeve", "Short sleeve"].forEach((cut) => {
    fireEvent.click(screen.getByRole("button", { name: `Size guide — Kintsugi Fighter — ${cut}` }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("The long sleeve and the short sleeve share this chart.")).toBeTruthy();
    expect(within(dialog).getByRole("row", { name: /^M 69.5 45.5$/ })).toBeTruthy();
    fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

test("the 2-in-1 shorts show the maker's inch figure beside the waist; the compression shorts have none", () => {
  render(<Shop lang="en" />);
  fireEvent.click(screen.getByRole("button", { name: "Size guide — Kintsugi NoGi Shorts" }));
  expect(within(screen.getByRole("dialog")).getByRole("row", { name: /^XS 70 · 27.5 in 31.5$/ })).toBeTruthy();
  fireEvent.keyDown(document, { key: "Escape" });

  fireEvent.click(screen.getByRole("button", { name: "Size guide — Kintsugi NoGi Compression Shorts" }));
  expect(within(screen.getByRole("dialog")).getByRole("row", { name: /^S 58 38.25$/ })).toBeTruthy();
});

test("numbers are printed the way the reader's language writes them", () => {
  render(<Shop lang="fr" />);
  fireEvent.click(screen.getByRole("button", { name: /^Guide des tailles — Kintsugi Fighter — Manches longues$/ }));
  // 64.5 in English is 64,5 in French.
  expect(within(screen.getByRole("dialog")).getByText("64,5")).toBeTruthy();
});
