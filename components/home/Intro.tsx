import Image from "next/image";
import Link from "next/link";
import { type Locale, getLocalizedPath } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { photos } from "@/lib/photos";

interface IntroProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Intro({ locale, dict }: IntroProps) {
  const { intro } = dict.home;

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-narrow">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">{dict.home.hero.eyebrow}</p>
            <h2 className="section-title mt-4">{intro.title}</h2>
            <div className="gold-rule mx-0 mt-6" />
            <p className="mt-8 text-[11px] font-medium uppercase tracking-luxury text-gold">
              {intro.diploma}
            </p>
            <p className="prose-luxury mt-6">{intro.text}</p>
            <p className="prose-luxury mt-5">{intro.text2}</p>
            <Link
              href={getLocalizedPath(locale, "about")}
              className="btn-ghost mt-10"
            >
              {dict.common.learnMore}
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {photos.portraits.map((portrait) => (
              <div
                key={portrait.src}
                className="relative aspect-[2/3] overflow-hidden"
              >
                <Image
                  src={portrait.src}
                  alt={portrait.alt[locale]}
                  fill
                  sizes="(max-width: 1024px) 30vw, 15vw"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
