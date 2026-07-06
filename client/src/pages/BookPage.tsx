import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { serviceFallbacks, specialists } from "../data/content";
import { api } from "../lib/api";
import { appointmentSchema, type AppointmentForm } from "../lib/validation";
import { useAuth } from "../state/AuthContext";
import type { Service } from "../types";
import { Button } from "../ui/Button";
import { FormField } from "../ui/FormField";
import { Section } from "../ui/Section";

export function BookPage() {
  const { user } = useAuth();
  const [confirmed, setConfirmed] = useState(false);
  const { data } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await api.get<{ services: Service[] }>("/services")).data.services,
    retry: false
  });
  const services = data?.length ? data : serviceFallbacks;
  const { register, handleSubmit, formState, reset } = useForm<AppointmentForm>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { fullName: user?.fullName ?? "", email: user?.email ?? "", phone: user?.phone ?? "" }
  });

  const onSubmit = handleSubmit(async (values) => {
    await api.post("/appointments", values);
    setConfirmed(true);
    reset(values);
  });

  return (
    <Section eyebrow="Booking" title="Request an appointment" className="bg-pearl">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-lg bg-white p-6 shadow-soft">
          <h2 className="font-display text-3xl font-semibold">What happens next</h2>
          <p className="mt-4 leading-7 text-ink/70">Our clinic reviews every appointment request and contacts you shortly to confirm timing, specialist availability, and preparation notes.</p>
          {confirmed && (
            <div className="mt-6 rounded-lg bg-rosewood/10 p-4 font-semibold text-rosewood">
              Your appointment request has been received. Our clinic will contact you shortly to confirm.
            </div>
          )}
        </div>
        <form onSubmit={onSubmit} className="grid gap-5 rounded-lg bg-white p-6 shadow-soft md:grid-cols-2">
          <FormField label="Full name" error={formState.errors.fullName}><input className="field" {...register("fullName")} /></FormField>
          <FormField label="Phone number" error={formState.errors.phone}><input className="field" {...register("phone")} /></FormField>
          <FormField label="Email" error={formState.errors.email}><input className="field" type="email" {...register("email")} /></FormField>
          <FormField label="Selected service" error={formState.errors.serviceId}>
            <select className="field" {...register("serviceId")}>
              <option value="">Choose a service</option>
              {services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}
            </select>
          </FormField>
          <FormField label="Preferred date" error={formState.errors.preferredDate}><input className="field" type="date" {...register("preferredDate")} /></FormField>
          <FormField label="Preferred time" error={formState.errors.preferredTime}><input className="field" type="time" {...register("preferredTime")} /></FormField>
          <FormField label="Preferred specialist" error={formState.errors.specialist}>
            <select className="field" {...register("specialist")}>{specialists.map((name) => <option key={name}>{name}</option>)}</select>
          </FormField>
          <div className="md:col-span-2">
            <FormField label="Notes or concerns" error={formState.errors.notes}><textarea className="field min-h-32" {...register("notes")} /></FormField>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={formState.isSubmitting}>Submit Appointment Request</Button>
          </div>
        </form>
      </div>
    </Section>
  );
}
