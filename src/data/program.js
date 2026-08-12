// ─── data/program.js — strength & conditioning engine ───────────────────────
// Every (age × level × equipment) combination — 6 × 3 × 2 = 36 in total — is
// derived deterministically from the tables below. Nothing is fetched or
// generated at request time; only the one relevant program is ever rendered.

export const AGE_RANGES     = ["<20", "20-30", "30-40", "40-50", "50-60", ">60"];
export const LEVELS         = ["Beginner", "Intermediate", "Advanced"];
export const PROGRAM_TYPES  = ["Calisthenics", "Equipment"];
const OLDER_BRACKETS        = ["50-60", ">60"];

export const LEVEL_COLORS = { Beginner: "#35d07f", Intermediate: "#f5a524", Advanced: "#ff5c5c" };

const CALISTHENICS_EX = {
  lower:             ["bodyweightSquat", "bulgarianSplitSquat", "broadJump"],
  lowerOlder:        ["bodyweightSquat", "stepUp", "wallSit"],
  upperPush:         ["pushUp", "pikePushUp", "benchDip"],
  upperPull:         ["towelRow", "supermanHold", "invertedRowChair"],
  core:              ["plank", "deadBug", "sidePlank"],
  conditioning:      ["burpee", "mountainClimber", "jumpingJack"],
  conditioningOlder: ["marchInPlace", "sitToStand", "stepTouch"],
};

const EQUIPMENT_EX = {
  lower:             ["gobletSquat", "romanianDeadliftDB", "walkingLunge"],
  lowerOlder:        ["gobletSquat", "romanianDeadliftDB", "dbStepUp"],
  upperPush:         ["dbBenchPress", "dbOverheadPress", "tricepExtension"],
  upperPull:         ["bentOverRow", "latPulldownOrPullup", "facePullBand"],
  core:              ["weightedPlank", "palloffPress", "farmerCarry"],
  conditioning:      ["kettlebellSwing", "rowMachineInterval", "battleRopes"],
  conditioningOlder: ["kettlebellSwingLight", "rowMachineSteady", "farmerCarryInterval"],
};

const WARMUP_EX   = ["armLegSwings", "hipRotations", "neckShoulderRolls"];
const COOLDOWN_EX = ["childsPose", "hamstringStretch", "hip9090Stretch", "boxBreathing"];

const STRENGTH_RX   = { Beginner: "2 × 10",  Intermediate: "3 × 12",  Advanced: "4 × 15" };
const PULL_RX       = { Beginner: "2 × 8",   Intermediate: "3 × 10",  Advanced: "4 × 12" };
const CORE_RX       = { Beginner: "2 × 20s", Intermediate: "3 × 30s", Advanced: "4 × 45s" };
const COND_RX       = { Beginner: "4 rounds · 20s on / 40s off", Intermediate: "5 rounds · 30s on / 30s off", Advanced: "6 rounds · 40s on / 20s off" };
const COND_RX_OLDER = { Beginner: "3 rounds · 20s on / 50s off", Intermediate: "4 rounds · 25s on / 45s off", Advanced: "5 rounds · 30s on / 40s off" };
const REST_SEC      = { Beginner: 60, Intermediate: 45, Advanced: 30 };
const WARMUP_MIN    = { Beginner: 5,  Intermediate: 6,  Advanced: 7 };
const FREQ_BASE     = { Beginner: 2,  Intermediate: 3,  Advanced: 4 };

export function buildProgram(age, level, type) {
  if (!age || !level || !type) return null;
  const older = OLDER_BRACKETS.includes(age);
  const pool  = type === "Calisthenics" ? CALISTHENICS_EX : EQUIPMENT_EX;

  return {
    frequency: older ? 2 : FREQ_BASE[level],
    restSec:   REST_SEC[level] + (older ? 15 : 0),
    warmup:    { items: WARMUP_EX, minutes: WARMUP_MIN[level] + (older ? 1 : 0) },
    blocks: [
      { key: "lower",        items: older ? pool.lowerOlder : pool.lower, rx: STRENGTH_RX[level] },
      { key: "upperPush",    items: pool.upperPush, rx: STRENGTH_RX[level] },
      { key: "upperPull",    items: pool.upperPull, rx: PULL_RX[level] },
      { key: "core",         items: pool.core,      rx: CORE_RX[level] },
      { key: "conditioning", items: older ? pool.conditioningOlder : pool.conditioning,
                             rx: older ? COND_RX_OLDER[level] : COND_RX[level] },
    ],
    cooldown: { items: COOLDOWN_EX, minutes: 5 + (older ? 1 : 0) },
  };
}

// ─── Reading a prescription string ───────────────────────────────────────────
/** The `rx` strings above are written for a human to read on the page. The set
 *  tracker needs them as numbers, so this parses the three shapes that exist —
 *  and returns null for anything else rather than guessing.
 *
 *  "3 × 12"                       → { kind: "reps",   sets: 3, amount: 12 }
 *  "3 × 30s"                      → { kind: "time",   sets: 3, amount: 30 }
 *  "5 rounds · 30s on / 30s off"  → { kind: "rounds", sets: 5, workSec: 30, restSec: 30 }
 *  "6 min"                        → null  (warm-up and cooldown: nothing to count)
 *
 *  Parsing rather than storing the numbers alongside the string keeps a single
 *  source of truth. If the two could drift apart, one day they would: someone
 *  edits STRENGTH_RX, the page shows 4 sets, and the tracker counts 3.
 *
 *  NOTE the separators: `×` is U+00D7 and `·` is U+00B7, both written by the
 *  tables above. A plain "x" or "*" will not match, which is intentional —
 *  a silent miss here shows up immediately as a missing tracker. */
export function parseRx(rx) {
  if (typeof rx !== "string") return null;

  const straight = /^\s*(\d+)\s*×\s*(\d+)(s?)\s*$/.exec(rx);
  if (straight) {
    return {
      kind: straight[3] ? "time" : "reps",
      sets: Number(straight[1]),
      amount: Number(straight[2]),
    };
  }

  const rounds = /^\s*(\d+)\s+rounds\s*·\s*(\d+)s\s*on\s*\/\s*(\d+)s\s*off\s*$/.exec(rx);
  if (rounds) {
    return {
      kind: "rounds",
      sets: Number(rounds[1]),
      workSec: Number(rounds[2]),
      restSec: Number(rounds[3]),
    };
  }

  return null;
}
