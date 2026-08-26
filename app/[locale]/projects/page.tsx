import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import PageHero from "@/components/PageHero";
import SiteImage from "@/components/SiteImage";
import type { PhotoId } from "@/lib/photos";

const projectPhotos: PhotoId[] = [
  "PHOTO_GALLERY_01",
  "PHOTO_GALLERY_09",
  "PHOTO_GALLERY_04",
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return buildMetadata(params.locale, "/projects", "projects");
}

export default async function ProjectsPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("pages.projects");

  return (
    <>
      <PageHero
        photoId="PHOTO_PAGE_PROJECTS"
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />
      <section className="site-pad mx-auto grid max-w-site gap-10 py-20 md:grid-cols-3">
        {projectPhotos.map((id) => (
          <article key={id} className="relative aspect-[4/5] overflow-hidden bg-fog">
            <SiteImage id={id} alt={t("title")} fill sizes="(max-width: 768px) 100vw, 33vw" />
          </article>
        ))}
      </section>
      <p className="pb-20 text-center text-sm text-mist">{t("empty")}</p>
    </>
  );
}
