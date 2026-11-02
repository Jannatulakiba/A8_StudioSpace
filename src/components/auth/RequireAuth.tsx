"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "@/lib/session";
import { PageSkeleton } from "@/components/ui/Skeletons";

/** Private route guard. `ready` false thakle redirect kore na, tai reload e login e pathay na. */
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, ready } = useSession();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (ready && !user) {
      toast.error("Please log in to continue.");
      router.replace(`/login?next=${encodeURIComponent(path)}`);
    }
  }, [ready, user, router, path]);

  if (!ready || !user) return <PageSkeleton />;
  return <>{children}</>;
}
