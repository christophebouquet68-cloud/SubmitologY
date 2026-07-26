import { useState } from "react";
import { T, t } from "../i18n";
import { DESTINATIONS, ROUTES } from "../router";
import usePersistentState from "../hooks/usePersistentState";

const LOGO = `${process.env.PUBLIC_URL}/logo512.png`;

/** The footer is the site's safety net: every section appears here as a plain
 *  link, so no destination depends on someone finding the right dropdown. */
export default function Footer({ lang, navigate }) {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = usePersistentState("launch-email", null);

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

  const submit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    // No backend yet — stored locally so the form is honest rather than a
    // dead control. Swap this for a real list before launch.
    setSaved(value);
    setEmail("");
  };

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
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder={t(T.ui.footer.emailPlaceholder, lang)} />
                <button type="submit" className="btn btn--primary">
                  {t(T.ui.footer.signupBtn, lang)}
                </button>
              </form>
              {saved && <p className="signup__note">{t(T.ui.footer.signupDone, lang)}</p>}
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
          <span>{t(T.ui.footer.preLaunch, lang)}</span>
        </div>
      </div>
    </footer>
  );
}
