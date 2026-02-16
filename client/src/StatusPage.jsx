import { useEffect, useState } from "react";

const API = "http://localhost:5050";

export default function StatusPage() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/status`)
      .then(r => r.json())
      .then(setStatus);
  }, []);

  if (!status) return <div style={{padding:40}}>Loading…</div>;

  return (
    <div style={{padding:40}}>
      <h2>System Status</h2>
      <ul>
        <li>Backend: {status.backend}</li>
        <li>Database: {status.db}</li>
        <li>LLM: {status.llm}</li>
      </ul>
    </div>
  );
}