"use client";

import { useQuiz } from "@/context/QuizContext";
import { useLang } from "@/context/LangContext";
import { concerns } from "@/data/categories";
import Link from "next/link";

export default function SolutionsPage() {
  const { setOpen } = useQuiz();
  const { lang, t } = useLang();
  return (
    <div className="container-page py-10">
      <div className="kicker">{t("shopConcern")}</div>
      <h1 className="font-display text-5xl mt-2">{lang === "bn" ? "সমাধান" : "Solutions"}</h1>
      <p className="max-w-xl text-off-black/70 mt-3">{lang === "bn" ? "ভুল প্রোডাক্ট নয় — ভুল মিল।" : "Not a wrong product — a wrong match."}</p>
      <button type="button" className="btn-primary mt-4" onClick={() => setOpen(true)}>{t("startQuiz")}</button>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {concerns.map((c) => (
          <Link key={c.id} href={`/category/skincare?concern=${c.id}`} className="text-center">
            <img src={c.image} alt="" className="w-full aspect-square object-cover rounded-full" />
            <h3 className="font-display text-xl mt-2">{lang === "bn" ? c.nameBn : c.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
