"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { useLang } from "@/context/LangContext";

export function ProductGrid({ items, title }: { items: Product[]; title: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const { lang, t } = useLang();
  const sort = sp.get("sort") ?? "featured";

  return (
    <div className="min-w-0 flex-1">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="section-title">{title}</h1>
          <p className="section-subtitle">
            {items.length} {lang === "bn" ? "টি পণ্য" : "products"}
          </p>
        </div>
        <select
          value={sort}
          onChange={(e) => {
            const n = new URLSearchParams(sp.toString());
            n.set("sort", e.target.value);
            router.push(`${pathname}?${n.toString()}`);
          }}
          className="rounded-lg border border-off-black/10 bg-white px-3 py-2 text-xs"
        >
          <option value="featured">{lang === "bn" ? "ফিচার্ড" : "Featured"}</option>
          <option value="price-asc">{t("priceLow")}</option>
          <option value="price-desc">{t("priceHigh")}</option>
          <option value="rating">{lang === "bn" ? "টপ রেটেড" : "Top rated"}</option>
        </select>
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl bg-white p-10 text-center text-sm text-off-black/50">{t("noResults")}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} width="w-full" />
          ))}
        </div>
      )}
    </div>
  );
}
