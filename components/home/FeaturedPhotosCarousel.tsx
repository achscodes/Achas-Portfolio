"use client";

import Image from "next/image";

type Photo = {
  id: string;
  title: string;
  image_url: string;
};

export default function FeaturedPhotosCarousel({ photos }: { photos: Photo[] }) {
  if (!photos || photos.length === 0) {
    return (
      <div className="py-12 text-center text-black/50 text-sm">
        No featured photos found. Mark some photos as featured in your admin dashboard!
      </div>
    );
  }

  // Duplicate photos array to create a seamless infinite loop effect
  const duplicatedPhotos = [...photos, ...photos];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="animate-marquee flex gap-6 py-4">
        {duplicatedPhotos.map((photo, index) => (
          <div
            key={`${photo.id}-${index}`}
            className="group relative flex-shrink-0 w-[300px] sm:w-[360px] aspect-[4/5] items-start justify-start overflow-hidden bg-black/5 p-6 rounded-3xl transition-transform hover:-translate-y-1 shadow-sm border border-black/10 flex flex-col"
          >
            <Image
              src={photo.image_url}
              alt={photo.title || "Featured Photograph"}
              fill
              sizes="360px"
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Top gradient overlay so title text stands out clearly */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent pointer-events-none" />

            <div className="relative z-10 text-white pointer-events-none w-full">
              <p className="text-base font-medium tracking-tight drop-shadow-md">
                {photo.title || "Untitled"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}