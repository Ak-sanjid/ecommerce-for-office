"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { visibleSorted } from "@/config/site";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { mainCategories } from "@/data/categories";
import { brands } from "@/data/brands";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";
import { Icon } from "@/components/shared/Icon";
import { siteConfig } from "@/config/site";

export function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { config } = useSiteConfig();
  const [open, setOpen] = useState<string | null>(null);
  const { isLoggedIn, user, setAccountOpen } = useAuth();
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-off-black/40 transition-opacity duration-200 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-[61] flex w-[86%] max-w-sm flex-col bg-cream shadow-panel
                    transition-transform duration-200 lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-off-black/5 px-5 py-4">
          <span className="font-display text-2xl font-bold tracking-[0.14em] text-gold">GLOW</span>
          <button type="button" onClick={onClose} aria-label={t("close")} className="p-1 text-off-black/60">
            <Icon name="close" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setAccountOpen(true);
            onClose();
          }}
          className="mx-4 mt-4 flex items-center gap-3 rounded-xl bg-white p-4 shadow-card text-left"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/10 text-gold">
            <Icon name="user" size={18} />
          </span>
          <div>
            <p className="text-sm font-medium">{isLoggedIn ? `Hello, ${user!.name}` : t("helloGuest")}</p>
            <p className="text-[11px] text-off-black/45">
              {isLoggedIn ? `${user!.glowPoints} ${t("glowPoints")}` : t("loginSub")}
            </p>
          </div>
        </button>

        <button
          type="button"
          className="mx-4 mt-2 rounded-lg border border-gold/30 py-2 text-xs tracking-widest uppercase text-gold-dark"
          onClick={() => setLang(lang === "en" ? "bn" : "en")}
        >
          {t("language")}
        </button>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          {visibleSorted(config.navItems).map((item) => {
            const cat = mainCategories.find((c) => c.id === item.categoryId);
            const expandable = item.megaMenu === "brands" || !!cat;
            return (
              <div key={item.id} className="border-b border-off-black/5">
                <div className="flex items-center">
                  <Link href={item.href} onClick={onClose} className="flex-1 py-3.5 text-sm font-medium text-off-black/80">
                    {lang === "bn" ? item.labelBn : item.label}
                  </Link>
                  {expandable && (
                    <button
                      type="button"
                      onClick={() => setOpen(open === item.id ? null : item.id)}
                      aria-label={`Expand ${item.label}`}
                      className={`p-2 text-off-black/40 transition-transform ${open === item.id ? "rotate-180" : ""}`}
                    >
                      <Icon name="chevron" size={14} />
                    </button>
                  )}
                </div>
                {open === item.id && (
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 pb-3 pl-2">
                    {(item.megaMenu === "brands"
                      ? brands.map((b) => ({ id: b.id, name: b.name, href: `/brand/${b.id}` }))
                      : (cat?.subCategories ?? []).map((s) => ({
                          id: s.id,
                          name: lang === "bn" ? s.nameBn : s.name,
                          href: `/category/${cat!.slug}/${s.slug}`,
                        }))
                    ).map((x) => (
                      <Link key={x.id} href={x.href} onClick={onClose} className="py-1.5 text-[13px] text-off-black/55">
                        {x.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-off-black/5 p-4">
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-sm font-medium text-on-accent"
          >
            <Icon name="whatsapp" size={16} /> {lang === "bn" ? "হোয়াটসঅ্যাপে চ্যাট" : "Chat on WhatsApp"}
          </a>
        </div>
      </aside>
    </>
  );
}
