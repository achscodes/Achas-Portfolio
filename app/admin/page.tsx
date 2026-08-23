import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/auth/LogoutButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  // Check authentication
  const { data: authData, error: authError } =
    await supabase.auth.getClaims();

  if (authError || !authData) {
    redirect("/login");
  }

  // 1. Fetch total published photos count
  const { count: publishedPhotosCount } = await supabase
    .from("photos")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  // 2. Fetch total draft photos count
  const { count: draftPhotosCount } = await supabase
    .from("photos")
    .select("*", { count: "exact", head: true })
    .eq("status", "draft");

  // 3. Fetch total client inquiries count
  const { count: totalInquiriesCount } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true });

  // 4. Fetch recent inquiries for the quick preview widget
  const { data: recentInquiries } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  // 5. Fetch recent photos
  const { data: recentPhotos } = await supabase
    .from("photos")
    .select("id, title, image_url, status, created_at")
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex flex-col md:flex-row">
      
      {/* Modern Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-black/10 bg-white p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 px-2 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
              N
            </span>
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase">Achás Studio</p>
              <p className="text-[11px] text-black/50">Admin Workspace</p>
            </div>
          </div>

          <nav className="mt-8 space-y-1.5">
            <Link
              href="/admin"
              className="flex items-center justify-between rounded-xl bg-black px-4 py-3 text-xs font-medium text-white transition-all shadow-sm"
              style={{ color: '#ffffff' }}
            >
              <span>📊 Studio Overview</span>
            </Link>

            <Link
              href="/admin/photos"
              className="flex items-center justify-between rounded-xl px-4 py-3 text-xs font-medium text-black/70 transition-all hover:bg-black/5 hover:text-black"
            >
              <span>🖼️ Photos Collection</span>
            </Link>

            <Link
              href="/admin/inquiries"
              className="flex items-center justify-between rounded-xl px-4 py-3 text-xs font-medium text-black/70 transition-all hover:bg-black/5 hover:text-black"
            >
              <span>📬 Client Inquiries</span>
              {totalInquiriesCount ? (
                <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-bold text-black">
                  {totalInquiriesCount}
                </span>
              ) : null}
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between rounded-xl px-4 py-3 text-xs font-medium text-black/70 transition-all hover:bg-black/5 hover:text-black"
            >
              <span>🌐 View Live Site ↗</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-black/10 mt-6">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Analytics Dashboard Area */}
      <main className="flex-grow p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/45">
                Welcome back, Creator
              </p>
              <h1 className="mt-1 text-3xl font-medium tracking-tight">Studio Overview</h1>
              <p className="mt-1 text-sm text-black/60">
                Here is a quick look at your portfolio activity and incoming leads.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/photos/new"
                className="rounded-full bg-black px-6 py-3 text-xs font-medium text-white transition-colors hover:bg-neutral-800 shadow-sm"
                style={{ color: '#ffffff' }}
              >
                + Add New Photo
              </Link>
            </div>
          </div>

          {/* Quick Metrics Grid Cards */}
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-widest text-black/50">Published Photos</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-black">
                {publishedPhotosCount ?? 0}
              </p>
              <div className="mt-4">
                <Link href="/admin/photos?filter=published" className="text-xs font-medium text-black underline underline-offset-4">
                  Manage published work →
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-widest text-black/50">Draft Photos</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-black">
                {draftPhotosCount ?? 0}
              </p>
              <div className="mt-4">
                <Link href="/admin/photos?filter=drafts" className="text-xs font-medium text-black underline underline-offset-4">
                  Review drafts →
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-widest text-black/50">Total Inquiries</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-black">
                {totalInquiriesCount ?? 0}
              </p>
              <div className="mt-4">
                <Link href="/admin/inquiries" className="text-xs font-medium text-black underline underline-offset-4">
                  Open inbox →
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Inquiries & Photos Section */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            
            {/* Recent Leads Widget */}
            <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium tracking-tight">Recent Client Leads</h2>
                <Link href="/admin/inquiries" className="text-xs font-medium text-black/60 hover:text-black">
                  View All →
                </Link>
              </div>

              {!recentInquiries || recentInquiries.length === 0 ? (
                <p className="text-sm text-black/40 py-8 text-center">No inquiries received yet.</p>
              ) : (
                <div className="space-y-4">
                  {recentInquiries.map((msg) => (
                    <div key={msg.id} className="border-b border-black/5 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-black">{msg.name}</span>
                        <span className="text-[11px] text-black/40">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-black/60 mt-0.5">{msg.subject || "Inquiry"}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Uploads Widget */}
            <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium tracking-tight">Recent Uploads</h2>
                <Link href="/admin/photos" className="text-xs font-medium text-black/60 hover:text-black">
                  View All →
                </Link>
              </div>

              {!recentPhotos || recentPhotos.length === 0 ? (
                <p className="text-sm text-black/40 py-8 text-center">No photos added yet.</p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {recentPhotos.map((photo) => (
                    <div key={photo.id} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-black/5 border border-black/10">
                      {photo.image_url ? (
                        <img src={photo.image_url} alt={photo.title} className="h-full w-full object-cover" />
                      ) : null}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-2.5 text-white">
                        <p className="text-xs font-medium truncate">{photo.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}