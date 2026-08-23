import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/auth/LogoutButton";
import BulkPhotoManager from "@/components/admin/BulkPhotoManager";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  searchParams: Promise<{
    filter?: string;
  }>;
};

export default async function AdminPhotosPage({ searchParams }: PageProps) {
  const { filter = "all" } = await searchParams;
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getClaims();
  if (authError || !authData) {
    redirect("/login");
  }

  let query = supabase
    .from("photos")
    .select(`
      id,
      title,
      image_url,
      status,
      featured,
      created_at,
      category_id,
      categories ( name )
    `)
    .order("created_at", { ascending: false });

  if (filter === "published") query = query.eq("status", "published");
  else if (filter === "drafts") query = query.eq("status", "draft");
  else if (filter === "featured") query = query.eq("featured", true);

  const { data: photosData } = await query;
  const photos = photosData ?? [];

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex flex-col md:flex-row">
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-black/10 bg-white p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 px-2 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">N</span>
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase">Achás Studio</p>
              <p className="text-[11px] text-black/50">Admin Workspace</p>
            </div>
          </div>
          <nav className="mt-8 space-y-1.5">
            <Link href="/admin" className="flex items-center justify-between rounded-xl px-4 py-3 text-xs font-medium text-black/70 hover:bg-black/5">📊 Studio Overview</Link>
            <Link href="/admin/photos" className="flex items-center justify-between rounded-xl bg-black px-4 py-3 text-xs font-medium text-white shadow-sm" style={{ color: '#ffffff' }}>🖼️ Photos Collection</Link>
            <Link href="/admin/inquiries" className="flex items-center justify-between rounded-xl px-4 py-3 text-xs font-medium text-black/70 hover:bg-black/5">📬 Client Inquiries</Link>
          </nav>
        </div>
        <div className="pt-6 border-t border-black/10 mt-6"><LogoutButton /></div>
      </aside>

      <main className="flex-grow p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/50">Studio Management</p>
              <h1 className="mt-2 text-3xl font-medium tracking-tight">Photos Gallery & Bulk Actions</h1>
            </div>
            <Link href="/admin/photos/new" className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-xs font-medium text-white hover:bg-neutral-800 shadow-sm" style={{ color: '#ffffff' }}>
              + Add New Photo
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-black/10 pb-4">
            <span className="text-xs uppercase tracking-widest text-black/40 mr-2">Filter:</span>
            {["all", "published", "drafts", "featured"].map((tab) => (
              <Link key={tab} href={`/admin/photos?filter=${tab}`} className={`rounded-full px-4 py-2 text-xs font-medium capitalize ${filter === tab ? "bg-black text-white" : "bg-white border border-black/10 text-black/70 hover:bg-black/5"}`} style={filter === tab ? { color: '#ffffff' } : {}}>
                {tab}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <BulkPhotoManager photos={photos} />
          </div>
        </div>
      </main>
    </div>
  );
}