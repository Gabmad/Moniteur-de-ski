import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return buildMetadata(params.locale, "/cart", "cart");
}

export default async function CartPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = await getTranslations("pages.cart");

  return (
    <section className="site-pad mx-auto flex min-h-[70svh] max-w-site flex-col items-center justify-center pt-32 text-center">
      <h1 className="font-display text-4xl font-bold">{t("title")}</h1>
      <p className="mt-4 text-mist">{t("empty")}</p>
      <Link href="/shop" className="btn-pill mt-8">
        {t("shop")}
      </Link>
    </section>
  );
}
