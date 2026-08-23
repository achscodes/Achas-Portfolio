import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendEmailToClient(toEmail: string, clientName: string, messageBody: string) {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: toEmail,
      subject: `Response from chas.arw Studio`,
      text: `Hi ${clientName},\n\n${messageBody}\n\nBest regards,\nchas.arw`,
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}