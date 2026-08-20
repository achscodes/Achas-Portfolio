import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioGallery from "@/components/gallery/PorfolioGallery";
import { photos } from "@/lib/data/photos";

export const metadata = {
  title: "Portfolio | Achás",
  description:
    "Explore the photography portfolio including events, portraits, sports, and street photography.",
};

export default function PortfolioPage() {
  const publishedPhotos = photos.filter(
    (photo) => photo.status === "published"
  );

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