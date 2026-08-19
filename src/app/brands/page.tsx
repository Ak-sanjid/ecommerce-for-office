"use client";

import Link from "next/link";
import { brands } from "@/data/brands";
import { useLang } from "@/context/LangContext";

export default function BrandsPage() {
  const { lang, t } = useLang();
  return (
    <div className="container-page py-10">
      <div className="kicker">{t("allBrands")}</div>
      <h1 className="font-display text-5xl mt-2 mb-8">{t("brandsTrust")}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((b) => (
          <Link key={b.id} href={`/brand/${b.id}`} className="p-5 border border-gold/25 bg-white hover:border-gold min-h-[140px] flex flex-col justify-end">
            <em className="font-display not-italic text-2xl">{b.name}</em>
            <small className="text-[11px] tracking-widest uppercase text-gold-dark mt-2">{b.country}</small>
            <p className="text-sm text-off-black/60 mt-2">{lang === "bn" ? b.taglineBn : b.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
