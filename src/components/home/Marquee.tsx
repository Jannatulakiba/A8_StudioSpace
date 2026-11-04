import Link from "next/link";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/constants";

export default function Marquee() {
  const items = Array.from({ length: 4 }, () => CATEGORIES).flat();
  return (
    <div className="overflow-hidden whitespace-nowrap bg-brand py-4 font-display text-2xl font-bold text-white">
      <div className="marquee-track">
        {items.map((c, i) => {
          // প্রথম ২ সেট viewport-এ loop-এর জন্য ২ সেট আবার — screen reader-এ duplicate নয়
          const dup = i >= CATEGORIES.length * 2;
          return (
            <Link
              key={i}
              href={`/studios?category=${encodeURIComponent(c)}`}
              aria-hidden={dup || undefined}
              tabIndex={dup ? -1 : undefined}
              className="after:mx-8 after:inline-block after:h-2 after:w-2 after:rounded-full after:bg-white/60 after:align-middle after:content-['']"
            >
              {CATEGORY_LABELS[c]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
