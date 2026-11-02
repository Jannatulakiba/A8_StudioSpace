import { readDB, writeDB } from "./mock-db";
import type { Booking, NewStudio, Studio } from "./types";

/**
 * Data layer. Ekhon mock (localStorage). Server ready hole prottek function er bhitore
 * fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/...`, { credentials: "include" }) boshbe.
 * Function signature same thakbe, tai component change korte hobe na.
 */
const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export type StudioQuery = {
  search?: string;
  category?: string;
  owner?: string;
  sort?: "rating" | "newest" | "price-asc" | "price-desc";
  limit?: number;
};

export async function getStudios(q: StudioQuery = {}): Promise<Studio[]> {
  await delay();
  let list = readDB().studios;
  if (q.category && q.category !== "All") list = list.filter((s) => s.category === q.category);
  if (q.owner) list = list.filter((s) => s.ownerEmail === q.owner);
  if (q.search) {
    const t = q.search.toLowerCase();
    list = list.filter((s) => s.title.toLowerCase().includes(t) || s.location.toLowerCase().includes(t));
  }
  const sorters: Record<string, (a: Studio, b: Studio) => number> = {
    rating: (a, b) => b.rating - a.rating,
    newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
    "price-asc": (a, b) => a.hourlyRate - b.hourlyRate,
    "price-desc": (a, b) => b.hourlyRate - a.hourlyRate,
  };
  list = [...list].sort(sorters[q.sort ?? "newest"]);
  return q.limit ? list.slice(0, q.limit) : list;
}

export async function getStudio(id: string): Promise<Studio | null> {
  await delay();
  return readDB().studios.find((s) => s._id === id) ?? null;
}

export async function createStudio(data: NewStudio): Promise<Studio> {
  await delay();
  const db = readDB();
  const studio: Studio = { ...data, _id: `s${Date.now()}`, rating: 0, createdAt: new Date().toISOString() };
  db.studios.unshift(studio);
  writeDB(db);
  return studio;
}

export async function updateStudio(id: string, patch: Partial<NewStudio>): Promise<void> {
  await delay();
  const db = readDB();
  db.studios = db.studios.map((s) => (s._id === id ? { ...s, ...patch } : s));
  writeDB(db);
}

export async function deleteStudio(id: string): Promise<void> {
  await delay();
  const db = readDB();
  db.studios = db.studios.filter((s) => s._id !== id);
  writeDB(db);
}

export async function getMyBookings(email: string): Promise<Booking[]> {
  await delay();
  return readDB().bookings.filter((b) => b.userEmail === email).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

type BookingInput = { studio: Studio; userEmail: string; date: string; startHour: number; endHour: number };

export async function createBooking(i: BookingInput): Promise<Booking> {
  await delay();
  if (i.endHour <= i.startHour) throw new Error("End time must be after start time.");
  const db = readDB();
  // Challenge 2: Confirmed booking er sathe overlap check (server e MongoDB query diye hobe)
  const clash = db.bookings.find((b) => b.studioId === i.studio._id && b.date === i.date && b.status === "Confirmed" && i.startHour < b.endHour && i.endHour > b.startHour);
  if (clash) throw new Error(`Already booked from ${clash.startHour}:00 to ${clash.endHour}:00 on this date. Pick another slot.`);
  const booking: Booking = {
    _id: `b${Date.now()}`,
    studioId: i.studio._id,
    studioTitle: i.studio.title,
    userEmail: i.userEmail,
    date: i.date,
    startHour: i.startHour,
    endHour: i.endHour,
    total: (i.endHour - i.startHour) * i.studio.hourlyRate,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  db.bookings.push(booking);
  writeDB(db);
  return booking;
}

export async function cancelBooking(id: string): Promise<void> {
  await delay();
  const db = readDB();
  db.bookings = db.bookings.map((b) => (b._id === id && b.status === "Pending" ? { ...b, status: "Cancelled" } : b));
  writeDB(db);
}
