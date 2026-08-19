import { products } from "@/data/products";
import { readStore, updateStore } from "./jsonStore";
import { sendWhatsApp } from "./whatsapp";
import { getPrisma } from "./prisma";
import { cuidLike } from "./ids";

export async function logStockChange(productId: string, change: number, reason: string, batchNo?: string) {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const before = (await prisma.product.findUnique({
        where: { id: productId },
        select: { stock: true, name: true },
      })) as { stock: number; name: string } | null;
      const wasOut = (before?.stock ?? 0) <= 0;
      await prisma.$transaction(async (tx) => {
        await tx.product.update({ where: { id: productId }, data: { stock: { increment: change } } });
        await tx.inventoryLog.create({ data: { productId, change, reason, batchNo } });
      });
      if (change > 0 && wasOut) await fireRestockAlerts(productId, before?.name);
      return;
    } catch {
      /* JSON fallback */
    }
  }

  const store = readStore();
  const catalog = products.find((p) => p.id === productId);
  const beforeStock = store.stock[productId] ?? catalog?.stock ?? 0;
  const wasOut = beforeStock <= 0;

  updateStore((s) => ({
    ...s,
    stock: { ...s.stock, [productId]: Math.max(0, (s.stock[productId] ?? catalog?.stock ?? 0) + change) },
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

  if (change > 0 && wasOut) await fireRestockAlerts(productId, catalog?.name);
}

async function fireRestockAlerts(productId: string, name?: string) {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const alerts = (await prisma.restockAlert.findMany({
        where: { productId, notified: false },
      })) as Array<{ id: string; phone: string }>;
      for (const a of alerts) {
        await sendWhatsApp(a.phone, `Good news! ${name ?? "Your product"} is back in stock on GLOW ✨`);
        await prisma.restockAlert.update({ where: { id: a.id }, data: { notified: true } });
      }
      return;
    } catch {
      /* JSON fallback */
    }
  }

  const pending = readStore().restockAlerts.filter((a) => a.productId === productId && !a.notified);
  for (const a of pending) {
    await sendWhatsApp(a.phone, `Good news! ${name ?? "Your product"} is back in stock on GLOW ✨`);
  }
  if (pending.length) {
    updateStore((s) => ({
      ...s,
      restockAlerts: s.restockAlerts.map((a) =>
        a.productId === productId && !a.notified ? { ...a, notified: true } : a,
      ),
    }));
  }
}

export function getStock(productId: string) {
  const s = readStore();
  const p = products.find((x) => x.id === productId);
  const meta = s.skuMeta[productId];
  return {
    stock: s.stock[productId] ?? p?.stock ?? 0,
    batchNo: meta?.batch ?? p?.batch,
    expiryDate: meta?.expiry ?? p?.expiry,
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
    batch: s.skuMeta[p.id]?.batch ?? p.batch,
    expiry: s.skuMeta[p.id]?.expiry ?? p.expiry,
  }));
}

export function updateSku(row: { productId: string; stock?: number; batch?: string; expiry?: string; reason?: string }) {
  const catalog = products.find((p) => p.id === row.productId);
  if (!catalog) return null;
  updateStore((s) => {
    const prev = s.stock[row.productId] ?? catalog.stock;
    const nextStock = row.stock != null ? Math.max(0, Number(row.stock)) : prev;
    const change = nextStock - prev;
    return {
      ...s,
      stock: { ...s.stock, [row.productId]: nextStock },
      skuMeta: {
        ...s.skuMeta,
        [row.productId]: {
          batch: row.batch ?? s.skuMeta[row.productId]?.batch ?? catalog.batch,
          expiry: row.expiry ?? s.skuMeta[row.productId]?.expiry ?? catalog.expiry,
        },
      },
      inventoryLogs:
        change === 0
          ? s.inventoryLogs
          : [
              {
                id: `inv_${Date.now()}_${row.productId}`,
                productId: row.productId,
                change,
                reason: row.reason ?? "sku_edit",
                batchNo: row.batch,
                createdAt: new Date().toISOString(),
              },
              ...s.inventoryLogs,
            ].slice(0, 200),
    };
  });
  return getStock(row.productId);
}

export function seedCatalog() {
  updateStore((s) => ({
    ...s,
    stock: { ...Object.fromEntries(products.map((p) => [p.id, p.stock])), ...s.stock },
    skuMeta: {
      ...Object.fromEntries(products.map((p) => [p.id, { batch: p.batch, expiry: p.expiry }])),
      ...s.skuMeta,
    },
  }));
  return { count: products.length, stock: listStock() };
}

export function addRestockAlert(productId: string, phone: string) {
  const existing = readStore().restockAlerts.find((a) => a.productId === productId && a.phone === phone && !a.notified);
  if (existing) return existing;
  const row = {
    id: cuidLike("ra_"),
    productId,
    phone,
    notified: false,
    createdAt: new Date().toISOString(),
  };
  updateStore((s) => ({ ...s, restockAlerts: [row, ...s.restockAlerts].slice(0, 500) }));
  return row;
}

export function listRestockAlerts() {
  return readStore().restockAlerts;
}
