import Image from "next/image";
import Logo from "@/components/layout/Logo";

const perks = [
  "Book creative spaces by the hour, with transparent pricing",
  "Verified hosts, reviewable spaces, real availability",
  "Manage your listings and bookings from one dashboard",
];

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-14">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
        <div className="relative hidden h-[540px] overflow-hidden rounded-3xl lg:block">
          <Image
            src="/studios/4.jpg"
            alt="Production studio ready for a shoot"
            fill
            sizes="(min-width:1024px) 55vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0a111c]/95 via-[#0a111c]/45 to-[#0a111c]/10" />
          <div className="absolute inset-0 flex flex-col justify-between p-9 text-[#eaf0f8]">
            <Logo light />
            <div>
              <p className="font-display max-w-[24ch] text-3xl font-bold leading-tight">
                One account. Every studio you need.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-[#b4c0d2]">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e63946]" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
