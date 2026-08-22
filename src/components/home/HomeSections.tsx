"use client";

import Link from "next/link";
import { flashSaleProducts, products, todaysOffer, topSelling } from "@/data/products";
import { brands } from "@/data/brands";
import { concerns } from "@/data/categories";
import { reels, reviews } from "@/data/reviews";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { useQuiz } from "@/context/QuizContext";
import { FLASH_ENDS, loc } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { DragRail } from "./DragRail";
import { useCountdown } from "@/hooks/useCountdown";
import { pad } from "@/lib/format";

function SectionHead({ kicker, title, href, link }: { kicker: string; title: string; href?: string; link?: string }) {
  return (
    <div className="flex justify-between items-end gap-4 mb-5">
      <div>
        <div className="kicker">{kicker}</div>
        <h2 className="section-title mt-1">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-sm text-gold-dark shrink-0">
          {link}
        </Link>
      )}
    </div>
  );
}

export function FlashSale() {
  const { t } = useLang();
  const clock = useCountdown(FLASH_ENDS);
  const parts = [
    [clock?.d ?? 0, t("days")],
    [clock?.h ?? 0, t("hours")],
    [clock?.m ?? 0, t("mins")],
    [clock?.s ?? 0, t("secs")],
  ] as const;

  return (
    <section className="container-page py-12">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-4">
        <div>
          <div className="kicker">{t("flash")}</div>
          <h2 className="section-title">{t("flashSub")}</h2>
        </div>
        <div className="flex gap-2" suppressHydrationWarning>
          {parts.map(([n, label]) => (
            <b
              key={label}
              className="min-w-[58px] grid place-items-center bg-off-black text-gold-light font-display text-2xl px-2 py-2 leading-none"
              suppressHydrationWarning
            >
              {clock ? pad(n) : "––"}
              <small className="font-body text-[9px] tracking-widest uppercase font-normal mt-1">{label}</small>
            </b>
          ))}
        </div>
      </div>
      <p className="text-[11px] tracking-widest uppercase text-gold-dark mb-3">{t("swipe")}</p>
      <DragRail>
        {flashSaleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </DragRail>
    </section>
  );
}

export function SkinQuizCTA() {
  const { t } = useLang();
  const { setOpen } = useQuiz();
  return (
    <section className="my-6 border-y border-gold/20 min-h-[300px] flex items-center bg-[linear-gradient(110deg,rgba(251,248,243,.78),transparent_55%),url('/images/hero-still.jpg')] bg-cover bg-center">
      <div className="container-page py-12 max-w-xl">
        <div className="kicker">{t("quizTitle")}</div>
        <h2 className="section-title mt-2 mb-4">{t("quizSub")}</h2>
        <button type="button" className="btn-primary" onClick={() => setOpen(true)}>
          {t("startQuiz")}
        </button>
      </div>
    </section>
  );
}

export function TopSelling() {
  const { t } = useLang();
  return (
    <section className="container-page py-12">
      <SectionHead kicker={t("topSelling")} title={t("topSellingSub")} href="/category/top-selling" link={t("viewAll")} />
      <DragRail>
        {topSelling.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </DragRail>
    </section>
  );
}

export function ShopByConcern() {
  const { lang, t } = useLang();
  return (
    <section className="container-page py-12">
      <SectionHead kicker={t("shopConcern")} title={t("shopConcernSub")} />
      <DragRail>
        {concerns.map((c) => (
          <Link key={c.id} href={`/concern/${c.id}`} className="w-40 text-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border border-gold/25">
              <img src={c.image} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <h3 className="font-display text-xl mt-2">{lang === "bn" ? c.nameBn : c.name}</h3>
          </Link>
        ))}
      </DragRail>
    </section>
  );
}

export function BrandWeTrust() {
  const { t } = useLang();
  return (
    <section className="container-page py-12">
      <SectionHead kicker={t("brandsTrust")} title={t("brandsTrustSub")} href="/brands" link={t("allBrands")} />
      <DragRail>
        {brands.map((b) => (
          <Link key={b.id} href={`/brand/${b.id}`} className="w-[200px] min-h-[150px] p-5 border border-gold/25 bg-white flex flex-col justify-end hover:border-gold">
            <em className="font-display not-italic text-[28px]">{b.name}</em>
            <small className="text-[11px] tracking-widest uppercase text-gold-dark mt-2">{b.country}</small>
          </Link>
        ))}
      </DragRail>
    </section>
  );
}

export function TodaysOffer() {
  const { t } = useLang();
  return (
    <section className="container-page py-12">
      <SectionHead kicker={t("todaysOffer")} title={t("todaysOfferSub")} href="/category/todays-offer" link={t("viewAll")} />
      <DragRail>
        {todaysOffer.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </DragRail>
    </section>
  );
}

export function ShoppableReels() {
  const { lang, t } = useLang();
  const { addItem } = useCart();
  return (
    <section className="container-page py-12">
      <SectionHead kicker={t("reels")} title={t("reelsSub")} />
      <DragRail>
        {reels.map((r) => {
          const p = products.find((x) => x.id === r.productId);
          return (
            <article key={r.id} className="relative w-[220px] h-[360px] rounded-2xl overflow-hidden">
              <img src={r.image} alt="" className="w-full h-full object-cover" loading="lazy" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-off-black/30 grid place-items-center text-on-accent">
                ▶
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-off-black/70 to-transparent text-on-accent">
                <h3 className="font-display text-xl mb-2">{loc(r.title, r.titleBn, lang)}</h3>
                {p && (
                  <button type="button" className="btn-primary" onClick={() => addItem(p)}>
                    {t("addToCart")}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </DragRail>
    </section>
  );
}

export function RecommendedForYou() {
  const { t, lang } = useLang();
  const { recently } = useCart();
  const rec =
    recently.length > 0
      ? products.filter((p) => recently.includes(p.id) || p.concern?.some((c) => products.find((x) => x.id === recently[0])?.concern?.includes(c)))
      : products.filter((p) => p.origin === "k-beauty").slice(0, 8);
  return (
    <section className="container-page py-12">
      <SectionHead kicker={t("forYou")} title={t("forYouSub")} />
      <DragRail>
        {rec.slice(0, 8).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </DragRail>
      {recently.length > 0 && <p className="sr-only">{lang === "bn" ? "সম্প্রতি দেখা" : "Recently viewed used"}</p>}
    </section>
  );
}

export function CustomerReviews() {
  const { lang, t } = useLang();
  return (
    <section className="container-page py-12">
      <SectionHead kicker={t("reviews")} title={t("reviewsSub")} />
      <DragRail>
        {reviews.map((r) => (
          <article key={r.id} className="w-[min(360px,82vw)] min-h-[220px] bg-[#f3f3f3] text-review-grey p-5 flex flex-col">
            <p className="font-display text-[22px] leading-snug text-[#4a4a4a] flex-1">“{loc(r.text, r.textBn, lang)}”</p>
            <footer className="flex justify-between mt-4 text-sm">
              <div>
                <strong className="text-off-black">{r.author}</strong>
                <div>{lang === "bn" ? r.cityBn : r.city}</div>
              </div>
              <span className="text-[10px] tracking-widest uppercase">
                {r.source === "facebook" ? "Facebook" : lang === "bn" ? "ছবি রিভিউ" : "Photo review"}
              </span>
            </footer>
          </article>
        ))}
      </DragRail>
    </section>
  );
}

export function RecentlyViewed() {
  const { recently } = useCart();
  const { t } = useLang();
  const list = products.filter((p) => recently.includes(p.id));
  if (!list.length) return null;
  return (
    <section className="container-page py-10">
      <SectionHead kicker={t("recently")} title={t("recently")} />
      <DragRail>
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </DragRail>
    </section>
  );
}

export function NewsletterSignup() {
  const { t, lang } = useLang();
  return (
    <section className="container-page py-12 text-center">
      <div className="kicker">{t("newsletter")}</div>
      <h2 className="section-title mt-2 mb-4">{lang === "bn" ? "নম্বর দিন, আমরা শান্ত থাকব" : "Leave a number. We will stay quiet."}</h2>
      <form
        className="flex gap-2 max-w-md mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          (e.currentTarget.elements.namedItem("m") as HTMLInputElement).value = "";
        }}
      >
        <input name="m" className="input-field" placeholder="01XXXXXXXXX" />
        <button type="submit" className="btn-primary shrink-0">
          {t("subscribe")}
        </button>
      </form>
    </section>
  );
}

export function TrustBar() {
  const { t } = useLang();
  const items = [
    [t("authentic"), t("official")],
    [t("cod"), t("districts")],
    [t("easyReturn"), "bKash · Nagad · Rocket"],
    [t("glowPoints"), t("pwa")],
  ];
  return (
    <div className="container-page grid grid-cols-2 lg:grid-cols-4 border-b border-gold/20">
      {items.map(([a, b]) => (
        <div key={a} className="flex flex-col justify-center py-4 px-2 border-r border-gold/15 last:border-0">
          <strong className="text-sm font-medium">{a}</strong>
          <span className="text-xs text-off-black/60">{b}</span>
        </div>
      ))}
    </div>
  );
}
