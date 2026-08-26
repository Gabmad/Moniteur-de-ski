import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LangSetter from "@/components/LangSetter";
import { WhatsAppProvider } from "@/components/whatsapp/WhatsAppProvider";
import { locales, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <WhatsAppProvider dict={dict.whatsapp}>
      <LangSetter locale={locale} />
      <Header locale={locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={locale} dict={dict} />
    </WhatsAppProvider>
  );
}
