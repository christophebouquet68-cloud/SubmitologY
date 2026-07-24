import { useState, useMemo } from "react";
import { LANGUAGES, T, t } from "./i18n";

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                        📌 ADD NEW TECHNIQUES HERE                          ║
// ║  Technique names, descriptions, and keyPoints are in English.              ║
// ║  The UI language selection translates all navigation and labels.           ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

const SEED_TECHNIQUES = [
 {
  id: 1, name: "Closed guard", category: "Guards", difficulty: "Beginner",
  description: "The closed guard is the foundation of BJJ, where you wrap your legs around your opponent's waist to control them from the bottom. It limits their movement and gives you a platform to attack with sweeps and submissions. Mastering closed guard is essential before progressing to open guard variations.",
  image: "/images/bjj_guard_closed.jpg?w=600&q=80",
  youtube: "https://youtu.be/z8B5Vj0_eHY?si=9hs9gmSh_1M0KeCB",
  keyPoints: ["Keep your hips high and active to break posture", "Control one or both sleeves to limit opponent's arms", "Always look to attack — don't just hold"],
  },
  {
  id: 2, name: "Half guard", category: "Guards", difficulty: "Beginner",
  description: "Half guard involves trapping one of the opponent's legs between yours while lying on your back or side. It is a defensive and offensive position that bridges closed and open guard. It offers strong sweeping opportunities and a pathway to back takes.",
  image: "/images/bjj_guard_half.jpg?w=600&q=80",
  youtube: "https://youtu.be/O_L1i17qNG0?si=PB5lde5ItN-jLRbU",
  keyPoints: ["Secure the underhook on the trapped-leg side immediately", "Stay on your side — never lie flat on your back", "Use the knee shield to create distance and prevent the pass"],
  },
  {
  id: 3, name: "Open guard (basic)", category: "Guards", difficulty: "Beginner",
  description: "Open guard refers to any bottom guard position where the legs are not locked around the opponent. You use your feet on hips or biceps to manage distance and set up attacks. It requires active leg and hip movement to be effective.",
  image: "/images/bjj_guard_open.jpg?w=600&q=80",
  youtube: "https://youtube.com/shorts/zxDikDnddD4?feature=share",
  keyPoints: ["Keep your feet active on the opponent's hips or biceps", "Maintain grips on sleeves or pants to control posture", "Constantly transition — open guard is a movement game"],
  },
  {
  id: 4, name: "De La Riva guard", category: "Guards", difficulty: "Intermediate",
  description: "De La Riva guard uses a hook around the opponent's lead leg to destabilise their base and open attacks. It is a staple of modern competition BJJ and pairs well with berimbolo and back takes. Strong grips on the sleeve and collar are critical.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["DLR hook goes around the outside of the lead leg", "Use the far sleeve grip to break posture and set sweeps", "Combine with the collar grip for the basic sweep"],
  },
  {
  id: 5, name: "Spider guard", category: "Guards", difficulty: "Intermediate",
  description: "Spider guard uses lasso-style sleeve grips with feet on the biceps to control and extend the opponent. It is highly effective in the gi and creates angles for sweeps, triangles, and omoplatas. Grip maintenance and hip mobility are the key challenges.",
  image: "/images/bjj_guard_spider.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Push one arm straight and pull the other to create rotation", "Keep hips off the mat to generate force", "Transition to triangle or omoplata when the opponent tries to stack"],
  },
  {
  id: 6, name: "X-guard", category: "Guards", difficulty: "Advanced",
  description: "X-guard is a highly offensive sweep position where you sit under your opponent and trap both legs in an X-shaped configuration. It provides tremendous leverage to off-balance even larger opponents. Getting into X-guard requires timing from half guard or a guard pull.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Enter from half guard by shrimping under and getting the underhook", "Control the far heel with the top arm to prevent escape", "Extend your hips explosively to complete the sweep"],
  },
  {
  id: 7, name: "Berimbolo", category: "Guards", difficulty: "Advanced",
  description: "The berimbolo is an inverted De La Riva technique used to take the back or score advantages in competition. It involves a rolling inversion that catches the opponent off guard. Requires excellent hip flexibility and a strong DLR foundation.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Start from deep DLR with a strong belt or pants grip", "Invert underneath the opponent towards their back", "Drive your top leg past their hip to secure back position"],
  },
  {
  id: 8, name: "Armbar from guard", category: "Submissions", difficulty: "Beginner",
  description: "The armbar from closed guard is one of the first submissions taught in BJJ, attacking the elbow joint by hyperextending the arm. It teaches the fundamental concepts of breaking posture, controlling the arm, and hip movement. Finishing requires precise hip placement and leg control.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Break the opponent's posture before attempting the armbar", "Control the wrist with both hands and pinch your knees tight", "Thrust your hips up sharply — don't just pull the arm down"],
  },
  {
  id: 9, name: "Rear naked choke", category: "Submissions", difficulty: "Beginner",
  description: "The rear naked choke (RNC) is applied from back control and is one of the highest-percentage finishes in all of grappling. It targets the carotid arteries to cut off blood to the brain. Getting the seatbelt grip and hooks in is a prerequisite.",
  image: "/images/bjj_sub_rnc.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Secure the seatbelt (over-under grip) before inserting hooks", "Get your choking arm under the chin — never on the chin", "Use your free hand to push the head into the choke"],
  },
  {
  id: 10, name: "Triangle choke", category: "Submissions", difficulty: "Beginner",
  description: "The triangle choke uses your legs to create a figure-four around the opponent's neck and one arm, cutting off blood flow. It can be set up from closed guard, mount, or back control. Hip angle and leg positioning are critical for a tight finish.",
  image: "/images/bjj_sub_triangle.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Pull the opponent's arm across your centre line before shooting the triangle", "Angle your hips 45 degrees to the side of the trapped arm", "Lock your shin across the back of the neck and squeeze your knees"],
  },
  {
  id: 11, name: "Kimura", category: "Submissions", difficulty: "Beginner",
  description: "The kimura is a double-wrist lock attacking the shoulder joint. It can be applied from half guard, side control, north-south, or closed guard. Named after Masahiko Kimura, who used it to defeat Hélio Gracie in 1951.",
  image: "/images/bjj_sub_kimura.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Secure the figure-four grip before breaking posture", "Keep the elbow above the wrist at all times", "Rotate the arm behind the back — not just upward"],
  },
  {
  id: 12, name: "Guillotine choke", category: "Submissions", difficulty: "Beginner",
  description: "The guillotine is a front headlock choke applied when the opponent shoots for a takedown or ducks their head. There are arm-in and arm-out variants; the arm-in version also compresses the trachea. One of the most common submissions in all of grappling.",
  image: "/images/bjj_sub_guillotine.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Lock the figure-four under the chin — not the face", "Pull up and squeeze with the forearm across the throat", "Guard pull finish: close guard and arch back to increase pressure"],
  },
  {
  id: 13, name: "Omoplata", category: "Submissions", difficulty: "Intermediate",
  description: "The omoplata uses your legs to trap and rotate the opponent's shoulder from the guard. It doubles as a sweep when the opponent rolls to escape. A high-level tool that requires excellent hip flexibility.",
  image: "/images/bjj_sub_omoplata.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Secure the figure-four with your legs before rotating", "Sit up to prevent the opponent from rolling", "Lean forward and apply shoulder pressure to finish"],
  },
  {
  id: 14, name: "Americana (keylock)", category: "Submissions", difficulty: "Beginner",
  description: "The americana is a shoulder lock applied from top positions — mount, side control — by bending the opponent's arm into an L-shape and rotating it. One of the first submissions taught at white belt. Low-risk entry with a reliable finish.",
  image: "/images/bjj_sub_americana.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Pin the wrist to the mat before engaging the elbow", "Keep your own elbows tight — don't let your frame collapse", "Move the arm like a windshield wiper toward their hip"],
  },
  {
  id: 15, name: "Bow and arrow choke", category: "Submissions", difficulty: "Intermediate",
  description: "The bow and arrow is a powerful gi choke applied from back control. You grip the collar with one hand and a leg or pants with the other, then extend your body to apply crushing pressure. Considered one of the most powerful gi submissions.",
  image: "/images/bjj_sub_bowarrow.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Secure a deep collar grip before transitioning", "Control the opposite leg or pants to prevent the turn", "Extend and arch — think of drawing a bow"],
  },
  {
  id: 16, name: "Heel hook", category: "Submissions", difficulty: "Advanced",
  description: "The heel hook is the most devastating leg lock in the modern game. It rotates the knee joint beyond its limits by levering the heel. Banned in many beginner competitions — learn structure and defence before attempting.",
  image: "/images/bjj_sub_heelhook.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Understand the 'reap' position before drilling", "Control the hip and knee before rotating", "Tap early — knee damage from heel hooks is silent and severe"],
  },
  {
  id: 17, name: "Toe hold", category: "Submissions", difficulty: "Intermediate",
  description: "The toe hold attacks the ankle and knee by gripping the foot and rotating it. Applied from top leg-lock positions. Legal at brown and black belt in many gi rulesets. Requires control of the hip to prevent escape.",
  image: "/images/bjj_sub_toehold.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Figure-four grip on the foot — palm facing you", "Keep the hip controlled to prevent the opponent from turning", "Rotate the foot as if turning a steering wheel"],
  },
  {
  id: 18, name: "Guard pass to side control", category: "Transitions", difficulty: "Beginner",
  description: "Transitioning from inside the guard to dominant side control is the most fundamental positional improvement in BJJ. Master the toreando and knee-slice as your bread-and-butter passes.",
  image: "/images/bjj_trans_passtoside.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Control hips before moving", "Keep pressure throughout the pass", "Establish cross-face immediately upon landing"],
  },
  {
  id: 19, name: "Mount to back take", category: "Transitions", difficulty: "Intermediate",
  description: "When the opponent turns to escape mount, you flow to their back. Recognising this reactive window separates good grapplers from great ones.",
  image: "/images/bjj_trans_mounttoback.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Anticipate the bridge-and-roll escape", "Chest stays glued to their back during the transition", "Insert hooks immediately before the opponent can react"],
  },
  {
  id: 20, name: "Knee on belly", category: "Transitions", difficulty: "Beginner",
  description: "Knee on belly is a pressure position between side control and mount. It scores points in competition and creates discomfort that forces reactions, opening submissions and transitions.",
  image: "/images/bjj_trans_kneeonbelly.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Drive the knee into the solar plexus — not the ribs", "Post your far foot out wide for base", "Flow immediately to mount or back when they push the knee"],
  },
  {
  id: 21, name: "Back control (back take)", category: "Transitions", difficulty: "Beginner",
  description: "Back control is the highest-value position in BJJ — you have full visibility, they have none. Establishing hooks and the seatbelt is the foundation for the rear naked choke.",
  image: "/images/bjj_trans_back.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Seatbelt grip first, then insert hooks", "Keep your hips connected — don't let them flatten you", "Control the hand fighting to prevent choke defence"],
  },
  {
  id: 22, name: "Turtle position", category: "Transitions", difficulty: "Beginner",
  description: "A defensive position with all fours on the floor. May be an intermediate step to recovery in certain difficult situations, or to avoid other controls by the opponent. However, it opens the opportunity for the opponent to attack the back.",
  image: "/images/bjj_trans_turtle.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Defensive — useful to stabilise", "Creates opportunity to recover guard", "High risk of back-take if you stay too long"],
  },
  {
  id: 23, name: "Double leg takedown", category: "Takedowns", difficulty: "Beginner",
  description: "The cornerstone of wrestling-based takedowns. Shoot low, drive through, finish to side or top. Combining a level change with explosive penetration step is key.",
  image: "/images/bjj_throw_doubleleg.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Level change first — don't just bend forward", "Drive your knee to the mat on the penetration step", "Head outside, lift and turn to finish"],
  },
  {
  id: 24, name: "Seoi nage (shoulder throw)", category: "Takedowns", difficulty: "Intermediate",
  description: "A classic judo shoulder throw that translates beautifully to BJJ. Entry requires breaking the opponent's balance forward, then loading them across your back.",
  image: "/images/bjj_throw_seoinage.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Break posture forward first with kuzushi", "Elbow drives under the armpit to load the throw", "Explosive hip rotation — not arm strength"],
  },
  {
  id: 25, name: "Tomoe nage (sacrifice throw)", category: "Takedowns", difficulty: "Intermediate",
  description: "A sacrifice throw where you fall backward and use your foot on the opponent's hip to launch them overhead. High-risk, high-reward. Pairs well with guard pulling entries.",
  image: "/images/bjj_throw_tomoenage.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Fall straight back — don't step offline", "Foot placement on the lower abdomen generates height", "Maintain grips and follow into guard as they land"],
  },
  {
  id: 26, name: "Heel hook", category: "Dark BJJ", difficulty: "Advanced",
  description: "The heel hook in a dark BJJ context emphasises the dangers and ethical considerations of this technique. The rotation is silent — damage accumulates before the tap. Essential to study for defence.",
  image: "/images/bjj_sub_heelhook.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Understand the 'reap' position", "Control before rotating", "Tap early — damage is silent"],
  },
  {
  id: 27, name: "Neck crank (can opener)", category: "Dark BJJ", difficulty: "Intermediate",
  description: "The can opener attacks the cervical spine by posting the hands on the forehead and driving the head towards the mat. It is illegal in many competition formats but forces the guard to open. Understanding it helps you defend.",
  image: "/images/bjj_sub_neckcrank.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Often used to force an opponent to open closed guard", "Tuck your chin hard to your chest to reduce the pressure", "Counter with armbar entry as they stand"],
  },
  {
  id: 28, name: "Wrist lock", category: "Dark BJJ", difficulty: "Beginner",
  description: "The wrist lock attacks the wrist joint from almost any position. It is often overlooked and catches opponents completely off guard. Even a light application causes significant pain due to the small joint involved.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Most effective when the opponent's hand is flat or posted", "Apply slowly — the tap comes fast with wrist locks", "Set up when the opponent is focused on defending larger submissions"],
  },
  {
  id: 29, name: "Twister", category: "Dark BJJ", difficulty: "Intermediate",
  description: "The twister is a spinal rotation submission made famous by Eddie Bravo. Applied from a body triangle or hooks-in back position. Requires securing the twister hook and pulling the opponent's head in the opposite direction.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Secure the twister hook (leg across their hip) first", "Thread your arm behind the opponent's head from back position", "Pull head away from the spine rotation — two directions create the submission"],
  },
  {
  id: 30, name: "Electric chair", category: "Dark BJJ", difficulty: "Advanced",
  description: "The electric chair targets the groin, hip, and inner thigh from a modified half guard or deep half. A signature technique of the 10th Planet system. The finish requires pulling the opponent's leg across their own body.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Secure a deep underhook on the far leg from half guard", "Use your body like a lever — drive hips forward, pull leg back", "Control the near leg to prevent the opponent from posturing"],
  },
  // ▼▼▼ PASTE NEW TECHNIQUES BELOW THIS LINE ▼▼▼
  // ▲▲▲ END OF TECHNIQUE LIST ▲▲▲
];

