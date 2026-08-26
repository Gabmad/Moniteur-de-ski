import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return buildMetadata(params.locale, "/contact", "contact");
}

export default async function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("pages.contact");

  return (
    <>
      <PageHero
        photoId="PHOTO_PAGE_CONTACT"
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />
      <section className="site-pad mx-auto max-w-site py-16">
        <div className="flex flex-col items-center gap-2 text-sm text-ink/80">
          <a href={`mailto:${site.email}`} className="hover:underline">
            {site.email}
          </a>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            {site.instagramHandle}
          </a>
          <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
