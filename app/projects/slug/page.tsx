import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { projects } from "@/lib/data/project";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="px-6 pb-24 pt-36 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/projects"
            className="text-sm text-black/50 hover:text-black"
          >
            ← Back to projects
          </Link>

          <div className="mt-10">
            <div className="relative aspect-[16/8] overflow-hidden bg-black/5">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-10 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                Project
              </p>

              <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">
                {project.title}
              </h1>

              <p className="mt-6 text-base leading-7 text-black/60 sm:text-lg">
                {project.description}
              </p>

              <div className="mt-8 flex gap-6 text-sm text-black/45">
                {project.date && <span>{project.date}</span>}
                {project.location && <span>{project.location}</span>}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}