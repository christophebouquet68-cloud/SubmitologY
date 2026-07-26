import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { T, t } from "../i18n";
import { ROUTES } from "../router";
import useMediaQuery from "../hooks/useMediaQuery";
import usePersistentState from "../hooks/usePersistentState";
import {
  NODE_IDS, TECHMAP_NODES, TECHMAP_EDGES, TECHMAP_NEIGHBORS, TECHMAP_LAYOUT,
  TECHMAP_BOUNDS, ZONE_CENTROIDS, TECH_TYPE_COLOR, SLUG_TO_ID,
  findPath, pathEdgeSet, edgeKey,
} from "../data/techmap";

const TYPES = ["position", "transition", "submission"];
const MIN_SPAN = 220;   // furthest zoom in
const MAX_SPAN = 1600;  // furthest zoom out

export default function TechniqueMap({ lang, slug, navigate }) {
  const isPhone = useMediaQuery("(max-width: 760px)");

  const [activeTypes, setActiveTypes] = useState({ position: true, transition: true, submission: true });
  const [drilled, setDrilled] = usePersistentState("drilled", []);
  const [pathFrom, setPathFrom] = useState("");
  const [pathTo, setPathTo] = useState("");

  const selected = slug ? SLUG_TO_ID[slug] || null : null;
  const selNode = selected ? TECHMAP_NODES[selected] : null;
  const selNeighbors = selected ? TECHMAP_NEIGHBORS[selected] : [];

  // Mirrored into a ref so the window-level pointer listeners below always see
  // the current selection without needing to re-subscribe on every change.
  const selectedRef = useRef(selected);
  useEffect(() => { selectedRef.current = selected; }, [selected]);

  const select = useCallback((id) => {
    if (!id) { navigate(ROUTES.map, { replace: true }); return; }
    navigate(`${ROUTES.map}/${TECHMAP_NODES[id].slug}`);
  }, [navigate]);

  /* ── Pan & zoom ──────────────────────────────────────────────────────── */
  // Selection is resolved from the gesture itself rather than from a click
  // handler on each node. Two reasons:
  //   • setPointerCapture on the <svg> retargets the subsequent pointerup to
  //     the capturing element, so the browser computes the click target as the
  //     <svg> and never fires onClick on the <g>. Safari follows this strictly,
  //     which is why nodes stopped responding there.
  //   • The previous "swallow the click after a drag" listener could outlive
  //     the drag when no click followed, eating the next legitimate tap.
  // A pointerdown that lifts without moving is a tap; anything else is a pan.
  const svgRef = useRef(null);
  const [view, setView] = useState(() => ({ ...TECHMAP_BOUNDS }));
  const pointers = useRef(new Map());
  const gesture = useRef(null);
  const pinchState = useRef(null);
  const TAP_SLOP = 6; // px of travel still counted as a tap, not a drag

  const resetView = useCallback(() => setView({ ...TECHMAP_BOUNDS }), []);

  const zoomBy = useCallback((factor, originClient) => {
    setView((v) => {
      const svg = svgRef.current;
      if (!svg) return v;
      const rect = svg.getBoundingClientRect();

      // Zoom around the pointer when we have one, otherwise the centre.
      const px = originClient ? (originClient.x - rect.left) / rect.width : 0.5;
      const py = originClient ? (originClient.y - rect.top) / rect.height : 0.5;

      const nextW = Math.min(MAX_SPAN, Math.max(MIN_SPAN, v.w * factor));
      const scale = nextW / v.w;
      const nextH = v.h * scale;

      return {
        x: v.x + (v.w - nextW) * px,
        y: v.y + (v.h - nextH) * py,
        w: nextW,
        h: nextH,
      };
    });
  }, []);

  // Wheel needs a non-passive listener to be able to preventDefault, which
  // React's synthetic onWheel cannot guarantee.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e) => {
      e.preventDefault();
      zoomBy(e.deltaY > 0 ? 1.12 : 0.89, { x: e.clientX, y: e.clientY });
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [zoomBy]);

  /**
   * Which node a tap should select.
   *
   * Rather than growing each node's hit shape to 44px — which on a graph this
   * dense makes neighbouring targets overlap, so the topmost one silently wins
   * — this converts the tap to user coordinates and picks the *nearest* node
   * within a generous radius. Effective targets are large, and where they
   * would overlap the closest node correctly wins.
   */
  const pickNode = (clientX, clientY) => {
    const svg = svgRef.current;
    if (!svg || typeof svg.getScreenCTM !== "function") return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;

    let p;
    if (typeof DOMPoint === "function") {
      p = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
    } else {
      const sp = svg.createSVGPoint();          // older WebKit
      sp.x = clientX; sp.y = clientY;
      p = sp.matrixTransform(ctm.inverse());
    }

    const scale = Math.abs(ctm.a) || 1;         // screen px per user unit
    const maxDist = 26 / scale;                 // ≈52px effective target

    let best = null, bestDist = Infinity;
    for (const id of NODE_IDS) {
      if (!activeTypes[TECHMAP_NODES[id].type]) continue;
      const q = TECHMAP_LAYOUT[id];
      const d = Math.hypot(q.x - p.x, q.y - p.y);
      if (d < bestDist) { bestDist = d; best = id; }
    }
    return bestDist <= maxDist ? best : null;
  };

  const onPointerDown = (e) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1) {
      gesture.current = {
        nodeId: pickNode(e.clientX, e.clientY),
        x: e.clientX, y: e.clientY,
        totalX: 0, totalY: 0,
        moved: false,
      };
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchState.current = { dist: Math.hypot(a.x - b.x, a.y - b.y) };
      if (gesture.current) gesture.current.moved = true; // a pinch is never a tap
    }
  };

  // Move and release are bound to the window, not the SVG, so a drag that
  // leaves the canvas keeps panning and always terminates cleanly. This is
  // what pointer capture used to provide, without breaking click targeting.
  useEffect(() => {
    const onMove = (e) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.current.size === 2 && pinchState.current) {
        const [a, b] = [...pointers.current.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist > 0 && pinchState.current.dist > 0) {
          zoomBy(pinchState.current.dist / dist, { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
        }
        pinchState.current.dist = dist;
        return;
      }

      const g = gesture.current;
      if (!g || !svgRef.current) return;

      const dxClient = e.clientX - g.x;
      const dyClient = e.clientY - g.y;
      g.totalX += Math.abs(dxClient);
      g.totalY += Math.abs(dyClient);
      if (g.totalX + g.totalY > TAP_SLOP) g.moved = true;
      g.x = e.clientX;
      g.y = e.clientY;

      const rect = svgRef.current.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      setView((v) => ({
        ...v,
        x: v.x - (dxClient / rect.width) * v.w,
        y: v.y - (dyClient / rect.height) * v.h,
      }));
    };

    const onUp = (e) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.delete(e.pointerId);
      if (pointers.current.size < 2) pinchState.current = null;
      if (pointers.current.size > 0) return;

      const g = gesture.current;
      gesture.current = null;
      if (!g || g.moved) return;

      // A clean tap: select the node under it, or clear the selection when it
      // landed on empty canvas.
      if (g.nodeId) select(g.nodeId);
      else if (selectedRef.current) select(null);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [zoomBy, select]);

  /* ── Route finding ───────────────────────────────────────────────────── */
  const route = useMemo(
    () => (pathFrom && pathTo ? findPath(pathFrom, pathTo) : null),
    [pathFrom, pathTo]
  );
  const routeEdges = useMemo(() => pathEdgeSet(route), [route]);
  const routeSet = useMemo(() => new Set(route || []), [route]);
  const routeRequested = Boolean(pathFrom && pathTo);

  /* ── Progress ────────────────────────────────────────────────────────── */
  const drilledSet = useMemo(() => new Set(drilled), [drilled]);
  const toggleDrilled = (id) => {
    setDrilled((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  /* ── Escape closes the mobile sheet ──────────────────────────────────── */
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => { if (e.key === "Escape") select(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected, select]);

  const sortedIds = useMemo(
    () => [...NODE_IDS].sort((a, b) => TECHMAP_NODES[a].name.localeCompare(TECHMAP_NODES[b].name)),
    []
  );

  const isDimmed = (id) => {
    const n = TECHMAP_NODES[id];
    if (!activeTypes[n.type]) return true;
    if (route) return !routeSet.has(id);
    if (selected) return id !== selected && !selNeighbors.includes(id);
    return false;
  };

  return (
    // On a phone the detail sheet is fixed to the bottom of the viewport, so
    // the page needs matching padding or the legend and list sit underneath it.
    <div style={isPhone && selNode ? { paddingBottom: "58dvh" } : undefined}>
      <div className="page-header">
        <div className="eyebrow eyebrow--accent">{t(T.techmap.pageTag, lang)}</div>
        <h1 className="page-title">{t(T.techmap.pageTitle, lang)}</h1>
        <p className="page-sub">{t(T.techmap.pageSubtitle, lang)}</p>
      </div>

      {/* Filters + route finder */}
      <div className="panel">
        <div className="field-row">
          <span className="field-label">{t(T.techmap.filterLbl, lang)}</span>
          <div className="pill-row">
            {TYPES.map((ty) => (
              <button key={ty} className="pill" aria-pressed={activeTypes[ty]}
                      style={activeTypes[ty] ? { borderColor: TECH_TYPE_COLOR[ty], color: TECH_TYPE_COLOR[ty] } : undefined}
                      onClick={() => setActiveTypes((p) => ({ ...p, [ty]: !p[ty] }))}>
                {t(T.techmap[`type${ty[0].toUpperCase()}${ty.slice(1)}`], lang)}
              </button>
            ))}
          </div>
        </div>

        <hr className="divider" style={{ margin: "0.25rem 0" }} />

        <div className="pathfinder">
          <div>
            <span className="field-label" style={{ minWidth: 0 }}>{t(T.ui.map.pathTitle, lang)}</span>
            <p className="page-sub" style={{ marginTop: "0.375rem", fontSize: "0.8125rem" }}>
              {t(T.ui.map.pathIntro, lang)}
            </p>
          </div>

          <div className="pathfinder__row">
            <label className="sr-only" htmlFor="path-from">{t(T.ui.map.pathFrom, lang)}</label>
            <select id="path-from" value={pathFrom} onChange={(e) => setPathFrom(e.target.value)}>
              <option value="">{t(T.ui.map.pathFrom, lang)}…</option>
              {sortedIds.map((id) => <option key={id} value={id}>{TECHMAP_NODES[id].name}</option>)}
            </select>

            <span aria-hidden="true" style={{ color: "var(--text-dim)" }}>→</span>

            <label className="sr-only" htmlFor="path-to">{t(T.ui.map.pathTo, lang)}</label>
            <select id="path-to" value={pathTo} onChange={(e) => setPathTo(e.target.value)}>
              <option value="">{t(T.ui.map.pathTo, lang)}…</option>
              {sortedIds.map((id) => <option key={id} value={id}>{TECHMAP_NODES[id].name}</option>)}
            </select>

            {routeRequested && (
              <button className="pill" onClick={() => { setPathFrom(""); setPathTo(""); }}>
                {t(T.ui.map.pathClear, lang)}
              </button>
            )}
          </div>

          {routeRequested && (
            <div className="pathfinder__result" role="status">
              {!route ? (
                <span>{t(T.ui.map.pathNone, lang)}</span>
              ) : (
                <>
                  <span style={{ color: "var(--text-dim)" }}>
                    {route.length - 1} {t(T.ui.map.pathSteps, lang)}
                  </span>
                  {route.map((id, i) => (
                    <span key={id} style={{ display: "contents" }}>
                      {i > 0 && <span className="pathfinder__arrow" aria-hidden="true">→</span>}
                      <button className="pathfinder__step" onClick={() => select(id)}>
                        {TECHMAP_NODES[id].name}
                      </button>
                    </span>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stage */}
      <div className="map-stage">
        <div className="map-canvas">
          <svg
            ref={svgRef}
            viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
            role="img"
            aria-label={t(T.ui.map.graphLabel, lang)}
            onPointerDown={onPointerDown}
          >
            {Object.keys(ZONE_CENTROIDS).map((sub) => (
              <text key={sub} className="map-zone-label" textAnchor="middle"
                    x={ZONE_CENTROIDS[sub].x} y={ZONE_CENTROIDS[sub].y}>
                {t(T.techmap.subcats[sub], lang)}
              </text>
            ))}

            {TECHMAP_EDGES.map(([a, b], i) => {
              const na = TECHMAP_LAYOUT[a], nb = TECHMAP_LAYOUT[b];
              const hidden = !activeTypes[TECHMAP_NODES[a].type] || !activeTypes[TECHMAP_NODES[b].type];
              const onRoute = routeEdges.has(edgeKey(a, b));
              const touchesSelection = selected && (a === selected || b === selected);

              let stroke = "#3a3145", width = 1, opacity = 1;
              if (hidden) opacity = 0;
              else if (route) {
                stroke = onRoute ? "var(--accent-soft)" : "#3a3145";
                width = onRoute ? 2.5 : 1;
                opacity = onRoute ? 1 : 0.18;
              } else if (selected) {
                stroke = touchesSelection ? TECH_TYPE_COLOR[TECHMAP_NODES[selected].type] : "#3a3145";
                width = touchesSelection ? 2 : 1;
                opacity = touchesSelection ? 1 : 0.25;
              }

              return (
                <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                      stroke={stroke} strokeWidth={width} opacity={opacity}
                      style={{ transition: "opacity 0.15s, stroke 0.15s" }} />
              );
            })}

            {NODE_IDS.map((id) => {
              const n = TECHMAP_NODES[id];
              if (!activeTypes[n.type]) return null;

              const p = TECHMAP_LAYOUT[id];
              const ox = p.x - n.hx, oy = p.y - n.hy;
              const mag = Math.hypot(ox, oy) || 1;
              const lx = p.x + (ox / mag) * 16, ly = p.y + (oy / mag) * 16;
              const anchor = ox >= 0 ? "start" : "end";
              const dim = isDimmed(id);
              const isSel = id === selected;
              const onRoute = routeSet.has(id);
              const done = drilledSet.has(id);

              return (
                <g key={id} className="map-node" data-node-id={id} tabIndex={0} role="button"
                   aria-label={`${n.name} — ${t(T.techmap.subcats[n.sub], lang)}`}
                   opacity={dim ? 0.22 : 1}
                   style={{ transition: "opacity 0.15s" }}
                   onKeyDown={(e) => {
                     if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(id); }
                   }}>
                  {/* Modest transparent hit shape for cursor feedback; the
                      real target size comes from pickNode() above. */}
                  <circle cx={p.x} cy={p.y} r={14} fill="transparent" pointerEvents="all" />
                  <circle className="map-node__ring" cx={p.x} cy={p.y}
                          r={isSel || onRoute ? 14 : 12}
                          fill="none" stroke={TECH_TYPE_COLOR[n.type]}
                          strokeWidth={1.5} opacity={isSel || onRoute ? 0.85 : 0} />
                  <circle cx={p.x} cy={p.y} r={9}
                          fill={TECH_TYPE_COLOR[n.type]} stroke="#0d0a0f" strokeWidth={2} />
                  {done && (
                    <circle cx={p.x + 8} cy={p.y - 8} r={3.5} fill="#35d07f" stroke="#0d0a0f" strokeWidth={1.5} />
                  )}
                  <text className="map-node-label" x={lx} y={ly} textAnchor={anchor}
                        fill={isSel ? "var(--text)" : undefined}>
                    {n.name}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="map-zoom">
            <button onClick={() => zoomBy(0.8)} aria-label={t(T.ui.map.zoomIn, lang)}>+</button>
            <button onClick={() => zoomBy(1.25)} aria-label={t(T.ui.map.zoomOut, lang)}>−</button>
            <button onClick={resetView} aria-label={t(T.ui.map.resetView, lang)}>⤾</button>
          </div>

          <div className="map-hint">
            {isPhone ? t(T.ui.map.hintTouch, lang) : t(T.ui.map.hintDesktop, lang)}
          </div>
        </div>

        {/* Detail — sidebar on desktop, bottom sheet on phones (see app.css) */}
        <aside className={"map-panel" + (selNode ? "" : " map-panel--empty")}
               aria-live="polite">
          {!selNode ? (
            <p className="map-panel__empty">{t(T.techmap.emptyPanel, lang)}</p>
          ) : (
            <div>
              <button className="sheet-close" onClick={() => select(null)}
                      aria-label={t(T.ui.chrome.close, lang)}>✕</button>

              <div className="eyebrow" style={{ color: TECH_TYPE_COLOR[selNode.type] }}>
                {t(T.techmap[`type${selNode.type[0].toUpperCase()}${selNode.type.slice(1)}`], lang)}
              </div>
              <h2 className="map-panel__name">{selNode.name}</h2>
              <div className="map-panel__crumb">{t(T.techmap.subcats[selNode.sub], lang)}</div>
              <p className="map-panel__desc">{selNode.desc}</p>

              <div className="field-label" style={{ minWidth: 0 }}>
                {t(T.techmap.connectsTo, lang)} ({selNeighbors.length})
              </div>
              <div style={{ marginTop: "0.5rem" }}>
                {selNeighbors.map((nid) => (
                  <button key={nid} className="conn" onClick={() => select(nid)}>
                    <span className="dot" style={{ background: TECH_TYPE_COLOR[TECHMAP_NODES[nid].type] }} aria-hidden="true" />
                    {TECHMAP_NODES[nid].name}
                  </button>
                ))}
              </div>

              <button className="drill-toggle" aria-pressed={drilledSet.has(selected)}
                      onClick={() => toggleDrilled(selected)}>
                {drilledSet.has(selected)
                  ? `✓ ${t(T.ui.map.markedDrilled, lang)}`
                  : t(T.ui.map.markDrilled, lang)}
              </button>
            </div>
          )}
        </aside>
      </div>

      <div className="map-legend">
        {TYPES.map((ty) => (
          <div className="map-legend__item" key={ty}>
            <span className="dot" style={{ width: 9, height: 9, background: TECH_TYPE_COLOR[ty] }} aria-hidden="true" />
            {t(T.techmap[`legend${ty[0].toUpperCase()}${ty.slice(1)}`], lang)}
          </div>
        ))}
        {drilled.length > 0 && (
          <div className="map-legend__item">
            <span className="dot dot--live" style={{ width: 9, height: 9 }} aria-hidden="true" />
            {drilled.length} / {NODE_IDS.length} {t(T.ui.map.progress, lang)}
            <button className="pill" style={{ marginLeft: 8 }} onClick={() => setDrilled([])}>
              {t(T.ui.map.clearProgress, lang)}
            </button>
          </div>
        )}
      </div>

      {/* A force-directed graph cannot be navigated by a screen reader or by
          keyboard-only users in any reasonable way. This is the same data as a
          plain list, and it is also useful on a small phone. */}
      <details className="map-textlist">
        <summary>{t(T.ui.map.listTitle, lang)} ({NODE_IDS.length})</summary>
        <ul>
          {sortedIds.map((id) => (
            <li key={id}>
              <button onClick={() => select(id)}>
                <span className="dot" style={{ background: TECH_TYPE_COLOR[TECHMAP_NODES[id].type], display: "inline-block", marginRight: 8 }} aria-hidden="true" />
                {TECHMAP_NODES[id].name}
              </button>
            </li>
          ))}
        </ul>
      </details>

      <p className="disclaimer">{t(T.techmap.footNote, lang)}</p>
    </div>
  );
}
