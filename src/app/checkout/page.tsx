"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";
import { formatBdt, productName } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { lang, t } = useLang();
  const [pay, setPay] = useState("bkash");
  const [otp, setOtp] = useState(false);
  const [done, setDone] = useState("");

  return (
    <div className="container-page py-10 max-w-3xl">
      <div className="kicker">{t("checkout")}</div>
      <h1 className="font-display text-5xl mt-2">{t("checkout")}</h1>
      <p className="text-off-black/60 mt-2">{t("guestNote")}</p>
      {done ? (
        <p className="mt-8 text-lg">{done}</p>
      ) : (
        <form
          className="mt-8 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (pay === "cod" && !otp) {
              setOtp(true);
              return;
            }
            clearCart();
            setDone(lang === "bn" ? "অর্ডার হয়েছে · GLOW-1842" : "Order placed · GLOW-1842");
          }}
        >
          <input className="input-field" required defaultValue={user?.name} placeholder={t("name")} />
          <input className="input-field" required defaultValue={user?.phone} placeholder={t("phone")} />
          <input className="input-field" required placeholder={lang === "bn" ? "ঠিকানা" : "Address"} />
          <div>
            {["bkash", "nagad", "rocket", "cod"].map((p) => (
              <label key={p} className="flex items-center gap-2 py-1">
                <input type="radio" name="pay" checked={pay === p} onChange={() => setPay(p)} /> {p.toUpperCase()}
              </label>
            ))}
          </div>
          {pay === "cod" && otp && <input className="input-field" placeholder="COD OTP 1234" />}
          <button type="submit" className="btn-ink">
            {pay === "cod" && !otp ? t("sendOtp") : lang === "bn" ? "অর্ডার নিশ্চিত" : "Place order"} · {formatBdt(totalPrice)}
          </button>
          <ul className="text-sm text-off-black/70">
            {items.map((i) => (
              <li key={i.product.id}>{productName(i.product, lang)} × {i.quantity}</li>
            ))}
          </ul>
        </form>
      )}
    </div>
  );
}
