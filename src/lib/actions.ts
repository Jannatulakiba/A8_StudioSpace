"use server";

import { serverFetch } from "./server-api";

type R<T> = { ok: true; data: T } | { ok: false; message: string };

async function call<T>(path: string, init?: RequestInit): Promise<R<T>> {
  try {
    const res = await serverFetch(path, init);
    const body = await res.json().catch(() => ({}));
    return res.ok
      ? { ok: true, data: body as T }
      : { ok: false, message: body.message || "Request failed" };
  } catch (e) {
    console.error("Server action failed:", path, e);   // <-- ei line add holo
    return { ok: false, message: "Server unreachable" };
  }
}

export async function createStudioAction(data: unknown) {
  return call("/api/studios", { method: "POST", body: JSON.stringify(data) });
}

export async function updateStudioAction(id: string, patch: unknown) {
  return call(`/api/studios/${id}`, { method: "PUT", body: JSON.stringify(patch) });
}

export async function deleteStudioAction(id: string) {
  return call(`/api/studios/${id}`, { method: "DELETE" });
}

export async function createBookingAction(b: unknown) {
  return call("/api/bookings", { method: "POST", body: JSON.stringify(b) });
}

export async function cancelBookingAction(id: string) {
  return call(`/api/bookings/${id}/cancel`, { method: "PATCH" });
}

export async function getMyBookingsAction() {
  return call("/api/bookings");
}

export async function syncUserAction(u: unknown) {
  return call("/api/users", { method: "POST", body: JSON.stringify(u) });
}