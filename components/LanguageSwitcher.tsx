"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type Locale,
  locales,
  localeNames,
  getRouteKeyFromSlug,
  getLocalizedPath,
} from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  variant?: "light" | "dark";
}

export default function LanguageSwitcher({
  currentLocale,
  variant = "light",
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  function getHrefForLocale(targetLocale: Locale): string {
    const segments = pathname.split("/").filter(Boolean);
    const localeSegment = segments[0];

    if (!locales.includes(localeSegment as Locale)) {
      return getLocalizedPath(targetLocale, "home");
    }

    const slug = segments.slice(1).join("/");
    const routeKey = slug
      ? getRouteKeyFromSlug(currentLocale, slug)
      : "home";

    if (!routeKey) {
      return getLocalizedPath(targetLocale, "home");
    }

    return getLocalizedPath(targetLocale, routeKey);
  }

  const isLight = variant === "light";

  return (
    <div
      className="flex items-center gap-2.5"
      role="navigation"
      aria-label="Language selector"
    >
      {locales.map((locale, index) => {
        const isActive = locale === currentLocale;
        return (
          <span key={locale} className="flex items-center gap-2.5">
            {index > 0 && (
              <span
                className={`text-[10px] ${isLight ? "text-white/30" : "text-ink/20"}`}
                aria-hidden="true"
              >
                /
              </span>
            )}
            <Link
              href={getHrefForLocale(locale)}
              hrefLang={locale}
              className={`text-[11px] font-medium uppercase tracking-wide transition ${
                isActive
                  ? "text-gold"
                  : isLight
                    ? "text-white/70 hover:text-white"
                    : "text-ink-muted hover:text-ink"
              }`}
              aria-current={isActive ? "page" : undefined}
              title={localeNames[locale]}
            >
              {locale}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
