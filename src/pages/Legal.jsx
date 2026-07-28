import { Fragment } from "react";
import { T, t } from "../i18n";
import { DOCS, LAST_UPDATED } from "../data/legal";

/* Any {{…}} span in the copy is an unfilled blank. Rendering it in the accent
   colour with a dashed underline is deliberate: a placeholder that looks like
   ordinary prose is one that ships. */
function withBlanks(text) {
  return text.split(/(\{\{.*?\}\})/g).map((part, i) =>
    part.startsWith("{{") && part.endsWith("}}")
      ? <mark className="blank" key={i}>{part.slice(2, -2)}</mark>
      : <Fragment key={i}>{part}</Fragment>
  );
}

function Block({ block }) {
  if (block.h) return <h2 className="legal__h">{withBlanks(block.h)}</h2>;
  if (block.p) return <p>{withBlanks(block.p)}</p>;
  if (block.note) return (
    <p className="legal__note">
      <span className="dot" aria-hidden="true" />
      <span>{withBlanks(block.note)}</span>
    </p>
  );
  if (block.ul) return (
    <ul className="legal__list">
      {block.ul.map((li, i) => <li key={i}>{withBlanks(li)}</li>)}
    </ul>
  );
  if (block.dl) return (
    <dl className="legal__dl">
      {block.dl.map(([term, value], i) => (
        <Fragment key={i}>
          <dt>{withBlanks(term)}</dt>
          <dd>{withBlanks(value)}</dd>
        </Fragment>
      ))}
    </dl>
  );
  return null;
}

/** One component for all three documents — they differ only in copy. */
export default function Legal({ lang, doc }) {
  const d = DOCS[doc];
  if (!d) return null;

  return (
    <div>
      <div className="page-header">
        <div className="eyebrow">{d.tag}</div>
        <h1 className="page-title">{d.title}</h1>
        <p className="page-sub">{d.sub}</p>
      </div>

      {/* The chrome is translated into five languages; this copy isn't.
          Saying so is better than letting someone assume it is. */}
      <p className="legal__lang">{t(T.ui.legal.englishOnly, lang)}</p>

      <article className="legal">
        {doc !== "contact" && (
          <p className="legal__updated">
            {t(T.ui.legal.lastUpdated, lang)} {withBlanks(LAST_UPDATED)}
          </p>
        )}
        {d.blocks.map((b, i) => <Block block={b} key={i} />)}
      </article>
    </div>
  );
}
