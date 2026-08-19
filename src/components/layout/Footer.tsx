import { Link } from "react-router-dom";
import { useStore } from "../../store/Store";
import { tx } from "../../data/i18n";
import { Logo } from "../Logo";
import { WHATSAPP_DISPLAY, SUPPORT_EMAIL } from "../../data/config";

export function Footer() {
  const { lang } = useStore();
  return (
    <footer className="site-footer">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <Logo />
          <p style={{ marginTop: 14, maxWidth: "36ch", color: "#d9cbb3" }}>{tx("footerTag", lang)}</p>
          <p className="pwa-hint">{tx("pwa", lang)}</p>
        </div>
        <div>
          <h3>{lang === "bn" ? "দোকান" : "House"}</h3>
          <Link to="/shop?origin=k-beauty">K-Beauty</Link>
          <Link to="/shop?origin=j-beauty">J-Beauty</Link>
          <Link to="/shop?category=men">{lang === "bn" ? "পুরুষ" : "Men"}</Link>
          <Link to="/shop?category=makeup">{lang === "bn" ? "মেকআপ" : "Makeup"}</Link>
          <Link to="/blog">{tx("reviews", lang) && (lang === "bn" ? "ব্লগ" : "Journal")}</Link>
        </div>
        <div>
          <h3>{lang === "bn" ? "সহায়তা" : "Care"}</h3>
          <Link to="/contact">{tx("contactCta", lang)}</Link>
          <Link to="/track">{tx("trackOrder", lang)}</Link>
          <Link to="/legal/returns">{tx("returns", lang)}</Link>
          <Link to="/legal/terms">{tx("terms", lang)}</Link>
          <Link to="/legal/privacy">{tx("privacy", lang)}</Link>
        </div>
        <div>
          <h3>{tx("newsletter", lang)}</h3>
          <form
            className="news"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget.elements.namedItem("m") as HTMLInputElement).value = "";
            }}
          >
            <input name="m" type="tel" placeholder="01XXXXXXXXX" />
            <button className="btn btn-gold" type="submit">
              {tx("subscribe", lang)}
            </button>
          </form>
          <p style={{ marginTop: 14, fontSize: 13, color: "#d9cbb3" }}>
            WhatsApp {WHATSAPP_DISPLAY}
            <br />
            {SUPPORT_EMAIL}
          </p>
        </div>
      </div>
      <div className="wrap legal">
        <span>© {new Date().getFullYear()} KÁNTI Bangladesh</span>
        <span>bKash · Nagad · Rocket · COD</span>
      </div>
    </footer>
  );
}
