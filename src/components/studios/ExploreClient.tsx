"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStudios, type StudioQuery } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import { useAsync } from "@/lib/hooks";
import EmptyState from "@/components/ui/EmptyState";
import SectionHead from "@/components/ui/SectionHead";
import StudioGrid from "./StudioGrid";

export default function ExploreClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const category = sp.get("category") ?? "All";
  const sort = (sp.get("sort") ?? "newest") as NonNullable<StudioQuery["sort"]>;
  const q = sp.get("q") ?? "";
  const [text, setText] = useState(q);

  const { data, loading } = useAsync(() => getStudios({ search: q, category, sort }), `${q}|${category}|${sort}`);

  function update(key: string, value: string) {
    const p = new URLSearchParams(sp.toString());
    if (value && value !== "All") p.set(key, value);
    else p.delete(key);
    router.replace(`/studios?${p.toString()}`, { scroll: false });
  }

  return (
    <section className="py-12">
      <div className="wrap">
        <SectionHead title="Explore studios" sub={loading ? "Loading spaces..." : `${data?.length ?? 0} spaces available`} />
        <div className="mb-6 flex flex-wrap gap-3">
          <input className="field max-w-xs" placeholder="Search by studio name or city" aria-label="Search studios" value={text} onChange={(e) => { setText(e.target.value); update("q", e.target.value); }} />
          <select className="field max-w-[210px]" aria-label="Category" value={category} onChange={(e) => update("category", e.target.value)}>
            <option value="All">All categories</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select className="field max-w-[210px]" aria-label="Sort by" value={sort} onChange={(e) => update("sort", e.target.value)}>
            <option value="newest">Newest first</option>
            <option value="rating">Top rated</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
        {!loading && data?.length === 0 ? (
          <EmptyState title="No studios match your search" text="Try a different name or clear the category filter." href="/studios" cta="Clear filters" />
        ) : (
          <StudioGrid studios={data} loading={loading} />
        )}
      </div>
    </section>
  );
}
