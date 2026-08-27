import type { Locale } from "@/lib/i18n/config";
import { getLocalizedPath } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import PageHero from "@/components/PageHero";
import BookingWidget from "@/components/booking/BookingWidget";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { photos } from "@/lib/photos";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo/metadata";
import Image from "next/image";
import Link from "next/link";

interface LusophonePageProps {
  locale: Locale;
  dict: Dictionary;
}

export default function LusophonePage({ locale, dict }: LusophonePageProps) {
  const page = dict.lusophonePage;
  const path = getLocalizedPath(locale, "lusophone");

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: dict.nav.home, url: getLocalizedPath(locale, "home") },
          { name: dict.nav.skiLessons, url: getLocalizedPath(locale, "skiLessons") },
          { name: page.title, url: path },
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
              src={photos.lessons.src}
              alt={photos.lessons.alt[locale]}
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
            <Link
              href={getLocalizedPath(locale, "valThorens")}
              className="text-[11px] font-medium uppercase tracking-luxury text-ink-muted transition hover:text-gold"
            >
              Val Thorens
            </Link>
            <Link
              href={getLocalizedPath(locale, "courchevel")}
              className="text-[11px] font-medium uppercase tracking-luxury text-ink-muted transition hover:text-gold"
            >
              Courchevel
            </Link>
            <Link
              href={getLocalizedPath(locale, "meribel")}
              className="text-[11px] font-medium uppercase tracking-luxury text-ink-muted transition hover:text-gold"
            >
              Méribel
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
