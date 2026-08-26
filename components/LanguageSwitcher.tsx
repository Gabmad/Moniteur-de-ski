"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";

export default function LanguageSwitcher({
  inverted = false,
}: {
  inverted?: boolean;
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  function switchTo(code: Locale) {
    const href = pathname.includes("[")
      ? { pathname, params }
      : pathname;
    router.replace(
      // Dynamic routes need params; next-intl types this per-pathname.
      href as never,
      { locale: code }
    );
  }

  return (
    <nav
      className="flex items-center gap-2"
      aria-label="Language"
    >
      {locales.map((code, index) => {
        const active = code === locale;
        return (
          <span key={code} className="flex items-center gap-2">
            {index > 0 && (
              <span
                className={inverted ? "text-white/30" : "text-mist"}
                aria-hidden
              >
                /
              </span>
            )}
            <button
              type="button"
              onClick={() => switchTo(code)}
              className={`text-[11px] uppercase tracking-[0.12em] transition ${
                active
                  ? inverted
                    ? "text-white"
                    : "text-ink"
                  : inverted
                    ? "text-white/55 hover:text-white"
                    : "text-mist hover:text-ink"
              }`}
              aria-current={active ? "true" : undefined}
              title={localeNames[code]}
            >
              {code}
            </button>
          </span>
        );
      })}
    </nav>
  );
}
