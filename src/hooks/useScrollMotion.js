import { useEffect } from "react";

// ─── useScrollMotion — the site's two scroll effects, 2026-11-14 ───────────
// Band reveal and parallax, as specced in the August revamp notes: no
// library, nothing that runs when the visitor has asked for less motion,
// and nothing that can leave content hidden if the script never gets there.
//
// Called once, from App, with the current path. Every page is a fresh mount
// (the ErrorBoundary is keyed on the path), so the effect re-scans on each
// navigation and tears its observers down on the way out.
//
// Targets are listed here by selector rather than tagged in each page. The
// effect applies to structure the pages already share — every .band__in,
// every .band__photo — so a new band on a new page gets both effects with
// nothing to remember.

/** What fades up into place. A `stagger` entry reveals its children one by
 *  one, 60ms apart, instead of revealing itself as a block. */
const REVEAL = [
  { sel: ".band__in" },
  { sel: ".latest" },
  { sel: ".storysplit__body" },
  { sel: ".tax", stagger: true },
  { sel: ".dest-grid", stagger: true },
];

/** What drifts against the scroll. Each must sit inside a parent that clips
 *  it (.hero and .band both do) and be drawn taller than that parent, so the
 *  shift never shows an edge. The amount it may move is measured, not
 *  assumed: it is whatever the photo overhangs its parent by.
 *
 *  The offset is written to the *parent* as --py, and the stylesheet reads it
 *  on the photo. That way anything else layered in the same parent — the
 *  hero's video, which mounts after this scan — moves with the photograph
 *  without having to be found. */
const PARALLAX = ".hero__photo, .band__photo";

/** 10% — inside the 8–12% the revamp notes allow. More than this and the
 *  photograph starts to feel like it is sliding off the page. */
const PARALLAX_RATE = 0.1;
const STAGGER_MS = 60;
/** Must match the transition duration on [data-rv] in app.css. */
const REVEAL_MS = 400;

const reducedMotion = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Phones get no parallax: their bands are taller than they are wide, so the
 *  overhang would zoom the photograph rather than just give it room to move,
 *  and a scroll handler is battery the effect isn't worth. Must match the
 *  720px breakpoint in app.css that sets the overhang. */
const wideEnough = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(min-width: 721px)").matches;

function setupReveal(root) {
  if (typeof IntersectionObserver === "undefined") return () => {};

  const targets = [];
  REVEAL.forEach(({ sel, stagger }) => {
    root.querySelectorAll(sel).forEach((el) => {
      if (stagger) Array.from(el.children).forEach((c, i) => targets.push([c, i]));
      else targets.push([el, 0]);
    });
  });

  // Anything already on screen when the page opens stays as it is. Fading in
  // what the visitor is already looking at reads as a slow page, not motion.
  const fold = window.innerHeight * 0.92;
  const pending = targets.filter(([el]) => el.getBoundingClientRect().top >= fold);
  if (!pending.length) return () => {};

  // A data attribute rather than a class: React owns className and would
  // be within its rights to write over it on the next render.
  pending.forEach(([el, i]) => {
    el.dataset.rv = "pending";
    el.style.setProperty("--rv-delay", `${i * STAGGER_MS}ms`);
  });

  // Once an element has arrived, the attribute comes off again, so the
  // element gets its own transitions back (the destination cards lift on
  // hover, and the reveal's transition rule would otherwise replace theirs).
  const timers = [];
  const settle = (el) => { delete el.dataset.rv; el.style.removeProperty("--rv-delay"); };
  const delayOf = new Map(pending.map(([el, i]) => [el, i * STAGGER_MS]));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.dataset.rv = "in";
      io.unobserve(e.target);
      timers.push(setTimeout(() => settle(e.target), REVEAL_MS + delayOf.get(e.target) + 50));
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  pending.forEach(([el]) => io.observe(el));

  return () => {
    io.disconnect();
    timers.forEach(clearTimeout);
    pending.forEach(([el]) => settle(el));
  };
}

function setupParallax(root) {
  const photos = Array.from(root.querySelectorAll(PARALLAX));
  if (!photos.length) return () => {};

  let frame = 0;
  const update = () => {
    frame = 0;
    const mid = window.innerHeight / 2;
    photos.forEach((ph) => {
      const box = ph.parentElement.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) return;   // off screen
      const slack = Math.max(0, (ph.offsetHeight - box.height) / 2);
      const raw = (mid - (box.top + box.height / 2)) * PARALLAX_RATE;
      const y = Math.max(-slack, Math.min(slack, raw));
      ph.parentElement.style.setProperty("--py", `${y.toFixed(1)}px`);
    });
  };
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (frame) cancelAnimationFrame(frame);
    photos.forEach((ph) => ph.parentElement.style.removeProperty("--py"));
  };
}

export default function useScrollMotion(path) {
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const root = document.getElementById("main");
    if (!root) return undefined;

    // The <html> flag is what lets the stylesheet draw photos taller than
    // their band. Without the script, nothing overhangs and nothing moves.
    const parallax = wideEnough();
    if (parallax) document.documentElement.classList.add("has-parallax");

    const stopReveal = setupReveal(root);
    const stopParallax = parallax ? setupParallax(root) : () => {};
    return () => {
      stopReveal();
      stopParallax();
      document.documentElement.classList.remove("has-parallax");
    };
  }, [path]);
}
