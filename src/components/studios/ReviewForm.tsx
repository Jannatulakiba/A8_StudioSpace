"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { postReview } from "@/lib/api";
import { useSession } from "@/lib/session";

export default function ReviewForm({ studioId, onPosted }: { studioId: string; onPosted: () => void }) {
  const { user } = useSession();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="mt-4 rounded-2xl border border-line bg-surface px-5 py-4 text-sm text-muted">
        Want to review this space?{" "}
        <a href={`/login`} className="font-semibold text-brand">Log in</a> and tell other creators how it went.
      </div>
    );
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!rating) {
      const msg = "Pick a star rating first.";
      setError(msg);
      return toast.error(msg);
    }
    if (comment.trim().length < 4) {
      const msg = "Write a short comment (at least 4 characters).";
      setError(msg);
      return toast.error(msg);
    }
    setBusy(true);
    try {
      await postReview(studioId, { rating, comment: comment.trim() });
      toast.success("Review posted. Thanks for the intel!");
      setRating(0);
      setComment("");
      onPosted();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not post the review.";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 rounded-2xl border border-line bg-surface p-5">
      <p className="font-semibold">Rate this studio</p>
      <div className="mt-2 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => setRating(n)}
            className="cursor-pointer"
          >
            <Star className={`h-6 w-6 ${n <= rating ? "fill-brand text-brand" : "text-line"}`} />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        placeholder="Lighting, sound, host responsiveness — what should other creators know?"
        className="field mt-3 resize-none"
      />
      {error && <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
      <button className="btn btn-sm mt-3" disabled={busy}>{busy ? "Posting…" : "Post review"}</button>
    </form>
  );
}
