import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const from = process.env.SMTP_USER;

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
    });
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}
