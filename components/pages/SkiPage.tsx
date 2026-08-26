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

interface SkiPageProps {
  locale: Locale;
  dict: Dictionary;
}

export default function SkiPage({ locale, dict }: SkiPageProps) {
  const page = dict.skiPage;

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: dict.nav.home, url: getLocalizedPath(locale, "home") },
          { name: dict.nav.skiLessons, url: getLocalizedPath(locale, "skiLessons") },
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
        <div className="container-narrow grid gap-16 md:grid-cols-3">
          <article>
            <p className="eyebrow">{page.eyebrow}</p>
            <h2 className="mt-4 font-serif text-3xl text-white">
              {page.lessonsTitle}
            </h2>
            <div className="gold-rule mx-0 mt-6" />
            <p className="mt-6 text-[15px] font-light leading-relaxed text-white/70">
              {page.lessonsText}
            </p>
          </article>
          <article>
            <p className="eyebrow">{dict.home.services.guide.title}</p>
            <h2 className="mt-4 font-serif text-3xl text-white">
              {page.guideTitle}
            </h2>
            <div className="gold-rule mx-0 mt-6" />
            <p className="mt-6 text-[15px] font-light leading-relaxed text-white/70">
              {page.guideText}
            </p>
          </article>
          <article>
            <p className="eyebrow">{dict.nav.touring}</p>
            <h2 className="mt-4 font-serif text-3xl text-white">
              {page.touringTitle}
            </h2>
            <div className="gold-rule mx-0 mt-6" />
            <p className="mt-6 text-[15px] font-light leading-relaxed text-white/70">
              {page.touringText}
            </p>
            <Link
              href={getLocalizedPath(locale, "touring")}
              className="mt-6 inline-block text-[10px] font-medium uppercase tracking-luxury text-gold"
            >
              {page.touringLink}
            </Link>
          </article>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="container-narrow text-center">
          <p className="eyebrow">{page.pricingEyebrow}</p>
          <h2 className="section-title mt-4">{page.pricingTitle}</h2>
          <div className="gold-rule mt-8" />
          <p className="section-subtitle mx-auto">{page.pricingNote}</p>

          <div className="mx-auto mt-16 grid max-w-3xl gap-px bg-ink/10 sm:grid-cols-2">
            <div className="bg-cream px-8 py-12">
              <p className="text-[10px] font-medium uppercase tracking-luxury text-gold">
                {page.halfMeta}
              </p>
              <h3 className="mt-3 font-serif text-2xl text-ink">
                {page.halfLabel}
              </h3>
              <p className="mt-6 font-serif text-5xl text-ink">550€</p>
            </div>
            <div className="bg-cream px-8 py-12">
              <p className="text-[10px] font-medium uppercase tracking-luxury text-gold">
                {page.fullMeta}
              </p>
              <h3 className="mt-3 font-serif text-2xl text-ink">
                {page.fullLabel}
              </h3>
              <p className="mt-6 font-serif text-5xl text-ink">770€</p>
            </div>
          </div>

          <p className="mt-16 text-[10px] font-medium uppercase tracking-luxury text-ink-faint">
            {page.zonesTitle}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 font-serif text-xl text-ink sm:text-2xl">
            <Link href={getLocalizedPath(locale, "courchevel")} className="transition hover:text-gold">
              Courchevel
            </Link>
            <span className="text-gold/70">·</span>
            <Link href={getLocalizedPath(locale, "meribel")} className="transition hover:text-gold">
              Méribel
            </Link>
            <span className="text-gold/70">·</span>
            <Link href={getLocalizedPath(locale, "valThorens")} className="transition hover:text-gold">
              Val Thorens
            </Link>
            <span className="text-gold/70">·</span>
            <span>Les Menuires</span>
            <span className="text-gold/70">·</span>
            <span>Saint-Martin-de-Belleville</span>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[13px] font-light text-ink-muted">
            {page.forItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <Faq title={page.faqTitle} items={page.faq} />
      <BookingWidget locale={locale} dict={dict} categories={["ski"]} />
    </>
  );
}
