# CodeProof QA — Codebase Q&A with Proof

## Overview

CodeProof QA is a full-stack web application that allows users to upload a zipped codebase and ask natural language questions about it. The system extracts and indexes the code, retrieves relevant snippets, and returns answers with proof — including file paths, line ranges, and code blocks.

This project was built as part of a technical build assessment task.

---

## Core Features

- Upload a zipped codebase
- Automatic extraction and recursive file scanning
- Code chunk indexing
- Ask natural language questions about the codebase
- Returns answers with:
  - file path references
  - line number ranges
  - matched code snippets
- LLM-based answer synthesis (with safe fallback if LLM is not available)
- Saves last 10 Q&A entries in MongoDB
- Status page showing:
  - backend health
  - database connection
  - LLM configuration
- Clean responsive UI with scrollable answer and snippet panels

---

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Inline styled UI (dark theme)

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

### AI Integration
- OpenAI API (via environment variable)

---

## Project Structure

```
client/     → React frontend
server/     → Express backend
uploads/    → uploaded zip files (ignored in git)
extracted/  → extracted codebases (ignored in git)
```

---

## How It Works

1. User uploads a zip file
2. Server extracts files to an extracted folder
3. Index builder scans supported code/text files
4. Files are split into line-based chunks
5. Question → keyword retrieval over chunks
6. Top chunks → passed to LLM for synthesis
7. Answer + proof snippets returned
8. Q&A stored in MongoDB history

---

## Supported File Types

The indexer scans:

```
js, ts, jsx, tsx,
json, md, txt,
py, java, go, rb,
php, cs, cpp, c
```

---

## API Endpoints

### Upload

POST `/api/upload/zip`  
Upload a zipped codebase

---

### Ask Question

POST `/api/qa/ask`

Body:
```json
{
  "question": "Where is auth handled?"
}
```

Returns answer + proof snippets.

---

### History

GET `/api/qa/history`

Returns last 10 Q&A entries from MongoDB.

---

### Status

GET `/api/status`

Returns:

```json
{
  "backend": "ok",
  "db": "connected",
  "llm": "configured"
}
```

---

## Run Locally

### Backend

```bash
cd server
npm install
```

Create `.env` file:

```
PORT=5050
MONGO_URI=mongodb://127.0.0.1:27017/codeproof
OPENAI_API_KEY=your_key_here
```

Run:

```bash
npm run dev
```

---

### Frontend

```bash
cd client
npm install
npm run dev
```

Open:

```
http://localhost:5174
```

---

## Environment Variables

See `.env.example` file for template.

Never commit real keys.

---

## What Is Implemented

- Zip upload + extraction
- Recursive file indexing
- Chunk-based retrieval
- Proof snippets display
- MongoDB persistence
- Status monitoring page
- LLM synthesis + fallback answer
- Scroll-safe UI for large answers

---

## Limitations

- Retrieval uses keyword matching (not vector embeddings)
- Large repositories may index slower
- No authentication layer (demo scope)
- No background job queue

---

## Possible Improvements

- Embedding-based semantic search
- Streaming LLM responses
- Snippet copy buttons
- Repo URL ingestion
- Incremental indexing

---

## Author

Ayush Negi  
BTech IT — Full Stack + AI/ML Focus