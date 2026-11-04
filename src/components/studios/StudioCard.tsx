import Link from "next/link";
import type { Studio } from "@/lib/types";
import StudioImage from "./StudioImage";

export default function StudioCard({ s }: { s: Studio }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-[190px] overflow-hidden">
        <StudioImage src={s.images[0]} alt={s.title} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="transition duration-700 group-hover:scale-110" />
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-0.5 text-xs font-semibold text-surface">{s.category}</span>
        <span className="absolute right-3 top-3 rounded-full border border-line bg-surface/95 px-2 py-0.5 text-xs font-bold text-ink">{s.rating > 0 ? `★ ${s.rating.toFixed(1)}` : "New"}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="min-h-[2.5em] text-lg font-bold">{s.title}</h3>
        <p className="text-sm text-muted">{s.location} · up to {s.capacity} people</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="font-display text-xl font-bold">${s.hourlyRate}<span className="text-sm font-normal text-muted"> / hr</span></p>
          <Link href={`/studios/${s._id}`} className="btn btn-sm">View details</Link>
        </div>
      </div>
    </article>
  );
}
