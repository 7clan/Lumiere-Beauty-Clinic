import bcrypt from "bcrypt";
import { Router } from "express";
import { prisma } from "../db.js";
import { isProduction } from "../env.js";
import { requireAuth } from "../middleware/auth.js";
import { authRateLimit } from "../middleware/rateLimit.js";
import { validateBody } from "../middleware/validate.js";
import { loginSchema, profileSchema, resetPasswordSchema, signupSchema } from "../schemas.js";
import { signAuthToken } from "../utils/tokens.js";

export const authRouter = Router();

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000
};

function serializeUser(user: { id: string; email: string; fullName: string; phone: string | null; role: "CLIENT" | "ADMIN" }) {
  return { id: user.id, email: user.email, fullName: user.fullName, phone: user.phone, role: user.role };
}

authRouter.post("/signup", authRateLimit, validateBody(signupSchema), async (req, res) => {
  const { email, fullName, phone, password } = req.body;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ message: "Email already registered" });

  // Passwords are stored only as salted bcrypt hashes; the plaintext password is never persisted.
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, fullName, phone, passwordHash },
    select: { id: true, email: true, fullName: true, phone: true, role: true }
  });

  res.cookie("auth_token", signAuthToken({ sub: user.id, role: user.role }), cookieOptions);
  res.status(201).json({ user: serializeUser(user) });
});

authRouter.post("/login", authRateLimit, validateBody(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  res.cookie("auth_token", signAuthToken({ sub: user.id, role: user.role }), cookieOptions);
  res.json({ user: serializeUser(user) });
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie("auth_token", cookieOptions);
  res.json({ ok: true });
});

authRouter.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

authRouter.patch("/profile", requireAuth, validateBody(profileSchema), async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.user!.id },
    data: req.body,
    select: { id: true, email: true, fullName: true, phone: true, role: true }
  });
  res.json({ user: serializeUser(user) });
});

authRouter.post("/reset-password", authRateLimit, validateBody(resetPasswordSchema), async (_req, res) => {
  // Always return the same response to avoid leaking which emails are registered.
  res.json({ ok: true });
});
