import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { z } from "zod";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  CLIENT_ORIGIN: z.string().url().default("http://localhost:5173"),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  COOKIE_SECRET: z.string().min(32, "COOKIE_SECRET must be at least 32 characters"),
  CSRF_SECRET: z.string().min(32, "CSRF_SECRET must be at least 32 characters")
});

export const env = envSchema.parse(process.env);
export const isProduction = env.NODE_ENV === "production";
