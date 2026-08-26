import { useTranslations } from "next-intl";
import ServiceCard from "@/components/ServiceCard";

export default function Services() {
  const t = useTranslations("services");

  return (
    <section className="bg-fog py-20 md:py-28">
      <div className="site-pad mx-auto max-w-site">
        <h2 className="text-center font-display text-4xl font-bold sm:text-5xl">
          {t("title")}
        </h2>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          <ServiceCard
            photoId="PHOTO_SERVICE_COMMERCIAL"
            title={t("items.commercial.title")}
            text={t("items.commercial.text")}
            cta={t("cta")}
          />
          <ServiceCard
            photoId="PHOTO_SERVICE_PRIVATE"
            title={t("items.private.title")}
            text={t("items.private.text")}
            details={t.raw("items.private.details") as string[]}
            cta={t("cta")}
          />
          <ServiceCard
            photoId="PHOTO_SERVICE_EVENTS"
            title={t("items.events.title")}
            text={t("items.events.text")}
            note={t("items.events.note")}
            cta={t("cta")}
          />
        </div>
      </div>
    </section>
  );
}
