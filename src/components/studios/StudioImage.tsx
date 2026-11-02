import Image from "next/image";

/** Parent e `relative` + height thakte hobe. Local (/studios/..) image optimize hoy, remote (imgbb) unoptimized. */
export default function StudioImage({ src, alt, sizes, className = "", priority = false }: { src: string; alt: string; sizes: string; className?: string; priority?: boolean }) {
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} unoptimized={!src.startsWith("/")} className={`object-cover ${className}`} />;
}
