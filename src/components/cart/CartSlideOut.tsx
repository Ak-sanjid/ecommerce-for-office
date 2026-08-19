"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { samples } from "@/data/reviews";
import { deliveryCharge, estimatedDelivery, loc, productName } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { bdt } from "@/lib/format";
import { slugify } from "@/data/products";
import { Icon } from "@/components/shared/Icon";

export function CartSlideOut() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, canPickSamples, selectedSamples, toggleSample } =
    useCart();
  const { lang, t } = useLang();
  const [inside, setInside] = useState(true);
  if (!isOpen) return null;

  const ship = totalPrice >= siteConfig.freeShippingThreshold ? 0 : deliveryCharge(inside);
  const need = Math.max(0, siteConfig.freeShippingThreshold - totalPrice);
  const sampleNeed = Math.max(0, siteConfig.freeSampleThreshold - totalPrice);

  return (
    <>
      <button type="button" className="fixed inset-0 bg-off-black/30 z-[80]" onClick={closeCart} aria-label={t("close")} />
      <aside className="fixed top-0 right-0 z-[90] w-[min(420px,100%)] h-dvh bg-white shadow-panel flex flex-col">
        <div className="p-5 border-b border-gold/20 flex justify-between items-center">
          <div>
            <div className="kicker">{t("cart")}</div>
            <h2 className="font-display text-3xl">GLOW</h2>
          </div>
          <button type="button" onClick={closeCart} className="p-2" aria-label={t("close")}>
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-auto p-5">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p>{t("emptyCart")}</p>
              <Link href="/category/skincare" onClick={closeCart} className="btn-primary mt-4 inline-flex">
                {t("startShopping")}
              </Link>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="grid grid-cols-[72px_1fr_auto] gap-3 py-3 border-b border-gold/15">
                <img src={product.image} alt="" className="w-[72px] h-[72px] object-cover" />
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-gold-dark">{product.brand}</div>
                  <Link href={`/product/${slugify(product.name)}`} onClick={closeCart} className="text-sm">
                    {productName(product, lang)}
                  </Link>
                  <div className="text-sm mt-1">{bdt(product.flashSale?.price ?? product.price)}</div>
                  <div className="inline-flex items-center border border-gold/30 rounded-full h-7 mt-2">
                    <button type="button" className="w-7" onClick={() => updateQuantity(product.id, quantity - 1)}>
                      −
                    </button>
                    <span className="text-sm">{quantity}</span>
                    <button type="button" className="w-7" onClick={() => updateQuantity(product.id, quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button type="button" className="text-xs text-off-black/50" onClick={() => removeItem(product.id)}>
                  ✕
                </button>
              </div>
            ))
          )}

          {items.length > 0 && (
            <div className="mt-4 p-3 bg-cream border border-dashed border-gold">
              <strong className="text-sm">{t("samples")}</strong>
              <p className="text-xs mt-1 text-off-black/60">
                {canPickSamples
                  ? t("samples")
                  : lang === "bn"
                    ? `${bdt(sampleNeed)} আর খরচ করলে ২টি ফ্রি স্যাম্পল`
                    : `Spend ${bdt(sampleNeed)} more to unlock 2 free samples`}
              </p>
              {canPickSamples && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {samples.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleSample(s.id)}
                      className={`flex items-center gap-2 p-1.5 text-left text-xs border ${selectedSamples.includes(s.id) ? "border-gold bg-white" : "border-gold/20 bg-white"}`}
                    >
                      <img src={s.image} alt="" className="w-9 h-9 object-cover" />
                      {loc(s.name, s.nameBn, lang)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="p-5 border-t border-gold/20">
            <div className="flex gap-2 mb-3">
              <button type="button" className={`px-3 h-8 rounded-full text-xs border ${inside ? "border-gold bg-cream" : "border-gold/20"}`} onClick={() => setInside(true)}>
                {t("insideDhaka")}
              </button>
              <button type="button" className={`px-3 h-8 rounded-full text-xs border ${!inside ? "border-gold bg-cream" : "border-gold/20"}`} onClick={() => setInside(false)}>
                {t("outsideDhaka")}
              </button>
            </div>
            <p className="text-xs text-off-black/60">
              {t("eta")}: {estimatedDelivery(inside)}
            </p>
            <p className="text-xs my-2">
              {need === 0 ? t("freeShip") : lang === "bn" ? `ফ্রি ডেলিভারির জন্য আরও ${bdt(need)}` : `Add ${bdt(need)} more for free delivery`}
            </p>
            <div className="flex justify-between text-sm mb-1">
              <span>{t("subtotal")}</span>
              <strong>{bdt(totalPrice)}</strong>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span>{t("delivery")}</span>
              <strong>{ship === 0 ? (lang === "bn" ? "ফ্রি" : "Free") : bdt(ship)}</strong>
            </div>
            <Link href="/checkout" onClick={closeCart} className="btn-ink w-full">
              {t("checkout")} · {bdt(totalPrice + ship)}
            </Link>
            <p className="text-xs text-off-black/60 mt-2">{t("guestNote")}</p>
          </div>
        )}
      </aside>
    </>
  );
}
