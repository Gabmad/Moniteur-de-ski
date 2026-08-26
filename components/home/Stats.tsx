import { businessInfo } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

interface StatsProps {
  dict: Dictionary;
}

export default function Stats({ dict }: StatsProps) {
  const items = [
    { value: String(businessInfo.seasonsExperience), label: dict.home.stats.seasons },
    { value: String(businessInfo.yearsInResort), label: dict.home.stats.years },
    { value: String(businessInfo.languages.length), label: dict.home.stats.languages },
    { value: dict.home.stats.diplomaValue, label: dict.home.stats.diploma },
  ];

  return (
    <section className="border-b border-ink/10 bg-cream">
      <div className="container-narrow py-16 md:py-20">
        <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-ink/10">
          {items.map(({ value, label }) => (
            <div key={label} className="text-center md:px-8">
              <dt className="font-serif text-5xl font-normal text-ink md:text-6xl">
                {value}
              </dt>
              <dd className="mt-3 text-[10px] font-medium uppercase tracking-luxury text-ink-faint">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
