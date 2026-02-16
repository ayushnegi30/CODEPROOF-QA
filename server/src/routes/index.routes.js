import express from "express";
import { buildIndex } from "../services/indexBuilder.js";

const router = express.Router();

router.post("/build", (req, res) => {
  const { folder } = req.body;
  if (!folder) return res.status(400).json({ error: "folder required" });

  const stats = buildIndex(folder);
  res.json({ message: "Index built", stats });
});

export default router;