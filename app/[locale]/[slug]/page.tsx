import { notFound } from "next/navigation";
import {
  isValidLocale,
  locales,
  getRouteKeyFromSlug,
  getLocalizedPath,
  isStationRoute,
  allRoutes,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import SkiPage from "@/components/pages/SkiPage";
import TouringPage from "@/components/pages/TouringPage";
import StationPage from "@/components/pages/StationPage";
import PhotoPage from "@/components/pages/PhotoPage";
import ContactPage from "@/components/pages/ContactPage";
import AboutPage from "@/components/pages/AboutPage";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const routeKey of allRoutes) {
      if (routeKey === "home") continue;
      params.push({
        locale,
        slug: getLocalizedPath(locale, routeKey).split("/").pop()!,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const routeKey = getRouteKeyFromSlug(locale, slug);
  if (!routeKey) return {};

  const dict = await getDictionary(locale);
  return buildPageMetadata(locale, routeKey, dict);
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const routeKey = getRouteKeyFromSlug(locale, slug);
  if (!routeKey || routeKey === "home") {
    notFound();
  }

  const dict = await getDictionary(locale);

  if (routeKey === "skiLessons") {
    return <SkiPage locale={locale} dict={dict} />;
  }
  if (routeKey === "touring") {
    return <TouringPage locale={locale} dict={dict} />;
  }
  if (isStationRoute(routeKey)) {
    return <StationPage locale={locale} dict={dict} station={routeKey} />;
  }
  if (routeKey === "photography") {
    return <PhotoPage locale={locale} dict={dict} />;
  }
  if (routeKey === "contact") {
    return <ContactPage locale={locale} dict={dict} />;
  }
  return <AboutPage locale={locale} dict={dict} />;
}
