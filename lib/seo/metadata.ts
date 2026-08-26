import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type StaticPathname } from "@/i18n/routing";
import { site } from "@/lib/site";

const ogLocale = {
  fr: "fr_FR",
  en: "en_GB",
  pt: "pt_PT",
} as const;

type MetaKey =
  | "home"
  | "about"
  | "portfolio"
  | "projects"
  | "shop"
  | "blog"
  | "contact"
  | "cart";

export async function buildMetadata(
  locale: string,
  pathname: StaticPathname,
  metaKey: MetaKey
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(`${metaKey}.title`);
  const description = t(`${metaKey}.description`);

  const languages = Object.fromEntries(
    routing.locales.map((code) => [
      code,
      `${site.url}${getPathname({ locale: code, href: pathname })}`,
    ])
  );

  const canonical = `${site.url}${getPathname({ locale, href: pathname })}`;

  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": `${site.url}${getPathname({ locale: "fr", href: pathname })}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: ogLocale[locale as keyof typeof ogLocale] ?? "fr_FR",
      type: "website",
      images: [{ url: "/photos/PHOTO_HERO.png", alt: title }],
    },
  };
}
