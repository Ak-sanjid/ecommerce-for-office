"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { useQuiz } from "@/context/QuizContext";
import { loc } from "@/lib/utils";

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
    href: "/category/k-beauty",
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
    href: "/category/todays-offer",
    cta: { en: "Open today's offer", bn: "আজকের অফার" },
  },
  {
    id: "men",
    image: "/images/hero-men.jpg",
    kicker: { en: "GLOW Homme", bn: "গ্লো হোম" },
    title: { en: "Grooming, not leftover pink.", bn: "গ্রুমিং, বাদপড়া গোলাপি নয়।" },
    text: {
      en: "A masculine corner with its own light — cedar, ceramides, and no glitter gift sets.",
      bn: "নিজস্ব আলোর পুরুষ কোণ — সিডার, সেরামাইড, গ্লিটার গিফট সেট নয়।",
    },
    href: "/category/mens",
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
    href: "/category/baby-mom",
    cta: { en: "Shop baby & mom", bn: "বেবি ও মা" },
  },
];

export function HeroBanner() {
  const { lang, t } = useLang();
  const { setOpen } = useQuiz();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % heroes.length), 7000);
    return () => window.clearInterval(id);
  }, []);

  const h = heroes[i];

  return (
    <section className="relative min-h-[min(78vh,720px)] overflow-hidden bg-cream-deep">
      {heroes.map((slide, idx) => (
        <div key={slide.id} className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}>
          <img src={slide.image} alt="" className="w-full h-full object-cover" fetchPriority={idx === 0 ? "high" : "low"} />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/85 via-cream/40 to-transparent max-lg:bg-gradient-to-t max-lg:from-cream/85 max-lg:via-transparent" />
        </div>
      ))}
      <div className="container-page relative z-10 min-h-[min(78vh,720px)] flex flex-col justify-end pb-16 pt-12 max-w-xl">
        <div className="kicker">{loc(h.kicker.en, h.kicker.bn, lang)}</div>
        <h1 className="font-display text-[42px] sm:text-6xl lg:text-7xl mt-2 mb-4">{loc(h.title.en, h.title.bn, lang)}</h1>
        <p className="text-off-black/70 mb-6 max-w-md">{loc(h.text.en, h.text.bn, lang)}</p>
        <div className="flex flex-wrap gap-2">
          <Link href={h.href} className="btn-primary">
            {loc(h.cta.en, h.cta.bn, lang)}
          </Link>
          <button type="button" className="btn-secondary" onClick={() => setOpen(true)}>
            {t("startQuiz")}
          </button>
        </div>
      </div>
      <div className="absolute right-6 bottom-6 z-10 flex gap-2">
        {heroes.map((s, idx) => (
          <button key={s.id} type="button" aria-label={s.id} onClick={() => setI(idx)} className={`h-2 rounded-full transition-all ${idx === i ? "w-7 bg-gold" : "w-2 bg-off-black/20"}`} />
        ))}
      </div>
    </section>
  );
}
