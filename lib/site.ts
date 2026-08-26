export const site = {
  name: "Gabriel Madie | Photographe",
  shortName: "Gabriel Madie",
  role: "Photographe",
  url: "https://gabrielmadie.com",
  email: "gabrielmadie.photographe@gmail.com",
  phone: "+33783661146",
  phoneDisplay: "+33 7 83 66 11 46",
  whatsapp: "33783661146",
  instagram: "https://www.instagram.com/gabriellmadie/",
  instagramHandle: "@gabriellmadie",
  location: "Annecy, Haute-Savoie",
} as const;

export function buildWhatsAppUrl(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
