"use server";

import { sendEmailToClient } from "@/lib/email";
import { createClient } from "@/lib/supabase/server";

export async function sendReplyAction(formData: FormData) {
  const inquiryId = formData.get("inquiryId") as string;
  const clientEmail = formData.get("clientEmail") as string;
  const clientName = formData.get("clientName") as string;
  const replyMessage = formData.get("replyMessage") as string;

  if (!clientEmail || !replyMessage) {
    return { success: false, error: "Missing required fields." };
  }

  // 1. Send real email via Nodemailer using your Gmail app password
  const emailResult = await sendEmailToClient(clientEmail, clientName, replyMessage);
  if (!emailResult.success) {
    return { success: false, error: emailResult.error };
  }

  // 2. Update status in Supabase
  const supabase = await createClient();
  await supabase
    .from("inquiries")
    .update({ status: "replied" })
    .eq("id", inquiryId);

  return { success: true };
}