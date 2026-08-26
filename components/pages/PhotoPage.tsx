import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import PageHero from "@/components/PageHero";
import BookingWidget from "@/components/booking/BookingWidget";
import { photos } from "@/lib/photos";
import Image from "next/image";

interface PhotoPageProps {
  locale: Locale;
  dict: Dictionary;
}

export default function PhotoPage({ locale, dict }: PhotoPageProps) {
  const page = dict.photoPage;

  return (
    <>
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
              src={photos.photography.src}
              alt={photos.photography.alt[locale]}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="container-narrow mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {page.values.map((value) => (
            <article key={value.title}>
              <h3 className="font-serif text-xl text-ink">{value.title}</h3>
              <p className="mt-3 text-[14px] font-light leading-relaxed text-ink-muted">
                {value.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink py-24 md:py-32">
        <div className="container-narrow">
          <p className="eyebrow">{page.photoEyebrow}</p>
          <h2 className="mt-4 font-serif text-3xl text-white sm:text-4xl">
            {page.photoTitle}
          </h2>
          <div className="gold-rule mx-0 mt-8" />

          <div className="mt-12 divide-y divide-white/10">
            {page.photoRates.map((rate) => (
              <div
                key={rate.id}
                className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <p className="font-serif text-2xl text-white">{rate.title}</p>
                  <p className="mt-1 text-[13px] font-light text-white/55">
                    {rate.meta}
                  </p>
                </div>
                <p className="font-serif text-2xl text-gold">{rate.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="container-narrow">
          <p className="eyebrow">{page.videoEyebrow}</p>
          <h2 className="section-title mt-4">{page.videoTitle}</h2>
          <div className="gold-rule mx-0 mt-8" />
          <p className="mt-6 text-[11px] font-medium uppercase tracking-luxury text-ink-faint">
            {page.videoTech}
          </p>

          <div className="mt-12 divide-y divide-ink/10">
            {page.videoRates.map((rate) => (
              <div
                key={rate.id}
                className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <p className="font-serif text-2xl text-ink">{rate.title}</p>
                  <p className="mt-1 text-[13px] font-light text-ink-muted">
                    {rate.meta}
                  </p>
                </div>
                <p className="font-serif text-2xl text-gold-dark">{rate.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingWidget
        locale={locale}
        dict={dict}
        categories={["photo", "video"]}
        defaultOfferId="photo-half"
      />
    </>
  );
}
