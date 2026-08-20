import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About | Achás",
  description: "Learn more about Achás and the work behind the portfolio.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="px-6 pb-24 pt-36 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div className="relative aspect-[4/5] bg-black/5">
              <div className="absolute inset-0 flex items-center justify-center text-sm text-black/35">
                Profile Photograph
              </div>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                About
              </p>

              <h1 className="mt-4 text-5xl font-medium tracking-tight sm:text-6xl">
                Creating images that preserve moments.
              </h1>

              <div className="mt-8 space-y-6 text-base leading-8 text-black/60">
                <p>
                  Photography is a way of observing people, places, movement,
                  and the moments that often pass by quickly.
                </p>

                <p>
                  This portfolio brings together selected work across events,
                  portraits, sports, and street photography.
                </p>

                <p>
                  Each collection represents a different way of seeing and
                  documenting the world through photography.
                </p>
              </div>

              <div className="mt-12 border-t border-black/10 pt-8">
                <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                  Areas of Work
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {[
                    "Events",
                    "Portraits",
                    "Sports",
                    "Street Photography",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-black/5 px-4 py-2 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}