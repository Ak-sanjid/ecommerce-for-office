"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";

export function AccountModal() {
  const { accountOpen, setAccountOpen, user, login, logout } = useAuth();
  const { t } = useLang();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!accountOpen) return null;

  return (
    <>
      <button type="button" className="fixed inset-0 bg-off-black/30 z-[80]" onClick={() => setAccountOpen(false)} aria-label={t("close")} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] w-[min(440px,calc(100%-24px))] bg-white border border-gold/20 shadow-panel p-7">
        <div className="flex justify-between">
          <span className="kicker">{t("account")}</span>
          <button type="button" onClick={() => setAccountOpen(false)}>
            ✕
          </button>
        </div>
        {user ? (
          <>
            <h2 className="font-display text-3xl mt-2">{user.name}</h2>
            <p className="my-3">
              {t("glowPoints")}: <strong>{user.glowPoints}</strong>
            </p>
            <button type="button" className="btn-secondary" onClick={logout}>
              {t("logout")}
            </button>
          </>
        ) : (
          <>
            <h2 className="font-display text-3xl mt-2">{t("loginTitle")}</h2>
            <p className="text-off-black/60 mt-2 text-sm">{t("loginSub")}</p>
            <div className="grid gap-2 my-4">
              <button type="button" className="btn-ink w-full" onClick={() => login("Ayesha Rahman", { email: "ayesha@gmail.com" })}>
                {t("continueGoogle")}
              </button>
              <button type="button" className="btn-secondary w-full" onClick={() => login("Nusrat Karim")}>
                {t("continueFb")}
              </button>
            </div>
            <label className="block text-[11px] tracking-widest uppercase text-gold-dark mb-1">{t("phone")}</label>
            <input className="input-field mb-3" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01XXXXXXXXX" />
            {!otpSent ? (
              <button type="button" className="btn-primary w-full" onClick={() => setOtpSent(true)}>
                {t("sendOtp")}
              </button>
            ) : (
              <>
                <input className="input-field mb-3" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="1234" />
                <button type="button" className="btn-primary w-full" onClick={() => login(phone || "Guest", { phone })}>
                  {t("verify")}
                </button>
              </>
            )}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 my-4 text-[11px] tracking-widest uppercase text-gold-dark">
              <span className="h-px bg-gold/30" />
              {t("orManual")}
              <span className="h-px bg-gold/30" />
            </div>
            <input className="input-field mb-2" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("name")} />
            <input className="input-field mb-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("email")} />
            <button type="button" className="btn-ink w-full" onClick={() => login(name || "Guest", { email, phone })}>
              {t("enter")}
            </button>
          </>
        )}
      </div>
    </>
  );
}
