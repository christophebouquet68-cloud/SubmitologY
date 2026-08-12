// ─── data/exercise-figures.js — pose data for the exercise diagrams ────────
//
// WHY POSES AND NOT DRAWINGS
// Forty-six exercises hand-drawn as SVG would be forty-six drawings to keep
// consistent, and the first time someone wanted thicker limbs or a different
// head size it would be forty-six edits. Instead each exercise is one or two
// skeletons — a bag of joint coordinates — and `components/ExerciseFigure`
// draws them. Adding an exercise is a dozen numbers, not a drawing.
//
// The second reason is translation. A figure carries no words, so it is the
// same asset in all five languages. The cue beside it is the part that gets
// translated (see exercise-cues.js).
//
// COORDINATE SPACE
// 120 × 84, figure facing right, floor at y = 74. Joints:
//
//   hd head centre      nk neck/shoulder     hp hip
//   kn near knee        an near ankle
//   kf far knee         af far ankle
//   el near elbow       ha near hand
//   ef far elbow        hf far hand
//
// The near-side limbs are drawn solid, the far side lighter, which is what
// stops a side-on figure reading as a flat cross.
//
// TWO FRAMES OR ONE
// Two frames = a movement, drawn as start and end, labelled by the component.
// One frame = an isometric hold (plank, wall sit, child's pose): there is no
// second position to show, and inventing one would misdescribe the exercise.
//
// Limb lengths are kept roughly constant between the frames of a figure —
// a shin that grows 40% between start and end reads as a broken drawing
// rather than a movement. `exerciseFigures.test.js` checks that.

const GROUND = { t: "ground" };

/** props: ground | wall(x) | box(x,y,w,h) | bench(x,y,w,h) | bar(y,x1,x2)
 *         | bell(at) | plate(at) | band(from:[x,y], to:joint) | rope(at) */
