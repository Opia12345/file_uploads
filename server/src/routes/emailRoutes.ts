import { Router } from "express";
import { sendTestEmail } from "../controllers/emailController";

const router = Router();

router.post("/send-test-email", sendTestEmail);

export default router;
