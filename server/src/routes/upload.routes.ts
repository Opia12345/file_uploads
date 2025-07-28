import { Router } from "express";
import multer from "multer";
import { uploadMedia, getSingleUpload, editUpload, deleteUpload } from "../controllers/uploadController";
import { allMedia } from "../controllers/mediaController";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.array("images"), uploadMedia);
router.get("/uploads/:id", getSingleUpload);
router.get("/uploads", allMedia);
router.put("/uploads/:id", upload.array("newImages"), editUpload);
router.delete("/uploads/:id", deleteUpload);

export default router;
