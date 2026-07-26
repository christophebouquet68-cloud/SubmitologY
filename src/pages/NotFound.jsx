import { T, t } from "../i18n";
import { ROUTES } from "../router";

export default function NotFound({ lang, navigate }) {
  return (
    <div className="error-box">
      <h1 className="page-title">{t(T.ui.notFound.title, lang)}</h1>
      <p className="prose" style={{ marginBottom: "1.5rem" }}>{t(T.ui.notFound.body, lang)}</p>
      <button className="btn btn--primary" onClick={() => navigate(ROUTES.home)}>
        {t(T.ui.notFound.back, lang)}
      </button>
    </div>
  );
}
