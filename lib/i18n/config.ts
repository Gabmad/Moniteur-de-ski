export const locales = ["fr", "en", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  pt: "Português",
};

export const localeFlags: Record<Locale, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  pt: "🇵🇹",
};

/** Internal route keys used across the app */
export type RouteKey =
  | "home"
  | "skiLessons"
  | "touring"
  | "photography"
  | "about"
  | "contact"
  | "courchevel"
  | "meribel"
  | "valThorens";

/** Localized URL slugs per locale */
export const routeSlugs: Record<RouteKey, Record<Locale, string>> = {
  home: { fr: "", en: "", pt: "" },
  skiLessons: {
    fr: "cours-de-ski",
    en: "ski-lessons",
    pt: "aulas-de-esqui",
  },
  touring: {
    fr: "ski-de-randonnee-splitboard",
    en: "ski-touring-splitboard",
    pt: "ski-touring-splitboard",
  },
  photography: {
    fr: "photographie",
    en: "photography",
    pt: "fotografia",
  },
  about: {
    fr: "a-propos",
    en: "about",
    pt: "sobre",
  },
  contact: {
    fr: "contact",
    en: "contact",
    pt: "contato",
  },
  courchevel: {
    fr: "moniteur-ski-courchevel",
    en: "ski-instructor-courchevel",
    pt: "professor-esqui-courchevel",
  },
  meribel: {
    fr: "moniteur-ski-meribel",
    en: "ski-instructor-meribel",
    pt: "professor-esqui-meribel",
  },
  valThorens: {
    fr: "moniteur-ski-val-thorens",
    en: "ski-instructor-val-thorens",
    pt: "professor-esqui-val-thorens",
  },
};

export const primaryNav: RouteKey[] = [
  "skiLessons",
  "touring",
  "photography",
  "about",
  "contact",
];

export const stationRouteKeys = ["courchevel", "meribel", "valThorens"] as const;
export type StationRouteKey = (typeof stationRouteKeys)[number];

export function isStationRoute(key: RouteKey): key is StationRouteKey {
  return (stationRouteKeys as readonly string[]).includes(key);
}

export const allRoutes: RouteKey[] = [
  "home",
  "skiLessons",
  "touring",
  "photography",
  "about",
  "contact",
  "courchevel",
  "meribel",
  "valThorens",
];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocalizedPath(locale: Locale, routeKey: RouteKey): string {
  const slug = routeSlugs[routeKey][locale];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export function getRouteKeyFromSlug(
  locale: Locale,
  slug: string
): RouteKey | null {
  for (const routeKey of allRoutes) {
    if (routeSlugs[routeKey][locale] === slug) {
      return routeKey;
    }
  }
  return null;
}

export function getAlternatePaths(routeKey: RouteKey): Record<Locale, string> {
  return {
    fr: getLocalizedPath("fr", routeKey),
    en: getLocalizedPath("en", routeKey),
    pt: getLocalizedPath("pt", routeKey),
  };
}

/** Business constants for schema.org and contact */
export const businessInfo = {
  name: "Moniteur de Ski — Trois Vallées",
  phone: "+33783661146",
  phoneDisplay: "+33 7 83 66 11 46",
  whatsapp: "+33783661146",
  email: "gabrielmadie@gmail.com",
  url: "https://www.3vallees-ski-snowboard.com",
  areasServed: [
    "Courchevel",
    "Méribel",
    "Val Thorens",
    "Les Menuires",
    "Saint-Martin-de-Belleville",
  ],
  geo: {
    Courchevel: { latitude: 45.4153, longitude: 6.6342 },
    Méribel: { latitude: 45.3967, longitude: 6.5654 },
    "Val Thorens": { latitude: 45.2978, longitude: 6.5801 },
    "Les Menuires": { latitude: 45.3244, longitude: 6.5381 },
    "Saint-Martin-de-Belleville": { latitude: 45.3797, longitude: 6.5064 },
  },
  languages: ["fr", "en", "pt"],
  seasonsExperience: 7,
  yearsInResort: 20,
} as const;
