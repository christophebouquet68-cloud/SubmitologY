import { useCallback, useEffect, useRef, useState } from "react";
import { T, t } from "../i18n";

/* Webpack resolves and hashes this the same way it does the fonts and the
   photographs, so the file survives the "." homepage setting used for static
   hosting and gets a cache-busting name on every re-encode.

   Re-encoded from the 320 kbps master in tools/audio-src/ down to 96 kbps
   stereo: 6.3 MB → 1.9 MB. At the volume this plays at, 96k is transparent,
   and 6.3 MB would have been seven times the weight of the entire rest of
   the site. tools/audio.sh regenerates it. */
import TRACK from "../audio/submitology-loop.mp3";

/* Quiet enough to sit under reading rather than compete with it. Worth
   keeping low: this is a site people read mental-health copy on, and music
   at conversational level turns a reference page into a lobby. */
const VOLUME = 0.32;

/* Hard starts and hard stops are the jarring part of background audio, not
   the audio itself. 600 ms each way is long enough to feel deliberate and
   short enough that the button still feels responsive. */
const FADE_MS = 600;
const FADE_STEP_MS = 40;

/**
 * SoundToggle — background music, off at every page load.
 *
 * ONE piece of state, on purpose, after two versions that had more.
 *
 * The first version stored the preference behind a single flag. That broke on
 * the commonest path: a visitor turns sound on, comes back tomorrow, the
 * browser declines to resume audio without a fresh gesture, and the button
 * then either claims "on" over silence or silently discards the preference.
 *
 * The second version fixed that by splitting intent from playback and adding a
 * first-gesture fallback. It was correct, and it was still confusing — because
 * the honest consequence was that music could begin at a moment the visitor
 * had not chosen, from a control they had not yet noticed, and only on some
 * visits.
 *
 * So the persistence is gone. Sound is off on every load, full stop. The
 * button's pressed state IS whether audio is playing, with no second source of
 * truth that can drift out of step with it. Nothing to reconcile, nothing to
 * explain.
 *
 * Two things followed from that, both worth knowing:
 *   - usePersistentState is no longer used here, so the localStorage key is
 *     gone, so the enumerated list of stored preferences in the privacy policy
 *     lost a line. src/data/legal.js changed in the same commit, as it must
 *     whenever what the site stores changes.
 *   - Because the only way to start audio is now a press of this button, the
 *     browser autoplay policy never comes into it. play() is always called
 *     from inside a user gesture, so it is always allowed.
 *
 * The state does survive navigation: this is a single-page app, so moving
 * between sections never remounts the header. Music keeps playing until it is
 * switched off or the page is genuinely reloaded.
 */
export default function SoundToggle({ lang }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeRef = useRef(null);

  /* One element for the life of the app, created lazily on first use.

     preload="none" plus lazy construction is why this feature is affordable:
     the 1.9 MB track is not fetched until somebody presses the button, so the
     default page weight is exactly what it was before the track existed. */
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const el = new Audio();
      el.src = TRACK;
      el.loop = true;
      el.preload = "none";
      el.volume = 0;
      audioRef.current = el;
    }
    return audioRef.current;
  }, []);

  const fadeTo = useCallback((target, done) => {
    const el = audioRef.current;
    if (!el) return;
    if (fadeRef.current) clearInterval(fadeRef.current);

    /* Someone who has asked for less motion has not asked for less sound, but
       they have asked for fewer animated transitions — so honour it by jumping
       to the target level instead of ramping. */
    const reduce = window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.volume = target;
      if (done) done();
      return;
    }

    const steps = Math.max(1, Math.round(FADE_MS / FADE_STEP_MS));
    const delta = (target - el.volume) / steps;
    let i = 0;
    fadeRef.current = setInterval(() => {
      i += 1;
      /* Clamp: floating-point drift can push this a hair outside 0–1, and the
         volume setter throws on out-of-range rather than clamping. */
      el.volume = Math.min(1, Math.max(0, el.volume + delta));
      if (i >= steps) {
        clearInterval(fadeRef.current);
        fadeRef.current = null;
        el.volume = target;
        if (done) done();
      }
    }, FADE_STEP_MS);
  }, []);

  /* Clear the fade timer if the header ever unmounts. */
  useEffect(() => () => {
    if (fadeRef.current) clearInterval(fadeRef.current);
  }, []);

  const toggle = () => {
    if (playing) {
      setPlaying(false);
      if (audioRef.current) fadeTo(0, () => audioRef.current.pause());
      return;
    }
    const el = getAudio();
    el.volume = 0;
    const p = el.play();
    if (p && typeof p.catch === "function") {
      p.then(() => { setPlaying(true); fadeTo(VOLUME); })
       .catch(() => {
         /* This click is a user gesture, so an autoplay policy will not be
            what refuses it — a device with no audio output might. Report
            silence rather than a pressed button, and drop the element so a
            partial fetch is not left in flight. */
         setPlaying(false);
         const dead = audioRef.current;
         if (dead) {
           dead.pause();
           dead.removeAttribute("src");
           dead.load();
           audioRef.current = null;
         }
       });
    } else {
      setPlaying(true);
      fadeTo(VOLUME);
    }
  };

  const label = playing ? t(T.ui.chrome.soundOff, lang) : t(T.ui.chrome.soundOn, lang);

  return (
    <button
      className="sound-btn"
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={label}
      title={label}
    >
      {/* Two arcs that appear when sound is on, a cross when it is off. Drawn
          rather than an emoji or an icon font: it inherits currentColor, it
          stays crisp at any zoom, and it needs no extra request. */}
      <svg className="sound-btn__icon" viewBox="0 0 20 16" width="20" height="16"
           aria-hidden="true" focusable="false">
        <path d="M2 6h3l4-3.5v11L5 10H2z" fill="currentColor" />
        {playing ? (
          <>
            <path d="M12 5.2a4.4 4.4 0 0 1 0 5.6" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14.6 3a7.6 7.6 0 0 1 0 10" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </>
        ) : (
          <path d="M12.5 5.5l5 5m0-5l-5 5" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </svg>
      <span className="sr-only">{label}</span>
    </button>
  );
}
