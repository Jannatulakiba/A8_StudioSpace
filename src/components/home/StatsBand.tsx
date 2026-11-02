"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { to: 250, suffix: "+", label: "Studios listed" },
  { to: 12000, suffix: "+", label: "Hours booked" },
  { to: 180, suffix: "", label: "Verified hosts" },
  { to: 15, suffix: " min", label: "Average support reply" },
];

function Counter({ to, suffix, label }: (typeof stats)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let start: number | null = null;
      const step = (ts: number) => {
        start ??= ts;
        const p = Math.min((ts - start) / 1400, 1);
        setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="rounded-2xl border border-line bg-surface p-6">
      <p className="font-display text-4xl font-extrabold text-brand">{n.toLocaleString()}{suffix}</p>
      <p className="mt-1 text-muted">{label}</p>
    </div>
  );
}

export default function StatsBand() {
  return (
    <section className="py-14">
      <div className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => <Counter key={s.label} {...s} />)}
      </div>
    </section>
  );
}
