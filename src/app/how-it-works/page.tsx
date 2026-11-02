import type { Metadata } from "next";
import Link from "next/link";
import Guarantee from "@/components/home/Guarantee";
import HowItWorks from "@/components/home/HowItWorks";

export const metadata: Metadata = { title: "How It Works" };

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorks />
      <Guarantee />
      <section className="py-14 text-center">
        <Link href="/studios" className="btn">Explore studios</Link>
      </section>
    </>
  );
}
