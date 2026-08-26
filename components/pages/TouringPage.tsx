import type { Locale } from "@/lib/i18n/config";
import { businessInfo, getLocalizedPath } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import PageHero from "@/components/PageHero";
import BookingWidget from "@/components/booking/BookingWidget";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { photos } from "@/lib/photos";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo/metadata";
import Image from "next/image";
import Link from "next/link";

interface TouringPageProps {
  locale: Locale;
  dict: Dictionary;
}

export default function TouringPage({ locale, dict }: TouringPageProps) {
  const page = dict.touringPage;
  const path = getLocalizedPath(locale, "touring");

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: dict.nav.home, url: getLocalizedPath(locale, "home") },
          { name: dict.nav.touring, url: path },
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
              src={photos.guiding.src}
              alt={photos.guiding.alt[locale]}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-32">
        <div className="container-narrow grid gap-16 md:grid-cols-3">
          <article>
            <p className="eyebrow">{page.initiationEyebrow}</p>
            <h2 className="mt-4 font-serif text-3xl text-white">
              {page.initiationTitle}
            </h2>
            <div className="gold-rule mx-0 mt-6" />
            <p className="mt-6 text-[15px] font-light leading-relaxed text-white/70">
              {page.initiationText}
            </p>
          </article>
          <article>
            <p className="eyebrow">{page.advancedEyebrow}</p>
            <h2 className="mt-4 font-serif text-3xl text-white">
              {page.advancedTitle}
            </h2>
            <div className="gold-rule mx-0 mt-6" />
            <p className="mt-6 text-[15px] font-light leading-relaxed text-white/70">
              {page.advancedText}
            </p>
          </article>
          <article>
            <p className="eyebrow">{page.splitEyebrow}</p>
            <h2 className="mt-4 font-serif text-3xl text-white">
              {page.splitTitle}
            </h2>
            <div className="gold-rule mx-0 mt-6" />
            <p className="mt-6 text-[15px] font-light leading-relaxed text-white/70">
              {page.splitText}
            </p>
          </article>
        </div>
      </section>

      <section className="bg-cream-dark py-24 md:py-32">
        <div className="container-narrow text-center">
          <p className="eyebrow">{page.gearEyebrow}</p>
          <h2 className="section-title mt-4">{page.gearTitle}</h2>
          <div className="gold-rule mt-8" />
          <p className="section-subtitle mx-auto">{page.gearText}</p>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-ink-muted">
            {page.gearNote}
          </p>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="container-narrow text-center">
          <p className="eyebrow">{page.safetyEyebrow}</p>
          <h2 className="section-title mt-4">{page.safetyTitle}</h2>
          <div className="gold-rule mt-8" />
          <p className="section-subtitle mx-auto">{page.safetyText}</p>

          <p className="mt-16 text-[10px] font-medium uppercase tracking-luxury text-ink-faint">
            {dict.skiPage.zonesTitle}
          </p>
          <p className="mt-4 font-serif text-xl text-ink sm:text-2xl">
            {businessInfo.areasServed.join("  ·  ")}
          </p>

          <p className="mx-auto mt-10 max-w-2xl text-[15px] font-light leading-relaxed text-ink-muted">
            {page.pricingNote}
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[13px] font-light text-ink-muted">
            <Link
              href={getLocalizedPath(locale, "courchevel")}
              className="transition hover:text-gold"
            >
              Courchevel
            </Link>
            <Link
              href={getLocalizedPath(locale, "meribel")}
              className="transition hover:text-gold"
            >
              Méribel
            </Link>
            <Link
              href={getLocalizedPath(locale, "valThorens")}
              className="transition hover:text-gold"
            >
              Val Thorens
            </Link>
          </div>
        </div>
      </section>

      <Faq title={page.faqTitle} items={page.faq} />
      <BookingWidget locale={locale} dict={dict} categories={["ski"]} />
    </>
  );
}
