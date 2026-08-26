import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Intro from "@/components/home/Intro";
import Services from "@/components/home/Services";
import Stations from "@/components/home/Stations";
import CtaBanner from "@/components/home/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { isValidLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import {
  buildFaqJsonLd,
  buildLocalBusinessJsonLd,
  buildPageMetadata,
} from "@/lib/seo/metadata";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildPageMetadata(locale, "home", dict);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const jsonLd = buildLocalBusinessJsonLd(locale, dict);

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={buildFaqJsonLd(dict.home.faq.items)} />
      <Hero locale={locale} dict={dict} />
      <Stats dict={dict} />
      <Intro locale={locale} dict={dict} />
      <Services locale={locale} dict={dict} />
      <Stations locale={locale} dict={dict} />
      <Faq title={dict.home.faq.title} items={dict.home.faq.items} />
      <CtaBanner locale={locale} dict={dict} />
    </>
  );
}
