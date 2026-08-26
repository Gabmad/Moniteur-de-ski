import type { Locale, StationRouteKey } from "@/lib/i18n/config";
import { getLocalizedPath, stationRouteKeys } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import PageHero from "@/components/PageHero";
import BookingWidget from "@/components/booking/BookingWidget";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { photos } from "@/lib/photos";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo/metadata";
import Image from "next/image";
import Link from "next/link";

interface StationPageProps {
  locale: Locale;
  dict: Dictionary;
  station: StationRouteKey;
}

const stationPhotos = {
  courchevel: photos.lessons,
  meribel: photos.cta,
  valThorens: photos.guiding,
} as const;

const stationNames: Record<StationRouteKey, string> = {
  courchevel: "Courchevel",
  meribel: "Méribel",
  valThorens: "Val Thorens",
};

export default function StationPage({
  locale,
  dict,
  station,
}: StationPageProps) {
  const page = dict.stationPages[station];
  const photo = stationPhotos[station];
  const path = getLocalizedPath(locale, station);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: dict.nav.home, url: getLocalizedPath(locale, "home") },
          { name: dict.nav.skiLessons, url: getLocalizedPath(locale, "skiLessons") },
          { name: stationNames[station], url: path },
        ])}
      />
      <JsonLd data={buildFaqJsonLd(page.faq)} />

      <PageHero
        locale={locale}
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
      />

      <section className="bg-cream py-24 md:py-32">
        <div className="container-narrow grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="prose-luxury">{page.intro}</p>
            <p className="prose-luxury mt-5">{page.intro2}</p>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.alt[locale]}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-32">
        <div className="container-narrow">
          <p className="eyebrow">{page.pointsEyebrow}</p>
          <h2 className="mt-4 font-serif text-3xl text-white md:text-4xl">
            {page.pointsTitle}
          </h2>
          <div className="gold-rule mx-0 mt-6" />
          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            {page.points.map((point) => (
              <li key={point.title}>
                <h3 className="font-serif text-2xl text-white">{point.title}</h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-white/70">
                  {point.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="container-narrow text-center">
          <p className="section-subtitle mx-auto">{page.alsoText}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {stationRouteKeys
              .filter((key) => key !== station)
              .map((key) => (
                <Link
                  key={key}
                  href={getLocalizedPath(locale, key)}
                  className="text-[11px] font-medium uppercase tracking-luxury text-ink-muted transition hover:text-gold"
                >
                  {stationNames[key]}
                </Link>
              ))}
            <Link
              href={getLocalizedPath(locale, "touring")}
              className="text-[11px] font-medium uppercase tracking-luxury text-ink-muted transition hover:text-gold"
            >
              {dict.nav.touring}
            </Link>
            <Link
              href={getLocalizedPath(locale, "skiLessons")}
              className="text-[11px] font-medium uppercase tracking-luxury text-ink-muted transition hover:text-gold"
            >
              {dict.nav.skiLessons}
            </Link>
          </div>
        </div>
      </section>

      <Faq title={page.faqTitle} items={page.faq} />
      <BookingWidget locale={locale} dict={dict} categories={["ski"]} />
    </>
  );
}
