import type { Service } from "../types";

export const heroImage =
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1800&q=85";

const baseServiceFallbacks: Omit<Service, "id" | "active">[] = [
  {
    name: "Facial Treatments",
    slug: "facial-treatments",
    description: "Tailored cleansing, exfoliation, hydration, and glow-restoring care for every skin type.",
    durationMinutes: 60,
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80",
    priceFrom: 95
  },
  {
    name: "Laser Hair Removal",
    slug: "laser-hair-removal",
    description: "Precise, modern laser sessions designed for smoother skin and long-term confidence.",
    durationMinutes: 45,
    imageUrl: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=900&q=80",
    priceFrom: 120
  },
  {
    name: "Botox",
    slug: "botox",
    description: "Subtle wrinkle-softening treatments performed with a natural, balanced aesthetic.",
    durationMinutes: 30,
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80",
    priceFrom: 180
  },
  {
    name: "Fillers",
    slug: "fillers",
    description: "Elegant contouring and volume restoration guided by facial harmony and restraint.",
    durationMinutes: 45,
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
    priceFrom: 260
  },
  {
    name: "Skin Rejuvenation",
    slug: "skin-rejuvenation",
    description: "Brightening and texture-improving plans for radiance, tone, and refined pores.",
    durationMinutes: 75,
    imageUrl: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80",
    priceFrom: 150
  },
  {
    name: "Acne Treatment",
    slug: "acne-treatment",
    description: "Clinical skin programs that calm active breakouts and support barrier recovery.",
    durationMinutes: 50,
    imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80",
    priceFrom: 110
  },
  {
    name: "Anti-Aging Treatments",
    slug: "anti-aging-treatments",
    description: "Regenerative care plans targeting firmness, fine lines, hydration, and luminosity.",
    durationMinutes: 70,
    imageUrl: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?auto=format&fit=crop&w=900&q=80",
    priceFrom: 190
  },
  {
    name: "Chemical Peels",
    slug: "chemical-peels",
    description: "Professional resurfacing peels selected for pigmentation, acne marks, and glow.",
    durationMinutes: 40,
    imageUrl: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=900&q=80",
    priceFrom: 125
  },
  {
    name: "Body Contouring",
    slug: "body-contouring",
    description: "Non-surgical shaping treatments planned around your body goals and comfort.",
    durationMinutes: 90,
    imageUrl: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80",
    priceFrom: 240
  },
  {
    name: "Microneedling",
    slug: "microneedling",
    description: "Collagen-stimulating treatments for texture, scars, firmness, and healthy renewal.",
    durationMinutes: 60,
    imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80",
    priceFrom: 165
  }
];

export const serviceFallbacks: Service[] = baseServiceFallbacks.map((service, index) => ({
  ...service,
  id: `fallback-${index}`,
  active: true
}));

export const testimonials = [
  {
    name: "Maya R.",
    rating: 5,
    text: "The team made every step feel calm and considered. My skin looks refreshed without looking overdone."
  },
  {
    name: "Nadine K.",
    rating: 5,
    text: "Professional, warm, and meticulous. The consultation was honest and the results were beautifully natural."
  },
  {
    name: "Lina S.",
    rating: 5,
    text: "A premium clinic experience from arrival to aftercare. I finally have a plan that fits my skin."
  }
];

export const specialists = ["Dr. Amara Hale", "Dr. Celeste Noor", "Mira Laurent, RN", "No preference"];
