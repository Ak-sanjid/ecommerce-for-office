"use client";

import { useParams } from "next/navigation";
import { brands } from "@/data/brands";
import { products } from "@/data/products";
import { useLang } from "@/context/LangContext";
import { ProductCard } from "@/components/product/ProductCard";

export default function BrandPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { lang, t } = useLang();
  const brand = brands.find((b) => b.id === id);
  const list = products.filter((p) => p.brandId === id);
  if (!brand) {
    return (
      <div className="container-page py-16">
        <h1 className="font-display text-4xl">{t("noResults")}</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="container-page min-h-[240px] flex items-end py-10 border-b border-gold/20" style={{ background: `linear-gradient(90deg, #FBF8F3, ${brand.color}14)` }}>
        <div>
          <div className="kicker">{brand.country}{brand.isOfficial ? ` · ${t("official")}` : ""}</div>
          <h1 className="font-display text-5xl mt-2">{brand.name}</h1>
          <p className="max-w-lg text-off-black/70 mt-3">{lang === "bn" ? brand.taglineBn : brand.tagline}</p>
        </div>
      </div>
      <div className="container-page py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.length ? list.map((p) => (
          <div key={p.id} className="[&>article]:w-full">
            <ProductCard product={p} />
          </div>
        )) : <p>{t("noResults")}</p>}
      </div>
    </div>
  );
}
