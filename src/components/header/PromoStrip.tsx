"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";

const keys = ["promo1", "promo2", "promo3"] as const;

export function PromoStrip({ onToggleLayout }: { onToggleLayout: () => void }) {
  const { lang, setLang, t } = useLang();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % keys.length), 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative h-8 bg-off-black text-gold-light text-[11px] sm:text-xs tracking-wide">
      <div className="container-page h-full flex items-center justify-center">
        <p className="truncate pr-16">{t(keys[i])}</p>
      </div>
      <div className="absolute right-3 top-0 h-full flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleLayout}
          className="hidden sm:inline text-[10px] tracking-widest uppercase text-gold-light/70 hover:text-gold-light"
        >
          Layout
        </button>
        <button
          type="button"
          onClick={() => setLang(lang === "en" ? "bn" : "en")}
          className="text-[11px] tracking-[0.16em] uppercase text-gold-light"
        >
          {t("language")}
        </button>
      </div>
    </div>
  );
}
