"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { brands } from "@/data/brands";
import { sidebarItems } from "@/data/categories";
import { useLang } from "@/context/LangContext";
import { ProductCard } from "@/components/product/ProductCard";

const INGREDIENTS = ["Niacinamide", "Vitamin C", "Salicylic Acid", "Snail Mucin", "Hyaluronic Acid", "Centella Asiatica", "Heartleaf"];
const BADGES = ["Paraben-Free", "Halal Certified", "Cruelty-Free"];

export default function CategoryPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const params = useSearchParams();
  const type = params.get("type") ?? "";
  const concern = params.get("concern") ?? "";
  const { lang, t } = useLang();
  const [max, setMax] = useState(5000);
  const [brand, setBrand] = useState("");
  const [ings, setIngs] = useState<string[]>([]);
  const [badges, setBadges] = useState<string[]>([]);
  const [hover, setHover] = useState<string | null>(null);

  const list = useMemo(() => {
    let next = products.slice();
    if (slug === "k-beauty") next = next.filter((p) => p.origin === "k-beauty");
    else if (slug === "j-beauty") next = next.filter((p) => p.origin === "j-beauty");
    else if (slug === "international") next = next.filter((p) => p.origin === "international");
    else if (slug === "top-selling") next = next.filter((p) => p.isTopSelling);
    else if (slug === "todays-offer") next = next.filter((p) => p.isTodayOffer);
    else if (slug === "combo") next = next.filter((p) => p.subCategory === "Combo" || p.originalPrice);
    else if (slug === "skincare") next = next.filter((p) => p.category === "Skincare");
    else if (slug === "haircare") next = next.filter((p) => p.category === "Haircare");
    else if (slug === "mens") next = next.filter((p) => p.gender === "men" || p.category === "Men's Grooming");
    else if (slug === "makeup") next = next.filter((p) => p.category === "Makeup");
    else if (slug === "baby-mom") next = next.filter((p) => p.category === "Baby & Mom");
    if (type) next = next.filter((p) => p.subCategory.toLowerCase().replace(/\s+/g, "-").includes(type) || type.includes(p.subCategory.toLowerCase().split(" ")[0]));
    if (concern) next = next.filter((p) => p.concern?.includes(concern));
    next = next.filter((p) => (p.flashSale?.price ?? p.price) <= max);
    if (brand) next = next.filter((p) => p.brandId === brand);
    if (ings.length) next = next.filter((p) => ings.every((i) => p.ingredients.includes(i)));
    if (badges.length) next = next.filter((p) => badges.every((b) => p.badges.includes(b)));
    return next;
  }, [slug, type, concern, max, brand, ings, badges]);

  const tone = slug === "mens" ? "male" : slug === "makeup" ? "female" : "";

  return (
    <div className={`container-page py-8 ${tone === "male" ? "[&_.btn-primary]:bg-male-tint-dark [&_.btn-primary]:text-white" : tone === "female" ? "[&_.btn-primary]:bg-female-tint-dark [&_.btn-primary]:text-white" : ""}`}>
      <p className="text-[12px] tracking-widest uppercase text-gold-dark">GLOW / {slug.replace("-", " ")}</p>
      <h1 className="font-display text-4xl sm:text-5xl capitalize mt-2 mb-6">{slug.replace(/-/g, " ")}</h1>
      <div className="grid lg:grid-cols-[250px_1fr] gap-8">
        <aside className="lg:border-r lg:border-gold/20 lg:pr-5">
          <h3 className="text-xs tracking-widest uppercase mb-2">{t("browse")}</h3>
          {sidebarItems.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              onMouseEnter={() => setHover(s.id)}
              onMouseLeave={() => setHover(null)}
              className="flex items-center py-1.5 text-sm text-off-black/70 hover:text-off-black"
            >
              {lang === "bn" ? s.nameBn : s.name}
              {hover === s.id ? " →" : ""}
            </Link>
          ))}
          <h3 className="text-xs tracking-widest uppercase mt-5 mb-2">{t("price")}</h3>
          <input type="range" min={400} max={5000} value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full accent-gold" />
          <div className="text-sm">৳400 – ৳{max}</div>
          <h3 className="text-xs tracking-widest uppercase mt-5 mb-2">{t("brand")}</h3>
          <select className="input-field" value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">{t("allBrands")}</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <h3 className="text-xs tracking-widest uppercase mt-5 mb-2">{t("ingredients")}</h3>
          {INGREDIENTS.map((i) => (
            <label key={i} className="flex items-center gap-2 text-sm py-1">
              <input type="checkbox" checked={ings.includes(i)} onChange={() => setIngs((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]))} />
              {i}
            </label>
          ))}
          <h3 className="text-xs tracking-widest uppercase mt-5 mb-2">{t("safety")}</h3>
          {BADGES.map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm py-1">
              <input type="checkbox" checked={badges.includes(b)} onChange={() => setBadges((p) => (p.includes(b) ? p.filter((x) => x !== b) : [...p, b]))} />
              {b}
            </label>
          ))}
        </aside>
        <div>
          <p className="mb-4 text-sm">{list.length} {lang === "bn" ? "টি" : "items"}</p>
          {list.length === 0 ? (
            <p>{t("noResults")}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {list.map((p) => (
                <div key={p.id} className="[&>article]:w-full">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
