/** ─── SizeDiagram ───────────────────────────────────────────────────────────
 *  Where A and B are taken on each garment, as a line drawing.
 *
 *  DRAWN HERE, NOT THE MAKER'S PICTURES. The size sheets these charts come
 *  from show the measurements on photographs of other garments, with the
 *  maker's name and other brands' artwork printed on them. None of that
 *  belongs on this site, so the diagrams are redrawn as plain outlines with
 *  nothing printed on them. Keep them that way: no wordmarks, no artwork.
 *
 *  They are outlines of a generic cut, not of our garments — enough to show
 *  where a tape goes, and deliberately not a picture of the product. The
 *  product photographs are on the card the reader just came from.
 *
 *  COLOUR: the garment is drawn in the muted text colour and the two
 *  measurements in gold, which is the token for seams and hairlines. Nothing
 *  here is a fill of orange or purple; neither commerce nor the mental-health
 *  thread has anything to say about where a tape measure goes.
 *
 *  ACCESSIBILITY: `aria-hidden`, like the exercise figures and for the same
 *  reason. The two "how to measure" lines under the table say in words
 *  exactly what the drawing shows, so announcing it as an image would only
 *  repeat them.
 *
 *  INLINE SVG: no request, nothing to route through PUBLIC_URL, and no image
 *  file that could quietly be swapped back for a maker's sheet.
 */

const VIEWBOX = "0 0 200 220";

/* Each garment is one closed outline plus a few inner lines (collar, cuffs,
   waistband) that make it read as clothing rather than as a blob. `a` and `b`
   are the two measurements: a line between two points, or an ellipse for a
   measurement taken around something. `at` is where the letter sits — on
   its own line wherever there is one, so nobody has to match them up. */
const GARMENTS = {
  "long-sleeve": {
    outline: "M80 24 Q100 38 120 24 L152 36 L188 156 L171 162 L143 78 L141 198 L59 198 L57 78 L29 162 L12 156 L48 36 Z",
    details: [
      "M80 24 Q100 44 120 24",
      "M185 147 L168 153", "M15 147 L32 153",
      "M59 190 L141 190",
    ],
    a: { line: [82, 25, 82, 198], at: [82, 138] },
    b: { line: [57, 80, 143, 80], at: [116, 80] },
  },
  "short-sleeve": {
    outline: "M80 24 Q100 38 120 24 L152 34 L182 70 L163 86 L143 68 L141 198 L59 198 L57 68 L37 86 L18 70 L48 34 Z",
    details: [
      "M80 24 Q100 44 120 24",
      "M177 64 L158 80", "M23 64 L42 80",
      "M59 190 L141 190",
    ],
    a: { line: [82, 25, 82, 198], at: [82, 136] },
    b: { line: [57, 74, 143, 74], at: [116, 74] },
  },
  tank: {
    outline: "M72 22 Q100 62 128 22 L142 24 Q140 62 150 80 L147 198 L53 198 L50 80 Q60 62 58 24 Z",
    details: [
      "M67 23 Q100 70 133 23",
      "M53 190 L147 190",
    ],
    a: { line: [65, 23, 65, 198], at: [65, 140] },
    b: { line: [50, 82, 150, 82], at: [116, 82] },
  },
  /* The 2-in-1: an outer short with the liner showing under each hem. */
  shorts: {
    outline: "M46 44 L154 44 L156 58 L170 152 L107 158 L100 112 L93 158 L30 152 L44 58 Z",
    details: [
      "M44 58 L156 58",
      "M34 153 L37 172 L92 176 L93 158",
      "M166 153 L163 172 L108 176 L107 158",
    ],
    a: { ellipse: [100, 44, 62, 10], at: [22, 34] },
    b: { line: [186, 44, 186, 153], at: [186, 100] },
  },
  "compression-shorts": {
    outline: "M52 40 L148 40 L149 56 Q152 100 142 196 L107 198 L100 104 L93 198 L58 196 Q48 100 51 56 Z",
    details: [
      "M51 56 L149 56",
      "M59 188 L93 190", "M141 188 L107 190",
    ],
    a: { ellipse: [100, 40, 56, 10], at: [28, 30] },
    b: { line: [168, 40, 168, 197], at: [168, 120] },
  },
};

/* The letter in its ring. The ring is filled with the panel colour so a
   measurement line passing behind it doesn't run through the letter. */
function Mark({ letter, at }) {
  return (
    <g className="size-diagram__mark">
      <circle cx={at[0]} cy={at[1]} r="9" />
      <text x={at[0]} y={at[1]} textAnchor="middle" dominantBaseline="central">{letter}</text>
    </g>
  );
}

function Measure({ letter, spec }) {
  return (
    <g className="size-diagram__measure">
      {spec.line && (
        <>
          <line x1={spec.line[0]} y1={spec.line[1]} x2={spec.line[2]} y2={spec.line[3]} />
          <circle className="size-diagram__end" cx={spec.line[0]} cy={spec.line[1]} r="3.5" />
          <circle className="size-diagram__end" cx={spec.line[2]} cy={spec.line[3]} r="3.5" />
        </>
      )}
      {spec.ellipse && (
        <ellipse cx={spec.ellipse[0]} cy={spec.ellipse[1]} rx={spec.ellipse[2]} ry={spec.ellipse[3]} />
      )}
      <Mark letter={letter} at={spec.at} />
    </g>
  );
}

export default function SizeDiagram({ kind }) {
  const g = GARMENTS[kind];
  if (!g) return null;
  return (
    <svg className="size-diagram" viewBox={VIEWBOX} aria-hidden="true" focusable="false">
      <path className="size-diagram__garment" d={g.outline} />
      {g.details.map((d) => (
        <path key={d} className="size-diagram__detail" d={d} />
      ))}
      <Measure letter="A" spec={g.a} />
      <Measure letter="B" spec={g.b} />
    </svg>
  );
}

/** For the tests: every diagram a chart can ask for has to exist here. */
export const DIAGRAM_KINDS = Object.keys(GARMENTS);
