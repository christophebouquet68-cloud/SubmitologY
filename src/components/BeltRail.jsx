/**
 * BeltRail — a BJJ belt as a progress device.
 *
 * WHY THIS AND NOT A PROGRESS BAR
 * The site had no visual language of its own from the sport it is about. The
 * mat, the weave and the belt are the three things every practitioner
 * recognises on sight, and the belt is the only one of them that carries
 * information: colour is rank, stripes are rank within it. So the one device
 * this design spends its boldness on is a belt, and it appears only where
 * there is a real rank to show — the level you chose on the conditioning
 * page, and how much of the technique map you have drilled. Everywhere else
 * there is no rank, so there is no belt; a rail on the contact page would be
 * decoration wearing a uniform.
 *
 * ACCESSIBILITY: aria-hidden, and deliberately so. Both places that use it
 * print the same fact in words immediately beside it ("Beginner", "27 / 60
 * drilled"), exactly as the technique map's legend dots sit beside their
 * labels. A screen reader announcing "belt, one stripe" would add a second
 * vocabulary for a fact already stated in the first.
 *
 * The tip and stripes are real elements rather than a background image so
 * they inherit the print stylesheet and cost no request.
 */

const SLOTS = 4;   // a BJJ belt takes four stripes before the next belt

export default function BeltRail({ colour, stripes = 0, className = "" }) {
  const filled = Math.max(0, Math.min(SLOTS, Math.round(stripes)));

  return (
    <div className={`rail ${className}`.trim()} style={{ "--belt": colour }} aria-hidden="true">
      <span className="rail__body" />
      <span className="rail__tip">
        {Array.from({ length: SLOTS }, (_, i) => (
          <span key={i} className={`rail__stripe${i < filled ? " is-on" : ""}`} />
        ))}
      </span>
    </div>
  );
}

/** Techniques drilled → stripes. Four stripes means the whole map, so the
 *  last one only lands at 100% rather than rounding up at 88%. */
export function stripesForProgress(done, total) {
  if (!total) return 0;
  return Math.min(SLOTS, Math.floor((done / total) * SLOTS));
}
