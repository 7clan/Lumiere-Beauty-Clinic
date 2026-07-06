import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Clock, Plus, X } from "lucide-react";
import { useState } from "react";
import { api } from "../lib/api";
import type { Appointment, Service } from "../types";
import { Button } from "../ui/Button";
import { Section } from "../ui/Section";

export function AdminDashboardPage() {
  const queryClient = useQueryClient();
  const [slotDate, setSlotDate] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const appointments = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: async () => (await api.get<{ appointments: Appointment[] }>("/admin/appointments")).data.appointments
  });
  const services = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => (await api.get<{ services: Service[] }>("/admin/services")).data.services
  });
  const updateAppointment = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => api.patch(`/admin/appointments/${id}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-appointments"] })
  });
  const toggleService = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => api.patch(`/admin/services/${id}`, { active }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-services"] })
  });
  const createSlot = useMutation({
    mutationFn: async () => api.post("/admin/availability", { date: slotDate, time: slotTime }),
    onSuccess: () => {
      setSlotDate("");
      setSlotTime("");
    }
  });

  return (
    <Section eyebrow="Admin" title="Clinic operations dashboard" className="bg-pearl">
      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-lg bg-white p-6 shadow-soft">
          <h2 className="font-display text-3xl font-semibold">Appointment requests</h2>
          <div className="mt-6 grid gap-4">
            {(appointments.data ?? []).map((appointment) => (
              <article key={appointment.id} className="rounded-lg border border-pearl p-5">
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{appointment.fullName}</h3>
                    <p className="mt-1 text-sm text-ink/65">{appointment.service.name} · {appointment.preferredDate} at {appointment.preferredTime}</p>
                    <p className="mt-1 text-sm text-ink/65">{appointment.email} · {appointment.phone}</p>
                  </div>
                  <span className="h-fit rounded-full bg-rosewood/10 px-3 py-1 text-xs font-bold text-rosewood">{appointment.status}</span>
                </div>
                {appointment.notes && <p className="mt-4 rounded-lg bg-pearl p-3 text-sm text-ink/70">{appointment.notes}</p>}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button className="py-2" onClick={() => updateAppointment.mutate({ id: appointment.id, status: "APPROVED" })}><Check size={16} className="mr-2" /> Approve</Button>
                  <Button variant="secondary" className="py-2" onClick={() => updateAppointment.mutate({ id: appointment.id, status: "COMPLETED" })}><Clock size={16} className="mr-2" /> Completed</Button>
                  <Button variant="ghost" className="py-2" onClick={() => updateAppointment.mutate({ id: appointment.id, status: "REJECTED" })}><X size={16} className="mr-2" /> Reject</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="grid gap-8">
          <div className="rounded-lg bg-white p-6 shadow-soft">
            <h2 className="font-display text-3xl font-semibold">Manage services</h2>
            <div className="mt-5 grid gap-3">
              {(services.data ?? []).map((service) => (
                <div key={service.id} className="flex items-center justify-between gap-3 rounded-lg bg-pearl p-3">
                  <span className="text-sm font-semibold">{service.name}</span>
                  <button className="focus-ring rounded-full px-3 py-1 text-xs font-bold text-rosewood" onClick={() => toggleService.mutate({ id: service.id, active: !service.active })}>
                    {service.active ? "Active" : "Hidden"}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-soft">
            <h2 className="font-display text-3xl font-semibold">Available time slots</h2>
            <div className="mt-5 grid gap-3">
              <input className="field" type="date" value={slotDate} onChange={(event) => setSlotDate(event.target.value)} />
              <input className="field" type="time" value={slotTime} onChange={(event) => setSlotTime(event.target.value)} />
              <Button onClick={() => createSlot.mutate()} disabled={!slotDate || !slotTime}><Plus size={16} className="mr-2" /> Add Slot</Button>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
