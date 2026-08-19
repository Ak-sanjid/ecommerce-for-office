import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { useStore } from "../../store/Store";
import { loc, formatBdt, discountPct } from "../../utils/format";
import { tx } from "../../data/i18n";
import { IconHeart, IconStar } from "../icons";

export function ProductCard({ product }: { product: Product }) {
  const { lang, addToCart, wishlist, toggleWish, notifyRestock, alerts } = useStore();
  const off = discountPct(product.price, product.compareAt);
  const wished = wishlist.includes(product.id);

  return (
    <article className="card">
      <button
        className="wish"
        aria-label={tx("wishlist", lang)}
        onClick={() => toggleWish(product.id)}
      >
        <IconHeart filled={wished} />
      </button>
      {off ? <span className="tag sale">-{off}%</span> : product.isTopSeller ? <span className="tag">Top</span> : null}
      <Link to={`/product/${product.slug}`} className="card-media">
        <img src={product.images[0]} alt="" loading="lazy" className="lazy-img" />
      </Link>
      <div className="card-body">
        <div className="card-brand">{product.brand}</div>
        <h3>
          <Link to={`/product/${product.slug}`}>{loc(product.name, lang)}</Link>
        </h3>
        <div className="stars" aria-label={`${product.rating} stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <IconStar key={i} filled={i < Math.round(product.rating)} />
          ))}
          <span>({product.reviewCount})</span>
        </div>
        <div className="price">
          {formatBdt(product.price)}
          {product.compareAt ? <s>{formatBdt(product.compareAt)}</s> : null}
        </div>
        <div className="card-actions">
          {product.inStock ? (
            <button className="btn btn-gold" onClick={() => addToCart(product.id)}>
              {tx("addToCart", lang)}
            </button>
          ) : (
            <button className="btn btn-ghost" onClick={() => notifyRestock(product.id)}>
              {alerts.includes(product.id) ? tx("notifySet", lang) : tx("notify", lang)}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
