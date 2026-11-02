"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const noop = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // hydration mismatch avoid korar jonno
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="grid h-10 w-10 cursor-pointer place-items-center rounded-[10px] border border-line bg-surface text-ink transition hover:border-brand"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
