import express from "express";
import multer from "multer";
import unzipper from "unzipper";
import fs from "fs";
import path from "path";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/zip", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const zipPath = req.file.path;

  const outDir = path.join("extracted", Date.now().toString());
  fs.mkdirSync(outDir, { recursive: true });

  await fs
    .createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: outDir }))
    .promise();

  console.log("ZIP saved:", zipPath);
  console.log("Extracted to:", outDir);

  res.json({
    message: "Zip extracted",
    folder: outDir
  });
});

export default router;