import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { appointmentsRouter } from "./routes/appointments.js";
import { authRouter } from "./routes/auth.js";
import { adminRouter } from "./routes/admin.js";
import { servicesRouter } from "./routes/services.js";
import { env } from "./env.js";
import { issueCsrfToken, requireCsrf } from "./middleware/csrf.js";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser(env.COOKIE_SECRET));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/csrf-token", issueCsrfToken);
app.use(requireCsrf);

app.use("/api/auth", authRouter);
app.use("/api/services", servicesRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/admin", adminRouter);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
});

app.listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT}`);
});
