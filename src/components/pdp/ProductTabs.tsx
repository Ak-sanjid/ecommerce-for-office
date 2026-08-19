"use client";

import { useEffect, useState } from "react";
import type { Product, Review } from "@/types";
import { Icon } from "@/components/shared/Icon";
import { useLang } from "@/context/LangContext";
import { loc } from "@/lib/utils";

export function ProductTabs({ product, reviews }: { product: Product; reviews: Review[] }) {
  const { lang, t } = useLang();
  const [tab, setTab] = useState<"desc" | "qa" | "reviews">("desc");
  const [live, setLive] = useState<Review[]>(reviews);

  useEffect(() => {
    fetch(`/api/reviews?product=${product.id}`)
      .then((r) => r.json())
      .then((j: { reviews?: Review[] }) => {
        if (j.reviews?.length) setLive(j.reviews);
      })
      .catch(() => undefined);
  }, [product.id]);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card">
      <div className="flex gap-4 border-b border-off-black/5">
        {(
          [
            ["desc", lang === "bn" ? "বর্ণনা" : "Description"],
            ["qa", "Q&A"],
            ["reviews", t("reviews")],
          ] as const
        ).map(([k, l]) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={`pb-3 text-sm font-medium ${tab === k ? "border-b-2 border-gold text-gold" : "text-off-black/45"}`}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === "desc" && (
        <div className="mt-5 max-w-none text-sm text-off-black/70">
          <p>{product.description}</p>
          <p className="mt-3 font-bangla text-off-black/65">{product.descriptionBangla}</p>
          <h3 className="mt-6 font-display text-lg text-off-black">{t("howTo")}</h3>
          <p className="mt-2">{loc(product.howToUse, product.howToUseBn, lang)}</p>
        </div>
      )}

      {tab === "qa" && (
        <div className="mt-5 space-y-4 text-sm">
          <div>
            <p className="font-medium">{lang === "bn" ? "এটা কি অয়লি স্কিনে চলবে?" : "Is this suitable for oily skin?"}</p>
            <p className="mt-1 text-off-black/55">
              {lang === "bn"
                ? "বেশিরভাগ অয়লি/কম্বিনেশন টাইপে হালকা এবং নন-কমেডোজেনিক।"
                : "Yes — lightweight and non-comedogenic for most oily/combination types."}
            </p>
          </div>
          <div>
            <p className="font-medium">{lang === "bn" ? "ক্যাশ অন ডেলিভারি?" : "COD available?"}</p>
            <p className="mt-1 text-off-black/55">
              {lang === "bn" ? "হ্যাঁ, ফোন ওটিপি যাচাইসহ।" : "Yes, with phone OTP verification."}
            </p>
          </div>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input className="input-field" placeholder={lang === "bn" ? "প্রশ্ন লিখুন…" : "Ask a question…"} />
            <button type="submit" className="btn-secondary">
              {lang === "bn" ? "পাঠান" : "Post"}
            </button>
          </form>
        </div>
      )}

      {tab === "reviews" && (
        <div className="mt-5 space-y-4">
          {live.length === 0 && (
            <p className="text-sm text-review-grey">{lang === "bn" ? "এই এসকিউতে এখনো রিভিউ নেই।" : "No reviews yet for this SKU."}</p>
          )}
          {live.map((r) => (
            <article key={r.id} className="border-b border-review-grey/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{r.author}</span>
                <span className="text-[10px] text-review-grey">
                  {r.source === "facebook" ? "via Facebook Page" : lang === "bn" ? "ছবি রিভিউ" : "Photo review"}
                </span>
              </div>
              <div className="mt-1 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={11} filled className={i < r.rating ? "text-gold" : "text-review-grey/25"} />
                ))}
              </div>
              <p className="mt-2 text-[13px] text-review-grey">{loc(r.text, r.textBn ?? r.text, lang)}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
