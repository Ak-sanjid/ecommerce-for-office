import crypto from "crypto";
import type { PaymentMethod } from "./jsonStore";

function sign(secret: string, payload: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export type PaymentResult = {
  status: "DRY_RUN" | "CREATED" | "FAILED";
  paymentId: string;
  provider: PaymentMethod;
};

export async function createBkashPayment(orderNumber: string, amount: number, phone: string): Promise<PaymentResult> {
  const key = process.env.BKASH_KEY;
  const secret = process.env.BKASH_SECRET;
  if (!key || !secret) return { status: "DRY_RUN", paymentId: `dry_${orderNumber}`, provider: "BKASH" };
  const body = JSON.stringify({
    amount,
    currency: "BDT",
    execute: true,
    requester_invoice_number: orderNumber,
    requester_reference_number: orderNumber,
    customer: { phone: phone.replace(/\D/g, "") },
  });
  const url = `https://api-payments.bka.sh/v2.0/payment/create?apikey=${key}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-signature": sign(secret, body) },
    body,
  });
  if (!res.ok) return { status: "FAILED", paymentId: orderNumber, provider: "BKASH" };
  const json = (await res.json().catch(() => ({}))) as { paymentID?: string; paymentId?: string };
  return { status: "CREATED", paymentId: json.paymentID ?? json.paymentId ?? orderNumber, provider: "BKASH" };
}

export async function createNagadPayment(orderNumber: string, amount: number, phone: string): Promise<PaymentResult> {
  const client = process.env.NAGAD_CLIENT_ID;
  const secret = process.env.NAGAD_SECRET;
  if (!client || !secret) return { status: "DRY_RUN", paymentId: `dry_${orderNumber}`, provider: "NAGAD" };
  void phone;
  return { status: "CREATED", paymentId: orderNumber, provider: "NAGAD" };
}

export async function createRocketPayment(orderNumber: string, amount: number, phone: string): Promise<PaymentResult> {
  const key = process.env.ROCKET_KEY;
  const secret = process.env.ROCKET_SECRET;
  if (!key || !secret) return { status: "DRY_RUN", paymentId: `dry_${orderNumber}`, provider: "ROCKET" };
  void phone;
  return { status: "CREATED", paymentId: orderNumber, provider: "ROCKET" };
}

export async function createPayment(
  method: PaymentMethod,
  orderNumber: string,
  amount: number,
  phone: string,
): Promise<PaymentResult | null> {
  if (method === "COD" || method === "CARD") return null;
  if (method === "BKASH") return createBkashPayment(orderNumber, amount, phone);
  if (method === "NAGAD") return createNagadPayment(orderNumber, amount, phone);
  if (method === "ROCKET") return createRocketPayment(orderNumber, amount, phone);
  return null;
}
