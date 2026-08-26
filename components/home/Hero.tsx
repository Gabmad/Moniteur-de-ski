import Image from "next/image";
import Link from "next/link";
import { type Locale, getLocalizedPath, localeNames } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { photos } from "@/lib/photos";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Hero({ locale, dict }: HeroProps) {
  const { hero } = dict.home;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src={photos.hero.src}
        alt={photos.hero.alt[locale]}
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />

      <div className="container-narrow relative z-10 flex flex-col items-center px-6 pt-20 text-center">
        <p className="eyebrow text-gold">{hero.eyebrow}</p>
        <h1 className="mt-6 max-w-4xl font-serif text-4xl font-normal leading-[1.15] text-white sm:text-6xl md:text-7xl">
          {hero.title}
        </h1>
        <div className="gold-rule mt-8" />
        <p className="mt-8 max-w-2xl text-[15px] font-light leading-relaxed text-white/80 sm:text-base">
          {hero.subtitle}
        </p>

        <p className="mt-6 text-[11px] font-medium uppercase tracking-luxury text-white/50">
          {hero.languages}{" "}
          <span className="text-gold">
            {localeNames.fr} · {localeNames.en} · {localeNames.pt}
          </span>
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link href={getLocalizedPath(locale, "contact")} className="btn-primary">
            {hero.cta}
          </Link>
          <Link
            href={getLocalizedPath(locale, "photography")}
            className="btn-outline"
          >
            {hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
