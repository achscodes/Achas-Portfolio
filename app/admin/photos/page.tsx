import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/auth/LogoutButton";

type Category = {
  name: string;
};

type Photo = {
  id: string;
  title: string;
  image_url: string | null;
  status: string;
  featured: boolean;
  created_at: string;
  category_id: string | null;
  categories: Category | Category[] | null;
};

export default async function AdminPhotosPage() {
  const supabase = await createClient();

  // Check authentication
  const { data: authData, error: authError } =
    await supabase.auth.getClaims();

  if (authError || !authData) {
    redirect("/login");
  }

  // Get photos from database
  const { data: photosData, error: photosError } = await supabase
    .from("photos")
    .select(`
      id,
      title,
      image_url,
      status,
      featured,
      created_at,
      category_id,
      categories (
        name
      )
    `)
    .order("created_at", { ascending: false });

  if (photosError) {
    console.error("Error loading photos:", photosError);
  }

  const photos = (photosData ?? []) as Photo[];

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <Link
              href="/admin"
              className="text-sm text-black/50 transition hover:text-black"
            >
              ← Back to Dashboard
            </Link>

            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-black/50">
              Achás Portfolio
            </p>

            <h1 className="mt-3 text-4xl font-medium">
              Photos
            </h1>

            <p className="mt-3 text-black/60">
              Manage your photography collection.
            </p>
          </div>

          <LogoutButton />
        </div>

        {/* Add Photo */}
        <div className="mt-10">
          <Link
            href="/admin/photos/new"
            className="inline-flex bg-black px-5 py-3 text-sm font-medium !text-white transition hover:bg-black/80"
          >
            + Add Photo
          </Link>
        </div>

        {/* Error */}
        {photosError && (
          <div className="mt-8 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Unable to load photos.
          </div>
        )}

        {/* Photos */}
        <div className="mt-10">
          {photos.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="overflow-hidden border border-black/10 bg-white"
                >
                  {/* Photo Image */}
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

                  {/* Photo Details */}
                  <div className="p-5">
                    <h2 className="font-medium">
                      {photo.title}
                    </h2>

                    <p className="mt-1 text-sm text-black/50">
                      {getCategoryName(photo.categories)}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs uppercase tracking-wider text-black/50">
                        {photo.status}
                      </span>

                      {photo.featured && (
                        <span className="text-xs uppercase tracking-wider text-black">
                          Featured
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/admin/photos/${photo.id}`}
                      className="text-sm font-medium underline underline-offset-4 transition hover:opacity-60"
                    >
                      Edit
                    </Link>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-black/20 bg-white p-12 text-center">
              <h2 className="text-xl font-medium">
                No photos yet
              </h2>

              <p className="mt-2 text-sm text-black/50">
                Start building your portfolio by adding your first photo.
              </p>

              <Link
                href="/admin/photos/new"
                className="mt-6 inline-flex bg-black px-5 py-3 text-sm font-medium !text-white transition hover:bg-black/80"
              >
                Add Your First Photo
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function getCategoryName(
  categories: Category | Category[] | null | undefined
): string {
  if (!categories) {
    return "Uncategorized";
  }

  if (Array.isArray(categories)) {
    return categories[0]?.name ?? "Uncategorized";
  }

  return categories.name;
}