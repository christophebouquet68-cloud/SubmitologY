import { render, screen } from "@testing-library/react";
import Shop from "./pages/Shop";
import { BUSINESS } from "./data/legal";
import { UPDATES } from "./data/updates";
import { T, LANGUAGES } from "./i18n";

/* ═══ "Share your feedback" ════════════════════════════════════════════════
   A plain mailto: link under the tester-feedback heading — no form, nothing
   stored by the site. These tests hold it to that and to five languages. */

const LANGS = LANGUAGES.map((l) => l.code);
const noop = () => {};

test("the strings exist in all five languages", () => {
  ["reviewsShareBtn", "reviewsShareNote", "reviewsMailSubject", "reviewsMailBody"].forEach((k) => {
    LANGS.forEach((l) => {
      expect(typeof T.merch[k][l]).toBe("string");
      expect(T.merch[k][l].length).toBeGreaterThan(1);
    });
  });
});

test.each(LANGS)("the button is a mailto: link to the general address with a template (%s)", (lang) => {
  render(<Shop lang={lang} navigate={noop} />);
  const link = screen.getByRole("link", { name: T.merch.reviewsShareBtn[lang] });
  const href = link.getAttribute("href");
  expect(href.startsWith(`mailto:${BUSINESS.general}?`)).toBe(true);
  const params = new URLSearchParams(href.split("?")[1]);
  expect(params.get("subject")).toBe(T.merch.reviewsMailSubject[lang]);
  expect(params.get("body")).toBe(T.merch.reviewsMailBody[lang]);
  // The template asks for consent to publish, and for the free-sample answer
  // that the page's disclosure line depends on.
  expect(params.get("body").split("\n").length).toBeGreaterThan(5);
});

test("the note says nothing is posted automatically", () => {
  render(<Shop lang="en" navigate={noop} />);
  expect(screen.getByText(/Nothing is posted automatically/)).toBeTruthy();
});

test("What's New carries an entry for it, in five languages", () => {
  const e = UPDATES.find((u) => u.id === "2026-10-31-share-feedback");
  expect(e).toBeDefined();
  expect(e.kind).toBe("site");
  LANGS.forEach((l) => {
    expect(e.title[l]).toBeTruthy();
    e.items.forEach((i) => expect(i[l]).toBeTruthy());
  });
});
