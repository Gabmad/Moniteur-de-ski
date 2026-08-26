import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import PageHero from "@/components/PageHero";
import AboutTeaser from "@/components/home/AboutTeaser";
import IdentityStrip from "@/components/home/IdentityStrip";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return buildMetadata(params.locale, "/about", "about");
}

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("pages.about");
  const tAbout = await getTranslations("about");

  return (
    <>
      <PageHero
        photoId="PHOTO_PAGE_ABOUT"
        eyebrow={t("eyebrow")}
        title={tAbout("title")}
        lead={t("lead")}
      />
      <AboutTeaser />
      <IdentityStrip />
    </>
  );
}
