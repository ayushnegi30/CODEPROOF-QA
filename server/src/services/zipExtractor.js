import fs from "fs";
import path from "path";
import unzipper from "unzipper";

export async function extractZip(zipPath, outDir) {
  await fs
    .createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: outDir }))
    .promise();

  return outDir;
}