// ─── data/legal.js — contact, privacy and terms copy ────────────────────────
//
// ⚠️  READ BEFORE LAUNCH
//
// 1. These are drafts written to fit this specific site — what it actually
//    collects, what it actually offers — not generic boilerplate. They are
//    still not legal advice. Have them reviewed by someone qualified in
//    Singapore law before you take money from anyone.
//
// 2. Every {{double-braced}} span is a blank you must fill in. They render on
//    the page in orange with a dashed underline precisely so an unfilled one
//    is impossible to miss. `grep -n "{{" src/data/legal.js` lists them all.
//
// 3. The privacy policy states that you use **double opt-in** and that
//    subscribers get a confirmation, a welcome note and one launch email.
//    Turn double opt-in on in your provider's settings, or change the wording.
//    A policy that describes a process you don't follow is worse than no
//    policy, because it is a written claim you are failing to meet.
//
// 4. If the site starts doing something new — analytics, a payment processor,
//    shipping, accounts, a cookie banner — the privacy policy has to change
//    with it. The current draft says there are no third-party trackers,
//    and that is only true while it stays true.
//
// Kept in English only, like the technique content. The UI chrome around
// these pages stays translated.

export const BUSINESS = {
  legalName: "{{Registered business name — e.g. SubmitologY Pte. Ltd.}}",
  uen:       "{{UEN / business registration number}}",
  address:   "{{Registered address, including postcode}}",
  general:   "{{hello@submitology.com}}",
  privacy:   "{{privacy@submitology.com}}",
  instagram: "{{@submitology}}",
};

export const LAST_UPDATED = "{{Date you publish this — e.g. 1 August 2026}}";

/* Block types the Legal page knows how to render:
     { h: "Heading" }
     { p: "Paragraph" }
     { ul: ["item", "item"] }
     { dl: [["Label", "Value"]] }
     { note: "Callout — used for the things people must not miss" }        */

