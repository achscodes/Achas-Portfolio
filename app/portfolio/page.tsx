import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioGallery from "@/components/gallery/PorfolioGallery";
import { createClient } from "@/lib/supabase/server";
import { PhotoCategory } from "@/types/photo";

export const metadata = {
  title: "Portfolio | Achás",
  description:
    "Explore the photography portfolio including events, portraits, sports, and street photography.",
};

// Force dynamic rendering so newly published photos appear instantly
export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const supabase = await createClient();

  // Fetch published photos from Supabase along with their category name
  const { data: rawPhotos, error } = await supabase
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
        id,
        name
      )
    `)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching published photos:", error.message);
  }

  // Map Supabase fields to match the Photo type expected by PortfolioGallery
  const publishedPhotos = (rawPhotos || []).map((photo: any) => {
    let categoryName: PhotoCategory = "Events";
    const cat = photo.categories;
    
    if (cat) {
      const name = Array.isArray(cat) ? cat[0]?.name : cat?.name;
      if (name) {
        categoryName = name as PhotoCategory;
      }
    }

    return {
      id: photo.id,
      title: photo.title,
      imageUrl: photo.image_url || "",
      category: categoryName,
      status: photo.status,
      featured: photo.featured,
      createdAt: photo.created_at,
    };
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="px-6 pb-24 pt-36 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-black/45">
              Portfolio
            </p>

            <h1 className="mt-4 text-5xl font-medium tracking-tight sm:text-6xl">
              Selected work.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-black/60 sm:text-lg">
              A collection of photographs covering events, portraits, sports,
              and everyday moments.
            </p>
          </div>

          <div className="mt-16">
            <PortfolioGallery photos={publishedPhotos} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}