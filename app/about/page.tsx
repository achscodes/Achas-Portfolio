import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About | Achás",
  description: "Learn more about the photographer behind Achás Portfolio.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="px-6 pb-24 pt-36 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-black/45">
              About the Photographer
            </p>

            <h1 className="mt-4 text-5xl font-medium tracking-tight sm:text-6xl">
              Visual storytelling through intention and detail.
            </h1>
          </div>

          {/* Main Content Layout */}
          <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:items-start">
            {/* Photographer Image / Asset Placeholder with Modern Viewfinder Frame */}
            <div className="relative aspect-[4/5] overflow-hidden bg-black/5 ring-1 ring-black/10 lg:col-span-5">
              <Image
                src="/assets/photographer.jpg"
                alt="Photographer portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 -z-10 flex items-center justify-center p-6 text-center text-xs uppercase tracking-widest text-black/40">
                Add portrait to public/assets/photographer.jpg
              </div>
            </div>

            {/* Bio text with integrated photography focus highlights */}
            <div className="space-y-8 lg:col-span-7">
              <div className="space-y-6 text-base leading-7 text-black/75">
                <p>
                  Hello, I am Achás. My work is dedicated to framing authentic narratives and timeless perspectives through the lens. Whether documenting live <Link href="/portfolio?category=Events" className="font-medium text-black underline underline-offset-4 decoration-black/30 hover:decoration-black transition">Events & Coverages</Link> or freezing fast-paced action in <Link href="/portfolio?category=Sports" className="font-medium text-black underline underline-offset-4 decoration-black/30 hover:decoration-black transition">Sports Photography</Link>, every frame is approached with careful intent.
                </p>
                <p>
                  I also specialize in intimate <Link href="/portfolio?category=Portraits" className="font-medium text-black underline underline-offset-4 decoration-black/30 hover:decoration-black transition">Portraits</Link> and candid <Link href="/portfolio?category=Street%20Photography" className="font-medium text-black underline underline-offset-4 decoration-black/30 hover:decoration-black transition">Street & Documentary</Link> scenes, seeking out the quiet, unscripted moments that standard observation often misses.
                </p>
                <p>
                  My approach balances minimalism with precision—focusing on natural lighting, raw emotion, and clean composition to build visual archives that resonate with clients and viewers alike.
                </p>
              </div>

              {/* Modern Interactive Focus Badges with High Contrast */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/45 mb-4">
                  Available Specialties
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Events & Coverages", query: "Events" },
                    { label: "Portraits", query: "Portraits" },
                    { label: "Sports Photography", query: "Sports" },
                    { label: "Street & Documentary", query: "Street Photography" },
                  ].map((specialty) => (
                    <Link
                      key={specialty.label}
                      href={`/portfolio?category=${encodeURIComponent(specialty.query)}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-4 py-2 text-xs font-medium text-black transition-colors hover:border-black hover:bg-black hover:text-white"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-black group-hover:bg-white transition-colors" />
                      <span className="text-black group-hover:text-white">{specialty.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium transition-colors hover:bg-neutral-800"
                  style={{ color: '#ffffff' }}
                >
                  Get in Touch →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}