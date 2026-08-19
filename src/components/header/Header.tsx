"use client";

import { useEffect, useState } from "react";
import { TopBar } from "./TopBar";
import { SearchBar } from "./SearchBar";
import { QuickCategoryRow } from "./QuickCategoryRow";
import { CategoryBar } from "./CategoryBar";
import { MobileMenu } from "./MobileMenu";
import { PromoStrip } from "./PromoStrip";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerLayout, setHeaderLayout] = useState<"A" | "B">("A");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gold/20",
        isScrolled ? "bg-cream/95 backdrop-blur-md shadow-card" : "bg-cream",
      )}
    >
      <PromoStrip onToggleLayout={() => setHeaderLayout((l) => (l === "A" ? "B" : "A"))} />
      <TopBar onOpenMenu={() => setMobileMenuOpen(true)} />
      <div className="container-page">
        {headerLayout === "A" ? (
          <>
            <div className={cn(isScrolled && "hidden lg:block")}>
              <SearchBar />
            </div>
            {!isScrolled && <QuickCategoryRow />}
          </>
        ) : (
          <div className="py-2 my-2 text-center text-sm text-gold-dark bg-gold/5 rounded-lg">
            Free delivery on orders above ৳2,000 · Use GLOW10 for 10% off
          </div>
        )}
      </div>
      <div className="hidden lg:block">
        <CategoryBar />
      </div>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
