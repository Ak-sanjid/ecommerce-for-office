"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";

type OrderLite = { orderNumber: string; total: number; status: string; createdAt: string };

export default function AccountPage() {
  const { user, setAccountOpen } = useAuth();
  const { t, lang } = useLang();
  const [orders, setOrders] = useState<OrderLite[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = user.id ? `userId=${user.id}` : user.phone ? `phone=${encodeURIComponent(user.phone)}` : "";
    if (!q) return;
    fetch(`/api/orders?${q}`)
      .then((r) => r.json())
      .then((j: { orders?: OrderLite[] }) => setOrders(j.orders ?? []))
      .catch(() => undefined);
  }, [user]);

  return (
    <div className="container-page py-12">
      <div className="kicker">{t("account")}</div>
      <h1 className="font-display text-5xl mt-2">{user ? user.name : t("helloGuest")}</h1>
      {user ? (
        <>
          <p className="mt-4">
            {t("glowPoints")}: {user.glowPoints}
          </p>
          <h2 className="mt-8 font-display text-2xl">{lang === "bn" ? "অর্ডার" : "Orders"}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {orders.length === 0 && <li className="text-off-black/40">{lang === "bn" ? "এখনো অর্ডার নেই।" : "No orders yet."}</li>}
            {orders.map((o) => (
              <li key={o.orderNumber} className="flex justify-between rounded-xl border border-gold/15 bg-white px-3 py-2">
                <span>
                  <a className="text-gold-dark underline" href={`/track?order=${o.orderNumber}`}>
                    {o.orderNumber}
                  </a>{" "}
                  · {o.status}
                </span>
                <span>৳{o.total}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <button type="button" className="btn-primary mt-6" onClick={() => setAccountOpen(true)}>
          {t("enter")}
        </button>
      )}
    </div>
  );
}
