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

              {/* Email and Instagram share one look — an icon plus the
                  address/handle as visible text, in the brand orange — so
                  the two ways to reach us read as a matched pair rather
                  than one looking like the "real" option and the other an
                  afterthought. */}
              <div className="footer__contact-links">
                {/* A plain mailto: link. It opens the visitor's own mail
                    app, so nothing about the message passes through this
                    site or any third-party form service — no provider to
                    configure, and nothing for this site to collect or
                    store. See legal.js ("If you email us") for how the
                    privacy policy describes this. */}
                <a className="footer__contact-link" href={`mailto:${BUSINESS.general}`}>
                  <svg className="footer__contact-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M3.5 6 12 13 20.5 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{BUSINESS.general}</span>
                </a>

                {/* Instagram is the only social channel live pre-launch.
                    Plain link to the profile — no embedded widget or
                    script, which would be a third-party request the
                    privacy policy would have to start disclosing. */}
                <a
                  className="footer__contact-link"
                  href={BUSINESS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="footer__contact-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.35" cy="6.65" r="1.15" fill="currentColor" />
                  </svg>
                  <span>{BUSINESS.instagram}</span>
                  <span className="sr-only"> ({t(T.ui.footer.instagramNewTab, lang)})</span>
                </a>
              </div>
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
