# PROMPTS_USED.md — Development Prompt Log

This file records representative prompts used during development.  
Responses are intentionally not included. No secrets or API keys are included.

---

## Project Planning

- Build a full stack web app for codebase Q&A with proof snippets
- Design folder structure for React + Express + Mongo project
- How to implement zip upload and extraction in Node.js
- How to index code files recursively from extracted folders

---

## Backend Development

- Express route structure for modular API design
- How to implement file upload with multer
- How to extract zip files in Node.js
- Recursive directory scanning for code files
- Chunk large text files by line ranges
- Build in-memory search index for code chunks
- Keyword-based retrieval over code snippets
- MongoDB mongoose schema for Q&A history
- Limit Mongo query results to last N records
- Build health check status API endpoint

---

## Retrieval + QA Logic

- Design code snippet retrieval with line ranges
- Return file path and line numbers with matches
- Format proof snippets for UI display
- Add fallback answer if LLM call fails
- Rebuild index automatically if memory is empty

---

## LLM Integration

- Node.js OpenAI API integration pattern
- Send retrieved snippets as context to LLM
- Prompt structure for codebase question answering
- How to keep LLM responses grounded in provided snippets
- Environment variable based API key usage

---

## Frontend Development

- React layout for 3-panel dashboard UI
- Build file upload UI with FormData
- Fetch API POST JSON body patterns
- Display dynamic snippet lists in React
- Add scrollable containers for long answers
- Prevent horizontal overflow in code blocks
- CSS grid layout with fixed side panels
- Add status page with React Router
- Navigation bar with route links

---

## Debugging and Fixes

- Fix ESM import/export default errors
- Fix Node version compatibility with Vite
- Fix recursive file indexing bugs
- Fix empty index after server restart
- Fix path resolution after zip extraction
- Fix Mongo connection issues
- Fix UI overflow and layout stretching

---

## Documentation

- Generate README for codebase QA app
- Write AI usage disclosure notes
- Create prompt usage log
- Create environment variable template