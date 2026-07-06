import { AppointmentStatus } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { appointmentRateLimit } from "../middleware/rateLimit.js";
import { validateBody } from "../middleware/validate.js";
import { appointmentSchema } from "../schemas.js";

export const appointmentsRouter = Router();

appointmentsRouter.use(requireAuth);

appointmentsRouter.get("/mine", async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    where: { userId: req.user!.id },
    include: { service: true },
    orderBy: { createdAt: "desc" }
  });
  res.json({ appointments });
});

appointmentsRouter.post("/", appointmentRateLimit, validateBody(appointmentSchema), async (req, res) => {
  const service = await prisma.service.findFirst({ where: { id: req.body.serviceId, active: true } });
  if (!service) return res.status(400).json({ message: "Invalid service" });

  const appointment = await prisma.appointment.create({
    data: {
      userId: req.user!.id,
      serviceId: req.body.serviceId,
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      preferredDate: new Date(`${req.body.preferredDate}T00:00:00.000Z`),
      preferredTime: req.body.preferredTime,
      specialist: req.body.specialist,
      notes: req.body.notes
    },
    include: { service: true }
  });

  res.status(201).json({ appointment });
});

appointmentsRouter.patch("/:id/cancel", async (req, res) => {
  const appointment = await prisma.appointment.updateMany({
    where: { id: req.params.id, userId: req.user!.id, status: { in: [AppointmentStatus.REQUESTED, AppointmentStatus.APPROVED] } },
    data: { status: AppointmentStatus.CANCELLED }
  });
  if (appointment.count === 0) return res.status(404).json({ message: "Appointment not found" });
  res.json({ ok: true });
});

appointmentsRouter.patch("/:id/reschedule", async (req, res) => {
  const appointment = await prisma.appointment.updateMany({
    where: { id: req.params.id, userId: req.user!.id, status: { in: [AppointmentStatus.REQUESTED, AppointmentStatus.APPROVED] } },
    data: { status: AppointmentStatus.REQUESTED }
  });
  if (appointment.count === 0) return res.status(404).json({ message: "Appointment not found" });
  res.json({ ok: true });
});
