import { createClient } from "@/lib/supabase/server";

export async function getPublishedPhotos() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("photos")
    .select(`
      id,
      title,
      description,
      image_url,
      storage_path,
      category_id,
      project_id,
      date_taken,
      location,
      featured,
      status,
      created_at,
      updated_at,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching published photos:", error);
    return [];
  }

  return data;
}