"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export function AbandonedWatcher() {
  const { items } = useCart();
  const path = usePathname();
  const last = useRef("");

  useEffect(() => {
    if (!items.length) return;
    const payload = items.map((i) => ({ id: i.product.id, qty: i.quantity }));
    const key = JSON.stringify(payload);
    if (key === last.current) return;
    if (path !== "/checkout") return;
    last.current = key;
    const t = window.setTimeout(() => {
      fetch("/admin/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "abandoned_save", value: { items: payload } }),
      }).catch(() => undefined);
    }, 8000);
    return () => window.clearTimeout(t);
  }, [items, path]);

  return null;
}
