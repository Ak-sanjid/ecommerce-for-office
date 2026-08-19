"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Product } from "@/types";
import { siteConfig } from "@/config/site";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  selectedSamples: string[];
  toggleSample: (id: string) => void;
  canPickSamples: boolean;
  wishlist: string[];
  toggleWish: (id: string) => void;
  recently: string[];
  viewProduct: (id: string) => void;
  alerts: string[];
  notifyRestock: (id: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);
const LS = "glow-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recently, setRecently] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS);
      if (raw) {
        const d = JSON.parse(raw);
        setItems(d.items ?? []);
        setWishlist(d.wishlist ?? []);
        setRecently(d.recently ?? []);
        setAlerts(d.alerts ?? []);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(LS, JSON.stringify({ items, wishlist, recently, alerts }));
  }, [items, wishlist, recently, alerts, ready]);

  const addItem = useCallback((product: Product, qty = 1) => {
    if (product.stock <= 0) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i,
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.product.id !== productId) : prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setSelectedSamples([]);
  }, []);

  const toggleSample = useCallback((id: string) => {
    setSelectedSamples((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= 2) return [...prev.slice(1), id];
      return [...prev, id];
    });
  }, []);

  const toggleWish = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const viewProduct = useCallback((id: string) => {
    setRecently((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 12));
  }, []);

  const notifyRestock = useCallback((id: string) => {
    setAlerts((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => {
    const unit = i.product.flashSale?.price ?? i.product.price;
    return sum + unit * i.quantity;
  }, 0);
  const canPickSamples = totalPrice >= siteConfig.freeSampleThreshold;

  useEffect(() => {
    if (!canPickSamples && selectedSamples.length) setSelectedSamples([]);
  }, [canPickSamples, selectedSamples.length]);

  const value = useMemo(
    () => ({
      items,
      isOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      selectedSamples,
      toggleSample,
      canPickSamples,
      wishlist,
      toggleWish,
      recently,
      viewProduct,
      alerts,
      notifyRestock,
    }),
    [items, isOpen, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart, selectedSamples, toggleSample, canPickSamples, wishlist, toggleWish, recently, viewProduct, alerts, notifyRestock],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
