"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useCart } from "@/context/CartContext";

export function TrackView({ id }: { id: string }) {
  const { push } = useRecentlyViewed();
  const { viewProduct } = useCart();
  useEffect(() => {
    push(id);
    viewProduct(id);
  }, [id, push, viewProduct]);
  return null;
}
