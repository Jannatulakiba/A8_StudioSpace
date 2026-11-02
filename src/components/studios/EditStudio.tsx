"use client";

import { getStudio } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { useSession } from "@/lib/session";
import EmptyState from "@/components/ui/EmptyState";
import { PageSkeleton } from "@/components/ui/Skeletons";
import StudioForm from "./StudioForm";

export default function EditStudio({ id }: { id: string }) {
  const { user } = useSession();
  const { data, loading } = useAsync(() => getStudio(id), id);
  if (loading) return <PageSkeleton />;
  if (!data) return <div className="wrap py-12"><EmptyState title="Studio not found" text="This listing may have been deleted." href="/my-listings" cta="Back to my listings" /></div>;
  if (data.ownerEmail !== user?.email) return <div className="wrap py-12"><EmptyState title="You can’t edit this listing" text="Only the host who created it can update it." href="/my-listings" cta="Back to my listings" /></div>;
  return <StudioForm initial={data} />;
}
