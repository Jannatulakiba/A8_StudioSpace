"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cancelBooking, getMyBookings } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { useSession } from "@/lib/session";
import type { Booking } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";
import SectionHead from "@/components/ui/SectionHead";
import StatusBadge from "@/components/ui/StatusBadge";

export default function MyBookings() {
  const { user } = useSession();
  const email = user?.email ?? "";
  const { data, loading, reload } = useAsync(() => getMyBookings(email), `bk-${email}`);
  const [target, setTarget] = useState<Booking | null>(null);

  async function confirmCancel() {
    if (!target) return;
    await cancelBooking(target._id);
    toast.success("Booking cancelled.");
    setTarget(null);
    reload();
  }

  return (
    <section className="py-12">
      <div className="wrap">
        <SectionHead title="My bookings" />
        {loading ? (
          <div className="h-40 animate-pulse rounded-2xl bg-line" />
        ) : !data?.length ? (
          <EmptyState title="No bookings yet" text="Find a space and reserve your first slot." href="/studios" cta="Explore studios" />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg text-muted"><tr><th className="p-3.5">Studio</th><th className="p-3.5">Date</th><th className="p-3.5">Time</th><th className="p-3.5">Total</th><th className="p-3.5">Status</th><th className="p-3.5" /></tr></thead>
              <tbody>
                {data.map((b) => (
                  <tr key={b._id} className="border-t border-line">
                    <td className="p-3.5 font-semibold">{b.studioTitle}</td>
                    <td className="p-3.5">{b.date}</td>
                    <td className="p-3.5">{b.startHour}:00 – {b.endHour}:00</td>
                    <td className="p-3.5">${b.total}</td>
                    <td className="p-3.5"><StatusBadge status={b.status} /></td>
                    <td className="p-3.5">{b.status === "Pending" && <button onClick={() => setTarget(b)} className="btn btn-outline btn-sm">Cancel booking</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal open={!!target} onClose={() => setTarget(null)} title="Cancel this booking?">
        <p className="text-muted">Your slot at {target?.studioTitle} on {target?.date} will be released.</p>
        <div className="mt-5 flex justify-end gap-2.5">
          <button onClick={() => setTarget(null)} className="btn btn-outline btn-sm">Keep booking</button>
          <button onClick={confirmCancel} className="btn btn-sm !border-red-700 !bg-red-700">Cancel booking</button>
        </div>
      </Modal>
    </section>
  );
}
