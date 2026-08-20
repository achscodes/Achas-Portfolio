"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-black/10 p-8">
        <h2 className="text-xl font-medium">Message received.</h2>

        <p className="mt-3 text-sm leading-6 text-black/55">
          Thank you for reaching out. Your message has been submitted.
        </p>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border border-black/15 bg-transparent px-4 py-3 outline-none transition focus:border-black"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-black/15 bg-transparent px-4 py-3 outline-none transition focus:border-black"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="projectType"
          className="mb-2 block text-sm font-medium"
        >
          Project Type
        </label>

        <select
          id="projectType"
          name="projectType"
          required
          className="w-full border border-black/15 bg-[#f8f7f4] px-4 py-3 outline-none focus:border-black"
        >
          <option value="">Select a project type</option>
          <option value="event">Event</option>
          <option value="portrait">Portrait</option>
          <option value="sports">Sports</option>
          <option value="creative">Street / Creative</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message
        </label>

        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full resize-none border border-black/15 bg-transparent px-4 py-3 outline-none transition focus:border-black"
          placeholder="Tell me about your project..."
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
      >
        Send Inquiry
      </button>
    </form>
  );
}