
import type { Booking, NewStudio, Studio } from "./types";

export const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";



export type StudioQuery = {
  search?: string;
  category?: string;
  owner?: string;
  sort?: "rating" | "newest" | "price-asc" | "price-desc";
  limit?: number;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  console.log("API URL:", API, "→", path);
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Something went wrong.");
  }
  return res.json();
}

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

export async function createStudio(data: NewStudio): Promise<Studio> {
  return request<Studio>("/api/studios", { method: "POST", body: JSON.stringify(data) });
}

export async function updateStudio(id: string, patch: Partial<NewStudio>): Promise<void> {
  await request(`/api/studios/${id}`, { method: "PUT", body: JSON.stringify(patch) });
}

export async function deleteStudio(id: string): Promise<void> {
  await request(`/api/studios/${id}`, { method: "DELETE" });
}

export async function getMyBookings(email: string): Promise<Booking[]> {
  return request<Booking[]>(`/api/bookings?email=${encodeURIComponent(email)}`);
}

type BookingInput = { studio: Studio; userEmail: string; date: string; startHour: number; endHour: number };

export async function createBooking(i: BookingInput): Promise<Booking> {
  if (i.endHour <= i.startHour) throw new Error("End time must be after start time.");
  return request<Booking>("/api/bookings", {
    method: "POST",
    body: JSON.stringify({
      studioId: i.studio._id,
      userEmail: i.userEmail,
      date: i.date,
      startHour: i.startHour,
      endHour: i.endHour,
    }),
  });
}
export async function syncUser(u: { name: string; email: string; image?: string | null }): Promise<void> {
  await request("/api/users", { method: "POST", body: JSON.stringify(u) });
}

export async function cancelBooking(id: string): Promise<void> {
  await request(`/api/bookings/${id}/cancel`, { method: "PATCH" });
}