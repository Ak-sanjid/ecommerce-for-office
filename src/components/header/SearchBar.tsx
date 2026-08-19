"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { brands } from "@/data/brands";
import { products, slugify } from "@/data/products";
import { Icon } from "@/components/shared/Icon";
import { useLang } from "@/context/LangContext";
import { bdt } from "@/lib/format";
import { productName } from "@/lib/utils";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const { lang, t } = useLang();
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState<string | null>(null);
  const [openBrand, setOpenBrand] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) {
        setOpenBrand(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const suggestions =
    q.length > 1
      ? products
          .filter((p) =>
            `${p.name} ${p.nameBangla} ${p.brand} ${p.ingredients.join(" ")}`
              .toLowerCase()
              .includes(q.toLowerCase()),
          )
          .slice(0, 5)
      : [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (brand) p.set("brand", brand);
    router.push(`/search?${p.toString()}`);
    setFocused(false);
  };

  return (
    <div ref={wrap} className={compact ? "relative" : "relative py-3"}>
      <form onSubmit={submit} className="flex items-stretch">
        <div className="relative flex-1">
          <Icon
            name="search"
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-off-black/35"
          />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={t("search")}
            aria-label={t("search")}
            className={`w-full rounded-l-xl border border-off-black/10 bg-white pl-11 pr-3 text-sm
                        placeholder:text-off-black/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25
                        transition ${compact ? "py-2.5" : "py-3"}`}
          />
        </div>

        <div className="relative hidden sm:block">
          <button
            type="button"
            onClick={() => setOpenBrand((v) => !v)}
            aria-expanded={openBrand}
            className="flex h-full items-center gap-1 border-y border-off-black/10 bg-white px-3 text-xs text-off-black/60 hover:text-gold transition-colors"
          >
            {brand ? brands.find((b) => b.id === brand)?.name : t("allBrands")}
            <Icon name="chevron" size={12} />
          </button>
          {openBrand && (
            <div className="absolute right-0 top-full z-50 mt-1 max-h-72 w-52 overflow-y-auto rounded-xl border border-off-black/5 bg-white py-2 shadow-panel">
              <button
                type="button"
                onClick={() => {
                  setBrand(null);
                  setOpenBrand(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-cream"
              >
                {t("allBrands")}
              </button>
              <hr className="my-1 border-off-black/5" />
              {brands.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setBrand(b.id);
                    setOpenBrand(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-cream ${brand === b.id ? "font-medium text-gold" : ""}`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          aria-label={t("search")}
          className="rounded-r-xl bg-gold px-5 text-off-black hover:bg-gold-dark hover:text-cream transition-colors"
        >
          <Icon name="search" size={17} />
        </button>
      </form>

      {focused && suggestions.length > 0 && (
        <div className="absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-off-black/5 bg-white shadow-panel">
          {suggestions.map((p) => (
            <Link
              key={p.id}
              href={`/product/${slugify(p.name)}`}
              onClick={() => setFocused(false)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-cream transition-colors"
            >
              <img src={p.image} alt="" className="h-9 w-9 shrink-0 rounded-md object-cover bg-cream-deep" />
              <div className="min-w-0">
                <p className="truncate text-sm text-off-black">{productName(p, lang)}</p>
                <p className="text-[11px] text-off-black/45">{p.brand}</p>
              </div>
              <span className="ml-auto text-sm font-medium text-gold">{bdt(p.flashSale?.price ?? p.price)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
