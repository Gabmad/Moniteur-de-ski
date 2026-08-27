import type { Metadata } from "next";
import type { Locale, RouteKey } from "@/lib/i18n/config";
import { businessInfo, getAlternatePaths, getLocalizedPath } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const ogImage = "/images/hero.jpg";

export function buildPageMetadata(
  locale: Locale,
  routeKey: RouteKey,
  dict: Dictionary
): Metadata {
  const meta = dict.meta[routeKey];
  const alternates = getAlternatePaths(routeKey);
  const url = `${businessInfo.url}${alternates[locale]}`;
  const ogLocale =
    locale === "fr" ? "fr_FR" : locale === "en" ? "en_GB" : "pt_PT";

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: url,
      languages: {
        fr: `${businessInfo.url}${alternates.fr}`,
        en: `${businessInfo.url}${alternates.en}`,
        pt: `${businessInfo.url}${alternates.pt}`,
        "x-default": `${businessInfo.url}${alternates.fr}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: ogLocale,
      alternateLocale: ["fr_FR", "en_GB", "pt_PT"].filter((l) => l !== ogLocale),
      type: "website",
      url,
      siteName: businessInfo.name,
      images: [
        {
          url: ogImage,
          width: 1600,
          height: 1067,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}

export function buildFaqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${businessInfo.url}${item.url}`,
    })),
  };
}

export function buildLocalBusinessJsonLd(locale: Locale, dict: Dictionary) {
  const areaServed = businessInfo.areasServed.map((name) => {
    const geo = businessInfo.geo[name];
    return {
      "@type": "SkiResort" as const,
      name,
      geo: {
        "@type": "GeoCoordinates",
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
      containedInPlace: {
        "@type": "Place",
        name: "Les Trois Vallées",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Savoie",
          addressCountry: "FR",
        },
      },
    };
  });

  const catalogName =
    locale === "fr"
      ? "Cours de ski, snowboard, ski de randonnée, splitboard et photographie"
      : locale === "en"
        ? "Ski and snowboard lessons, ski touring, splitboard and photography"
        : "Aulas de esqui, snowboard, ski touring, splitboard e fotografia";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "SportsActivityLocation"],
        "@id": `${businessInfo.url}/#business`,
        name: businessInfo.name,
        alternateName: "Private Teaching",
        description: dict.meta.home.description,
        url: businessInfo.url,
        telephone: businessInfo.phone,
        email: businessInfo.email,
        image: `${businessInfo.url}${ogImage}`,
        priceRange: "€€€",
        currenciesAccepted: "EUR",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Courchevel",
          addressRegion: "Savoie",
          addressCountry: "FR",
        },
        areaServed,
        knowsLanguage: ["French", "English", "Portuguese"],
        availableLanguage: ["fr", "en", "pt"],
        knowsAbout: [
          "Moniteur de ski Val Thorens",
          "Moniteur de ski lusophone",
          "Private ski instructor Courchevel",
          "Ski touring and splitboard",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: catalogName,
          itemListElement: [
            {
              "@type": "Offer",
              price: "550",
              priceCurrency: "EUR",
              url: `${businessInfo.url}${getLocalizedPath(locale, "skiLessons")}`,
              itemOffered: {
                "@type": "Service",
                name: dict.home.services.ski.title,
                serviceType: "Private ski and snowboard instruction",
                areaServed: businessInfo.areasServed,
              },
            },
            {
              "@type": "Offer",
              price: "550",
              priceCurrency: "EUR",
              url: `${businessInfo.url}${getLocalizedPath(locale, "touring")}`,
              itemOffered: {
                "@type": "Service",
                name: dict.home.services.touring.title,
                serviceType: "Ski touring and splitboard guiding",
                areaServed: businessInfo.areasServed,
              },
            },
            {
              "@type": "Offer",
              price: "550",
              priceCurrency: "EUR",
              url: `${businessInfo.url}${getLocalizedPath(locale, "skiLessons")}`,
              itemOffered: {
                "@type": "Service",
                name: dict.home.services.guide.title,
                serviceType: "On-piste and off-piste mountain guiding",
                areaServed: businessInfo.areasServed,
              },
            },
            {
              "@type": "Offer",
              price: "230",
              priceCurrency: "EUR",
              url: `${businessInfo.url}${getLocalizedPath(locale, "photography")}`,
              itemOffered: {
                "@type": "Service",
                name: dict.nav.photography,
                serviceType: "Mountain photography",
              },
            },
          ],
        },
      },
      {
        "@type": "Person",
        "@id": `${businessInfo.url}/#instructor`,
        name:
          locale === "fr"
            ? "Moniteur de ski indépendant"
            : locale === "en"
              ? "Independent ski instructor"
              : "Instrutor de esqui independente",
        jobTitle:
          locale === "fr"
            ? "Moniteur de ski, snowboard, ski de randonnée et splitboard diplômé d'État, photographe"
            : locale === "en"
              ? "French State-certified ski, snowboard, ski touring and splitboard instructor, photographer"
              : "Instrutor de esqui, snowboard, ski touring e splitboard com Diploma de Estado, fotógrafo",
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name:
            locale === "fr"
              ? "Diplôme d'État de moniteur de ski"
              : locale === "en"
                ? "French State Diploma of Ski Instructor (Diplôme d'État)"
                : "Diploma de Estado francês de moniteur de ski",
          credentialCategory: "diploma",
          recognizedBy: {
            "@type": "Organization",
            name: "Ministère des Sports — République française",
          },
        },
        knowsLanguage: ["fr", "en", "pt"],
        worksFor: { "@id": `${businessInfo.url}/#business` },
        areaServed: businessInfo.areasServed,
      },
    ],
  };
}