const CATS  = ["All", "Guards", "Submissions", "Transitions", "Takedowns", "Dark BJJ"];
const DIFFS = ["All", "Beginner", "Intermediate", "Advanced"];
// Merchandise and Mental Health are promoted higher in the nav per brand refresh.
const NAV_KEYS = ["Overview", "Merchandise", "Concepts", "Techniques", "StrengthConditioning", "MentalHealth", "About"];
// The "Techniques" nav item now shows the interactive Technique Map by default.
// The original grid+filter+photo view is fully preserved as TechniquesLegacy —
// flip this to true (and see the routing in the root component) to restore it.
const SHOW_LEGACY_TECHNIQUES = false;

const CAT_COLORS  = { Guards: "#4cc9f0", Submissions: "#e85d04", Transitions: "#a29bfe", Takedowns: "#55efc4", "Dark BJJ": "#d63031" };
const DIFF_COLORS = { Beginner: "#2ecc71", Intermediate: "#f39c12", Advanced: "#e74c3c" };
const DEFAULT_IMAGE = "/images/bjj_underconstruction.jpg?w=600&q=80";

// ── Brand refresh: mental-health accent (clinical/neural teal) alongside the
// ── existing BJJ-energy orange. Used for the mission banner, Mental Health
// ── nav item, and donation callouts throughout the site.
const MH_ACCENT = "#8c7ae6";

// ── Launch collection — sourced from the Business Proposal §5.1 product range.
const MERCH_PRODUCTS = [
  { id: "gi", name: "BJJ Gi (Adult)", spec: "Pearl weave 350–450 GSM, IBJJF legal", price: "$120 – $160", icon: "🥋" },
  { id: "rg-ls", name: "Rashguard (Long Sleeve)", spec: "Poly-spandex sublimation, flatlock stitch", price: "$60 – $80", icon: "🧠" },
  { id: "rg-ss", name: "Rashguard (Short Sleeve)", spec: "Poly-spandex sublimation, flatlock stitch", price: "$55 – $75", icon: "🧠" },
  { id: "shorts", name: "No-Gi Shorts", spec: "Stretch ripstop, 4-way stretch", price: "$65 – $85", icon: "⚡" },
  { id: "spats", name: "Spats / Compression", spec: "Poly-spandex, full sublimation", price: "$60 – $75", icon: "⚡" },
  { id: "belt", name: "Belt", spec: "Cotton, custom woven label", price: "$25 – $35", icon: "🎗️" },
];

// ─── STRENGTH & CONDITIONING — pre-processed program engine ─────────────────
// Every (age × level × equipment) combination — 6 × 3 × 2 = 36 in total — is
// derived deterministically from the tables below. Nothing is fetched or
// generated at request time; only the one relevant program is ever rendered.
const AGE_RANGES = ["<20", "20-30", "30-40", "40-50", "50-60", ">60"];
const PROGRAM_TYPES = ["Calisthenics", "Equipment"];
const OLDER_BRACKETS = ["50-60", ">60"];

const CALISTHENICS_EX = {
  lower: ["bodyweightSquat", "bulgarianSplitSquat", "broadJump"],
  lowerOlder: ["bodyweightSquat", "stepUp", "wallSit"],
  upperPush: ["pushUp", "pikePushUp", "benchDip"],
  upperPull: ["towelRow", "supermanHold", "invertedRowChair"],
  core: ["plank", "deadBug", "sidePlank"],
  conditioning: ["burpee", "mountainClimber", "jumpingJack"],
  conditioningOlder: ["marchInPlace", "sitToStand", "stepTouch"],
};
const EQUIPMENT_EX = {
  lower: ["gobletSquat", "romanianDeadliftDB", "walkingLunge"],
  lowerOlder: ["gobletSquat", "romanianDeadliftDB", "dbStepUp"],
  upperPush: ["dbBenchPress", "dbOverheadPress", "tricepExtension"],
  upperPull: ["bentOverRow", "latPulldownOrPullup", "facePullBand"],
  core: ["weightedPlank", "palloffPress", "farmerCarry"],
  conditioning: ["kettlebellSwing", "rowMachineInterval", "battleRopes"],
  conditioningOlder: ["kettlebellSwingLight", "rowMachineSteady", "farmerCarryInterval"],
};
const WARMUP_EX = ["armLegSwings", "hipRotations", "neckShoulderRolls"];
const COOLDOWN_EX = ["childsPose", "hamstringStretch", "hip9090Stretch", "boxBreathing"];

const STRENGTH_RX = { Beginner: "2 × 10", Intermediate: "3 × 12", Advanced: "4 × 15" };
const PULL_RX     = { Beginner: "2 × 8",  Intermediate: "3 × 10", Advanced: "4 × 12" };
const CORE_RX     = { Beginner: "2 × 20s", Intermediate: "3 × 30s", Advanced: "4 × 45s" };
const COND_RX        = { Beginner: "4 rounds · 20s on / 40s off", Intermediate: "5 rounds · 30s on / 30s off", Advanced: "6 rounds · 40s on / 20s off" };
const COND_RX_OLDER  = { Beginner: "3 rounds · 20s on / 50s off", Intermediate: "4 rounds · 25s on / 45s off", Advanced: "5 rounds · 30s on / 40s off" };
const REST_SEC     = { Beginner: 60, Intermediate: 45, Advanced: 30 };
const WARMUP_MIN   = { Beginner: 5,  Intermediate: 6,  Advanced: 7 };
const FREQ_BASE    = { Beginner: 2,  Intermediate: 3,  Advanced: 4 };

