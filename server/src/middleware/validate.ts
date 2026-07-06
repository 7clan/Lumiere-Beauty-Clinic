import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { sanitizeObject } from "../utils/sanitize.js";

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(sanitizeObject(req.body));
    if (!parsed.success) {
      return res.status(400).json({ message: "Validation failed", errors: parsed.error.flatten() });
    }
    req.body = parsed.data;
    next();
  };
}
