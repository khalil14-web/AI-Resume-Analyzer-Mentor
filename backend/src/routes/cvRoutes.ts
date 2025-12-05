import express from "express";
import multer from "multer";
import path from "path";
import validateJWT from "../middleware/validateJWT";
import { saveCV, getUserCVs, getCVById } from "../services/cvService";

const router = express.Router();

// إعداد رفع الملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) cb(null, true);
  else cb(new Error("Only PDF or Word files are allowed"));
};

const upload = multer({ storage, fileFilter });

// ===========================
// رفع ملف CV
// ===========================
router.post("/upload", validateJWT, upload.single("cv"), async (req: any, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" });

    // owner من الـ JWT
    const owner = req.user._id.toString();

    const cv = await saveCV(req.file.filename, req.file.path, owner);
    res.status(201).json({
      message: "CV uploaded successfully",
      cv,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// ===========================
// جلب كل CVs الخاصة بالمستخدم
// ===========================
router.get("/my", validateJWT, async (req: any, res) => {
  try {
    const owner = req.user._id.toString();
    const cvs = await getUserCVs(owner);

    res.json({ cvs });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// ===========================
// جلب CV واحد       
// ===========================
router.get("/:id", validateJWT, async (req: any, res) => {
  try {
    const cvId = req.params.id;
    const cv = await getCVById(cvId);

    if (!cv) return res.status(404).json({ error: "CV not found" });

    res.json({ cv });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

export default router;
