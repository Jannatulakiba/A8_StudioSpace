"use client";

import { getStudios } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import SectionHead from "@/components/ui/SectionHead";
import StudioGrid from "@/components/studios/StudioGrid";

export default function FeaturedStudios() {
  const { data, loading, error, reload } = useAsync(() => getStudios({ sort: "rating", limit: 6 }), "featured");
  return (
    <section className="py-16">
      <div className="wrap">
        <SectionHead title="Featured studios" sub="Top-rated spaces booked this month." href="/studios" cta="See all studios" />
        {error && !loading ? (
          <div className="rounded-2xl border border-line bg-surface p-10 text-center">
            <p className="font-display text-lg font-bold">Studios are on a break</p>
            <p className="mt-1 text-sm text-muted">Could not reach the studio catalogue. Check your connection and retry.</p>
            <button type="button" onClick={reload} className="btn btn-sm mt-4">Try again</button>
          </div>
        ) : (
          <StudioGrid studios={data} loading={loading} />
        )}
      </div>
    </section>
  );
}
