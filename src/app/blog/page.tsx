"use client";

import { useLang } from "@/context/LangContext";
import { loc } from "@/lib/utils";

const posts = [
  { title: { en: "Niacinamide in a Dhaka summer", bn: "ঢাকার গরমে নায়াসিনামাইড" }, img: "/images/products/serum-snail.jpg" },
  { title: { en: "SPF that does not ghost on gold undertones", bn: "গোল্ডেন আন্ডারটোনে যে এসপিএফ ভূত হয় না" }, img: "/images/products/sunscreen.jpg" },
  { title: { en: "A first-bath edit for new parents", bn: "নতুন বাবা-মায়ের প্রথম গোসল এডিট" }, img: "/images/hero-mom.jpg" },
];

export default function BlogPage() {
  const { lang } = useLang();
  return (
    <div className="container-page py-10">
      <div className="kicker">Journal</div>
      <h1 className="font-display text-5xl mt-2 mb-8">{lang === "bn" ? "ব্লগ" : "Notes from the desk"}</h1>
      <div className="grid gap-6">
        {posts.map((p) => (
          <article key={p.title.en} className="grid sm:grid-cols-[220px_1fr] gap-5 border-b border-gold/20 pb-6">
            <img src={p.img} alt="" className="h-36 w-full object-cover" />
            <div>
              <h2 className="font-display text-3xl">{loc(p.title.en, p.title.bn, lang)}</h2>
              <p className="text-off-black/60 mt-2">{lang === "bn" ? "গ্লো ডেস্কের সংক্ষিপ্ত নোট।" : "A short note from the GLOW desk."}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
