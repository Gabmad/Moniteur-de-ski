"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { PhotoId } from "@/lib/photos";
import { photos } from "@/lib/photos";
import SiteImage from "@/components/SiteImage";

type ImageGridProps = {
  ids: PhotoId[];
  alts?: Partial<Record<PhotoId, string>>;
};

export default function ImageGrid({ ids, alts = {} }: ImageGridProps) {
  const t = useTranslations("gallery");
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  const go = useCallback(
    (dir: number) => {
      setActive((current) => {
        if (current === null) return current;
        return (current + dir + ids.length) % ids.length;
      });
    },
    [ids.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, go]);

  return (
    <>
      <div className="columns-2 gap-2 md:columns-3 md:gap-3 lg:columns-4">
        {ids.map((id, index) => {
          const photo = photos[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(index)}
              className="group relative mb-2 block w-full break-inside-avoid overflow-hidden md:mb-3"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <SiteImage
                id={id}
                alt={alts[id] ?? id}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <span className="absolute inset-0 flex items-end justify-center bg-black/0 pb-4 text-[11px] uppercase tracking-[0.14em] text-white opacity-0 transition group-hover:bg-black/25 group-hover:opacity-100">
                {t("viewFull")}
              </span>
            </button>
          );
        })}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t("viewFull")}
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label={t("close")}
            onClick={close}
          />
          <div className="relative z-10 flex h-[88vh] w-full max-w-6xl items-center justify-center">
            <SiteImage
              id={ids[active]}
              alt={alts[ids[active]] ?? ids[active]}
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={close}
            className="absolute right-5 top-5 z-20 text-[11px] uppercase tracking-[0.16em] text-white"
          >
            {t("close")}
          </button>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 text-white"
            aria-label={t("prev")}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 text-white"
            aria-label={t("next")}
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
