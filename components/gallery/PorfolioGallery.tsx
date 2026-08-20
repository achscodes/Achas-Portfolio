"use client";

import { useMemo, useState } from "react";
import { Photo, PhotoCategory } from "@/types/photo";
import PhotoCard from "./PhotoCard";

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

export default function PortfolioGallery({
  photos,
}: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] =
    useState<"All" | PhotoCategory>("All");

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") {
      return photos;
    }

    return photos.filter((photo) => photo.category === activeCategory);
  }, [photos, activeCategory]);

  return (
    <div>
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
              <PhotoCard photo={photo} />
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
    </div>
  );
}