"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { bdt } from "@/lib/format";
import { useLang } from "@/context/LangContext";
import { productName } from "@/lib/utils";

export function CompareBar({ currentId }: { currentId: string }) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const current = products.find((p) => p.id === currentId);
  if (!current) return null;
  const others = products.filter((p) => p.id !== currentId && p.category === current.category).slice(0, 2);
  const cols = [current, ...others];

  if (!open) {
    return (
      <div className="fixed bottom-24 left-4 z-[50]">
        <button type="button" onClick={() => setOpen(true)} className="btn-secondary text-xs shadow-card">
          {t("compare")} (2–3)
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[55] border-t border-gold/20 bg-white/95 p-4 shadow-panel backdrop-blur">
      <div className="container-page">
        <div className="mb-3 flex justify-between">
          <h3 className="font-display text-lg font-semibold">{t("compare")}</h3>
          <button type="button" onClick={() => setOpen(false)} className="text-xs text-off-black/45">
            {t("close")}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 overflow-x-auto text-xs">
          {cols.map((p) => (
            <div key={p.id} className="min-w-[140px] rounded-xl border border-off-black/8 p-3">
              <p className="font-medium text-gold">{p.brand}</p>
              <p className="mt-1 line-clamp-2 font-medium">{productName(p, lang)}</p>
              <p className="mt-2">{bdt(p.flashSale?.price ?? p.price)}</p>
              <p className="mt-1 text-off-black/45">
                {p.rating} ★ · {p.reviewCount}
              </p>
              <p className="mt-1">{p.ingredients.slice(0, 2).join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
