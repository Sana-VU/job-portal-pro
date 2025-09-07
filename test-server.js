import "dotenv/config";
import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "Test server is running" });
});

app.get("/test", (_req, res) => {
  res.json({
    message: "Environment variables:",
    MONGODB_URI: process.env.MONGODB_URI ? "Set" : "Not set",
    JWT_SECRET: process.env.JWT_SECRET ? "Set" : "Not set",
    PORT: process.env.PORT || "Not set",
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "Not set",
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✓ Test server listening on http://localhost:${PORT}`);
  console.log("Environment check:");
  console.log("- MONGODB_URI:", process.env.MONGODB_URI ? "Set" : "Not set");
  console.log("- JWT_SECRET:", process.env.JWT_SECRET ? "Set" : "Not set");
  console.log("- PORT:", process.env.PORT || "Not set");
  console.log("- CLIENT_ORIGIN:", process.env.CLIENT_ORIGIN || "Not set");
});
