import { T, t } from "../i18n";
import { EX_FIGURES } from "../data/exercise-figures";

/** ─── ExerciseFigure ───────────────────────────────────────────────────────
 *  Draws the skeletons in data/exercise-figures.js. One <svg> per frame: two
 *  for a movement (start and end), one for an isometric hold.
 *
 *  THE POSE DATA IS UNCHANGED. Every improvement here is in the drawing, not
 *  in the numbers — forty-six hand-tuned poses are the expensive part of this
 *  feature and re-authoring them to get a better picture would have been the
 *  wrong trade. What changed:
 *
 *    · a tapered torso capsule, so the figure has mass instead of reading as
 *      a wire cross (a four-point polygon was tried first and read as a crate)
 *    · limb weights graded by segment — a thigh is not a forearm
 *    · an onion-skin of the start pose behind the end pose, which is what
 *      turns two drawings into one movement
 *    · an arrow along the path of whichever joint travels furthest
 *    · a mat with a contact shadow rather than a hairline, so the figure
 *      stands on something
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

/* The -3 is headroom: an overhead press puts a hand at y=4 and the bell was
   clipping the top edge. Nothing moved to buy it — the box grew. */
const VIEWBOX = "0 -3 120 95";
const FLOOR = 78;
const MAT_BOTTOM = 92;

// The far-side arm and leg are drawn to the right of the near side and
// lighter. Without the offset a side-on figure reads as a flat cross; with
// it, it reads as a body. The offset lives here rather than in the data so
// the pose numbers stay true limb lengths.
const FAR_DX = 3;

/* Segment weights. Uniform strokes were most of why the old figures read as
   wire: a thigh carries more of the drawing than a forearm does. */
const WT = { thigh: 3.0, shin: 2.4, upper: 2.6, fore: 2.0, neck: 2.8 };
const FAR_SCALE = 0.72;   // far side thinner as well as dimmer, so the depth
                          // cue survives for anyone who can't separate them
                          // by tone alone
const GHOST_SCALE = 0.62;

function Seg({ a, b, w, className }) {
  return <line className={className} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeWidth={w} />;
}

/** Unit vector perpendicular to a→b. Used for the torso taper and the bow of
 *  the motion arc. */
function perp(a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const n = Math.hypot(dx, dy) || 1;
  return [-dy / n, dx / n];
}

function dist(a, b) { return Math.hypot(b[0] - a[0], b[1] - a[1]); }

/** Shoulders-to-hips, wider at the top. Two overlapping round-capped strokes
 *  rather than one, because a single stroke can't taper. */
function Torso({ frame }) {
  const { nk, hp } = frame;
  const mid = [(nk[0] + hp[0]) / 2, (nk[1] + hp[1]) / 2];
  return (
    <g>
      <Seg className="figure__torso" a={nk} b={mid} w={10.4} />
      <Seg className="figure__torso" a={mid} b={hp} w={8.2} />
      <Seg className="figure__spine" a={nk} b={hp} w={WT.neck} />
    </g>
  );
}

function Skeleton({ frame: f }) {
  return (
    <g>
      {/* Far side first so the near side overlaps it. */}
      <g className="figure__far" transform={`translate(${FAR_DX} 0)`}>
        <Seg className="figure__limb" a={f.hp} b={f.kf} w={WT.thigh * FAR_SCALE} />
        <Seg className="figure__limb" a={f.kf} b={f.af} w={WT.shin * FAR_SCALE} />
        <Seg className="figure__limb" a={f.nk} b={f.ef} w={WT.upper * FAR_SCALE} />
        <Seg className="figure__limb" a={f.ef} b={f.hf} w={WT.fore * FAR_SCALE} />
      </g>

      <Torso frame={f} />

      <Seg className="figure__limb" a={f.hp} b={f.kn} w={WT.thigh} />
      <Seg className="figure__limb" a={f.kn} b={f.an} w={WT.shin} />
      <Seg className="figure__limb" a={f.nk} b={f.el} w={WT.upper} />
      <Seg className="figure__limb" a={f.el} b={f.ha} w={WT.fore} />
      <Seg className="figure__limb" a={f.nk} b={f.hd} w={WT.neck} />
      <circle className="figure__head" cx={f.hd[0]} cy={f.hd[1]} r="5" />
    </g>
  );
}

/** The start pose, faint, behind the end pose. No head: two overlapping head
 *  discs was the one thing that made the onion skin read as clutter rather
 *  than as a previous position. */
function Ghost({ frame: f }) {
  const k = GHOST_SCALE;
  return (
    <g className="figure__ghost">
      <Seg className="figure__ghost-limb" a={f.nk} b={f.hp} w={WT.neck * k} />
      <Seg className="figure__ghost-limb" a={f.hp} b={f.kn} w={WT.thigh * k} />
      <Seg className="figure__ghost-limb" a={f.kn} b={f.an} w={WT.shin * k} />
      <Seg className="figure__ghost-limb" a={f.nk} b={f.el} w={WT.upper * k} />
      <Seg className="figure__ghost-limb" a={f.el} b={f.ha} w={WT.fore * k} />
      <Seg className="figure__ghost-limb" a={f.nk} b={f.hd} w={WT.neck * k} />
    </g>
  );
}

/* Joints worth tracking. A shoulder barely moves in most of these and an
   elbow's path is usually a consequence of the hand's, so neither would say
   anything the hand doesn't say better. */
const ARC_JOINTS = ["ha", "an", "hd", "hp", "kn"];
const ARC_MIN = 9;   // below this the arrow is shorter than its own head and
                     // reads as a smudge, so the frame goes without one

