import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { photos } from "@/lib/data/photos";

interface PhotoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { id } = await params;

  const photo = photos.find((item) => item.id === id);

  if (!photo) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="px-6 pb-24 pt-36 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/portfolio"
            className="text-sm text-black/50 transition-colors hover:text-black"
          >
            ← Back to portfolio
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_320px]">
            <div className="relative min-h-[60vh] overflow-hidden bg-black/5">
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, calc(100vw - 400px)"
                className="object-contain"
              />
            </div>

            <aside>
              <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                {photo.category}
              </p>

              <h1 className="mt-4 text-3xl font-medium tracking-tight">
                {photo.title}
              </h1>

              {photo.description && (
                <p className="mt-6 text-sm leading-7 text-black/60">
                  {photo.description}
                </p>
              )}

              <div className="mt-10 space-y-5 border-t border-black/10 pt-6 text-sm">
                {photo.dateTaken && (
                  <div>
                    <p className="text-black/40">Date</p>
                    <p className="mt-1">{photo.dateTaken}</p>
                  </div>
                )}

                {photo.location && (
                  <div>
                    <p className="text-black/40">Location</p>
                    <p className="mt-1">{photo.location}</p>
                  </div>
                )}

                {photo.project && (
                  <div>
                    <p className="text-black/40">Project</p>
                    <p className="mt-1">{photo.project}</p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}