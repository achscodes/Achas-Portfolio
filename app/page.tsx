import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InteractiveHero from "@/components/home/InteractiveHero";
import FeaturedPhotosCarousel from "@/components/home/FeaturedPhotosCarousel";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();

  // Fetch all featured & published photos for the auto-looping carousel
  const { data: featuredPhotos } = await supabase
    .from("photos")
    .select("id, title, image_url")
    .eq("status", "published")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Interactive Sony A6400 Camera Viewfinder Hero Section */}
        <InteractiveHero />

        {/* Featured Work Auto-Looping Carousel Section */}
        <section className="border-t border-black/10 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                  Selected Work by the photographer
                </p>

                <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                  Featured Photos
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

            {/* Auto-looping carousel of all featured photos */}
            <FeaturedPhotosCarousel photos={featuredPhotos || []} />
          </div>
        </section>

        {/* About Teaser Section */}
        <section className="border-t border-black/10 py-24">
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
        <section className="border-t border-black/10 py-24 mb-12">
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
              <span>Contact Me!</span>
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}