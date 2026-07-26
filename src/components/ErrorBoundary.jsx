import { Component } from "react";
import { T, t } from "../i18n";

/** Stops one broken page from blanking the whole site. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { crashed: false };
  }

  static getDerivedStateFromError() {
    return { crashed: true };
  }

  componentDidCatch(error, info) {
    // Replace with a real reporter (Sentry et al.) when one exists.
    console.error("SubmitologY crashed:", error, info);
  }

  render() {
    if (!this.state.crashed) return this.props.children;
    const lang = this.props.lang || "en";
    return (
      <div className="error-box">
        <h2 className="page-title">{t(T.ui.crash.title, lang)}</h2>
        <p className="prose">{t(T.ui.crash.body, lang)}</p>
        <button className="btn btn--primary" onClick={() => window.location.reload()}>
          {t(T.ui.crash.reload, lang)}
        </button>
      </div>
    );
  }
}
