"use client";

import { authClient } from "@/lib/auth-client";

export type User = { name: string; email: string; image?: string };

/**
 * Better Auth-backed session. Same hook shape as the old mock
 * ({ user, ready, loading, signOut }) so callers keep working.
 * User data now lives in MongoDB (see src/lib/auth.ts) and is
 * served by the /api/auth handler.
 */
export function useSession() {
  const { data, isPending } = authClient.useSession();
  const signOut = async () => {
    await authClient.signOut();
  };
  return {
    user: (data?.user as User | undefined) ?? null,
    ready: !isPending,
    loading: isPending,
    signOut,
  };
}

/**
 * Google OAuth via better-auth. Needs GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET
 * in the provider config (src/lib/auth.ts) before it will work.
 */
export async function loginWithGoogle(callbackURL = "/") {
  const { error } = await authClient.signIn.social({ provider: "google", callbackURL });
  if (error) throw new Error(error.message ?? "Google sign-in failed.");
}
