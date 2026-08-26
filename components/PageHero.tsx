import type { PhotoId } from "@/lib/photos";
import SiteImage from "@/components/SiteImage";

type PageHeroProps = {
  photoId: PhotoId;
  eyebrow: string;
  title: string;
  lead?: string;
};

export default function PageHero({ photoId, eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden pb-16 pt-32">
      <div className="film-grain absolute inset-0">
        <SiteImage id={photoId} alt={title} fill priority sizes="100vw" />
      </div>
      <div className="relative z-10 site-pad mx-auto w-full max-w-site">
        <p className="text-sm text-ink/70">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/80">{lead}</p>
        )}
      </div>
    </section>
  );
}
