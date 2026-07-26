import { useEffect, useState } from "react";

/** Subscribes to a CSS media query from JS. Used only where a style rule
 *  genuinely can't express the difference (e.g. rendering the technique detail
 *  as a focus-trapped bottom sheet on phones but an inline sidebar on desktop).
 *  All purely visual breakpoints live in app.css instead. */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
