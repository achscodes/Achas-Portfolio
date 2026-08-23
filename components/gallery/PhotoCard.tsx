import Image from "next/image";
import { Photo } from "@/types/photo";

interface PhotoCardProps {
  photo: Photo;
  onSelect: (photo: Photo) => void;
}

export default function PhotoCard({ photo, onSelect }: PhotoCardProps) {
  return (
    <div
      onClick={() => onSelect(photo)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 border border-black/10 transition-all hover:shadow-md break-inside-avoid"
    >
      {/* 
        By removing fixed heights and using w-full h-auto, 
        the image respects its original portrait or landscape dimensions. 
      */}
      <div className="relative w-full">
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Subtle Hover Details Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between">
        <div>
          <h3 className="text-xs font-medium text-white tracking-wide">{photo.title}</h3>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">{photo.category}</p>
        </div>
      </div>
    </div>
  );
}