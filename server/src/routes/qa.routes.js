import express from "express";
import { searchChunks } from "../services/retriever.js";
import { buildIndex, getIndex } from "../services/indexBuilder.js";
import QAHistory from "../models/QAHistory.js";
import { answerWithLLM } from "../services/llm.js";

const router = express.Router();

/**
 * POST /api/qa/ask
 * Ask question about indexed codebase
 * Returns LLM answer + proof snippets
 */
router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "question required" });
    }

    console.log("QA ASK HIT:", question);

    // ✅ rebuild index if server restarted and memory cleared
    if (getIndex().length === 0) {
      console.log("Index empty — rebuilding from extracted/");
      buildIndex("extracted");
    }

    // ✅ retrieve top matching chunks
    const hits = searchChunks(question, 5);
    console.log("Hits found:", hits.length);

    // fallback if nothing matched
    if (hits.length === 0) {
      return res.json({
        answer: "No relevant code found for this question.",
        snippets: []
      });
    }

    // ✅ LLM synthesis answer using snippets
    let llmAnswer = "";
    try {
      llmAnswer = await answerWithLLM(question, hits);
    } catch (err) {
      console.error("LLM failed — using fallback answer");
      llmAnswer = hits
        .map(h => `${h.fileName} (${h.startLine}-${h.endLine})`)
        .join("\n");
    }

    // ✅ save to Mongo
    const saved = await QAHistory.create({
      question,
      answer: llmAnswer,
      snippets: hits
    });

    console.log("Saved doc id:", saved._id);

    res.json({
      answer: llmAnswer,
      snippets: hits
    });

  } catch (err) {
    console.error("QA ERROR:", err);
    res.status(500).json({ error: "qa failed" });
  }
});

/**
 * GET /api/qa/history
 * Last 10 Q&A
 */
router.get("/history", async (req, res) => {
  try {
    const items = await QAHistory.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "history failed" });
  }
});

export default router;