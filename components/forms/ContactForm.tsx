"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error: dbError } = await supabase.from("inquiries").insert({
        name,
        email,
        subject,
        message,
        status: "active",
      });

      if (dbError) throw dbError;

      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      setSubmitted(true);
    } catch (err: any) {
      alert(`Error submitting inquiry: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-xl mx-auto p-6 sm:p-12 bg-white border border-black/10 rounded-3xl text-center shadow-xs">
        <h3 className="text-lg sm:text-xl font-medium mb-2">Inquiry Sent Successfully!</h3>
        <p className="text-xs sm:text-sm text-black/60 mb-6">
          Thank you, {name}. We have received your message and will get back to you shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
          }}
          className="w-full sm:w-auto rounded-full bg-black px-6 py-3 text-xs uppercase tracking-widest text-white hover:bg-neutral-800 transition cursor-pointer"
          style={{ color: "#ffffff" }}
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-5 sm:p-8 bg-white border border-black/10 rounded-3xl space-y-5 shadow-xs">
      <div>
        <h2 className="text-xl font-medium">Start a Project</h2>
        <p className="text-xs text-black/60 uppercase tracking-widest mt-1">
          Fill out the form below to send an inquiry
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-black/70 mb-2">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full rounded-2xl border border-black/15 bg-neutral-50 px-4 py-3.5 text-sm outline-none focus:border-black text-black"
            required
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-black/70 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full rounded-2xl border border-black/15 bg-neutral-50 px-4 py-3.5 text-sm outline-none focus:border-black text-black"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-black/70 mb-2">Project Type / Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Graduation Photoshoot, Portrait..."
          className="w-full rounded-2xl border border-black/15 bg-neutral-50 px-4 py-3.5 text-sm outline-none focus:border-black text-black"
          required
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-black/70 mb-2">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your vision..."
          rows={4}
          className="w-full rounded-2xl border border-black/15 bg-neutral-50 px-4 py-3.5 text-sm outline-none focus:border-black text-black resize-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-black py-4 text-xs uppercase tracking-widest text-white hover:bg-neutral-800 disabled:opacity-50 transition cursor-pointer shadow-sm"
        style={{ color: "#ffffff" }}
      >
        {loading ? "Sending Inquiry..." : "Submit Inquiry →"}
      </button>
    </form>
  );
}