const STOP_WORDS = new Set([
  "where","is","the","a","an","how","what","when","handled","does","do","of","to"
]);

import { getIndex } from "./indexBuilder.js";

function normalizeTerms(q) {
  return q
    .toLowerCase()
    .split(/\W+/)
    .filter(t => t && !STOP_WORDS.has(t));
}

function scoreChunk(chunk, terms) {
  const text = chunk.text.toLowerCase();
  let score = 0;

  for (const t of terms) {
    if (text.includes(t)) score += 2;
    if (chunk.fileName.toLowerCase().includes(t)) score += 3;
  }

  return score;
}

export function searchChunks(question, topK = 5) {
  const index = getIndex();
  const terms = normalizeTerms(question);

  const scored = index
    .map(c => ({ ...c, score: scoreChunk(c, terms) }))
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
}