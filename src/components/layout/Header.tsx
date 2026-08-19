import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useStore } from "../../store/Store";
import { tx } from "../../data/i18n";
import { loc } from "../../utils/format";
import { brands, brandLetters } from "../../data/brands";
import { WHATSAPP, WHATSAPP_DISPLAY } from "../../data/config";
import { Logo } from "../Logo";
import { SearchPanel } from "./SearchPanel";
import {
  IconBag,
  IconChevron,
  IconClose,
  IconHeart,
  IconLang,
  IconMenu,
  IconSearch,
  IconUser,
  IconWhatsApp,
} from "../icons";

export function Header() {
  const {
    lang,
    setLang,
    user,
    cartCount,
    wishlist,
    nav,
    quick,
    promo,
    setCartOpen,
    setAccountOpen,
    setSearchOpen,
    searchOpen,
    mobileOpen,
    setMobileOpen,
  } = useStore();
  const [compact, setCompact] = useState(false);
  const [query, setQuery] = useState("");
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [letter, setLetter] = useState("All");
  const [promoIdx, setPromoIdx] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setOpenMega(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search, setMobileOpen, setSearchOpen]);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setPromoIdx((i) => (i + 1) % promo.length), 4200);
    return () => window.clearInterval(id);
  }, [promo.length]);

  useEffect(() => {
    if (!searchOpen) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest(".search") && !t.closest(".search-panel")) setSearchOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [searchOpen, setSearchOpen]);

  const visibleNav = useMemo(
    () => [...nav].filter((n) => n.visible).sort((a, b) => a.order - b.order),
    [nav],
  );
  const visibleQuick = useMemo(
    () => [...quick].filter((q) => q.visible).sort((a, b) => a.order - b.order),
    [quick],
  );

  const filteredBrands = letter === "All" ? brands : brands.filter((b) => b.letter === letter);

  return (
    <header className={`site-header ${compact ? "is-compact" : ""}`}>
      <div className="promo-strip" style={{ position: "relative" }}>
        <div className="promo-track">{loc(promo[promoIdx].text, lang)}</div>
        <button className="lang-mini" onClick={() => setLang(lang === "en" ? "bn" : "en")}>
          {tx("language", lang)}
        </button>
      </div>

      <div className="wrap header-main">
        <button className="icon-btn mobile-acc" onClick={() => setMobileOpen(true)} aria-label={tx("menu", lang)}>
          <IconMenu />
        </button>
        <Logo />
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
            setSearchOpen(true);
          }}
        >
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            placeholder={tx("search", lang)}
            aria-label={tx("search", lang)}
          />
          <button className="icon-btn go" type="submit" aria-label={tx("search", lang)}>
            <IconSearch />
          </button>
          {searchOpen && query && <SearchPanel query={query} />}
        </form>
        <div className="header-actions">
          <button className="icon-btn mobile-acc" onClick={() => setSearchOpen(!searchOpen)} aria-label={tx("search", lang)}>
            <IconSearch />
          </button>
          <div className="account-stack">
            <a
              className="wa-link"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`${tx("support", lang)} ${WHATSAPP_DISPLAY}`}
            >
              <IconWhatsApp width={18} height={18} />
            </a>
            <button className="account-btn" onClick={() => setAccountOpen(true)}>
              <IconUser />
              <strong>{user ? user.name.split(" ")[0] : tx("helloGuest", lang)}</strong>
            </button>
          </div>
          <Link className="icon-btn" to="/wishlist" aria-label={tx("wishlist", lang)}>
            <IconHeart filled={wishlist.length > 0} />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </Link>
          <button className="icon-btn" onClick={() => setCartOpen(true)} aria-label={tx("cart", lang)}>
            <IconBag />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      {searchOpen && query && (
        <div className="mobile-acc wrap" style={{ paddingBottom: 10 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tx("search", lang)}
            style={{ width: "100%", height: 42, border: "1px solid var(--line)", borderRadius: 99, padding: "0 16px", background: "var(--ivory)" }}
          />
          <SearchPanel query={query} />
        </div>
      )}

      <div className="wrap cat-bar">
        <nav aria-label="Primary">
          {visibleNav.map((item) => (
            <div
              key={item.id}
              className={`cat-item ${openMega === item.id ? "is-open" : ""}`}
              onMouseEnter={() => item.mega && setOpenMega(item.id)}
              onMouseLeave={() => setOpenMega(null)}
            >
              {item.mega ? (
                <button className="cat-trigger" onClick={() => setOpenMega(openMega === item.id ? null : item.id)}>
                  {loc(item.label, lang)}
                </button>
              ) : (
                <NavLink to={item.href} end={item.href === "/"}>
                  {loc(item.label, lang)}
                </NavLink>
              )}

              {item.mega === "category" || item.mega === "solutions" ? (
                <div className="mega mega-cat">
                  <div className="mega-links">
                    <Link to={item.href} style={{ fontWeight: 600 }}>
                      {lang === "bn" ? "সব দেখুন" : "Shop all"}
                    </Link>
                    {item.children?.map((c) => (
                      <Link key={c.id} to={c.href}>
                        {loc(c.label, lang)}
                      </Link>
                    ))}
                  </div>
                  {item.featured && (
                    <Link to={item.featured.href} className="mega-feature">
                      <img src={item.featured.image} alt="" />
                      <span>{loc(item.featured.title, lang)}</span>
                    </Link>
                  )}
                </div>
              ) : null}

              {item.mega === "brand" ? (
                <div className="mega mega-brand">
                  <div className="az-row">
                    <button className={letter === "All" ? "on" : ""} onClick={() => setLetter("All")}>
                      {tx("allBrands", lang)}
                    </button>
                    {brandLetters.map((L) => (
                      <button key={L} className={letter === L ? "on" : ""} onClick={() => setLetter(L)}>
                        {L}
                      </button>
                    ))}
                  </div>
                  <div className="brand-grid">
                    {filteredBrands.map((b) => (
                      <Link key={b.slug} to={`/brand/${b.slug}`}>
                        <small>{b.origin}</small>
                        {b.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </div>

      <div className="quick-bar">
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, width: "100%" }}>
          <div className="quick-left">
            <div className="browse-wrap" onMouseLeave={(e) => e.currentTarget.classList.remove("open")}>
              <button
                className="browse-btn"
                onClick={(e) => e.currentTarget.parentElement?.classList.toggle("open")}
              >
                <IconMenu width={16} height={16} /> {tx("browse", lang)}
              </button>
              <div className="browse-panel">
                {visibleNav
                  .filter((n) => n.id !== "home")
                  .map((n) => (
                    <Link key={n.id} to={n.href}>
                      {loc(n.label, lang)} <IconChevron width={16} height={16} />
                    </Link>
                  ))}
              </div>
            </div>
            <div className="quick-chips">
              {visibleQuick.map((q) => (
                <Link key={q.id} className="chip" to={q.href}>
                  {loc(q.label, lang)}
                </Link>
              ))}
            </div>
          </div>
          <div className="quick-right">
            <button onClick={() => setAccountOpen(true)}>{tx("account", lang)}</button>
            <Link to="/wishlist">{tx("wishlist", lang)}</Link>
            <button onClick={() => setCartOpen(true)}>{tx("cart", lang)}</button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <>
          <button className="overlay" onClick={() => setMobileOpen(false)} />
          <aside className="mobile-drawer">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Logo />
              <button className="icon-btn" onClick={() => setMobileOpen(false)}>
                <IconClose />
              </button>
            </div>
            <button className="btn btn-ghost" style={{ margin: "16px 0", width: "100%" }} onClick={() => setLang(lang === "en" ? "bn" : "en")}>
              <IconLang /> {tx("language", lang)}
            </button>
            <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
              <button className="btn btn-ghost" onClick={() => { setAccountOpen(true); setMobileOpen(false); }}>
                {user ? user.name : tx("helloGuest", lang)}
              </button>
              <a className="btn btn-gold" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">
                <IconWhatsApp /> {tx("support", lang)}
              </a>
            </div>
            {visibleNav.map((item) => (
              <div key={item.id} style={{ borderBottom: "1px solid var(--line)" }}>
                <Link to={item.href} style={{ display: "block", padding: "12px 4px", fontSize: 18 }}>
                  {loc(item.label, lang)}
                </Link>
                {item.children && (
                  <div style={{ padding: "0 4px 10px 12px", display: "grid", gap: 6 }}>
                    {item.children.map((c) => (
                      <Link key={c.id} to={c.href} style={{ color: "var(--ink-soft)" }}>
                        {loc(c.label, lang)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </aside>
        </>
      )}
    </header>
  );
}
