import type { Metadata } from "next";
import RequireAuth from "@/components/auth/RequireAuth";
import StudioForm from "@/components/studios/StudioForm";

export const metadata: Metadata = { title: "Add New Studio" };

export default function AddStudioPage() {
  return (
    <RequireAuth>
      <StudioForm />
    </RequireAuth>
  );
}
