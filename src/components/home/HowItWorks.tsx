import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";

const steps = [
  { t: "Discover spaces", d: "Filter by category, city and hourly rate." },
  { t: "Select shoot hours", d: "Pick a date and time slot that’s still open." },
  { t: "Book instantly", d: "Send your request and see the status in My Bookings." },
  { t: "Create and produce", d: "Show up, set up, and make something good." },
];
const sides = ["left", "up", "up", "right"] as const;

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="wrap">
        <SectionHead title="How booking works" sub="From search to set in four steps." />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.t} from={sides[i]} delay={i * 80}>
              <li className="h-full border-t-[3px] border-brand pt-3.5">
                <span className="font-display text-3xl font-extrabold text-brand">{i + 1}</span>
                <h3 className="mb-1.5 mt-1 text-lg font-bold">{s.t}</h3>
                <p className="text-sm text-muted">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
