import type { Metadata } from "next";
import RequireAuth from "@/components/auth/RequireAuth";
import SavedStudios from "@/components/studios/SavedStudios";

export const metadata: Metadata = { title: "Saved Studios" };

export default function SavedStudiosPage() {
  return (
    <RequireAuth>
      <SavedStudios />
    </RequireAuth>
  );
}
