"use client";

import { useState } from "react";
import Link from "next/link";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
  status?: string;
};

export default function AdminInquiriesTable({ inquiries }: { inquiries: Inquiry[] }) {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header with Back Button */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-medium text-black">Client Inquiries</h1>
          <p className="text-xs text-black/60 uppercase tracking-widest mt-1">
            All submitted project requests ({inquiries.length})
          </p>
        </div>
        <Link
          href="/admin"
          className="w-full sm:w-auto text-center rounded-full border border-black/15 bg-neutral-50 px-5 py-2.5 text-xs uppercase tracking-widest text-black hover:bg-black hover:text-white transition cursor-pointer"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Inquiries Container */}
      <div className="bg-white border border-black/10 rounded-3xl overflow-hidden shadow-xs">
        
        {/* Mobile Card List View (Visible on small screens) */}
        <div className="block md:hidden divide-y divide-black/5">
          {inquiries.length > 0 ? (
            inquiries.map((inq) => (
              <div key={inq.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm text-black">{inq.name}</h3>
                    <p className="text-xs text-black/50 truncate max-w-[200px]">{inq.email}</p>
                  </div>
                  <span className="text-[10px] text-black/40">
                    {new Date(inq.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                <p className="text-xs text-black/80 font-medium bg-neutral-50 px-3 py-2 rounded-xl">
                  {inq.subject || "General Inquiry"}
                </p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setSelectedInquiry(inq)}
                    className="rounded-full bg-black text-white px-4 py-2 text-[10px] uppercase tracking-widest transition cursor-pointer"
                    style={{ color: "#ffffff" }}
                  >
                    View Message
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-black/40 text-sm">No inquiries received yet.</div>
          )}
        </div>

        {/* Desktop Table View (Hidden on small screens) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10 bg-neutral-50/50 text-[11px] uppercase tracking-widest text-black/60">
                <th className="p-5 font-medium">Client Name</th>
                <th className="p-5 font-medium">Email</th>
                <th className="p-5 font-medium">Project / Subject</th>
                <th className="p-5 font-medium">Date Received</th>
                <th className="p-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-sm">
              {inquiries.length > 0 ? (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-neutral-50/80 transition">
                    <td className="p-5 font-medium text-black">{inq.name}</td>
                    <td className="p-5 text-black/70">
                      <a href={`mailto:${inq.email}`} className="underline hover:text-black">
                        {inq.email}
                      </a>
                    </td>
                    <td className="p-5 text-black/80">{inq.subject || "General Inquiry"}</td>
                    <td className="p-5 text-black/50 text-xs">
                      {new Date(inq.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-5 text-right">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="rounded-full bg-neutral-100 hover:bg-black hover:text-white px-4 py-2 text-xs uppercase tracking-widest text-black transition cursor-pointer border border-black/10"
                      >
                        View Message
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-black/40 text-sm">
                    No inquiries received yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal to View Full Message Details (Fully Mobile Responsive) */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-white border-t sm:border border-black/10 rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-medium text-black">{selectedInquiry.name}</h3>
                <a href={`mailto:${selectedInquiry.email}`} className="text-xs text-black/50 underline">
                  {selectedInquiry.email}
                </a>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-black hover:text-white flex items-center justify-center text-xs transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-black/40 block mb-1">Subject</span>
                <p className="text-sm font-medium text-black">{selectedInquiry.subject || "General Inquiry"}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-black/40 block mb-1">Message</span>
                <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 text-sm text-black leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry about ${selectedInquiry.subject || 'your project'}`}
                className="w-full sm:w-auto rounded-full bg-black text-white px-6 py-3.5 text-xs uppercase tracking-widest hover:bg-neutral-800 transition cursor-pointer shadow-sm text-center"
                style={{ color: "#ffffff" }}
              >
                Reply via Email ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}