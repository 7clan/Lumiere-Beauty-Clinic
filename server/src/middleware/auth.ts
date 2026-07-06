import type { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { prisma } from "../db.js";
import { verifyAuthToken } from "../utils/tokens.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        role: UserRole;
      };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json({ message: "Authentication required" });

  try {
    const payload = verifyAuthToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, fullName: true, phone: true, role: true }
    });
    if (!user) return res.status(401).json({ message: "Authentication required" });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Authentication required" });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== UserRole.ADMIN) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}
