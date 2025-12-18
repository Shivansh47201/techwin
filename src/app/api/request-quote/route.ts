import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      company,
      email,
      phone,
      product,
      productInterest,
      message,
      honeypot,
    } = body as any;

    if (honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    if (!name || !email || (!product && !productInterest && !message)) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    const interest = product || productInterest || "General";

    /* =========================
       1️⃣ ADMIN / CLIENT EMAIL
    ========================== */
    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
      to: process.env.MAIL_TO_EMAIL,
      replyTo: email,
      subject: `Quote Request – ${name} (${interest})`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Product Interest:</strong> ${interest}</p>
        <p><strong>Message:</strong><br/>
          ${(message || "N/A").replace(/\n/g, "<br/>")}
        </p>
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
      subject: "Your quote request has been received – Techwin",
      html: `
        <p>Dear ${name},</p>

        <p>Thank you for requesting a quote from <strong>Techwin</strong>.</p>

        <p>Our sales team is reviewing your requirements and will contact you
        within <strong>24 hours</strong>.</p>

        <p>You can reply directly to this email if you have additional details.</p>

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
  } catch (err) {
    console.error("SMTP request-quote error:", err);
    return NextResponse.json(
      { error: "Failed to send quote request" },
      { status: 500 }
    );
  }
}
