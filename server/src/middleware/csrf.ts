import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { env, isProduction } from "../env.js";

const cookieName = "csrf_nonce";
const unsafeMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function sign(nonce: string) {
  return crypto.createHmac("sha256", env.CSRF_SECRET).update(nonce).digest("hex");
}

function timingSafeEqual(a: string, b: string) {
  const first = Buffer.from(a);
  const second = Buffer.from(b);
  return first.length === second.length && crypto.timingSafeEqual(first, second);
}

export function issueCsrfToken(_req: Request, res: Response) {
  const nonce = crypto.randomBytes(32).toString("hex");
  res.cookie(cookieName, nonce, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 2 * 60 * 60 * 1000
  });
  res.json({ csrfToken: `${nonce}.${sign(nonce)}` });
}

export function requireCsrf(req: Request, res: Response, next: NextFunction) {
  if (!unsafeMethods.has(req.method)) return next();

  const nonce = req.cookies[cookieName];
  const token = req.get("x-csrf-token");
  if (!nonce || !token) return res.status(403).json({ message: "Missing CSRF token" });

  const [tokenNonce, tokenSignature] = token.split(".");
  if (!tokenNonce || !tokenSignature || tokenNonce !== nonce) {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }

  if (!timingSafeEqual(tokenSignature, sign(tokenNonce))) {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }

  next();
}
