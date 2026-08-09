# Connecting the "Notify me" form

The code is done. What's left is about ten minutes in a browser, none of it in
this repository.

## 1. Create the form

1. Sign up at <https://formspree.io> and create a new form. Call it something
   like `SubmitologY launch list`.
2. Set the recipient to **christophe.bouquet68@gmail.com**.
3. Formspree emails that address a verification link. **Click it.** Until you
   do, submissions are accepted and never delivered, which looks exactly like
   the form working.
4. In the form's settings, turn **reCAPTCHA off**. AJAX submissions need either
   that or your own reCAPTCHA key, and reCAPTCHA is a Google request that would
   contradict the privacy policy's claim that this site loads no third-party
   trackers. The honeypot field in `components/Footer.jsx` handles bots.
5. Copy the form id from the endpoint Formspree shows you — the part after
   `/f/` in `https://formspree.io/f/xxxxxxxx`.

The recipient address lives only in Formspree's dashboard. It is not in this
repo, not in `.env.local`, and not in the compiled JavaScript, so it can be
changed later — to a `@submitology.com` mailbox, say — without touching code
or redeploying.

## 2. Configure locally

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```
REACT_APP_SIGNUP_ENDPOINT=https://formspree.io/f/xxxxxxxx
REACT_APP_SIGNUP_FIELD=email
```

`.env.local` is gitignored. `.env.example` is committed and must never contain
the real id.

## 3. Configure the host

Set the same two variables in the build settings of wherever the site is
deployed (Netlify: Site settings → Environment variables; Vercel: Settings →
Environment Variables; Cloudflare Pages: Settings → Environment variables).

Environment variables are read **at build time**, not at run time, so adding
them requires a redeploy before they take effect. A variable set locally but
not on the host produces a site that works in development and reports "not
connected" in production — which is the one failure mode that is easy to miss,
because you would never see it yourself.

## 4. Test it

Send an address through the **deployed** form, not just the dev server, and
confirm it lands in the inbox. Then check the three failure paths render
sensibly: they're distinct messages, so whatever goes wrong tells you which
thing to fix.

## Before you take money

Two things in `src/data/legal.js` still need you:

- `{{Formspree — name whichever service you actually connect}}` in the privacy
  policy. Name it once it's chosen.
- `{{privacy@submitology.com}}` is the published Data Protection Officer
  contact. That's a separate role from the signup mailbox, and the PDPA
  requires a designated DPO with a published contact — but pointing it at a
  working address you actually read matters more than pointing it at a tidy
  one that doesn't exist yet.

`grep -n "{{" src/data/legal.js` lists all twelve remaining blanks. These
drafts still need review by someone qualified in Singapore law before the brand
takes money.

## If you later want a real mailing list

Nothing here is a dead end. Switching to Buttondown or EmailOctopus is the same
two environment variables pointed somewhere else — `subscribe.js` already sends
the form-encoded body they expect. What changes is the visitor's experience
(they'd get a confirmation, and an unsubscribe link in every message), so the
signup copy in `i18n-additions.js` and the privacy policy have to be updated in
the same change. `subscribe.js` has the endpoints and the Mailchimp caveat in
its header comment.
