import { useTranslations } from "next-intl";
import { partners } from "@/lib/photos";

export default function Partners() {
  const t = useTranslations("partners");

  return (
    <section className="border-y border-ink/10 bg-fog py-16 md:py-20">
      <div className="site-pad mx-auto max-w-site">
        <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
          {t("title")}
        </h2>
        <ul className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((name) => (
            <li
              key={name}
              className="flex items-center justify-center text-center font-display text-sm font-bold uppercase tracking-[0.16em] text-ink/70 sm:text-base"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
