import Image from "next/image";
import Link from "next/link";
import { type Locale, getLocalizedPath } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { photos } from "@/lib/photos";

interface ServicesProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Services({ locale, dict }: ServicesProps) {
  const { services } = dict.home;

  const cards = [
    {
      key: "ski",
      data: services.ski,
      href: getLocalizedPath(locale, "skiLessons"),
      photo: photos.lessons,
    },
    {
      key: "touring",
      data: services.touring,
      href: getLocalizedPath(locale, "touring"),
      photo: photos.guiding,
    },
    {
      key: "guide",
      data: services.guide,
      href: getLocalizedPath(locale, "skiLessons"),
      photo: photos.cta,
    },
    {
      key: "photo",
      data: services.photo,
      href: getLocalizedPath(locale, "photography"),
      photo: photos.photography,
    },
  ];

  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="container-narrow text-center">
        <p className="eyebrow">{services.title}</p>
        <h2 className="mt-4 font-serif text-3xl font-normal text-white sm:text-4xl md:text-5xl">
          {services.headline}
        </h2>
        <div className="gold-rule mt-8" />
      </div>

      <div className="container-narrow mt-16 grid gap-5 sm:grid-cols-2">
        {cards.map(({ key, data, href, photo }) => (
          <Link
            key={key}
            href={href}
            className="group relative block aspect-[5/4] overflow-hidden"
          >
            <Image
              src={photo.src}
              alt={photo.alt[locale]}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-left">
              <h3 className="font-serif text-2xl text-white md:text-3xl">
                {data.title}
              </h3>
              <p className="mt-2 max-w-md text-[13px] font-light leading-relaxed text-white/70">
                {data.description}
              </p>
              <span className="mt-5 inline-block text-[10px] font-medium uppercase tracking-luxury text-gold">
                {data.link}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
