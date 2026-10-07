import fs from "fs";
import path from "path";
import { render, screen, within } from "@testing-library/react";
import Freebies from "./pages/Freebies";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FREEBIES, SECTIONS } from "./data/freebies";
import { UPDATES } from "./data/updates";
import { DESTINATIONS } from "./router";
import { T, LANGUAGES } from "./i18n";

const noop = () => {};
const LANGS = LANGUAGES.map((l) => l.code);
const PUBLIC = path.join(__dirname, "..", "public", "freebies");

/** Every five-language object reachable from `value`, with where it was found. */
function collectLocalised(value, where, out = []) {
  if (value && typeof value === "object") {
    if ("en" in value && typeof value.en === "string") {
      out.push([where, value]);
    } else {
      Object.entries(value).forEach(([k, v]) => collectLocalised(v, `${where}.${k}`, out));
    }
  }
  return out;
}

test("the page has a For kids and a For everyone section, each with a download", () => {
  const { container } = render(<Freebies lang="en" navigate={noop} />);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Freebies");
  expect(screen.getByText("Sharing is caring")).toBeTruthy();
  expect(screen.getByRole("heading", { level: 2, name: "For kids" })).toBeTruthy();
  expect(screen.getByRole("heading", { level: 2, name: "For everyone" })).toBeTruthy();
  expect(SECTIONS).toEqual(["kids", "everyone"]);

  const links = [...container.querySelectorAll("a.free__cta")];
  expect(links.length).toBe(FREEBIES.length);
  links.forEach((a) => {
    expect(a.hasAttribute("download")).toBe(true);
    expect(a.getAttribute("href")).toMatch(/\/freebies\/.+\.pdf$/);
  });

  // The passport sits under For kids, the poster under For everyone.
  const kids = screen.getByRole("heading", { level: 2, name: "For kids" }).closest("section");
  const everyone = screen.getByRole("heading", { level: 2, name: "For everyone" }).closest("section");
  expect(within(kids).getByText("Mat Passport — Kids Edition")).toBeTruthy();
  expect(within(everyone).getByText("Mat Rules Poster")).toBeTruthy();
});

test("the download says what it fetches: language, pages, paper and size", () => {
  render(<Freebies lang="en" navigate={noop} />);
  expect(screen.getAllByText("PDF · In English · 12 pages · A5 · 77 KB").length).toBeGreaterThan(0);
  expect(screen.getAllByText("PDF · In English · 3 pages · A4 · 696 KB").length).toBeGreaterThan(0);
});

test("the rules poster's note says it is a summary and not affiliated with the IBJJF", () => {
  render(<Freebies lang="en" navigate={noop} />);
  expect(screen.getByText(/not affiliated with or endorsed by the IBJJF/)).toBeTruthy();
});

test("every string on the page exists in all five languages", () => {
  const found = [
    ...collectLocalised(T.ui.freebiesPage, "freebiesPage"),
    ...collectLocalised(T.ui.sections.freebies, "sections.freebies"),
    ...collectLocalised(T.ui.groups.freebies, "groups.freebies"),
    ...collectLocalised(FREEBIES, "FREEBIES"),
    ...collectLocalised(UPDATES[0], "UPDATES[0]"),
  ];
  // A floor, so a walker that silently finds nothing cannot pass this test.
  expect(found.length).toBeGreaterThanOrEqual(35);
  found.forEach(([where, obj]) => {
    LANGS.forEach((l) => {
      expect([where, l, typeof obj[l]]).toEqual([where, l, "string"]);
      expect(obj[l].trim().length).toBeGreaterThan(0);
    });
  });
});

test("the page renders in every language without an empty heading or English leaking into a slot", () => {
  LANGS.forEach((lang) => {
    const { container, unmount } = render(<Freebies lang={lang} navigate={noop} />);
    container.querySelectorAll("h1, h2, h3").forEach((h) => expect(h.textContent.trim().length).toBeGreaterThan(0));
    expect(container.textContent).not.toMatch(/undefined|\{n\}/);
    unmount();
  });
});

test("the sizes stated on the page are the real file sizes, and every file exists", () => {
  FREEBIES.forEach((f) => {
    const stat = fs.statSync(path.join(PUBLIC, f.file));
    expect([f.file, stat.size]).toEqual([f.file, f.bytes]);
    f.previews.forEach((p) => {
      expect(fs.existsSync(path.join(PUBLIC, path.basename(p.src)))).toBe(true);
    });
  });
});

test("the page count stated for each file is the file's real page count", () => {
  FREEBIES.forEach((f) => {
    const pdf = fs.readFileSync(path.join(PUBLIC, f.file), "latin1");
    // Count page objects, not the /Pages tree node that parents them.
    const pages = (pdf.match(/\/Type\s*\/Page(?![s\w])/g) || []).length;
    expect([f.file, pages]).toEqual([f.file, f.pages]);
  });
});

test("Freebies is a destination, so the header, the footer and search all carry it", () => {
  expect(DESTINATIONS.some((d) => d.key === "freebies" && d.path === "/freebies")).toBe(true);

  const header = render(<Header lang="en" setLang={noop} path="/" navigate={noop} onOpenSearch={noop} hasUnread={false} />);
  expect(header.container.querySelector('nav a[href="#/freebies"]')).toBeTruthy();
  header.unmount();

  const footer = render(<Footer lang="en" navigate={noop} />);
  expect(footer.container.querySelector('a.footer__link[href="#/freebies"]')).toBeTruthy();
});

test("the release is announced in What's New", () => {
  expect(UPDATES[0].id).toBe("2026-10-07-freebies");
  expect(UPDATES[0].kind).toBe("site");
  expect(new Set(UPDATES.map((u) => u.id)).size).toBe(UPDATES.length);
});
