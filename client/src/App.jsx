import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import StatusPage from "./StatusPage";

const API = "http://localhost:5050";

export default function App() {
  return (
    <>
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>Home</Link>
        <Link to="/status" style={styles.navLink}>Status</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomeUI />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
    </>
  );
}

/* ================= HOME UI ================= */

function HomeUI() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHistory();
    loadStatus();
  }, []);

  async function loadHistory() {
    const r = await fetch(`${API}/api/qa/history`);
    setHistory(await r.json());
  }

  async function loadStatus() {
    const r = await fetch(`${API}/api/status`);
    setStatus(await r.json());
  }

  async function uploadZip() {
    if (!file) return alert("Select zip first");
    const fd = new FormData();
    fd.append("file", file);

    setLoading(true);
    await fetch(`${API}/api/upload/zip`, {
      method: "POST",
      body: fd
    });
    setLoading(false);
    alert("Zip uploaded & indexed");
  }

  async function ask() {
    if (!question) return;

    setLoading(true);

    const r = await fetch(`${API}/api/qa/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    setAnswer(await r.json());
    setLoading(false);
    loadHistory();
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>🔎 CodeProof QA</h1>
        {status && (
          <div style={styles.status}>
            Backend: {status.backend} | DB: {status.db} | LLM: {status.llm}
          </div>
        )}
      </div>

      <div style={styles.grid}>

        {/* LEFT PANEL */}
        <div style={styles.card}>
          <h3>📦 Upload Codebase</h3>
          <input
            type="file"
            accept=".zip"
            onChange={e => setFile(e.target.files[0])}
          />
          <button onClick={uploadZip} style={styles.button}>
            Upload & Index
          </button>

          <hr style={styles.hr} />

          <h3>❓ Ask Question</h3>
          <textarea
            rows={3}
            placeholder="Where is auth handled?"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            style={styles.textarea}
          />
          <button onClick={ask} style={styles.button}>
            Ask
          </button>

          {loading && <p>⏳ Processing…</p>}
        </div>

        {/* CENTER PANEL */}
        <div style={styles.card}>
          <h3>🧠 Answer</h3>

          {answer && (
            <>
              <div style={styles.answerBox}>
                <div style={styles.answerScroll}>
                  {answer.answer}
                </div>
              </div>

              <h4>📎 Matched Snippets</h4>

              {answer.snippets.map((s, i) => (
                <div key={i} style={styles.snippet}>
                  <div style={styles.snippetHeader}>
                    {s.fileName} ({s.startLine}-{s.endLine})
                  </div>

                  <pre style={styles.codeBlock}>
                    {s.text}
                  </pre>
                </div>
              ))}
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div style={styles.card}>
          <h3>🕘 Last Q&A</h3>

          {history.map((h, i) => (
            <div key={i} style={styles.historyItem}>
              <div>{h.question}</div>
              <div style={styles.historyTime}>
                {new Date(h.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  nav: {
    padding: 12,
    background: "#020617",
    display: "flex",
    gap: 16
  },

  navLink: {
    color: "#22c55e",
    textDecoration: "none",
    fontWeight: 600
  },

  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
    color: "white",
    padding: 30,
    fontFamily: "system-ui"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24
  },

  status: {
    fontSize: 14,
    opacity: 0.85
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "320px minmax(0,1fr) 320px",
    gap: 20
  },

  card: {
    background: "#111827",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    overflow: "hidden"
  },

  button: {
    marginTop: 10,
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    background: "#22c55e",
    color: "black",
    fontWeight: 600,
    cursor: "pointer"
  },

  textarea: {
    width: "100%",
    borderRadius: 10,
    padding: 10,
    border: "none",
    resize: "vertical"
  },

  hr: {
    margin: "20px 0",
    opacity: 0.2
  },

  answerBox: {
    background: "#020617",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    border: "1px solid #1f2937"
  },

  answerScroll: {
    maxHeight: 400,
    maxWidth: "100%",
    overflow: "auto",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    lineHeight: 1.5
  },

  snippet: {
    background: "#020617",
    marginTop: 12,
    borderRadius: 12,
    border: "1px solid #1f2937"
  },

  snippetHeader: {
    background: "#1f2937",
    padding: 8,
    fontSize: 12,
    opacity: 0.85
  },

  codeBlock: {
    margin: 0,
    padding: 12,
    overflow: "auto",
    maxHeight: 260,
    maxWidth: "100%",
    whiteSpace: "pre",
    fontSize: 13,
    lineHeight: 1.4
  },

  historyItem: {
    padding: 10,
    borderBottom: "1px solid #1f2937",
    fontSize: 14
  },

  historyTime: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 4
  }
};