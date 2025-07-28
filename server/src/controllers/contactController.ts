import { Request, Response } from "express";
import { sendEmail } from "../services/emailService";

export async function sendContactMessage(req: Request, res: Response) {
  const { name, company, email, phone, interests, message, referral } =
    req.body;
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Name, email, and message are required." });
  }
  try {
    // Send confirmation to user
    await sendEmail({
      to: email,
      subject: "We have received your message",
      text: `Hi ${name},\n\nThank you for contacting Kester Dev Studios. We have received your message and will get back to you soon.\n\nBest regards,\nKester Dev Studios Team`,
    });
    // Send notification to admin
    await sendEmail({
      to: process.env.SMTP_USER || "info@kesterdevstudio.com",
      subject: `New Contact Us Message from ${name}`,
      text: `You have received a new message from ${name} <${email}>${
        company ? `, Company: ${company}` : ""
      }${phone ? `, Phone: ${phone}` : ""}${
        referral ? `, Referral: ${referral}` : ""
      }:
\nInterests: ${
        Array.isArray(interests) ? interests.join(", ") : interests || "None"
      }
\n${message}`,
    });
    res.json({ message: "Your message has been received. Thank you!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send contact message", error: err });
  }
}
