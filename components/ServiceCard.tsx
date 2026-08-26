import { Link } from "@/i18n/navigation";
import type { PhotoId } from "@/lib/photos";
import SiteImage from "@/components/SiteImage";

type ServiceCardProps = {
  photoId: PhotoId;
  title: string;
  text: string;
  details?: string[];
  note?: string;
  cta: string;
};

export default function ServiceCard({
  photoId,
  title,
  text,
  details,
  note,
  cta,
}: ServiceCardProps) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[3/2] overflow-hidden">
        <SiteImage
          id={photoId}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h3 className="mt-6 font-display text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{text}</p>
      {details && (
        <ul className="mt-3 space-y-0.5 text-[15px] text-ink/75">
          {details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {note && <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{note}</p>}
      <Link href="/contact" className="btn-pill mt-6 w-fit">
        {cta}
      </Link>
    </article>
  );
}
