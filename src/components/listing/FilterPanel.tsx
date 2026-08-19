"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { INGREDIENTS, SAFETY_BADGES } from "@/data/filters";
import { brands } from "@/data/brands";
import { useLang } from "@/context/LangContext";

export function FilterPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const { lang, t } = useLang();

  const min = Number(sp.get("min") ?? 0);
  const max = Number(sp.get("max") ?? 10000);
  const [range, setRange] = useState([min, max]);

  const selectedIng = sp.getAll("ing");
  const selectedBadges = sp.getAll("badge");
  const brand = sp.get("brand") ?? "";

  const push = (next: URLSearchParams) => {
    router.push(`${pathname}?${next.toString()}`);
  };

  const toggle = (key: string, value: string, current: string[]) => {
    const n = new URLSearchParams(sp.toString());
    n.delete(key);
    const set = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    set.forEach((v) => n.append(key, v));
    push(n);
  };

  const applyRange = () => {
    const n = new URLSearchParams(sp.toString());
    n.set("min", String(range[0]));
    n.set("max", String(range[1]));
    push(n);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-off-black/40">{t("price")} (৳)</p>
        <input
          type="range"
          min={0}
          max={10000}
          step={100}
          value={range[1]}
          onChange={(e) => setRange([range[0], Number(e.target.value)])}
          onMouseUp={applyRange}
          onTouchEnd={applyRange}
          className="w-full accent-gold"
        />
        <div className="mt-1 flex justify-between text-[11px] text-off-black/50">
          <span>৳{range[0]}</span>
          <span>৳{range[1]}</span>
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-off-black/40">{t("brand")}</p>
        <select
          value={brand}
          onChange={(e) => {
            const n = new URLSearchParams(sp.toString());
            if (e.target.value) n.set("brand", e.target.value);
            else n.delete("brand");
            push(n);
          }}
          className="input-field py-2 text-sm"
        >
          <option value="">{t("allBrands")}</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-off-black/40">{t("ingredients")}</p>
        <div className="flex flex-wrap gap-1.5">
          {INGREDIENTS.map((i) => {
            const on = selectedIng.includes(i);
            return (
              <button
                key={i}
                type="button"
                onClick={() => toggle("ing", i, selectedIng)}
                className={`rounded-full px-2.5 py-1 text-[11px] border transition-colors ${
                  on ? "border-gold bg-gold text-off-black" : "border-off-black/10 bg-white hover:border-gold"
                }`}
              >
                {i}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-off-black/40">{t("safety")}</p>
        <div className="space-y-1.5">
          {SAFETY_BADGES.map((b) => (
            <label key={b} className="flex items-center gap-2 text-[13px] text-off-black/70">
              <input
                type="checkbox"
                checked={selectedBadges.includes(b)}
                onChange={() => toggle("badge", b, selectedBadges)}
                className="accent-gold"
              />
              {b}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
