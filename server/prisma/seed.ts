import bcrypt from "bcrypt";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  ["Facial Treatments", "facial-treatments", "Tailored cleansing, exfoliation, hydration, and glow-restoring care for every skin type.", 60, "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80", 95],
  ["Laser Hair Removal", "laser-hair-removal", "Precise, modern laser sessions designed for smoother skin and long-term confidence.", 45, "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=900&q=80", 120],
  ["Botox", "botox", "Subtle wrinkle-softening treatments performed with a natural, balanced aesthetic.", 30, "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80", 180],
  ["Fillers", "fillers", "Elegant contouring and volume restoration guided by facial harmony and restraint.", 45, "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80", 260],
  ["Skin Rejuvenation", "skin-rejuvenation", "Brightening and texture-improving plans for radiance, tone, and refined pores.", 75, "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80", 150],
  ["Acne Treatment", "acne-treatment", "Clinical skin programs that calm active breakouts and support barrier recovery.", 50, "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80", 110],
  ["Anti-Aging Treatments", "anti-aging-treatments", "Regenerative care plans targeting firmness, fine lines, hydration, and luminosity.", 70, "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?auto=format&fit=crop&w=900&q=80", 190],
  ["Chemical Peels", "chemical-peels", "Professional resurfacing peels selected for pigmentation, acne marks, and glow.", 40, "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=900&q=80", 125],
  ["Body Contouring", "body-contouring", "Non-surgical shaping treatments planned around your body goals and comfort.", 90, "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80", 240],
  ["Microneedling", "microneedling", "Collagen-stimulating treatments for texture, scars, firmness, and healthy renewal.", 60, "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80", 165]
] as const;

async function main() {
  for (const [name, slug, description, durationMinutes, imageUrl, priceFrom] of services) {
    await prisma.service.upsert({
      where: { slug },
      update: { name, description, durationMinutes, imageUrl, priceFrom, active: true },
      create: { name, slug, description, durationMinutes, imageUrl, priceFrom }
    });
  }

  await prisma.user.upsert({
    where: { email: "admin@lumiereclinic.com" },
    update: { role: UserRole.ADMIN },
    create: {
      email: "admin@lumiereclinic.com",
      fullName: "Clinic Admin",
      passwordHash: await bcrypt.hash("AdminPass123!", 12),
      role: UserRole.ADMIN
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
