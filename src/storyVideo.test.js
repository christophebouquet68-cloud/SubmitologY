import fs from "fs";
import path from "path";
import { render } from "@testing-library/react";
import WhatsNewStory from "./pages/WhatsNewStory";
import { UPDATES } from "./data/updates";
import { T, LANGUAGES } from "./i18n";

const noop = () => {};
const LANGS = LANGUAGES.map((l) => l.code);
const STORY = UPDATES.find((u) => u.slug === "first-rashguards-on-the-mats");
const VIDEO_KEYS = ["videoTitle", "videoLabel", "videoLead", "videoFaces", "videoSound", "videoFallback", "videoDownload"];

test("the trial story has a video that is a file on this site and never starts on its own", () => {
  const { container } = render(<WhatsNewStory lang="en" slug={STORY.slug} navigate={noop} />);
  const v = container.querySelector("video");
  expect(v).toBeTruthy();
  expect(v.hasAttribute("controls")).toBe(true);
  expect(v.hasAttribute("autoplay")).toBe(false);
  expect(v.getAttribute("poster")).toMatch(/\/whats-new\/trial-reel-poster\.jpg$/);
  expect(v.getAttribute("aria-label")).toBeTruthy();
  const src = v.querySelector("source").getAttribute("src");
  expect(src).toMatch(/^\/whats-new\/trial-reel\.mp4$|\/whats-new\/trial-reel\.mp4$/);
  // Nothing from another host: an embed would break the privacy policy.
  expect(src).not.toMatch(/^https?:\/\//);
  expect(container.querySelector("iframe")).toBeNull();
});

test("the video's files exist in public/ and are a sensible size", () => {
  const dir = path.join(__dirname, "..", "public", "whats-new");
  const mp4 = fs.statSync(path.join(dir, "trial-reel.mp4"));
  expect(mp4.size).toBeGreaterThan(100 * 1024);
  expect(mp4.size).toBeLessThan(6 * 1024 * 1024);
  expect(fs.existsSync(path.join(dir, "trial-reel-poster.jpg"))).toBe(true);
});

test("the text beside the video says nothing is for sale, in every language", () => {
  LANGS.forEach((lang) => {
    const { container, unmount } = render(<WhatsNewStory lang={lang} slug={STORY.slug} navigate={noop} />);
    const sec = container.querySelector(".story-video");
    expect(sec).toBeTruthy();
    expect(sec.textContent).toContain(T.whatsNew.videoLead[lang]);
    expect(sec.textContent).toContain(T.whatsNew.videoFaces[lang]);
    unmount();
  });
  expect(T.whatsNew.videoLead.en).toMatch(/design previews/);
  expect(T.whatsNew.videoLead.en).toMatch(/Nothing in it is for sale/);
});

test("every new string and the What's New entry are written in all five languages", () => {
  VIDEO_KEYS.forEach((k) => LANGS.forEach((l) => expect((T.whatsNew[k][l] || "").length).toBeGreaterThan(3)));
  const entry = UPDATES[0];
  expect(entry.id).toBe("2026-11-07-trial-video");
  expect(entry.kind).toBe("site");
  LANGS.forEach((l) => {
    expect(entry.title[l].length).toBeGreaterThan(3);
    entry.items.forEach((it) => expect(it[l].length).toBeGreaterThan(3));
  });
});
