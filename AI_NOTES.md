# AI_NOTES.md — AI Usage Disclosure

## AI Tools Used

I used AI coding assistants during development, including:

- ChatGPT
- Cursor-style AI completion
- Copilot-style inline suggestions (where helpful)

AI tools were used as development assistants — not blind copy-paste generators.

---

## Where AI Was Used

AI assistance was used for:

- initial project scaffolding guidance
- Express route structure patterns
- React component structuring
- MongoDB + Mongoose model setup
- LLM integration boilerplate
- UI layout improvements
- error debugging and log interpretation
- markdown documentation drafting

---

## What I Verified Manually

All AI-generated code was reviewed and tested manually:

- verified all API routes by calling them directly
- checked MongoDB writes using Compass
- validated zip extraction and indexing output
- confirmed retrieval results matched file contents
- tested Q&A answers against actual snippets
- verified status endpoint health checks
- manually fixed path and module errors
- corrected index builder recursion logic
- adjusted UI overflow and layout behavior

No code was accepted without running and validating behavior.

---

## What I Modified or Fixed Manually

I manually:

- fixed module export/import mismatches
- corrected index builder recursion bugs
- expanded file type filters for indexing
- added fallback behavior when LLM fails
- implemented scroll-safe UI containers
- added status page routing
- tuned layout grid widths
- ensured Mongo history limits (last 10)
- added environment-variable safety
- removed secrets from code
- created proper .env.example template

---

## LLM Provider Used

Provider: OpenAI API  
Integration: server-side API call via environment variable

Reason for choosing:

- reliable structured output
- strong code reasoning capability
- easy Node.js integration
- predictable latency
- widely supported SDK

---

## Safety Measures

- API keys stored only in `.env`
- `.env` excluded from git
- `.env.example` provided instead
- fallback answer path if LLM fails
- no secrets committed to repo

---

## AI Dependency Level

AI accelerated development and debugging, but:

- architecture decisions were manual
- feature requirements were followed exactly
- all major logic was reviewed and tested
- final code understanding is fully retained

I can explain every module and flow in this project without AI assistance.