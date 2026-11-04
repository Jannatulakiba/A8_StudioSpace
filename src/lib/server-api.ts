import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function serverFetch(path: string, init: RequestInit = {}) {
  // login করা user-এর BetterAuth JWT (session cookie থেকে)
  const jwtToken = await auth.api.getToken({ headers: await headers() });

  return fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(jwtToken?.token ? { authorization: `Bearer ${jwtToken.token}` } : {}),
    },
  });
}