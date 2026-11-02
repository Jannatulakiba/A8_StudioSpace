import type { Metadata } from "next";
import RequireAuth from "@/components/auth/RequireAuth";
import MyListings from "@/components/studios/MyListings";

export const metadata: Metadata = { title: "My Studio Listings" };

export default function MyListingsPage() {
  return (
    <RequireAuth>
      <MyListings />
    </RequireAuth>
  );
}
