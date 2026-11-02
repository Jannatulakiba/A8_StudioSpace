"use client";

import { getStudios } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import SectionHead from "@/components/ui/SectionHead";
import StudioGrid from "@/components/studios/StudioGrid";

export default function FeaturedStudios() {
  const { data, loading } = useAsync(() => getStudios({ sort: "rating", limit: 6 }), "featured");
  return (
    <section className="py-16">
      <div className="wrap">
        <SectionHead title="Featured studios" sub="Top-rated spaces booked this month." href="/studios" cta="See all studios" />
        <StudioGrid studios={data} loading={loading} />
      </div>
    </section>
  );
}
