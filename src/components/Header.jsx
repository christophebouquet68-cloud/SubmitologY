import { useCallback, useEffect, useRef, useState } from "react";
import { T, t } from "../i18n";
import { DESTINATIONS, ROUTES, isActive } from "../router";
import LangSelector from "./LangSelector";
import SoundToggle from "./SoundToggle";

const LOGO = `${process.env.PUBLIC_URL}/logo512.png`;

// The four top-level categories. Groups with a single destination render as a
// plain link rather than a one-item dropdown — a menu that opens to reveal one
// choice is a wasted click.
const GROUP_ORDER = ["train", "shop", "mission", "about"];

function groupDestinations(group) {
  return DESTINATIONS.filter((d) => d.group === group);
}

export default function Header({ lang, setLang, path, navigate, onOpenSearch, hasUnread }) {
  const [openGroup, setOpenGroup] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navRef = useRef(null);

  // Close the desktop dropdown on outside click or Escape.
  useEffect(() => {
    if (!openGroup) return;
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenGroup(null);
    };
    const onKey = (e) => { if (e.key === "Escape") setOpenGroup(null); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup]);

  // Route changes always close the menus — otherwise a dropdown can outlive the
  // page it belongs to.
  useEffect(() => { setOpenGroup(null); setDrawerOpen(false); }, [path]);

  const go = useCallback((to) => { navigate(to); }, [navigate]);

  const label = (key) => t(T.ui.sections[key].name, lang);
  const desc  = (key) => t(T.ui.sections[key].desc, lang);

  return (
    <>
      <header className="header">
        <a className="brand" href={"#" + ROUTES.home}
           onClick={(e) => { e.preventDefault(); go(ROUTES.home); }}>
          <img className="brand__mark" src={LOGO} alt="" width="24" height="24" />
          <span className="brand__name">Submitolog<span className="brand__y">Y</span></span>
        </a>

        <nav className="nav" ref={navRef} aria-label={t(T.ui.chrome.menuTitle, lang)}>
          {GROUP_ORDER.map((group) => {
            const items = groupDestinations(group);
            const groupActive = items.some((d) => isActive(path, d.path));

            // Single-destination group → direct link.
            if (items.length === 1) {
              const d = items[0];
              return (
                <a key={group} className="nav__link" href={"#" + d.path}
                   aria-current={isActive(path, d.path) ? "page" : undefined}
                   onClick={(e) => { e.preventDefault(); go(d.path); }}>
                  {t(T.ui.groups[group], lang)}
                </a>
              );
            }

            const expanded = openGroup === group;
            return (
              <div className="nav__group" key={group}>
                <button
                  className="nav__link"
                  data-active={groupActive ? "true" : undefined}
                  aria-expanded={expanded}
                  aria-haspopup="true"
                  onClick={() => setOpenGroup(expanded ? null : group)}
                >
                  {t(T.ui.groups[group], lang)}
                  {group === "about" && hasUnread && <span className="dot dot--live" aria-hidden="true" />}
                  <span className="nav__chev" aria-hidden="true">▾</span>
                </button>

                {expanded && (
                  <div className="nav__menu" role="menu">
                    {items.map((d) => (
                      <a key={d.key} className="nav__item" role="menuitem" href={"#" + d.path}
                         aria-current={isActive(path, d.path) ? "page" : undefined}
                         onClick={(e) => { e.preventDefault(); go(d.path); }}>
                        <span className="nav__item-name">
                          {label(d.titleKey)}
                          {d.key === "whatsNew" && hasUnread && (
                            <span className="dot dot--live" style={{ marginLeft: 8, display: "inline-block" }} aria-hidden="true" />
                          )}
                        </span>
                        <span className="nav__item-desc">{desc(d.titleKey)}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Order is music, language, search — deliberately, and it is the
            order they matter in on a phone rather than on a desktop.

            Sound was last and got dropped at 520px, which meant the one
            control people most want to reach quickly was the one they could
            not find. Search moves to the end instead: on a phone it is the
            least used of the three, and unlike the other two it has no state
            to check at a glance.

            All three stay visible at every width now — see the narrow-header
            rules in app.css. */}
        <SoundToggle lang={lang} />

        <LangSelector lang={lang} setLang={setLang} />

        <button className="search-btn" onClick={onOpenSearch} aria-label={t(T.ui.search.open, lang)}>
          <span aria-hidden="true">⌕</span>
          <span className="search-btn__hint">⌘K</span>
        </button>

        <button className="burger" onClick={() => setDrawerOpen(true)}
                aria-label={t(T.ui.chrome.openMenu, lang)} aria-expanded={drawerOpen}>
          <span className="burger__bars" aria-hidden="true" />
        </button>
      </header>

      {drawerOpen && (
        <Drawer lang={lang} path={path} onNavigate={go} onClose={() => setDrawerOpen(false)} hasUnread={hasUnread} />
      )}
    </>
  );
}

/* ── Mobile drawer ─────────────────────────────────────────────────────────
   On a phone the four groups become four labelled sections with every
   destination listed flat. Nothing is hidden behind a second tap: a person
   opening the menu sees all seven sections at once, each with a one-line
   description of what's in it. */
function Drawer({ lang, path, onNavigate, onClose, hasUnread }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("button, a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const item = (key, to, extra) => (
    <a key={key} className="drawer__item" href={"#" + to}
       aria-current={isActive(path, to) ? "page" : undefined}
       onClick={(e) => { e.preventDefault(); onNavigate(to); onClose(); }}>
      <span className="drawer__item-name">
        {t(T.ui.sections[key].name, lang)}
        {extra}
      </span>
      <span className="drawer__item-desc">{t(T.ui.sections[key].desc, lang)}</span>
    </a>
  );

  return (
    <>
      <div className="drawer-scrim" onClick={onClose} />
      <div className="drawer" role="dialog" aria-modal="true"
           aria-label={t(T.ui.chrome.menuTitle, lang)} ref={panelRef}>
        <div className="drawer__top">
          <span className="brand__name">
            <img className="brand__mark" src={LOGO} alt="" width="24" height="24" />
            Submitolog<span className="brand__y">Y</span>
          </span>
          <button className="drawer__close" onClick={onClose} aria-label={t(T.ui.chrome.closeMenu, lang)}>✕</button>
        </div>

        <div className="drawer__group">
          {item("home", ROUTES.home)}
        </div>

        {GROUP_ORDER.map((group) => (
          <div className="drawer__group" key={group}>
            <div className="drawer__group-label">{t(T.ui.groups[group], lang)}</div>
            {groupDestinations(group).map((d) =>
              item(
                d.titleKey,
                d.path,
                d.key === "whatsNew" && hasUnread
                  ? <span className="dot dot--live" style={{ marginLeft: 8, display: "inline-block" }} aria-hidden="true" />
                  : null
              )
            )}
          </div>
        ))}
      </div>
    </>
  );
}
