"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteStudio, getStudios } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { useSession } from "@/lib/session";
import type { Studio } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";
import SectionHead from "@/components/ui/SectionHead";

export default function MyListings() {
  const { user } = useSession();
  const email = user?.email ?? "";
  const { data, loading, reload } = useAsync(() => getStudios({ owner: email }), `mine-${email}`);
  const [target, setTarget] = useState<Studio | null>(null);

  async function confirmDelete() {
    if (!target) return;
    await deleteStudio(target._id);
    toast.success("Studio deleted.");
    setTarget(null);
    reload();
  }

  return (
    <section className="py-12">
      <div className="wrap">
        <SectionHead title="My studio listings" href="/add-studio" cta="Add new studio" />
        {loading ? (
          <div className="h-40 animate-pulse rounded-2xl bg-line" />
        ) : !data?.length ? (
          <EmptyState title="You haven’t listed a studio yet" text="Add your first space and start taking bookings." href="/add-studio" cta="Add new studio" />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg text-muted"><tr><th className="p-3.5">Studio</th><th className="p-3.5">Category</th><th className="p-3.5">Rate</th><th className="p-3.5">Actions</th></tr></thead>
              <tbody>
                {data.map((s) => (
                  <tr key={s._id} className="border-t border-line">
                    <td className="p-3.5 font-semibold">{s.title}</td>
                    <td className="p-3.5">{s.category}</td>
                    <td className="p-3.5">${s.hourlyRate}/hr</td>
                    <td className="flex gap-2 p-3.5">
                      <Link href={`/studios/edit/${s._id}`} className="btn btn-outline btn-sm">Update</Link>
                      <button onClick={() => setTarget(s)} className="btn btn-sm !border-red-700 !bg-red-700">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal open={!!target} onClose={() => setTarget(null)} title="Delete this studio?">
        <p className="text-muted">“{target?.title}” will be removed from StudioSpace. This can’t be undone.</p>
        <div className="mt-5 flex justify-end gap-2.5">
          <button onClick={() => setTarget(null)} className="btn btn-outline btn-sm">Keep it</button>
          <button onClick={confirmDelete} className="btn btn-sm !border-red-700 !bg-red-700">Delete studio</button>
        </div>
      </Modal>
    </section>
  );
}
