"use client";

import { useCallback, useRef } from "react";

export function useDragScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const s = useRef({ down: false, startX: 0, left: 0, moved: false });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    s.current = { down: true, startX: e.clientX, left: el.scrollLeft, moved: false };
    el.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !s.current.down) return;
    const dx = e.clientX - s.current.startX;
    if (Math.abs(dx) > 4) s.current.moved = true;
    el.scrollLeft = s.current.left - dx;
  }, []);

  const end = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    s.current.down = false;
    el.style.cursor = "grab";
  }, []);

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (s.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      s.current.moved = false;
    }
  }, []);

  const scrollByCards = useCallback((dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.8), behavior: "smooth" });
  }, []);

  return {
    ref,
    handlers: { onPointerDown, onPointerMove, onPointerUp: end, onPointerLeave: end, onClickCapture },
    scrollByCards,
  };
}
