import path from "path";
import { readWithLineNumbers } from "./codeReader.js";

export function chunkFile(filePath, chunkSize = 40) {
  const lines = readWithLineNumbers(filePath);
  const chunks = [];

  for (let i = 0; i < lines.length; i += chunkSize) {
    const slice = lines.slice(i, i + chunkSize);

    chunks.push({
      file: filePath,
      fileName: path.basename(filePath),
      startLine: slice[0]?.line,
      endLine: slice[slice.length - 1]?.line,
      text: slice.map(l => l.text).join("\n")
    });
  }

  return chunks;
}