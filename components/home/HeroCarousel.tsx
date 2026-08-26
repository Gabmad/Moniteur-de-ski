"use client";

import { heroCarouselIds, photos } from "@/lib/photos";
import SiteImage from "@/components/SiteImage";

export default function HeroCarousel() {
  return (
    <section
      aria-label="Featured photographs"
      className="overflow-x-auto scroll-smooth snap-x snap-mandatory"
    >
      <div className="flex min-w-full">
        {heroCarouselIds.map((id) => {
          const photo = photos[id];
          const landscape = photo.width >= photo.height;
          return (
            <div
              key={id}
              className="relative h-[70svh] w-[88vw] shrink-0 snap-center sm:w-[70vw] md:h-[80svh] lg:w-[60vw]"
            >
              <SiteImage
                id={id}
                alt={id}
                fill
                sizes="(max-width: 768px) 88vw, 60vw"
                className={landscape ? "object-cover" : "object-cover"}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
