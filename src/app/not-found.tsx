import Link from "next/link";
import { ApertureIcon } from "@/components/layout/Logo";

export default function NotFound() {
  return (
    <section className="wrap py-20 text-center">
      <ApertureIcon className="mx-auto h-28 w-28 text-brand" />
      <h1 className="mt-3 text-4xl font-extrabold">404: this shot isn’t on the schedule</h1>
      <p className="mx-auto mb-6 mt-3 max-w-md text-muted">The page you’re looking for was cut in post. Head back to the main set.</p>
      <Link href="/" className="btn">Return to home</Link>
    </section>
  );
}
