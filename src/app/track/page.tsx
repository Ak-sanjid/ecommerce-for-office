"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { Suspense } from "react";

const STEPS = ["PENDING", "CONFIRMED", "PACKED", "SHIPPED", "DELIVERED"] as const;

function TrackInner() {
  const { lang } = useLang();
  const params = useSearchParams();
  const [orderNo, setOrderNo] = useState(params.get("order") ?? "");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [err, setErr] = useState("");

  const lookup = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErr("");
    const q = phone ? `?phone=${encodeURIComponent(phone)}` : "";
    const res = await fetch(`/api/orders/${encodeURIComponent(orderNo)}${q}`);
    const j = (await res.json()) as { ok: boolean; order?: { status: string; orderNumber: string }; error?: string };
    if (j.ok && j.order) setStatus(j.order.status);
    else {
      setStatus(null);
      setErr(j.error ?? (lang === "bn" ? "অর্ডার পাওয়া যায়নি" : "Order not found"));
    }
  };

  useEffect(() => {
    if (params.get("order")) void lookup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labels =
    lang === "bn"
      ? { PENDING: "পেন্ডিং", CONFIRMED: "কনফার্মড", PACKED: "প্যাকড", SHIPPED: "শিপড", DELIVERED: "ডেলিভার্ড" }
      : { PENDING: "Pending", CONFIRMED: "Confirmed", PACKED: "Packed", SHIPPED: "Shipped", DELIVERED: "Delivered" };

  const idx = status ? STEPS.indexOf(status as (typeof STEPS)[number]) : -1;

  return (
    <div className="container-page max-w-lg py-16">
      <h1 className="section-title">{lang === "bn" ? "অর্ডার ট্র্যাক" : "Track your order"}</h1>
      <p className="section-subtitle">{lang === "bn" ? "স্ট্যাটাস এসএমএস ও হোয়াটসঅ্যাপেও যায়।" : "Status also arrives by SMS & WhatsApp."}</p>
      <form className="mt-6 space-y-3" onSubmit={lookup}>
        <input className="input-field" placeholder={lang === "bn" ? "অর্ডার নম্বর" : "Order number"} value={orderNo} onChange={(e) => setOrderNo(e.target.value)} />
        <input className="input-field" placeholder={lang === "bn" ? "ফোন (ঐচ্ছিক)" : "Phone (optional)"} value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button type="submit" className="btn-primary w-full">
          {lang === "bn" ? "ট্র্যাক" : "Track"}
        </button>
      </form>
      {err && <p className="mt-3 text-xs text-pink-gold-dark">{err}</p>}
      <ol className="mt-10 space-y-3 text-sm text-off-black/70">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${idx >= 0 && i <= idx ? "bg-gold" : "bg-off-black/15"}`} />
            {labels[s]}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="container-page py-16 text-sm text-off-black/40">Loading…</div>}>
      <TrackInner />
    </Suspense>
  );
}
