"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { LangProvider } from "@/context/LangContext";
import { QuizProvider } from "@/context/QuizContext";
import { ThemeProvider } from "@/context/ThemeContext";

import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>
        <AuthProvider>
          <CartProvider>
            <QuizProvider>{children}</QuizProvider>
          </CartProvider>
        </AuthProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