function buildSCProgram(age, level, type) {
  const older = OLDER_BRACKETS.includes(age);
  const pool  = type === "Calisthenics" ? CALISTHENICS_EX : EQUIPMENT_EX;
  return {
    frequency: older ? 2 : FREQ_BASE[level],
    restSec:   REST_SEC[level] + (older ? 15 : 0),
    warmup:    { items: WARMUP_EX, minutes: WARMUP_MIN[level] + (older ? 1 : 0) },
    blocks: [
      { key: "lower",       items: older ? pool.lowerOlder : pool.lower, rx: STRENGTH_RX[level] },
      { key: "upperPush",   items: pool.upperPush, rx: STRENGTH_RX[level] },
      { key: "upperPull",   items: pool.upperPull, rx: PULL_RX[level] },
      { key: "core",        items: pool.core, rx: CORE_RX[level] },
      { key: "conditioning",items: older ? pool.conditioningOlder : pool.conditioning, rx: older ? COND_RX_OLDER[level] : COND_RX[level] },
    ],
    cooldown:  { items: COOLDOWN_EX, minutes: 5 + (older ? 1 : 0) },
  };
}

// ─── TECHNIQUE MAP — data + force-directed layout ────────────────────────────
// Names/descriptions are English-only for now, consistent with SEED_TECHNIQUES.
const TECH_TYPE_COLOR = { position: "#4cc9f0", transition: "#e85d04", submission: "#d63031" };

const TECHMAP_NODES = {
  closedGuard:{name:"Closed Guard",type:"position",sub:"guard",hx:170,hy:190,desc:"Legs locked around the opponent's waist, controlling distance and setting up attacks from the bottom."},
  openGuard:{name:"Open Guard",type:"position",sub:"guard",hx:250,hy:140,desc:"A family of guards played with the legs unlocked, using feet, hooks or frames to control distance and off-balance the opponent."},
  halfGuard:{name:"Half Guard",type:"position",sub:"guard",hx:140,hy:270,desc:"One of the opponent's legs is trapped between yours, used to prevent a full pass while hunting sweeps and underhooks."},
  butterflyGuard:{name:"Butterfly Guard",type:"position",sub:"guard",hx:250,hy:250,desc:"Seated guard with both feet hooked inside the thighs of the opponent, generating lift for sweeps."},
  deLaRivaGuard:{name:"De La Riva Guard",type:"position",sub:"guard",hx:320,hy:180,desc:"One leg hooks around the outside of the opponent's lead leg, controlling their base from a distance."},
  xGuard:{name:"X-Guard",type:"position",sub:"guard",hx:320,hy:270,desc:"Positioned underneath the opponent with the legs crossed around one of their legs, a powerful sweeping platform."},
  mount:{name:"Mount",type:"position",sub:"dominant",hx:170,hy:470,desc:"Sitting astride the opponent's torso, one of the most dominant and highest-scoring control positions."},
  sideControl:{name:"Side Control",type:"position",sub:"dominant",hx:250,hy:510,desc:"Pinning the opponent perpendicular to their body from the side, controlling their hips and shoulders."},
  kneeOnBelly:{name:"Knee-on-Belly",type:"position",sub:"dominant",hx:140,hy:550,desc:"A mobile pin with one knee driven into the opponent's stomach, trading stability for freedom to attack."},
  backControl:{name:"Back Control",type:"position",sub:"dominant",hx:240,hy:590,desc:"Attached to the opponent's back with hooks or a body triangle — considered the most dominant position in BJJ."},
  northSouth:{name:"North-South",type:"position",sub:"dominant",hx:320,hy:540,desc:"Controlling from the opponent's head, facing the opposite direction, chest to chest."},
  toreandoPass:{name:"Toreando Pass",type:"transition",sub:"guardPass",hx:520,hy:110,desc:"A standing pass that sweeps the opponent's legs to one side like a bullfighter's cape, circling around them."},
  kneeCutPass:{name:"Knee Cut Pass",type:"transition",sub:"guardPass",hx:600,hy:80,desc:"Driving a knee across the opponent's leg to slice through to side control while controlling their far arm."},
  doubleUnderPass:{name:"Double Under Pass",type:"transition",sub:"guardPass",hx:600,hy:160,desc:"Both arms hook under the legs of the opponent to stack them and drive through to a dominant position."},
  legDrag:{name:"Leg Drag",type:"transition",sub:"guardPass",hx:680,hy:110,desc:"Pulling the opponent's leg across your body to take their hip out of the equation en route to the back."},
  scissorSweep:{name:"Scissor Sweep",type:"transition",sub:"sweep",hx:520,hy:250,desc:"A classic closed guard sweep using a scissoring leg motion to off-balance and roll the opponent over."},
  hipBumpSweep:{name:"Hip Bump Sweep",type:"transition",sub:"sweep",hx:600,hy:220,desc:"Sitting up from closed guard and driving the hips into the opponent to knock them backward."},
  butterflySweep:{name:"Butterfly Sweep",type:"transition",sub:"sweep",hx:680,hy:250,desc:"Using the butterfly hooks to elevate and off-balance the opponent to one side."},
  berimbolo:{name:"Berimbolo",type:"transition",sub:"sweep",hx:600,hy:300,desc:"An inverted rolling sweep from De La Riva guard that ends with taking the opponent's back."},
  xGuardSweep:{name:"X-Guard Sweep",type:"transition",sub:"sweep",hx:520,hy:320,desc:"Using the leg control of X-guard to off-balance and elevate the opponent onto their back."},
  mountEscape:{name:"Mount Escape (Upa)",type:"transition",sub:"escape",hx:780,hy:210,desc:"Bridging and rolling the opponent off from underneath mount to recover guard."},
  sideControlEscape:{name:"Side Control Escape",type:"transition",sub:"escape",hx:850,hy:170,desc:"Framing and shrimping to create space and recover guard from underneath side control."},
  backEscape:{name:"Back Escape",type:"transition",sub:"escape",hx:850,hy:250,desc:"Removing the opponent's hooks and turning into them to neutralise back control."},
  rearNakedChoke:{name:"Rear Naked Choke",type:"submission",sub:"choke",hx:520,hy:490,desc:"A blood choke applied from back control — the most common finish from that position."},
  guillotine:{name:"Guillotine",type:"submission",sub:"choke",hx:600,hy:460,desc:"A front headlock choke applied when the opponent's head is trapped under an arm, from guard or standing."},
  triangleChoke:{name:"Triangle Choke",type:"submission",sub:"choke",hx:680,hy:490,desc:"Locking the legs around the opponent's neck and one arm to cut off blood flow, usually from guard."},
  armTriangle:{name:"Arm Triangle",type:"submission",sub:"choke",hx:600,hy:540,desc:"Trapping one of the opponent's arms against their own neck using shoulder pressure, typically from side control."},
  crossCollarChoke:{name:"Cross Collar Choke",type:"submission",sub:"choke",hx:520,hy:570,desc:"Using crossed grips on the opponent's own collar to choke them, common from mount or guard."},
  bowAndArrowChoke:{name:"Bow and Arrow Choke",type:"submission",sub:"choke",hx:680,hy:570,desc:"A powerful collar choke from back control using the legs to pull the opponent into the choke."},
  armbar:{name:"Armbar",type:"submission",sub:"jointLock",hx:780,hy:440,desc:"Hyperextending the elbow by controlling the arm across the hips — from guard, mount, or side control."},
  kimura:{name:"Kimura",type:"submission",sub:"jointLock",hx:850,hy:480,desc:"A shoulder lock using a figure-four grip on the wrist and arm, attacking internal shoulder rotation."},
  americana:{name:"Americana",type:"submission",sub:"jointLock",hx:850,hy:550,desc:"A shoulder lock attacking external rotation, typically applied from side control or mount."},
  omoplata:{name:"Omoplata",type:"submission",sub:"jointLock",hx:780,hy:590,desc:"A shoulder lock using the legs to trap the arm, applied from guard without using the hands."},
  straightAnkleLock:{name:"Straight Ankle Lock",type:"submission",sub:"jointLock",hx:850,hy:620,desc:"Hyperextending the ankle by trapping the foot and applying pressure with the hips or arm."},
};

const TECHMAP_EDGES = [
  ["closedGuard","scissorSweep"],["closedGuard","hipBumpSweep"],["closedGuard","triangleChoke"],
  ["closedGuard","armbar"],["closedGuard","omoplata"],["closedGuard","crossCollarChoke"],["closedGuard","guillotine"],
  ["openGuard","deLaRivaGuard"],["openGuard","butterflyGuard"],["openGuard","xGuard"],
  ["openGuard","toreandoPass"],["openGuard","legDrag"],
  ["halfGuard","kimura"],["halfGuard","backControl"],["halfGuard","kneeCutPass"],["halfGuard","backEscape"],
  ["butterflyGuard","butterflySweep"],["butterflyGuard","xGuard"],
  ["deLaRivaGuard","berimbolo"],["xGuard","xGuardSweep"],
  ["scissorSweep","mount"],["hipBumpSweep","mount"],["butterflySweep","mount"],["butterflySweep","backControl"],
  ["berimbolo","backControl"],["xGuardSweep","mount"],["xGuardSweep","backControl"],
  ["toreandoPass","sideControl"],["toreandoPass","kneeOnBelly"],["kneeCutPass","sideControl"],["kneeCutPass","mount"],
  ["doubleUnderPass","mount"],["doubleUnderPass","sideControl"],["legDrag","backControl"],["legDrag","sideControl"],
  ["mount","armbar"],["mount","americana"],["mount","crossCollarChoke"],["mount","backControl"],["mount","kneeOnBelly"],["mount","mountEscape"],
  ["sideControl","kimura"],["sideControl","americana"],["sideControl","armTriangle"],["sideControl","kneeOnBelly"],
  ["sideControl","sideControlEscape"],
  ["kneeOnBelly","armbar"],["kneeOnBelly","crossCollarChoke"],
  ["backControl","rearNakedChoke"],["backControl","bowAndArrowChoke"],["backControl","armbar"],["backControl","backEscape"],
  ["northSouth","kimura"],["northSouth","armTriangle"],["northSouth","sideControl"],
  ["mountEscape","closedGuard"],["mountEscape","openGuard"],
  ["sideControlEscape","closedGuard"],["sideControlEscape","openGuard"],
  ["backEscape","openGuard"],
];

const TECHMAP_NEIGHBORS = {};
Object.keys(TECHMAP_NODES).forEach(id => { TECHMAP_NEIGHBORS[id] = []; });
TECHMAP_EDGES.forEach(([a, b]) => { TECHMAP_NEIGHBORS[a].push(b); TECHMAP_NEIGHBORS[b].push(a); });

