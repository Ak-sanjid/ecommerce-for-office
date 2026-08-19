"use client";

import { useState } from "react";
import Link from "next/link";
import { mainCategories, navItems } from "@/data/categories";
import { brandLetters, brands } from "@/data/brands";
import { useLang } from "@/context/LangContext";

export function CategoryBar() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState<string | null>(null);
  const [letter, setLetter] = useState("All");
  const filtered = letter === "All" ? brands : brands.filter((b) => b.name[0].toUpperCase() === letter);

  return (
    <div className="border-t border-gold/20">
      <nav className="container-page flex items-stretch" aria-label="Primary">
        {navItems
          .filter((n) => n.visible)
          .map((item) => {
            const cat = mainCategories.find((c) => c.id === item.mega);
            const isMega = Boolean(item.hasMegaMenu || cat);
            return (
              <div
                key={item.slug}
                className="relative"
                onMouseEnter={() => isMega && setOpen(item.slug)}
                onMouseLeave={() => setOpen(null)}
              >
                {isMega ? (
                  <button
                    type="button"
                    className="h-11 px-3.5 text-[13px] tracking-[0.06em] uppercase text-off-black/70 hover:text-off-black"
                    onClick={() => setOpen(open === item.slug ? null : item.slug)}
                  >
                    {lang === "bn" ? item.nameBn : item.name}
                  </button>
                ) : (
                  <Link
                    href={item.slug}
                    className="h-11 px-3.5 inline-flex items-center text-[13px] tracking-[0.06em] uppercase text-off-black/70 hover:text-off-black"
                  >
                    {lang === "bn" ? item.nameBn : item.name}
                  </Link>
                )}

                {open === item.slug && cat && (
                  <div className="absolute top-full left-0 min-w-[560px] bg-white border border-gold/20 shadow-panel p-6 grid grid-cols-[1fr_200px] gap-6 z-40">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
                      <Link href={item.slug} className="font-medium py-1">
                        {t("shopAll")}
                      </Link>
                      {cat.subCategories
                        .filter((s) => s.visible)
                        .map((s) => (
                          <Link key={s.id} href={`/category/${cat.slug}?type=${s.slug}`} className="py-1 text-sm hover:border-b hover:border-gold-light">
                            {lang === "bn" ? s.nameBn : s.name}
                          </Link>
                        ))}
                    </div>
                    {cat.featured && (
                      <Link href={cat.featured.href} className="relative min-h-[180px] rounded-xl overflow-hidden">
                        <img src={cat.featured.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                        <span className="absolute bottom-3 left-3 right-3 font-display text-xl text-white drop-shadow">
                          {lang === "bn" ? cat.featured.titleBn : cat.featured.title}
                        </span>
                      </Link>
                    )}
                  </div>
                )}

                {open === item.slug && item.hasMegaMenu && (
                  <div className="absolute top-full right-0 w-[min(920px,92vw)] bg-white border border-gold/20 shadow-panel p-6 z-40">
                    <div className="flex flex-wrap gap-1 mb-4">
                      <button
                        type="button"
                        onClick={() => setLetter("All")}
                        className={`text-xs px-2 ${letter === "All" ? "text-gold-dark underline" : "text-off-black/60"}`}
                      >
                        {t("allBrands")}
                      </button>
                      {brandLetters.map((L) => (
                        <button
                          key={L}
                          type="button"
                          onClick={() => setLetter(L)}
                          className={`w-6 h-6 text-xs ${letter === L ? "text-gold-dark underline" : "text-off-black/60"}`}
                        >
                          {L}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2 max-h-80 overflow-auto">
                      {filtered.map((b) => (
                        <Link key={b.id} href={`/brand/${b.id}`} className="px-2 py-2 hover:bg-cream rounded">
                          <span className="block text-[10px] tracking-widest uppercase text-gold-dark">{b.country}</span>
                          <span className="text-sm">{b.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </nav>
    </div>
  );
}
