import { useState } from "react";
import { T, t } from "../i18n";
import { DESTINATIONS, LEGAL_LINKS, ROUTES } from "../router";
import usePersistentState from "../hooks/usePersistentState";
import { subscribe } from "../lib/subscribe";

const LOGO = `${process.env.PUBLIC_URL}/logo512.png`;

/** The footer is the site's safety net: every section appears here as a plain
 *  link, so no destination depends on someone finding the right dropdown. */
export default function Footer({ lang, navigate }) {
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");            // honeypot — see the form
  const [status, setStatus] = useState("idle");    // idle | sending | done | error
  const [error, setError] = useState(null);        // network | rejected | unconfigured
  const [subscribed, setSubscribed] = usePersistentState("subscribed", false);

  const trainItems = DESTINATIONS.filter((d) => d.group === "train");
  const brandItems = [
    ...DESTINATIONS.filter((d) => d.group === "shop"),
    ...DESTINATIONS.filter((d) => d.group === "mission"),
    ...DESTINATIONS.filter((d) => d.group === "about"),
  ];

  const link = (key, to) => (
    <li key={key}>
      <a className="footer__link" href={"#" + to}
         onClick={(e) => { e.preventDefault(); navigate(to); }}>
        {t(T.ui.sections[key].name, lang)}
      </a>
    </li>
  );

  const submit = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || status === "sending") return;

    // A bot that fills every field trips the honeypot. Report success and post
    // nothing: telling it which check it failed just helps it get past next
    // time, and a real person never sees this branch.
    if (trap) { setStatus("done"); setEmail(""); return; }

    setStatus("sending");
    setError(null);

    const result = await subscribe(value);
    if (result.ok) {
      setStatus("done");
      setSubscribed(true);
      setEmail("");
    } else {
      setStatus("error");
      setError(result.reason);
    }
  };

  const errorText = {
    network: T.ui.footer.signupErrNetwork,
    rejected: T.ui.footer.signupErrRejected,
    unconfigured: T.ui.footer.signupErrOffline,
  }[error];

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__cols">
          <div>
            <div className="footer__brand-name">
              <img className="footer__logo" src={LOGO} alt="" width="26" height="26" />
              SubmitologY
            </div>
            <p className="footer__tagline">{t(T.ui.footer.tagline, lang)}</p>

            <div className="signup">
              <div className="footer__col-title">{t(T.ui.footer.signupTitle, lang)}</div>
              <p className="footer__tagline" style={{ fontSize: "0.8125rem" }}>
                {t(T.ui.footer.signupBody, lang)}
              </p>
              <form className="signup__row" onSubmit={submit}>
                <label className="sr-only" htmlFor="launch-email">
                  {t(T.ui.footer.emailPlaceholder, lang)}
                </label>
                <input id="launch-email" type="email" required value={email}
                       autoComplete="email"
                       disabled={status === "sending"}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder={t(T.ui.footer.emailPlaceholder, lang)} />

                {/* Honeypot. Hidden from sight and from screen readers, and
                    skipped by the tab order, so only a form-filling bot ever
                    puts anything in it. Cheaper and less hostile than a
                    CAPTCHA, which the guidelines here rule out anyway. */}
                <input type="text" name="website" className="signup__trap"
                       tabIndex={-1} autoComplete="off" aria-hidden="true"
                       value={trap} onChange={(e) => setTrap(e.target.value)} />

                <button type="submit" className="btn btn--primary"
                        disabled={status === "sending"}>
                  {t(status === "sending" ? T.ui.footer.signupSending
                                          : T.ui.footer.signupBtn, lang)}
                </button>
              </form>

              {/* One live region for every outcome, so a screen reader
                  announces the result without the focus moving. */}
              <p className={"signup__note" + (status === "error" ? " signup__note--error" : "")}
                 role="status" aria-live="polite">
                {status === "done" && t(T.ui.footer.signupDone, lang)}
                {status === "error" && t(errorText, lang)}
                {status === "idle" && subscribed && t(T.ui.footer.signupDone, lang)}
              </p>
              {/* Consent under the PDPA should be informed at the moment it's
                  given, so the policy is linked here and not only in the
                  bottom row. */}
              <a className="signup__legal" href={"#" + ROUTES.privacy}
                 onClick={(e) => { e.preventDefault(); navigate(ROUTES.privacy); }}>
                {t(T.ui.legal.emailHandling, lang)}
              </a>
            </div>
          </div>

          <div>
            <div className="footer__col-title">{t(T.ui.footer.explore, lang)}</div>
            <ul className="footer__list">
              {link("home", ROUTES.home)}
              {trainItems.map((d) => link(d.titleKey, d.path))}
            </ul>
          </div>

          <div>
            <div className="footer__col-title">{t(T.ui.footer.brandCol, lang)}</div>
            <ul className="footer__list">
              {brandItems.map((d) => link(d.titleKey, d.path))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {t(T.ui.footer.rights, lang)}</span>

          {/* Contact and the legal pages live here rather than in the nav —
              it's where people look for them, and putting them in the header
              would dilute seven real sections with three utility ones. */}
          <nav className="footer__legal" aria-label={t(T.ui.legal.terms, lang)}>
            {LEGAL_LINKS.map((l) => (
              <a key={l.key} className="footer__legal-link" href={"#" + l.path}
                 onClick={(e) => { e.preventDefault(); navigate(l.path); }}>
                {t(T.ui.legal[l.key], lang)}
              </a>
            ))}
          </nav>

          <span>{t(T.ui.footer.preLaunch, lang)}</span>
        </div>
      </div>
    </footer>
  );
}
