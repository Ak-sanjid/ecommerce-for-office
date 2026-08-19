"use client";

import { useLang } from "@/context/LangContext";
import { WHATSAPP_DISPLAY } from "@/lib/utils";

export default function ContactPage() {
  const { lang, t } = useLang();
  return (
    <div className="container-page py-10 max-w-xl">
      <div className="kicker">{lang === "bn" ? "ডেস্ক" : "The desk"}</div>
      <h1 className="font-display text-5xl mt-2">{lang === "bn" ? "যোগাযোগ" : "Contact"}</h1>
      <p className="mt-3">WhatsApp {WHATSAPP_DISPLAY} · hello@glowbeauty.com.bd · Banani, Dhaka</p>
      <form className="mt-6 grid gap-3" onSubmit={(e) => e.preventDefault()}>
        <input className="input-field" placeholder={t("name")} required />
        <input className="input-field" placeholder={t("phone")} required />
        <textarea className="input-field min-h-[120px]" />
        <button className="btn-primary">{lang === "bn" ? "পাঠান" : "Send"}</button>
      </form>
    </div>
  );
}
