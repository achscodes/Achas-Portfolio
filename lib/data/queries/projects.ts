import { createClient } from "@/lib/supabase/server";

export async function getPublishedProjects() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      slug,
      description,
      cover_image_url,
      date,
      location,
      published,
      created_at,
      updated_at
    `)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching published projects:", error);
    return [];
  }

  return data;
}