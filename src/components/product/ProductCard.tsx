"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { productName } from "@/lib/utils";
import { slugify } from "@/data/products";
import { siteConfig } from "@/config/site";
import { bdt } from "@/lib/format";
import { SmartImage } from "@/components/shared/SmartImage";
import { Icon } from "@/components/shared/Icon";

export function ProductCard({
  product,
  width = "w-[168px] sm:w-[220px]",
}: {
  product: Product;
  width?: string;
}) {
  const { addItem, wishlist, toggleWish, notifyRestock, alerts } = useCart();
  const { lang, t } = useLang();
  const price = product.flashSale?.price ?? product.price;
  const off =
    product.originalPrice && product.originalPrice > price
      ? Math.round(((product.originalPrice - price) / product.originalPrice) * 100)
      : product.discount;
  const wished = wishlist.includes(product.id);
  const href = `/product/${slugify(product.name)}`;
  const genderRing =
    product.gender === "men"
      ? "hover:ring-male-tint/40"
      : product.gender === "women"
        ? "hover:ring-female-tint/40"
        : "hover:ring-gold/30";

  return (
    <article className={`${width} card group relative ring-1 ring-transparent transition-all ${genderRing}`}>
      <button
        type="button"
        className="absolute top-2 right-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-off-black/45 hover:text-pink-gold"
        onClick={() => toggleWish(product.id)}
        aria-label={t("wishlist")}
      >
        <Icon name="heart" size={15} filled={wished} />
      </button>
      {off ? (
        <span className="absolute left-2 top-2 z-10 rounded-full bg-pink-gold px-2 py-0.5 text-[10px] font-bold text-on-accent">
          -{off}%
        </span>
      ) : product.isTopSelling ? (
        <span className="absolute left-2 top-2 z-10 rounded-full bg-off-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cream">
          Top
        </span>
      ) : null}

      <Link href={href} className="block">
        <div className="relative aspect-square overflow-hidden bg-cream-deep">
          <SmartImage src={product.image} alt={productName(product, lang)} sizes="(max-width:640px) 45vw, 220px" />
          {product.stock === 0 && (
            <div className="absolute inset-0 grid place-items-center bg-white/75">
              <span className="text-xs font-semibold uppercase tracking-wider text-off-black/70">{t("soldOut")}</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">{product.brand}</p>
          <h3 className="mt-0.5 line-clamp-2 font-display text-[15px] leading-snug text-off-black/85">
            {productName(product, lang)}
          </h3>
          <div className="mt-1.5 flex items-center gap-1">
            <Icon name="star" size={11} filled className="text-gold" />
            <span className="text-[11px] font-medium text-off-black/70">{product.rating}</span>
            <span className="text-[11px] text-off-black/35">({product.reviewCount})</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-sm font-semibold">{bdt(price)}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-pink-gold line-through">{bdt(product.originalPrice)}</span>
            )}
          </div>
          {product.badges.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.badges.slice(0, 2).map((b) => (
                <span key={b} className="rounded bg-gold/10 px-1.5 py-px text-[9px] font-medium text-gold-dark">
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="px-3 pb-3">
        {product.stock > 0 ? (
          <button type="button" onClick={() => addItem(product)} className="btn-primary w-full text-xs">
            {t("addToCart")}
          </button>
        ) : (
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(product.name)}`}
            className="btn-secondary w-full text-xs"
            onClick={() => notifyRestock(product.id)}
          >
            {alerts.includes(product.id) ? t("notifySet") : t("notify")}
          </a>
        )}
      </div>
    </article>
  );
}
