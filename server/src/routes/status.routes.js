import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  const dbState = mongoose.connection.readyState;

  res.json({
    backend: "ok",
    db: dbState === 1 ? "connected" : "not connected",
    llm: process.env.OPENROUTER_API_KEY ? "configured" : "missing"
  });
});

export default router;