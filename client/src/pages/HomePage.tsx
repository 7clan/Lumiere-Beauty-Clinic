import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";
import { heroImage, serviceFallbacks, testimonials } from "../data/content";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";
import { ServiceCard } from "../ui/ServiceCard";

export function HomePage() {
  return (
    <>
      <section className="relative min-h-[760px] overflow-hidden">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/78 to-white/10" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-4 pb-16 pt-20 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.26em] text-rosewood">Aesthetic skincare clinic</p>
            <h1 className="font-display text-6xl font-semibold leading-[0.95] text-ink sm:text-7xl lg:text-8xl">Enhance Your Natural Beauty</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/75">
              Professional skincare, aesthetic treatments, and personalized beauty care delivered with clinical precision and a soft spa-like touch.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/book">Book an Appointment</Button>
              <Button to="/services" variant="secondary">Explore Treatments</Button>
              <Button to="/signup" variant="ghost">Create Account</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ["Medical-grade care", "Licensed specialists and evidence-led treatment plans."],
            ["Soft, natural results", "Aesthetic decisions guided by proportion and restraint."],
            ["Private aftercare", "Clear follow-up, appointment history, and secure client records."]
          ].map(([title, text]) => (
            <div key={title} className="flex gap-4 rounded-lg bg-pearl p-5">
              <ShieldCheck className="mt-1 shrink-0 text-rosewood" />
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink/70">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Section eyebrow="Signature treatments" title="Quiet luxury, clinical confidence">
        <div className="grid gap-6 md:grid-cols-3">
          {serviceFallbacks.slice(0, 3).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="mt-8">
          <Button to="/services" variant="secondary">
            View all treatments <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </Section>

      <Testimonials />
      <Gallery />
    </>
  );
}

export function Testimonials() {
  return (
    <Section eyebrow="Client stories" title="Trusted for subtle, polished results" className="bg-white">
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-lg border border-pearl bg-ivory p-6 shadow-soft">
            <div className="flex gap-1 text-champagne">
              {Array.from({ length: item.rating }).map((_, index) => (
                <Star key={index} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="mt-5 leading-7 text-ink/75">"{item.text}"</p>
            <p className="mt-5 font-semibold">{item.name}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80"
  ];

  return (
    <Section eyebrow="Before and after" title="Treatment results gallery">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <div key={image} className="overflow-hidden rounded-lg bg-white shadow-soft">
            <img src={image} alt="" className="h-72 w-full object-cover transition duration-500 hover:scale-105" />
            <div className="flex items-center justify-between px-4 py-3 text-sm font-semibold">
              <span>Case {index + 1}</span>
              <Sparkles size={16} className="text-rosewood" />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 max-w-3xl text-sm leading-6 text-ink/65">
        Results may vary depending on the client, treatment plan, skin condition, medical history, and aftercare.
      </p>
    </Section>
  );
}
