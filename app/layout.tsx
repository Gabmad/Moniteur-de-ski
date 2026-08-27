import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { defaultLocale, isValidLocale } from "@/lib/i18n/config";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.3vallees-ski-snowboard.com"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const localeHeader = headers().get("x-locale");
  const locale =
    localeHeader && isValidLocale(localeHeader) ? localeHeader : defaultLocale;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${montserrat.variable} ${cormorant.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
