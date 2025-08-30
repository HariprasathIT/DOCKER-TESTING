import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ POST /image
router.post("/image", upload.single("image"), uploadImage);

export default router;
