import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="flex min-h-screen items-center px-6 pb-20 pt-32 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-6 text-sm uppercase tracking-[0.25em] text-black/50">
                Photography Portfolio
              </p>

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
                  className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
                >
                  View Portfolio
                </Link>

                <Link
                  href="/contact"
                  className="rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition-colors hover:bg-black hover:text-white"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
              <div className="absolute inset-0 flex items-center justify-center text-sm text-black/35">
                Featured Photograph
              </div>
            </div>
          </div>
        </section>

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
                className="text-sm font-medium underline underline-offset-4"
              >
                View all work
              </Link>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Events",
                "Portraits",
                "Sports",
                "Street Photography",
              ].map((category) => (
                <Link
                  key={category}
                  href={`/portfolio?category=${encodeURIComponent(category)}`}
                  className="group flex aspect-square items-end bg-black/5 p-6 transition-transform hover:-translate-y-1"
                >
                  <div>
                    <p className="text-lg font-medium">{category}</p>
                    <p className="mt-1 text-sm text-black/45">
                      Explore collection
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-black/10 px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
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
                className="mt-8 inline-block text-sm font-medium underline underline-offset-4"
              >
                More about the photographer
              </Link>
            </div>
          </div>
        </section>

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
              className="w-fit rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
            >
              Contact
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
