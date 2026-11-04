"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { loginWithGoogle } from "@/lib/session";
import AuthShell from "./AuthShell";

function checkPassword(p: string) {
  if (!/[A-Z]/.test(p)) return "Add at least one uppercase letter.";
  if (!/[a-z]/.test(p)) return "Add at least one lowercase letter.";
  if (p.length < 6) return "Use at least 6 characters.";
  return "";
}

export default function RegisterForm() {
  const router = useRouter();
  const [pwError, setPwError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [loading, setLoading] = useState(false);

  function checkPhotoUrl(v: string) {
    if (!v) return ""; // optional
    try {
      const u = new URL(v);
      if (!u.hostname.includes(".")) return "Enter a valid image URL (https://…).";
      return "";
    } catch {
      return "Enter a valid image URL (https://…).";
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const password = String(f.get("password"));

    const photo = String(f.get("photoURL")).trim();
    const pErr = checkPhotoUrl(photo);
    setPhotoError(pErr);
    const msg = checkPassword(password);
    setPwError(msg);
    if (pErr) return toast.error(pErr);
    if (msg) return toast.error(msg);

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: String(f.get("name")).trim(),
      email: String(f.get("email")).trim(),
      password,
      image: photo || undefined,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message ?? "Registration failed.");
      return;
    }
    // better-auth signs the user in automatically on signUp.
    toast.success("Account created.");
    router.push("/");
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed.");
    }
  };

  const label = "mb-1.5 mt-4 block text-sm font-semibold";
  return (
    <AuthShell>
        <form onSubmit={handleRegister} className="mx-auto w-full max-w-lg rounded-2xl border border-line bg-surface p-7">
          <h1 className="mb-2 text-3xl font-bold">Create your account</h1>
          <label htmlFor="name" className={label}>Name</label>
          <input id="name" name="name" required className="field" />
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" required className="field" />
          <label htmlFor="photoURL" className={label}>Photo URL <span className="font-normal text-muted">(optional)</span></label>
          <input
            id="photoURL"
            name="photoURL"
            type="url"
            placeholder="https://i.ibb.co/…"
            className={photoError ? "field border-red-500" : "field"}
            aria-invalid={!!photoError}
          />
          {photoError && <p role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">{photoError}</p>}
          <label htmlFor="password" className={label}>Password</label>
          <input id="password" name="password" type="password" required className="field" />
          {pwError && <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">{pwError}</p>}
          <button className="btn mt-5 w-full" disabled={loading}>{loading ? "Creating account…" : "Register"}</button>
          <button type="button" onClick={handleGoogleRegister} className="btn btn-outline mt-3 w-full">Continue with Google</button>
          <p className="mt-4 text-center text-sm text-muted">Already registered? <Link href="/login" className="font-semibold text-brand">Log in</Link></p>
        </form>
    </AuthShell>
  );
}
