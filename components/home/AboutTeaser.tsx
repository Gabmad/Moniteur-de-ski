import { useTranslations } from "next-intl";
import SiteImage from "@/components/SiteImage";
import { WhatsAppTrigger } from "@/components/whatsapp/WhatsAppProvider";

export default function AboutTeaser() {
  const t = useTranslations("about");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="site-pad mx-auto grid max-w-site items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <SiteImage id="PHOTO_ABOUT" alt={t("title")} fill sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <div className="mt-8 space-y-5 text-[15px] leading-[1.8] text-ink/80">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <WhatsAppTrigger label={t("cta")} className="btn-pill mt-10" />
        </div>
      </div>
    </section>
  );
}
