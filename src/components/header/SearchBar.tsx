"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { brands } from "@/data/brands";
import { products, slugify } from "@/data/products";
import { useLang } from "@/context/LangContext";
import { formatBdt, productName } from "@/lib/utils";

export function SearchBar() {
  const { lang, t } = useLang();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const q = query.trim().toLowerCase();
  const hits = useMemo(() => {
    if (q.length < 1) return { products: [], brands: [] };
    return {
      products: products
        .filter((p) => `${p.brand} ${p.name} ${p.nameBangla} ${p.ingredients.join(" ")}`.toLowerCase().includes(q))
        .slice(0, 6),
      brands: brands.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 4),
    };
  }, [q]);

  return (
    <div className="py-3" ref={wrap}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setOpen(false);
          }
        }}
        className="relative"
      >
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={t("search")}
          className="w-full h-11 pl-4 pr-12 bg-white border border-gold/30 rounded-full text-sm placeholder:text-off-black/40 focus:outline-none focus:ring-2 focus:ring-gold/30"
          aria-label={t("search")}
        />
        <button type="submit" className="absolute right-2 top-1 p-2 text-off-black/50" aria-label={t("search")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="11" cy="11" r="6.2" />
            <path d="m20 20-3.4-3.4" />
          </svg>
        </button>

        {open && q && (
          <div className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white border border-gold/20 shadow-panel rounded-xl p-2 z-50 max-h-80 overflow-auto">
            {hits.brands.map((b) => (
              <Link
                key={b.id}
                href={`/brand/${b.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-cream rounded-lg text-sm"
              >
                <span className="text-[10px] tracking-widest uppercase text-gold-dark">Brand</span>
                {b.name}
              </Link>
            ))}
            {hits.products.map((p) => (
              <Link
                key={p.id}
                href={`/product/${slugify(p.name)}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-cream rounded-lg"
              >
                <img src={p.image} alt="" className="w-12 h-12 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] tracking-widest uppercase text-gold-dark">{p.brand}</div>
                  <div className="text-sm truncate">{productName(p, lang)}</div>
                </div>
                <strong className="text-sm">{formatBdt(p.flashSale?.price ?? p.price)}</strong>
              </Link>
            ))}
            {!hits.products.length && !hits.brands.length && (
              <p className="px-3 py-3 text-sm text-off-black/60">{t("noResults")}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
