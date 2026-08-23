"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type FeaturedPhoto = {
  id: string;
  title: string;
  image_url: string | null;
};

interface FeaturedCarouselProps {
  photos: FeaturedPhoto[];
}

export default function FeaturedCarousel({ photos }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically cycle slides every 5 seconds
  useEffect(() => {
    if (photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [photos.length]);

  if (!photos || photos.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-sm text-black/35">
        Featured Photograph
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Slides */}
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {photo.image_url && (
            <Image
              src={photo.image_url}
              alt={photo.title || "Featured Photograph"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={index === 0}
            />
          )}

          {/* Subtle caption banner */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-12 text-white">
            <p className="text-sm font-medium">{photo.title}</p>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      {photos.length > 1 && (
        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 transition-all rounded-full ${
                index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}