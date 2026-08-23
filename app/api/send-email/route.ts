import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "RESEND_API_KEY is missing." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { name, email, subject, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    // Send email notification to you via Resend
    const data = await resend.emails.send({
      from: "Achás Studio <onboarding@resend.dev>",
      to: "your-email@example.com", // Replace with your personal email address to receive inquiries
      subject: `New Inquiry: ${subject} from ${name}`,
      html: `
        <h2>New Client Photography Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f4f4f4; padding: 12px; border-left: 3px solid #000;">
          ${message}
        </blockquote>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to send email" }, { status: 500 });
  }
}