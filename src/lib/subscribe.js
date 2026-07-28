// ─── lib/subscribe.js — launch-list signup ──────────────────────────────────
//
// One function, one job: hand an email address to whichever list provider you
// end up using. The provider is a build-time environment variable rather than
// a hard-coded URL, so switching from one to another is an .env edit and a
// redeploy — no code change, no new dependency, no API key in the bundle.
//
// SETTING IT UP
//
//   1. Create a list with any provider that accepts a plain form POST from a
//      browser. Ones that do, with no server of your own:
//
//        Buttondown     https://buttondown.email/api/emails/embed
//                       (field name: `email`)
//        Formspree      https://formspree.io/f/<your-id>
//        EmailOctopus   the form action URL from your list's embed snippet
//        Sender / Kit   see their docs; both accept cross-origin form posts
//
//      ⚠️  NOT Mailchimp, at least not directly. Its embedded-form endpoint
//      (`/subscribe/post`) returns no `Access-Control-Allow-Origin` header, so
//      the browser blocks the response and this function reports a network
//      failure even when the address was accepted. Using Mailchimp means one
//      of: their `post-json` endpoint via a JSONP script tag, a serverless
//      function of your own proxying the request, or their hosted form page
//      instead of this one. If you want Mailchimp specifically, say so and
//      wire the proxy — don't point ENDPOINT at `/subscribe/post` and hope.
//
//   2. Put the endpoint in `.env.local` (never commit it — it's gitignored):
//
//        REACT_APP_SIGNUP_ENDPOINT=https://buttondown.email/api/emails/embed
//        REACT_APP_SIGNUP_FIELD=email
//
//   3. Set the same two variables in your host's build settings.
//
//   4. Send yourself a test address and confirm it lands in the list.
//
// WHY NOT JSON: form-encoded bodies are what these endpoints expect, and they
// avoid the CORS preflight that an `application/json` content type triggers —
// several of these providers don't answer preflight requests.
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
      headers: { Accept: "application/json" },
      mode: "cors",
    });
    return res.ok ? { ok: true } : { ok: false, reason: "rejected" };
  } catch {
    return { ok: false, reason: "network" };
  }
}
