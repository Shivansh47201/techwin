import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, Email and Message are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    /* =========================
       1️⃣ ADMIN / CLIENT EMAIL
    ========================== */
    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
      to: process.env.MAIL_TO_EMAIL, // techwinchina@gmail.com
      replyTo: email,
      subject: `New Contact Inquiry – ${name}`,
      html: `
        <h2>New Contact Form Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p style="font-size:12px;color:#666">
          Replying to this email will reach the customer directly.
        </p>
      `,
    });

    /* =========================
       2️⃣ CUSTOMER AUTO-REPLY
    ========================== */
    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
      to: email,
      subject: "We received your message – Techwin",
      html: `
        <p>Dear ${name},</p>

        <p>Thank you for contacting <strong>Techwin</strong>.</p>

        <p>We have received your message and our team will get back to you within
        <strong>24 hours</strong>.</p>

        <p>If your inquiry is urgent, you may reply directly to this email.</p>

        <br/>
        <p>Best regards,<br/>
        <strong>Techwin Sales Team</strong></p>

        <hr/>
        <p style="font-size:12px;color:#777">
          This is an automated confirmation email.
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SMTP Contact Error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
