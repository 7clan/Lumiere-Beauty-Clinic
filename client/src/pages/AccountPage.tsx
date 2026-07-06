import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, RotateCcw, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { api } from "../lib/api";
import { profileSchema, type ProfileForm } from "../lib/validation";
import { useAuth } from "../state/AuthContext";
import type { Appointment } from "../types";
import { Button } from "../ui/Button";
import { FormField } from "../ui/FormField";
import { Section } from "../ui/Section";

export function AccountPage() {
  const { user, updateProfile } = useAuth();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["my-appointments"],
    queryFn: async () => (await api.get<{ appointments: Appointment[] }>("/appointments/mine")).data.appointments
  });
  const { register, handleSubmit, formState } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: user?.fullName ?? "", phone: user?.phone ?? "" }
  });
  const statusMutation = useMutation({
    mutationFn: async ({ id, action }: { id: string; action: "cancel" | "reschedule" }) => api.patch(`/appointments/${id}/${action}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-appointments"] })
  });

  return (
    <Section eyebrow="Client account" title={`Hello, ${user?.fullName ?? "client"}`} className="bg-pearl">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <form onSubmit={handleSubmit(updateProfile)} className="rounded-lg bg-white p-6 shadow-soft">
          <h2 className="font-display text-3xl font-semibold">Profile information</h2>
          <div className="mt-6 grid gap-5">
            <FormField label="Full name" error={formState.errors.fullName}><input className="field" {...register("fullName")} /></FormField>
            <FormField label="Phone" error={formState.errors.phone}><input className="field" {...register("phone")} /></FormField>
            <Button type="submit" disabled={formState.isSubmitting}>Update Profile</Button>
          </div>
        </form>
        <div className="rounded-lg bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold">Appointment history</h2>
            <CalendarDays className="text-rosewood" />
          </div>
          <div className="mt-6 grid gap-4">
            {(data ?? []).length === 0 && <p className="rounded-lg bg-pearl p-5 text-sm text-ink/70">No appointments yet.</p>}
            {(data ?? []).map((appointment) => (
              <article key={appointment.id} className="rounded-lg border border-pearl p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{appointment.service.name}</h3>
                    <p className="mt-1 text-sm text-ink/65">{appointment.preferredDate} at {appointment.preferredTime}</p>
                  </div>
                  <span className="rounded-full bg-rosewood/10 px-3 py-1 text-xs font-bold text-rosewood">{appointment.status}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="secondary" className="py-2" onClick={() => statusMutation.mutate({ id: appointment.id, action: "reschedule" })}>
                    <RotateCcw size={16} className="mr-2" /> Reschedule
                  </Button>
                  <Button variant="ghost" className="py-2" onClick={() => statusMutation.mutate({ id: appointment.id, action: "cancel" })}>
                    <XCircle size={16} className="mr-2" /> Cancel
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
