import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import type { PortfolioCategory } from "@/lib/photos";
import { galleryIds } from "@/lib/photos";
import PageHero from "@/components/PageHero";
import SiteImage from "@/components/SiteImage";
import ImageGrid from "@/components/ImageGrid";

const categories: {
  key: PortfolioCategory;
  photo: "PHOTO_CAT_WATER" | "PHOTO_CAT_TRAIL" | "PHOTO_CAT_SNOW" | "PHOTO_CAT_LIFE" | "PHOTO_CAT_VIDEO";
}[] = [
  { key: "water", photo: "PHOTO_CAT_WATER" },
  { key: "trail", photo: "PHOTO_CAT_TRAIL" },
  { key: "snow", photo: "PHOTO_CAT_SNOW" },
  { key: "life", photo: "PHOTO_CAT_LIFE" },
  { key: "video", photo: "PHOTO_CAT_VIDEO" },
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return buildMetadata(params.locale, "/portfolio", "portfolio");
}

export default async function PortfolioPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("pages.portfolio");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero
        photoId="PHOTO_PAGE_PORTFOLIO"
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />
      <section className="site-pad mx-auto grid max-w-site gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.key}
            href={{
              pathname: "/portfolio/[category]",
              params: { category: cat.key },
            }}
            className="group relative aspect-[3/2] overflow-hidden"
          >
            <SiteImage
              id={cat.photo}
              alt={tNav(`categories.${cat.key}`)}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-5">
              <span className="font-display text-xl font-bold text-white">
                {tNav(`categories.${cat.key}`)}
              </span>
            </span>
          </Link>
        ))}
      </section>
      <section className="pb-16">
        <ImageGrid ids={galleryIds} />
      </section>
    </>
  );
}
