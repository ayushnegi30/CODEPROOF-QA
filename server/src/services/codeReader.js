import fs from "fs";
import path from "path";

const CODE_EXT = [".js", ".ts", ".jsx", ".tsx", ".py", ".java", ".go", ".rb", ".md"];

export function getAllCodeFiles(dir) {
  let results = [];

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      results = results.concat(getAllCodeFiles(full));
    } else {
      if (CODE_EXT.includes(path.extname(file))) {
        results.push(full);
      }
    }
  }

  return results;
}

export function readWithLineNumbers(filePath) {
  const text = fs.readFileSync(filePath, "utf-8");
  const lines = text.split("\n");

  return lines.map((line, i) => ({
    line: i + 1,
    text: line
  }));
}