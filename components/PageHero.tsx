import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { photos } from "@/lib/photos";

interface PageHeroProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({
  locale,
  eyebrow,
  title,
  subtitle,
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden md:min-h-[60vh]">
      <Image
        src={photos.pageHero.src}
        alt={photos.pageHero.alt[locale]}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-ink/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />

      <div className="container-narrow relative z-10 pb-16 pt-32 text-center md:pb-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl font-normal text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <div className="gold-rule mt-7" />
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-white/75">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
