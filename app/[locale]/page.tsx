import { setRequestLocale } from "next-intl/server";
import { galleryIds } from "@/lib/photos";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import Hero from "@/components/home/Hero";
import HeroCarousel from "@/components/home/HeroCarousel";
import Storytelling from "@/components/home/Storytelling";
import AboutTeaser from "@/components/home/AboutTeaser";
import IdentityStrip from "@/components/home/IdentityStrip";
import Partners from "@/components/home/Partners";
import ImageGrid from "@/components/ImageGrid";
import Testimonials from "@/components/home/Testimonials";
import Services from "@/components/home/Services";
import FinalCta from "@/components/home/FinalCta";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return buildMetadata(params.locale, "/", "home");
}

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);

  return (
    <>
      <Hero />
      <HeroCarousel />
      <Storytelling />
      <AboutTeaser />
      <IdentityStrip />
      <Partners />
      <section className="bg-white py-6 md:py-10">
        <ImageGrid ids={galleryIds} />
      </section>
      <Testimonials />
      <Services />
      <FinalCta />
    </>
  );
}
