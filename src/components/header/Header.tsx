"use client";

import { useEffect, useRef, useState } from "react";
import { TopBar } from "./TopBar";
import { SearchBar } from "./SearchBar";
import { QuickCategoryRow } from "./QuickCategoryRow";
import { CategoryBar } from "./CategoryBar";
import { PromoStrip } from "./PromoStrip";
import { MobileMenu } from "./MobileMenu";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { cn } from "@/lib/utils";

export function Header() {
  const { config } = useSiteConfig();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [height, setHeight] = useState(168);
  const bar = useRef<HTMLElement>(null);
  const layout = config.headerLayout;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.getBoundingClientRect().height));
    ro.observe(el);
    setHeight(el.getBoundingClientRect().height);
    return () => ro.disconnect();
  }, [layout, scrolled]);

  return (
    <>
      <header
        ref={bar}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-shadow duration-200",
          scrolled ? "bg-cream/95 backdrop-blur-md shadow-card" : "bg-cream",
        )}
      >
        <TopBar onOpenMenu={() => setMenuOpen(true)} />

        {layout === "A" ? (
          <>
            <div className="container-page hidden lg:block">
              <SearchBar />
            </div>
            <QuickCategoryRow />
            <div
              className={cn(
                "hidden lg:block overflow-hidden transition-[max-height,opacity] duration-200",
                scrolled ? "max-h-0 opacity-0" : "max-h-14 opacity-100",
              )}
            >
              <CategoryBar />
            </div>
          </>
        ) : (
          <>
            <CategoryBar />
            <PromoStrip />
          </>
        )}

        <div className="container-page pb-3 lg:hidden">
          <SearchBar compact />
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <div aria-hidden className="shrink-0" style={{ height }} />
    </>
  );
}
