"use client";

import Image from "next/image";
import { useState } from "react";

export function SmartImage({
  src,
  alt,
  fill = true,
  className = "",
  sizes = "(max-width:768px) 50vw, 25vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`grid h-full w-full place-items-center bg-gradient-to-br from-cream-deep via-cream to-gold-light/30 ${className}`}
      >
        <span className="font-display text-2xl tracking-[0.2em] text-gold/40">GLOW</span>
      </div>
    );
  }

  return (
    <Image
      src={src!}
      alt={alt}
      fill={fill}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
