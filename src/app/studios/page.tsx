import type { Metadata } from "next";
import { Suspense } from "react";
import ExploreClient from "@/components/studios/ExploreClient";
import { PageSkeleton } from "@/components/ui/Skeletons";

export const metadata: Metadata = { title: "Explore Studios" };

export default function StudiosPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ExploreClient />
    </Suspense>
  );
}
