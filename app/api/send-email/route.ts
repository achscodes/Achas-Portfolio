import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    const data = await resend.emails.send({
      from: "Achás Studio <onboarding@resend.dev>",
      to: "your-email@example.com", // Replace with your email address
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
        <p><a href="https://yourdomain.com/admin/inquiries">View in Admin Dashboard →</a></p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}