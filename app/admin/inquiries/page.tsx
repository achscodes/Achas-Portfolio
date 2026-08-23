import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const supabase = await createClient();

  // Check admin auth (using your existing auth protection)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all messages sorted by newest first
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#f8f7f4] pb-24 pt-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Admin Navigation Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/45">
              Studio Operations
            </p>
            <h1 className="mt-1 text-3xl font-medium tracking-tight">Client Inquiries</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded-full border border-black/20 bg-white px-5 py-2 text-xs font-medium text-black transition-colors hover:border-black"
            >
              ← Back to CMS Dashboard
            </Link>
          </div>
        </div>

        {/* Inquiries Table / Grid */}
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
            Error loading inquiries: {error.message}. Make sure your `messages` table exists in Supabase.
          </div>
        ) : !messages || messages.length === 0 ? (
          <div className="rounded-3xl border border-black/10 bg-white p-16 text-center shadow-sm">
            <h3 className="text-lg font-medium text-black">No inquiries yet</h3>
            <p className="mt-2 text-sm text-black/60">
              When potential clients fill out your contact form, their messages will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm transition-all hover:border-black/30"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-medium text-black">{msg.name}</h3>
                      <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/70">
                        {msg.subject || "General Inquiry"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-black/50">
                      {msg.email} • {new Date(msg.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <a
                    href={`mailto:${msg.email}?subject=Regarding your ${msg.subject || 'Photography'} Inquiry`}
                    className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
                    style={{ color: '#ffffff' }}
                  >
                    Reply via Email →
                  </a>
                </div>

                <div className="mt-6 border-t border-black/5 pt-4 text-sm leading-relaxed text-black/80 whitespace-pre-wrap">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}