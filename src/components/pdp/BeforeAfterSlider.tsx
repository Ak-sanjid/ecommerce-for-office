"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";

export function BeforeAfterSlider({ before, after }: { before?: string; after?: string }) {
  const { lang } = useLang();
  const [x, setX] = useState(50);

  return (
    <div>
      <h2 className="section-title mb-4">Before / After</h2>
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-cream-deep select-none">
        {before ? (
          <img src={before} alt="before" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-cream-deep to-gold-light/40" />
        )}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
          {after ? (
            <img src={after} alt="after" className="h-full w-full object-cover brightness-105 saturate-125" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-pink-gold-light to-cream" />
          )}
        </div>
        <input
          type="range"
          min={8}
          max={92}
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          className="absolute inset-x-4 bottom-4 accent-gold"
          aria-label="Before after slider"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-2 py-0.5 text-[10px]">
          {lang === "bn" ? "আগে" : "Before"}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-white/80 px-2 py-0.5 text-[10px]">
          {lang === "bn" ? "পরে" : "After"}
        </span>
      </div>
    </div>
  );
}
