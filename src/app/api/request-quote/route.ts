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

    // 🛡️ Spam check
    if (honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Basic validation
    if (!name || !email || (!product && !productInterest && !message)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const interest = product || productInterest || "General";

    const html = `
      <h2>New Request Quote Submission</h2>

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
        Sent from website Request Quote form
      </p>
    `;

    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
      to: process.env.MAIL_TO_EMAIL,
      replyTo: email,
      subject: `Quote Request – ${name} (${interest})`,
      html,
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
