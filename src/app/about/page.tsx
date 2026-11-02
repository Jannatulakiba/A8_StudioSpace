import type { Metadata } from "next";
import Link from "next/link";
import StatsBand from "@/components/home/StatsBand";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <section className="wrap py-16">
        <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">Built by creators, for creators</h1>
        <p className="max-w-[62ch] text-lg text-muted">StudioSpace started when a photographer couldn’t find a clean cyc wall on a Friday afternoon. Today, hosts across Bangladesh list their spaces and creators book them in minutes, with pricing and availability in plain view.</p>
        <Link href="/studios" className="btn mt-7">Explore studios</Link>
      </section>
      <StatsBand />
    </>
  );
}