// Layout is computed once at module load (pure function of static data above),
// not on every render — this is the "pre-processed" approach used elsewhere on
// the site (e.g. the S&C program builder).
function computeTechMapLayout() {
  const ids = Object.keys(TECHMAP_NODES);
  const pos = {};
  ids.forEach(id => {
    const n = TECHMAP_NODES[id];
    pos[id] = { x: n.hx + (Math.random() - 0.5) * 20, y: n.hy + (Math.random() - 0.5) * 20, vx: 0, vy: 0 };
  });
  const REPULSE_K = 6000, SPRING_K = 0.03, REST_LEN = 85, HOME_K = 0.015, DAMPING = 0.85, ITER = 300;
  for (let iter = 0; iter < ITER; iter++) {
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = pos[ids[i]], b = pos[ids[j]];
        const dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy + 0.01, d = Math.sqrt(d2);
        const f = REPULSE_K / d2, fx = (f * dx) / d, fy = (f * dy) / d;
        a.vx -= fx; a.vy -= fy; b.vx += fx; b.vy += fy;
      }
    }
    TECHMAP_EDGES.forEach(([a, b]) => {
      const na = pos[a], nb = pos[b];
      const dx = nb.x - na.x, dy = nb.y - na.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
      const diff = d - REST_LEN, fx = SPRING_K * diff * (dx / d), fy = SPRING_K * diff * (dy / d);
      na.vx += fx; na.vy += fy; nb.vx -= fx; nb.vy -= fy;
    });
    ids.forEach(id => {
      const n = TECHMAP_NODES[id], p = pos[id];
      p.vx += (n.hx - p.x) * HOME_K; p.vy += (n.hy - p.y) * HOME_K;
      p.vx *= DAMPING; p.vy *= DAMPING;
      p.x += p.vx; p.y += p.vy;
    });
  }
  return pos;
}
const TECHMAP_LAYOUT = computeTechMapLayout();

// Derived stats — computed from the technique map data itself, not hardcoded,
// so the category grid always matches whatever is actually in the map.
const TECHMAP_SUBCATS = [...new Set(Object.values(TECHMAP_NODES).map(n => n.sub))];
const TECHMAP_SUBCAT_TYPE = {};
const TECHMAP_SUBCAT_COUNT = {};
Object.values(TECHMAP_NODES).forEach(n => {
  TECHMAP_SUBCAT_TYPE[n.sub] = n.type;
  TECHMAP_SUBCAT_COUNT[n.sub] = (TECHMAP_SUBCAT_COUNT[n.sub] || 0) + 1;
});

