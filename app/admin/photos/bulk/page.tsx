import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BulkUploadForm from "@/components/admin/BulkUploadForm";

export const dynamic = "force-dynamic";

export default async function BulkUploadPage() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getClaims();
  if (authError || !authData) {
    redirect("/login");
  }

  const { data: categoriesData } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true });

  const categories = categoriesData ?? [];

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/admin/photos"
            className="text-xs uppercase tracking-[0.2em] text-black/50 hover:text-black transition"
          >
            ← Back to Photos
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] text-black/30">chas.arw</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-medium tracking-tight text-black">Bulk Upload Photos</h1>
          <p className="mt-1 text-sm text-black/60">
            Select multiple images to upload them simultaneously to your gallery.
          </p>
        </div>

        <BulkUploadForm categories={categories} />

      </div>
    </main>
  );
}