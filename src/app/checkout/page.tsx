"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { useAuth } from "@/context/AuthContext";
import { bdt } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { productName } from "@/lib/utils";
import { track } from "@/lib/track";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { lang, t } = useLang();
  const { user } = useAuth();
  const [zone, setZone] = useState<"in" | "out">("in");
  const [pay, setPay] = useState<"bkash" | "nagad" | "rocket" | "cod">("bkash");
  const [otp, setOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpHint, setOtpHint] = useState("");
  const [done, setDone] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);
  const [err, setErr] = useState("");

  const fee = zone === "in" ? 60 : 120;
  const ship = totalPrice >= siteConfig.freeShippingThreshold ? 0 : fee;
  const payable = Math.max(0, totalPrice - discount + ship);
  const eta = zone === "in" ? (lang === "bn" ? "কাল–২ দিন" : "Tomorrow – 2 days") : lang === "bn" ? "২–৪ দিন" : "2–4 days";

  useEffect(() => {
    track("beginCheckout", { value: totalPrice, currency: "BDT" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyCoupon = async () => {
    setCouponMsg("");
    const res = await fetch("/api/coupon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, subtotal: totalPrice }),
    });
    const j = (await res.json()) as { ok: boolean; discount?: number; error?: string };
    if (j.ok && j.discount) {
      setDiscount(j.discount);
      setCouponMsg(lang === "bn" ? "কুপন প্রয়োগ হয়েছে" : "Coupon applied");
    } else {
      setDiscount(0);
      setCouponMsg(j.error ?? "Invalid coupon");
    }
  };

  const sendOtp = async () => {
    const res = await fetch("/api/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const j = (await res.json()) as { ok: boolean; error?: string; devCode?: string };
    if (!j.ok) {
      setErr(j.error ?? "OTP failed");
      return;
    }
    setOtpHint(j.devCode ? `Dev OTP: ${j.devCode}` : lang === "bn" ? "ওটিপি পাঠানো হয়েছে" : "OTP sent");
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, code: otpCode }),
    });
    const j = (await res.json()) as { ok: boolean; error?: string };
    if (j.ok) {
      setOtp(true);
      setErr("");
    } else setErr(j.error ?? "Invalid OTP");
  };

  const place = async () => {
    setPlacing(true);
    setErr("");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ id: i.product.id, qty: i.quantity })),
        zone: zone === "in" ? "INSIDE_DHAKA" : "OUTSIDE_DHAKA",
        couponCode: discount > 0 && code ? code : undefined,
        customer: { name, phone, phoneVerified: otp, userId: user?.id, address },
        paymentMethod: pay.toUpperCase(),
      }),
    });
    const j = (await res.json()) as { ok: boolean; total?: number; orderNumber?: string; error?: string };
    if (j.ok && j.orderNumber) {
      track("purchase", { value: j.total, currency: "BDT", transaction_id: j.orderNumber });
      clearCart();
      setOrderNumber(j.orderNumber);
      setDone(true);
    } else setErr(j.error ?? "Something went wrong");
    setPlacing(false);
  };

  if (done) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-3xl">{lang === "bn" ? "অর্ডার হয়েছে" : "Order placed"}</h1>
        <p className="mt-2 font-mono text-lg text-gold-dark">{orderNumber}</p>
        <p className="mt-2 text-sm text-off-black/55">
          {lang === "bn" ? "এসএমএস / হোয়াটসঅ্যাপে আপডেট যাবে।" : "SMS / WhatsApp updates will follow."}
        </p>
        <Link href={`/track?order=${orderNumber}`} className="btn-primary mt-6 inline-flex">
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
          <input className="input-field" placeholder={t("name")} value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input-field" placeholder={t("phone")} value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input className="input-field" placeholder={lang === "bn" ? "ঠিকানা" : "Address"} value={address} onChange={(e) => setAddress(e.target.value)} />
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
            <div className="mt-3 space-y-2">
              <div className="flex gap-2">
                <input className="input-field" placeholder="OTP" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
                <button type="button" onClick={otp ? undefined : otpHint ? verifyOtp : sendOtp} className="btn-secondary">
                  {otp ? t("verify") : otpHint ? t("verify") : t("sendOtp")}
                </button>
              </div>
              {otpHint && <p className="text-xs text-gold-dark">{otp ? (lang === "bn" ? "ফোন যাচাই হয়েছে" : "Phone verified") : otpHint}</p>}
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
          <div className="mt-4 flex gap-2">
            <input className="input-field py-2" placeholder="GLOW10" value={code} onChange={(e) => setCode(e.target.value)} />
            <button type="button" className="btn-secondary" onClick={applyCoupon}>
              Apply
            </button>
          </div>
          {couponMsg && <p className="mt-1 text-xs text-gold-dark">{couponMsg}</p>}
          <div className="mt-4 space-y-1 border-t border-off-black/5 pt-3 text-sm">
            <div className="flex justify-between">
              <span>{t("subtotal")}</span>
              <span>{bdt(totalPrice)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-gold-dark">
                <span>{lang === "bn" ? "ছাড়" : "Discount"}</span>
                <span>−{bdt(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{t("delivery")}</span>
              <span>{ship === 0 ? (lang === "bn" ? "ফ্রি" : "Free") : bdt(ship)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{bdt(payable)}</span>
            </div>
          </div>
          {err && <p className="mt-3 text-xs text-pink-gold-dark">{err}</p>}
          <button
            type="button"
            disabled={items.length === 0 || !name || !phone || (pay === "cod" && !otp) || placing}
            onClick={place}
            className="btn-primary mt-5 w-full"
          >
            {placing ? (lang === "bn" ? "প্রসেসিং…" : "Placing…") : lang === "bn" ? "অর্ডার নিশ্চিত" : "Place order"}
          </button>
        </div>
      </aside>
    </div>
  );
}
