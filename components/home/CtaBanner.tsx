import Image from "next/image";
import Link from "next/link";
import { type Locale, getLocalizedPath } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { photos } from "@/lib/photos";
import { WhatsAppTrigger } from "@/components/whatsapp/WhatsAppProvider";

interface CtaBannerProps {
  locale: Locale;
  dict: Dictionary;
}

export default function CtaBanner({ locale, dict }: CtaBannerProps) {
  const { cta } = dict.home;

  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <Image
        src={photos.cta.src}
        alt={photos.cta.alt[locale]}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-ink/60" />

      <div className="container-narrow relative z-10 text-center">
        <p className="eyebrow">{cta.eyebrow}</p>
        <h2 className="mt-5 font-serif text-4xl font-normal text-white sm:text-5xl">
          {cta.title}
        </h2>
        <div className="gold-rule mt-8" />
        <p className="mx-auto mt-8 max-w-lg text-[15px] font-light leading-relaxed text-white/75">
          {cta.subtitle}
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={getLocalizedPath(locale, "contact")} className="btn-primary">
            {cta.button}
          </Link>
          <WhatsAppTrigger label="WhatsApp" className="btn-outline" />
        </div>
      </div>
    </section>
  );
}
