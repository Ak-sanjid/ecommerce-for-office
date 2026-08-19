"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DragRail({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let left = 0;
    let dragged = false;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      down = true;
      dragged = false;
      startX = e.clientX;
      left = el.scrollLeft;
      el.classList.add("is-dragging");
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) dragged = true;
      el.scrollLeft = left - dx;
    };
    const onUp = () => {
      down = false;
      el.classList.remove("is-dragging");
    };
    const onClick = (e: MouseEvent) => {
      if (dragged) {
        e.preventDefault();
        e.stopPropagation();
        dragged = false;
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <div ref={ref} className={cn("drag-scroll flex gap-4 pb-3", className)}>
      {children}
    </div>
  );
}
