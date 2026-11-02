import Link from "next/link";
import { ApertureIcon } from "@/components/layout/Logo";

export default function EmptyState({ title, text, href, cta }: { title: string; text: string; href: string; cta: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface px-5 py-14 text-center">
      <ApertureIcon className="mx-auto h-14 w-14 text-muted" />
      <h3 className="mb-1.5 mt-3 text-xl font-bold">{title}</h3>
      <p className="mx-auto mb-5 max-w-md text-muted">{text}</p>
      <Link href={href} className="btn">{cta}</Link>
    </div>
  );
}
