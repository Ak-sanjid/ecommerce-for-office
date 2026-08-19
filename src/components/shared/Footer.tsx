"use client";

import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { WHATSAPP_DISPLAY } from "@/lib/utils";

export function Footer() {
  const { lang, t } = useLang();
  return (
    <footer className="mt-16 bg-off-black text-[#efe6d6] pt-12 pb-6">
      <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-3xl tracking-[0.18em]">GLOW</div>
          <p className="mt-3 max-w-xs text-[#d9cbb3] text-sm">{t("footerTag")}</p>
          <p className="mt-4 text-xs text-gold-light">{t("pwa")}</p>
        </div>
        <div>
          <h3 className="text-gold-light text-xs tracking-widest uppercase mb-3">{lang === "bn" ? "দোকান" : "House"}</h3>
          <Link href="/category/k-beauty" className="block py-1 text-[#d9cbb3] text-sm">K-Beauty</Link>
          <Link href="/category/j-beauty" className="block py-1 text-[#d9cbb3] text-sm">J-Beauty</Link>
          <Link href="/category/mens" className="block py-1 text-[#d9cbb3] text-sm">{lang === "bn" ? "পুরুষ" : "Men"}</Link>
          <Link href="/category/makeup" className="block py-1 text-[#d9cbb3] text-sm">{lang === "bn" ? "মেকআপ" : "Makeup"}</Link>
          <Link href="/blog" className="block py-1 text-[#d9cbb3] text-sm">{lang === "bn" ? "ব্লগ" : "Journal"}</Link>
        </div>
        <div>
          <h3 className="text-gold-light text-xs tracking-widest uppercase mb-3">{lang === "bn" ? "সহায়তা" : "Care"}</h3>
          <Link href="/contact" className="block py-1 text-[#d9cbb3] text-sm">{lang === "bn" ? "যোগাযোগ" : "Contact"}</Link>
          <Link href="/track" className="block py-1 text-[#d9cbb3] text-sm">{lang === "bn" ? "অর্ডার ট্র্যাক" : "Track order"}</Link>
          <Link href="/legal/returns" className="block py-1 text-[#d9cbb3] text-sm">{lang === "bn" ? "রিটার্ন" : "Returns"}</Link>
          <Link href="/legal/terms" className="block py-1 text-[#d9cbb3] text-sm">{lang === "bn" ? "শর্তাবলী" : "Terms"}</Link>
          <Link href="/legal/privacy" className="block py-1 text-[#d9cbb3] text-sm">{lang === "bn" ? "গোপনীয়তা" : "Privacy"}</Link>
        </div>
        <div>
          <h3 className="text-gold-light text-xs tracking-widest uppercase mb-3">{t("newsletter")}</h3>
          <p className="text-sm text-[#d9cbb3]">
            WhatsApp {WHATSAPP_DISPLAY}
            <br />
            hello@glowbeauty.com.bd
          </p>
        </div>
      </div>
      <div className="container-page mt-8 pt-4 border-t border-gold/20 flex justify-between text-xs text-[#b5a88f]">
        <span>© {new Date().getFullYear()} GLOW Bangladesh</span>
        <span>bKash · Nagad · Rocket · COD</span>
      </div>
    </footer>
  );
}
