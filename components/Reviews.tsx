import { buildWhatsAppUrl } from "@/lib/booking";

export type ReviewItem = {
  name: string;
  place: string;
  text: string;
};

interface ReviewsProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  empty: string;
  cta: string;
  waMessage: string;
  items: ReviewItem[];
}

export default function Reviews({
  eyebrow,
  title,
  subtitle,
  empty,
  cta,
  waMessage,
  items,
}: ReviewsProps) {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-narrow">
        <p className="eyebrow text-center">{eyebrow}</p>
        <h2 className="mt-4 text-center font-serif text-3xl text-ink md:text-4xl">
          {title}
        </h2>
        <div className="gold-rule mt-8" />
        <p className="section-subtitle mx-auto mt-8">{subtitle}</p>

        {items.length === 0 ? (
          <p className="mx-auto mt-12 max-w-xl text-center text-[15px] font-light leading-relaxed text-ink-muted">
            {empty}
          </p>
        ) : (
          <ul className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            {items.map((item) => (
              <li key={`${item.name}-${item.place}`} className="bg-white p-8">
                <p className="font-serif text-xl leading-relaxed text-ink">
                  “{item.text}”
                </p>
                <p className="mt-6 text-[11px] font-medium uppercase tracking-luxury text-gold">
                  {item.name}
                  <span className="text-ink-faint"> · {item.place}</span>
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 text-center">
          <a href={buildWhatsAppUrl(waMessage)} className="btn-ghost">
            {cta}
          </a>
        </div>
      </div>
    </section>
  );
}
