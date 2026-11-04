import type { Studio } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";
import { CardSkeleton } from "@/components/ui/Skeletons";
import StudioCard from "./StudioCard";

const sides = ["left", "up", "right"] as const;

export default function StudioGrid({ studios, loading, skeletons = 6, onHeart }: { studios?: Studio[]; loading: boolean; skeletons?: number; onHeart?: (nowSaved: boolean) => void }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {loading || !studios
        ? Array.from({ length: skeletons }, (_, i) => <CardSkeleton key={i} />)
        : studios.map((s, i) => (
            <Reveal key={s._id} from={sides[i % 3]} delay={(i % 3) * 90} className="h-full">
              <StudioCard s={s} onHeart={onHeart} />
            </Reveal>
          ))}
    </div>
  );
}
