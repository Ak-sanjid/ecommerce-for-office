import { products } from "@/data/products";
import { readStore, updateStore } from "./jsonStore";

export function logStockChange(productId: string, change: number, reason: string, batchNo?: string) {
  updateStore((s) => ({
    ...s,
    stock: { ...s.stock, [productId]: Math.max(0, (s.stock[productId] ?? 0) + change) },
    inventoryLogs: [
      {
        id: `inv_${Date.now()}`,
        productId,
        change,
        reason,
        batchNo,
        createdAt: new Date().toISOString(),
      },
      ...s.inventoryLogs,
    ].slice(0, 200),
  }));
}

export function getStock(productId: string) {
  const s = readStore();
  const p = products.find((x) => x.id === productId);
  return {
    stock: s.stock[productId] ?? p?.stock ?? 0,
    batchNo: p?.batch,
    expiryDate: p?.expiry,
  };
}

export function listInventory(limit = 10) {
  const s = readStore();
  return s.inventoryLogs.slice(0, limit).map((log) => ({
    ...log,
    name: products.find((p) => p.id === log.productId)?.name ?? log.productId,
    stock: s.stock[log.productId],
  }));
}

export function listStock() {
  const s = readStore();
  return products.map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    stock: s.stock[p.id] ?? p.stock,
    batch: p.batch,
    expiry: p.expiry,
  }));
}
