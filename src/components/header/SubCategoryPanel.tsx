"use client";

import Link from "next/link";
import { mainCategories } from "@/data/categories";
import { useLang } from "@/context/LangContext";

export function SubCategoryPanel({
  categoryId,
  accent = "default",
}: {
  categoryId: string;
  accent?: "male" | "female" | "default";
}) {
  const { lang } = useLang();
  const cat = mainCategories.find((c) => c.id === categoryId);
  if (!cat) return null;

  const tint =
    accent === "male"
      ? "from-male-tint-light to-white border-male-tint/30"
      : accent === "female"
        ? "from-female-tint-light to-white border-female-tint/30"
        : "from-cream-deep to-white border-gold/15";

  const linkHover =
    accent === "male"
      ? "hover:text-male-tint-dark"
      : accent === "female"
        ? "hover:text-female-tint-dark"
        : "hover:text-gold";

  return (
    <div className={`absolute inset-x-0 top-full z-40 border-t bg-gradient-to-b ${tint} shadow-panel`}>
      <div className="container-page grid grid-cols-12 gap-8 py-6">
        <div className="col-span-9">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-off-black/40">
            {lang === "bn" ? cat.nameBangla : cat.name} {lang === "bn" ? "ক্যাটাগরি" : "Categories"}
          </p>
          <div className="grid grid-cols-4 gap-x-6 gap-y-2.5">
            {cat.subCategories
              .filter((s) => s.visible)
              .sort((a, b) => a.order - b.order)
              .map((s) => (
                <Link
                  key={s.id}
                  href={`/category/${cat.slug}/${s.slug}`}
                  className={`text-[13px] text-off-black/70 transition-colors ${linkHover}`}
                >
                  {lang === "bn" ? s.nameBn : s.name}
                </Link>
              ))}
          </div>
        </div>

        <div className="col-span-3 rounded-2xl border border-off-black/5 bg-white/70 p-4 backdrop-blur">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-cream-deep">
            {cat.featured && (
              <img src={cat.featured.image} alt="" className="h-full w-full object-cover" />
            )}
          </div>
          <h4 className="mt-3 font-display text-lg font-semibold">
            {cat.featured
              ? lang === "bn"
                ? cat.featured.titleBn
                : cat.featured.title
              : `Best in ${cat.name}`}
          </h4>
          <p className="mt-1 text-xs text-off-black/55">
            {lang === "bn" ? "কিউরেটেড পিক, ১০০% অথেন্টিক।" : "Curated picks, 100% authentic."}
          </p>
          <Link
            href={`/category/${cat.slug}`}
            className="mt-3 inline-flex text-xs font-medium text-gold-dark underline underline-offset-4"
          >
            {lang === "bn" ? `সব ${cat.nameBangla} →` : `Shop all ${cat.name} →`}
          </Link>
        </div>
      </div>
    </div>
  );
}
