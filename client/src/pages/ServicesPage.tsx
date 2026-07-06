import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Service } from "../types";
import { serviceFallbacks } from "../data/content";
import { Section } from "../ui/Section";
import { ServiceCard } from "../ui/ServiceCard";

export function ServicesPage() {
  const { data } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await api.get<{ services: Service[] }>("/services");
      return response.data.services;
    },
    retry: false
  });

  const services = data?.length ? data : serviceFallbacks;

  return (
    <Section eyebrow="Treatments" title="Services designed around your skin and goals" className="bg-pearl">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </Section>
  );
}
