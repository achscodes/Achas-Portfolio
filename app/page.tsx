import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedCarousel from "@/components/gallery/FeaturedCarousel";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();

  // 1. Fetch all featured and published photos for the hero carousel
  const { data: featuredPhotos } = await supabase
    .from("photos")
    .select("id, title, image_url, featured, status")
    .eq("status", "published")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  // 2. Fetch categories and one preview image for each category
  const categoriesList = ["Events", "Portraits", "Sports", "Street Photography"];
  
  const categoryPreviews: Record<string, string | null> = {};

  for (const catName of categoriesList) {
    const { data: catData } = await supabase
      .from("categories")
      .select("id")
      .ilike("name", catName)
      .single();

    if (catData) {
      const { data: photoData } = await supabase
        .from("photos")
        .select("image_url")
        .eq("status", "published")
        .eq("category_id", catData.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      categoryPreviews[catName] = photoData?.image_url || null;
    } else {
      categoryPreviews[catName] = null;
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero Carousel Section */}
        <section className="flex min-h-screen items-center px-6 pb-20 pt-32 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-black/50">
                <span className="h-1 w-1 rounded-full bg-black/50" />
                Photography Portfolio
              </div>

              <h1 className="max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Moments,
                <br />
                captured
                <br />
                with intention.
              </h1>

              <p className="mt-8 max-w-xl text-base leading-7 text-black/60 sm:text-lg">
                A curated collection of photographs exploring people, events,
                sports, streets, and moments worth remembering.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-3 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 hover:text-white"
                >
                  <span>View Portfolio</span>
                  <span>→</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-transparent px-7 py-3.5 text-sm font-medium text-black transition-colors hover:border-black hover:bg-black hover:!text-white"
                >
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-black/5 ring-1 ring-black/10">
              <FeaturedCarousel photos={featuredPhotos || []} />
            </div>
          </div>
        </section>

        {/* Explore Categories Section with Background Thumbnails */}
        <section className="border-t border-black/10 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                  Selected Work
                </p>

                <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                  Explore the portfolio
                </h2>
              </div>

              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4"
              >
                <span>View all work</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categoriesList.map((category) => {
                const bgImage = categoryPreviews[category];

                return (
                  <Link
                    key={category}
                    href={`/portfolio?category=${encodeURIComponent(category)}`}
                    className="group relative flex aspect-square items-end overflow-hidden bg-black/5 p-6 transition-transform hover:-translate-y-1"
                  >
                    {bgImage ? (
                      <Image
                        src={bgImage}
                        alt={category}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : null}

                    {/* Dark gradient overlay so text remains readable over the image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="relative z-10 text-white">
                      <p className="text-lg font-medium">{category}</p>
                      <p className="mt-1 text-xs uppercase tracking-widest text-white/70">
                        Explore collection
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Teaser Section */}
        <section className="border-t border-black/10 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-black/45">
              About
            </p>

            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl">
              Photography centered around genuine moments.
            </h2>

            <p className="mt-6 text-base leading-7 text-black/60">
              Explore a collection of photographs documenting people,
              places, events, movement, and everyday moments through a
              personal visual perspective.
            </p>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
            >
              <span>More about the photographer</span>
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="border-t border-black/10 px-6 py-24 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                Start a conversation
              </p>

              <h2 className="mt-4 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">
                Have a project in mind?
              </h2>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <span>Contact Studio</span>
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}