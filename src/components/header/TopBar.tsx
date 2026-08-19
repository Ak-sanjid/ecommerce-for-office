"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";
import { WHATSAPP, WHATSAPP_DISPLAY } from "@/lib/utils";

export function TopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { openCart, totalItems, wishlist } = useCart();
  const { user, isLoggedIn, setAccountOpen } = useAuth();
  const { t } = useLang();

  return (
    <div className="border-b border-off-black/5">
      <div className="container-page flex items-center justify-between h-16 lg:h-[76px]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenMenu}
            className="lg:hidden p-2 -ml-2 text-off-black/70"
            aria-label={t("menu")}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          </button>
          <Link href="/" className="flex flex-col leading-none" aria-label="GLOW Home">
            <span className="hidden sm:block text-[10px] tracking-[0.42em] uppercase text-gold">Radiance</span>
            <span className="font-display text-[26px] lg:text-[32px] font-semibold tracking-[0.18em] text-off-black">
              GLOW
            </span>
          </Link>
        </div>

        <div className="flex items-end gap-1">
          <div className="hidden sm:flex flex-col items-center min-w-[86px] mr-1">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-dark h-5 grid place-items-center"
              aria-label={`${t("support")} ${WHATSAPP_DISPLAY}`}
            >
              <WhatsAppIcon />
            </a>
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              className="flex flex-col items-center text-[11px] text-off-black/70"
            >
              <UserIcon />
              <span className="font-medium text-off-black max-w-[92px] truncate">
                {isLoggedIn ? user?.name.split(" ")[0] : t("helloGuest")}
              </span>
            </button>
          </div>

          <Link href="/wishlist" className="relative p-2 text-off-black/70 hover:text-pink-gold" aria-label={t("wishlist")}>
            <HeartIcon />
            {wishlist.length > 0 && <Count n={wishlist.length} />}
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative p-2 text-off-black/70 hover:text-gold"
            aria-label={t("cart")}
          >
            <BagIcon />
            {totalItems > 0 && <Count n={totalItems} />}
          </button>
        </div>
      </div>
    </div>
  );
}

function Count({ n }: { n: number }) {
  return (
    <span className="absolute top-1 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-gold text-off-black text-[10px] font-semibold grid place-items-center">
      {n}
    </span>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="8" r="3.1" />
      <path d="M5.2 19.2c.8-3.2 3.5-5 6.8-5s6 1.8 6.8 5" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 20s-7.2-4.4-9.2-8.2C1.2 9 2.4 6 5.4 5.4c1.8-.4 3.5.4 4.6 1.8 1.1-1.4 2.8-2.2 4.6-1.8 3 .6 4.2 3.6 2.6 6.4C19.2 15.6 12 20 12 20Z" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6.5 8h11l.8 11.2a1 1 0 0 1-1 1.1H6.7a1 1 0 0 1-1-1.1L6.5 8Z" />
      <path d="M9 8V6.6A3 3 0 0 1 12 3.6 3 3 0 0 1 15 6.6V8" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 3.53 17.2L2.1 21.9l4.82-1.26A9.82 9.82 0 1 0 19.05 4.91Z" />
    </svg>
  );
}
