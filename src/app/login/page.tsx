"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { t } = useLang();
  const [tab, setTab] = useState<"social" | "otp" | "form">("social");

  const go = async (name: string, extra?: { email?: string; phone?: string }) => {
    await login(name, extra);
    router.push("/");
  };

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-card">
        <h1 className="font-display text-3xl font-semibold">{t("loginTitle")}</h1>
        <p className="mt-1 text-sm text-off-black/50">{t("loginSub")}</p>

        <div className="mt-5 flex gap-2 text-xs">
          {(["social", "otp", "form"] as const).map((x) => (
            <button
              key={x}
              type="button"
              onClick={() => setTab(x)}
              className={`rounded-full px-3 py-1.5 capitalize ${tab === x ? "bg-gold text-off-black" : "bg-cream"}`}
            >
              {x}
            </button>
          ))}
        </div>

        {tab === "social" && (
          <div className="mt-6 space-y-2">
            <button type="button" onClick={() => go("Nusrat Jahan", { email: "nusrat@demo.com" })} className="btn-primary w-full">
              {t("continueGoogle")}
            </button>
            <button type="button" onClick={() => go("Tanvir Ahmed")} className="btn-secondary w-full">
              {t("continueFb")}
            </button>
          </div>
        )}

        {tab === "otp" && (
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              go("Guest User", { phone: "01700000000" });
            }}
          >
            <input className="input-field" placeholder="01XXXXXXXXX" required />
            <input className="input-field" placeholder="OTP (any 4 digits)" />
            <button type="submit" className="btn-primary w-full">
              {t("verify")}
            </button>
          </form>
        )}

        {tab === "form" && (
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              go("Manual User", { email: "user@demo.com" });
            }}
          >
            <input className="input-field" type="email" placeholder={t("email")} required />
            <input className="input-field" type="password" placeholder="Password" required />
            <button type="submit" className="btn-primary w-full">
              {t("enter")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
