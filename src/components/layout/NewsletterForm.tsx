"use client";

import { toast } from "sonner";

export default function NewsletterForm() {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        e.currentTarget.reset();
        toast.success("You are subscribed.");
      }}
    >
      <input type="email" required placeholder="you@email.com" aria-label="Email" className="field !border-[#25324a] !bg-[#121c2b] !text-white" />
      <button className="btn btn-sm">Subscribe</button>
    </form>
  );
}
