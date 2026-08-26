import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SiteImage from "@/components/SiteImage";

export default function FinalCta() {
  const t = useTranslations("cta");

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="film-grain absolute inset-0">
        <SiteImage id="PHOTO_CTA" alt={t("title")} fill sizes="100vw" />
      </div>
      <div className="relative z-10 px-6 text-center">
        <h2 className="font-display text-4xl font-bold leading-tight sm:text-6xl md:text-7xl">
          {t("title")}
        </h2>
        <p className="mt-6 text-sm text-ink/80 sm:text-base">{t("languages")}</p>
        <Link href="/contact" className="btn-pill mt-10">
          {t("button")}
        </Link>
      </div>
    </section>
  );
}
