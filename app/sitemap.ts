import type { MetadataRoute } from "next";
import {
  businessInfo,
  getLocalizedPath,
  locales,
  allRoutes,
} from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const routeKey of allRoutes) {
    for (const locale of locales) {
      entries.push({
        url: `${businessInfo.url}${getLocalizedPath(locale, routeKey)}`,
        lastModified: new Date(),
        changeFrequency: routeKey === "home" ? "weekly" : "monthly",
        priority:
          routeKey === "home"
            ? 1
            : routeKey === "skiLessons" || routeKey === "touring"
              ? 0.9
              : routeKey === "courchevel" ||
                  routeKey === "meribel" ||
                  routeKey === "valThorens"
                ? 0.85
                : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${businessInfo.url}${getLocalizedPath(l, routeKey)}`,
            ])
          ),
        },
      });
    }
  }

  return entries;
}
