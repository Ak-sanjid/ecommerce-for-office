"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { visibleSorted, type NavItemConfig } from "@/config/site";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { BrandMegaMenu } from "./BrandMegaMenu";
import { SubCategoryPanel } from "./SubCategoryPanel";
import { useLang } from "@/context/LangContext";

export function CategoryBar() {
  const { config } = useSiteConfig();
  const { lang } = useLang();
  const [active, setActive] = useState<NavItemConfig | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const enter = (item: NavItemConfig) => {
    clearTimeout(timer.current);
    if (item.megaMenu) setActive(item);
    else setActive(null);
  };
  const leave = () => {
    timer.current = setTimeout(() => setActive(null), 120);
  };

  const items = visibleSorted(config.navItems);

  return (
    <div className="relative hidden border-t border-off-black/[0.05] lg:block" onMouseLeave={leave}>
      <div className="container-page">
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {items.map((item) => {
            const accent =
              item.accent === "male"
                ? "hover:text-male-tint-dark after:bg-male-tint-dark"
                : item.accent === "female"
                  ? "hover:text-female-tint-dark after:bg-female-tint-dark"
                  : "hover:text-gold after:bg-gold";
            return (
              <Link
                key={item.id}
                href={item.href}
                onMouseEnter={() => enter(item)}
                className={`relative px-3.5 py-3.5 text-[13px] font-medium tracking-wide text-off-black/75
                            transition-colors after:absolute after:inset-x-3.5 after:bottom-2 after:h-px
                            after:origin-left after:scale-x-0 after:transition-transform hover:after:scale-x-100 ${accent}
                            ${active?.id === item.id ? "text-gold after:scale-x-100" : ""}`}
              >
                {lang === "bn" ? item.labelBn : item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {active?.megaMenu === "brands" && (
        <div onMouseEnter={() => clearTimeout(timer.current)}>
          <BrandMegaMenu />
        </div>
      )}
      {active?.megaMenu === "subcategories" && active.categoryId && (
        <div onMouseEnter={() => clearTimeout(timer.current)}>
          <SubCategoryPanel categoryId={active.categoryId} accent={active.accent} />
        </div>
      )}
    </div>
  );
}
