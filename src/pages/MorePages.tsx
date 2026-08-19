import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { brands } from "../data/brands";
import { products } from "../data/products";
import { useStore } from "../store/Store";
import { loc, formatBdt } from "../utils/format";
import { tx } from "../data/i18n";
import { ProductCard } from "../components/product/ProductCard";

export function BrandPage() {
  const { slug = "" } = useParams();
  const { lang } = useStore();
  const brand = brands.find((b) => b.slug === slug);
  const list = products.filter((p) => p.brandSlug === slug);
  if (!brand) {
    return (
      <div className="page wrap">
        <h1>{tx("noResults", lang)}</h1>
      </div>
    );
  }
  return (
    <div className="page">
      <div className="brand-hero wrap">
        <div>
          <div className="kicker">{brand.origin}</div>
          <h1>{brand.name}</h1>
          <p style={{ maxWidth: "46ch", color: "var(--ink-soft)" }}>{loc(brand.tagline, lang)}</p>
          {brand.official && <p className="pill" style={{ marginTop: 12 }}>{tx("official", lang)}</p>}
        </div>
      </div>
      <div className="wrap" style={{ marginTop: 28 }}>
        <div className="grid">
          {list.length ? list.map((p) => <ProductCard key={p.id} product={p} />) : <p>{tx("noResults", lang)}</p>}
        </div>
      </div>
    </div>
  );
}

