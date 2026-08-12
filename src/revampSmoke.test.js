import { render, screen } from "@testing-library/react";
import Home from "./pages/Home";
import Mission from "./pages/Mission";

const noop = () => {};

test("hero graph draws the real map, not a decorative stand-in", () => {
  const { container } = render(<Home lang="en" navigate={noop} />);
  const svg = container.querySelector(".hero__graph");
  expect(svg).toBeTruthy();
  const nodes = svg.querySelectorAll("circle");
  const edges = svg.querySelectorAll(".hero__graph-edges line");
  expect(nodes.length).toBe(60);
  expect(edges.length).toBeGreaterThan(100);
  // Every node must carry a taxonomy colour, not a default fill.
  const fills = new Set([...nodes].map((n) => n.getAttribute("fill")));
  expect(fills).toEqual(new Set(["#4cc9f0", "#ff8534", "#ff5c5c"]));
});

test("hero stats are derived from data, not typed", () => {
  const { container } = render(<Home lang="en" navigate={noop} />);
  const dts = [...container.querySelectorAll(".hero__stats dt")].map((n) => n.textContent);
  expect(dts).toEqual(["60", "36", "5", "1%"]);
});

test("hero sets two weights rather than one heading plus a subheading", () => {
  const { container } = render(<Home lang="en" navigate={noop} />);
  expect(container.querySelector(".hero__line1").textContent).toBe("The Study of Submission");
  expect(container.querySelector(".hero__line2").textContent).toBe("The Science of Resilience");
});

test("taxonomy grid counts the real split, 19/20/21", () => {
  const { container } = render(<Home lang="en" navigate={noop} />);
  const cells = container.querySelectorAll(".tax__cell");
  expect(cells.length).toBe(3);
  const counts = [...container.querySelectorAll(".tax__n")].map((n) => n.textContent.trim());
  expect(counts).toEqual(["19 mapped", "20 mapped", "21 mapped"]);
});

test("bone chapter sits between two seams and shows the crest whole", () => {
  const { container } = render(<Home lang="en" navigate={noop} />);
  expect(container.querySelectorAll(".seam").length).toBe(2);
  expect(container.querySelector(".chapter .surface--bone")).toBeTruthy();
  const logo = container.querySelector(".thesis__logo");
  expect(logo.getAttribute("width")).toBe("104");
});

test("the seam is decorative and never focusable", () => {
  const { container } = render(<Home lang="en" navigate={noop} />);
  container.querySelectorAll(".seam").forEach((s) => {
    expect(s.getAttribute("aria-hidden")).toBe("true");
    expect(s.querySelector("svg").getAttribute("focusable")).toBe("false");
  });
});

test("seams are deterministic across renders", () => {
  const a = render(<Home lang="en" navigate={noop} />).container
    .querySelector(".seam path").getAttribute("d");
  const b = render(<Home lang="en" navigate={noop} />).container
    .querySelector(".seam path").getAttribute("d");
  expect(a).toBe(b);
});

test("mission pledge keeps 1% and the reworded support line", () => {
  render(<Mission lang="en" navigate={noop} />);
  expect(screen.getByText("1%")).toBeTruthy();
  expect(screen.getAllByText(/Samaritans of Singapore/).length).toBeGreaterThan(0);
});

test("every new string resolves in all five languages", () => {
  ["en", "fr", "ja", "pt", "ro"].forEach((lang) => {
    const { container } = render(<Home lang={lang} navigate={noop} />);
    const dds = [...container.querySelectorAll(".hero__stats dd")].map((n) => n.textContent);
    expect(dds.length).toBe(4);
    dds.forEach((text) => expect(text.trim().length).toBeGreaterThan(0));
    expect(container.querySelector(".tax__body").textContent.trim().length).toBeGreaterThan(10);
  });
});
