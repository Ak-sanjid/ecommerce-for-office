"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const QuizContext = createContext<{ open: boolean; setOpen: (v: boolean) => void } | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <QuizContext.Provider value={{ open, setOpen }}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz");
  return ctx;
}
