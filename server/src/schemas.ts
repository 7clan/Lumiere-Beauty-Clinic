import { AppointmentStatus } from "@prisma/client";
import { z } from "zod";

export const strongPasswordSchema = z
  .string()
  .min(10)
  .regex(/[A-Z]/)
  .regex(/[a-z]/)
  .regex(/[0-9]/)
  .regex(/[^A-Za-z0-9]/);

export const signupSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160).transform((value) => value.toLowerCase()),
  phone: z.string().trim().min(7).max(30).optional(),
  password: strongPasswordSchema
});

export const loginSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z.string().min(1)
});

export const resetPasswordSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase())
});

export const profileSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30).optional()
});

export const appointmentSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(160).transform((value) => value.toLowerCase()),
  serviceId: z.string().min(1),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferredTime: z.string().regex(/^\d{2}:\d{2}$/),
  specialist: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(800).optional()
});

export const appointmentStatusSchema = z.object({
  status: z.nativeEnum(AppointmentStatus)
});

export const serviceUpdateSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  description: z.string().trim().min(10).max(800).optional(),
  durationMinutes: z.number().int().min(10).max(240).optional(),
  imageUrl: z.string().url().optional(),
  priceFrom: z.number().int().min(0).optional(),
  active: z.boolean().optional()
});

export const availabilitySlotSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/)
});
