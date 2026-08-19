import { useEffect, useRef } from "react";

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const dragged = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let down = false;
    let startX = 0;
    let left = 0;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      down = true;
      dragged.current = false;
      startX = e.clientX;
      left = el.scrollLeft;
      el.classList.add("is-dragging");
    };

    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) dragged.current = true;
      el.scrollLeft = left - dx;
    };

    const onUp = () => {
      down = false;
      el.classList.remove("is-dragging");
    };

    const onClick = (e: MouseEvent) => {
      if (dragged.current) {
        e.preventDefault();
        e.stopPropagation();
        dragged.current = false;
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

  return ref;
}
