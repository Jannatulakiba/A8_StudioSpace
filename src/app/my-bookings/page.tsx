import type { Metadata } from "next";
import RequireAuth from "@/components/auth/RequireAuth";
import MyBookings from "@/components/booking/MyBookings";

export const metadata: Metadata = { title: "My Bookings" };

export default function MyBookingsPage() {
  return (
    <RequireAuth>
      <MyBookings />
    </RequireAuth>
  );
}
