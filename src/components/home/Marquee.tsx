import { CATEGORIES, CATEGORY_LABELS } from "@/lib/constants";

export default function Marquee() {
  const items = Array.from({ length: 4 }, () => CATEGORIES).flat();
  return (
    <div aria-hidden="true" className="overflow-hidden whitespace-nowrap bg-brand py-4 font-display text-2xl font-bold text-white">
      <div className="marquee-track">
        {items.map((c, i) => (
          <span key={i} className="after:mx-8 after:inline-block after:h-2 after:w-2 after:rounded-full after:bg-white/60 after:align-middle after:content-['']">
            {CATEGORY_LABELS[c]}
          </span>
        ))}
      </div>
    </div>
  );
}
