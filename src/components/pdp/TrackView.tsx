"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useCart } from "@/context/CartContext";
import { track } from "@/lib/track";

export function TrackView({ id, price }: { id: string; price: number }) {
  const { push } = useRecentlyViewed();
  const { viewProduct } = useCart();
  useEffect(() => {
    push(id);
    viewProduct(id);
    track("viewItem", { content_ids: [id], value: price, currency: "BDT" });
  }, [id, price, push, viewProduct]);
  return null;
}
