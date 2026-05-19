import { useState } from "react";

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                        📌 ADD NEW TECHNIQUES HERE                          ║
// ║                                                                            ║
// ║  This is the permanent technique database for the app.                     ║
// ║                                                                            ║
// ║  WORKFLOW:                                                                 ║
// ║  1. Use the Admin panel ("+ Add") to compose & preview a technique         ║
// ║  2. Click "Export JSON" on the success screen to copy the object           ║
// ║  3. Paste it at the BOTTOM of the list below (before the closing ];)       ║
// ║  4. Assign the next sequential id (last id + 1)                            ║
// ║  5. Save the file and republish — the technique will appear for everyone   ║
// ║                                                                            ║
// ║  REQUIRED fields:  name · category · description                           ║
// ║  OPTIONAL fields:  difficulty · image · youtube · keyPoints[]              ║
// ║                                                                            ║
// ║  Valid categories:  Guards · Submissions · Transitions                     ║
// ║                     Takedowns · Dark BJJ                                   ║
// ║  Valid difficulty:  Beginner · Intermediate · Advanced                     ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

const SEED_TECHNIQUES = [
  /*
  {
    id: 1, name: "Closed Guard", category: "Guards", difficulty: "Beginner",
    description: "The cornerstone of BJJ. You're on your back with both legs locked around the opponent's waist. From here you control posture and launch attacks: triangles, armbars, sweeps, omoplatas.",
    image: "/images/bjj_guard_closed.jpg?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=g7WLY0r1-IA",
    keyPoints: ["Break opponent's posture first", "Control collar & sleeve", "Hip angle unlocks attacks"],
  },
  {
    id: 2, name: "Half Guard", category: "Guards", difficulty: "Intermediate",
    description: "One of the opponent's legs is trapped between yours. Acts as both a defensive shield and a platform for deep-half sweeps, back takes, and leg-lock entries.",
    image: "images/bjj_guard_half.jpg?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=B_Zn0tYNBdw",
    keyPoints: ["Win the underhook battle", "Recover guard with hip escape", "Sweep to top"],
  },
  {
    id: 3, name: "Spider Guard", category: "Guards", difficulty: "Intermediate",
    description: "Sleeve grips combined with feet on biceps create a web of tension. An elite sport-BJJ platform for triangles, omoplatas, and balloon sweeps.",
    image: "images/bjj_guard_spider.jpg?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=RqWxP4uRzUU",
    keyPoints: ["Maintain sleeve control", "Push/pull to break posture", "Extend to create openings"],
  },
  {
    id: 4, name: "Rear Naked Choke", category: "Submissions", difficulty: "Beginner",
    description: "The highest-percentage finish in grappling. Applied from back control, the choking arm wraps the throat while the other arm frames the head — cutting off carotid blood flow.",
    image: "/images/bjj_sub_rnc.jpg?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=aVHFPsrpDiE",
    keyPoints: ["Chin-over-shoulder principle", "Squeeze elbow-to-elbow", "Hips away to finish"],
  },
  {
    id: 5, name: "Triangle Choke", category: "Submissions", difficulty: "Intermediate",
    description: "One of BJJ's most iconic chokes. Legs form a triangle around the opponent's neck and one arm, creating a blood choke. Can be hit from guard, mount, or back.",
    image: "/images/bjj_sub_triangle.jpg?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=OqWbcfLsEAA",
    keyPoints: ["Cut the angle 45°", "Pull head down", "Squeeze knees together"],
  },
  {
    id: 6, name: "Armbar", category: "Submissions", difficulty: "Beginner",
    description: "A hyper-extension of the elbow joint. Can be applied from mount, guard, back, and countless transitional positions. The most versatile submission in the game.",
    image: "/images/bjj_sub_armbar.jpg?w=600&q=80",
    youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
    keyPoints: ["Thumb up = elbow vulnerable", "Squeeze knees, bridge hips", "Control the wrist firmly"],
  },
  {
    id: 13, name: "Turtle", category: "Transitions", difficulty: "Beginner",
    description: "A defensive position with all fours on the floow. May be an intermediate step to recovery in certain difficult situations, or to avoid other controls by the opponent. However, can be dangerous as it opens the opportunity for the opponent to attack the back. Some practitionners use turtle offensively.",
    image: "/images/bjj_trans_turtle.jpg?w=600&q=80",
    youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
    keyPoints: ["Defensive, stabilisation", "Opportunity for attack", "Risk of back-take"],
  },
  {
    id: 7, name: "Guard Pass to Side Control", category: "Transitions", difficulty: "Beginner",
    description: "Transitioning from inside the guard to dominant side control is the most fundamental positional improvement in BJJ. Master the toreando and knee-slice as your bread-and-butter passes.",
    image: "images/bjj_trans_passtoside.jpg?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=g7WLY0r1-IA",
    keyPoints: ["Control hips before moving", "Keep pressure throughout", "Establish cross-face immediately"],
  },

  {
    id: 8, name: "Mount to Back Take", category: "Transitions", difficulty: "Intermediate",
    description: "When the opponent turns to escape mount, you flow to their back. Recognising this reactive window separates good grapplers from great ones.",
    image: "images/bjj_trans_mounttoback.jpg?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=B_Zn0tYNBdw",
    keyPoints: ["Anticipate the bridge-and-roll", "Chest stays glued to their back", "Insert hooks immediately"],
  },
  {
    id: 9, name: "Double Leg Takedown", category: "Takedowns", difficulty: "Beginner",
    description: "The cornerstone of wrestling-based takedowns. Shoot low, drive through, finish to side or top. Combining a level change with explosive penetration step is key.",
    image: "/images/bjj_throw_doubleleg.jpg?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=RqWxP4uRzUU",
    keyPoints: ["Level change first", "Drive knee to the mat", "Head outside, lift & turn"],
  },
  {
    id: 10, name: "Seoi Nage", category: "Takedowns", difficulty: "Intermediate",
    description: "A classic judo shoulder throw that translates beautifully to BJJ. Entry requires breaking the opponent's balance forward, then loading them across your back.",
    image: "images/bjj_throw_seoinage.jpg?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=aVHFPsrpDiE",
    keyPoints: ["Break posture forward first", "Elbow drives under armpit", "Explosive hip rotation"],
  },
  {
    id: 11, name: "Heel Hook", category: "Dark BJJ", difficulty: "Advanced",
    description: "The most devastating leg lock in the modern game. It rotates the knee joint beyond its limits by levering the heel. Banned in many beginner competitions — learn structure and defence before attempting.",
    image: "/images/bjj_sub_heelhook.jpg?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=OqWbcfLsEAA",
    keyPoints: ["Understand the 'reap' position", "Control before rotating", "Tap early — damage is silent"],
  },
  {
    id: 12, name: "Neck Crank", category: "Dark BJJ", difficulty: "Advanced",
    description: "A spinal compression or lateral neck force. Highly effective but carries real injury risk. Used in no-gi submission-only rulesets. Not a beginner technique — context and control are everything.",
    image: "/images/bjj_sub_neckcrank.jpg?w=600&q=80",
    youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
    keyPoints: ["Slow, controlled pressure", "Distinguish from choke", "Never crank in drilling"],
  },
  */
 {
  id: 1, name: "Closed guard", category: "Guards", difficulty: "Beginner",
  description: "The closed guard is the foundation of BJJ, where you wrap your legs around your opponent's waist to control them from the bottom. It limits their movement and gives you a platform to attack with sweeps and submissions. Mastering closed guard is essential before progressing to open guard variations.",
  image: "/images/bjj_guard_closed.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Keep your hips high and active to break posture", "Control one or both sleeves to limit opponent's arms", "Always look to attack — don't just hold"],
  },
  {
  id: 2, name: "Half guard", category: "Guards", difficulty: "Beginner",
  description: "Half guard involves trapping one of the opponent's legs between yours while lying on your back or side. It is a defensive and offensive position that bridges closed and open guard. It offers strong sweeping opportunities and a pathway to back takes.",
  image: "/images/bjj_guard_half.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Secure the underhook on the trapped-leg side immediately", "Stay on your side — never lie flat on your back", "Use the knee shield to create distance and prevent the pass"],
  },
  {
  id: 3, name: "Open guard (basic)", category: "Guards", difficulty: "Beginner",
  description: "Open guard refers to any bottom guard position where the legs are not locked around the opponent. You use your feet on hips or biceps to manage distance and set up attacks. It requires active leg and hip movement to be effective.",
  image: "/images/bjj_guard_open.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
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
  id: 11, name: "Guillotine choke", category: "Submissions", difficulty: "Intermediate",
  description: "The guillotine attacks the neck when the opponent shoots in for a takedown or drops their head. The arm-in variation is powerful and used at all levels of competition. Proper blade positioning under the chin and hip placement determine the finish.",
  image: "/images/bjj_sub_guillotine.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Get a deep bite under the chin — not on top of it", "Secure a high guard or squeeze the knees to cut off the escape", "Arch back and squeeze the elbow towards your hip to finish"],
  },
  {
  id: 12, name: "Omoplata", category: "Submissions", difficulty: "Intermediate",
  description: "The omoplata uses the legs to attack the shoulder joint by rotating the arm into a painful extension. It also serves as a sweep and a back-take setup. It is commonly set up from spider guard or failed triangle attempts.",
  image: "/images/bjj_sub_omoplata.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Shoot the leg over the shoulder before the opponent can posture up", "Sit up and get perpendicular to your opponent to prevent the roll", "Use your outside arm to block the opponent's hip if they try to roll"],
  },
  {
  id: 13, name: "Heel hook (outside)", category: "Submissions", difficulty: "Intermediate",
  description: "The outside heel hook attacks the knee by rotating the foot and lower leg to create torsional stress on the joint. It is one of the most effective leg attacks in no-gi grappling. Proper entanglement (outside sankaku) is required before attacking.",
  image: "/images/bjj_sub_heelhook.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Secure the outside sankaku entanglement before hunting the heel", "Cup the heel close to your armpit — not at the ankle", "Rotate your whole body, not just your arms, to apply pressure"],
  },
  {
  id: 14, name: "Rear triangle", category: "Submissions", difficulty: "Advanced",
  description: "The rear triangle is applied from back control, using the legs to choke from behind rather than the arms. It is highly effective when the opponent defends the rear naked choke well. Transitioning from back control requires hip mobility and timing.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Enter when the opponent tucks their chin to defend the RNC", "Shoot one leg over the shoulder and lock the figure-four behind the neck", "Squeeze the knees and push your hips forward to finish"],
  },
  {
  id: 15, name: "Calf slicer", category: "Submissions", difficulty: "Advanced",
  description: "The calf slicer (also called the calf crush) compresses the calf muscle against the shinbone of the attacking leg. It is legal in many competition formats and extremely painful when applied correctly. Entry is typically from turtle position or failed takedowns.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Lace your leg deep into the back of the opponent's knee", "Use a figure-four or gable grip on your own shin to create the lever", "Drive your knee forward while pulling the foot towards you"],
  },
  {
  id: 16, name: "Guard pull to closed guard", category: "Transitions", difficulty: "Beginner",
  description: "Pulling guard is a controlled takedown alternative that immediately establishes bottom closed guard. It is a common competition strategy, especially in the gi. Proper execution requires grips and timing to avoid ending up in a bad position.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Secure collar and sleeve grips before pulling", "Pull simultaneously with both grips — don't just sit down", "Land with your hips high and legs locked immediately"],
  },
  {
  id: 17, name: "Mount escape (upa)", category: "Transitions", difficulty: "Beginner",
  description: "The upa (bridge and roll) is the primary escape from the mounted position, using a powerful hip bridge to off-balance the top player. It requires trapping an arm and a foot before executing the bridge. Timing and commitment to the bridge are everything.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Trap the arm on the same side as the foot you trap", "Bridge explosively — a half-hearted bridge won't work", "Follow the roll and end in guard or on top"],
  },
  {
  id: 18, name: "Side control to mount", category: "Transitions", difficulty: "Beginner",
  description: "Transitioning from side control to mount is a fundamental positional advance that increases submission options. The knee-slide method is the most reliable path for beginners. Patience and weight distribution prevent the opponent from recapturing half guard.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Keep consistent downward pressure through the transition", "Slide the knee over the opponent's belt line — don't jump", "Land in a high mount position with your weight forward"],
  },
  {
  id: 19, name: "Back take from turtle", category: "Transitions", difficulty: "Intermediate",
  description: "The turtle position (opponent on all fours) presents excellent back-take opportunities using the seatbelt grip and hook insertion. It commonly arises after a failed guard pass or takedown defence. Maintaining the seatbelt while inserting the second hook is the critical challenge.",
  image: "/images/bjj_trans_turtle.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Secure seatbelt grip before attempting any back take", "Insert bottom hook first, then roll to insert the second", "Never release the seatbelt until both hooks are in"],
  },
  {
  id: 20, name: "Knee slice pass", category: "Transitions", difficulty: "Intermediate",
  description: "The knee slice is one of the most reliable guard passes at all levels, cutting through the guard with the knee. It works against both open and half guard and pairs naturally with the torreando pass. Weight distribution and angle control prevent the underhook.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Drive your knee across the opponent's thigh — not over it", "Use shoulder pressure on the far hip or chest to flatten them", "Block the near hip with your free hand to prevent re-guarding"],
  },
  {
  id: 21, name: "Leg drag pass", category: "Transitions", difficulty: "Advanced",
  description: "The leg drag is a modern passing system that controls one leg while dragging it across the body to pass the guard. It is highly effective against flexible guards and De La Riva. Controlling the hip and collar simultaneously prevents the opponent from recovering.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Pinch the leg between your hip and arm — don't grip the ankle", "Drop your hip to the mat to drag the leg across", "Move to side control or north-south quickly to prevent leg re-entanglement"],
  },
  {
  id: 22, name: "Berimbolo to back take", category: "Transitions", difficulty: "Advanced",
  description: "The berimbolo back take is a high-level sequence where an inversion from De La Riva guard leads directly to back control. It has become a defining technique of modern competition BJJ. Requires strong DLR fundamentals and comfortable inversion ability.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Enter on a failed De La Riva sweep attempt", "Stay tight to the opponent's hips during the inversion", "Come out behind the opponent and immediately secure seatbelt grip"],
  },
  {
  id: 23, name: "Double leg takedown", category: "Takedowns", difficulty: "Beginner",
  description: "The double leg is the most fundamental wrestling takedown and a critical part of any BJJ game. It involves shooting low, driving through both legs, and finishing with proper technique. A failed double leg risks a guillotine, so head position is vital.",
  image: "/images/bjj_throw_doubleleg.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Level change must be sharp and low — don't telegraph it", "Keep your head to the outside of the opponent's hip", "Drive through and past the opponent, not straight down"],
  },
  {
  id: 24, name: "Single leg takedown", category: "Takedowns", difficulty: "Beginner",
  description: "The single leg is highly reliable in BJJ because it requires less commitment than the double leg and offers multiple finishes. It can be entered from ties or after a failed double. The trip, run-the-pipe, and back-take finishes are the most common.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Capture the leg high — under the knee is too low", "Keep the leg tight to your chest using both arms and your body", "Head outside prevents the guillotine — always check head position"],
  },
  {
  id: 25, name: "Osoto gari", category: "Takedowns", difficulty: "Intermediate",
  description: "Osoto gari is a major outer reap from judo that off-balances the opponent backwards and sweeps their lead leg. It requires a strong collar and sleeve grip and works well when the opponent is heavy on their heels. The combination version following a failed kouchi gari is very effective.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Kuzushi (off-balance) is essential before the reap — don't skip it", "Drive your chest through the opponent's chest as you reap", "Commit fully — a half-hearted reap just bounces off"],
  },
  {
  id: 26, name: "Uchi mata", category: "Takedowns", difficulty: "Intermediate",
  description: "Uchi mata is an inner thigh throw from judo used extensively in gi BJJ. It attacks the opponent's inner thigh with a lifting reaping motion to throw them over your hip. It requires coordination and proper off-balancing to execute cleanly.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Pull the opponent forward and up before initiating the reap", "Drive your reaping leg between and upward through the thighs", "Keep your head up and posture strong throughout the entry"],
  },
  {
  id: 27, name: "Foot sweep (kouchi gari)", category: "Takedowns", difficulty: "Advanced",
  description: "Kouchi gari is a subtle inside foot sweep that trips the opponent's near leg as they step. It requires excellent timing and grip work to execute. Often used as a combination entry or when the opponent is focused on defending other attacks.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Time the sweep with the opponent's weight shift — not when they are loaded", "Use your grip to break balance in the direction of the sweep", "Follow immediately into guard or top position — foot sweeps can be loose"],
  },
  {
  id: 28, name: "Wrist lock", category: "Dark BJJ", difficulty: "Beginner",
  description: "The wrist lock attacks the wrist joint and can be applied from almost any position — guard, mount, side control, or even standing. It is often overlooked and catches opponents completely off guard. Even a light application causes significant pain due to the small joint involved.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Attacks are most effective when the opponent's hand is flat or posted", "Apply slowly and precisely — the tap comes fast with wrist locks", "Set up wrist locks when your opponent is focused on defending larger submissions"],
  },
  {
  id: 29, name: "Twister", category: "Dark BJJ", difficulty: "Intermediate",
  description: "The twister is a spinal rotation submission made famous by Eddie Bravo. It attacks the spine and is applied from a body triangle or hooks-in back position. It requires securing the twister hook (heel on the hip) and pulling the opponent's head in the opposite direction.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Secure the twister hook (leg across their hip) before hunting the finish", "Thread your arm behind the opponent's head from the back position", "Pull the head away from the spine rotation — the two directions create the submission"],
  },
  {
  id: 30, name: "Banana split", category: "Dark BJJ", difficulty: "Intermediate",
  description: "The banana split is a brutal groin-stretching submission targeting hip flexibility. It is applied from leg entanglement positions and is legal in many submission-only formats. It is particularly effective against inflexible opponents.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Enter from a single leg X or saddle entanglement", "Control one leg with your legs and the other with your arms — pulling them in opposite directions", "Apply gradually — it can cause serious injury if cranked suddenly"],
  },
  {
  id: 31, name: "Neck crank (can opener)", category: "Dark BJJ", difficulty: "Intermediate",
  description: "The can opener attacks the cervical spine by posting the hands on the forehead and driving the head towards the mat while in the opponent's closed guard. It is illegal in many competition formats but forces the guard to open. Understanding it helps you defend against it.",
  image: "/images/bjj_sub_neckcrank.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Often used to force an opponent to open their closed guard", "Tuck your chin hard to your chest to reduce the pressure", "Counter by pulling your opponent's elbows in and going for an armbar as they stand"],
  },
  {
  id: 32, name: "Electric chair", category: "Dark BJJ", difficulty: "Advanced",
  description: "The electric chair is a powerful stretching submission targeting the groin, hip, and inner thigh, applied from a modified half guard or deep half position. It is a signature technique of the 10th Planet system. The finish requires pulling the opponent's leg across their own body.",
  image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  keyPoints: ["Secure a deep underhook on the opponent's far leg from half guard", "Use your body like a lever — drive your hips forward and pull the leg back", "Maintain control of the near leg with your legs to prevent the opponent from posturing"],
  },

  // ▼▼▼ PASTE NEW TECHNIQUES BELOW THIS LINE ▼▼▼
  // Use the Admin panel → Export JSON to generate the correct format,
  // then paste the object here and assign the next id (13, 14, 15 …)
  // ▲▲▲ END OF TECHNIQUE LIST ▲▲▲
  // Template
  //{
  //id: 01, name: "nnn", category: "ccc", difficulty: "ddd",
  //description: "xxx",
  //image: "/images/bjj_underconstruction.jpg?w=600&q=80",
  //youtube: "https://www.youtube.com/channel/UC73abh10iBYDsSwRSpg6-eg",
  //keyPoints: ["kkk1", "kkk2", "kkk3"],
  //},
  //
];

