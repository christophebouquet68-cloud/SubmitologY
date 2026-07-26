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
};

/** Every routable destination, in one place. Nav, search, footer and the
 *  home page all read from this so a new section can never be added to one
 *  surface and forgotten on the others. */
export const DESTINATIONS = [
  { key: "map",      path: ROUTES.map,      group: "train",   titleKey: "map" },
  { key: "concepts", path: ROUTES.concepts, group: "train",   titleKey: "concepts" },
  { key: "strength", path: ROUTES.strength, group: "train",   titleKey: "strength" },
  { key: "shop",     path: ROUTES.shop,     group: "shop",    titleKey: "shop" },
  { key: "mission",  path: ROUTES.mission,  group: "mission", titleKey: "mission" },
  { key: "story",    path: ROUTES.story,    group: "about",   titleKey: "story" },
  { key: "whatsNew", path: ROUTES.whatsNew, group: "about",   titleKey: "whatsNew" },
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
