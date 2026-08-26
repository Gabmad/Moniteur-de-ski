interface FaqItem {
  q: string;
  a: string;
}

interface FaqProps {
  title: string;
  items: FaqItem[];
}

export default function Faq({ title, items }: FaqProps) {
  return (
    <section className="bg-cream-dark py-24 md:py-32">
      <div className="container-narrow">
        <h2 className="text-center font-serif text-3xl text-ink md:text-4xl">
          {title}
        </h2>
        <div className="gold-rule mt-8" />
        <dl className="mx-auto mt-16 max-w-3xl divide-y divide-ink/10">
          {items.map((item) => (
            <div key={item.q} className="py-7">
              <dt className="font-serif text-xl text-ink md:text-2xl">
                {item.q}
              </dt>
              <dd className="mt-3 text-[15px] font-light leading-relaxed text-ink-muted">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
