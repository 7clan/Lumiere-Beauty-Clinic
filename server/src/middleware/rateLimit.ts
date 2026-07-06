import rateLimit from "express-rate-limit";

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Please try again later." }
});

export const appointmentRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false
});
