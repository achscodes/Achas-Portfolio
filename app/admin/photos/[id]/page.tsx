import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/auth/LogoutButton";
import { updatePhoto } from "../actions";

type Category = {
  id: string;
  name: string;
};

type Photo = {
  id: string;
  title: string;
  image_url: string | null;
  status: string;
  featured: boolean;
  category_id: string | null;
  categories: Category | Category[] | null;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPhotoPage({ params }: PageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // Check authentication
  const { data: authData, error: authError } =
    await supabase.auth.getClaims();

  if (authError || !authData) {
    redirect("/login");
  }

  // Get photo
  const { data: photoData, error: photoError } = await supabase
    .from("photos")
    .select(`
      id,
      title,
      image_url,
      status,
      featured,
      category_id,
      categories (
        id,
        name
      )
    `)
    .eq("id", id)
    .single();

  if (photoError || !photoData) {
    notFound();
  }

  const photo = photoData as Photo;

  // Get categories
  const { data: categoriesData } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true });

  const categories = categoriesData ?? [];

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <Link
              href="/admin"
              className="text-sm text-black/50 transition hover:text-black"
            >
              ← Back to Admin Dashboard
            </Link>

            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-black/50">
              Achás Portfolio
            </p>

            <h1 className="mt-3 text-4xl font-medium">
              Edit Photo
            </h1>

            <p className="mt-3 text-black/60">
              Update the details of this photograph.
            </p>
          </div>

          <LogoutButton />
        </div>

        {/* Content */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          {/* Image Preview */}
          <div>
            <div className="overflow-hidden border border-black/10 bg-white">
              <div className="aspect-[4/3] bg-black/5">
                {photo.image_url ? (
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-black/40">
                    No image
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="border border-black/10 bg-white p-6">
            <form action={updatePhoto} className="space-y-6">

              <input
                  type="hidden"
                  name="id"
                  value={photo.id}
              /> 
  
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium"
                >
                  Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={photo.title}
                  className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category_id"
                  defaultValue={photo.category_id ?? ""}
                  className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                >
                  <option value="">
                    Uncategorized
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium"
                >
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  defaultValue={photo.status}
                  className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                >
                  <option value="draft">
                    Draft
                  </option>

                  <option value="published">
                    Published
                  </option>
                </select>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  defaultChecked={photo.featured}
                  className="h-4 w-4"
                />

                <label
                  htmlFor="featured"
                  className="text-sm"
                >
                  Feature this photo
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-black px-5 py-3 text-sm font-medium !text-white transition hover:bg-black/80"
                  style={{ color: '#ffffff' }}
                >
                  Save Changes
                </button>

                <Link
                  href="/admin"
                  className="border border-black/15 px-5 py-3 text-sm font-medium transition hover:bg-black/5"
                >
                  Cancel
                </Link>
              </div>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}