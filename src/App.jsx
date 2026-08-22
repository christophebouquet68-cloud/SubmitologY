import { useCallback, useEffect, useState } from "react";
import { LANGUAGES, T, t } from "./i18n";
import { ROUTES, useRoute, isActive } from "./router";
import usePersistentState from "./hooks/usePersistentState";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MissionBanner from "./components/MissionBanner";
import SearchDialog from "./components/SearchDialog";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import Concepts from "./pages/Concepts";
import TechniqueMap from "./pages/TechniqueMap";
import Strength from "./pages/Strength";
import Mission from "./pages/Mission";
import Shop from "./pages/Shop";
import Story from "./pages/Story";
import WhatsNew, { RELEASES } from "./pages/WhatsNew";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

import "./styles/app.css";

const LATEST_RELEASE = RELEASES[0]?.date ?? null;

/** Guess a starting language from the browser, falling back to English.
 *  Only used on a first visit — after that the stored choice wins. */
function detectLanguage() {
  const supported = LANGUAGES.map((l) => l.code);
  for (const tag of navigator.languages || [navigator.language || "en"]) {
    const base = String(tag).toLowerCase().split("-")[0];
    if (supported.includes(base)) return base;
  }
  return "en";
}

export default function App() {
  const { path, segments, navigate } = useRoute();

  const [lang, setLang] = usePersistentState("lang", detectLanguage());
  const [bannerDismissed, setBannerDismissed] = usePersistentState("banner-dismissed", false);
  const [seenRelease, setSeenRelease] = usePersistentState("seen-release", null);
  const [searchOpen, setSearchOpen] = useState(false);

  const hasUnread = Boolean(LATEST_RELEASE && seenRelease !== LATEST_RELEASE);

  /* Reflect the language on <html> so screen readers, hyphenation and
     translation tools behave, and keep the tab title in sync per page. */
  useEffect(() => {
    const meta = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
    document.documentElement.lang = meta.htmlLang;
  }, [lang]);

  useEffect(() => {
    const titles = {
      [ROUTES.home]:     t(T.overview.titleLine1, lang),
      [ROUTES.map]:      t(T.ui.sections.map.name, lang),
      [ROUTES.concepts]: t(T.ui.sections.concepts.name, lang),
      [ROUTES.strength]: t(T.ui.sections.strength.name, lang),
      [ROUTES.mission]:  t(T.ui.sections.mission.name, lang),
      [ROUTES.shop]:     t(T.ui.sections.shop.name, lang),
      [ROUTES.story]:    t(T.ui.sections.story.name, lang),
      [ROUTES.whatsNew]: t(T.ui.sections.whatsNew.name, lang),
      [ROUTES.contact]:  t(T.ui.legal.contact, lang),
      [ROUTES.privacy]:  t(T.ui.legal.privacy, lang),
      [ROUTES.terms]:    t(T.ui.legal.terms, lang),
    };
    const base = "SubmitologY";
    const key = Object.keys(titles).find((r) => isActive(path, r));
    document.title = key && key !== ROUTES.home ? `${titles[key]} · ${base}` : `${base} — ${titles[ROUTES.home]}`;
  }, [path, lang]);

  /* Moving between sections should start you at the top of the new one.
     Deep links into the map are exempt: those scroll to nothing useful and
     the map manages its own viewport. */
  useEffect(() => {
    if (segments[0] === "map" && segments[1]) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path, segments]);

  /* Mark release notes as read once they've actually been opened. */
  useEffect(() => {
    if (isActive(path, ROUTES.whatsNew) && LATEST_RELEASE) setSeenRelease(LATEST_RELEASE);
  }, [path, setSeenRelease]);

  /* ⌘K / Ctrl-K opens search from anywhere. */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "")) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const renderPage = useCallback(() => {
    const [head, tail] = segments;

    switch ("/" + (head || "")) {
      case ROUTES.home:     return <Home lang={lang} navigate={navigate} />;
      case ROUTES.map:      return <TechniqueMap lang={lang} slug={tail} navigate={navigate} />;
      case ROUTES.concepts: return <Concepts lang={lang} />;
      case ROUTES.strength: return <Strength lang={lang} />;
      case ROUTES.mission:  return <Mission lang={lang} />;
      case ROUTES.shop:     return <Shop lang={lang} />;
      case ROUTES.story:    return <Story lang={lang} navigate={navigate} />;
      case ROUTES.whatsNew: return <WhatsNew lang={lang} />;
      case ROUTES.contact:  return <Legal lang={lang} doc="contact" />;
      case ROUTES.privacy:  return <Legal lang={lang} doc="privacy" />;
      case ROUTES.terms:    return <Legal lang={lang} doc="terms" />;
      default:              return <NotFound lang={lang} navigate={navigate} />;
    }
  }, [segments, lang, navigate]);

  return (
    <div className="shell">
      <a className="skip-link" href="#main">{t(T.ui.chrome.skipToContent, lang)}</a>

      {/* Two ambient layers, painted in this order: the mat is the ground,
          the synaptic field is the brand's stated design language sitting on
          top of it. Both fixed, both decorative, neither costs a request. */}
      <div className="matfield" aria-hidden="true" />
      <SynapticField />

      <Header
        lang={lang}
        setLang={setLang}
        path={path}
        navigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
        hasUnread={hasUnread}
      />

      {/* Hidden on the mission page itself. The whole strip is one button
          that navigates to ROUTES.mission, so on that page its "Learn more →"
          pointed at the page you were already reading and a click did
          nothing — a dead control that looked like a live one. Suppressing it
          there also gives the page it advertises the full first screen. */}
      {!bannerDismissed && !isActive(path, ROUTES.mission) && (
        <MissionBanner lang={lang} navigate={navigate} onDismiss={() => setBannerDismissed(true)} />
      )}

      <main className="main" id="main" tabIndex={-1}>
        <ErrorBoundary lang={lang} key={path}>
          {renderPage()}
        </ErrorBoundary>
      </main>

      <Footer lang={lang} navigate={navigate} />

      {searchOpen && (
        <SearchDialog lang={lang} navigate={navigate} onClose={() => setSearchOpen(false)} />
      )}
    </div>
  );
}

/* ── Ambient background ────────────────────────────────────────────────────
   Inline SVG pattern — no image request — echoing the brand's neural/synaptic
   design language. Deliberately faint so it never competes with text. */
function SynapticField() {
  const svg =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='net' width='150' height='150' patternUnits='userSpaceOnUse'%3E%3Cg fill='none' stroke='%23a897f0' stroke-width='0.6'%3E%3Cline x1='18' y1='22' x2='72' y2='10'/%3E%3Cline x1='72' y1='10' x2='120' y2='46'/%3E%3Cline x1='18' y1='22' x2='42' y2='80'/%3E%3Cline x1='42' y1='80' x2='120' y2='46'/%3E%3Cline x1='42' y1='80' x2='96' y2='128'/%3E%3Cline x1='120' y1='46' x2='140' y2='110'/%3E%3C/g%3E%3Cg fill='%23a897f0'%3E%3Ccircle cx='18' cy='22' r='1.8'/%3E%3Ccircle cx='72' cy='10' r='1.8'/%3E%3Ccircle cx='120' cy='46' r='1.8'/%3E%3Ccircle cx='42' cy='80' r='1.8'/%3E%3Ccircle cx='96' cy='128' r='1.8'/%3E%3Ccircle cx='140' cy='110' r='1.8'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23net)'/%3E%3C/svg%3E";

  return <div className="synaptic" aria-hidden="true" style={{ backgroundImage: `url("${svg}")` }} />;
}
