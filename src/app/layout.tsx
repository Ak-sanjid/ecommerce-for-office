import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/shared/Footer";
import { AIChatBubble } from "@/components/chat/AIChatBubble";
import { CartSlideOut } from "@/components/cart/CartSlideOut";
import { AccountModal } from "@/components/header/AccountModal";
import { SkinQuiz } from "@/components/home/SkinQuiz";

export const metadata: Metadata = {
  metadataBase: new URL("https://glowbeauty.com.bd"),
  title: {
    default: "GLOW — Premium Beauty & Personal Care | Bangladesh",
    template: "%s | GLOW",
  },
  description:
    "Shop authentic K-Beauty, J-Beauty, and international skincare, haircare, makeup, and grooming in Bangladesh. 100% genuine, cash on delivery.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "GLOW", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBF8F3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-body">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Hind+Siliguri:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-cream text-off-black antialiased">
        <Providers>
          <Header />
          <main className="min-h-screen pt-[208px] lg:pt-[268px]">{children}</main>
          <Footer />
          <CartSlideOut />
          <AccountModal />
          <SkinQuiz />
          <AIChatBubble />
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}))}`,
          }}
        />
      </body>
    </html>
  );
}
