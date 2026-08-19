"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { useLang } from "@/context/LangContext";

export function PromoStrip() {
  const { enabled, autoRotate, intervalMs, messages } = siteConfig.promoStrip;
  const { lang } = useLang();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!enabled || !autoRotate || messages.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % messages.length), intervalMs);
    return () => clearInterval(t);
  }, [enabled, autoRotate, intervalMs, messages.length]);

  if (!enabled) return null;

  return (
    <div className="bg-gradient-to-r from-gold-light/25 via-pink-gold/15 to-gold-light/25">
      <div className="container-page flex h-9 items-center justify-center">
        <p key={i} className="text-center text-[12px] font-medium text-gold-dark">
          {lang === "bn" ? messages[i].bn : messages[i].en}
        </p>
      </div>
    </div>
  );
}
