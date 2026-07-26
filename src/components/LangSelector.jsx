import { useEffect, useRef, useState } from "react";
import { LANGUAGES, T, t } from "../i18n";

/** Language picker. Uses text codes rather than flags: a flag is a country,
 *  not a language — 🇬🇧 excludes most English speakers and 🇧🇷 excludes
 *  Portugal. The selection is persisted by the caller. */
export default function LangSelector({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lang" ref={ref}>
      <button className="lang__btn" onClick={() => setOpen((o) => !o)}
              aria-expanded={open} aria-haspopup="listbox"
              aria-label={`${t(T.ui.chrome.language, lang)}: ${current.label}`}>
        <span>{current.short}</span>
        <span aria-hidden="true" style={{ opacity: 0.6 }}>▾</span>
      </button>

      {open && (
        <div className="lang__menu" role="listbox" aria-label={t(T.ui.chrome.language, lang)}>
          {LANGUAGES.map((l) => (
            <button key={l.code} className="lang__opt" role="option"
                    aria-current={l.code === lang}
                    aria-selected={l.code === lang}
                    onClick={() => { setLang(l.code); setOpen(false); }}>
              <span className="lang__code">{l.short}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
