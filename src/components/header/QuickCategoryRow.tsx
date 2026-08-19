"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems, quickCategories } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";

export function QuickCategoryRow() {
  const { openCart } = useCart();
  const { setAccountOpen } = useAuth();
  const { lang, t } = useLang();
  const [browse, setBrowse] = useState(false);

  return (
    <div className="flex items-center justify-between pb-3 gap-2">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="relative">
          <button
            type="button"
            onClick={() => setBrowse((v) => !v)}
            onBlur={() => setTimeout(() => setBrowse(false), 180)}
            className="flex items-center gap-1.5 h-8 px-3 bg-off-black text-cream text-[11px] tracking-wider uppercase rounded"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
            <span className="hidden sm:inline">{t("browse")}</span>
          </button>
          {browse && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gold/20 shadow-panel rounded-lg p-2 z-50">
              {navItems
                .filter((n) => n.slug !== "/")
                .map((n) => (
                  <Link
                    key={n.slug}
                    href={n.slug}
                    className="flex justify-between px-3 py-2 text-sm hover:bg-cream rounded"
                  >
                    {lang === "bn" ? n.nameBn : n.name}
                    <span>→</span>
                  </Link>
                ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 overflow-x-auto drag-scroll">
          {quickCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === "routine" ? "/quiz" : `/category/${cat.slug}`}
              className="px-3 h-8 inline-flex items-center text-xs text-off-black/70 hover:text-off-black hover:bg-white border border-transparent hover:border-gold/30 rounded-full whitespace-nowrap"
            >
              {lang === "bn" ? cat.nameBn : cat.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden lg:flex items-center text-[11px] tracking-wider uppercase text-off-black/60">
        <button type="button" onClick={() => setAccountOpen(true)} className="px-2 py-1 hover:text-gold">
          {t("account")}
        </button>
        <Link href="/wishlist" className="px-2 py-1 hover:text-gold">
          {t("wishlist")}
        </Link>
        <button type="button" onClick={openCart} className="px-2 py-1 hover:text-gold">
          {t("cart")}
        </button>
      </div>
    </div>
  );
}
