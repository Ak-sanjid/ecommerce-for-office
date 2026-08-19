import { products } from "@/data/products";
import { validateCouponAsync } from "./coupons";
import { deliveryFeeFor, etaDate, unitPrice } from "./commerce";
import { cuidLike, nextOrderNumber } from "./ids";
import {
  readStore,
  updateStore,
  type OrderRow,
  type OrderStatus,
  type PaymentMethod,
  type Zone,
} from "./jsonStore";
import { createPayment } from "./payments";
import { getPrisma } from "./prisma";
import { registerConversion } from "./referral";
import { pointsForOrder } from "./repeatCustomer";
import { sendWhatsApp } from "./whatsapp";

export const STATUS_MSG: Record<string, string> = {
  CONFIRMED: "Your GLOW order is confirmed 🎉",
  PACKED: "Your GLOW order is packed & ready to ship 📦",
  SHIPPED: "Your GLOW order is on its way! 🚚",
  DELIVERED: "Delivered. Enjoy the glow ✨",
};

export type PlaceOrderInput = {
  items: { id: string; qty: number }[];
  zone: Zone;
  couponCode?: string;
  customer?: {
    name?: string;
    phone?: string;
    phoneVerified?: boolean;
    userId?: string;
    address?: string;
  };
  paymentMethod: PaymentMethod;
  refSlug?: string;
};

export type PlaceOrderResult =
  | { ok: true; orderNumber: string; total: number; estDelivery: string; paymentId?: string | null }
  | { ok: false; error: string; status: number };

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      return await placeOrderPrisma(input);
    } catch (e) {
      console.warn("[orders] prisma path failed, using JSON store", e);
    }
  }
  return placeOrderJson(input);
}

async function placeOrderJson(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const { items, zone, couponCode, customer, paymentMethod, refSlug } = input;
  if (!Array.isArray(items) || items.length === 0) return { ok: false, error: "empty cart", status: 400 };
  if (zone !== "INSIDE_DHAKA" && zone !== "OUTSIDE_DHAKA") return { ok: false, error: "bad zone", status: 400 };

  const store = readStore();
  let subtotal = 0;
  const priced: Array<{ id: string; qty: number; unit: number; name: string }> = [];

  for (const it of items) {
    const qty = Number(it.qty);
    if (!it.id || !Number.isFinite(qty) || qty < 1) return { ok: false, error: "bad item", status: 400 };
    const p = products.find((x) => x.id === it.id);
    if (!p) return { ok: false, error: "product not found", status: 400 };
    const stock = store.stock[p.id] ?? p.stock;
    if (stock < qty) return { ok: false, error: `Insufficient stock: ${p.name}`, status: 409 };
    const unit = unitPrice(p);
    subtotal += unit * qty;
    priced.push({ id: p.id, qty, unit, name: p.name });
  }

  let discount = 0;
  if (couponCode) {
    const c = await validateCouponAsync(couponCode, subtotal);
    if (!c) return { ok: false, error: "Invalid or expired coupon", status: 400 };
    discount = c.discount;
  }

  const deliveryFee = deliveryFeeFor(zone, subtotal);
  const total = Math.max(0, subtotal - discount + deliveryFee);
  const orderNumber = nextOrderNumber();

  if (paymentMethod !== "COD") {
    const pay = await createPayment(paymentMethod, orderNumber, total, customer?.phone ?? "");
    if (pay?.status === "FAILED") return { ok: false, error: "Payment failed", status: 402 };
  }

  const est = etaDate(zone);
  const order: OrderRow = {
    id: cuidLike("ord_"),
    orderNumber,
    userId: customer?.userId ?? null,
    guestName: customer?.name ?? null,
    guestPhone: customer?.phone ?? null,
    guestAddress: customer?.address ?? null,
    zone,
    deliveryFee,
    subtotal,
    discount,
    total,
    couponCode: couponCode ?? null,
    paymentMethod,
    paymentId: paymentMethod === "COD" ? null : `dry_${orderNumber}`,
    paymentStatus: paymentMethod === "COD" ? "COD" : "DRY_RUN",
    status: "PENDING",
    phoneVerified: paymentMethod === "COD" ? Boolean(customer?.phoneVerified) : true,
    estDelivery: est.toISOString(),
    smsSent: false,
    whatsappSent: false,
    items: priced.map((it) => ({
      id: cuidLike("oi_"),
      productId: it.id,
      quantity: it.qty,
      unitPrice: it.unit,
    })),
    createdAt: new Date().toISOString(),
  };

  const points = pointsForOrder(total);

  updateStore((s) => {
    const stock = { ...s.stock };
    const logs = [...s.inventoryLogs];
    for (const it of priced) {
      stock[it.id] = Math.max(0, (stock[it.id] ?? 0) - it.qty);
      logs.unshift({
        id: `inv_${Date.now()}_${it.id}`,
        productId: it.id,
        change: -it.qty,
        reason: `order:${orderNumber}`,
        createdAt: new Date().toISOString(),
      });
    }
    const coupons = couponCode
      ? s.coupons.map((c) =>
          c.code.toUpperCase() === couponCode.toUpperCase() ? { ...c, usedCount: c.usedCount + 1 } : c,
        )
      : s.coupons;
    const users = customer?.userId
      ? s.users.map((u) =>
          u.id === customer.userId
            ? {
                ...u,
                orderCount: u.orderCount + 1,
                totalSpent: u.totalSpent + total,
                glowPoints: u.glowPoints + points,
                lastOrderAt: new Date().toISOString(),
              }
            : u,
        )
      : s.users;
    return {
      ...s,
      stock,
      inventoryLogs: logs.slice(0, 200),
      coupons,
      users,
      orders: [order, ...s.orders].slice(0, 500),
    };
  });

  if (refSlug) registerConversion(refSlug);

  if (customer?.phone) {
    void sendWhatsApp(
      customer.phone,
      `GLOW order ${orderNumber} received. Total ৳${total}. We'll update you as it moves.`,
    );
  }

  return { ok: true, orderNumber, total, estDelivery: order.estDelivery, paymentId: order.paymentId };
}

