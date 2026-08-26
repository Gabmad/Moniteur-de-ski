import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type StaticPathname } from "@/i18n/routing";
import { site } from "@/lib/site";

const routes: StaticPathname[] = [
  "/",
  "/about",
  "/portfolio",
  "/projects",
  "/shop",
  "/blog",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: `${site.url}${getPathname({ locale, href })}`,
      lastModified: new Date(),
      changeFrequency: href === "/" ? "weekly" : "monthly",
      priority: href === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((code) => [
            code,
            `${site.url}${getPathname({ locale: code, href })}`,
          ])
        ),
      },
    }))
  );
}
