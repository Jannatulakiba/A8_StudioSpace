import { BadgeCheck, Headset, ShieldCheck, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";

const items = [
  { Icon: ShieldCheck, t: "Liability protection", d: "Damage and injury cover on every confirmed booking." },
  { Icon: BadgeCheck, t: "Verified profiles", d: "Hosts and creators confirm their ID before booking." },
  { Icon: Wrench, t: "Equipment safety", d: "Lighting and rigging gear is inspected each quarter." },
  { Icon: Headset, t: "24/7 host support", d: "A real person answers within 15 minutes, any hour." },
];
const sides = ["left", "up", "up", "right"] as const;

export default function Guarantee() {
  return (
    <section className="border-y border-line bg-surface py-16">
      <div className="wrap">
        <SectionHead title="Host guarantee and creator support" sub="Every booking is covered, every host is checked." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, t, d }, i) => (
            <Reveal key={t} from={sides[i]} delay={i * 80} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-bg p-5">
                <Icon className="text-brand-2" size={28} />
                <h3 className="mb-1 mt-2 text-lg font-bold">{t}</h3>
                <p className="text-sm text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
