import type { Metadata } from "next";
import { Suspense } from "react";
import RequireAuth from "@/components/auth/RequireAuth";
import EditStudio from "@/components/studios/EditStudio";
import { PageSkeleton } from "@/components/ui/Skeletons";

export const metadata: Metadata = { title: "Update Studio" };

async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <RequireAuth>
      <EditStudio id={id} />
    </RequireAuth>
  );
}

export default function EditStudioPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Edit params={params} />
    </Suspense>
  );
}
