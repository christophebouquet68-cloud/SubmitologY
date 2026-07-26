import { useCallback, useEffect, useState } from "react";

const PREFIX = "submitology:";

/** useState that survives a reload. Wrapped in try/catch because localStorage
 *  throws in Safari private mode and in some embedded webviews — the site must
 *  still work, just without persistence. */
export default function usePersistentState(key, initial) {
  const storageKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw === null ? initial : JSON.parse(raw);
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      /* storage unavailable — carry on in memory */
    }
  }, [storageKey, value]);

  const reset = useCallback(() => setValue(initial), [initial]);
  return [value, setValue, reset];
}
