import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { projects } from "@/lib/data/project";

export const metadata = {
  title: "Projects | Achas",
  description: "Selected photography projects and collections.",
};

export default function ProjectsPage() {
  const publishedProjects = projects.filter(
    (project) => project.published
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="px-6 pb-24 pt-36 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-black/45">
              Projects
            </p>

            <h1 className="mt-4 text-5xl font-medium tracking-tight sm:text-6xl">
              Stories through collections.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-black/60 sm:text-lg">
              Selected bodies of work organized around events, people, places,
              and ideas.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {publishedProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-5">
                  <h2 className="text-xl font-medium">{project.title}</h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-black/55">
                    {project.description}
                  </p>

                  <div className="mt-3 flex gap-4 text-xs text-black/40">
                    {project.date && <span>{project.date}</span>}
                    {project.location && <span>{project.location}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}