export const EX_FIGURES = {

  /* ── Lower body ─────────────────────────────────────────────────────── */
  bodyweightSquat: {
    props: [GROUND],
    frames: [
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[51,61], an:[52,78], kf:[53,61], af:[52,78],
        el:[58,34], ha:[69,36], ef:[58,34], hf:[68,37] },
      { hd:[59,33], nk:[56,40], hp:[47,60], kn:[61,58], an:[63,75], kf:[61,60], af:[62,77],
        el:[65,45], ha:[76,45], ef:[65,46], hf:[76,47] },
    ],
  },
  gobletSquat: {
    props: [GROUND, { t:"bell", at:"ha" }],
    frames: [
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[51,61], an:[52,78], kf:[53,61], af:[52,78],
        el:[60,32], ha:[71,29], ef:[60,32], hf:[70,30] },
      { hd:[59,33], nk:[56,40], hp:[47,60], kn:[61,58], an:[63,75], kf:[61,60], af:[62,77],
        el:[66,44], ha:[75,40], ef:[65,45], hf:[75,41] },
    ],
  },
  bulgarianSplitSquat: {
    props: [GROUND, { t:"bench", x:16, y:64, w:26, h:14 }],
    frames: [
      { hd:[54,18], nk:[54,26], hp:[54,48], kn:[60,61], an:[62,78], kf:[45,59], af:[60,65],
        el:[54,36], ha:[54,47], ef:[54,36], hf:[54,47] },
      { hd:[54,26], nk:[54,34], hp:[54,56], kn:[62,68], an:[65,84], kf:[47,69], af:[63,72],
        el:[54,44], ha:[54,55], ef:[54,44], hf:[54,55] },
    ],
  },
  walkingLunge: {
    props: [GROUND],
    frames: [
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[59,60], an:[61,76], kf:[43,58], af:[53,72],
        el:[52,35], ha:[52,46], ef:[52,35], hf:[52,46] },
      { hd:[52,25], nk:[52,33], hp:[52,55], kn:[61,66], an:[64,82], kf:[45,68], af:[57,78],
        el:[52,43], ha:[52,54], ef:[52,43], hf:[52,54] },
    ],
  },
  romanianDeadliftDB: {
    props: [GROUND, { t:"bell", at:"ha" }, { t:"bell", at:"hf" }],
    frames: [
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[51,61], an:[52,78], kf:[53,61], af:[52,78],
        el:[52,35], ha:[52,46], ef:[52,35], hf:[52,46] },
      { hd:[71,31], nk:[64,34], hp:[45,46], kn:[44,60], an:[45,77], kf:[45,60], af:[45,77],
        el:[65,44], ha:[65,55], ef:[64,44], hf:[64,55] },
    ],
  },
  stepUp: {
    props: [GROUND, { t:"box", x:58, y:66, w:34, h:12 }],
    frames: [
      { hd:[52,20], nk:[52,28], hp:[52,50], kn:[63,60], an:[71,74], kf:[49,64], af:[50,81],
        el:[52,38], ha:[52,49], ef:[52,38], hf:[52,49] },
      { hd:[70,12], nk:[70,20], hp:[70,42], kn:[70,56], an:[70,73], kf:[63,55], af:[73,68],
        el:[70,30], ha:[70,41], ef:[70,30], hf:[70,41] },
    ],
  },
  dbStepUp: {
    props: [GROUND, { t:"box", x:58, y:66, w:34, h:12 }, { t:"bell", at:"ha" }, { t:"bell", at:"hf" }],
    frames: [
      { hd:[52,20], nk:[52,28], hp:[52,50], kn:[63,60], an:[71,74], kf:[49,64], af:[50,81],
        el:[52,38], ha:[52,49], ef:[52,38], hf:[52,49] },
      { hd:[70,12], nk:[70,20], hp:[70,42], kn:[70,56], an:[70,73], kf:[63,55], af:[73,68],
        el:[70,30], ha:[70,41], ef:[70,30], hf:[70,41] },
    ],
  },
  wallSit: {
    props: [GROUND, { t:"wall", x:38 }],
    frames: [
      { hd:[46,17], nk:[46,25], hp:[46,47], kn:[46,61], an:[46,78], kf:[47,61], af:[46,78],
        el:[46,36], ha:[46,46], ef:[45,35], hf:[45,46] },
      { hd:[46,32], nk:[46,40], hp:[46,62], kn:[60,62], an:[61,78], kf:[60,61], af:[60,77],
        el:[56,44], ha:[67,45], ef:[56,44], hf:[66,46] },
    ],
  },
  broadJump: {
    props: [GROUND],
    frames: [
      { hd:[57,30], nk:[55,38], hp:[45,57], kn:[59,60], an:[62,76], kf:[59,61], af:[60,78],
        el:[46,43], ha:[35,41], ef:[46,43], hf:[35,40] },
      { hd:[68,22], nk:[64,29], hp:[47,43], kn:[61,41], an:[76,49], kf:[62,43], af:[74,53],
        el:[72,22], ha:[83,19], ef:[72,23], hf:[83,21] },
    ],
  },

  /* ── Upper body: push ───────────────────────────────────────────────── */
  pushUp: {
    props: [GROUND],
    frames: [
      { hd:[26,63], nk:[34,62], hp:[56,67], kn:[70,69], an:[86,73], kf:[70,70], af:[85,75],
        el:[32,72], ha:[23,79], ef:[31,72], hf:[22,78] },
      { hd:[24,71], nk:[32,70], hp:[54,74], kn:[68,76], an:[84,79], kf:[68,77], af:[84,81],
        el:[25,78], ha:[14,79], ef:[25,78], hf:[14,78] },
    ],
  },
  pikePushUp: {
    props: [GROUND],
    frames: [
      { hd:[30,56], nk:[38,54], hp:[55,40], kn:[64,52], an:[67,68], kf:[63,53], af:[65,69],
        el:[35,64], ha:[28,73], ef:[35,64], hf:[27,72] },
      { hd:[28,66], nk:[36,64], hp:[52,49], kn:[62,60], an:[66,76], kf:[61,61], af:[64,77],
        el:[30,72], ha:[19,75], ef:[29,72], hf:[18,74] },
    ],
  },
  benchDip: {
    props: [GROUND, { t:"bench", x:20, y:54, w:28, h:24 }],
    frames: [
      { hd:[45,28], nk:[46,36], hp:[49,58], kn:[63,60], an:[71,74], kf:[63,61], af:[70,76],
        el:[41,45], ha:[38,56], ef:[40,45], hf:[37,55] },
      { hd:[43,34], nk:[44,42], hp:[47,64], kn:[61,65], an:[72,78], kf:[61,66], af:[71,80],
        el:[34,45], ha:[32,56], ef:[34,44], hf:[31,55] },
    ],
  },
  dbBenchPress: {
    props: [{ t:"bench", x:28, y:56, w:64, h:8 }, { t:"bell", at:"ha" }, { t:"bell", at:"hf" }],
    frames: [
      { hd:[36,51], nk:[44,52], hp:[66,55], kn:[74,67], an:[78,83], kf:[73,68], af:[75,84],
        el:[47,42], ha:[48,31], ef:[47,42], hf:[49,31] },
      { hd:[36,51], nk:[44,52], hp:[66,55], kn:[74,67], an:[78,83], kf:[73,68], af:[75,84],
        el:[53,46], ha:[50,35], ef:[53,47], hf:[51,36] },
    ],
  },
  dbOverheadPress: {
    props: [GROUND, { t:"bell", at:"ha" }, { t:"bell", at:"hf" }],
    frames: [
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[51,61], an:[52,78], kf:[53,61], af:[52,78],
        el:[45,33], ha:[44,22], ef:[59,33], hf:[60,22] },
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[51,61], an:[52,78], kf:[53,61], af:[52,78],
        el:[49,15], ha:[50,4], ef:[55,15], hf:[54,4] },
    ],
  },
  tricepExtension: {
    props: [GROUND, { t:"bell", at:"ha" }],
    frames: [
      { hd:[52,19], nk:[52,27], hp:[52,49], kn:[51,63], an:[52,80], kf:[53,63], af:[52,80],
        el:[51,17], ha:[51,6], ef:[53,17], hf:[53,6] },
      { hd:[52,19], nk:[52,27], hp:[52,49], kn:[51,63], an:[52,80], kf:[53,63], af:[52,80],
        el:[51,17], ha:[40,18], ef:[53,17], hf:[42,17] },
    ],
  },

  /* ── Upper body: pull ───────────────────────────────────────────────── */
  towelRow: {
    props: [GROUND, { t:"band", from:[106,30], to:"ha" }],
    frames: [
      { hd:[41,29], nk:[44,36], hp:[54,55], kn:[67,62], an:[76,76], kf:[67,63], af:[74,78],
        el:[54,32], ha:[65,31], ef:[54,33], hf:[65,32] },
      { hd:[51,24], nk:[54,32], hp:[65,51], kn:[78,56], an:[87,70], kf:[78,58], af:[86,72],
        el:[60,23], ha:[71,25], ef:[61,24], hf:[71,27] },
    ],
  },
  invertedRowChair: {
    props: [GROUND, { t:"bar", y:34, x1:36, x2:76 }],
    frames: [
      { hd:[40,50], nk:[48,50], hp:[69,55], kn:[84,58], an:[99,65], kf:[83,59], af:[98,67],
        el:[52,40], ha:[54,29], ef:[53,41], hf:[55,30] },
      { hd:[42,42], nk:[50,42], hp:[71,47], kn:[86,50], an:[101,57], kf:[85,51], af:[100,59],
        el:[43,34], ha:[53,29], ef:[44,34], hf:[54,30] },
    ],
  },
  supermanHold: {
    props: [GROUND],
    frames: [
      { hd:[28,67], nk:[36,66], hp:[58,63], kn:[72,60], an:[88,55], kf:[72,61], af:[88,57],
        el:[26,63], ha:[16,60], ef:[26,63], hf:[16,58] },
    ],
  },
  bentOverRow: {
    props: [GROUND, { t:"bell", at:"ha" }, { t:"bell", at:"hf" }],
    frames: [
      { hd:[71,33], nk:[64,36], hp:[46,49], kn:[44,63], an:[46,79], kf:[46,63], af:[46,80],
        el:[65,46], ha:[65,57], ef:[64,46], hf:[64,57] },
      { hd:[71,33], nk:[64,36], hp:[46,49], kn:[44,63], an:[46,79], kf:[46,63], af:[46,80],
        el:[56,43], ha:[61,52], ef:[56,42], hf:[60,52] },
    ],
  },
  latPulldownOrPullup: {
    props: [{ t:"bar", y:14, x1:32, x2:72 }],
    frames: [
      { hd:[52,32], nk:[52,40], hp:[53,62], kn:[46,75], an:[61,82], kf:[47,75], af:[61,83],
        el:[47,31], ha:[49,20], ef:[57,31], hf:[55,20] },
      { hd:[52,8], nk:[52,16], hp:[53,38], kn:[45,50], an:[61,56], kf:[46,51], af:[61,58],
        el:[48,26], ha:[44,15], ef:[56,26], hf:[60,15] },
    ],
  },
  facePullBand: {
    props: [GROUND, { t:"band", from:[110,26], to:"ha" }],
    frames: [
      { hd:[52,19], nk:[52,27], hp:[52,49], kn:[51,63], an:[52,80], kf:[53,63], af:[52,80],
        el:[62,24], ha:[73,23], ef:[62,25], hf:[73,25] },
      { hd:[52,19], nk:[52,27], hp:[52,49], kn:[51,63], an:[52,80], kf:[53,63], af:[52,80],
        el:[42,25], ha:[52,23], ef:[42,24], hf:[53,23] },
    ],
  },

  /* ── Core ───────────────────────────────────────────────────────────── */
  plank: {
    props: [GROUND],
    frames: [
      { hd:[26,65], nk:[34,64], hp:[56,68], kn:[70,70], an:[86,73], kf:[70,71], af:[86,75],
        el:[33,74], ha:[24,80], ef:[32,74], hf:[22,79] },
    ],
  },
  weightedPlank: {
    props: [GROUND, { t:"plate", at:"hp" }],
    frames: [
      { hd:[26,65], nk:[34,64], hp:[56,68], kn:[70,70], an:[86,73], kf:[70,71], af:[86,75],
        el:[33,74], ha:[24,80], ef:[32,74], hf:[22,79] },
    ],
  },
  sidePlank: {
    props: [GROUND],
    frames: [
      { hd:[26,61], nk:[34,60], hp:[56,65], kn:[70,67], an:[86,71], kf:[70,68], af:[85,73],
        el:[31,70], ha:[21,75], ef:[36,50], hf:[36,39] },
    ],
  },
  deadBug: {
    props: [GROUND],
    frames: [
      { hd:[28,70], nk:[36,70], hp:[58,69], kn:[58,55], an:[74,55], kf:[59,55], af:[76,56],
        el:[37,60], ha:[37,49], ef:[38,60], hf:[39,49] },
      { hd:[28,70], nk:[36,70], hp:[58,69], kn:[72,64], an:[88,67], kf:[59,55], af:[76,56],
        el:[26,66], ha:[15,66], ef:[38,60], hf:[39,49] },
    ],
  },
  palloffPress: {
    props: [GROUND, { t:"band", from:[8,38], to:"ha" }],
    frames: [
      { hd:[52,19], nk:[52,27], hp:[52,49], kn:[51,63], an:[52,80], kf:[53,63], af:[52,80],
        el:[59,34], ha:[70,33], ef:[59,35], hf:[70,35] },
      { hd:[52,19], nk:[52,27], hp:[52,49], kn:[51,63], an:[52,80], kf:[53,63], af:[52,80],
        el:[62,28], ha:[73,28], ef:[62,29], hf:[73,29] },
    ],
  },
  farmerCarry: {
    props: [GROUND, { t:"bell", at:"ha" }, { t:"bell", at:"hf" }],
    frames: [
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[56,61], an:[59,77], kf:[48,61], af:[45,77],
        el:[52,35], ha:[52,46], ef:[52,35], hf:[52,46] },
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[48,61], an:[45,77], kf:[56,61], af:[59,77],
        el:[52,35], ha:[52,46], ef:[52,35], hf:[52,46] },
    ],
  },
  farmerCarryInterval: {
    props: [GROUND, { t:"bell", at:"ha" }, { t:"bell", at:"hf" }],
    frames: [
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[56,61], an:[59,77], kf:[48,61], af:[45,77],
        el:[52,35], ha:[52,46], ef:[52,35], hf:[52,46] },
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[48,61], an:[45,77], kf:[56,61], af:[59,77],
        el:[52,35], ha:[52,46], ef:[52,35], hf:[52,46] },
    ],
  },

  /* ── Conditioning ───────────────────────────────────────────────────── */
  burpee: {
    props: [GROUND],
    frames: [
      { hd:[52,16], nk:[52,24], hp:[52,46], kn:[51,60], an:[52,77], kf:[53,60], af:[52,77],
        el:[47,15], ha:[45,4], ef:[57,15], hf:[59,4] },
      { hd:[26,63], nk:[34,62], hp:[56,67], kn:[70,69], an:[86,73], kf:[70,70], af:[85,75],
        el:[32,72], ha:[23,79], ef:[31,72], hf:[22,78] },
    ],
  },
  mountainClimber: {
    props: [GROUND],
    frames: [
      { hd:[26,63], nk:[34,62], hp:[56,67], kn:[42,62], an:[53,74], kf:[70,70], af:[85,75],
        el:[32,72], ha:[23,79], ef:[31,72], hf:[22,78] },
      { hd:[26,63], nk:[34,62], hp:[56,67], kn:[70,69], an:[86,73], kf:[42,61], af:[52,74],
        el:[32,72], ha:[23,79], ef:[31,72], hf:[22,78] },
    ],
  },
  jumpingJack: {
    props: [GROUND],
    frames: [
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[50,61], an:[50,78], kf:[54,61], af:[54,78],
        el:[51,35], ha:[51,46], ef:[53,35], hf:[53,46] },
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[43,58], an:[35,73], kf:[61,58], af:[69,73],
        el:[44,18], ha:[39,8], ef:[60,18], hf:[65,8] },
    ],
  },
  marchInPlace: {
    props: [GROUND],
    frames: [
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[66,48], an:[69,65], kf:[49,61], af:[49,78],
        el:[48,35], ha:[47,45], ef:[59,17], hf:[69,21] },
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[49,61], an:[49,78], kf:[66,48], af:[69,65],
        el:[59,17], ha:[69,21], ef:[48,35], hf:[47,45] },
    ],
  },
  sitToStand: {
    props: [GROUND, { t:"bench", x:20, y:62, w:28, h:16 }],
    frames: [
      { hd:[39,32], nk:[40,40], hp:[42,62], kn:[56,62], an:[57,78], kf:[56,63], af:[56,79],
        el:[48,47], ha:[59,49], ef:[48,47], hf:[58,50] },
      { hd:[48,17], nk:[48,25], hp:[48,47], kn:[47,61], an:[48,78], kf:[49,61], af:[48,78],
        el:[48,35], ha:[48,46], ef:[48,35], hf:[48,46] },
    ],
  },
  stepTouch: {
    props: [GROUND],
    frames: [
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[50,61], an:[50,78], kf:[54,61], af:[54,78],
        el:[51,35], ha:[51,46], ef:[53,35], hf:[53,46] },
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[43,58], an:[38,74], kf:[61,58], af:[66,74],
        el:[42,29], ha:[31,29], ef:[62,29], hf:[73,29] },
    ],
  },
  kettlebellSwing: {
    props: [GROUND, { t:"bell", at:"ha" }],
    frames: [
      { hd:[70,33], nk:[62,36], hp:[43,47], kn:[42,61], an:[43,78], kf:[43,61], af:[43,78],
        el:[66,46], ha:[64,57], ef:[65,46], hf:[62,57] },
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[51,61], an:[52,78], kf:[53,61], af:[52,78],
        el:[61,30], ha:[72,28], ef:[61,31], hf:[72,30] },
    ],
  },
  kettlebellSwingLight: {
    props: [GROUND, { t:"bell", at:"ha", small:true }],
    frames: [
      { hd:[70,33], nk:[62,36], hp:[43,47], kn:[42,61], an:[43,78], kf:[43,61], af:[43,78],
        el:[66,46], ha:[64,57], ef:[65,46], hf:[62,57] },
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[51,61], an:[52,78], kf:[53,61], af:[52,78],
        el:[61,30], ha:[72,28], ef:[61,31], hf:[72,30] },
    ],
  },
  rowMachineInterval: {
    props: [{ t:"bar", y:76, x1:14, x2:112 }, { t:"band", from:[22,52], to:"ha" }],
    frames: [
      { hd:[49,41], nk:[54,48], hp:[66,67], kn:[52,62], an:[37,67], kf:[52,61], af:[37,65],
        el:[44,49], ha:[33,50], ef:[44,49], hf:[33,48] },
      { hd:[66,41], nk:[72,46], hp:[82,65], kn:[68,63], an:[52,66], kf:[68,62], af:[52,64],
        el:[64,53], ha:[53,53], ef:[64,52], hf:[53,52] },
    ],
  },
  rowMachineSteady: {
    props: [{ t:"bar", y:76, x1:14, x2:112 }, { t:"band", from:[22,52], to:"ha" }],
    frames: [
      { hd:[49,41], nk:[54,48], hp:[66,67], kn:[52,62], an:[37,67], kf:[52,61], af:[37,65],
        el:[44,49], ha:[33,50], ef:[44,49], hf:[33,48] },
      { hd:[66,41], nk:[72,46], hp:[82,65], kn:[68,63], an:[52,66], kf:[68,62], af:[52,64],
        el:[64,53], ha:[53,53], ef:[64,52], hf:[53,52] },
    ],
  },
  battleRopes: {
    props: [GROUND, { t:"rope", at:"ha" }, { t:"rope", at:"hf" }],
    frames: [
      { hd:[53,24], nk:[52,32], hp:[48,54], kn:[49,68], an:[48,85], kf:[50,68], af:[50,85],
        el:[62,34], ha:[72,29], ef:[60,39], hf:[70,43] },
      { hd:[53,24], nk:[52,32], hp:[48,54], kn:[49,68], an:[48,85], kf:[50,68], af:[50,85],
        el:[60,39], ha:[70,43], ef:[62,34], hf:[72,29] },
    ],
  },

  /* ── Warm-up ────────────────────────────────────────────────────────── */
  armLegSwings: {
    props: [GROUND],
    frames: [
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[65,53], an:[78,64], kf:[50,61], af:[50,78],
        el:[44,32], ha:[34,36], ef:[61,20], hf:[72,17] },
      { hd:[52,17], nk:[52,25], hp:[52,47], kn:[40,55], an:[30,68], kf:[50,61], af:[50,78],
        el:[61,20], ha:[72,17], ef:[44,32], hf:[34,36] },
    ],
  },
  hipRotations: {
    props: [GROUND],
    frames: [
      { hd:[50,38], nk:[50,46], hp:[50,68], kn:[64,67], an:[70,82], kf:[36,67], af:[21,60],
        el:[58,53], ha:[68,57], ef:[58,53], hf:[68,58] },
      { hd:[50,38], nk:[50,46], hp:[50,68], kn:[36,67], an:[30,82], kf:[64,67], af:[79,60],
        el:[42,53], ha:[32,57], ef:[42,52], hf:[31,55] },
    ],
  },
  neckShoulderRolls: {
    props: [GROUND],
    frames: [
      { hd:[52,18], nk:[52,26], hp:[52,48], kn:[51,62], an:[52,79], kf:[53,62], af:[52,79],
        el:[47,35], ha:[49,46], ef:[57,35], hf:[55,46] },
      { hd:[48,21], nk:[51,28], hp:[51,50], kn:[50,64], an:[51,81], kf:[52,64], af:[51,81],
        el:[45,37], ha:[47,47], ef:[57,37], hf:[55,47] },
    ],
  },

  /* ── Cooldown & mobility ────────────────────────────────────────────── */
  childsPose: {
    props: [GROUND],
    frames: [
      { hd:[22,71], nk:[30,68], hp:[51,60], kn:[58,73], an:[74,74], kf:[57,74], af:[73,76],
        el:[20,70], ha:[9,70], ef:[20,69], hf:[9,68] },
    ],
  },
  hamstringStretch: {
    props: [GROUND],
    frames: [
      { hd:[36,38], nk:[36,46], hp:[36,68], kn:[50,69], an:[67,71], kf:[47,77], af:[62,84],
        el:[43,53], ha:[53,58], ef:[43,54], hf:[53,59] },
      { hd:[51,49], nk:[44,52], hp:[34,71], kn:[48,70], an:[65,71], kf:[46,79], af:[62,84],
        el:[54,56], ha:[65,58], ef:[54,56], hf:[64,59] },
    ],
  },
  hip9090Stretch: {
    props: [GROUND],
    frames: [
      { hd:[50,38], nk:[50,46], hp:[50,68], kn:[64,67], an:[70,82], kf:[36,67], af:[21,60],
        el:[58,53], ha:[68,57], ef:[58,53], hf:[68,58] },
      { hd:[62,45], nk:[56,50], hp:[49,71], kn:[63,68], an:[71,82], kf:[35,71], af:[19,66],
        el:[65,55], ha:[76,58], ef:[65,56], hf:[75,59] },
    ],
  },
  boxBreathing: {
    props: [GROUND],
    frames: [
      { hd:[52,30], nk:[52,38], hp:[52,60], kn:[66,60], an:[50,61], kf:[66,61], af:[50,64],
        el:[57,47], ha:[68,51], ef:[57,47], hf:[67,52] },
    ],
  },
};

/** Does this exercise have a diagram? Not all do — see the note in
 *  ExerciseFigure about degrading to cue-only rather than drawing a
 *  placeholder. */
export function hasFigure(id) {
  return Boolean(EX_FIGURES[id]);
}
