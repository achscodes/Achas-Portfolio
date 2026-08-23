"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import DeletePhotoButton from "@/components/photos/DeletePhotoButton";

type Category = {
  id?: string;
  name: string;
};

type Photo = {
  id: string;
  title: string;
  image_url: string | null;
  status: string;
  featured: boolean;
  created_at: string;
  category_id: string | null;
  categories: Category | Category[] | null;
};

type PhotoManagerProps = {
  photos: Photo[];
};

export default function PhotoManager({
  photos,
}: PhotoManagerProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  /*
   * Get unique categories from the photos.
   */
  const categories = useMemo(() => {
    const categoryMap = new Map<string, string>();

    photos.forEach((photo) => {
      const categoryName = getCategoryName(photo.categories);

      if (categoryName === "Uncategorized") {
        return;
      }

      const value = categoryName.toLowerCase();

      categoryMap.set(value, categoryName);
    });

    return Array.from(categoryMap.entries()).map(
      ([value, label]) => ({
        value,
        label,
      })
    );
  }, [photos]);

  /*
   * Filter photos.
   */
  const filteredPhotos = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return photos.filter((photo) => {
      const categoryName = getCategoryName(
        photo.categories
      );

      const normalizedTitle = photo.title
        .toLowerCase();

      const normalizedCategory = categoryName
        .toLowerCase();

      const matchesSearch =
        normalizedSearch === "" ||
        normalizedTitle.includes(normalizedSearch) ||
        normalizedCategory.includes(normalizedSearch);

      const matchesCategory =
        categoryFilter === "all" ||
        normalizedCategory === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        photo.status.toLowerCase() === statusFilter;

      const matchesFeatured =
        !featuredOnly || photo.featured;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesFeatured
      );
    });
  }, [
    photos,
    search,
    categoryFilter,
    statusFilter,
    featuredOnly,
  ]);

  /*
   * Clear all filters.
   */
  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setStatusFilter("all");
    setFeaturedOnly(false);
  };

  /*
   * Check whether any filter is currently active.
   */
  const hasActiveFilters =
    search.trim() !== "" ||
    categoryFilter !== "all" ||
    statusFilter !== "all" ||
    featuredOnly;

  return (
    <div>
      {/* Search and Filters (Only show if there are photos in the database) */}
      {photos.length > 0 && (
        <div className="border border-black/10 bg-white p-5">
          {/* Search */}
          <div>
            <label
              htmlFor="photo-search"
              className="block text-sm font-medium text-black"
            >
              Search Photos
            </label>

            <div className="relative mt-2">
              <input
                id="photo-search"
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by title or category..."
                className="w-full border border-black/15 bg-white px-4 py-3 pr-10 text-sm text-black outline-none placeholder:text-black/40 focus:border-black"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lg leading-none text-black/50 transition hover:text-black"
                >
                  ×
                </button>
              )}
            </div>

            {search && (
              <p className="mt-3 text-sm text-black/50">
                Searching for{" "}
                <span className="font-medium text-black">
                  "{search}"
                </span>
              </p>
            )}
          </div>

          {/* Category */}
          <div className="mt-6">
            <p className="text-sm font-medium text-black">
              Category
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <FilterButton
                active={categoryFilter === "all"}
                onClick={() =>
                  setCategoryFilter("all")
                }
              >
                All
              </FilterButton>

              {categories.map((category) => (
                <FilterButton
                  key={category.value}
                  active={
                    categoryFilter === category.value
                  }
                  onClick={() =>
                    setCategoryFilter(category.value)
                  }
                >
                  {category.label}
                </FilterButton>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="mt-6">
            <p className="text-sm font-medium text-black">
              Status
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <FilterButton
                active={statusFilter === "all"}
                onClick={() =>
                  setStatusFilter("all")
                }
              >
                All
              </FilterButton>

              <FilterButton
                active={statusFilter === "published"}
                onClick={() =>
                  setStatusFilter("published")
                }
              >
                Published
              </FilterButton>

              <FilterButton
                active={statusFilter === "draft"}
                onClick={() =>
                  setStatusFilter("draft")
                }
              >
                Draft
              </FilterButton>
            </div>
          </div>

          {/* Featured */}
          <div className="mt-6">
            <label className="flex cursor-pointer items-center gap-3 text-sm text-black">
              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={(event) =>
                  setFeaturedOnly(
                    event.target.checked
                  )
                }
                className="h-4 w-4"
              />

              <span>
                Show featured photos only
              </span>
            </label>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 text-sm font-medium text-black underline underline-offset-4 transition hover:opacity-60"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Result Count */}
      {photos.length > 0 && (
        <div className="mt-8">
          <p className="text-sm text-black/50">
            Showing{" "}
            <span className="font-medium text-black">
              {filteredPhotos.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-black">
              {photos.length}
            </span>{" "}
            photos
          </p>
        </div>
      )}

      {/* Photos Grid or Empty States */}
      <div className="mt-5">
        {photos.length === 0 ? (
          <div className="border border-dashed border-black/20 bg-white p-12 text-center">
            <h2 className="text-xl font-medium text-black">
              No photographs added yet
            </h2>
            <p className="mt-2 text-sm text-black/50">
              Get started by uploading your first photograph to the portfolio.
            </p>
            <div className="mt-6">
              <Link
                href="/admin/photos/new"
                className="inline-block bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80"
              >
                Upload First Photo
              </Link>
            </div>
          </div>
        ) : filteredPhotos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="overflow-hidden border border-black/10 bg-white"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-black/5">
                  {photo.image_url ? (
                    <img
                      src={photo.image_url}
                      alt={photo.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-black/40">
                      No image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5">
                  <h2 className="font-medium text-black">
                    {photo.title}
                  </h2>

                  <p className="mt-1 text-sm text-black/50">
                    {getCategoryName(
                      photo.categories
                    )}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs uppercase tracking-wider text-black/50">
                        {photo.status}
                      </span>

                      {photo.featured && (
                        <span className="text-xs uppercase tracking-wider text-black">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <Link
                        href={`/admin/photos/${photo.id}`}
                        className="text-sm font-medium text-black underline underline-offset-4 transition hover:opacity-60"
                      >
                        Edit
                      </Link>

                      <DeletePhotoButton
                        photoId={photo.id}
                        photoTitle={photo.title}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-black/20 bg-white p-12 text-center">
            <h2 className="text-xl font-medium text-black">
              No photos found
            </h2>

            <p className="mt-2 text-sm text-black/50">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function getCategoryName(
  categories:
    | Category
    | Category[]
    | null
    | undefined
): string {
  if (!categories) {
    return "Uncategorized";
  }

  if (Array.isArray(categories)) {
    return categories[0]?.name ?? "Uncategorized";
  }

  return categories.name;
}

type FilterButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function FilterButton({
  active,
  onClick,
  children,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "bg-black px-4 py-2 text-sm font-medium text-white"
          : "border border-black/15 bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-black/5"
      }
    >
      {children}
    </button>
  );
}