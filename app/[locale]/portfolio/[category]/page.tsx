import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  photosByCategory,
  type PortfolioCategory,
} from "@/lib/photos";
import PageHero from "@/components/PageHero";
import ImageGrid from "@/components/ImageGrid";

const categories: PortfolioCategory[] = [
  "water",
  "trail",
  "snow",
  "life",
  "video",
];

const covers: Record<PortfolioCategory, "PHOTO_CAT_WATER" | "PHOTO_CAT_TRAIL" | "PHOTO_CAT_SNOW" | "PHOTO_CAT_LIFE" | "PHOTO_CAT_VIDEO"> = {
  water: "PHOTO_CAT_WATER",
  trail: "PHOTO_CAT_TRAIL",
  snow: "PHOTO_CAT_SNOW",
  life: "PHOTO_CAT_LIFE",
  video: "PHOTO_CAT_VIDEO",
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((category) => ({ locale, category }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; category: string };
}) {
  return buildMetadata(params.locale, "/portfolio", "portfolio");
}

export default async function PortfolioCategoryPage({
  params,
}: {
  params: { locale: string; category: string };
}) {
  setRequestLocale(params.locale);

  if (!categories.includes(params.category as PortfolioCategory)) {
    notFound();
  }

  const category = params.category as PortfolioCategory;
  const tNav = await getTranslations("nav");
  const ids = photosByCategory(category);

  return (
    <>
      <PageHero
        photoId={covers[category]}
        eyebrow={tNav("portfolio")}
        title={tNav(`categories.${category}`)}
      />
      <section className="py-8 md:py-12">
        <ImageGrid ids={ids} />
      </section>
    </>
  );
}
