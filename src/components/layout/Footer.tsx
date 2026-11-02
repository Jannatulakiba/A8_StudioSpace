import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

const quick = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

const cats = [
  { v: "Photo Studio", label: "Photo Studios" },
  { v: "Podcast Lounge", label: "Podcast Rooms" },
  { v: "Music Suite", label: "Music Suites" },
  { v: "Film Stage", label: "Sound Stages" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#0a111c] pb-6 pt-14 text-[#b4c0d2]">
      <div className="wrap">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr]">
          <div>
            <div className="mb-3"><Logo light /></div>
            <p className="max-w-[40ch]">Book photo cycs, sound stages and podcast rooms from local hosts, by the hour, at a price you see up front.</p>
            <div className="mt-4 flex gap-2.5">
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="grid h-9 w-9 place-items-center rounded-lg border border-[#25324a] transition hover:border-brand hover:text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.9 2H22l-7.1 8.1L23 22h-6.4l-5-6.6L5.8 22H2.7l7.6-8.7L2.2 2h6.5l4.5 6zm-1.1 18h1.7L7.3 3.8H5.5z" /></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-lg border border-[#25324a] transition hover:border-brand hover:text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zM17.5 5a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-2.5 text-base text-white">Quick links</h3>
            {quick.map((l) => (
              <Link key={l.href} href={l.href} className="block py-1 hover:text-white">{l.label}</Link>
            ))}
          </div>

          <div>
            <h3 className="mb-2.5 text-base text-white">Popular categories</h3>
            {cats.map((c) => (
              <Link key={c.v} href={`/studios?category=${encodeURIComponent(c.v)}`} className="block py-1 hover:text-white">{c.label}</Link>
            ))}
          </div>

          <div>
            <h3 className="mb-2.5 text-base text-white">Get new studios in your inbox</h3>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-9 flex flex-wrap justify-between gap-3 border-t border-[#25324a] pt-5 text-sm">
          <span>© 2026 StudioSpace. All rights reserved.</span>
          <span>Terms of use and privacy policy apply to every booking.</span>
        </div>
      </div>
    </footer>
  );
}
