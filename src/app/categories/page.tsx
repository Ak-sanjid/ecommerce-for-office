"use client";

import Link from "next/link";
import { mainCategories } from "@/data/categories";
import { useLang } from "@/context/LangContext";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { visibleSorted } from "@/config/site";

export default function CategoriesPage() {
  const { lang } = useLang();
  const { config } = useSiteConfig();
  return (
    <div className="container-page py-10">
      <div className="kicker">{lang === "bn" ? "ক্যাটাগরি" : "Browse"}</div>
      <h1 className="font-display text-5xl mt-2 mb-8">{lang === "bn" ? "সব ক্যাটাগরি" : "All categories"}</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mainCategories.map((c) => (
          <Link key={c.id} href={`/category/${c.slug}`} className="border border-gold/25 bg-white p-5 hover:border-gold">
            <h2 className="font-display text-2xl">{lang === "bn" ? c.nameBangla : c.name}</h2>
            <p className="text-sm text-off-black/55 mt-2">
              {c.subCategories.map((s) => (lang === "bn" ? s.nameBn : s.name)).join(" · ")}
            </p>
          </Link>
        ))}
        {visibleSorted(config.quickShortcuts).map((s) => (
          <Link key={s.id} href={s.href} className="border border-gold/25 bg-cream p-5 hover:border-gold">
            <h2 className="font-display text-2xl">{lang === "bn" ? s.labelBn : s.label}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
