"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProduct, products, relatedTo, slugify } from "@/data/products";
import { reviews } from "@/data/reviews";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { WHATSAPP, formatBdt, loc, productName } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { DragRail } from "@/components/home/DragRail";

const SHADE = [
  { id: "fair-warm", color: "#f0d0b0" },
  { id: "light-gold", color: "#e0b48a" },
  { id: "medium-gold", color: "#c99262" },
  { id: "tan-warm", color: "#a86c3e" },
  { id: "deep-gold", color: "#7a4528" },
];

export default function ProductPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const product = getProduct(slug) ?? products.find((p) => slugify(p.name) === slug);
  const { lang, t } = useLang();
  const { addItem, toggleWish, wishlist, viewProduct, notifyRestock, alerts } = useCart();
  const [img, setImg] = useState(0);
  const [pos, setPos] = useState(50);
  const [shade, setShade] = useState("medium-gold");

  useEffect(() => {
    if (product) viewProduct(product.id);
    setImg(0);
  }, [product, viewProduct]);

  if (!product) {
    return (
      <div className="container-page py-16">
        <h1 className="font-display text-4xl">{t("noResults")}</h1>
      </div>
    );
  }

  const price = product.flashSale?.price ?? product.price;
  const related = relatedTo(product);
  const alts = products.filter((p) => p.category === product.category && p.brand !== product.brand).slice(0, 4);
  const fb = reviews.filter((r) => !r.productId || r.productId === product.id);
  const share = encodeURIComponent(`https://glowbeauty.com.bd/product/${slugify(product.name)}`);

  return (
    <div className={`container-page py-8 ${product.gender === "men" ? "theme-men" : product.gender === "women" && product.category === "Makeup" ? "theme-women" : ""}`}>
      <p className="text-[12px] tracking-widest uppercase text-gold-dark">
        <Link href="/">GLOW</Link> / <Link href={`/category/${product.category === "Men's Grooming" ? "mens" : product.category.toLowerCase().replace(/\s|&/g, "-").replace(/--+/g, "-")}`}>{product.category}</Link>
      </p>
      <div className="grid lg:grid-cols-2 gap-10 mt-4">
        <div>
          <div
            className="aspect-square overflow-hidden bg-cream-deep cursor-crosshair"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--zx", `${((e.clientX - r.left) / r.width) * 100}%`);
              e.currentTarget.style.setProperty("--zy", `${((e.clientY - r.top) / r.height) * 100}%`);
            }}
          >
            <img
              src={product.images[img]}
              alt={productName(product, lang)}
              className="w-full h-full object-cover hover:scale-150 transition-transform origin-[var(--zx,50%)_var(--zy,50%)]"
            />
          </div>
          <div className="flex gap-2 mt-3">
            {product.images.map((src, i) => (
              <button key={src + i} type="button" onClick={() => setImg(i)} className={`w-16 h-16 overflow-hidden border ${i === img ? "border-gold" : "border-gold/20"}`}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs tracking-[0.2em] uppercase text-gold-dark">{product.brand}</div>
          <h1 className="font-display text-4xl lg:text-5xl mt-1">{productName(product, lang)}</h1>
          <div className="text-gold text-sm mt-2">
            {"★".repeat(Math.round(product.rating))} <span className="text-review-grey">{product.rating} · {product.reviewCount}</span>
          </div>
          <div className="text-2xl mt-3">
            {formatBdt(price)}
            {product.originalPrice && <s className="ml-3 text-pink-gold text-base">{formatBdt(product.originalPrice)}</s>}
          </div>
          <div className="flex flex-wrap gap-2 my-4">
            <span className="px-2.5 py-1 border border-gold/30 text-[11px] tracking-widest uppercase">{t("authentic")}</span>
            {product.official && <span className="px-2.5 py-1 border border-gold/30 text-[11px] tracking-widest uppercase">{t("official")} {product.brand}</span>}
            {product.badges.map((b) => (
              <span key={b} className="px-2.5 py-1 border border-gold/30 text-[11px] tracking-widest uppercase">{b}</span>
            ))}
          </div>
          <p className="text-sm text-off-black/60">
            Batch {product.batch} · {lang === "bn" ? "মেয়াদ" : "Expiry"} {product.expiry} · {product.volume}
          </p>
          {product.category === "Makeup" && (
            <div className="mt-4">
              <div className="kicker">{lang === "bn" ? "শেড ম্যাচার" : "Shade matcher"}</div>
              <div className="flex gap-2 mt-2">
                {SHADE.map((s) => (
                  <button key={s.id} type="button" aria-label={s.id} onClick={() => setShade(s.id)} className={`w-7 h-7 rounded-full border-2 border-white outline outline-1 ${shade === s.id ? "outline-gold" : "outline-gold/30"}`} style={{ background: s.color }} />
                ))}
              </div>
              <p className="text-xs mt-2">{shade.replace("-", " / ")}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-5">
            {product.stock > 0 ? (
              <button type="button" className="btn-primary" onClick={() => addItem(product)}>{t("addToCart")}</button>
            ) : (
              <a className="btn-ink" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(product.name)}`} onClick={() => notifyRestock(product.id)}>
                {alerts.includes(product.id) ? t("notifySet") : t("notify")}
              </a>
            )}
            <button type="button" className="btn-secondary" onClick={() => toggleWish(product.id)}>{t("wishlist")}</button>
          </div>
          <div className="flex gap-3 items-center mt-4 text-sm">
            {t("share")}
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${share}`} target="_blank" rel="noreferrer">Facebook</a>
            <a href={`https://wa.me/?text=${share}`} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-10">
        <section>
          <div className="kicker">{lang === "bn" ? "বর্ণনা" : "Notes"}</div>
          <p className="max-w-prose text-off-black/70 mt-2">{product.descriptionBangla}</p>
          <p className="max-w-prose text-off-black/70 mt-2">{product.description}</p>
        </section>
        <section>
          <div className="kicker">{t("howTo")}</div>
          <p className="max-w-prose text-off-black/70 mt-2">{loc(product.howToUse, product.howToUseBn, lang)}</p>
        </section>
        {(product.category === "Skincare" || product.category === "Haircare") && (
          <section>
            <div className="kicker">Before / after</div>
            <div className="relative max-w-lg aspect-[4/3] overflow-hidden bg-cream-deep mt-3 select-none">
              <img src={product.images[0]} alt="before" className="absolute inset-0 w-full h-full object-cover" />
              <img src={product.images[1] ?? product.images[0]} alt="after" className="absolute inset-0 w-full h-full object-cover brightness-105 saturate-125" style={{ clipPath: `inset(0 0 0 ${pos}%)` }} />
              <input type="range" min={8} max={92} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="absolute bottom-3 left-3 right-3 w-[calc(100%-24px)] accent-gold" />
            </div>
          </section>
        )}
        <section>
          <div className="kicker">{t("reviews")}</div>
          <DragRail className="mt-3">
            {fb.map((r) => (
              <article key={r.id} className="w-[320px] bg-[#f3f3f3] text-review-grey p-5 min-h-[180px]">
                <p className="font-display text-xl text-[#4a4a4a]">“{loc(r.text, r.textBn, lang)}”</p>
                <footer className="mt-3 text-sm">{r.author} · {r.source}</footer>
              </article>
            ))}
          </DragRail>
        </section>
        <section>
          <div className="kicker">{lang === "bn" ? "এই ব্র্যান্ড না থাকলে" : "If this brand is out"}</div>
          <DragRail className="mt-3">
            {alts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </DragRail>
        </section>
        <section>
          <div className="kicker">{lang === "bn" ? "সম্পর্কিত" : "Related"}</div>
          <DragRail className="mt-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </DragRail>
        </section>
      </div>
    </div>
  );
}
