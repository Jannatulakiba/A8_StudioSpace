import Link from "next/link";

export function ApertureIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2l4 7M3.5 7.5h8M2.8 14l4-7M7.5 21l4-7M20.5 16.5h-8M21.2 10l-4 7" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="StudioSpace home" className={`flex items-center gap-2 font-display text-[1.35rem] font-extrabold ${light ? "text-white" : "text-ink"}`}>
      <ApertureIcon className="h-[30px] w-[30px] text-brand" />
      StudioSpace
    </Link>
  );
}
