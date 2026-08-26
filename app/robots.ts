import type { MetadataRoute } from "next";
import { businessInfo } from "@/lib/i18n/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/admin"],
    },
    sitemap: `${businessInfo.url}/sitemap.xml`,
  };
}
