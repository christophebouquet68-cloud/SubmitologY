import { T, t } from "../i18n";
import { EX_FIGURES } from "../data/exercise-figures";

/** ─── ExerciseFigure ───────────────────────────────────────────────────────
 *  Draws the skeletons in data/exercise-figures.js. One <svg> per frame: two
 *  for a movement (start and end), one for an isometric hold.
 *
 *  ACCESSIBILITY: the figures are `aria-hidden`. That is deliberate and not
 *  an oversight. A stick figure carries nothing a screen reader could use
 *  that the cue beside it does not already say in words, and announcing
 *  "diagram of goblet squat, start" before every exercise would be noise on
 *  a page with fifteen of them. The cue is the accessible version — which is
 *  also why the cue is never hidden behind the same toggle on its own.
 *
 *  INLINE SVG, NOT IMAGE FILES: no network request, so nothing to add to the
 *  privacy policy, nothing to route through PUBLIC_URL, and the figures print
 *  with the S&C handout instead of dropping out of it.
 */

const VIEWBOX = "0 0 120 88";
const FLOOR = 78;

// The far-side arm and leg are drawn 2 units to the right and lighter. Without
// the offset a side-on figure reads as a flat cross; with it, it reads as a
// body. The offset lives here rather than in the data so the pose numbers stay
// true limb lengths.
const FAR_DX = 2;

function Limb({ pts, className }) {
  return <polyline className={className} points={pts.map((p) => p.join(",")).join(" ")} />;
}

function Prop({ p, frame }) {
  switch (p.t) {
    case "ground":
      return <line className="figure__floor" x1="6" y1={FLOOR} x2="114" y2={FLOOR} />;
    case "wall":
      return <line className="figure__floor" x1={p.x} y1="8" x2={p.x} y2={FLOOR} />;
    case "box":
    case "bench":
      return <rect className="figure__prop" x={p.x} y={p.y} width={p.w} height={p.h} rx="1.5" />;
    case "bar":
      return <line className="figure__prop-line" x1={p.x1} y1={p.y} x2={p.x2} y2={p.y} />;
    case "bell": {
      const j = frame[p.at];
      return <circle className="figure__load" cx={j[0]} cy={j[1]} r={p.small ? 3 : 4.5} />;
    }
    case "plate": {
      const j = frame[p.at];
      return <rect className="figure__load" x={j[0] - 5} y={j[1] - 5} width="10" height="4" rx="1" />;
    }
    case "band": {
      // A band has two ends, so it names its joint `to` rather than `at`.
      const j = frame[p.to];
      return <line className="figure__band" x1={p.from[0]} y1={p.from[1]} x2={j[0]} y2={j[1]} />;
    }
    case "rope": {
      const j = frame[p.at];
      // A single quadratic wave reads as slack rope; anything more detailed
      // fights the line weight of the figure itself.
      return (
        <path className="figure__band" fill="none"
              d={`M ${j[0]} ${j[1]} Q ${j[0] + 16} ${j[1] - 10} ${j[0] + 30} ${j[1] + 4}`} />
      );
    }
    default:
      return null;
  }
}

function Frame({ frame, props: propList, label }) {
  const far = `translate(${FAR_DX} 0)`;
  return (
    <figure className="figure">
      <svg className="figure__svg" viewBox={VIEWBOX} aria-hidden="true" focusable="false">
        {propList.map((p, i) => <Prop key={i} p={p} frame={frame} />)}

        {/* Far side first so the near side overlaps it. */}
        <g className="figure__far" transform={far}>
          <Limb className="figure__limb" pts={[frame.hp, frame.kf, frame.af]} />
          <Limb className="figure__limb" pts={[frame.nk, frame.ef, frame.hf]} />
        </g>

        <Limb className="figure__spine" pts={[frame.nk, frame.hp]} />
        <Limb className="figure__limb" pts={[frame.hp, frame.kn, frame.an]} />
        <Limb className="figure__limb" pts={[frame.nk, frame.el, frame.ha]} />
        <line className="figure__spine" x1={frame.nk[0]} y1={frame.nk[1]}
              x2={frame.hd[0]} y2={frame.hd[1]} />
        <circle className="figure__head" cx={frame.hd[0]} cy={frame.hd[1]} r="5.5" />
      </svg>
      <figcaption className="figure__cap">{label}</figcaption>
    </figure>
  );
}

export default function ExerciseFigure({ id, lang }) {
  const fig = EX_FIGURES[id];
  // No figure is a valid state: the cue still renders on its own. Drawing a
  // placeholder box would be worse than drawing nothing.
  if (!fig) return null;

  const single = fig.frames.length === 1;
  const labels = single
    ? [t(T.ui.sc.phaseHold, lang)]
    : [t(T.ui.sc.phaseStart, lang), t(T.ui.sc.phaseEnd, lang)];

  return (
    <div className="figure-row">
      {fig.frames.map((f, i) => (
        <Frame key={i} frame={f} props={fig.props} label={labels[i]} />
      ))}
    </div>
  );
}
