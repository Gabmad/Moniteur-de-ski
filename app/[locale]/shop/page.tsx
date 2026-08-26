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
  return buildMetadata(params.locale, "/shop", "shop");
}

export default async function ShopPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("pages.shop");

  return (
    <>
      <PageHero
        photoId="PHOTO_PAGE_SHOP"
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
