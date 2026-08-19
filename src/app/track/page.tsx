"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";

export default function TrackPage() {
  const { lang } = useLang();
  const [found, setFound] = useState(false);
  return (
    <div className="container-page max-w-lg py-16">
      <h1 className="section-title">{lang === "bn" ? "অর্ডার ট্র্যাক" : "Track your order"}</h1>
      <p className="section-subtitle">{lang === "bn" ? "স্ট্যাটাস এসএমএস ও হোয়াটসঅ্যাপেও যায়।" : "Status also arrives by SMS & WhatsApp."}</p>
      <form
        className="mt-6 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setFound(true);
        }}
      >
        <input className="input-field" placeholder={lang === "bn" ? "অর্ডার নম্বর" : "Order number"} />
        <input className="input-field" placeholder={lang === "bn" ? "ফোন" : "Phone"} />
        <button type="submit" className="btn-primary w-full">
          {lang === "bn" ? "ট্র্যাক" : "Track"}
        </button>
      </form>
      <ol className="mt-10 space-y-3 text-sm text-off-black/70">
        {(lang === "bn"
          ? ["কনফার্মড", "প্যাকড", "শিপড", "ডেলিভারির পথে", "ডেলিভার্ড"]
          : ["Confirmed", "Packed", "Shipped", "Out for delivery", "Delivered"]
        ).map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${found && i < 2 ? "bg-gold" : "bg-off-black/15"}`} />
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
