import { Router } from "express";
import { prisma } from "../db.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { appointmentStatusSchema, availabilitySlotSchema, serviceUpdateSchema } from "../schemas.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireAdmin);

function routeParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

adminRouter.get("/appointments", async (_req, res) => {
  const appointments = await prisma.appointment.findMany({
    include: {
      service: true,
      user: { select: { id: true, email: true, fullName: true, phone: true, role: true } }
    },
    orderBy: { createdAt: "desc" }
  });
  res.json({ appointments });
});

adminRouter.patch("/appointments/:id", validateBody(appointmentStatusSchema), async (req, res) => {
  const id = routeParam(req.params.id);
  if (!id) return res.status(400).json({ message: "Missing appointment id" });
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: req.body.status },
    include: { service: true }
  });
  res.json({ appointment });
});

adminRouter.get("/services", async (_req, res) => {
  const services = await prisma.service.findMany({ orderBy: { name: "asc" } });
  res.json({ services });
});

adminRouter.patch("/services/:id", validateBody(serviceUpdateSchema), async (req, res) => {
  const id = routeParam(req.params.id);
  if (!id) return res.status(400).json({ message: "Missing service id" });
  const service = await prisma.service.update({
    where: { id },
    data: req.body
  });
  res.json({ service });
});

adminRouter.get("/availability", async (_req, res) => {
  const slots = await prisma.availabilitySlot.findMany({ orderBy: [{ date: "asc" }, { time: "asc" }] });
  res.json({ slots });
});

adminRouter.post("/availability", validateBody(availabilitySlotSchema), async (req, res) => {
  const slot = await prisma.availabilitySlot.upsert({
    where: {
      date_time: {
        date: new Date(`${req.body.date}T00:00:00.000Z`),
        time: req.body.time
      }
    },
    update: { active: true },
    create: {
      date: new Date(`${req.body.date}T00:00:00.000Z`),
      time: req.body.time
    }
  });
  res.status(201).json({ slot });
});
