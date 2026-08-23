"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Photo = {
  id: string;
  title: string;
  image_url: string | null;
  status: string;
  featured: boolean;
  categories: { name: string } | { name: string }[] | null;
};

export default function BulkPhotoManager({ photos }: { photos: Photo[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(photos.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} selected photos?`)) return;
    setLoading(true);

    try {
      const res = await fetch("/api/admin/photos/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (res.ok) {
        setSelectedIds([]);
        router.refresh();
      } else {
        alert("Failed to delete selected photos.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Bulk Actions Header Bar (Appears when items are selected) */}
      {selectedIds.length > 0 && (
        <div className="mb-6 flex items-center justify-between rounded-2xl bg-black px-6 py-4 text-white shadow-md animate-fadeIn" style={{ color: '#ffffff' }}>
          <p className="text-xs font-medium">
            {selectedIds.length} photo{selectedIds.length > 1 ? "s" : ""} selected
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleBulkDelete}
              disabled={loading}
              className="rounded-full bg-red-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              style={{ color: '#ffffff' }}
            >
              {loading ? "Deleting..." : "Delete Selected"}
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-white/70 hover:text-white"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Select All Checkbox Control */}
      {photos.length > 0 && (
        <div className="mb-4 flex items-center gap-2 px-2 text-xs text-black/60">
          <input
            type="checkbox"
            checked={selectedIds.length === photos.length && photos.length > 0}
            onChange={handleSelectAll}
            className="h-4 w-4 rounded border-black/20 accent-black"
          />
          <label>Select All Photos on this view</label>
        </div>
      )}

      {/* Photos Grid */}
      {photos.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => {
            const isSelected = selectedIds.includes(photo.id);
            const categoryName = Array.isArray(photo.categories)
              ? photo.categories[0]?.name
              : photo.categories?.name;

            return (
              <div
                key={photo.id}
                className={`group relative overflow-hidden rounded-3xl border bg-white flex flex-col justify-between shadow-sm transition-all duration-300 ${
                  isSelected ? "border-black ring-2 ring-black/10" : "border-black/10 hover:border-black/30"
                }`}
              >
                <div>
                  <div className="aspect-[4/3] bg-black/5 relative overflow-hidden">
                    {photo.image_url ? (
                      <img
                        src={photo.image_url}
                        alt={photo.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-black/40">
                        No image
                      </div>
                    )}

                    {/* Selection Checkbox Overlay */}
                    <div className="absolute top-3 left-3 z-10">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(photo.id)}
                        className="h-5 w-5 rounded-md border-white bg-white/80 accent-black shadow-sm cursor-pointer"
                      />
                    </div>

                    {/* Status badges */}
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider backdrop-blur-md ${
                        photo.status === 'published' ? 'bg-black/80 text-white' : 'bg-white/90 text-black border border-black/10'
                      }`}
                      style={photo.status === 'published' ? { color: '#ffffff' } : {}}
                      >
                        {photo.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="font-medium text-lg tracking-tight text-black">
                      {photo.title}
                    </h2>
                    <p className="mt-1 text-xs uppercase tracking-widest text-black/50">
                      {categoryName || "Uncategorized"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-black/10 px-6 py-4 bg-black/[0.01] flex items-center justify-between text-xs font-medium">
                  <Link
                    href={`/admin/photos/${photo.id}`}
                    className="inline-flex items-center gap-1.5 text-black hover:underline"
                  >
                    <span>Edit Details</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-black/20 bg-white p-16 text-center shadow-sm">
          <h2 className="text-xl font-medium tracking-tight">No photos found</h2>
          <p className="mt-2 text-sm text-black/50 max-w-sm mx-auto">
            No photographs match your criteria.
          </p>
        </div>
      )}
    </div>
  );
}