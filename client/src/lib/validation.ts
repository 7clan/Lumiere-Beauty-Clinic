import { z } from "zod";

export const strongPasswordSchema = z
  .string()
  .min(10, "Use at least 10 characters")
  .regex(/[A-Z]/, "Include an uppercase letter")
  .regex(/[a-z]/, "Include a lowercase letter")
  .regex(/[0-9]/, "Include a number")
  .regex(/[^A-Za-z0-9]/, "Include a symbol");

export const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30).optional(),
  password: strongPasswordSchema
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required")
});

export const resetSchema = z.object({
  email: z.string().trim().email("Enter a valid email")
});

export const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30).optional()
});

export const appointmentSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  phone: z.string().trim().min(7, "Enter a phone number").max(30),
  email: z.string().trim().email("Enter a valid email").max(160),
  serviceId: z.string().min(1, "Choose a service"),
  preferredDate: z.string().min(1, "Choose a date"),
  preferredTime: z.string().min(1, "Choose a time"),
  specialist: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(800, "Keep notes under 800 characters").optional()
});

export type SignupForm = z.infer<typeof signupSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type ResetForm = z.infer<typeof resetSchema>;
export type ProfileForm = z.infer<typeof profileSchema>;
export type AppointmentForm = z.infer<typeof appointmentSchema>;
