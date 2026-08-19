import { useState } from "react";
import { useStore } from "../../store/Store";
import { tx } from "../../data/i18n";
import { products } from "../../data/products";
import { ProductCard } from "../product/ProductCard";
import { IconClose } from "../icons";
import type { Product } from "../../types";

const steps = ["skin", "concern", "budget", "when"] as const;

function build(skin: string, concern: string, budget: string): Product[] {
  const pool = products.filter((p) => p.inStock);
  const pick = (ids: string[]) => ids.map((id) => pool.find((p) => p.id === id)).filter(Boolean) as Product[];
  let ids = ["p9", "p3", "p1", "p2"];
  if (concern === "acne") ids = ["p9", "p3", "p12", "p2"];
  if (concern === "pigmentation") ids = ["p6", "p4", "p11", "p2"];
  if (concern === "hair-fall") ids = ["p14", "p7", "p1", "p2"];
  if (skin === "dry") ids = ["p6", "p1", "p21", "p2"];
  if (skin === "sensitive") ids = ["p5", "p21", "p13", "p2"];
  if (budget === "low") ids = ids.map((id) => (id === "p12" ? "p10" : id));
  return pick(ids).slice(0, 4);
}

export function SkinQuiz() {
  const { lang, quizOpen, setQuizOpen, addToCart } = useStore();
  const [step, setStep] = useState(0);
  const [skin, setSkin] = useState("oily");
  const [concern, setConcern] = useState("acne");
  const [budget, setBudget] = useState("mid");
  const [when, setWhen] = useState("both");
  const [done, setDone] = useState(false);
  const routine = done ? build(skin, concern, budget) : [];

  if (!quizOpen) return null;

  const skinOpts: { id: string; key: Parameters<typeof tx>[0] }[] = [
    { id: "oily", key: "oily" },
    { id: "dry", key: "dry" },
    { id: "sensitive", key: "sensitive" },
    { id: "balanced", key: "balanced" },
  ];

  const concernOpts = [
    { id: "acne", label: lang === "bn" ? "একনে / পোর" : "Acne / pores" },
    { id: "pigmentation", label: lang === "bn" ? "দাগ / উজ্জ্বলতা" : "Marks / glow" },
    { id: "dryness", label: lang === "bn" ? "শুষ্কতা" : "Dryness" },
    { id: "hair-fall", label: lang === "bn" ? "হেয়ারফল" : "Hair fall" },
  ];

  return (
    <div className="quiz-modal">
      <button className="overlay" onClick={() => setQuizOpen(false)} />
      <div className="quiz-card" role="dialog">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="kicker">
            {step + 1} / {steps.length}
          </div>
          <button className="icon-btn" onClick={() => setQuizOpen(false)}>
            <IconClose />
          </button>
        </div>
        {!done ? (
          <>
            <h2>
              {step === 0 && tx("qSkin", lang)}
              {step === 1 && tx("qConcern", lang)}
              {step === 2 && tx("qBudget", lang)}
              {step === 3 && tx("qWhen", lang)}
            </h2>
            <div className="opts">
              {step === 0 &&
                skinOpts.map((o) => (
                  <button key={o.id} className={skin === o.id ? "on" : ""} onClick={() => setSkin(o.id)}>
                    {tx(o.key, lang)}
                  </button>
                ))}
              {step === 1 &&
                concernOpts.map((o) => (
                  <button key={o.id} className={concern === o.id ? "on" : ""} onClick={() => setConcern(o.id)}>
                    {o.label}
                  </button>
                ))}
              {step === 2 &&
                [
                  ["low", "budg1"],
                  ["mid", "budg2"],
                  ["high", "budg3"],
                ].map(([id, key]) => (
                  <button key={id} className={budget === id ? "on" : ""} onClick={() => setBudget(id)}>
                    {tx(key as "budg1", lang)}
                  </button>
                ))}
              {step === 3 &&
                [
                  ["am", "am"],
                  ["pm", "pm"],
                  ["both", "both"],
                ].map(([id, key]) => (
                  <button key={id} className={when === id ? "on" : ""} onClick={() => setWhen(id)}>
                    {tx(key as "am", lang)}
                  </button>
                ))}
            </div>
            <div className="quiz-nav">
              <button className="btn btn-ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
                {tx("back", lang)}
              </button>
              <button
                className="btn btn-gold"
                onClick={() => {
                  if (step === 3) setDone(true);
                  else setStep(step + 1);
                }}
              >
                {tx("next", lang)}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>{tx("yourRoutine", lang)}</h2>
            <p style={{ color: "var(--ink-soft)", marginBottom: 12 }}>
              {when === "am" ? "AM" : when === "pm" ? "PM" : "AM · PM"}
            </p>
            <div className="rail" style={{ paddingBottom: 8 }}>
              {routine.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <button
              className="btn btn-ink"
              style={{ width: "100%", marginTop: 12 }}
              onClick={() => {
                routine.forEach((p) => addToCart(p.id));
                setQuizOpen(false);
              }}
            >
              {tx("addRoutine", lang)}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
