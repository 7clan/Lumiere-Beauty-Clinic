import jwt from "jsonwebtoken";
import type { UserRole } from "@prisma/client";
import { env } from "../env.js";

export type AuthTokenPayload = {
  sub: string;
  role: UserRole;
};

export function signAuthToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
}
