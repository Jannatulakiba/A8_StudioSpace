"use client";

import { useState } from "react";
import Image from "next/image";
import { ApertureIcon } from "@/components/layout/Logo";

/** Parent e `relative` + height thakte hobe. Local (/studios/..) image optimize hoy, remote (imgbb) unoptimized.
 *  Broken hotlink hole branded placeholder dekhay — imgbb outage/cache banar bojay e. */
export default function StudioImage({ src, alt, sizes, className = "", priority = false, fallbackClassName = "" }: { src: string; alt: string; sizes: string; className?: string; priority?: boolean; fallbackClassName?: string }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div aria-hidden className={`grid place-items-center bg-bg/60 ${fallbackClassName} ${className}`}>
        <ApertureIcon className="h-10 w-10 text-muted opacity-50" />
        <p className="mt-2 px-2 text-center text-xs text-muted">Image unavailable</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={!src.startsWith("/")}
      onError={() => setBroken(true)}
      className={`object-cover ${className}`}
    />
  );
}
