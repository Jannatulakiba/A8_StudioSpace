"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { loginWithGoogle } from "@/lib/session";

export default function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: String(f.get("email")).trim(),
      password: String(f.get("password")),
    });
    setLoading(false);
    if (error) {
      const msg = error.message ?? "Login failed.";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("Welcome back.");
    router.push(next);
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed.");
    }
  };

  return (
    <section className="py-14">
      <div className="wrap">
        <form onSubmit={handleEmailLogin} className="mx-auto max-w-lg rounded-2xl border border-line bg-surface p-7">
          <h1 className="mb-2 text-3xl font-bold">Log in to StudioSpace</h1>
          <label htmlFor="email" className="mb-1.5 mt-4 block text-sm font-semibold">Email</label>
          <input id="email" name="email" type="email" required className="field" />
          <label htmlFor="password" className="mb-1.5 mt-4 block text-sm font-semibold">Password</label>
          <input id="password" name="password" type="password" required className="field" />
          {error && <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
          <p className="mt-2 text-right text-sm"><button type="button" onClick={() => toast.info("Password reset isn’t enabled yet.")} className="cursor-pointer font-semibold text-brand">Forgot password?</button></p>
          <button className="btn mt-4 w-full" disabled={loading}>{loading ? "Logging in…" : "Log in"}</button>
          <button type="button" onClick={handleGoogleLogin} className="btn btn-outline mt-3 w-full">Continue with Google</button>
          <p className="mt-4 text-center text-sm text-muted">New here? <Link href="/register" className="font-semibold text-brand">Create an account</Link></p>
        </form>
      </div>
    </section>
  );
}
