import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="site-pad mx-auto flex max-w-site flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left">
        <p className="font-display text-xs font-bold uppercase tracking-[0.12em]">
          Gabriel Madie | Photographe
        </p>
        <div className="flex flex-col items-center gap-3 md:items-end">
          <div className="flex items-center gap-6 text-sm">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {t("instagram")}
            </a>
            <a href={`mailto:${site.email}`} className="hover:underline">
              {site.email}
            </a>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
