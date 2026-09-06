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
// 3. The privacy policy describes contact as it currently works: the footer
//    and the contact page are plain mailto: links to our own inbox, nothing
//    is collected or stored by the site, and no list exists to be added to.
//    If that ever changes — a signup form, a mailing list, analytics — the
//    wording here has to change with it, and so does the copy in
//    i18n-additions.js (footer.contactTitle / contactBody). A policy that
//    describes a process you don't follow is worse than no policy, because
//    it is a written claim you are failing to meet.
//
// 4. If the site starts doing something new — analytics, a payment processor,
//    shipping, accounts, a cookie banner — the privacy policy has to change
//    with it. The current draft says there are no third-party trackers,
//    and that is only true while it stays true.
//
// Kept in English only, like the technique content. The UI chrome around
// these pages stays translated.

export const BUSINESS = {
  legalName: "Registered business name — to be announced",
  uen:       "to be announced",
  address:   "to be announced",
  general:   "submitology@proton.me",
  privacy:   "submitology@proton.me",
  instagram:    "@submitology.sg",
  instagramUrl: "https://www.instagram.com/submitology.sg/",
  // Generated from instagramUrl (not uploaded artwork) — regenerate if the
  // handle ever changes. Verified to decode back to the URL above.
  instagramQr:  `${process.env.PUBLIC_URL}/social/instagram-qr.png`,
};

export const LAST_UPDATED = "6 September 2026";

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
        ["Instagram", BUSINESS.instagram, BUSINESS.instagramQr],
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
      { p: "Nothing, by default. This site has no signup form, no accounts and no checkout. Nothing on this site asks for your name, address, phone number or payment details, because nothing on this site sells anything yet." },
      { p: "We do not run analytics, advertising pixels, session recording or third-party tracking of any kind. Fonts are served from this site rather than a font CDN, so loading a page doesn't announce your visit to anyone else. Our host records standard server logs, including IP addresses, for security and reliability." },

      { h: "What stays on your device" },
      { p: "The site keeps a few preferences in your browser's local storage. This never leaves your device and we can't read it:" },
      { ul: [
        "Your chosen language",
        "Whether you've dismissed the mission banner",
        "Which techniques you've marked as drilled on the technique map",
        "Your answers in the strength & conditioning builder",
        "Which release notes you've already seen",
      ]},
      { p: "Clearing your browser data for this site erases all of it. We use no cookies." },

      { h: "If you email us" },
      { p: `The "contact us" links in the footer and on the Contact page are plain mailto: links to ${BUSINESS.general}. Clicking one opens your own email application — nothing about that message passes through this website or any third-party form or mailing-list service, and we don't see or store anything until you actually hit send.` },
      { p: "We use whatever you send only to reply to you and to run SubmitologY. We won't sell, rent or trade your address, and we don't add it to any list — there isn't one." },
      { p: "We keep the correspondence for as long as is reasonably necessary to deal with it, or until you ask us to delete it, whichever comes first." },
      { p: "If that ever changes — if we add a signup form or a mailing list with confirmations and unsubscribe links — this page will say so before it happens." },

      { h: "Your rights" },
      { p: "You can ask us to tell you what we hold about you, correct it, or delete it. Write to us directly:" },
      { dl: [["Data Protection Officer", BUSINESS.privacy]] },
      { p: "We'll respond within 30 days." },

      { h: "Security" },
      { p: "The site is served over HTTPS. A message you email us is only as secure as email generally is — we don't control how it travels to us — but the mailbox that receives it is protected by a strong password and two-factor authentication. No system is perfect, and we won't pretend otherwise — if a breach ever affects you, we'll notify you and the PDPC as the PDPA requires." },

      { h: "Children" },
      { p: "This site isn't aimed at children under 13, and we don't knowingly collect their data. If you believe a child has emailed us personal data, write to us and we'll remove it." },

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
