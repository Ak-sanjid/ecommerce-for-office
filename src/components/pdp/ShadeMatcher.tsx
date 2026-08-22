"use client";

import { useState } from "react";
import { SAMPLE_SHADES } from "@/data/filters";
import { useLang } from "@/context/LangContext";

export function ShadeMatcher() {
  const { lang } = useLang();
  const [tone, setTone] = useState<string | null>("medium");
  const [undertone, setUndertone] = useState<string | null>("warm");

  const matches = SAMPLE_SHADES.filter(
    (s) => (!tone || s.tone === tone) && (!undertone || s.undertone === undertone),
  );

  return (
    <div className="rounded-3xl border border-female-tint/40 bg-female-tint-light/30 p-6">
      <h2 className="font-display text-2xl font-semibold">{lang === "bn" ? "শেড ম্যাচার" : "Shade Matcher"}</h2>
      <p className="mt-1 text-sm text-off-black/55">
        {lang === "bn" ? "স্কিন টোন ও আন্ডারটোন বাছুন — মিল থাকা শেড দেখাব।" : "Select skin tone & undertone — we'll suggest matching shades."}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {["fair", "light", "medium", "tan", "deep"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTone(t)}
            className={`rounded-full px-3 py-1.5 text-xs capitalize ${tone === t ? "bg-gold text-off-black" : "bg-white"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {["cool", "neutral", "warm"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setUndertone(t)}
            className={`rounded-full px-3 py-1.5 text-xs capitalize ${undertone === t ? "bg-pink-gold text-on-accent" : "bg-white"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {matches.map((s) => (
          <div key={s.id} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
            <span className="h-7 w-7 rounded-full border border-off-black/10" style={{ background: s.hex }} />
            <span className="text-xs">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
