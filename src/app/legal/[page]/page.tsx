"use client";

import { useParams } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { loc } from "@/lib/utils";

const copy: Record<string, { title: { en: string; bn: string }; body: { en: string[]; bn: string[] } }> = {
  returns: {
    title: { en: "Returns, refunds & exchange", bn: "রিটার্ন, রিফান্ড ও এক্সচেঞ্জ" },
    body: {
      en: [
        "Unopened products may be exchanged within 7 days of delivery if the seal, batch and box are intact.",
        "Opened hygiene goods are not returnable unless they arrived damaged or were not as described.",
        "Refunds go back through the original rail — bKash, Nagad, Rocket or cash-on-collection. 5–10 working days.",
      ],
      bn: [
        "সিল, ব্যাচ ও বক্স ঠিক থাকলে ডেলিভারির ৭ দিনের মধ্যে না-খোলা প্রোডাক্ট এক্সচেঞ্জ করা যায়।",
        "খোলা হাইজিন পণ্য ফেরত যায় না — ক্ষতিগ্রস্ত বা ভুল আইটেম ছাড়া।",
        "রিফান্ড আসল মাধ্যমেই — বিকাশ, নগদ, রকেট। ৫–১০ কর্মদিবস।",
      ],
    },
  },
  terms: {
    title: { en: "Terms & conditions", bn: "শর্তাবলী" },
    body: {
      en: [
        "Prices are in Bangladeshi Taka. The price at checkout is the price you pay.",
        "GLOW sells authentic goods sourced through official or authorised channels.",
        "Guest checkout is allowed. Creating an account is optional and earns Glow Points.",
      ],
      bn: [
        "দাম বাংলাদেশি টাকায়। চেকআউটের দামই আপনি দেবেন।",
        "গ্লো অফিসিয়াল বা অনুমোদিত চ্যানেলের অথেন্টিক পণ্য বেচে।",
        "গেস্ট চেকআউট চালু। অ্যাকাউন্ট ঐচ্ছিক, তাতে গ্লো পয়েন্ট মেলে।",
      ],
    },
  },
  privacy: {
    title: { en: "Privacy policy", bn: "গোপনীয়তা নীতি" },
    body: {
      en: [
        "We keep the minimum: name, phone, address, and what you asked the desk. We do not sell lists.",
        "Facebook, TikTok and GA4 pixels fire only after consent via the analytics hooks.",
        "WhatsApp restock alerts use the number you typed, nothing else.",
      ],
      bn: [
        "আমরা ন্যূনতম রাখি: নাম, ফোন, ঠিকানা। তালিকা বেচি না।",
        "ফেসবুক, টিকটক ও জিএ৪ পিক্সেল আপনার সম্মতির পরই।",
        "হোয়াটসঅ্যাপ স্টক অ্যালার্ট শুধু আপনার দেওয়া নম্বরে যায়।",
      ],
    },
  },
};

export default function LegalPage() {
  const { page = "terms" } = useParams<{ page: string }>();
  const { lang } = useLang();
  const data = copy[page] ?? copy.terms;
  return (
    <div className="container-page py-10 max-w-2xl">
      <h1 className="font-display text-5xl mb-6">{loc(data.title.en, data.title.bn, lang)}</h1>
      {data.body[lang].map((p) => (
        <p key={p} className="text-off-black/70 mb-3">{p}</p>
      ))}
    </div>
  );
}
