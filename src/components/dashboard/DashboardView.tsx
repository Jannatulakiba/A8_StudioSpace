"use client";

import Link from "next/link";
import { getMyBookings, getStudios } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { useSession } from "@/lib/session";
import SectionHead from "@/components/ui/SectionHead";
import StatusBadge from "@/components/ui/StatusBadge";
import HostBookings from "@/components/dashboard/HostBookings";

export default function DashboardView() {
  const { user } = useSession();
  const email = user?.email ?? "";
  const listings = useAsync(() => getStudios({ owner: email }), `dl-${email}`);
  const bookings = useAsync(() => getMyBookings(email), `db-${email}`);
  const pending = bookings.data?.filter((b) => b.status === "Pending").length;

  const stats = [
    { label: "Active listings", value: listings.data?.length },
    { label: "Your bookings", value: bookings.data?.length },
    { label: "Awaiting host reply", value: pending },
  ];

  return (
    <section className="py-12">
      <div className="wrap">
        <SectionHead title={`Welcome back, ${user?.name ?? ""}`} />
        <div className="grid gap-5 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-surface p-6">
              <p className="font-display text-4xl font-extrabold text-brand">{s.value ?? "–"}</p>
              <p className="mt-1 text-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <h2 className="mb-3 mt-10 text-2xl font-bold">Bookings for my studios</h2>
        <HostBookings email={email} />
        <h2 className="mb-3 mt-10 text-2xl font-bold">Recent bookings</h2>
        <div className="rounded-2xl border border-line bg-surface">
          {bookings.data?.slice(0, 4).map((b) => (
            <div key={b._id} className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4 last:border-0">
              <div><p className="font-semibold">{b.studioTitle}</p><p className="text-sm text-muted">{b.date} · {b.startHour}:00 – {b.endHour}:00</p></div>
              <StatusBadge status={b.status} />
            </div>
          ))}
          {bookings.data?.length === 0 && <p className="p-5 text-muted">No bookings yet. <Link href="/studios" className="font-semibold text-brand">Explore studios</Link></p>}
        </div>
      </div>
    </section>
  );
}
