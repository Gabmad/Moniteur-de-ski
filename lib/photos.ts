import type { Locale } from "@/lib/i18n/config";

export type PhotoAlt = Record<Locale, string>;

export const photos = {
  hero: {
    src: "/images/hero.jpg",
    alt: {
      fr: "Descente hors-piste au coucher du soleil dans les Trois Vallées — moniteur de ski privé à Courchevel, Méribel et Val Thorens",
      en: "Off-piste descent at sunset in Les Trois Vallées — private ski instructor in Courchevel, Méribel and Val Thorens",
      pt: "Descida fora de pista ao pôr do sol nas Trois Vallées — instrutor de esqui privado em Courchevel, Méribel e Val Thorens",
    } satisfies PhotoAlt,
  },
  portraits: [
    {
      src: "/images/portrait-1.jpg",
      alt: {
        fr: "Portrait du moniteur de ski indépendant des Trois Vallées, sourire en lumière dorée",
        en: "Portrait of the independent ski instructor in Les Trois Vallées, smiling in golden light",
        pt: "Retrato do instrutor de esqui independente das Trois Vallées, sorriso à luz dourada",
      } satisfies PhotoAlt,
    },
    {
      src: "/images/portrait-2.jpg",
      alt: {
        fr: "Moniteur de ski et photographe professionnel, appareil Nikon en montagne dans les Trois Vallées",
        en: "Ski instructor and professional photographer with a Nikon camera in the mountains of Les Trois Vallées",
        pt: "Instrutor de esqui e fotógrafo profissional com uma câmara Nikon na montanha das Trois Vallées",
      } satisfies PhotoAlt,
    },
    {
      src: "/images/portrait-3.jpg",
      alt: {
        fr: "Photographe au travail hors-piste dans les Trois Vallées, appareil et flash en poudreuse",
        en: "Photographer at work off-piste in Les Trois Vallées, camera and flash in powder snow",
        pt: "Fotógrafo a trabalhar fora de pista nas Trois Vallées, câmara e flash na neve em pó",
      } satisfies PhotoAlt,
    },
  ],
  lessons: {
    src: "/images/lessons.jpg",
    alt: {
      fr: "Cours de ski sur piste à Courchevel, Trois Vallées — moniteur en veste rouge sous un ciel bleu",
      en: "On-piste ski lesson in Courchevel, Les Trois Vallées — instructor in a red jacket under a blue sky",
      pt: "Aula de esqui em pista em Courchevel, Trois Vallées — instrutor de casaco vermelho sob um céu azul",
    } satisfies PhotoAlt,
  },
  guiding: {
    src: "/images/guiding.jpg",
    alt: {
      fr: "Ski de randonnée et splitboard dans les Trois Vallées — montée à peaux de phoque vers les sommets, initiation ou sortie avancée",
      en: "Ski touring and splitboard in Les Trois Vallées — skinning up towards the alpine peaks, beginner or advanced outing",
      pt: "Ski touring e splitboard nas Trois Vallées — subida com peles em direção aos cumes, iniciação ou saída avançada",
    } satisfies PhotoAlt,
  },
  photography: {
    src: "/images/piste.jpg",
    alt: {
      fr: "Photographie de ski sur piste damée dans les Trois Vallées — skieuse en virage, Courchevel",
      en: "On-piste ski photography in Les Trois Vallées — skier carving on a groomed run, Courchevel",
      pt: "Fotografia de esqui em pista nas Trois Vallées — esquiadora em curva numa pista batida, Courchevel",
    } satisfies PhotoAlt,
  },
  clients: {
    src: "/images/clients.jpg",
    alt: {
      fr: "Séance photo sur les pistes des Trois Vallées — deux skieuses en tenue haut de gamme devant un sommet enneigé",
      en: "On-slope photo session in Les Trois Vallées — two skiers in high-end gear in front of a snowy peak",
      pt: "Sessão fotográfica nas pistas das Trois Vallées — duas esquiadoras em fato de luxo diante de um pico nevado",
    } satisfies PhotoAlt,
  },
  cta: {
    src: "/images/cta.jpg",
    alt: {
      fr: "Skieur en silhouette au-dessus d'une mer de nuages au coucher du soleil, hors-piste dans les Trois Vallées",
      en: "Silhouetted skier above a sea of clouds at sunset, off-piste in Les Trois Vallées",
      pt: "Esquiador em silhueta acima de um mar de nuvens ao pôr do sol, fora de pista nas Trois Vallées",
    } satisfies PhotoAlt,
  },
  pageHero: {
    src: "/images/page-hero.jpg",
    alt: {
      fr: "Sommets enneigés du massif des Trois Vallées, Alpes françaises — Courchevel, Méribel, Val Thorens",
      en: "Snow-covered peaks of Les Trois Vallées, French Alps — Courchevel, Méribel, Val Thorens",
      pt: "Picos nevados do maciço das Trois Vallées, Alpes franceses — Courchevel, Méribel, Val Thorens",
    } satisfies PhotoAlt,
  },
} as const;
