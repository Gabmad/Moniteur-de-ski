import { businessInfo, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import PageHero from "@/components/PageHero";
import BookingWidget from "@/components/booking/BookingWidget";
import { WhatsAppTrigger } from "@/components/whatsapp/WhatsAppProvider";

interface ContactPageProps {
  locale: Locale;
  dict: Dictionary;
}

export default function ContactPage({ locale, dict }: ContactPageProps) {
  const page = dict.contactPage;

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
      />

      <section className="bg-cream py-24 md:py-28">
        <div className="container-narrow grid gap-16 md:grid-cols-2">
          <div>
            <p className="label-luxury">{page.emailLabel}</p>
            <a
              href={`mailto:${businessInfo.email}`}
              className="font-serif text-2xl text-ink transition hover:text-gold sm:text-3xl"
            >
              {businessInfo.email}
            </a>
          </div>
          <div>
            <p className="label-luxury">{page.whatsappLabel}</p>
            <WhatsAppTrigger
              label={page.whatsappCta}
              className="font-serif text-2xl text-ink transition hover:text-gold sm:text-3xl"
            />
            <p className="mt-3 text-sm font-light text-ink-faint">
              +33 7 83 66 11 46
            </p>
          </div>
        </div>
      </section>

      <BookingWidget locale={locale} dict={dict} />
    </>
  );
}
