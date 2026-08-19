"use client";

import Link from "next/link";
import { visibleSorted } from "@/config/site";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";
import { Icon } from "@/components/shared/Icon";

export function QuickCategoryRow() {
  const { config } = useSiteConfig();
  const { openCart, totalItems } = useCart();
  const { isLoggedIn, user, setAccountOpen } = useAuth();
  const { lang, t } = useLang();
  const shortcuts = visibleSorted(config.quickShortcuts);

  return (
    <div className="border-t border-off-black/[0.05]">
      <div className="container-page flex items-center gap-3 py-2">
        <Link
          href="/categories"
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-gold/10 px-3 py-2 text-xs font-medium
                     text-gold-dark hover:bg-gold/20 transition-colors"
        >
          <Icon name="grid" size={14} />
          <span className="hidden sm:inline">{t("browse")}</span>
          <span className="sm:hidden">{lang === "bn" ? "ক্যাটাগরি" : "Browse"}</span>
        </Link>

        <nav className="drag-scroll flex flex-1 items-center gap-1" aria-label="Quick categories">
          {shortcuts.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className="whitespace-nowrap rounded-md px-3 py-1.5 text-xs text-off-black/60
                         hover:bg-gold/5 hover:text-gold transition-colors"
            >
              {lang === "bn" ? s.labelBn : s.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-1 lg:flex">
          <button
            type="button"
            onClick={() => setAccountOpen(true)}
            className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-off-black/55 hover:text-gold transition-colors"
          >
            <Icon name="user" size={14} />
            {isLoggedIn ? user!.name.split(" ")[0] : t("account")}
          </button>
          <span className="h-3 w-px bg-off-black/10" />
          <Link
            href="/wishlist"
            className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-off-black/55 hover:text-pink-gold transition-colors"
          >
            <Icon name="heart" size={14} /> {t("wishlist")}
          </Link>
          <span className="h-3 w-px bg-off-black/10" />
          <button
            type="button"
            onClick={openCart}
            className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-off-black/55 hover:text-gold transition-colors"
          >
            <Icon name="cart" size={14} /> {t("cart")} ({totalItems})
          </button>
        </div>
      </div>
    </div>
  );
}
