import type { Booking, NewStudio, Studio } from "./types";
import {
  cancelBookingAction,
  completeBookingAction,
  confirmBookingAction,
  createBookingAction,
  createReviewAction,
  createStudioAction,
  deleteStudioAction,
  getHostBookingsAction,
  getMyBookingsAction,
  getWishlistAction,
  addWishlistAction,
  removeWishlistAction,
  syncUserAction,
  updateStudioAction,
} from "./actions";

export const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type StudioQuery = {
  search?: string;
  category?: string;
  owner?: string;
  sort?: "rating" | "newest" | "price-asc" | "price-desc";
  limit?: number;
};

// শুধু খোলা (public) GET-এর জন্য
async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { cache: "no-store" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed (${res.status})`);
  }
  return res.json();
}

// Server Action-এর ফল খুলে দেখা, error হলে throw
function unwrap<T>(r: { ok: true; data: T } | { ok: false; message: string }): T {
  if (!r.ok) throw new Error(r.message);
  return r.data;
}

/* ---------- public ---------- */
export async function getStudios(q: StudioQuery = {}): Promise<Studio[]> {
  const p = new URLSearchParams();
  if (q.search) p.set("search", q.search);
  if (q.category && q.category !== "All") p.set("category", q.category);
  if (q.owner) p.set("owner", q.owner);
  if (q.sort) p.set("sort", q.sort);
  if (q.limit) p.set("limit", String(q.limit));
  return request<Studio[]>(`/api/studios?${p.toString()}`);
}

export async function getStudio(id: string): Promise<Studio | null> {
  try {
    return await request<Studio>(`/api/studios/${id}`);
  } catch {
    return null;
  }
}

/* ---------- login লাগে (Server Action দিয়ে, JWT header-এ যায়) ---------- */
export async function createStudio(data: NewStudio): Promise<Studio> {
  return unwrap(await createStudioAction(data)) as Studio;
}

export async function updateStudio(id: string, patch: Partial<NewStudio>): Promise<void> {
  unwrap(await updateStudioAction(id, patch));
}

export async function deleteStudio(id: string): Promise<void> {
  unwrap(await deleteStudioAction(id));
}

export async function getMyBookings(_email?: string): Promise<Booking[]> {
  return unwrap(await getMyBookingsAction()) as Booking[]; // email এখন token থেকে আসে
}

type BookingInput = {
  studio: Studio;
  userEmail?: string; // আগের caller গুলো ভাঙবে না, server এটা ব্যবহার করে না
  date: string;
  startHour: number;
  endHour: number;
};

export async function createBooking(i: BookingInput): Promise<Booking> {
  if (i.endHour <= i.startHour) throw new Error("End time must be after start time.");
  return unwrap(
    await createBookingAction({
      studioId: i.studio._id,
      date: i.date,
      startHour: i.startHour,
      endHour: i.endHour,
    }),
  ) as Booking;
}

export async function cancelBooking(id: string): Promise<void> {
  unwrap(await cancelBookingAction(id));
}

/* ---------- host side booking lifecycle ---------- */
export async function getHostBookings(): Promise<Booking[]> {
  return unwrap(await getHostBookingsAction()) as Booking[];
}

export async function confirmBooking(id: string): Promise<void> {
  unwrap(await confirmBookingAction(id));
}

export async function completeBooking(id: string): Promise<void> {
  unwrap(await completeBookingAction(id));
}

/* ---------- reviews ---------- */
export async function postReview(id: string, r: { rating: number; comment: string }): Promise<void> {
  unwrap(await createReviewAction(id, r));
}

/* ---------- wishlist ---------- */
export async function getWishlist(): Promise<Studio[]> {
  return unwrap(await getWishlistAction()) as Studio[];
}

export async function addSaved(id: string): Promise<void> {
  unwrap(await addWishlistAction(id));
}

export async function removeSaved(id: string): Promise<void> {
  unwrap(await removeWishlistAction(id));
}

export async function syncUser(u: { name: string; email: string; image?: string | null }): Promise<void> {
  unwrap(await syncUserAction({ name: u.name, image: u.image }));
}