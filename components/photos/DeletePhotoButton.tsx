"use client";

import { useTransition } from "react";
import { deletePhoto } from "@/app/admin/photos/actions";

type DeletePhotoButtonProps = {
  photoId: string;
  photoTitle: string;
};

export default function DeletePhotoButton({
  photoId,
  photoTitle,
}: DeletePhotoButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${photoTitle}"?\n\nThis will permanently delete the photo and its image file.`
    );

    if (!confirmed) {
      return;
    }

    const formData = new FormData();
    formData.append("id", photoId);

    startTransition(() => {
      deletePhoto(formData);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-sm font-medium text-red-600 transition hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}