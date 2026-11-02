"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createStudio, updateStudio } from "@/lib/api";
import { AMENITIES, CATEGORIES } from "@/lib/constants";
import { useSession } from "@/lib/session";
import type { Studio } from "@/lib/types";
import { uploadImage } from "@/lib/upload";

const label = "mb-1.5 mt-4 block text-sm font-semibold";

export default function StudioForm({ initial }: { initial?: Studio }) {
  const { user } = useSession();
  const router = useRouter();
  const [image, setImage] = useState(initial?.images[0] ?? "");
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      setImage(await uploadImage(file));
      toast.success("Image uploaded.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    if (!image) return toast.error("Add an image URL or upload a photo.");
    const f = new FormData(e.currentTarget);
    const data = {
      title: String(f.get("title")).trim(),
      category: String(f.get("category")),
      hourlyRate: Number(f.get("hourlyRate")),
      deposit: Number(f.get("deposit")),
      capacity: Number(f.get("capacity")),
      location: String(f.get("location")).trim(),
      overview: String(f.get("overview")).trim(),
      amenities: f.getAll("amenities").map(String),
      images: [image, ...(initial?.images.slice(1) ?? [])],
    };
    setBusy(true);
    try {
      if (initial) await updateStudio(initial._id, data);
      else await createStudio({ ...data, ownerName: user.name, ownerEmail: user.email });
      toast.success(initial ? "Studio updated." : "Studio published.");
      router.push("/my-listings");
    } catch {
      toast.error("Something went wrong. Try again.");
      setBusy(false);
    }
  }

  return (
    <section className="py-12">
      <div className="wrap">
        <form onSubmit={onSubmit} className="mx-auto max-w-3xl rounded-2xl border border-line bg-surface p-7">
          <h1 className="text-3xl font-bold">{initial ? "Update studio" : "Add a new studio"}</h1>
          <div className="grid gap-x-4 sm:grid-cols-2">
            <div><label className={label} htmlFor="title">Title</label><input id="title" name="title" required defaultValue={initial?.title} className="field" /></div>
            <div><label className={label} htmlFor="category">Category</label>
              <select id="category" name="category" defaultValue={initial?.category} className="field">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div><label className={label} htmlFor="hourlyRate">Hourly rate ($)</label><input id="hourlyRate" name="hourlyRate" type="number" min={1} required defaultValue={initial?.hourlyRate} className="field" /></div>
            <div><label className={label} htmlFor="deposit">Security deposit ($)</label><input id="deposit" name="deposit" type="number" min={0} required defaultValue={initial?.deposit} className="field" /></div>
            <div><label className={label} htmlFor="capacity">Max capacity</label><input id="capacity" name="capacity" type="number" min={1} required defaultValue={initial?.capacity} className="field" /></div>
            <div><label className={label} htmlFor="location">Location / address</label><input id="location" name="location" required defaultValue={initial?.location} className="field" /></div>
            <div><label className={label}>Host name</label><input readOnly value={user?.name ?? ""} className="field opacity-65" /></div>
            <div><label className={label}>Host email</label><input readOnly value={user?.email ?? ""} className="field opacity-65" /></div>
          </div>

          <label className={label} htmlFor="image">Image URL</label>
          <input id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://i.ibb.co/..." className="field" />
          <label className={label} htmlFor="file">Or upload a photo (imgbb)</label>
          <input id="file" type="file" accept="image/*" onChange={onFile} disabled={uploading} className="field" />
          {uploading && <p className="mt-1 text-sm text-muted">Uploading...</p>}

          <p className={label}>Amenities</p>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map((a) => (
              <label key={a} className="flex cursor-pointer items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm">
                <input type="checkbox" name="amenities" value={a} defaultChecked={initial?.amenities.includes(a)} />{a}
              </label>
            ))}
          </div>

          <label className={label} htmlFor="overview">Detailed overview</label>
          <textarea id="overview" name="overview" rows={4} required defaultValue={initial?.overview} className="field" />
          <button disabled={busy} className="btn mt-6 disabled:opacity-60">{busy ? "Saving..." : initial ? "Save changes" : "Publish studio"}</button>
        </form>
      </div>
    </section>
  );
}
