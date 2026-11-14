import fs from "fs";
import path from "path";
import { render, act, fireEvent } from "@testing-library/react";
import HeroVideo from "./components/HeroVideo";
import { UPDATES } from "./data/updates";
import { T, LANGUAGES } from "./i18n";

// The motion added on 2026-11-14: the video behind the home hero, the band
// reveal and the parallax. What these tests hold in place is the part that
// would be a broken promise if it slipped — a video from another host, a
// sound track, motion for someone who asked for none, no way to stop it.

const LANGS = LANGUAGES.map((l) => l.code);

/** jsdom has no matchMedia. `wide` and `calm` decide what the queries match. */
function mockMedia({ wide = true, reduce = false } = {}) {
  window.matchMedia = (query) => ({
    matches:
      (query.includes("prefers-reduced-motion: reduce") && reduce) ||
      (query.includes("min-width: 721px") && wide &&
        (!query.includes("no-preference") || !reduce)),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
}

beforeAll(() => {
  // jsdom implements neither of these; the component must survive without.
  window.HTMLMediaElement.prototype.play = () => Promise.resolve();
  window.HTMLMediaElement.prototype.pause = () => {};
});
afterEach(() => { delete window.matchMedia; });

test("on a wide screen the hero video is a silent local loop with a pause button", () => {
  mockMedia({ wide: true });
  const { container } = render(<HeroVideo lang="en" />);
  const v = container.querySelector("video");
  expect(v).toBeTruthy();
  expect(v.muted).toBe(true);
  expect(v.hasAttribute("loop")).toBe(true);
  expect(v.hasAttribute("controls")).toBe(false);
  expect(v.getAttribute("aria-hidden")).toBe("true");
  expect(v.getAttribute("preload")).toBe("none");
  const src = v.getAttribute("src");
  expect(src).toMatch(/\/photo\/hero-loop\.mp4$/);
  expect(src).not.toMatch(/^https?:\/\//);   // an embed would break the privacy policy
  expect(container.querySelector("iframe")).toBeNull();

  const btn = container.querySelector("button.hero__video-toggle");
  expect(btn.getAttribute("aria-label")).toBe(T.ui.home.heroVideoPause.en);
  act(() => { fireEvent.click(btn); });
  expect(btn.getAttribute("aria-label")).toBe(T.ui.home.heroVideoPlay.en);
  act(() => { fireEvent.click(btn); });         // leave it playing for the next test
});

test("on a phone, or with reduced motion, there is no video at all", () => {
  mockMedia({ wide: false });
  let r = render(<HeroVideo lang="en" />);
  expect(r.container.querySelector("video")).toBeNull();
  expect(r.container.querySelector("button")).toBeNull();
  r.unmount();

  mockMedia({ wide: true, reduce: true });
  r = render(<HeroVideo lang="en" />);
  expect(r.container.querySelector("video")).toBeNull();
  r.unmount();
});

test("the loop file is small and has no audio track", () => {
  const file = path.join(__dirname, "..", "public", "photo", "hero-loop.mp4");
  const buf = fs.readFileSync(file);
  expect(buf.length).toBeGreaterThan(100 * 1024);
  expect(buf.length).toBeLessThan(1.5 * 1024 * 1024);
  // An MP4 audio track declares a sound media header ("smhd"); video has "vmhd".
  expect(buf.includes(Buffer.from("vmhd"))).toBe(true);
  expect(buf.includes(Buffer.from("smhd"))).toBe(false);
});

test("the stylesheet switches every effect off for reduced motion and print", () => {
  const css = fs.readFileSync(path.join(__dirname, "styles", "app.css"), "utf8");
  const motion = css.slice(css.indexOf("── Motion, 2026-11-14"));
  expect(motion.length).toBeGreaterThan(100);
  expect(motion).toMatch(/prefers-reduced-motion: reduce\)[\s\S]*\[data-rv\][\s\S]*opacity: 1 !important/);
  expect(motion).toMatch(/@media print[\s\S]*\.hero__video[\s\S]*display: none/);
  // Content is only hidden while the script has marked it pending.
  expect(motion).not.toMatch(/\.band__in\s*\{[^}]*opacity:\s*0/);
});

test("the new strings and the What's New entry are written in all five languages", () => {
  ["heroVideoPause", "heroVideoPlay"].forEach((k) =>
    LANGS.forEach((l) => expect((T.ui.home[k][l] || "").length).toBeGreaterThan(3)));
  const entry = UPDATES.find((u) => u.id === "2026-11-14-motion");
  expect(entry).toBeTruthy();
  expect(entry.kind).toBe("site");
  LANGS.forEach((l) => {
    expect(entry.title[l].length).toBeGreaterThan(3);
    entry.items.forEach((it) => expect(it[l].length).toBeGreaterThan(3));
  });
});
