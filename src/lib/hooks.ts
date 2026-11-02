"use client";

import { useEffect, useState } from "react";

/** Simple data hook. `key` change hole abar fetch hoy; reload() dile force refetch. */
export function useAsync<T>(fn: () => Promise<T>, key: string) {
  const [tick, setTick] = useState(0);
  const [res, setRes] = useState<{ k: string; data: T } | null>(null);
  const full = `${key}#${tick}`;

  useEffect(() => {
    let live = true;
    fn().then((data) => {
      if (live) setRes({ k: full, data });
    });
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full]);

  const ready = res?.k === full;
  return { data: ready ? res.data : undefined, loading: !ready, reload: () => setTick((t) => t + 1) };
}
