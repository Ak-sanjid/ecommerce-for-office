import { Link } from "react-router-dom";
import { brands } from "../../data/brands";
import { products } from "../../data/products";
import { useStore } from "../../store/Store";
import { loc, formatBdt } from "../../utils/format";

export function SearchPanel({ query }: { query: string }) {
  const { lang, setSearchOpen } = useStore();
  const q = query.trim().toLowerCase();
  if (q.length < 1) return null;

  const hits = products
    .filter((p) => {
      const blob = `${p.brand} ${p.slug} ${p.name.en} ${p.name.bn} ${p.ingredients.join(" ")} ${p.concerns.join(" ")}`.toLowerCase();
      return blob.includes(q);
    })
    .slice(0, 6);

  const brandHits = brands.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 4);

  if (!hits.length && !brandHits.length) {
    return (
      <div className="search-panel">
        <p style={{ padding: 12 }}>{lang === "bn" ? "কিছু মেলেনি" : "Nothing matches yet."}</p>
      </div>
    );
  }

  return (
    <div className="search-panel" role="listbox">
      {brandHits.map((b) => (
        <Link key={b.slug} className="search-hit" to={`/brand/${b.slug}`} onClick={() => setSearchOpen(false)}>
          <div />
          <div>
            <strong>{b.name}</strong>
            <div className="card-brand">Brand</div>
          </div>
        </Link>
      ))}
      {hits.map((p) => (
        <Link key={p.id} className="search-hit" to={`/product/${p.slug}`} onClick={() => setSearchOpen(false)}>
          <img src={p.images[0]} alt="" />
          <div>
            <div className="card-brand">{p.brand}</div>
            {loc(p.name, lang)}
          </div>
          <strong>{formatBdt(p.price)}</strong>
        </Link>
      ))}
    </div>
  );
}
