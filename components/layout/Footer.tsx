import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#f8f7f4]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Achás
            </Link>

            <p className="mt-2 max-w-md text-sm leading-6 text-black/55">
              A curated collection of photography, projects, and visual work.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-black/60">
            <Link
              href="/portfolio"
              className="transition-colors hover:text-black"
            >
              Portfolio
            </Link>

            <Link
              href="/projects"
              className="transition-colors hover:text-black"
            >
              Projects
            </Link>

            <Link
              href="/contact"
              className="transition-colors hover:text-black"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="border-t border-black/10 pt-6 text-xs text-black/45">
          © {new Date().getFullYear()} Achás. All rights reserved.
        </div>
      </div>
    </footer>
  );
}