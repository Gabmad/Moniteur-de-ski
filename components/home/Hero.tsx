import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SiteImage from "@/components/SiteImage";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="film-grain absolute inset-0">
        <SiteImage
          id="PHOTO_HERO"
          alt={t("title")}
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pb-16 pt-28 text-center">
        <h1 className="font-display text-[12vw] font-black uppercase leading-[0.9] tracking-tight text-ink sm:text-7xl md:text-8xl lg:text-9xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-xl text-[15px] font-medium leading-relaxed text-ink sm:text-lg">
          {t("subtitle")}
        </p>
        <ul className="mt-16 flex flex-col items-center gap-2.5 text-[15px] text-ink/85 sm:mt-20">
          <li>
            <Link href={{ pathname: "/portfolio/[category]", params: { category: "snow" } }}>
              {t("tags.snow")}
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "/portfolio/[category]", params: { category: "water" } }}>
              {t("tags.water")}
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "/portfolio/[category]", params: { category: "life" } }}>
              {t("tags.bike")}
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "/portfolio/[category]", params: { category: "trail" } }}>
              {t("tags.trail")}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
