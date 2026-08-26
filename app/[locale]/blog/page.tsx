import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import PageHero from "@/components/PageHero";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return buildMetadata(params.locale, "/blog", "blog");
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("pages.blog");

  return (
    <>
      <PageHero
        photoId="PHOTO_PAGE_BLOG"
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />
      <p className="site-pad mx-auto max-w-site py-24 text-center text-mist">
        {t("empty")}
      </p>
    </>
  );
}
