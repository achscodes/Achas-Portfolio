"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Resend } from "resend";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Events & Coverages",
    customCategory: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const categories = [
    "Events & Coverages",
    "Portraits",
    "Sports Photography",
    "Street & Documentary",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const finalSubject =
      formData.category === "Other"
        ? `Other: ${formData.customCategory}`
        : formData.category;

    try {
      // 1. Insert into Supabase database (for your admin inbox)
      const { error: insertError } = await supabase.from("messages").insert([
        {
          name: formData.name,
          email: formData.email,
          subject: finalSubject,
          message: formData.message,
        },
      ]);

      if (insertError) throw insertError;

      // 2. Trigger email notification via Resend
      // Note: Make sure to set RESEND_API_KEY in your environment variables. 
      // For security in production, it is best practice to trigger Resend via a Server Action or API Route.
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: finalSubject,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        console.warn("Database saved, but email notification failed to send.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        category: "Events & Coverages",
        customCategory: "",
        message: "",
      });
    } catch (err: any) {
      console.error("Error sending message:", err.message);
      setError("Failed to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
          ✓
        </div>
        <h3 className="text-2xl font-medium tracking-tight text-black">Message Sent Successfully</h3>
        <p className="mt-2 text-sm text-black/60">
          Thank you for reaching out. I will get back to you shortly!
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-xs font-medium transition-colors hover:bg-neutral-800"
          style={{ color: '#ffffff' }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}

      {/* Name & Email Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-black/50 mb-2">
            Your Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-2xl border border-black/15 bg-neutral-50/50 px-4 py-3 text-sm text-black placeholder:text-black/30 focus:border-black focus:bg-white focus:outline-none transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-black/50 mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-2xl border border-black/15 bg-neutral-50/50 px-4 py-3 text-sm text-black placeholder:text-black/30 focus:border-black focus:bg-white focus:outline-none transition-all"
            placeholder="you@example.com"
          />
        </div>
      </div>

      {/* Modern Project Type Selector Chips */}
      <div>
        <label className="block text-xs uppercase tracking-[0.2em] text-black/50 mb-2">
          Project Type
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = formData.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFormData({ ...formData, category: cat })}
                className={`rounded-full px-4 py-2.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-black text-white shadow-sm"
                    : "border border-black/15 bg-neutral-50/50 text-black hover:border-black hover:bg-black/5"
                }`}
                style={isSelected ? { color: '#ffffff' } : {}}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conditional Custom Project Type Input */}
      {formData.category === "Other" && (
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-black/50 mb-2">
            Please Specify Project Type
          </label>
          <input
            type="text"
            required
            value={formData.customCategory}
            onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
            className="w-full rounded-2xl border border-black/15 bg-neutral-50/50 px-4 py-3 text-sm text-black placeholder:text-black/30 focus:border-black focus:bg-white focus:outline-none transition-all"
            placeholder="e.g. Commercial Product Shoot, Architecture..."
          />
        </div>
      )}

      {/* Message Textarea */}
      <div>
        <label className="block text-xs uppercase tracking-[0.2em] text-black/50 mb-2">
          Message
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-2xl border border-black/15 bg-neutral-50/50 p-4 text-sm text-black placeholder:text-black/30 focus:border-black focus:bg-white focus:outline-none transition-all resize-none"
          placeholder="Tell me about your project, timeline, and vision..."
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-medium transition-colors hover:bg-neutral-800 disabled:opacity-50"
          style={{ color: '#ffffff' }}
        >
          {submitting ? "Sending Inquiry..." : "Send Inquiry →"}
        </button>
      </div>
    </form>
  );
}