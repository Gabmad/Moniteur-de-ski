import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import PageHero from "@/components/PageHero";
import { photos } from "@/lib/photos";
import Image from "next/image";
import BookingWidget from "@/components/booking/BookingWidget";

interface AboutPageProps {
  locale: Locale;
  dict: Dictionary;
}

export default function AboutPage({ locale, dict }: AboutPageProps) {
  const page = dict.aboutPage;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
      />

      <section className="bg-cream py-24 md:py-32">
        <div className="container-narrow">
          <p className="mx-auto max-w-2xl text-center text-[11px] font-medium uppercase tracking-luxury text-gold">
            {dict.home.intro.diploma}
          </p>
          <p className="prose-luxury mx-auto mt-8 max-w-2xl text-center">
            {dict.home.intro.text}
          </p>
          <p className="prose-luxury mx-auto mt-5 max-w-2xl text-center">
            {dict.home.intro.text2}
          </p>

          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-2">
            {photos.portraits.map((portrait) => (
              <div
                key={portrait.src}
                className="relative aspect-[2/3] overflow-hidden"
              >
                <Image
                  src={portrait.src}
                  alt={portrait.alt[locale]}
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingWidget locale={locale} dict={dict} categories={["ski"]} />
    </>
  );
}
