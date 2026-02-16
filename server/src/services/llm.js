const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Build prompt context from retrieved snippets
 */
function buildContext(snippets) {
  return snippets
    .map(s =>
      `FILE: ${s.fileName} (${s.startLine}-${s.endLine})
${s.text}`
    )
    .join("\n\n");
}

/**
 * Ask LLM using OpenRouter free models
 */
export async function answerWithLLM(question, snippets) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY not configured");
  }

  if (!snippets || snippets.length === 0) {
    return "No relevant code snippets found.";
  }

  const context = buildContext(snippets);

  const prompt = `
You are a codebase assistant.

Answer the question using ONLY the provided code snippets.
If unsure, say so.
Always cite file names and line ranges.

QUESTION:
${question}

SNIPPETS:
${context}
`;

  const resp = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openrouter/auto",   // auto selects free available model
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 500
    })
  });

  if (!resp.ok) {
    const errText = await resp.text();
    console.error("OpenRouter error:", errText);
    throw new Error("LLM request failed");
  }

  const data = await resp.json();

  if (!data.choices || !data.choices.length) {
    throw new Error("No LLM choices returned");
  }

  return data.choices[0].message.content;
}