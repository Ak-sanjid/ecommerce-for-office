import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CartDrawer } from "./components/layout/CartDrawer";
import { AccountModal } from "./components/layout/AccountModal";
import { ChatAssistant } from "./components/ChatAssistant";
import { SkinQuiz } from "./components/home/SkinQuiz";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductPage } from "./pages/Product";
import {
  AccountPage,
  BlogPage,
  BrandPage,
  CheckoutPage,
  ComparePage,
  ContactPage,
  LegalPage,
  QuizRoute,
  SolutionsPage,
  TrackPage,
  WishlistPage,
} from "./pages/MorePages";
import { useStore } from "./store/Store";
import { products } from "./data/products";
import { loc } from "./utils/format";
import { tx } from "./data/i18n";
import { captureReferral } from "./lib/analytics";
import { Link } from "react-router-dom";

function CompareDock() {
  const { compare, lang, toggleCompare } = useStore();
  if (compare.length < 2) return null;
  const list = products.filter((p) => compare.includes(p.id));
  return (
    <div className="compare-bar">
      <span>
        {tx("compare", lang)} · {list.map((p) => loc(p.name, lang)).join(" · ")}
      </span>
      <Link className="btn btn-gold" to="/compare">
        {tx("compare", lang)}
      </Link>
      {list.map((p) => (
        <button key={p.id} onClick={() => toggleCompare(p.id)}>
          ×
        </button>
      ))}
    </div>
  );
}

function Shell() {
  const { toast, recently, lang } = useStore();
  const location = useLocation();
  const tone = location.pathname.includes("/shop") && location.search.includes("category=men")
    ? "masculine"
    : location.pathname.includes("/shop") && location.search.includes("category=makeup")
      ? "feminine"
      : undefined;

  useEffect(() => {
    captureReferral();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  const recents = products.filter((p) => recently.includes(p.id)).slice(0, 6);

  return (
    <div data-tone={tone}>
      <a className="skip" href="#main">
        Skip
      </a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/brand/:slug" element={<BrandPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/:slug" element={<SolutionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/legal/:page" element={<LegalPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/quiz" element={<QuizRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {recents.length > 0 && location.pathname !== "/" && (
          <section className="section wrap">
            <div className="kicker">{tx("recently", lang)}</div>
            <div className="rail">
              {recents.map((p) => (
                <Link key={p.id} to={`/product/${p.slug}`} className="card" style={{ width: 160 }}>
                  <img src={p.images[0]} alt="" style={{ aspectRatio: "1", objectFit: "cover" }} />
                  <div className="card-body">
                    <div className="card-brand">{p.brand}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <CartDrawer />
      <AccountModal />
      <SkinQuiz />
      <ChatAssistant />
      <CompareDock />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default function App() {
  return <Shell />;
}
