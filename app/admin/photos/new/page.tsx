import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PhotoForm from "@/components/admin/PhotoForm";

export default async function NewPhotoPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data) {
    redirect("/login");
  }

  const { data: categories, error: categoriesError } =
    await supabase
      .from("categories")
      .select("id, name, slug")
      .order("name");

  if (categoriesError) {
    console.error("Error loading categories:", categoriesError);
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-12">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/admin/photos"
          className="text-sm text-black/50 transition hover:text-black"
        >
          ← Back to Photos
        </Link>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.3em] text-black/50">
            Achás Portfolio
          </p>

          <h1 className="mt-3 text-4xl font-medium">
            Add Photo
          </h1>

          <p className="mt-3 text-black/60">
            Add a new photograph to your portfolio.
          </p>
        </div>

        <div className="mt-10 border border-black/10 bg-white p-8">
          <PhotoForm categories={categories ?? []} />
        </div>

      </div>
    </main>
  );
}