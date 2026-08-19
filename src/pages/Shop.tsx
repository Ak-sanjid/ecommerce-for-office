import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products, productTypes } from "../data/products";
import { brands } from "../data/brands";
import { sidebarItems } from "../data/nav";
import { useStore } from "../store/Store";
import { loc } from "../utils/format";
import { tx } from "../data/i18n";
import { ProductCard } from "../components/product/ProductCard";

const INGREDIENTS = ["Niacinamide", "Vitamin C", "Salicylic Acid", "Snail Mucin", "Hyaluronic Acid", "Centella Asiatica", "Heartleaf"];
const BADGES = ["paraben-free", "halal", "cruelty-free"];

export function Shop() {
  const { lang } = useStore();
  const [params] = useSearchParams();
  const category = params.get("category") ?? "";
  const origin = params.get("origin") ?? "";
  const concern = params.get("concern") ?? "";
  const type = params.get("type") ?? "";
  const filter = params.get("filter") ?? "";
  const view = params.get("view") ?? "";

  const [max, setMax] = useState(5000);
  const [brand, setBrand] = useState("");
  const [ings, setIngs] = useState<string[]>([]);
  const [badges, setBadges] = useState<string[]>([]);
  const [sort, setSort] = useState("featured");
  const [hover, setHover] = useState<string | null>(null);

  const typeIds = type ? new Set(productTypes[type] ?? []) : null;

  const list = useMemo(() => {
    let next = products.slice();
    if (category) next = next.filter((p) => p.category === category);
    if (origin) next = next.filter((p) => p.origin === origin);
    if (concern) next = next.filter((p) => p.concerns.includes(concern));
    if (typeIds) next = next.filter((p) => typeIds.has(p.id));
    if (filter === "top") next = next.filter((p) => p.isTopSeller);
    if (filter === "offer") next = next.filter((p) => p.isOffer || p.isFlash);
    if (filter === "combo") next = next.filter((p) => p.id === "p24" || p.compareAt);
    next = next.filter((p) => p.price <= max);
    if (brand) next = next.filter((p) => p.brandSlug === brand);
    if (ings.length) next = next.filter((p) => ings.every((i) => p.ingredients.includes(i)));
    if (badges.length) next = next.filter((p) => badges.every((b) => p.badges.includes(b)));
    if (sort === "priceLow") next.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") next.sort((a, b) => b.price - a.price);
    if (sort === "newest") next.reverse();
    return next;
  }, [category, origin, concern, typeIds, filter, max, brand, ings, badges, sort]);

  const title =
    view === "brands"
      ? tx("brandsAZ", lang)
      : category
        ? category
        : origin
          ? origin
          : lang === "bn"
            ? "দোকান"
            : "The shop";

  return (
    <div className="page wrap">
      <div className="crumbs">KÁNTI / {title}</div>
      <h1 style={{ textTransform: "capitalize" }}>{title.replace("-", " ")}</h1>
      {view === "brands" ? (
        <div className="grid">
          {brands.map((b) => (
            <Link key={b.slug} to={`/brand/${b.slug}`} className="brand-tile" style={{ width: "auto" }}>
              <em>{b.name}</em>
              <small>{b.origin}</small>
            </Link>
          ))}
        </div>
      ) : (
        <div className="shop-layout">
          <aside className="side">
            <h3>{tx("browse", lang)}</h3>
            {sidebarItems
              .filter((s) => s.visible)
              .sort((a, b) => a.order - b.order)
              .map((s) => (
                <Link
                  key={s.id}
                  to={s.href}
                  className="side-link"
                  onMouseEnter={() => setHover(s.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  {loc(s.label, lang)}
                  {hover === s.id ? " →" : ""}
                </Link>
              ))}
            <h3>{tx("price", lang)}</h3>
            <input className="range" type="range" min={400} max={5000} value={max} onChange={(e) => setMax(Number(e.target.value))} />
            <div>৳400 – ৳{max}</div>
            <h3>{tx("brand", lang)}</h3>
            <input
              list="brands"
              placeholder={tx("search", lang)}
              onChange={(e) => {
                const hit = brands.find((b) => b.name.toLowerCase() === e.target.value.toLowerCase());
                setBrand(hit?.slug ?? "");
              }}
              style={{ width: "100%", height: 38, border: "1px solid var(--line)", padding: "0 8px", background: "var(--ivory)" }}
            />
            <datalist id="brands">
              {brands.map((b) => (
                <option key={b.slug} value={b.name} />
              ))}
            </datalist>
            <h3>{tx("ingredients", lang)}</h3>
            {INGREDIENTS.map((i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  checked={ings.includes(i)}
                  onChange={() => setIngs((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]))}
                />
                {i}
              </label>
            ))}
            <h3>{tx("safety", lang)}</h3>
            {BADGES.map((b) => (
              <label key={b}>
                <input
                  type="checkbox"
                  checked={badges.includes(b)}
                  onChange={() => setBadges((p) => (p.includes(b) ? p.filter((x) => x !== b) : [...p, b]))}
                />
                {b}
              </label>
            ))}
          </aside>
          <div>
            <div className="toolbar">
              <span>
                {list.length} {tx("items", lang)}
              </span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label={tx("sort", lang)}>
                <option value="featured">{tx("featured", lang)}</option>
                <option value="priceLow">{tx("priceLow", lang)}</option>
                <option value="priceHigh">{tx("priceHigh", lang)}</option>
                <option value="newest">{tx("newest", lang)}</option>
              </select>
            </div>
            {list.length === 0 ? (
              <p>{tx("noResults", lang)}</p>
            ) : (
              <div className="grid">
                {list.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
