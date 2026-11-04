"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, Flag } from "lucide-react";
import { confirmBooking, completeBooking, getHostBookings } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import type { Booking } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";

export default function HostBookings({ email }: { email: string }) {
  const { data, loading, reload } = useAsync(() => getHostBookings(), `hb-${email}`);
  const [busy, setBusy] = useState<string | null>(null);

  if (loading || !data) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-5">
        <div className="h-20 animate-pulse rounded-xl bg-muted/40" />
      </div>
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        title="No one has booked your studios yet"
        text="When creators book spaces you host, they land here for you to confirm."
        href="/add-studio"
        cta="List a studio"
      />
    );
  }

  async function act(b: Booking, action: "confirm" | "complete") {
    const label = action === "confirm" ? `Confirm ${b.userEmail}'s booking?` : `Mark this booking Completed?`;
    const ok = window.confirm(`${label}\n${b.studioTitle} · ${b.date} · ${b.startHour}:00–${b.endHour}:00`);
    if (!ok) return;
    setBusy(b._id);
    try {
      if (action === "confirm") await confirmBooking(b._id);
      else await completeBooking(b._id);
      toast.success(action === "confirm" ? "Booking confirmed." : "Booking marked Completed.");
      reload();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Action failed.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-surface">
      {data.map((b) => (
        <div key={b._id} className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4 last:border-0">
          <div>
            <p className="font-semibold">{b.studioTitle}</p>
            <p className="text-sm text-muted">
              {b.userEmail} · {b.date} · {b.startHour}:00 – {b.endHour}:00 · ${b.total}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={b.status} />
            {b.status === "Pending" && (
              <button
                onClick={() => act(b, "confirm")}
                disabled={busy === b._id}
                className="btn btn-sm"
                aria-label={`Confirm booking for ${b.userEmail}`}
              >
                <Check className="h-4 w-4" /> Confirm
              </button>
            )}
            {b.status === "Confirmed" && (
              <button
                onClick={() => act(b, "complete")}
                disabled={busy === b._id}
                className="btn btn-sm btn-outline"
                aria-label={`Mark booking Completed for ${b.userEmail}`}
              >
                <Flag className="h-4 w-4" /> Complete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
