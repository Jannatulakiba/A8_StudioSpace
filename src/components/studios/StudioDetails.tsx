"use client";

import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { getStudio } from "@/lib/api";
import { REVIEWS } from "@/lib/constants";
import { useAsync } from "@/lib/hooks";
import { useSession } from "@/lib/session";
import BookingModal from "@/components/booking/BookingModal";
import { PageSkeleton } from "@/components/ui/Skeletons";
import StudioImage from "./StudioImage";

export default function StudioDetails({ id }: { id: string }) {
  const { data: s, loading } = useAsync(() => getStudio(id), id);
  const { user } = useSession();
  const router = useRouter();
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);

  if (loading) return <PageSkeleton />;
  if (!s) notFound();

  const imgs = s.images;
  const own = user?.email === s.ownerEmail;
  const step = (d: number) => setI((v) => (v + d + imgs.length) % imgs.length);

  function book() {
    if (!user) {
      toast.error("Log in to book a studio.");
      return router.push(`/login?next=/studios/${id}`);
    }
    setOpen(true);
  }

  return (
    <section className="py-10">
      <div className="wrap grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="relative h-[340px] overflow-hidden rounded-2xl bg-[#0a111c] md:h-[430px]">
            <div key={i} className="absolute inset-0 [animation:fade_.6s_both]">
              <StudioImage src={imgs[i]} alt={`${s.title} photo ${i + 1}`} sizes="(min-width:1024px) 60vw, 100vw" priority />
            </div>
            {imgs.length > 1 && (
              <>
                <button onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-lg bg-[#0e1a2b]/70 text-white"><ChevronLeft /></button>
                <button onClick={() => step(1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-lg bg-[#0e1a2b]/70 text-white"><ChevronRight /></button>
              </>
            )}
          </div>
          {imgs.length > 1 && (
            <div className="mt-3 flex gap-2.5">
              {imgs.map((src, n) => (
                <button key={src + n} onClick={() => setI(n)} aria-label={`Show photo ${n + 1}`} className={`relative h-16 w-24 cursor-pointer overflow-hidden rounded-lg border-2 ${n === i ? "border-brand" : "border-transparent opacity-70"}`}>
                  <StudioImage src={src} alt="" sizes="96px" />
                </button>
              ))}
            </div>
          )}

          <h1 className="mt-6 text-3xl font-extrabold md:text-4xl">{s.title}</h1>
          <p className="mt-1.5 text-muted">{s.category} · {s.location} · {s.rating > 0 ? `★ ${s.rating.toFixed(1)}` : "New listing"}</p>
          <p className="mt-4 max-w-[65ch]">{s.overview}</p>

          <h2 className="mt-7 text-xl font-bold">Amenities</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {s.amenities.map((a) => <span key={a} className="rounded-full border border-line bg-surface px-3 py-1 text-sm">{a}</span>)}
          </div>

          <h2 className="mt-7 text-xl font-bold">Reviews</h2>
          {REVIEWS.map((r) => (
            <div key={r.name} className="border-t border-line py-3">
              <p><b>{r.name}</b> <span className="text-brand">{"★".repeat(r.rating)}</span></p>
              <p className="text-muted">{r.text}</p>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-surface p-6 lg:sticky lg:top-24">
          <p className="font-display text-3xl font-extrabold">${s.hourlyRate}<span className="text-base font-normal text-muted"> / hr</span></p>
          <p className="mt-1 text-muted">Security deposit ${s.deposit} · Up to {s.capacity} people</p>
          <hr className="my-4 border-line" />
          <p className="font-bold">Hosted by {s.ownerName}</p>
          <p className="text-muted">{s.ownerEmail}</p>
          <button onClick={book} disabled={own} className="btn mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50">Book workspace now</button>
          {own && <p className="mt-2 text-sm text-muted">This is your own listing, so booking is turned off.</p>}
        </aside>
      </div>
      <BookingModal studio={s} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
