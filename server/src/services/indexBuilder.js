import fs from "fs";
import path from "path";

let INDEX = [];

/* ✅ recursively read all code-like files */
function readAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      results = results.concat(readAllFiles(full));
    } else {
      if (/\.(js|ts|jsx|tsx|json|md|py|java|go|rb|php|cs|cpp|c|txt|tex)$/i.test(file)) {
        results.push(full);
      }
    }
  }

  return results;
}

/* ✅ split file into line chunks */
function chunkText(text, size = 40) {
  const lines = text.split("\n");
  const chunks = [];

  for (let i = 0; i < lines.length; i += size) {
    chunks.push({
      startLine: i + 1,
      endLine: Math.min(i + size, lines.length),
      text: lines.slice(i, i + size).join("\n")
    });
  }

  return chunks;
}

/* ✅ pick newest extracted folder */
function getLatestExtractedFolder(baseDir) {
  if (!fs.existsSync(baseDir)) return null;

  const dirs = fs.readdirSync(baseDir)
    .map(d => path.join(baseDir, d))
    .filter(p => fs.statSync(p).isDirectory())
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);

  return dirs[0] || null;
}

/* ✅ build in-memory index */
export function buildIndex(baseDir = "extracted") {
  INDEX = [];

  const targetDir = getLatestExtractedFolder(baseDir);

  if (!targetDir) {
    console.log("No extracted folders found");
    return;
  }

  console.log("Indexing folder:", targetDir);

  const files = readAllFiles(targetDir);
  console.log("Files discovered:", files.length);

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, "utf-8");
      const chunks = chunkText(content);

      for (const c of chunks) {
        INDEX.push({
          fileName: path.relative(targetDir, file),
          ...c
        });
      }
    } catch {
      // skip unreadable files
    }
  }

  console.log("Index ready — chunks:", INDEX.length);
}

export function getIndex() {
  return INDEX;
}