"use client";

import { useRef, useState } from "react";
import type { Product } from "@/types";
import { SmartImage } from "@/components/shared/SmartImage";
import { productName } from "@/lib/utils";
import { useLang } from "@/context/LangContext";

export function ProductGallery({ product }: { product: Product }) {
  const { lang } = useLang();
  const [i, setI] = useState(0);
  const srcs = product.images.length ? product.images : [product.image];
  const box = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });

  return (
    <div>
      <div
        ref={box}
        className="relative aspect-square overflow-hidden rounded-3xl bg-cream-deep cursor-crosshair"
        onMouseMove={(e) => {
          const r = box.current!.getBoundingClientRect();
          setZoom({
            on: true,
            x: ((e.clientX - r.left) / r.width) * 100,
            y: ((e.clientY - r.top) / r.height) * 100,
          });
        }}
        onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
      >
        <SmartImage
          src={srcs[i]}
          alt={productName(product, lang)}
          priority
          sizes="(max-width:1024px) 100vw, 50vw"
          className="transition-transform duration-150"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            transform: zoom.on ? "scale(1.55)" : "scale(1)",
            transformOrigin: `${zoom.x}% ${zoom.y}%`,
            backgroundImage: `url(${srcs[i]})`,
            backgroundSize: "cover",
            backgroundPosition: `${zoom.x}% ${zoom.y}%`,
            opacity: zoom.on ? 1 : 0,
          }}
        />
        {product.video && (
          <span className="absolute left-3 top-3 rounded-full bg-off-black/60 px-2 py-0.5 text-[10px] text-on-accent">
            Video
          </span>
        )}
      </div>
      <div className="mt-3 flex gap-2">
        {srcs.map((s, idx) => (
          <button
            key={s + idx}
            type="button"
            onClick={() => setI(idx)}
            className={`relative h-16 w-16 overflow-hidden rounded-xl border ${i === idx ? "border-gold" : "border-transparent"}`}
          >
            <SmartImage src={s} alt="" sizes="64px" />
          </button>
        ))}
      </div>
    </div>
  );
}
