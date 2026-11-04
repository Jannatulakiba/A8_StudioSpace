"use client";

import { getWishlist } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { useSession } from "@/lib/session";
import SectionHead from "@/components/ui/SectionHead";
import EmptyState from "@/components/ui/EmptyState";
import StudioGrid from "@/components/studios/StudioGrid";

export default function SavedStudios() {
  const { user } = useSession();
  const email = user?.email ?? "";
  const { data, loading, reload } = useAsync(() => getWishlist(), `wl-${email}`);

  return (
    <section className="py-12">
      <div className="wrap">
        <SectionHead title="Saved studios" sub="Your shortlisted spaces, one heart at a time." />
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-[340px] animate-pulse rounded-2xl bg-line" />
            ))}
          </div>
        ) : data?.length ? (
          <StudioGrid studios={data} loading={false} skeletons={3} onHeart={reload} />
        ) : (
          <EmptyState
            title="No saved studios yet"
            text="Tap the heart on any studio card and it will wait for you right here."
            href="/studios"
            cta="Explore studios"
          />
        )}
      </div>
    </section>
  );
}