export function WishlistPage() {
  const { lang, wishlist } = useStore();
  const list = products.filter((p) => wishlist.includes(p.id));
  return (
    <div className="page wrap">
      <div className="kicker">{tx("wishlist", lang)}</div>
      <h1>{tx("wishlist", lang)}</h1>
      {list.length === 0 ? (
        <p>{tx("emptyCart", lang)}</p>
      ) : (
        <div className="grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export function AccountPage() {
  const { lang, user, setAccountOpen } = useStore();
  return (
    <div className="page wrap">
      <div className="kicker">{tx("account", lang)}</div>
      <h1>{user ? user.name : tx("helloGuest", lang)}</h1>
      {user ? (
        <p>
          {tx("glowPoints", lang)}: {user.points}
        </p>
      ) : (
        <button className="btn btn-gold" onClick={() => setAccountOpen(true)}>
          {tx("enter", lang)}
        </button>
      )}
    </div>
  );
}

export function BlogPage() {
  const { lang } = useStore();
  const posts = [
    {
      title: { en: "Niacinamide in a Dhaka summer", bn: "ঢাকার গরমে নায়াসিনামাইড" },
      img: "/images/products/serum-snail.jpg",
    },
    {
      title: { en: "SPF that does not ghost on gold undertones", bn: "গোল্ডেন আন্ডারটোনে যে এসপিএফ ভূত হয় না" },
      img: "/images/products/sunscreen.jpg",
    },
    {
      title: { en: "A first-bath edit for new parents", bn: "নতুন বাবা-মায়ের প্রথম গোসল এডিট" },
      img: "/images/hero-mom.jpg",
    },
  ];
  return (
    <div className="page wrap">
      <div className="kicker">Journal</div>
      <h1>{lang === "bn" ? "ব্লগ" : "Notes from the desk"}</h1>
      <div className="blog-list">
        {posts.map((p) => (
          <article key={p.title.en} className="blog-card">
            <img src={p.img} alt="" />
            <div>
              <h2>{loc(p.title, lang)}</h2>
              <p style={{ color: "var(--ink-soft)", marginTop: 8 }}>
                {lang === "bn" ? "কান্তি ডেস্কের সংক্ষিপ্ত নোট।" : "A short note from the KÁNTI desk."}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function SolutionsPage() {
  const { slug } = useParams();
  const { lang, setQuizOpen } = useStore();
  return (
    <div className="page wrap">
      <div className="kicker">{tx("shopConcern", lang)}</div>
      <h1>{slug ? slug.replace("-", " ") : lang === "bn" ? "সমাধান" : "Solutions"}</h1>
      <p style={{ maxWidth: "56ch", color: "var(--ink-soft)" }}>
        {lang === "bn"
          ? "ভুল প্রোডাক্ট নয় — ভুল মিল। চার প্রশ্নে একটি রুটিন।"
          : "Not a wrong product — a wrong match. Four questions, one routine."}
      </p>
      <button className="btn btn-gold" style={{ marginTop: 16 }} onClick={() => setQuizOpen(true)}>
        {tx("startQuiz", lang)}
      </button>
    </div>
  );
}

export function ContactPage() {
  const { lang, flash } = useStore();
  return (
    <div className="page wrap">
      <div className="kicker">{tx("contactCta", lang)}</div>
      <h1>{lang === "bn" ? "ডেস্ক" : "The desk"}</h1>
      <p style={{ maxWidth: "48ch" }}>
        WhatsApp +880 1700-000000 · hello@kanti.shop · Banani, Dhaka
      </p>
      <form
        className="legal-page"
        style={{ marginTop: 20 }}
        onSubmit={(e) => {
          e.preventDefault();
          flash(lang === "bn" ? "নোট গেছে" : "Note received");
        }}
      >
        <div className="field">
          <span>{tx("name", lang)}</span>
          <input required />
        </div>
        <div className="field">
          <span>{tx("phone", lang)}</span>
          <input required />
        </div>
        <button className="btn btn-gold">{lang === "bn" ? "পাঠান" : "Send"}</button>
      </form>
    </div>
  );
}

export function TrackPage() {
  const { lang } = useStore();
  const [found, setFound] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFound(true);
  };
  return (
    <div className="page wrap">
      <div className="kicker">{tx("trackOrder", lang)}</div>
      <h1>{tx("trackOrder", lang)}</h1>
      <form onSubmit={onSubmit} className="field" style={{ maxWidth: 360 }}>
        <span>{lang === "bn" ? "অর্ডার আইডি বা ফোন" : "Order id or phone"}</span>
        <input name="q" placeholder="KNT-1842" />
        <button className="btn btn-gold" style={{ marginTop: 10 }}>
          {lang === "bn" ? "খুঁজুন" : "Look up"}
        </button>
      </form>
      {found && (
        <div style={{ marginTop: 24 }}>
          <p>
            <strong>KNT-1842</strong> — {lang === "bn" ? "ঢাকার ভিতর · পথে" : "Inside Dhaka · on the way"}
          </p>
          <p style={{ color: "var(--ink-soft)" }}>
            {lang === "bn"
              ? "স্ট্যাটাস আপডেট এসএমএস ও হোয়াটসঅ্যাপে যাবে।"
              : "Status updates go out on SMS and WhatsApp."}
          </p>
        </div>
      )}
    </div>
  );
}

export function CheckoutPage() {
  const { lang, cart, cartSubtotal, user, clearCart, flash } = useStore();
  const [pay, setPay] = useState("bkash");
  const [otp, setOtp] = useState(false);
  return (
    <div className="page wrap">
      <div className="kicker">{tx("checkout", lang)}</div>
      <h1>{tx("checkout", lang)}</h1>
      <p>{tx("guestNote", lang)}</p>
      <div className="shop-layout" style={{ marginTop: 20 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pay === "cod" && !otp) {
              setOtp(true);
              return;
            }
            clearCart();
            flash(lang === "bn" ? "অর্ডার হয়েছে · KNT-1842" : "Order placed · KNT-1842");
          }}
        >
          <div className="field">
            <span>{tx("name", lang)}</span>
            <input defaultValue={user?.name} required />
          </div>
          <div className="field">
            <span>{tx("phone", lang)}</span>
            <input defaultValue={user?.phone} required />
          </div>
          <div className="field">
            <span>{lang === "bn" ? "ঠিকানা" : "Address"}</span>
            <input required />
          </div>
          <h3 style={{ margin: "16px 0 8px" }}>{lang === "bn" ? "পেমেন্ট" : "Pay"}</h3>
          {["bkash", "nagad", "rocket", "cod"].map((p) => (
            <label key={p} style={{ display: "block", padding: "6px 0" }}>
              <input type="radio" name="pay" checked={pay === p} onChange={() => setPay(p)} /> {p.toUpperCase()}
            </label>
          ))}
          {pay === "cod" && otp && (
            <div className="field">
              <span>COD OTP</span>
              <input placeholder="1234" />
            </div>
          )}
          <button className="btn btn-ink" style={{ marginTop: 16 }}>
            {pay === "cod" && !otp ? tx("sendOtp", lang) : lang === "bn" ? "অর্ডার নিশ্চিত" : "Place order"} ·{" "}
            {formatBdt(cartSubtotal)}
          </button>
        </form>
        <aside>
          {cart.map((l) => {
            const p = products.find((x) => x.id === l.id);
            return p ? (
              <p key={l.id}>
                {loc(p.name, lang)} × {l.qty}
              </p>
            ) : null;
          })}
        </aside>
      </div>
    </div>
  );
}

export function LegalPage() {
  const { page = "terms" } = useParams();
  const { lang } = useStore();
  const copy: Record<string, { title: { en: string; bn: string }; body: { en: string[]; bn: string[] } }> = {
    returns: {
      title: { en: "Returns, refunds & exchange", bn: "রিটার্ন, রিফান্ড ও এক্সচেঞ্জ" },
      body: {
        en: [
          "Unopened products may be exchanged within 7 days of delivery if the seal, batch and box are intact.",
          "Hygiene goods (opened serums, mascara, baby bottles once unsealed) are not returnable unless they arrived damaged or were not as described.",
          "Refunds go back through the original rail — bKash, Nagad, Rocket or cash-on-collection. Please allow 5–10 working days.",
          "Write to the desk on WhatsApp with your order id and a photograph of the batch.",
        ],
        bn: [
          "সিল, ব্যাচ ও বক্স ঠিক থাকলে ডেলিভারির ৭ দিনের মধ্যে না-খোলা প্রোডাক্ট এক্সচেঞ্জ করা যায়।",
          "খোলা সিরাম, মাসকারা, খোলা বেবি বোতল হাইজিন কারণে ফেরত যায় না — ক্ষতিগ্রস্ত বা ভুল আইটেম ছাড়া।",
          "রিফান্ড আসল মাধ্যমেই — বিকাশ, নগদ, রকেট বা ক্যাশ। ৫–১০ কর্মদিবস লাগতে পারে।",
          "অর্ডার আইডি ও ব্যাচের ছবিসহ হোয়াটসঅ্যাপে ডেস্কে লিখুন।",
        ],
      },
    },
    terms: {
      title: { en: "Terms & conditions", bn: "শর্তাবলী" },
      body: {
        en: [
          "Prices are in Bangladeshi Taka and may change without theatre. The price at checkout is the price you pay.",
          "KÁNTI sells authentic goods sourced through official or authorised channels. Batch and expiry are printed for a reason — keep the box.",
          "Guest checkout is allowed. Creating an account is optional and earns Glow Points.",
          "By placing an order you agree that delivery estimates are estimates, especially outside Dhaka during hartals or floods.",
        ],
        bn: [
          "দাম বাংলাদেশি টাকায়। চেকআউটের দামই আপনি দেবেন।",
          "কান্তি অফিসিয়াল বা অনুমোদিত চ্যানেলের অথেন্টিক পণ্য বেচে। ব্যাচ ও মেয়াদ বক্সে থাকে — বক্স রাখুন।",
          "গেস্ট চেকআউট চালু। অ্যাকাউন্ট ঐচ্ছিক, তাতে গ্লো পয়েন্ট মেলে।",
          "অর্ডার দিয়ে আপনি মানছেন ডেলিভারি সময় অনুমান — হরতাল বা বন্যায় ঢাকার বাইরে বিশেষ করে।",
        ],
      },
    },
    privacy: {
      title: { en: "Privacy policy", bn: "গোপনীয়তা নীতি" },
      body: {
        en: [
          "We keep the minimum: name, phone, address, and what you asked the desk. We do not sell lists.",
          "OTP login stores a hashed token on this device. Social login only receives the name and email the provider shares.",
          "Facebook, TikTok and GA4 pixels fire only after you consent via the analytics hooks. You can refuse and still check out.",
          "WhatsApp restock alerts use the number you typed, nothing else.",
        ],
        bn: [
          "আমরা ন্যূনতম রাখি: নাম, ফোন, ঠিকানা, ডেস্কে যা জিজ্ঞেস করেছেন। তালিকা বেচি না।",
          "ওটিপি লগইন এই ডিভাইসে হ্যাশ করা টোকেন রাখে। সোশ্যাল লগইনে শুধু প্রোভাইডার যে নাম-ইমেইল দেয়।",
          "ফেসবুক, টিকটক ও জিএ৪ পিক্সেল আপনার সম্মতির পরই। না বললেও চেকআউট করা যায়।",
          "হোয়াটসঅ্যাপ স্টক অ্যালার্ট শুধু আপনার দেওয়া নম্বরে যায়।",
        ],
      },
    },
  };
  const data = copy[page] ?? copy.terms;
  return (
    <div className="page wrap legal-page">
      <div className="crumbs">
        <Link to="/">KÁNTI</Link>
      </div>
      <h1>{loc(data.title, lang)}</h1>
      {data.body[lang].map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

export function ComparePage() {
  const { lang, compare } = useStore();
  const list = products.filter((p) => compare.includes(p.id));
  return (
    <div className="page wrap">
      <h1>{tx("compare", lang)}</h1>
      <div className="grid">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export function QuizRoute() {
  const { setQuizOpen } = useStore();
  useEffect(() => {
    setQuizOpen(true);
  }, [setQuizOpen]);
  return (
    <div className="page wrap">
      <div className="kicker">AM · PM</div>
      <h1>Routine</h1>
    </div>
  );
}
