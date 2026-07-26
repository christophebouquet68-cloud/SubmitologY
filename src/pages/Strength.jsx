import { useMemo } from "react";
import { T, t } from "../i18n";
import usePersistentState from "../hooks/usePersistentState";
import { AGE_RANGES, LEVELS, PROGRAM_TYPES, LEVEL_COLORS, buildProgram } from "../data/program";

const BLOCK_TITLES = {
  lower:        T.sc.lowerTitle,
  upperPush:    T.sc.upperPushTitle,
  upperPull:    T.sc.upperPullTitle,
  core:         T.sc.coreTitle,
  conditioning: T.sc.conditioningTitle,
};

export default function Strength({ lang }) {
  // Persisted: a program you built last week is still the program you want
  // this week, and re-answering three questions on a phone is tedious.
  const [choice, setChoice] = usePersistentState("sc-choice", { age: null, level: null, type: null });
  const [built, setBuilt] = usePersistentState("sc-built", false);

  const { age, level, type } = choice;
  const complete = Boolean(age && level && type);
  const program = useMemo(() => buildProgram(age, level, type), [age, level, type]);

  const pick = (key) => (value) => {
    setChoice((prev) => ({ ...prev, [key]: value }));
    setBuilt(false);
  };

  return (
    <div>
      <div className="page-header">
        <div className="eyebrow eyebrow--accent">{t(T.sc.pageTag, lang)}</div>
        <h1 className="page-title">{t(T.sc.pageTitle, lang)}</h1>
        <p className="page-sub">{t(T.sc.pageSubtitle, lang)}</p>
      </div>

      {(!built || !complete) && (
        <div className="panel">
          <div className="field-row">
            <span className="field-label">{t(T.sc.ageLabel, lang)}</span>
            <div className="pill-row">
              {AGE_RANGES.map((a) => (
                <button key={a} className="pill" aria-pressed={age === a}
                        style={age === a ? { borderColor: "var(--accent-soft)", color: "var(--accent-soft)" } : undefined}
                        onClick={() => pick("age")(a)}>
                  {t(T.sc.ageOptions[a], lang)}
                </button>
              ))}
            </div>
          </div>

          <div className="field-row">
            <span className="field-label">{t(T.sc.levelLabel, lang)}</span>
            <div className="pill-row">
              {LEVELS.map((d) => (
                <button key={d} className="pill" aria-pressed={level === d}
                        style={level === d ? { borderColor: LEVEL_COLORS[d], color: LEVEL_COLORS[d] } : undefined}
                        onClick={() => pick("level")(d)}>
                  {t(T.diffs[d], lang)}
                </button>
              ))}
            </div>
          </div>

          <div className="field-row">
            <span className="field-label">{t(T.sc.typeLabel, lang)}</span>
            <div className="pill-row">
              {PROGRAM_TYPES.map((ty) => (
                <button key={ty} className="pill" aria-pressed={type === ty}
                        style={type === ty ? { borderColor: "var(--mission)", color: "var(--mission)" } : undefined}
                        onClick={() => pick("type")(ty)}>
                  {t(T.sc.typeOptions[ty], lang)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <button className="btn btn--primary" disabled={!complete} onClick={() => setBuilt(true)}>
              {t(T.sc.generateBtn, lang)}
            </button>
            {!complete && <p className="disclaimer" style={{ marginTop: "0.625rem" }}>{t(T.sc.incomplete, lang)}</p>}
          </div>
        </div>
      )}

      {built && complete && program && (
        <div>
          <div className="result-head">
            <div>
              <div className="eyebrow eyebrow--accent">{t(T.sc.resultTag, lang)}</div>
              <p style={{ fontWeight: 600, margin: 0 }}>
                {t(T.sc.ageOptions[age], lang)} · {t(T.diffs[level], lang)} · {t(T.sc.typeOptions[type], lang)}
              </p>
            </div>
            <div className="result-actions">
              <button className="btn btn--ghost" onClick={() => window.print()}>
                {t(T.ui.sc.print, lang)}
              </button>
              <button className="btn btn--ghost" onClick={() => setBuilt(false)}>
                {t(T.sc.editBtn, lang)}
              </button>
            </div>
          </div>

          <div className="sc-freq">
            <span className="sc-freq__num">{program.frequency}</span>
            <div>
              <div className="sc-freq__label">{t(T.sc.frequencyLbl, lang)}</div>
              <div className="sc-freq__sub">
                {program.frequency} {t(T.sc.perWeek, lang)} · {t(T.sc.restLbl, lang)} {program.restSec}s
              </div>
            </div>
          </div>

          <Block title={t(T.sc.warmupTitle, lang)} rx={`${program.warmup.minutes} min`} items={program.warmup.items} lang={lang} />
          {program.blocks.map((b) => (
            <Block key={b.key} title={t(BLOCK_TITLES[b.key], lang)} rx={b.rx} items={b.items} lang={lang} />
          ))}
          <Block title={t(T.sc.cooldownTitle, lang)} rx={`${program.cooldown.minutes} min`} items={program.cooldown.items} lang={lang} />

          <div className="note" style={{ marginTop: "1.375rem" }}>
            <span className="dot" aria-hidden="true" />
            <div>
              <strong style={{ display: "block", marginBottom: "0.25rem" }}>{t(T.sc.notesTitle, lang)}</strong>
              {t(T.sc.ageNotes[age], lang)}
            </div>
          </div>

          <p className="disclaimer">{t(T.sc.disclaimer, lang)}</p>
        </div>
      )}
    </div>
  );
}

function Block({ title, rx, items, lang }) {
  return (
    <section className="sc-block">
      <div className="sc-block__head">
        <h2 className="sc-block__title">{title}</h2>
        <span className="sc-block__rx">{rx}</span>
      </div>
      <ul className="sc-list">
        {items.map((id) => (
          <li key={id}>
            <span className="dot" aria-hidden="true" />
            {t(T.sc.ex[id], lang)}
          </li>
        ))}
      </ul>
    </section>
  );
}
