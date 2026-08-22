"use client";

import Link from "next/link";
import { brands } from "@/data/brands";
import { useLang } from "@/context/LangContext";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function BrandMegaMenu() {
  const { lang } = useLang();
  const byLetter = brands.reduce<Record<string, typeof brands>>((a, b) => {
    const L = b.name[0].toUpperCase();
    (a[L] ||= []).push(b);
    return a;
  }, {});

  return (
    <div className="absolute inset-x-0 top-full z-40 border-t border-gold/15 bg-white shadow-panel">
      <div className="container-page grid grid-cols-12 gap-6 py-6">
        <div className="col-span-2 border-r border-off-black/5 pr-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-off-black/40">
            {lang === "bn" ? "ক–৯ দেখুন" : "Browse A–Z"}
          </p>
          <div className="grid grid-cols-5 gap-1">
            {LETTERS.map((L) => {
              const has = !!byLetter[L];
              return (
                <a
                  key={L}
                  href={has ? `#brand-${L}` : undefined}
                  className={`grid h-6 w-6 place-items-center rounded text-[11px] font-medium transition-colors ${
                    has ? "text-off-black/70 hover:bg-gold hover:text-on-accent" : "text-off-black/20"
                  }`}
                >
                  {L}
                </a>
              );
            })}
          </div>
        </div>

        <div className="col-span-7 grid max-h-80 grid-cols-3 gap-x-6 gap-y-4 overflow-auto">
          {Object.keys(byLetter)
            .sort()
            .map((L) => (
              <div key={L} id={`brand-${L}`}>
                <p className="mb-1.5 font-display text-base font-semibold text-gold">{L}</p>
                <ul className="space-y-1">
                  {byLetter[L].map((b) => (
                    <li key={b.id}>
                      <Link
                        href={`/brand/${b.id}`}
                        className="flex items-center gap-1.5 text-[13px] text-off-black/70 hover:text-gold transition-colors"
                      >
                        {b.name}
                        {b.isOfficial && (
                          <span className="rounded bg-gold/10 px-1 py-px text-[9px] font-medium text-gold-dark">
                            Official
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        <div className="col-span-3 rounded-2xl bg-gradient-to-br from-cream-deep to-gold-light/40 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-dark">
            {lang === "bn" ? "ফিচার্ড" : "Featured"}
          </p>
          <h4 className="mt-1 font-display text-xl font-semibold">
            {lang === "bn" ? "অনুমোদিত ডিস্ট্রিবিউটর" : "Authorised Distributors"}
          </h4>
          <p className="mt-1.5 text-xs leading-relaxed text-off-black/60">
            {lang === "bn"
              ? "গ্লোর প্রতিটি ব্র্যান্ড অফিসিয়াল চ্যানেল থেকে। ব্যাচ ও মেয়াদ যাচাই করা।"
              : "Every brand on GLOW is sourced through official channels. Batch & expiry verified."}
          </p>
          <Link href="/brands" className="mt-4 inline-flex text-xs font-medium text-gold-dark underline underline-offset-4">
            {lang === "bn" ? "সব ব্র্যান্ড →" : "View all brands →"}
          </Link>
        </div>
      </div>
    </div>
  );
}
