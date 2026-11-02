import type { Metadata } from "next";
import RequireAuth from "@/components/auth/RequireAuth";
import DashboardView from "@/components/dashboard/DashboardView";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardView />
    </RequireAuth>
  );
}