/** An arrow along the path of whichever joint travels furthest between the
 *  two frames. This is the part that says "movement" rather than "two
 *  drawings"; the onion skin says where from, the arrow says which way. */
function MotionArc({ from, to }) {
  let joint = null;
  let travelled = 0;
  ARC_JOINTS.forEach((j) => {
    const d = dist(from[j], to[j]);
    if (d > travelled) { travelled = d; joint = j; }
  });
  if (!joint || travelled < ARC_MIN) return null;

  const p0 = from[joint];
  const p1 = to[joint];
  const [px, py] = perp(p0, p1);
  const bow = travelled * 0.22;
  const cx = (p0[0] + p1[0]) / 2 + px * bow;
  const cy = (p0[1] + p1[1]) / 2 + py * bow;

  // Trim both ends so the arrow floats clear of the limb it describes rather
  // than growing out of it.
  const q = (t2) => [
    (1 - t2) ** 2 * p0[0] + 2 * (1 - t2) * t2 * cx + t2 ** 2 * p1[0],
    (1 - t2) ** 2 * p0[1] + 2 * (1 - t2) * t2 * cy + t2 ** 2 * p1[1],
  ];
  const s = q(0.16);
  const e = q(0.9);
  const m = q(0.53);

  const back = q(0.84);
  const tx = e[0] - back[0];
  const ty = e[1] - back[1];
  const n = Math.hypot(tx, ty) || 1;
  const ux = tx / n;
  const uy = ty / n;
  const HL = 4.2;
  const HW = 2.4;
  const head = [
    e,
    [e[0] - ux * HL - uy * HW, e[1] - uy * HL + ux * HW],
    [e[0] - ux * HL + uy * HW, e[1] - uy * HL - ux * HW],
  ];

  return (
    <g>
      <path className="figure__arc"
            d={`M${s[0].toFixed(1)} ${s[1].toFixed(1)} Q${m[0].toFixed(1)} ${m[1].toFixed(1)} ${e[0].toFixed(1)} ${e[1].toFixed(1)}`} />
      <polygon className="figure__arrowhead"
               points={head.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ")} />
    </g>
  );
}

/** The mat, drawn only where the pose actually has a floor under it — a bench
 *  press and a pull-up do not, and the old renderer already knew that because
 *  it keyed the floor line off the `ground` prop. The weave is the tatami
 *  note: faint enough to be texture, not a pattern competing with the pose. */
function Mat() {
  const ticks = [];
  for (let x = 5; x < 120; x += 9) {
    ticks.push(<line className="figure__weave" key={x} x1={x} y1={FLOOR + 1.5} x2={x} y2={MAT_BOTTOM} />);
  }
  return (
    <g>
      <rect className="figure__mat" x="0" y={FLOOR} width="120" height={MAT_BOTTOM - FLOOR} />
      {ticks}
      <line className="figure__floor" x1="0" y1={FLOOR} x2="120" y2={FLOOR} />
    </g>
  );
}

const CONTACT = ["an", "af", "ha", "hf", "kn", "kf", "hp", "el", "ef"];

/** Two stacked ellipses per contact point: a wide faint one and a tight
 *  darker one. A blur filter would do it more accurately but filters are a
 *  per-frame rasterise on a page that can hold thirty of these. */
function Shadows({ frame }) {
  return (
    <g className="figure__shadows">
      {CONTACT.filter((j) => frame[j][1] >= FLOOR - 7).map((j) => (
        <g key={j}>
          <ellipse className="figure__shadow" cx={frame[j][0]} cy={FLOOR} rx="7" ry="1.8" />
          <ellipse className="figure__shadow figure__shadow--core" cx={frame[j][0]} cy={FLOOR} rx="3.4" ry="1.1" />
        </g>
      ))}
    </g>
  );
}

function Prop({ p, frame }) {
  switch (p.t) {
    case "ground":
      return null;                       // <Mat/> replaces the hairline
    case "wall":
      return <line className="figure__floor" x1={p.x} y1="0" x2={p.x} y2={FLOOR} />;
    case "box":
    case "bench":
      return <rect className="figure__prop" x={p.x} y={p.y} width={p.w} height={p.h} rx="1.5" />;
    case "bar":
      return <line className="figure__bar" x1={p.x1} y1={p.y} x2={p.x2} y2={p.y} />;
    case "bell": {
      const j = frame[p.at];
      return <circle className="figure__load" cx={j[0]} cy={j[1]} r={p.small ? 3 : 4.4} />;
    }
    case "plate": {
      const j = frame[p.at];
      return <rect className="figure__load" x={j[0] - 5.5} y={j[1] - 5} width="11" height="4.4" rx="1.2" />;
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

function Frame({ fig, index, label }) {
  const frame = fig.frames[index];
  const grounded = fig.props.some((p) => p.t === "ground");
  const isEnd = fig.frames.length === 2 && index === 1;

  return (
    <figure className="figure">
      <div className="figure__plate">
        <svg className="figure__svg" viewBox={VIEWBOX} aria-hidden="true" focusable="false">
          {grounded && <Mat />}
          {fig.props.map((p, i) => <Prop key={i} p={p} frame={frame} />)}
          {grounded && <Shadows frame={frame} />}
          {isEnd && <Ghost frame={fig.frames[0]} />}
          {isEnd && <MotionArc from={fig.frames[0]} to={frame} />}
          <Skeleton frame={frame} />
        </svg>
      </div>
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
        <Frame key={i} fig={fig} index={i} label={labels[i]} />
      ))}
    </div>
  );
}
