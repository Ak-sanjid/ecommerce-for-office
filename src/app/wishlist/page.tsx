"use client";

import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { ProductCard } from "@/components/product/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const { t } = useLang();
  const list = products.filter((p) => wishlist.includes(p.id));
  return (
    <div className="container-page py-10">
      <div className="kicker">{t("wishlist")}</div>
      <h1 className="font-display text-5xl mt-2 mb-6">{t("wishlist")}</h1>
      {list.length === 0 ? (
        <p>{t("emptyCart")}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((p) => (
            <div key={p.id} className="[&>article]:w-full"><ProductCard product={p} /></div>
          ))}
        </div>
      )}
    </div>
  );
}
