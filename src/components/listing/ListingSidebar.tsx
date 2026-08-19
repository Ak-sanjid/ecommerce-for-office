"use client";

import Link from "next/link";
import { useState } from "react";
import { SIDEBAR_ITEMS } from "@/data/filters";
import { products } from "@/data/products";
import { useLang } from "@/context/LangContext";

export function ListingSidebar() {
  const { lang } = useLang();
  const [hover, setHover] = useState<string | null>(null);
  const preview =
    hover === "k-beauty"
      ? products.find((p) => p.origin === "k-beauty")
      : hover === "j-beauty"
        ? products.find((p) => p.origin === "j-beauty")
        : hover === "top-selling"
          ? products.find((p) => p.isTopSelling)
          : hover === "todays-offer"
            ? products.find((p) => p.isTodayOffer)
            : products[0];

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-off-black/40">
        {lang === "bn" ? "দোকান" : "Shop"}
      </p>
      <ul className="space-y-0.5">
        {SIDEBAR_ITEMS.filter((i) => i.visible)
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <li
              key={item.id}
              className="relative"
              onMouseEnter={() => setHover(item.id)}
              onMouseLeave={() => setHover(null)}
            >
              <Link
                href={item.href}
                className="block rounded-lg px-3 py-2 text-[13px] text-off-black/70 hover:bg-gold/10 hover:text-gold transition-colors"
              >
                {lang === "bn" ? item.labelBn : item.label}
              </Link>
              {hover === item.id && preview && (
                <div className="absolute left-full top-0 z-20 ml-3 w-52 rounded-2xl border border-gold/15 bg-white p-3 shadow-panel">
                  <img src={preview.image} alt="" className="aspect-[4/3] w-full rounded-xl object-cover bg-cream-deep" />
                  <p className="mt-2 text-xs font-medium">{lang === "bn" ? item.labelBn : item.label}</p>
                  <p className="text-[11px] text-off-black/45">
                    {lang === "bn" ? "প্রিভিউ" : "Preview"} · {preview.brand}
                  </p>
                </div>
              )}
            </li>
          ))}
      </ul>
    </aside>
  );
}
