"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { Icon } from "@/components/shared/Icon";
import { bdt } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { productName } from "@/lib/utils";
import { slugify } from "@/data/products";

export function ProductInfo({ product }: { product: Product }) {
  const { addItem, toggleWish, wishlist, notifyRestock, alerts } = useCart();
  const { lang, t } = useLang();
  const price = product.flashSale?.price ?? product.price;
  const share = encodeURIComponent(`https://glowbeauty.com.bd/product/${slugify(product.name)}`);

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">{product.brand}</p>
      <h1 className="mt-1 font-display text-3xl font-semibold leading-tight sm:text-4xl">{productName(product, lang)}</h1>

      <div className="mt-3 flex items-center gap-2">
        <Icon name="star" size={14} filled className="text-gold" />
        <span className="text-sm font-medium">{product.rating}</span>
        <span className="text-sm text-off-black/40">
          ({product.reviewCount} {t("reviews").toLowerCase()})
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-display text-3xl font-semibold">{bdt(price)}</span>
        {product.originalPrice && <span className="text-pink-gold line-through">{bdt(product.originalPrice)}</span>}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {product.badges.map((b) => (
          <span key={b} className="badge-gold">
            {b}
          </span>
        ))}
        <span className="badge-gold">{t("authentic")}</span>
        {product.official && (
          <span className="badge-gold">
            {t("official")} {product.brand}
          </span>
        )}
      </div>

      <p className="mt-3 text-[12px] text-off-black/50">
        {lang === "bn" ? "ব্যাচ" : "Batch"} {product.batch} · {lang === "bn" ? "মেয়াদ" : "Expiry"} {product.expiry} ·{" "}
        {product.volume} · {product.category} / {product.subCategory}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {product.stock > 0 ? (
          <button type="button" onClick={() => addItem(product)} className="btn-primary">
            {t("addToCart")}
          </button>
        ) : (
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(product.name)}`}
            className="btn-primary"
            onClick={() => notifyRestock(product.id)}
          >
            {alerts.includes(product.id) ? t("notifySet") : t("notify")}
          </a>
        )}
        <button type="button" className="btn-outline" onClick={() => toggleWish(product.id)}>
          <Icon name="heart" size={16} filled={wishlist.includes(product.id)} /> {t("wishlist")}
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-off-black/50">
        {t("share")}:
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${share}`} target="_blank" rel="noreferrer" className="hover:text-gold">
          Facebook
        </a>
        <a href={`https://wa.me/?text=${share}`} target="_blank" rel="noreferrer" className="hover:text-gold">
          WhatsApp
        </a>
        <span className="text-off-black/30">Instagram</span>
      </div>

      <a
        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(product.name)}`}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm text-[#25D366]"
      >
        <Icon name="whatsapp" size={16} /> {lang === "bn" ? "এই পণ্য নিয়ে জিজ্ঞেস" : "Ask about this product"}
      </a>
    </div>
  );
}
