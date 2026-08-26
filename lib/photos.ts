/**
 * Photo catalog.
 *
 * Replace a placeholder by dropping your file in `public/photos/`
 * with the same PHOTO_XXX name, then update `src` if the extension changes.
 *
 * Example: public/photos/PHOTO_HERO.jpg → src: "/photos/PHOTO_HERO.jpg"
 */
export const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAIAAAAy3EnLAAAAE0lEQVR4nGNw8wkhCTGMahiaGgCT8Y/BTeGoTwAAAABJRU5ErkJggg==";

export const photoIds = [
  "PHOTO_HERO",
  "PHOTO_HERO_2",
  "PHOTO_HERO_3",
  "PHOTO_STORY_1",
  "PHOTO_STORY_2",
  "PHOTO_STORY_3",
  "PHOTO_STORY_4",
  "PHOTO_STORY_5",
  "PHOTO_ABOUT",
  "PHOTO_IDENTITY",
  "PHOTO_SERVICE_COMMERCIAL",
  "PHOTO_SERVICE_PRIVATE",
  "PHOTO_SERVICE_EVENTS",
  "PHOTO_CTA",
  "PHOTO_PAGE_ABOUT",
  "PHOTO_PAGE_PORTFOLIO",
  "PHOTO_PAGE_PROJECTS",
  "PHOTO_PAGE_SHOP",
  "PHOTO_PAGE_CONTACT",
  "PHOTO_PAGE_BLOG",
  "PHOTO_CAT_WATER",
  "PHOTO_CAT_TRAIL",
  "PHOTO_CAT_SNOW",
  "PHOTO_CAT_LIFE",
  "PHOTO_CAT_VIDEO",
  "PHOTO_GALLERY_01",
  "PHOTO_GALLERY_02",
  "PHOTO_GALLERY_03",
  "PHOTO_GALLERY_04",
  "PHOTO_GALLERY_05",
  "PHOTO_GALLERY_06",
  "PHOTO_GALLERY_07",
  "PHOTO_GALLERY_08",
  "PHOTO_GALLERY_09",
  "PHOTO_GALLERY_10",
  "PHOTO_GALLERY_11",
  "PHOTO_GALLERY_12",
  "PHOTO_GALLERY_13",
  "PHOTO_GALLERY_14",
  "PHOTO_GALLERY_15",
  "PHOTO_GALLERY_16",
  "PHOTO_GALLERY_17",
  "PHOTO_GALLERY_18",
] as const;

export type PhotoId = (typeof photoIds)[number];

export type PortfolioCategory = "water" | "trail" | "snow" | "life" | "video";

type PhotoMeta = {
  src: string;
  width: number;
  height: number;
  category?: PortfolioCategory;
};

