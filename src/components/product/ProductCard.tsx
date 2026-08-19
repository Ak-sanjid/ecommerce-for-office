"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { WHATSAPP, formatBdt, productName } from "@/lib/utils";
import { slugify } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, wishlist, toggleWish, notifyRestock, alerts } = useCart();
  const { lang, t } = useLang();
  const price = product.flashSale?.price ?? product.price;
  const off = product.originalPrice && product.originalPrice > price
    ? Math.round(((product.originalPrice - price) / product.originalPrice) * 100)
    : product.discount;
  const wished = wishlist.includes(product.id);
  const href = `/product/${slugify(product.name)}`;

  return (
    <article className="w-[220px] sm:w-[240px] bg-white relative group border border-transparent hover:border-gold-light transition-colors">
      <button
        type="button"
        className="absolute top-2 right-2 z-10 w-9 h-9 rounded-full bg-white/85 grid place-items-center"
        onClick={() => toggleWish(product.id)}
        aria-label={t("wishlist")}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4">
          <path d="M12 20s-7.2-4.4-9.2-8.2C1.2 9 2.4 6 5.4 5.4c1.8-.4 3.5.4 4.6 1.8 1.1-1.4 2.8-2.2 4.6-1.8 3 .6 4.2 3.6 2.6 6.4C19.2 15.6 12 20 12 20Z" />
        </svg>
      </button>
      {off ? (
        <span className="absolute top-2.5 left-2.5 z-10 bg-gold text-off-black text-[10px] tracking-widest uppercase px-1.5 py-0.5">
          -{off}%
        </span>
      ) : product.isTopSelling ? (
        <span className="absolute top-2.5 left-2.5 z-10 bg-off-black text-cream text-[10px] tracking-widest uppercase px-1.5 py-0.5">
          Top
        </span>
      ) : null}
      <Link href={href} className="block aspect-square overflow-hidden bg-cream-deep">
        <img src={product.image} alt={productName(product, lang)} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
      </Link>
      <div className="p-3">
        <div className="text-[11px] tracking-[0.16em] uppercase text-gold-dark">{product.brand}</div>
        <h3 className="font-display text-lg leading-snug min-h-[44px] mt-1">
          <Link href={href}>{productName(product, lang)}</Link>
        </h3>
        <div className="text-gold text-xs mt-1">
          {"★".repeat(Math.round(product.rating))}
          <span className="text-review-grey ml-1">({product.reviewCount})</span>
        </div>
        <div className="mt-1 text-sm">
          {formatBdt(price)}
          {product.originalPrice && <s className="ml-2 text-pink-gold text-xs">{formatBdt(product.originalPrice)}</s>}
        </div>
        <div className="mt-2">
          {product.stock > 0 ? (
            <button type="button" className="btn-primary w-full" onClick={() => addItem(product)}>
              {t("addToCart")}
            </button>
          ) : (
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(product.name)}`}
              className="btn-secondary w-full"
              onClick={() => notifyRestock(product.id)}
            >
              {alerts.includes(product.id) ? t("notifySet") : t("notify")}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
