import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useStore } from "../../store/Store";
import { tx } from "../../data/i18n";
import { products } from "../../data/products";
import { samples as sampleData, FREE_SHIPPING_OVER } from "../../data/config";
import { deliveryCharge, estimatedDelivery, formatBdt, loc } from "../../utils/format";
import { IconClose, IconMinus, IconPlus } from "../icons";

export function CartDrawer() {
  const {
    lang,
    cart,
    cartOpen,
    setCartOpen,
    setQty,
    removeFromCart,
    cartSubtotal,
    canPickSamples,
    samples,
    toggleSample,
  } = useStore();
  const [inside, setInside] = useState(true);

  const lines = useMemo(
    () =>
      cart
        .map((l) => {
          const product = products.find((p) => p.id === l.id);
          return product ? { ...l, product } : null;
        })
        .filter(Boolean),
    [cart],
  );

  if (!cartOpen) return null;

  const ship = cartSubtotal >= FREE_SHIPPING_OVER ? 0 : deliveryCharge(inside);
  const need = Math.max(0, FREE_SHIPPING_OVER - cartSubtotal);

  return (
    <>
      <button className="overlay" aria-label={tx("close", lang)} onClick={() => setCartOpen(false)} />
      <aside className="cart-drawer" role="dialog" aria-label={tx("cart", lang)}>
        <div className="drawer-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="kicker">{tx("cart", lang)}</div>
            <h2 className="serif" style={{ fontSize: 32 }}>
              KÁNTI
            </h2>
          </div>
          <button className="icon-btn" onClick={() => setCartOpen(false)} aria-label={tx("close", lang)}>
            <IconClose />
          </button>
        </div>
        <div className="drawer-body">
          {lines.length === 0 ? (
            <div className="empty">
              <p>{tx("emptyCart", lang)}</p>
              <Link className="btn btn-gold" to="/shop" onClick={() => setCartOpen(false)} style={{ marginTop: 16 }}>
                {tx("startShopping", lang)}
              </Link>
            </div>
          ) : (
            lines.map((line) =>
              line ? (
                <div className="cart-line" key={line.id}>
                  <img src={line.product.images[0]} alt="" />
                  <div>
                    <div className="card-brand">{line.product.brand}</div>
                    <Link to={`/product/${line.product.slug}`} onClick={() => setCartOpen(false)}>
                      {loc(line.product.name, lang)}
                    </Link>
                    <div className="price">{formatBdt(line.product.price)}</div>
                    <div className="qty" style={{ marginTop: 8 }}>
                      <button onClick={() => setQty(line.id, line.qty - 1)} aria-label="minus">
                        <IconMinus />
                      </button>
                      <span>{line.qty}</span>
                      <button onClick={() => setQty(line.id, line.qty + 1)} aria-label="plus">
                        <IconPlus />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(line.id)}>{tx("remove", lang)}</button>
                </div>
              ) : null,
            )
          )}

          {lines.length > 0 && (
            <div className="samples">
              <strong>{tx("samples", lang)}</strong>
              <p style={{ fontSize: 13, marginTop: 4 }}>
                {canPickSamples ? tx("samples", lang) : tx("samplesHint", lang)}
              </p>
              {canPickSamples && (
                <div className="sample-grid">
                  {sampleData.map((s) => (
                    <button
                      key={s.id}
                      className={samples.includes(s.id) ? "on" : ""}
                      onClick={() => toggleSample(s.id)}
                    >
                      <img src={s.image} alt="" />
                      {loc(s.name, lang)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {lines.length > 0 && (
          <div className="drawer-foot">
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <button className={`chip ${inside ? "on" : ""}`} onClick={() => setInside(true)}>
                {tx("insideDhaka", lang)}
              </button>
              <button className={`chip ${!inside ? "on" : ""}`} onClick={() => setInside(false)}>
                {tx("outsideDhaka", lang)}
              </button>
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>
              {tx("eta", lang)}: {estimatedDelivery(inside)}
            </p>
            <p style={{ fontSize: 13, margin: "6px 0 10px" }}>
              {need === 0 ? tx("freeShip", lang) : tx("addMore", lang, { n: need })}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span>{tx("subtotal", lang)}</span>
              <strong>{formatBdt(cartSubtotal)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span>{tx("delivery", lang)}</span>
              <strong>{ship === 0 ? (lang === "bn" ? "ফ্রি" : "Free") : formatBdt(ship)}</strong>
            </div>
            <Link className="btn btn-ink" to="/checkout" onClick={() => setCartOpen(false)} style={{ width: "100%" }}>
              {tx("checkout", lang)} · {formatBdt(cartSubtotal + ship)}
            </Link>
            <p style={{ fontSize: 12, marginTop: 10, color: "var(--ink-soft)" }}>{tx("guestNote", lang)}</p>
          </div>
        )}
      </aside>
    </>
  );
}
