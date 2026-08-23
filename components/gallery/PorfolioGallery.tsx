"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Photo, PhotoCategory } from "@/types/photo";
import PhotoCard from "./PhotoCard";
import Image from "next/image";

interface PortfolioGalleryProps {
  photos: Photo[];
}

const categories: ("All" | PhotoCategory)[] = [
  "All",
  "Events",
  "Portraits",
  "Sports",
  "Street Photography",
];

function CategorySearchHandler({
  onCategoryFound,
}: {
  onCategoryFound: (cat: "All" | PhotoCategory) => void;
}) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    if (categoryParam) {
      const matched = categories.find(
        (cat) => cat.toLowerCase() === categoryParam.toLowerCase()
      );
      if (matched) {
        onCategoryFound(matched);
      }
    }
  }, [categoryParam, onCategoryFound]);

  return null;
}

export default function PortfolioGallery({ photos }: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] =
    useState<"All" | PhotoCategory>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") {
      return photos;
    }

    return photos.filter(
      (photo) => photo.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [photos, activeCategory]);

  return (
    <div>
      <Suspense fallback={null}>
        <CategorySearchHandler onCategoryFound={setActiveCategory} />
      </Suspense>

      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm transition ${
                active
                  ? "bg-black text-white"
                  : "bg-black/5 text-black/60 hover:bg-black/10 hover:text-black"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filteredPhotos.length > 0 ? (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="mb-5">
              <PhotoCard photo={photo} onSelect={setSelectedPhoto} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="text-black/50">
            No photographs found in this category.
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-h-[90vh] max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white text-sm tracking-widest uppercase py-2 px-3"
            >
              Close [Esc]
            </button>

            {/* Image Container */}
            <div className="relative w-full h-[70vh] flex items-center justify-center">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Photo Details */}
            <div className="mt-4 text-center text-white">
              <h2 className="text-lg font-medium">{selectedPhoto.title}</h2>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/60">
                {selectedPhoto.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}