import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Space_Grotesk, Unbounded } from "next/font/google";
import { routing, isValidLocale } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WhatsAppProvider } from "@/components/whatsapp/WhatsAppProvider";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["400", "500", "700", "900"],
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["400", "500", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gabriel Madie",
    jobTitle: "Photographe",
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}/photos/PHOTO_HERO.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Annecy",
      addressRegion: "Haute-Savoie",
      addressCountry: "FR",
    },
    knowsLanguage: ["fr", "en", "pt"],
    sameAs: [site.instagram],
  };

  return (
    <html
      lang={locale}
      className={`${unbounded.variable} ${space.variable}`}
    >
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <WhatsAppProvider>
            <JsonLd data={jsonLd} />
            <Header />
            <main id="content">{children}</main>
            <Footer />
          </WhatsAppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
