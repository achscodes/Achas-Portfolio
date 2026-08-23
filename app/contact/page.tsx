"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Fixed payload: relies on table defaults to avoid check constraint errors
      const { error } = await supabase.from("inquiries").insert([
        { name, email, message }
      ]);

      if (error) throw error;

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      console.error(err);
      alert(`Failed to send inquiry: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-20 w-full flex-grow">
        <div className="mb-8">
          <Link href="/" className="text-xs uppercase tracking-widest text-black/60 hover:text-black">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-medium tracking-tight mt-4">Get in Touch</h1>
          <p className="text-black/60 text-sm mt-2">
            Have a project, collaboration, or booking in mind? Send a message below.
          </p>
        </div>

        {success ? (
          <div className="bg-white border border-black/10 p-10 rounded-3xl text-center shadow-sm">
            <h2 className="text-xl font-medium mb-2">Message Sent Successfully!</h2>
            <p className="text-black/60 text-sm mb-6">Thank you for reaching out. Chas will get back to you soon.</p>
            <button
              onClick={() => setSuccess(false)}
              className="rounded-full bg-black px-6 py-3 text-xs uppercase tracking-widest text-white hover:bg-neutral-800"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-black/10 p-8 sm:p-12 rounded-3xl shadow-sm">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-black/60 font-semibold mb-2">Your Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
                placeholder="John Doe"
                className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black text-black"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-black/60 font-semibold mb-2">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                placeholder="john@example.com"
                className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black text-black"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-black/60 font-semibold mb-2">Message / Project Details</label>
              <textarea 
                rows={5}
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                required
                placeholder="Tell me about your project or session details..."
                className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black text-black resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-50 cursor-pointer shadow-sm"
              style={{ color: '#ffffff' }}
            >
              {submitting ? "Sending Message..." : "Send Message →"}
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}