import { useEffect } from "react";

const FOCUSABLE = [
  "a[href]", "button:not([disabled])", "input:not([disabled])",
  "select:not([disabled])", "textarea:not([disabled])", "[tabindex]:not([tabindex='-1'])",
].join(",");

/** Traps Tab inside `ref`, closes on Escape, and returns focus to whatever was
 *  focused before the dialog opened. The original Modal did none of this. */
export default function useFocusTrap(ref, { active, onClose }) {
  useEffect(() => {
    if (!active) return;

    const previouslyFocused = document.activeElement;
    const node = ref.current;
    if (!node) return;

    const focusables = () => Array.from(node.querySelectorAll(FOCUSABLE));
    const first = focusables()[0];
    (first || node).focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose?.(); return; }
      if (e.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) { e.preventDefault(); return; }
      const firstEl = items[0];
      const lastEl = items[items.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault(); lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault(); firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [ref, active, onClose]);
}
