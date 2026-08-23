"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updatePhoto(formData: FormData) {
  const supabase = await createClient();

  // Check authentication
  const { data: authData, error: authError } =
    await supabase.auth.getClaims();

  if (authError || !authData) {
    redirect("/login");
  }

  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString().trim();
  const categoryId = formData.get("category_id")?.toString() || null;
  const status = formData.get("status")?.toString();
  const featured = formData.get("featured") === "on";

  if (!id || !title || !status) {
    throw new Error("Missing required photo information.");
  }

  const { error } = await supabase
    .from("photos")
    .update({
      title,
      category_id: categoryId,
      status,
      featured,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating photo:", error);
    throw new Error("Unable to update photo.");
  }

  revalidatePath("/admin/photos");
  revalidatePath(`/admin/photos/${id}`);
  revalidatePath("/portfolio");

  redirect("/admin/photos");
}

export async function deletePhoto(formData: FormData) {
  const supabase = await createClient();

  // Check authentication
  const { data: authData, error: authError } =
    await supabase.auth.getClaims();

  if (authError || !authData) {
    redirect("/login");
  }

  const id = formData.get("id")?.toString();

  if (!id) {
    throw new Error("Photo ID is required.");
  }

  // Get the photo first so we know which Storage file to delete
  const { data: photo, error: fetchError } = await supabase
    .from("photos")
    .select("id, image_url")
    .eq("id", id)
    .single();

  if (fetchError || !photo) {
    throw new Error("Photo not found.");
  }

  /*
   * Delete the image from Supabase Storage.
   *
   * Your image URLs look like:
   *
   * https://YOUR_PROJECT.supabase.co/storage/v1/object/public/photography/portfolio/file.jpg
   *
   * We only need:
   *
   * portfolio/file.jpg
   */
  if (photo.image_url) {
    try {
      const url = new URL(photo.image_url);

      const storagePrefix =
        "/storage/v1/object/public/photography/";

      if (url.pathname.includes(storagePrefix)) {
        const filePath = decodeURIComponent(
          url.pathname.split(storagePrefix)[1]
        );

        if (filePath) {
          const { error: storageError } = await supabase.storage
            .from("photography")
            .remove([filePath]);

          if (storageError) {
            console.error(
              "Error deleting image from Storage:",
              storageError
            );

            throw new Error(
              "Unable to delete the image from Storage."
            );
          }
        }
      }
    } catch (error) {
      console.error("Error processing image URL:", error);
      throw new Error("Unable to delete the image.");
    }
  }

  // Delete database record
  const { error: deleteError } = await supabase
    .from("photos")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error(
      "Error deleting photo record:",
      deleteError
    );

    throw new Error("Unable to delete photo.");
  }

  // Refresh relevant pages
  revalidatePath("/admin/photos");
  revalidatePath("/portfolio");

  redirect("/admin/photos");
}