import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, relatedProducts, products } from "../data/products";
import { reviews } from "../data/reviews";
import { useStore } from "../store/Store";
import { loc, formatBdt, discountPct } from "../utils/format";
import { tx } from "../data/i18n";
import { ProductCard } from "../components/product/ProductCard";
import { WHATSAPP } from "../data/config";
import { IconFacebook, IconHeart, IconInstagram, IconShare, IconStar, IconWhatsApp } from "../components/icons";

const SHADE = [
  { id: "fair-warm", color: "#f0d0b0" },
  { id: "light-gold", color: "#e0b48a" },
  { id: "medium-gold", color: "#c99262" },
  { id: "tan-warm", color: "#a86c3e" },
  { id: "deep-gold", color: "#7a4528" },
];

export function ProductPage() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { lang, addToCart, toggleWish, wishlist, viewProduct, notifyRestock, alerts, toggleCompare, compare } =
    useStore();
  const [img, setImg] = useState(0);
  const [pos, setPos] = useState(50);
  const [shade, setShade] = useState("medium-gold");

  useEffect(() => {
    if (product) viewProduct(product.id);
    setImg(0);
  }, [product, viewProduct]);

  if (!product) {
    return (
      <div className="page wrap">
        <h1>{tx("noResults", lang)}</h1>
      </div>
    );
  }

  const related = relatedProducts(product);
  const alts = products.filter((p) => p.category === product.category && p.brand !== product.brand).slice(0, 4);
  const fbReviews = reviews.filter((r) => !r.product || r.product === product.id);
  const off = discountPct(product.price, product.compareAt);
  const share = encodeURIComponent(`https://kanti.shop/product/${product.slug}`);

  return (
    <div className="page wrap" data-tone={product.genderTone === "neutral" ? undefined : product.genderTone}>
      <div className="crumbs">
        <Link to="/">KÁNTI</Link> / <Link to={`/shop?category=${product.category}`}>{product.category}</Link> /{" "}
        {product.brand}
      </div>
      <div className="pdp">
        <div className="gallery">
          <div
            className="zoom-stage"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - r.left) / r.width) * 100;
              const y = ((e.clientY - r.top) / r.height) * 100;
              e.currentTarget.style.setProperty("--zx", `${x}%`);
              e.currentTarget.style.setProperty("--zy", `${y}%`);
            }}
          >
            <img
              src={product.images[img]}
              alt={loc(product.name, lang)}
              style={{ transformOrigin: "var(--zx, 50%) var(--zy, 50%)", transition: "transform .2s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
          <div className="thumbs">
            {product.images.map((src, i) => (
              <button key={src + i} className={i === img ? "on" : ""} onClick={() => setImg(i)}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="pdp-brand">{product.brand}</div>
          <h1>{loc(product.name, lang)}</h1>
          <div className="stars" style={{ margin: "8px 0" }}>
            {Array.from({ length: 5 }, (_, i) => (
              <IconStar key={i} filled={i < Math.round(product.rating)} />
            ))}
            <span>
              {product.rating} · {product.reviewCount}
            </span>
          </div>
          <div className="price" style={{ fontSize: 24, margin: "8px 0" }}>
            {formatBdt(product.price)}
            {product.compareAt ? <s>{formatBdt(product.compareAt)}</s> : null}
            {off ? <span className="pct">-{off}%</span> : null}
          </div>
          <div className="trust-row">
            <span className="pill">{tx("authentic", lang)}</span>
            {product.officialDistributor && (
              <span className="pill">
                {tx("official", lang)} {product.brand}
              </span>
            )}
            {product.badges.map((b) => (
              <span className="pill" key={b}>
                {b}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>
            {tx("batch", lang)} {product.batch} · {tx("expiry", lang)} {product.expiry} · {product.volume}
          </p>
          {product.category === "makeup" && (
            <div style={{ marginTop: 16 }}>
              <div className="kicker">{lang === "bn" ? "শেড ম্যাচার" : "Shade matcher"}</div>
              <div className="shade">
                {SHADE.map((s) => (
                  <button
                    key={s.id}
                    className={shade === s.id ? "on" : ""}
                    style={{ background: s.color }}
                    onClick={() => setShade(s.id)}
                    aria-label={s.id}
                  />
                ))}
              </div>
              <p style={{ fontSize: 13, marginTop: 6 }}>{shade.replace("-", " / ")}</p>
            </div>
          )}
          <div className="pdp-actions">
            {product.inStock ? (
              <button className="btn btn-gold" onClick={() => addToCart(product.id)}>
                {tx("addToCart", lang)}
              </button>
            ) : (
              <a className="btn btn-ink" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(product.name.en)}`} onClick={() => notifyRestock(product.id)}>
                {alerts.includes(product.id) ? tx("notifySet", lang) : tx("notify", lang)}
              </a>
            )}
            <button className="btn btn-ghost" onClick={() => toggleWish(product.id)}>
              <IconHeart filled={wishlist.includes(product.id)} /> {tx("wishlist", lang)}
            </button>
            <button className="btn btn-ghost" onClick={() => toggleCompare(product.id)}>
              {tx("compare", lang)} {compare.includes(product.id) ? "✓" : ""}
            </button>
          </div>
          <div className="share-row">
            <IconShare /> {tx("share", lang)}
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${share}`} target="_blank" rel="noreferrer">
              <IconFacebook />
            </a>
            <a href={`https://wa.me/?text=${share}`} target="_blank" rel="noreferrer">
              <IconWhatsApp />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <IconInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="tabs">
        <section>
          <div className="kicker">{lang === "bn" ? "বর্ণনা" : "Notes"}</div>
          <div className="prose">
            <p>{loc(product.description, "bn")}</p>
            <p>{loc(product.description, "en")}</p>
          </div>
        </section>
        <section>
          <div className="kicker">{tx("howTo", lang)}</div>
          <div className="prose">
            <p>{loc(product.howToUse, lang)}</p>
          </div>
        </section>
        {(product.category === "skincare" || product.category === "haircare") && (
          <section>
            <div className="kicker">Before / after</div>
            <div className="ba" style={{ ["--pos" as string]: `${pos}%` }}>
              <img src={product.images[0]} alt="before" />
              <img className="after" src={product.images[1] ?? product.images[0]} alt="after" style={{ filter: "saturate(1.15) brightness(1.05)" }} />
              <input type="range" min={8} max={92} value={pos} onChange={(e) => setPos(Number(e.target.value))} />
            </div>
          </section>
        )}
        <section>
          <div className="kicker">{tx("qa", lang)}</div>
          <div className="prose">
            <p>
              <strong>{lang === "bn" ? "এটা কি অথেন্টিক?" : "Is this authentic?"}</strong>
              <br />
              {lang === "bn"
                ? "হ্যাঁ — অফিসিয়াল চ্যানেল, ব্যাচ ও মেয়াদ প্রতি বক্সে।"
                : "Yes — official channel, batch and expiry printed on every box."}
            </p>
            <p>
              <strong>{lang === "bn" ? "ক্যাশ অন ডেলিভারি?" : "Cash on delivery?"}</strong>
              <br />
              {lang === "bn" ? "৬৪ জেলায়। ফোনে একবার যাচাই।" : "All 64 districts. A quick phone confirmation."}
            </p>
          </div>
        </section>
        <section>
          <div className="kicker">{tx("reviews", lang)}</div>
          <div className="rail">
            {fbReviews.map((r) => (
              <article key={r.id} className="review-card">
                <p>“{loc(r.text, lang)}”</p>
                <footer>
                  <span>{r.name}</span>
                  <span className="review-src">{r.source}</span>
                </footer>
              </article>
            ))}
          </div>
        </section>
        <section>
          <div className="kicker">{tx("altBrands", lang)}</div>
          <div className="rail">
            {alts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
        <section>
          <div className="kicker">{tx("related", lang)}</div>
          <div className="rail">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
