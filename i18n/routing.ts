import { defineRouting } from "next-intl/routing";

export const locales = ["fr", "en", "pt"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "fr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/about": {
      fr: "/a-propos",
      en: "/about",
      pt: "/sobre",
    },
    "/portfolio": "/portfolio",
    "/portfolio/[category]": "/portfolio/[category]",
    "/projects": {
      fr: "/projets",
      en: "/projects",
      pt: "/projetos",
    },
    "/shop": {
      fr: "/boutique",
      en: "/shop",
      pt: "/loja",
    },
    "/blog": "/blog",
    "/contact": {
      fr: "/contact",
      en: "/contact",
      pt: "/contato",
    },
    "/cart": {
      fr: "/panier",
      en: "/cart",
      pt: "/carrinho",
    },
  },
});

export type Pathname = keyof typeof routing.pathnames;
export type StaticPathname = Exclude<Pathname, "/portfolio/[category]">;

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  pt: "Português",
};

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
