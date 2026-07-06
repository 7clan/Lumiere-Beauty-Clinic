import { Award, HeartHandshake, Microscope, ShieldCheck } from "lucide-react";
import { Section } from "../ui/Section";

export function AboutPage() {
  const values = [
    { icon: HeartHandshake, title: "Personalized plans", text: "Every treatment begins with a thoughtful consultation, skin assessment, and goals review." },
    { icon: ShieldCheck, title: "Safety standards", text: "We follow strict hygiene protocols, informed consent workflows, and clinical documentation." },
    { icon: Microscope, title: "Advanced equipment", text: "Modern devices and medical-grade products support precise, comfortable treatment delivery." },
    { icon: Award, title: "Professional team", text: "Licensed specialists blend technical expertise with a refined eye for natural beauty." }
  ];

  return (
    <>
      <section className="bg-pearl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-rosewood">About Lumiere</p>
            <h1 className="mt-3 font-display text-5xl font-semibold sm:text-6xl">Care that feels serene and performs clinically.</h1>
            <p className="mt-6 text-lg leading-8 text-ink/75">
              Our mission is to help clients feel confident in their own features through safe, personalized, and evidence-led aesthetic care.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1200&q=85"
            alt=""
            className="h-[520px] w-full rounded-lg object-cover shadow-soft"
          />
        </div>
      </section>
      <Section eyebrow="Our approach" title="Professional values, premium experience">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-lg bg-white p-6 shadow-soft">
              <Icon className="text-rosewood" />
              <h2 className="mt-5 font-display text-2xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{text}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
