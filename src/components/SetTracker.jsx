import { useEffect, useRef, useState } from "react";
import { T, t } from "../i18n";
import { parseRx } from "../data/program";

/** ─── SetTracker ───────────────────────────────────────────────────────────
 *  Counts sets through an exercise and runs the rest clock between them.
 *
 *  STATE IS SESSION-ONLY, ON PURPOSE. Every other piece of state on this page
 *  is persisted (`sc-choice`, `sc-built`), so the exception needs a reason:
 *  the privacy policy in data/legal.js lists the exact localStorage keys this
 *  site writes, and that list is a factual claim. Persisting mid-workout
 *  progress would mean an eighth key and an edit to the policy in the same
 *  commit. It would also be the wrong behaviour — reopening the page a week
 *  later to find yourself two sets into Tuesday's session is noise, not
 *  continuity. Reloading clears it, which is what "session-only" means and
 *  what the hint under the tracker tells the reader.
 *
 *  The rest timer starts by itself when a set is logged and does not run after
 *  the final one: a countdown you have to dismiss at the end of an exercise is
 *  just something else to tap. "Set done" and "Skip rest" share a button
 *  because they are never both available, which matters on a phone. */

function clock(total) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function SetTracker({ rx, restSec, lang }) {
  const spec = parseRx(rx);
  const [done, setDone] = useState(0);
  const [left, setLeft] = useState(0);
  const timer = useRef(null);

  const stop = () => {
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
  };

  // An interval outlives the component unless it is cleared. Without this the
  // page keeps ticking after you navigate away, and React warns about setting
  // state on an unmounted component.
  useEffect(() => stop, []);

  // Nothing to count: warm-up and cooldown are given in minutes, not sets.
  if (!spec) return null;

  const { sets } = spec;
  const resting = left > 0;
  const complete = done >= sets;
  const restFor = spec.kind === "rounds" ? spec.restSec : restSec;

  const tick = () => {
    setLeft((prev) => {
      if (prev <= 1) { stop(); return 0; }
      return prev - 1;
    });
  };

  const advance = () => {
    if (resting) { stop(); setLeft(0); return; }
    if (complete) return;
    const next = done + 1;
    setDone(next);
    if (next < sets && restFor > 0) {
      setLeft(restFor);
      stop();
      timer.current = setInterval(tick, 1000);
    }
  };

  const reset = () => { stop(); setLeft(0); setDone(0); };

  const unit = spec.kind === "rounds" ? t(T.ui.sc.rounds, lang) : t(T.ui.sc.sets, lang);
  const status = resting
    ? `${t(T.ui.sc.resting, lang)} ${clock(left)}`
    : complete
      ? t(T.ui.sc.allLogged, lang)
      : `${done} / ${sets} ${unit}`;

  return (
    <div className="tracker">
      <ul className="tracker__pips" aria-hidden="true">
        {Array.from({ length: sets }, (_, i) => (
          <li key={i} className={"tracker__pip" + (i < done ? " is-done" : "")} />
        ))}
      </ul>

      <span className="tracker__status" aria-live="polite">{status}</span>

      <button type="button" className="tracker__btn" onClick={advance} disabled={complete && !resting}>
        {resting
          ? t(T.ui.sc.skipRest, lang)
          : spec.kind === "rounds" ? t(T.ui.sc.roundDone, lang) : t(T.ui.sc.setDone, lang)}
      </button>

      {done > 0 && (
        <button type="button" className="tracker__btn tracker__btn--quiet" onClick={reset}>
          {t(T.ui.sc.resetSets, lang)}
        </button>
      )}
    </div>
  );
}
