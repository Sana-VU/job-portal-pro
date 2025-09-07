import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import appRoutes from "./routes/applications.js";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/applications", appRoutes);

const PORT = process.env.PORT || 3002;
connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✓ API listening on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("DB connection error:", err.message);
    process.exit(1);
  });
