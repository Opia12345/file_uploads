import { Request, Response } from "express";
import { sendEmail } from "../services/emailService";

export async function sendTestEmail(req: Request, res: Response) {
  const { to, subject, text, html } = req.body;
  try {
    await sendEmail({ to, subject, text, html });
    res.json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send email", error: err });
  }
}
