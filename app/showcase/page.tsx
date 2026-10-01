import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import ShowcaseDemoClient from "@/components/showcase/ShowcaseDemoClient";

export const metadata: Metadata = {
  title: "Product Showcase Template | Rebel SLS",
  description:
    "Duotone Rebel SLS–style product showcase with editable watermark text and silhouette drop shadow.",
  robots: { index: false, follow: false },
};

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-showcase-condensed",
  display: "swap",
});

/**
 * Standalone showcase route (no site header/footer).
 * Visit /showcase — props/controls let you swap product image + watermark text.
 */
export default function ShowcasePage() {
  return (
    <div className={barlowCondensed.variable}>
      <ShowcaseDemoClient />
    </div>
  );
}
