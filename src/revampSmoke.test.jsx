import { render, screen } from "@testing-library/react";
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import Story from "./pages/Story";
import Shop from "./pages/Shop";

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
  expect(dts).toEqual(["60", "36", "5", "46"]);
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

test("mission page states the stance and keeps the support line", () => {
  render(<Mission lang="en" navigate={noop} />);
  expect(screen.getByText("Why It Matters")).toBeTruthy();
  expect(screen.getAllByText(/Samaritans of Singapore/).length).toBeGreaterThan(0);
});

/* The donation pledge was removed from every page and every language. A grep
   would catch it in the source; this catches it in what actually renders,
   including any string a future edit reintroduces through a translation. */
test("no page in any language claims money is given to a cause", () => {
  /* Deliberately narrow: Romanian "doar" means "only" and Portuguese "doar"
     means "to donate", so a bare "doar" would fail on correct copy. The
     donation verbs are matched in their inflected forms instead. */
  const FORBIDDEN =
    /1\s?%|donat|dona[çc]|doado|doar \d|reverse[rz]|reversé|charit|caritab|寄付|pledge|proceeds/i;
  ["en", "fr", "ja", "pt", "ro"].forEach((lang) => {
    [Home, Mission, Story, Shop].forEach((Page) => {
      const { container } = render(<Page lang={lang} navigate={noop} />);
      expect(container.textContent).not.toMatch(FORBIDDEN);
    });
  });
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
