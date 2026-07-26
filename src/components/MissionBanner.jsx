import { T, t } from "../i18n";
import { ROUTES } from "../router";

/** The 1% pledge strip. Dismissible and persisted — an undismissable banner on
 *  every page is a tax on returning visitors, and on a phone it eats a
 *  meaningful share of the first screen. */
export default function MissionBanner({ lang, navigate, onDismiss }) {
  return (
    <div className="banner">
      <button className="banner__btn" onClick={() => navigate(ROUTES.mission)}>
        <span className="dot" style={{ background: "var(--mission)" }} aria-hidden="true" />
        <span>{t(T.banner.text, lang)}</span>
        <span className="banner__cta">{t(T.banner.cta, lang)}</span>
      </button>
      <button className="banner__dismiss" onClick={onDismiss}
              aria-label={t(T.ui.chrome.dismiss, lang)}>✕</button>
    </div>
  );
}
