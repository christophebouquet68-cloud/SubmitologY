import { useEffect, useMemo, useRef, useState } from "react";
import { T, t } from "../i18n";
import { DESTINATIONS, ROUTES } from "../router";
import { NODE_IDS, TECHMAP_NODES, TECH_TYPE_COLOR } from "../data/techmap";
import { techDesc } from "../data/techmap-i18n";
import useFocusTrap from "../hooks/useFocusTrap";

/** Search is the fastest route to anything once a site passes about a dozen
 *  destinations — and it is the only navigation pattern that costs the same on
 *  a 27" monitor and a phone. It indexes both sections and all 34 techniques. */
export default function SearchDialog({ lang, onClose, navigate }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const panelRef = useRef(null);
  const listRef = useRef(null);

  useFocusTrap(panelRef, { active: true, onClose });

  const index = useMemo(() => {
    const pages = DESTINATIONS.map((d) => ({
      kind: "page",
      id: d.key,
      name: t(T.ui.sections[d.titleKey].name, lang),
      meta: t(T.ui.sections[d.titleKey].desc, lang),
      path: d.path,
    }));

    const techniques = NODE_IDS.map((id) => {
      const n = TECHMAP_NODES[id];
      return {
        kind: "technique",
        id,
        name: n.name,
        meta: t(T.techmap.subcats[n.sub], lang),
        color: TECH_TYPE_COLOR[n.type],
        path: `${ROUTES.map}/${n.slug}`,
        // Both languages in the haystack: someone reading in French should
        // still find a technique by typing the English word they hear in class.
        haystack: `${n.name} ${techDesc(id, lang)} ${techDesc(id, "en")}`.toLowerCase(),
      };
    });

    return { pages, techniques };
  }, [lang]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { pages: index.pages, techniques: [] };
    }
    const matchPage = index.pages.filter(
      (p) => p.name.toLowerCase().includes(q) || p.meta.toLowerCase().includes(q)
    );
    // Name matches rank above description matches — searching "guard" should
    // surface the guards before every technique that mentions one.
    const nameHits = index.techniques.filter((x) => x.name.toLowerCase().includes(q));
    const bodyHits = index.techniques.filter(
      (x) => !x.name.toLowerCase().includes(q) && x.haystack.includes(q)
    );
    return { pages: matchPage, techniques: [...nameHits, ...bodyHits].slice(0, 24) };
  }, [query, index]);

  const flat = useMemo(() => [...results.pages, ...results.techniques], [results]);

  useEffect(() => { setCursor(0); }, [query]);

  const commit = (item) => {
    if (!item) return;
    navigate(item.path);
    onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      commit(flat[cursor]);
    }
  };

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]');
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  let running = -1;

  return (
    <div className="dialog-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dialog" role="dialog" aria-modal="true"
           aria-label={t(T.ui.search.open, lang)} ref={panelRef}>
        <input
          className="dialog__input"
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t(T.ui.search.placeholder, lang)}
          aria-label={t(T.ui.search.placeholder, lang)}
        />

        <div className="dialog__results" ref={listRef}>
          {flat.length === 0 && <div className="dialog__empty">{t(T.ui.search.empty, lang)}</div>}

          {results.pages.length > 0 && (
            <>
              <div className="dialog__group-label">{t(T.ui.search.groupPages, lang)}</div>
              {results.pages.map((item) => {
                running += 1;
                const i = running;
                return (
                  <button key={item.id} className="result" data-active={i === cursor}
                          onMouseEnter={() => setCursor(i)} onClick={() => commit(item)}>
                    <span className="dot" style={{ background: "var(--text-dim)" }} aria-hidden="true" />
                    <span className="result__name">{item.name}</span>
                    <span className="result__meta">{item.meta}</span>
                  </button>
                );
              })}
            </>
          )}

          {results.techniques.length > 0 && (
            <>
              <div className="dialog__group-label">{t(T.ui.search.groupTechniques, lang)}</div>
              {results.techniques.map((item) => {
                running += 1;
                const i = running;
                return (
                  <button key={item.id} className="result" data-active={i === cursor}
                          onMouseEnter={() => setCursor(i)} onClick={() => commit(item)}>
                    <span className="dot" style={{ background: item.color }} aria-hidden="true" />
                    <span className="result__name">{item.name}</span>
                    <span className="result__meta">{item.meta}</span>
                  </button>
                );
              })}
            </>
          )}
        </div>

        <div className="dialog__foot">
          <span>{t(T.ui.search.hintMove, lang)}</span>
          <span>{t(T.ui.search.hintOpen, lang)}</span>
          <span>{t(T.ui.search.hintClose, lang)}</span>
        </div>
      </div>
    </div>
  );
}
