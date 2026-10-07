// ─── router.js — minimal hash router ────────────────────────────────────────
// Deliberately dependency-free and hash-based rather than react-router:
//   • no new package to install or keep updated
//   • works on any static host (GitHub Pages, S3, Netlify drop) with zero
//     rewrite configuration — a path-based router 404s on refresh without it
// Swapping to react-router later means replacing this file and the <Link>
// helper; nothing else in the app touches window.location directly.

import { useCallback, useEffect, useState } from "react";

export const ROUTES = {
  home:     "/",
  map:      "/map",
  concepts: "/concepts",
  strength: "/strength",
  mission:  "/mission",
  shop:     "/shop",
  story:    "/story",
  whatsNew: "/whats-new",
  freebies: "/freebies",
  contact:  "/contact",
  privacy:  "/privacy",
  terms:    "/terms",
};

/** Every routable destination, in one place. Nav, search, footer and the
 *  home page all read from this so a new section can never be added to one
 *  surface and forgotten on the others. */
export const DESTINATIONS = [
  /* Train, in teaching order rather than in the order these were built:
     the concepts explain why the map is shaped the way it is, so they come
     first; conditioning is the thing you add once you know what you are
     conditioning for, so it comes last. Reordering here propagates to the
     header, the drawer, search and the home-page index automatically. */
  { key: "concepts", path: ROUTES.concepts, group: "train",   titleKey: "concepts" },
  { key: "map",      path: ROUTES.map,      group: "train",   titleKey: "map" },
  { key: "strength", path: ROUTES.strength, group: "train",   titleKey: "strength" },
  { key: "shop",     path: ROUTES.shop,     group: "shop",    titleKey: "shop" },
  { key: "mission",  path: ROUTES.mission,  group: "mission", titleKey: "mission" },
  { key: "story",    path: ROUTES.story,    group: "about",   titleKey: "story" },
  /* A group of its own since 2026-10-03. It was the second item under
     Brand, which was the right place for a changelog and the wrong one for
     news; alone in a group it becomes a plain link in the header. */
  { key: "whatsNew", path: ROUTES.whatsNew, group: "news",    titleKey: "whatsNew" },
  /* Free downloads, added 2026-10-07. Its own group for the same reason as
     What's New: a single page, so it is a plain link in the header and a
     tile of its own on the home page. */
  { key: "freebies", path: ROUTES.freebies, group: "freebies", titleKey: "freebies" },
];

/** Contact and the legal pages, deliberately kept out of DESTINATIONS.
 *  Everything in DESTINATIONS appears in the header, the drawer, search and
 *  the home-page index — which is right for the eight sections and wrong for
 *  these three. Convention puts them in the footer, and people look there. */
export const LEGAL_LINKS = [
  { key: "contact", path: ROUTES.contact, doc: "contact" },
  { key: "privacy", path: ROUTES.privacy, doc: "privacy" },
  { key: "terms",   path: ROUTES.terms,   doc: "terms" },
];

function readHash() {
  const raw = window.location.hash.replace(/^#/, "");
  return raw.startsWith("/") ? raw : "/";
}

/** Returns { path, segments, navigate }. */
export function useRoute() {
  const [path, setPath] = useState(readHash);

  useEffect(() => {
    const onChange = () => setPath(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const target = "#" + to;
    if (window.location.hash === target) return;
    if (replace) {
      window.history.replaceState(null, "", target);
      setPath(readHash());
    } else {
      window.location.hash = to;
    }
  }, []);

  const segments = path.split("/").filter(Boolean);
  return { path, segments, navigate };
}

/** True when `path` is the active route or a child of it (/map matches /map/armbar). */
export function isActive(currentPath, candidate) {
  if (candidate === ROUTES.home) return currentPath === "/";
  return currentPath === candidate || currentPath.startsWith(candidate + "/");
}
