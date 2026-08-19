"use client";

import { useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { useLang } from "@/context/LangContext";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

function build(skin: string, concern: string, budget: string): Product[] {
  const pool = products.filter((p) => p.stock > 0);
  const pick = (ids: string[]) => ids.map((id) => pool.find((p) => p.id === id)).filter(Boolean) as Product[];
  let ids = ["p001", "p004", "p002", "p003"];
  if (concern === "acne") ids = ["p001", "p004", "p012", "p003"];
  if (concern === "pigmentation") ids = ["p007", "p005", "p011", "p003"];
  if (concern === "hair-fall") ids = ["p018", "p008", "p002", "p003"];
  if (skin === "dry") ids = ["p007", "p002", "p019", "p003"];
  if (skin === "sensitive") ids = ["p006", "p019", "p021", "p003"];
  if (budget === "low") ids = ids.map((id) => (id === "p012" ? "p010" : id));
  return pick(ids).slice(0, 4);
}

export function SkinQuiz() {
  const { open, setOpen } = useQuiz();
  const { lang, t } = useLang();
  const { addItem } = useCart();
  const [step, setStep] = useState(0);
  const [skin, setSkin] = useState("oily");
  const [concern, setConcern] = useState("acne");
  const [budget, setBudget] = useState("mid");
  const [when, setWhen] = useState("both");
  const [done, setDone] = useState(false);
  const routine = done ? build(skin, concern, budget) : [];

  if (!open) return null;

  const Opt = ({ id, label, cur, set }: { id: string; label: string; cur: string; set: (v: string) => void }) => (
    <button type="button" className={`text-left px-4 py-3 border ${cur === id ? "border-gold bg-white" : "border-gold/20 bg-cream"}`} onClick={() => set(id)}>
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[85] grid place-items-center p-4">
      <button type="button" className="absolute inset-0 bg-off-black/30" onClick={() => setOpen(false)} aria-label={t("close")} />
      <div className="relative w-[min(560px,100%)] bg-white border border-gold/20 shadow-panel p-6 max-h-[90dvh] overflow-auto">
        <div className="flex justify-between">
          <div className="kicker">{step + 1} / 4</div>
          <button type="button" onClick={() => setOpen(false)}>✕</button>
        </div>
        {!done ? (
          <>
            <h2 className="font-display text-3xl my-4">
              {step === 0 && (lang === "bn" ? "বেশিরভাগ দিন আপনার ত্বক কেমন?" : "What is your skin like, most days?")}
              {step === 1 && (lang === "bn" ? "আগে কোন সমস্যা সারাব?" : "What should we solve first?")}
              {step === 2 && (lang === "bn" ? "মাসে আরাম করে কত খরচ?" : "A comfortable monthly spend?")}
              {step === 3 && (lang === "bn" ? "সত্যি কখন সময় হয়?" : "When do you actually have time?")}
            </h2>
            <div className="grid gap-2">
              {step === 0 && (
                <>
                  <Opt id="oily" label={lang === "bn" ? "তেলতেলে / কম্বিনেশন" : "Oily / combination"} cur={skin} set={setSkin} />
                  <Opt id="dry" label={lang === "bn" ? "শুষ্ক / টানটান" : "Dry / tight"} cur={skin} set={setSkin} />
                  <Opt id="sensitive" label={lang === "bn" ? "সেনসিটিভ" : "Sensitive"} cur={skin} set={setSkin} />
                  <Opt id="balanced" label={lang === "bn" ? "ব্যালান্সড" : "Mostly balanced"} cur={skin} set={setSkin} />
                </>
              )}
              {step === 1 && (
                <>
                  <Opt id="acne" label={lang === "bn" ? "একনে / পোর" : "Acne / pores"} cur={concern} set={setConcern} />
                  <Opt id="pigmentation" label={lang === "bn" ? "দাগ / উজ্জ্বলতা" : "Marks / glow"} cur={concern} set={setConcern} />
                  <Opt id="dryness" label={lang === "bn" ? "শুষ্কতা" : "Dryness"} cur={concern} set={setConcern} />
                  <Opt id="hair-fall" label={lang === "bn" ? "হেয়ারফল" : "Hair fall"} cur={concern} set={setConcern} />
                </>
              )}
              {step === 2 && (
                <>
                  <Opt id="low" label="Under ৳2,000" cur={budget} set={setBudget} />
                  <Opt id="mid" label="৳2,000 – ৳5,000" cur={budget} set={setBudget} />
                  <Opt id="high" label="৳5,000+" cur={budget} set={setBudget} />
                </>
              )}
              {step === 3 && (
                <>
                  <Opt id="am" label={lang === "bn" ? "শুধু সকাল" : "Mornings only"} cur={when} set={setWhen} />
                  <Opt id="pm" label={lang === "bn" ? "শুধু রাত" : "Nights only"} cur={when} set={setWhen} />
                  <Opt id="both" label={lang === "bn" ? "দুটোই" : "I can do both"} cur={when} set={setWhen} />
                </>
              )}
            </div>
            <div className="flex justify-between mt-5">
              <button type="button" className="btn-secondary" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>
                {lang === "bn" ? "ফিরে" : "Back"}
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  if (step === 3) setDone(true);
                  else setStep(step + 1);
                }}
              >
                {lang === "bn" ? "পরেরটা" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-display text-3xl my-3">{lang === "bn" ? "আপনার গ্লো রুটিন" : "Your GLOW routine"}</h2>
            <p className="text-off-black/60 mb-3">{when === "am" ? "AM" : when === "pm" ? "PM" : "AM · PM"}</p>
            <div className="drag-scroll flex gap-3">
              {routine.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <button
              type="button"
              className="btn-ink w-full mt-4"
              onClick={() => {
                routine.forEach((p) => addItem(p));
                setOpen(false);
              }}
            >
              {t("addRoutine")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
