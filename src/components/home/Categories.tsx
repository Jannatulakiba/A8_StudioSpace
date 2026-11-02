import Link from "next/link";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/constants";
import { ApertureIcon } from "@/components/layout/Logo";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";

const sides = ["left", "up", "up", "up", "right"] as const;

export default function Categories() {
  return (
    <section className="border-y border-line bg-surface py-16">
      <div className="wrap">
        <SectionHead title="Browse by category" sub="Jump straight to the kind of space you need." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c} from={sides[i]} delay={i * 70} className="h-full">
              <Link href={`/studios?category=${encodeURIComponent(c)}`} className="group flex h-full flex-col items-center gap-2 rounded-2xl border border-line bg-bg px-3 py-6 text-center font-semibold transition hover:border-brand">
                <ApertureIcon className="h-9 w-9 text-brand transition duration-500 group-hover:rotate-[60deg]" />
                {CATEGORY_LABELS[c]}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