export const photos: Record<PhotoId, PhotoMeta> = {
  PHOTO_HERO: { src: "/photos/PHOTO_HERO.png", width: 320, height: 200 },
  PHOTO_HERO_2: { src: "/photos/PHOTO_HERO_2.png", width: 320, height: 200 },
  PHOTO_HERO_3: { src: "/photos/PHOTO_HERO_3.png", width: 320, height: 200 },
  PHOTO_STORY_1: { src: "/photos/PHOTO_STORY_1.png", width: 240, height: 320 },
  PHOTO_STORY_2: { src: "/photos/PHOTO_STORY_2.png", width: 320, height: 200 },
  PHOTO_STORY_3: { src: "/photos/PHOTO_STORY_3.png", width: 240, height: 320 },
  PHOTO_STORY_4: { src: "/photos/PHOTO_STORY_4.png", width: 320, height: 200 },
  PHOTO_STORY_5: { src: "/photos/PHOTO_STORY_5.png", width: 240, height: 320 },
  PHOTO_ABOUT: { src: "/photos/PHOTO_ABOUT.png", width: 240, height: 320 },
  PHOTO_IDENTITY: { src: "/photos/PHOTO_IDENTITY.png", width: 320, height: 200 },
  PHOTO_SERVICE_COMMERCIAL: {
    src: "/photos/PHOTO_SERVICE_COMMERCIAL.png",
    width: 300,
    height: 200,
  },
  PHOTO_SERVICE_PRIVATE: {
    src: "/photos/PHOTO_SERVICE_PRIVATE.png",
    width: 300,
    height: 200,
  },
  PHOTO_SERVICE_EVENTS: {
    src: "/photos/PHOTO_SERVICE_EVENTS.png",
    width: 300,
    height: 200,
  },
  PHOTO_CTA: { src: "/photos/PHOTO_CTA.png", width: 320, height: 200 },
  PHOTO_PAGE_ABOUT: {
    src: "/photos/PHOTO_PAGE_ABOUT.png",
    width: 320,
    height: 180,
  },
  PHOTO_PAGE_PORTFOLIO: {
    src: "/photos/PHOTO_PAGE_PORTFOLIO.png",
    width: 320,
    height: 180,
  },
  PHOTO_PAGE_PROJECTS: {
    src: "/photos/PHOTO_PAGE_PROJECTS.png",
    width: 320,
    height: 180,
  },
  PHOTO_PAGE_SHOP: {
    src: "/photos/PHOTO_PAGE_SHOP.png",
    width: 320,
    height: 180,
  },
  PHOTO_PAGE_CONTACT: {
    src: "/photos/PHOTO_PAGE_CONTACT.png",
    width: 320,
    height: 180,
  },
  PHOTO_PAGE_BLOG: {
    src: "/photos/PHOTO_PAGE_BLOG.png",
    width: 320,
    height: 180,
  },
  PHOTO_CAT_WATER: {
    src: "/photos/PHOTO_CAT_WATER.png",
    width: 300,
    height: 200,
    category: "water",
  },
  PHOTO_CAT_TRAIL: {
    src: "/photos/PHOTO_CAT_TRAIL.png",
    width: 300,
    height: 200,
    category: "trail",
  },
  PHOTO_CAT_SNOW: {
    src: "/photos/PHOTO_CAT_SNOW.png",
    width: 300,
    height: 200,
    category: "snow",
  },
  PHOTO_CAT_LIFE: {
    src: "/photos/PHOTO_CAT_LIFE.png",
    width: 300,
    height: 200,
    category: "life",
  },
  PHOTO_CAT_VIDEO: {
    src: "/photos/PHOTO_CAT_VIDEO.png",
    width: 300,
    height: 200,
    category: "video",
  },
  PHOTO_GALLERY_01: {
    src: "/photos/PHOTO_GALLERY_01.png",
    width: 200,
    height: 300,
    category: "snow",
  },
  PHOTO_GALLERY_02: {
    src: "/photos/PHOTO_GALLERY_02.png",
    width: 300,
    height: 200,
    category: "water",
  },
  PHOTO_GALLERY_03: {
    src: "/photos/PHOTO_GALLERY_03.png",
    width: 225,
    height: 225,
    category: "life",
  },
  PHOTO_GALLERY_04: {
    src: "/photos/PHOTO_GALLERY_04.png",
    width: 200,
    height: 275,
    category: "trail",
  },
  PHOTO_GALLERY_05: {
    src: "/photos/PHOTO_GALLERY_05.png",
    width: 300,
    height: 200,
    category: "snow",
  },
  PHOTO_GALLERY_06: {
    src: "/photos/PHOTO_GALLERY_06.png",
    width: 200,
    height: 300,
    category: "snow",
  },
  PHOTO_GALLERY_07: {
    src: "/photos/PHOTO_GALLERY_07.png",
    width: 300,
    height: 225,
    category: "life",
  },
  PHOTO_GALLERY_08: {
    src: "/photos/PHOTO_GALLERY_08.png",
    width: 225,
    height: 300,
    category: "trail",
  },
  PHOTO_GALLERY_09: {
    src: "/photos/PHOTO_GALLERY_09.png",
    width: 300,
    height: 200,
    category: "water",
  },
  PHOTO_GALLERY_10: {
    src: "/photos/PHOTO_GALLERY_10.png",
    width: 200,
    height: 250,
    category: "snow",
  },
  PHOTO_GALLERY_11: {
    src: "/photos/PHOTO_GALLERY_11.png",
    width: 275,
    height: 200,
    category: "life",
  },
  PHOTO_GALLERY_12: {
    src: "/photos/PHOTO_GALLERY_12.png",
    width: 200,
    height: 300,
    category: "trail",
  },
  PHOTO_GALLERY_13: {
    src: "/photos/PHOTO_GALLERY_13.png",
    width: 300,
    height: 200,
    category: "water",
  },
  PHOTO_GALLERY_14: {
    src: "/photos/PHOTO_GALLERY_14.png",
    width: 225,
    height: 225,
    category: "life",
  },
  PHOTO_GALLERY_15: {
    src: "/photos/PHOTO_GALLERY_15.png",
    width: 200,
    height: 275,
    category: "trail",
  },
  PHOTO_GALLERY_16: {
    src: "/photos/PHOTO_GALLERY_16.png",
    width: 300,
    height: 200,
    category: "video",
  },
  PHOTO_GALLERY_17: {
    src: "/photos/PHOTO_GALLERY_17.png",
    width: 225,
    height: 300,
    category: "water",
  },
  PHOTO_GALLERY_18: {
    src: "/photos/PHOTO_GALLERY_18.png",
    width: 300,
    height: 225,
    category: "life",
  },
};

export const galleryIds = photoIds.filter((id) =>
  id.startsWith("PHOTO_GALLERY_")
) as PhotoId[];

export const heroCarouselIds: PhotoId[] = [
  "PHOTO_HERO_2",
  "PHOTO_HERO_3",
  "PHOTO_STORY_2",
];

export const partners = [
  "HOKA",
  "Leki",
  "Duotone",
  "Freeride World Tour",
  "Salomon",
  "Canada Alpine",
  "Manigod",
  "Super Natural Club",
] as const;

export function photosByCategory(category: PortfolioCategory): PhotoId[] {
  return (Object.keys(photos) as PhotoId[]).filter(
    (id) => photos[id].category === category
  );
}
