export type OfferCategory = "ski" | "photo" | "video";

export type BookingOffer = {
  id: string;
  category: OfferCategory;
  price: number;
};

export const bookingOffers: BookingOffer[] = [
  { id: "ski-half", category: "ski", price: 550 },
  { id: "ski-full", category: "ski", price: 770 },
  { id: "photo-1h", category: "photo", price: 230 },
  { id: "photo-2h", category: "photo", price: 410 },
  { id: "photo-half", category: "photo", price: 550 },
  { id: "photo-full", category: "photo", price: 970 },
  { id: "video-2h", category: "video", price: 550 },
  { id: "video-half", category: "video", price: 850 },
  { id: "video-full", category: "video", price: 1450 },
];

export function formatPrice(price: number): string {
  return `${price.toLocaleString("fr-FR")}€`;
}

export function getWhatsAppNumber(): string {
  return "33783661146";
}

export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(text)}`;
}
