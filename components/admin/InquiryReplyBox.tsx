"use client";

import { useState } from "react";
import { sendReplyAction } from "@/app/admin/inquiries/actions";

export default function InquiryReplyBox({ 
  inquiryId, 
  clientEmail, 
  clientName 
}: { 
  inquiryId: string; 
  clientEmail: string; 
  clientName: string; 
}) {
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    setSending(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("inquiryId", inquiryId);
    formData.append("clientEmail", clientEmail);
    formData.append("clientName", clientName);
    formData.append("replyMessage", replyMessage);

    const result = await sendReplyAction(formData);

    setSending(false);
    if (result.success) {
      setSentSuccess(true);
      setReplyMessage("");
    } else {
      setErrorMessage(result.error || "Failed to send email.");
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-black/10">
      {sentSuccess ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-2xl text-xs flex items-center justify-between">
          <span>✓ Reply successfully sent to {clientEmail}!</span>
          <button 
            onClick={() => setSentSuccess(false)}
            className="underline font-medium hover:text-emerald-900"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSend} className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-black/60">
              Reply via Email
            </span>
            {errorMessage && (
              <span className="text-xs text-red-600">{errorMessage}</span>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder={`Type a message to ${clientName}...`}
              className="flex-grow rounded-2xl border border-black/15 bg-neutral-50 px-4 py-2.5 text-sm outline-none focus:border-black text-black"
              required
            />
            <button
              type="submit"
              disabled={sending}
              className="rounded-full bg-black px-6 py-2.5 text-xs uppercase tracking-widest text-white hover:bg-neutral-800 disabled:opacity-50 transition shrink-0"
              style={{ color: '#ffffff' }}
            >
              {sending ? "Sending..." : "Send Reply →"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}