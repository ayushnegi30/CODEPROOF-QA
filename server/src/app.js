import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import statusRoutes from "./routes/status.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import indexRoutes from "./routes/index.routes.js";
import qaRoutes from "./routes/qa.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use("/api/status", statusRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/index", indexRoutes);
app.use("/api/qa", qaRoutes);

export default app;