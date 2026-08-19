"use client";

import Link from "next/link";
import { navItems, mainCategories } from "@/data/categories";
import { useLang } from "@/context/LangContext";
import { useAuth } from "@/context/AuthContext";
import { WHATSAPP } from "@/lib/utils";

export function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { lang, setLang, t } = useLang();
  const { user, setAccountOpen } = useAuth();
  if (!isOpen) return null;

  return (
    <>
      <button type="button" className="fixed inset-0 bg-off-black/30 z-[60]" aria-label={t("close")} onClick={onClose} />
      <aside className="fixed top-0 left-0 z-[70] w-[min(360px,88vw)] h-dvh bg-cream overflow-auto p-5">
        <div className="flex justify-between items-center mb-4">
          <span className="font-display text-2xl tracking-[0.18em]">GLOW</span>
          <button type="button" onClick={onClose} className="p-2" aria-label={t("close")}>
            ✕
          </button>
        </div>
        <button type="button" className="btn-secondary w-full mb-3" onClick={() => setLang(lang === "en" ? "bn" : "en")}>
          {t("language")}
        </button>
        <button
          type="button"
          className="btn-secondary w-full mb-2"
          onClick={() => {
            setAccountOpen(true);
            onClose();
          }}
        >
          {user ? user.name : t("helloGuest")}
        </button>
        <a href={`https://wa.me/${WHATSAPP}`} className="btn-primary w-full mb-4" target="_blank" rel="noreferrer">
          {t("support")}
        </a>
        {navItems.map((item) => {
          const cat = mainCategories.find((c) => c.id === item.mega);
          return (
            <div key={item.slug} className="border-b border-gold/20">
              <Link href={item.slug} onClick={onClose} className="block py-3 text-lg">
                {lang === "bn" ? item.nameBn : item.name}
              </Link>
              {cat && (
                <div className="pb-3 pl-3 grid gap-1.5">
                  {cat.subCategories.map((s) => (
                    <Link key={s.id} href={`/category/${cat.slug}?type=${s.slug}`} onClick={onClose} className="text-sm text-off-black/70">
                      {lang === "bn" ? s.nameBn : s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </aside>
    </>
  );
}
