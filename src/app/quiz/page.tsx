"use client";

import { useEffect } from "react";
import { useQuiz } from "@/context/QuizContext";
import { useLang } from "@/context/LangContext";

export default function QuizPage() {
  const { setOpen } = useQuiz();
  const { t } = useLang();
  useEffect(() => {
    setOpen(true);
  }, [setOpen]);
  return (
    <div className="container-page py-16">
      <div className="kicker">AM · PM</div>
      <h1 className="font-display text-5xl mt-2">{t("quizTitle")}</h1>
      <button type="button" className="btn-primary mt-6" onClick={() => setOpen(true)}>{t("startQuiz")}</button>
    </div>
  );
}
