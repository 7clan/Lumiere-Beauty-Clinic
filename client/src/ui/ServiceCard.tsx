import { Clock } from "lucide-react";
import type { Service } from "../types";
import { Button } from "./Button";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="overflow-hidden rounded-lg border border-white bg-white shadow-soft transition hover:-translate-y-1">
      <img src={service.imageUrl} alt="" className="h-56 w-full object-cover" />
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold">{service.name}</h3>
          {service.priceFrom ? <span className="text-sm font-bold text-rosewood">${service.priceFrom}+</span> : null}
        </div>
        <p className="mt-3 min-h-20 text-sm leading-6 text-ink/70">{service.description}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-taupe">
            <Clock size={16} /> {service.durationMinutes} min
          </span>
          <Button to="/book" className="py-2.5">Book Appointment</Button>
        </div>
      </div>
    </article>
  );
}
