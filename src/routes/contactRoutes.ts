import { Router } from "express";
import { sendContactMessage } from "../controllers/contactController";

const router = Router();

router.post("/contact", sendContactMessage);

export default router;
