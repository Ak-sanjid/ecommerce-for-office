"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { bdt } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { productName } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { lang, t } = useLang();
  const [zone, setZone] = useState<"in" | "out">("in");
  const [pay, setPay] = useState<"bkash" | "nagad" | "rocket" | "cod">("bkash");
  const [otp, setOtp] = useState(false);
  const [done, setDone] = useState(false);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const fee = zone === "in" ? 60 : 120;
  const ship = totalPrice >= siteConfig.freeShippingThreshold ? 0 : fee;
  const payable = Math.max(0, totalPrice - discount);
  const eta = zone === "in" ? (lang === "bn" ? "কাল–২ দিন" : "Tomorrow – 2 days") : lang === "bn" ? "২–৪ দিন" : "2–4 days";

  if (done) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-3xl">{lang === "bn" ? "অর্ডার হয়েছে" : "Order placed"}</h1>
        <p className="mt-2 text-sm text-off-black/55">
          {lang === "bn" ? "এসএমএস / হোয়াটসঅ্যাপে আপডেট যাবে।" : "SMS / WhatsApp updates will follow."}
        </p>
        <Link href="/track" className="btn-primary mt-6 inline-flex">
          {lang === "bn" ? "ট্র্যাক করুন" : "Track order"}
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page grid gap-8 py-10 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-4">
        <h1 className="section-title">{t("checkout")}</h1>
        <p className="text-sm text-off-black/50">{t("guestNote")}</p>

        <div className="rounded-2xl bg-white p-5 shadow-card space-y-3">
          <input className="input-field" placeholder={t("name")} />
          <input className="input-field" placeholder={t("phone")} />
          <input className="input-field" placeholder={lang === "bn" ? "ঠিকানা" : "Address"} />
          <div className="flex gap-2">
            <button type="button" onClick={() => setZone("in")} className={zone === "in" ? "btn-primary flex-1" : "btn-outline flex-1"}>
              {t("insideDhaka")} · ৳60
            </button>
            <button type="button" onClick={() => setZone("out")} className={zone === "out" ? "btn-primary flex-1" : "btn-outline flex-1"}>
              {t("outsideDhaka")} · ৳120
            </button>
          </div>
          <p className="text-xs text-off-black/45">
            {t("eta")}: {eta}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-card">
          <p className="mb-3 text-sm font-medium">{lang === "bn" ? "পেমেন্ট" : "Payment"}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(["bkash", "nagad", "rocket", "cod"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setPay(m)}
                className={`rounded-xl border px-3 py-3 text-xs uppercase ${
                  pay === m ? "border-gold bg-gold/10 text-gold-dark" : "border-off-black/10"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          {pay === "cod" && (
            <div className="mt-3 flex gap-2">
              <input className="input-field" placeholder="OTP" />
              <button type="button" onClick={() => setOtp(true)} className="btn-secondary">
                {otp ? t("verify") : t("sendOtp")}
              </button>
            </div>
          )}
        </div>
      </div>

      <aside className="lg:col-span-2">
        <div className="rounded-2xl bg-white p-5 shadow-card">
          <p className="font-display text-xl">{lang === "bn" ? "সারাংশ" : "Summary"}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.product.id} className="flex justify-between gap-2">
                <span className="line-clamp-1">
                  {productName(i.product, lang)} × {i.quantity}
                </span>
                <span>{bdt((i.product.flashSale?.price ?? i.product.price) * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-off-black/5 pt-3 text-sm">
            <div className="flex justify-between">
              <span>{t("subtotal")}</span>
              <span>{bdt(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("delivery")}</span>
              <span>{ship === 0 ? (lang === "bn" ? "ফ্রি" : "Free") : bdt(ship)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{bdt(totalPrice + ship)}</span>
            </div>
          </div>
          <button
            type="button"
            disabled={items.length === 0 || (pay === "cod" && !otp)}
            onClick={async () => {
              if (discount > 0 && code) {
                await fetch("/admin/api/update", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ key: "coupon_apply", value: { code } }),
                });
              }
              const ref = sessionStorage.getItem("glow-ref");
              if (ref) {
                await fetch("/admin/api/update", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ key: "ref_convert", value: ref }),
                });
              }
              clearCart();
              setDone(true);
            }}
            className="btn-primary mt-5 w-full"
          >
            {lang === "bn" ? "অর্ডার নিশ্চিত" : "Place order"}
          </button>
        </div>
      </aside>
    </div>
  );
}