async function placeOrderPrisma(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const prisma = getPrisma();
  if (!prisma) throw new Error("no prisma");
  const { items, zone, couponCode, customer, paymentMethod } = input;
  if (!Array.isArray(items) || items.length === 0) return { ok: false, error: "empty cart", status: 400 };

  const dbProducts = (await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.id) } },
  })) as Array<{ id: string; name: string; price: number; stock: number }>;
  const byId = Object.fromEntries(dbProducts.map((p) => [p.id, p]));

  let subtotal = 0;
  for (const it of items) {
    const p = byId[it.id];
    if (!p) return { ok: false, error: "product not found", status: 400 };
    if (p.stock < it.qty) return { ok: false, error: `Insufficient stock: ${p.name}`, status: 409 };
    subtotal += p.price * it.qty;
  }

  let discount = 0;
  if (couponCode) {
    const c = await validateCouponAsync(couponCode, subtotal);
    if (!c) return { ok: false, error: "Invalid or expired coupon", status: 400 };
    discount = c.discount;
  }

  const deliveryFee = deliveryFeeFor(zone, subtotal);
  const total = subtotal - discount + deliveryFee;
  const orderNumber = nextOrderNumber();

  if (paymentMethod !== "COD") {
    const pay = await createPayment(paymentMethod, orderNumber, total, customer?.phone ?? "");
    if (pay?.status === "FAILED") return { ok: false, error: "Payment failed", status: 402 };
  }

  const est = etaDate(zone);
  const order = (await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        orderNumber,
        zone,
        deliveryFee,
        subtotal,
        discount,
        total,
        couponCode: couponCode ?? null,
        paymentMethod,
        guestName: customer?.name ?? null,
        guestPhone: customer?.phone ?? null,
        guestAddress: customer?.address ?? null,
        userId: customer?.userId ?? null,
        phoneVerified: paymentMethod === "COD" ? Boolean(customer?.phoneVerified) : true,
        estDelivery: est,
        items: {
          create: items.map((it) => ({ productId: it.id, quantity: it.qty, unitPrice: byId[it.id].price })),
        },
      },
    });

    for (const it of items) {
      await tx.product.update({ where: { id: it.id }, data: { stock: { decrement: it.qty } } });
      await tx.inventoryLog.create({ data: { productId: it.id, change: -it.qty, reason: `order:${orderNumber}` } });
    }
    if (couponCode) await tx.coupon.update({ where: { code: couponCode }, data: { usedCount: { increment: 1 } } });
    if (customer?.userId) {
      await tx.user.update({
        where: { id: customer.userId },
        data: {
          orderCount: { increment: 1 },
          totalSpent: { increment: total },
          glowPoints: { increment: pointsForOrder(total) },
          lastOrderAt: new Date(),
        },
      });
    }
    return created;
  })) as { estDelivery?: Date };

  if (input.refSlug) registerConversion(input.refSlug);
  return { ok: true, orderNumber, total, estDelivery: (order.estDelivery ?? est).toISOString() };
}

export function listOrders() {
  return readStore().orders;
}

export function getOrderByNumber(orderNumber: string): OrderRow | null {
  return readStore().orders.find((o) => o.orderNumber === orderNumber || o.id === orderNumber) ?? null;
}

export function ordersFor(filter: { phone?: string; userId?: string }) {
  return readStore().orders.filter((o) => {
    if (filter.userId && o.userId === filter.userId) return true;
    if (filter.phone && o.guestPhone === filter.phone) return true;
    return false;
  });
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const current = getOrderByNumber(id);
  if (!current) return null;

  const prisma = getPrisma();
  if (prisma) {
    try {
      await prisma.order.update({ where: { id: current.id }, data: { status } });
    } catch {
      /* JSON still authoritative in this sandbox */
    }
  }

  let whatsappSent = current.whatsappSent;
  const phone = current.guestPhone;
  if (phone && STATUS_MSG[status]) {
    const sent = await sendWhatsApp(phone, `${STATUS_MSG[status]} Order ${current.orderNumber}.`);
    if (sent) whatsappSent = true;
    else console.log(`[WA dry-run] status ${status} for ${current.orderNumber} → ${phone}`);
  }

  updateStore((s) => ({
    ...s,
    orders: s.orders.map((o) =>
      o.id === current.id || o.orderNumber === id ? { ...o, status, whatsappSent } : o,
    ),
  }));

  return getOrderByNumber(current.orderNumber);
}

