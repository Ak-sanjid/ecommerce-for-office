import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/Store";
import { tx } from "../data/i18n";
import { loc } from "../utils/format";
import { products } from "../data/products";
import { brands } from "../data/brands";
import { concerns } from "../data/nav";
import { reviews, reels } from "../data/reviews";
import { FLASH_ENDS_AT } from "../data/config";
import { useDragScroll } from "../hooks/useDragScroll";
import { ProductCard } from "../components/product/ProductCard";
import {
  IconPlay,
  IconReturn,
  IconShield,
  IconStar,
  IconTruck,
} from "../components/icons";

const heroes = [
  {
    id: "glow",
    image: "/images/hero-glow.jpg",
    kicker: { en: "K-Beauty, batch-checked", bn: "কে-বিউটি, ব্যাচ-চেকড" },
    title: { en: "Radiance, authenticated.", bn: "উজ্জ্বলতা, প্রমাণিত।" },
    text: {
      en: "The serums Dhaka already finishes — now with batch numbers you can read and a desk that answers in Banglish.",
      bn: "ঢাকা যে সিরাম আগে শেষ করে — এখন পড়া যায় এমন ব্যাচ নম্বর, আর বাংলিশে উত্তর দেয় এমন ডেস্ক।",
    },
    href: "/shop?origin=k-beauty",
    cta: { en: "Shop K-Beauty", bn: "কে-বিউটি দেখুন" },
  },
  {
    id: "still",
    image: "/images/hero-still.jpg",
    kicker: { en: "Today's quiet markdowns", bn: "আজকের শান্ত ছাড়" },
    title: { en: "Nothing theatrical. Just less.", bn: "নাটক নয়। শুধু কম।" },
    text: {
      en: "Flash prices on bottles we already stock. When the timer ends, they go back.",
      bn: "যে বোতল ইতিমধ্যে আছে, সেগুলোর ফ্ল্যাশ দাম। টাইমার শেষ হলে দাম ফিরে যায়।",
    },
    href: "/shop?filter=offer",
    cta: { en: "Open today's offer", bn: "আজকের অফার" },
  },
  {
    id: "men",
    image: "/images/hero-men.jpg",
    kicker: { en: "KÁNTI Homme", bn: "কান্তি হোম" },
    title: { en: "Grooming, not leftover pink.", bn: "গ্রুমিং, বাদপড়া গোলাপি নয়।" },
    text: {
      en: "A masculine corner with its own light — cedar, ceramides, and no glitter gift sets.",
      bn: "নিজস্ব আলোর পুরুষ কোণ — সিডার, সেরামাইড, গ্লিটার গিফট সেট নয়।",
    },
    href: "/shop?category=men",
    cta: { en: "Shop men", bn: "মেনস দেখুন" },
  },
  {
    id: "mom",
    image: "/images/hero-mom.jpg",
    kicker: { en: "Baby & Mom", bn: "বেবি ও মা" },
    title: { en: "First baths, fewer guesses.", bn: "প্রথম গোসল, কম অনুমান।" },
    text: {
      en: "Mustela, Cetaphil and the lotions that already live in hospital bags across the country.",
      bn: "মুস্টেলা, সেটাফিল — দেশজুড়ে হাসপাতাল ব্যাগে যে লোশন থাকে।",
    },
    href: "/shop?category=baby",
    cta: { en: "Shop baby & mom", bn: "বেবি ও মা" },
  },
];

function Rail({ children }: { children: React.ReactNode }) {
  const ref = useDragScroll<HTMLDivElement>();
  return (
    <div className="rail" ref={ref}>
      {children}
    </div>
  );
}

function useCountdown(iso: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(iso).getTime() - now);
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

