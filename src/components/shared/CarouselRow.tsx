"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";
import { Icon } from "./Icon";

export function CarouselRow({
  title,
  subtitle,
  viewAllHref,
  children,
  tone = "cream",
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  eyebrow?: string;
  children: ReactNode;
  tone?: "cream" | "white" | "deep";
}) {
  const { ref, handlers, scrollByCards } = useDragScroll<HTMLDivElement>();
  const bg = tone === "white" ? "bg-white" : tone === "deep" ? "bg-cream-deep" : "bg-cream";

  return (
    <section className={`${bg} py-10 sm:py-14`}>
      <div className="container-page">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            {eyebrow && (
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">{eyebrow}</p>
            )}
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="hidden text-xs font-medium text-gold-dark underline underline-offset-4 sm:inline"
              >
                View all
              </Link>
            )}
            <div className="hidden gap-1.5 md:flex">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Scroll left"
                className="grid h-9 w-9 place-items-center rounded-full border border-off-black/10 text-off-black/60 hover:border-gold hover:text-gold transition-colors"
              >
                <Icon name="arrowLeft" size={15} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Scroll right"
                className="grid h-9 w-9 place-items-center rounded-full border border-off-black/10 text-off-black/60 hover:border-gold hover:text-gold transition-colors"
              >
                <Icon name="arrowRight" size={15} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={ref}
          {...handlers}
          className="drag-scroll flex cursor-grab gap-4 pb-2 select-none"
          role="region"
          aria-label={title}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
