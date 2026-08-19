"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { products, slugify } from "@/data/products";
import { formatBdt, productName } from "@/lib/utils";

type Msg = { role: "bot" | "me"; text: string; href?: string };

function reply(raw: string, lang: "en" | "bn"): Msg {
  const q = raw.toLowerCase();
  if (/niacinamide|নায়াসিন|spot|দাগ|pigment/.test(q)) {
    const p = products.find((x) => x.id === "p010")!;
    return { role: "bot", text: lang === "bn" ? `${p.brand} ${p.nameBangla} — ${formatBdt(p.price)}। রাতে ৩ ফোঁটা।` : `${p.brand} ${p.name} is ${formatBdt(p.price)}. Three drops at night.`, href: `/product/${slugify(p.name)}` };
  }
  if (/sunscreen|spf|সানস্ক্রিন|joseon/.test(q)) {
    const p = products.find((x) => x.id === "p003")!;
    return { role: "bot", text: lang === "bn" ? `Joseon Relief Sun — ${formatBdt(p.price)}। হোয়াইট কাস্ট প্রায় নেই।` : `Joseon Relief Sun is ${formatBdt(p.price)} — barely a cast.`, href: `/product/${slugify(p.name)}` };
  }
  if (/oily|তেল|acne|একনে|pore/.test(q)) {
    const p = products.find((x) => x.id === "p004")!;
    return { role: "bot", text: lang === "bn" ? `অয়লি/একনে হলে Anua Heartleaf (${formatBdt(p.price)}) দিয়ে শুরু।` : `For oily/acne start with Anua Heartleaf (${formatBdt(p.price)}).`, href: `/product/${slugify(p.name)}` };
  }
  if (/hair|চুল|হেয়ার|fino|fall/.test(q)) {
    const p = products.find((x) => x.id === "p008")!;
    return { role: "bot", text: lang === "bn" ? `Fino মাস্ক ${formatBdt(p.price)} — সপ্তাহে একবার।` : `Fino mask ${formatBdt(p.price)} once a week.`, href: `/product/${slugify(p.name)}` };
  }
  const hit = products.find((p) => `${p.name} ${p.brand} ${p.ingredients.join(" ")}`.toLowerCase().includes(q.split(" ").find((w) => w.length > 3) ?? "___"));
  if (hit) {
    return { role: "bot", text: `${hit.brand} ${productName(hit, lang)} — ${formatBdt(hit.price)}`, href: `/product/${slugify(hit.name)}` };
  }
  return { role: "bot", text: lang === "bn" ? "আরেকটু বলুন — “oily skin er jonno sunscreen”।" : "Try “oily skin er jonno sunscreen” or “niacinamide koto taka”." };
}

export function AIChatBubble() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: t("chatIntro") }]);
  const [text, setText] = useState("");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed right-4 bottom-4 z-40 w-14 h-14 rounded-full bg-off-black text-gold-light shadow-panel grid place-items-center"
        aria-label={t("chatTitle")}
      >
        {open ? "✕" : "✦"}
      </button>
      {open && (
        <section className="fixed right-4 bottom-20 z-40 w-[min(360px,calc(100%-24px))] h-[min(480px,70dvh)] bg-white border border-gold/20 shadow-panel flex flex-col">
          <div className="p-4 border-b border-gold/20">
            <div className="kicker">{t("chatTitle")}</div>
            <strong className="text-sm">English · বাংলা · Banglish</strong>
          </div>
          <div className="flex-1 overflow-auto p-3 flex flex-col gap-2">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[88%] px-3 py-2 text-sm ${m.role === "bot" ? "bg-cream self-start" : "bg-off-black text-cream self-end"}`}>
                {m.text}
                {m.href && (
                  <div>
                    <Link href={m.href} onClick={() => setOpen(false)}>
                      →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
          <form
            className="flex border-t border-gold/20"
            onSubmit={(e) => {
              e.preventDefault();
              if (!text.trim()) return;
              setMsgs((prev) => [...prev, { role: "me", text }, reply(text, lang)]);
              setText("");
            }}
          >
            <input className="flex-1 px-3 py-3 outline-none bg-transparent text-sm" value={text} onChange={(e) => setText(e.target.value)} placeholder={t("chatPlaceholder")} />
            <button type="submit" className="px-3">↑</button>
          </form>
        </section>
      )}
    </>
  );
}
