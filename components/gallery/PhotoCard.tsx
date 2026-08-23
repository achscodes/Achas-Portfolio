"use client";

import Image from "next/image";
import { Photo } from "@/types/photo";

interface PhotoCardProps {
  photo: Photo;
  onSelect: (photo: Photo) => void;
}

export default function PhotoCard({ photo, onSelect }: PhotoCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(photo)}
      className="group block w-full text-left break-inside-avoid cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
        <Image
          src={photo.imageUrl}
          alt={photo.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-sm font-medium text-white">{photo.title}</p>
          <p className="mt-1 text-xs text-white/70">{photo.category}</p>
        </div>
      </div>
    </button>
  );
}