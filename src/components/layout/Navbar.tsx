"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { toast } from "sonner";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useSession } from "@/lib/session";

const links = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

const menu = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/add-studio", label: "Add New Studio" },
  { href: "/my-listings", label: "My Studio Listings" },
  { href: "/my-bookings", label: "My Bookings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  async function handleLogout() {
    await signOut();
    toast.success("You are logged out.");
    router.push("/");
  }

  return (
    <header className={`sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur transition-shadow ${scrolled ? "shadow-lg" : ""}`}>
      <div className={`wrap flex items-center gap-5 transition-all duration-300 ${scrolled ? "h-14" : "h-[68px]"}`}>
        <Logo />

        <nav className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-1 border-b border-line bg-surface px-5 py-3 md:static md:ml-6 md:flex md:flex-1 md:flex-row md:border-0 md:bg-transparent md:p-0`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`relative rounded-lg px-3 py-2 font-medium transition-colors ${isActive(l.href) ? "text-ink" : "text-muted hover:text-ink"}`}
            >
              {l.label}
              {isActive(l.href) && <span className="absolute inset-x-3 -bottom-[14px] hidden h-[3px] rounded bg-brand md:block" />}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <ThemeToggle />

          {user ? (
            <div className="group relative">
              <button className="grid h-[42px] w-[42px] cursor-pointer place-items-center overflow-hidden rounded-full border-2 border-brand bg-brand-2 font-bold text-white" aria-label="Account menu">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  user.name[0]?.toUpperCase()
                )}
              </button>
              <div className="invisible absolute right-0 top-[50px] min-w-[230px] rounded-xl border border-line bg-surface p-2 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <p className="mb-1.5 border-b border-line px-3 py-2 font-bold">{user.name}</p>
                {menu.map((m) => (
                  <Link key={m.href} href={m.href} className="block rounded-lg px-3 py-2 hover:bg-bg">
                    {m.label}
                  </Link>
                ))}
                <button onClick={handleLogout} className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left hover:bg-bg">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline btn-sm hidden sm:inline-flex">Login</Link>
              <Link href="/register" className="btn btn-sm">Register</Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-[10px] border border-line bg-surface md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
