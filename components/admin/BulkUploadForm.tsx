"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Category = {
  id: string;
  name: string;
};

export default function BulkUploadForm({ categories }: { categories: Category[] }) {
  const [files, setFiles] = useState<File[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("published");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleBulkUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(`Uploading photo ${i + 1} of ${files.length}: ${file.name}`);

        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

        // 1. Upload file to 'photography' bucket
        const { error: uploadError } = await supabase.storage
          .from("photography")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // 2. Get Public URL
        const { data: publicUrlData } = supabase.storage
          .from("photography")
          .getPublicUrl(fileName);

        const image_url = publicUrlData.publicUrl;

        // 3. Insert record into database
        const { error: dbError } = await supabase.from("photos").insert([
          {
            title: file.name.substring(0, file.name.lastIndexOf(".")) || file.name,
            image_url,
            category_id: categoryId || null,
            status,
            featured: false,
          },
        ]);

        if (dbError) throw dbError;

        // Small pause between sequential uploads to maintain session integrity
        if (i < files.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      }

      setProgress("All photos uploaded successfully!");
      router.push("/admin/photos");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      alert(`Upload failed: ${err.message}`);
      setUploading(false);
      setProgress("");
    }
  };

  return (
    <form onSubmit={handleBulkUpload} className="space-y-6 bg-white border border-black/10 p-8 sm:p-12 rounded-3xl shadow-sm">
      
      {/* Category Selection */}
      <div>
        <label className="block text-xs uppercase tracking-[0.2em] text-black/60 font-semibold mb-2">
          Assign Category for All
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
        >
          <option value="">Uncategorized</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Status Selection */}
      <div>
        <label className="block text-xs uppercase tracking-[0.2em] text-black/60 font-semibold mb-2">
          Status for All Uploads
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* File Picker */}
      <div>
        <label className="block text-xs uppercase tracking-[0.2em] text-black/60 font-semibold mb-2">
          Select Photos (Multiple)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full rounded-2xl border border-black/15 bg-neutral-50 px-4 py-3 text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-neutral-800 transition-all cursor-pointer"
          required
        />
        {files.length > 0 && (
          <p className="mt-2 text-xs text-black/60">
            {files.length} file{files.length > 1 ? "s" : ""} selected ready for upload.
          </p>
        )}
      </div>

      {/* Progress Indicator */}
      {progress && (
        <div className="rounded-2xl bg-neutral-100 p-4 text-xs font-medium text-black border border-black/10">
          {progress}
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={uploading || files.length === 0}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-50 shadow-sm cursor-pointer"
          style={{ color: '#ffffff' }}
        >
          {uploading ? "Uploading Photos..." : `Upload ${files.length} Photo${files.length !== 1 ? "s" : ""} →`}
        </button>
      </div>
    </form>
  );
}