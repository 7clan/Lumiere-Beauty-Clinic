import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";

export function ContactPage() {
  return (
    <Section eyebrow="Contact" title="Visit our clinic">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          {[
            [MapPin, "18 Rose Avenue, Beverly Hills, CA"],
            [Phone, "+1 (310) 555-0188"],
            [Mail, "hello@lumiereclinic.com"],
            [Instagram, "@lumierebeautyclinic"]
          ].map(([Icon, text]) => (
            <div key={String(text)} className="flex items-center gap-4 rounded-lg bg-white p-5 shadow-soft">
              <Icon className="text-rosewood" />
              <span className="font-semibold">{String(text)}</span>
            </div>
          ))}
          <div className="rounded-lg bg-pearl p-6">
            <h2 className="font-display text-2xl font-semibold">Working hours</h2>
            <p className="mt-3 text-sm leading-7 text-ink/70">Monday-Friday: 9:00 AM-7:00 PM<br />Saturday: 10:00 AM-5:00 PM<br />Sunday: Closed</p>
          </div>
          <form className="grid gap-4 rounded-lg bg-white p-6 shadow-soft">
            <input className="field" placeholder="Full name" />
            <input className="field" placeholder="Email" type="email" />
            <textarea className="field min-h-32" placeholder="How can we help?" />
            <Button type="submit">Send Message</Button>
          </form>
        </div>
        <iframe
          title="Clinic map"
          className="min-h-[640px] w-full rounded-lg border-0 shadow-soft"
          loading="lazy"
          src="https://www.google.com/maps?q=Beverly%20Hills%20CA&output=embed"
        />
      </div>
    </Section>
  );
}
