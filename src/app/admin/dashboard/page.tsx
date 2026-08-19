"use client";

export default function AdminDashboard() {
  return (
    <div className="container-page py-10">
      <div className="kicker">Admin</div>
      <h1 className="font-display text-5xl mt-2">Navigation, banners, inventory</h1>
      <p className="max-w-xl mt-4 text-off-black/70">
        This shell is ready for inventory, repeat-customer tracking, coupon/flash scheduling, abandoned-cart recovery, and pixel hooks. Header layout A/B is already toggleable from the promo strip (Layout).
      </p>
      <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
        {["Inventory", "Repeat customers", "Nav reorder", "Homepage rows", "Coupons / flash", "Abandoned cart", "FB / TikTok / GA4", "Referral links"].map((x) => (
          <li key={x} className="border border-gold/25 bg-white p-4">{x}</li>
        ))}
      </ul>
    </div>
  );
}
