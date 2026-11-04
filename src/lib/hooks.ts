"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { addSaved, getWishlist, removeSaved } from "@/lib/api";
import { useSession } from "@/lib/session";

/** Simple data hook. Key change abar fetch hoy; reload() dile force refetch. */
export function useAsync<T>(fn: () => Promise<T>, key: string) {
  const [tick, setTick] = useState(0);
  const [res, setRes] = useState<{ k: string; data: T } | null>(null);
  const [error, setError] = useState<string>("");
  const full = `${key}#${tick}`;

  useEffect(() => {
    let live = true;
    fn()
      .then((data) => {
        if (live) {
          setRes({ k: full, data });
          setError("");
        }
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

/* ---------------- wishlist store (module-level external store) ----------------
 * useSyncExternalStore দিয়ে সব card/page একই saved state দেখে; login হলে একবার
 * লোড হয়, toggle এ optimistic update + server persist (MongoDB users doc)। */
type SavedState = { ids: Record<string, true> | null }; // null = এখনো লোড হয়নি

const savedState: { current: SavedState; loadKey: string } = { current: { ids: null }, loadKey: "" };
const savedListeners = new Set<() => void>();

function emit() {
  savedState.current = { ...savedState.current }; // snapshot identity বদলাও, যাতে React জানে
  savedListeners.forEach((fn) => fn());
}

export const savedStore = {
  subscribe(fn: () => void) {
    savedListeners.add(fn);
    return () => {
      savedListeners.delete(fn);
    };
  },
  snapshot(): SavedState {
    return savedState.current;
  },
  async load(email: string) {
    if (!email || savedState.loadKey === email || savedState.loadKey) return;
    savedState.loadKey = email;
    try {
      const list = await getWishlist();
      savedState.current = { ids: Object.fromEntries(list.map((s) => [s._id, true as const])) };
    } catch {
      savedState.current = { ids: {} };
      savedState.loadKey = ""; // ব্যর্থ হলে retry-র সুযোগ রাখো
    }
    emit();
  },
  /** Returns the resulting saved: true/false. Optimistic, server failure-এ revert. */
  async toggle(id: string): Promise<boolean> {
    const wasSaved = !!savedState.current.ids?.[id];
    const ids = { ...(savedState.current.ids || {}) };
    if (wasSaved) delete ids[id];
    else ids[id] = true as const;
    savedState.current = { ids };
    emit();
    try {
      if (wasSaved) await removeSaved(id);
      else await addSaved(id);
    } catch {
      const rollback = { ...(savedState.current.ids || {}) };
      if (!wasSaved) delete rollback[id];
      else rollback[id] = true as const;
      savedState.current = { ids: rollback };
      emit();
      throw new Error("Could not update saved studios. Try again.");
    }
    return !wasSaved;
  },
  reset() {
    savedState.current = { ids: null };
    savedState.loadKey = "";
  },
};

export function useWishlist() {
  const { user } = useSession();
  const snap = useSyncExternalStore(savedStore.subscribe, savedStore.snapshot, savedStore.snapshot);

  useEffect(() => {
    if (user?.email) savedStore.load(user.email);
    else savedStore.reset(); // logout-এ আগের user-এর saved state মুছে দাও
  }, [user?.email]);

  return {
    loaded: snap.ids !== null,
    isSaved: (id: string) => !!snap.ids?.[id],
    toggle: savedStore.toggle,
  };
}
