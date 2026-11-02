"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBooking } from "@/lib/api";
import { END_HOURS, START_HOURS } from "@/lib/constants";
import { useSession } from "@/lib/session";
import type { Studio } from "@/lib/types";
import Modal from "@/components/ui/Modal";

export default function BookingModal({ studio, open, onClose }: { studio: Studio; open: boolean; onClose: () => void }) {
  const { user } = useSession();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [start, setStart] = useState(10);
  const [end, setEnd] = useState(12);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const hours = Math.max(end - start, 0);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setError("");
    setBusy(true);
    try {
      await createBooking({ studio, userEmail: user.email, date, startHour: start, endHour: end });
      toast.success("Booking sent. Status: Pending.");
      onClose();
      router.push("/my-bookings");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Booking failed. Try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={`Book ${studio.title}`}>
      <p className="text-muted">${studio.hourlyRate} / hr · deposit ${studio.deposit}</p>
      <form onSubmit={submit}>
        <label className="mb-1.5 mt-4 block text-sm font-semibold" htmlFor="bd">Date</label>
        <input id="bd" type="date" required value={date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)} className="field" />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 mt-4 block text-sm font-semibold" htmlFor="bs">Start</label>
            <select id="bs" value={start} onChange={(e) => setStart(+e.target.value)} className="field">
              {START_HOURS.map((h) => <option key={h} value={h}>{h}:00</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 mt-4 block text-sm font-semibold" htmlFor="be">End</label>
            <select id="be" value={end} onChange={(e) => setEnd(+e.target.value)} className="field">
              {END_HOURS.map((h) => <option key={h} value={h}>{h}:00</option>)}
            </select>
          </div>
        </div>
        <p className="mt-4 font-semibold">Total: ${hours * studio.hourlyRate} <span className="font-normal text-muted">({hours} hr)</span></p>
        {error && <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
        <div className="mt-5 flex justify-end gap-2.5">
          <button type="button" onClick={onClose} className="btn btn-outline btn-sm">Close</button>
          <button disabled={busy} className="btn btn-sm disabled:opacity-60">{busy ? "Booking..." : "Confirm booking"}</button>
        </div>
      </form>
    </Modal>
  );
}
