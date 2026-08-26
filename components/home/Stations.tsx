import Link from "next/link";
import {
  type Locale,
  type RouteKey,
  getLocalizedPath,
} from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

interface StationsProps {
  locale: Locale;
  dict: Dictionary;
}

const placeRoutes: Record<string, RouteKey> = {
  courchevel: "courchevel",
  meribel: "meribel",
  valThorens: "valThorens",
  menuires: "skiLessons",
  saintMartin: "skiLessons",
};

export default function Stations({ locale, dict }: StationsProps) {
  const { stations } = dict.home;

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-narrow text-center">
        <p className="eyebrow">{stations.eyebrow}</p>
        <h2 className="section-title mt-4">{stations.title}</h2>
        <div className="gold-rule mt-8" />
        <p className="section-subtitle mx-auto">{stations.subtitle}</p>
        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stations.places.map((place) => {
            const href = getLocalizedPath(
              locale,
              placeRoutes[place.id] ?? "skiLessons"
            );
            return (
              <li key={place.id}>
                <Link href={href} className="group block text-left">
                  <h3 className="font-serif text-2xl text-ink transition group-hover:text-gold">
                    {place.name}
                  </h3>
                  <p className="mt-3 text-[14px] font-light leading-relaxed text-ink-muted">
                    {place.blurb}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
