"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/session";
import { syncUser } from "@/lib/api";

export default function UserSync() {
  const { user } = useSession();
  useEffect(() => {
    if (!user?.email) return;
    syncUser({ name: user.name, email: user.email, image: user.image }).catch(() => {});
  }, [user?.email]);
  return null;
}