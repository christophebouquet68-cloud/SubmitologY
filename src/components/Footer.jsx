import { T, t } from "../i18n";
import { DESTINATIONS, LEGAL_LINKS, ROUTES } from "../router";
import { BUSINESS } from "../data/legal.js";

const LOGO = `${process.env.PUBLIC_URL}/logo512.png`;

/** The footer is the site's safety net: every section appears here as a plain
 *  link, so no destination depends on someone finding the right dropdown. */
export default function Footer({ lang, navigate }) {
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
              <div className="footer__col-title">{t(T.ui.footer.contactTitle, lang)}</div>
              <p className="footer__tagline" style={{ fontSize: "0.8125rem" }}>
                {t(T.ui.footer.contactBody, lang)}
              </p>
              {/* A plain mailto: link. It opens the visitor's own mail app, so
                  nothing about the message passes through this site or any
                  third-party form service — no provider to configure, and
                  nothing for this site to collect or store. See legal.js
                  ("If you email us") for how the privacy policy describes
                  this. */}
              <a className="btn btn--primary" href={`mailto:${BUSINESS.general}`}>
                {BUSINESS.general}
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
