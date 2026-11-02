import Link from "next/link";

export default function SectionHead({ title, sub, href, cta }: { title: string; sub?: string; href?: string; cta?: string }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {sub && <p className="mt-1.5 text-muted">{sub}</p>}
      </div>
      {href && cta && <Link href={href} className="btn btn-outline btn-sm">{cta}</Link>}
    </div>
  );
}
