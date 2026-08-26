import { useTranslations } from "next-intl";
import type { PhotoId } from "@/lib/photos";
import SiteImage from "@/components/SiteImage";

const scenePhotos: PhotoId[] = [
  "PHOTO_STORY_1",
  "PHOTO_STORY_2",
  "PHOTO_STORY_3",
  "PHOTO_STORY_4",
  "PHOTO_STORY_5",
];

export default function Storytelling() {
  const t = useTranslations("story");

  return (
    <section>
      {scenePhotos.map((id, index) => {
        const title = t(`scenes.${index}.title`);
        const title2 = t(`scenes.${index}.title2`);
        const subtitle = t(`scenes.${index}.subtitle`);

        return (
          <article
            key={id}
            className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
          >
            <div className="film-grain absolute inset-0">
              <SiteImage
                id={id}
                alt={title}
                fill
                sizes="100vw"
              />
            </div>
            <div className="relative z-10 max-w-3xl px-6 text-center">
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
                {title}
                {title2 ? (
                  <>
                    <br />
                    {title2}
                  </>
                ) : null}
              </h2>
              {subtitle ? (
                <p className="mt-6 text-lg font-medium text-ink/80 sm:text-xl">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </article>
        );
      })}
    </section>
  );
}
