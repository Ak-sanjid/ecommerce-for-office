"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { LangProvider } from "@/context/LangContext";
import { QuizProvider } from "@/context/QuizContext";

import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <AuthProvider>
        <CartProvider>
          <QuizProvider>{children}</QuizProvider>
        </CartProvider>
      </AuthProvider>
    </LangProvider>
  );
}
