"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/shared/Icon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchBar } from "./SearchBar";
import { CategoryBar } from "./CategoryBar";

/**
 * Sticky two-line header (layout "C"):
 *  Line 1 — brand, search, theme + language + account + wishlist + cart
 *  Line 2 — category navigation (stays visible while scrolling)
 */
export function TwoLineHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { openCart, totalItems, wishlist } = useCart();
  const { isLoggedIn, user, setAccountOpen } = useAuth();
  const { lang, setLang, t } = useLang();

  return (
    <>
      {/* Line 1 */}
      <div className="border-b border-off-black/[0.06]">
        <div className="container-page flex h-16 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenMenu}
            className="lg:hidden -ml-2 p-2 text-off-black/70 hover:text-gold transition-colors"
            aria-label={t("menu")}
          >
            <Icon name="menu" />
          </button>

          <Link href="/" className="flex shrink-0 items-baseline gap-2" aria-label="GLOW home">
            <span className="font-display text-[26px] leading-none font-bold tracking-[0.14em] text-gold">GLOW</span>
            <span className="hidden xl:inline text-[9px] tracking-[0.22em] uppercase text-off-black/35">
              {lang === "bn" ? siteConfig.taglineBn : siteConfig.tagline}
            </span>
          </Link>

          <div className="hidden flex-1 px-2 sm:px-4 lg:block">
            <div className="mx-auto max-w-2xl">
              <SearchBar compact />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="px-2 py-1 text-[11px] tracking-[0.16em] uppercase text-gold-dark hover:text-gold"
            >
              {t("language")}
            </button>

            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-off-black/75 hover:text-gold transition-colors"
            >
              <Icon name="user" size={15} />
              <span>{isLoggedIn ? `Hello, ${user!.name.split(" ")[0]}` : t("account")}</span>
            </button>
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              className="lg:hidden p-2 text-off-black/60 hover:text-gold transition-colors"
              aria-label={t("account")}
            >
              <Icon name="user" size={19} />
            </button>

            <Link
              href="/wishlist"
              className="relative p-2 text-off-black/60 hover:text-pink-gold transition-colors"
              aria-label={t("wishlist")}
            >
              <Icon name="heart" size={19} filled={wishlist.length > 0} />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 h-3.5 min-w-3.5 rounded-full bg-gold px-1 text-[9px] font-bold text-off-black grid place-items-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openCart}
              className="relative p-2 text-off-black/60 hover:text-gold transition-colors"
              aria-label={`${t("cart")}, ${totalItems}`}
            >
              <Icon name="cart" size={19} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-on-accent">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Line 2 — category nav, always visible (sticky) */}
      <CategoryBar />

      {/* Mobile search */}
      <div className="container-page pb-3 lg:hidden">
        <SearchBar compact />
      </div>
    </>
  );
}
