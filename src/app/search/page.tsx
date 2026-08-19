"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { products } from "@/data/products";
import { useLang } from "@/context/LangContext";
import { ProductCard } from "@/components/product/ProductCard";

function Results() {
  const q = (useSearchParams().get("q") ?? "").toLowerCase();
  const { t } = useLang();
  const list = products.filter((p) => `${p.name} ${p.nameBangla} ${p.brand} ${p.ingredients.join(" ")}`.toLowerCase().includes(q));
  return (
    <div className="container-page py-10">
      <h1 className="font-display text-4xl mb-6">{q || t("search")}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((p) => (
          <div key={p.id} className="[&>article]:w-full"><ProductCard product={p} /></div>
        ))}
      </div>
      {!list.length && <p>{t("noResults")}</p>}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <Results />
    </Suspense>
  );
}