export const DOCS = {

  /* ══ CONTACT ═══════════════════════════════════════════════════════════ */
  contact: {
    tag: "Get in touch",
    title: "Contact",
    sub: "A real person reads these. Pre-launch, that person is usually one of us on a phone between rounds.",
    blocks: [
      { dl: [
        ["General & wholesale", BUSINESS.general],
        ["Privacy & data requests", BUSINESS.privacy],
        ["Instagram", BUSINESS.instagram],
      ]},
      { p: "We aim to reply within {{2}} working days. We're in Singapore (GMT+8), so replies land on your morning if you're in Europe or the Americas." },

      { h: "Business details" },
      { dl: [
        ["Registered name", BUSINESS.legalName],
        ["UEN", BUSINESS.uen],
        ["Registered address", BUSINESS.address],
      ]},

      { h: "What we can't help with" },
      { p: "We aren't a gym and we don't teach. If you're looking for somewhere to train, ask at the nearest academy and go to a beginner class — that beats anything we could tell you by email." },
      { p: "We also can't give medical, physiotherapy or mental health advice. The mission pages exist to point at the subject, not to substitute for care." },
    ],
  },

  /* ══ PRIVACY ═══════════════════════════════════════════════════════════ */
  privacy: {
    tag: "Legal",
    title: "Privacy Policy",
    sub: "How SubmitologY handles personal data, written to the Personal Data Protection Act 2012 (PDPA).",
    blocks: [
      { p: `This policy explains what ${BUSINESS.legalName} ("SubmitologY", "we") collects through this website, why, and what you can ask us to do about it. It applies to this site only.` },

      { h: "What we collect" },
      { p: "One thing, and only if you hand it over: the email address you enter into the launch-notification form. Nothing on this site asks for your name, address, phone number or payment details, because nothing on this site sells anything yet." },
      { p: "We do not run analytics, advertising pixels, session recording or third-party tracking of any kind. Fonts are served from this site rather than a font CDN, so loading a page doesn't announce your visit to anyone else. Our host records standard server logs, including IP addresses, for security and reliability." },

      { h: "What stays on your device" },
      { p: "The site keeps a few preferences in your browser's local storage. This never leaves your device and we can't read it:" },
      { ul: [
        "Your chosen language",
        "Whether you've dismissed the mission banner",
        "Which techniques you've marked as drilled on the technique map",
        "Your answers in the strength & conditioning builder",
        "Which release notes you've already seen",
        "Whether you've already joined the launch list",
      ]},
      { p: "Clearing your browser data for this site erases all of it. We use no cookies." },

      { h: "Why we collect your email, and your consent" },
      { p: "To tell you when the first collection is available. You will receive a confirmation request, a short welcome note, and one launch email. That is the entire purpose." },
      { p: "We use double opt-in: submitting the form asks us to email you, and clicking the link in that email is your consent under the PDPA. An address that is never confirmed is never added to the list. We will ask for fresh consent before using your address for anything beyond the above." },
      { p: "We won't sell, rent or trade your address." },

      { h: "Who else sees it" },
      { p: "Our email service provider, {{name your provider once you pick one — e.g. Mailchimp, Buttondown}}, stores the list and sends the mail on our behalf. They may process it outside Singapore; we require protection comparable to the PDPA. We disclose data to no one else unless the law requires it." },

      { h: "How long we keep it" },
      { p: "Until you unsubscribe or ask us to delete it, or until {{24}} months after the launch email goes out, whichever comes first." },

      { h: "Your rights" },
      { p: "You can ask us to tell you what we hold about you, correct it, delete it, or withdraw your consent entirely. Every marketing email carries an unsubscribe link, and you can write to us directly at any time:" },
      { dl: [["Data Protection Officer", BUSINESS.privacy]] },
      { p: "We'll respond within 30 days. Withdrawing consent means we stop emailing you; it doesn't undo mail already sent." },

      { h: "Security" },
      { p: "The site is served over HTTPS and the list lives with a provider that offers encryption in transit and at rest. No system is perfect, and we won't pretend otherwise — if a breach ever affects you, we'll notify you and the PDPC as the PDPA requires." },

      { h: "Children" },
      { p: "This site isn't aimed at children under 13, and we don't knowingly collect their data. If you believe a child has given us an email address, write to us and we'll remove it." },

      { h: "Changes" },
      { p: `We'll update this page when our practices change and move the date at the top. Last updated ${LAST_UPDATED}.` },
    ],
  },

  /* ══ TERMS ═════════════════════════════════════════════════════════════ */
  terms: {
    tag: "Legal",
    title: "Terms of Use",
    sub: "The terms you're agreeing to by using this site.",
    blocks: [
      { p: `This site is operated by ${BUSINESS.legalName}. Using it means you accept these terms. If you don't, please stop using it.` },

      { h: "Training content is not instruction" },
      { note: "Brazilian Jiu-Jitsu is a contact sport. The technique map, the concepts pages and the strength & conditioning builder are reference material, not coaching, and they cannot see you." },
      { p: "Nothing here substitutes for a qualified instructor in a supervised setting. Don't attempt techniques from a diagram. Get medical clearance before starting any training or conditioning programme, particularly if you're pregnant, recovering from injury, or managing a heart, joint or blood-pressure condition." },
      { p: "The programme builder produces general suggestions from three inputs. It knows nothing about your injury history, and it is not physiotherapy. You train at your own risk." },

      { h: "Mental health content is not care" },
      { p: "Our mission pages discuss mental health because it's the reason this brand exists. They are not diagnosis, therapy, or a treatment plan, and no product we sell treats any condition." },
      { note: "If you are in crisis in Singapore: Samaritans of Singapore (SOS) runs a 24-hour hotline on 1767 and a 24-hour WhatsApp CareText on 9151 1767. The Institute of Mental Health helpline is 6389 2222. For an immediate medical emergency, call 995. Outside Singapore, contact your local emergency number or a local crisis line." },

      { h: "Nothing is for sale yet" },
      { p: "The shop is a preview of a planned collection. Prices, specifications and availability are indicative, may change, and are not an offer to sell. No order can be placed and no payment can be taken through this site. Terms of sale, shipping and returns will be published before that changes." },
      { p: "Our pledge to give 1% of profits to mental health causes is a commitment we intend to honour from launch, not a claim about donations already made." },

      { h: "What's ours" },
      { p: "The SubmitologY name, logo, written content, technique data and design of this site belong to us. Read it, quote it with credit, link to it freely. Don't republish it wholesale or use our branding on merchandise." },
      { p: "Brazilian Jiu-Jitsu technique names are the common property of the sport and we claim nothing over them." },

      { h: "Fair use of the site" },
      { p: "Don't try to break, overload, scrape wholesale, or gain unauthorised access to the site, and don't use it for anything unlawful." },

      { h: "Accuracy and availability" },
      { p: "We try to keep the content correct and the site up, but we promise neither. Technique data is a simplified model of a deep sport, and reasonable practitioners disagree about much of it. We may change or remove anything here without notice." },

      { h: "Liability" },
      { p: "To the extent the law allows, we're not liable for injury, loss or damage arising from your use of this site or anything you do based on its content. Nothing in these terms limits liability that can't legally be limited." },

      { h: "Links elsewhere" },
      { p: "Where we link to other sites, we don't control them and aren't responsible for what's on them." },

      { h: "Governing law" },
      { p: "These terms are governed by the laws of Singapore, and the Singapore courts have exclusive jurisdiction over any dispute." },

      { h: "Changes" },
      { p: `We may revise these terms; the current version always lives at this address. Last updated ${LAST_UPDATED}. Questions go to ${BUSINESS.general}.` },
    ],
  },
};
