import { useTranslations } from "next-intl";
import SiteImage from "@/components/SiteImage";

export default function IdentityStrip() {
  const t = useTranslations("identity");
  const words = t.raw("words") as string[];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="film-grain absolute inset-0">
        <SiteImage id="PHOTO_IDENTITY" alt={words[0]} fill sizes="100vw" />
      </div>
      <div className="relative z-10 site-pad mx-auto w-full max-w-site py-24">
        <ul className="space-y-1">
          {words.map((word) => (
            <li
              key={word}
              className="font-display text-5xl font-bold leading-[0.95] text-ink sm:text-7xl md:text-8xl"
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
