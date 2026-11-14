import { useEffect, useRef, useState } from "react";
import { T, t } from "../i18n";

// ─── HeroVideo — the moving layer behind the home hero, 2026-11-14 ─────────
// Seven seconds cut from the brand Reel, at half speed with soft
// crossfades so the background breathes rather than cuts: the gold line on
// a rashguard, a plate mended in gold, the wordmark on a sleeve, a bowl
// mended in gold, the gold line again. Chosen for what they leave out as
// much as what they show —
//   · no burned-in captions (the Reel's are English-only, and they would
//     fight the headline) and not the Reel's own wordmark overlay. Each shot
//     is cropped to a 16:9 band at its own height, between the two;
//   · no faces, not even blurred ones;
//   · no product shots. The mockup gi, tee and belts stay in the shop,
//     where they carry "Target Price" and a date. A hero that cycled
//     through them would read as a catalogue for things nobody can buy.
// Only the right half shows through the scrim, so each crop puts the gold
// line on the right. The cut list is below, so the file can be rebuilt
// from the Reel (submitology_reel_30s.mp4, 1080×1920):
//   2.55–3.45 s @y215 · 3.55–4.45 @y560 · 6.05–6.95 @y300 ·
//   16.55–17.45 @y420 · 17.55–18.45 @y215 — 1080×608 crops, ×0.5 with
//   motion interpolation, 0.4 s fades, no audio, H.264 CRF 26, faststart.
//
// The file is on this site, not an embed, so the privacy policy's "no
// third-party requests" stays true. It has no audio track at all.
//
// When it does not load, the crest photograph behind it is the hero, exactly
// as before. It does not load:
//   · on phones (≤720px) — a data cost the visitor didn't choose;
//   · when the visitor asks for reduced motion, or for reduced data;
//   · until the page is otherwise ready (preload="none", src set late).
//
// Anything that moves for more than five seconds needs a way to stop it
// (WCAG 2.2.2), so there is a pause button. The choice is kept for the rest
// of the visit, in memory only: local storage would mean a new line in the
// privacy policy, for a preference that matters for one visit.

const SRC = `${import.meta.env.BASE_URL}photo/hero-loop.mp4`;
const WANTED = "(min-width: 721px) and (prefers-reduced-motion: no-preference)";

let pausedThisVisit = false;

function allowed() {
  if (typeof window.matchMedia !== "function") return false;
  if (navigator.connection && navigator.connection.saveData) return false;
  return window.matchMedia(WANTED).matches;
}

export default function HeroVideo({ lang }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [paused, setPaused] = useState(pausedThisVisit);
  const [playing, setPlaying] = useState(false);

  // Decide once the page has rendered, and again if the window crosses the
  // breakpoint or the motion setting changes.
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined;
    const mql = window.matchMedia(WANTED);
    const check = () => setOn(allowed());
    check();
    mql.addEventListener("change", check);
    return () => mql.removeEventListener("change", check);
  }, []);

  // Play only while the hero is on screen and not paused. Off screen it is
  // a decoder running for nobody.
  useEffect(() => {
    const v = ref.current;
    if (!on || !v) return undefined;
    if (!v.getAttribute("src")) v.setAttribute("src", SRC);

    let visible = true;
    const sync = () => {
      if (visible && !paused) {
        const p = v.play();
        if (p && p.catch) p.catch(() => {});   // autoplay refused: the photo stays
      } else {
        v.pause();
      }
    };
    sync();

    if (typeof IntersectionObserver === "undefined") return () => v.pause();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); });
    io.observe(v.parentElement);
    return () => { io.disconnect(); v.pause(); };
  }, [on, paused]);

  const toggle = () => {
    pausedThisVisit = !paused;
    setPaused(!paused);
  };

  if (!on) return null;

  // The video fades in over the photograph once it is actually playing, and
  // back out when paused, so a stopped hero shows the crest rather than
  // whichever frame the loop happened to stop on.
  const shown = playing && !paused;
  const label = paused ? T.ui.home.heroVideoPlay : T.ui.home.heroVideoPause;

  return (
    <>
      <video
        ref={ref}
        className={"hero__video" + (shown ? " is-playing" : "")}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button type="button" className="hero__video-toggle" onClick={toggle}
              aria-label={t(label, lang)} title={t(label, lang)}>
        {paused ? (
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
            <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
            <rect x="3.5" y="2.5" width="3" height="11" rx="0.5" fill="currentColor" />
            <rect x="9.5" y="2.5" width="3" height="11" rx="0.5" fill="currentColor" />
          </svg>
        )}
      </button>
    </>
  );
}
