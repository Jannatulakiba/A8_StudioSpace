"use client";

import { useEffect, useState } from "react";

/** Simple data hook. Key change abar fetch hoy; reload() dile force refetch. */
export function useAsync<T>(fn: () => Promise<T>, key: string) {
  const [tick, setTick] = useState(0);
  const [res, setRes] = useState<{ k: string; data: T } | null>(null);
  const [error, setError] = useState<string>("");
  const full = `${key}#${tick}`;

  useEffect(() => {
    let live = true;
    setError("");
    fn()
      .then((data) => {
        if (live) setRes({ k: full, data });
      })
      .catch((e: unknown) => {
        if (live) setError(e instanceof Error ? e.message : "Something went wrong.");
      });
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full]);

  const ready = res?.k === full;
  return { data: ready ? res.data : undefined, loading: !ready, error, reload: () => setTick((t) => t + 1) };
}