export function Home() {
  const { lang, rows, recently, setQuizOpen, addToCart } = useStore();
  const [hero, setHero] = useState(0);
  const t = useCountdown(FLASH_ENDS_AT);

  useEffect(() => {
    const id = window.setInterval(() => setHero((h) => (h + 1) % heroes.length), 7000);
    return () => window.clearInterval(id);
  }, []);

  const visible = useMemo(
    () => [...rows].filter((r) => r.visible).sort((a, b) => a.order - b.order),
    [rows],
  );

  const top = products.filter((p) => p.isTopSeller);
  const offers = products.filter((p) => p.isOffer || p.isFlash);
  const flash = products.filter((p) => p.isFlash);
  const rec =
    recently.length > 0
      ? products.filter((p) => recently.includes(p.id) || p.concerns.some((c) => products.find((x) => x.id === recently[0])?.concerns.includes(c)))
      : products.filter((p) => p.origin === "k-beauty").slice(0, 8);

  const section = (id: string) => {
    switch (id) {
      case "hero":
        return (
          <section className="hero" key="hero">
            {heroes.map((h, i) => (
              <div key={h.id} className={`hero-slide ${i === hero ? "on" : ""}`}>
                <img src={h.image} alt="" width={1408} height={768} fetchPriority={i === 0 ? "high" : "low"} />
              </div>
            ))}
            <div className="wrap hero-copy">
              <div className="kicker">{loc(heroes[hero].kicker, lang)}</div>
              <h1>{loc(heroes[hero].title, lang)}</h1>
              <p>{loc(heroes[hero].text, lang)}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link className="btn btn-gold" to={heroes[hero].href}>
                  {loc(heroes[hero].cta, lang)}
                </Link>
                <button className="btn btn-ghost" onClick={() => setQuizOpen(true)}>
                  {tx("startQuiz", lang)}
                </button>
              </div>
            </div>
            <div className="hero-nav">
              {heroes.map((h, i) => (
                <button key={h.id} className={i === hero ? "on" : ""} onClick={() => setHero(i)} aria-label={h.id} />
              ))}
            </div>
          </section>
        );
      case "trust":
        return (
          <div className="wrap trust-bar" key="trust">
            <div className="trust-item">
              <IconShield />
              <div>
                <strong>{tx("authentic", lang)}</strong>
                <span>{tx("official", lang)}</span>
              </div>
            </div>
            <div className="trust-item">
              <IconTruck />
              <div>
                <strong>{tx("cod", lang)}</strong>
                <span>{tx("districts", lang)}</span>
              </div>
            </div>
            <div className="trust-item">
              <IconReturn />
              <div>
                <strong>{tx("easyReturn", lang)}</strong>
                <span>bKash · Nagad · Rocket</span>
              </div>
            </div>
            <div className="trust-item">
              <IconStar filled />
              <div>
                <strong>{tx("glowPoints", lang)}</strong>
                <span>{lang === "bn" ? "কেনাকাটায় পয়েন্ট" : "Points on every order"}</span>
              </div>
            </div>
          </div>
        );
      case "flash":
        return (
          <section className="section wrap" key="flash">
            <div className="flash-head">
              <div>
                <div className="kicker">{tx("flash", lang)}</div>
                <h2>{tx("flashSub", lang)}</h2>
              </div>
              <div className="timer" aria-live="polite">
                {[
                  [t.days, "days"],
                  [t.hours, "hours"],
                  [t.mins, "mins"],
                  [t.secs, "secs"],
                ].map(([n, k]) => (
                  <b key={k as string}>
                    {String(n).padStart(2, "0")}
                    <small>{tx(k as "days", lang)}</small>
                  </b>
                ))}
              </div>
            </div>
            <p className="hint" style={{ margin: "12px 0" }}>
              {tx("swipe", lang)}
            </p>
            <Rail>
              {flash.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </Rail>
          </section>
        );
      case "topselling":
        return (
          <section className="section wrap" key="topselling">
            <div className="section-head">
              <div>
                <div className="kicker">{tx("topSelling", lang)}</div>
                <h2>{tx("topSellingSub", lang)}</h2>
              </div>
              <Link to="/shop?filter=top">{tx("viewAll", lang)}</Link>
            </div>
            <Rail>
              {top.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </Rail>
          </section>
        );
      case "concerns":
        return (
          <section className="section wrap" key="concerns">
            <div className="section-head">
              <div>
                <div className="kicker">{tx("shopConcern", lang)}</div>
                <h2>{tx("shopConcernSub", lang)}</h2>
              </div>
            </div>
            <Rail>
              {concerns.map((c) => (
                <Link key={c.id} to={`/shop?concern=${c.id}`} className="concern">
                  <div className="concern-orb">
                    <img src={c.image} alt="" loading="lazy" />
                  </div>
                  <h3>{loc(c.label, lang)}</h3>
                </Link>
              ))}
            </Rail>
          </section>
        );
      case "brands":
        return (
          <section className="section wrap" key="brands">
            <div className="section-head">
              <div>
                <div className="kicker">{tx("brandsTrust", lang)}</div>
                <h2>{tx("brandsTrustSub", lang)}</h2>
              </div>
              <Link to="/shop?view=brands">{tx("allBrands", lang)}</Link>
            </div>
            <Rail>
              {brands.map((b) => (
                <Link key={b.slug} to={`/brand/${b.slug}`} className="brand-tile">
                  <em>{b.name}</em>
                  <small>{b.origin.replace("-", " ")}</small>
                </Link>
              ))}
            </Rail>
          </section>
        );
      case "offers":
        return (
          <section className="section wrap" key="offers">
            <div className="section-head">
              <div>
                <div className="kicker">{tx("todaysOffer", lang)}</div>
                <h2>{tx("todaysOfferSub", lang)}</h2>
              </div>
              <Link to="/shop?filter=offer">{tx("viewAll", lang)}</Link>
            </div>
            <Rail>
              {offers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </Rail>
          </section>
        );
      case "reels":
        return (
          <section className="section wrap" key="reels">
            <div className="section-head">
              <div>
                <div className="kicker">{tx("reels", lang)}</div>
                <h2>{tx("reelsSub", lang)}</h2>
              </div>
            </div>
            <Rail>
              {reels.map((r) => {
                const p = products.find((x) => x.id === r.productId);
                return (
                  <article key={r.id} className="reel">
                    <img src={r.image} alt="" loading="lazy" />
                    <span className="play">
                      <IconPlay />
                    </span>
                    <div className="reel-meta">
                      <h3>{loc(r.title, lang)}</h3>
                      {p && (
                        <button className="btn btn-gold" onClick={() => addToCart(p.id)}>
                          {tx("addToCart", lang)}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </Rail>
          </section>
        );
      case "recommend":
        return (
          <section className="section wrap" key="recommend">
            <div className="section-head">
              <div>
                <div className="kicker">{tx("forYou", lang)}</div>
                <h2>{tx("forYouSub", lang)}</h2>
              </div>
            </div>
            <Rail>
              {rec.slice(0, 8).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </Rail>
          </section>
        );
      case "quiz":
        return (
          <section className="quiz-band" key="quiz">
            <div className="wrap inner">
              <div className="kicker">{tx("quizTitle", lang)}</div>
              <h2>{tx("quizSub", lang)}</h2>
              <button className="btn btn-gold" onClick={() => setQuizOpen(true)}>
                {tx("startQuiz", lang)}
              </button>
            </div>
          </section>
        );
      case "reviews":
        return (
          <section className="section wrap" key="reviews">
            <div className="section-head">
              <div>
                <div className="kicker">{tx("reviews", lang)}</div>
                <h2>{tx("reviewsSub", lang)}</h2>
              </div>
            </div>
            <Rail>
              {reviews.map((r) => (
                <article key={r.id} className="review-card">
                  <p>“{loc(r.text, lang)}”</p>
                  <footer>
                    <div>
                      <strong style={{ color: "#2b2b2b" }}>{r.name}</strong>
                      <div>{loc(r.city, lang)}</div>
                    </div>
                    <div className="review-src">{r.source === "facebook" ? "Facebook" : lang === "bn" ? "ছবি রিভিউ" : "Photo review"}</div>
                  </footer>
                </article>
              ))}
            </Rail>
          </section>
        );
      default:
        return null;
    }
  };

  return <>{visible.map((r) => section(r.id))}</>;
}
