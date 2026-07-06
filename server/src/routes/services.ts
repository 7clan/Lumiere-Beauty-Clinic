import { Router } from "express";
import { prisma } from "../db.js";

export const servicesRouter = Router();

servicesRouter.get("/", async (_req, res) => {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { name: "asc" }
  });
  res.json({ services });
});
