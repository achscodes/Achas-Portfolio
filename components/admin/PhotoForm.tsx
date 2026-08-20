"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface PhotoFormProps {
  categories: Category[];
}

export default function PhotoForm({
  categories,
}: PhotoFormProps) {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dateTaken, setDateTaken] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState("draft");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!file) {
      setError("Please select an image.");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    if (!categoryId) {
      setError("Please select a category.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const fileExtension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `${crypto.randomUUID()}.${fileExtension}`;

      const filePath = `portfolio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("photography")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("photography")
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from("photos")
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          image_url: publicUrl,
          storage_path: filePath,
          category_id: categoryId,
          location: location.trim() || null,
          date_taken: dateTaken || null,
          featured,
          status,
        });

      if (insertError) {
        throw new Error(insertError.message);
      }

      router.push("/admin/photos");
      router.refresh();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Image */}
      <div>
        <label
          htmlFor="image"
          className="mb-2 block text-sm font-medium"
        >
          Photograph
        </label>

        <input
          id="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
          }}
          className="block w-full text-sm"
        />

        <p className="mt-2 text-xs text-black/50">
          JPG, PNG, or WebP
        </p>
      </div>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Evening Lights"
          required
          className="w-full border border-black/20 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium"
        >
          Category
        </label>

        <select
          id="category"
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          required
          className="w-full border border-black/20 bg-white px-4 py-3 outline-none focus:border-black"
        >
          <option value="">
            Select a category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium"
        >
          Description
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          rows={4}
          placeholder="Describe the photograph..."
          className="w-full resize-none border border-black/20 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="location"
          className="mb-2 block text-sm font-medium"
        >
          Location
        </label>

        <input
          id="location"
          type="text"
          value={location}
          onChange={(event) =>
            setLocation(event.target.value)
          }
          placeholder="e.g. Manila, Philippines"
          className="w-full border border-black/20 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="dateTaken"
          className="mb-2 block text-sm font-medium"
        >
          Date Taken
        </label>

        <input
          id="dateTaken"
          type="date"
          value={dateTaken}
          onChange={(event) =>
            setDateTaken(event.target.value)
          }
          className="w-full border border-black/20 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <input
          id="featured"
          type="checkbox"
          checked={featured}
          onChange={(event) =>
            setFeatured(event.target.checked)
          }
          className="h-4 w-4"
        />

        <label
          htmlFor="featured"
          className="text-sm"
        >
          Feature this photograph
        </label>
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="mb-2 block text-sm font-medium"
        >
          Status
        </label>

        <select
          id="status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
          className="w-full border border-black/20 bg-white px-4 py-3 outline-none focus:border-black"
        >
          <option value="draft">
            Draft
          </option>

          <option value="published">
            Published
          </option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Add Photo"}
      </button>
    </form>
  );
}