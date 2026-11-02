"use client";

import { useEffect, useRef, useState } from "react";

type From = "up" | "left" | "right";
const hidden: Record<From, string> = { up: "translate-y-8", left: "-translate-x-24", right: "translate-x-24" };

/** Scroll korle left / right / niche theke slide kore ashe. */
export default function Reveal({ children, from = "up", delay = 0, className = "" }: { children: React.ReactNode; from?: From; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition duration-[900ms] ease-out ${shown ? "translate-x-0 translate-y-0 opacity-100" : `opacity-0 ${hidden[from]}`} ${className}`}>
      {children}
    </div>
  );
}
