import { useState } from "react";
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
const NAV_KEYS = ["Overview", "Concepts", "Techniques", "About", "Merchandise"];

const CAT_COLORS  = { Guards: "#4cc9f0", Submissions: "#e85d04", Transitions: "#a29bfe", Takedowns: "#55efc4", "Dark BJJ": "#d63031" };
const DIFF_COLORS = { Beginner: "#2ecc71", Intermediate: "#f39c12", Advanced: "#e74c3c" };
const DEFAULT_IMAGE = "/images/bjj_underconstruction.jpg?w=600&q=80";
const ADMIN_PASSWORD = "osss2026singapore";

const JSON_TEMPLATE = `[
  {
    "name": "Butterfly Guard",
    "category": "Guards",
    "difficulty": "Intermediate",
    "description": "Seated guard with insteps hooked under opponent's thighs.",
    "image": "/images/bjj_underconstruction.jpg?w=600&q=80",
    "youtube": "https://www.youtube.com/watch?v=example",
    "keyPoints": ["Stay upright and active","Hook lift is explosive","Combine with underhook"]
  }
]`;

// ─── LANGUAGE SELECTOR ────────────────────────────────────────────────────────
function LangSelector({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === lang);
  return (
    <div style={{ position: "relative", marginLeft: 12 }}>
      <button
        onClick={() => setOpen(o => !o)}
        title="Select language"
        style={{ background: "none", border: "1px solid #2a2a2a", borderRadius: 6, cursor: "pointer", padding: "4px 9px", display: "flex", alignItems: "center", gap: 5, fontSize: 16, color: "#ede8df", lineHeight: 1 }}
      >
        <span>{current.flag}</span>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: "#666", letterSpacing: "0.05em" }}>▾</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "#141414", border: "1px solid #2a2a2a", borderRadius: 8, overflow: "hidden", zIndex: 200, minWidth: 150, boxShadow: "0 8px 24px rgba(0,0,0,0.6)" }}>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", background: l.code === lang ? "#1e1e1e" : "none", border: "none", color: l.code === lang ? "#ede8df" : "#888", fontSize: 13, fontFamily: "monospace", padding: "9px 14px", cursor: "pointer", textAlign: "left" }}>
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
  const [techniques, setTechs]  = useState(SEED_TECHNIQUES);
  const [cat, setCat]           = useState("All");
  const [diff, setDiff]         = useState("All");
  const [selected, setSelected] = useState(null);
  const [isAdmin, setIsAdmin]   = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [lang, setLang]         = useState("en");

  const filtered = techniques.filter(p =>
    (cat  === "All" || p.category   === cat) &&
    (diff === "All" || p.difficulty === diff)
  );

  const handleImport = (newItems) => {
    const maxId = techniques.reduce((m, t2) => Math.max(m, t2.id || 0), 0);
    const stamped = newItems.map((t2, i) => ({ difficulty: "Beginner", image: DEFAULT_IMAGE, youtube: "", keyPoints: [], ...t2, id: maxId + i + 1 }));
    setTechs(prev => [...prev, ...stamped]);
    setPage("Techniques");
  };

  const handleAddClick = () => { if (isAdmin) { setPage("Add"); } else { setShowGate(true); } };
  const handleUnlock   = () => { setIsAdmin(true); setShowGate(false); setPage("Add"); };
  const handleLock     = () => { setIsAdmin(false); if (page === "Add") setPage("Overview"); };

  const navLabel = (key) => ({
    Overview: t(T.nav.overview, lang), Concepts: t(T.nav.concepts, lang),
    Techniques: t(T.nav.techniques, lang), About: t(T.nav.about, lang),
    Merchandise: t(T.nav.merchandise, lang),
  }[key]);

  return (
    <div style={S.root}>
      <Grain />
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
          {isAdmin
            ? <>
                <button onClick={handleAddClick} style={{ ...S.navBtn, ...(page === "Add" ? S.navAddActive : S.navAdd) }}>{t(T.nav.addBtn, lang)}</button>
                <button onClick={handleLock} style={{ ...S.navBtn, ...S.navLockBtn }} title="Exit admin mode">{t(T.nav.exitAdmin, lang)}</button>
              </>
            : <button onClick={handleAddClick} style={{ ...S.navBtn, ...S.navAdd }}>{t(T.nav.addAdmin, lang)}</button>
          }
          <LangSelector lang={lang} setLang={setLang} />
        </div>
      </nav>

      <main style={S.main}>
        {page === "Overview"   && <Overview   techniques={techniques} goTo={setPage} lang={lang} />}
        {page === "Concepts"   && <Concepts   lang={lang} />}
        {page === "Techniques" && <Techniques filtered={filtered} cat={cat} setCat={setCat} diff={diff} setDiff={setDiff} onSelect={setSelected} lang={lang} />}
        {page === "About"      && <About      lang={lang} />}
        {page === "Merchandise"&& <Merchandise lang={lang} />}
        {page === "Add"        && isAdmin && <AddTechniques onImport={handleImport} lang={lang} />}
      </main>

      {selected  && <Modal       pos={selected} onClose={() => setSelected(null)} lang={lang} />}
      {showGate  && <PasswordGate onUnlock={handleUnlock} onCancel={() => setShowGate(false)} lang={lang} />}
    </div>
  );
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────
function Overview({ techniques, goTo, lang }) {
  return (
    <div style={S.overviewWrap}>
      <div style={S.hero}>
        <div style={S.heroTag}>{t(T.overview.tag, lang)}</div>
        <h1 style={S.heroTitle}>{t(T.overview.titleLine1, lang)}<br /><span style={S.heroAccent}>{t(T.overview.titleLine2, lang)}</span></h1>
        <p style={S.heroBody}>{t(T.overview.body1, lang)}</p>
        <p style={S.heroBody}>{t(T.overview.body2, lang)}</p>
        <div style={S.heroCtas}>
          <button style={S.ctaPrimary}   onClick={() => goTo("Techniques")}>{t(T.overview.exploreCta, lang)}</button>
          <button style={S.ctaSecondary} onClick={() => goTo("Concepts")}>{t(T.overview.conceptsCta, lang)}</button>
          <button style={S.ctaSecondary} onClick={() => goTo("Merchandise")}>{t(T.overview.merchCta, lang)}</button>
        </div>
      </div>
      <div style={S.statRow}>
        {[
          [String(techniques.length), t(T.overview.statTech, lang)],
          [String(CATS.length - 1),   t(T.overview.statCats, lang)],
          ["3",                        t(T.overview.statDiffs, lang)],
          ["∞",                        t(T.overview.statCombo, lang)],
        ].map(([n, l]) => (
          <div key={l} style={S.stat}>
            <span style={S.statNum}>{n}</span>
            <span style={S.statLabel}>{l}</span>
          </div>
        ))}
      </div>
      <div style={S.catGrid}>
        {CATS.slice(1).map(c => (
          <div key={c} style={{ ...S.catCard, borderColor: CAT_COLORS[c] + "33" }}
            onClick={() => goTo("Techniques")}
            onMouseEnter={e => e.currentTarget.style.borderColor = CAT_COLORS[c]}
            onMouseLeave={e => e.currentTarget.style.borderColor = CAT_COLORS[c] + "33"}>
            <span style={{ ...S.catDot, background: CAT_COLORS[c] }} />
            <span style={S.catName}>{t(T.cats[c], lang)}</span>
            <span style={S.catCount}>{techniques.filter(p => p.category === c).length} {t(T.overview.techCount, lang)}</span>
          </div>
        ))}
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
function Techniques({ filtered, cat, setCat, diff, setDiff, onSelect, lang }) {
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
function About({ lang }) {
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
        {CATS.slice(1).map(c => (
          <div key={c} style={S.aboutCatRow}>
            <span style={{ ...S.catDot, background: CAT_COLORS[c], flexShrink: 0, marginTop: 3 }} />
            <div>
              <strong style={{ color: CAT_COLORS[c] }}>{t(T.cats[c], lang)}</strong>
              <span style={{ color: "#777", marginLeft: 10, fontSize: 13 }}>{t(T.about.catDescs[c], lang)}</span>
            </div>
          </div>
        ))}
        <div style={S.addDivider} />
        <p style={{ ...S.aboutBody, color: "#444", fontSize: 12 }}>{t(T.about.footer, lang)}</p>
      </div>
    </div>
  );
}

// ─── MERCHANDISE ──────────────────────────────────────────────────────────────
function Merchandise({ lang }) {
  return (
    <div>
      <div style={S.pageHeader}>
        <h2 style={S.pageTitle}>{t(T.merch.pageTitle, lang)}</h2>
        <p style={S.pageSubtitle}>{t(T.merch.pageSubtitle, lang)}</p>
      </div>
      <div style={{ ...S.aboutCard, textAlign: "center", padding: "60px 30px" }}>
        <div style={{ fontSize: 40, marginBottom: 14 }}>🥋</div>
        <h3 style={{ ...S.aboutSub, fontSize: 22, color: "#ede8df", textTransform: "none", letterSpacing: "normal", fontFamily: "inherit" }}>{t(T.merch.comingSoon, lang)}</h3>
        <p style={{ ...S.aboutBody, marginTop: 10 }}>{t(T.merch.comingSoonSub, lang)}</p>
      </div>
    </div>
  );
}

// ─── ADD TECHNIQUES ───────────────────────────────────────────────────────────
function AddTechniques({ onImport, lang }) {
  const [mode, setMode]     = useState("form");
  const [jsonText, setJson] = useState(JSON_TEMPLATE);
  const [jsonErr, setErr]   = useState("");
  const [done, setDone]     = useState(false);
  const [addedCount, setAddedCount] = useState(0);
  const blank = { name: "", category: "Guards", difficulty: "Beginner", description: "", image: "", youtube: "", kp1: "", kp2: "", kp3: "" };
  const [form, setForm]     = useState(blank);
  const [formErr, setFErr]  = useState("");
  const [copied, setCopied] = useState(false);

  const finishImport = (items) => { onImport(items); setAddedCount(items.length); setDone(true); };

  const handleJsonImport = () => {
    setErr("");
    try {
      const parsed = JSON.parse(jsonText);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      const bad = arr.filter(t2 => !t2.name || !t2.category || !t2.description);
      if (bad.length) { setErr(`${bad.length} item(s) missing required fields: name, category, description.`); return; }
      finishImport(arr);
    } catch (e) { setErr("Invalid JSON — " + e.message); }
  };

  const handleFormImport = () => {
    setFErr("");
    if (!form.name.trim())        { setFErr("Name is required."); return; }
    if (!form.description.trim()) { setFErr("Description is required."); return; }
    const kps = [form.kp1, form.kp2, form.kp3].map(s => s.trim()).filter(Boolean);
    finishImport([{ name: form.name.trim(), category: form.category, difficulty: form.difficulty, description: form.description.trim(), image: form.image.trim() || DEFAULT_IMAGE, youtube: form.youtube.trim(), keyPoints: kps }]);
  };

  const F = (label, key, opts = {}) => (
    <div style={S.addField}>
      <label style={S.addLabel}>{label}</label>
      {opts.textarea
        ? <textarea value={form[key]} rows={3} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={{ ...S.addInput, resize: "vertical" }} placeholder={opts.ph || ""} />
        : opts.select
        ? <select value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={S.addInput}>
            {opts.options.map(o => <option key={o}>{o}</option>)}
          </select>
        : <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={S.addInput} placeholder={opts.ph || ""} />}
    </div>
  );

  const buildExportJSON = () => JSON.stringify({ name: form.name.trim() || "Untitled", category: form.category, difficulty: form.difficulty, description: form.description.trim(), image: form.image.trim() || DEFAULT_IMAGE, youtube: form.youtube.trim() || "", keyPoints: [form.kp1, form.kp2, form.kp3].map(s => s.trim()).filter(Boolean) }, null, 2);

  const handleCopyExport = () => {
    navigator.clipboard.writeText(mode === "form" ? buildExportJSON() : jsonText).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  if (done) return (
    <div style={S.successBox}>
      <div style={{ fontSize: 44, marginBottom: 14 }}>✓</div>
      <h3 style={{ margin: "0 0 8px", fontSize: 22, letterSpacing: "-0.5px" }}>
        {addedCount} {addedCount !== 1 ? t(T.success.techsAdded, lang) : t(T.success.techAdded, lang)} {t(T.success.addedTo, lang)}
      </h3>
      <p style={{ color: "#666", fontSize: 14, marginBottom: 6, maxWidth: 420 }}>{t(T.success.body, lang)}</p>
      <div style={S.exportBox}>
        <div style={S.exportHeader}>
          <span style={S.addLabel}>{t(T.success.exportLbl, lang)}</span>
          <button style={copied ? S.exportCopiedBtn : S.exportCopyBtn} onClick={handleCopyExport}>
            {copied ? t(T.success.copied, lang) : t(T.success.copy, lang)}
          </button>
        </div>
        <pre style={S.exportPre}>{mode === "form" ? buildExportJSON() : jsonText}</pre>
        <p style={S.exportHint}>{t(T.success.hint, lang)}</p>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
        <button style={S.ctaPrimary} onClick={() => { setDone(false); setForm(blank); setJson(JSON_TEMPLATE); setCopied(false); }}>{t(T.success.addAnother, lang)}</button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={S.pageHeader}>
        <h2 style={S.pageTitle}>{t(T.add.pageTitle, lang)}</h2>
        <p style={S.pageSubtitle}>{t(T.add.pageSubtitle, lang)}</p>
      </div>
      <div style={S.modeTabs}>
        {[["form", t(T.add.formTab, lang)], ["json", t(T.add.jsonTab, lang)]].map(([m, lbl]) => (
          <button key={m} onClick={() => setMode(m)} style={{ ...S.modeTab, ...(mode === m ? S.modeTabActive : {}) }}>{lbl}</button>
        ))}
      </div>
      {mode === "form" && (
        <div style={S.addCard}>
          <div style={S.addGrid2}>
            {F(t(T.add.nameLbl, lang), "name", { ph: t(T.add.namePh, lang) })}
            {F(t(T.add.catLbl, lang), "category", { select: true, options: CATS.slice(1) })}
          </div>
          <div style={S.addGrid2}>
            {F(t(T.add.diffLbl, lang), "difficulty", { select: true, options: DIFFS.slice(1) })}
            {F(t(T.add.imgLbl, lang), "image", { ph: t(T.add.imgPh, lang) })}
          </div>
          {F(t(T.add.descLbl, lang), "description", { textarea: true, ph: t(T.add.descPh, lang) })}
          {F(t(T.add.ytLbl, lang), "youtube", { ph: t(T.add.ytPh, lang) })}
          <div style={{ ...S.addDivider, margin: "20px 0 14px" }} />
          <div style={S.addLabel}>{t(T.add.kpLbl, lang)}</div>
          <div style={S.addGrid3}>
            {F("1", "kp1", { ph: t(T.add.kp1Ph, lang) })}
            {F("2", "kp2", { ph: t(T.add.kp2Ph, lang) })}
            {F("3", "kp3", { ph: t(T.add.kp3Ph, lang) })}
          </div>
          {formErr && <div style={S.errBox}>{formErr}</div>}
          <button style={{ ...S.ctaPrimary, marginTop: 22 }} onClick={handleFormImport}>{t(T.add.addBtn, lang)}</button>
        </div>
      )}
      {mode === "json" && (
        <div style={S.addCard}>
          <textarea value={jsonText} onChange={e => { setJson(e.target.value); setErr(""); }} style={S.jsonArea} spellCheck={false} />
          {jsonErr && <div style={S.errBox}>{jsonErr}</div>}
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            <button style={S.ctaPrimary}   onClick={handleJsonImport}>{t(T.add.importBtn, lang)}</button>
            <button style={S.ctaSecondary} onClick={() => { setJson(JSON_TEMPLATE); setErr(""); }}>{t(T.add.resetBtn, lang)}</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PASSWORD GATE ────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock, onCancel, lang }) {
  const [pw, setPw]       = useState("");
  const [err, setErr]     = useState("");
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (pw === ADMIN_PASSWORD) { onUnlock(); }
    else { setErr(t(T.gate.wrong, lang)); setPw(""); setShake(true); setTimeout(() => setShake(false), 500); }
  };

  return (
    <div style={S.overlay} onClick={onCancel}>
      <div style={{ ...S.gateBox, ...(shake ? S.gateShake : {}) }} onClick={e => e.stopPropagation()}>
        <div style={S.gateLock}>🔒</div>
        <h3 style={S.gateTitle}>{t(T.gate.title, lang)}</h3>
        <p style={S.gateSub}>{t(T.gate.sub, lang)}</p>
        <input type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(""); }}
          onKeyDown={e => { if (e.key === "Enter") attempt(); if (e.key === "Escape") onCancel(); }}
          placeholder={t(T.gate.ph, lang)} autoFocus
          style={{ ...S.addInput, marginBottom: 6, fontSize: 14, letterSpacing: "0.1em" }} />
        {err && <div style={{ ...S.errBox, marginBottom: 10 }}>{err}</div>}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button style={S.ctaPrimary}   onClick={attempt}>{t(T.gate.unlock, lang)}</button>
          <button style={S.ctaSecondary} onClick={onCancel}>{t(T.gate.cancel, lang)}</button>
        </div>
        <p style={S.gateHint}>
          {t(T.gate.hint, lang)} <code style={S.code}>osss2026singapore</code>{t(T.gate.hintEnd, lang)}
        </p>
      </div>
    </div>
  );
}

// ─── GRAIN ────────────────────────────────────────────────────────────────────
function Grain() {
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.28,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")` }} />;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  root: { minHeight: "100vh", background: "#0a0a0a", color: "#ede8df", fontFamily: "'Georgia','Times New Roman',serif", position: "relative" },
  nav: { position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,10,0.94)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1a", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 },
  navBrand: { display: "flex", alignItems: "center", gap: 9, cursor: "pointer", userSelect: "none" },
  navLogo: { fontSize: 19, color: "#e85d04" },
  navTitle: { fontSize: 15, fontWeight: 700, letterSpacing: "-0.4px" },
  navLinks: { display: "flex", gap: 2, alignItems: "center" },
  navBtn: { background: "none", border: "none", color: "#666", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.04em", padding: "5px 11px", borderRadius: 4, cursor: "pointer" },
  navActive: { color: "#e85d04" },
  navAdd: { color: "#444", borderLeft: "1px solid #1e1e1e", marginLeft: 8, paddingLeft: 14 },
  navAddActive: { color: "#e85d04", borderLeft: "1px solid #1e1e1e", marginLeft: 8, paddingLeft: 14 },
  navLockBtn: { color: "#2ecc71", fontSize: 11, borderLeft: "1px solid #1e1e1e", marginLeft: 4, paddingLeft: 12 },
  gateBox: { background: "#141414", border: "1px solid #2a2a2a", borderRadius: 12, padding: "36px 32px", maxWidth: 360, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  gateLock: { fontSize: 36, marginBottom: 12 },
  gateTitle: { fontSize: 20, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.4px" },
  gateSub: { fontSize: 13, color: "#666", margin: "0 0 20px", lineHeight: 1.5 },
  gateHint: { fontSize: 11, color: "#444", marginTop: 18, lineHeight: 1.6, fontFamily: "monospace" },
  main: { position: "relative", zIndex: 1, padding: "40px 32px 80px", maxWidth: 1100, margin: "0 auto" },
  overviewWrap: { display: "flex", flexDirection: "column", gap: 50 },
  hero: { paddingTop: 18 },
  heroTag: { fontFamily: "monospace", fontSize: 10, letterSpacing: "0.22em", color: "#555", textTransform: "uppercase", marginBottom: 12 },
  heroTitle: { fontSize: "clamp(36px, 7vw, 70px)", fontWeight: 700, lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-2px" },
  heroAccent: { color: "#e85d04", fontStyle: "italic" },
  heroBody: { maxWidth: 520, fontSize: 15, color: "#999", lineHeight: 1.85, margin: "0 0 26px" },
  heroCtas: { display: "flex", gap: 10, flexWrap: "wrap" },
  ctaPrimary: { background: "#e85d04", color: "#fff", border: "none", padding: "11px 24px", borderRadius: 4, fontSize: 12, fontFamily: "monospace", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em" },
  ctaSecondary: { background: "none", color: "#ede8df", border: "1px solid #2a2a2a", padding: "11px 24px", borderRadius: 4, fontSize: 12, fontFamily: "monospace", cursor: "pointer", letterSpacing: "0.05em" },
  statRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, border: "1px solid #181818", borderRadius: 6, overflow: "hidden" },
  stat: { background: "#111", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 4 },
  statNum: { fontSize: 32, fontWeight: 700, color: "#e85d04", letterSpacing: "-1px" },
  statLabel: { fontSize: 10, color: "#555", fontFamily: "monospace", letterSpacing: "0.05em" },
  catGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 10 },
  catCard: { background: "#111", border: "1px solid transparent", borderRadius: 6, padding: "15px 13px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 7, transition: "border-color 0.2s" },
  catDot: { display: "inline-block", width: 7, height: 7, borderRadius: "50%" },
  catName: { fontSize: 13, fontWeight: 700 },
  catCount: { fontSize: 10, color: "#555", fontFamily: "monospace" },
  filterBar: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: "15px 18px", marginBottom: 22, display: "flex", flexDirection: "column", gap: 11 },
  filterGroup: { display: "flex", alignItems: "center", gap: 11, flexWrap: "wrap" },
  filterLabel: { fontFamily: "monospace", fontSize: 10, letterSpacing: "0.12em", color: "#555", textTransform: "uppercase", minWidth: 30 },
  pills: { display: "flex", gap: 5, flexWrap: "wrap" },
  pill: { background: "none", border: "1px solid #222", color: "#666", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontFamily: "monospace", cursor: "pointer", transition: "all 0.15s" },
  pillActive: { background: "rgba(232,93,4,0.07)" },
  filterCount: { fontFamily: "monospace", fontSize: 11, color: "#444", marginLeft: "auto" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(265px,1fr))", gap: 16 },
  empty: { gridColumn: "1/-1", textAlign: "center", color: "#444", padding: 60, fontFamily: "monospace" },
  card: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, border-color 0.2s" },
  cardHov: { transform: "translateY(-5px)", borderColor: "#2a2a2a" },
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
  conceptCard: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: "20px" },
  conceptIcon: { fontSize: 24, marginBottom: 9 },
  conceptTitle: { fontSize: 14, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.2px" },
  conceptBody: { fontSize: 12, color: "#888", lineHeight: 1.7, margin: 0 },
  aboutCard: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: "26px 30px", maxWidth: 660 },
  aboutBody: { fontSize: 14, color: "#999", lineHeight: 1.85, margin: "0 0 13px" },
  aboutSub: { fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em", color: "#555", textTransform: "uppercase", margin: "0 0 13px", fontWeight: 400 },
  aboutCatRow: { display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, fontSize: 13 },
  modeTabs: { display: "flex", gap: 0, marginBottom: 18, border: "1px solid #1e1e1e", borderRadius: 6, overflow: "hidden", maxWidth: 360 },
  modeTab: { flex: 1, background: "none", border: "none", borderRight: "1px solid #1e1e1e", color: "#555", fontSize: 12, fontFamily: "monospace", padding: "9px 0", cursor: "pointer", transition: "all 0.15s" },
  modeTabActive: { background: "#161616", color: "#ede8df" },
  addCard: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: "26px 28px", maxWidth: 780 },
  addGrid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 },
  addGrid3: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 10 },
  addField: { display: "flex", flexDirection: "column", gap: 5 },
  addLabel: { fontSize: 10, fontFamily: "monospace", letterSpacing: "0.08em", color: "#666", textTransform: "uppercase" },
  addInput: { background: "#0d0d0d", border: "1px solid #252525", borderRadius: 5, color: "#ede8df", fontSize: 13, padding: "8px 10px", fontFamily: "Georgia,serif", outline: "none", width: "100%", boxSizing: "border-box" },
  addDivider: { borderTop: "1px solid #1a1a1a", margin: "22px 0" },
  errBox: { background: "rgba(214,48,49,0.09)", border: "1px solid #d63031", borderRadius: 5, color: "#d63031", fontSize: 11, fontFamily: "monospace", padding: "8px 11px", marginTop: 10 },
  jsonArea: { width: "100%", boxSizing: "border-box", background: "#0d0d0d", border: "1px solid #252525", borderRadius: 6, color: "#a8d8a8", fontFamily: "monospace", fontSize: 12, padding: "13px", lineHeight: 1.65, height: 290, resize: "vertical", outline: "none", display: "block" },
  code: { background: "#1a1a1a", color: "#4cc9f0", padding: "1px 5px", borderRadius: 3, fontSize: 11 },
  successBox: { textAlign: "center", padding: "60px 20px" },
  exportBox: { background: "#0d0d0d", border: "1px solid #252525", borderRadius: 8, padding: "16px 18px", marginTop: 22, maxWidth: 580, width: "100%", textAlign: "left" },
  exportHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  exportPre: { color: "#a8d8a8", fontFamily: "monospace", fontSize: 11, lineHeight: 1.65, margin: 0, overflowX: "auto", whiteSpace: "pre" },
  exportHint: { fontSize: 11, color: "#555", fontFamily: "monospace", marginTop: 12, marginBottom: 0, lineHeight: 1.6 },
  exportCopyBtn: { background: "#1a1a1a", border: "1px solid #333", color: "#aaa", fontSize: 11, fontFamily: "monospace", padding: "4px 12px", borderRadius: 4, cursor: "pointer" },
  exportCopiedBtn: { background: "rgba(46,204,113,0.15)", border: "1px solid #2ecc71", color: "#2ecc71", fontSize: 11, fontFamily: "monospace", padding: "4px 12px", borderRadius: 4, cursor: "pointer" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modal: { background: "#141414", border: "1px solid #222", borderRadius: 12, width: "100%", maxWidth: 540, maxHeight: "92vh", overflowY: "auto", position: "relative" },
  closeBtn: { position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.5)", border: "1px solid #333", color: "#aaa", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", zIndex: 2, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" },
  modalImgWrap: { position: "relative", height: 220, borderRadius: "12px 12px 0 0", overflow: "hidden" },
  modalImg: { width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" },
  modalImgGrad: { position: "absolute", inset: 0, background: "linear-gradient(to top,#141414 0%,rgba(20,20,20,.3) 60%,transparent 100%)" },
  modalImgMeta: { position: "absolute", bottom: 18, left: 22, display: "flex", flexDirection: "column", gap: 5 },
  modalTitle: { fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: "-0.6px", lineHeight: 1 },
  modalBody: { padding: "18px 22px 24px" },
  modalDesc: { fontSize: 13, color: "#bbb", lineHeight: 1.8, margin: "0 0 16px" },
  kpBox: { background: "#1a1a1a", border: "1px solid #222", borderRadius: 7, padding: "11px 15px", marginBottom: 16 },
  kpHead: { fontSize: 9, fontFamily: "monospace", letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", marginBottom: 9 },
  kpRow: { display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "#ddd", marginBottom: 6 },
  ytBtn: { display: "inline-flex", alignItems: "center", gap: 7, background: "#e85d04", color: "#fff", padding: "10px 20px", borderRadius: 5, textDecoration: "none", fontSize: 12, fontWeight: 700, fontFamily: "monospace" },
};
