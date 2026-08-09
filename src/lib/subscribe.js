// ─── lib/subscribe.js — launch-notification signup ──────────────────────────
//
// One function, one job: hand a visitor's email address to a form-to-inbox
// service, which forwards it to SubmitologY's mailbox. The endpoint is a
// build-time environment variable rather than a hard-coded URL, so switching
// providers — or moving to a real mailing list later — is an .env edit and a
// redeploy: no code change, no new dependency, no API key in the bundle.
//
// WHAT THIS IS, AND WHAT IT ISN'T
//
//   This collects addresses. It does not send anything to the visitor — no
//   confirmation, no welcome note, no double opt-in. Each signup arrives as an
//   email in our inbox and that is the whole mechanism. The copy in
//   i18n-additions.js and the privacy policy in data/legal.js are both written
//   to exactly that, and must stay written to it.
//
//   ⚠️  The recipient address is configured in the provider's dashboard, never
//   here. Anything in a REACT_APP_* variable is compiled into the public
//   JavaScript bundle, so putting a real mailbox in one publishes it to every
//   scraper on the web. The form id below is opaque and safe to expose; the
//   address it points at is not stored in this repository at all.
//
// SETTING IT UP  (Formspree — https://formspree.io)
//
//   1. Create a form and set its recipient to the SubmitologY mailbox.
//      Formspree sends that address a verification email; click the link, or
//      no submissions are delivered.
//
//   2. Turn reCAPTCHA OFF in the form's settings. AJAX submissions require
//      either that or your own reCAPTCHA key — and reCAPTCHA is a Google
//      third-party request, which would falsify the privacy policy's claim
//      that this site loads no third-party trackers. The honeypot field in
//      components/Footer.jsx covers bots instead.
//
//   3. Copy the form id and put the endpoint in `.env.local`, which is
//      gitignored (see .env.example):
//
//        REACT_APP_SIGNUP_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
//        REACT_APP_SIGNUP_FIELD=email
//
//   4. Set the same two variables in the host's build settings. A variable
//      that exists locally and not on the host produces a site that works in
//      development and silently reports "not connected" in production.
//
//   5. Send a test address through the deployed form and confirm it arrives.
//
// OTHER PROVIDERS
//
//   Formspark (https://submit-form.com/<id>) works the same way but expects a
//   JSON body, so it needs the fetch below changed as well as the variable.
//
//   If SubmitologY later wants confirmations, unsubscribe links and a single
//   send to everyone at launch, that is a mailing list rather than a form —
//   Buttondown (https://buttondown.com/api/emails/embed-subscribe/USERNAME) or
//   EmailOctopus. Both accept the same form-encoded post this function already
//   makes, but both change what the visitor experiences, so the signup copy
//   and the privacy policy have to change with them.
//
//   NOT Mailchimp directly: its embedded-form endpoint returns no
//   `Access-Control-Allow-Origin` header, so the browser blocks the response
//   and this function reports a network failure even when the address was
//   accepted. Mailchimp needs a JSONP call, a serverless proxy of your own, or
//   their hosted form page instead of this one.
//
// WHY NOT JSON: form-encoded bodies are what these endpoints expect, and they
// avoid the CORS preflight that an `application/json` content type triggers —
// several providers don't answer preflight requests.
//
// If no endpoint is configured the form fails loudly rather than pretending to
// work. Silently dropping signups is the worst of the three options; telling a
// visitor it worked when it didn't is the second worst.

const ENDPOINT = process.env.REACT_APP_SIGNUP_ENDPOINT;
const FIELD = process.env.REACT_APP_SIGNUP_FIELD || "email";

export const SIGNUP_CONFIGURED = Boolean(ENDPOINT);

if (!SIGNUP_CONFIGURED && typeof console !== "undefined") {
  console.warn(
    "[SubmitologY] REACT_APP_SIGNUP_ENDPOINT is not set — the launch signup " +
    "form will report an error instead of collecting addresses. " +
    "See src/lib/subscribe.js."
  );
}

/**
 * @returns {Promise<{ok: true} | {ok: false, reason: "unconfigured"|"network"|"rejected"}>}
 *   Never throws: the caller is a footer form, and an unhandled rejection there
 *   would take out the error boundary for the whole page.
 */
export async function subscribe(email) {
  if (!SIGNUP_CONFIGURED) return { ok: false, reason: "unconfigured" };

  const body = new URLSearchParams();
  body.set(FIELD, email);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      body,
      // Without this, Formspree answers a browser post with a redirect to its
      // own thank-you page rather than the JSON this function reads.
      headers: { Accept: "application/json" },
      mode: "cors",
    });
    return res.ok ? { ok: true } : { ok: false, reason: "rejected" };
  } catch {
    return { ok: false, reason: "network" };
  }
}