const CONCEPTS = [
  { icon: "⚖️", title: "Positional Hierarchy", body: "BJJ ranks positions by dominance: back control → mount → knee-on-belly → side control → guard. The higher on the ladder, the more control and submission options you have." },
  { icon: "🔄", title: "The Guard", body: "Unique to BJJ — fighting effectively from your back. The guard is not defensive; it is an attacking platform. Developing a strong guard changed martial arts forever." },
  { icon: "🌊", title: "Flowing & Chaining", body: "Techniques are rarely isolated. A failed armbar should flow into a triangle; a blocked triangle feeds an omoplata. Train combinations, not just individual moves." },
  { icon: "🎯", title: "Base & Posture", body: "Before attacking, establish base (hips low, weight distributed) and posture (spine neutral). Neglecting these fundamentals is the fastest way to get submitted." },
  { icon: "⏱️", title: "Timing Over Force", body: "BJJ was designed so a smaller person can overcome a larger one. Timing, leverage, and technique consistently beat raw strength — especially over a long roll." },
  { icon: "🦺", title: "Tap Early, Tap Often", body: "Tapping is not failure — it's the mechanism that lets training continue safely. Pride in refusing to tap leads to injuries. The mats will always be there tomorrow." },
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CATS  = ["All", "Guards", "Submissions", "Transitions", "Takedowns", "Dark BJJ"];
const DIFFS = ["All", "Beginner", "Intermediate", "Advanced"];
// Nav order: Overview → Concepts → Techniques → About
const NAV   = ["Overview", "Concepts", "Techniques", "About"];

const CAT_COLORS  = { Guards: "#4cc9f0", Submissions: "#e85d04", Transitions: "#a29bfe", Takedowns: "#55efc4", "Dark BJJ": "#d63031" };
const DIFF_COLORS = { Beginner: "#2ecc71", Intermediate: "#f39c12", Advanced: "#e74c3c" };

const DEFAULT_IMAGE = "/images/bjj_underconstruction.jpg?w=600&q=80";

const JSON_TEMPLATE = `[
  {
    "name": "Butterfly Guard",
    "category": "Guards",
    "difficulty": "Intermediate",
    "description": "Seated guard with insteps hooked under opponent's thighs. A powerful sweeping platform used extensively in no-gi.",
    "image": "/images/bjj_underconstruction.jpg?w=600&q=80",
    "youtube": "https://www.youtube.com/watch?v=example",
    "keyPoints": [
      "Stay upright and active",
      "Hook lift is explosive",
      "Combine with underhook"
    ]
  }
]`;

// ─── ADMIN ────────────────────────────────────────────────────────────────────
// Change this password before deploying. It lives client-side, so it's
// casual protection — enough to keep regular users out of the Add panel.
const ADMIN_PASSWORD = "osss2026singapore";

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function SubmitologY() {
  const [page, setPage]         = useState("Overview");
  const [techniques, setTechs]  = useState(SEED_TECHNIQUES);
  const [cat, setCat]           = useState("All");
  const [diff, setDiff]         = useState("All");
  const [selected, setSelected] = useState(null);
  const [isAdmin, setIsAdmin]   = useState(false);
  const [showGate, setShowGate] = useState(false);

  const filtered = techniques.filter(p =>
    (cat  === "All" || p.category   === cat) &&
    (diff === "All" || p.difficulty === diff)
  );

  const handleImport = (newItems) => {
    const maxId = techniques.reduce((m, t) => Math.max(m, t.id || 0), 0);
    const stamped = newItems.map((t, i) => ({
      difficulty: "Beginner",
      image: DEFAULT_IMAGE,
      youtube: "",
      keyPoints: [],
      ...t,
      id: maxId + i + 1,
    }));
    setTechs(prev => [...prev, ...stamped]);
    setPage("Techniques");
  };

  // "+ Add" click — show gate if not yet authenticated
  const handleAddClick = () => {
    if (isAdmin) { setPage("Add"); }
    else         { setShowGate(true); }
  };

  const handleUnlock = () => {
    setIsAdmin(true);
    setShowGate(false);
    setPage("Add");
  };

  const handleLock = () => {
    setIsAdmin(false);
    if (page === "Add") setPage("Overview");
  };

  return (
    <div style={S.root}>
      <Grain />
      <nav style={S.nav}>
        <div style={S.navBrand} onClick={() => setPage("Overview")}>
          <span style={S.navLogo}>⬡</span>
          <span style={S.navTitle}>SubmitologY</span>
        </div>
        <div style={S.navLinks}>
          {NAV.map(n => (
            <button key={n} onClick={() => setPage(n)}
              style={{ ...S.navBtn, ...(page === n ? S.navActive : {}) }}>
              {n}
            </button>
          ))}
          {/* Admin controls */}
          {isAdmin
            ? <>
                <button onClick={handleAddClick}
                  style={{ ...S.navBtn, ...(page === "Add" ? S.navAddActive : S.navAdd) }}>
                  + Add
                </button>
                <button onClick={handleLock}
                  style={{ ...S.navBtn, ...S.navLockBtn }} title="Exit admin mode">
                  🔓 Admin
                </button>
              </>
            : <button onClick={handleAddClick} style={{ ...S.navBtn, ...S.navAdd }}>
                🔒 Admin
              </button>
          }
        </div>
      </nav>

      <main style={S.main}>
        {page === "Overview"   && <Overview   techniques={techniques} goTo={setPage} />}
        {page === "Concepts"   && <Concepts />}
        {page === "Techniques" && <Techniques filtered={filtered} cat={cat} setCat={setCat} diff={diff} setDiff={setDiff} onSelect={setSelected} />}
        {page === "About"      && <About />}
        {page === "Add"        && isAdmin && <AddTechniques onImport={handleImport} />}
      </main>

      {selected   && <Modal       pos={selected} onClose={() => setSelected(null)} />}
      {showGate   && <PasswordGate onUnlock={handleUnlock} onCancel={() => setShowGate(false)} />}
    </div>
  );
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────
function Overview({ techniques, goTo }) {
  return (
    <div style={S.overviewWrap}>
      <div style={S.hero}>
        <div style={S.heroTag}>Brazilian Jiu-Jitsu Knowledge Base</div>
        <h1 style={S.heroTitle}>The Art of<br /><span style={S.heroAccent}>Human Chess</span></h1>
        <p style={S.heroBody}>
          BJJ is a ground-based martial art built on leverage, timing, and positional strategy.
          A smaller practitioner can — and regularly does — defeat larger opponents using technique alone.
          This lab is your structured guide to positions, submissions, and concepts.
        </p>
        <div style={S.heroCtas}>
          <button style={S.ctaPrimary}   onClick={() => goTo("Techniques")}>Explore Techniques →</button>
          <button style={S.ctaSecondary} onClick={() => goTo("Concepts")}>Basic Concepts</button>
        </div>
      </div>

      <div style={S.statRow}>
        {[
          [String(techniques.length), "Techniques Indexed"],
          [String(CATS.length - 1),   "Categories"],
          ["3",                        "Difficulty Levels"],
          ["∞",                        "Combinations"],
        ].map(([n, l]) => (
          <div key={l} style={S.stat}>
            <span style={S.statNum}>{n}</span>
            <span style={S.statLabel}>{l}</span>
          </div>
        ))}
      </div>

      <div style={S.catGrid}>
        {CATS.slice(1).map(c => (
          <div key={c}
            style={{ ...S.catCard, borderColor: CAT_COLORS[c] + "33" }}
            onClick={() => goTo("Techniques")}
            onMouseEnter={e => e.currentTarget.style.borderColor = CAT_COLORS[c]}
            onMouseLeave={e => e.currentTarget.style.borderColor = CAT_COLORS[c] + "33"}>
            <span style={{ ...S.catDot, background: CAT_COLORS[c] }} />
            <span style={S.catName}>{c}</span>
            <span style={S.catCount}>{techniques.filter(p => p.category === c).length} techniques</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CONCEPTS ─────────────────────────────────────────────────────────────────
function Concepts() {
  return (
    <div>
      <div style={S.pageHeader}>
        <h2 style={S.pageTitle}>Basic Concepts</h2>
        <p style={S.pageSubtitle}>The mental models every BJJ practitioner should internalise from day one.</p>
      </div>
      <div style={S.conceptGrid}>
        {CONCEPTS.map(c => (
          <div key={c.title} style={S.conceptCard}>
            <div style={S.conceptIcon}>{c.icon}</div>
            <h3 style={S.conceptTitle}>{c.title}</h3>
            <p style={S.conceptBody}>{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TECHNIQUES ───────────────────────────────────────────────────────────────
function Techniques({ filtered, cat, setCat, diff, setDiff, onSelect }) {
  return (
    <div>
      <div style={S.filterBar}>
        <div style={S.filterGroup}>
          <span style={S.filterLabel}>Type</span>
          <div style={S.pills}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{ ...S.pill, ...(cat === c ? { ...S.pillActive, borderColor: CAT_COLORS[c] || "#e85d04", color: CAT_COLORS[c] || "#e85d04" } : {}) }}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div style={S.filterGroup}>
          <span style={S.filterLabel}>Level</span>
          <div style={S.pills}>
            {DIFFS.map(d => (
              <button key={d} onClick={() => setDiff(d)}
                style={{ ...S.pill, ...(diff === d ? { ...S.pillActive, borderColor: DIFF_COLORS[d] || "#e85d04", color: DIFF_COLORS[d] || "#e85d04" } : {}) }}>
                {d}
              </button>
            ))}
          </div>
        </div>
        <div style={S.filterCount}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</div>
      </div>
      <div style={S.grid}>
        {filtered.length === 0
          ? <div style={S.empty}>No techniques match these filters.</div>
          : filtered.map(p => <Card key={p.id} pos={p} onSelect={onSelect} />)}
      </div>
    </div>
  );
}

function Card({ pos, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ ...S.card, ...(hov ? S.cardHov : {}) }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => onSelect(pos)}>
      <div style={S.cardImgWrap}>
        <img src={pos.image || DEFAULT_IMAGE} alt={pos.name} style={S.cardImg} />
        <div style={S.cardImgOverlay} />
        <span style={{ ...S.badge, background: DIFF_COLORS[pos.difficulty] || "#888" }}>{pos.difficulty}</span>
      </div>
      <div style={S.cardBody}>
        <span style={{ ...S.cardCat, color: CAT_COLORS[pos.category] || "#e85d04" }}>{pos.category}</span>
        <h3 style={S.cardTitle}>{pos.name}</h3>
        <p style={S.cardDesc}>{pos.description.slice(0, 90)}…</p>
        <span style={S.cardCta}>Open →</span>
      </div>
    </div>
  );
}

// ─── ADD TECHNIQUES ───────────────────────────────────────────────────────────
function AddTechniques({ onImport }) {
  const [mode, setMode]     = useState("form");
  const [jsonText, setJson] = useState(JSON_TEMPLATE);
  const [jsonErr, setErr]   = useState("");
  const [done, setDone]     = useState(false);
  const [addedCount, setAddedCount] = useState(0);

  // Form state
  const blank = { name: "", category: "Guards", difficulty: "Beginner", description: "", image: "", youtube: "", kp1: "", kp2: "", kp3: "" };
  const [form, setForm]     = useState(blank);
  const [formErr, setFErr]  = useState("");

  const finishImport = (items) => {
    onImport(items);
    setAddedCount(items.length);
    setDone(true);
  };

  const handleJsonImport = () => {
    setErr("");
    try {
      const parsed = JSON.parse(jsonText);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      const bad = arr.filter(t => !t.name || !t.category || !t.description);
      if (bad.length) { setErr(`${bad.length} item(s) missing required fields: name, category, description.`); return; }
      finishImport(arr);
    } catch (e) { setErr("Invalid JSON — " + e.message); }
  };

  const handleFormImport = () => {
    setFErr("");
    if (!form.name.trim())        { setFErr("Name is required."); return; }
    if (!form.description.trim()) { setFErr("Description is required."); return; }
    const kps = [form.kp1, form.kp2, form.kp3].map(s => s.trim()).filter(Boolean);
    finishImport([{
      name: form.name.trim(),
      category: form.category,
      difficulty: form.difficulty,
      description: form.description.trim(),
      image: form.image.trim() || DEFAULT_IMAGE,
      youtube: form.youtube.trim(),
      keyPoints: kps,
    }]);
  };

  const F = (label, key, opts = {}) => (
    <div style={S.addField}>
      <label style={S.addLabel}>{label}</label>
      {opts.textarea
        ? <textarea value={form[key]} rows={3}
            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            style={{ ...S.addInput, resize: "vertical" }}
            placeholder={opts.ph || ""} />
        : opts.select
        ? <select value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={S.addInput}>
            {opts.options.map(o => <option key={o}>{o}</option>)}
          </select>
        : <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            style={S.addInput} placeholder={opts.ph || ""} />}
    </div>
  );

  // Build a clean exportable JSON string from the last imported items
  const buildExportJSON = () => {
    const obj = {
      name:        form.name.trim()        || "Untitled",
      category:    form.category,
      difficulty:  form.difficulty,
      description: form.description.trim(),
      image:       form.image.trim()       || DEFAULT_IMAGE,
      youtube:     form.youtube.trim()     || "",
      keyPoints:   [form.kp1, form.kp2, form.kp3].map(s => s.trim()).filter(Boolean),
    };
    return JSON.stringify(obj, null, 2);
  };

  const [copied, setCopied] = useState(false);
  const handleCopyExport = () => {
    const text = mode === "form" ? buildExportJSON() : jsonText;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (done) return (
    <div style={S.successBox}>
      <div style={{ fontSize: 44, marginBottom: 14 }}>✓</div>
      <h3 style={{ margin: "0 0 8px", fontSize: 22, letterSpacing: "-0.5px" }}>
        {addedCount} Technique{addedCount !== 1 ? "s" : ""} Added to Session
      </h3>
      <p style={{ color: "#666", fontSize: 14, marginBottom: 6, maxWidth: 420 }}>
        The library is updated for this session. To make it permanent, export the JSON and paste it into <code style={S.code}>SEED_TECHNIQUES</code> in the source file, then republish.
      </p>

      {/* Export box */}
      <div style={S.exportBox}>
        <div style={S.exportHeader}>
          <span style={S.addLabel}>📋 Export JSON — paste into SEED_TECHNIQUES</span>
          <button style={copied ? S.exportCopiedBtn : S.exportCopyBtn} onClick={handleCopyExport}>
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
        <pre style={S.exportPre}>{mode === "form" ? buildExportJSON() : jsonText}</pre>
        <p style={S.exportHint}>
          Assign the next sequential <code style={S.code}>id</code>, paste above the <code style={S.code}>▲▲▲ END OF TECHNIQUE LIST</code> marker, and republish.
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
        <button style={S.ctaPrimary} onClick={() => { setDone(false); setForm(blank); setJson(JSON_TEMPLATE); setCopied(false); }}>
          Add Another
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={S.pageHeader}>
        <h2 style={S.pageTitle}>Add Techniques</h2>
        <p style={S.pageSubtitle}>
          Extend the library with new entries. Use the <strong style={{ color: "#ede8df" }}>Form</strong> for one technique at a time,
          or paste a <strong style={{ color: "#ede8df" }}>JSON</strong> array to import many at once.
        </p>
      </div>

      {/* Mode tabs */}
      <div style={S.modeTabs}>
        {[["form", "📝  Form (single)"], ["json", "{ }  JSON (batch)"]].map(([m, lbl]) => (
          <button key={m} onClick={() => setMode(m)}
            style={{ ...S.modeTab, ...(mode === m ? S.modeTabActive : {}) }}>
            {lbl}
          </button>
        ))}
      </div>

      {/* ── FORM MODE ── */}
      {mode === "form" && (
        <div style={S.addCard}>
          <div style={S.addGrid2}>
            {F("Technique Name *", "name", { ph: "e.g. Butterfly Guard" })}
            {F("Category *", "category", { select: true, options: CATS.slice(1) })}
          </div>
          <div style={S.addGrid2}>
            {F("Difficulty", "difficulty", { select: true, options: DIFFS.slice(1) })}
            {F("Image URL", "image", { ph: "https://… (leave blank for default)" })}
          </div>
          {F("Description *", "description", { textarea: true, ph: "Describe the position, its purpose, and when it's used." })}
          {F("YouTube URL", "youtube", { ph: "https://www.youtube.com/watch?v=…" })}

          <div style={{ ...S.addDivider, margin: "20px 0 14px" }} />
          <div style={S.addLabel}>Key Points (up to 3 — optional)</div>
          <div style={S.addGrid3}>
            {F("Point 1", "kp1", { ph: "e.g. Break posture first" })}
            {F("Point 2", "kp2", { ph: "e.g. Control the sleeve" })}
            {F("Point 3", "kp3", { ph: "e.g. Hip angle matters" })}
          </div>
          {formErr && <div style={S.errBox}>{formErr}</div>}
          <button style={{ ...S.ctaPrimary, marginTop: 22 }} onClick={handleFormImport}>Add to Library →</button>
        </div>
      )}

      {/* ── JSON MODE ── */}
      {mode === "json" && (
        <div style={S.addCard}>
          <div style={{ marginBottom: 14 }}>
            <p style={{ ...S.addLabel, textTransform: "none", letterSpacing: 0, color: "#888", fontSize: 13, margin: "0 0 6px" }}>
              Paste a JSON array. Each object needs at minimum{" "}
              <code style={S.code}>name</code>, <code style={S.code}>category</code>, <code style={S.code}>description</code>.
            </p>
            <p style={{ ...S.addLabel, textTransform: "none", letterSpacing: 0, color: "#555", fontSize: 11, margin: 0 }}>
              Categories: {CATS.slice(1).join(" · ")} &nbsp;|&nbsp; Difficulty: {DIFFS.slice(1).join(" · ")}
            </p>
          </div>
          <textarea
            value={jsonText}
            onChange={e => { setJson(e.target.value); setErr(""); }}
            style={S.jsonArea}
            spellCheck={false}
          />
          {jsonErr && <div style={S.errBox}>{jsonErr}</div>}
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            <button style={S.ctaPrimary}   onClick={handleJsonImport}>Import JSON →</button>
            <button style={S.ctaSecondary} onClick={() => { setJson(JSON_TEMPLATE); setErr(""); }}>Reset Template</button>
          </div>

          <div style={{ ...S.addDivider, margin: "28px 0 18px" }} />
          <div style={S.addLabel}>Full Field Reference</div>
          <pre style={S.schemaBox}>{`{
  "name":        string           ← required
  "category":    "Guards" | "Submissions" | "Transitions"
                 "Takedowns" | "Dark BJJ"   ← required
  "description": string           ← required
  "difficulty":  "Beginner" | "Intermediate" | "Advanced"
                                  ← default: "Beginner"
  "image":       string (URL)     ← optional
  "youtube":     string (URL)     ← optional
  "keyPoints":   string[]         ← optional, ≤ 3 items
}`}</pre>
        </div>
      )}
    </div>
  );
}

// ─── PASSWORD GATE ────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock, onCancel }) {
  const [pw, setPw]       = useState("");
  const [err, setErr]     = useState("");
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (pw === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setErr("Incorrect password.");
      setPw("");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") attempt();
    if (e.key === "Escape") onCancel();
  };

  return (
    <div style={S.overlay} onClick={onCancel}>
      <div
        style={{ ...S.gateBox, ...(shake ? S.gateShake : {}) }}
        onClick={e => e.stopPropagation()}
      >
        <div style={S.gateLock}>🔒</div>
        <h3 style={S.gateTitle}>Admin Access</h3>
        <p style={S.gateSub}>Enter the admin password to manage techniques.</p>
        <input
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setErr(""); }}
          onKeyDown={handleKey}
          placeholder="Password"
          autoFocus
          style={{ ...S.addInput, marginBottom: 6, fontSize: 14, letterSpacing: "0.1em" }}
        />
        {err && <div style={{ ...S.errBox, marginBottom: 10 }}>{err}</div>}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button style={S.ctaPrimary}   onClick={attempt}>Unlock →</button>
          <button style={S.ctaSecondary} onClick={onCancel}>Cancel</button>
        </div>
        <p style={S.gateHint}>
          Hint: the default password is <code style={S.code}>osss2024</code>.
          Change <code style={S.code}>ADMIN_PASSWORD</code> in the source before deploying.
        </p>
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <div>
      <div style={S.pageHeader}>
        <h2 style={S.pageTitle}>About SubmitologY</h2>
      </div>
      <div style={S.aboutCard}>
        <p style={S.aboutBody}>
          SubmitologY is a structured BJJ knowledge base built to help practitioners of all levels explore positions, submissions, transitions, and takedowns in an organised, visual way.
        </p>
        <p style={S.aboutBody}>
          Each technique entry includes a description, coaching key points, difficulty rating, and a link to external video resources. 
        </p>
        <div style={S.addDivider} />
        <h3 style={S.aboutSub}>Categories Explained</h3>
        {CATS.slice(1).map(c => (
          <div key={c} style={S.aboutCatRow}>
            <span style={{ ...S.catDot, background: CAT_COLORS[c], flexShrink: 0, marginTop: 3 }} />
            <div>
              <strong style={{ color: CAT_COLORS[c] }}>{c}</strong>
              <span style={{ color: "#777", marginLeft: 10, fontSize: 13 }}>
                {{ Guards: "Bottom positions to control, sweep, or submit.", Submissions: "Force a tap via joint locks or chokes.", Transitions: "Movement between positions — where grappling really lives.", Takedowns: "Getting the fight to the ground on your terms.", "Dark BJJ": "High-risk techniques — study carefully, apply with control." }[c]}
              </span>
            </div>
          </div>
        ))}
        <div style={S.addDivider} />
        <p style={{ ...S.aboutBody, color: "#444", fontSize: 12 }}>
          Built with React · Images via Unsplash · Video links via YouTube
        </p>
      </div>
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ pos, onClose }) {
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <button style={S.closeBtn} onClick={onClose}>✕</button>
        <div style={S.modalImgWrap}>
          <img src={pos.image || DEFAULT_IMAGE} alt={pos.name} style={S.modalImg} />
          <div style={S.modalImgGrad} />
          <div style={S.modalImgMeta}>
            <span style={{ ...S.cardCat, color: CAT_COLORS[pos.category] || "#e85d04", fontSize: 10 }}>{pos.category}</span>
            <h2 style={S.modalTitle}>{pos.name}</h2>
            <span style={{ ...S.badge, background: DIFF_COLORS[pos.difficulty] || "#888", position: "static" }}>{pos.difficulty}</span>
          </div>
        </div>
        <div style={S.modalBody}>
          <p style={S.modalDesc}>{pos.description}</p>
          {pos.keyPoints?.length > 0 && (
            <div style={S.kpBox}>
              <div style={S.kpHead}>Key Points</div>
              {pos.keyPoints.map((kp, i) => (
                <div key={i} style={S.kpRow}>
                  <span style={{ ...S.catDot, background: CAT_COLORS[pos.category] || "#e85d04" }} />
                  {kp}
                </div>
              ))}
            </div>
          )}
          {pos.youtube && (
            <a href={pos.youtube} target="_blank" rel="noopener noreferrer" style={S.ytBtn}>▶ Watch on YouTube</a>
          )}
        </div>
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

  // NAV
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

  // PASSWORD GATE
  gateBox: { background: "#141414", border: "1px solid #2a2a2a", borderRadius: 12, padding: "36px 32px", maxWidth: 360, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  gateLock: { fontSize: 36, marginBottom: 12 },
  gateTitle: { fontSize: 20, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.4px" },
  gateSub: { fontSize: 13, color: "#666", margin: "0 0 20px", lineHeight: 1.5 },
  gateHint: { fontSize: 11, color: "#444", marginTop: 18, lineHeight: 1.6, fontFamily: "monospace" },

  main: { position: "relative", zIndex: 1, padding: "40px 32px 80px", maxWidth: 1100, margin: "0 auto" },

  // OVERVIEW
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

  // FILTER
  filterBar: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: "15px 18px", marginBottom: 22, display: "flex", flexDirection: "column", gap: 11 },
  filterGroup: { display: "flex", alignItems: "center", gap: 11, flexWrap: "wrap" },
  filterLabel: { fontFamily: "monospace", fontSize: 10, letterSpacing: "0.12em", color: "#555", textTransform: "uppercase", minWidth: 30 },
  pills: { display: "flex", gap: 5, flexWrap: "wrap" },
  pill: { background: "none", border: "1px solid #222", color: "#666", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontFamily: "monospace", cursor: "pointer", transition: "all 0.15s" },
  pillActive: { background: "rgba(232,93,4,0.07)" },
  filterCount: { fontFamily: "monospace", fontSize: 11, color: "#444", marginLeft: "auto" },

  // GRID / CARD
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

  // CONCEPTS
  pageHeader: { marginBottom: 30 },
  pageTitle: { fontSize: 32, fontWeight: 700, letterSpacing: "-1px", margin: "0 0 8px" },
  pageSubtitle: { color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0 },
  conceptGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 13 },
  conceptCard: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: "20px" },
  conceptIcon: { fontSize: 24, marginBottom: 9 },
  conceptTitle: { fontSize: 14, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.2px" },
  conceptBody: { fontSize: 12, color: "#888", lineHeight: 1.7, margin: 0 },

  // ABOUT
  aboutCard: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: "26px 30px", maxWidth: 660 },
  aboutBody: { fontSize: 14, color: "#999", lineHeight: 1.85, margin: "0 0 13px" },
  aboutSub: { fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em", color: "#555", textTransform: "uppercase", margin: "0 0 13px", fontWeight: 400 },
  aboutCatRow: { display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, fontSize: 13 },

  // ADD TECHNIQUES
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
  schemaBox: { background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 6, color: "#666", fontFamily: "monospace", fontSize: 11, lineHeight: 1.75, padding: "13px 15px", margin: "10px 0 0", overflowX: "auto", whiteSpace: "pre" },
  code: { background: "#1a1a1a", color: "#4cc9f0", padding: "1px 5px", borderRadius: 3, fontSize: 11 },
  successBox: { textAlign: "center", padding: "60px 20px" },
  exportBox: { background: "#0d0d0d", border: "1px solid #252525", borderRadius: 8, padding: "16px 18px", marginTop: 22, maxWidth: 580, width: "100%", textAlign: "left" },
  exportHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  exportPre: { color: "#a8d8a8", fontFamily: "monospace", fontSize: 11, lineHeight: 1.65, margin: 0, overflowX: "auto", whiteSpace: "pre" },
  exportHint: { fontSize: 11, color: "#555", fontFamily: "monospace", marginTop: 12, marginBottom: 0, lineHeight: 1.6 },
  exportCopyBtn: { background: "#1a1a1a", border: "1px solid #333", color: "#aaa", fontSize: 11, fontFamily: "monospace", padding: "4px 12px", borderRadius: 4, cursor: "pointer" },
  exportCopiedBtn: { background: "rgba(46,204,113,0.15)", border: "1px solid #2ecc71", color: "#2ecc71", fontSize: 11, fontFamily: "monospace", padding: "4px 12px", borderRadius: 4, cursor: "pointer" },

  // MODAL
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
