import { Suspense } from "react";
import StudioDetails from "@/components/studios/StudioDetails";
import { PageSkeleton } from "@/components/ui/Skeletons";

async function Details({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StudioDetails id={id} />;
}

export default function StudioPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Details params={params} />
    </Suspense>
  );
}