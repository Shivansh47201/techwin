import { NextResponse } from "next/server";
import { Resend } from "resend";

function getRecipients(): string[] {
  const raw = process.env.TO_EMAILS || process.env.TO_EMAIL || "";
  return raw.split(",").map(s => s.trim()).filter(Boolean);
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY missing");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // ✅ Lazy init (SAFE at build time)
    const resend = new Resend(apiKey);

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

    // Basic validation
    if (honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    if (!name || !email || (!message && !product && !productInterest)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const recipients = getRecipients();
    if (!recipients.length) {
      return NextResponse.json(
        { error: "No recipient configured" },
        { status: 500 }
      );
    }

    const html = `
      <h2>New Quote / Request Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Product / Interest:</strong> ${product || productInterest || "N/A"}</p>
      <p><strong>Message:</strong><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p>Sent from website request-quote form</p>
    `;

    await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: recipients,
      subject: `Quote Request from ${name} — ${product || productInterest || "General"}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("request-quote error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