// ─── LANGUAGE SELECTOR ────────────────────────────────────────────────────────
function LangSelector({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === lang);
  return (
    <div style={{ position: "relative", marginLeft: 12 }}>
      <button
        onClick={() => setOpen(o => !o)}
        title="Select language"
        style={{ background: "none", border: "1px solid #332a3a", borderRadius: 6, cursor: "pointer", padding: "4px 9px", display: "flex", alignItems: "center", gap: 5, fontSize: 16, color: "#ede8df", lineHeight: 1 }}
      >
        <span>{current.flag}</span>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: "#666", letterSpacing: "0.05em" }}>▾</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "#17121b", border: "1px solid #332a3a", borderRadius: 8, overflow: "hidden", zIndex: 200, minWidth: 150, boxShadow: "0 8px 24px rgba(0,0,0,0.6)" }}>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", background: l.code === lang ? "#241c2a" : "none", border: "none", color: l.code === lang ? "#ede8df" : "#888", fontSize: 13, fontFamily: "monospace", padding: "9px 14px", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 18 }}>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function SubmitologY() {
  const [page, setPage]         = useState("Overview");
  const [techniques]            = useState(SEED_TECHNIQUES);
  const [cat, setCat]           = useState("All");
  const [diff, setDiff]         = useState("All");
  const [selected, setSelected] = useState(null);
  const [lang, setLang]         = useState("en");

  const filtered = techniques.filter(p =>
    (cat  === "All" || p.category   === cat) &&
    (diff === "All" || p.difficulty === diff)
  );

  const navLabel = (key) => ({
    Overview: t(T.nav.overview, lang), Concepts: t(T.nav.concepts, lang),
    Techniques: t(T.nav.techniques, lang), About: t(T.nav.about, lang),
    Merchandise: t(T.nav.merchandise, lang), MentalHealth: t(T.nav.mentalHealth, lang),
    StrengthConditioning: t(T.nav.strength, lang),
  }[key]);

  return (
    <div style={S.root}>
      <SynapticField />
      <nav style={S.nav}>
        <div style={S.navBrand} onClick={() => setPage("Overview")}>
          <span style={S.navLogo}>⬡</span>
          <span style={S.navTitle}>SubmitologY</span>
        </div>
        <div style={S.navLinks}>
          {NAV_KEYS.map(n => (
            <button key={n} onClick={() => setPage(n)}
              style={{ ...S.navBtn, ...(page === n ? S.navActive : {}) }}>
              {navLabel(n)}
            </button>
          ))}
          <LangSelector lang={lang} setLang={setLang} />
          <button onClick={() => setPage("WhatsNew")}
            style={{ ...S.navBtn, ...S.navWhatsNew, ...(page === "WhatsNew" ? S.navWhatsNewActive : {}) }}>
            <span style={S.navWhatsNewDot} />
            {t(T.nav.whatsNew, lang)}
          </button>
        </div>
      </nav>

      <button style={S.banner} onClick={() => setPage("MentalHealth")}>
        <span style={S.bannerDot} />
        <span style={S.bannerText}>{t(T.banner.text, lang)}</span>
        <span style={S.bannerCta}>{t(T.banner.cta, lang)}</span>
      </button>

      <main style={S.main}>
        {page === "Overview"   && <Overview   goTo={setPage} lang={lang} />}
        {page === "Concepts"   && <Concepts   lang={lang} />}
        {page === "Techniques" && (SHOW_LEGACY_TECHNIQUES
          ? <TechniquesLegacy filtered={filtered} cat={cat} setCat={setCat} diff={diff} setDiff={setDiff} onSelect={setSelected} lang={lang} />
          : <TechniqueMap lang={lang} />)}
        {page === "StrengthConditioning" && <StrengthConditioning lang={lang} />}
        {page === "About"      && <About      goTo={setPage} lang={lang} />}
        {page === "Merchandise"&& <Merchandise lang={lang} />}
        {page === "MentalHealth" && <MentalHealth lang={lang} />}
        {page === "WhatsNew" && <WhatsNew lang={lang} />}
      </main>

      {selected  && <Modal       pos={selected} onClose={() => setSelected(null)} lang={lang} />}
    </div>
  );
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────
function Overview({ goTo, lang }) {
  return (
    <div style={S.overviewWrap}>
      <div style={S.hero}>
        <div style={S.heroTag}>{t(T.overview.tag, lang)}</div>
        <h1 style={S.heroTitle}>{t(T.overview.titleLine1, lang)}<br /><span style={S.heroAccent}>{t(T.overview.titleLine2, lang)}</span></h1>
        <p style={S.heroBody}>{t(T.overview.body1, lang)}</p>
        <div style={S.heroCtas}>
          <button style={S.ctaPrimary}   onClick={() => goTo("Merchandise")}>{t(T.overview.merchCta, lang)}</button>
          <button style={S.ctaSecondary} onClick={() => goTo("Concepts")}>{t(T.overview.conceptsCta, lang)}</button>
          <button style={S.ctaSecondary} onClick={() => goTo("Techniques")}>{t(T.overview.exploreCta, lang)}</button>
          <button style={S.ctaSecondary} onClick={() => goTo("StrengthConditioning")}>{t(T.overview.scCta, lang)}</button>
          <button style={S.ctaMission}   onClick={() => goTo("MentalHealth")}>{t(T.overview.missionCta, lang)}</button>
        </div>
      </div>

      <div style={S.heroThesis}>
        <div style={S.heroThesisTextCol}>
          <p style={S.heroThesisText}>{t(T.overview.body2, lang)}</p>
        </div>
        <div style={S.heroThesisLogoCol}>
          <img src="/logo512.png" alt="SubmitologY logo" style={S.heroThesisLogo} />
          <p style={S.heroThesisLogoCaption}>{t(T.overview.logoCaption, lang)}</p>
        </div>
      </div>

      <div style={S.mapHighlight} onClick={() => goTo("Techniques")}>
        <div style={S.mapHighlightLeft}>
          <div style={S.mapHighlightTag}>{t(T.overview.mapTag, lang)}</div>
          <h3 style={S.mapHighlightTitle}>{t(T.overview.mapTitle, lang)}</h3>
          <p style={S.mapHighlightBody}>{t(T.overview.mapBody, lang)}</p>
        </div>
        <span style={S.mapHighlightCta}>{t(T.overview.mapCta, lang)}</span>
      </div>

      <div style={S.catGrid}>
        {TECHMAP_SUBCATS.map(sub => {
          const color = TECH_TYPE_COLOR[TECHMAP_SUBCAT_TYPE[sub]];
          return (
            <div key={sub} style={{ ...S.catCard, borderColor: color + "33" }}
              onClick={() => goTo("Techniques")}
              onMouseEnter={e => e.currentTarget.style.borderColor = color}
              onMouseLeave={e => e.currentTarget.style.borderColor = color + "33"}>
              <span style={{ ...S.catDot, background: color }} />
              <span style={S.catName}>{t(T.techmap.subcats[sub], lang)}</span>
              <span style={S.catCount}>{TECHMAP_SUBCAT_COUNT[sub]} {t(T.overview.techCount, lang)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── CONCEPTS ─────────────────────────────────────────────────────────────────
function Concepts({ lang }) {
  return (
    <div>
      <div style={S.pageHeader}>
        <h2 style={S.pageTitle}>{t(T.concepts.pageTitle, lang)}</h2>
        <p style={S.pageSubtitle}>{t(T.concepts.pageSubtitle, lang)}</p>
      </div>
      <div style={S.conceptGrid}>
        {T.conceptItems.map(c => (
          <div key={c.title.en} style={S.conceptCard}>
            <div style={S.conceptIcon}>{c.icon}</div>
            <h3 style={S.conceptTitle}>{t(c.title, lang)}</h3>
            <p style={S.conceptBody}>{t(c.body, lang)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TECHNIQUES ───────────────────────────────────────────────────────────────
// ─── TECHNIQUES (legacy grid+filter view — currently hidden, see SHOW_LEGACY_TECHNIQUES) ──
function TechniquesLegacy({ filtered, cat, setCat, diff, setDiff, onSelect, lang }) {
  const count = filtered.length;
  return (
    <div>
      <div style={S.filterBar}>
        <div style={S.filterGroup}>
          <span style={S.filterLabel}>{t(T.techniques.typeLabel, lang)}</span>
          <div style={S.pills}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{ ...S.pill, ...(cat === c ? { ...S.pillActive, borderColor: CAT_COLORS[c] || "#e85d04", color: CAT_COLORS[c] || "#e85d04" } : {}) }}>
                {t(T.cats[c], lang)}
              </button>
            ))}
          </div>
        </div>
        <div style={S.filterGroup}>
          <span style={S.filterLabel}>{t(T.techniques.levelLabel, lang)}</span>
          <div style={S.pills}>
            {DIFFS.map(d => (
              <button key={d} onClick={() => setDiff(d)}
                style={{ ...S.pill, ...(diff === d ? { ...S.pillActive, borderColor: DIFF_COLORS[d] || "#e85d04", color: DIFF_COLORS[d] || "#e85d04" } : {}) }}>
                {t(T.diffs[d], lang)}
              </button>
            ))}
          </div>
        </div>
        <div style={S.filterCount}>{count} {count !== 1 ? t(T.techniques.results, lang) : t(T.techniques.result, lang)}</div>
      </div>
      <div style={S.grid}>
        {filtered.length === 0
          ? <div style={S.empty}>{t(T.techniques.noResults, lang)}</div>
          : filtered.map(p => <Card key={p.id} pos={p} onSelect={onSelect} lang={lang} />)}
      </div>
    </div>
  );
}

function Card({ pos, onSelect, lang }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ ...S.card, ...(hov ? S.cardHov : {}) }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => onSelect(pos)}>
      <div style={S.cardImgWrap}>
        <img src={pos.image || DEFAULT_IMAGE} alt={pos.name} style={S.cardImg} />
        <div style={S.cardImgOverlay} />
        <span style={{ ...S.badge, background: DIFF_COLORS[pos.difficulty] || "#888" }}>{t(T.diffs[pos.difficulty], lang)}</span>
      </div>
      <div style={S.cardBody}>
        <span style={{ ...S.cardCat, color: CAT_COLORS[pos.category] || "#e85d04" }}>{t(T.cats[pos.category], lang)}</span>
        <h3 style={S.cardTitle}>{pos.name}</h3>
        <p style={S.cardDesc}>{pos.description.slice(0, 90)}…</p>
        <span style={S.cardCta}>{t(T.techniques.openCta, lang)}</span>
      </div>
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ pos, onClose, lang }) {
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <button style={S.closeBtn} onClick={onClose}>✕</button>
        <div style={S.modalImgWrap}>
          <img src={pos.image || DEFAULT_IMAGE} alt={pos.name} style={S.modalImg} />
          <div style={S.modalImgGrad} />
          <div style={S.modalImgMeta}>
            <span style={{ ...S.cardCat, color: CAT_COLORS[pos.category] || "#e85d04", fontSize: 10 }}>{t(T.cats[pos.category], lang)}</span>
            <h2 style={S.modalTitle}>{pos.name}</h2>
            <span style={{ ...S.badge, background: DIFF_COLORS[pos.difficulty] || "#888", position: "static" }}>{t(T.diffs[pos.difficulty], lang)}</span>
          </div>
        </div>
        <div style={S.modalBody}>
          <p style={S.modalDesc}>{pos.description}</p>
          {pos.keyPoints?.length > 0 && (
            <div style={S.kpBox}>
              <div style={S.kpHead}>{t(T.modal.keyPoints, lang)}</div>
              {pos.keyPoints.map((kp, i) => (
                <div key={i} style={S.kpRow}>
                  <span style={{ ...S.catDot, background: CAT_COLORS[pos.category] || "#e85d04" }} />
                  {kp}
                </div>
              ))}
            </div>
          )}
          {pos.youtube && (
            <a href={pos.youtube} target="_blank" rel="noopener noreferrer" style={S.ytBtn}>{t(T.modal.watchYT, lang)}</a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About({ goTo, lang }) {
  return (
    <div>
      <div style={S.pageHeader}>
        <h2 style={S.pageTitle}>{t(T.about.pageTitle, lang)}</h2>
      </div>
      <div style={S.aboutCard}>
        <p style={{ ...S.aboutBody, color: "#ede8df", fontWeight: 600, fontStyle: "italic" }}>{t(T.about.mission, lang)}</p>
        <div style={S.addDivider} />
        <p style={S.aboutBody}>{t(T.about.body1, lang)}</p>
        <p style={S.aboutBody}>{t(T.about.body2, lang)}</p>
        <div style={S.addDivider} />
        <h3 style={S.aboutSub}>{t(T.about.catsTitle, lang)}</h3>
        {["position", "transition", "submission"].map(ty => (
          <div key={ty} style={S.aboutCatRow}>
            <span style={{ ...S.catDot, background: TECH_TYPE_COLOR[ty], flexShrink: 0, marginTop: 3 }} />
            <div>
              <strong style={{ color: TECH_TYPE_COLOR[ty] }}>{t(T.techmap[`type${ty[0].toUpperCase()}${ty.slice(1)}`], lang)}</strong>
              <span style={{ color: "#777", marginLeft: 10, fontSize: 13 }}>{t(T.about.typeDescs[ty], lang)}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...S.aboutCard, marginTop: 18, background: "rgba(140,122,230,0.05)", borderColor: "rgba(140,122,230,0.2)" }}>
        <h3 style={{ ...S.aboutSub, color: MH_ACCENT }}>{t(T.about.linksTitle, lang)}</h3>
        <p style={S.aboutBody}>{t(T.about.linksBody, lang)}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={S.ctaPrimary} onClick={() => goTo("Merchandise")}>{t(T.about.shopLink, lang)}</button>
          <button style={S.ctaMission} onClick={() => goTo("MentalHealth")}>{t(T.about.missionLink, lang)}</button>
        </div>
      </div>

      <div style={S.invitationBox}>
        <span style={S.invitationTag}>{t(T.about.invitationTitle, lang)}</span>
        <p style={S.invitationText}>{t(T.about.invitation, lang)}</p>
      </div>
    </div>
  );
}

// ─── STRENGTH & CONDITIONING ──────────────────────────────────────────────────
function StrengthConditioning({ lang }) {
  const [age, setAge]   = useState(null);
  const [level, setLevel] = useState(null);
  const [type, setType] = useState(null);
  const [built, setBuilt] = useState(false);

  const complete = age && level && type;
  const program  = complete ? buildSCProgram(age, level, type) : null;

  const blockTitleKey = { lower: T.sc.lowerTitle, upperPush: T.sc.upperPushTitle, upperPull: T.sc.upperPullTitle, core: T.sc.coreTitle, conditioning: T.sc.conditioningTitle };

  const handleChange = (setter) => (v) => { setter(v); setBuilt(false); };

  return (
    <div>
      <div style={S.pageHeader}>
        <div style={S.merchTag}>{t(T.sc.pageTag, lang)}</div>
        <h2 style={S.pageTitle}>{t(T.sc.pageTitle, lang)}</h2>
        <p style={S.pageSubtitle}>{t(T.sc.pageSubtitle, lang)}</p>
      </div>

      {(!built || !complete) && (
        <div style={S.filterBar}>
          <div style={S.filterGroup}>
            <span style={S.filterLabel}>{t(T.sc.ageLabel, lang)}</span>
            <div style={S.pills}>
              {AGE_RANGES.map(a => (
                <button key={a} onClick={() => handleChange(setAge)(a)}
                  style={{ ...S.pill, ...(age === a ? { ...S.pillActive, borderColor: "#e85d04", color: "#e85d04" } : {}) }}>
                  {t(T.sc.ageOptions[a], lang)}
                </button>
              ))}
            </div>
          </div>
          <div style={S.filterGroup}>
            <span style={S.filterLabel}>{t(T.sc.levelLabel, lang)}</span>
            <div style={S.pills}>
              {DIFFS.slice(1).map(d => (
                <button key={d} onClick={() => handleChange(setLevel)(d)}
                  style={{ ...S.pill, ...(level === d ? { ...S.pillActive, borderColor: DIFF_COLORS[d], color: DIFF_COLORS[d] } : {}) }}>
                  {t(T.diffs[d], lang)}
                </button>
              ))}
            </div>
          </div>
          <div style={S.filterGroup}>
            <span style={S.filterLabel}>{t(T.sc.typeLabel, lang)}</span>
            <div style={S.pills}>
              {PROGRAM_TYPES.map(ty => (
                <button key={ty} onClick={() => handleChange(setType)(ty)}
                  style={{ ...S.pill, ...(type === ty ? { ...S.pillActive, borderColor: MH_ACCENT, color: MH_ACCENT } : {}) }}>
                  {t(T.sc.typeOptions[ty], lang)}
                </button>
              ))}
            </div>
          </div>
          <button
            disabled={!complete}
            onClick={() => setBuilt(true)}
            style={{ ...S.ctaPrimary, ...(complete ? {} : { opacity: 0.35, cursor: "not-allowed" }), marginTop: 4 }}>
            {t(T.sc.generateBtn, lang)}
          </button>
          {!complete && <p style={S.scIncomplete}>{t(T.sc.incomplete, lang)}</p>}
        </div>
      )}

      {built && complete && program && (
        <div>
          <div style={S.scResultHeader}>
            <div>
              <div style={S.merchTag}>{t(T.sc.resultTag, lang)}</div>
              <div style={S.scRecap}>
                {t(T.sc.ageOptions[age], lang)} · {t(T.diffs[level], lang)} · {t(T.sc.typeOptions[type], lang)}
              </div>
            </div>
            <button style={S.ctaSecondary} onClick={() => setBuilt(false)}>{t(T.sc.editBtn, lang)}</button>
          </div>

          <div style={S.scFreqBox}>
            <span style={S.scFreqNum}>{program.frequency}</span>
            <div>
              <div style={S.scFreqLbl}>{t(T.sc.frequencyLbl, lang)}</div>
              <div style={S.scFreqSub}>{program.frequency} {t(T.sc.perWeek, lang)} · {t(T.sc.restLbl, lang)} {program.restSec}s</div>
            </div>
          </div>

          <SCBlock title={t(T.sc.warmupTitle, lang)} rx={`${program.warmup.minutes} min`} items={program.warmup.items} lang={lang} />
          {program.blocks.map(b => (
            <SCBlock key={b.key} title={t(blockTitleKey[b.key], lang)} rx={b.rx} items={b.items} lang={lang} />
          ))}
          <SCBlock title={t(T.sc.cooldownTitle, lang)} rx={`${program.cooldown.minutes} min`} items={program.cooldown.items} lang={lang} />

          <div style={{ ...S.mhPlanNote, marginTop: 22 }}>
            <span style={{ ...S.bannerDot, marginTop: 5 }} />
            <div>
              <strong style={{ display: "block", marginBottom: 4, color: "#e3d9fb" }}>{t(T.sc.notesTitle, lang)}</strong>
              {t(T.sc.ageNotes[age], lang)}
            </div>
          </div>

          <p style={S.scDisclaimer}>{t(T.sc.disclaimer, lang)}</p>
        </div>
      )}
    </div>
  );
}

function SCBlock({ title, rx, items, lang }) {
  return (
    <div style={S.scBlock}>
      <div style={S.scBlockHead}>
        <h3 style={S.scBlockTitle}>{title}</h3>
        <span style={S.scBlockRx}>{rx}</span>
      </div>
      <ul style={S.scList}>
        {items.map(id => (
          <li key={id} style={S.scListItem}>
            <span style={S.scListDot} />
            {t(T.sc.ex[id], lang)}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── TECHNIQUE MAP ────────────────────────────────────────────────────────────
function TechniqueMap({ lang }) {
  const [selected, setSelected] = useState(null);
  const [activeTypes, setActiveTypes] = useState({ position: true, transition: true, submission: true });

  const ids = Object.keys(TECHMAP_NODES);

  const viewBox = useMemo(() => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    ids.forEach(id => {
      const p = TECHMAP_LAYOUT[id];
      minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
    });
    const PAD = 60;
    return `${minX - PAD} ${minY - PAD} ${(maxX - minX) + PAD * 2} ${(maxY - minY) + PAD * 2}`;
  }, [ids]);

  const zones = useMemo(() => {
    const z = {};
    ids.forEach(id => {
      const n = TECHMAP_NODES[id];
      if (!z[n.sub]) z[n.sub] = { sx: 0, sy: 0, c: 0 };
      z[n.sub].sx += n.hx; z[n.sub].sy += n.hy; z[n.sub].c += 1;
    });
    Object.keys(z).forEach(k => { z[k].x = z[k].sx / z[k].c; z[k].y = z[k].sy / z[k].c - 30; });
    return z;
  }, [ids]);

  const toggleType = (ty) => setActiveTypes(prev => ({ ...prev, [ty]: !prev[ty] }));

  const selNode = selected ? TECHMAP_NODES[selected] : null;
  const selNeighbors = selected ? TECHMAP_NEIGHBORS[selected] : [];

  return (
    <div>
      <div style={S.pageHeader}>
        <div style={S.merchTag}>{t(T.techmap.pageTag, lang)}</div>
        <h2 style={S.pageTitle}>{t(T.techmap.pageTitle, lang)}</h2>
        <p style={S.pageSubtitle}>{t(T.techmap.pageSubtitle, lang)}</p>
      </div>

      <div style={S.filterBar}>
        <div style={S.filterGroup}>
          <span style={S.filterLabel}>{t(T.techmap.filterLbl, lang)}</span>
          <div style={S.pills}>
            {["position", "transition", "submission"].map(ty => (
              <button key={ty} onClick={() => toggleType(ty)}
                style={{ ...S.pill, ...(activeTypes[ty] ? { ...S.pillActive, borderColor: TECH_TYPE_COLOR[ty], color: TECH_TYPE_COLOR[ty] } : {}) }}>
                {t(T.techmap[`type${ty[0].toUpperCase()}${ty.slice(1)}`], lang)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={S.techmapStage}>
        <div style={S.techmapGraphCard}>
          <svg viewBox={viewBox} style={S.techmapSvg}>
            {Object.keys(zones).map(sub => (
              <text key={sub} x={zones[sub].x} y={zones[sub].y} textAnchor="middle" style={S.techmapZoneLabel}>
                {t(T.techmap.subcats[sub], lang)}
              </text>
            ))}
            {TECHMAP_EDGES.map(([a, b], i) => {
              const na = TECHMAP_LAYOUT[a], nb = TECHMAP_LAYOUT[b];
              const dim = !activeTypes[TECHMAP_NODES[a].type] || !activeTypes[TECHMAP_NODES[b].type];
              const involved = selected && (a === selected || b === selected);
              return (
                <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  style={{
                    stroke: involved ? TECH_TYPE_COLOR[TECHMAP_NODES[selected].type] : "#3a3242",
                    strokeWidth: involved ? 2 : 1,
                    opacity: dim ? 0 : (selected ? (involved ? 1 : 0.3) : 1),
                    transition: "opacity 0.15s, stroke 0.15s",
                  }} />
              );
            })}
            {ids.map(id => {
              const n = TECHMAP_NODES[id];
              const p = TECHMAP_LAYOUT[id];
              const cx = p.x - n.hx, cy = p.y - n.hy;
              const mag = Math.hypot(cx, cy) || 1;
              const lx = p.x + (cx / mag) * 15, ly = p.y + (cy / mag) * 15;
              const anchor = cx >= 0 ? "start" : "end";
              const dim = !activeTypes[n.type] || (selected && id !== selected && !selNeighbors.includes(id));
              return (
                <g key={id} onClick={() => setSelected(id)} style={{ cursor: "pointer", opacity: dim ? 0.25 : 1, transition: "opacity 0.15s", display: activeTypes[n.type] ? "" : "none" }}>
                  <circle cx={p.x} cy={p.y} r={9} fill={TECH_TYPE_COLOR[n.type]} stroke="#0d0a0f" strokeWidth={2} />
                  <text x={lx} y={ly} textAnchor={anchor} style={S.techmapNodeLabel}>{n.name}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div style={S.techmapPanel}>
          {!selNode ? (
            <div style={S.techmapEmpty}>{t(T.techmap.emptyPanel, lang)}</div>
          ) : (
            <div>
              <div style={{ ...S.merchTag, color: TECH_TYPE_COLOR[selNode.type] }}>
                {t(T.techmap[`type${selNode.type[0].toUpperCase()}${selNode.type.slice(1)}`], lang)}
              </div>
              <h3 style={S.techmapPanelName}>{selNode.name}</h3>
              <div style={S.techmapBreadcrumb}>{t(T.techmap.subcats[selNode.sub], lang)}</div>
              <p style={S.techmapPanelDesc}>{selNode.desc}</p>
              <div style={S.filterLabel}>{t(T.techmap.connectsTo, lang)} ({selNeighbors.length})</div>
              <div style={{ marginTop: 8 }}>
                {selNeighbors.map(nid => (
                  <button key={nid} onClick={() => setSelected(nid)} style={S.techmapConnChip}>
                    <span style={{ ...S.techmapConnDot, background: TECH_TYPE_COLOR[TECHMAP_NODES[nid].type] }} />
                    {TECHMAP_NODES[nid].name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={S.techmapLegend}>
        {["position", "transition", "submission"].map(ty => (
          <div key={ty} style={S.techmapLegendItem}>
            <span style={{ ...S.techmapLegendDot, background: TECH_TYPE_COLOR[ty] }} />
            {t(T.techmap[`legend${ty[0].toUpperCase()}${ty.slice(1)}`], lang)}
          </div>
        ))}
      </div>
      <p style={S.mhSupportNote}>{t(T.techmap.footNote, lang)}</p>
    </div>
  );
}

// ─── WHAT'S NEW ───────────────────────────────────────────────────────────────
function WhatsNew({ lang }) {
  return (
    <div>
      <div style={S.pageHeader}>
        <div style={S.merchTag}>{t(T.whatsNew.pageTag, lang)}</div>
        <h2 style={S.pageTitle}>{t(T.whatsNew.pageTitle, lang)}</h2>
      </div>
      <div style={S.aboutCard}>
        <p style={{ ...S.aboutBody, color: "#ede8df", fontWeight: 600 }}>{t(T.whatsNew.message, lang)}</p>
      </div>
    </div>
  );
}

// ─── MERCHANDISE ──────────────────────────────────────────────────────────────
function Merchandise({ lang }) {
  return (
    <div>
      <div style={S.pageHeader}>
        <div style={S.merchTag}>{t(T.merch.pageTag, lang)}</div>
        <h2 style={S.pageTitle}>{t(T.merch.pageTitle, lang)}</h2>
        <p style={S.pageSubtitle}>{t(T.merch.pageSubtitle, lang)}</p>
      </div>

      <div style={S.merchGrid}>
        {MERCH_PRODUCTS.map(p => (
          <div key={p.id} style={S.merchCard}>
            <div style={S.merchCardTop}>
              <span style={S.merchIcon}>{p.icon}</span>
              <span style={S.merchSoon}>{t(T.merch.comingSoon, lang)}</span>
            </div>
            <h3 style={S.merchName}>{p.name}</h3>
            <p style={S.merchSpec}><span style={S.merchSpecLbl}>{t(T.merch.specLbl, lang)}</span> {p.spec}</p>
            <div style={S.merchPriceRow}>
              <span style={S.merchPriceLbl}>{t(T.merch.priceLbl, lang)}</span>
              <span style={S.merchPrice}>{p.price} SGD</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...S.merchNotifyCard }}>
        <span style={{ ...S.bannerDot, marginRight: 2 }} />
        <span style={S.merchNotifyText}>{t(T.merch.pageTag, lang)} — {t(T.merch.notify, lang)}</span>
      </div>

      <div style={S.pageHeader}>
        <h2 style={{ ...S.pageTitle, fontSize: 22 }}>{t(T.merch.pillarsTitle, lang)}</h2>
      </div>
      <div style={S.conceptGrid}>
        {T.merch.pillars.map((p, i) => (
          <div key={i} style={S.conceptCard}>
            <h3 style={S.conceptTitle}>{t(p.title, lang)}</h3>
            <p style={S.conceptBody}>{t(p.body, lang)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MENTAL HEALTH ────────────────────────────────────────────────────────────
function MentalHealth({ lang }) {
  return (
    <div>
      <div style={S.pageHeader}>
        <div style={{ ...S.merchTag, color: MH_ACCENT }}>{t(T.mh.pageTag, lang)}</div>
        <h2 style={S.pageTitle}>{t(T.mh.pageTitle, lang)}</h2>
        <div style={S.mhPlanNote}>
          <span style={{ ...S.bannerDot, marginTop: 5 }} />
          <span>{t(T.mh.planNote, lang)}</span>
        </div>
      </div>

      <div style={{ ...S.aboutCard, maxWidth: 760, borderColor: "rgba(140,122,230,0.25)" }}>
        <p style={S.aboutBody}>{t(T.mh.lead, lang)}</p>
        <p style={S.aboutBody}>{t(T.mh.lead2, lang)}</p>
      </div>

      <div style={{ ...S.mhDonateBox, marginTop: 22 }}>
        <span style={S.mhDonateNum}>1%</span>
        <div>
          <h3 style={S.mhDonateTitle}>{t(T.mh.donationTitle, lang)}</h3>
          <p style={S.mhDonateBody}>{t(T.mh.donationBody, lang)}</p>
        </div>
      </div>

      <div style={{ ...S.pageHeader, marginTop: 40 }}>
        <h2 style={{ ...S.pageTitle, fontSize: 22 }}>{t(T.mh.pillarsTitle, lang)}</h2>
      </div>
      <div style={S.conceptGrid}>
        {T.mh.pillars.map((p, i) => (
          <div key={i} style={{ ...S.conceptCard, borderColor: "rgba(140,122,230,0.15)" }}>
            <div style={S.conceptIcon}>{p.icon}</div>
            <h3 style={S.conceptTitle}>{t(p.title, lang)}</h3>
            <p style={S.conceptBody}>{t(p.body, lang)}</p>
          </div>
        ))}
      </div>

      <div style={{ ...S.pageHeader, marginTop: 40 }}>
        <h2 style={{ ...S.pageTitle, fontSize: 22 }}>{t(T.mh.designTitle, lang)}</h2>
      </div>
      <div style={S.aboutCard}>
        <p style={S.aboutBody}>{t(T.mh.designBody, lang)}</p>
      </div>

      <p style={S.mhSupportNote}>{t(T.mh.supportNote, lang)}</p>
    </div>
  );
}

// ─── SYNAPTIC BACKGROUND ────────────────────────────────────────────────────
// Low-opacity, inline-generated node-and-line pattern (no image file) that
// echoes the brand's own "neural network and synaptic patterns" design
// language sitewide, not just on the Mental Health page. Kept deliberately
// faint so it never competes with technique photography or long-form copy.
function SynapticField() {
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.05,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='net' width='150' height='150' patternUnits='userSpaceOnUse'%3E%3Cg fill='none' stroke='%238c7ae6' stroke-width='0.6'%3E%3Cline x1='18' y1='22' x2='72' y2='10'/%3E%3Cline x1='72' y1='10' x2='120' y2='46'/%3E%3Cline x1='18' y1='22' x2='42' y2='80'/%3E%3Cline x1='42' y1='80' x2='120' y2='46'/%3E%3Cline x1='42' y1='80' x2='96' y2='128'/%3E%3Cline x1='120' y1='46' x2='140' y2='110'/%3E%3C/g%3E%3Cg fill='%238c7ae6'%3E%3Ccircle cx='18' cy='22' r='1.8'/%3E%3Ccircle cx='72' cy='10' r='1.8'/%3E%3Ccircle cx='120' cy='46' r='1.8'/%3E%3Ccircle cx='42' cy='80' r='1.8'/%3E%3Ccircle cx='96' cy='128' r='1.8'/%3E%3Ccircle cx='140' cy='110' r='1.8'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23net)'/%3E%3C/svg%3E")` }} />;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  root: { minHeight: "100vh", background: "#120e16", color: "#ede8df", fontFamily: "'Georgia','Times New Roman',serif", position: "relative" },
  nav: { position: "sticky", top: 0, zIndex: 50, background: "rgba(18,14,22,0.94)", backdropFilter: "blur(12px)", borderBottom: "1px solid #241c2a", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 },
  navBrand: { display: "flex", alignItems: "center", gap: 9, cursor: "pointer", userSelect: "none" },
  navLogo: { fontSize: 19, color: "#e85d04" },
  navTitle: { fontSize: 15, fontWeight: 700, letterSpacing: "-0.4px" },
  navLinks: { display: "flex", gap: 2, alignItems: "center" },
  navBtn: { background: "none", border: "none", color: "#666", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.04em", padding: "5px 11px", borderRadius: 4, cursor: "pointer" },
  navActive: { color: "#e85d04" },
  navWhatsNew: { display: "flex", alignItems: "center", gap: 6, border: "1px solid #241c2a", borderRadius: 20, padding: "5px 12px", marginLeft: 6, color: "#888" },
  navWhatsNewActive: { color: "#ede8df", borderColor: "#332a3a" },
  navWhatsNewDot: { width: 6, height: 6, borderRadius: "50%", background: "#2ecc71", flexShrink: 0 },
  banner: { position: "relative", zIndex: 40, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "rgba(140,122,230,0.07)", borderBottom: "1px solid rgba(140,122,230,0.18)", color: "#e3d9fb", fontFamily: "monospace", fontSize: 11, letterSpacing: "0.02em", padding: "8px 16px", cursor: "pointer", textAlign: "center", flexWrap: "wrap" },
  bannerDot: { display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: MH_ACCENT, flexShrink: 0 },
  bannerText: { color: "#e3d9fb" },
  bannerCta: { color: MH_ACCENT, fontWeight: 700, marginLeft: 4 },
  main: { position: "relative", zIndex: 1, padding: "40px 32px 80px", maxWidth: 1100, margin: "0 auto" },
  overviewWrap: { display: "flex", flexDirection: "column", gap: 50 },
  hero: { paddingTop: 18 },
  heroTag: { fontFamily: "monospace", fontSize: 10, letterSpacing: "0.22em", color: "#555", textTransform: "uppercase", marginBottom: 12 },
  heroTitle: { fontSize: "clamp(36px, 7vw, 70px)", fontWeight: 700, lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-2px" },
  heroAccent: { color: "#e85d04", fontStyle: "italic" },
  heroBody: { maxWidth: 520, fontSize: 15, color: "#999", lineHeight: 1.85, margin: "0 0 26px" },
  heroCtas: { display: "flex", gap: 10, flexWrap: "wrap" },
  ctaPrimary: { background: "#e85d04", color: "#fff", border: "none", padding: "11px 24px", borderRadius: 4, fontSize: 12, fontFamily: "monospace", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em" },
  ctaSecondary: { background: "none", color: "#ede8df", border: "1px solid #332a3a", padding: "11px 24px", borderRadius: 4, fontSize: 12, fontFamily: "monospace", cursor: "pointer", letterSpacing: "0.05em" },
  ctaMission: { background: "none", color: MH_ACCENT, border: `1px solid ${MH_ACCENT}55`, padding: "11px 24px", borderRadius: 4, fontSize: 12, fontFamily: "monospace", cursor: "pointer", letterSpacing: "0.05em" },
  statRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, border: "1px solid #1c151f", borderRadius: 6, overflow: "hidden" },
  stat: { background: "#16121a", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 4 },
  statNum: { fontSize: 32, fontWeight: 700, color: "#e85d04", letterSpacing: "-1px" },
  statLabel: { fontSize: 10, color: "#555", fontFamily: "monospace", letterSpacing: "0.05em" },
  catGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 10 },
  mapHighlight: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", background: "rgba(232,93,4,0.06)", border: "1px solid rgba(232,93,4,0.25)", borderRadius: 10, padding: "20px 24px", margin: "22px 0", cursor: "pointer" },
  mapHighlightLeft: { flex: "1 1 380px" },
  mapHighlightTag: { fontFamily: "monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e85d04", fontWeight: 700, marginBottom: 8 },
  mapHighlightTitle: { fontSize: 19, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.3px" },
  mapHighlightBody: { fontSize: 13, color: "#bbb", lineHeight: 1.6, margin: 0, maxWidth: 520 },
  mapHighlightCta: { fontFamily: "monospace", fontSize: 13, color: "#e85d04", fontWeight: 700, whiteSpace: "nowrap" },
  catCard: { background: "#16121a", border: "1px solid transparent", borderRadius: 6, padding: "15px 13px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 7, transition: "border-color 0.2s" },
  catDot: { display: "inline-block", width: 7, height: 7, borderRadius: "50%" },
  catName: { fontSize: 13, fontWeight: 700 },
  catCount: { fontSize: 10, color: "#555", fontFamily: "monospace" },
  filterBar: { background: "#16121a", border: "1px solid #241c2a", borderRadius: 8, padding: "15px 18px", marginBottom: 22, display: "flex", flexDirection: "column", gap: 11 },
  filterGroup: { display: "flex", alignItems: "center", gap: 11, flexWrap: "wrap" },
  filterLabel: { fontFamily: "monospace", fontSize: 10, letterSpacing: "0.12em", color: "#555", textTransform: "uppercase", minWidth: 30 },
  pills: { display: "flex", gap: 5, flexWrap: "wrap" },
  pill: { background: "none", border: "1px solid #222", color: "#666", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontFamily: "monospace", cursor: "pointer", transition: "all 0.15s" },
  pillActive: { background: "rgba(232,93,4,0.07)" },
  filterCount: { fontFamily: "monospace", fontSize: 11, color: "#444", marginLeft: "auto" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(265px,1fr))", gap: 16 },
  empty: { gridColumn: "1/-1", textAlign: "center", color: "#444", padding: 60, fontFamily: "monospace" },
  card: { background: "#16121a", border: "1px solid #241c2a", borderRadius: 8, overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, border-color 0.2s" },
  cardHov: { transform: "translateY(-5px)", borderColor: "#332a3a" },
  cardImgWrap: { position: "relative", height: 180, overflow: "hidden" },
  cardImg: { width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(25%) contrast(1.1)", display: "block" },
  cardImgOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(17,17,17,.95) 0%,transparent 55%)" },
  badge: { position: "absolute", top: 9, right: 9, fontSize: 9, fontFamily: "monospace", fontWeight: 700, padding: "3px 8px", borderRadius: 20, color: "#000" },
  cardBody: { padding: "13px 15px 17px" },
  cardCat: { fontSize: 9, fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 },
  cardTitle: { fontSize: 17, margin: "4px 0 7px", fontWeight: 700, letterSpacing: "-0.3px" },
  cardDesc: { fontSize: 12, color: "#777", lineHeight: 1.6, margin: "0 0 9px" },
  cardCta: { fontSize: 11, color: "#e85d04", fontFamily: "monospace" },
  pageHeader: { marginBottom: 30 },
  pageTitle: { fontSize: 32, fontWeight: 700, letterSpacing: "-1px", margin: "0 0 8px" },
  pageSubtitle: { color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0 },
  conceptGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 13 },
  conceptCard: { background: "#16121a", border: "1px solid #241c2a", borderRadius: 8, padding: "20px" },
  conceptIcon: { fontSize: 24, marginBottom: 9 },
  conceptTitle: { fontSize: 14, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.2px" },
  conceptBody: { fontSize: 12, color: "#888", lineHeight: 1.7, margin: 0 },
  aboutCard: { background: "#16121a", border: "1px solid #241c2a", borderRadius: 8, padding: "26px 30px", maxWidth: 660 },
  merchTag: { fontFamily: "monospace", fontSize: 10, letterSpacing: "0.18em", color: "#e85d04", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 },
  merchGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14, marginBottom: 24 },
  merchCard: { background: "#16121a", border: "1px solid #241c2a", borderRadius: 8, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 8 },
  merchCardTop: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  merchIcon: { fontSize: 22 },
  merchSoon: { fontSize: 9, fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", border: "1px solid #2e2530", borderRadius: 20, padding: "3px 9px" },
  merchName: { fontSize: 16, fontWeight: 700, margin: "2px 0 0", letterSpacing: "-0.2px" },
  merchSpec: { fontSize: 12, color: "#888", lineHeight: 1.6, margin: 0 },
  merchSpecLbl: { fontFamily: "monospace", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: "#555", marginRight: 6 },
  merchPriceRow: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 4, paddingTop: 10, borderTop: "1px solid #241c2a" },
  merchPriceLbl: { fontFamily: "monospace", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: "#555" },
  merchPrice: { fontSize: 15, fontWeight: 700, color: "#e85d04" },
  merchNotifyCard: { display: "flex", alignItems: "center", gap: 10, background: "rgba(232,93,4,0.06)", border: "1px solid rgba(232,93,4,0.2)", borderRadius: 8, padding: "14px 18px", marginBottom: 36, fontSize: 13, color: "#ccc" },
  merchNotifyText: { fontFamily: "monospace", fontSize: 12 },
  mhDonateBox: { display: "flex", alignItems: "center", gap: 20, background: "rgba(140,122,230,0.06)", border: "1px solid rgba(140,122,230,0.25)", borderRadius: 8, padding: "22px 26px", maxWidth: 760 },
  mhDonateNum: { fontSize: 44, fontWeight: 700, color: MH_ACCENT, letterSpacing: "-1px", flexShrink: 0 },
  mhDonateTitle: { fontSize: 16, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.2px" },
  mhDonateBody: { fontSize: 13, color: "#aaa", lineHeight: 1.7, margin: 0 },
  mhSupportNote: { marginTop: 36, fontSize: 11, color: "#555", fontFamily: "monospace", lineHeight: 1.7, maxWidth: 620 },
  mhPlanNote: { display: "flex", alignItems: "flex-start", gap: 9, marginTop: 14, maxWidth: 640, background: "rgba(140,122,230,0.06)", border: "1px solid rgba(140,122,230,0.2)", borderRadius: 6, padding: "10px 14px", fontSize: 12, color: "#e3d9fb", fontFamily: "monospace", lineHeight: 1.6 },
  invitationBox: { marginTop: 28, maxWidth: 660, borderLeft: `2px solid #e85d04`, paddingLeft: 22 },
  heroThesis: { display: "flex", alignItems: "flex-start", gap: 28, margin: "24px 0 4px", maxWidth: 820, flexWrap: "wrap" },
  heroThesisTextCol: { flex: "1 1 420px", borderLeft: `2px solid ${MH_ACCENT}`, paddingLeft: 22 },
  heroThesisText: { fontSize: 16, color: "#ccc", lineHeight: 1.75, margin: 0, fontStyle: "italic", letterSpacing: "-0.1px" },
  heroThesisLogoCol: { flex: "0 0 260px", display: "flex", flexDirection: "row", alignItems: "center", gap: 14 },
  heroThesisLogo: { width: 88, height: 88, borderRadius: "50%", objectFit: "cover", border: "1px solid #332a3a", flexShrink: 0 },
  heroThesisLogoCaption: { fontSize: 11, color: "#777", fontStyle: "italic", lineHeight: 1.6, margin: 0, textAlign: "left", maxWidth: 150 },
  invitationTag: { display: "block", fontFamily: "monospace", fontSize: 10, letterSpacing: "0.18em", color: "#e85d04", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 },
  invitationText: { fontSize: 17, color: "#ede8df", lineHeight: 1.7, margin: 0, fontStyle: "italic", letterSpacing: "-0.1px" },
  scIncomplete: { fontSize: 12, color: "#666", fontFamily: "monospace", marginTop: 10, marginBottom: 0 },
  scResultHeader: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 14, flexWrap: "wrap", marginBottom: 18 },
  scRecap: { fontSize: 15, color: "#ede8df", fontWeight: 600 },
  scFreqBox: { display: "flex", alignItems: "center", gap: 18, background: "rgba(232,93,4,0.06)", border: "1px solid rgba(232,93,4,0.2)", borderRadius: 8, padding: "16px 20px", marginBottom: 22, maxWidth: 760 },
  scFreqNum: { fontSize: 34, fontWeight: 700, color: "#e85d04", letterSpacing: "-1px", flexShrink: 0 },
  scFreqLbl: { fontSize: 14, fontWeight: 700, marginBottom: 3 },
  scFreqSub: { fontSize: 12, color: "#888", fontFamily: "monospace" },
  scBlock: { background: "#16121a", border: "1px solid #241c2a", borderRadius: 8, padding: "16px 20px", marginBottom: 12, maxWidth: 760 },
  scBlockHead: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 6 },
  scBlockTitle: { fontSize: 14, fontWeight: 700, margin: 0, letterSpacing: "-0.1px" },
  scBlockRx: { fontFamily: "monospace", fontSize: 11, color: MH_ACCENT, background: "rgba(140,122,230,0.08)", border: "1px solid rgba(140,122,230,0.25)", borderRadius: 20, padding: "3px 10px" },
  scList: { margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 },
  scListItem: { fontSize: 13, color: "#ccc", display: "flex", alignItems: "center", gap: 8 },
  scListDot: { width: 4, height: 4, borderRadius: "50%", background: "#e85d04", flexShrink: 0 },
  scDisclaimer: { marginTop: 20, fontSize: 11, color: "#555", fontFamily: "monospace", lineHeight: 1.7, maxWidth: 640 },
  techmapStage: { display: "grid", gridTemplateColumns: "1fr 300px", gap: 16, alignItems: "start", marginTop: 4 },
  techmapGraphCard: { background: "#16121a", border: "1px solid #241c2a", borderRadius: 10, overflow: "auto", padding: 6 },
  techmapSvg: { display: "block", width: "100%", height: "auto", minWidth: 640 },
  techmapZoneLabel: { fontFamily: "monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", fill: "#3a3242" },
  techmapNodeLabel: { fontFamily: "monospace", fontSize: 10, fill: "#ccc" },
  techmapPanel: { background: "#16121a", border: "1px solid #241c2a", borderRadius: 10, padding: "18px 18px", position: "sticky", top: 20, minHeight: 320 },
  techmapEmpty: { color: "#444", fontFamily: "monospace", fontSize: 12, lineHeight: 1.7 },
  techmapPanelName: { fontSize: 18, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.3px" },
  techmapBreadcrumb: { fontFamily: "monospace", fontSize: 11, color: "#777", marginBottom: 12 },
  techmapPanelDesc: { fontSize: 13, color: "#ccc", lineHeight: 1.65, marginBottom: 16 },
  techmapConnChip: { display: "flex", alignItems: "center", width: "100%", textAlign: "left", fontFamily: "Georgia, serif", fontSize: 13, background: "#0d0a0f", border: "1px solid #241c2a", color: "#ddd", borderRadius: 6, padding: "8px 10px", marginBottom: 6, cursor: "pointer" },
  techmapConnDot: { display: "inline-block", width: 6, height: 6, borderRadius: "50%", marginRight: 8, flexShrink: 0 },
  techmapLegend: { display: "flex", gap: 20, flexWrap: "wrap", fontFamily: "monospace", fontSize: 11, color: "#777", marginTop: 18 },
  techmapLegendItem: { display: "flex", alignItems: "center", gap: 7 },
  techmapLegendDot: { width: 9, height: 9, borderRadius: "50%" },
  aboutBody: { fontSize: 14, color: "#999", lineHeight: 1.85, margin: "0 0 13px" },
  aboutSub: { fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em", color: "#555", textTransform: "uppercase", margin: "0 0 13px", fontWeight: 400 },
  aboutCatRow: { display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, fontSize: 13 },
  addDivider: { borderTop: "1px solid #241c2a", margin: "22px 0" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modal: { background: "#17121b", border: "1px solid #222", borderRadius: 12, width: "100%", maxWidth: 540, maxHeight: "92vh", overflowY: "auto", position: "relative" },
  closeBtn: { position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.5)", border: "1px solid #333", color: "#aaa", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", zIndex: 2, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" },
  modalImgWrap: { position: "relative", height: 220, borderRadius: "12px 12px 0 0", overflow: "hidden" },
  modalImg: { width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" },
  modalImgGrad: { position: "absolute", inset: 0, background: "linear-gradient(to top,#17121b 0%,rgba(23,18,27,.3) 60%,transparent 100%)" },
  modalImgMeta: { position: "absolute", bottom: 18, left: 22, display: "flex", flexDirection: "column", gap: 5 },
  modalTitle: { fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: "-0.6px", lineHeight: 1 },
  modalBody: { padding: "18px 22px 24px" },
  modalDesc: { fontSize: 13, color: "#bbb", lineHeight: 1.8, margin: "0 0 16px" },
  kpBox: { background: "#241c2a", border: "1px solid #222", borderRadius: 7, padding: "11px 15px", marginBottom: 16 },
  kpHead: { fontSize: 9, fontFamily: "monospace", letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", marginBottom: 9 },
  kpRow: { display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "#ddd", marginBottom: 6 },
  ytBtn: { display: "inline-flex", alignItems: "center", gap: 7, background: "#e85d04", color: "#fff", padding: "10px 20px", borderRadius: 5, textDecoration: "none", fontSize: 12, fontWeight: 700, fontFamily: "monospace" },
};
